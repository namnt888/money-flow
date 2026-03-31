"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import {
  executeWithFallback,
  logSource,
} from "@/lib/pocketbase/fallback-helpers";

import { revalidatePath } from "next/cache";
import {
  pocketbaseList,
  pocketbaseGetById,
  toPocketBaseId,
  pocketbaseCreate,
  pocketbaseUpdate,
  pocketbaseDelete,
} from "@/services/pocketbase/server";
import {
  getPocketBasePeople,
  createPocketBasePerson,
  updatePocketBasePerson,
  resolvePocketBasePersonRecord,
} from "@/services/pocketbase/people.service";
import { toYYYYMMFromDate, normalizeMonthTag } from "@/lib/month-tag";
import type {
  MonthlyDebtSummary,
  Person as MoneyflowPerson,
  PersonCycleSheet,
} from "@/types/moneyflow.types";

type Person = MoneyflowPerson & { email?: string | null };

/**
 * Revalidate paths related to a person
 * @param personId PocketBase ID or legacy UUID
 */
function revalidatePersonPaths(personId: string | null | undefined) {
  if (!personId) return;
  revalidatePath("/people");
  revalidatePath(`/people/${personId}`);
  try {
    const pbId = toPocketBaseId(personId);
    if (pbId && pbId !== personId) {
      revalidatePath(`/people/${pbId}`);
    }
  } catch (e) {
    /* ignore */
  }
}

function calculateFinalPrice(row: any): number {
  if (row.final_price !== undefined && row.final_price !== null) {
    const parsed = Number(row.final_price);
    if (!isNaN(parsed)) return Math.abs(parsed);
  }
  const baseAmount = Math.abs(Number(row.amount || 0));
  const percentVal = Number(row.cashback_share_percent ?? 0);
  const fixedVal = Number(row.cashback_share_fixed ?? 0);
  const normalizedPercent = percentVal > 1 ? percentVal / 100 : percentVal;
  const cashback = baseAmount * normalizedPercent + fixedVal;
  return baseAmount - cashback;
}

/**
 * Get all people with their calculated debt stats
 */
