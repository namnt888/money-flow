module.exports = [
"[project]/src/services/sheet.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"403f6c182c17d2ff572924d96c150082c28f682112":"syncAllTransactions","409702ed35cceb8b3ea757fbe201e223ae95f2db21":"createTestSheet","40e9147aa5e5c8121d43e3ff0674ded96018327f3f":"testConnection","60cc99ac579ea99043f6df3e7fb364ffc640042aa5":"autoSyncCycleSheetIfNeeded","60e10bba86e2ba97986e16e923d1f2db97d680c7cf":"createCycleSheet","7011893e8746c89d076ecaeb5e808c6be91a2bf30d":"syncTransactionToSheet","708b16543b4fbafb1e036548d17f705cebd945c346":"syncCycleTransactions"},"",""] */ __turbopack_context__.s([
    "autoSyncCycleSheetIfNeeded",
    ()=>autoSyncCycleSheetIfNeeded,
    "createCycleSheet",
    ()=>createCycleSheet,
    "createTestSheet",
    ()=>createTestSheet,
    "syncAllTransactions",
    ()=>syncAllTransactions,
    "syncCycleTransactions",
    ()=>syncCycleTransactions,
    "syncTransactionToSheet",
    ()=>syncTransactionToSheet,
    "testConnection",
    ()=>testConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
function getCycleTag(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}
function resolveCycleTagForSheet(tag, occurredAt) {
    const rawTag = typeof tag === 'string' ? tag.trim() : '';
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isYYYYMM"])(rawTag)) return rawTag;
    if (/^\d{4}$/.test(rawTag)) return rawTag;
    const parsedDate = occurredAt ? new Date(occurredAt) : new Date();
    if (Number.isNaN(parsedDate.getTime())) {
        return getCycleTag(new Date());
    }
    return getCycleTag(parsedDate);
}
function numberOrDefault(value, fallback = 0) {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'number') return Number.isFinite(value) ? value : fallback;
    let text = String(value).trim();
    if (!text) return fallback;
    // Accept both 1,234,567 and 1.234.567 notations from legacy/imported records.
    text = text.replace(/\s+/g, '');
    if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(text)) {
        text = text.replace(/\./g, '').replace(',', '.');
    } else {
        text = text.replace(/,/g, '');
    }
    const numeric = Number(text);
    return Number.isFinite(numeric) ? numeric : fallback;
}
function firstFiniteNumber(values, fallback = 0) {
    for (const value of values){
        if (value === null || value === undefined || value === '') continue;
        const numeric = numberOrDefault(value, Number.NaN);
        if (Number.isFinite(numeric)) return numeric;
    }
    return fallback;
}
function firstNonZeroNumber(values, fallback = 0) {
    let finiteFallback = null;
    for (const value of values){
        if (value === null || value === undefined || value === '') continue;
        const numeric = numberOrDefault(value, Number.NaN);
        if (!Number.isFinite(numeric)) continue;
        if (Math.abs(numeric) > 0) return numeric;
        if (finiteFallback === null) finiteFallback = numeric;
    }
    return finiteFallback ?? fallback;
}
function extractAmountFromFeeNote(note) {
    const text = String(note ?? '').trim();
    if (!text) return 0;
    // Examples:
    // "Điện Th2 (1.635.230 | Fee: 33.828)"
    // "ABC (166,000/6)"
    const paren = text.match(/\(([^)]+)\)/);
    if (!paren || !paren[1]) return 0;
    const candidate = paren[1].split('|')[0].split('/')[0].trim();
    return Math.abs(numberOrDefault(candidate, 0));
}
function resolveOriginalAmountForSheet(txn, metadata) {
    const direct = firstNonZeroNumber([
        txn?.original_amount,
        txn?.amount,
        txn?.final_price,
        metadata?.original_amount,
        metadata?.principal,
        metadata?.base_amount,
        metadata?.gross_amount,
        metadata?.final_price
    ], 0);
    if (Math.abs(direct) > 0) return Math.abs(direct);
    const fromNote = extractAmountFromFeeNote(txn?.note ?? txn?.description);
    return Math.abs(fromNote);
}
function isValidWebhook(url) {
    if (!url) return false;
    const trimmed = url.trim();
    return /^https?:\/\//i.test(trimmed);
}
function normalizePercent(value) {
    if (value === null || value === undefined) return 0;
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) return 0;
    // If value > 1, assume it's a percentage number (5 = 5%).
    // If value <= 1, assume it's a decimal (0.05 = 5%).
    // This is a heuristic, but covers 99% of cases (nobody has >100% cashback, and nobody has <1% cashback typically indistinguishable from decimal).
    // Actually, we should standardize. 
    // The service now sends raw number (5, 8). 
    // So if we get 5, we return 0.05.
    // If we get 0.05, we return 0.05.
    return numeric > 1 ? numeric / 100 : numeric;
}
function calculateTotals(txn) {
    const originalAmount = Math.abs(Number(txn.original_amount ?? txn.amount ?? 0)) || 0;
    const percentCandidate = firstNonZeroNumber([
        txn.cashback_share_percent_input,
        txn.cashback_share_percent
    ], firstFiniteNumber([
        txn.cashback_share_percent,
        txn.cashback_share_percent_input
    ], 0));
    const percentRate = normalizePercent(percentCandidate);
    const fixedBack = Math.max(0, Number(txn.cashback_share_fixed ?? 0) || 0);
    const percentBack = originalAmount * percentRate;
    const totalBackCandidate = txn.cashback_share_amount !== null && txn.cashback_share_amount !== undefined ? Number(txn.cashback_share_amount) : percentBack + fixedBack;
    const totalBack = Math.min(originalAmount, Math.max(0, totalBackCandidate));
    return {
        originalAmount,
        percentRate,
        percentBack,
        fixedBack,
        totalBack
    };
}
function shouldExcludeFromSheet(note) {
    const normalized = String(note ?? '').toLowerCase();
    return normalized.includes('#nosync') || normalized.includes('#deprecated');
}
function extractSheetId(sheetUrl) {
    if (!sheetUrl) return null;
    const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match?.[1] ?? null;
}
async function getProfileSheetLink(personId) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
    let profile = null;
    try {
        profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
    } catch  {
        profile = null;
    }
    if (profile) {
        const sheetLink = profile.sheet_link?.trim() ?? null;
        console.log('[Sheet] Profile lookup result', {
            lookupId: personId,
            pbId,
            sheet_link: sheetLink
        });
        if (isValidWebhook(sheetLink)) {
            return sheetLink;
        }
    }
    // Fallback: Check if it's a debt account (which also has owner_id)
    // Actually, people should be enough.
    try {
        const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbId);
        if (account && account.owner_id) {
            const owner = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', account.owner_id);
            if (owner?.sheet_link) {
                const sheetLink = owner.sheet_link?.trim();
                if (isValidWebhook(sheetLink)) return sheetLink;
            }
        }
    } catch  {
    // The provided id is usually a person id; account lookup is best-effort only.
    }
    console.warn('[Sheet] No valid sheet link configured for', personId);
    return null;
}
async function getProfileSheetInfo(personId) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
    let profile = null;
    try {
        profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
    } catch  {
        profile = null;
    }
    if (profile?.google_sheet_url) {
        const sheetUrl = profile.google_sheet_url.trim();
        return {
            sheetUrl,
            sheetId: extractSheetId(sheetUrl)
        };
    }
    // Fallback to account owner
    try {
        const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbId);
        if (account?.owner_id) {
            const owner = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', account.owner_id);
            if (owner?.google_sheet_url) {
                const sheetUrl = owner.google_sheet_url.trim();
                return {
                    sheetUrl,
                    sheetId: extractSheetId(sheetUrl)
                };
            }
        }
    } catch  {
    // Ignore account lookup failure for person ids.
    }
    return {
        sheetUrl: null,
        sheetId: null
    };
}
async function postToSheet(sheetLink, payload) {
    const response = await fetch(sheetLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    let json = null;
    try {
        json = await response.json();
    } catch (error) {
        json = null;
    }
    if (!response.ok) {
        return {
            success: false,
            json,
            message: json?.error ?? `Sheet response ${response.status}`
        };
    }
    if (json && json.ok === false) {
        return {
            success: false,
            json,
            message: json.error ?? 'Sheet returned error'
        };
    }
    return {
        success: true,
        json
    };
}
function buildPayload(txn, action) {
    const resolvedOccurredAt = txn.occurred_at ?? txn.date ?? null;
    const resolvedTag = resolveCycleTagForSheet(txn.tag, resolvedOccurredAt);
    const { originalAmount, percentRate, fixedBack, totalBack } = calculateTotals(txn);
    // If amount is negative, it's a credit to the debt account (Repayment) -> Type "In"
    // If amount is positive, it's a debit to the debt account (Lending) -> Type "Debt"
    // Allow override via txn.type
    const type = txn.type ?? ((txn.amount ?? 0) < 0 ? 'In' : 'Debt');
    return {
        action: action === 'update' ? 'edit' : action,
        id: txn.id,
        type: type,
        date: resolvedOccurredAt,
        occurred_at: resolvedOccurredAt,
        shop: txn.shop_name ?? '',
        notes: txn.note ?? '',
        note: txn.note ?? '',
        amount: originalAmount,
        // We want to send the raw number (0-100).
        // If input was 5, normalizePercent made it 0.05.
        // So we assume 'percentRate' is ALWAYS decimal [0..1].
        // We multiply by 100 to send to sheet.
        percent_back: Math.round(percentRate * 100 * 100) / 100,
        fixed_back: fixedBack,
        total_back: totalBack,
        tag: resolvedTag,
        img: txn.img_url ?? undefined
    };
}
async function syncTransactionToSheet(personId, txn, action = 'create') {
    try {
        // Check for #nosync or #deprecated tags
        if (shouldExcludeFromSheet(txn.note)) {
            // If tagged as nosync, we treat it as a deletion from the sheet
            action = 'delete';
        }
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) return;
        const pbPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbPersonId);
        if (!personData) return;
        const showBankAccount = personData.sheet_show_bank_account ?? false;
        const manualBankInfo = personData.sheet_bank_info ?? '';
        const linkedBankId = personData.sheet_linked_bank_id;
        const showQrImage = personData.sheet_show_qr_image ?? false;
        const qrImageUrl = personData.sheet_full_img ?? null;
        let resolvedBankInfo = manualBankInfo;
        if (showBankAccount && linkedBankId) {
            try {
                const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', linkedBankId);
                if (acc) {
                    const parts = [
                        acc.name,
                        acc.account_number,
                        acc.receiver_name
                    ].filter(Boolean);
                    resolvedBankInfo = parts.join(' ') || manualBankInfo;
                }
            } catch (error) {
                console.warn('[syncTransactionToSheet] linked bank account lookup failed, fallback to manual bank info', {
                    personId,
                    linkedBankId,
                    error: error?.message
                });
            }
        }
        console.log('[syncTransactionToSheet] Person sheet preferences:', {
            personId,
            showBankAccount,
            resolvedBankInfo,
            showQrImage,
            qrImageUrl: qrImageUrl ? '(URL set)' : '(not set)'
        });
        let resolvedShopName = txn.shop_name ?? '';
        if (!resolvedShopName && txn.shop_id) {
            try {
                const shopRecord = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('shops', txn.shop_id);
                resolvedShopName = shopRecord?.name ?? '';
            } catch  {
                resolvedShopName = '';
            }
        }
        // Repayment rows often have no shop; fallback to target bank name for sheet column K.
        if (!resolvedShopName) {
            const fallbackAccountId = txn.type === 'repayment' ? txn.target_account_id || txn.to_account_id || txn.destination_account_id || txn.account_id || null : txn.account_id || null;
            if (fallbackAccountId) {
                try {
                    const accountRecord = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', fallbackAccountId);
                    resolvedShopName = accountRecord?.name ?? '';
                } catch  {
                    resolvedShopName = '';
                }
            }
        }
        const payload = {
            ...buildPayload({
                ...txn,
                shop_name: resolvedShopName
            }, action),
            person_id: personId,
            cycle_tag: resolveCycleTagForSheet(txn.tag, txn.occurred_at ?? txn.date ?? null),
            bank_account: showBankAccount ? resolvedBankInfo : '',
            img: showQrImage && qrImageUrl ? qrImageUrl : '' // Send empty to clear if disabled
        };
        console.log(`[Sheet Sync] Sending payload to ${personId}:`, {
            action: payload.action,
            id: payload.id,
            shop: payload.shop,
            amount: payload.amount,
            note: payload.note,
            notes: payload.notes,
            type: payload.type
        });
        const result = await postToSheet(sheetLink, payload);
        if (!result.success) {
            console.error('Sheet sync failed:', result.message ?? 'Sheet sync failed');
        }
    } catch (err) {
        console.error('Sheet sync failed:', err);
    }
}
async function testConnection(personId) {
    try {
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) {
            return {
                success: false,
                message: 'No valid sheet link configured'
            };
        }
        const today = new Date().toISOString().slice(0, 10);
        const payload = {
            action: 'create',
            type: 'TEST-CONNECTION',
            amount: 0,
            shop: 'MoneyFlow Bot',
            notes: 'Connection successful!',
            date: today
        };
        const result = await postToSheet(sheetLink, payload);
        if (!result.success) {
            return {
                success: false,
                message: result.message ?? 'Sheet create failed'
            };
        }
        return {
            success: true
        };
    } catch (err) {
        console.error('Test connection failed:', err);
        return {
            success: false,
            message: 'Failed to send test signal'
        };
    }
}
async function syncAllTransactions(personId) {
    try {
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) {
            return {
                success: false,
                message: 'No valid sheet link configured'
            };
        }
        const pbPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `person_id = "${pbPersonId}" && status != "void"`,
            expand: 'shop_id,account_id,target_account_id,to_account_id,category_id',
            sort: 'occurred_at'
        });
        // Fetch person's sheet preferences for bank info & QR
        const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbPersonId);
        const showBankAccount = personData?.sheet_show_bank_account ?? false;
        const manualBankInfo = personData?.sheet_bank_info ?? '';
        const linkedBankId = personData?.sheet_linked_bank_id;
        const showQrImage = personData?.sheet_show_qr_image ?? false;
        const qrImageUrl = personData?.sheet_full_img ?? null;
        let resolvedBankInfo = manualBankInfo;
        if (showBankAccount && linkedBankId) {
            try {
                const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', linkedBankId);
                if (acc) {
                    const parts = [
                        acc.name,
                        acc.account_number,
                        acc.receiver_name
                    ].filter(Boolean);
                    resolvedBankInfo = parts.join(' ') || manualBankInfo;
                }
            } catch (error) {
                console.warn('[syncAllTransactions] linked bank account lookup failed, fallback to manual bank info', {
                    personId,
                    linkedBankId,
                    error: error?.message
                });
            }
        }
        const rows = (data.items || []).map((txn)=>{
            const expanded = txn.expand || {};
            const metadata = txn.metadata && typeof txn.metadata === 'object' ? txn.metadata : {};
            const occurredAt = txn.occurred_at || txn.date;
            const resolvedOriginalAmount = resolveOriginalAmountForSheet(txn, metadata);
            return {
                id: txn.id,
                occurred_at: occurredAt,
                note: txn.note || txn.description,
                status: txn.status,
                tag: resolveCycleTagForSheet(txn.tag || txn.debt_cycle_tag, occurredAt),
                type: txn.type,
                amount: txn.amount,
                original_amount: resolvedOriginalAmount,
                cashback_share_percent: numberOrDefault(firstNonZeroNumber([
                    txn.cashback_share_percent_input,
                    txn.cashback_share_percent,
                    txn.percent_back,
                    txn.cashback_percent,
                    metadata.cashback_share_percent_input,
                    metadata.cashback_share_percent,
                    metadata.percent_back
                ], firstFiniteNumber([
                    txn.cashback_share_percent,
                    metadata.cashback_share_percent,
                    txn.cashback_share_percent_input,
                    metadata.cashback_share_percent_input
                ], 0)), 0),
                cashback_share_percent_input: numberOrDefault(firstFiniteNumber([
                    txn.cashback_share_percent_input,
                    txn.percent_back,
                    metadata.cashback_share_percent_input,
                    metadata.percent_back
                ], 0), 0),
                cashback_share_fixed: numberOrDefault(firstNonZeroNumber([
                    txn.cashback_share_fixed,
                    txn.fixed_back,
                    metadata.cashback_share_fixed,
                    metadata.fixed_back
                ], firstFiniteNumber([
                    txn.cashback_share_fixed,
                    metadata.cashback_share_fixed
                ], 0)), 0),
                cashback_share_amount: numberOrDefault(txn.cashback_share_amount ?? metadata.cashback_share_amount ?? metadata.total_back, 0),
                shop_id: txn.shop_id,
                shops: expanded.shop_id ? {
                    name: expanded.shop_id.name
                } : null,
                account_id: txn.account_id,
                accounts: expanded.account_id ? {
                    name: expanded.account_id.name
                } : null,
                target_account_id: txn.target_account_id || txn.to_account_id,
                target_accounts: expanded.target_account_id || expanded.to_account_id ? {
                    name: expanded.target_account_id?.name || expanded.to_account_id?.name
                } : null,
                categories: expanded.category_id ? {
                    name: expanded.category_id.name
                } : null
            };
        });
        const eligibleRows = rows.filter((txn)=>!shouldExcludeFromSheet(txn.note));
        console.log(`[SheetSync] syncAllTransactions for personId: ${personId}. Found ${rows.length} transactions, eligible ${eligibleRows.length} after #nosync/#deprecated filtering.`);
        // Group transactions by cycle tag
        const cycleMap = new Map();
        for (const txn of eligibleRows){
            const cycleTag = resolveCycleTagForSheet(txn.tag, txn.occurred_at);
            if (!cycleMap.has(cycleTag)) {
                cycleMap.set(cycleTag, []);
            }
            cycleMap.get(cycleTag).push(txn);
        }
        let totalSynced = 0;
        // Sync each cycle as a batch
        for (const [cycleTag, cycleTxns] of cycleMap.entries()){
            const rowsPayload = cycleTxns.map((txn)=>{
                const shopData = txn.shops;
                let shopName = Array.isArray(shopData) ? shopData[0]?.name : shopData?.name;
                // Fallback for Repayment/Transfer if shop is empty -> Use Account Name
                if (!shopName) {
                    const categoryName = txn.categories?.name;
                    if (txn.note?.toLowerCase().startsWith('rollover') || categoryName === 'Rollover') {
                        shopName = 'Rollover';
                    } else {
                        const accData = txn.accounts;
                        const sourceName = (Array.isArray(accData) ? accData[0]?.name : accData?.name) ?? '';
                        const targetData = txn.target_accounts;
                        const targetName = (Array.isArray(targetData) ? targetData[0]?.name : targetData?.name) ?? '';
                        shopName = txn.type === 'repayment' ? targetName || sourceName : sourceName;
                    }
                }
                // Pass the raw transaction fields that buildPayload needs
                return buildPayload({
                    ...txn,
                    shop_name: shopName
                }, 'create');
            });
            const payload = {
                action: 'syncTransactions',
                personId: personId,
                cycleTag: cycleTag,
                rows: rowsPayload,
                bank_account: showBankAccount ? resolvedBankInfo : '',
                img: showQrImage && qrImageUrl ? qrImageUrl : ''
            };
            const result = await postToSheet(sheetLink, payload);
            if (!result.success) {
                return {
                    success: false,
                    message: result.message ?? `Sheet sync failed for cycle ${cycleTag}`
                };
            }
            totalSynced += rowsPayload.length;
        }
        return {
            success: true,
            count: totalSynced
        };
    } catch (err) {
        console.error('Sync all transactions failed:', err);
        return {
            success: false,
            message: 'Sync failed'
        };
    }
}
async function createTestSheet(personId) {
    try {
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) {
            return {
                success: false,
                message: 'No valid sheet link configured'
            };
        }
        const sheetInfo = await getProfileSheetInfo(personId);
        const response = await postToSheet(sheetLink, {
            action: 'create_test_sheet',
            person_id: personId,
            sheet_id: sheetInfo.sheetId ?? undefined,
            sheet_url: sheetInfo.sheetUrl ?? undefined
        });
        if (!response.success) {
            return {
                success: false,
                message: response.message ?? 'Test create failed'
            };
        }
        return {
            success: true,
            sheetUrl: response.json?.sheetUrl ?? null,
            sheetId: response.json?.sheetId ?? null
        };
    } catch (err) {
        return {
            success: false,
            message: 'Unexpected error testing sheet'
        };
    }
}
async function createCycleSheet(personId, cycleTag) {
    try {
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) {
            return {
                success: false,
                message: 'No valid sheet link configured'
            };
        }
        const sheetInfo = await getProfileSheetInfo(personId);
        const response = await postToSheet(sheetLink, {
            action: 'create_cycle_sheet',
            person_id: personId,
            cycle_tag: cycleTag,
            sheet_id: sheetInfo.sheetId ?? undefined,
            sheet_url: sheetInfo.sheetUrl ?? undefined
        });
        if (!response.success) {
            return {
                success: false,
                message: response.message ?? 'Failed to create cycle sheet'
            };
        }
        const json = response.json ?? null;
        const sheetUrl = json?.sheetUrl ?? json?.sheet_url ?? null;
        const sheetId = json?.sheetId ?? json?.sheet_id ?? null;
        return {
            success: true,
            sheetUrl,
            sheetId
        };
    } catch (error) {
        console.error('Create cycle sheet failed:', error);
        return {
            success: false,
            message: 'Failed to create cycle sheet'
        };
    }
}
async function syncCycleTransactions(personId, cycleTag, sheetId) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        let tagFilter = '';
        if (/^\d{4}$/.test(cycleTag)) {
            tagFilter = `(tag >= "${cycleTag}-01" && tag <= "${cycleTag}-12") || tag = "${cycleTag}"`;
        } else {
            const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yyyyMMToLegacyMMMYY"])(cycleTag);
            const tags = legacyTag ? [
                cycleTag,
                legacyTag
            ] : [
                cycleTag
            ];
            tagFilter = tags.map((t)=>`tag = "${t}"`).join(' || ');
        }
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `person_id = "${pbId}" && status != "void" && (${tagFilter})`,
            expand: 'shop_id,account_id,target_account_id,to_account_id,category_id',
            sort: 'occurred_at'
        });
        if (!data) {
            console.error('Failed to load cycle transactions from PB');
            return {
                success: false,
                message: 'Failed to load transactions'
            };
        }
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) return {
            success: false,
            message: 'No valid sheet link'
        };
        const rows = data.items.filter((txn)=>!shouldExcludeFromSheet(txn.note || txn.description)).map((txn)=>{
            const expanded = txn.expand || {};
            const metadata = txn.metadata && typeof txn.metadata === 'object' ? txn.metadata : {};
            const occurredAt = txn.occurred_at || txn.date;
            let shopName = expanded.shop_id?.name;
            if (!shopName) {
                const categoryName = expanded.category_id?.name;
                if (txn.note?.toLowerCase().startsWith('rollover') || categoryName === 'Rollover') {
                    shopName = 'Rollover';
                } else {
                    const sourceName = expanded.account_id?.name || '';
                    const targetName = expanded.target_account_id?.name || expanded.to_account_id?.name || '';
                    shopName = txn.type === 'repayment' ? targetName || sourceName : sourceName || '';
                }
            }
            // Pass the raw transaction fields that buildPayload needs
            const resolvedOriginalAmount = resolveOriginalAmountForSheet(txn, metadata);
            return buildPayload({
                ...txn,
                occurred_at: occurredAt,
                tag: resolveCycleTagForSheet(txn.tag || txn.debt_cycle_tag, occurredAt),
                original_amount: resolvedOriginalAmount,
                cashback_share_percent: numberOrDefault(firstNonZeroNumber([
                    txn.cashback_share_percent_input,
                    txn.cashback_share_percent,
                    txn.percent_back,
                    txn.cashback_percent,
                    metadata.cashback_share_percent_input,
                    metadata.cashback_share_percent,
                    metadata.percent_back
                ], firstFiniteNumber([
                    txn.cashback_share_percent,
                    metadata.cashback_share_percent,
                    txn.cashback_share_percent_input,
                    metadata.cashback_share_percent_input
                ], 0)), 0),
                cashback_share_percent_input: numberOrDefault(firstFiniteNumber([
                    txn.cashback_share_percent_input,
                    txn.percent_back,
                    metadata.cashback_share_percent_input,
                    metadata.percent_back
                ], 0), 0),
                cashback_share_fixed: numberOrDefault(firstNonZeroNumber([
                    txn.cashback_share_fixed,
                    txn.fixed_back,
                    metadata.cashback_share_fixed,
                    metadata.fixed_back
                ], firstFiniteNumber([
                    txn.cashback_share_fixed,
                    metadata.cashback_share_fixed
                ], 0)), 0),
                cashback_share_amount: numberOrDefault(txn.cashback_share_amount ?? metadata.cashback_share_amount ?? metadata.total_back, 0),
                shop_name: shopName
            }, 'create');
        });
        const missingIdRows = rows.filter((r)=>!r?.id);
        const zeroAmountRows = rows.filter((r)=>Number(r?.amount || 0) === 0);
        console.log('[syncCycleTransactions] Mapped rows diagnostics:', {
            total: rows.length,
            missingId: missingIdRows.length,
            zeroAmount: zeroAmountRows.length,
            sample: rows.slice(0, 5).map((r)=>({
                    id: r.id,
                    date: r.date,
                    tag: r.tag,
                    amount: r.amount,
                    percent_back: r.percent_back,
                    fixed_back: r.fixed_back,
                    notes: r.notes
                }))
        });
        console.log(`[Sheet Sync] Sending ${rows.length} mapped transactions to ${personId} for cycle ${cycleTag}`);
        // Fetch person's sheet preferences
        const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
        const showBankAccount = personData?.sheet_show_bank_account ?? false;
        const manualBankInfo = personData?.sheet_bank_info ?? '';
        const linkedBankId = personData?.sheet_linked_bank_id;
        const showQrImage = personData?.sheet_show_qr_image ?? false;
        const qrImageUrl = personData?.sheet_full_img ?? null;
        let resolvedBankInfo = manualBankInfo;
        if (showBankAccount && linkedBankId) {
            try {
                const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', linkedBankId);
                if (acc) {
                    const parts = [
                        acc.name,
                        acc.account_number,
                        acc.receiver_name
                    ].filter(Boolean);
                    resolvedBankInfo = parts.join(' ') || manualBankInfo;
                }
            } catch (error) {
                console.warn('[syncCycleTransactions] linked bank account lookup failed, fallback to manual bank info', {
                    personId,
                    linkedBankId,
                    error: error?.message
                });
            }
        }
        console.log('[syncCycleTransactions] Person sheet preferences:', {
            personId,
            showBankAccount,
            resolvedBankInfo,
            showQrImage,
            qrImageUrl: qrImageUrl ? '(URL set)' : '(not set)'
        });
        const payload = {
            action: 'syncTransactions',
            person_id: personId,
            cycle_tag: cycleTag,
            sheet_id: sheetId ?? undefined,
            rows: rows,
            bank_account: showBankAccount ? resolvedBankInfo : '',
            img: showQrImage && qrImageUrl ? qrImageUrl : ''
        };
        console.log('[syncCycleTransactions] Final payload:', {
            ...payload,
            rows: `[${payload.rows.length} rows]`
        });
        const result = await postToSheet(sheetLink, payload);
        if (!result.success) {
            return {
                success: false,
                message: result.message ?? 'Sheet sync failed'
            };
        }
        return {
            success: true,
            count: rows.length,
            syncedCount: result.json?.syncedCount,
            manualPreserved: result.json?.manualPreserved,
            totalRows: result.json?.totalRows
        };
    } catch (error) {
        console.error('Sync cycle transactions failed:', error);
        return {
            success: false,
            message: 'Sync failed'
        };
    }
}
async function autoSyncCycleSheetIfNeeded(personId, cycleTag) {
    try {
        console.log(`[AutoSync] Checking if auto-sync needed for ${personId} / ${cycleTag}`);
        // 1. Check if person has sheet_link configured
        const sheetLink = await getProfileSheetLink(personId);
        if (!sheetLink) {
            console.log(`[AutoSync] Skipping ${personId}: No sheet link configured`);
            return;
        }
        // 2. Check if cycle sheet already exists in PB
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        const existingList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('person_cycle_sheets', {
            filter: `person_id = "${pbId}" && cycle_tag = "${cycleTag}"`
        });
        const existing = existingList.items[0];
        if (existing?.sheet_id || existing?.sheet_url) {
            console.log(`[AutoSync] Skipping ${personId}: Cycle sheet already exists`);
            return;
        }
        console.log(`[AutoSync] Triggering auto-sync for ${personId} / ${cycleTag}`);
        // 3. Create cycle sheet
        const createResult = await createCycleSheet(personId, cycleTag);
        if (!createResult.success) {
            console.error(`[AutoSync] Failed to create cycle sheet: ${createResult.message}`);
            return;
        }
        // 4. Sync transactions
        const syncResult = await syncCycleTransactions(personId, cycleTag, createResult.sheetId);
        if (!syncResult.success) {
            console.error(`[AutoSync] Failed to sync transactions: ${syncResult.message}`);
            return;
        }
        // 5. Update PB
        const payload = {
            person_id: pbId,
            cycle_tag: cycleTag,
            sheet_id: createResult.sheetId,
            sheet_url: createResult.sheetUrl
        };
        if (existing?.id) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('person_cycle_sheets', existing.id, payload);
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('person_cycle_sheets', payload);
        }
        console.log(`[AutoSync] Successfully auto-synced ${personId} / ${cycleTag}`);
    } catch (error) {
        console.error(`[AutoSync] Error for ${personId} / ${cycleTag}:`, error);
    // Silent fail - don't throw, just log
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    syncTransactionToSheet,
    testConnection,
    syncAllTransactions,
    createTestSheet,
    createCycleSheet,
    syncCycleTransactions,
    autoSyncCycleSheetIfNeeded
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(syncTransactionToSheet, "7011893e8746c89d076ecaeb5e808c6be91a2bf30d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(testConnection, "40e9147aa5e5c8121d43e3ff0674ded96018327f3f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllTransactions, "403f6c182c17d2ff572924d96c150082c28f682112", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createTestSheet, "409702ed35cceb8b3ea757fbe201e223ae95f2db21", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createCycleSheet, "60e10bba86e2ba97986e16e923d1f2db97d680c7cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(syncCycleTransactions, "708b16543b4fbafb1e036548d17f705cebd945c346", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(autoSyncCycleSheetIfNeeded, "60cc99ac579ea99043f6df3e7fb364ffc640042aa5", null);
}),
];

//# sourceMappingURL=src_services_sheet_service_ts_4c458f52._.js.map