'use server'

import { pocketbaseList, toPocketBaseId } from '@/services/pocketbase/server'
import { loadPocketBaseTransactions } from '@/services/pocketbase/transaction.service'

/**
 * Fetch all data needed for the checklist for a specific month
 */
export async function getChecklistDataAction(bankType: 'MBB' | 'VIB', monthYear: string = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`) {
    try {
        console.log(`[BatchAction] Fetching checklist data for ${bankType} / ${monthYear}`);
        
        // 1. Fetch Master Items
        const masterResult = await pocketbaseList<any>('batch_master_items', {
            filter: `bank_type = '${bankType}' && is_active = true`,
            sort: 'sort_order',
            page: 1,
            perPage: 500,
            expand: 'target_account_id,target_account_id.owner_id,target_account_id.holder_person_id',
        })
        const masterItems = masterResult.items.map((item: any) => {
            const acc = item?.expand?.target_account_id || null;
            // Resolve holder person from either holder_person_id or owner_id expansion
            // Order of priority: holder_person_id (explicitly linked person) then owner_id (account owner)
            const holder = acc?.expand?.holder_person_id || acc?.expand?.owner_id || null;
            
            return {
                ...item,
                accounts: acc,
                holder_person: holder,
            };
        })

        // 2. Fetch Batches for the given month
        const batchesResult = await pocketbaseList<any>('batches', {
            filter: `bank_type = '${bankType}' && month_year = '${monthYear}'`,
            page: 1,
            perPage: 200, // Safe limit
            sort: 'month_year',
        })
        const batches = batchesResult.items || []

        // 3. Fetch Batch Items (Paginated)
        const batchIds = batches.map((b: any) => b.id).filter(Boolean)
        let batchItems: any[] = []
        if (batchIds.length > 0) {
            // Split batchIds into chunks to avoid long filters
            const chunkSize = 20;
            for (let i = 0; i < batchIds.length; i += chunkSize) {
                const chunk = batchIds.slice(i, i + chunkSize);
                const batchFilter = chunk.map((id: string) => `batch_id = '${id}'`).join(' || ')
                
                try {
                    const chunkResult = await pocketbaseList<any>('batch_items', {
                        filter: batchFilter,
                        page: 1,
                        perPage: 1000, // Increased limit
                    })
                    batchItems = [...batchItems, ...(chunkResult.items || [])]
                } catch (e) {
                    console.error(`[BatchAction] Chunk fetch failed for index ${i}`, e);
                }
            }
        }

        const batchItemIds = batchItems.map((item: any) => String(item?.id || '').trim()).filter(Boolean)
        let transactionByBatchItemId = new Map<string, any>()
        if (batchItemIds.length > 0) {
            try {
                const allTransactions = await loadPocketBaseTransactions({ limit: 3000 })
                transactionByBatchItemId = new Map(
                    allTransactions
                        .map((txn: any) => {
                            const meta: any = txn?.metadata || {}
                            const batchItemId = String(meta?.batch_item_id || '').trim()
                            return batchItemId ? [batchItemId, txn] as const : null
                        })
                        .filter(Boolean) as Array<readonly [string, any]>
                )
            } catch (txnErr) {
                console.warn('[BatchAction] Failed to map transactions to batch items', txnErr)
            }
        }

        // 4. Fetch Phases
        let phases: any[] = []
        try {
            const phasesResult = await pocketbaseList<any>('batch_phases', {
                filter: `bank_type = '${bankType}' && is_active = true`,
                page: 1,
                perPage: 100,
                sort: 'sort_order',
            })
            phases = phasesResult.items || []
        } catch (phaseErr: any) {
            console.warn('batch_phases fetch failed:', phaseErr?.message)
        }

        // 5. Optimized Funding Lookup (Single request for whole month)
        // Ensure month boundary is correct for funding query
        const yearValue = monthYear.split('-')[0]
        const monthValue = monthYear.split('-')[1]
        
        // This calculates the last day of the month by rolling over day 0 of the NEXT month
        const lastDay = new Date(parseInt(yearValue), parseInt(monthValue), 0).getDate()
        
        const monthStart = `${monthYear}-01 00:00:00`
        const monthEnd = `${monthYear}-${String(lastDay).padStart(2, '0')} 23:59:59`
        const fallbackFundingByBatchMap = new Map<string, any>()
        try {
            // Use standardized loader for transactions
            const txns = await loadPocketBaseTransactions({
                limit: 500,
                // The loader handles date sorting and collection naming (pvl_txn_001)
            })
            
            txns.forEach((txn: any) => {
                const meta: any = txn?.metadata || {}
                const bId = String(meta?.batch_id || '').trim()
                const step = String(meta?.batch_step || '').toLowerCase()
                const status = String(txn?.status || '').toLowerCase()

                // Step 1 must point to the original funding transaction (source -> clearing), never Step 3 lines.
                if (!bId || step !== 'step1' || status === 'void') return

                const existing = fallbackFundingByBatchMap.get(bId)
                const existingTime = existing ? new Date(existing.occurred_at || existing.date || 0).getTime() : 0
                const nextTime = new Date(txn?.occurred_at || txn?.date || 0).getTime()
                if (!existing || nextTime >= existingTime) {
                    fallbackFundingByBatchMap.set(bId, {
                        ...txn,
                        account: { id: txn.account_id },
                        target_account: (txn.target_account_id || txn.to_account_id) ? { id: (txn.target_account_id || txn.to_account_id) } : null,
                    })
                }
            })
        } catch (e) {
            console.warn('[BatchAction] Optimized funding lookup failed', e)
        }

        const enrichedBatches = batches.map((b: any) => ({
            ...b,
            batch_items: batchItems
                .filter((item: any) => item.batch_id === b.id)
                .map((item: any) => {
                    const txn = transactionByBatchItemId.get(String(item.id || '').trim()) || null
                    return {
                        ...item,
                        transaction_id: txn?.id || item.transaction_id || null,
                        transaction: txn || null,
                        metadata: {
                            ...(item.metadata || {}),
                            transaction_id: txn?.id || item.metadata?.transaction_id || null,
                            txn_id: txn?.id || item.metadata?.txn_id || null,
                        },
                    }
                }),
            step1_transaction: fallbackFundingByBatchMap.get(b.id) || null,
            funding_transaction: b.funding_transaction_id ? null : fallbackFundingByBatchMap.get(b.id)
        }))

        // Resolve explicit funding transactions if they exist but weren't in fallback results
        const explicitFundingIds = batches.map(b => b.funding_transaction_id).filter(id => id && !Array.from(fallbackFundingByBatchMap.values()).some(v => v.id === id))
        if (explicitFundingIds.length > 0) {
            try {
                // Use pvl_txn_001 directly for known explicit IDs
                const explicitTxns = await pocketbaseList<any>('transactions', {
                    filter: explicitFundingIds.map(id => `id='${id}'`).join(' || '),
                    page: 1,
                    expand: 'account_id,to_account_id'
                })
                explicitTxns.items.forEach(txn => {
                    const meta: any = txn?.metadata || {}
                    const step = String(meta?.batch_step || '').toLowerCase()
                    if (step !== 'step1') return

                    // Match to batches
                    const batch = enrichedBatches.find(b => b.funding_transaction_id === txn.id)
                    if (batch) {
                        batch.funding_transaction = {
                            ...txn,
                            account: txn?.expand?.account_id || null,
                            target_account: txn?.expand?.to_account_id || null,
                        }
                        batch.step1_transaction = batch.funding_transaction
                    }
                })
            } catch {}
        }

        return {
            success: true,
            data: {
                masterItems,
                batches: enrichedBatches,
                phases: phases || []
            }
        }
    } catch (error: any) {
        console.error('Failed to fetch checklist data:', error)
        return { success: false, error: error.message }
    }
}
