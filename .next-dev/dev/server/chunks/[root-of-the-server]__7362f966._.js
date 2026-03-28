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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-route] (ecmascript) <locals>");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'yyyy-MM');
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
"[project]/src/lib/cashback.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBankCashback",
    ()=>calculateBankCashback,
    "formatIsoCycleTag",
    ()=>formatIsoCycleTag,
    "formatLegacyCycleTag",
    ()=>formatLegacyCycleTag,
    "getCashbackCycleRange",
    ()=>getCashbackCycleRange,
    "getCashbackCycleTag",
    ()=>getCashbackCycleTag,
    "getMinSpendStatus",
    ()=>getMinSpendStatus,
    "normalizeCashbackConfig",
    ()=>normalizeCashbackConfig,
    "normalizeRate",
    ()=>normalizeRate,
    "parseCashbackConfig",
    ()=>parseCashbackConfig,
    "parseCycleTag",
    ()=>parseCycleTag
]);
function parseConfigCandidate(raw, source) {
    if (!raw) {
        console.warn(`[parseCashbackConfig] Received null raw config from ${source}`);
        return {
            rate: 0,
            maxAmount: null,
            cycleType: 'calendar_month',
            statementDay: null,
            dueDate: null,
            minSpend: null
        };
    }
    // 1. Parse Program (MF5.3)
    let program = undefined;
    if (raw.program && typeof raw.program === 'object') {
        const p = raw.program;
        program = {
            defaultRate: Number(p.defaultRate ?? p.rate ?? raw.rate ?? 0),
            maxBudget: Number(p.maxBudget ?? p.maxAmount ?? 0) || null,
            cycleType: p.cycleType === 'statement_cycle' ? 'statement_cycle' : 'calendar_month',
            statementDay: Number(p.statementDay) || null,
            minSpendTarget: Number(p.minSpendTarget ?? p.minSpend) || null,
            dueDate: Number(p.dueDate) || null,
            levels: Array.isArray(p.levels) ? p.levels.map((lvl)=>({
                    id: String(lvl.id),
                    name: String(lvl.name),
                    minTotalSpend: Number(lvl.minTotalSpend ?? 0),
                    defaultRate: lvl.defaultRate !== undefined && lvl.defaultRate !== null ? Number(lvl.defaultRate) : null,
                    rules: Array.isArray(lvl.rules ?? lvl.categoryRules) ? (lvl.rules ?? lvl.categoryRules).map((rule)=>({
                            id: String(rule.id || Math.random().toString(36).substring(2, 9)),
                            categoryIds: (Array.isArray(rule.categoryIds) ? rule.categoryIds : Array.isArray(rule.cat_ids) ? rule.cat_ids : []).map(String),
                            rate: Number(rule.rate ?? 0),
                            maxReward: rule.maxReward !== undefined && rule.maxReward !== null ? Number(rule.maxReward) : null
                        })) : []
                })) : Array.isArray(p.rules_json_v2) ? [
                {
                    id: 'rules_v2_default',
                    name: 'Default Level',
                    minTotalSpend: 0,
                    defaultRate: null,
                    rules: p.rules_json_v2.map((rule)=>({
                            id: String(rule.id || Math.random().toString(36).substring(2, 9)),
                            categoryIds: (Array.isArray(rule.categoryIds) ? rule.categoryIds : Array.isArray(rule.cat_ids) ? rule.cat_ids : []).map(String),
                            rate: Number(rule.rate ?? 0),
                            maxReward: rule.maxReward !== undefined && rule.maxReward !== null ? Number(rule.maxReward) : null
                        }))
                }
            ] : undefined
        };
    }
    // 2. Fallback / Legacy Parsing
    // Check for keys in a more robust way
    const getVal = (keys)=>{
        for (const k of keys){
            if (raw[k] !== undefined && raw[k] !== null) return raw[k];
        }
        return undefined;
    };
    const rateValue = program ? program.defaultRate : Number(getVal([
        'rate'
    ]) ?? 0);
    const parsedRate = Number.isFinite(rateValue) ? rateValue : 0;
    const rawMax = program ? program.maxBudget : getVal([
        'max_amt',
        'maxAmount',
        'max_amount'
    ]);
    const maxAmount = rawMax !== undefined && rawMax !== null ? Number(rawMax) : null;
    // IMPORTANT: Fix for "cycleType=statement_cycle and statementDay=15 never default to calendar-month"
    const rawCycle = program ? program.cycleType : getVal([
        'cycle_type',
        'cycle',
        'cycleType'
    ]);
    let cycleType = rawCycle === 'statement_cycle' ? 'statement_cycle' : rawCycle === 'calendar_month' ? 'calendar_month' : null;
    const rawStatementDay = program ? program.statementDay : getVal([
        'statement_day',
        'statementDay',
        'statement_date'
    ]);
    let statementDay = null;
    if (rawStatementDay !== undefined && rawStatementDay !== null) {
        const num = Number(rawStatementDay);
        if (Number.isFinite(num)) {
            statementDay = Math.min(Math.max(Math.floor(num), 1), 31);
        }
    }
    const rawDueDate = program ? program.dueDate : getVal([
        'due_date',
        'dueDate',
        'due_day'
    ]);
    let dueDate = null;
    if (rawDueDate !== undefined && rawDueDate !== null) {
        const num = Number(rawDueDate);
        if (Number.isFinite(num)) {
            dueDate = Math.min(Math.max(Math.floor(num), 1), 31);
        }
    }
    const rawMinSpend = program ? program.minSpendTarget : getVal([
        'min_spend',
        'minSpend'
    ]);
    const minSpend = rawMinSpend !== undefined && rawMinSpend !== null ? Number(rawMinSpend) : null;
    // Parse legacy tiered cashback
    const hasTiers = Boolean(getVal([
        'has_tiers',
        'hasTiers'
    ]));
    let tiers = undefined;
    if (hasTiers && Array.isArray(raw.tiers)) {
        tiers = raw.tiers.map((tier)=>({
                minSpend: Number(tier.minSpend ?? tier.min_spend ?? 0),
                categories: tier.categories ?? {},
                defaultRate: typeof tier.defaultRate === 'number' ? tier.defaultRate : undefined
            }));
    }
    // Graceful fallback: if statement_cycle is configured but statementDay is missing, use calendar_month
    if (cycleType === 'statement_cycle' && !statementDay) {
        cycleType = 'calendar_month';
    }
    return {
        rate: parsedRate,
        maxAmount,
        cycleType,
        statementDay,
        dueDate,
        minSpend,
        hasTiers,
        tiers,
        program
    };
}
const normalizeRate = (val)=>{
    const r = Number(val ?? 0);
    // Smart heuristic: In this project, rates >= 0.3 are almost certainly percentages (0.5 for 0.5%, 5 for 5%)
    // while rates < 0.3 are almost certainly decimals (0.003 for 0.3%, 0.15 for 15%)
    // We choose 0.3 because 30% is a common max for high-cat cashback (0.3), 
    // and 0.5 is a common base rate (0.5).
    if (r >= 0.3) return r / 100;
    return r;
};
function normalizeCashbackConfig(raw, account) {
    const parsed = parseCashbackConfig(raw);
    const program = parsed.program;
    // If account is provided with new cb_ columns, use them first
    if (account && account.cb_type && account.cb_type !== 'none') {
        return {
            defaultRate: normalizeRate(account.cb_base_rate ?? program?.defaultRate ?? 0),
            maxBudget: account.cb_is_unlimited ? null : Number(account.cb_max_budget ?? program?.maxBudget ?? 0),
            // Cycle info prioritization
            cycleType: account.cb_cycle_type || program?.cycleType || 'calendar_month',
            statementDay: account.statement_day ?? program?.statementDay ?? null,
            minSpendTarget: account.cb_min_spend ?? program?.minSpendTarget ?? null,
            dueDate: account.due_date ?? program?.dueDate ?? null,
            levels: (()=>{
                if (account.cb_type === 'tiered') {
                    const rawRules = account.cb_rules_json;
                    const tiers = Array.isArray(rawRules) ? rawRules : rawRules?.tiers || [];
                    return tiers.map((lvl)=>({
                            id: lvl.id || Math.random().toString(36).substr(2, 9),
                            name: lvl.name || "",
                            minTotalSpend: Number(lvl.minTotalSpend ?? lvl.min_spend ?? 0),
                            defaultRate: normalizeRate(lvl.defaultRate ?? lvl.base_rate),
                            maxReward: Number(lvl.maxReward ?? lvl.max_reward ?? 0) || null,
                            rules: (lvl.rules || lvl.policies || []).map((r)=>({
                                    id: r.id || Math.random().toString(36).substr(2, 9),
                                    categoryIds: r.categoryIds || r.cat_ids || [],
                                    rate: normalizeRate(r.rate),
                                    maxReward: r.maxReward !== undefined ? r.maxReward : r.max !== undefined ? r.max : null,
                                    description: r.description
                                }))
                        }));
                } else if (account.cb_type === 'simple' && Array.isArray(account.cb_rules_json)) {
                    return [
                        {
                            id: 'simple_level',
                            name: 'General',
                            minTotalSpend: 0,
                            defaultRate: normalizeRate(account.cb_base_rate),
                            maxReward: null,
                            rules: account.cb_rules_json.map((r)=>({
                                    id: r.id || Math.random().toString(36).substr(2, 9),
                                    categoryIds: r.categoryIds || r.cat_ids || [],
                                    rate: normalizeRate(r.rate),
                                    maxReward: r.maxReward !== undefined ? r.maxReward : r.max !== undefined ? r.max : null,
                                    description: r.description
                                }))
                        }
                    ];
                }
                return program?.levels?.map((lvl)=>({
                        ...lvl,
                        defaultRate: normalizeRate(lvl.defaultRate),
                        rules: lvl.rules?.map((r)=>({
                                ...r,
                                rate: normalizeRate(r.rate)
                            }))
                    })) || [];
            })()
        };
    }
    // If already in new format, just clean up and return
    if (parsed.program) {
        return {
            defaultRate: normalizeRate(parsed.program.defaultRate),
            maxBudget: parsed.program.maxBudget !== undefined ? parsed.program.maxBudget : null,
            cycleType: parsed.program.cycleType || 'calendar_month',
            statementDay: parsed.program.statementDay !== undefined ? parsed.program.statementDay : null,
            minSpendTarget: parsed.program.minSpendTarget !== undefined ? parsed.program.minSpendTarget : null,
            dueDate: parsed.program.dueDate !== undefined ? parsed.program.dueDate : null,
            levels: parsed.program.levels?.map((lvl)=>({
                    id: lvl.id,
                    name: lvl.name,
                    minTotalSpend: Number(lvl.minTotalSpend ?? 0),
                    defaultRate: normalizeRate(lvl.defaultRate),
                    maxReward: lvl.maxReward !== undefined ? lvl.maxReward : null,
                    rules: lvl.rules?.map((rule)=>({
                            id: rule.id,
                            categoryIds: rule.categoryIds || [],
                            rate: normalizeRate(rule.rate),
                            maxReward: rule.maxReward !== undefined ? rule.maxReward : null,
                            description: rule.description
                        })) || []
                })) || []
        };
    }
    // Fallback to legacy conversion
    return {
        defaultRate: parsed.rate,
        maxBudget: parsed.maxAmount,
        cycleType: parsed.cycleType || 'calendar_month',
        statementDay: parsed.statementDay,
        minSpendTarget: parsed.minSpend,
        dueDate: parsed.dueDate,
        levels: parsed.hasTiers && parsed.tiers ? parsed.tiers.map((tier, idx)=>({
                id: `lvl_${idx + 1}`,
                name: tier.name || `Level ${idx + 1}`,
                minTotalSpend: tier.minSpend,
                defaultRate: tier.defaultRate !== undefined ? tier.defaultRate : null,
                maxReward: null,
                rules: Object.entries(tier.categories || {}).map(([catKey, catData], rIdx)=>({
                        id: `rule_${idx + 1}_${rIdx + 1}`,
                        categoryIds: [
                            catKey
                        ],
                        rate: catData.rate ?? 0,
                        maxReward: catData.max_reward ?? catData.maxAmount ?? null
                    }))
            })) : []
    };
}
function parseCashbackConfig(raw, accountId = 'unknown') {
    if (!raw) {
        return {
            rate: 0,
            maxAmount: null,
            cycleType: null,
            statementDay: null,
            dueDate: null,
            minSpend: null,
            hasTiers: false,
            tiers: undefined
        };
    }
    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw);
            if (typeof parsed === 'string') {
                return parseCashbackConfig(parsed, accountId);
            }
            return parseConfigCandidate(parsed, accountId);
        } catch (e) {
            console.error(`[parseCashbackConfig] Failed to parse JSON string for account ${accountId}:`, e);
            return {
                rate: 0,
                maxAmount: null,
                cycleType: null,
                statementDay: null,
                dueDate: null,
                minSpend: null,
                hasTiers: false,
                tiers: undefined
            };
        }
    }
    if (typeof raw === 'object') {
        return parseConfigCandidate(raw, accountId);
    }
    return {
        rate: 0,
        maxAmount: null,
        cycleType: null,
        statementDay: null,
        dueDate: null,
        minSpend: null,
        hasTiers: false,
        tiers: undefined
    };
}
function getCashbackCycleRange(config, referenceDate = new Date()) {
    if (!config.cycleType) {
        return null;
    }
    const startOfCalendar = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
    const calendarEnd = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);
    if (config.cycleType === 'calendar_month') {
        startOfCalendar.setHours(0, 0, 0, 0);
        calendarEnd.setHours(23, 59, 59, 999);
        return {
            start: startOfCalendar,
            end: calendarEnd
        };
    }
    if (config.cycleType === 'statement_cycle' && !config.statementDay) {
        return null;
    }
    const day = config.statementDay;
    const referenceDay = referenceDate.getDate();
    const startOffset = referenceDay >= day ? 0 : -1;
    const endOffset = referenceDay >= day ? 1 : 0;
    const startBase = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + startOffset, 1);
    const start = clampToDay(startBase, day);
    // End date is 1 day BEFORE the next statement day
    // Example: statement_day = 25 → cycle is Nov 25 - Dec 24
    const endBase = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + endOffset, 1);
    const nextStatementDay = clampToDay(endBase, day);
    const end = new Date(nextStatementDay.getTime() - 24 * 60 * 60 * 1000) // Subtract 1 day
    ;
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return {
        start,
        end
    };
}
function clampToDay(base, day) {
    if (!day) {
        return base;
    }
    const candidate = new Date(base.getFullYear(), base.getMonth(), 1);
    const monthEnd = new Date(candidate.getFullYear(), candidate.getMonth() + 1, 0);
    const safeDay = Math.min(day, monthEnd.getDate());
    return new Date(candidate.getFullYear(), candidate.getMonth(), safeDay);
}
function calculateBankCashback(config, amount, categoryName, totalSpend = 0) {
    let earnedRate = config.rate;
    if (config.hasTiers && config.tiers && config.tiers.length > 0) {
        // Find the applicable tier based on total spend
        const applicableTier = config.tiers.filter((tier)=>totalSpend >= tier.minSpend).sort((a, b)=>b.minSpend - a.minSpend)[0];
        if (applicableTier) {
            if (categoryName) {
                const lowerCat = categoryName.toLowerCase();
                let categoryKey = null;
                for (const key of Object.keys(applicableTier.categories)){
                    if (lowerCat.includes(key.toLowerCase())) {
                        categoryKey = key;
                        break;
                    }
                }
                if (categoryKey && applicableTier.categories[categoryKey]) {
                    earnedRate = applicableTier.categories[categoryKey].rate;
                } else if (applicableTier.defaultRate !== undefined) {
                    earnedRate = applicableTier.defaultRate;
                }
            } else if (applicableTier.defaultRate !== undefined) {
                earnedRate = applicableTier.defaultRate;
            }
        }
    }
    return {
        amount: amount * earnedRate,
        rate: earnedRate
    };
}
function getMinSpendStatus(currentSpend, minSpendTarget) {
    const target = minSpendTarget || 0;
    const remaining = Math.max(0, target - currentSpend);
    const isTargetMet = currentSpend >= target;
    return {
        spent: currentSpend,
        remaining,
        isTargetMet
    };
}
function getCashbackCycleTag(referenceDate, config) {
    const minimalConfig = {
        rate: 0,
        maxAmount: null,
        cycleType: config.cycleType,
        statementDay: config.statementDay,
        dueDate: null,
        minSpend: null
    };
    const range = getCashbackCycleRange(minimalConfig, referenceDate);
    if (!range) return null;
    const end = range.end;
    return formatIsoCycleTag(end);
}
const CYCLE_MONTHS = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
];
function formatIsoCycleTag(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
}
function formatLegacyCycleTag(date) {
    const month = CYCLE_MONTHS[date.getMonth()];
    const year = String(date.getFullYear()).slice(2);
    return `${month}${year}`;
}
function parseCycleTag(tag) {
    if (!tag) return null;
    const isoMatch = tag.match(/^(\d{4})-(\d{2})$/);
    if (isoMatch) {
        const year = Number(isoMatch[1]);
        const month = Number(isoMatch[2]);
        if (Number.isFinite(year) && month >= 1 && month <= 12) {
            return {
                year,
                month
            };
        }
    }
    const dashedLegacyMatch = tag.match(/^([A-Z]{3})-(\d{4})$/);
    if (dashedLegacyMatch) {
        const monthIdx = CYCLE_MONTHS.indexOf(dashedLegacyMatch[1]);
        const year = Number(dashedLegacyMatch[2]);
        if (monthIdx >= 0 && Number.isFinite(year)) {
            return {
                year,
                month: monthIdx + 1
            };
        }
    }
    const legacyMatch = tag.match(/^([A-Z]{3})(\d{2})$/);
    if (legacyMatch) {
        const monthIdx = CYCLE_MONTHS.indexOf(legacyMatch[1]);
        const year = 2000 + Number(legacyMatch[2]);
        if (monthIdx >= 0 && Number.isFinite(year)) {
            return {
                year,
                month: monthIdx + 1
            };
        }
    }
    return null;
}
}),
"[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveCashbackPolicy",
    ()=>resolveCashbackPolicy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-route] (ecmascript)");