export async function getPeople(options?: {
  includeArchived?: boolean;
}): Promise<Person[]> {
  console.log("[DB:PB] people.getBatch (Optimized)");

  const includeArchived = Boolean(options?.includeArchived);

  try {
    // 1. Fetch People from PocketBase
    const people = await getPocketBasePeople();
    const activePeople = includeArchived
      ? people
      : people.filter((p) => !p.is_archived);
    const personIds = activePeople.map((p) => p.id);

    if (personIds.length === 0) return [];

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthTag = toYYYYMMFromDate(now);

    // 2. Fetch Debt Accounts for mapping
    const debtAccountsResponse = await pocketbaseList<any>("accounts", {
      filter: `type='debt' && is_active=true`,
      perPage: 200,
    });
    const debtAccounts = debtAccountsResponse.items;
    const debtAccountToPersonMap = new Map<string, string>();
    debtAccounts.forEach((acc) => {
      if (acc.owner_id) debtAccountToPersonMap.set(acc.id, acc.owner_id);
    });

    // 3. Fetch Synced Cycles (Optimization: Use pre-calculated stats)
    const syncedCyclesResponse = await pocketbaseList<any>("people_debt_cycles", {
        perPage: 2000,
    });
    const syncedCycles = syncedCyclesResponse.items;
    
    // Track synced months per person to skip raw txns for those months
    const personSyncedMonths = new Map<string, Set<string>>();
    const personStats = new Map<string, any>();
    const personCycleStats = new Map<string, Map<string, any>>();

    // Process Synced Cycles with deduplication to avoid double counting
    // Sort by updated DESC to ensure we pick the LATEST sync for each month
    const sortedCycles = [...syncedCycles].sort((a, b) => 
      new Date(b.updated || b.last_synced_at || 0).getTime() - 
      new Date(a.updated || a.last_synced_at || 0).getTime()
    );

    const processedTags = new Map<string, Set<string>>();
    
    sortedCycles.forEach((c) => {
        if (!c.person_id) return;
        const tag = c.cycle_tag || c.tag_name || c.tag;
        if (!tag) return;

        if (!processedTags.has(c.person_id)) processedTags.set(c.person_id, new Set());
        const tags = processedTags.get(c.person_id)!;
        if (tags.has(tag)) return; // Skip duplicates, already have LATEST
        tags.add(tag);

        if (!personStats.has(c.person_id)) {
            personStats.set(c.person_id, { baseLend: 0, cashback: 0, repaid: 0, outstandingDebt: 0, currentCycleDebt: 0, totalBalance: 0, syncedCycleCount: 0 });
            personCycleStats.set(c.person_id, new Map());
        }
        if (!personSyncedMonths.has(c.person_id)) personSyncedMonths.set(c.person_id, new Set());
        personSyncedMonths.get(c.person_id)!.add(normalizeMonthTag(tag) || tag);

        const stats = personStats.get(c.person_id)!;
        const isCurrentCycle = tag === currentMonthTag;
        
        const initial = Number(c.initial_amount || c.base_lend || 0);
        const back = Number(c.back_amount || c.cashback || 0);
        const repay = Number(c.repay_net || c.repay || 0);
        const balance = initial - back - repay;

        stats.baseLend += initial;
        stats.cashback += back;
        stats.repaid += repay;
        stats.totalBalance += balance;
        stats.syncedCycleCount++;

        personCycleStats.get(c.person_id)!.set(tag, {
            balance,
            baseLend: initial,
            cashback: back,
            repaid: repay,
            netLend: initial - back
        });

        if (isCurrentCycle) {
            stats.currentCycleDebt += balance;
            stats.currentCycleRepaid = (stats.currentCycleRepaid || 0) + repay;
            stats.currentCycleCashback = (stats.currentCycleCashback || 0) + back;
        }
    });

    // 4. Fetch transactions for UNSYNCED months (usually just recent ones)
    // Increase limit to 10000 to ensure we don't miss history for un-synced members
    const txnsResponse = await pocketbaseList<any>("pvl_txn_001", {
      filter: `(type='debt' || type='expense' || type='repayment' || type='income' || type='transfer')`,
      perPage: 10000, 
      sort: "-date",
    });
    const recentTxns = txnsResponse.items;


    recentTxns.forEach((txn: any) => {
      let personId: string | null = null;
      if (txn.person_id && personIds.includes(txn.person_id)) {
        personId = txn.person_id;
      } else {
        const accId = txn.account_id || txn.to_account_id || txn.target_account_id;
        if (accId && debtAccountToPersonMap.has(accId)) {
          personId = debtAccountToPersonMap.get(accId) || null;
        }
      }
      if (!personId) return;

      const tag = txn.debt_cycle_tag || txn.tag || txn.metadata?.tag || "";
      const normalizedTag = normalizeMonthTag(tag) || tag;
      
      // SKIP synced months
      if (personSyncedMonths.get(personId)?.has(normalizedTag)) return;

      if (!personStats.has(personId)) {
        personStats.set(personId, { baseLend: 0, cashback: 0, repaid: 0, totalBalance: 0, currentCycleDebt: 0, currentCycleRepaid: 0, currentCycleCashback: 0, syncedCycleCount: 0 });
        personCycleStats.set(personId, new Map());
      }
      
      const stats = personStats.get(personId)!;
      const cycleStatsMap = personCycleStats.get(personId)!;
      const amount = Math.abs(Number(txn.amount || 0));

      // CLASSIFICATION (Type-based)
      const type = String(txn.type || "").toLowerCase();
      const note = (txn.note || "").toLowerCase();
      
      const isRollover = note.includes("rollover");
      // Use standard classification matches debt.service.ts
      const isRepayment = type === "repayment" || type === "income";
      const isCashback = type === "cashback" || (type === "expense" && (note.includes("cashback") || note.includes("refund")));
      const isSpend = (type === "expense" || type === "debt") && !isRollover && !isCashback && !isRepayment;

      const isCurrentCycle = normalizedTag === currentMonthTag || (txn.date && new Date(txn.date) >= currentMonthStart);
      
      const finalPrice = calculateFinalPrice(txn);
      const cbValue = amount - finalPrice;

      if (isSpend || isRollover) {
        stats.baseLend += amount;
        stats.cashback += cbValue;
        if (isCurrentCycle) {
          stats.currentCycleCashback = (stats.currentCycleCashback || 0) + cbValue;
          stats.currentCycleDebt += finalPrice;
        }
      } else if (isCashback) {
        stats.cashback += amount;
        if (isCurrentCycle) {
          stats.currentCycleCashback = (stats.currentCycleCashback || 0) + amount;
        }
      } else if (isRepayment) {
        stats.repaid += amount;
        if (isCurrentCycle) {
          stats.currentCycleRepaid = (stats.currentCycleRepaid || 0) + amount;
        }
      }
      
      // DEBT - CASHBACK - REPAY = BALANCE (Nam is owed this amount)
      const effectiveLend = isSpend ? finalPrice : (isCashback || isRepayment ? -amount : (isRollover ? amount : 0));
      stats.totalBalance += effectiveLend;

      if (normalizedTag) {
        const cs = cycleStatsMap.get(normalizedTag) || { balance: 0, baseLend: 0, cashback: 0, repaid: 0, netLend: 0 };
        if (isSpend || isRollover) { 
          cs.baseLend += amount; 
          cs.cashback += cbValue; 
          cs.netLend += isSpend ? finalPrice : amount; 
        }
        else if (isCashback) cs.cashback += amount;
        else if (isRepayment) cs.repaid += amount;
        cs.balance += effectiveLend;
        cycleStatsMap.set(normalizedTag, cs);
      }
    });

    return activePeople.map((person) => {
      const stats = personStats.get(person.id);
      const cycleStatsMap = personCycleStats.get(person.id);
      const debtAccount = debtAccounts.find(a => a.owner_id === person.id);

      let pastDueCount = 0;
      if (cycleStatsMap) {
        cycleStatsMap.forEach((cs, tag) => {
          if (tag < currentMonthTag && cs.balance > 500) pastDueCount++;
        });
      }

      const cycle_stats = Array.from(cycleStatsMap?.entries() || [])
        .map(([tag, cs]) => ({
          tag,
          baseLend: Math.round(cs.baseLend),
          cashback: Math.round(cs.cashback),
          repaid: Math.round(cs.repaid),
          netLend: Math.round(cs.netLend),
          remains: Math.round(cs.balance),
        }))
        .sort((a, b) => (b.tag || '').localeCompare(a.tag || ''));

      // Life-time Balance Calculation
      const totalBalance = Math.round((stats?.baseLend ?? 0) - (stats?.cashback ?? 0) - (stats?.repaid ?? 0));
      
      const currentMonthNet = Math.round(stats?.currentCycleDebt ?? 0);
      const currentMonthRepaid = Math.round(stats?.currentCycleRepaid ?? 0);
      const currentMonthCashback = Math.round(stats?.currentCycleCashback ?? 0);

      const currentCycleStats = cycleStatsMap?.get(currentMonthTag);

      return {
        ...person,
        debt_account_id: debtAccount?.id ?? null,
        current_debt_balance: totalBalance,
        balance: totalBalance,
        current_cycle_debt: currentMonthNet,
        outstanding_debt: totalBalance,
        all_debt_remains: totalBalance,
        total_base_debt: Math.round(stats?.baseLend ?? 0),
        total_cashback: Math.round(stats?.cashback ?? 0), 
        total_repaid: Math.round(stats?.repaid ?? 0), 
        current_cycle_base_lend: Math.round(currentCycleStats?.baseLend ?? 0),
        current_cycle_cashback: currentMonthCashback,
        current_cycle_repaid: currentMonthRepaid,
        current_cycle_label: currentMonthTag,
        past_due_count: pastDueCount,
        cycle_stats: cycle_stats,
        synced_cycle_count: stats?.syncedCycleCount || 0,
      };
    });
  } catch (error) {
    console.error("[DB:PB] getPeople failed:", error);
    return [];
  }
}

