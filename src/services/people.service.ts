'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server'
import { executeWithFallback, logSource } from '@/lib/pocketbase/fallback-helpers'

import { revalidatePath } from 'next/cache'
import {
  pocketbaseList,
  pocketbaseGetById,
  toPocketBaseId,
  pocketbaseCreate,
  pocketbaseUpdate,
  pocketbaseDelete,
} from '@/services/pocketbase/server'
import {
  getPocketBasePeople,
  createPocketBasePerson,
  updatePocketBasePerson,
  resolvePocketBasePersonRecord,
} from '@/services/pocketbase/people.service'
import { toYYYYMMFromDate, normalizeMonthTag } from '@/lib/month-tag'
import type {
  MonthlyDebtSummary,
  Person as MoneyflowPerson,
  PersonCycleSheet,
} from '@/types/moneyflow.types'

type Person = MoneyflowPerson & { email?: string | null }

/**
 * Revalidate paths related to a person
 * @param personId PocketBase ID or legacy UUID
 */
function revalidatePersonPaths(personId: string | null | undefined) {
  if (!personId) return
  revalidatePath('/people')
  revalidatePath(`/people/${personId}`)
  try {
    const pbId = toPocketBaseId(personId)
    if (pbId && pbId !== personId) {
      revalidatePath(`/people/${pbId}`)
    }
  } catch (e) { /* ignore */ }
}

function calculateFinalPrice(row: any): number {
  if (row.final_price !== undefined && row.final_price !== null) {
    const parsed = Number(row.final_price)
    if (!isNaN(parsed)) return Math.abs(parsed)
  }
  const rawAmount = Math.abs(Number(row.amount || 0))
  const percentVal = Number(row.cashback_share_percent ?? 0)
  const fixedVal = Number(row.cashback_share_fixed ?? 0)
  const normalizedPercent = percentVal > 1 ? percentVal / 100 : percentVal
  const cashback = (rawAmount * normalizedPercent) + fixedVal
  return rawAmount - cashback
}

/**
 * Get all people with their calculated debt stats
 */
