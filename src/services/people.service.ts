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
  getPocketBasePersonDetails as getPocketBasePersonById,
} from "@/services/pocketbase/people.service";
import { toYYYYMMFromDate, normalizeMonthTag } from "@/lib/month-tag";
import type {
  Person as MoneyflowPerson,
  PersonCycleSheet,
  PersonCycleStats,
} from "@/types/moneyflow.types";

type Person = MoneyflowPerson & { email?: string | null };

/**
 * Revalidate paths related to a person
 */
function revalidatePersonPaths(personId: string | null | undefined) {
  if (!personId) return;
  revalidatePath("/people");
  revalidatePath(`/people/${personId}`);
}

/**
 * Helper to calculate final price
 */
function calculateFinalPrice(row: any): number {
  const rawAmount = Math.abs(Number(row.amount ?? 0));
  const percentVal = Number(row.cashback_share_percent ?? 0);
  const fixedVal = Number(row.cashback_share_fixed ?? 0);
  const normalizedPercent = (percentVal > 1 ? percentVal / 100 : percentVal);
  const safePercent = isNaN(normalizedPercent) ? 0 : normalizedPercent;
  const cashbackFromPercent = rawAmount * safePercent;
  return rawAmount - (cashbackFromPercent + fixedVal);
}

/**
 * SOURCE OF TRUTH FILTER: Matches debt.service.ts
 */
function isPersonalDebt(txn: any): boolean {
  const note = (txn.note || "").toLowerCase();
  const type = (txn.type || "").toLowerCase();
  if (note.startsWith("bank ") || note.startsWith("bank_")) {
    if (type === "repayment" || type === "debt") return true;
    const isPersonal = note.includes("điện") || note.includes("nước") || note.includes("s26") || note.includes("đơn") || note.includes("wifi") || note.includes("rác") || note.includes("icloud") || note.includes("youtube") || note.includes("derma") || note.includes("zakka");
    if (isPersonal) return true;
    return false;
  }
  return true;
}

/**
 * Get all people with their calculated debt stats (Reconciliation Engine v10 - Bulletproof)
 * Strategy:
 * 1. Calculate RAW stats per month using STRICT isPersonalDebt filter.
 * 2. Calculate SYNC stats per month from people_debt_cycles.
 * 3. MONTHLY RECONCILIATION:
 *    - IF month is 'Settled' in Sync -> balance = 0.
 *    - ELSE: balance = MAX(RawNetBalance, SyncNetBalance).
 *      - Why MAX? Because My's stale January sync (16M) must be overridden by Raw (35.9M).
 *      - Why MAX for Ánh? If her Raw extras are correctly filtered, her Raw should be ~7.8M, matching Sync.
 */