;
const DEBUG_CASHBACK = process.env.DEBUG_CASHBACK === 'true' || process.env.DEBUG_CASHBACK === '1';
function resolveCashbackPolicy(params) {
    const { account, amount, categoryId, categorySlug, categoryName, cycleTotals } = params;
    // PRIORITY 1: New Column-based Config
    if (account.cb_type && account.cb_type !== 'none') {
        const baseRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRate"])(account.cb_base_rate ?? 0);
        let finalRate = baseRate;
        let finalMaxReward = undefined;
        let source = {
            policySource: 'program_default',
            reason: 'Card base rate',
            rate: finalRate,
            ruleType: 'program_default',
            priority: 0
        };
        if (account.cb_type === 'tiered' && account.cb_rules_json) {
            // Support both object { tiers, base_rate } and legacy array
            const rawRules = account.cb_rules_json;
            const tiers = Array.isArray(rawRules) ? rawRules : rawRules.tiers || [];
            const tieredBaseRate = !Array.isArray(rawRules) && rawRules.base_rate !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRate"])(rawRules.base_rate) : baseRate;
            const sortedTiers = [
                ...tiers
            ].sort((a, b)=>b.min_spend - a.min_spend);
            const qualifiedTiers = sortedTiers.filter((t)=>cycleTotals.spent >= (t.min_spend ?? 0));
            let matchedPolicy = null;
            if (categoryId && qualifiedTiers.length > 0) {
                for (const tier of qualifiedTiers){
                    const policies = Array.isArray(tier.policies) ? tier.policies : tier.rules || [];
                    // Priority 1: ID Match (categoryIds or cat_ids)
                    let found = policies.find((p)=>p.categoryIds && p.categoryIds.includes(categoryId) || p.cat_ids && p.cat_ids.includes(categoryId) || categorySlug && p.categoryIds && p.categoryIds.includes(categorySlug) || categorySlug && p.cat_ids && p.cat_ids.includes(categorySlug));
                    // Priority 2: Name Match Heuristic
                    if (!found && categoryName) {
                        const lowerName = categoryName.toLowerCase();
                        found = policies.find((p)=>{
                            const names = (p.categoryNames || []).map((n)=>n.toLowerCase());
                            return names.some((n)=>lowerName.includes(n) || n.includes(lowerName));
                        });
                    }
                    if (found) {
                        matchedPolicy = {
                            ...found,
                            tier
                        };
                        break;
                    }
                }
            }
            if (matchedPolicy) {
                finalRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRate"])(matchedPolicy.rate ?? 0);
                finalMaxReward = matchedPolicy.max ?? matchedPolicy.maxReward ?? undefined;
                source = {
                    policySource: 'category_rule',
                    reason: categoryName ? `${categoryName} rule` : 'Category rule matched',
                    rate: finalRate,
                    levelId: matchedPolicy.tier.id || `tier-${matchedPolicy.tier.min_spend}`,
                    levelName: matchedPolicy.tier.name && matchedPolicy.tier.name !== "Standard" ? matchedPolicy.tier.name : "Dưới 15 triệu",
                    levelMinSpend: matchedPolicy.tier.min_spend,
                    categoryId: categoryId || undefined,
                    ruleId: matchedPolicy.id,
                    ruleMaxReward: finalMaxReward,
                    ruleType: 'category',
                    priority: 20
                };
            } else if (qualifiedTiers.length > 0) {
                const topTier = qualifiedTiers[0];
                finalRate = topTier.base_rate !== undefined && topTier.base_rate !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRate"])(topTier.base_rate) : tieredBaseRate;
                source = {
                    policySource: 'level_default',
                    reason: topTier.name ? `Level matched: ${topTier.name}` : `Tier matched: ≥${topTier.min_spend}`,
                    rate: finalRate,
                    levelId: topTier.id || `tier-${topTier.min_spend}`,
                    levelName: topTier.name && topTier.name !== "Standard" ? topTier.name : "Dưới 15 triệu",
                    levelMinSpend: topTier.min_spend,
                    ruleType: 'level_default',
                    priority: 10
                };
            } else {
                finalRate = tieredBaseRate;
                if (DEBUG_CASHBACK) {
                    console.log(`[Cashback Debug] Tiered: No qualified tiers, falling back to tiered base rate`);
                }
            }
        } else if (account.cb_type === 'simple' && Array.isArray(account.cb_rules_json)) {
            const rules = account.cb_rules_json;
            const matchedBySlug = categorySlug ? rules.find((r)=>r.categoryIds?.includes(categorySlug) || r.cat_ids?.includes(categorySlug)) : null;
            let matchedRule = (categoryId ? rules.find((r)=>r.categoryIds?.includes(categoryId) || r.cat_ids?.includes(categoryId)) : null) || matchedBySlug;
            // Fallback: if categoryId didn't match, try categoryName heuristic
            if (!matchedRule && categoryName) {
                const lowerName = categoryName.toLowerCase();
                matchedRule = rules.find((r)=>{
                    const names = (r.categoryNames || []).map((n)=>n.toLowerCase());
                    return names.some((n)=>lowerName.includes(n) || n.includes(lowerName));
                });
                if (matchedRule && DEBUG_CASHBACK) {
                    console.log(`[Cashback Debug] Simple: Name-based fallback matched for categoryName '${categoryName}'`);
                }
            }
            // Legacy fallback: if categoryId didn't match and no name match, try categoryName heuristic (old logic)
            if (!matchedRule && categoryName && rules.length > 0) {
                const lowerName = categoryName.toLowerCase();
                if (lowerName.includes('online') || lowerName.includes('shopping')) {
                    matchedRule = rules.find((r)=>(r.categoryNames || []).includes('online') || (r.categoryNames || []).includes('shopping'));
                }
                if (!matchedRule && rules.length > 0) {
                    matchedRule = rules[0]; // Use first rule as fallback
                }
                if (matchedRule && DEBUG_CASHBACK) {
                    console.log(`[Cashback Debug] Simple: Legacy name-based fallback matched for categoryName '${categoryName}'`);
                }
            }
            if (matchedRule) {
                finalRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRate"])(matchedRule.rate ?? 0);
                finalMaxReward = matchedRule.max ?? matchedRule.maxReward ?? undefined;
                source = {
                    policySource: 'category_rule',
                    reason: categoryName ? `${categoryName} rule` : 'Category rule matched',
                    rate: finalRate,
                    levelId: matchedRule.id,
                    categoryId: categoryId || undefined,
                    ruleId: matchedRule.id,
                    ruleMaxReward: finalMaxReward,
                    ruleType: 'category',
                    priority: 20
                };
            }
        }
        return {
            rate: finalRate,
            maxReward: finalMaxReward,
            minSpend: account.cb_min_spend ?? undefined,
            metadata: source
        };
    }
    // PRIORITY 2: Old JSON-based Config (Fallback for compatibility)
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id || 'unknown');
    // 1. If no MF5.3 program exists, fallback to Legacy Logic (MF5.2)
    if (!config.program) {
        const { rate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateBankCashback"])(config, amount, categoryName, cycleTotals.spent);
        // Fix: Ensure we return metadata even for legacy fallback, but strictly typed
        return {
            rate,
            minSpend: config.minSpend ?? undefined,
            metadata: {
                policySource: 'legacy',
                reason: `Legacy rule matched for ${categoryName || 'generic spend'}`,
                rate,
                ruleType: 'legacy',
                priority: 0
            }
        };
    }
    const { program } = config;
    // Default: Program fallback
    let finalRate = program.defaultRate;
    let finalMaxReward = undefined;
    // Base metadata: Program Default
    let source = {
        policySource: 'program_default',
        reason: 'Program default rate',
        rate: finalRate,
        ruleType: 'program_default',
        priority: 0
    };
    // Gate: if program has minSpendTarget and current spend is below it, skip levels and stay at program default
    const requiresMinSpend = typeof program.minSpendTarget === 'number' && program.minSpendTarget > 0;
    if (requiresMinSpend && program.minSpendTarget && cycleTotals.spent < program.minSpendTarget) {
        return {
            rate: program.defaultRate,
            maxReward: undefined,
            minSpend: program.minSpendTarget ?? undefined,
            metadata: {
                policySource: 'program_default',
                reason: `Below min spend target (${program.minSpendTarget})`,
                rate: program.defaultRate,
                ruleType: 'program_default',
                priority: 0
            }
        };
    }
    // 2. Aggregate all qualified levels based on spend (highest first)
    const sortedLevels = program.levels ? [
        ...program.levels
    ].sort((a, b)=>b.minTotalSpend - a.minTotalSpend) : [];
    const qualifiedLevels = sortedLevels.filter((lvl)=>cycleTotals.spent >= lvl.minTotalSpend);
    let matchedRule = undefined;
    // 3. Find the best matching Category Rule across ALL qualified levels
    // We prioritize rules in HIGHER levels, but search them all.
    if (categoryId && qualifiedLevels.length > 0) {
        for (const lvl of qualifiedLevels){
            if (lvl.rules && lvl.rules.length > 0) {
                const matchingRules = lvl.rules.filter((rule)=>{
                    const hasIdMatch = rule.categoryIds?.includes(categoryId) || rule.cat_ids?.includes(categoryId);
                    const hasSlugMatch = categorySlug && (rule.categoryIds?.includes(categorySlug) || rule.cat_ids?.includes(categorySlug));
                    if (hasIdMatch || hasSlugMatch) return true;
                    // Priority 2: Name Match Fallback
                    if (categoryName) {
                        const lowerName = categoryName.toLowerCase();
                        const names = (rule.categoryNames || []).map((n)=>n.toLowerCase());
                        return names.some((n)=>lowerName.includes(n) || n.includes(lowerName));
                    }
                    return false;
                });
                if (matchingRules.length > 0) {
                    // Sort matching rules within THIS level by specificity
                    const rulesWithIndex = matchingRules.map((r)=>({
                            ...r,
                            originalIndex: lvl.rules.indexOf(r)
                        }));
                    rulesWithIndex.sort((a, b)=>{
                        const specDiff = a.categoryIds.length - b.categoryIds.length;
                        if (specDiff !== 0) return specDiff;
                        return a.originalIndex - b.originalIndex;
                    });
                    // We found our candidate in the highest qualifying level that actually has a rule
                    matchedRule = {
                        ...rulesWithIndex[0],
                        level: lvl
                    };
                    break; // Stop searching lower levels as we found a match in high tier
                }
            }
        }
    }
    // 4. Determine final policy
    const applicableLevel = qualifiedLevels[0] // The actual tier user is in based on spend
    ;
    if (matchedRule) {
        // High Tier found a rule (either directly or inherited)
        // MF5.4.4: Support inheriting level default rate if rule rate is 0/null
        const ruleRate = matchedRule.rate > 0 ? matchedRule.rate : matchedRule.level.defaultRate ?? program.defaultRate;
        finalRate = ruleRate;
        finalMaxReward = matchedRule.maxReward ?? undefined;
        const reasonLabel = categoryName ? `${categoryName} rule (${matchedRule.level.name})` : `Category rule matched for level ${matchedRule.level.name}`;
        source = {
            policySource: 'category_rule',
            reason: reasonLabel,
            rate: finalRate,
            levelId: matchedRule.level.id,
            levelName: matchedRule.level.name && matchedRule.level.name !== "Standard" ? matchedRule.level.name : "Dưới 15 triệu",
            levelMinSpend: matchedRule.level.minTotalSpend,
            categoryId: categoryId || undefined,
            ruleId: matchedRule.id,
            ruleMaxReward: matchedRule.maxReward,
            ruleType: 'category',
            priority: 20
        };
    } else if (applicableLevel) {
        // No category rule found anywhere -> Tier Default
        const levelDefaultRate = applicableLevel.defaultRate ?? program.defaultRate;
        finalRate = levelDefaultRate;
        source = {
            policySource: 'level_default',
            reason: `Level matched: ${applicableLevel.name}`,
            rate: finalRate,
            levelId: applicableLevel.id,
            levelName: applicableLevel.name && applicableLevel.name !== "Standard" ? applicableLevel.name : "Dưới 15 triệu",
            levelMinSpend: applicableLevel.minTotalSpend,
            ruleType: 'level_default',
            priority: 10
        };
    }
    return {
        rate: finalRate,
        maxReward: finalMaxReward,
        minSpend: program.minSpendTarget ?? undefined,
        metadata: source
    };
}
}),
"[project]/src/services/pocketbase/cashback-sync.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4044d2d90262b0692f4f5554837935c9d6e107580d":"upsertPocketBaseTransactionCashback","406471e3b3afc4c6bffc4e8fb4e71982096708a5b9":"recomputePocketBaseCashbackCycle","6018ffacfc278fbfea52c2644cea02c8d3a3d1a232":"removePocketBaseTransactionCashback","7040f531ab39288ffe332fe22bf648ea834e7cc9e6":"ensurePocketBaseCycle"},"",""] */ __turbopack_context__.s([
    "ensurePocketBaseCycle",
    ()=>ensurePocketBaseCycle,
    "recomputePocketBaseCashbackCycle",
    ()=>recomputePocketBaseCashbackCycle,
    "removePocketBaseTransactionCashback",
    ()=>removePocketBaseTransactionCashback,
    "upsertPocketBaseTransactionCashback",
    ()=>upsertPocketBaseTransactionCashback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
async function ensurePocketBaseCycle(accountId, cycleTag, accountRecord) {
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    // 1. Try to fetch existing
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
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
    const deterministicId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(pbAccountId + cycleTag, 'cbcyc');
    const newCycle = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('cashback_cycles', {
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
async function recomputePocketBaseCashbackCycle(cycleId) {
    const cycle = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('cashback_cycles', cycleId);
    if (!cycle) return;
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', cycle.account_id);
    if (!account) return;
    // 1. Get all eligible transactions for this cycle
    // Note: We use 'status' != 'void' and 'type' in ['expense', 'debt']
    const txnsResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
        filter: `account_id='${cycle.account_id}' && persisted_cycle_tag='${cycle.cycle_tag}' && status!='void' && (type='expense' || type='debt' || type='invest' || type='transfer')`,
        perPage: 2000,
        expand: 'category_id'
    });
    const txns = txnsResp.items || [];
    // 2. Calculate current cycle spent
    const totalSpent = txns.reduce((sum, t)=>sum + Math.abs(Number(t.amount || 0)), 0);
    let realAwardedTotal = 0;
    let virtualProfitTotal = 0;
    let overflowLossTotal = 0;
    // Group by Rule/Tier for capping (Mirroring Supabase logic)
    const ruleGroupSums = {};
    let totalShared = 0;
    for (const txn of txns){
        const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
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
            cycleTotals: {
                spent: totalSpent
            },
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                cashback_amount: rewardAmount,
                final_price: newFinalPrice,
                metadata: {
                    ...txn.metadata || {},
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
                    ruleGroupSums[meta.ruleId] = {
                        total: 0,
                        max: meta.ruleMaxReward ?? null
                    };
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
        const sharedAmount = sharePercent * Math.abs(txn.amount) + shareFixed;
        // Priority: if a direct share amount is present, use it
        const txShared = Number(txn.cashback_share_amount) > 0 ? Number(txn.cashback_share_amount) : sharedAmount;
        totalShared += isNaN(txShared) ? 0 : txShared;
    }
    // Apply Rule Caps
    for(const ruleId in ruleGroupSums){
        const group = ruleGroupSums[ruleId];
        if (group.max !== null && group.max > 0) {
            const capped = Math.min(group.total, group.max);
            virtualProfitTotal += capped;
            overflowLossTotal += group.total - capped;
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
    const isExhausted = !isUnlimited && maxBudget !== null && finalReal + finalVirtual >= maxBudget;
    // Determine tier name for the return object
    let tierName = "Dưới 15 triệu"; // Default for VPBank or general
    if (txns.length > 0) {
        // Resolve once more with current total spent to get final tier name
        const firstTx = txns[0];
        const tierPolicy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
            account: account,
            categoryId: firstTx.category_id,
            amount: Math.abs(firstTx.amount),
            cycleTotals: {
                spent: totalSpent
            }
        });
        tierName = tierPolicy.metadata.levelName && tierPolicy.metadata.levelName !== "Standard" ? tierPolicy.metadata.levelName : "Dưới 15 triệu";
    }
    // 3. Update Cycle Snapshot
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('cashback_cycles', cycle.id, {
        spent_amount: totalSpent,
        real_awarded: finalReal,
        virtual_profit: finalVirtual,
        overflow_loss: overflowLossTotal,
        met_min_spend: metMinSpend,
        is_exhausted: isExhausted,
        max_budget: maxBudget,
        min_spend_target: account.cb_min_spend,
        shared_amount: totalShared,
        total_profit: finalReal + finalVirtual - totalShared,
        matched_tier: tierName
    });
    return {
        spent: totalSpent,
        earned: finalReal + finalVirtual,
        shared: totalShared,
        profit: finalReal + finalVirtual - totalShared,
        tierName
    };
}
async function upsertPocketBaseTransactionCashback(transactionId) {
    // Use source ID mapping if necessary
    const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(transactionId, 'pvl_txn_001');
    const txn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbTxnId);
    if (!txn) return;
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', txn.account_id);
    if (!account || account.type !== 'credit_card') return;
    // Resolve Cycle Tag
    const date = new Date(txn.occurred_at || txn.date);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(cycleRange?.end ?? date);
    const cycle = await ensurePocketBaseCycle(account.id, cycleTag, account);
    // Persist cycle tag to transaction if not already set
    if (txn.persisted_cycle_tag !== cycleTag) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
            persisted_cycle_tag: cycleTag
        });
    }
    // Trigger Recompute
    await recomputePocketBaseCashbackCycle(cycle.id);
}
async function removePocketBaseTransactionCashback(sourceAccountId, cycleTag) {
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceAccountId, 'accounts');
    const cycleResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
        filter: `account_id='${pbAccountId}' && cycle_tag='${cycleTag}'`,
        perPage: 1
    });
    if (cycleResp.items && cycleResp.items.length > 0) {
        await recomputePocketBaseCashbackCycle(cycleResp.items[0].id);
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    ensurePocketBaseCycle,
    recomputePocketBaseCashbackCycle,
    upsertPocketBaseTransactionCashback,
    removePocketBaseTransactionCashback
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(ensurePocketBaseCycle, "7040f531ab39288ffe332fe22bf648ea834e7cc9e6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(recomputePocketBaseCashbackCycle, "406471e3b3afc4c6bffc4e8fb4e71982096708a5b9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertPocketBaseTransactionCashback, "4044d2d90262b0692f4f5554837935c9d6e107580d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(removePocketBaseTransactionCashback, "6018ffacfc278fbfea52c2644cea02c8d3a3d1a232", null);
}),
"[project]/src/lib/account-balance.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeAccountTotals",
    ()=>computeAccountTotals,
    "getCreditCardAvailableBalance",
    ()=>getCreditCardAvailableBalance,
    "getCreditCardDebt",
    ()=>getCreditCardDebt,
    "getCreditCardUsage",
    ()=>getCreditCardUsage
]);
const isIncomingType = (type)=>type === 'income' || type === 'repayment';
function computeAccountTotals(params) {
    const { accountId, accountType, transactions } = params;
    let totalIn = 0;
    let totalOut = 0;
    for (const txn of transactions){
        if (!txn) continue;
        if (txn.status === 'void') continue;
        const amountAbs = Math.abs(Number(txn.amount) || 0);
        if (!amountAbs) continue;
        if (txn.account_id === accountId) {
            if (isIncomingType(txn.type)) {
                totalIn += amountAbs;
            } else {
                totalOut -= amountAbs;
            }
            continue;
        }
        if (txn.target_account_id === accountId) {
            totalIn += amountAbs;
        }
    }
    const netFlow = totalIn + totalOut;
    const currentBalance = accountType === 'credit_card' ? Math.abs(totalOut) - totalIn : netFlow;
    return {
        totalIn,
        totalOut,
        currentBalance
    };
}
function getCreditCardDebt(balance) {
    return balance ?? 0;
}
function getCreditCardAvailableBalance(account) {
    if (account.type !== 'credit_card') {
        return account.current_balance ?? 0;
    }
    const limit = account.credit_limit ?? 0;
    const debt = getCreditCardDebt(account.current_balance);
    return limit - debt;
}
function getCreditCardUsage(account) {
    const limit = account.credit_limit ?? 0;
    if (account.type !== 'credit_card' || limit <= 0) {
        return {
            limit,
            used: Math.abs(account.current_balance ?? 0),
            percent: 0
        };
    }
    const debt = getCreditCardDebt(account.current_balance);
    const used = Math.max(0, debt);
    const percent = limit > 0 ? used / limit * 100 : 0;
    return {
        limit,
        used,
        percent
    };
}
}),
"[project]/src/lib/cycle-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateStatementCycle",
    ()=>calculateStatementCycle,
    "formatCycleTag",
    ()=>formatCycleTag,
    "formatCycleTagWithYear",
    ()=>formatCycleTagWithYear,
    "resolveTransactionCycleTag",
    ()=>resolveTransactionCycleTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setDate.js [app-route] (ecmascript)");
