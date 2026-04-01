module.exports = [
"[project]/src/services/pocketbase/cashback-refresh.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"407c10ca1bf3e8ab9639a0811c978c0dcd0fe2397e":"refreshAccountCashback"},"",""] */ __turbopack_context__.s([
    "refreshAccountCashback",
    ()=>refreshAccountCashback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/cashback-sync.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
/**
 * Checks if the cashback_cycles collection has all required fields.
 * If not, it patches the collection to add them.
 */ async function checkAndMigrateCycleCollection() {
    try {
        const collectionId = 'cashback_cycles';
        const coll = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/${collectionId}`);
        const fields = coll.fields || []; // Use fields for PB 0.22+
        const existingNames = fields.map((f)=>f.name);
        const required = [
            {
                name: 'shared_amount',
                type: 'number'
            },
            {
                name: 'total_profit',
                type: 'number'
            },
            {
                name: 'matched_tier',
                type: 'text'
            },
            {
                name: 'overflow_loss',
                type: 'number'
            },
            {
                name: 'met_min_spend',
                type: 'bool'
            },
            {
                name: 'is_exhausted',
                type: 'bool'
            },
            {
                name: 'max_budget',
                type: 'number'
            },
            {
                name: 'min_spend_target',
                type: 'number'
            },
            {
                name: 'is_met_logic',
                type: 'bool'
            }
        ];
        const toAdd = required.filter((f)=>!existingNames.includes(f.name));
        if (toAdd.length > 0) {
            console.log(`[Migration] Patching cashback_cycles with ${toAdd.length} fields...`);
            const updatedFields = [
                ...fields,
                ...toAdd.map((f, i)=>({
                        id: `mig_${Date.now()}_${i}`,
                        name: f.name,
                        type: f.type,
                        system: false,
                        required: false,
                        options: f.type === 'number' ? {
                            noDecimal: false
                        } : {}
                    }))
            ];
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/${coll.id}`, {
                method: 'PATCH',
                body: {
                    fields: updatedFields
                }
            });
            console.log('[Migration] Collection migration SUCCESS.');
        }
    } catch (err) {
        console.error('[Migration Error] Fail:', err.message || err);
    }
}
async function refreshAccountCashback(accountId) {
    // 0. Migration check
    await checkAndMigrateCycleCollection();
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbAccountId);
    if (!account || account.type !== 'credit_card' && account.cb_type === 'none') {
        console.log(`[Cashback Refresh] Account ${pbAccountId} is not a credit card or has no cashback. Skipping.`);
        return {
            success: true,
            message: 'Not a cashback account'
        };
    }
    console.log(`[Cashback Refresh] Starting refresh for account: ${account.name} (${pbAccountId})`);
    // 1. Clean up invalid cycle records (blank account_id)
    try {
        const invalidCycles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
            filter: 'account_id = "" || account_id = "null"',
            perPage: 500
        });
        if (invalidCycles.items.length > 0) {
            console.log(`[Cashback Refresh] Found ${invalidCycles.items.length} invalid cycles. Cleaning up...`);
            for (const c of invalidCycles.items){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('cashback_cycles', c.id);
            }
        }
    } catch (err) {
        console.warn('[Cashback Refresh] Error during invalid cycle cleanup:', err);
    }
    // 2. Fetch all transactions for this account
    const txnsResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
        filter: `account_id = "${pbAccountId}" || to_account_id = "${pbAccountId}"`,
        perPage: 5000,
        sort: '-occurred_at'
    });
    const txns = txnsResp.items || [];
    console.log(`[Cashback Refresh] Processing ${txns.length} transactions...`);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const affectedCycleTags = new Set();
    // 3. Update Tags and Persisted Cycle Tags for each transaction
    for (const txn of txns){
        const date = new Date(txn.occurred_at || txn.date);
        // Calculate correct tags
        const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const resolvedCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(cycleRange?.end ?? date);
        // Standard tag (YYYY-MM)
        const standardTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(resolvedCycleTag);
        const updates = {};
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, updates);
        }
        if (resolvedCycleTag) {
            affectedCycleTags.add(resolvedCycleTag);
        }
    }
    console.log(`[Cashback Refresh] Affected cycles: ${Array.from(affectedCycleTags).join(', ')}`);
    let totalEarned = 0;
    let totalShared = 0;
    let totalProfit = 0;
    let lastCycleStats = null;
    // 4. Ensure Cycle records exist and Recompute
    for (const tag of affectedCycleTags){
        const cycle = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensurePocketBaseCycle"])(pbAccountId, tag, account);
        // Double check the account_id is correct in the cycle record (in case of legacy bugs)
        if (cycle.account_id !== pbAccountId) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('cashback_cycles', cycle.id, {
                account_id: pbAccountId
            });
        }
        const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recomputePocketBaseCashbackCycle"])(cycle.id);
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    refreshAccountCashback
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(refreshAccountCashback, "407c10ca1bf3e8ab9639a0811c978c0dcd0fe2397e", null);
}),
];

//# sourceMappingURL=src_services_pocketbase_cashback-refresh_service_ts_7fdbb687._.js.map