'use server';

import { pocketbaseGetById, pocketbaseList, pocketbaseUpdate, pocketbaseCreate, pocketbaseDelete, toPocketBaseId } from './server';
import { resolveCashbackPolicy } from '../cashback/policy-resolver';
import { getCashbackCycleRange, parseCashbackConfig, formatIsoCycleTag } from '@/lib/cashback';

type PocketBaseRecord = Record<string, any>;

/**
 * Ensures a cashback cycle exists in PocketBase for the given account and tag.
 */
export async function ensurePocketBaseCycle(
    accountId: string,
    cycleTag: string,
    accountRecord: PocketBaseRecord
): Promise<PocketBaseRecord> {
    const pbAccountId = toPocketBaseId(accountId, 'accounts');

    // 1. Try to fetch existing
    const response = await pocketbaseList<PocketBaseRecord>('cashback_cycles', {
        filter: `account_id='${pbAccountId}' && cycle_tag='${cycleTag}'`,
        perPage: 1
    });

    if (response.items && response.items.length > 0) {
        return response.items[0];
    }

    // 2. Create if not exists
    // Values taken from account record's new columns
    const maxBudget = accountRecord.cb_max_budget ?? null;
    const minSpend = accountRecord.cb_min_spend ?? null;

    // Fix: PocketBase sometimes requires 'id' even if it should be auto-generated, 
    // especially if custom validations are present. We use a deterministic ID based on account + tag.
    const deterministicId = toPocketBaseId(pbAccountId + cycleTag, 'cbcyc');

    const newCycle = await pocketbaseCreate<PocketBaseRecord>('cashback_cycles', {
        id: deterministicId,
        account_id: pbAccountId,
        cycle_tag: cycleTag,
        max_budget: maxBudget,
        min_spend_target: minSpend,
        spent_amount: 0,
        real_awarded: 0,
        virtual_profit: 0
    });

    return newCycle;
}

/**
 * Recomputes a cashback cycle's totals and awards in PocketBase.
 * This is the "Pre-calculate" Part.
 */