export async function getPeople(options?: { includeArchived?: boolean }): Promise<Person[]> {
  console.log('[DB:PB] people.getBatch')
  
  const includeArchived = Boolean(options?.includeArchived)
  
  try {
    // 1. Fetch People from PocketBase
    const people = await getPocketBasePeople()
    const activePeople = includeArchived ? people : people.filter(p => !p.is_archived)
    const personIds = activePeople.map(p => p.id)

    console.log(`[DB:PB] Found ${activePeople.length} people and ${personIds.length} person IDs`)

    if (personIds.length === 0) return []

    // 2. Fetch Debt Accounts from PocketBase
    const debtAccountsResponse = await pocketbaseList<any>('accounts', {
      filter: `type='debt' && is_active=true`,
      perPage: 200
    })
    const debtAccounts = debtAccountsResponse.items
    const debtAccountToPersonMap = new Map<string, string>()
    debtAccounts.forEach(acc => {
      if (acc.owner_id) debtAccountToPersonMap.set(acc.id, acc.owner_id)
    })

    // 3. Fetch Transactions for Debt Calculation
    // We need both debt/expense (owed) and repayment/income (paid)
    // Filter by person_id or to_account_id being a debt account
    const txnsResponse = await pocketbaseList<any>('transactions', {
       // Note: we fetch more since we need to calculate historical stats
      filter: `(type='debt' || type='expense' || type='repayment' || type='income')`,
      perPage: 2000,
      sort: '-occurred_at'
    })
    const allTxns = txnsResponse.items
    console.log(`[DB:PB] Fetched ${allTxns.length} transactions for debt calculation`)

    let matchedCount = 0
    // 4. Calculate Balances
    const personStats = new Map<string, {
      baseLend: number,
      cashback: number,
      repaid: number,
      currentCycleDebt: number,
      outstandingDebt: number, // Total net debt minus current cycle
      totalBalance: number
    }>()
    
    const personCycleStats = new Map<string, Map<string, number>>()
    
    // Cycle Logic
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const currentMonthTag = toYYYYMMFromDate(now)

    allTxns.forEach(txn => {
      // Skip voided if status is present
      if (txn.status === 'void' || txn.metadata?.status === 'void') return

      const type = String(txn.type || '').toLowerCase()
      
      // Determine which person this belongs to
      let personId: string | null = null
      
      // 1. Direct link
      if (txn.person_id && personIds.includes(txn.person_id)) {
        personId = txn.person_id
      } 
      
      // 2. Link via account (from or to)
      if (!personId) {
        const fromAccId = txn.account_id
        const toAccId = txn.to_account_id || txn.target_account_id
        
        if (fromAccId && debtAccountToPersonMap.has(fromAccId)) {
          personId = debtAccountToPersonMap.get(fromAccId) || null
        } else if (toAccId && debtAccountToPersonMap.has(toAccId)) {
          personId = debtAccountToPersonMap.get(toAccId) || null
        }
      }

      if (!personId) return

      matchedCount++
      // Initialize stats for this person
      if (!personStats.has(personId)) {
        personStats.set(personId, {
          baseLend: 0,
          cashback: 0,
          repaid: 0,
          currentCycleDebt: 0,
          outstandingDebt: 0,
          totalBalance: 0
        })
        personCycleStats.set(personId, new Map<string, number>())
      }
      
      const stats = personStats.get(personId)!
      const cycleBalances = personCycleStats.get(personId)!

      const rawAmount = Math.abs(Number(txn.amount || 0))
      const fromAccId = txn.account_id
      const toAccId = txn.to_account_id || txn.target_account_id
      const debtAccountId = debtAccounts.find(acc => acc.owner_id === personId)?.id
      
      // Cashback calculation
      const percentVal = Number(txn.cashback_share_percent ?? txn.metadata?.cashback_share_percent ?? 0)
      const fixedVal = Number(txn.cashback_share_fixed ?? txn.metadata?.cashback_share_fixed ?? 0)
      const normalizedPercent = percentVal > 1 ? percentVal / 100 : percentVal
      const cashback = (rawAmount * normalizedPercent) + fixedVal
      
      const netAmount = rawAmount - cashback

      // Cycle identification
      const txnDate = txn.occurred_at || txn.date ? new Date(txn.occurred_at || txn.date) : null
      const tag = txn.debt_cycle_tag || txn.tag || txn.persisted_cycle_tag || txn.metadata?.tag || ''
      const normalizedTag = normalizeMonthTag(tag) ?? tag
      const isCurrentCycle = tag ? (normalizedTag === currentMonthTag) : (txnDate && txnDate >= currentMonthStart)

      // Update cycle-specific balance
      if (normalizedTag) {
        const currentCycleBalance = cycleBalances.get(normalizedTag) || 0;
        
        // Identify if money is entering or leaving the "debt pool" for this person
        // Outbound = Lending money/Paying expense for them = They owe us MORE (Increase balance)
        const isOutbound = (['debt', 'expense'].includes(type) && (Number(txn.amount) || 0) < 0) || (toAccId === debtAccountId)
        
        // Inbound = Receiving repayment/Income for them = They owe us LESS (Decrease balance)
        const isInbound = (['repayment', 'repay'].includes(type)) || (['debt', 'income'].includes(type) && (Number(txn.amount) || 0) > 0) || (fromAccId === debtAccountId)

        if (isOutbound) {
          stats.baseLend += rawAmount
          stats.cashback += cashback
          stats.totalBalance += netAmount
          cycleBalances.set(normalizedTag, (cycleBalances.get(normalizedTag) || 0) + netAmount);

          if (isCurrentCycle) {
            stats.currentCycleDebt += netAmount
          } else {
            stats.outstandingDebt += netAmount
          }
        } else if (isInbound) {
          stats.repaid += rawAmount
          stats.totalBalance -= rawAmount
          cycleBalances.set(normalizedTag, (cycleBalances.get(normalizedTag) || 0) - rawAmount);
          
          if (isCurrentCycle) {
            stats.currentCycleDebt -= rawAmount
          } else {
            stats.outstandingDebt -= rawAmount
          }
        }
      }
    })

    console.log(`[DB:PB] Matched ${matchedCount} transactions to people`)

    // 5. Build Final Objects
    return activePeople.map(person => {
      const stats = personStats.get(person.id)
      const cycleBalances = personCycleStats.get(person.id)
      const debtAccount = debtAccounts.find(acc => acc.owner_id === person.id)

      // Calculate past due count: number of cycles before current that have balance > 0
      let pastDueCount = 0;
      if (cycleBalances) {
          cycleBalances.forEach((balance, tag) => {
              if (tag < currentMonthTag && balance > 5) { // Small threshold to avoid rounding noise
                  pastDueCount++;
              }
          });
      }

      const roundedTotalBalance = Math.round(stats?.totalBalance ?? 0);
      const roundedOutstandingDebt = Math.round(stats?.outstandingDebt ?? 0);
      const roundedCurrentCycleDebt = Math.round(stats?.currentCycleDebt ?? 0);

      // Final zeroing for noise
      const finalTotalBalance = Math.abs(roundedTotalBalance) < 5 ? 0 : roundedTotalBalance;
      const finalOutstandingDebt = Math.abs(roundedOutstandingDebt) < 5 ? 0 : roundedOutstandingDebt;
      const finalCurrentCycleDebt = Math.abs(roundedCurrentCycleDebt) < 5 ? 0 : roundedCurrentCycleDebt;

      const monthly_debts: MonthlyDebtSummary[] = Array.from(cycleBalances?.entries() || [])
        .map(([tag, balance]) => ({
            tag,
            tagLabel: tag,
            amount: Math.round(balance),
            status: tag < currentMonthTag && balance > 5 ? 'active' : 'settled'
        }))
        .filter(d => Math.abs(d.amount) > 5)
        .sort((a, b) => (b.tag || '').localeCompare(a.tag || ''));

      return {
        ...person,
        debt_account_id: debtAccount?.id ?? null,
        current_debt_balance: finalTotalBalance,
        balance: finalTotalBalance, // Standard field for remains
        current_cycle_debt: finalCurrentCycleDebt,
        outstanding_debt: finalOutstandingDebt,
        total_base_debt: Math.round(stats?.baseLend ?? 0),
        total_cashback: Math.round(stats?.cashback ?? 0),
        total_repaid: Math.round(stats?.repaid ?? 0),
        total_net_debt: Math.round((stats?.baseLend ?? 0) - (stats?.cashback ?? 0)),
        current_cycle_label: currentMonthTag,
        past_due_count: pastDueCount,
        monthly_debts: monthly_debts
      }
    })

  } catch (error) {
    console.error('[DB:PB] getPeople failed:', error)
    return []
  }
}

