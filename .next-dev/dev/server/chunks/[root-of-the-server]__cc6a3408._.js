module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
function createClient() {
    const cookieStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://puzvrlojtgneihgvevcx.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1enZybG9qdGduZWloZ3ZldmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDI5NTksImV4cCI6MjA3OTExODk1OX0.fAVI34PhJBDxN8iZU6Eb_EPfE5YKJ9sg-oDI0LzlU4w"), {
        cookies: {
            async get (name) {
                const store = await cookieStore;
                return store.get(name)?.value;
            },
            async set (name, value, options) {
                try {
                    const store = await cookieStore;
                    store.set({
                        name,
                        value,
                        ...options
                    });
                } catch  {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing sessions.
                }
            },
            async remove (name, options) {
                try {
                    const store = await cookieStore;
                    store.set({
                        name,
                        value: '',
                        ...options
                    });
                } catch  {
                // The `delete` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing sessions.
                }
            }
        }
    });
}
}),
"[project]/src/lib/month-tag.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isLegacyMMMYY",
    ()=>isLegacyMMMYY,
    "isYYYYMM",
    ()=>isYYYYMM,
    "legacyToYYYYMM",
    ()=>legacyToYYYYMM,
    "normalizeMonthTag",
    ()=>normalizeMonthTag,
    "toLegacyMMMYYFromDate",
    ()=>toLegacyMMMYYFromDate,
    "toYYYYMMFromDate",
    ()=>toYYYYMMFromDate,
    "yyyyMMToLegacyMMMYY",
    ()=>yyyyMMToLegacyMMMYY
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-route] (ecmascript) <locals>");
;
const legacyMonthMap = {
    JAN: '01',
    FEB: '02',
    MAR: '03',
    APR: '04',
    MAY: '05',
    JUN: '06',
    JUL: '07',
    AUG: '08',
    SEP: '09',
    OCT: '10',
    NOV: '11',
    DEC: '12'
};
const reverseLegacyMonthMap = Object.fromEntries(Object.entries(legacyMonthMap).map(([month, num])=>[
        num,
        month
    ]));