;
;
function formatCycleTag(tag, statementDay = 25) {
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tag);
    if (!normalized || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalized)) return tag;
    const [yearStr, monthStr] = normalized.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr) // 1..12
    ;
    if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return tag;
    // Example: statementDay = 20
    // Cycle starts on (statementDay) of previous month
    // Cycle ends on (statementDay - 1) of current month
    // 20.03 - 19.04
    const cycleStartDay = statementDay;
    const cycleEndDay = statementDay - 1 || 28 // Handle edge case if day is 1
    ;
    const startMonth = month === 1 ? 12 : month - 1;
    const endMonth = month;
    const formatDay = (day)=>String(day).padStart(2, '0');
    const formatMonth = (m)=>String(m).padStart(2, '0');
    return `${formatDay(cycleStartDay)}.${formatMonth(startMonth)} - ${formatDay(cycleEndDay)}.${formatMonth(endMonth)}`;
}
function formatCycleTagWithYear(tag, statementDay = 25) {
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tag);
    if (!normalized || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalized)) return tag;
    const [yearStr, monthStr] = normalized.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr) // 1..12
    ;
    if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return tag;
    const cycleStartDay = statementDay;
    const cycleEndDay = statementDay - 1 || 28;
    const startMonth = month === 1 ? 12 : month - 1;
    const startYear = month === 1 ? year - 1 : year;
    const endMonth = month;
    const endYear = year;
    const formatDay = (day)=>String(day).padStart(2, '0');
    const formatMonth = (m)=>String(m).padStart(2, '0');
    return `${formatDay(cycleStartDay)}.${formatMonth(startMonth)}.${startYear} - ${formatDay(cycleEndDay)}.${formatMonth(endMonth)}.${endYear}`;
}
function calculateStatementCycle(date, statementDay) {
    if (!statementDay || statementDay > 31) {
        // Fallback or handle invalid statement day
        return null;
    }
    const targetDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    const day = targetDate.getDate();
    // Cycle ends on statementDay.
    // Start depends on month.
    let cycleEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["startOfDay"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setDate"])(targetDate, statementDay));
    // If current day > statementDay, we are in NEXT cycle (which ends next month)
    // If current day <= statementDay, we are in CURRENT cycle (which ends this month)
    if (day > statementDay) {
        cycleEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(cycleEndDate, 1);
    }
    // Cycle Start is (Cycle End - 1 month) + 1 day
    const cycleStartDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMonths"])(cycleEndDate, -1);
    cycleStartDate.setDate(cycleStartDate.getDate() + 1);
    return {
        start: cycleStartDate,
        end: cycleEndDate
    };
}
function resolveTransactionCycleTag(transaction, account) {
    const persisted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.persisted_cycle_tag || "");
    if (persisted) return persisted;
    const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.derived_cycle_tag || "");
    if (derived) return derived;
    const statementDay = Number(account.statement_day || 0);
    if (account.type === "credit_card" && statementDay > 0) {
        const rawDate = transaction.occurred_at || transaction.date || transaction.created_at;
        if (rawDate) {
            const parsed = new Date(rawDate);
            if (!Number.isNaN(parsed.getTime())) {
                let year = parsed.getFullYear();
                let month = parsed.getMonth() + 1;
                if (parsed.getDate() > statementDay) {
                    month += 1;
                    if (month > 12) {
                        month = 1;
                        year += 1;
                    }
                }
                return `${year}-${String(month).padStart(2, "0")}`;
            }
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.tag || "") || "";
}
}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.7.0_@supabase+supabase-js@2.100.0/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.7.0_@supabase+supabase-js@2.100.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
function createClient() {
    const cookieStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://puzvrlojtgneihgvevcx.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1enZybG9qdGduZWloZ3ZldmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDI5NTksImV4cCI6MjA3OTExODk1OX0.fAVI34PhJBDxN8iZU6Eb_EPfE5YKJ9sg-oDI0LzlU4w"), {
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
"[project]/src/services/pocketbase/people.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPocketBasePerson",
    ()=>createPocketBasePerson,
    "deletePocketBasePerson",
    ()=>deletePocketBasePerson,
    "getPocketBasePeople",
    ()=>getPocketBasePeople,
    "getPocketBasePersonById",
    ()=>getPocketBasePersonById,
    "getPocketBasePersonDetails",
    ()=>getPocketBasePersonDetails,
    "resolvePocketBasePersonRecord",
    ()=>resolvePocketBasePersonRecord,
    "updatePocketBasePerson",
    ()=>updatePocketBasePerson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
;
;
;
const isUuid = (value)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
function mapPerson(record) {
    return {
        id: String(record.id || ''),
        pocketbase_id: typeof record.id === 'string' ? record.id : null,
        created_at: typeof record.created === 'string' ? record.created : undefined,
        name: String(record.name || ''),
        image_url: record.image_url ?? null,
        sheet_link: record.sheet_link ?? null,
        google_sheet_url: record.google_sheet_url ?? null,
        sheet_full_img: record.sheet_full_img ?? null,
        sheet_show_bank_account: record.sheet_show_bank_account ?? null,
        sheet_bank_info: record.sheet_bank_info ?? null,
        sheet_linked_bank_id: record.sheet_linked_bank_id ?? null,
        sheet_show_qr_image: record.sheet_show_qr_image ?? null,
        is_master_sheet_enabled: record.is_master_sheet_enabled ?? null,
        is_owner: record.is_owner ?? null,
        is_archived: record.is_archived ?? null,
        is_favorite: record.is_favorite ?? null,
        is_group: record.is_group ?? null,
        group_parent_id: record.group_parent_id ?? null
    };
}
async function resolvePocketBasePersonRecord(sourceOrPocketBaseId) {
    if (!sourceOrPocketBaseId) return null;
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_people_001', sourceOrPocketBaseId);
    } catch  {
    // continue
    }
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceOrPocketBaseId);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_people_001', pbId);
    } catch  {
    // continue
    }
    try {
        const escapedId = sourceOrPocketBaseId.replace(/'/g, "\\'");
        const bySlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_people_001', {
            perPage: 1,
            page: 1,
            filter: `slug='${escapedId}'`
        });
        return bySlug.items?.[0] ?? null;
    } catch  {
        return null;
    }
}
async function getPocketBasePeople() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', 'people.list');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_people_001', {
            perPage: 500,
            page: 1
        });
        return response.items.map(mapPerson).sort((a, b)=>a.name.localeCompare(b.name));
    }, async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('SB', 'people.list fallback');
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('people').select('id, created_at, name, image_url, sheet_link, google_sheet_url, is_owner, is_archived, is_favorite, is_group, group_parent_id, sheet_full_img, sheet_show_bank_account, sheet_bank_info, sheet_linked_bank_id, sheet_show_qr_image, is_master_sheet_enabled').order('name', {
            ascending: true
        });
        if (error) throw error;
        const rows = data ?? [];
        return rows.map((item)=>({
                id: item.id,
                created_at: item.created_at ?? undefined,
                name: item.name,
                image_url: item.image_url,
                sheet_link: item.sheet_link,
                google_sheet_url: item.google_sheet_url,
                is_owner: item.is_owner,
                is_archived: item.is_archived,
                is_favorite: item.is_favorite,
                is_group: item.is_group,
                group_parent_id: item.group_parent_id,
                sheet_full_img: item.sheet_full_img,
                sheet_show_bank_account: item.sheet_show_bank_account,
                sheet_bank_info: item.sheet_bank_info,
                sheet_linked_bank_id: item.sheet_linked_bank_id,
                sheet_show_qr_image: item.sheet_show_qr_image,
                is_master_sheet_enabled: item.is_master_sheet_enabled
            }));
    }, 'people.list');
}
async function getPocketBasePersonDetails(sourceOrPocketBaseId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', 'people.get', {
            sourceOrPocketBaseId
        });
        const personRecord = await resolvePocketBasePersonRecord(sourceOrPocketBaseId);
        if (!personRecord) return null;
        const mapped = mapPerson(personRecord);
        const sourcePersonId = (()=>{
            if (typeof personRecord.slug === 'string' && isUuid(personRecord.slug)) return personRecord.slug;
            if (typeof personRecord.source_id === 'string' && isUuid(personRecord.source_id)) return personRecord.source_id;
            if (isUuid(sourceOrPocketBaseId)) return sourceOrPocketBaseId;
            if (isUuid(mapped.id)) return mapped.id;
            return null;
        })();
        if (!sourcePersonId) {
            return mapped;
        }
        // 1. Base hydration from people table (Wait! PB Schema now has these fields, rely on PB)
        const hydrated = {
            ...mapped
        };
        // 2. Fallbacks for missing configurations
        // Fallback for sheet_link (webhook link)
        if (!hydrated.sheet_link) {
            try {
                const escapedName = mapped.name.replace(/'/g, "\\'");
                const webhookDataByName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('sheet_webhook_links', {
                    filter: `name ~ '${escapedName}'`,
                    sort: '-created',
                    perPage: 1
                });
                let webhookLink = webhookDataByName.items?.[0] || null;
                if (!webhookLink) {
                    const webhookDataLatest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('sheet_webhook_links', {
                        sort: '-created',
                        perPage: 1
                    });
                    webhookLink = webhookDataLatest.items?.[0] || null;
                }
                if (webhookLink?.url) {
                    hydrated.sheet_link = String(webhookLink.url);
                }
            } catch (err) {
                console.warn('[PB: Fallback] Failed to fetch sheet_webhook_links from PocketBase', err);
            }
        }
        // Fallback for google_sheet_url (from cycle sheets)
        if (!hydrated.google_sheet_url && personRecord.id) {
            try {
                const cycleSheetRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('person_cycle_sheets', {
                    filter: `person_id='${personRecord.id}' && sheet_url != null && sheet_url != ''`,
                    sort: '-updated,-created',
                    perPage: 1
                });
                const latest = cycleSheetRows.items?.[0] || null;
                if (latest?.sheet_url) {
                    hydrated.google_sheet_url = String(latest.sheet_url);
                }
            } catch (err) {
                console.warn('[PB: Fallback] Failed to fetch person_cycle_sheets from PocketBase', err);
            }
        }
        console.log(`[people.service] Merge config for ${mapped.name}:`, {
            sheet_link: !!hydrated.sheet_link,
            google_sheet_url: !!hydrated.google_sheet_url,
            sheet_linked_bank_id: !!hydrated.sheet_linked_bank_id
        });
        return hydrated;
    }, async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('SB', 'people.get fallback', {
            sourceOrPocketBaseId
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from('people').select('id, created_at, name, image_url, sheet_link, google_sheet_url, is_owner, is_archived, is_favorite, is_group, group_parent_id, sheet_full_img, sheet_show_bank_account, sheet_bank_info, sheet_linked_bank_id, sheet_show_qr_image, is_master_sheet_enabled').eq('id', sourceOrPocketBaseId).maybeSingle();
        if (error) throw error;
        if (!data) return null;
        const row = data;
        return {
            id: row.id,
            created_at: row.created_at ?? undefined,
            name: row.name,
            image_url: row.image_url,
            sheet_link: row.sheet_link,
            google_sheet_url: row.google_sheet_url,
            is_owner: row.is_owner,
            is_archived: row.is_archived,
            is_favorite: row.is_favorite,
            is_group: row.is_group,
            group_parent_id: row.group_parent_id,
            sheet_full_img: row.sheet_full_img,
            sheet_show_bank_account: row.sheet_show_bank_account,
            sheet_bank_info: row.sheet_bank_info,
            sheet_linked_bank_id: row.sheet_linked_bank_id,
            sheet_show_qr_image: row.sheet_show_qr_image,
            is_master_sheet_enabled: row.is_master_sheet_enabled
        };
    }, 'people.get');
}
async function getPocketBasePersonById(sourceOrPocketBaseId) {
    return getPocketBasePersonDetails(sourceOrPocketBaseId);
}
async function createPocketBasePerson(data) {
    const pbId = data.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.slug || crypto.randomUUID());
    const payload = {
        ...data,
        id: pbId,
        slug: data.slug || pbId,
        group_parent_id: data.group_parent_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.group_parent_id) : null
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('PB', 'people.create', {
        id: pbId,
        name: data.name
    });
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_people_001', payload);
}
async function updatePocketBasePerson(sourceOrPocketBaseId, data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const record = await resolvePocketBasePersonRecord(sourceOrPocketBaseId);
        if (!record?.id) return false;
        const body = {
            ...data
        };
        if (typeof body.group_parent_id === 'string' && body.group_parent_id) {
            body.group_parent_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.group_parent_id);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_people_001', String(record.id), body);
        return true;
    }, async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('SB', 'people.update fallback', {
            sourceOrPocketBaseId
        });
        return false;
    }, 'people.update');
}
async function deletePocketBasePerson(sourceOrPocketBaseId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const record = await resolvePocketBasePersonRecord(sourceOrPocketBaseId);
        if (!record?.id) return false;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('pvl_people_001', String(record.id));
        return true;
    }, async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])('SB', 'people.delete fallback', {
            sourceOrPocketBaseId
        });
        return false;
    }, 'people.delete');
}
}),
"[project]/src/services/pocketbase/account-details.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002a898d7c54ec37a539700d141d3a0514769e454d":"getPocketBaseAccounts","003fecc48b4a8d84a9c206f2a376a286d144948b6c":"getPocketBasePeople","00a99d07da0ffa6edf89fca7661ada7e851048a53b":"getPocketBaseCategories","00e9a9159e02410170ca6418c4f77c8b6073d34da9":"getPocketBaseShops","40277ba161d3823e951c89b283ce288415a9b41781":"deletePocketBaseCategory","402fa642027c62195e4eb5886632462c7a773aac70":"getPocketBaseAccountDetails","4053262b07f6dd7801736756aa64d3d2e3941f4bab":"voidPocketBaseTransaction","4066ca9177621e1b39abfd7be3456be172332d2b06":"deletePocketBaseShopsBulk","40717a7a9c77b085415c89a8b772f1d16ae963462e":"getPocketBaseInstallmentPlan","40bff4340a0852e8a671524ab048c8be5cfb814988":"loadPocketBaseTransactions","40d107fe5fc3ab8d8f6207c36937964b57ae7b5ee1":"deletePocketBaseShop","40dd32d38172c7cc26ce4e646eb791fc3ca8413117":"getPocketBaseUnifiedTransactions","40e4fba241bfe5b9e3eeb76bf81effe6f5c519f47c":"getPocketBaseTransactionsByPlan","40f953956d9a43206b9dce58413952d7bd486ccda6":"deletePocketBaseCategoriesBulk","601920d1f45fd2a3cff62dff9ee571b0c9b1843e6c":"loadPocketBaseTransactionsForAccount","6023079c39832c8af0b398805dfb48c1a4449279b7":"updatePocketBasePerson","60232a301d81b8959e3868d6e020f6e0d9ff35f663":"createPocketBaseAccount","6025de515decff3bfa041ff71da2f6ac0af4beeecb":"createPocketBaseCategory","6027a1fc10f815068ca6cda24879ac901495563ecc":"getPocketBaseAccountCycleOptions","6035ed526f1abffb414d8271e3e8c6ae91c2cd839b":"createPocketBasePerson","605899ace4b81f45316460743a2013532c987f41cd":"updatePocketBaseAccountInfo","6082e7249080bcc58476fde7fb3be4fb0be3669a2d":"createPocketBaseShop","60a11c676e6aa52c541ac21f5e09bdea0ef597c62c":"togglePocketBaseShopsArchiveBulk","60b8096874692b44bbdf1333d6df8ffa0c5553b702":"togglePocketBaseShopArchive","60bc5b2e1127d594e5793c6adfe5076ab91132cae1":"updatePocketBaseShop","60c20c657fe2dd464e466b715e911dfe9abd0ff3f7":"getPocketBaseCycleTransactions","60d13f1a0e21276cb0d2a3b6017793e34997846e0c":"updatePocketBaseCategory","60e46497116fd02e3cccbf1253dd59b2c7caaf6f30":"togglePocketBaseCategoriesArchiveBulk","60ebf7d27dd75d6578dd938ac9f373990175992efb":"updatePocketBaseAccountConfig","60f73621f96825d120610c9cabf1567281a77acc67":"createPocketBaseTransaction","60f98472fe852ce8cfcf43a99f02a20bcbbebdaecc":"updatePocketBaseTransaction","60faa68021b70476585ccb8dad29fc58bc12da82e9":"togglePocketBaseCategoryArchive","7057a9bcd998a119cb12e0a05739a03667b3c07e2d":"getPocketBaseAccountSpendingStatsSnapshot"},"",""] */ __turbopack_context__.s([
    "createPocketBaseAccount",
    ()=>createPocketBaseAccount,
    "createPocketBaseCategory",
    ()=>createPocketBaseCategory,
    "createPocketBasePerson",
    ()=>createPocketBasePerson,
    "createPocketBaseShop",
    ()=>createPocketBaseShop,
    "createPocketBaseTransaction",
    ()=>createPocketBaseTransaction,
    "deletePocketBaseCategoriesBulk",
    ()=>deletePocketBaseCategoriesBulk,
    "deletePocketBaseCategory",
    ()=>deletePocketBaseCategory,
    "deletePocketBaseShop",
    ()=>deletePocketBaseShop,
    "deletePocketBaseShopsBulk",
    ()=>deletePocketBaseShopsBulk,
    "getPocketBaseAccountCycleOptions",
    ()=>getPocketBaseAccountCycleOptions,
    "getPocketBaseAccountDetails",
    ()=>getPocketBaseAccountDetails,
    "getPocketBaseAccountSpendingStatsSnapshot",
    ()=>getPocketBaseAccountSpendingStatsSnapshot,
    "getPocketBaseAccounts",
    ()=>getPocketBaseAccounts,
    "getPocketBaseCategories",
    ()=>getPocketBaseCategories,
    "getPocketBaseCycleTransactions",
    ()=>getPocketBaseCycleTransactions,
    "getPocketBaseInstallmentPlan",
    ()=>getPocketBaseInstallmentPlan,
    "getPocketBasePeople",
    ()=>getPocketBasePeople,
    "getPocketBaseShops",
    ()=>getPocketBaseShops,
    "getPocketBaseTransactionsByPlan",
    ()=>getPocketBaseTransactionsByPlan,
    "getPocketBaseUnifiedTransactions",
    ()=>getPocketBaseUnifiedTransactions,
    "loadPocketBaseTransactions",
    ()=>loadPocketBaseTransactions,
    "loadPocketBaseTransactionsForAccount",
    ()=>loadPocketBaseTransactionsForAccount,
    "togglePocketBaseCategoriesArchiveBulk",
    ()=>togglePocketBaseCategoriesArchiveBulk,
    "togglePocketBaseCategoryArchive",
    ()=>togglePocketBaseCategoryArchive,
    "togglePocketBaseShopArchive",
    ()=>togglePocketBaseShopArchive,
    "togglePocketBaseShopsArchiveBulk",
    ()=>togglePocketBaseShopsArchiveBulk,
    "updatePocketBaseAccountConfig",
    ()=>updatePocketBaseAccountConfig,
    "updatePocketBaseAccountInfo",
    ()=>updatePocketBaseAccountInfo,
    "updatePocketBaseCategory",
    ()=>updatePocketBaseCategory,
    "updatePocketBasePerson",
    ()=>updatePocketBasePerson,
    "updatePocketBaseShop",
    ()=>updatePocketBaseShop,
    "updatePocketBaseTransaction",
    ()=>updatePocketBaseTransaction,
    "voidPocketBaseTransaction",
    ()=>voidPocketBaseTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/account-balance.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycle-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/people.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
function chunkArray(items, size) {
    if (size <= 0) return [
        items
    ];
    const chunks = [];
    for(let index = 0; index < items.length; index += size){
        chunks.push(items.slice(index, index + size));
    }
    return chunks;
}
function toAccountType(value) {
    if (!value) return "bank";
    if (value === "e_wallet") return "ewallet";
    if (value === "credit_card" || value === "debt" || value === "savings" || value === "investment" || value === "asset" || value === "system") {
        return value;
    }
    return "bank";
}
function mapAccount(record) {
    return {
        id: record.id,
        name: record.name,
        type: toAccountType(record.type),
        currency: record.currency || "VND",
        current_balance: Number(record.current_balance || 0),
        credit_limit: Number(record.credit_limit || 0),
        owner_id: record.owner_id || "",
        cashback_config: record.cashback_config ?? null,
        cashback_config_version: Number(record.cashback_config_version || 1),
        parent_account_id: record.parent_account_id || null,
        account_number: record.account_number || null,
        secured_by_account_id: record.secured_by_account_id || null,
        is_active: typeof record.is_active === "boolean" ? record.is_active : true,
        image_url: record.image_url || null,
        receiver_name: record.receiver_name || null,
        total_in: Number(record.total_in || 0),
        total_out: Number(record.total_out || 0),
        annual_fee: record.annual_fee ?? null,
        annual_fee_waiver_target: record.annual_fee_waiver_target ?? null,
        cb_type: record.cb_type || "none",
        cb_base_rate: Number(record.cb_base_rate || 0),
        cb_max_budget: record.cb_max_budget ?? null,
        cb_is_unlimited: Boolean(record.cb_is_unlimited),
        cb_rules_json: record.cb_rules_json ?? null,
        cb_min_spend: record.cb_min_spend ?? null,
        cb_cycle_type: record.cb_cycle_type || "calendar_month",
        statement_day: record.statement_day ?? null,
        due_date: record.due_date ?? null,
        holder_type: record.holder_type || "me",
        holder_person_id: record.holder_person_id || null,
        stats: null,
        relationships: null
    };
}
function mapCategory(record) {
    return {
        id: record.id,
        name: record.name,
        type: (record.type || "expense").toLowerCase(),
        icon: record.icon || null,
        image_url: record.image_url || null,
        kind: record.kind || null,
        is_archived: Boolean(record.is_archived || false),
        slug: record.slug || null
    };
}
function mapPerson(record) {
    return {
        id: record.id,
        name: record.name,
        image_url: record.image_url || null,
        sheet_link: record.sheet_link || null,
        google_sheet_url: record.google_sheet_url || null,
        is_owner: Boolean(record.is_owner || false)
    };
}
function mapShop(record) {
    return {
        id: record.id,
        name: record.name,
        image_url: record.image_url || null,
        default_category_id: record.default_category_id || null,
        is_archived: Boolean(record.is_archived || false)
    };
}
function mapInstallment(record) {
    const expandedTxn = record.expand?.original_transaction_id;
    const expandedAccount = expandedTxn?.expand?.account_id;
    const expandedPerson = expandedTxn?.expand?.person_id;
    return {
        id: record.id,
        created_at: record.created || record.created_at,
        original_transaction_id: record.original_transaction_id || null,
        owner_id: record.owner_id || "",
        debtor_id: record.debtor_id || null,
        name: record.name || "Untitled Plan",
        total_amount: Number(record.total_amount || 0),
        conversion_fee: Number(record.conversion_fee || 0),
        term_months: Number(record.term_months || 0),
        total_months: Number(record.term_months || 0),
        months_paid: Number(record.months_paid || 0),
        monthly_amount: Number(record.monthly_amount || 0),
        start_date: record.start_date || record.created,
        remaining_amount: Number(record.remaining_amount || 0),
        next_due_date: record.next_due_date || null,
        status: record.status || "active",
        type: record.type || "credit_card",
        expand: record.expand || null,
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
function parseCycleTagFromTransaction(record) {
    if (record.persisted_cycle_tag) return String(record.persisted_cycle_tag);
    if (record.tag) return String(record.tag);
    if (record.metadata && typeof record.metadata === "object" && record.metadata.persisted_cycle_tag) {
        return String(record.metadata.persisted_cycle_tag);
    }
    return null;
}
function inferTieredPolicyByCategoryName(account, categoryName) {
    if (!categoryName || account.cb_type !== "tiered") return null;
    const tiers = Array.isArray(account.cb_rules_json?.tiers) ? account.cb_rules_json.tiers : [];
    const policies = tiers[0]?.policies || [];
    if (policies.length === 0) return null;
    const normalizedPolicies = policies.map((item)=>({
            rate: Number(item.rate || 0),
            maxReward: item.max != null ? Number(item.max) : undefined
        })).filter((item)=>item.rate > 0);
    if (normalizedPolicies.length === 0) return null;
    const lowerName = categoryName.toLowerCase();
    const byRateAsc = [
        ...normalizedPolicies
    ].sort((left, right)=>left.rate - right.rate);
    const byRateDesc = [
        ...normalizedPolicies
    ].sort((left, right)=>right.rate - left.rate);
    if (lowerName.includes("online")) {
        return byRateAsc[0];
    }
    if (lowerName.includes("offline") || lowerName.includes("utilities") || lowerName.includes("utility")) {
        return byRateDesc[0];
    }
    return null;
}
function mapTransaction(record, currentAccountSourceId, historyCount = 0) {
    const expandedAccount = record.expand?.account_id;
    const expandedTargetAccount = record.expand?.to_account_id;
    const expandedCategory = record.expand?.category_id;
    const expandedShop = record.expand?.shop_id;
    const expandedPerson = record.expand?.person_id;
    const sourceAccountPocketBaseId = expandedAccount?.id || record.account_id || null;
    const targetAccountPocketBaseId = expandedTargetAccount?.id || record.to_account_id || null;
    const sourceAccountSourceId = expandedAccount?.slug || (record.account_id === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(currentAccountSourceId, "accounts") ? currentAccountSourceId : record.account_id);
    const targetAccountSourceId = expandedTargetAccount?.slug || record.to_account_id || null;
    return {
        id: record.id,
        // PB collection uses 'date' field (not 'occurred_at')
        occurred_at: record.date || record.occurred_at,
        date: record.date || record.occurred_at,
        note: record.note || record.description || null,
        amount: Number(record.amount || 0),
        final_price: Number(record.final_price || 0),
        type: record.type,
        status: record.status || "posted",
        account_id: sourceAccountPocketBaseId,
        target_account_id: targetAccountPocketBaseId,
        to_account_id: targetAccountPocketBaseId,
        source_account_id: sourceAccountPocketBaseId,
        destination_account_id: targetAccountPocketBaseId,
        source_name: expandedAccount?.name || null,
        source_image: expandedAccount?.image_url || null,
        destination_name: expandedTargetAccount?.name || null,
        destination_image: expandedTargetAccount?.image_url || null,
        account_name: expandedAccount?.name || null,
        category_id: expandedCategory?.id || record.category_id || null,
        shop_id: expandedShop?.id || record.shop_id || null,
        person_id: expandedPerson?.id || record.person_id || null,
        person_pocketbase_id: expandedPerson?.id || record.person_id || null,
        category_slug: expandedCategory?.slug || null,
        category_name: expandedCategory?.name || null,
        category_icon: expandedCategory?.icon || null,
        category_image_url: expandedCategory?.image_url || null,
        shop_name: expandedShop?.name || null,
        shop_image_url: expandedShop?.image_url || null,
        person_name: expandedPerson?.name || null,
        person_image_url: expandedPerson?.image_url || null,
        persisted_cycle_tag: parseCycleTagFromTransaction(record),
        debt_cycle_tag: record.debt_cycle_tag || record.tag || record.metadata?.debt_cycle_tag || null,
        tag: record.debt_cycle_tag || record.tag || record.metadata?.debt_cycle_tag || null,
        cashback_mode: record.cashback_mode || null,
        cashback_share_percent: record.cashback_share_percent ?? record.metadata?.cashback_share_percent ?? null,
        cashback_share_fixed: record.cashback_share_fixed ?? record.metadata?.cashback_share_fixed ?? null,
        cashback_amount: Number(record.cashback_amount || 0),
        cashback_share_amount: record.cashback_amount ?? null,
        is_installment: Boolean(record.is_installment || false),
        installment_plan_id: record.installment_plan_id || null,
        parent_transaction_id: record.parent_transaction_id || null,
        metadata: {
            ...record.metadata || {},
            source_account_id: sourceAccountSourceId,
            source_target_account_id: targetAccountSourceId
        },
        history_count: historyCount
    };
}
async function fetchPocketBaseHistoryCountMap(transactionIds) {
    const countMap = new Map();
    const uniqueIds = Array.from(new Set(transactionIds.filter((value)=>Boolean(value))));
    if (uniqueIds.length === 0) return countMap;
    const chunks = chunkArray(uniqueIds, 40);
    for (const chunk of chunks){
        const filter = chunk.map((id)=>`transaction_id='${id}'`).join(" || ");
        let page = 1;
        while(true){
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("transaction_history", {
                page,
                perPage: 200,
                filter,
                fields: "transaction_id"
            });
            for (const item of response.items || []){
                const transactionId = String(item.transaction_id || "");
                if (!transactionId) continue;
                countMap.set(transactionId, (countMap.get(transactionId) ?? 0) + 1);
            }
            const totalPages = Number(response.totalPages || 1);
            if (page >= totalPages) break;
            page += 1;
        }
    }
    return countMap;
}
async function listAllRecords(collection, params = {}) {
    let page = 1;
    let totalPages = 1;
    const allItems = [];
    while(page <= totalPages){
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])(collection, {
            page,
            perPage: 500,
            ...params
        });
        allItems.push(...response.items || []);
        totalPages = response.totalPages || 1;
        page += 1;
    }
    return allItems;
}
async function resolvePocketBaseAccountRecord(sourceOrPocketBaseId) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("accounts", sourceOrPocketBaseId);
    } catch  {
    // fallthrough: id may be source UUID, not PB id
    }
    const hashedPocketBaseId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceOrPocketBaseId, "accounts");
    if (hashedPocketBaseId !== sourceOrPocketBaseId) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("accounts", hashedPocketBaseId);
        } catch  {
        // fallthrough
        }
    }
    const bySlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("accounts", {
        perPage: 1,
        filter: `slug='${sourceOrPocketBaseId}'`
    });
    return bySlug.items?.[0] ?? null;
}
async function getPocketBaseCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])("PB", "categories.list");
        const records = await listAllRecords("categories");
        return records.map(mapCategory).sort((a, b)=>a.name.localeCompare(b.name));
    }, async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])("SB", "categories.list fallback");
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from("categories").select("*").order("name", {
            ascending: true
        });
        if (error) throw error;
        return (data || []).map((item)=>({
                id: item.id,
                name: item.name,
                type: (item.type || "expense").toLowerCase(),
                icon: item.icon,
                image_url: item.image_url,
                kind: item.kind,
                is_archived: Boolean(item.is_archived),
                slug: item.id
            }));
    }, "categories.list");
}
async function createPocketBaseCategory(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/categories/records", {
            method: "POST",
            body: {
                id: pbId,
                slug: supabaseId,
                name: data.name,
                type: data.type,
                icon: data.icon ?? null,
                image_url: data.image_url ?? null,
                kind: data.kind ?? null,
                mcc_codes: data.mcc_codes ?? null,
                is_archived: false
            }
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] categories.create failed:", err);
        return false;
    }
}
async function updatePocketBaseCategory(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${pbId}`, {
            method: "PATCH",
            body: data
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] categories.update failed:", err);
        return false;
    }
}
async function togglePocketBaseCategoryArchive(supabaseId, isArchived) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] categories.toggleArchive", {
        pbId,
        isArchived
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${pbId}`, {
            method: "PATCH",
            body: {
                is_archived: isArchived
            }
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] categories.toggleArchive failed:", err);
        return false;
    }
}
async function deletePocketBaseCategory(supabaseId) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] categories.delete", {
        pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${pbId}`, {
            method: "DELETE"
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] categories.delete failed:", err);
        return false;
    }
}
async function togglePocketBaseCategoriesArchiveBulk(supabaseIds, isArchived) {
    console.log("[DB:PB] categories.toggleArchiveBulk", {
        count: supabaseIds.length,
        isArchived
    });
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
            method: "PATCH",
            body: {
                is_archived: isArchived
            }
        })));
    return results.some((r)=>r.status === "fulfilled");
}
async function deletePocketBaseCategoriesBulk(supabaseIds) {
    console.log("[DB:PB] categories.deleteBulk", {
        count: supabaseIds.length
    });
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
            method: "DELETE"
        })));
    return results.some((r)=>r.status === "fulfilled");
}
async function getPocketBasePeople() {
    // log removed for noise reduction
    // Removed sort parameter - PocketBase has issues with sorting, results sorted client-side anyway
    const records = await listAllRecords("people");
    const items = records.map(mapPerson).sort((a, b)=>a.name.localeCompare(b.name));
    console.log("[DB:PB] people.list →", items.length, "records");
    return items;
}
async function getPocketBaseShops() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])("PB", "shops.list");
        const records = await listAllRecords("shops");
        return records.map(mapShop).sort((a, b)=>a.name.localeCompare(b.name));
    }, async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logSource"])("SB", "shops.list fallback");
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data, error } = await supabase.from("shops").select("*").order("name", {
            ascending: true
        });
        if (error) throw error;
        return (data || []).map((item)=>({
                id: item.id,
                name: item.name,
                image_url: item.image_url,
                default_category_id: item.default_category_id,
                is_archived: Boolean(item.is_archived)
            }));
    }, "shops.list");
}
async function getPocketBaseInstallmentPlan(id) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'installments');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId, 'account_id,original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id');
        return record ? mapInstallment(record) : null;
    } catch (error) {
        console.warn("[DB:PB] getPocketBaseInstallmentPlan failed", {
            id,
            error
        });
        return null;
    }
}
async function getPocketBaseTransactionsByPlan(planId) {
    return loadPocketBaseTransactions({
        installmentPlanId: planId
    });
}
async function createPocketBaseShop(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    const pbCategoryId = data.default_category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.default_category_id) : null;
    console.log("[DB:PB] shops.create", {
        pbId,
        name: data.name
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/shops/records", {
            method: "POST",
            body: {
                id: pbId,
                slug: supabaseId,
                name: data.name,
                image_url: data.image_url ?? null,
                default_category_id: pbCategoryId,
                is_archived: false
            }
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] shops.create failed:", err);
        return false;
    }
}
async function updatePocketBaseShop(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    const body = {};
    if (typeof data.name !== "undefined") body.name = data.name;
    if (typeof data.image_url !== "undefined") body.image_url = data.image_url;
    if (typeof data.default_category_id !== "undefined") {
        body.default_category_id = data.default_category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.default_category_id) : null;
    }
    if (!Object.keys(body).length) return true;
    console.log("[DB:PB] shops.update", {
        pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${pbId}`, {
            method: "PATCH",
            body
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] shops.update failed:", err);
        return false;
    }
}
async function togglePocketBaseShopArchive(supabaseId, isArchived) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] shops.toggleArchive", {
        pbId,
        isArchived
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${pbId}`, {
            method: "PATCH",
            body: {
                is_archived: isArchived
            }
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] shops.toggleArchive failed:", err);
        return false;
    }
}
async function deletePocketBaseShop(supabaseId) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] shops.delete", {
        pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${pbId}`, {
            method: "DELETE"
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] shops.delete failed:", err);
        return false;
    }
}
async function togglePocketBaseShopsArchiveBulk(supabaseIds, isArchived) {
    console.log("[DB:PB] shops.toggleArchiveBulk", {
        count: supabaseIds.length,
        isArchived
    });
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
            method: "PATCH",
            body: {
                is_archived: isArchived
            }
        })));
    return results.some((r)=>r.status === "fulfilled");
}
async function deletePocketBaseShopsBulk(supabaseIds) {
    console.log("[DB:PB] shops.deleteBulk", {
        count: supabaseIds.length
    });
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
            method: "DELETE"
        })));
    return results.some((r)=>r.status === "fulfilled");
}
async function createPocketBasePerson(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] people.create", {
        pbId,
        name: data.name
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/people/records", {
            method: "POST",
            body: {
                id: pbId,
                slug: supabaseId,
                name: data.name,
                image_url: data.image_url ?? null,
                sheet_link: data.sheet_link ?? null,
                google_sheet_url: data.google_sheet_url ?? null,
                is_owner: data.is_owner ?? null,
                is_archived: data.is_archived ?? null,
                is_group: data.is_group ?? null,
                group_parent_id: data.group_parent_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.group_parent_id) : null,
                sheet_full_img: data.sheet_full_img ?? null,
                sheet_show_bank_account: data.sheet_show_bank_account ?? false,
                sheet_bank_info: data.sheet_bank_info ?? null,
                sheet_linked_bank_id: data.sheet_linked_bank_id ?? null,
                sheet_show_qr_image: data.sheet_show_qr_image ?? false
            }
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] people.create failed:", err);
        return false;
    }
}
async function updatePocketBasePerson(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] people.update", {
        pbId
    });
    const body = {
        ...data
    };
    if ("group_parent_id" in body && body.group_parent_id) {
        body.group_parent_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.group_parent_id);
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/people/records/${pbId}`, {
            method: "PATCH",
            body
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] people.update failed:", err);
        return false;
    }
}
async function createPocketBaseAccount(supabaseAccountId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseAccountId);
    // NOTE: do NOT toPocketBaseId for owner_id — it is optional and omitted for new accounts
    const pbParentId = data.parent_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.parent_account_id) : null;
    const pbSecuredById = data.secured_by_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.secured_by_account_id) : null;
    const pbHolderPersonId = data.holder_person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.holder_person_id) : null;
    console.log("[DB:PB] accounts.create", {
        pbId,
        name: data.name,
        type: data.type
    });
    try {
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/accounts/records", {
            method: "POST",
            body: {
                id: pbId,
                slug: supabaseAccountId,
                name: data.name,
                type: data.type,
                currency: data.currency ?? "VND",
                // owner_id intentionally omitted — new accounts don't have a relation target
                credit_limit: data.credit_limit ?? null,
                current_balance: data.current_balance ?? 0,
                total_in: data.total_in ?? 0,
                total_out: data.total_out ?? 0,
                is_active: data.is_active ?? true,
                image_url: data.image_url ?? null,
                account_number: data.account_number ?? null,
                receiver_name: data.receiver_name ?? null,
                parent_account_id: pbParentId,
                secured_by_account_id: pbSecuredById,
                annual_fee: data.annual_fee ?? null,
                annual_fee_waiver_target: data.annual_fee_waiver_target ?? null,
                holder_type: data.holder_type ?? "me",
                holder_person_id: pbHolderPersonId,
                statement_day: data.statement_day ?? null,
                due_date: data.due_date ?? null,
                cb_type: data.cb_type ?? "none",
                cb_base_rate: data.cb_base_rate ?? 0,
                cb_max_budget: data.cb_max_budget ?? null,
                cb_is_unlimited: data.cb_is_unlimited ?? false,
                cb_rules_json: data.cb_rules_json ?? null,
                cb_min_spend: data.cb_min_spend ?? null,
                cb_cycle_type: data.cb_cycle_type ?? "calendar_month"
            }
        });
        console.log("[DB:PB] accounts.create SUCCESS id:", record.id);
        return {
            success: true,
            id: record.id
        };
    } catch (err) {
        const msg = err.message ?? String(err);
        console.error("[DB:PB] accounts.create failed:", msg);
        return {
            success: false,
            error: msg
        };
    }
}
async function updatePocketBaseAccountInfo(supabaseAccountId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseAccountId);
    console.log("[DB:PB] accounts.updateInfo START", {
        supabaseAccountId,
        pbId,
        fields: Object.keys(data)
    });
    const body = {
        ...data
    };
    if ("parent_account_id" in body && body.parent_account_id) {
        body.parent_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.parent_account_id);
    } else if ("parent_account_id" in body) {
        body.parent_account_id = null;
    }
    if ("secured_by_account_id" in body && body.secured_by_account_id) {
        body.secured_by_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.secured_by_account_id);
    } else if ("secured_by_account_id" in body) {
        body.secured_by_account_id = null;
    }
    if ("holder_person_id" in body && body.holder_person_id) {
        body.holder_person_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.holder_person_id);
    } else if ("holder_person_id" in body) {
        body.holder_person_id = null;
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/accounts/records/${pbId}`, {
            method: "PATCH",
            body
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] accounts.updateInfo failed:", err);
        return false;
    }
}
async function updatePocketBaseAccountConfig(supabaseAccountId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseAccountId);
    console.log("[DB:PB] accounts.updateConfig", {
        pbId
    });
    const body = {
        ...data
    };
    if ("secured_by_account_id" in body && body.secured_by_account_id) {
        body.secured_by_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.secured_by_account_id);
    }
    if ("parent_account_id" in body && body.parent_account_id) {
        body.parent_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.parent_account_id);
    }
    if ("holder_person_id" in body && body.holder_person_id) {
        body.holder_person_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.holder_person_id);
    }
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/accounts/records/${pbId}`, {
            method: "PATCH",
            body
        });
        console.log("[DB:PB] accounts.updateInfo SUCCESS", {
            pbId,
            updatedFields: Object.keys(result || {})
        });
        return true;
    } catch (err) {
        console.error("[DB:PB] accounts.updateInfo FAILED", {
            pbId,
            error: String(err)
        });
        return false;
    }
}
async function getPocketBaseAccounts() {
    // Note: removed sort parameter - PocketBase has issues with sorting on this collection
    // Results are sorted client-side anyway
    const records = await listAllRecords("accounts");
    const mapped = records.map(mapAccount).sort((a, b)=>a.name.localeCompare(b.name));
    const byPocketBaseId = new Map(records.map((item)=>[
            item.id,
            item
        ]));
    const pocketBaseToSource = new Map(records.map((item)=>[
            item.id,
            item.slug || item.id
        ]));
    return mapped.map((account)=>{
        const sourceRecord = byPocketBaseId.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(account.id, "accounts"));
        const parentPocketBaseId = sourceRecord?.parent_account_id || null;
        const securedByPocketBaseId = sourceRecord?.secured_by_account_id || null;
        return {
            ...account,
            parent_account_id: parentPocketBaseId ? pocketBaseToSource.get(parentPocketBaseId) || null : null,
            secured_by_account_id: securedByPocketBaseId ? pocketBaseToSource.get(securedByPocketBaseId) || null : null
        };
    });
}
async function getPocketBaseAccountSpendingStatsSnapshot(sourceAccountId, date, cycleTag) {
    const accountRecord = await resolvePocketBaseAccountRecord(sourceAccountId);
    console.log("[Stats:PB] resolve account:", {
        sourceAccountId,
        found: !!accountRecord,
        pbId: accountRecord?.id
    });
    if (!accountRecord) return null;
    const pocketBaseAccountId = accountRecord.id;
    const account = mapAccount(accountRecord);
    if (account.type !== "credit_card") return null;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    let cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    let resolvedCycleTag = cycleTag || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(cycleRange?.end ?? date);
    if (cycleTag) {
        const [yearStr, monthStr] = String(cycleTag).split("-");
        const year = Number(yearStr);
        const month = Number(monthStr);
        if (Number.isFinite(year) && Number.isFinite(month) && year > 2000 && month >= 1 && month <= 12) {
            const refDate = new Date(year, month - 1, 1);
            cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, refDate);
            resolvedCycleTag = cycleTag;
        }
    }
    const cycleResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("cashback_cycles", {
        perPage: 1,
        filter: `account_id='${pocketBaseAccountId}' && cycle_tag='${resolvedCycleTag}'`
    });
    const cycle = cycleResponse.items?.[0];
    let rawTransactions = [];
    const queryAttempts = [
        {
            filter: `account_id='${pocketBaseAccountId}'`,
            sort: "-date,id",
            fields: "id,amount,type,category_id,cashback_amount,cashback_share_percent,cashback_share_fixed,metadata,date,occurred_at,note,description,tag,persisted_cycle_tag,statement_cycle_tag"
        },
        {
            filter: `account_id='${pocketBaseAccountId}'`,
            fields: "id,amount,type,category_id,cashback_amount,cashback_share_percent,cashback_share_fixed,metadata,date,occurred_at,note,description,tag,persisted_cycle_tag,statement_cycle_tag"
        }
    ];
    for(let attemptIdx = 0; attemptIdx < queryAttempts.length; attemptIdx++){
        const params = queryAttempts[attemptIdx];
        try {
            console.log("[DB:PB] account spending stats: transaction query attempt", {
                attempt: attemptIdx + 1,
                filter: params.filter,
                sort: params.sort
            });
            const fetchedResults = await listAllRecords("transactions", params);
            // Deduplicate by ID to prevent double-counting
            const uniqueMap = new Map();
            for (const tx of fetchedResults){
                if (tx.id) uniqueMap.set(tx.id, tx);
            }
            rawTransactions = Array.from(uniqueMap.values());
            console.log("[DB:PB] account spending stats: transaction query succeeded", {
                attempt: attemptIdx + 1,
                count: rawTransactions.length
            });
            if (rawTransactions.length > 0) break;
        } catch (err) {
            console.warn("[DB:PB] account spending stats: transaction query attempt failed", {
                sourceAccountId,
                cycleTag: resolvedCycleTag,
                attempt: attemptIdx + 1,
                error: String(err)
            });
        }
    }
    if (rawTransactions.length === 0) {
        console.warn("[DB:PB] account spending stats: all transaction query attempts exhausted, falling back to cycle snapshot", {
            sourceAccountId,
            cycleTag: resolvedCycleTag
        });
    }
    const cycleStartTime = cycleRange?.start ? cycleRange.start.getTime() : null;
    const cycleEndTime = cycleRange?.end ? cycleRange.end.getTime() : null;
    const cycleTransactions = rawTransactions.filter((tx)=>{
        const metadata = tx.metadata && typeof tx.metadata === "object" ? tx.metadata : {};
        const txCycleTag = tx.persisted_cycle_tag || tx.statement_cycle_tag || tx.tag || metadata?.persisted_cycle_tag || metadata?.statement_cycle_tag || null;
        if (resolvedCycleTag && txCycleTag) return String(txCycleTag) === resolvedCycleTag;
        const txDateRaw = tx.occurred_at || tx.date;
        const txDate = txDateRaw ? new Date(txDateRaw) : null;
        if (!txDate || Number.isNaN(txDate.getTime())) return false;
        if (cycleStartTime === null || cycleEndTime === null) return true;
        return txDate.getTime() >= cycleStartTime && txDate.getTime() <= cycleEndTime;
    });
    const categoryIds = Array.from(new Set(cycleTransactions.map((tx)=>tx.category_id).filter(Boolean)));
    const categoryMap = new Map();
    if (categoryIds.length > 0) {
        const categoryResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("categories", {
            perPage: 200,
            filter: categoryIds.map((id)=>`id='${id}'`).join(" || "),
            fields: "id,slug,name"
        });
        for (const categoryRecord of categoryResponse.items || []){
            categoryMap.set(categoryRecord.id, {
                id: categoryRecord.id,
                sourceId: categoryRecord.slug || categoryRecord.id,
                name: String(categoryRecord.name || "")
            });
            if (process.env.DEBUG_CASHBACK) {
                console.log("[DEBUG:CategoryMap] Loaded category", {
                    pbId: categoryRecord.id,
                    slug: categoryRecord.slug,
                    name: categoryRecord.name
                });
            }
        }
    }
    const spendTransactions = cycleTransactions.filter((tx)=>[
            "expense",
            "debt",
            "service",
            "invest",
            "transfer"
        ].includes(String(tx.type || "")));
    const currentSpend = spendTransactions.reduce((sum, tx)=>sum + Math.abs(Number(tx.amount || 0)), 0);
    const spendForPolicy = Number(cycle?.spent_amount ?? currentSpend);
    let estimatedCashback = 0;
    let sharedAmount = 0;
    let actualClaimed = 0;
    const activeRuleMap = new Map();
    // If transaction query failed (rawTransactions empty), fallback to cycle precomputed values
    if (cycleTransactions.length === 0) {
        estimatedCashback = Number(cycle?.virtual_profit ?? 0) + Number(cycle?.real_awarded ?? 0);
        sharedAmount = Number(cycle?.shared_amount ?? cycle?.real_awarded ?? 0);
        actualClaimed = Number(cycle?.real_awarded ?? 0);
    // activeRules stays empty on fallback
    } else {
        for (const tx of spendTransactions){
            const amount = Math.abs(Number(tx.amount || 0));
            if (!Number.isFinite(amount) || amount <= 0) continue;
            const category = tx.category_id ? categoryMap.get(tx.category_id) : undefined;
            const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
                account: {
                    ...account,
                    // Match the interface expected by resolveCashbackPolicy
                    cb_type: account.cb_type || "none"
                },
                categoryId: tx.category_id || null,
                categorySlug: category?.sourceId || undefined,
                amount: amount,
                cycleTotals: {
                    spent: spendForPolicy
                },
                categoryName: category?.name
            });
            const categoryFallbackPolicy = inferTieredPolicyByCategoryName(account, category?.name);
            const shouldUseFallbackCategoryPolicy = Boolean(categoryFallbackPolicy) && (policy.metadata?.policySource === "program_default" || policy.metadata?.policySource === "level_default");
            const effectiveRate = shouldUseFallbackCategoryPolicy ? Number(categoryFallbackPolicy?.rate || policy.rate || 0) : Number(policy.rate || 0);
            const effectiveMaxReward = shouldUseFallbackCategoryPolicy ? categoryFallbackPolicy?.maxReward : policy.maxReward;
            if (process.env.DEBUG_CASHBACK) {
                console.log("[DEBUG:Cashback] Transaction policy resolution", {
                    txnId: tx.id,
                    amount,
                    pbCategoryId: tx.category_id,
                    categoryName: category?.name,
                    categorySourcId: category?.sourceId,
                    policyRate: policy.rate,
                    policySource: policy.metadata?.policySource,
                    spendForPolicy
                });
            }
            let txnEstimate = amount * effectiveRate;
            if (!Number.isFinite(txnEstimate)) txnEstimate = 0;
            if (effectiveMaxReward && effectiveMaxReward > 0) {
                txnEstimate = Math.min(txnEstimate, Number(effectiveMaxReward));
            }
            estimatedCashback += txnEstimate;
            const sharedFixed = Number(tx.cashback_share_fixed || 0);
            const sharedAmountPriority = Number(tx.cashback_share_amount || 0);
            const sharedPercent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRate"])(tx.cashback_share_percent);
            const txnShared = sharedAmountPriority > 0 ? sharedAmountPriority : sharedFixed > 0 ? sharedFixed : sharedPercent > 0 ? amount * sharedPercent : 0;
            if (Number.isFinite(txnShared)) {
                sharedAmount += txnShared;
            }
            const metadata = policy.metadata || {};
            if (process.env.DEBUG_CASHBACK) {
                console.log("[DEBUG:Cashback] Transaction processing detail", {
                    txnId: tx.id,
                    categoryId: tx.category_id,
                    categoryName: category?.name,
                    categorySourceId: category?.sourceId,
                    policyRate: policy.rate,
                    policyMetadata: metadata,
                    ruleIdBeforeConstruction: metadata.ruleId
                });
            }
            const ruleId = String(metadata.ruleId || `${category?.sourceId || category?.id || "general"}-${effectiveRate}`);
            const displayRateRaw = effectiveRate * 100;
            const displayRateStr = displayRateRaw % 1 === 0 ? displayRateRaw.toFixed(0) : displayRateRaw.toFixed(1);
            const ruleName = category?.name ? `${displayRateStr}% ${category.name}` : `Rule ${displayRateStr}%`;
            const prev = activeRuleMap.get(ruleId);
            if (prev) {
                prev.spent += amount;
                prev.earned += txnEstimate;
            } else {
                activeRuleMap.set(ruleId, {
                    ruleId,
                    name: ruleName,
                    rate: displayRateRaw,
                    spent: amount,
                    earned: txnEstimate,
                    max: effectiveMaxReward ?? null,
                    isMain: true
                });
            }
        }
        actualClaimed = cycleTransactions.reduce((sum, tx)=>{
            if (String(tx.type || "") !== "income") return sum;
            const categoryName = tx.category_id ? categoryMap.get(tx.category_id)?.name || "" : "";
            const note = String(tx.note || tx.description || "").toLowerCase();
            const isCashbackIncome = categoryName.toLowerCase().includes("cashback") || categoryName.toLowerCase().includes("hoàn tiền") || note.includes("cashback") || note.includes("hoàn tiền");
            if (!isCashbackIncome) return sum;
            return sum + Math.abs(Number(tx.amount || 0));
        }, 0);
    }
    const minSpend = cycle?.min_spend_target ?? account.cb_min_spend ?? null;
    const rawMaxCashback = cycle?.max_budget ?? account.cb_max_budget ?? null;
    const isUnlimitedBudget = Boolean(account.cb_is_unlimited) || rawMaxCashback === null || Number(rawMaxCashback) <= 0;
    const maxCashback = isUnlimitedBudget ? null : Number(rawMaxCashback);
    const rawEarnedSoFar = Number.isFinite(estimatedCashback) ? estimatedCashback : 0;
    // Apply maxReward capping as a final gate
    const earnedSoFar = maxCashback !== null ? Math.min(rawEarnedSoFar, maxCashback) : rawEarnedSoFar;
    const netProfit = earnedSoFar - (Number.isFinite(sharedAmount) ? sharedAmount : 0);
    const remainingBudget = maxCashback === null ? null : Math.max(0, maxCashback - earnedSoFar);
    const isMinSpendMet = minSpend === null ? true : currentSpend >= Number(minSpend || 0);
    const activeRules = Array.from(activeRuleMap.values()).sort((left, right)=>right.rate - left.rate);
    const statementDay = account.statement_day || null;
    const cycleLabel = cycleRange ? config.cycleType === "statement_cycle" ? `${String(cycleRange.start.getDate()).padStart(2, "0")}.${String(cycleRange.start.getMonth() + 1).padStart(2, "0")} - ${String(cycleRange.end.getDate()).padStart(2, "0")}.${String(cycleRange.end.getMonth() + 1).padStart(2, "0")}` : resolvedCycleTag : resolvedCycleTag;
    // Identify current tier name for display
    const firstRule = activeRules[0];
    const currentTierName = firstRule?.levelName || "Standard";
    return {
        currentSpend,
        currentTierName,
        minSpend: minSpend === null ? null : Number(minSpend),
        maxCashback,
        actualClaimed,
        rate: Number(account.cb_base_rate || 0) / 100,
        earnedSoFar,
        sharedAmount,
        potentialProfit: netProfit,
        netProfit,
        remainingBudget,
        is_min_spend_met: isMinSpendMet,
        estYearlyTotal: earnedSoFar * 12,
        activeRules,
        cycle: cycleRange ? {
            tag: resolvedCycleTag,
            label: cycleLabel,
            start: cycleRange.start.toISOString(),
            end: cycleRange.end.toISOString()
        } : null,
        potentialRate: Number(account.cb_base_rate || 0) / 100,
        maxReward: null,
        matchReason: statementDay ? "statement_cycle" : "calendar_month"
    };
}
async function getPocketBaseAccountDetails(sourceAccountId) {
    // Resolve the account record using multi-strategy lookup (direct ID, hashed ID, or slug filter)
    const accountRecord = await resolvePocketBaseAccountRecord(sourceAccountId);
    if (!accountRecord) return null;
    const account = mapAccount(accountRecord);
    const allAccounts = await getPocketBaseAccounts();
    const usagePercent = account.type === "credit_card" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCreditCardUsage"])({
        type: account.type,
        credit_limit: account.credit_limit || 0,
        current_balance: account.current_balance || 0
    }).percent : 0;
    const remainingLimit = account.type === "credit_card" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCreditCardAvailableBalance"])({
        type: account.type,
        credit_limit: account.credit_limit || 0,
        current_balance: account.current_balance || 0
    }) : account.current_balance || 0;
    const childAccounts = allAccounts.filter((item)=>item.parent_account_id === account.id);
    const parent = account.parent_account_id ? allAccounts.find((item)=>item.id === account.parent_account_id) : null;
    const statsSnapshot = await getPocketBaseAccountSpendingStatsSnapshot(sourceAccountId, new Date());
    return {
        ...account,
        stats: {
            usage_percent: usagePercent,
            remaining_limit: remainingLimit,
            spent_this_cycle: statsSnapshot?.currentSpend || 0,
            min_spend: statsSnapshot?.minSpend ?? null,
            missing_for_min: statsSnapshot?.minSpend ? Math.max(0, statsSnapshot.minSpend - (statsSnapshot.currentSpend || 0)) : null,
            is_qualified: Boolean(statsSnapshot?.is_min_spend_met),
            cycle_range: statsSnapshot?.cycle?.label || "",
            due_date_display: null,
            due_date: null,
            remains_cap: statsSnapshot?.remainingBudget ?? null,
            shared_cashback: statsSnapshot?.sharedAmount ?? null,
            real_awarded: statsSnapshot?.actualClaimed ?? 0,
            virtual_profit: statsSnapshot?.netProfit ?? 0,
            annual_fee_waiver_target: account.annual_fee_waiver_target ?? null,
            annual_fee_waiver_progress: 0,
            annual_fee_waiver_met: false,
            max_budget: statsSnapshot?.maxCashback ?? null
        },
        relationships: {
            is_parent: childAccounts.length > 0,
            child_count: childAccounts.length,
            child_accounts: childAccounts.map((item)=>({
                    id: item.id,
                    name: item.name,
                    image_url: item.image_url || null
                })),
            parent_info: parent ? {
                id: parent.id,
                name: parent.name,
                type: parent.type,
                image_url: parent.image_url || null
            } : null
        },
        credit_card_info: {
            statement_day: account.statement_day || undefined,
            payment_due_day: account.due_date || undefined
        }
    };
}
async function loadPocketBaseTransactionsForAccount(sourceAccountId, limit = 2000) {
    const accountRecord = await resolvePocketBaseAccountRecord(sourceAccountId);
    if (!accountRecord) return [];
    const pocketBaseAccountId = accountRecord.id;
    // Attempts in priority order. PB schema notes:
    //   - 'occurred_at' does NOT exist in PB → use 'date' for sort
    //   - 'to_account_id' IS a real PB relation field (destination account) → can filter/expand
    //   - 'target_account_id' does NOT exist in PB schema — do NOT use
    const attempts = [
        {
            perPage: Math.min(limit, 200),
            sort: "-date",
            expand: "account_id,to_account_id,category_id,shop_id,person_id",
            filter: `(account_id='${pocketBaseAccountId}' || to_account_id='${pocketBaseAccountId}')`
        },
        {
            perPage: Math.min(limit, 200),
            sort: "-date",
            filter: `(account_id='${pocketBaseAccountId}' || to_account_id='${pocketBaseAccountId}')`
        }
    ];
    console.log(`[DB:PB] loadPocketBaseTransactionsForAccount`, {
        sourceAccountId,
        pocketBaseAccountId,
        limit
    });
    for (const params of attempts){
        try {
            console.log(`[DB:PB] transactions.listForAccount attempt`, {
                params
            });
            const records = await listAllRecords("transactions", params);
            console.log(`[DB:PB] transactions.listForAccount succeeded`, {
                count: records.length
            });
            return records.map((item)=>mapTransaction(item, sourceAccountId));
        } catch (error) {
            console.warn("[DB:PB] transactions.listForAccount attempt failed", {
                sourceAccountId,
                params,
                error
            });
        }
    }
    // Never crash account details page due to PB query drift.
    return [];
}
async function loadPocketBaseTransactions(options) {
    if (options.transactionId) {
        const inputId = options.transactionId;
        const hashedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(inputId, "pvl_txn_001");
        const candidateIds = hashedId !== inputId ? [
            inputId,
            hashedId
        ] : [
            inputId
        ];
        for (const candidateId of candidateIds){
            try {
                const records = await listAllRecords("transactions", {
                    perPage: 1,
                    sort: "-date",
                    expand: "account_id,to_account_id,category_id,shop_id,person_id,parent_transaction_id",
                    filter: `id='${candidateId}'`
                });
                if (records.length > 0) {
                    return records.map((item)=>mapTransaction(item, ""));
                }
            } catch (error) {
                console.warn("[DB:PB] transactions.listById attempt failed", {
                    transactionId: inputId,
                    candidateId,
                    error
                });
            }
        }
        return [];
    }
    // Phase 1b: personId/personIds is supported via simple filter
    if (options.personId || options.personIds) {
        const personIds = options.personIds && options.personIds.length > 0 ? options.personIds : options.personId ? [
            options.personId
        ] : [];
        if (personIds.length === 0) return [];
        const resolvedPersonRecords = await Promise.all(personIds.map((personId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolvePocketBasePersonRecord"])(personId)));
        const candidatePersonIds = Array.from(new Set(personIds.flatMap((personId, index)=>{
            const resolvedRecord = resolvedPersonRecords[index];
            return [
                personId,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, "people"),
                resolvedRecord?.id ? String(resolvedRecord.id) : null,
                resolvedRecord?.slug ? String(resolvedRecord.slug) : null
            ].filter((value)=>Boolean(value));
        })));
        const escapeFilterValue = (value)=>value.replace(/'/g, "\\'");
        const filterParts = candidatePersonIds.map((pid)=>`person_id='${escapeFilterValue(pid)}'`).join(" || ");
        const records = await listAllRecords("transactions", {
            sort: "-date",
            expand: "account_id,to_account_id,category_id,shop_id,person_id,parent_transaction_id",
            filter: filterParts
        });
        return records.map((item)=>mapTransaction(item, ""));
    }
    // Phase 1a: accountId is supported
    if (options.accountId) {
        return loadPocketBaseTransactionsForAccount(options.accountId, options.limit);
    }
    // Phase 2: Add support for categoryId, shopId, installmentPlanId
    if (options.categoryId || options.shopId || options.installmentPlanId) {
        const filterParts = [];
        if (options.categoryId) {
            filterParts.push(`category_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.categoryId, "categories")}'`);
        }
        if (options.shopId) {
            filterParts.push(`shop_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.shopId, "shops")}'`);
        }
        if (options.installmentPlanId) {
            filterParts.push(`installment_plan_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.installmentPlanId, "installments")}'`);
        }
        if (filterParts.length === 0) return [];
        const records = await listAllRecords("transactions", {
            sort: "-date",
            expand: "account_id,to_account_id,category_id,shop_id,person_id,parent_transaction_id",
            filter: filterParts.join(" && ")
        });
        return records.map((item)=>mapTransaction(item, ""));
    }
    // No filters - not supported in Phase 1
    return [];
}
async function getPocketBaseAccountCycleOptions(sourceAccountId, limit = 12) {
    const accountRecord = await resolvePocketBaseAccountRecord(sourceAccountId);
    if (!accountRecord) return [];
    const pocketBaseAccountId = accountRecord.id;
    const account = mapAccount(accountRecord);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const cyclesResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("cashback_cycles", {
        page: 1,
        perPage: Math.max(limit * 2, 24),
        filter: `account_id='${pocketBaseAccountId}'`,
        sort: "-cycle_tag",
        fields: "id,cycle_tag,spent_amount,real_awarded,virtual_profit,shared_amount"
    });
    const cycleItems = cyclesResponse.items || [];
    console.log(`[DB:PB] getPocketBaseAccountCycleOptions: fetched ${cycleItems.length} records for ${pocketBaseAccountId}`);
    const cycleOptions = cycleItems.slice(0, Math.max(limit, 1)).map((cycle)=>{
        const parsed = String(cycle.cycle_tag || "").split("-");
        const year = parseInt(parsed[0] || "0", 10);
        const month = parseInt(parsed[1] || "1", 10);
        const actualStatementDay = Number(account.statement_day || config.statementDay) || 25;
        const isStatementCycle = account.cb_cycle_type === 'statement_cycle' || config.cycleType === 'statement_cycle';
        let label = cycle.cycle_tag;
        if (!Number.isNaN(year) && !Number.isNaN(month)) {
            if (isStatementCycle) {
                label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatCycleTag"])(cycle.cycle_tag, actualStatementDay);
            } else {
                label = new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric"
                }).format(new Date(year, month - 1, 1));
            }
        }
        return {
            tag: cycle.cycle_tag,
            label,
            cycleId: cycle.id || null,
            statementDay: account.statement_day ?? null,
            cycleType: account.cb_cycle_type || null,
            stats: {
                spent_amount: Number(cycle.spent_amount || 0),
                real_awarded: Number(cycle.real_awarded || 0),
                virtual_profit: Number(cycle.virtual_profit || 0),
                shared_amount: Number(cycle.shared_amount || 0)
            }
        };
    });
    // Proactive Step: Ensure current cycle tag is present in the list
    // This allows the UI to auto-select the current cycle even if no DB record exists yet (e.g. today just started)
    const currentTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleTag"])(new Date(), {
        statementDay: config.statementDay,
        cycleType: config.cycleType
    });
    if (currentTag && !cycleOptions.some((opt)=>opt.tag === currentTag)) {
        const parsed = currentTag.split("-");
        const year = parseInt(parsed[0], 10);
        const month = parseInt(parsed[1], 10);
        let label = currentTag;
        if (config.cycleType === "statement_cycle" && config.statementDay) {
            const end = new Date(year, month - 1, config.statementDay - 1);
            const start = new Date(year, month - 2, config.statementDay);
            const formatDate = (value)=>`${String(value.getDate()).padStart(2, "0")}.${String(value.getMonth() + 1).padStart(2, "0")}`;
            label = `${formatDate(start)} - ${formatDate(end)}`;
        } else {
            label = new Intl.DateTimeFormat("en-US", {
                month: "short",
                year: "numeric"
            }).format(new Date(year, month - 1, 1));
        }
        cycleOptions.unshift({
            tag: currentTag,
            label,
            cycleId: null,
            statementDay: account.statement_day ?? null,
            cycleType: account.cb_cycle_type || null,
            stats: {
                spent_amount: 0,
                real_awarded: 0,
                virtual_profit: 0,
                shared_amount: 0
            }
        });
    }
    return cycleOptions;
}
async function getPocketBaseCycleTransactions(sourceAccountId, cycleTag) {
    const pocketBaseAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceAccountId, "accounts");
    // Notes:
    //   - PB uses 'date' for sort
    //   - 'to_account_id' is the destination relation
    //   - prefer top-level persisted_cycle_tag, fallback to metadata.persisted_cycle_tag for legacy records
    let primaryRecords = [];
    try {
        primaryRecords = await listAllRecords("transactions", {
            sort: "-date",
            expand: "account_id,to_account_id,category_id,shop_id,person_id,parent_transaction_id",
            filter: `(account_id='${pocketBaseAccountId}' || to_account_id='${pocketBaseAccountId}') && persisted_cycle_tag='${cycleTag}'`
        });
    } catch  {
        primaryRecords = [];
    }
    const records = primaryRecords.length > 0 ? primaryRecords : await listAllRecords("transactions", {
        sort: "-date",
        expand: "account_id,to_account_id,category_id,shop_id,person_id,parent_transaction_id",
        filter: `(account_id='${pocketBaseAccountId}' || to_account_id='${pocketBaseAccountId}') && metadata.persisted_cycle_tag='${cycleTag}'`
    });
    return records.map((item)=>mapTransaction(item, sourceAccountId));
}
async function createPocketBaseTransaction(supabaseId, data) {
    // console.log('[DB:PB] transactions.create', { id: supabaseId, type: data.type, amount: data.amount })
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    // Merge source_id into metadata so mapTransaction can reverse-lookup the SB UUID via record.metadata.source_id
    const mergedMetadata = {
        ...data.metadata && typeof data.metadata === "object" ? data.metadata : {},
        source_id: supabaseId,
        debt_cycle_tag: data.debt_cycle_tag ?? data.tag ?? null,
        cashback_share_percent: data.cashback_share_percent ?? null,
        cashback_share_fixed: data.cashback_share_fixed ?? null,
        cashback_mode: data.cashback_mode ?? null
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/transactions/records`, {
        method: "POST",
        body: {
            id: pbId,
            occurred_at: data.occurred_at,
            note: data.note ?? null,
            type: data.type,
            account_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.account_id),
            amount: data.amount,
            debt_cycle_tag: data.debt_cycle_tag ?? data.tag ?? null,
            category_id: data.category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.category_id) : null,
            person_id: data.person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.person_id) : null,
            to_account_id: data.target_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.target_account_id) : null,
            shop_id: data.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.shop_id) : null,
            status: data.status ?? "posted",
            persisted_cycle_tag: data.persisted_cycle_tag ?? null,
            cashback_share_percent: data.cashback_share_percent ?? null,
            cashback_share_fixed: data.cashback_share_fixed ?? null,
            cashback_mode: data.cashback_mode ?? null,
            metadata: mergedMetadata
        }
    });
}
async function updatePocketBaseTransaction(supabaseId, data) {
    // console.log('[DB:PB] transactions.update', { id: supabaseId })
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    const payload = {};
    if (data.occurred_at !== undefined) payload.occurred_at = data.occurred_at;
    if (data.note !== undefined) payload.note = data.note;
    if (data.type !== undefined) payload.type = data.type;
    if (data.account_id !== undefined) payload.account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.account_id);
    if (data.amount !== undefined) payload.amount = data.amount;
    if (data.tag !== undefined || data.debt_cycle_tag !== undefined) {
        payload.debt_cycle_tag = data.debt_cycle_tag ?? data.tag ?? null;
    }
    if (data.category_id !== undefined) payload.category_id = data.category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.category_id) : null;
    if (data.person_id !== undefined) payload.person_id = data.person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.person_id) : null;
    if (data.target_account_id !== undefined) payload.to_account_id = data.target_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.target_account_id) : null;
    if (data.shop_id !== undefined) payload.shop_id = data.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.shop_id) : null;
    if (data.status !== undefined) payload.status = data.status;
    if (data.persisted_cycle_tag !== undefined) payload.persisted_cycle_tag = data.persisted_cycle_tag;
    if (data.cashback_share_percent !== undefined) payload.cashback_share_percent = data.cashback_share_percent;
    if (data.cashback_share_fixed !== undefined) payload.cashback_share_fixed = data.cashback_share_fixed;
    if (data.cashback_mode !== undefined) payload.cashback_mode = data.cashback_mode;
    if (data.metadata !== undefined || data.cashback_share_percent !== undefined || data.cashback_share_fixed !== undefined || data.cashback_mode !== undefined || data.debt_cycle_tag !== undefined || data.tag !== undefined) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("transactions", pbId);
        const currentMetadata = current?.metadata && typeof current.metadata === "object" ? current.metadata : {};
        payload.metadata = {
            ...currentMetadata,
            ...data.metadata && typeof data.metadata === "object" ? data.metadata : {},
            ...data.cashback_share_percent !== undefined ? {
                cashback_share_percent: data.cashback_share_percent ?? null
            } : {},
            ...data.cashback_share_fixed !== undefined ? {
                cashback_share_fixed: data.cashback_share_fixed ?? null
            } : {},
            ...data.cashback_mode !== undefined ? {
                cashback_mode: data.cashback_mode ?? null
            } : {},
            ...data.debt_cycle_tag !== undefined || data.tag !== undefined ? {
                debt_cycle_tag: data.debt_cycle_tag ?? data.tag ?? null
            } : {}
        };
    }
    if (Object.keys(payload).length === 0) return;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/transactions/records/${pbId}`, {
        method: "PATCH",
        body: payload
    });
}
async function voidPocketBaseTransaction(supabaseId) {
    console.log("[DB:PB] transactions.void", {
        id: supabaseId
    });
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/transactions/records/${pbId}`, {
        method: "PATCH",
        body: {
            status: "void"
        }
    });
}
async function getPocketBaseUnifiedTransactions(options = {}) {
    const { limit = 1000, includeVoided = false, includeHistoryCount = false } = options;
    console.log("[DB:PB] transactions.unified.list", {
        limit,
        includeVoided,
        includeHistoryCount
    });
    // The /transactions page separately loads accounts, categories, people, shops.
    // Fetching without expand avoids PB 400 errors caused by JOIN complexity on bulk queries.
    // Names/images are resolved client-side from the separately loaded lookup tables.
    //
    // PB schema notes:
    //   - 'status' field does NOT exist in PB transactions collection → never use as filter
    //   - 'occurred_at' field does NOT exist → use 'date' for sorting
    //   - 'created' (PB built-in) also causes 400 on this collection → use 'date'
    //   - includeVoided param is kept for API compat but PB has no 'void' status field
    const baseParams = {
        sort: "-date"
    };
    let records = [];
    let page = 1;
    let totalPages = 1;
    while(page <= totalPages && records.length < limit){
        const remaining = limit - records.length;
        const perPage = Math.min(200, remaining);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
                page,
                perPage,
                ...baseParams
            });
            records.push(...response.items || []);
            totalPages = response.totalPages || 1;
            page += 1;
        } catch (err) {
            console.warn(`[DB:PB] transactions.unified.list: page ${page} failed, stopping pagination`, err);
            break;
        }
    }
    let historyCountMap = new Map();
    if (includeHistoryCount) {
        historyCountMap = await fetchPocketBaseHistoryCountMap(records.map((item)=>String(item.id || "")));
    }
    const result = records.map((item)=>mapTransaction(item, "", historyCountMap.get(String(item.id || "")) ?? 0));
    console.log("[DB:PB] transactions.unified.list →", result.length, "records");
    return result;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPocketBaseCategories,
    createPocketBaseCategory,
    updatePocketBaseCategory,
    togglePocketBaseCategoryArchive,
    deletePocketBaseCategory,
    togglePocketBaseCategoriesArchiveBulk,
    deletePocketBaseCategoriesBulk,
    getPocketBasePeople,
    getPocketBaseShops,
    getPocketBaseInstallmentPlan,
    getPocketBaseTransactionsByPlan,
    createPocketBaseShop,
    updatePocketBaseShop,
    togglePocketBaseShopArchive,
    deletePocketBaseShop,
    togglePocketBaseShopsArchiveBulk,
    deletePocketBaseShopsBulk,
    createPocketBasePerson,
    updatePocketBasePerson,
    createPocketBaseAccount,
    updatePocketBaseAccountInfo,
    updatePocketBaseAccountConfig,
    getPocketBaseAccounts,
    getPocketBaseAccountSpendingStatsSnapshot,
    getPocketBaseAccountDetails,
    loadPocketBaseTransactionsForAccount,
    loadPocketBaseTransactions,
    getPocketBaseAccountCycleOptions,
    getPocketBaseCycleTransactions,
    createPocketBaseTransaction,
    updatePocketBaseTransaction,
    voidPocketBaseTransaction,
    getPocketBaseUnifiedTransactions
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseCategories, "00a99d07da0ffa6edf89fca7661ada7e851048a53b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseCategory, "6025de515decff3bfa041ff71da2f6ac0af4beeecb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseCategory, "60d13f1a0e21276cb0d2a3b6017793e34997846e0c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseCategoryArchive, "60faa68021b70476585ccb8dad29fc58bc12da82e9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseCategory, "40277ba161d3823e951c89b283ce288415a9b41781", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseCategoriesArchiveBulk, "60e46497116fd02e3cccbf1253dd59b2c7caaf6f30", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseCategoriesBulk, "40f953956d9a43206b9dce58413952d7bd486ccda6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBasePeople, "003fecc48b4a8d84a9c206f2a376a286d144948b6c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseShops, "00e9a9159e02410170ca6418c4f77c8b6073d34da9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseInstallmentPlan, "40717a7a9c77b085415c89a8b772f1d16ae963462e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseTransactionsByPlan, "40e4fba241bfe5b9e3eeb76bf81effe6f5c519f47c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseShop, "6082e7249080bcc58476fde7fb3be4fb0be3669a2d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseShop, "60bc5b2e1127d594e5793c6adfe5076ab91132cae1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseShopArchive, "60b8096874692b44bbdf1333d6df8ffa0c5553b702", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseShop, "40d107fe5fc3ab8d8f6207c36937964b57ae7b5ee1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseShopsArchiveBulk, "60a11c676e6aa52c541ac21f5e09bdea0ef597c62c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseShopsBulk, "4066ca9177621e1b39abfd7be3456be172332d2b06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBasePerson, "6035ed526f1abffb414d8271e3e8c6ae91c2cd839b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBasePerson, "6023079c39832c8af0b398805dfb48c1a4449279b7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseAccount, "60232a301d81b8959e3868d6e020f6e0d9ff35f663", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseAccountInfo, "605899ace4b81f45316460743a2013532c987f41cd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseAccountConfig, "60ebf7d27dd75d6578dd938ac9f373990175992efb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccounts, "002a898d7c54ec37a539700d141d3a0514769e454d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountSpendingStatsSnapshot, "7057a9bcd998a119cb12e0a05739a03667b3c07e2d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountDetails, "402fa642027c62195e4eb5886632462c7a773aac70", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(loadPocketBaseTransactionsForAccount, "601920d1f45fd2a3cff62dff9ee571b0c9b1843e6c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(loadPocketBaseTransactions, "40bff4340a0852e8a671524ab048c8be5cfb814988", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountCycleOptions, "6027a1fc10f815068ca6cda24879ac901495563ecc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseCycleTransactions, "60c20c657fe2dd464e466b715e911dfe9abd0ff3f7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseTransaction, "60f73621f96825d120610c9cabf1567281a77acc67", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseTransaction, "60f98472fe852ce8cfcf43a99f02a20bcbbebdaecc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(voidPocketBaseTransaction, "4053262b07f6dd7801736756aa64d3d2e3941f4bab", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseUnifiedTransactions, "40dd32d38172c7cc26ce4e646eb791fc3ca8413117", null);
}),
"[project]/src/services/transaction.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40036b54cad654bb82e9e32353f1c41222fd93e1dc":"getRecentTransactions","404737af44dc0a0ddd5ccfdc381c810d13382fe2aa":"getPendingRefunds","405f49bcb3b27dae481153997096cbf27431107994":"createTransaction","4069bb7d28b07a53cbec2842ffdfec7c419a5b4b04":"deleteTransactionCascade","4084456600f6bd97881999d3fee5ae3d572cb47027":"deleteTransaction","40896c90fe4e129e72b570c3d16350723a4d345e2d":"voidTransaction","40c0df6cfa6a0b89d34ddd98b71e57d6f1d7d585df":"loadTransactions","6054c62320b817ef3233d4cef4f2e2122e4983d181":"updateTransaction","605bb35ceb6f12b9cd8be3c8c305aac26460ddfe44":"confirmRefund","607d9465f5402eed9009bfb7a60a95a10c24c0e607":"loadAccountTransactionsV2","60d161c9c9732de259720b05c33955ed328c2bcd8b":"mapTransactionRow","60fb3c4452ae2cee6a520171f2751d37deb126a9b8":"getTransactionById","60febb1d762e3544466b7eb6906ad830f57f7adcbd":"normalizeAmountForType","70cc37c3ce2f110e4f9126b656490fe9946fd3f373":"getTransactionsByPeople","7f527561d98e6f9684e44beb809e9a6808922a40f0":"getUnifiedTransactions"},"",""] */ __turbopack_context__.s([
    "confirmRefund",
    ()=>confirmRefund,
    "createTransaction",
    ()=>createTransaction,
    "deleteTransaction",
    ()=>deleteTransaction,
    "deleteTransactionCascade",
    ()=>deleteTransactionCascade,
    "getPendingRefunds",
    ()=>getPendingRefunds,
    "getRecentTransactions",
    ()=>getRecentTransactions,
    "getTransactionById",
    ()=>getTransactionById,
    "getTransactionsByPeople",
    ()=>getTransactionsByPeople,
    "getUnifiedTransactions",
    ()=>getUnifiedTransactions,
    "loadAccountTransactionsV2",
    ()=>loadAccountTransactionsV2,
    "loadTransactions",
    ()=>loadTransactions,
    "mapTransactionRow",
    ()=>mapTransactionRow,
    "normalizeAmountForType",
    ()=>normalizeAmountForType,
    "updateTransaction",
    ()=>updateTransaction,
    "voidTransaction",
    ()=>voidTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/cashback-sync.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
;
;
async function trySyncPeopleSheet(personId, payload, action) {
    if (!personId) return;
    try {
        const { syncTransactionToSheet } = await __turbopack_context__.A("[project]/src/services/sheet.service.ts [app-route] (ecmascript, async loader)");
        await syncTransactionToSheet(personId, payload, action);
    } catch (error) {
        console.error("[Sheet Sync] transaction.service sync failed:", {
            action,
            personId,
            transactionId: payload.id,
            error
        });
    }
}
async function loadAccountTransactionsV2(accountId, limit = 2000) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPocketBaseTransactionsForAccount"])(accountId, limit);
}
async function getTransactionsByPeople(personIds, limit = 2000, includeVoided = false) {
    return loadTransactions({
        personIds,
        limit,
        includeVoided
    });
}
const getUnifiedTransactions = loadTransactions;
async function getTransactionById(id, _includeRel) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId, 'category_id,account_id,to_account_id,person_id,shop_id,transaction_history,cashback_entries');
        if (!record) return null;
        return record;
    } catch (error) {
        console.error(`[DB:PB] getTransactionById failed for ${id}:`, error);
        return null;
    }
}
async function deleteTransaction(id) {
    return deleteTransactionCascade(id);
}
async function normalizeAmountForType(type, amount) {
    const absAmount = Math.abs(amount);
    if (type === 'expense' || type === 'debt' || type === 'transfer') {
        return -absAmount;
    }
    return absAmount;
}
function chunkArray(items, size) {
    if (size <= 0) return [
        items
    ];
    const chunks = [];
    for(let i = 0; i < items.length; i += size){
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
}
async function fetchHistoryCountMap(transactionIds) {
    const counts = new Map();
    if (transactionIds.length === 0) return counts;
    const chunks = chunkArray(transactionIds, 60);
    for (const chunk of chunks){
        const filter = chunk.map((id)=>`transaction_id="${id}"`).join(" || ");
        let page = 1;
        while(true){
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("transaction_history", {
                filter,
                page,
                perPage: 500,
                fields: "transaction_id"
            });
            for (const row of response.items ?? []){
                const txnId = String(row.transaction_id || "");
                if (!txnId) continue;
                counts.set(txnId, (counts.get(txnId) ?? 0) + 1);
            }
            const totalPages = Number(response.totalPages ?? 1);
            if (page >= totalPages) break;
            page += 1;
        }
    }
    return counts;
}
function revalidatePersonPaths(personId) {
    if (!personId) return;
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        if (pbId && pbId !== personId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${pbId}`);
        }
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
    }
}
function resolveBaseType(type) {
    if (type === "repayment") return "income";
    if (type === "debt") return "expense";
    if (type === "transfer" || type === "invest") return "transfer";
    if (type === "income") return "income";
    return "expense";
}
async function normalizeInput(input) {
    const accountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.source_account_id, 'accounts');
    const targetId = input.target_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.target_account_id, 'accounts') : input.destination_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.destination_account_id, 'accounts') : input.debt_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.debt_account_id, 'accounts') : null;
    return {
        occurred_at: input.occurred_at,
        note: input.note,
        type: input.type,
        amount: input.amount,
        account_id: accountId,
        target_account_id: targetId,
        to_account_id: targetId,
        category_id: input.category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.category_id, 'categories') : null,
        person_id: input.person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.person_id, 'people') : null,
        shop_id: input.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.shop_id, 'shops') : null,
        tag: input.tag,
        debt_cycle_tag: input.debt_cycle_tag || null,
        persisted_cycle_tag: input.persisted_cycle_tag || null,
        statement_cycle_tag: input.statement_cycle_tag || null,
        status: "posted",
        metadata: input.metadata || {},
        is_installment: input.is_installment || false,
        installment_plan_id: input.installment_plan_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.installment_plan_id, 'installments') : null,
        cashback_share_percent: input.cashback_share_percent,
        cashback_share_fixed: input.cashback_share_fixed,
        cashback_mode: input.cashback_mode,
        linked_transaction_id: input.linked_transaction_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.linked_transaction_id, 'transactions') : null
    };
}
async function logHistory(transactionId, changeType, snapshot) {
    try {
        const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(transactionId, 'pvl_txn_001');
        const historyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbTxnId}:${changeType}:${Date.now()}:${Math.random()}`, 'txnh');
        const compactSnapshot = {
            id: snapshot?.id ?? pbTxnId,
            occurred_at: snapshot?.occurred_at ?? snapshot?.date ?? null,
            date: snapshot?.date ?? snapshot?.occurred_at ?? null,
            note: snapshot?.note ?? snapshot?.description ?? null,
            type: snapshot?.type ?? null,
            status: snapshot?.status ?? null,
            amount: snapshot?.amount ?? null,
            original_amount: snapshot?.original_amount ?? null,
            final_price: snapshot?.final_price ?? null,
            account_id: snapshot?.account_id ?? null,
            target_account_id: snapshot?.target_account_id ?? snapshot?.to_account_id ?? null,
            person_id: snapshot?.person_id ?? null,
            category_id: snapshot?.category_id ?? null,
            shop_id: snapshot?.shop_id ?? null,
            cashback_mode: snapshot?.cashback_mode ?? null,
            cashback_share_percent: snapshot?.cashback_share_percent ?? null,
            cashback_share_fixed: snapshot?.cashback_share_fixed ?? null,
            tag: snapshot?.tag ?? null,
            debt_cycle_tag: snapshot?.debt_cycle_tag ?? null,
            persisted_cycle_tag: snapshot?.persisted_cycle_tag ?? null,
            statement_cycle_tag: snapshot?.statement_cycle_tag ?? null,
            metadata: snapshot?.metadata && typeof snapshot.metadata === "object" ? snapshot.metadata : null
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('transaction_history', {
            id: historyId,
            transaction_id: pbTxnId,
            change_type: changeType,
            snapshot_before: compactSnapshot,
            changed_at: new Date().toISOString()
        });
    } catch (err) {
        console.error("[DB:PB] Failed to log transaction history:", err);
    }
}
async function recalcForAccounts(accountIds) {
    if (accountIds.size === 0) return;
    const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-route] (ecmascript, async loader)");
    await Promise.all(Array.from(accountIds).map((id)=>recalculateBalance(id)));
}
async function fetchLookups(rows) {
    const accountIds = new Set();
    const categoryIds = new Set();
    const personIds = new Set();
    const shopIds = new Set();
    rows.forEach((row)=>{
        if (row.account_id) accountIds.add(row.account_id);
        if (row.target_account_id) accountIds.add(row.target_account_id);
        if (row.category_id) categoryIds.add(row.category_id);
        if (row.person_id) personIds.add(row.person_id);
        if (row.shop_id) shopIds.add(row.shop_id);
    });
    const [accountsList, categoriesList, peopleList, shopsList] = await Promise.all([
        accountIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("accounts", {
            filter: Array.from(accountIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        }),
        categoryIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("categories", {
            filter: Array.from(categoryIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        }),
        personIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("people", {
            filter: Array.from(personIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        }),
        shopIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("shops", {
            filter: Array.from(shopIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        })
    ]);
    const accounts = new Map();
    const categories = new Map();
    const people = new Map();
    const shops = new Map();
    accountsList.items.forEach((row)=>accounts.set(row.id, row));
    categoriesList.items.forEach((row)=>categories.set(row.id, row));
    peopleList.items.forEach((row)=>people.set(row.id, row));
    shopsList.items.forEach((row)=>shops.set(row.id, row));
    return {
        accounts,
        categories,
        people,
        shops
    };
}
async function mapTransactionRow(row, options) {
    const { lookups, contextAccountId, historyCountMap } = options;
    const baseType = resolveBaseType(row.type);
    const account = lookups.accounts.get(row.account_id) ?? null;
    const target = row.target_account_id ? lookups.accounts.get(row.target_account_id) ?? null : null;
    const category = row.category_id ? lookups.categories.get(row.category_id) ?? null : null;
    const person = row.person_id ? lookups.people.get(row.person_id) ?? null : null;
    const shop = row.shop_id ? lookups.shops.get(row.shop_id) ?? null : null;
    let effectiveBaseType = baseType;
    if (baseType === "transfer" && !row.target_account_id && !row.person_id) {
        effectiveBaseType = row.amount >= 0 ? "income" : "expense";
    }
    let displayAmount = row.amount;
    if (contextAccountId && effectiveBaseType === "transfer" && row.target_account_id === contextAccountId && row.account_id !== contextAccountId) {
        displayAmount = Math.abs(row.amount);
    }
    const displayType = effectiveBaseType === "transfer" ? row.target_account_id && contextAccountId === row.target_account_id ? "income" : "expense" : effectiveBaseType === "income" ? "income" : "expense";
    return {
        ...row,
        tag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(row.tag) ?? row.tag ?? null,
        amount: displayAmount,
        original_amount: Math.abs(row.amount),
        displayType,
        display_type: displayType === "income" ? "IN" : displayType === "expense" ? "OUT" : "TRANSFER",
        category_name: category?.name,
        category_slug: category?.slug ?? null,
        category_icon: category?.icon ?? null,
        category_image_url: category?.image_url ?? null,
        account_name: account?.name,
        account_image_url: account?.image_url ?? null,
        source_name: account?.name ?? null,
        destination_name: target?.name ?? (person ? person.name : null),
        source_image: account?.image_url ?? null,
        destination_image: target?.image_url ?? null,
        person_name: person?.name ?? null,
        person_image_url: person?.image_url ?? null,
        person_pocketbase_id: person?.id ?? null,
        shop_name: shop?.name ?? null,
        shop_image_url: shop?.image_url ?? null,
        history_count: historyCountMap?.get(row.id) ?? 0,
        bank_back: 0,
        cashback_share_amount: (row.cashback_share_fixed ?? 0) + Math.abs(row.amount) * (row.cashback_share_percent ?? 0),
        profit: 0
    };
}
async function loadTransactions(options) {
    try {
        const filterParts = [];
        if (!options.includeVoided) filterParts.push('status != "void"');
        if (options.transactionId) {
            filterParts.push(`id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.transactionId, "transactions")}'`);
        } else {
            if (options.personIds && options.personIds.length > 0) {
                const pIds = options.personIds.map((id)=>`person_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, "people")}'`).join(" || ");
                filterParts.push(`(${pIds})`);
            } else if (options.personId) {
                filterParts.push(`person_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.personId, "people")}'`);
            } else if (options.accountId) {
                const accId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.accountId, "accounts");
                filterParts.push(`(account_id = '${accId}' || to_account_id = '${accId}')`);
            }
        }
        if (options.shopId) filterParts.push(`shop_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.shopId, "shops")}'`);
        if (options.categoryId) filterParts.push(`category_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.categoryId, "categories")}'`);
        if (options.installmentPlanId) filterParts.push(`installment_plan_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.installmentPlanId, "installments")}'`);
        const filter = filterParts.length > 0 ? filterParts.join(" && ") : undefined;
        const limit = options.limit || 100;
        let records = [];
        let page = 1;
        let totalPages = 1;
        // PocketBase usually has a max perPage of 200-500. Using 200 to be safe and avoid 400 errors.
        while(page <= totalPages && records.length < limit){
            const remaining = limit - records.length;
            const perPage = Math.min(200, remaining);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
                sort: "-date",
                filter,
                page,
                perPage
            });
            records.push(...response.items);
            totalPages = Number(response.totalPages || 1);
            if (page >= totalPages) break;
            page += 1;
        }
        if (!records.length) return [];
        const lookups = await fetchLookups(records);
        const historyCountMap = await fetchHistoryCountMap(records.map((row)=>row.id));
        return Promise.all(records.map((row)=>mapTransactionRow(row, {
                lookups,
                contextAccountId: options.accountId,
                contextMode: options.context ?? "general",
                historyCountMap
            })));
    } catch (err) {
        console.error("[DB:PB] loadTransactions failed:", err);
        return [];
    }
}
async function createTransaction(input) {
    try {
        const normalized = await normalizeInput(input);
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(crypto.randomUUID(), 'transactions');
        const pbPayload = {
            ...normalized,
            id,
            date: normalized.occurred_at,
            occurred_at: normalized.occurred_at,
            description: normalized.note || '',
            note: normalized.note || '',
            final_price: normalized.amount
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', pbPayload);
        // Recalc Impacts
        const affectedAccounts = new Set();
        affectedAccounts.add(normalized.account_id);
        if (normalized.target_account_id) affectedAccounts.add(normalized.target_account_id);
        await recalcForAccounts(affectedAccounts);
        // Revalidate
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/accounts");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/people");
        revalidatePersonPaths(input.person_id);
        // Keep People Sheet in sync for debt-person flows.
        if (normalized.person_id) {
            await trySyncPeopleSheet(normalized.person_id, {
                id,
                occurred_at: normalized.occurred_at,
                note: normalized.note ?? null,
                tag: normalized.tag ?? normalized.debt_cycle_tag ?? null,
                shop_id: normalized.shop_id ?? null,
                amount: Math.abs(normalized.amount ?? 0),
                original_amount: Math.abs(normalized.amount ?? 0),
                cashback_share_percent: normalized.cashback_share_percent ?? null,
                cashback_share_fixed: normalized.cashback_share_fixed ?? null,
                type: normalized.type,
                account_id: normalized.account_id ?? null,
                target_account_id: normalized.target_account_id ?? normalized.to_account_id ?? null,
                status: "posted"
            }, "create");
        }
        // Integrate Cashback Sync (Real-time)
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertPocketBaseTransactionCashback"])(id);
        } catch (cbErr) {
            console.warn("[Cashback Sync] Auto-sync failed:", cbErr);
        }
        return id;
    } catch (error) {
        console.error("[DB:PB] createTransaction failed:", error);
        return null;
    }
}
async function updateTransaction(id, input) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    console.log('[DB:PB] transactions.update', {
        id: pbId
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) return false;
        const normalized = await normalizeInput(input);
        await logHistory(pbId, "edit", existing);
        const mergedMetadata = {
            ...typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {},
            ...typeof normalized.metadata === 'object' && normalized.metadata !== null ? normalized.metadata : {},
            is_edited: true,
            edited_at: new Date().toISOString()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
            ...normalized,
            date: normalized.occurred_at,
            occurred_at: normalized.occurred_at,
            description: normalized.note || '',
            note: normalized.note || '',
            final_price: normalized.amount,
            metadata: mergedMetadata
        });
        // Integrated Cashback Sync (Real-time)
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertPocketBaseTransactionCashback"])(pbId);
        } catch (cbErr) {
            console.warn("[Cashback Sync] Update-sync failed:", cbErr);
        }
        const affectedAccounts = new Set();
        affectedAccounts.add(existing.account_id);
        if (existing.target_account_id) affectedAccounts.add(existing.target_account_id);
        affectedAccounts.add(normalized.account_id);
        if (normalized.target_account_id) affectedAccounts.add(normalized.target_account_id);
        await recalcForAccounts(affectedAccounts);
        const oldPersonId = existing.person_id;
        const newPersonId = normalized.person_id;
        const oldTag = existing.tag || existing.debt_cycle_tag || existing.persisted_cycle_tag || null;
        const newTag = normalized.tag || normalized.debt_cycle_tag || normalized.persisted_cycle_tag || null;
        // If transaction moved person or cycle, remove stale row from old sheet first.
        if (oldPersonId && (oldPersonId !== newPersonId || oldTag !== newTag)) {
            await trySyncPeopleSheet(oldPersonId, {
                id: pbId,
                occurred_at: existing.occurred_at || existing.date || null,
                tag: oldTag,
                amount: 0,
                status: "void"
            }, "delete");
        }
        if (newPersonId) {
            await trySyncPeopleSheet(newPersonId, {
                id: pbId,
                occurred_at: normalized.occurred_at,
                note: normalized.note ?? null,
                tag: newTag,
                shop_id: normalized.shop_id ?? null,
                amount: Math.abs(normalized.amount ?? 0),
                original_amount: Math.abs(normalized.amount ?? 0),
                cashback_share_percent: normalized.cashback_share_percent ?? null,
                cashback_share_fixed: normalized.cashback_share_fixed ?? null,
                type: normalized.type,
                account_id: normalized.account_id ?? null,
                target_account_id: normalized.target_account_id ?? normalized.to_account_id ?? null,
                status: "posted"
            }, "update");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(`/transactions/${pbId}`);
        return true;
    } catch (error) {
        console.error("[DB:PB] updateTransaction failed:", error);
        return false;
    }
}
async function voidTransaction(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    console.log('[DB:PB] transactions.void', {
        id: pbId
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) return false;
        const existingMeta = typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {};
        const originalTxnId = typeof existingMeta.original_transaction_id === 'string' ? existingMeta.original_transaction_id : null;
        const refundRequestTxnId = typeof existingMeta.refund_request_id === 'string' ? existingMeta.refund_request_id : null;
        const isRefundConfirmationTxn = existingMeta.is_refund_confirmation === true;
        const isRefundRequestTxn = Boolean(originalTxnId) && existingMeta.is_refund_confirmation !== true;
        await logHistory(pbId, "void", existing);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
            status: 'void',
            metadata: {
                ...existingMeta,
                refund_status: 'void',
                voided_at: new Date().toISOString()
            }
        });
        // Integrated Cashback Sync (Real-time)
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertPocketBaseTransactionCashback"])(pbId);
        } catch (cbErr) {
            console.warn("[Cashback Sync] Void-sync failed:", cbErr);
        }
        if (isRefundRequestTxn && originalTxnId) {
            try {
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                if (originalTxn) {
                    const originalMeta = typeof originalTxn.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                    const linkedRefundRequestId = typeof originalMeta.refund_request_id === 'string' ? originalMeta.refund_request_id : null;
                    const shouldRollbackOriginal = linkedRefundRequestId === pbId;
                    if (shouldRollbackOriginal) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
                            status: originalTxn.status === 'waiting_refund' ? 'posted' : originalTxn.status,
                            metadata: {
                                ...originalMeta,
                                has_refund_request: false,
                                refund_status: 'request_voided',
                                refund_request_id: null,
                                refund_request_voided_at: new Date().toISOString()
                            }
                        });
                    }
                }
            } catch (refundRollbackError) {
                console.warn('[DB:PB] voidTransaction refund rollback skipped:', refundRollbackError);
            }
        }
        if (isRefundConfirmationTxn) {
            try {
                if (refundRequestTxnId) {
                    const refundRequestTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', refundRequestTxnId);
                    if (refundRequestTxn) {
                        const refundRequestMeta = typeof refundRequestTxn.metadata === 'object' && refundRequestTxn.metadata !== null ? refundRequestTxn.metadata : {};
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', refundRequestTxnId, {
                            status: 'pending',
                            metadata: {
                                ...refundRequestMeta,
                                is_refund_confirmation: false,
                                refund_status: 'requested',
                                confirmation_transaction_id: null,
                                refund_confirmed_at: null
                            }
                        });
                    }
                }
                if (originalTxnId) {
                    const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                    if (originalTxn) {
                        const originalMeta = typeof originalTxn.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
                            status: originalTxn.status === 'void' ? 'void' : 'waiting_refund',
                            metadata: {
                                ...originalMeta,
                                has_refund_request: true,
                                refund_status: 'requested',
                                refund_request_id: refundRequestTxnId || (typeof originalMeta.refund_request_id === 'string' ? originalMeta.refund_request_id : null),
                                refund_confirmation_id: null,
                                refund_confirmed_at: null
                            }
                        });
                    }
                }
            } catch (refundReopenError) {
                console.warn('[DB:PB] voidTransaction confirmation rollback skipped:', refundReopenError);
            }
        }
        const affectedAccounts = new Set();
        affectedAccounts.add(existing.account_id);
        if (existing.target_account_id) affectedAccounts.add(existing.target_account_id);
        if (originalTxnId) {
            try {
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                if (originalTxn?.account_id) affectedAccounts.add(originalTxn.account_id);
            } catch  {
            // no-op
            }
        }
        await recalcForAccounts(affectedAccounts);
        await trySyncPeopleSheet(existing.person_id ?? null, {
            id: pbId,
            occurred_at: existing.occurred_at || existing.date || null,
            tag: existing.tag || existing.debt_cycle_tag || existing.persisted_cycle_tag || null,
            amount: 0,
            status: "void"
        }, "delete");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        return true;
    } catch (error) {
        console.error("[DB:PB] voidTransaction failed:", error);
        return false;
    }
}
async function deleteTransactionCascade(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    console.log('[DB:PB] transactions.deleteCascade', {
        id: pbId
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) return false;
        // Delete history
        const history = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('transaction_history', {
            filter: `transaction_id="${pbId}"`
        });
        for (const h of history.items){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('transaction_history', h.id);
        }
        // Delete PB transaction
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('pvl_txn_001', pbId);
        const affectedAccounts = new Set();
        affectedAccounts.add(existing.account_id);
        if (existing.target_account_id) affectedAccounts.add(existing.target_account_id);
        // Integrated Cashback Sync (Deletion)
        try {
            const cycleTag = existing.persisted_cycle_tag || existing.tag || existing.debt_cycle_tag;
            if (cycleTag && existing.account_id) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removePocketBaseTransactionCashback"])(existing.account_id, cycleTag);
            }
        } catch (cbErr) {
            console.warn("[Cashback Sync] Deletion-sync failed:", cbErr);
        }
        await recalcForAccounts(affectedAccounts);
        await trySyncPeopleSheet(existing.person_id ?? null, {
            id: pbId,
            occurred_at: existing.occurred_at || existing.date || null,
            tag: existing.tag || existing.debt_cycle_tag || existing.persisted_cycle_tag || null,
            amount: 0,
            status: "void"
        }, "delete");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        return true;
    } catch (error) {
        console.error("[DB:PB] deleteTransactionCascade failed:", error);
        return false;
    }
}
async function getRecentTransactions(limit = 20) {
    return loadTransactions({
        limit
    });
}
async function getPendingRefunds(accountId) {
    const params = {
        filter: `status = "waiting_refund" || (metadata ~ "has_refund_request" && status != "void")`,
        sort: "-date",
        expand: "category_id"
    };
    if (accountId) {
        const pbAccId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
        params.filter = `(${params.filter}) && account_id = "${pbAccId}"`;
    }
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", params);
    return response.items.map((t)=>({
            id: t.id,
            occurred_at: t.occurred_at,
            amount: Math.abs(t.amount),
            status: t.status,
            note: t.note,
            tag: t.tag,
            original_note: t.note,
            original_category: t.expand?.category_id?.name || null
        }));
}
async function confirmRefund(pendingTransactionId, targetAccountId) {
    try {
        const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(pendingTransactionId, 'pvl_txn_001');
        const pbAccId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetAccountId, 'accounts');
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbTxnId);
        if (!existing) return {
            success: false,
            error: 'Transaction not found'
        };
        const existingMeta = typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {};
        const originalTxnId = typeof existingMeta.original_transaction_id === 'string' ? existingMeta.original_transaction_id : null;
        const confirmationTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbTxnId}:refund:confirm:${Date.now()}:${Math.random()}`, 'transactions');
        const shortId = (value)=>String(value || '').slice(0, 6);
        const gd3Tag = `[GD3|${shortId(originalTxnId || pbTxnId)}]`;
        // TXN3: explicit refund confirmation transaction
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', {
            id: confirmationTxnId,
            date: existing.date || existing.occurred_at || new Date().toISOString(),
            occurred_at: existing.occurred_at || existing.date || new Date().toISOString(),
            note: `${gd3Tag} Refund received: ${existing.note || 'Refund'}`,
            description: `${gd3Tag} Refund received: ${existing.note || 'Refund'}`,
            type: existing.type || 'income',
            status: 'completed',
            amount: Math.abs(Number(existing.amount || 0)),
            final_price: Math.abs(Number(existing.amount || 0)),
            account_id: pbAccId,
            to_account_id: existing.account_id || null,
            category_id: existing.category_id || null,
            person_id: existing.person_id || null,
            shop_id: existing.shop_id || null,
            tag: existing.tag || null,
            debt_cycle_tag: existing.debt_cycle_tag || existing.tag || null,
            persisted_cycle_tag: existing.persisted_cycle_tag || null,
            cashback_share_percent: 0,
            cashback_share_fixed: 0,
            cashback_mode: 'none_back',
            metadata: {
                ...existingMeta,
                original_transaction_id: originalTxnId,
                refund_request_id: pbTxnId,
                is_refund_confirmation: true,
                refund_confirmed_at: new Date().toISOString(),
                refund_stage_tag: 'GD3',
                refund_sequence: 3
            }
        });
        // TXN2: pending refund request remains as its own transaction, now completed
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbTxnId, {
            status: 'completed',
            metadata: {
                ...existingMeta,
                is_refund_confirmation: false,
                refund_status: 'completed',
                refund_confirmed_at: new Date().toISOString(),
                confirmation_transaction_id: confirmationTxnId
            }
        });
        // TXN1: original transaction keeps canonical chain status
        if (originalTxnId) {
            try {
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                const originalMeta = typeof originalTxn?.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
                    status: 'refunded',
                    metadata: {
                        ...originalMeta,
                        has_refund_request: true,
                        refund_status: 'completed',
                        refund_request_id: pbTxnId,
                        refund_confirmation_id: confirmationTxnId,
                        refund_confirmed_at: new Date().toISOString()
                    }
                });
            } catch (originalUpdateError) {
                console.warn('[DB:PB] confirmRefund original update skipped:', originalUpdateError);
            }
        }
        const affectedAccounts = new Set();
        affectedAccounts.add(existing.account_id);
        affectedAccounts.add(pbAccId);
        await recalcForAccounts(affectedAccounts);
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        } catch (revalidateError) {
            console.warn('[DB:PB] confirmRefund revalidate skipped:', revalidateError);
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("[DB:PB] confirmRefund failed:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loadAccountTransactionsV2,
    getTransactionsByPeople,
    getUnifiedTransactions,
    getTransactionById,
    deleteTransaction,
    normalizeAmountForType,
    mapTransactionRow,
    loadTransactions,
    createTransaction,
    updateTransaction,
    voidTransaction,
    deleteTransactionCascade,
    getRecentTransactions,
    getPendingRefunds,
    confirmRefund
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(loadAccountTransactionsV2, "607d9465f5402eed9009bfb7a60a95a10c24c0e607", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionsByPeople, "70cc37c3ce2f110e4f9126b656490fe9946fd3f373", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getUnifiedTransactions, "7f527561d98e6f9684e44beb809e9a6808922a40f0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionById, "60fb3c4452ae2cee6a520171f2751d37deb126a9b8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransaction, "4084456600f6bd97881999d3fee5ae3d572cb47027", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(normalizeAmountForType, "60febb1d762e3544466b7eb6906ad830f57f7adcbd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(mapTransactionRow, "60d161c9c9732de259720b05c33955ed328c2bcd8b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(loadTransactions, "40c0df6cfa6a0b89d34ddd98b71e57d6f1d7d585df", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "405f49bcb3b27dae481153997096cbf27431107994", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTransaction, "6054c62320b817ef3233d4cef4f2e2122e4983d181", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(voidTransaction, "40896c90fe4e129e72b570c3d16350723a4d345e2d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransactionCascade, "4069bb7d28b07a53cbec2842ffdfec7c419a5b4b04", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentTransactions, "40036b54cad654bb82e9e32353f1c41222fd93e1dc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingRefunds, "404737af44dc0a0ddd5ccfdc381c810d13382fe2aa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(confirmRefund, "605bb35ceb6f12b9cd8be3c8c305aac26460ddfe44", null);
}),
"[project]/src/app/api/refunds/pending/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function resolveSupabaseAccountId(accountId) {
    if (!accountId) return undefined;
    if (UUID_REGEX.test(accountId)) return accountId;
    try {
        const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', accountId);
        const slug = typeof account?.slug === 'string' ? account.slug : '';
        if (UUID_REGEX.test(slug)) return slug;
    } catch  {
    // Ignore PB lookup failures and return undefined so query stays safe.
    }
    return undefined;
}
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const accountId = searchParams.get('accountId');
        const supabaseAccountId = await resolveSupabaseAccountId(accountId);
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPendingRefunds"])(supabaseAccountId);
        const total = items.reduce((sum, item)=>sum + Math.abs(item.amount || 0), 0);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            total,
            items
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error?.message ?? 'Failed to load pending refunds'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7362f966._.js.map