/**
 * Sync person cycle sheets from PocketBase
 */
export async function getPersonCycleSheets(personId: string): Promise<PersonCycleSheet[]> {
  const pbId = toPocketBaseId(personId)
  try {
    const response = await pocketbaseList<any>('person_cycle_sheets', {
      filter: `person_id='${pbId}'`,
      sort: '-cycle_tag'
    })
    return response.items.map(item => ({
      id: item.id,
      person_id: item.person_id,
      cycle_tag: item.cycle_tag,
      sheet_id: item.sheet_id,
      sheet_url: item.sheet_url,
      created_at: item.created,
      updated_at: item.updated
    }))
  } catch (error) {
    console.error('[DB:PB] getPersonCycleSheets failed:', error)
    return []
  }
}

/**
 * Get detailed person info including memberships and debt analysis
 */
export async function getPersonWithSubs(id: string): Promise<Person | null> {
  if (!id || id === 'details') return null
  console.log('[DB:PB] people.getWithSubs', { id })

  try {
    // 1. Get Person Record
    const personRecord = await resolvePocketBasePersonRecord(id) as any
    if (!personRecord) return null
    
    const pbId = personRecord.id

    // 2. Fetch Memberships from PB with SB Fallback
    const responseMembers = await executeWithFallback(
      async () => {
        logSource('PB', 'people.memberships', { pbId })
        const res = await pocketbaseList<any>('service_members', {
          filter: `person_id='${pbId}'`,
          expand: 'service_id'
        })
        return res.items
      },
      async () => {
        logSource('SB', 'people.memberships fallback', { id })
        const supabase = createClient()
        const { data } = await supabase
          .from('service_members')
          .select('service_id')
          .eq('person_id', id)
        return data || []
      },
      'people.memberships'
    )

    const subscription_details = responseMembers.map((m: any) => ({
      id: m.service_id,
      name: m.expand?.service_id?.name || 'Unknown',
      slots: m.slots || 1,
      image_url: m.expand?.service_id?.image_url || null
    }))

    const subscription_ids = responseMembers.map((m: any) => m.service_id)

    // 3. Fetch Debt Account
    const debtAccountResponse = await pocketbaseList<any>('accounts', {
      filter: `owner_id='${pbId}' && type='debt'`,
      perPage: 1
    })
    const debtAccount = debtAccountResponse.items[0]
    const debtAccountId = debtAccount?.id

    // 4. Calculate Balance from Transactions
    let balance = 0
    if (debtAccountId) {
      const txnsResponse = await pocketbaseList<any>('transactions', {
        filter: `(account_id='${debtAccountId}' || to_account_id='${debtAccountId}' || target_account_id='${debtAccountId}') && status!='void'`,
        perPage: 1000
      })
      
      txnsResponse.items.forEach(txn => {
        const amount = calculateFinalPrice(txn)
        const toAccId = txn.to_account_id || txn.target_account_id
        if (txn.account_id === debtAccountId) {
          balance += amount // Outflow
        }
        if (toAccId === debtAccountId) {
          balance -= amount // Inflow (Repayment)
        }
      })
    }

    // 5. Fetch Recent Activity (Transaction History)
    const recentTxnsResponse = await pocketbaseList<any>('transactions', {
        filter: `(person_id='${pbId}' || account_id='${debtAccountId}' || to_account_id='${debtAccountId}') && status!='void'`,
        sort: '-occurred_at',
        perPage: 10
    })
    const recentTxns = recentTxnsResponse.items

    // 6. Detailed Debt Analysis (Matched with getPeople logic)
    let totalBaseLend = 0;
    let totalCashback = 0;
    let totalRepaid = 0;
    let currentCycleDebt = 0;
    let outstandingDebt = 0;
    
    const now = new Date()
    const currentMonthTag = toYYYYMMFromDate(now)

    if (debtAccountId) {
        const allStatsTxns = await pocketbaseList<any>('transactions', {
            filter: `(account_id='${debtAccountId}' || to_account_id='${debtAccountId}' || person_id='${pbId}') && status!='void'`,
            perPage: 1000
        });

        allStatsTxns.items.forEach(txn => {
            const type = String(txn.type || '').toLowerCase();
            const rawAmount = Math.abs(Number(txn.amount || 0));
            
            const pVal = Number(txn.cashback_share_percent ?? txn.metadata?.cashback_share_percent ?? 0);
            const fVal = Number(txn.cashback_share_fixed ?? txn.metadata?.cashback_share_fixed ?? 0);
            const normP = pVal > 1 ? pVal / 100 : pVal;
            const cb = (rawAmount * normP) + fVal;
            const net = rawAmount - cb;

            const tag = txn.debt_cycle_tag || txn.tag || txn.persisted_cycle_tag || txn.metadata?.tag || '';
            const normalizedTag = normalizeMonthTag(tag) ?? tag;
            const isCurrent = (normalizedTag === currentMonthTag);

            const isOut = (['debt', 'expense'].includes(type) && (Number(txn.amount) || 0) < 0) || (txn.account_id === debtAccountId);
            const isIn = (['repayment', 'repay'].includes(type)) || (['debt', 'income'].includes(type) && (Number(txn.amount) || 0) > 0) || (txn.to_account_id === debtAccountId);

            if (isOut) {
                totalBaseLend += rawAmount;
                totalCashback += cb;
                if (isCurrent) currentCycleDebt += net;
                else outstandingDebt += net;
            } else if (isIn) {
                totalRepaid += rawAmount;
                if (isCurrent) currentCycleDebt -= rawAmount;
                else outstandingDebt -= rawAmount;
            }
        });
    }

    return ({
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
      current_cycle_debt: currentCycleDebt,
      outstanding_debt: outstandingDebt,
      current_debt_balance: totalBaseLend - totalCashback - totalRepaid,
      current_cycle_label: currentMonthTag,
      // Metadata for details UI
      metadata: {
          recent_transactions: recentTxns
      }
    } as any)
  } catch (error) {
    console.error('[DB:PB] getPersonWithSubs failed:', error)
    return null
  }
}

