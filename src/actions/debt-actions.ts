'use server'

import { pocketbaseCreate, pocketbaseUpdate, pocketbaseDelete, toPocketBaseId } from '@/services/pocketbase/server'
import { revalidatePath } from 'next/cache'
import { syncTransactionToSheet } from '@/services/sheet.service'
import { getCategories } from '@/services/category.service'

/**
 * Handles batch debt repayment.
 * 1. Creates a PARENT transaction (Real Money In to Bank).
 * 2. Creates CHILD transactions (Virtual Allocations to Person's Debt Cycles).
 */
export async function repayBatchDebt(
    personId: string,
    totalAmount: number,
    bankAccountId: string,
    allocations: Record<string, number>, // Maps tagLabel -> amount
    note?: string
) {
    try {
        const pbPersonId = toPocketBaseId(personId, 'people');
        const pbBankAccountId = toPocketBaseId(bankAccountId, 'accounts');
        const repaymentCategory = (await getCategories()).find((category) => {
            const name = (category.name || '').toLowerCase()
            return name === 'repayment' || name === 'thu nợ' || name.includes('repayment') || name.includes('thu no')
        })
        const repaymentCategoryId = repaymentCategory?.id ? toPocketBaseId(repaymentCategory.id, 'categories') : null
        const positiveAllocations = Object.entries(allocations).filter(([, amount]) => amount > 0)
        const allocationSummary = Object.fromEntries(positiveAllocations)

        // 1. Create PARENT Transaction (Money Movement)
        const parentId = toPocketBaseId(crypto.randomUUID(), 'transactions');
        const parentTxn = {
            id: parentId,
            occurred_at: new Date().toISOString(),
            date: new Date().toISOString(),
            note: note ? `Repayment: ${note}` : 'Debt Repayment (Batch)',
            description: note ? `Repayment: ${note}` : 'Debt Repayment (Batch)',
            type: 'income',
            account_id: pbBankAccountId,
            amount: Math.abs(totalAmount),
            person_id: null,
            metadata: {
                is_debt_repayment_parent: true,
                original_person_id: pbPersonId,
                allocation_summary: allocationSummary,
                allocation_cycle_count: positiveAllocations.length,
                is_multi_cycle_allocation: positiveAllocations.length > 1,
            },
            status: 'posted'
        }

        const parent = await pocketbaseCreate<any>('transactions', parentTxn);

        // 2. Create CHILD Transactions (Allocations)
        const childrenToInsert = Object.entries(allocations)
            .filter(([, amount]) => amount > 0)
            .map(([tag, amount]) => ({
                id: toPocketBaseId(crypto.randomUUID(), 'transactions'),
                occurred_at: new Date().toISOString(),
                date: new Date().toISOString(),
                note: `Allocated Repayment for ${tag}`,
                description: `Allocated Repayment for ${tag}`,
                type: 'repayment',
                account_id: pbBankAccountId,
                person_id: pbPersonId,
                amount: Math.abs(amount),
                tag: tag,
                debt_cycle_tag: tag,
                persisted_cycle_tag: tag,
                category_id: repaymentCategoryId,
                linked_transaction_id: parent.id,
                status: 'posted',
                metadata: {
                    is_debt_repayment_child: true,
                    parent_transaction_id: parent.id,
                    debt_cycle_tag: tag,
                }
            }));

        // Handle Excess (Unallocated)
        const allocatedSum = Object.values(allocations).reduce((a, b) => a + b, 0)
        const excess = Math.abs(totalAmount) - allocatedSum

        if (excess > 0.01) {
            childrenToInsert.push({
                id: toPocketBaseId(crypto.randomUUID(), 'transactions'),
                occurred_at: new Date().toISOString(),
                date: new Date().toISOString(),
                note: `Unallocated Repayment (Excess)`,
                description: `Unallocated Repayment (Excess)`,
                type: 'repayment',
                account_id: pbBankAccountId,
                person_id: pbPersonId,
                amount: excess,
                tag: '',
                debt_cycle_tag: '',
                persisted_cycle_tag: '',
                category_id: repaymentCategoryId,
                linked_transaction_id: parent.id,
                status: 'posted',
                metadata: {
                    is_debt_repayment_child: true,
                    is_excess: true,
                    parent_transaction_id: parent.id
                } as any
            })
        }

        // PocketBase sequential creation for children
        const createdChildren = [];
        try {
            for (const child of childrenToInsert) {
                const created = await pocketbaseCreate<any>('transactions', child);
                createdChildren.push(created);

                await syncTransactionToSheet(pbPersonId, {
                    id: created.id,
                    occurred_at: created.occurred_at,
                    note: created.note,
                    tag: created.tag || '',
                    amount: Math.abs(Number(created.amount || 0)),
                    original_amount: Math.abs(Number(created.amount || 0)),
                    type: created.type,
                    status: created.status || 'posted',
                } as any, 'create');
            }
        } catch (childError) {
            console.error("[DB:PB] Child Creation Error:", childError);
            // Rollback parent
            await pocketbaseDelete('transactions', parent.id);
            throw childError;
        }

        // 3. Recalculate Bank Balance
        const { recalculateBalance, getAccountDetails } = await import('@/services/account.service')

        let bankName = "Bank Transfer"
        try {
            const bankAccount = await getAccountDetails(bankAccountId)
            if (bankAccount) bankName = bankAccount.name
        } catch (e) {
            console.warn("Could not fetch bank name for repayment tag", e)
        }

        // Update Parent with Shop Name (for Sync)
        await pocketbaseUpdate('transactions', parent.id, { shop: bankName });
        await recalculateBalance(bankAccountId);

        // 4. Revalidate UI
        revalidatePath('/people')
        revalidatePath(`/people/${personId}`)
        revalidatePath('/transactions')
        revalidatePath('/accounts')

        return { success: true, parentId: parent.id }

    } catch (error: any) {
        console.error("[DB:PB] repayBatchDebt failed:", error)
        return { success: false, error: error.message }
    }
}