function isYYYYMM(value) {
    return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
}
function isLegacyMMMYY(value) {
    if (!/^[A-Za-z]{3}\d{2}$/.test(value)) return false;
    return value.slice(0, 3).toUpperCase() in legacyMonthMap;
}
function legacyToYYYYMM(value) {
    if (!isLegacyMMMYY(value)) return null;
    const monthAbbrev = value.slice(0, 3).toUpperCase();
    const month = legacyMonthMap[monthAbbrev];
    if (!month) return null;
    const yearSuffix = value.slice(-2);
    const yearNum = Number.parseInt(yearSuffix, 10);
    if (Number.isNaN(yearNum)) return null;
    const year = 2000 + yearNum;
    return `${year}-${month}`;
}
function normalizeMonthTag(value) {
    if (value == null) return value;
    const trimmed = value.trim();
    if (trimmed === '') return trimmed;
    if (isYYYYMM(trimmed)) return trimmed;
    const converted = legacyToYYYYMM(trimmed);
    return converted ?? trimmed;
}
function toYYYYMMFromDate(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'yyyy-MM');
}
function yyyyMMToLegacyMMMYY(value) {
    if (!isYYYYMM(value)) return null;
    const [year, month] = value.split('-');
    if (!year || !month) return null;
    const monthAbbrev = reverseLegacyMonthMap[month];
    if (!monthAbbrev) return null;
    return `${monthAbbrev}${year.slice(2)}`;
}
function toLegacyMMMYYFromDate(date) {
    return yyyyMMToLegacyMMMYY(toYYYYMMFromDate(date)) ?? '';
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pocketbaseCreate",
    ()=>pocketbaseCreate,
    "pocketbaseDelete",
    ()=>pocketbaseDelete,
    "pocketbaseGetById",
    ()=>pocketbaseGetById,
    "pocketbaseList",
    ()=>pocketbaseList,
    "pocketbaseRequest",
    ()=>pocketbaseRequest,
    "pocketbaseUpdate",
    ()=>pocketbaseUpdate,
    "toPocketBaseId",
    ()=>toPocketBaseId
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'https://api-db.reiwarden.io.vn';
const POCKETBASE_EMAIL = (process.env.POCKETBASE_DB_EMAIL || '').trim();
const POCKETBASE_PASSWORD = (process.env.POCKETBASE_DB_PASSWORD || '').trim();
let cachedToken = null;
let cachedTokenExpiresAt = 0;
function decodeTokenExpiry(token) {
    try {
        const segments = token.split('.');
        if (segments.length < 2) return Date.now() + 5 * 60 * 1000;
        const payload = JSON.parse(Buffer.from(segments[1], 'base64url').toString('utf8'));
        if (!payload?.exp) return Date.now() + 5 * 60 * 1000;
        return Number(payload.exp) * 1000;
    } catch  {
        return Date.now() + 5 * 60 * 1000;
    }
}
async function getAuthToken() {
    const now = Date.now();
    if (cachedToken && now < cachedTokenExpiresAt - 30_000) {
        return cachedToken;
    }
    if (!POCKETBASE_EMAIL || !POCKETBASE_PASSWORD) {
        throw new Error('Missing POCKETBASE_DB_EMAIL or POCKETBASE_DB_PASSWORD');
    }
    const response = await fetch(`${POCKETBASE_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identity: POCKETBASE_EMAIL,
            password: POCKETBASE_PASSWORD
        }),
        cache: 'no-store'
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`PocketBase auth failed: ${text}`);
    }
    const payload = await response.json();
    cachedToken = payload.token;
    cachedTokenExpiresAt = decodeTokenExpiry(payload.token);
    return payload.token;
}
function buildQuery(params) {
    if (!params) return '';
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)){
        if (typeof value === 'undefined') continue;
        search.set(key, String(value));
    }
    const query = search.toString();
    return query ? `?${query}` : '';
}
async function pocketbaseRequest(path, options) {
    const token = await getAuthToken();
    const query = buildQuery(options?.params);
    const url = `${POCKETBASE_URL}${path}${query}`;
    const method = options?.method || 'GET';
    if (method !== 'GET') {
        console.log(`[DB:PB] ${method} ${url}`);
        if (options?.body) {
            console.log(`[DB:PB] body:`, JSON.stringify(options.body).substring(0, 500));
        }
    }
    const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: typeof options?.body === 'undefined' ? undefined : JSON.stringify(options.body),
        cache: 'no-store'
    });
    if (!response.ok) {
        const text = await response.text();
        console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text);
        throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`);
    }
    if (response.status === 204) {
        return null;
    }
    return await response.json();
}
async function pocketbaseList(collection, params) {
    return pocketbaseRequest(`/api/collections/${collection}/records`, {
        method: 'GET',
        params
    });
}
async function pocketbaseGetById(collection, id, expand, fields) {
    return pocketbaseRequest(`/api/collections/${collection}/records/${id}`, {
        method: 'GET',
        params: {
            expand,
            fields
        }
    });
}
function toPocketBaseId(sourceId, fallbackPrefix = 'mf3') {
    if (!sourceId) {
        const randomSeed = `${fallbackPrefix}-${Date.now()}-${Math.random()}`;
        const seed = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('sha256').update(randomSeed).digest();
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for(let index = 0; index < 15; index++){
            randomId += chars[seed[index] % chars.length];
        }
        return randomId;
    }
    // Idempotency: If already 15-char lowercase alphanumeric, assume it's a PB ID
    if (/^[a-z0-9]{15}$/.test(sourceId)) {
        return sourceId;
    }
    const digest = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('sha256').update(String(sourceId)).digest();
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let index = 0; index < 15; index++){
        result += chars[digest[index] % chars.length];
    }
    return result;
}
async function pocketbaseCreate(collection, body) {
    return pocketbaseRequest(`/api/collections/${collection}/records`, {
        method: 'POST',
        body
    });
}
async function pocketbaseUpdate(collection, id, body) {
    return pocketbaseRequest(`/api/collections/${collection}/records/${id}`, {
        method: 'PATCH',
        body
    });
}
async function pocketbaseDelete(collection, id) {
    return pocketbaseRequest(`/api/collections/${collection}/records/${id}`, {
        method: 'DELETE'
    });
}
}),
"[project]/src/services/sheet.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40131d633870c1b135712cab29118da558021132ce":"testConnection","406b0335693579bbbaaf3e893a630a3c538927caf5":"createTestSheet","40ae060e54d67ac2573e848a42cb15ae45606375a2":"syncAllTransactions","6041a9e4ac39d7c267242fdc85ffadda1f93e5dc36":"createCycleSheet","60ededf478bf2523c7f15dbb5ab99b50d71a734a53":"autoSyncCycleSheetIfNeeded","7045edccd05b0bcba775085fd9cce53babfa61a166":"syncTransactionToSheet","708f9d0d5425dc35794fdb06fbb70a5220cecf7568":"syncCycleTransactions"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
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
            tagFilter = `(tag >= "${cycleTag}-01" && tag <= "${cycleTag}-12") || (debt_cycle_tag >= "${cycleTag}-01" && debt_cycle_tag <= "${cycleTag}-12") || tag = "${cycleTag}" || debt_cycle_tag = "${cycleTag}"`;
        } else {
            const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["yyyyMMToLegacyMMMYY"])(cycleTag);
            const tags = legacyTag ? [
                cycleTag,
                legacyTag
            ] : [
                cycleTag
            ];
            tagFilter = tags.map((t)=>`tag = "${t}" || debt_cycle_tag = "${t}"`).join(' || ');
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    syncTransactionToSheet,
    testConnection,
    syncAllTransactions,
    createTestSheet,
    createCycleSheet,
    syncCycleTransactions,
    autoSyncCycleSheetIfNeeded
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(syncTransactionToSheet, "7045edccd05b0bcba775085fd9cce53babfa61a166", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(testConnection, "40131d633870c1b135712cab29118da558021132ce", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllTransactions, "40ae060e54d67ac2573e848a42cb15ae45606375a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createTestSheet, "406b0335693579bbbaaf3e893a630a3c538927caf5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createCycleSheet, "6041a9e4ac39d7c267242fdc85ffadda1f93e5dc36", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(syncCycleTransactions, "708f9d0d5425dc35794fdb06fbb70a5220cecf7568", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(autoSyncCycleSheetIfNeeded, "60ededf478bf2523c7f15dbb5ab99b50d71a734a53", null);
}),
"[project]/src/app/api/sheets/manage/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/sheet.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
;
;
;
;
;
function isUuidLike(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function makeRequestId() {
    try {
        // Check if crypto exists and has randomUUID
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        }
        return `sh-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    } catch (err) {
        console.error('[RequestId] generation error:', err);
        return `sh-${Date.now()}`;
    }
}
function errorResponse(requestId, stage, error, status, debugMessage) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error,
        requestId,
        stage,
        debugMessage
    }, {
        status
    });
}
async function POST(request) {
    const requestId = makeRequestId();
    try {
        const payload = await request.json();
        const personId = payload?.personId?.trim();
        const action = payload?.action || 'sync';
        console.info('[ManageSheet API] request:start', {
            requestId,
            action,
            hasPersonId: Boolean(personId)
        });
        if (!personId) {
            console.warn('[ManageSheet API] validation failed: missing personId', {
                requestId
            });
            return errorResponse(requestId, 'validate_payload', 'Missing personId', 400);
        }
        // Handle Test Create Action
        if (action === 'test_create') {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTestSheet"])(personId);
            if (!result.success) {
                console.warn('[ManageSheet API] test_create failed', {
                    requestId,
                    personId,
                    message: result.message
                });
                return errorResponse(requestId, 'test_create', result.message ?? 'Test create failed', 400, result.message ?? 'createTestSheet returned success=false');
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                status: 'test_created',
                sheetUrl: result.sheetUrl,
                sheetId: result.sheetId,
                requestId,
                stage: 'test_create'
            });
        }
        // Default Sync Action
        const rawCycle = payload?.cycleTag?.trim();
        if (!rawCycle) {
            console.warn('[ManageSheet API] validation failed: missing cycleTag', {
                requestId,
                personId
            });
            return errorResponse(requestId, 'validate_payload', 'Missing cycleTag', 400);
        }
        // Check if person exists in PocketBase if not UUID
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        let isMasterSheet = false;
        try {
            const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
            isMasterSheet = personData?.is_master_sheet_enabled === true;
        } catch  {
        // ignore
        }
        let normalizedCycle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(rawCycle);
        if (isMasterSheet && normalizedCycle) {
            normalizedCycle = normalizedCycle.split('-')[0]; // '2026-03' -> '2026'
        }
        if (!normalizedCycle || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalizedCycle) && !/^\d{4}$/.test(normalizedCycle)) {
            console.warn('[ManageSheet API] validation failed: invalid cycleTag', {
                requestId,
                personId,
                rawCycle,
                normalizedCycle
            });
            return errorResponse(requestId, 'validate_payload', 'Invalid cycleTag format', 400);
        }
        console.info('[ManageSheet API] request', {
            requestId,
            personId,
            cycleTag: normalizedCycle,
            isMasterSheet
        });
        console.info('[ManageSheet API] target', {
            requestId,
            personId,
            pbId,
            cycleTag: normalizedCycle
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        let existing = null;
        let tableAvailable = isUuidLike(personId);
        let pbAvailable = !tableAvailable && /^[a-z0-9]{15}$/.test(pbId);
        if (tableAvailable) {
            const existingResult = await supabase.from('person_cycle_sheets').select('id, sheet_id, sheet_url').eq('person_id', personId).eq('cycle_tag', normalizedCycle).maybeSingle();
            if (existingResult.error) {
                console.warn('[ManageSheet API] person_cycle_sheets (Supabase) lookup failed:', {
                    requestId,
                    personId,
                    cycleTag: normalizedCycle,
                    error: existingResult.error
                });
            } else {
                existing = existingResult.data;
            }
        } else if (pbAvailable) {
            try {
                const existingList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('person_cycle_sheets', {
                    filter: `person_id = "${pbId}" && cycle_tag = "${normalizedCycle}"`
                });
                existing = existingList?.items?.[0] || null;
                console.info('[ManageSheet API] person_cycle_sheets (PocketBase) lookup:', {
                    requestId,
                    found: !!existing
                });
            } catch (err) {
                console.warn('[ManageSheet API] person_cycle_sheets (PocketBase) lookup failed:', {
                    requestId,
                    err
                });
            }
        }
        let status = 'synced';
        const existingRowId = existing?.id ?? null;
        const hasSheetInfo = Boolean(existing?.sheet_id || existing?.sheet_url);
        let sheetUrl = existing?.sheet_url ?? (existing?.sheet_id ? `https://docs.google.com/spreadsheets/d/${existing.sheet_id}` : null);
        let sheetId = existing?.sheet_id ?? null;
        console.info('[ManageSheet API] existing', {
            requestId,
            found: !!existing,
            sheetId,
            sheetUrl,
            hasSheetInfo
        });
        if (!hasSheetInfo) {
            const createResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCycleSheet"])(personId, normalizedCycle);
            console.info('[ManageSheet API] create result', {
                requestId,
                success: createResult.success,
                message: createResult.message,
                sheetId: createResult.sheetId
            });
            if (!createResult.success) {
                return errorResponse(requestId, 'create_sheet', createResult.message ?? 'Create failed', 400, createResult.message ?? 'createCycleSheet returned success=false');
            }
            status = 'created';
            sheetUrl = createResult.sheetUrl ?? sheetUrl ?? null;
            sheetId = createResult.sheetId ?? sheetId ?? null;
            if (tableAvailable) {
                const sbPayload = {
                    person_id: personId,
                    cycle_tag: normalizedCycle,
                    sheet_id: sheetId,
                    sheet_url: sheetUrl
                };
                if (existingRowId) {
                    await supabase.from('person_cycle_sheets').update(sbPayload).eq('id', existingRowId);
                } else {
                    await supabase.from('person_cycle_sheets').insert(sbPayload);
                }
            } else if (pbAvailable) {
                const pbPayload = {
                    person_id: pbId,
                    cycle_tag: normalizedCycle,
                    sheet_id: sheetId,
                    sheet_url: sheetUrl
                };
                try {
                    if (existingRowId) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('person_cycle_sheets', existingRowId, pbPayload);
                    } else {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('person_cycle_sheets', pbPayload);
                    }
                } catch (pbErr) {
                    console.error('[ManageSheet API] failed to store sheet info in PB', {
                        requestId,
                        pbErr
                    });
                }
            }
            if (sheetUrl) {
                // Try both just in case, or prioritize based on available id type
                if (tableAvailable) {
                    try {
                        await supabase.from('profiles').update({
                            google_sheet_url: sheetUrl
                        }).eq('id', personId);
                    } catch (profileError) {
                        console.warn('[ManageSheet API] unable to update profile sheet url in Supabase', {
                            requestId,
                            personId,
                            profileError
                        });
                    }
                } else if (pbAvailable) {
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('people', pbId, {
                            google_sheet_url: sheetUrl
                        });
                    } catch (profileError) {
                        console.warn('[ManageSheet API] unable to update profile sheet url in PocketBase', {
                            requestId,
                            personId,
                            profileError
                        });
                    }
                }
            }
        } else if (tableAvailable && existingRowId) {
            await supabase.from('person_cycle_sheets').update({
                updated_at: new Date().toISOString()
            }).eq('id', existingRowId);
        } else if (pbAvailable && existingRowId) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('person_cycle_sheets', existingRowId, {
                    updated_at: new Date().toISOString()
                });
            } catch (pbErr) {
                console.warn('[ManageSheet API] unable to update timestamp in PB', {
                    requestId,
                    pbErr
                });
            }
        }
        const syncResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncCycleTransactions"])(personId, normalizedCycle, sheetId);
        console.info('[ManageSheet API] sync result', {
            requestId,
            success: syncResult.success,
            message: syncResult.message,
            syncedCount: syncResult.syncedCount
        });
        if (!syncResult.success) {
            return errorResponse(requestId, 'sync_transactions', syncResult.message ?? 'Sync failed', 400, syncResult.message ?? 'syncCycleTransactions returned success=false');
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status,
            sheetUrl,
            sheetId,
            requestId,
            stage: 'sync_transactions',
            syncedCount: syncResult.syncedCount,
            manualPreserved: syncResult.manualPreserved,
            totalRows: syncResult.totalRows
        });
    } catch (error) {
        console.error('[ManageSheet API] unexpected failure', {
            requestId,
            error: error?.message,
            stack: error?.stack
        });
        return errorResponse(requestId, 'unexpected', error?.message ?? 'Unexpected error', 500, error?.message ?? 'Unhandled exception in manage sheet API');
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cc6a3408._.js.map