/**
 * Sync person cycle sheets from PocketBase
 */
export async function getPersonCycleSheets(
  personId: string,
): Promise<PersonCycleSheet[]> {
  const pbId = toPocketBaseId(personId);
  try {
    const response = await pocketbaseList<any>("person_cycle_sheets", {
      filter: `person_id='${pbId}'`,
      sort: "-cycle_tag",
    });
    return response.items.map((item) => ({
      id: item.id,
      person_id: item.person_id,
      cycle_tag: item.cycle_tag,
      sheet_id: item.sheet_id,
      sheet_url: item.sheet_url,
      created_at: item.created,
      updated_at: item.updated,
    }));
  } catch (error) {
    console.error("[DB:PB] getPersonCycleSheets failed:", error);
    return [];
  }
}

/**
 * Get detailed person info including memberships and debt analysis
 */
export async function getPersonWithSubs(id: string): Promise<Person | null> {
  if (!id || id === "details") return null;
  console.log("[DB:PB] people.getWithSubs", { id });

  try {
    // 1. Get Person Record
    const personRecord = (await resolvePocketBasePersonRecord(id)) as any;
    if (!personRecord) return null;

    const pbId = personRecord.id;

    // 2. Fetch Memberships from PB with SB Fallback
    const responseMembers = await executeWithFallback(
      async () => {
        logSource("PB", "people.memberships", { pbId });
        const res = await pocketbaseList<any>("service_members", {
          filter: `person_id='${pbId}'`,
          expand: "service_id",
        });
        return res.items;
      },
      async () => {
        logSource("SB", "people.memberships fallback", { id });
        const supabase = createClient();
        const { data } = await supabase
          .from("service_members")
          .select("service_id")
          .eq("person_id", id);
        return data || [];
      },
      "people.memberships",
    );

    const subscription_details = responseMembers.map((m: any) => ({
      id: m.service_id,
      name: m.expand?.service_id?.name || "Unknown",
      slots: m.slots || 1,
      image_url: m.expand?.service_id?.image_url || null,
    }));

    const subscription_ids = responseMembers.map((m: any) => m.service_id);

    // 3. Fetch Debt Account
    const debtAccountResponse = await pocketbaseList<any>("accounts", {
      filter: `owner_id='${pbId}' && type='debt'`,
      perPage: 1,
    });
    const debtAccount = debtAccountResponse.items[0];
    const debtAccountId = debtAccount?.id;

    // 4. Calculate Balance from Transactions
    let balance = 0;
    if (debtAccountId) {
      const txnsResponse = await pocketbaseList<any>("pvl_txn_001", {
        filter: `(account_id='${debtAccountId}' || to_account_id='${debtAccountId}') && status!='void'`,
        perPage: 1000,
      });

      txnsResponse.items.forEach((txn) => {
        const amount = calculateFinalPrice(txn);
        const toAccId = txn.to_account_id || txn.target_account_id;
        if (txn.account_id === debtAccountId) {
          balance += amount; // Outflow
        }
        if (toAccId === debtAccountId) {
          balance -= amount; // Inflow (Repayment)
        }
      });
    }

    // 5. Fetch Recent Activity (Transaction History)
    const filterParts = [`person_id='${pbId}'`];
    if (debtAccountId) {
      filterParts.push(`account_id='${debtAccountId}'`, `to_account_id='${debtAccountId}'`);
    }
    const recentTxnsResponse = await pocketbaseList<any>("pvl_txn_001", {
      filter: `(${filterParts.join(" || ")}) && status!='void'`,
      sort: "-date",
      perPage: 10,
    });
    const recentTxns = recentTxnsResponse.items;

    // 6. Detailed Debt Analysis (Matched with getPeople logic)
    let totalBaseLend = 0;
    let totalCashback = 0;
    let totalRepaid = 0;
    let currentCycleDebt = 0;
    let outstandingDebt = 0;

    let currentCycleBaseLend = 0;
    let currentCycleCashback = 0;
    let currentCycleRepaid = 0;
    let currentCycleNetLend = 0;

    const now = new Date();
    const currentMonthTag = toYYYYMMFromDate(now);

    if (debtAccountId) {
      const allStatsTxns = await pocketbaseList<any>("pvl_txn_001", {
        filter: `(account_id='${debtAccountId}' || to_account_id='${debtAccountId}' || person_id='${pbId}') && status!='void'`,
        perPage: 1000,
      });

      allStatsTxns.items.forEach((txn) => {
        const type = String(txn.type || "").toLowerCase();
        const baseTxnAmount = Math.abs(Number(txn.amount || 0));

        const pVal = Number(
          txn.cashback_share_percent ??
            txn.metadata?.cashback_share_percent ??
            0,
        );
        const fVal = Number(
          txn.cashback_share_fixed ?? txn.metadata?.cashback_share_fixed ?? 0,
        );
        const normP = pVal > 1 ? pVal / 100 : pVal;
        const cb = baseTxnAmount * normP + fVal;
        const net = baseTxnAmount - cb;

        const tag =
          txn.debt_cycle_tag ||
          txn.tag ||
          txn.persisted_cycle_tag ||
          txn.metadata?.tag ||
          "";
        const normalizedTag = normalizeMonthTag(tag) ?? tag;
        const isCurrent = normalizedTag === currentMonthTag;

        // --- NEW IMPROVED CLASSIFICATION LOGIC (UNIFIED & GLOSSARY COMPLIANT) ---
        const note = (txn.note || "").toLowerCase();
        
        const isRollover = note.includes("rollover");
        const isCashback = type === "cashback" || note.includes("cashback") || note.includes("refund") || (txn.category_name && txn.category_name.toLowerCase().includes("cashback"));
        // Unicode \u1ea3 = 'ả' as in "trả"
        const isRepayment = ["repayment", "repay"].includes(type) || (type === "income" && (note.includes("tr\u1ea3") || note.includes("repay"))) && !isCashback;
        const isSpend = (type === "expense" || type === "debt") && !isRollover && !isCashback && !isRepayment;

        const effective = isSpend ? net : (isCashback || isRepayment ? -baseTxnAmount : (isRollover ? baseTxnAmount : 0));

        if (isSpend || isRollover) {
          totalBaseLend += baseTxnAmount;
          if (isSpend) {
            totalCashback += cb;
          }
          if (isCurrent) {
            currentCycleBaseLend += baseTxnAmount;
            if (isSpend) {
              currentCycleCashback += cb;
              currentCycleNetLend += net;
            } else if (isRollover) {
              currentCycleNetLend += baseTxnAmount;
            }
          }
        } else if (isCashback) {
          totalCashback += baseTxnAmount;
          if (isCurrent) {
            currentCycleCashback += baseTxnAmount;
          }
        } else if (isRepayment) {
          totalRepaid += baseTxnAmount;
          if (isCurrent) {
            currentCycleRepaid += baseTxnAmount;
          }
        } 
        
        if (isCurrent) {
          currentCycleDebt += effective;
        } else {
          outstandingDebt += effective;
        }
      });
    }

    return {
      id: personRecord.id,
      pocketbase_id: personRecord.id,
      name: personRecord.name,
      image_url: personRecord.image_url ?? null,
      sheet_link: personRecord.sheet_link ?? null,
      google_sheet_url: personRecord.google_sheet_url ?? null,
      sheet_full_img: personRecord.sheet_full_img ?? null,
      sheet_show_bank_account: personRecord.sheet_show_bank_account ?? false,
      sheet_bank_info: personRecord.sheet_bank_info ?? null,
      sheet_linked_bank_id: personRecord.sheet_linked_bank_id ?? null,
      sheet_show_qr_image: personRecord.sheet_show_qr_image ?? false,
      is_master_sheet_enabled: personRecord.is_master_sheet_enabled ?? false,
      is_favorite: personRecord.is_favorite ?? false,
      is_owner: personRecord.is_owner ?? false,
      is_archived: personRecord.is_archived ?? false,
      subscription_ids,
      subscription_details,
      subscription_count: subscription_details.length,
      debt_account_id: debtAccountId ?? null,
      balance: totalBaseLend - totalCashback - totalRepaid,
      total_base_debt: totalBaseLend,
      total_cashback: totalCashback,
      total_repaid: totalRepaid,
      total_net_debt: totalBaseLend - totalCashback,
      current_cycle_base_lend: currentCycleBaseLend,
      current_cycle_cashback: currentCycleCashback,
      current_cycle_repaid: currentCycleRepaid,
      current_cycle_net_lend: currentCycleNetLend,
      current_cycle_debt: currentCycleDebt,
      outstanding_debt: outstandingDebt,
      current_debt_balance: totalBaseLend - totalCashback - totalRepaid,
      current_cycle_label: currentMonthTag,
      // Metadata for details UI
      metadata: {
        recent_transactions: recentTxns,
      },
    } as any;
  } catch (error) {
    console.error("[DB:PB] getPersonWithSubs failed:", error);
    return null;
  }
}