export async function recomputePocketBaseCashbackCycle(cycleId: string) {
    const cycle = await pocketbaseGetById<PocketBaseRecord>('cashback_cycles', cycleId);
    if (!cycle) return;

    const account = await pocketbaseGetById<PocketBaseRecord>('accounts', cycle.account_id);
    if (!account) return;

    // 1. Get all eligible transactions for this cycle
    // Note: We use 'status' != 'void' and 'type' in ['expense', 'debt']
    const txnsResp = await pocketbaseList<PocketBaseRecord>('pvl_txn_001', {
        filter: `account_id='${cycle.account_id}' && persisted_cycle_tag='${cycle.cycle_tag}' && status!='void' && (type='expense' || type='debt' || type='invest' || type='transfer')`,
        perPage: 2000, // Increased limit for heavy cycles
        expand: 'category_id'
    });

    const txns = txnsResp.items || [];

    // 2. Calculate current cycle spent
    const totalSpent = txns.reduce((sum, t) => sum + Math.abs(Number(t.amount || 0)), 0);

    let realAwardedTotal = 0;
    let virtualProfitTotal = 0;
    let overflowLossTotal = 0;

    // Group by Rule/Tier for capping (Mirroring Supabase logic)
    const ruleGroupSums: Record<string, { total: number, max: number | null }> = {};

    let totalShared = 0;

    for (const txn of txns) {
        const policy = resolveCashbackPolicy({
            account: {
                id: account.id,
                cb_type: account.cb_type,
                cb_base_rate: account.cb_base_rate,
                cb_max_budget: account.cb_max_budget,
                cb_is_unlimited: account.cb_is_unlimited,
                cb_rules_json: account.cb_rules_json,
                cb_min_spend: account.cb_min_spend,
                cashback_config: account.cashback_config
            },
            categoryId: txn.category_id,
            amount: Math.abs(txn.amount),
            cycleTotals: { spent: totalSpent },
            categoryName: txn.expand?.category_id?.name,
            categorySlug: txn.expand?.category_id?.slug
        });

        const rate = policy.rate;
        const rewardAmount = Math.abs(txn.amount) * rate;
        const newFinalPrice = Math.abs(txn.amount) - rewardAmount;

        // PERSISTENCE: Update transaction with newly resolved cashback values
        // This is critical for UI consistency across all views.
        const currentCbAmount = Number(txn.cashback_amount || 0);
        
        if (Math.abs(currentCbAmount - rewardAmount) > 0.01 || Math.abs((txn.final_price || 0) - newFinalPrice) > 0.01) {
             await pocketbaseUpdate('pvl_txn_001', txn.id, {
                 cashback_amount: rewardAmount,
                 final_price: newFinalPrice,
                 metadata: {
                     ...(txn.metadata || {}),
                     cashback_policy: policy.metadata
                 }
             });
        }

        // Use transaction mode if available, otherwise virtual
        const mode = txn.cashback_mode?.startsWith('real') ? 'real' : 'virtual';

        if (mode === 'real') {
            realAwardedTotal += rewardAmount;
        } else {
            const meta = policy.metadata || {};
            if (meta.ruleId) {
                if (!ruleGroupSums[meta.ruleId]) {
                    ruleGroupSums[meta.ruleId] = { total: 0, max: meta.ruleMaxReward ?? null };
                }
                ruleGroupSums[meta.ruleId].total += rewardAmount;
            } else {
                virtualProfitTotal += rewardAmount;
            }
        }

        // Calculate share part for this transaction (4% of Bill/Spent is standard for this context)
        const sharePercentRaw = Number(txn.cashback_share_percent || 0);
        const sharePercent = sharePercentRaw > 1 ? sharePercentRaw / 100 : sharePercentRaw;
        const shareFixed = Number(txn.cashback_share_fixed || 0);
        const sharedAmount = (sharePercent * Math.abs(txn.amount)) + shareFixed;
        
        // Priority: if a direct share amount is present, use it
        const txShared = (Number(txn.cashback_share_amount) > 0) ? Number(txn.cashback_share_amount) : sharedAmount;
        totalShared += (isNaN(txShared) ? 0 : txShared);
    }

    // Apply Rule Caps
    for (const ruleId in ruleGroupSums) {
        const group = ruleGroupSums[ruleId];
        if (group.max !== null && group.max > 0) {
            const capped = Math.min(group.total, group.max);
            virtualProfitTotal += capped;
            overflowLossTotal += (group.total - capped);
        } else {
            virtualProfitTotal += group.total;
        }
    }

    // Apply Global Max Budget
    const maxBudget = account.cb_max_budget ?? null;
    const isUnlimited = account.cb_is_unlimited === true;

    let finalReal = realAwardedTotal;
    let finalVirtual = virtualProfitTotal;

    if (!isUnlimited && maxBudget !== null) {
        const remainingTotalBudget = Math.max(0, maxBudget - finalReal);
        const virtualEffective = Math.min(finalVirtual, remainingTotalBudget);
        const virtualOverflow = Math.max(0, finalVirtual - virtualEffective);

        finalVirtual = virtualEffective;
        overflowLossTotal += virtualOverflow;
    }

    const metMinSpend = (account.cb_min_spend ?? 0) === 0 || totalSpent >= Number(account.cb_min_spend);
    const isExhausted = !isUnlimited && maxBudget !== null && (finalReal + finalVirtual) >= maxBudget;

    // Determine tier name for the return object
    let tierName = "Dưới 15 triệu"; // Default for VPBank or general
    if (txns.length > 0) {
        // Resolve once more with current total spent to get final tier name
        const firstTx = txns[0];
        const tierPolicy = resolveCashbackPolicy({
            account: account as any,
            categoryId: firstTx.category_id,
            amount: Math.abs(firstTx.amount),
            cycleTotals: { spent: totalSpent },
        });
        tierName = (tierPolicy.metadata.levelName && tierPolicy.metadata.levelName !== "Standard") 
            ? tierPolicy.metadata.levelName 
            : "Dưới 15 triệu";
    }

    // 3. Update Cycle Snapshot
    await pocketbaseUpdate('cashback_cycles', cycle.id, {
        spent_amount: totalSpent,
        real_awarded: finalReal,
        virtual_profit: finalVirtual,
        overflow_loss: overflowLossTotal,
        met_min_spend: metMinSpend,
        is_exhausted: isExhausted,
        max_budget: maxBudget,
        min_spend_target: account.cb_min_spend,
        shared_amount: totalShared,
        total_profit: (finalReal + finalVirtual) - totalShared,
        matched_tier: tierName
    });

    return {
        spent: totalSpent,
        earned: finalReal + finalVirtual,
        shared: totalShared,
        profit: (finalReal + finalVirtual) - totalShared,
        tierName
    };
}

/**
 * Mutation entry point for transactions from PocketBase
 */
export async function upsertPocketBaseTransactionCashback(transactionId: string) {
    // Use source ID mapping if necessary
    const pbTxnId = toPocketBaseId(transactionId, 'pvl_txn_001');
    const txn = await pocketbaseGetById<PocketBaseRecord>('pvl_txn_001', pbTxnId);
    if (!txn) return;

    const account = await pocketbaseGetById<PocketBaseRecord>('accounts', txn.account_id);
    if (!account || account.type !== 'credit_card') return;

    // Resolve Cycle Tag
    const date = new Date(txn.occurred_at || txn.date);
    const config = parseCashbackConfig(account.cashback_config, account.id);
    const cycleRange = getCashbackCycleRange(config, date);
    const cycleTag = formatIsoCycleTag(cycleRange?.end ?? date);

    const cycle = await ensurePocketBaseCycle(account.id, cycleTag, account);

    // Persist cycle tag to transaction if not already set
    if (txn.persisted_cycle_tag !== cycleTag) {
        await pocketbaseUpdate('pvl_txn_001', txn.id, { persisted_cycle_tag: cycleTag });
    }

    // Trigger Recompute
    await recomputePocketBaseCashbackCycle(cycle.id);
}

export async function removePocketBaseTransactionCashback(sourceAccountId: string, cycleTag: string) {
    const pbAccountId = toPocketBaseId(sourceAccountId, 'accounts');

    const cycleResp = await pocketbaseList<PocketBaseRecord>('cashback_cycles', {
        filter: `account_id='${pbAccountId}' && cycle_tag='${cycleTag}'`,
        perPage: 1
    });

    if (cycleResp.items && cycleResp.items.length > 0) {
        await recomputePocketBaseCashbackCycle(cycleResp.items[0].id);
    }
}
