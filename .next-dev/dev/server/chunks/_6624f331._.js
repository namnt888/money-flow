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
    return err?.status === 400 || err?.status === 404 || err?.name === 'AbortError' || err?.message?.includes('400') || err?.message?.includes('404') || err?.message?.includes('fetch failed') || err?.message?.includes('aborted') || err?.code === 'UND_ERR_SOCKET' || err?.cause?.code === 'UND_ERR_SOCKET';
}
function isPocketBaseAuthError(error) {
    const err = error;
    return err?.status === 401 || err?.status === 403;
}
async function executeWithFallback(pbQuery, _sbQuery, context) {
    try {
        const result = await pbQuery();
        return result;
    } catch (error) {
        if (isPocketBase400Or404(error)) {
            const status = error?.status || '?';
            console.warn(`[source:PB] ${context} failed (${status}): ${error?.message || String(error)}`);
            // Supabase fallback disabled - Project migrated to PocketBase
            // console.log(`[source:SB] ${context} - fallback skipped`)
            throw error;
        }
        // Rethrow auth errors and other non-recoverable errors
        console.error(`[source:PB] ${context} - error`, error);
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

/* __next_internal_action_entry_do_not_use__ [{"0057486f56a6c4694fd071bbad8f4b6658c7e39646":"getAccountsWithActiveInstallments","0059177e418dc1371033b3be7b203b2ca2096833e8":"getActiveInstallments","00987a409ded035543e5c0a54845a88237cb036a3e":"getCompletedInstallments","00b5fc4b1cb6c25e9da08e536f279e53ec3c3710cb":"getInstallments","00ecf078be80f4fe59143df405e8a0daaa9c5eebe3":"getPendingInstallmentTransactions","4027da6925bffd071dda7e817ebcdc4b3b98357626":"processBatchInstallments","402889a45e8bf5fb226d51b48acda9c05dd90eb099":"createManualInstallment","402fcd8e9268e3c5ecb1bcf001b352241aec248672":"getInstallmentById","40398a231ac7f84c8afd6d46c41fe13da3273860df":"checkAndAutoSettleInstallment","403bd749d15ce4fcd541864c8315e7c852c74ac628":"getInstallmentRepayments","40836a416a7d6ccd40517f8053070dbcd2a7daf61f":"convertTransactionToInstallment","40ff803b4e863f962d7da891b64245c14675dfac91":"settleEarly","60fadb6e3f19234da1f601ed7c7c0eaedbcbfa5e97":"processMonthlyPayment"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
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
    }, async ()=>[], context);
}
async function getInstallmentById(id) {
    const context = `getInstallmentById:${id}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'installments');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId, 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id');
        return record ? mapPBInstallment(record) : null;
    }, async ()=>null, context);
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
    }, async ()=>[], context);
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
    }, async ()=>[], context);
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
    }, async ()=>[], context);
}
async function getPendingInstallmentTransactions() {
    const context = 'getPendingInstallmentTransactions';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: 'is_installment=true && installment_plan_id=null',
            sort: '-occurred_at'
        });
        return res.items;
    }, async ()=>[], context);
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
    }, async ()=>null, context);
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
        console.error(`[DB:PB] ${context} failed`, error);
        throw error;
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
        console.error(`[DB:PB] createManualInstallment failed`, error);
        throw error;
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
        console.error(`[DB:PB] ${context} failed`, error);
        throw error;
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
        console.error(`[DB:PB] ${context} failed`, error);
        throw error;
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
    }, async ()=>[], context);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallments, "00b5fc4b1cb6c25e9da08e536f279e53ec3c3710cb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallmentById, "402fcd8e9268e3c5ecb1bcf001b352241aec248672", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getActiveInstallments, "0059177e418dc1371033b3be7b203b2ca2096833e8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountsWithActiveInstallments, "0057486f56a6c4694fd071bbad8f4b6658c7e39646", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompletedInstallments, "00987a409ded035543e5c0a54845a88237cb036a3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingInstallmentTransactions, "00ecf078be80f4fe59143df405e8a0daaa9c5eebe3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(checkAndAutoSettleInstallment, "40398a231ac7f84c8afd6d46c41fe13da3273860df", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(convertTransactionToInstallment, "40836a416a7d6ccd40517f8053070dbcd2a7daf61f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createManualInstallment, "402889a45e8bf5fb226d51b48acda9c05dd90eb099", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(processMonthlyPayment, "60fadb6e3f19234da1f601ed7c7c0eaedbcbfa5e97", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(settleEarly, "40ff803b4e863f962d7da891b64245c14675dfac91", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(processBatchInstallments, "4027da6925bffd071dda7e817ebcdc4b3b98357626", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallmentRepayments, "403bd749d15ce4fcd541864c8315e7c852c74ac628", null);
}),
"[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-route] (ecmascript)").vendored['react-rsc'].ReactServerDOMTurbopackServer; //# sourceMappingURL=react-server-dom-turbopack-server.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
const _server = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-route] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
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

//# sourceMappingURL=_6624f331._.js.map