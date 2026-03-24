'use server'

import { pocketbaseCreate, pocketbaseDelete, pocketbaseList, pocketbaseUpdate, toPocketBaseId } from '@/services/pocketbase/server'
import { revalidatePath } from 'next/cache'
import { BatchMasterItem } from '@/services/batch-master.service'

function mapBatchMasterItem(record: any): any {
    return {
        ...record,
        phase_id: record?.phase_id || null,
        accounts: record?.expand?.target_account_id || null,
        categories: record?.expand?.category_id || null,
        phases: record?.expand?.phase_id || null,
        // Map nested account person directly for easier UI access
        holder_person: record?.expand?.target_account_id?.expand?.holder_person_id || null,
    }
}

function normalizeMasterPayload(item: Partial<BatchMasterItem>, id: string) {
    return {
        ...item,
        id,
        is_active: item.is_active ?? true,
        target_account_id: item.target_account_id || null,
        category_id: item.category_id || null,
        phase_id: item.phase_id || null,
        updated_at: new Date().toISOString(),
    }
}

function isUnknownFieldError(error: unknown, fieldName: string) {
    const message = String((error as any)?.message || '')
    return message.includes(`\"${fieldName}\"`) || message.includes(`'${fieldName}'`)
}

/**
 * Action to upsert a master checklist item
 */
export async function upsertBatchMasterItemAction(item: Partial<BatchMasterItem>) {
    try {
        const id = item.id ? toPocketBaseId(item.id, 'batchmaster') : toPocketBaseId(`${item.bank_type || 'MBB'}:${item.bank_number || ''}:${Date.now()}`, 'batchmaster')
        const payload = normalizeMasterPayload(item, id)

        let data: any
        try {
            data = item.id
                ? await pocketbaseUpdate<any>('batch_master_items', id, payload)
                : await pocketbaseCreate<any>('batch_master_items', payload)
        } catch (error) {
            if (!isUnknownFieldError(error, 'phase_id')) throw error

            const { phase_id: _phaseId, ...fallbackPayload } = payload as any
            data = item.id
                ? await pocketbaseUpdate<any>('batch_master_items', id, fallbackPayload)
                : await pocketbaseCreate<any>('batch_master_items', fallbackPayload)
        }

        revalidatePath('/batch/settings')
        revalidatePath('/batch')

        return { success: true, data: mapBatchMasterItem(data) }
    } catch (error: any) {
        console.error('Error upserting batch master item:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Action to delete a master checklist item
 */
export async function deleteBatchMasterItemAction(id: string) {
    try {
        await pocketbaseDelete('batch_master_items', toPocketBaseId(id, 'batchmaster'))

        revalidatePath('/batch/settings')
        revalidatePath('/batch')

        return { success: true }
    } catch (error: any) {
        console.error('Error deleting batch master item:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Action to get master items (Server Side)
 */
export async function getBatchMasterItemsAction(bankType?: 'MBB' | 'VIB') {
    try {
        const filterParts: string[] = ['is_active = true']
        if (bankType) filterParts.push(`bank_type = "${bankType}"`)
        const filter = filterParts.join(' && ')

        let result
        try {
            result = await pocketbaseList<any>('batch_master_items', {
                filter,
                sort: 'sort_order',
                perPage: 500,
                expand: 'target_account_id.holder_person_id,category_id,phase_id',
            })
        } catch (error) {
            if (!isUnknownFieldError(error, 'phase_id')) throw error
            result = await pocketbaseList<any>('batch_master_items', {
                filter,
                sort: 'sort_order',
                perPage: 500,
                expand: 'target_account_id.holder_person_id,category_id',
            })
        }

        return { success: true, data: result.items.map(mapBatchMasterItem) }
    } catch (error: any) {
        console.error('Error fetching batch master items:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Migration utility to link all batch_master_items to their correct phase_id
 * based on bank_type, cutoff_period, and target account's due_date.
 */
export async function migrateBatchItemsToPhasesAction(params?: { bankType: 'MBB' | 'VIB' }) {
    try {
        const bankType = params?.bankType || 'MBB'
        console.log(`[Migration] Starting batch_master_items phase linking for ${bankType}...`)

        // 1. Fetch all active phases for THIS bank
        const phasesResult = await pocketbaseList<any>('batch_phases', {
            filter: `is_active = true && bank_type = '${bankType}'`,
            perPage: 100,
            sort: 'sort_order', // Ensure correct order for matching
        })
        const phases = phasesResult.items || []
        
        // 2. Fetch all master items for this bank
        const mastersResult = await pocketbaseList<any>('batch_master_items', {
            filter: `bank_type = '${bankType}'`,
            perPage: 1000,
            expand: 'target_account_id',
        })
        const masters = mastersResult.items || []

        if (!phases.length) {
            return { success: false, error: `No active phases found for ${bankType}` }
        }

        let updatedCount = 0
        let skippedCount = 0

        for (const item of masters) {
            const acc = item.expand?.target_account_id
            // Resolve due date from metadata or field
            const dueDate = Number(acc?.metadata?.due_date || acc?.statement_day || 15)
            // Determine logical period type
            const periodType = dueDate <= 15 ? 'before' : 'after'

            // Find matching phases for THIS bank and period_type
            const matchedPhases = phases.filter((p: any) => 
                p.period_type === periodType
            ).sort((a, b) => (a.cutoff_day || 0) - (b.cutoff_day || 0))

            if (matchedPhases.length === 0) {
                console.warn(`[Migration] No phase found for period ${periodType} on item ${item.id} (${item.receiver_name})`)
                skippedCount++
                continue
            }

            // Find the best phase. If multiple, use the one that covers the account's due date.
            let bestPhase = matchedPhases[0]
            if (matchedPhases.length > 1) {
                // Find first phase where cutoff_day is >= dueDate
                // e.g. If dueDate=18, phase.cutoff_day=20 is a better match than phase.cutoff_day=15
                const match = matchedPhases.find(p => Number(p.cutoff_day) >= dueDate)
                if (match) bestPhase = match
                else bestPhase = matchedPhases[matchedPhases.length - 1] // Fallback to largest cutoff
            }

            const currentPhaseId = item.phase_id
            const currentCutoff = item.cutoff_period

            // Update if phase_id mismatch OR legacy cutoff_period string mismatch
            if (currentPhaseId !== bestPhase.id || currentCutoff !== bestPhase.period_type) {
                console.log(`[Migration] Updating item ${item.id}: ${currentCutoff} -> ${bestPhase.period_type}, Phase ${currentPhaseId} -> ${bestPhase.id}`)
                try {
                    await pocketbaseUpdate('batch_master_items', item.id, {
                        phase_id: bestPhase.id,
                        cutoff_period: bestPhase.period_type // Ensure 2-way sync
                    })
                    updatedCount++
                } catch (err) {
                    console.error(`[Migration] Failed update for item ${item.id}:`, err)
                    skippedCount++
                }
            } else {
                skippedCount++
            }
        }

        revalidatePath('/batch')
        revalidatePath('/batch/settings')
        return { success: true, updatedCount, skippedCount }
    } catch (error: any) {
        console.error('[Migration] Critical failure:', error)
        return { success: false, error: error.message }
    }
}
