'use server'

import { pocketbaseList } from '@/services/pocketbase/server'

/**
 * Fetch all data needed for the 12-month recurring checklist
 */
export async function getChecklistDataAction(bankType: 'MBB' | 'VIB', year: number = new Date().getFullYear()) {
    try {
        console.log(`[BatchAction] Fetching checklist data for ${bankType} / ${year}`);
        
        // 1. Fetch Master Items
        const masterResult = await pocketbaseList<any>('batch_master_items', {
            filter: `bank_type = "${bankType}" && is_active = true`,
            sort: 'sort_order',
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
            filter: `bank_type = "${bankType}" && month_year ~ "${yearPattern}"`,
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
                        perPage: 500, // Max safe perPage
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
                filter: `bank_type = "${bankType}" && is_active = true`,
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
            const fallbackFundingResult = await pocketbaseList<any>('transactions', {
                filter: `(metadata ~ 'batch_funding' || metadata ~ 'batch_step') && created >= '${yearStart}' && created <= '${yearEnd}'`,
                perPage: 200,
                sort: '-created',
                expand: 'account_id,target_account_id',
            })
            
            fallbackFundingResult.items.forEach(txn => {
                const meta = typeof txn.metadata === 'string' ? JSON.parse(txn.metadata) : txn.metadata
                const bId = meta?.batch_id
                if (bId && !fallbackFundingByBatchMap.has(bId)) {
                    fallbackFundingByBatchMap.set(bId, {
                        ...txn,
                        account: txn?.expand?.account_id || null,
                        target_account: txn?.expand?.target_account_id || null,
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
                const explicitTxns = await pocketbaseList<any>('transactions', {
                    filter: explicitFundingIds.map(id => `id='${id}'`).join(' || '),
                    expand: 'account_id,target_account_id'
                })
                explicitTxns.items.forEach(txn => {
                    // Match to batches
                    const batch = enrichedBatches.find(b => b.funding_transaction_id === txn.id)
                    if (batch) {
                        batch.funding_transaction = {
                            ...txn,
                            account: txn?.expand?.account_id || null,
                            target_account: txn?.expand?.target_account_id || null,
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
