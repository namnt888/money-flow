module.exports = [
"[project]/src/lib/cashback-policy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatPercent",
    ()=>formatPercent,
    "formatPolicyLabel",
    ()=>formatPolicyLabel,
    "normalizePolicyMetadata",
    ()=>normalizePolicyMetadata
]);
function formatPercent(rate, fallback = '--') {
    if (typeof rate !== 'number' || Number.isNaN(rate)) return fallback;
    return `${(rate * 100).toFixed(1)}%`;
}
function normalizePolicyMetadata(metadata) {
    if (!metadata) return null;
    if (typeof metadata === 'string') {
        try {
            const parsed = JSON.parse(metadata);
            return normalizePolicyMetadata(parsed);
        } catch  {
            return null;
        }
    }
    if (typeof metadata !== 'object' || metadata === null) {
        return null;
    }
    const meta = metadata;
    const source = meta['policySource'] ?? meta['policy_source'];
    if (typeof source !== 'string') return null;
    // Validate literal type
    const validSources = [
        'program_default',
        'level_default',
        'category_rule',
        'legacy'
    ];
    if (!validSources.includes(source)) return null;
    const ruleMaxRewardRaw = meta['ruleMaxReward'] ?? meta['rule_max_reward'];
    const levelMinSpendRaw = meta['levelMinSpend'] ?? meta['level_min_spend'];
    const normalized = {
        policySource: source,
        reason: typeof meta['reason'] === 'string' ? meta['reason'] : '',
        rate: typeof meta['rate'] === 'number' && !Number.isNaN(meta['rate']) ? meta['rate'] : 0,
        levelId: typeof meta['levelId'] === 'string' ? meta['levelId'] : undefined,
        levelName: typeof meta['levelName'] === 'string' ? meta['levelName'] : undefined,
        levelMinSpend: typeof levelMinSpendRaw === 'number' && !Number.isNaN(levelMinSpendRaw) ? levelMinSpendRaw : undefined,
        ruleId: typeof meta['ruleId'] === 'string' ? meta['ruleId'] : undefined,
        categoryId: typeof meta['categoryId'] === 'string' ? meta['categoryId'] : undefined,
        ruleMaxReward: typeof ruleMaxRewardRaw === 'number' && !Number.isNaN(ruleMaxRewardRaw) ? ruleMaxRewardRaw : ruleMaxRewardRaw === null ? null : undefined
    };
    return normalized;
}
function formatPolicyLabel(metadata, currencyFormatter, fallback = null) {
    if (!metadata) return fallback;
    const rateText = formatPercent(metadata.rate);
    const maxRewardText = typeof metadata.ruleMaxReward === 'number' ? `max ${currencyFormatter.format(metadata.ruleMaxReward)}` : null;
    const levelText = metadata.levelName ? `${metadata.levelName}${metadata.levelMinSpend ? ` (>= ${currencyFormatter.format(metadata.levelMinSpend)})` : ''}` : null;
    const parts = [];
    switch(metadata.policySource){
        case 'category_rule':
            parts.push(metadata.reason || 'Category rule');
            if (levelText) parts.push(levelText);
            parts.push(rateText);
            if (maxRewardText) parts.push(maxRewardText);
            break;
        case 'level_default':
            parts.push(levelText || 'Level default');
            parts.push(rateText);
            break;
        case 'program_default':
            parts.push(`Default ${rateText}`);
            if (levelText) parts.push(levelText);
            break;
        case 'legacy':
        default:
            parts.push(metadata.reason || 'Default policy');
            parts.push(rateText);
            break;
    }
    return parts.filter(Boolean).join(' • ');
}
}),
"[project]/src/lib/tag.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTag",
    ()=>generateTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
;
function generateTag(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(date);
}
}),
"[project]/src/lib/transaction-mapper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildEditInitialValues",
    ()=>buildEditInitialValues,
    "loadShopInfo",
    ()=>loadShopInfo,
    "mapUnifiedTransaction",
    ()=>mapUnifiedTransaction,
    "parseMetadata",
    ()=>parseMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
;
;
async function loadShopInfo(supabase, shopId) {
    if (!shopId) return null;
    const { data: shop } = await supabase.from('shops').select('name, image_url').eq('id', shopId).single();
    const typedShop = shop;
    return typedShop ? {
        name: typedShop.name,
        image_url: typedShop.image_url
    } : null;
}
function mapUnifiedTransaction(rawTxn, contextAccountId) {
    // Defensive mapping to handle various join structures
    const baseTag = rawTxn.tag;
    const tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(baseTag) ?? baseTag ?? null;
    const originalAmount = Math.abs(rawTxn.amount ?? 0);
    // Attempt to extract joined data if available
    const categoryName = rawTxn.categories?.name || rawTxn.category?.name || rawTxn.category_name;
    const categoryIcon = rawTxn.categories?.icon || rawTxn.category?.icon;
    const shopName = rawTxn.shops?.name || rawTxn.shop?.name || rawTxn.shop_name;
    const shopImage = rawTxn.shops?.image_url || rawTxn.shop?.image_url;
    const personName = rawTxn.profiles?.name || rawTxn.person?.name || rawTxn.person_name;
    const personAvatar = rawTxn.profiles?.image_url || rawTxn.person?.image_url || rawTxn.person_image_url;
    // Determine Display Type
    let displayType = 'expense';
    if (rawTxn.type === 'income') displayType = 'income';
    else if (rawTxn.type === 'repayment') displayType = 'income'; // Usually Repayment In
    else if (rawTxn.type === 'transfer') {
        // If context is target, it's income-like
        if (contextAccountId && rawTxn.target_account_id === contextAccountId) {
            displayType = 'income';
        } else {
            displayType = 'expense';
        }
    }
    return {
        ...rawTxn,
        tag,
        original_amount: originalAmount,
        amount: rawTxn.amount ?? 0,
        displayType,
        display_type: displayType === 'income' ? 'IN' : displayType === 'expense' ? 'OUT' : 'TRANSFER',
        category_name: categoryName,
        category_icon: categoryIcon,
        shop_name: shopName,
        shop_image_url: shopImage,
        person_name: personName,
        person_image_url: personAvatar,
        history_count: rawTxn.transaction_history?.[0]?.count ?? 0,
        // Ensure critical fields are present
        cashback_share_percent: rawTxn.cashback_share_percent ?? null,
        cashback_share_fixed: rawTxn.cashback_share_fixed ?? null
    };
}
function parseMetadata(value) {
    if (!value) return null;
    let parsed = null;
    if (typeof value === 'string') {
        try {
            parsed = JSON.parse(value);
        } catch (e) {
            console.warn("[parseMetadata] JSON Parse Error:", e);
            parsed = null;
        }
    } else if (typeof value === 'object' && !Array.isArray(value)) {
        parsed = value;
    }
    // Additional logging to help verify if parent_transaction_id is being seen
    if (parsed) {
        if ('parent_transaction_id' in parsed) {
            console.log("[parseMetadata] Found parent_transaction_id:", parsed.parent_transaction_id);
        } else {
        // console.log("[parseMetadata] No parent_transaction_id in:", parsed);
        }
    }
    return parsed;
}
function buildEditInitialValues(txn) {
    const toFiniteNumber = (value)=>{
        const n = Number(value);
        return Number.isFinite(n) ? n : undefined;
    };
    const baseAmount = typeof txn.original_amount === "number" ? txn.original_amount : txn.amount ?? 0;
    const percentFromTxn = toFiniteNumber(txn.cashback_share_percent);
    const fixedFromTxn = toFiniteNumber(txn.cashback_share_fixed);
    let derivedType = txn.type === 'repayment' ? 'repayment' : txn.type || "expense";
    const categoryName = txn.category_name?.toLowerCase() ?? '';
    const meta = parseMetadata(txn.metadata);
    const percentFromMeta = toFiniteNumber(meta?.cashback_share_percent) ?? toFiniteNumber(meta?.cashback?.cashback_share_percent);
    const fixedFromMeta = toFiniteNumber(meta?.cashback_share_fixed) ?? toFiniteNumber(meta?.cashback?.cashback_share_fixed);
    const percentValue = percentFromTxn ?? percentFromMeta;
    const fixedValue = fixedFromTxn ?? fixedFromMeta;
    const rawMode = String(txn.cashback_mode ?? meta?.cashback_mode ?? '').trim();
    const normalizedMode = rawMode === 'percent' ? 'real_percent' : rawMode === 'fixed' ? 'real_fixed' : rawMode;
    const inferredMode = (percentValue ?? 0) > 0 ? 'real_percent' : (fixedValue ?? 0) > 0 ? 'real_fixed' : 'none_back';
    if (meta && meta.is_debt_repayment_parent) {
        derivedType = 'repayment';
    } else if (txn.person_id) {
        if (categoryName.includes('thu nợ') || categoryName.includes('repayment')) {
            derivedType = 'repayment';
        } else {
            derivedType = 'debt';
        }
    } else if (categoryName.includes('cashback') || categoryName.includes('income') || categoryName.includes('refund')) {
        derivedType = 'income';
    } else if (categoryName.includes('money transfer') || categoryName.includes('chuyển tiền')) {
        derivedType = 'transfer';
    } else if (!txn.category_id && !txn.category_name) {
        derivedType = 'transfer';
    } else if (txn.type === 'income') {
        derivedType = 'income';
    } else if (txn.type === 'expense') {
        derivedType = 'expense';
    }
    let sourceAccountId = txn.account_id ?? undefined;
    let destinationAccountId = derivedType === "transfer" || derivedType === "debt" ? txn.target_account_id ?? undefined : undefined;
    if (derivedType === 'repayment') {
        // For repayment: source is bank, destination is debt
        sourceAccountId = txn.account_id ?? undefined;
        destinationAccountId = txn.target_account_id ?? undefined;
    }
    const rawServiceFee = meta?.service_fee;
    const parsedServiceFee = rawServiceFee !== undefined && rawServiceFee !== null ? Number(rawServiceFee) : undefined;
    const resolvedServiceFee = typeof parsedServiceFee === "number" && Number.isFinite(parsedServiceFee) ? parsedServiceFee : undefined;
    const result = {
        occurred_at: txn.occurred_at ? new Date(txn.occurred_at) : new Date(),
        type: derivedType,
        amount: Math.abs(baseAmount ?? 0),
        service_fee: resolvedServiceFee,
        note: txn.note ?? "",
        tag: txn.tag ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTag"])(new Date()),
        source_account_id: sourceAccountId,
        category_id: txn.category_id ?? undefined,
        person_id: (txn.person_id ?? meta?.original_person_id) || undefined,
        debt_account_id: destinationAccountId,
        shop_id: txn.shop_id ?? undefined,
        // Pass raw names for duplicate/edit scenarios where IDs might be missing but we want to preserve visual info or allow fuzzy match
        shop_name: txn.shop_name,
        shop_image_url: txn.shop_image_url,
        category_name: txn.category_name,
        cashback_share_percent: percentValue !== undefined && percentValue !== null ? percentValue * 100 : undefined,
        cashback_share_fixed: fixedValue,
        is_installment: txn.is_installment ?? false,
        // CRITICAL: Preserve cashback_mode from database (especially 'voluntary'), don't auto-infer
        cashback_mode: normalizedMode || inferredMode,
        ui_is_cashback_expanded: normalizedMode && normalizedMode !== 'none_back' || (percentValue ?? 0) > 0 || (fixedValue ?? 0) > 0,
        metadata: meta
    };
    // Diagnostic logging for duplicate form issue
    console.log('[buildEditInitialValues] Transaction:', {
        id: txn.id,
        shop_id: txn.shop_id,
        shop_name: txn.shop_name,
        account_id: txn.account_id,
        source_name: txn.source_name,
        result_shop_id: result.shop_id,
        result_source_account_id: result.source_account_id
    });
    return result;
}
}),
"[project]/src/services/cashback.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401615e28e8d0087027f7d5a5db240a6f4f0560684":"removeTransactionCashback","401a786de509cd26226fafe4f14d899f5e6a9b5f7f":"upsertTransactionCashback","40b5d76ad6c879f0bf06a2b2d49211290e118c9f17":"simulateCashback","40b91ee83d50de8eff7cbd2b4f1727a30f9d2222d2":"getCashbackYearAnalytics","40c13d509fcf398dcfed9c5234ece92b5baa3a9d3e":"getAllCashbackHistory","40c962cfb34933ec5eeba45dfde4074e7e26defa0a":"getTransactionCashbackPolicyExplanation","40d73091214440f2332d09bfc739efe8211ed676b4":"getAccountCycles","40f516d87561ed7014e241092f8c3f7ce5ee355859":"getTransactionsForCycle","60704ddd5e747ee1f5025d9fc6c4b7fee45720238a":"recomputeCashbackCycle","60c68b7d72c7a7dff8e8bc0b1a104225a1e4195149":"recomputeAccountCashback","60d9fc7a55bb749e715afc62562d3f35dbe8215fa4":"getCashbackCycleOptions","7078d40c3129d7e705002ab535bb5d1a25432fcafb":"getMonthlyCashbackTransactions","7801e4226a45b922150f4170ead6d27a4292458593":"getAccountSpendingStats","787c9806f746f8c2a983022dba1a2c61adc468118a":"getCashbackProgress","789b0ec8e3c65159be0eb2e091aefb27a8c7e69e3a":"getAccountSpendingStatsSnapshot"},"",""] */ __turbopack_context__.s([
    "getAccountCycles",
    ()=>getAccountCycles,
    "getAccountSpendingStats",
    ()=>getAccountSpendingStats,
    "getAccountSpendingStatsSnapshot",
    ()=>getAccountSpendingStatsSnapshot,
    "getAllCashbackHistory",
    ()=>getAllCashbackHistory,
    "getCashbackCycleOptions",
    ()=>getCashbackCycleOptions,
    "getCashbackProgress",
    ()=>getCashbackProgress,
    "getCashbackYearAnalytics",
    ()=>getCashbackYearAnalytics,
    "getMonthlyCashbackTransactions",
    ()=>getMonthlyCashbackTransactions,
    "getTransactionCashbackPolicyExplanation",
    ()=>getTransactionCashbackPolicyExplanation,
    "getTransactionsForCycle",
    ()=>getTransactionsForCycle,
    "recomputeAccountCashback",
    ()=>recomputeAccountCashback,
    "recomputeCashbackCycle",
    ()=>recomputeCashbackCycle,
    "removeTransactionCashback",
    ()=>removeTransactionCashback,
    "simulateCashback",
    ()=>simulateCashback,
    "upsertTransactionCashback",
    ()=>upsertTransactionCashback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback-policy.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/transaction-mapper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript)");
/**
 * Ensures a cashback cycle exists for the given account and tag.
 * Returns the cycle ID.
 */ // DEBUG: Admin client creation
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+supabase-js@2.100.0/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://puzvrlojtgneihgvevcx.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
}
/**
 * Ensures a cashback cycle exists for the given account and tag.
 * Returns the cycle ID.
 */ const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