/**
 * Create a new person
 */
export async function createPerson(name: string, image_url?: string | null, sheet_link?: string | null, subscriptionIds?: string[], options: any = {}) {
  console.log('[DB:PB] people.create', { name, ...options })
  try {
    const person = await createPocketBasePerson({
      name,
      image_url,
      sheet_link,
      google_sheet_url: options.google_sheet_url,
      is_owner: options.is_owner || false,
      is_archived: options.is_archived || false,
      is_group: options.is_group || false,
      group_parent_id: options.group_parent_id,
      sheet_linked_bank_id: options.sheet_linked_bank_id,
    })
    
    // Ensure debt account exists
    await ensureDebtAccount(person.id as string, name)

    revalidatePath('/people')
    return { success: true, profileId: person.id, debtAccountId: null } // Debt account ID will be resolved later
  } catch (error) {
    console.error('[DB:PB] createPerson failed:', error)
    return { success: false, error: (error as any).message }
  }
}

/**
 * Update a person's information
 */
export async function updatePerson(id: string, data: any) {
  console.log('[DB:PB] people.update', { id })
  try {
    const pbId = toPocketBaseId(id)
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
    })

    revalidatePersonPaths(pbId)
    return { success: true }
  } catch (error) {
    console.error('[DB:PB] updatePerson failed:', error)
    return { success: false, error: (error as any).message }
  }
}