export async function getPeople(options?: {
  includeArchived?: boolean;
  targetPersonId?: string;
}): Promise<Person[]> {
  const includeArchived = Boolean(options?.includeArchived);
  const targetPersonId = options?.targetPersonId;

  try {
    let activePeople: Person[] = [];
    if (targetPersonId) {
      const p = await getPocketBasePersonById(targetPersonId);
      if (p) activePeople = [p];
    } else {
      const people = await getPocketBasePeople();
      activePeople = includeArchived ? people : people.filter((p) => !p.is_archived);
    }
    const personIds = activePeople.map((p) => p.id as string);
    if (personIds.length === 0) return [];

    const now = new Date();
    const currentMonthTag = toYYYYMMFromDate(now);

    // 1. Setup Maps
    const debtAccountsRes = await pocketbaseList<any>("accounts", { 
      filter: `type='debt' && is_active=true${targetPersonId ? ` && owner_id='${toPocketBaseId(targetPersonId)}'` : ''}`, 
      perPage: 500 
    });
    const debtAccountToPersonMap = new Map<string, string>();
    debtAccountsRes.items.forEach((acc) => { if (acc.owner_id) debtAccountToPersonMap.set(acc.id, acc.owner_id as string); });
    
    // Reverse map for faster filtering if we have targetPersonId
    const personToDebtAccountIds = new Set<string>();
    if (targetPersonId) {
        debtAccountsRes.items.forEach(acc => personToDebtAccountIds.add(acc.id));
    }

    const personCycleData = new Map<string, Map<string, { raw: any, sync: any }>>();
    personIds.forEach(id => personCycleData.set(id, new Map()));

    // 2. Fetch Sync Summaries (The "Settled" authority)
    const syncedCycles = await pocketbaseList<any>("people_debt_cycles", { 
      filter: targetPersonId ? `person_id='${toPocketBaseId(targetPersonId)}'` : '',
      perPage: 2000 
    });
    syncedCycles.items.forEach((c) => {
      const pId = c.person_id as string;
      if (!pId || !personIds.includes(pId)) return;
      const tag = normalizeMonthTag(c.cycle_tag || c.tag_name || c.tag) || "";
      if (!tag) return;

      const cycles = personCycleData.get(pId)!;
      const current = cycles.get(tag) || { raw: null, sync: null };
      const initial = Number(c.initial_amount || c.base_lend || 0);
      const back = Number(c.back_amount || c.cashback || 0);
      const repay = Number(c.repay_net || c.repay || 0);
      const updated = new Date(c.updated || c.created || 0).getTime();
      current.sync = { initial, back, repay, balance: initial - back - repay, status: c.status, updatedAt: updated };
      cycles.set(tag, current);
    });

    // 3. Fetch Raw Transactions (The "Deep" authority)
    // Optimization: If targetPersonId is set, filter by person_id or debt accounts directly
    const txFilter = `(type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void'${
      targetPersonId 
        ? ` && (person_id='${toPocketBaseId(targetPersonId)}'${
            Array.from(personToDebtAccountIds).length > 0 
              ? ` || (${Array.from(personToDebtAccountIds).map(id => `account_id='${toPocketBaseId(id)}'`).join(' || ')})` 
              : ''
          })` 
        : ''
    }`;

    if (targetPersonId) {
        console.log(`[getPeople] Filter for ${targetPersonId}:`, txFilter);
    }

    const txnsRes = await pocketbaseList<any>("pvl_txn_001", {
      filter: txFilter,
      perPage: targetPersonId ? 5000 : 10000, 
      sort: "-date",
    });

    txnsRes.items.forEach((txn: any) => {
      let pId: string | null = null;
      if (txn.person_id && personIds.includes(txn.person_id)) pId = txn.person_id;
      else {
        const accId = txn.account_id || txn.to_account_id || txn.target_account_id;
        if (accId && debtAccountToPersonMap.has(accId)) pId = debtAccountToPersonMap.get(accId) || null;
      }
      if (!pId || !isPersonalDebt(txn)) return;

      const metadata = txn.metadata && typeof txn.metadata === 'object' ? txn.metadata : {};
      const tagStr = String(txn.debt_cycle_tag || txn.tag || metadata.debt_cycle_tag || metadata.tag || "");
      const tag = normalizeMonthTag(tagStr) || tagStr;
      if (!tag) return;

      const cycles = personCycleData.get(pId)!;
      const current = cycles.get(tag) || { raw: { baseLend: 0, cashback: 0, repaid: 0, balance: 0 }, sync: null };
      if (!current.raw) current.raw = { baseLend: 0, cashback: 0, repaid: 0, balance: 0 };
      
      const amount = Math.abs(Number(txn.amount || 0));
      const type = String(txn.type || "").toLowerCase();
      const note = (txn.note || "").toLowerCase();
      const isRollover = note.includes("rollover");
      const isRepayment = type === "repayment" || (type === "income" && !note.includes("cashback") && !note.includes("refund"));
      const isCashback = type === "cashback" || (type === "income" && (note.includes("cashback") || note.includes("refund"))) || (type === "expense" && (note.includes("refund") || note.includes("cashback")));
      const isSpend = (type === "expense" || type === "debt") && !isRollover && !isCashback && !isRepayment;

      const finalPrice = calculateFinalPrice(txn);
      const cbValue = amount - finalPrice;

      if (isSpend || isRollover) { current.raw.baseLend += amount; current.raw.cashback += cbValue; }
      else if (isCashback) current.raw.cashback += amount;
      else if (isRepayment) current.raw.repaid += amount;

      const effective = isSpend ? finalPrice : (isCashback || isRepayment ? -amount : (isRollover ? amount : 0));
      current.raw.balance += effective;
      cycles.set(tag, current);
    });

    // 4. Final Aggregation
    return activePeople.map((person) => {
      const cycles = personCycleData.get(person.id)!;
      const stats = { 
        totalBalance: 0, totalBaseDebt: 0, totalCashback: 0, totalRepaid: 0,
        currentBaseLend: 0, currentCashback: 0, currentRepay: 0, currentBalance: 0
      };

      const cycleStats: PersonCycleStats[] = [];

      Array.from(cycles.entries()).forEach(([tag, data]) => {
        const isCurrent = tag === currentMonthTag;
        let initial = 0, back = 0, repay = 0, balance = 0;
        const raw = data.raw;
        const sync = data.sync;

        if (sync?.status === 'settled' || (sync && sync.balance < 1000)) {
          initial = sync?.initial || raw?.baseLend || 0;
          back = sync?.back || raw?.cashback || 0;
          repay = initial - back;
          balance = 0;
        } else {
          const rawBal = raw?.balance || 0;
          const syncBal = sync?.balance || 0;
          if (rawBal > syncBal) {
            initial = raw.baseLend; back = raw.cashback; repay = raw.repaid; balance = rawBal;
          } else if (sync) {
            initial = sync.initial; back = sync.back; repay = sync.repay; balance = syncBal;
          } else {
            initial = raw?.baseLend || 0; back = raw?.cashback || 0; repay = raw?.repaid || 0; balance = rawBal;
          }
        }

        stats.totalBalance += balance;
        stats.totalBaseDebt += initial;
        stats.totalCashback += back;
        stats.totalRepaid += repay;

        if (isCurrent) {
          stats.currentBaseLend = initial; stats.currentCashback = back; stats.currentRepay = repay; stats.currentBalance = balance;
        }

        cycleStats.push({
          tag,
          baseLend: Math.round(initial),
          cashback: Math.round(back),
          repaid: Math.round(repay),
          netLend: Math.round(initial - back),
          remains: Math.round(balance)
        });
      });

      const displayBalance = Math.abs(stats.totalBalance) < 1000 ? 0 : stats.totalBalance;

      return {
        ...person,
        debt_account_id: debtAccountsRes.items.find(a => a.owner_id === person.id)?.id || null,
        current_debt_balance: displayBalance,
        balance: displayBalance,
        current_cycle_debt: Math.round(stats.currentBalance),
        outstanding_debt: displayBalance,
        all_debt_remains: displayBalance,
        total_base_debt: Math.round(stats.totalBaseDebt),
        total_cashback: Math.round(stats.totalCashback), 
        total_repaid: Math.round(stats.totalRepaid),
        current_cycle_base_lend: Math.round(stats.currentBaseLend),
        current_cycle_cashback: Math.round(stats.currentCashback),
        current_cycle_repaid: Math.round(stats.currentRepay),
        current_cycle_label: currentMonthTag,
        cycle_stats: cycleStats.sort((a, b) => (b.tag || '').localeCompare(a.tag || '')),
        synced_cycle_count: Array.from(cycles.values()).filter(v => v.sync).length
      };
    });
  } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
}