/**
 * Create a new person
 */
export async function createPerson(
  name: string,
  image_url?: string | null,
  sheet_link?: string | null,
  subscriptionIds?: string[],
  options: any = {},
) {
  console.log("[DB:PB] people.create", { name, ...options });
  try {
    const person = await createPocketBasePerson({
      name,
      image_url,
      sheet_link,
      google_sheet_url: options.google_sheet_url,
      is_owner: options.is_owner || false,
      is_archived: options.is_archived || false,
      is_group: options.is_group || false,
      is_favorite: options.is_favorite || false,
      group_parent_id: options.group_parent_id,
      sheet_linked_bank_id: options.sheet_linked_bank_id,
      is_master_sheet_enabled: options.is_master_sheet_enabled || false,
      sheet_show_bank_account: options.sheet_show_bank_account || false,
      sheet_bank_info: options.sheet_bank_info,
      sheet_show_qr_image: options.sheet_show_qr_image || false,
      sheet_full_img: options.sheet_full_img,
    });

    // Handle initial subscriptions if any
    if (subscriptionIds && subscriptionIds.length > 0) {
      const { updateServiceMembers } = await import("./service-manager");
      const memberPayload = subscriptionIds.map((sid) => ({
        service_id: sid,
        person_id: person.id,
        slots: 1,
        is_owner: false,
      }));
      await updateServiceMembersForPerson(person.id as string, subscriptionIds);
    }

    // Ensure debt account exists
    await ensureDebtAccount(person.id as string, name);

    revalidatePath("/people");
    return { success: true, profileId: person.id, debtAccountId: null }; // Debt account ID will be resolved later
  } catch (error) {
    console.error("[DB:PB] createPerson failed:", error);
    return { success: false, error: (error as any).message };
  }
}

