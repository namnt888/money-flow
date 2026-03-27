'use server'

import { pocketbaseList, pocketbaseGetById, toPocketBaseId, pocketbaseUpdate, pocketbaseCreate } from './pocketbase/server'
import { DebtAccount } from '@/types/moneyflow.types'
import { toYYYYMMFromDate, normalizeMonthTag } from '@/lib/month-tag'
import { CreateTransactionInput, createTransaction } from './transaction.service'
import { resolvePocketBasePersonRecord } from './pocketbase/people.service'

type TransactionType = 'income' | 'expense' | 'transfer' | 'debt' | 'repayment'

type DebtTransactionRow = {
  amount: number | null
  type: TransactionType | null
  person_id: string | null
  tag?: string | null
  occurred_at?: string | null
  status?: string | null
  // Cashback fields for final price calculation
  cashback_share_percent?: string | number | null
  cashback_share_fixed?: string | number | null
  final_price?: number | null
}

export type DebtByTagAggregatedResult = {
  tag: string;
  netBalance: number;
  initial: number;     // Gross (INITIAL)
  back: number;        // Cashback (BACK)
  lend: number;        // Net (LEND)
  repay: number;       // Paid (REPAY)
  remains: number;     // Outstanding (REMAINS)
  status: string;
  last_activity: string;
  remainingPrincipal: number;
  links: { repaymentId: string, amount: number }[];
  
  // Legacy mapping
  originalPrincipal?: number;
  totalOriginalDebt?: number;
  totalBack?: number;
  totalCashback?: number;
  manual_allocations?: Record<string, number>;
}