export async function getPersonWithSubs(id: string): Promise<Person | null> {
  const people = await getPeople({ includeArchived: true, targetPersonId: id });
  return people.find(p => p.id === id || p.pocketbase_id === id) || null;
}

export async function createPerson(name: string, image_url?: string | null, sheet_link?: string | null, subscriptionIds?: string[], options: any = {}) {
  try {
    const p = await createPocketBasePerson({ name, image_url, sheet_link, ...options });
    const pId = p.id as string;
    if (subscriptionIds?.length) await updatePersonSubs(pId, subscriptionIds as string[]);
    await ensureDebtAccount(pId, name);
    revalidatePath("/people");
    return { success: true, profileId: p.id };
  } catch (err) { return { success: false }; }
}

async function updatePersonSubs(pId: string, sIds: string[]) {
  const existing = await pocketbaseList<any>("service_members", { filter: `person_id="${pId}"` });
  for (const m of existing.items) if (!sIds.includes(m.service_id)) await pocketbaseDelete("service_members", m.id);
  const current = existing.items.map(m => m.service_id);
  for (const sid of sIds) if (!current.includes(sid)) await pocketbaseCreate("service_members", { service_id: toPocketBaseId(sid, "services"), person_id: toPocketBaseId(pId, "people"), slots: 1, is_owner: false });
}

export async function updatePerson(id: string, data: any) {
  try {
    const pbId = toPocketBaseId(id) as string;
    await updatePocketBasePerson(pbId, data);
    if (data.subscriptionIds !== undefined) await updatePersonSubs(pbId, data.subscriptionIds as string[]);
    revalidatePersonPaths(pbId);
    return { success: true };
  } catch (err) { return { success: false }; }
}

export async function getRecentPeopleByTransactions(limit: number = 5): Promise<Person[]> {
  try {
    const res = await pocketbaseList<any>("pvl_txn_001", { filter: "person_id != null", sort: "-occurred_at", perPage: 50 });
    const ids = Array.from(new Set(res.items.map(t => t.person_id))).slice(0, limit);
    const people = await getPeople({ includeArchived: true });
    return ids.map(id => people.find(p => p.id === (id as string))).filter(Boolean) as Person[];
  } catch (err) { return []; }
}

export async function ensureDebtAccount(pId: string, name?: string): Promise<string | null> {
  const pbId = toPocketBaseId(pId);
  try {
    const existing = await pocketbaseList<any>("accounts", { filter: `owner_id='${pbId}' && type='debt'`, perPage: 1 });
    if (existing.items.length > 0) return existing.items[0].id;
    const n = name || (await pocketbaseGetById<any>("people", pbId))?.name || "Unknown";
    const acc = await pocketbaseCreate<any>("accounts", { name: `Debt: ${n}`, type: "debt", owner_id: pbId, is_active: true, initial_balance: 0, balance: 0, currency: "VND" });
    return acc.id;
  } catch (err) { return null; }
}

export async function getPersonCycleSheets(id: string): Promise<PersonCycleSheet[]> {
  try {
    const res = await pocketbaseList<any>("person_cycle_sheets", { filter: `person_id='${toPocketBaseId(id)}'`, sort: "-cycle_tag" });
    return res.items.map(i => ({ id: i.id, person_id: i.person_id as string, cycle_tag: i.cycle_tag as string, sheet_id: i.sheet_id as string, sheet_url: i.sheet_url as string, created_at: i.created as string, updated_at: i.updated as string }));
  } catch (err) { return []; }
}