/**
 * Helper to update service members for a specific person
 */
async function updateServiceMembersForPerson(personId: string, subscriptionIds: string[]) {
  const { pocketbaseList, pocketbaseDelete, pocketbaseCreate, toPocketBaseId } = await import("./pocketbase/server");
  
  // 1. Get current memberships for this person
  const existing = await pocketbaseList<any>("service_members", {
    filter: `person_id="${personId}"`,
    perPage: 100
  });

  // 2. Delete memberships not in the new list
  for (const m of existing.items) {
    if (!subscriptionIds.includes(m.service_id)) {
      await pocketbaseDelete("service_members", m.id);
    }
  }

  // 3. Add new memberships
  const currentSids = existing.items.map(m => m.service_id);
  for (const sid of subscriptionIds) {
    if (!currentSids.includes(sid)) {
      const pbPersonId = toPocketBaseId(personId, "people");
      const pbServiceId = toPocketBaseId(sid, "services");
      await pocketbaseCreate("service_members", {
        id: toPocketBaseId(`${pbServiceId}-${pbPersonId}`, "service_members"),
        service_id: pbServiceId,
        person_id: pbPersonId,
        slots: 1,
        is_owner: false
      });
    }
  }
}

/**
 * Update a person's information
 */
export async function updatePerson(id: string, data: any) {
  console.log("[DB:PB] people.update", { id });
  try {
    const pbId = toPocketBaseId(id);
    await updatePocketBasePerson(pbId, {
      name: data.name,
      image_url: data.image_url,
      sheet_link: data.sheet_link,
      google_sheet_url: data.google_sheet_url,
      sheet_full_img: data.sheet_full_img,
      sheet_show_bank_account: data.sheet_show_bank_account,
      sheet_bank_info: data.sheet_bank_info,
      sheet_linked_bank_id: data.sheet_linked_bank_id,
      sheet_show_qr_image: data.sheet_show_qr_image,
      is_owner: data.is_owner,
      is_archived: data.is_archived,
      is_favorite: data.is_favorite,
      is_master_sheet_enabled: data.is_master_sheet_enabled,
    });

    // Handle subscriptions if provided
    if (data.subscriptionIds !== undefined) {
      await updateServiceMembersForPerson(pbId, data.subscriptionIds);
    }

    revalidatePersonPaths(pbId);
    return { success: true };
  } catch (error) {
    console.error("[DB:PB] updatePerson failed:", error);
    return { success: false, error: (error as any).message };
  }
}

