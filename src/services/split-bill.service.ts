"use server";

import { CreateTransactionInput, normalizeAmountForType } from "./transaction.service";
import { revalidatePath } from "next/cache";
import { 
    pocketbaseCreate, 
    pocketbaseUpdate, 
    pocketbaseDelete, 
    pocketbaseList,
    toPocketBaseId 
} from "./pocketbase/server";

export type SplitShare = {
    person_id: string | null; // null for "Me"
    amount: number; // This is the FINAL SHARE (after voucher) effectively
    // Extended fields
    share_before?: number;
    voucher_amount?: number;
    advance_amount?: number;
    paid_by?: string;
    note?: string;
    is_my_share?: boolean;
};

export type SplitBillInput = {
    parent_transaction: CreateTransactionInput;
    shares: SplitShare[];
    split_method: 'equal' | 'custom';
};

export async function validateSplitIntegrity(
    parentAmount: number,
    shares: SplitShare[]
): Promise<{ valid: boolean; diff: number }> {
    // Parent Amount is the ACTUAL PAID amount (Net).
    // So usually: Sum(FinalShares) - Sum(Advance) = ParentAmount?
    // OR: ParentAmount is just the connection to bank.
    // Logic:
    // If I paid 800k (Parent).
    // A Share 400k (owed).
    // B Share 400k (me).
    // Sum Shares = 800k. Match.
    //
    // If A paid 100k in advance?
    // Then I only paid 700k? Or I paid 800k and A paid 100k separately?
    // Usually "Advance Payment" in this UI means "A paid partly for the bill".
    // If Bill is 1M. Voucher 0.
    // A share 500k. B share 500k.
    // A paid 100k cash. I paid 900k card.
    // UI Parent Transaction Amount = 900k (what I enter in form).
    // A Debt = 500k - 100k = 400k.
    // B Expense = 500k.
    // Sum Children = 900k. Match.
    //
    // So: Sum(Share.amount) SHOULD match Parent.Amount.
    // (Assuming Share.amount passed here IS (finalShare - advanceAmount)).

    const totalShare = shares.reduce((sum, s) => sum + s.amount, 0);
    // Allow small float diff
    const diff = Math.abs(parentAmount - totalShare);
    return {
        valid: diff < 1.0, // Tolerance of 1 unit (e.g. 1 dong)
        diff
    };
}

export async function createSplitBill(input: SplitBillInput) {
    const { parent_transaction, shares, split_method } = input;

    // 1. Validate
    const parentAbsAmount = Math.abs(parent_transaction.amount);
    const { valid, diff } = await validateSplitIntegrity(parentAbsAmount, shares);

    if (!valid) {
        throw new Error(`Split sum mismatch. Parent: ${parentAbsAmount}, Shares (Sum): ${parentAbsAmount - diff} (Diff: ${diff})`);
    }

    if (shares.length < 2) {
        throw new Error("Split requires at least 2 participants");
    }

    // 2. Create Parent Transaction (uses service which is already PB-enabled)
    const parentMetadata = {
        ...((parent_transaction.metadata as Record<string, any>) || {}),
        is_split_bill: true,
        split_method,
        split_participants_count: shares.length,
        split_shares: shares,
        my_share_amount: shares.find(s => !s.person_id)?.amount || 0
    };

    const { createTransaction: createTxnService } = await import("./transaction.service");
    const parentId = await createTxnService({
        ...parent_transaction,
        metadata: parentMetadata
    });

    if (!parentId) throw new Error("Failed to create parent transaction");

    // 3. Create Children in PocketBase
    const childrenPromises = shares.map(async (share) => {
        const sign = parent_transaction.amount < 0 ? -1 : 1;
        const childAmount = Math.abs(share.amount) * sign;
        const isMyShare = !share.person_id;
        const type = isMyShare ? parent_transaction.type : 'debt';

        const childMeta = {
            is_split_share: true,
            is_my_share: isMyShare,
            is_receivable: !isMyShare,
            parent_id: parentId,
            share_before: share.share_before,
            voucher_amount: share.voucher_amount,
            advance_amount: share.advance_amount,
            paid_by: share.paid_by,
            original_note: share.note,
            source: 'split_logic_v2'
        };

        const notePrefix = isMyShare ? "My share" : `Split share for ${share.person_id ? 'friend' : 'me'}`;
        const finalNote = share.note ? `${notePrefix}: ${share.note}` : (isMyShare ? parent_transaction.note : `Split share for ${parent_transaction.note || 'bill'}`);

        // Map to PocketBase pvl_txn_001 record
        const pbChildPayload = {
            date: parent_transaction.occurred_at,
            description: finalNote,
            status: 'posted',
            amount: childAmount,
            type: type,
            account_id: toPocketBaseId(parent_transaction.source_account_id, 'accounts'),
            category_id: isMyShare ? toPocketBaseId(parent_transaction.category_id || '', 'categories') : '',
            person_id: toPocketBaseId(share.person_id || '', 'people'),
            parent_transaction_id: parentId,
            metadata: childMeta,
            cashback_amount: 0,
            original_amount: childAmount,
            final_price: childAmount,
            is_installment: false
        };

        return pocketbaseCreate('pvl_txn_001', pbChildPayload);
    });

    await Promise.all(childrenPromises);
    return parentId;
}