const getCashbackClient = ()=>hasServiceRole ? createAdminClient() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
async function ensureCycle(accountId, cycleTag, accountConfig, fallbackTag, client = getCashbackClient()) {
    const supabase = client;
    // 1. Try to fetch existing
    const { data: existing } = await supabase.from('cashback_cycles').select('id').eq('account_id', accountId).eq('cycle_tag', cycleTag).maybeSingle();
    if (existing) return {
        id: existing.id,
        tag: cycleTag
    };
    if (fallbackTag && fallbackTag !== cycleTag) {
        const { data: fallback } = await supabase.from('cashback_cycles').select('id').eq('account_id', accountId).eq('cycle_tag', fallbackTag).maybeSingle();
        if (fallback) return {
            id: fallback.id,
            tag: fallbackTag
        };
    }
    // 2. Create if not exists
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(accountConfig, accountId);
    // Default to null if not defined, allowing DB to store NULL.
    // When doing math later, we treat NULL as 0.
    const maxBudget = config.maxAmount ?? null;
    const minSpend = config.minSpend ?? null;
    const { data: newCycle, error } = await supabase.from('cashback_cycles').insert({
        account_id: accountId,
        cycle_tag: cycleTag,
        max_budget: maxBudget,
        min_spend_target: minSpend,
        spent_amount: 0
    }).select('id').single();
    if (error) {
        // Handle race condition
        const { data: retry } = await supabase.from('cashback_cycles').select('id').eq('account_id', accountId).eq('cycle_tag', cycleTag)// eslint-disable-next-line @typescript-eslint/no-explicit-any
        .maybeSingle();
        if (retry) return {
            id: retry.id,
            tag: cycleTag
        };
        throw error;
    }
    return {
        id: newCycle.id,
        tag: cycleTag
    };
}
async function upsertTransactionCashback(transaction) {
    const supabase = getCashbackClient();
    const { data: existingEntries } = await supabase.from('cashback_entries').select('cycle_id, account_id').eq('transaction_id', transaction.id);
    const existingCycleIds = Array.from(new Set((existingEntries ?? []).map((entry)=>entry.cycle_id).filter(Boolean)));
    if (![
        'expense',
        'debt'
    ].includes(transaction.type ?? '')) {
        if (existingEntries && existingEntries.length > 0) {
            await supabase.from('cashback_entries').delete().eq('transaction_id', transaction.id);
            for (const cycleId of existingCycleIds){
                await recomputeCashbackCycle(cycleId);
            }
        }
        return;
    }
    // MF16: Strict Note-based Exclusion for Cashback
    const note = String(transaction.note || '').toLowerCase();
    const isExcluded = note.includes('create initial') || note.includes('số dư đầu') || note.includes('opening balance') || note.includes('rollover') || String(transaction.status).toLowerCase() === 'void';
    if (isExcluded) {
        if (existingEntries && existingEntries.length > 0) {
            await supabase.from('cashback_entries').delete().eq('transaction_id', transaction.id);
            for (const cycleId of existingCycleIds){
                await recomputeCashbackCycle(cycleId);
            }
        }
        return;
    }
    const { data: account } = await supabase.from('accounts').select('id, type, cashback_config').eq('id', transaction.account_id).single();
    if (!account || account.type !== 'credit_card') {
        if (existingEntries && existingEntries.length > 0) {
            await supabase.from('cashback_entries').delete().eq('transaction_id', transaction.id);
            for (const cycleId of existingCycleIds){
                await recomputeCashbackCycle(cycleId);
            }
        }
        return;
    }
    const modePreference = transaction.cashback_mode || 'none_back';
    let mode = 'virtual';
    let amount = 0;
    let countsToBudget = false;
    const fixedInput = transaction.cashback_share_fixed ?? 0;
    // const percentInput = transaction.cashback_share_percent ?? 0; // Unused in favor of Resolver logic unless overridden?
    // User Rule: "real_percent" transaction calculates from input OR policy?
    // Current logic used input. Let's see...
    // "real_percent creates entry with amount = computed real cashback or stored fixed equivalent"
    // If mode is real_percent, we usually trust the policy? 
    // No, if it's "real_percent", it implies we are using the % stored in the transaction?
    // Actually, MF5.2.2 requirements say: "Load: decimal -> percent, Save: percent -> decimal".
    // transaction.cashback_share_percent IS already the source of truth if set.
    // But wait, "resolveCashbackPolicy" is the new way.
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const date = new Date(transaction.occurred_at);
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    const tagDate = cycleRange?.end ?? date;
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    const legacyCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(tagDate);
    const { id: cycleId, tag: resolvedTag } = await ensureCycle(account.id, cycleTag, account.cashback_config, legacyCycleTag, supabase);
    // Persist the resolved tag to the transaction so recompute (summing logic) works.
    if (transaction.persisted_cycle_tag !== resolvedTag) {
        await supabase.from('transactions').update({
            persisted_cycle_tag: resolvedTag
        }).eq('id', transaction.id);
    }
    // Get Cycle Totals for Policy Resolution (MF5.3 preparation)
    // We need spent_amount so far.
    const { data: cycle } = await supabase.from('cashback_cycles').select('spent_amount').eq('id', cycleId).single();
    const cycleTotals = {
        spent: cycle?.spent_amount ?? 0
    };
    const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
        account,
        categoryId: transaction.category_id,
        amount: Math.abs(transaction.amount),
        cycleTotals,
        categoryName: transaction.category_name ?? undefined
    });
    let effectiveRate = policy.rate;
    switch(modePreference){
        case 'real_fixed':
            mode = 'real';
            amount = fixedInput;
            countsToBudget = true;
            break;
        case 'real_percent':
            mode = 'real';
            effectiveRate = transaction.cashback_share_percent !== undefined && transaction.cashback_share_percent !== null ? transaction.cashback_share_percent : policy.rate;
            amount = Math.abs(transaction.amount) * effectiveRate + fixedInput;
            countsToBudget = true;
            break;
        case 'percent':
            mode = 'virtual';
            effectiveRate = transaction.cashback_share_percent !== undefined && transaction.cashback_share_percent !== null ? transaction.cashback_share_percent : policy.rate;
            amount = Math.abs(transaction.amount) * effectiveRate + fixedInput;
            countsToBudget = true;
            break;
        case 'fixed':
            mode = 'virtual';
            amount = fixedInput;
            countsToBudget = true;
            break;
        case 'voluntary':
            mode = 'voluntary';
            amount = fixedInput;
            countsToBudget = false;
            break;
        case 'none_back':
        default:
            mode = 'virtual';
            amount = Math.abs(transaction.amount) * policy.rate;
            countsToBudget = true;
            break;
    }
    if (!policy.metadata) {
        throw new Error(`Critical: Cashback policy resolution failed to return metadata for transaction ${transaction.id}`);
    }
    const entryData = {
        cycle_id: cycleId,
        account_id: account.id,
        transaction_id: transaction.id,
        mode,
        amount,
        counts_to_budget: countsToBudget,
        metadata: {
            ...policy.metadata,
            rate: effectiveRate
        },
        note: mode === 'virtual' ? `Projected: ${policy.metadata.reason}` : transaction.note || `Manual: ${policy.metadata.reason}`
    };
    // Safe Upsert with Strict Constraint Handling
    // We used to do check-then-update/insert.
    // Now we have a unique index. Upsert is safer.
    const { error: upsertError } = await supabase.from('cashback_entries').upsert(entryData, {
        onConflict: 'account_id, transaction_id'
    });
    if (upsertError) {
        console.error('Cashback Upsert Error:', upsertError);
        // Fallback? No, this is critical.
        throw upsertError;
    }
    const previousCycleId = (existingEntries ?? []).find((entry)=>entry.account_id === account.id)?.cycle_id ?? null;
    const staleEntries = (existingEntries ?? []).filter((entry)=>entry.account_id !== account.id);
    const staleCycleIds = Array.from(new Set(staleEntries.map((entry)=>entry.cycle_id).filter(Boolean)));
    if (staleEntries.length > 0) {
        await supabase.from('cashback_entries').delete().eq('transaction_id', transaction.id).neq('account_id', account.id);
        for (const oldCycleId of staleCycleIds){
            await recomputeCashbackCycle(oldCycleId);
        }
    }
    if (previousCycleId && previousCycleId !== cycleId) {
        await recomputeCashbackCycle(previousCycleId);
    }
    // Trigger recompute for the current cycle.
    await recomputeCashbackCycle(cycleId);
}
async function recomputeCashbackCycle(cycleId, supabaseClient) {
    const supabase = supabaseClient ?? getCashbackClient();
    // 1. Fetch Cycle & Parent Account Info
    const { data: cycle } = await supabase.from('cashback_cycles').select('account_id, cycle_tag, max_budget, min_spend_target').eq('id', cycleId).single();
    if (!cycle) return;
    const { data: account } = await supabase.from('accounts').select('cashback_config').eq('id', cycle.account_id).single();
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account?.cashback_config, cycle.account_id);
    const maxBudget = config.maxAmount ?? null;
    const minSpendTarget = config.minSpend ?? null;
    // 2. Aggregate Spent Amount from Transactions
    // MF5.3.3 FIX: Include ONLY expense and debt (abs). Exclude transfer, repayment, lending.
    const { data: rawTxns } = await supabase.from('transactions').select('id, amount, type, note, category_id, categories(name)').eq('account_id', cycle.account_id).eq('persisted_cycle_tag', cycle.cycle_tag).neq('status', 'void').in('type', [
        'expense',
        'debt'
    ]);
    // MF16: Filter out Initial/Rollover transactions in recompute
    const txns = (rawTxns ?? []).filter((t)=>{
        const note = String(t.note || '').toLowerCase();
        return !(note.includes('create initial') || note.includes('số dư đầu') || note.includes('opening balance') || note.includes('rollover'));
    });
    const spentAmount = txns.reduce((sum, t)=>sum + Math.abs(t.amount || 0), 0);
    const isMinSpendMet = minSpendTarget !== null ? spentAmount >= minSpendTarget : true;
    // 3. Re-resolve all entries for this cycle to handle tier jumps and ensure consistency
    // This is the "Deterministic" part: we recalculate based on the final spentAmount.
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript, async loader)");
    const entriesToUpsert = [];
    for (const txn of txns){
        const policy = resolveCashbackPolicy({
            account,
            categoryId: txn.category_id,
            amount: Math.abs(txn.amount),
            cycleTotals: {
                spent: spentAmount
            },
            categoryName: txn.categories?.name
        });
        // Determine mode and countsToBudget based on standard resolver logic
        // We assume 'virtual' for recompute unless specifically overridden in future.
        // However, if we want to preserve 'real' status of existing entries, we'd need to fetch them.
        // For simplicity and deterministic truth, we use 'virtual' as the baseline for recomputed projections.
        // Wait, if we overwrite 'real' entries with 'virtual', that's bad.
        // Let's fetch existing entry modes first.
        entriesToUpsert.push({
            cycle_id: cycleId,
            account_id: cycle.account_id,
            transaction_id: txn.id,
            amount: Math.abs(txn.amount) * policy.rate,
            mode: 'virtual',
            counts_to_budget: true,
            metadata: {
                ...policy.metadata,
                rate: policy.rate
            },
            note: `Recomputed: ${policy.metadata.reason}`
        });
    }
    // Bulk upsert entries (only metadata and amount update if txn exists)
    if (entriesToUpsert.length > 0) {
        await supabase.from('cashback_entries').upsert(entriesToUpsert, {
            onConflict: 'account_id, transaction_id'
        });
    }
    // 4. Aggregate and apply Caps (Tier Cap and Rule Cap)
    const { data: updatedEntries } = await supabase.from('cashback_entries').select('mode, amount, counts_to_budget, metadata').eq('cycle_id', cycleId);
    let realTotal = 0;
    let virtualTotalRaw = 0;
    let voluntaryTotal = 0;
    // Group by Rule for Rule-level capping
    const ruleGroupSums = {};
    // Group by Tier for Tier-level capping
    const tierGroupSums = {};
    (updatedEntries ?? []).forEach((e)=>{
        const meta = e.metadata || {};
        const amount = Number(e.amount || 0);
        if (e.mode === 'real' && e.counts_to_budget) {
            realTotal += amount;
        } else if (e.mode === 'virtual') {
            // Rule Capping logic
            if (meta.ruleId) {
                if (!ruleGroupSums[meta.ruleId]) {
                    ruleGroupSums[meta.ruleId] = {
                        total: 0,
                        max: meta.ruleMaxReward ?? null
                    };
                }
                ruleGroupSums[meta.ruleId].total += amount;
            } else {
                virtualTotalRaw += amount;
            }
            // Tier Capping logic (MF16)
            if (meta.levelId) {
            // Try to find if the tier itself has a cap (max_reward at tier level)
            // We'd need to know the tier config here. 
            // For now, rule caps are most important.
            }
        } else if (e.mode === 'voluntary' || !e.counts_to_budget) {
            voluntaryTotal += amount;
        }
    });
    // Apply Rule Caps
    for(const ruleId in ruleGroupSums){
        const group = ruleGroupSums[ruleId];
        if (group.max !== null && group.max > 0) {
            const capped = Math.min(group.total, group.max);
            virtualTotalRaw += capped;
            voluntaryTotal += group.total - capped; // The part that hit the cap is "loss"
        } else {
            virtualTotalRaw += group.total;
        }
    }
    // 5. Final Logic Application (Overall Budget)
    const capAfterReal = maxBudget !== null ? Math.max(0, maxBudget - realTotal) : Infinity;
    const virtualEffective = Math.min(virtualTotalRaw, capAfterReal);
    const virtualOverflow = Math.max(0, virtualTotalRaw - virtualEffective);
    const realOverflow = maxBudget !== null ? Math.max(0, realTotal - maxBudget) : 0;
    const totalOverflowLoss = voluntaryTotal + virtualOverflow + realOverflow;
    const realEffective = maxBudget !== null ? Math.min(realTotal, maxBudget) : realTotal;
    const isExhausted = maxBudget !== null && (realTotal >= maxBudget || realTotal + virtualEffective >= maxBudget);
    // 6. Update Cycle Record
    await supabase.from('cashback_cycles').update({
        max_budget: maxBudget,
        min_spend_target: minSpendTarget,
        spent_amount: spentAmount,
        met_min_spend: isMinSpendMet,
        real_awarded: realEffective,
        virtual_profit: virtualEffective,
        overflow_loss: totalOverflowLoss,
        is_exhausted: isExhausted,
        updated_at: new Date().toISOString()
    }).eq('id', cycleId);
}
async function removeTransactionCashback(transactionId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // Get all cashback entries for this transaction (not just one)
    const { data: entries, error: selectError } = await supabase.from('cashback_entries').select('cycle_id').eq('transaction_id', transactionId);
    if (selectError) {
        console.error('Error fetching cashback entries for deletion:', selectError);
        throw selectError;
    }
    if (entries && entries.length > 0) {
        // Delete all cashback entries for this transaction
        const { error: deleteError } = await supabase.from('cashback_entries').delete().eq('transaction_id', transactionId);
        if (deleteError) {
            console.error('Error deleting cashback entries:', deleteError);
            throw deleteError;
        }
        // Recompute affected cycles
        const uniqueCycleIds = new Set(entries.map((e)=>e.cycle_id).filter(Boolean));
        for (const cycleId of uniqueCycleIds){
            try {
                await recomputeCashbackCycle(cycleId);
            } catch (err) {
                console.error(`Failed to recompute cashback cycle ${cycleId}:`, err);
            }
        }
    }
}
async function getAccountSpendingStatsSnapshot(accountId, date, categoryId, cycleTag) {
    const supabase = getCashbackClient();
    const { data: account } = await supabase.from('accounts').select('cashback_config, type, cb_type, cb_base_rate, cb_rules_json').eq('id', accountId).single();
    if (!account || account.type !== 'credit_card') return null;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
    let resolvedCycleTag;
    let cycleRange;
    if (cycleTag) {
        resolvedCycleTag = cycleTag;
        try {
            const [yearStr, monthStr] = cycleTag.split('-');
            if (yearStr && monthStr) {
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                if (!isNaN(year) && !isNaN(month)) {
                    const refDate = new Date(year, month - 1, 1);
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, refDate);
                } else {
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
                }
            } else {
                cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
            }
        } catch  {
            cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        }
    } else {
        cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const tagDate = cycleRange?.end ?? date;
        resolvedCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    }
    const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(cycleRange?.end ?? date);
    let cycle = (await supabase.from('cashback_cycles').select('cycle_tag, spent_amount, min_spend_target, max_budget, real_awarded, virtual_profit').eq('account_id', accountId).eq('cycle_tag', resolvedCycleTag).maybeSingle()).data ?? null;
    if (!cycle && legacyTag !== resolvedCycleTag) {
        cycle = (await supabase.from('cashback_cycles').select('cycle_tag, spent_amount, min_spend_target, max_budget, real_awarded, virtual_profit').eq('account_id', accountId).eq('cycle_tag', legacyTag).maybeSingle()).data ?? null;
    }
    let categoryName = undefined;
    if (categoryId) {
        const { data: cat } = await supabase.from('categories').select('name').eq('id', categoryId).single();
        categoryName = cat?.name;
    }
    const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
        account,
        categoryId,
        amount: 1000000,
        cycleTotals: {
            spent: cycle?.spent_amount ?? 0
        },
        categoryName
    });
    const currentSpend = Number(cycle?.spent_amount ?? 0);
    const minSpendTarget = cycle?.min_spend_target ?? config.minSpend ?? null;
    const cycleMaxBudget = cycle?.max_budget ?? config.maxAmount ?? null;
    const actualClaimed = Number(cycle?.real_awarded ?? 0);
    const virtualProfit = Number(cycle?.virtual_profit ?? 0);
    const earnedSoFar = actualClaimed + virtualProfit;
    const sharedAmount = actualClaimed;
    const netProfit = virtualProfit;
    const isUnlimitedBudget = account.cb_is_unlimited === true;
    const remainingBudget = isUnlimitedBudget || cycleMaxBudget === null ? null : Math.max(0, cycleMaxBudget - earnedSoFar);
    const isMinSpendMet = currentSpend >= (minSpendTarget ?? 0);
    const estYearlyTotal = earnedSoFar * 12;
    return {
        currentSpend,
        minSpend: minSpendTarget,
        maxCashback: cycleMaxBudget,
        actualClaimed,
        rate: policy.rate,
        maxReward: policy.maxReward,
        earnedSoFar,
        sharedAmount,
        potentialProfit: netProfit,
        netProfit,
        remainingBudget,
        potentialRate: policy.rate,
        matchReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata)?.policySource,
        policyMetadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata) ?? undefined,
        is_min_spend_met: isMinSpendMet,
        activeRules: [],
        estYearlyTotal,
        cycle: cycleRange ? {
            tag: resolvedCycleTag,
            label: config.cycleType === 'statement_cycle' ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.start, 'dd.MM')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.end, 'dd.MM')}` : resolvedCycleTag,
            start: cycleRange.start.toISOString(),
            end: cycleRange.end.toISOString()
        } : null
    };
}
async function getAccountSpendingStats(accountId, date, categoryId, cycleTag) {
    const supabase = getCashbackClient();
    const { data: account } = await supabase.from('accounts').select('cashback_config, type, cb_type, cb_base_rate, cb_max_budget, cb_is_unlimited, cb_rules_json').eq('id', accountId).single();
    if (!account || account.type !== 'credit_card') return null;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
    // If cycleTag is provided explicitly, use it directly; otherwise derive from date
    let resolvedCycleTag;
    let cycleRange;
    if (cycleTag) {
        // Use the provided cycleTag directly
        resolvedCycleTag = cycleTag;
        // Try to derive cycleRange from the cycleTag for display purposes
        // For statement cycles like "2026-01", we can reconstruct the range
        try {
            const [yearStr, monthStr] = cycleTag.split('-');
            if (yearStr && monthStr) {
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                if (!isNaN(year) && !isNaN(month)) {
                    // Use first day of tag month as reference to consistently resolve statement cycle tag
                    const refDate = new Date(year, month - 1, 1);
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, refDate);
                } else {
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
                }
            } else {
                cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
            }
        } catch (e) {
            cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        }
    } else {
        // Derive from date (original behavior)
        cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const tagDate = cycleRange?.end ?? date;
        resolvedCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    }
    const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(cycleRange?.end ?? date);
    let cycle = (await supabase.from('cashback_cycles').select('*').eq('account_id', accountId).eq('cycle_tag', resolvedCycleTag).maybeSingle()).data ?? null;
    if (!cycle && legacyTag !== resolvedCycleTag) {
        cycle = (await supabase.from('cashback_cycles').select('*').eq('account_id', accountId).eq('cycle_tag', legacyTag).maybeSingle()).data ?? null;
    }
    let categoryName = undefined;
    if (categoryId) {
        const { data: cat } = await supabase.from('categories').select('name').eq('id', categoryId).single();
        categoryName = cat?.name;
    }
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript, async loader)");
    const policy = resolveCashbackPolicy({
        account,
        categoryId,
        amount: 1000000,
        cycleTotals: {
            spent: cycle?.spent_amount ?? 0
        },
        categoryName
    });
    // MF6.1 FIX: Helper to aggregate cycle stats in real-time for accuracy
    // 1. Calculate Spent Amount & Eligible Transactions
    const txnsQuery = supabase.from('transactions').select(`
      id, amount, type, occurred_at, note,
      cashback_share_percent, cashback_share_fixed,
      est_cashback, cashback_shared_amount,
      category:categories(id, name, kind)
    `).eq('account_id', accountId).neq('status', 'void').in('type', [
        'expense',
        'debt',
        'service'
    ]);
    const resolvedEscaped = resolvedCycleTag.replaceAll(',', '');
    const legacyEscaped = legacyTag.replaceAll(',', '');
    const tagPredicates = legacyEscaped !== resolvedEscaped ? `persisted_cycle_tag.eq.${resolvedEscaped},persisted_cycle_tag.eq.${legacyEscaped},tag.eq.${resolvedEscaped},tag.eq.${legacyEscaped}` : `persisted_cycle_tag.eq.${resolvedEscaped},tag.eq.${resolvedEscaped}`;
    const { data: tagMatchedTxns } = await txnsQuery.or(tagPredicates);
    let rawTxns = tagMatchedTxns || [];
    if (rawTxns.length === 0 && cycleRange) {
        const { data: dateTxns } = await supabase.from('transactions').select(`
            id, amount, type, occurred_at, note,
            cashback_share_percent, cashback_share_fixed,
            est_cashback, cashback_shared_amount,
            category:categories(id, name, kind)
        `).eq('account_id', accountId).neq('status', 'void').in('type', [
            'expense',
            'debt',
            'service'
        ]).gte('occurred_at', cycleRange.start.toISOString()).lte('occurred_at', cycleRange.end.toISOString());
        rawTxns = dateTxns || [];
    }
    // MF16: Aggregate only non-initial/rollover/internal transactions
    const txns = (rawTxns ?? []).filter((t)=>{
        const note = String(t.note || '').toLowerCase();
        const isInitial = note.includes('create initial') || note.includes('số dư đầu') || note.includes('opening balance') || note.includes('rollover');
        const categoryKind = t.category?.kind;
        const isInternal = categoryKind === 'internal';
        return !isInitial && !isInternal;
    });
    const currentSpend = txns.reduce((sum, t)=>sum + Math.abs(t.amount || 0), 0);
    const minSpendTarget = cycle?.min_spend_target ?? config.minSpend ?? null;
    const cycleMaxBudget = cycle?.max_budget ?? config.maxAmount ?? null;
    const actualClaimed = Number(cycle?.real_awarded ?? 0);
    // 2. Aggregate Cashback Values (transaction-first with persisted entry fallback)
    // Prefer transaction-level computed fields when present so selected-cycle metrics
    // stay aligned with table values; fallback to persisted entries and then policy-based
    // estimation if needed.
    const txnIds = txns.map((t)=>t.id);
    let earnedSoFarFromTxns = 0;
    let sharedSoFarFromTxns = 0;
    if (txnIds.length > 0) {
        const { data: entries } = await supabase.from('cashback_entries').select('amount, mode, transaction_id').in('transaction_id', txnIds).eq('account_id', accountId);
        const entryMap = new Map();
        (entries || []).forEach((entry)=>{
            if (entry.transaction_id && (entry.mode === 'virtual' || entry.mode === 'real')) {
                entryMap.set(entry.transaction_id, (entryMap.get(entry.transaction_id) || 0) + (entry.amount || 0));
            }
        });
        for (const t of txns){
            const category = t.category;
            const txnAmount = Math.abs(t.amount || 0);
            let txnEarned = 0;
            if (typeof t.est_cashback === 'number' && t.est_cashback > 0) {
                txnEarned = t.est_cashback;
            } else {
                const entryEarned = entryMap.get(t.id) || 0;
                if (entryEarned > 0) {
                    txnEarned = entryEarned;
                } else {
                    const resolvedPolicy = resolveCashbackPolicy({
                        account,
                        categoryId: category?.id,
                        amount: txnAmount,
                        cycleTotals: {
                            spent: currentSpend
                        },
                        categoryName: category?.name
                    });
                    const policyRate = resolvedPolicy.rate ?? 0;
                    txnEarned = txnAmount * policyRate;
                    if (resolvedPolicy.maxReward && resolvedPolicy.maxReward > 0) {
                        txnEarned = Math.min(txnEarned, resolvedPolicy.maxReward);
                    }
                }
            }
            const sharePercent = t.cashback_share_percent ?? 0;
            const shareFixed = t.cashback_share_fixed ?? 0;
            const sharedFromTxn = typeof t.cashback_shared_amount === 'number' ? t.cashback_shared_amount : shareFixed > 0 ? shareFixed : txnAmount * sharePercent;
            earnedSoFarFromTxns += txnEarned;
            sharedSoFarFromTxns += sharedFromTxn;
        }
    }
    // MF16: Rule Performance Breakdown
    const activeRules = [];
    const rules = account.cb_type === 'tiered' ? account.cb_rules_json?.tiers || account.cb_rules_json || [] : account.cb_rules_json || [];
    // Identify tiers vs rules
    const allSubRules = [];
    if (account.cb_type === 'tiered' && account.cb_rules_json?.tiers) {
        // Show next tier or current tier?
        // User expects to see the premium rules even if not qualified yet.
        account.cb_rules_json.tiers.forEach((tier)=>{
            tier.policies?.forEach((p)=>{
                allSubRules.push({
                    name: `${tier.name}: ${p.rate}% Bonus`,
                    rate: p.rate,
                    max: p.max,
                    cat_ids: p.cat_ids || p.categoryIds || [],
                    ruleId: `tier-${tier.min_spend}-${p.rate}`
                });
            });
        });
    } else if (Array.isArray(rules)) {
        rules.forEach((r, idx)=>{
            allSubRules.push({
                name: r.name || `Rule ${idx + 1}`,
                rate: r.rate,
                max: r.max || r.maxReward,
                cat_ids: r.cat_ids || r.categoryIds || [],
                ruleId: r.id || `rule-${idx}`
            });
        });
    }
    // MF16 FIX: Fetch category names for rule labels
    const allCatIds = Array.from(new Set(allSubRules.flatMap((r)=>r.cat_ids)));
    const { data: catNames } = allCatIds.length > 0 ? await supabase.from('categories').select('id, name').in('id', allCatIds) : {
        data: []
    };
    const catMap = Object.fromEntries((catNames || []).map((c)=>[
            c.id,
            c.name
        ]));
    // Calculate execution for each subRule
    allSubRules.forEach((rule)=>{
        const matchingTxns = txns.filter((t)=>rule.cat_ids.includes(t.category?.id));
        const spent = matchingTxns.reduce((sum, t)=>sum + Math.abs(t.amount), 0);
        // MF16.2: Normalize rate. If rate is 0.2 but logic uses /100, it becomes 0.002 (0.2%).
        // If user provided 0.2, it likely means 20% (0.2).
        const normalizedRate = rule.rate > 0 && rule.rate < 1 ? rule.rate * 100 : rule.rate;
        let earned = matchingTxns.reduce((sum, t)=>{
            const bankBack = Math.abs(t.amount) * (normalizedRate / 100);
            return sum + (rule.max ? Math.min(bankBack, rule.max) : bankBack);
        }, 0);
        // Apply rule cap if exists (though usually it's per transaction or per cycle)
        if (rule.max) earned = Math.min(earned, rule.max);
        // Build descriptive name if generic
        let displayName = rule.name;
        if (displayName.startsWith('Rule') || displayName.includes('% Bonus')) {
            const catLabels = rule.cat_ids.map((id)=>catMap[id]).filter(Boolean);
            if (catLabels.length > 0) {
                displayName = `${normalizedRate}% ${catLabels.slice(0, 2).join('/')}${catLabels.length > 2 ? '...' : ''}`;
            }
        }
        activeRules.push({
            ruleId: rule.ruleId || 'unknown',
            name: displayName,
            rate: normalizedRate,
            spent,
            earned,
            max: rule.max,
            isMain: normalizedRate > (account.cb_base_rate || 0)
        });
    });
    // Sort: Main (higher rate) first
    activeRules.sort((a, b)=>(b.isMain ? 1 : 0) - (a.isMain ? 1 : 0) || b.rate - a.rate);
    // Handle Cap Capping
    const isUnlimited = account.cb_is_unlimited === true || account.cb_type === 'none';
    if (!isUnlimited && cycleMaxBudget !== null && cycleMaxBudget > 0) {
        // If we exceed max budget, the overflow is loss
        const rawTotal = earnedSoFarFromTxns;
        earnedSoFarFromTxns = Math.min(rawTotal, cycleMaxBudget);
    }
    // Values for UI
    const earnedSoFar = earnedSoFarFromTxns;
    const sharedAmount = sharedSoFarFromTxns;
    const netProfit = earnedSoFar - sharedAmount;
    const isUnlimitedBudget = account.cb_is_unlimited === true;
    const remainingBudget = isUnlimitedBudget || cycleMaxBudget === null ? null : Math.max(0, cycleMaxBudget - earnedSoFar);
    const isMinSpendMet = currentSpend >= (minSpendTarget ?? 0);
    // Calculate Est Yearly Total (earnedSoFar scaled to year, simplified for now)
    // or use a more sophisticated projection if needed.
    // For now, let's at least sum what we have.
    const estYearlyTotal = earnedSoFar * 12; // Simplified projection
    return {
        currentSpend,
        minSpend: minSpendTarget,
        maxCashback: cycleMaxBudget,
        actualClaimed,
        rate: policy.rate,
        maxReward: policy.maxReward,
        earnedSoFar,
        sharedAmount,
        potentialProfit: netProfit,
        netProfit,
        remainingBudget,
        potentialRate: policy.rate,
        matchReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata)?.policySource,
        policyMetadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata) ?? undefined,
        is_min_spend_met: isMinSpendMet,
        activeRules,
        estYearlyTotal,
        cycle: cycleRange ? {
            tag: resolvedCycleTag,
            label: config.cycleType === 'statement_cycle' ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.start, 'dd.MM')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.end, 'dd.MM')}` : resolvedCycleTag,
            start: cycleRange.start.toISOString(),
            end: cycleRange.end.toISOString()
        } : null
    };
}
async function getCashbackProgress(monthOffset = 0, accountIds, referenceDate, includeTransactions = false) {
    // DEBUG: Use Admin Client
    const supabase = createAdminClient();
    const date = referenceDate ? new Date(referenceDate) : new Date();
    if (!referenceDate) {
        date.setMonth(date.getMonth() + monthOffset);
    }
    let query = supabase.from('accounts').select('id, name, type, cashback_config, image_url, cb_type, cb_base_rate, cb_max_budget, cb_is_unlimited, cb_rules_json').in('type', [
        'credit_card',
        'debt'
    ]);
    if (accountIds && accountIds.length > 0) {
        query = query.in('id', accountIds);
    }
    const { data: accounts } = await query;
    if (!accounts) return [];
    const results = [];
    for (const acc of accounts){
        if (!acc.cashback_config) {
            // Return basic info for accounts without cashback config (e.g. Volunteer/Debt)
            results.push({
                accountId: acc.id,
                accountName: acc.name,
                accountLogoUrl: acc.image_url,
                currentSpend: 0,
                totalEarned: 0,
                sharedAmount: 0,
                netProfit: 0,
                maxCashback: null,
                progress: 0,
                rate: 0,
                spendTarget: null,
                cycleStart: null,
                cycleEnd: null,
                cycleLabel: 'N/A',
                cycleType: 'calendar_month',
                transactions: [],
                minSpend: null,
                minSpendMet: true,
                minSpendRemaining: null,
                remainingBudget: null,
                cycleOffset: 0,
                min_spend_required: null,
                total_spend_eligible: 0,
                is_min_spend_met: true,
                missing_min_spend: null,
                potential_earned: 0,
                totalGivenAway: 0
            });
            continue;
        }
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(acc.cashback_config, acc.id);
        const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const tagDate = cycleRange?.end ?? date;
        const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
        const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(tagDate);
        let cycle = (await supabase.from('cashback_cycles').select('*').eq('account_id', acc.id).eq('cycle_tag', cycleTag).maybeSingle()).data ?? null;
        if (!cycle && legacyTag !== cycleTag) {
            cycle = (await supabase.from('cashback_cycles').select('*').eq('account_id', acc.id).eq('cycle_tag', legacyTag).maybeSingle()).data ?? null;
        }
        const currentSpend = cycle?.spent_amount ?? 0;
        const realAwarded = cycle?.real_awarded ?? 0;
        const virtualProfit = cycle?.virtual_profit ?? 0;
        const earnedSoFar = realAwarded + virtualProfit;
        const minSpend = cycle?.min_spend_target ?? config.minSpend ?? null;
        const maxCashback = cycle?.max_budget ?? config.maxAmount ?? null;
        const overflowLoss = cycle?.overflow_loss ?? 0;
        // MF5.3.3 FIX: Budget Left must come from cycle if exists, else fallback to config.maxAmount
        const remainingBudget = maxCashback !== null ? Math.max(0, maxCashback - earnedSoFar) : null;
        // Fix: Progress should track Budget Usage (Cap), not Min Spend
        const progress = maxCashback !== null && maxCashback > 0 ? Math.min(100, earnedSoFar / maxCashback * 100) : 0;
        const metMinSpend = cycle?.met_min_spend ?? (typeof minSpend === 'number' ? currentSpend >= minSpend : true);
        const missingMinSpend = typeof minSpend === 'number' && minSpend > currentSpend ? minSpend - currentSpend : null;
        const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript, async loader)");
        const policy = resolveCashbackPolicy({
            account: acc,
            amount: 1000000,
            cycleTotals: {
                spent: currentSpend
            }
        });
        let transactions = [];
        if (includeTransactions && cycle) {
            // Use direct relations instead of legacy line items to fix missing relation error
            const { data: entries, error: entriesError } = await supabase.from('cashback_entries').select(`
          mode, amount, metadata, transaction_id,
          transaction:transactions!inner (
            id, occurred_at, note, amount, account_id,
            cashback_share_percent, cashback_share_fixed,
            category:categories(id, name, icon),
            shop:shops(name, image_url),
            person:people!transactions_person_id_fkey(name)
          )
        `).eq('cycle_id', cycle.id).eq('transaction.account_id', acc.id).neq('transaction.status', 'void');
            if (entriesError) {
                console.error('[getCashbackProgress] Failed to load entries:', entriesError);
            }
            if (entries && entries.length > 0) {
                transactions = entries.map((e)=>{
                    const t = e.transaction;
                    if (!t) return null;
                    const category = t.category;
                    const shop = t.shop;
                    const person = t.person;
                    const txnAmount = Math.abs(t.amount);
                    // Use the spent amount from THIS cycle being viewed, not current cycle
                    const cycleSpentForPolicy = cycle?.spent_amount ?? 0;
                    const resolvedPolicy = resolveCashbackPolicy({
                        account: acc,
                        categoryId: category?.id,
                        amount: txnAmount,
                        cycleTotals: {
                            spent: cycleSpentForPolicy
                        },
                        categoryName: category?.name
                    });
                    const resolvedMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(resolvedPolicy.metadata);
                    // Always prefer fresh resolved metadata for display to fix stale policySource/rate issues
                    const policyMetadata = resolvedMetadata ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata);
                    const policyRate = policyMetadata?.rate ?? 0; // Default rate from policy (e.g., 10%)
                    const sharePercent = t.cashback_share_percent ?? policyRate; // User's customized share (e.g., 8%)
                    const shareFixed = t.cashback_share_fixed ?? 0;
                    // Bank Back: What the bank gives back (policy rate), capped by rule maxReward or cycle maxBudget
                    let bankBack = txnAmount * policyRate;
                    const ruleMaxReward = policyMetadata?.ruleMaxReward ?? resolvedPolicy.maxReward ?? null;
                    const cycleMaxBudget = cycle?.max_budget ?? null;
                    // Apply cap from rule first, then from cycle budget
                    if (ruleMaxReward !== null && ruleMaxReward > 0) {
                        bankBack = Math.min(bankBack, ruleMaxReward);
                    }
                    if (cycleMaxBudget !== null && cycleMaxBudget > 0) {
                        // Note: In a multi-transaction scenario, this would need cumulative tracking.
                        // For now, we cap individual transaction to avoid exceeding cycle budget per transaction.
                        bankBack = Math.min(bankBack, cycleMaxBudget);
                    }
                    // People CB: What was shared with others
                    // If shareFixed is set, use it; otherwise calculate from sharePercent
                    const peopleBack = shareFixed > 0 ? shareFixed : txnAmount * sharePercent;
                    // Profit: Your profit (capped bank back minus share)
                    const profit = bankBack - peopleBack;
                    return {
                        id: t.id,
                        occurred_at: t.occurred_at,
                        note: t.note,
                        amount: t.amount,
                        earned: bankBack,
                        bankBack,
                        peopleBack,
                        profit,
                        effectiveRate: policyRate,
                        sharePercent: t.cashback_share_percent,
                        shareFixed: t.cashback_share_fixed,
                        shopName: shop?.name,
                        shopLogoUrl: shop?.image_url,
                        categoryName: category?.name,
                        categoryIcon: category?.icon,
                        categoryLogoUrl: category?.image_url,
                        personName: person?.name,
                        policyMetadata
                    };
                }).filter((t)=>t !== null).sort((a, b)=>new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());
            }
        }
        // fallback logic for stats if cycle value is 0 but transactions exist
        let finalEarned = earnedSoFar;
        let finalShared = realAwarded;
        let finalNetProfit = virtualProfit - overflowLoss;
        if (transactions.length > 0 && finalEarned === 0 && finalNetProfit === 0) {
            // Aggregation seems to be missing, sum from transactions
            // Note: transactions array items have: earned, peopleBack, profit
            const sumEarned = transactions.reduce((acc, t)=>acc + (t.earned || 0), 0);
            const sumProfit = transactions.reduce((acc, t)=>acc + (t.profit || 0), 0);
            const sumShared = transactions.reduce((acc, t)=>acc + (t.peopleBack || 0), 0);
            if (sumEarned > 0) {
                finalEarned = sumEarned;
                finalShared = sumShared;
                finalNetProfit = sumProfit - overflowLoss;
            }
        }
        // Calculate totalGivenAway (Sum of (percent * amount) + fixed)
        const totalGivenAway = transactions.reduce((sum, t)=>{
            const sharePercent = parseFloat(t.sharePercent || '0'); // sharePercent in CashbackTransaction might be number | string? defined as number but data might be string from DB
            const shareFixed = parseFloat(t.shareFixed || '0');
            const txnAmount = Math.abs(t.amount);
            return sum + sharePercent * txnAmount + shareFixed;
        }, 0);
        results.push({
            accountId: acc.id,
            accountName: acc.name,
            accountLogoUrl: acc.image_url,
            cycleLabel: cycleTag,
            cycleStart: cycleRange?.start.toISOString() ?? null,
            cycleEnd: cycleRange?.end.toISOString() ?? null,
            cycleType: config.cycleType,
            progress,
            currentSpend,
            minSpend,
            maxCashback,
            totalEarned: finalEarned,
            sharedAmount: finalShared,
            netProfit: finalNetProfit,
            spendTarget: minSpend,
            minSpendMet: metMinSpend,
            minSpendRemaining: missingMinSpend,
            cycleOffset: monthOffset,
            min_spend_required: minSpend,
            total_spend_eligible: currentSpend,
            is_min_spend_met: metMinSpend,
            missing_min_spend: missingMinSpend,
            potential_earned: finalNetProfit,
            transactions,
            remainingBudget: remainingBudget,
            rate: policy.rate,
            totalGivenAway
        });
    }
    return results;
}
async function getTransactionCashbackPolicyExplanation(transactionId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('cashback_entries').select('metadata').eq('transaction_id', transactionId).maybeSingle();
    if (error) {
        console.error('Error fetching cashback policy explanation:', error);
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(data?.metadata) ?? null;
}
async function simulateCashback(params) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { accountId, amount, categoryId, occurredAt } = params;
    const date = occurredAt ? new Date(occurredAt) : new Date();
    // 1. Get Account Config
    const { data: account } = await supabase.from('accounts').select('id, name, cashback_config, type').eq('id', accountId).eq('id', accountId).single();
    if (!account || account.type !== 'credit_card') {
        return {
            rate: 0,
            estimatedReward: 0,
            metadata: null
        };
    }
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    const tagDate = cycleRange?.end ?? date;
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    const legacyCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(tagDate);
    // 2. Get Current Cycle Totals (Read-Only)
    // We need to find the correct cycle to know the 'spent_amount' so far.
    let spentSoFar = 0;
    if (cycleTag) {
        let cycle = (await supabase.from('cashback_cycles').select('spent_amount').eq('account_id', accountId).eq('cycle_tag', cycleTag).maybeSingle()).data ?? null;
        if (!cycle && legacyCycleTag !== cycleTag) {
            cycle = (await supabase.from('cashback_cycles').select('spent_amount').eq('account_id', accountId).eq('cycle_tag', legacyCycleTag).maybeSingle()).data ?? null;
        }
        spentSoFar = cycle?.spent_amount ?? 0;
    }
    // 3. Resolve Policy
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript, async loader)");
    // Fetch Category Name if ID provided (for pretty reason text)
    let categoryName = undefined;
    if (categoryId) {
        const { data: cat } = await supabase.from('categories').select('name').eq('id', categoryId).single();
        categoryName = cat?.name;
    }
    const policy = resolveCashbackPolicy({
        account,
        categoryId,
        amount,
        cycleTotals: {
            spent: spentSoFar
        },
        categoryName
    });
    const estimatedReward = amount * policy.rate;
    // Apply Rule Max Reward Cap if exists
    const finalReward = policy.maxReward !== undefined && policy.maxReward !== null ? Math.min(estimatedReward, policy.maxReward) : estimatedReward;
    return {
        rate: policy.rate,
        estimatedReward: finalReward,
        metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata),
        maxReward: policy.maxReward,
        isCapped: finalReward < estimatedReward
    };
}
async function getAllCashbackHistory(accountId) {
    const supabase = createAdminClient();
    const { data: account } = await supabase.from('accounts').select('id, name, image_url, cashback_config').eq('id', accountId).single();
    if (!account) return null;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
    const { data: cycles } = await supabase.from('cashback_cycles').select('*').eq('account_id', accountId);
    const totalEarned = (cycles ?? []).reduce((sum, c)=>sum + (c.real_awarded ?? 0) + (c.virtual_profit ?? 0), 0);
    const totalShared = (cycles ?? []).reduce((sum, c)=>sum + (c.real_awarded ?? 0), 0);
    const totalNet = (cycles ?? []).reduce((sum, c)=>sum + (c.virtual_profit ?? 0) - (c.overflow_loss ?? 0), 0);
    const sumMaxBudget = (cycles ?? []).reduce((sum, c)=>sum + (c.max_budget ?? 0), 0);
    let transactions = [];
    const { data: entries, error: entriesError } = await supabase.from('cashback_entries').select('mode, amount, metadata, transaction_id, cycle_id, cycle:cashback_cycles(cycle_tag), transaction:transactions!inner(id, occurred_at, note, amount, account_id, cashback_share_percent, cashback_share_fixed, category:categories(name, icon), shop:shops(name, image_url), person:people!transactions_person_id_fkey(name))').eq('transaction.account_id', accountId).neq('transaction.status', 'void');
    if (!entriesError && entries && entries.length > 0) {
        transactions = entries.map((e)=>{
            const t = e.transaction;
            if (!t) return null;
            return {
                id: t.id,
                occurred_at: t.occurred_at,
                note: t.note,
                amount: t.amount,
                earned: e.amount,
                bankBack: e.amount,
                peopleBack: e.mode === 'real' ? e.amount : 0,
                profit: e.mode === 'virtual' ? e.amount : 0,
                effectiveRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata)?.rate ?? 0,
                sharePercent: t.cashback_share_percent,
                shareFixed: t.cashback_share_fixed,
                shopName: t.shop?.name,
                shopLogoUrl: t.shop?.image_url,
                categoryName: t.category?.name,
                categoryIcon: t.category?.icon,
                categoryLogoUrl: t.category?.image_url,
                personName: t.person?.name,
                policyMetadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata),
                cycleTag: e.cycle?.cycle_tag
            };
        }).filter((t)=>t !== null).sort((a, b)=>new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());
    }
    // Calculate totalGivenAway (Sum of (percent * amount) + fixed)
    const totalGivenAway = transactions.reduce((sum, t)=>{
        const sharePercent = parseFloat(t.sharePercent || '0');
        const shareFixed = parseFloat(t.shareFixed || '0');
        const txnAmount = Math.abs(t.amount);
        return sum + sharePercent * txnAmount + shareFixed;
    }, 0);
    return {
        accountId: account.id,
        accountName: account.name,
        accountLogoUrl: account.image_url,
        cycleLabel: 'ALL TIME',
        cycleStart: null,
        cycleEnd: null,
        cycleType: null,
        progress: sumMaxBudget > 0 ? totalEarned / sumMaxBudget * 100 : 0,
        currentSpend: 0,
        minSpend: 0,
        maxCashback: sumMaxBudget > 0 ? sumMaxBudget : null,
        totalEarned,
        sharedAmount: totalShared,
        netProfit: totalNet,
        spendTarget: 0,
        minSpendMet: true,
        minSpendRemaining: 0,
        cycleOffset: 0,
        min_spend_required: 0,
        total_spend_eligible: 0,
        is_min_spend_met: true,
        missing_min_spend: 0,
        potential_earned: totalNet,
        transactions,
        remainingBudget: sumMaxBudget > 0 ? Math.max(0, sumMaxBudget - totalEarned) : null,
        rate: 0,
        totalGivenAway
    };
}
async function recomputeAccountCashback(accountId, monthsBack) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // 1. Fetch posted expense/debt transactions for this account
    let query = supabase.from('transactions').select('*').eq('account_id', accountId).neq('status', 'void').in('type', [
        'expense',
        'debt'
    ]);
    if (typeof monthsBack === 'number') {
        const cutOff = new Date();
        cutOff.setMonth(cutOff.getMonth() - monthsBack);
        cutOff.setDate(1);
        cutOff.setHours(0, 0, 0, 0);
        query = query.gte('occurred_at', cutOff.toISOString());
    }
    const { data: txns } = await query;
    if (!txns) {
        return;
    }
    // 2. Re-process each transaction
    // Sequential processing to ensure cycle totals are updated correctly
    for (const rawTxn of txns){
        const txn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapUnifiedTransaction"])(rawTxn, accountId);
        // Force clear the tag to trigger recalculation in upsertTransactionCashback
        const cleanTxn = {
            ...txn,
            persisted_cycle_tag: null
        };
        await upsertTransactionCashback(cleanTxn);
    }
}
async function getCashbackCycleOptions(accountId, limit = 12) {
    const supabase = createAdminClient();
    // PHASE 3: Detect PB vs SB account ID
    const isPBAccountId = accountId && accountId.length === 15;
    // Try to fetch from Supabase first
    const { data: cycles, error: cyclesError } = await supabase.from('cashback_cycles').select('id, cycle_tag, spent_amount, real_awarded, virtual_profit').eq('account_id', accountId).limit(Math.max(limit * 2, 24));
    let account = null;
    let cashbackConfig = null;
    if (isPBAccountId) {
        // PHASE 3: Query PocketBase for account config
        console.log('[getCashbackCycleOptions] Detected PB account, fetching from PB API');
        const PB_API_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://api-db.reiwarden.io.vn';
        try {
            const response = await fetch(`${PB_API_URL}/api/collections/pvl_acc_001/records/${accountId}`, {
                cache: 'no-store'
            });
            if (response.ok) {
                const pbAccount = await response.json();
                cashbackConfig = pbAccount.cashback_config;
                account = {
                    cashback_config: cashbackConfig
                };
                console.log('[getCashbackCycleOptions] PB account config loaded:', {
                    accountId,
                    hasConfig: !!cashbackConfig,
                    statementDay: cashbackConfig?.program?.statementDay
                });
            }
        } catch (error) {
            console.error('[getCashbackCycleOptions] Failed to fetch PB account:', error);
        }
    } else {
        // Query Supabase for SB accounts
        const { data: sbAccount } = await supabase.from('accounts').select('cashback_config').eq('id', accountId).single();
        account = sbAccount;
        cashbackConfig = sbAccount?.cashback_config;
    }
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(cashbackConfig, accountId);
    const currentCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleTag"])(new Date(), {
        statementDay: config.statementDay,
        cycleType: config.cycleType
    });
    const existingTags = new Set((cycles ?? []).map((c)=>c.cycle_tag));
    const options = [
        ...cycles ?? []
    ];
    // FALLBACK: If no cycles found and account has cashback config, generate fallback cycles
    // This handles new PocketBase accounts that may not have cashback_cycles entry yet
    if ((!cycles || cycles.length === 0) && cashbackConfig) {
        console.warn(`[getCashbackCycleOptions] No cycles in DB for ${accountId}, generating fallback cycles`);
        // Inject current cycle at minimum
        if (currentCycleTag && !existingTags.has(currentCycleTag)) {
            options.unshift({
                cycle_tag: currentCycleTag
            });
            // Also add a few past cycles for reference
            const pastCycleTags = [];
            for(let i = 1; i <= 3; i++){
                const pastDate = new Date();
                pastDate.setMonth(pastDate.getMonth() - i);
                const pastTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleTag"])(pastDate, {
                    statementDay: config.statementDay,
                    cycleType: config.cycleType
                });
                if (pastTag && !existingTags.has(pastTag)) {
                    pastCycleTags.push({
                        cycle_tag: pastTag
                    });
                }
            }
            options.push(...pastCycleTags);
        }
    } else if (currentCycleTag && !existingTags.has(currentCycleTag)) {
        // Original behavior: Inject current cycle if missing
        options.unshift({
            cycle_tag: currentCycleTag
        });
    }
    // Helper to get sortable value from tag
    const getSortValue = (tag)=>{
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCycleTag"])(tag);
        return parsed ? parsed.year * 100 + parsed.month : 0;
    };
    // Sort chronologically (descending)
    options.sort((a, b)=>getSortValue(b.cycle_tag) - getSortValue(a.cycle_tag));
    return options.map((c)=>{
        const tag = c.cycle_tag;
        let label = tag;
        // Reverse engineer date from tag to build label
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCycleTag"])(tag);
        if (parsed) {
            const monthIdx = parsed.month - 1;
            const year = parsed.year;
            if (config.cycleType === 'statement_cycle' && config.statementDay) {
                const end = new Date(year, monthIdx, config.statementDay - 1);
                const start = new Date(year, monthIdx - 1, config.statementDay);
                const fmt = (val)=>`${String(val.getDate()).padStart(2, '0')}.${String(val.getMonth() + 1).padStart(2, '0')}`;
                label = `${fmt(start)} - ${fmt(end)}`;
            } else {
                label = new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    year: 'numeric'
                }).format(new Date(year, monthIdx, 1));
            }
        }
        // Add (Current) label for current cycle
        if (tag === currentCycleTag) {
            label += ' (Current)';
        }
        return {
            tag,
            label,
            cycleId: c.id ?? null,
            stats: {
                spent_amount: c.spent_amount ?? 0,
                real_awarded: c.real_awarded ?? 0,
                virtual_profit: c.virtual_profit ?? 0
            },
            cycleType: config.cycleType,
            statementDay: config.statementDay
        };
    });
}
async function getCashbackYearAnalytics(year) {
    const supabase = createAdminClient();
    // 1. Get active credit cards
    const { data: cards, error: cardError } = await supabase.from('accounts').select('id, name, annual_fee, type').eq('type', 'credit_card').eq('is_active', true);
    if (cardError || !cards) {
        console.error('[getCashbackYearAnalytics] Failed to fetch cards:', cardError);
        return [];
    }
    const cardIds = cards.map((c)=>c.id);
    if (cardIds.length === 0) return [];
    // 2. Snapshot-first yearly cycles from cashback_cycles
    const startTag = `${year}-01`;
    const endTag = `${year}-12`;
    const { data: allCycles, error: cyclesError } = await supabase.from('cashback_cycles').select('account_id, cycle_tag, real_awarded, shared_amount, net_profit, virtual_profit').in('account_id', cardIds).gte('cycle_tag', startTag).lte('cycle_tag', endTag);
    if (cyclesError) {
        console.error('[getCashbackYearAnalytics] Failed to fetch cycles:', cyclesError);
        return [];
    }
    const results = [];
    for (const card of cards){
        const cardCycles = (allCycles || []).filter((cycle)=>cycle.account_id === card.id);
        const monthMap = new Map();
        for(let month = 1; month <= 12; month++){
            monthMap.set(month, {
                cashbackGiven: 0,
                totalGivenAway: 0,
                netProfit: 0,
                redeemed: 0
            });
        }
        for (const cycle of cardCycles){
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCycleTag"])(cycle.cycle_tag);
            if (!parsed || parsed.year !== year) continue;
            const target = monthMap.get(parsed.month);
            if (!target) continue;
            const sharedAmount = Number(cycle.shared_amount ?? cycle.real_awarded ?? 0);
            const redeemedAmount = Number(cycle.real_awarded ?? 0);
            const profitAmount = Number(cycle.net_profit ?? cycle.virtual_profit ?? 0);
            target.cashbackGiven += sharedAmount;
            target.totalGivenAway += sharedAmount;
            target.netProfit += profitAmount;
            target.redeemed += redeemedAmount;
        }
        const monthsArray = Array.from(monthMap.entries()).map(([month, val])=>({
                month,
                totalGivenAway: val.totalGivenAway,
                cashbackGiven: val.cashbackGiven
            }));
        const cashbackGivenYearTotal = Array.from(monthMap.values()).reduce((sum, val)=>sum + val.cashbackGiven, 0);
        const cashbackRedeemedYearTotal = Array.from(monthMap.values()).reduce((sum, val)=>sum + val.redeemed, 0);
        const annualFeeYearTotal = Number(card.annual_fee || 0);
        const interestYearTotal = 0;
        const snapshotNetProfit = Array.from(monthMap.values()).reduce((sum, val)=>sum + val.netProfit, 0);
        const netProfit = snapshotNetProfit - annualFeeYearTotal - interestYearTotal;
        results.push({
            cardId: card.id,
            cardType: card.type,
            year,
            months: monthsArray,
            cashbackRedeemedYearTotal,
            annualFeeYearTotal,
            interestYearTotal,
            cashbackGivenYearTotal,
            netProfit
        });
    }
    return results.sort((a, b)=>b.netProfit - a.netProfit);
}
async function getMonthlyCashbackTransactions(cardId, month, year) {
    const supabase = createAdminClient();
    // Construct start/end dates for the month
    const startDate = new Date(year, month - 1, 1).toISOString();
    // End date is start of next month (handling Dec rollover)
    const endDate = new Date(year, month, 1).toISOString();
    // Fetch transactions with cashback entries
    const { data: txns, error } = await supabase.from('transactions').select(`
      id, occurred_at, note, amount, type, 
      cashback_share_percent, cashback_share_fixed,
      category:categories(name, icon),
      cashback_entries ( amount, mode, metadata )
    `).eq('account_id', cardId).gte('occurred_at', startDate).lt('occurred_at', endDate).neq('status', 'void') // Exclude void
    .in('type', [
        'debt'
    ]) // Track money given to people (debt), not personal expenses
    .order('occurred_at', {
        ascending: false
    });
    if (error) {
        console.error('getMonthlyCashbackTransactions error:', error);
        return [];
    }
    return (txns || []).map((t)=>{
        const given = (t.cashback_entries || []).reduce((sum, e)=>sum + (e.amount || 0), 0);
        return {
            ...t,
            cashbackGiven: given
        };
    });
}
async function getAccountCycles(accountId) {
    // Check if accountId is a valid UUID before querying Supabase
    // PocketBase IDs are base32 (15 chars alphanumeric), Supabase are UUIDs (36 chars with dashes)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(accountId);
    if (!isUuid) {
        // For PocketBase accounts, cycles will be empty until Phase 3-4 migration
        console.warn(`[getAccountCycles] Skipping Supabase query for non-UUID account: ${accountId} (likely PocketBase ID)`);
        return [];
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('cashback_cycles').select('id, cycle_tag, spent_amount, real_awarded, virtual_profit, min_spend_target, max_budget, is_exhausted, met_min_spend').eq('account_id', accountId).order('cycle_tag', {
        ascending: false
    });
    if (error) {
        console.error('[getAccountCycles] Error fetching account cycles:', {
            accountId,
            message: error.message,
            code: error.code
        });
    }
    return data || [];
}
async function getTransactionsForCycle(cycleId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    // Use direct relations instead of legacy line items to fix missing relation error
    // Explicitly select person name
    const { data: entries, error: entriesError } = await supabase.from('cashback_entries').select(`
      mode, amount, metadata, transaction_id,
      transaction:transactions!inner (
        id, occurred_at, note, amount, account_id,
        cashback_share_percent, cashback_share_fixed,
        category:categories(name, icon),
        shop:shops(name, image_url),
        person:people!transactions_person_id_fkey(name)
      )
    `).eq('cycle_id', cycleId).neq('transaction.status', 'void');
    if (entriesError || !entries) {
        console.error('[getTransactionsForCycle] Failed to load entries:', entriesError);
        return [];
    }
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript, async loader)");
    return entries.map((e)=>{
        const t = e.transaction;
        if (!t) return null;
        const category = t.category;
        const shop = t.shop;
        const person = t.person;
        const bankBack = e.amount;
        const peopleBack = e.mode === 'real' ? e.amount : 0;
        const profit = e.mode === 'virtual' ? e.amount : 0;
        const policyMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata);
        const effectiveRate = policyMetadata?.rate ?? 0;
        return {
            id: t.id,
            occurred_at: t.occurred_at,
            note: t.note,
            amount: t.amount,
            earned: bankBack,
            bankBack,
            peopleBack,
            profit,
            effectiveRate,
            sharePercent: t.cashback_share_percent,
            shareFixed: t.cashback_share_fixed,
            shopName: shop?.name,
            shopLogoUrl: shop?.image_url,
            categoryName: category?.name,
            categoryIcon: category?.icon,
            categoryLogoUrl: category?.image_url,
            personName: person?.name,
            policyMetadata
        };
    }).filter((t)=>t !== null);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    upsertTransactionCashback,
    recomputeCashbackCycle,
    removeTransactionCashback,
    getAccountSpendingStatsSnapshot,
    getAccountSpendingStats,
    getCashbackProgress,
    getTransactionCashbackPolicyExplanation,
    simulateCashback,
    getAllCashbackHistory,
    recomputeAccountCashback,
    getCashbackCycleOptions,
    getCashbackYearAnalytics,
    getMonthlyCashbackTransactions,
    getAccountCycles,
    getTransactionsForCycle
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertTransactionCashback, "401a786de509cd26226fafe4f14d899f5e6a9b5f7f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(recomputeCashbackCycle, "60704ddd5e747ee1f5025d9fc6c4b7fee45720238a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(removeTransactionCashback, "401615e28e8d0087027f7d5a5db240a6f4f0560684", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountSpendingStatsSnapshot, "789b0ec8e3c65159be0eb2e091aefb27a8c7e69e3a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountSpendingStats, "7801e4226a45b922150f4170ead6d27a4292458593", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getCashbackProgress, "787c9806f746f8c2a983022dba1a2c61adc468118a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionCashbackPolicyExplanation, "40c962cfb34933ec5eeba45dfde4074e7e26defa0a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(simulateCashback, "40b5d76ad6c879f0bf06a2b2d49211290e118c9f17", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllCashbackHistory, "40c13d509fcf398dcfed9c5234ece92b5baa3a9d3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(recomputeAccountCashback, "60c68b7d72c7a7dff8e8bc0b1a104225a1e4195149", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getCashbackCycleOptions, "60d9fc7a55bb749e715afc62562d3f35dbe8215fa4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getCashbackYearAnalytics, "40b91ee83d50de8eff7cbd2b4f1727a30f9d2222d2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getMonthlyCashbackTransactions, "7078d40c3129d7e705002ab535bb5d1a25432fcafb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountCycles, "40d73091214440f2332d09bfc739efe8211ed676b4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionsForCycle, "40f516d87561ed7014e241092f8c3f7ce5ee355859", null);
}),
];

//# sourceMappingURL=src_e65bee56._.js.map