/**
 * Get recent people based on transaction history
 */
export async function getRecentPeopleByTransactions(
  limit: number = 5,
): Promise<MoneyflowPerson[]> {
  console.log("[DB:PB] transactions.recent_people");
  try {
    const response = await pocketbaseList<any>("pvl_txn_001", {
      filter: "person_id != null",
      sort: "-occurred_at",
      perPage: 50,
    });

    const uniquePersonIds = Array.from(
      new Set(response.items.map((t) => t.person_id)),
    ).slice(0, limit);
    const people = await getPocketBasePeople();

    return uniquePersonIds
      .map((id) => people.find((p) => p.id === id))
      .filter(Boolean) as MoneyflowPerson[];
  } catch (error) {
    console.error("[DB:PB] getRecentPeopleByTransactions failed:", error);
    return [];
  }
}

/**
 * Ensures a person has a debt account in PocketBase
 */
export async function ensureDebtAccount(
  personId: string,
  personName?: string,
): Promise<string | null> {
  const pbId = toPocketBaseId(personId);
  try {
    // 1. Check if already exists
    const existing = await pocketbaseList<any>("accounts", {
      filter: `owner_id='${pbId}' && type='debt'`,
      perPage: 1,
    });

    if (existing.items.length > 0) {
      return existing.items[0].id;
    }

    // 2. Resolve name if not provided
    let name = personName;
    if (!name) {
      const p = await pocketbaseGetById<any>("people", pbId);
      name = p?.name || "Unknown";
    }

    // 3. Create debt account in PB
    const newAcc = await pocketbaseCreate<any>("accounts", {
      name: `Debt: ${name}`,
      type: "debt",
      owner_id: pbId,
      is_active: true,
      initial_balance: 0,
      balance: 0,
      currency: "VND",
    });

    return newAcc.id;
  } catch (err) {
    console.error("[DB:PB] ensureDebtAccount failed:", err);
    return null;
  }
}
