'use server'

import { pocketbaseCreate, pocketbaseList, pocketbaseUpdate, toPocketBaseId } from '@/services/pocketbase/server'
import { revalidatePath } from 'next/cache'

interface UpsertBatchItemParams {
    monthYear: string
    period: 'before' | 'after'
    bankType: 'MBB' | 'VIB'
    masterItemId: string
    amount: number
    receiverName: string
    bankNumber: string
    bankName: string
    targetAccountId: string | null
    accountName?: string
    phaseName?: string
    phaseId?: string
    note?: string
    metadata?: any
}


/**
 * Utility to generate a descriptive note for a batch item
 */
function generateBatchItemNote(params: {
    receiverName: string
    period: 'before' | 'after'
    monthYear: string
    bankType: 'MBB' | 'VIB'
    accountName?: string
    phaseName?: string
}) {
    const [year, month] = params.monthYear.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthYearStr = `${monthNames[parseInt(month) - 1]}${year}` // e.g. Mar2026
    
    const bankTypeName = params.bankType === 'MBB' ? 'Mbb' : 'Vib'
    const accountPart = params.accountName || params.receiverName
    const phasePart = params.phaseName || (params.period === 'before' ? 'Before' : 'After')
    
    return `${accountPart} ${phasePart} ${monthYearStr} by ${bankTypeName}`
}

/**
 * High-speed amount update action
 * Ensures a batch exists and an item exists, then updates the amount.
 */