/**
 * Get recent people based on transaction history
 */
export async function getRecentPeopleByTransactions(limit: number = 5): Promise<MoneyflowPerson[]> {
  console.log('[DB:PB] transactions.recent_people')
  try {
    const response = await pocketbaseList<any>('transactions', {
      filter: 'person_id != null',
      sort: '-occurred_at',
      perPage: 50
    })
    
    const uniquePersonIds = Array.from(new Set(response.items.map(t => t.person_id))).slice(0, limit)
    const people = await getPocketBasePeople()
    
    return uniquePersonIds
      .map(id => people.find(p => p.id === id))
      .filter(Boolean) as MoneyflowPerson[]
  } catch (error) {
    console.error('[DB:PB] getRecentPeopleByTransactions failed:', error)
    return []
  }
}

/**
 * Ensures a person has a debt account in PocketBase
 */
export async function ensureDebtAccount(personId: string, personName?: string): Promise<string | null> {
  const pbId = toPocketBaseId(personId)
  try {
    // 1. Check if already exists
    const existing = await pocketbaseList<any>('accounts', {
      filter: `owner_id='${pbId}' && type='debt'`,
      perPage: 1
    })
    
    if (existing.items.length > 0) {
      return existing.items[0].id
    }

    // 2. Resolve name if not provided
    let name = personName
    if (!name) {
      const p = await pocketbaseGetById<any>('people', pbId)
      name = p?.name || 'Unknown'
    }

    // 3. Create debt account in PB
    const newAcc = await pocketbaseCreate<any>('accounts', {
      name: `Debt: ${name}`,
      type: 'debt',
      owner_id: pbId,
      is_active: true,
      initial_balance: 0,
      balance: 0,
      currency: 'VND'
    })

    return newAcc.id
  } catch (err) {
    console.error('[DB:PB] ensureDebtAccount failed:', err)
    return null
  }
}