export async function updateSplitBill(parentId: string, input: SplitBillInput) {
    const { parent_transaction, shares } = input;
    const pbParentId = toPocketBaseId(parentId, 'pvl_txn_001');

    // 1. Update Parent
    const parentMetadata = {
        ...((parent_transaction.metadata as Record<string, any>) || {}),
        is_split_bill: true,
        split_participants_count: shares.length,
        split_shares: shares,
        my_share_amount: shares.find(s => !s.person_id)?.amount || 0
    };

    const { updateTransaction: updateTxnService } = await import("./transaction.service");
    await updateTxnService(parentId, {
        ...parent_transaction,
        metadata: parentMetadata
    });

    // 2. Delete existing children in PB
    const existingChildren = await pocketbaseList<any>('pvl_txn_001', {
        filter: `parent_transaction_id='${pbParentId}'`
    });
    
    for (const child of existingChildren.items) {
        await pocketbaseDelete('pvl_txn_001', child.id);
    }

    // 3. Re-create children
    const childrenPromises = shares.map(async (share) => {
        const sign = parent_transaction.amount < 0 ? -1 : 1;
        const childAmount = Math.abs(share.amount) * sign;
        const isMyShare = !share.person_id;
        const type = isMyShare ? parent_transaction.type : 'debt';

        const childMeta = {
            is_split_share: true,
            is_my_share: isMyShare,
            is_receivable: !isMyShare,
            parent_id: pbParentId,
            share_before: share.share_before,
            voucher_amount: share.voucher_amount,
            advance_amount: share.advance_amount,
            paid_by: share.paid_by,
            original_note: share.note,
            source: 'split_logic_v2'
        };

        const notePrefix = isMyShare ? "My share" : `Split share for ${share.person_id ? 'friend' : 'me'}`;
        const finalNote = share.note ? `${notePrefix}: ${share.note}` : (isMyShare ? parent_transaction.note : `Split share for ${parent_transaction.note || 'bill'}`);

        const pbChildPayload = {
            date: parent_transaction.occurred_at,
            description: finalNote,
            status: 'posted',
            amount: childAmount,
            type: type,
            account_id: toPocketBaseId(parent_transaction.source_account_id, 'accounts'),
            category_id: isMyShare ? toPocketBaseId(parent_transaction.category_id || '', 'categories') : '',
            person_id: toPocketBaseId(share.person_id || '', 'people'),
            parent_transaction_id: pbParentId,
            metadata: childMeta,
            cashback_amount: 0,
            original_amount: childAmount,
            final_price: childAmount,
            is_installment: false
        };

        return pocketbaseCreate('pvl_txn_001', pbChildPayload);
    });

    await Promise.all(childrenPromises);
    return true;
}

export async function deleteSplitBill(parentId: string) {
    const pbParentId = toPocketBaseId(parentId, 'pvl_txn_001');
    
    // Delete children first manually to be safe (no cascade in simple fetch setup)
    const existingChildren = await pocketbaseList<any>('pvl_txn_001', {
        filter: `parent_transaction_id='${pbParentId}'`
    });
    
    for (const child of existingChildren.items) {
        await pocketbaseDelete('pvl_txn_001', child.id);
    }
    
    // Use transaction service to delete parent (handles side effects, revalidation)
    const { deleteTransaction: deleteTxnService } = await import("./transaction.service");
    return deleteTxnService(parentId);
}