/**
 * Create repayment allocation children for an already-created parent transaction.
 * This is used by Transaction Slide flow where parent save is the source of truth.
 */
export async function createRepaymentAllocationChildrenAction(
    parentTransactionId: string,
    personId: string,
    systemAccountId: string,
    allocations: Record<string, number>,
    options?: {
        baseNote?: string
        volunteerRepay?: boolean
    }
) {
    try {
        const pbParentId = toPocketBaseId(parentTransactionId, 'transactions')
        const pbPersonId = toPocketBaseId(personId, 'people')
        const pbSystemAccountId = toPocketBaseId(systemAccountId, 'accounts')
        const repaymentCategory = (await getCategories()).find((category) => {
            const name = (category.name || '').toLowerCase()
            return name === 'repayment' || name === 'thu nợ' || name.includes('repayment') || name.includes('thu no')
        })
        const repaymentCategoryId = repaymentCategory?.id ? toPocketBaseId(repaymentCategory.id, 'categories') : null

        const positiveAllocations = Object.entries(allocations)
            .map(([tag, amount]) => [String(tag), Number(amount || 0)] as const)
            .filter(([, amount]) => amount > 0)

        if (positiveAllocations.length === 0) {
            return { success: true, createdCount: 0 }
        }

        const suffix = options?.volunteerRepay ? ' #Volunteer_Repay #nosync' : ' #nosync'
        const baseNote = options?.baseNote?.trim()

        for (const [tag, amount] of positiveAllocations) {
            const note = baseNote
                ? `${baseNote} | Alloc ${tag}: ${Math.round(amount)}${suffix}`
                : `Allocated Repayment for ${tag}${suffix}`

            await pocketbaseCreate<any>('transactions', {
                id: toPocketBaseId(crypto.randomUUID(), 'transactions'),
                occurred_at: new Date().toISOString(),
                date: new Date().toISOString(),
                note,
                description: note,
                type: 'repayment',
                account_id: pbSystemAccountId,
                person_id: pbPersonId,
                amount: Math.abs(amount),
                tag,
                debt_cycle_tag: tag,
                persisted_cycle_tag: tag,
                category_id: repaymentCategoryId,
                linked_transaction_id: pbParentId,
                status: 'posted',
                metadata: {
                    is_debt_repayment_child: true,
                    parent_transaction_id: pbParentId,
                    debt_cycle_tag: tag,
                    allocation_source: 'transaction_slide',
                    is_no_sync_allocation: true,
                    volunteer_repay: options?.volunteerRepay === true,
                },
            })
        }

        revalidatePath('/transactions')
        revalidatePath('/people')
        revalidatePath(`/people/${personId}`)

        return { success: true, createdCount: positiveAllocations.length }
    } catch (error: any) {
        console.error('[DB:PB] createRepaymentAllocationChildrenAction failed:', error)
        return { success: false, error: error.message }
    }
}
