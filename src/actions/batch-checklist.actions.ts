'use server'

import { pocketbaseList, toPocketBaseId } from '@/services/pocketbase/server'
import { loadPocketBaseTransactions } from '@/services/pocketbase/transaction.service'

/**
 * Fetch all data needed for the 12-month recurring checklist
 */
export async function getChecklistDataAction(bankType: 'MBB' | 'VIB', year: number = new Date().getFullYear()) {
    try {
        console.log(`[BatchAction] Fetching checklist data for ${bankType} / ${year}`);
        
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

        // 2. Fetch Batches for the given year
        const yearPattern = `${year}-`
        const batchesResult = await pocketbaseList<any>('batches', {
            filter: `bank_type = '${bankType}' && month_year ~ '${yearPattern}'`,
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

        // 5. Optimized Funding Lookup (Single request for whole year)
        const yearStart = `${year}-01-01 00:00:00`
        const yearEnd = `${year}-12-31 23:59:59`
        const fallbackFundingByBatchMap = new Map<string, any>()
        try {
            // Use standardized loader for transactions
            const txns = await loadPocketBaseTransactions({
                limit: 500,
                // The loader handles date sorting and collection naming (pvl_txn_001)
            })
            
            txns.forEach((txn: any) => {
                const meta: any = txn.metadata || {}
                const bId = meta?.batch_id
                const isBatchRelated = meta?.batch_funding || meta?.batch_step || txn.note?.includes('Batch')
                
                if (bId && isBatchRelated && !fallbackFundingByBatchMap.has(bId)) {
                    fallbackFundingByBatchMap.set(bId, {
                        ...txn,
                        account: { id: txn.account_id }, // Simplified for checklist view
                        target_account: txn.target_account_id ? { id: txn.target_account_id } : null,
                    })
                }
            })
        } catch (e) {
            console.warn('[BatchAction] Optimized funding lookup failed', e)
        }

        const enrichedBatches = batches.map((b: any) => ({
            ...b,
            batch_items: batchItems.filter((item: any) => item.batch_id === b.id),
            funding_transaction: b.funding_transaction_id ? null : fallbackFundingByBatchMap.get(b.id) // Map will be merged later if ID exists
        }))

        // Resolve explicit funding transactions if they exist but weren't in fallback results
        const explicitFundingIds = batches.map(b => b.funding_transaction_id).filter(id => id && !Array.from(fallbackFundingByBatchMap.values()).some(v => v.id === id))
        if (explicitFundingIds.length > 0) {
            try {
                // Use pvl_txn_001 directly for known explicit IDs
                const explicitTxns = await pocketbaseList<any>('pvl_txn_001', {
                    filter: explicitFundingIds.map(id => `id='${id}'`).join(' || '),
                    page: 1,
                    expand: 'account_id,to_account_id'
                })
                explicitTxns.items.forEach(txn => {
                    // Match to batches
                    const batch = enrichedBatches.find(b => b.funding_transaction_id === txn.id)
                    if (batch) {
                        batch.funding_transaction = {
                            ...txn,
                            account: txn?.expand?.account_id || null,
                            target_account: txn?.expand?.to_account_id || null,
                        }
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
