module.exports = [
"[project]/src/lib/pocketbase/fallback-helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * PocketBase Fallback Helpers
 * Provides resilient query retry and fallback logic
 */ /**
 * Check if error is PB 400 or 404 (recoverable for fallback)
 */ __turbopack_context__.s([
    "executeWithAttempts",
    ()=>executeWithAttempts,
    "executeWithFallback",
    ()=>executeWithFallback,
    "isPocketBase400Or404",
    ()=>isPocketBase400Or404,
    "isPocketBaseAuthError",
    ()=>isPocketBaseAuthError,
    "logSource",
    ()=>logSource
]);
function isPocketBase400Or404(error) {
    const err = error;
    return err?.status === 400 || err?.status === 404 || err?.message?.includes('400') || err?.message?.includes('404') || err?.message?.includes('fetch failed') || err?.code === 'UND_ERR_SOCKET' || err?.cause?.code === 'UND_ERR_SOCKET';
}
function isPocketBaseAuthError(error) {
    const err = error;
    return err?.status === 401 || err?.status === 403;
}
async function executeWithFallback(pbQuery, sbQuery, context) {
    try {
        // console.log(`[source:PB] ${context}`)
        const result = await pbQuery();
        return result;
    } catch (error) {
        if (isPocketBase400Or404(error)) {
            const status = error?.status || '?';
            console.warn(`[source:PB] ${context} failed (${status}): ${error?.message || String(error)}`);
            console.log(`[source:SB] ${context} - falling back to Supabase`);
            try {
                const result = await sbQuery();
                return result;
            } catch (sbError) {
                console.error(`[source:SB] ${context} - fallback also failed`, sbError);
                throw sbError;
            }
        }
        // Rethrow auth errors and other non-recoverable errors
        console.error(`[source:PB] ${context} - non-recoverable error`, error);
        throw error;
    }
}
async function executeWithAttempts(attempts, context, sbQuery) {
    let lastError;
    for(let i = 0; i < attempts.length; i++){
        try {
            // console.log(`[source:PB] ${context} - attempt ${i + 1}/${attempts.length}`)
            const result = await attempts[i]();
            return result;
        } catch (error) {
            lastError = error;
            if (!isPocketBase400Or404(error)) {
                // Rethrow non-recoverable errors immediately
                console.error(`[source:PB] ${context} - non-recoverable error on attempt ${i + 1}`, error);
                throw error;
            }
            console.warn(`[source:PB] ${context} - attempt ${i + 1} failed (${error?.status || '?'}), trying next...`);
        }
    }
    // All PB attempts failed, try Supabase
    if (sbQuery) {
        console.log(`[source:SB] ${context} - all PB attempts failed, falling back to Supabase`);
        try {
            const result = await sbQuery();
            return result;
        } catch (sbError) {
            console.error(`[source:SB] ${context} - fallback also failed`, sbError);
            throw sbError;
        }
    }
    // No fallback provided, rethrow last error
    console.error(`[source:PB] ${context} - all attempts exhausted, no fallback available`);
    throw lastError;
}
function logSource(_source, _action, _details) {
// Silent in production/clean mode
}
}),
"[project]/src/services/installment.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0060e32b10f64e2dde5f20805da5b12c4d611464ee":"getCompletedInstallments","00929bc43b15b328a3c340a070f84c7fb35bd85a50":"getInstallments","00c28178b6e6dac098a7f0324d90b8dc43bc9ef071":"getAccountsWithActiveInstallments","00eff55d98d586891704d1e20f5cfbb8c59353e82f":"getActiveInstallments","00f62721ec49423da68fb2b207c50dda78fa1b0de8":"getPendingInstallmentTransactions","4002985e7194704bd98bc9ad7b9b394f432de58890":"checkAndAutoSettleInstallment","402b175c258a541c42aa61c1e3d11c664f39aec281":"getInstallmentById","402fa5e61fa7e47e968d1e01dbcfd2b77e7d395d00":"getInstallmentRepayments","404d258bffe49e056e3320234d48c21e1dee11dff8":"createManualInstallment","407035b61ff37692704033d9776decea4c56648115":"settleEarly","40e3b5734d6109abfbe364e60a677ff69f1ddddfb3":"processBatchInstallments","40f13eb05c05cf9c02531c8faba1cf00d9cd5a2420":"convertTransactionToInstallment","6000ddbb17c3f7c7692c8ab0ada9ec09a113f3a7a0":"processMonthlyPayment"},"",""] */ __turbopack_context__.s([
    "checkAndAutoSettleInstallment",
    ()=>checkAndAutoSettleInstallment,
    "convertTransactionToInstallment",
    ()=>convertTransactionToInstallment,
    "createManualInstallment",
    ()=>createManualInstallment,
    "getAccountsWithActiveInstallments",
    ()=>getAccountsWithActiveInstallments,
    "getActiveInstallments",
    ()=>getActiveInstallments,
    "getCompletedInstallments",
    ()=>getCompletedInstallments,
    "getInstallmentById",
    ()=>getInstallmentById,
    "getInstallmentRepayments",
    ()=>getInstallmentRepayments,
    "getInstallments",
    ()=>getInstallments,
    "getPendingInstallmentTransactions",
    ()=>getPendingInstallmentTransactions,
    "processBatchInstallments",
    ()=>processBatchInstallments,
    "processMonthlyPayment",
    ()=>processMonthlyPayment,
    "settleEarly",
    ()=>settleEarly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
async function getInstallments() {
    const context = 'getInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            sort: '-created_at',
            expand: 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
        });
        return res.items.map(mapPBInstallment);
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('installments').select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name), person:people(name))').order('created_at', {
            ascending: false
        });
        if (error) throw error;
        return data;
    }, context);
}
async function getInstallmentById(id) {
    const context = `getInstallmentById:${id}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'installments');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId, 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id');
        return record ? mapPBInstallment(record) : null;
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('installments').select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name), person:people(name))').eq('id', id).single();
        if (error) throw error;
        return data;
    }, context);
}
async function getActiveInstallments() {
    const context = 'getActiveInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            filter: 'status="active"',
            sort: 'next_due_date',
            expand: 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
        });
        return res.items.map(mapPBInstallment);
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('installments').select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name), person:people(name))').eq('status', 'active').order('next_due_date', {
            ascending: true
        });
        if (error) throw error;
        return data;
    }, context);
}
async function getAccountsWithActiveInstallments() {
    const context = 'getAccountsWithActiveInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            filter: 'status="active"',
            expand: 'original_transaction_id'
        });
        const accountIds = new Set();
        res.items.forEach((item)=>{
            const txn = item.expand?.original_transaction_id;
            if (txn?.account_id) {
                accountIds.add(txn.account_id);
            }
        });
        return Array.from(accountIds);
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('installments').select('original_transaction:transactions(account_id)').eq('status', 'active');
        if (error) throw error;
        const accountIds = new Set();
        data?.forEach((item)=>{
            if (item.original_transaction?.account_id) {
                accountIds.add(item.original_transaction.account_id);
            }
        });
        return Array.from(accountIds);
    }, context);
}
async function getCompletedInstallments() {
    const context = 'getCompletedInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            filter: 'status="completed"',
            sort: '-created_at',
            expand: 'original_transaction_id,original_transaction_id.account_id'
        });
        return res.items.map(mapPBInstallment);
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('installments').select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name))').eq('status', 'completed').order('created_at', {
            ascending: false
        });
        if (error) throw error;
        return data;
    }, context);
}
async function getPendingInstallmentTransactions() {
    const context = 'getPendingInstallmentTransactions';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: 'is_installment=true && installment_plan_id=null',
            sort: '-occurred_at'
        });
        return res.items;
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('transactions').select('*').eq('is_installment', true).is('installment_plan_id', null).order('occurred_at', {
            ascending: false
        });
        if (error) throw error;
        return data;
    }, context);
}
/**
 * Mapper for PocketBase Installment records
 */ function mapPBInstallment(record) {
    const expandedTxn = record.expand?.original_transaction_id;
    const expandedAccount = expandedTxn?.expand?.account_id;
    const expandedPerson = expandedTxn?.expand?.person_id;
    return {
        id: record.slug || record.id,
        created_at: record.created || record.created_at,
        original_transaction_id: record.original_transaction_id,
        owner_id: record.owner_id,
        debtor_id: record.debtor_id,
        name: record.name,
        total_amount: record.total_amount,
        conversion_fee: record.conversion_fee || 0,
        term_months: record.term_months,
        monthly_amount: record.monthly_amount,
        start_date: record.start_date,
        remaining_amount: record.remaining_amount,
        next_due_date: record.next_due_date,
        status: record.status,
        type: record.type,
        original_transaction: expandedTxn ? {
            account_id: expandedTxn.account_id,
            account: expandedAccount ? {
                name: expandedAccount.name
            } : null,
            person: expandedPerson ? {
                name: expandedPerson.name
            } : null
        } : null
    };
}
async function checkAndAutoSettleInstallment(planId) {
    const context = `checkAndAutoSettleInstallment:${planId}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbPlanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(planId, 'installments');
        const plan = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbPlanId);
        if (!plan) return;
        const txnsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `installment_plan_id="${pbPlanId}"`,
            fields: 'amount,type'
        });
        let totalPaid = 0;
        txnsRes.items.forEach((t)=>{
            totalPaid += t.amount || 0;
        });
        const remaining = plan.total_amount - totalPaid;
        const updates = {
            remaining_amount: remaining
        };
        if (remaining <= 1000 && plan.status === 'active') {
            updates.status = 'completed';
        } else if (remaining > 1000 && plan.status === 'completed') {
            updates.status = 'active';
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('installments', pbPlanId, updates);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', `Auto-settled installment ${pbPlanId}`, {
            remaining,
            status: updates.status || plan.status
        });
        return {
            success: true,
            remaining,
            status: updates.status || plan.status
        };
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: plan, error: planError } = await supabase.from('installments').select('*').eq('id', planId).single();
        if (planError || !plan) return;
        const { data: txns, error: txnError } = await supabase.from('transactions').select('amount, type').eq('installment_plan_id', planId);
        if (txnError) return;
        let totalPaid = 0;
        txns?.forEach((t)=>{
            totalPaid += t.amount || 0;
        });
        const remaining = plan.total_amount - totalPaid;
        const updates = {
            remaining_amount: remaining
        };
        if (remaining <= 1000 && plan.status === 'active') {
            updates.status = 'completed';
        } else if (remaining > 1000 && plan.status === 'completed') {
            updates.status = 'active';
        }
        await supabase.from('installments').update(updates).eq('id', planId);
        return {
            success: true,
            remaining,
            status: updates.status || plan.status
        };
    }, context);
}
async function convertTransactionToInstallment(payload) {
    const context = `convertTransactionToInstallment:${payload.transactionId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    // PB Primary
    try {
        const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(payload.transactionId, 'pvl_txn_001');
        const txn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbTxnId);
        if (!txn) throw new Error('Transaction not found in PB');
        const totalAmount = Math.abs(txn.amount || 0);
        const monthlyAmount = Math.ceil(totalAmount / payload.term);
        const name = payload.name || txn.note || 'Installment Plan';
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(crypto.randomUUID(), 'installments');
        const installment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('installments', {
            id: pbId,
            original_transaction_id: pbTxnId,
            name,
            total_amount: totalAmount,
            conversion_fee: payload.fee,
            term_months: payload.term,
            monthly_amount: monthlyAmount,
            start_date: new Date().toISOString(),
            remaining_amount: totalAmount,
            next_due_date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 1).toISOString(),
            status: 'active',
            type: payload.type,
            debtor_id: payload.debtorId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(payload.debtorId, 'people') : null
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbTxnId, {
            installment_plan_id: pbId
        });
        if (payload.fee > 0) {
            const { createTransaction } = await __turbopack_context__.A("[project]/src/services/transaction.service.ts [app-route] (ecmascript, async loader)");
            await createTransaction({
                occurred_at: new Date().toISOString(),
                note: `Conversion Fee: ${name}`,
                type: 'expense',
                source_account_id: txn.account_id,
                amount: payload.fee,
                category_id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEM_CATEGORIES"].BANK_FEE,
                tag: 'FEE'
            });
        }
        return installment;
    } catch (error) {
        console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
        // Supabase Fallback
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: txn, error: txnError } = await supabase.from('transactions').select('*').eq('id', payload.transactionId).single();
        if (txnError || !txn) throw new Error('Transaction not found in SB');
        const totalAmount = Math.abs(txn.amount || 0);
        const monthlyAmount = Math.ceil(totalAmount / payload.term);
        const { data: installment, error: createError } = await supabase.from('installments').insert({
            original_transaction_id: payload.transactionId,
            name: payload.name || txn.note || 'Installment Plan',
            total_amount: totalAmount,
            conversion_fee: payload.fee,
            term_months: payload.term,
            monthly_amount: monthlyAmount,
            start_date: new Date().toISOString(),
            remaining_amount: totalAmount,
            next_due_date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 1).toISOString(),
            status: 'active',
            type: payload.type,
            debtor_id: payload.debtorId || null
        }).select().single();
        if (createError) throw createError;
        await supabase.from('transactions').update({
            installment_plan_id: installment.id
        }).eq('id', payload.transactionId);
        return installment;
    }
}
async function createManualInstallment(payload) {
    const context = `createManualInstallment:${payload.name}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(crypto.randomUUID(), 'installments');
        const monthlyAmount = Math.ceil(payload.totalAmount / payload.term);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('installments', {
            id: pbId,
            name: payload.name,
            total_amount: payload.totalAmount,
            conversion_fee: payload.fee,
            term_months: payload.term,
            monthly_amount: monthlyAmount,
            start_date: payload.startDate || new Date().toISOString(),
            remaining_amount: payload.totalAmount,
            next_due_date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(new Date(payload.startDate || new Date()), 1).toISOString(),
            status: 'active',
            type: payload.type,
            debtor_id: payload.debtorId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(payload.debtorId, 'people') : null
        });
    } catch (error) {
        console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error: err } = await supabase.from('installments').insert({
            owner_id: user?.id ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DEFAULT_USER_ID,
            name: payload.name,
            total_amount: payload.totalAmount,
            term_months: payload.term,
            monthly_amount: Math.ceil(payload.totalAmount / payload.term),
            remaining_amount: payload.totalAmount,
            status: 'active',
            type: payload.type,
            start_date: payload.startDate || new Date().toISOString()
        }).select().single();
        if (err) throw err;
        return data;
    }
}
async function processMonthlyPayment(installmentId, amountPaid) {
    const context = `processMonthlyPayment:${installmentId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(installmentId, 'installments');
        const installment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId);
        if (!installment) throw new Error('Installment not found in PB');
        const newRemaining = Math.max(0, installment.remaining_amount - amountPaid);
        const newStatus = newRemaining <= 0 ? 'completed' : 'active';
        const nextDueDate = newStatus === 'active' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(new Date(installment.next_due_date || new Date()), 1).toISOString() : null;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('installments', pbId, {
            remaining_amount: newRemaining,
            status: newStatus,
            next_due_date: nextDueDate
        });
        return true;
    } catch (error) {
        console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: installment, error: fetchError } = await supabase.from('installments').select('*').eq('id', installmentId).single();
        if (fetchError || !installment) throw new Error('Installment not found in SB');
        const newRemaining = Math.max(0, installment.remaining_amount - amountPaid);
        const newStatus = newRemaining <= 0 ? 'completed' : 'active';
        const nextDueDate = newStatus === 'active' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(new Date(installment.next_due_date || new Date()), 1).toISOString() : null;
        await supabase.from('installments').update({
            remaining_amount: newRemaining,
            status: newStatus,
            next_due_date: nextDueDate
        }).eq('id', installmentId);
        return true;
    }
}
async function settleEarly(installmentId) {
    const context = `settleEarly:${installmentId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(installmentId, 'installments');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('installments', pbId, {
            remaining_amount: 0,
            status: 'settled_early',
            next_due_date: null
        });
        return true;
    } catch (error) {
        console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('installments').update({
            remaining_amount: 0,
            status: 'settled_early',
            next_due_date: null
        }).eq('id', installmentId);
        return true;
    }
}
async function processBatchInstallments(date) {
    const context = 'processBatchInstallments';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const targetDate = date ? new Date(date) : new Date();
        const monthTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(targetDate);
        const installments = await getActiveInstallments();
        if (installments.length === 0) return;
        const batchName = `Installments ${monthTag}`;
        let batchId;
        const existingBatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('batches', {
            filter: `name="${batchName}"`,
            perPage: 1
        });
        if (existingBatches.items.length > 0) {
            batchId = existingBatches.items[0].id;
        } else {
            console.log(`[Installments] Creating new batch: ${batchName}`);
            const newBatch = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('batches', {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`batch-${batchName}`, 'batches'),
                name: batchName,
                source_account_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'),
                status: 'draft'
            });
            batchId = newBatch.id;
        }
        for (const inst of installments){
            const existingItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('batch_items', {
                filter: `batch_id="${batchId}" && metadata~"installment_id\\":\\"${inst.id}\\""`,
                perPage: 1
            });
            if (existingItem.items.length > 0) continue;
            const start = new Date(inst.start_date);
            const diffMonths = (targetDate.getFullYear() - start.getFullYear()) * 12 + (targetDate.getMonth() - start.getMonth()) + 1;
            const monthNum = Math.min(Math.max(1, diffMonths), inst.term_months);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('batch_items', {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`bi-${batchId}-${inst.id}`, 'batch_items'),
                batch_id: batchId,
                receiver_name: 'Installment Payment',
                amount: inst.monthly_amount,
                note: `Installment: ${inst.name} (Month ${monthNum}/${inst.term_months})`,
                status: 'pending',
                metadata: {
                    installment_id: inst.id
                }
            });
        }
    } catch (error) {
        console.error(`[DB:PB] ${context} failed`, error);
    // Legacy Supabase path could be called here if needed, but per-agent instructions PB is primary.
    }
}
async function getInstallmentRepayments(planId) {
    const context = `getInstallmentRepayments:${planId}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbPlanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(planId, 'installments');
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `installment_plan_id="${pbPlanId}"`,
            sort: '-occurred_at',
            expand: 'created_by'
        });
        return res.items;
    }, async ()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('transactions').select('id, occurred_at, amount, note, type, created_by, profiles:created_by ( name )').eq('installment_plan_id', planId).order('occurred_at', {
            ascending: false
        });
        if (error) throw error;
        return data;
    }, context);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getInstallments,
    getInstallmentById,
    getActiveInstallments,
    getAccountsWithActiveInstallments,
    getCompletedInstallments,
    getPendingInstallmentTransactions,
    checkAndAutoSettleInstallment,
    convertTransactionToInstallment,
    createManualInstallment,
    processMonthlyPayment,
    settleEarly,
    processBatchInstallments,
    getInstallmentRepayments
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallments, "00929bc43b15b328a3c340a070f84c7fb35bd85a50", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallmentById, "402b175c258a541c42aa61c1e3d11c664f39aec281", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getActiveInstallments, "00eff55d98d586891704d1e20f5cfbb8c59353e82f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountsWithActiveInstallments, "00c28178b6e6dac098a7f0324d90b8dc43bc9ef071", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompletedInstallments, "0060e32b10f64e2dde5f20805da5b12c4d611464ee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingInstallmentTransactions, "00f62721ec49423da68fb2b207c50dda78fa1b0de8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(checkAndAutoSettleInstallment, "4002985e7194704bd98bc9ad7b9b394f432de58890", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(convertTransactionToInstallment, "40f13eb05c05cf9c02531c8faba1cf00d9cd5a2420", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createManualInstallment, "404d258bffe49e056e3320234d48c21e1dee11dff8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(processMonthlyPayment, "6000ddbb17c3f7c7692c8ab0ada9ec09a113f3a7a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(settleEarly, "407035b61ff37692704033d9776decea4c56648115", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(processBatchInstallments, "40e3b5734d6109abfbe364e60a677ff69f1ddddfb3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallmentRepayments, "402fa5e61fa7e47e968d1e01dbcfd2b77e7d395d00", null);
}),
"[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-route] (ecmascript)").vendored['react-rsc'].ReactServerDOMTurbopackServer; //# sourceMappingURL=react-server-dom-turbopack-server.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_dcb3e294._.js.map