export async function upsertBatchItemAmountAction(params: UpsertBatchItemParams) {
    try {
        // monthYear is YYYY-MM
        const [year, month] = params.monthYear.split('-')
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthName = `${monthNames[parseInt(month) - 1]} ${year} (${params.period === 'before' ? 'Early' : 'Late'})`

        // Generate deterministic ID first
        const batchIdPart = params.phaseId || params.period
        const deterministicBatchId = toPocketBaseId(`${params.bankType}:${params.monthYear}:${batchIdPart}`, 'batches')

        let batchId: string | undefined = undefined

        // Try to fetch by deterministic ID directly first (most reliable)
        try {
            const existingBatchResult = await pocketbaseList<any>('batches', {
                filter: `id = "${deterministicBatchId}"`,
                perPage: 1
            })
            if (existingBatchResult.items && existingBatchResult.items.length > 0) {
                batchId = existingBatchResult.items[0].id
            }
        } catch (err) {
            console.warn('Failed to fetch batch by ID, falling back to filter:', err)
        }

        if (!batchId) {
            const batchResult = await pocketbaseList<any>('batches', {
                filter: `month_year = "${params.monthYear}" && bank_type = "${params.bankType}"`,
                perPage: 100,
            })
            const batchItems = batchResult.items || []

            // Manual filter logic
            const expectedSuffix = params.period === 'before' ? '(Early)' : '(Late)'
            const matchedBatch = params.phaseId
                ? batchItems.find((b: any) => b.phase_id === params.phaseId)
                : batchItems.find((b: any) =>
                    (b.period === params.period) ||
                    (b.name?.includes(expectedSuffix))
                )
            
            batchId = matchedBatch?.id
        }

        if (!batchId) {
            // Create batch
            const insertData: any = {
                id: deterministicBatchId,
                month_year: params.monthYear,
                name: monthName,
                bank_type: params.bankType,
                period: params.period,
                status: 'draft'
            }
            let newBatch: any
            try {
                newBatch = await pocketbaseCreate<any>('batches', { 
                    ...insertData, 
                    phase_id: params.phaseId || null 
                })
                batchId = newBatch.id
            } catch (createErr: any) {
                // If it still fails due to uniqueness, try one last time to find it by ID or filter
                const message = String(createErr?.message || '')
                if (message.includes('validation_not_unique')) {
                     const retryResult = await pocketbaseList<any>('batches', {
                        filter: `id = "${deterministicBatchId}"`,
                        perPage: 1
                    })
                    batchId = retryResult.items?.[0]?.id
                    if (!batchId) throw createErr // Still not found? Throw up.
                } else {
                    // Fallback if phase_id or period column is not available
                    try {
                        const { ...fallbackInsert } = insertData
                        newBatch = await pocketbaseCreate<any>('batches', fallbackInsert)
                        batchId = newBatch.id
                    } catch {
                        throw createErr
                    }
                }
            }
        }

        // 2. Ensure Batch Item exists
        // Some migrated datasets can throw PB 400 when filtering directly by master_item_id.
        // Query by batch first, then match master ids in-app (raw + normalized).
        const existingItemsResult = await pocketbaseList<any>('batch_items', {
            filter: `batch_id = "${batchId}"`,
            perPage: 500,
        })
        const normalizedMasterId = toPocketBaseId(params.masterItemId, 'batchmaster')
        const deterministicBatchItemId = toPocketBaseId(`${batchId}:${params.masterItemId}`, 'batchitems')
        const existingItem = (existingItemsResult.items || []).find((item: any) => {
            const rawMasterId = String(item?.master_item_id || '')
            return item?.id === deterministicBatchItemId || rawMasterId === params.masterItemId || rawMasterId === normalizedMasterId
        }) || null

        const targetAccountId = params.targetAccountId
            ? toPocketBaseId(params.targetAccountId, 'accounts')
            : null
        const persistedMasterId = existingItem?.master_item_id || normalizedMasterId

        if (existingItem) {
            // Update amount first. If account relation is invalid in migrated data,
            // keep amount save successful and skip relation update.
            try {
                await pocketbaseUpdate<any>('batch_items', existingItem.id, {
                    amount: params.amount,
                    receiver_name: params.receiverName,
                    bank_number: params.bankNumber,
                    bank_name: params.bankName,
                    target_account_id: targetAccountId,
                    month_year: params.monthYear,
                    phase_id: params.phaseId || null,
                    bank_type: params.bankType,
                    note: params.note || generateBatchItemNote({
                        receiverName: params.receiverName,
                        accountName: params.accountName,
                        phaseName: params.phaseName,
                        period: params.period,
                        monthYear: params.monthYear,
                        bankType: params.bankType
                    }),
                    metadata: params.metadata || { last_updated: new Date().toISOString() },
                })
            } catch {
                await pocketbaseUpdate<any>('batch_items', existingItem.id, {
                    amount: params.amount,
                    receiver_name: params.receiverName,
                    bank_number: params.bankNumber,
                    bank_name: params.bankName,
                    month_year: params.monthYear,
                    phase_id: params.phaseId || null,
                    bank_type: params.bankType,
                    note: params.note || generateBatchItemNote({
                        receiverName: params.receiverName,
                        accountName: params.accountName,
                        phaseName: params.phaseName,
                        period: params.period,
                        monthYear: params.monthYear,
                        bankType: params.bankType
                    }),
                })
            }
        } else {
            // Create
            try {
                await pocketbaseCreate<any>('batch_items', {
                        id: deterministicBatchItemId,
                        batch_id: batchId,
                        master_item_id: persistedMasterId,
                        amount: params.amount,
                        receiver_name: params.receiverName,
                        bank_number: params.bankNumber,
                        bank_name: params.bankName,
                        target_account_id: targetAccountId,
                        month_year: params.monthYear,
                        phase_id: params.phaseId || null,
                        bank_type: params.bankType,
                        note: params.note || generateBatchItemNote({
                            receiverName: params.receiverName,
                            accountName: params.accountName,
                            phaseName: params.phaseName,
                            period: params.period,
                            monthYear: params.monthYear,
                            bankType: params.bankType
                        }),
                        metadata: params.metadata || { created_at: new Date().toISOString() },
                        status: 'draft'
                    })
            } catch (createError: any) {
                const message = String(createError?.message || '')
                if (message.includes('validation_not_unique') && message.includes('id')) {
                    // Id already exists from prior deterministic insert/migration path.
                    try {
                        await pocketbaseUpdate<any>('batch_items', deterministicBatchItemId, {
                            master_item_id: persistedMasterId,
                            amount: params.amount,
                            receiver_name: params.receiverName,
                            bank_number: params.bankNumber,
                            bank_name: params.bankName,
                            target_account_id: targetAccountId,
                            month_year: params.monthYear,
                            phase_id: params.phaseId || null,
                            bank_type: params.bankType,
                            note: params.note || generateBatchItemNote({
                                receiverName: params.receiverName,
                                accountName: params.accountName,
                                phaseName: params.phaseName,
                                period: params.period,
                                monthYear: params.monthYear,
                                bankType: params.bankType
                            }),
                            metadata: params.metadata || { last_updated: new Date().toISOString() },
                            status: 'draft',
                        })
                    } catch {
                        await pocketbaseUpdate<any>('batch_items', deterministicBatchItemId, {
                            master_item_id: persistedMasterId,
                            amount: params.amount,
                            receiver_name: params.receiverName,
                            bank_number: params.bankNumber,
                            bank_name: params.bankName,
                            month_year: params.monthYear,
                            phase_id: params.phaseId || null,
                            bank_type: params.bankType,
                            note: params.note || generateBatchItemNote({
                                receiverName: params.receiverName,
                                accountName: params.accountName,
                                phaseName: params.phaseName,
                                period: params.period,
                                monthYear: params.monthYear,
                                bankType: params.bankType
                            }),
                            status: 'draft',
                        })
                    }
                } else {
                    // Retry create without relation field for relation mismatch scenarios.
                    try {
                        await pocketbaseCreate<any>('batch_items', {
                            id: deterministicBatchItemId,
                            batch_id: batchId,
                            master_item_id: persistedMasterId,
                            amount: params.amount,
                            receiver_name: params.receiverName,
                            bank_number: params.bankNumber,
                            bank_name: params.bankName,
                            month_year: params.monthYear,
                            phase_id: params.phaseId || null,
                            bank_type: params.bankType,
                            note: params.note || generateBatchItemNote({
                                receiverName: params.receiverName,
                                accountName: params.accountName,
                                phaseName: params.phaseName,
                                period: params.period,
                                monthYear: params.monthYear,
                                bankType: params.bankType
                            }),
                            status: 'draft',
                        })
                    } catch {
                        throw createError
                    }
                }
            }
        }

        revalidatePath('/batch')
        return { success: true, batchId }
    } catch (error: any) {
        console.error('Speed update failed:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Bulk initialize a batch for a month/period using all active master items
 */
export async function bulkInitializeFromMasterAction(params: {
    monthYear: string
    period: 'before' | 'after'
    bankType: 'MBB' | 'VIB'
    phaseId?: string
}) {
    try {
        // 1. Fetch all active master items (prefer phase_id, fallback to cutoff_period)
        let masterItems: any[] = []
        let phaseLabel: string | undefined = undefined

        if (params.phaseId) {
            try {
                const phaseRes = await pocketbaseList<any>('batch_phases', {
                    filter: `id = "${params.phaseId}"`,
                    perPage: 1
                })
                phaseLabel = phaseRes.items?.[0]?.label
            } catch (e) {
                console.warn('Failed to fetch phase label:', e)
            }
        }

        try {
            const filter = params.phaseId
                ? `bank_type = "${params.bankType}" && is_active = true && phase_id = "${params.phaseId}"`
                : `bank_type = "${params.bankType}" && is_active = true && cutoff_period = "${params.period}"`

            const masterResult = await pocketbaseList<any>('batch_master_items', {
                filter,
                perPage: 1000,
                sort: 'sort_order',
                expand: 'target_account_id'
            })
            masterItems = masterResult.items || []
        } catch (phaseErr) {
            // Fallback: If phase_id filter fails (e.g. field doesn't exist), use cutoff_period
            console.warn('bulkInitialize phase_id filter failed, falling back to cutoff_period:', (phaseErr as any)?.message)
            const fallbackFilter = `bank_type = "${params.bankType}" && is_active = true && cutoff_period = "${params.period}"`
            const fallbackResult = await pocketbaseList<any>('batch_master_items', {
                filter: fallbackFilter,
                perPage: 1000,
                sort: 'sort_order',
            })
            masterItems = fallbackResult.items || []
        }

        if (!masterItems || masterItems.length === 0) {
            return { success: false, error: 'No active master items found for this period.' }
        }

        // 2. Ensure Batch exists
        const [year, month] = params.monthYear.split('-')
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthName = `${monthNames[parseInt(month) - 1]} ${year} (${params.period === 'before' ? 'Early' : 'Late'})`

        const allBatchesResult = await pocketbaseList<any>('batches', {
            filter: `month_year = "${params.monthYear}" && bank_type = "${params.bankType}"`,
            perPage: 100,
        })
        const allBatches = allBatchesResult.items || []

        const expectedSuffix = params.period === 'before' ? '(Early)' : '(Late)'
        const batch = allBatches?.find((b: any) =>
            (params.phaseId && b.phase_id === params.phaseId) ||
            (!params.phaseId && (b.period === params.period || b.name?.includes(expectedSuffix)))
        ) || null

        // Use Phase ID in seed to avoid period ID collisions (Multiple's for After 15/After 20)
        const batchIdPart = params.phaseId || params.period
        const deterministicBatchId = toPocketBaseId(`${params.bankType}:${params.monthYear}:${batchIdPart}`, 'batches')

        let batchId: string | undefined = undefined

        // Try direct ID lookup first
        try {
            const existingBatchResult = await pocketbaseList<any>('batches', {
                filter: `id = "${deterministicBatchId}"`,
                perPage: 1
            })
            if (existingBatchResult.items?.[0]) {
                batchId = existingBatchResult.items[0].id
            }
        } catch {}

        if (!batchId) {
            const allBatchesResult = await pocketbaseList<any>('batches', {
                filter: `month_year = "${params.monthYear}" && bank_type = "${params.bankType}"`,
                perPage: 100,
            })
            const allBatches = allBatchesResult.items || []

            const expectedSuffix = params.period === 'before' ? '(Early)' : '(Late)'
            const batch = allBatches?.find((b: any) =>
                (params.phaseId && b.phase_id === params.phaseId) ||
                (!params.phaseId && (b.period === params.period || b.name?.includes(expectedSuffix)))
            ) || null
            batchId = batch?.id
        }

        if (!batchId) {
            const insertData: any = {
                id: deterministicBatchId,
                month_year: params.monthYear,
                name: monthName,
                bank_type: params.bankType,
                status: 'draft'
            }
            try {
                const newBatch = await pocketbaseCreate<any>('batches', {
                    ...insertData,
                    period: params.period,
                    phase_id: params.phaseId || null,
                })
                batchId = newBatch.id
            } catch (createErr: any) {
                if (String(createErr?.message).includes('validation_not_unique')) {
                    const retryResult = await pocketbaseList<any>('batches', {
                        filter: `id = "${deterministicBatchId}"`,
                        perPage: 1
                    })
                    batchId = retryResult.items?.[0]?.id
                }
                
                if (!batchId) {
                    try {
                        const newBatch = await pocketbaseCreate<any>('batches', insertData)
                        batchId = newBatch.id
                    } catch {
                        throw createErr
                    }
                }
            }
        }

        // 3. Fetch existing items to avoid duplicates
        const existingItemsResult = await pocketbaseList<any>('batch_items', {
            filter: `batch_id = "${batchId}"`,
            perPage: 5000,
        })
        const existingItems = existingItemsResult.items || []

        const existingMasterIds = new Set(existingItems?.map((i: any) => i.master_item_id) || [])

        // 4. Filter and insert missing items
        const itemsToInsert = masterItems
            .filter((m: any) => !existingMasterIds.has(m.id))
            .map((m: any) => ({
                id: toPocketBaseId(`${batchId}:${m.id}`, 'batchitems'),
                batch_id: batchId,
                master_item_id: m.id,
                amount: 0,
                receiver_name: m.receiver_name,
                bank_number: m.bank_number,
                bank_name: m.bank_name,
                target_account_id: m.target_account_id,
                month_year: params.monthYear,
                phase_id: params.phaseId || null,
                bank_type: params.bankType,
                note: generateBatchItemNote({
                    receiverName: m.receiver_name,
                    accountName: m.expand?.target_account_id?.name || m.bank_name,
                    phaseName: phaseLabel,
                    period: params.period,
                    monthYear: params.monthYear,
                    bankType: params.bankType
                }),
                status: 'draft'
            }))

        if (itemsToInsert.length > 0) {
            for (const item of itemsToInsert) {
                await pocketbaseCreate<any>('batch_items', item)
            }
        }

        revalidatePath('/batch')
        return { success: true, batchId, initializedCount: itemsToInsert.length }
    } catch (error: any) {
        console.error('Bulk initialization failed:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Toggle confirmation status of a batch item
 */
export async function toggleBatchItemConfirmAction(params: {
    batchItemId: string
    currentStatus: string
}) {
    try {
        const batchItemId = toPocketBaseId(params.batchItemId, 'batchitems')
        if (params.currentStatus === 'confirmed') {
            // Unconfirm (void transaction)
            const itemResult = await pocketbaseList<any>('batch_items', {
                filter: `id = "${batchItemId}"`,
                perPage: 1,
            })
            const item = itemResult.items[0] || null
            if (item?.transaction_id) {
                const { voidTransaction } = await import('@/services/transaction.service')
                await voidTransaction(item.transaction_id)
                // Also revert batch item status
                const { revertBatchItem } = await import('@/services/batch.service')
                await revertBatchItem(item.transaction_id)
            } else {
                await pocketbaseUpdate<any>('batch_items', batchItemId, { status: 'pending' })
            }
            revalidatePath('/batch')
            return { success: true, newStatus: 'pending' }
        } else {
            // Confirm (create transaction)
            const { confirmBatchItem } = await import('@/services/batch.service')
            await confirmBatchItem(params.batchItemId)
            revalidatePath('/batch')
            return { success: true, newStatus: 'confirmed' }
        }
    } catch (error: any) {
        console.error('Confirm toggle failed:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Bulk confirm batch items
 */
export async function bulkConfirmBatchItemsAction(batchId: string, itemIds: string[]) {
    try {
        if (!itemIds || itemIds.length === 0) return { success: true, count: 0 }
        const { confirmBatchItem } = await import('@/services/batch.service')

        let count = 0
        for (const id of itemIds) {
            await confirmBatchItem(id)
            count++
        }

        revalidatePath('/batch')
        return { success: true, count }
    } catch (error: any) {
        console.error('Bulk confirm failed:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Bulk unconfirm batch items
 */
export async function bulkUnconfirmBatchItemsAction(batchId: string, itemIds: string[]) {
    try {
        if (!itemIds || itemIds.length === 0) return { success: true, count: 0 }

        const normalizedItemIds = itemIds.map((id) => toPocketBaseId(id, 'batchitems'))
        const itemFilter = normalizedItemIds.map((id) => `id = "${id}"`).join(' || ')
        const itemsResult = await pocketbaseList<any>('batch_items', {
            filter: itemFilter,
            perPage: Math.max(normalizedItemIds.length, 1),
        })
        const items = itemsResult.items || []

        const { voidTransaction } = await import('@/services/transaction.service')
        const { revertBatchItem } = await import('@/services/batch.service')

        let count = 0
        for (const item of items || []) {
            if (item.transaction_id) {
                await voidTransaction(item.transaction_id)
                await revertBatchItem(item.transaction_id)
            } else {
                await pocketbaseUpdate<any>('batch_items', item.id, { status: 'pending' })
            }
            count++
        }

        revalidatePath('/batch')
        return { success: true, count }
    } catch (error: any) {
        console.error('Bulk unconfirm failed:', error)
        return { success: false, error: error.message }
    }
}
