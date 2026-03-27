'use server';

import { pocketbaseGetById, pocketbaseList, pocketbaseUpdate, pocketbaseDelete, toPocketBaseId, pocketbaseCreate } from './server';
import { recomputePocketBaseCashbackCycle, ensurePocketBaseCycle } from './cashback-sync.service';
import { getCashbackCycleRange, parseCashbackConfig, formatIsoCycleTag } from '@/lib/cashback';
import { normalizeMonthTag } from '@/lib/month-tag';
import { pocketbaseRequest } from './server';

/**
 * Checks if the cashback_cycles collection has all required fields.
 * If not, it patches the collection to add them.
 */
async function checkAndMigrateCycleCollection() {
    try {
        const collectionId = 'cashback_cycles';
        const coll = await pocketbaseRequest<any>(`/api/collections/${collectionId}`);
        const fields = coll.fields || []; // Use fields for PB 0.22+
        const existingNames = fields.map((f: any) => f.name);
        
        const required = [
          { name: 'shared_amount', type: 'number' },
          { name: 'total_profit', type: 'number' },
          { name: 'matched_tier', type: 'text' },
          { name: 'overflow_loss', type: 'number' },
          { name: 'met_min_spend', type: 'bool' },
          { name: 'is_exhausted', type: 'bool' },
          { name: 'max_budget', type: 'number' },
          { name: 'min_spend_target', type: 'number' },
          { name: 'is_met_logic', type: 'bool' }
        ];

        const toAdd = required.filter(f => !existingNames.includes(f.name));
        
        if (toAdd.length > 0) {
            console.log(`[Migration] Patching cashback_cycles with ${toAdd.length} fields...`);
            const updatedFields = [...fields, ...toAdd.map((f, i) => ({
                id: `mig_${Date.now()}_${i}`,
                name: f.name,
                type: f.type,
                system: false,
                required: false,
                options: f.type === 'number' ? { noDecimal: false } : {}
            }))];

            await pocketbaseRequest(`/api/collections/${coll.id}`, {
                method: 'PATCH',
                body: { fields: updatedFields }
            });
            console.log('[Migration] Collection migration SUCCESS.');
        }
    } catch (err: any) {
        console.error('[Migration Error] Fail:', err.message || err);
    }
}

/**
 * Deep sync and refresh all cashback cycles and transaction tags for an account.
 * This fixes cases where transactions were assigned to the wrong cycle.
 */
export async function refreshAccountCashback(accountId: string) {
    // 0. Migration check
    await checkAndMigrateCycleCollection();

    const pbAccountId = toPocketBaseId(accountId, 'accounts');
    const account = await pocketbaseGetById<any>('accounts', pbAccountId);

    if (!account || (account.type !== 'credit_card' && account.cb_type === 'none')) {
        console.log(`[Cashback Refresh] Account ${pbAccountId} is not a credit card or has no cashback. Skipping.`);
        return { success: true, message: 'Not a cashback account' };
    }

    console.log(`[Cashback Refresh] Starting refresh for account: ${account.name} (${pbAccountId})`);

    // 1. Clean up invalid cycle records (blank account_id)
    try {
        const invalidCycles = await pocketbaseList<any>('cashback_cycles', {
            filter: 'account_id = "" || account_id = "null"',
            perPage: 500
        });
        
        if (invalidCycles.items.length > 0) {
            console.log(`[Cashback Refresh] Found ${invalidCycles.items.length} invalid cycles. Cleaning up...`);
            for (const c of invalidCycles.items) {
                await pocketbaseDelete('cashback_cycles', c.id);
            }
        }
    } catch (err) {
        console.warn('[Cashback Refresh] Error during invalid cycle cleanup:', err);
    }

    // 2. Fetch all transactions for this account
    const txnsResp = await pocketbaseList<any>('pvl_txn_001', {
        filter: `account_id = "${pbAccountId}" || to_account_id = "${pbAccountId}"`,
        perPage: 5000,
        sort: '-occurred_at'
    });

    const txns = txnsResp.items || [];
    console.log(`[Cashback Refresh] Processing ${txns.length} transactions...`);

    const config = parseCashbackConfig(account.cashback_config, account.id);
    const affectedCycleTags = new Set<string>();

    // 3. Update Tags and Persisted Cycle Tags for each transaction
    for (const txn of txns) {
        const date = new Date(txn.occurred_at || txn.date);
        
        // Calculate correct tags
        const cycleRange = getCashbackCycleRange(config, date);
        const resolvedCycleTag = formatIsoCycleTag(cycleRange?.end ?? date);
        
        // Standard tag (YYYY-MM)
        const standardTag = normalizeMonthTag(resolvedCycleTag);

        const updates: any = {};
        let needsUpdate = false;

        if (txn.persisted_cycle_tag !== resolvedCycleTag) {
            updates.persisted_cycle_tag = resolvedCycleTag;
            needsUpdate = true;
        }

        // Only update 'tag' if it's currently used for sorting/filtering and is obviously wrong
        // In this project, 'tag' usually follows 'YYYY-MM'
        if (txn.tag !== standardTag && txn.tag !== resolvedCycleTag) {
             // We respect existing tags unless they are way off? 
             // Actually, for Credit Cards, the 'tag' should follow the cycle.
             updates.tag = resolvedCycleTag; 
             needsUpdate = true;
        }

        if (needsUpdate) {
            await pocketbaseUpdate('pvl_txn_001', txn.id, updates);
        }

        if (resolvedCycleTag) {
            affectedCycleTags.add(resolvedCycleTag);
        }
    }

    console.log(`[Cashback Refresh] Affected cycles: ${Array.from(affectedCycleTags).join(', ')}`);

    let totalEarned = 0;
    let totalShared = 0;
    let totalProfit = 0;
    let lastCycleStats: any = null;

    // 4. Ensure Cycle records exist and Recompute
    for (const tag of affectedCycleTags) {
        const cycle = await ensurePocketBaseCycle(pbAccountId, tag, account);
        
        // Double check the account_id is correct in the cycle record (in case of legacy bugs)
        if (cycle.account_id !== pbAccountId) {
            await pocketbaseUpdate('cashback_cycles', cycle.id, { account_id: pbAccountId });
        }

        const stats = await recomputePocketBaseCashbackCycle(cycle.id);
        if (stats) {
            totalEarned += stats.earned;
            totalShared += stats.shared;
            totalProfit += stats.profit;
            lastCycleStats = stats; // Keep the latest (usually most current)
        }
    }

    return { 
        success: true, 
        processedTransactions: txns.length,
        processedCycles: affectedCycleTags.size,
        stats: {
            earned: totalEarned,
            shared: totalShared,
            profit: totalProfit,
            current: lastCycleStats
        }
    };
}