type SettleDebtResult = {
  transactionId: string
  direction: 'collect' | 'repay'
  amount: number
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

async function resolvePersonPocketBaseId(personId: string): Promise<string> {
  return toPocketBaseId(personId, 'people');
}

function resolveBaseType(type: TransactionType | null | undefined): 'income' | 'expense' | 'transfer' {
  if (type === 'repayment') return 'income'
  if (type === 'debt') return 'expense'
  if (type === 'transfer') return 'transfer'
  if (type === 'income') return 'income'
  return 'expense'
}

function canonicalDebtTag(value: unknown): string | null {
  const raw = String(value ?? '').trim()
  if (!raw) return null
  return normalizeMonthTag(raw) || raw
}

/**
 * Calculate final price (amount after cashback deduction)
 * Final Price = Amount - Cashback
 * Cashback = (amount * percent/100) + fixed
 */
function calculateFinalPrice(row: DebtTransactionRow): number {
  // Safe parsing for final_price
  if (row.final_price !== undefined && row.final_price !== null) {
    const parsed = Number(row.final_price)
    if (!isNaN(parsed)) {
      return Math.abs(parsed)
    }
  }

  const rawAmount = Math.abs(Number(row.amount ?? 0))

  // Parse cashback values
  const percentVal = Number(row.cashback_share_percent ?? 0)
  const fixedVal = Number(row.cashback_share_fixed ?? 0)

  // Normalize percent (could be stored as 2 for 2% or 0.02 for 2%)
  const normalizedPercent = (percentVal > 1 ? percentVal / 100 : percentVal)

  // Safe cashback calc
  const safePercent = isNaN(normalizedPercent) ? 0 : normalizedPercent
  const cashbackFromPercent = rawAmount * safePercent
  const totalCashback = cashbackFromPercent + fixedVal

  // Final price = amount - cashback
  return rawAmount - totalCashback
}

export async function computeDebtFromTransactions(rows: DebtTransactionRow[], personId: string): Promise<number> {
  return rows
    .filter(row => row?.person_id === personId && row.status !== 'void')
    .reduce((sum, row) => {
      const finalPrice = calculateFinalPrice(row)
      const baseType = resolveBaseType(row.type)
      if (baseType === 'income') {
        return sum - finalPrice
      }
      if (baseType === 'expense') {
        return sum + finalPrice
      }
      return sum
    }, 0)
}

export async function getPersonDebt(personId: string): Promise<number> {
  if (!personId) return 0
  const pbPersonId = await resolvePersonPocketBaseId(personId)
  
  try {
    const response = await pocketbaseList<any>('pvl_txn_001', {
      filter: `person_id = "${pbPersonId}" && status != "void"`,
      fields: 'amount,type,person_id,status,cashback_share_percent,cashback_share_fixed,final_price'
    });

    return await computeDebtFromTransactions(response.items as unknown as DebtTransactionRow[], pbPersonId)
  } catch (err) {
    console.error('[DB:PB] getPersonDebt failed:', err);
    return 0;
  }
}

export async function getDebtAccounts(): Promise<DebtAccount[]> {
  try {
    const txns = await pocketbaseList<any>('pvl_txn_001', {
      filter: 'person_id != ""',
      fields: 'person_id',
      perPage: 500
    });

    const personIds = Array.from(new Set(txns.items.map(t => t.person_id).filter(Boolean))) as string[];
    if (personIds.length === 0) return []

    const [people, debtValues] = await Promise.all([
      Promise.all(personIds.map(id => pocketbaseGetById<any>('people', id))),
      Promise.all(personIds.map(id => getPersonDebt(id))),
    ])

    return personIds.map((id, index) => {
      const person = people[index]
      return {
        id,
        name: person?.name ?? 'Unknown',
        current_balance: debtValues[index] ?? 0,
        owner_id: id,
        image_url: person?.image_url ?? null,
        sheet_link: person?.sheet_link ?? null,
      }
    })
  } catch (err) {
    console.error('[DB:PB] getDebtAccounts failed:', err);
    return [];
  }
}

export async function getPersonDetails(id: string): Promise<{
  id: string
  name: string
  current_balance: number
  owner_id: string
  image_url: string | null
  sheet_link: string | null
  google_sheet_url: string | null
  sheet_full_img: string | null
  sheet_show_bank_account: boolean
  sheet_show_qr_image: boolean
} | null> {
  const pbId = toPocketBaseId(id, 'people')
  
  try {
    const person = await pocketbaseGetById<any>('people', pbId);
    if (!person) return null;

    const currentBalance = await getPersonDebt(pbId)
    return {
      id: person.id,
      name: person.name,
      current_balance: currentBalance,
      owner_id: person.id,
      image_url: person.image_url ?? null,
      sheet_link: person.sheet_link ?? null,
      google_sheet_url: person.google_sheet_url ?? null,
      sheet_full_img: person.sheet_full_img ?? null,
      sheet_show_bank_account: person.sheet_show_bank_account ?? false,
      sheet_show_qr_image: person.sheet_show_qr_image ?? false
    }
  } catch (err) {
    console.error('[DB:PB] getPersonDetails failed:', err);
    return null;
  }
}

export async function getDebtByTags(personId: string, options?: { ignoreSynced?: boolean }): Promise<DebtByTagAggregatedResult[]> {
  if (!personId) return []
  const pbPersonId = await resolvePersonPocketBaseId(personId)

  try {
    const [txnsResponse, cyclesResponse] = await Promise.all([
      pocketbaseList<any>('pvl_txn_001', {
        filter: `person_id = "${pbPersonId}" && status != "void"`,
        sort: 'date',
        perPage: 500
      }),
      pocketbaseList<any>('people_debt_cycles', {
        filter: `person_id = "${pbPersonId}"`,
      })
    ]);

    const data = txnsResponse.items;
    const syncedCycles = cyclesResponse.items;
    const syncedMap = new Map(syncedCycles.map(c => [c.cycle_tag, c]));

  // FIFO Simulation to determine "Remaining" amount for each debt
  // 1. Separate Debts and Repayments
  const debtsMap = new Map<string, { remaining: number, links: { repaymentId: string, amount: number }[] }>()
  const debtsList: any[] = []

  // Repayment objects that we will process
  type RepaymentItem = {
    id: string;
    amount: number;
    initialAmount: number;
    date: string;
    metadata: any;
    tag?: string | null;
  };
  const repaymentList: RepaymentItem[] = [];

  data.forEach((txn: any) => {
    const type = txn.type
    if (type === 'debt' || type === 'expense') {
      const amount = Math.abs(txn.amount)
      debtsList.push({ ...txn, remaining: amount })
      debtsMap.set(txn.id, { remaining: amount, links: [] }) // Init links
    } else if (type === 'repayment' || type === 'income') {
      repaymentList.push({
        id: txn.id,
        amount: calculateFinalPrice(txn as any),
        initialAmount: calculateFinalPrice(txn as any),
        date: txn.date || txn.occurred_at,
        metadata: txn.metadata,
        tag: txn.tag
      });
    }
  })

  // Sort lists
  // Debts: Oldest First (FIFO targets)
  debtsList.sort((a, b) => new Date(a.date || a.occurred_at).getTime() - new Date(b.date || b.occurred_at).getTime());
  // Repayments: Oldest First
  repaymentList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // === PHASE 1: PRE-ALLOCATED (TARGETED) REPAYMENTS ===
  // If a repayment has metadata specifying which debts it covers, apply that first.
  for (const repay of repaymentList) {
    const targets = repay.metadata?.bulk_allocation?.debts;
    if (Array.isArray(targets) && targets.length > 0) {
      targets.forEach((target: any) => {
        const debtId = target.id;
        const targetAmount = Number(target.amount || 0); // The amount allocated to this debt

        if (debtId && targetAmount > 0) {
          const debtEntry = debtsMap.get(debtId);

          // Verify debt exists and repay has balance
          if (debtEntry && repay.amount > 0) {
            // Determine how much to pay: 
            // We trust the `targetAmount` from metadata, BUT we are limited by available funds 
            // and the debt's actual size (though metadata *should* be accurate).
            // Actually, if user "Overpays" in UI, targetAmount might > debt.remaining.
            // We should record the payment even if it exceeds remaining? 
            // For "remainingPrincipal" calculation, we floor at 0. 
            // But for "links", we record what was paid.

            // Let's cap at repayment balance.
            const pay = Math.min(targetAmount, repay.amount);

            // Apply
            debtEntry.remaining -= pay;
            if (debtEntry.remaining < 0) debtEntry.remaining = 0; // Cap floor

            repay.amount -= pay;

            // Link
            debtEntry.links.push({ repaymentId: repay.id, amount: pay });

            // console.log(`[DebtFIFO-TARGET] Pay ${pay} to ${debtId} from ${repay.id}. RepayRem: ${repay.amount}`);
          }
        }
      });
    }
  }

  // === PHASE 1.5: TAG MATCHING ===
  // If a repayment has a tag (e.g. "2024-05"), prioritize paying debts with the SAME tag.
  for (const repay of repaymentList) {
    if (repay.amount <= 0.01) continue;

    const repayTag = canonicalDebtTag(repay.metadata?.tag || repay.tag);

    if (repayTag) {
      // Find debts with matching tag (Oldest First)
      for (const debt of debtsList) {
        const entry = debtsMap.get(debt.id)!;
        if (entry.remaining <= 0.01) continue;

        const debtTag = canonicalDebtTag(debt.tag);
        if (debtTag === repayTag) {
          const pay = Math.min(repay.amount, entry.remaining);

          entry.remaining -= pay;
          repay.amount -= pay;
          if (entry.remaining < 0) entry.remaining = 0;

          entry.links.push({ repaymentId: repay.id, amount: pay });
          // console.log(`[DebtFIFO-TAGGED] Pay ${pay} to ${debt.id} from ${repay.id} (Tag: ${debtTag})`);

          if (repay.amount <= 0.01) break; // Repayment exhausted
        }
      }
    }
  }

  // === PHASE 2: GENERAL FIFO (Waterfalls) ===
  // Apply any remaining repayment balance to any remaining debt balance (Oldest First)
  // This covers:
  // 1. Repayments without metadata (legacy)
  // 2. Repayments with "Unallocated" surplus
  // 3. Debts that weren't fully covered by targets
  // FIX: Exclude tagged repayments from waterfall. If tagged, they stay in their tag bucket.

  const generalQueue = repaymentList.filter(r => {
    if (r.amount <= 0.01) return false;
    const tag = canonicalDebtTag(r.metadata?.tag || r.tag);
    return !tag; // Only include truly untagged repayments
  });

  for (const debt of debtsList) {
    const entry = debtsMap.get(debt.id)!

    // While debt has remaining amount AND we have general money available
    while (entry.remaining > 0.01 && generalQueue.length > 0) {
      const currentRepayment = generalQueue[0]; // Peek

      // Strict FIFO: Apply whatever is available to this debt
      const payAmount = Math.min(currentRepayment.amount, entry.remaining);

      if (payAmount <= 0) {
        generalQueue.shift();
        continue;
      }

      // Record Link
      entry.links.push({
        repaymentId: currentRepayment.id,
        amount: payAmount
      });

      // Update Balances
      entry.remaining -= payAmount;
      currentRepayment.amount -= payAmount;
      if (entry.remaining < 0) entry.remaining = 0;

      // console.log(`[DebtFIFO-GENERAL] Pay ${payAmount} for ${debt.tag} (Rem: ${entry.remaining})`);

      // If Repayment exhausted, remove from queue
      if (currentRepayment.amount < 0.01) {
        generalQueue.shift();
      }
    }
  }

  // 3. Aggregate by Tag
  const tagMap = new Map<
    string,
    {
      lend: number
      lendOriginal: number
      repay: number
      cashback: number
      last_activity: string
      remainingPrincipal: number // Sum of 'remaining' of debts in this tag
      links: { repaymentId: string, amount: number }[] // NEW: Collected links
    }
  >();

  ;(data as unknown as (DebtTransactionRow & { id: string })[]).forEach(row => {
    // Prioritize debt_cycle_tag for grouping, fall back to row.tag
    const preferredTag = (row as any).debt_cycle_tag || row.tag;
    const normalizedTag = normalizeMonthTag(preferredTag)
    const tag = normalizedTag?.trim() ? normalizedTag.trim() : (preferredTag?.trim() ? preferredTag.trim() : 'UNTAGGED')
    const baseType = resolveBaseType(row.type)
    const occurredAt = row.occurred_at ?? ''

    if (!tagMap.has(tag)) {
      tagMap.set(tag, { lend: 0, lendOriginal: 0, repay: 0, cashback: 0, last_activity: occurredAt, remainingPrincipal: 0, links: [] })
    }

    const current = tagMap.get(tag)!

    // 1. INITIAL (Gross) = amount
    const rawAmount = Math.abs(Number(row.amount ?? 0))
    
    // 2. BACK (Shared Cashback)
    const percentVal = Number(row.cashback_share_percent ?? 0)
    const fixedVal = Number(row.cashback_share_fixed ?? 0)
    const normalizedPercent = percentVal > 1 ? percentVal / 100 : percentVal
    const cashbackShared = (rawAmount * normalizedPercent) + fixedVal

    if (baseType === 'expense') {
      if (!isNaN(rawAmount)) {
        current.lendOriginal += rawAmount
      }
      if (!isNaN(cashbackShared)) {
        current.cashback += cashbackShared
      }
      
      // 3. LEND (Net Principal) = INITIAL - BACK
      current.lend += (rawAmount - cashbackShared)

      // Add remaining principal from our FIFO simulation
      const fifoEntry = debtsMap.get(row.id)
      if (fifoEntry) {
        current.remainingPrincipal += fifoEntry.remaining
        fifoEntry.links.forEach(link => {
          const exists = current.links.find(l => l.repaymentId === link.repaymentId);
          if (exists) {
            exists.amount += link.amount;
          } else {
            current.links.push({ ...link });
          }
        });
      }
    } else if (baseType === 'income') {
      if (!isNaN(rawAmount)) {
        current.repay += rawAmount
      }
    }

    if (occurredAt && occurredAt > current.last_activity) {
      current.last_activity = occurredAt
    }
  })

    const result = Array.from(tagMap.entries()).map(([tag, { lend, lendOriginal, repay, cashback, last_activity, remainingPrincipal, links }]) => {
    const remains = lend - repay;
    const netBalance = remains;

    // Status Logic:
    let status = 'active'
    if (Math.abs(remains) < 500) {
      status = 'settled'
    }

    const synced = syncedMap.get(tag);
    if (!options?.ignoreSynced && synced && synced.is_synced) {
      return {
        tag,
        netBalance: (synced.lend_net || 0) - (synced.repay_net || 0),
        initial: synced.initial_amount || 0,
        back: synced.back_amount || 0,
        lend: synced.lend_net || 0,
        repay: synced.repay_net || 0,
        remains: synced.remains_amount || 0,
        status: synced.status || status,
        last_activity: synced.last_synced_at || last_activity,
        remainingPrincipal: synced.remains_amount || 0,
        links,
        // Legacy
        originalPrincipal: synced.lend_net || 0,
        totalOriginalDebt: synced.initial_amount || 0,
        totalBack: synced.repay_net || 0,
        totalCashback: synced.back_amount || 0,
        isSynced: true
      };
    }

    return {
      tag,
      netBalance,
      initial: lendOriginal,
      back: cashback,
      lend: lend,
      repay: repay,
      remains: remainingPrincipal,
      status,
      last_activity,
      remainingPrincipal,
      links,
      // Legacy
      totalBack: repay,
      totalCashback: cashback,
      isSynced: false
    }
  });

    return result;
  } catch (err) {
    console.error('[DB:PB] getDebtByTags failed:', err);
    return [];
  }
}

export async function settleDebt(
  personId: string,
  amount: number,
  targetBankAccountId: string,
  note: string,
  date: Date,
  tag: string
): Promise<SettleDebtResult | null> {
  const net = await getPersonDebt(personId)
  const direction: SettleDebtResult['direction'] = net >= 0 ? 'collect' : 'repay'
  const txnType: TransactionType = direction === 'collect' ? 'repayment' : 'debt'

  const payload: CreateTransactionInput = {
    occurred_at: date.toISOString(),
    note,
    tag,
    type: txnType,
    amount: Math.abs(amount),
    source_account_id: targetBankAccountId,
    person_id: personId,
  }

  const transactionId = await createTransaction(payload)

  if (!transactionId) return null

  return {
    transactionId,
    direction,
    amount: Math.abs(amount),
  }
}

export async function getOutstandingDebts(personId: string, excludeTransactionId?: string): Promise<any[]> {
  if (!personId) return []
  const pbPersonId = toPocketBaseId(personId, 'people')
  const pbExcludeId = excludeTransactionId ? toPocketBaseId(excludeTransactionId, 'pvl_txn_001') : null

  try {
    const response = await pocketbaseList<any>('pvl_txn_001', {
      filter: `person_id = "${pbPersonId}" && status != "void"`,
      sort: 'date',
      perPage: 500
    })

    const data = response.items
    if (!data) return []

  // In-memory simulation of current state
  // 1. Separate Debts and Repayments
  const debts: any[] = []
  const repayments: any[] = []

  // Legacy support: type='expense' is debt, type='income' is repayment
  // Modern support: type='debt' is debt, type='repayment' is repayment
  data.forEach((txn: any) => {
    // If we are editing a transaction, we must exclude it from the history calculation
    // so that we can "re-apply" its effect.
    if (excludeTransactionId && txn.id === excludeTransactionId) return

    const type = txn.type
    if (type === 'debt' || type === 'expense') {
      debts.push({ ...txn, remaining: Math.abs(txn.amount) }) // Initialize remaining
    } else if (type === 'repayment' || type === 'income') {
      repayments.push(Math.abs(txn.amount))
    }
  })

  // 2. Apply historic repayments FIFO to debts
  let repaymentPool = repayments.reduce((sum, val) => sum + val, 0)

  const activeDebts: any[] = []

  for (const debt of debts) {
    if (repaymentPool <= 0) {
      activeDebts.push(debt)
      continue
    }

    const amount = debt.remaining
    if (repaymentPool >= amount) {
      repaymentPool -= amount
      debt.remaining = 0
    } else {
      debt.remaining -= repaymentPool
      repaymentPool = 0
      activeDebts.push(debt)
    }
  }

  // Return only debts that have remaining amount > 0
  return activeDebts.map(d => ({
    ...d,
    amount: d.remaining // Update amount to be the 'Remaining Principal'
  }))
  } catch (err) {
    console.error('[DB:PB] getOutstandingDebts failed:', err);
    return [];
  }
}

export async function syncPersonDebtCycle(personId: string, tag: string) {
  const pbPersonId = await resolvePersonPocketBaseId(personId);
  const rawStats = await getDebtByTags(personId, { ignoreSynced: true });
  
  if (tag === 'all') {
    return await syncAllPersonDebtCycles(personId);
  }

  const cycleStat = rawStats.find(s => s.tag === tag);

  if (!cycleStat) {
    return { success: false, error: `Tag ${tag} not found in transaction history` };
  }

  // Find existing record
  const existing = await pocketbaseList<any>('people_debt_cycles', {
    filter: `person_id = "${pbPersonId}" && cycle_tag = "${tag}"`,
  });

  const cycleId = toPocketBaseId(`${pbPersonId}-${tag}`);

  const payload = {
    id: cycleId,
    person_id: pbPersonId,
    cycle_tag: tag,
    initial_amount: cycleStat.initial,
    back_amount: cycleStat.back,
    lend_net: cycleStat.lend,
    repay_net: cycleStat.repay,
    remains_amount: cycleStat.remains,
    status: cycleStat.status,
    is_synced: true,
    last_synced_at: new Date().toISOString()
  };

  try {
    if (existing.items.length > 0) {
      await pocketbaseUpdate('people_debt_cycles', existing.items[0].id, payload);
    } else {
      await pocketbaseCreate('people_debt_cycles', payload);
    }
    return { success: true };
  } catch (err: any) {
    console.error('[DebtService] Sync failed:', err);
    return { success: false, error: err.message };
  }
}

export async function syncAllPersonDebtCycles(personId: string) {
  const pbPersonId = await resolvePersonPocketBaseId(personId);
  const rawStats = await getDebtByTags(personId, { ignoreSynced: true });
  
  let successCount = 0;
  let errorCount = 0;

  for (const cycleStat of rawStats) {
    const tag = cycleStat.tag;
    const cycleId = toPocketBaseId(`${pbPersonId}-${tag}`);
    const payload = {
      id: cycleId,
      person_id: pbPersonId,
      cycle_tag: tag,
      initial_amount: cycleStat.initial,
      back_amount: cycleStat.back,
      lend_net: cycleStat.lend,
      repay_net: cycleStat.repay,
      remains_amount: cycleStat.remains,
      status: cycleStat.status,
      is_synced: true,
      last_synced_at: new Date().toISOString()
    };

    try {
      const existing = await pocketbaseList<any>('people_debt_cycles', {
        filter: `person_id = "${pbPersonId}" && cycle_tag = "${tag}"`,
      });

      if (existing.items.length > 0) {
        await pocketbaseUpdate('people_debt_cycles', existing.items[0].id, payload);
      } else {
        await pocketbaseCreate('people_debt_cycles', payload);
      }
      successCount++;
    } catch (err) {
      console.error(`[DebtService] Failed to sync cycle ${tag}:`, err);
      errorCount++;
    }
  }

  return { 
    success: successCount > 0, 
    message: `Synced ${successCount} cycles${errorCount > 0 ? `, ${errorCount} failed` : ''}` 
  };
}
