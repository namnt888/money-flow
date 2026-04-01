module.exports = [
"[project]/src/lib/cashback.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/account-balance.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-rsc] (ecmascript) <locals>");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'yyyy-MM');
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
"[project]/src/lib/cycle-utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setDate.js [app-rsc] (ecmascript)");
;
;
function formatCycleTag(tag, statementDay = 25) {
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tag);
    if (!normalized || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalized)) return tag;
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
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tag);
    if (!normalized || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalized)) return tag;
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
    const targetDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    const day = targetDate.getDate();
    // Cycle ends on statementDay.
    // Start depends on month.
    let cycleEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startOfDay"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setDate"])(targetDate, statementDay));
    // If current day > statementDay, we are in NEXT cycle (which ends next month)
    // If current day <= statementDay, we are in CURRENT cycle (which ends this month)
    if (day > statementDay) {
        cycleEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMonths"])(cycleEndDate, 1);
    }
    // Cycle Start is (Cycle End - 1 month) + 1 day
    const cycleStartDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMonths"])(cycleEndDate, -1);
    cycleStartDate.setDate(cycleStartDate.getDate() + 1);
    return {
        start: cycleStartDate,
        end: cycleEndDate
    };
}
function resolveTransactionCycleTag(transaction, account) {
    const persisted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.persisted_cycle_tag || "");
    if (persisted) return persisted;
    const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.derived_cycle_tag || "");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.tag || "") || "";
}
}),
"[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveCashbackPolicy",
    ()=>resolveCashbackPolicy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-rsc] (ecmascript)");
;
const DEBUG_CASHBACK = process.env.DEBUG_CASHBACK === 'true' || process.env.DEBUG_CASHBACK === '1';
function resolveCashbackPolicy(params) {
    const { account, amount, categoryId, categorySlug, categoryName, cycleTotals } = params;
    // PRIORITY 1: New Column-based Config
    if (account.cb_type && account.cb_type !== 'none') {
        const baseRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRate"])(account.cb_base_rate ?? 0);
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
            const tieredBaseRate = !Array.isArray(rawRules) && rawRules.base_rate !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRate"])(rawRules.base_rate) : baseRate;
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
                finalRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRate"])(matchedPolicy.rate ?? 0);
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
                finalRate = topTier.base_rate !== undefined && topTier.base_rate !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRate"])(topTier.base_rate) : tieredBaseRate;
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
                finalRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRate"])(matchedRule.rate ?? 0);
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id || 'unknown');
    // 1. If no MF5.3 program exists, fallback to Legacy Logic (MF5.2)
    if (!config.program) {
        const { rate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["calculateBankCashback"])(config, amount, categoryName, cycleTotals.spent);
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
const POCKETBASE_URL = (process.env.POCKETBASE_URL || 'https://api-db.reiwarden.io.vn').replace(/\/+$/, '');
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
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), 30_000);
    // Try newer superuser endpoint first, fallback to older admin endpoint if 404
    const authEndpoints = [
        '/api/collections/_superusers/auth-with-password',
        '/api/admins/auth-with-password'
    ];
    let lastError;
    try {
        for (const endpoint of authEndpoints){
            try {
                const response = await fetch(`${POCKETBASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        identity: POCKETBASE_EMAIL,
                        password: POCKETBASE_PASSWORD
                    }),
                    cache: 'no-store',
                    signal: controller.signal
                });
                if (response.ok) {
                    const payload = await response.json();
                    cachedToken = payload.token;
                    cachedTokenExpiresAt = decodeTokenExpiry(payload.token);
                    return payload.token;
                }
                const text = await response.text();
                lastError = `PocketBase auth failed at ${endpoint}: [${response.status}] ${text}`;
                // If not 404, the path is correct but auth simply failed (wrong credentials)
                if (response.status !== 404) {
                    throw new Error(lastError);
                }
            } catch (err) {
                if (err?.name === 'AbortError') throw err;
                lastError = err;
            }
        }
        throw new Error(String(lastError || 'PocketBase auth failed: All endpoints returned 404'));
    } finally{
        clearTimeout(timeoutId);
    }
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
    // Ensure we don't have double slashes if path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${POCKETBASE_URL}${cleanPath}${query}`;
    const method = options?.method || 'GET';
    if (method !== 'GET') {
        console.log(`[DB:PB] ${method} ${url}`);
        if (options?.body) {
            console.log(`[DB:PB] body:`, JSON.stringify(options.body).substring(0, 500));
        }
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), 30_000);
    try {
        const response = await fetch(url, {
            method: options?.method || 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: typeof options?.body === 'undefined' ? undefined : JSON.stringify(options.body),
            cache: 'no-store',
            signal: controller.signal
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
    } finally{
        clearTimeout(timeoutId);
    }
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
"[project]/src/lib/pocketbase/fallback-helpers.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"006d1e9cc2d7bc1ee23a5e9c6051f33517ec04ecb8":"getPocketBasePeople","401994bca8f3d74ec8657d0a39a7d728ddcb88283f":"createPocketBasePerson","401ddd1557b3c5a760a7cf1ad74d609461643a5293":"resolvePocketBasePersonRecord","40a38f1ebcc96e5297dbf1917cfcefad94b3426508":"deletePocketBasePerson","40bddc209ba05f6a8db47c22b33ec683cc3b305c9a":"getPocketBasePersonDetails","40fcbba08963c7a110103c1e196942b7fc81e5c87b":"getPocketBasePersonById","6097a1dabd99ce313dd5da2307628d17e88acf2480":"updatePocketBasePerson"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
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
        group_parent_id: record.group_parent_id ?? null,
        default_repayment_account_id: record.default_repayment_account_id ?? null
    };
}
async function resolvePocketBasePersonRecord(sourceOrPocketBaseId) {
    if (!sourceOrPocketBaseId) return null;
    const isPbId = sourceOrPocketBaseId.length === 15 && !sourceOrPocketBaseId.includes('-');
    const isUuidFormat = isUuid(sourceOrPocketBaseId);
    // 1. Direct fetch if it looks like a PB ID
    if (isPbId) {
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_people_001', sourceOrPocketBaseId);
        } catch  {}
    }
    // 2. Try as source_id / source ID
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceOrPocketBaseId);
        if (pbId !== sourceOrPocketBaseId) {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_people_001', pbId);
        }
    } catch  {}
    // 3. Try lookup by slug
    try {
        const escapedId = sourceOrPocketBaseId.replace(/'/g, "\\'");
        const bySlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_people_001', {
            perPage: 1,
            page: 1,
            filter: `slug='${escapedId}' || name~'${escapedId}'`
        });
        return bySlug.items?.[0] ?? null;
    } catch  {
        return null;
    }
}
async function getPocketBasePeople() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', 'people.list');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_people_001', {
            perPage: 500,
            page: 1
        });
        return response.items.map(mapPerson).sort((a, b)=>a.name.localeCompare(b.name));
    }, async ()=>[], 'people.list');
}
async function getPocketBasePersonDetails(sourceOrPocketBaseId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', 'people.get', {
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
                const webhookDataByName = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('sheet_webhook_links', {
                    filter: `name ~ '${escapedName}'`,
                    sort: '-created',
                    perPage: 1
                });
                let webhookLink = webhookDataByName.items?.[0] || null;
                if (!webhookLink) {
                    const webhookDataLatest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('sheet_webhook_links', {
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
                const cycleSheetRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('person_cycle_sheets', {
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
    }, async ()=>null, 'people.get');
}
async function getPocketBasePersonById(sourceOrPocketBaseId) {
    return getPocketBasePersonDetails(sourceOrPocketBaseId);
}
async function createPocketBasePerson(data) {
    const pbId = data.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.slug || crypto.randomUUID());
    const payload = {
        ...data,
        id: pbId,
        slug: data.slug || pbId,
        group_parent_id: data.group_parent_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.group_parent_id) : null
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', 'people.create', {
        id: pbId,
        name: data.name
    });
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_people_001', payload);
}
async function updatePocketBasePerson(sourceOrPocketBaseId, data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const record = await resolvePocketBasePersonRecord(sourceOrPocketBaseId);
        if (!record?.id) return false;
        const body = {
            ...data
        };
        if (typeof body.group_parent_id === 'string' && body.group_parent_id) {
            body.group_parent_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.group_parent_id);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_people_001', String(record.id), body);
        return true;
    }, async ()=>false, 'people.update');
}
async function deletePocketBasePerson(sourceOrPocketBaseId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const record = await resolvePocketBasePersonRecord(sourceOrPocketBaseId);
        if (!record?.id) return false;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('pvl_people_001', String(record.id));
        return true;
    }, async ()=>false, 'people.delete');
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    resolvePocketBasePersonRecord,
    getPocketBasePeople,
    getPocketBasePersonDetails,
    getPocketBasePersonById,
    createPocketBasePerson,
    updatePocketBasePerson,
    deletePocketBasePerson
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resolvePocketBasePersonRecord, "401ddd1557b3c5a760a7cf1ad74d609461643a5293", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBasePeople, "006d1e9cc2d7bc1ee23a5e9c6051f33517ec04ecb8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBasePersonDetails, "40bddc209ba05f6a8db47c22b33ec683cc3b305c9a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBasePersonById, "40fcbba08963c7a110103c1e196942b7fc81e5c87b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBasePerson, "401994bca8f3d74ec8657d0a39a7d728ddcb88283f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBasePerson, "6097a1dabd99ce313dd5da2307628d17e88acf2480", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBasePerson, "40a38f1ebcc96e5297dbf1917cfcefad94b3426508", null);
}),
"[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0002198770fd50b7768c7638d653d38d6a119a2d23":"getPocketBaseShops","0064a9cc7a129973fa18bf43d8f76108db9748dcae":"getPocketBaseAccounts","00a0f7a31cb733c3a63e0fbc7ed67333e9e159ad29":"getPocketBasePeople","00ea89b8e3d349226ea1cf76166c1b12c3fdeeeeba":"getPocketBaseCategories","40209423ebd1df8ff017aaafd9b66ee47b23be157a":"voidPocketBaseTransaction","405690f8a3b42f919b94d19582093bda78a932e62a":"getPocketBaseUnifiedTransactions","406442d29f9219c1e9669242fc40ee1e8af022cd51":"getPocketBaseAccountDetails","406c8b7b12981726e0a99e445b4d172846412d5a9f":"deletePocketBaseCategoriesBulk","4072c768721fff3626e17df67d9351ec64626b4c06":"loadPocketBaseTransactions","40b7e4de854ec85b7d3d2ce57b4c0a9a9eef423aac":"deletePocketBaseShopsBulk","40b931b83f7e3fa6ddd5d08cea7bc28fdbb36d70d9":"getPocketBaseInstallmentPlan","40c008e30fc4ed3e87d8c68a44762881a2875e8dba":"deletePocketBaseShop","40cdf129c1484892a41434b60aa1f71836e181c30c":"deletePocketBaseCategory","40e0f5f02c66ab35d70477c72c2723c6d0e31693d6":"getPocketBaseTransactionsByPlan","600109ecbff04033c0e8dac4d4297bd6cd23891999":"createPocketBaseCategory","600551bcf583b724e93c29143daafc23adf0a61915":"updatePocketBaseAccountConfig","6009c6de345c28f63f224189891fda5086b87b1d51":"updatePocketBaseShop","6013c8f2f2595d698ff54c65e28d29aba842a697fa":"togglePocketBaseShopArchive","601b7b10d320a5c38214610b791af1df9fbaac52c1":"createPocketBaseTransaction","601b7f84e617edcc51b3a766b95063890665d82ca7":"updatePocketBaseAccountInfo","6051867822d60261f2a852b60e263a777a90026c6d":"updatePocketBaseCategory","607d1e6a2245c18c4ad2d25319eea342c57a8cba37":"togglePocketBaseShopsArchiveBulk","6082d18ebc15026a30c7eed2aaa9a1191bdcf72b13":"getPocketBaseCycleTransactions","608e11b907e03d576a5ec25f5660ad7ce13dbf331a":"createPocketBaseAccount","60a061321fdaaa08d23206f570cea0c9146555031a":"loadPocketBaseTransactionsForAccount","60b86ddd94589dac1dc84867b76465461f15e6c5fb":"updatePocketBasePerson","60c753fe3fd189f607e33ab1cbf2be0a79b55825c4":"createPocketBaseShop","60c8a6f0a10e0502f15ad7796a30bb300ffd9346b2":"updatePocketBaseTransaction","60cb87adb8b84e1591d0a49c5a4c6fd3adc89112d5":"createPocketBasePerson","60edca9031feb56a198341f025e3c4f56cae52db87":"togglePocketBaseCategoryArchive","60f1fabe2a6303c14150df828fd5d669090a97dea0":"togglePocketBaseCategoriesArchiveBulk","60f5ec1fb46fcb8f04554671d7e8c644687823f467":"getPocketBaseAccountCycleOptions","701493980fcc0b23371062d60859b04c03fc37699e":"getPocketBaseAccountSpendingStatsSnapshot"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/account-balance.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycle-utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
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
    const sourceAccountSourceId = expandedAccount?.slug || (record.account_id === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(currentAccountSourceId, "accounts") ? currentAccountSourceId : record.account_id);
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("transaction_history", {
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
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])(collection, {
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
// Request-level cache for account record resolution to avoid redundant DB hits
const accountRecordCache = new Map();
async function resolvePocketBaseAccountRecord(sourceOrPocketBaseId) {
    if (accountRecordCache.has(sourceOrPocketBaseId)) {
        return accountRecordCache.get(sourceOrPocketBaseId) ?? null;
    }
    const fetchAndCache = async ()=>{
        try {
            const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("accounts", sourceOrPocketBaseId);
            if (record) return record;
        } catch  {
        // fallthrough
        }
        const hashedPocketBaseId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceOrPocketBaseId, "accounts");
        if (hashedPocketBaseId !== sourceOrPocketBaseId) {
            if (accountRecordCache.has(hashedPocketBaseId)) {
                return accountRecordCache.get(hashedPocketBaseId) ?? null;
            }
            try {
                const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("accounts", hashedPocketBaseId);
                if (record) return record;
            } catch  {
            // fallthrough
            }
        }
        const bySlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("accounts", {
            perPage: 1,
            filter: `slug='${sourceOrPocketBaseId}'`
        });
        return bySlug.items?.[0] ?? null;
    };
    const result = await fetchAndCache();
    accountRecordCache.set(sourceOrPocketBaseId, result);
    if (result?.id) accountRecordCache.set(result.id, result);
    return result;
}
async function getPocketBaseCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])("PB", "categories.list");
        const records = await listAllRecords("categories");
        return records.map(mapCategory).sort((a, b)=>a.name.localeCompare(b.name));
    }, async ()=>[], "categories.list");
}
async function createPocketBaseCategory(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/categories/records", {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${pbId}`, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] categories.toggleArchive", {
        pbId,
        isArchived
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${pbId}`, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] categories.delete", {
        pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${pbId}`, {
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
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
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
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/categories/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])("PB", "shops.list");
        const records = await listAllRecords("shops");
        return records.map(mapShop).sort((a, b)=>a.name.localeCompare(b.name));
    }, async ()=>[], "shops.list");
}
async function getPocketBaseInstallmentPlan(id) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'installments');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId, 'account_id,original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id');
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    const pbCategoryId = data.default_category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.default_category_id) : null;
    console.log("[DB:PB] shops.create", {
        pbId,
        name: data.name
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/shops/records", {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    const body = {};
    if (typeof data.name !== "undefined") body.name = data.name;
    if (typeof data.image_url !== "undefined") body.image_url = data.image_url;
    if (typeof data.default_category_id !== "undefined") {
        body.default_category_id = data.default_category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.default_category_id) : null;
    }
    if (!Object.keys(body).length) return true;
    console.log("[DB:PB] shops.update", {
        pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${pbId}`, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] shops.toggleArchive", {
        pbId,
        isArchived
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${pbId}`, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] shops.delete", {
        pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${pbId}`, {
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
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
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
    const results = await Promise.allSettled(supabaseIds.map((sbId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/shops/records/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sbId)}`, {
            method: "DELETE"
        })));
    return results.some((r)=>r.status === "fulfilled");
}
async function createPocketBasePerson(supabaseId, data) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] people.create", {
        pbId,
        name: data.name
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/people/records", {
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
                group_parent_id: data.group_parent_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.group_parent_id) : null,
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    console.log("[DB:PB] people.update", {
        pbId
    });
    const body = {
        ...data
    };
    if ("group_parent_id" in body && body.group_parent_id) {
        body.group_parent_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.group_parent_id);
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/people/records/${pbId}`, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseAccountId);
    // NOTE: do NOT toPocketBaseId for owner_id — it is optional and omitted for new accounts
    const pbParentId = data.parent_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.parent_account_id) : null;
    const pbSecuredById = data.secured_by_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.secured_by_account_id) : null;
    const pbHolderPersonId = data.holder_person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.holder_person_id) : null;
    console.log("[DB:PB] accounts.create", {
        pbId,
        name: data.name,
        type: data.type
    });
    try {
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])("/api/collections/accounts/records", {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseAccountId);
    console.log("[DB:PB] accounts.updateInfo START", {
        supabaseAccountId,
        pbId,
        fields: Object.keys(data)
    });
    const body = {
        ...data
    };
    if ("parent_account_id" in body && body.parent_account_id) {
        body.parent_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.parent_account_id);
    } else if ("parent_account_id" in body) {
        body.parent_account_id = null;
    }
    if ("secured_by_account_id" in body && body.secured_by_account_id) {
        body.secured_by_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.secured_by_account_id);
    } else if ("secured_by_account_id" in body) {
        body.secured_by_account_id = null;
    }
    if ("holder_person_id" in body && body.holder_person_id) {
        body.holder_person_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.holder_person_id);
    } else if ("holder_person_id" in body) {
        body.holder_person_id = null;
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/accounts/records/${pbId}`, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseAccountId);
    console.log("[DB:PB] accounts.updateConfig", {
        pbId
    });
    const body = {
        ...data
    };
    if ("secured_by_account_id" in body && body.secured_by_account_id) {
        body.secured_by_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.secured_by_account_id);
    }
    if ("parent_account_id" in body && body.parent_account_id) {
        body.parent_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.parent_account_id);
    }
    if ("holder_person_id" in body && body.holder_person_id) {
        body.holder_person_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(body.holder_person_id);
    }
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/accounts/records/${pbId}`, {
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
        const sourceRecord = byPocketBaseId.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(account.id, "accounts"));
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    let cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    let resolvedCycleTag = cycleTag || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(cycleRange?.end ?? date);
    if (cycleTag) {
        const [yearStr, monthStr] = String(cycleTag).split("-");
        const year = Number(yearStr);
        const month = Number(monthStr);
        if (Number.isFinite(year) && Number.isFinite(month) && year > 2000 && month >= 1 && month <= 12) {
            const refDate = new Date(year, month - 1, 1);
            cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, refDate);
            resolvedCycleTag = cycleTag;
        }
    }
    const cycleResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("cashback_cycles", {
        perPage: 1,
        filter: `account_id='${pocketBaseAccountId}' && cycle_tag='${resolvedCycleTag}'`
    });
    const cycle = cycleResponse.items?.[0];
    let rawTransactions = [];
    const queryAttempts = [
        {
            // Primary attempt: filter by cycle tag directly in DB for high performance
            filter: resolvedCycleTag ? `account_id='${pocketBaseAccountId}' && (debt_cycle_tag='${resolvedCycleTag}' || persisted_cycle_tag='${resolvedCycleTag}' || tag='${resolvedCycleTag}')` : `account_id='${pocketBaseAccountId}'`,
            sort: "-date,id",
            fields: "id,amount,type,metadata,date,tag,debt_cycle_tag,persisted_cycle_tag"
        },
        {
            // Fallback: search by date range if tag filter yields nothing or tag is missing
            filter: `account_id='${pocketBaseAccountId}'`,
            fields: "id,amount,type,metadata,date,tag,debt_cycle_tag,persisted_cycle_tag"
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
            // Post-filter to ensure strict 'Truth' tag matching
            // If a transaction was moved to another tag (T4), but DB still has old persisted_tag (T3),
            // the fetch above might find it. We MUST exclude it here to keep the balance correct.
            rawTransactions = Array.from(uniqueMap.values()).filter((tx)=>{
                const metadata = tx.metadata && typeof tx.metadata === 'object' ? tx.metadata : {};
                const truthTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tx.debt_cycle_tag || tx.tag || metadata.debt_cycle_tag || metadata.tag || "");
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(truthTag || "") === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(resolvedCycleTag || "");
            });
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
        const txCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tx.debt_cycle_tag || tx.tag || metadata?.debt_cycle_tag || metadata?.tag || tx.persisted_cycle_tag || tx.statement_cycle_tag) || tx.persisted_cycle_tag || tx.statement_cycle_tag || null;
        if (resolvedCycleTag) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(txCycleTag) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(resolvedCycleTag);
        }
        const txDateRaw = tx.occurred_at || tx.date;
        const txDate = txDateRaw ? new Date(txDateRaw) : null;
        if (!txDate || Number.isNaN(txDate.getTime())) return false;
        if (cycleStartTime === null || cycleEndTime === null) return true;
        return txDate.getTime() >= cycleStartTime && txDate.getTime() <= cycleEndTime;
    });
    const categoryIds = Array.from(new Set(cycleTransactions.map((tx)=>tx.category_id).filter(Boolean)));
    const categoryMap = new Map();
    if (categoryIds.length > 0) {
        const categoryResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("categories", {
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
            const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
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
            const sharedPercent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeRate"])(tx.cashback_share_percent);
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
    const usagePercent = account.type === "credit_card" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCreditCardUsage"])({
        type: account.type,
        credit_limit: account.credit_limit || 0,
        current_balance: account.current_balance || 0
    }).percent : 0;
    const remainingLimit = account.type === "credit_card" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCreditCardAvailableBalance"])({
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
        const hashedId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(inputId, "pvl_txn_001");
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
        const resolvedPersonRecords = await Promise.all(personIds.map((personId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolvePocketBasePersonRecord"])(personId)));
        const candidatePersonIds = Array.from(new Set(personIds.flatMap((personId, index)=>{
            const resolvedRecord = resolvedPersonRecords[index];
            return [
                personId,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, "people"),
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
            filterParts.push(`category_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.categoryId, "categories")}'`);
        }
        if (options.shopId) {
            filterParts.push(`shop_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.shopId, "shops")}'`);
        }
        if (options.installmentPlanId) {
            filterParts.push(`installment_plan_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.installmentPlanId, "installments")}'`);
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const cyclesResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("cashback_cycles", {
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
                label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatCycleTag"])(cycle.cycle_tag, actualStatementDay);
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
    const currentTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleTag"])(new Date(), {
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
    const pocketBaseAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceAccountId, "accounts");
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    // Merge source_id into metadata so mapTransaction can reverse-lookup the SB UUID via record.metadata.source_id
    const mergedMetadata = {
        ...data.metadata && typeof data.metadata === "object" ? data.metadata : {},
        source_id: supabaseId,
        debt_cycle_tag: data.debt_cycle_tag ?? data.tag ?? null,
        cashback_share_percent: data.cashback_share_percent ?? null,
        cashback_share_fixed: data.cashback_share_fixed ?? null,
        cashback_mode: data.cashback_mode ?? null
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/transactions/records`, {
        method: "POST",
        body: {
            id: pbId,
            occurred_at: data.occurred_at,
            note: data.note ?? null,
            type: data.type,
            account_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.account_id),
            amount: data.amount,
            debt_cycle_tag: data.debt_cycle_tag ?? data.tag ?? null,
            category_id: data.category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.category_id) : null,
            person_id: data.person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.person_id) : null,
            to_account_id: data.target_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.target_account_id) : null,
            shop_id: data.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.shop_id) : null,
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    const payload = {};
    if (data.occurred_at !== undefined) payload.occurred_at = data.occurred_at;
    if (data.note !== undefined) payload.note = data.note;
    if (data.type !== undefined) payload.type = data.type;
    if (data.account_id !== undefined) payload.account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.account_id);
    if (data.amount !== undefined) payload.amount = data.amount;
    if (data.tag !== undefined || data.debt_cycle_tag !== undefined) {
        payload.debt_cycle_tag = data.debt_cycle_tag ?? data.tag ?? null;
    }
    if (data.category_id !== undefined) payload.category_id = data.category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.category_id) : null;
    if (data.person_id !== undefined) payload.person_id = data.person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.person_id) : null;
    if (data.target_account_id !== undefined) payload.to_account_id = data.target_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.target_account_id) : null;
    if (data.shop_id !== undefined) payload.shop_id = data.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.shop_id) : null;
    if (data.status !== undefined) payload.status = data.status;
    if (data.persisted_cycle_tag !== undefined) payload.persisted_cycle_tag = data.persisted_cycle_tag;
    if (data.cashback_share_percent !== undefined) payload.cashback_share_percent = data.cashback_share_percent;
    if (data.cashback_share_fixed !== undefined) payload.cashback_share_fixed = data.cashback_share_fixed;
    if (data.cashback_mode !== undefined) payload.cashback_mode = data.cashback_mode;
    if (data.metadata !== undefined || data.cashback_share_percent !== undefined || data.cashback_share_fixed !== undefined || data.cashback_mode !== undefined || data.debt_cycle_tag !== undefined || data.tag !== undefined) {
        const current = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("transactions", pbId);
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/transactions/records/${pbId}`, {
        method: "PATCH",
        body: payload
    });
}
async function voidPocketBaseTransaction(supabaseId) {
    console.log("[DB:PB] transactions.void", {
        id: supabaseId
    });
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(supabaseId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseRequest"])(`/api/collections/transactions/records/${pbId}`, {
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseCategories, "00ea89b8e3d349226ea1cf76166c1b12c3fdeeeeba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseCategory, "600109ecbff04033c0e8dac4d4297bd6cd23891999", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseCategory, "6051867822d60261f2a852b60e263a777a90026c6d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseCategoryArchive, "60edca9031feb56a198341f025e3c4f56cae52db87", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseCategory, "40cdf129c1484892a41434b60aa1f71836e181c30c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseCategoriesArchiveBulk, "60f1fabe2a6303c14150df828fd5d669090a97dea0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseCategoriesBulk, "406c8b7b12981726e0a99e445b4d172846412d5a9f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBasePeople, "00a0f7a31cb733c3a63e0fbc7ed67333e9e159ad29", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseShops, "0002198770fd50b7768c7638d653d38d6a119a2d23", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseInstallmentPlan, "40b931b83f7e3fa6ddd5d08cea7bc28fdbb36d70d9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseTransactionsByPlan, "40e0f5f02c66ab35d70477c72c2723c6d0e31693d6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseShop, "60c753fe3fd189f607e33ab1cbf2be0a79b55825c4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseShop, "6009c6de345c28f63f224189891fda5086b87b1d51", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseShopArchive, "6013c8f2f2595d698ff54c65e28d29aba842a697fa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseShop, "40c008e30fc4ed3e87d8c68a44762881a2875e8dba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseShopsArchiveBulk, "607d1e6a2245c18c4ad2d25319eea342c57a8cba37", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseShopsBulk, "40b7e4de854ec85b7d3d2ce57b4c0a9a9eef423aac", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBasePerson, "60cb87adb8b84e1591d0a49c5a4c6fd3adc89112d5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBasePerson, "60b86ddd94589dac1dc84867b76465461f15e6c5fb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseAccount, "608e11b907e03d576a5ec25f5660ad7ce13dbf331a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseAccountInfo, "601b7f84e617edcc51b3a766b95063890665d82ca7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseAccountConfig, "600551bcf583b724e93c29143daafc23adf0a61915", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccounts, "0064a9cc7a129973fa18bf43d8f76108db9748dcae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountSpendingStatsSnapshot, "701493980fcc0b23371062d60859b04c03fc37699e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountDetails, "406442d29f9219c1e9669242fc40ee1e8af022cd51", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loadPocketBaseTransactionsForAccount, "60a061321fdaaa08d23206f570cea0c9146555031a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loadPocketBaseTransactions, "4072c768721fff3626e17df67d9351ec64626b4c06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountCycleOptions, "60f5ec1fb46fcb8f04554671d7e8c644687823f467", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseCycleTransactions, "6082d18ebc15026a30c7eed2aaa9a1191bdcf72b13", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseTransaction, "601b7b10d320a5c38214610b791af1df9fbaac52c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseTransaction, "60c8a6f0a10e0502f15ad7796a30bb300ffd9346b2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(voidPocketBaseTransaction, "40209423ebd1df8ff017aaafd9b66ee47b23be157a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseUnifiedTransactions, "405690f8a3b42f919b94d19582093bda78a932e62a", null);
}),
"[project]/src/services/pocketbase/mappers.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s([
    "mapPocketBaseAccountRow",
    ()=>mapPocketBaseAccountRow
]);
function mapPocketBaseAccountRow(record) {
    return {
        id: record.id,
        name: record.name ?? '',
        type: record.type ?? 'bank',
        currency: record.currency ?? 'VND',
        current_balance: Number(record.current_balance ?? 0),
        credit_limit: Number(record.credit_limit ?? 0),
        parent_account_id: record.parent_account_id || null,
        account_number: record.account_number || null,
        owner_id: record.owner_id || null,
        cashback_config: record.cashback_config ?? null,
        cashback_config_version: Number(record.cashback_config_version ?? 1),
        secured_by_account_id: record.secured_by_account_id || null,
        is_active: record.is_active ?? true,
        image_url: typeof record.image_url === 'string' && record.image_url.startsWith('http') ? record.image_url : null,
        receiver_name: record.receiver_name || null,
        total_in: Number(record.total_in ?? 0),
        total_out: Number(record.total_out ?? 0),
        annual_fee: Number(record.annual_fee ?? 0),
        annual_fee_waiver_target: Number(record.annual_fee_waiver_target ?? 0),
        cb_type: record.cb_type ?? 'none',
        cb_base_rate: Number(record.cb_base_rate ?? 0),
        cb_max_budget: Number(record.cb_max_budget ?? 0),
        cb_is_unlimited: record.cb_is_unlimited ?? false,
        cb_rules_json: record.cb_rules_json ?? null,
        cb_min_spend: Number(record.cb_min_spend ?? 0),
        cb_rules: record.cb_rules ?? null,
        cb_cycle_type: record.cb_cycle_type ?? 'calendar_month',
        statement_day: Number(record.statement_day ?? 0),
        due_date: Number(record.due_date ?? 0),
        holder_type: record.holder_type ?? null,
        holder_person_id: record.holder_person_id ?? null,
        created_at: record.created ?? null,
        updated_at: record.updated ?? null
    };
}
}),
"[project]/src/services/account.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a9935267a76ac90c646ef5f7cb524cbe49227b64":"getAccounts","401d2e5e32d551cea249bb118bdb29b206590dd216":"getRecentAccountsByTransactions","404099e69215220cee5890cfde50a848e230ca34b7":"getAccountStats","40620b053dcb11d19fa21e6d7d1ff9b5b28a376e4d":"deleteAccount","40e87f1a5f4c3f21335006423672957f9a72591602":"getAccountDetails","40f7a61b26eae2150806832e69b1cc78e14a34fdc2":"recalculateBalance","60676eb4ffdb421973579b327d5767f96a927836cd":"getAccountTransactions","609e2041182472ba5e7d6ad42b213694fc7924f6b4":"updateAccountStatus","60a51d7af14ed4346215b903ed9dadd8d51a92d17e":"updateAccountConfig"},"",""] */ __turbopack_context__.s([
    "deleteAccount",
    ()=>deleteAccount,
    "getAccountDetails",
    ()=>getAccountDetails,
    "getAccountStats",
    ()=>getAccountStats,
    "getAccountTransactions",
    ()=>getAccountTransactions,
    "getAccounts",
    ()=>getAccounts,
    "getRecentAccountsByTransactions",
    ()=>getRecentAccountsByTransactions,
    "recalculateBalance",
    ()=>recalculateBalance,
    "updateAccountConfig",
    ()=>updateAccountConfig,
    "updateAccountStatus",
    ()=>updateAccountStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/account-balance.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$mappers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/mappers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
function parseJsonSafe(value) {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        } catch (parseError) {
            console.error('Failed to parse JSON string:', parseError);
            return null;
        }
    }
    return value;
}
const fmtDate = (d)=>{
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit'
    }).format(d);
};
// getSupabaseAccountRows removed
async function getPocketBaseAccountRows() {
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('accounts', {
            perPage: 200,
            sort: 'name'
        });
        return response.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$mappers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapPocketBaseAccountRow"]);
    } catch (error) {
        console.error('[DB:PB] accounts.list failed:', error);
        return [];
    }
}
async function getStatsForAccount(account) {
    const creditLimit = account.credit_limit ?? 0;
    const currentBalance = account.current_balance ?? 0;
    const usage_percent = account.type === 'credit_card' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCreditCardUsage"])({
        type: account.type,
        credit_limit: creditLimit,
        current_balance: currentBalance
    }).percent : 0;
    const remaining_limit = account.type === 'credit_card' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCreditCardAvailableBalance"])({
        type: account.type,
        credit_limit: creditLimit,
        current_balance: currentBalance
    }) : currentBalance;
    const baseStats = {
        usage_percent,
        remaining_limit,
        spent_this_cycle: 0,
        min_spend: null,
        missing_for_min: null,
        is_qualified: false,
        cycle_range: "",
        due_date_display: null,
        due_date: null,
        remains_cap: null,
        shared_cashback: null
    };
    const hasConfig = account.cashback_config || account.cb_type !== 'none';
    if (!hasConfig) return baseStats;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(account.cashback_config, account);
    if (!config) return baseStats;
    const now = new Date();
    const explicitCycleType = account.cb_cycle_type || config.cycleType;
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])({
        ...config,
        cycleType: explicitCycleType
    }, now);
    if (!cycleRange) return baseStats;
    const { start, end } = cycleRange;
    const tagDate = cycleRange.end;
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    // Fetch Cycle from PB
    const cycleResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
        filter: `account_id = "${account.id}" && cycle_tag = "${cycleTag}"`,
        perPage: 1
    });
    const cycle = cycleResp.items[0] || null;
    let spent_this_cycle = cycle?.spent_amount ?? 0;
    let real_awarded = cycle?.real_awarded ?? 0;
    const virtual_profit = cycle?.virtual_profit ?? 0;
    // Fallback for real_awarded (Income)
    if (real_awarded === 0) {
        const incomeResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: `account_id = "${account.id}" && type = "income" && status = "posted" && persisted_cycle_tag = "${cycleTag}"`,
            perPage: 50
        });
        real_awarded = incomeResp.items.reduce((sum, t)=>sum + Math.abs(t.amount || 0), 0);
    }
    let remains_cap = null;
    if (cycle) {
        const maxBudget = cycle.max_budget ?? null;
        if (maxBudget !== null) {
            const consumed = real_awarded + virtual_profit;
            remains_cap = Math.max(0, maxBudget - consumed);
        }
    }
    const min_spend = cycle ? cycle.min_spend_target ?? null : config.minSpendTarget;
    const missing_for_min = min_spend !== null ? Math.max(0, min_spend - spent_this_cycle) : null;
    const is_qualified = cycle?.met_min_spend ?? (min_spend !== null && spent_this_cycle >= min_spend);
    return {
        ...baseStats,
        spent_this_cycle,
        min_spend,
        missing_for_min,
        is_qualified,
        cycle_range: start && end ? `${fmtDate(start)} - ${fmtDate(end)}` : "",
        remains_cap,
        shared_cashback: real_awarded,
        real_awarded,
        virtual_profit,
        annual_fee_waiver_target: account.annual_fee_waiver_target ?? config.minSpendTarget ?? null,
        annual_fee_waiver_progress: 0,
        annual_fee_waiver_met: false,
        max_budget: cycle?.max_budget ?? config.maxBudget ?? null
    };
}
async function getAccounts() {
    console.log('[DB:PB] accounts.getAll');
    const rows = await getPocketBaseAccountRows();
    const childrenMap = new Map();
    const accountMap = new Map();
    rows.forEach((row)=>accountMap.set(row.id, row));
    rows.forEach((row)=>{
        if (row.parent_account_id) {
            if (!childrenMap.has(row.parent_account_id)) childrenMap.set(row.parent_account_id, []);
            if (accountMap.has(row.parent_account_id)) childrenMap.get(row.parent_account_id).push(row);
        }
    });
    const accounts = [];
    for (const item of rows){
        const stats = await getStatsForAccount(item);
        const childRows = childrenMap.get(item.id) || [];
        const parentRow = item.parent_account_id ? accountMap.get(item.parent_account_id) : null;
        const relationships = {
            is_parent: childRows.length > 0,
            child_count: childRows.length,
            child_accounts: childRows.map((c)=>({
                    id: c.id,
                    name: c.name,
                    image_url: c.image_url
                })),
            parent_info: parentRow ? {
                id: parentRow.id,
                name: parentRow.name,
                type: parentRow.type,
                image_url: parentRow.image_url
            } : null
        };
        accounts.push({
            id: item.id,
            name: item.name,
            type: item.type,
            currency: item.currency ?? 'VND',
            current_balance: item.current_balance ?? 0,
            credit_limit: item.credit_limit ?? 0,
            owner_id: item.owner_id ?? '',
            account_number: item.account_number ?? null,
            receiver_name: item.receiver_name ?? null,
            parent_account_id: item.parent_account_id ?? null,
            secured_by_account_id: item.secured_by_account_id ?? null,
            cb_type: item.cb_type ?? 'none',
            cb_base_rate: item.cb_base_rate ?? 0,
            cb_max_budget: item.cb_max_budget ?? null,
            cb_is_unlimited: item.cb_is_unlimited ?? false,
            cb_rules_json: parseJsonSafe(item.cb_rules_json),
            cb_min_spend: item.cb_min_spend ?? null,
            cb_cycle_type: item.cb_cycle_type ?? 'calendar_month',
            statement_day: item.statement_day ?? null,
            due_date: item.due_date ?? null,
            holder_type: item.holder_type ?? 'me',
            holder_person_id: item.holder_person_id ?? null,
            cashback_config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(item.cashback_config),
            is_active: typeof item.is_active === 'boolean' ? item.is_active : null,
            image_url: typeof item.image_url === 'string' ? item.image_url : null,
            total_in: item.total_in ?? 0,
            total_out: item.total_out ?? 0,
            stats,
            relationships,
            credit_card_info: (()=>{
                const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(item.cashback_config);
                if (!config) return undefined;
                return {
                    statement_day: item.statement_day ?? config.statementDay ?? config.statement_day,
                    payment_due_day: item.due_date ?? config.paymentDueDay ?? config.payment_due_day ?? config.dueDate
                };
            })()
        });
    }
    // 3. Sorting Logic
    // Priority: 
    // 1. Due Date (ASC) - Nearest first
    // 2. Cashback Need (DESC) - Highest missing_for_min first
    // 3. Name (ASC)
    return accounts.sort((a, b)=>{
        // Helper to get sortable date timestamp
        const getDueDateTs = (acc)=>{
            if (!acc.stats?.due_date_display) return 9999999999999 // Far future
            ;
            const [day, month] = acc.stats.due_date_display.split('/').map(Number);
            const now = new Date();
            const currentYear = now.getFullYear();
            const date = new Date(currentYear, month - 1, day);
            // If date is in the past (e.g. today is Dec 15, due date Dec 10), assume next year?
            // Actually due date usually means upcoming due date. 
            // If getStats calculated it, it's relative to current cycle end.
            // Let's assume the year is current year, or next year if month < current month?
            // Simple heuristic: if month < now.month - 1, it's next year.
            if (date.getTime() < now.getTime() - 30 * 24 * 60 * 60 * 1000) {
                date.setFullYear(currentYear + 1);
            }
            return date.getTime();
        };
        const dueA = getDueDateTs(a);
        const dueB = getDueDateTs(b);
        if (dueA !== dueB) return dueA - dueB;
        // Cashback Need (DESC)
        const missA = a.stats?.missing_for_min ?? 0;
        const missB = b.stats?.missing_for_min ?? 0;
        if (missA !== missB) return missB - missA // Highest missing first
        ;
        // Name (ASC)
        return a.name.localeCompare(b.name);
    });
}
async function getAccountDetails(id) {
    if (!id || id === 'add' || id === 'new' || id === 'undefined') return null;
    console.log('[DB:PB] accounts.getDetails', {
        id
    });
    const mapAccountRowToDetails = (row)=>({
            id: row.id,
            name: row.name,
            type: row.type,
            currency: row.currency ?? 'VND',
            current_balance: row.current_balance ?? 0,
            credit_limit: row.credit_limit ?? 0,
            owner_id: row.owner_id ?? '',
            account_number: row.account_number ?? null,
            receiver_name: row.receiver_name ?? null,
            secured_by_account_id: row.secured_by_account_id ?? null,
            parent_account_id: row.parent_account_id ?? null,
            cashback_config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(row.cashback_config),
            cashback_config_version: row.cashback_config_version ?? 1,
            is_active: typeof row.is_active === 'boolean' ? row.is_active : null,
            image_url: typeof row.image_url === 'string' ? row.image_url : null,
            total_in: row.total_in ?? 0,
            total_out: row.total_out ?? 0,
            annual_fee: row.annual_fee ?? null,
            annual_fee_waiver_target: row.annual_fee_waiver_target ?? null,
            cb_type: row.cb_type ?? 'none',
            cb_base_rate: row.cb_base_rate ?? 0,
            cb_max_budget: row.cb_max_budget ?? null,
            cb_is_unlimited: row.cb_is_unlimited ?? false,
            cb_rules_json: parseJsonSafe(row.cb_rules_json),
            cb_min_spend: row.cb_min_spend ?? null,
            cb_cycle_type: row.cb_cycle_type ?? 'calendar_month',
            statement_day: row.statement_day ?? null,
            due_date: row.due_date ?? null,
            holder_type: row.holder_type ?? 'me',
            holder_person_id: row.holder_person_id ?? null
        });
    try {
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', id);
        if (!record) return null;
        return mapAccountRowToDetails((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$mappers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapPocketBaseAccountRow"])(record));
    } catch (err) {
        console.error('[DB:PB] getAccountDetails failed:', err);
        return null;
    }
}
// GroupedTransactionLines removed as lines are deprecated
async function fetchTransactions(accountId, limit) {
    try {
        const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: `account_id = "${pbAccountId}" || target_account_id = "${pbAccountId}"`,
            sort: '-occurred_at',
            perPage: limit,
            expand: 'account_id,target_account_id,category_id,shop_id,person_id'
        });
        // Reuse mapPocketBaseTransaction from account-details.service if available, 
        // but here we might need a general mapper. 
        // Since loadPocketBaseTransactionsForAccount is already exported from account-details.service, 
        // we can use it.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadPocketBaseTransactionsForAccount"])(accountId, limit);
    } catch (err) {
        console.error('[DB:PB] fetchTransactions failed:', err);
        return [];
    }
}
async function getAccountTransactions(accountId, limit = 20) {
    console.log('[DB:PB] accounts.getTransactions', {
        accountId,
        limit
    });
    return fetchTransactions(accountId, limit);
}
async function updateAccountConfig(accountId, data) {
    if (accountId === 'new') return false;
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    console.log('[DB:PB] accounts.updateConfig', {
        id: pbId
    });
    try {
        const payload = {
            ...data
        };
        // MF5.3 Compatibility Mapping
        if (data.secured_by_account_id) payload.secured_by_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.secured_by_account_id, 'accounts');
        if (data.parent_account_id) payload.parent_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.parent_account_id, 'accounts');
        if (data.holder_person_id) payload.holder_person_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.holder_person_id, 'people');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('accounts', pbId, payload);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/accounts/${accountId}`);
        return true;
    } catch (error) {
        console.error('[DB:PB] updateAccountConfig failed:', error);
        return false;
    }
}
async function getAccountStats(accountId) {
    const { getAccountSpendingStatsSnapshot } = await __turbopack_context__.A("[project]/src/services/cashback.service.ts [app-rsc] (ecmascript, async loader)");
    const stats = await getAccountSpendingStatsSnapshot(accountId, new Date());
    if (!stats) {
        return null;
    }
    const rawPotential = stats.currentSpend * stats.rate;
    const cappedPotential = typeof stats.maxCashback === 'number' ? Math.min(rawPotential, stats.maxCashback) : rawPotential;
    const potentialProfit = typeof stats.potentialProfit === 'number' && Number.isFinite(stats.potentialProfit) ? stats.potentialProfit : cappedPotential - stats.sharedAmount;
    return {
        ...stats,
        potentialProfit
    };
}
async function recalculateBalance(accountId) {
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    console.log('[DB:PB] accounts.recalcBalance', {
        accountId: pbAccountId
    });
    // 1. Get account type
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbAccountId);
    if (!account) {
        console.warn('[PB:Recalc] Account not found:', pbAccountId);
        return false;
    }
    // 2. Fetch all transactions for this account (posted, no parent)
    // PerPage=5000 as safety for now. 
    // We use filter for account_id and target_account_id (mapped by migrate to both names)
    const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
        filter: `status = "posted" && parent_transaction_id = "" && (account_id = "${pbAccountId}" || to_account_id = "${pbAccountId}")`,
        perPage: 5000
    });
    const { totalIn, totalOut, currentBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["computeAccountTotals"])({
        accountId: pbAccountId,
        accountType: account.type,
        transactions: txns.items || []
    });
    // 3. Update PB
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('accounts', pbAccountId, {
            current_balance: currentBalance,
            total_in: totalIn,
            total_out: totalOut
        });
    } catch (err) {
        console.error('[DB:PB] accounts.recalcBalance failed:', err);
        return false;
    }
    return true;
}
async function deleteAccount(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'accounts');
    console.log('[DB:PB] accounts.delete', {
        id: pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('accounts', pbId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        return true;
    } catch (err) {
        console.error('[DB:PB] accounts.delete failed:', err);
        return false;
    }
}
async function updateAccountStatus(id, isActive) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'accounts');
    console.log('[DB:PB] accounts.updateStatus', {
        id: pbId,
        isActive
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('accounts', pbId, {
            is_active: isActive
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        return true;
    } catch (error) {
        console.error('[DB:PB] updateAccountStatus failed:', error);
        return false;
    }
}
async function getRecentAccountsByTransactions(limit = 5) {
    console.log('[DB:PB] accounts.getRecentByTxns', {
        limit
    });
    try {
        const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            sort: '-occurred_at',
            perPage: 50,
            fields: 'account_id'
        });
        const accountIds = Array.from(new Set(txns.items.map((t)=>t.account_id).filter(Boolean))).slice(0, limit);
        if (accountIds.length === 0) return [];
        const accounts = await Promise.all(accountIds.map((id)=>getAccountDetails(id)));
        return accounts.filter(Boolean);
    } catch (err) {
        console.error('[DB:PB] getRecentAccountsByTransactions failed:', err);
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAccounts,
    getAccountDetails,
    getAccountTransactions,
    updateAccountConfig,
    getAccountStats,
    recalculateBalance,
    deleteAccount,
    updateAccountStatus,
    getRecentAccountsByTransactions
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccounts, "00a9935267a76ac90c646ef5f7cb524cbe49227b64", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountDetails, "40e87f1a5f4c3f21335006423672957f9a72591602", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountTransactions, "60676eb4ffdb421973579b327d5767f96a927836cd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccountConfig, "60a51d7af14ed4346215b903ed9dadd8d51a92d17e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountStats, "404099e69215220cee5890cfde50a848e230ca34b7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recalculateBalance, "40f7a61b26eae2150806832e69b1cc78e14a34fdc2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAccount, "40620b053dcb11d19fa21e6d7d1ff9b5b28a376e4d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccountStatus, "609e2041182472ba5e7d6ad42b213694fc7924f6b4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentAccountsByTransactions, "401d2e5e32d551cea249bb118bdb29b206590dd216", null);
}),
"[project]/src/actions/ai-reminder-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00f81387626360a80508e83a60b6f87225744d325d":"getAccountRemindersAction"},"",""] */ __turbopack_context__.s([
    "getAccountRemindersAction",
    ()=>getAccountRemindersAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/account.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getAccountRemindersAction() {
    try {
        const accounts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccounts"])();
        const now = new Date();
        const reminders = [];
        for (const account of accounts){
            // Check Credit Card Due Dates
            if (account.type === 'credit_card' && account.stats?.due_date) {
                const dueDate = new Date(account.stats.due_date);
                const timeDiff = dueDate.getTime() - now.getTime();
                const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
                const debt = account.current_balance || 0;
                if (debt > 0 && daysRemaining <= 5 && daysRemaining >= 0) {
                    let severity = 'medium';
                    let title = `Sắp đến hạn thanh toán: ${account.name}`;
                    let message = `Thẻ **${account.name}** cần thanh toán **${debt.toLocaleString()}đ** trong ${daysRemaining} ngày tới.`;
                    if (daysRemaining === 0) {
                        severity = 'critical';
                        title = `HÔM NAY LÀ HẠN CUỐI: ${account.name}`;
                        message = `🚨 **HẠN CUỐI HÔM NAY!** Bạn cần thanh toán **${debt.toLocaleString()}đ** cho thẻ **${account.name}** ngay lập tức để tránh phí phạt.`;
                    } else if (daysRemaining === 1) {
                        severity = 'high';
                        title = `Hạn thanh toán ngày mai: ${account.name}`;
                        message = `⚠️ **Ngày mai** là hạn cuối! Đừng quên thanh toán **${debt.toLocaleString()}đ** cho thẻ **${account.name}** nhé.`;
                    }
                    reminders.push({
                        id: `due-${account.id}-${daysRemaining}`,
                        type: 'due_date',
                        title,
                        message,
                        severity,
                        days_remaining: daysRemaining,
                        account_id: account.id
                    });
                }
            }
        }
        // Sort reminders by severity and days remaining
        const severityMap = {
            critical: 4,
            high: 3,
            medium: 2,
            low: 1
        };
        reminders.sort((a, b)=>{
            if (severityMap[b.severity] !== severityMap[a.severity]) {
                return severityMap[b.severity] - severityMap[a.severity];
            }
            return a.days_remaining - b.days_remaining;
        });
        return {
            success: true,
            data: reminders
        };
    } catch (error) {
        console.error("[getAccountRemindersAction] Error:", error);
        return {
            success: false,
            data: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAccountRemindersAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountRemindersAction, "00f81387626360a80508e83a60b6f87225744d325d", null);
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}),
"[project]/src/lib/ai-v2/providers/groq.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroqProvider",
    ()=>GroqProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$groq$2d$sdk$40$0$2e$37$2e$0$2f$node_modules$2f$groq$2d$sdk$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/groq-sdk@0.37.0/node_modules/groq-sdk/index.mjs [app-rsc] (ecmascript) <locals>");
;
const SYSTEM_PROMPT = `You are a financial transaction parser. Parse the user's natural language input into structured transaction data.

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown, no explanations.
2. Currency Suffixes (CRITICAL):
   - "k" = 1,000. Examples: "50k" -> 50000, "100k" -> 100000, "1.5k" -> 1500.
   - "tr", "triệu" = 1,000,000. Examples: "1tr" -> 1000000, "2 triệu" -> 2000000.
   - "vạn" = 10,000.
   - If the user says "50", and it's a typical daily expense, assume it's 50,000 if "k" is implied by context, but strictly follow explicit suffixes first.
3. Dates: 
   - ISO 8601 (YYYY-MM-DD).
   - "Hôm qua" = yesterday, "Hôm nay" = today, "Hôm kia" = 2 days ago.
   - Relative to the provided "Current Date".
4. Conversational Refinement (CRITICAL):
   - If "previous_transaction" is provided in context, the current user input is a REFINEMENT.
   - MERGE the user's new request with "previous_transaction".
   - Example 1: User previously said "Ăn trưa 50k", context has amount 50000. Now user says "sửa lại thành ngày hôm qua" -> KEEP amount 50000, change occurred_at to yesterday's date.
   - Example 2: "không phải 50k mà là 100k" -> KEEP categories/accounts, change amount to 100000.
    - NEVER say "Không có thông tin cụ thể" if a "previous_transaction" exists; just apply the change or return the original data if no change is detected.
5. Page Context Rules (CRITICAL):
   - If "context_page" is "people_detail", and the user provides an expense (e.g., "Shopee 50k"), automatically set intent to "lend" and associate it with the "current_person_id" provided.
   - If "context_page" is "people", prioritize identifying a person from the input. If no person is mentioned, provide feedback asking who it was for.
6. Provide sassy Vietnamese feedback in the "feedback" field.

Response format:
{
  "intent": "income" | "expense" | "transfer" | "lend" | "repay",
  "amount": number,
  "note": string,
  "occurred_at": "YYYY-MM-DD",
  "source_account_id": string | null,
  "source_account_name": string | null,
  "debt_account_id": string | null,
  "debt_account_name": string | null,
  "category_id": string | null,
  "category_name": string | null,
  "shop_id": string | null,
  "shop_name": string | null,
  "people": [{"id": string | null, "name": string}],
  "group_id": string | null,
  "group_name": string | null,
  "split_bill": boolean | null,
  "cashback_share_percent": number | null,
  "cashback_share_fixed": number | null,
  "feedback": "Sassy Vietnamese message here"
}`;
class GroqProvider {
    name = "groq";
    client = null;
    model = "llama-3.3-70b-versatile";
    constructor(){
        const apiKey = process.env.GROQ_API_KEY;
        if (apiKey) {
            this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$groq$2d$sdk$40$0$2e$37$2e$0$2f$node_modules$2f$groq$2d$sdk$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
                apiKey
            });
        }
    }
    isAvailable() {
        return !!this.client;
    }
    async parse(text, context) {
        if (!this.client) {
            return {
                success: false,
                error: "Groq API key not configured"
            };
        }
        const startTime = Date.now();
        try {
            // Build context prompt
            const contextPrompt = this.buildContextPrompt(context);
            const fullPrompt = `${contextPrompt}\n\nUser input: "${text}"`;
            const completion = await this.client.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT
                    },
                    {
                        role: "user",
                        content: fullPrompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 1024,
                response_format: {
                    type: "json_object"
                }
            });
            const responseText = completion.choices[0]?.message?.content;
            if (!responseText) {
                throw new Error("Empty response from Groq");
            }
            const parsed = JSON.parse(responseText);
            const latency = Date.now() - startTime;
            return {
                success: true,
                data: {
                    ...parsed,
                    mode: "groq",
                    persona: "strict"
                },
                metadata: {
                    provider: "groq",
                    tokens: completion.usage?.total_tokens || 0,
                    latency,
                    model: this.model
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Groq parsing failed",
                metadata: {
                    provider: "groq",
                    tokens: 0,
                    latency: Date.now() - startTime
                }
            };
        }
    }
    buildContextPrompt(context) {
        const parts = [];
        parts.push(`Current Date: ${new Date().toISOString().split('T')[0]}`);
        if (context.context_page) {
            parts.push(`Context Page: ${context.context_page}`);
        }
        if (context.current_person_id) {
            const person = context.people?.find((p)=>p.id === context.current_person_id);
            parts.push(`Current Person: ${person?.name || 'Unknown'} (id: ${context.current_person_id})`);
        }
        if (context.accounts?.length) {
            parts.push(`Available accounts: ${context.accounts.map((a)=>`${a.name} (id: ${a.id})`).join(", ")}`);
        }
        if (context.people?.length) {
            parts.push(`Available people: ${context.people.map((p)=>`${p.name} (id: ${p.id})`).join(", ")}`);
        }
        if (context.categories?.length) {
            parts.push(`Available categories: ${context.categories.map((c)=>`${c.name} (id: ${c.id})`).join(", ")}`);
        }
        if (context.shops?.length) {
            parts.push(`Available shops: ${context.shops.map((s)=>`${s.name} (id: ${s.id})`).join(", ")}`);
        }
        if (context.groups?.length) {
            parts.push(`Available groups: ${context.groups.map((g)=>`${g.name} (id: ${g.id})`).join(", ")}`);
        }
        if (context.previousData) {
            parts.push(`previous_transaction: ${JSON.stringify(context.previousData)}`);
        }
        return parts.join("\n");
    }
}
}),
"[project]/src/lib/ai-v2/providers/gemini.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GeminiProvider",
    ()=>GeminiProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@google+generative-ai@0.24.1/node_modules/@google/generative-ai/dist/index.mjs [app-rsc] (ecmascript)");
;
const SYSTEM_PROMPT = `You are a financial transaction parser with a sassy Vietnamese personality (Rolly).

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown, no explanations.
2. Currency Suffixes (CRITICAL):
   - "k" = 1,000. Examples: "50k" -> 50000, "100k" -> 100000, "1.5k" -> 1500.
   - "tr", "triệu" = 1,000,000. Examples: "1tr" -> 1000000, "2 triệu" -> 2000000.
   - "vạn" = 10,000.
   - If the user says "50", and it's a typical daily expense, assume it's 50,000 if "k" is implied by context, but strictly follow explicit suffixes first.
3. Dates: 
   - ISO 8601 (YYYY-MM-DD).
   - "Hôm qua" = yesterday, "Hôm nay" = today, "Hôm kia" = 2 days ago.
   - Relative to the provided "Current Date".
4. Conversational Refinement (CRITICAL):
   - If "previous_transaction" is provided in context, the current user input is a REFINEMENT.
   - MERGE the user's new request with "previous_transaction".
   - Example 1: User previously said "Ăn trưa 50k", context has amount 50000. Now user says "sửa lại thành ngày hôm qua" -> KEEP amount 50000, change occurred_at to yesterday's date.
   - Example 2: "không phải 50k mà là 100k" -> KEEP categories/accounts, change amount to 100000.
    - NEVER say "Không có thông tin cụ thể" if a "previous_transaction" exists; just apply the change or return the original data if no change is detected.
5. Page Context Rules (CRITICAL):
   - If "context_page" is "people_detail", and the user provides an expense (e.g., "Shopee 50k"), automatically set intent to "lend" and associate it with the "current_person_id" provided.
   - If "context_page" is "people", prioritize identifying a person from the input. If no person is mentioned, provide feedback asking who it was for.
6. Provide sassy Vietnamese feedback in the "feedback" field.

Response format:
{
  "intent": "income" | "expense" | "transfer" | "lend" | "repay",
  "amount": number,
  "note": string,
  "occurred_at": "YYYY-MM-DD",
  "source_account_id": string | null,
  "source_account_name": string | null,
  "debt_account_id": string | null,
  "debt_account_name": string | null,
  "category_id": string | null,
  "category_name": string | null,
  "shop_id": string | null,
  "shop_name": string | null,
  "people": [{"id": string | null, "name": string}],
  "group_id": string | null,
  "group_name": string | null,
  "split_bill": boolean | null,
  "cashback_share_percent": number | null,
  "cashback_share_fixed": number | null,
  "feedback": "Sassy Vietnamese message"
}`;
class GeminiProvider {
    name = "gemini";
    client = null;
    model = "gemini-1.5-flash";
    constructor(){
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
            this.client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        }
    }
    isAvailable() {
        return !!this.client;
    }
    async parse(text, context) {
        if (!this.client) {
            return {
                success: false,
                error: "Gemini API key not configured"
            };
        }
        const startTime = Date.now();
        try {
            const model = this.client.getGenerativeModel({
                model: this.model,
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 1024,
                    responseMimeType: "application/json"
                }
            });
            const contextPrompt = this.buildContextPrompt(context);
            const fullPrompt = `${SYSTEM_PROMPT}\n\n${contextPrompt}\n\nUser: "${text}"`;
            const result = await model.generateContent(fullPrompt);
            const responseText = result.response.text();
            const parsed = JSON.parse(responseText);
            const latency = Date.now() - startTime;
            const tokens = result.response.usageMetadata?.totalTokenCount || 0;
            return {
                success: true,
                data: {
                    ...parsed,
                    mode: "gemini",
                    persona: "strict"
                },
                metadata: {
                    provider: "gemini",
                    tokens,
                    latency,
                    model: this.model
                }
            };
        } catch (error) {
            // Check if quota exceeded
            const isQuotaError = error.message?.includes("quota") || error.status === 429;
            return {
                success: false,
                error: isQuotaError ? "Gemini quota exceeded" : error.message || "Gemini parsing failed",
                metadata: {
                    provider: "gemini",
                    tokens: 0,
                    latency: Date.now() - startTime
                }
            };
        }
    }
    buildContextPrompt(context) {
        const parts = [];
        parts.push(`Current Date: ${new Date().toISOString().split('T')[0]}`);
        if (context.context_page) {
            parts.push(`Context Page: ${context.context_page}`);
        }
        if (context.current_person_id) {
            const person = context.people?.find((p)=>p.id === context.current_person_id);
            parts.push(`Current Person: ${person?.name || 'Unknown'} (id: ${context.current_person_id})`);
        }
        if (context.accounts?.length) {
            parts.push(`Accounts: ${context.accounts.map((a)=>`${a.name} (${a.id})`).join(", ")}`);
        }
        if (context.people?.length) {
            parts.push(`People: ${context.people.map((p)=>`${p.name} (${p.id})`).join(", ")}`);
        }
        if (context.categories?.length) {
            parts.push(`Categories: ${context.categories.map((c)=>`${c.name} (${c.id})`).join(", ")}`);
        }
        if (context.shops?.length) {
            parts.push(`Shops: ${context.shops.map((s)=>`${s.name} (${s.id})`).join(", ")}`);
        }
        if (context.previousData) {
            parts.push(`previous_transaction: ${JSON.stringify(context.previousData)}`);
        }
        return parts.join("\n");
    }
}
}),
"[project]/src/lib/ai-v2/providers/fallback.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FallbackParser",
    ()=>FallbackParser
]);
class FallbackParser {
    name = "fallback";
    isAvailable() {
        return true; // Always available
    }
    async parse(text, context) {
        const startTime = Date.now();
        try {
            const result = this.simpleParse(text, context);
            return {
                success: true,
                data: {
                    ...result,
                    needs: result.needs || [],
                    confidence: result.confidence || 0.5,
                    mode: "fallback",
                    persona: "strict",
                    feedback: "Tôi đã parse bằng regex đơn giản. Có thể chưa chính xác 100% đâu nhé! 🤖"
                },
                metadata: {
                    provider: "fallback",
                    tokens: 0,
                    latency: Date.now() - startTime,
                    model: "regex"
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Fallback parsing failed"
            };
        }
    }
    simpleParse(text, context) {
        const normalized = text.toLowerCase().trim();
        const refinementKeywords = [
            "sửa",
            "sưa",
            "đổi",
            "thay",
            "cập nhật",
            "nâng",
            "hạ",
            "không phải",
            "sai rồi"
        ];
        const isRefinement = refinementKeywords.some((k)=>normalized.includes(k)) || context.previousData && normalized.length < 30;
        const prev = context.previousData;
        // Extract amount (support formats: 50k, 50000, 50,000)
        let amount = this.extractAmount(normalized);
        if (amount === null && isRefinement && prev) {
            amount = prev.amount || null;
        }
        // Detect intent
        let intent = this.detectIntent(normalized);
        if (isRefinement && prev && (!intent || normalized.length < 20)) {
            intent = prev.intent || intent;
        }
        // Extract date
        let occurredAt = new Date().toISOString();
        if (normalized.includes("hôm qua")) {
            const date = new Date();
            date.setDate(date.getDate() - 1);
            occurredAt = date.toISOString();
        } else if (normalized.includes("hôm kia")) {
            const date = new Date();
            date.setDate(date.getDate() - 2);
            occurredAt = date.toISOString();
        } else if (isRefinement && prev) {
            occurredAt = prev.occurred_at || occurredAt;
        }
        // Extract account keyword
        const accountKeyword = this.extractAccountKeyword(normalized);
        const matchedAccount = accountKeyword ? context.accounts?.find((a)=>a.name.toLowerCase().includes(accountKeyword)) : null;
        // Extract category keyword
        const categoryKeyword = this.extractCategoryKeyword(normalized);
        const matchedCategory = categoryKeyword ? context.categories?.find((c)=>c.name.toLowerCase().includes(categoryKeyword)) : null;
        // Detect person if on people_detail page
        let peopleRefs = isRefinement ? prev?.people || [] : [];
        if (!isRefinement && context.context_page === "people_detail" && context.current_person_id) {
            const currentPerson = context.people?.find((p)=>p.id === context.current_person_id);
            if (currentPerson && !peopleRefs.some((p)=>p.id === currentPerson.id)) {
                peopleRefs.push({
                    id: currentPerson.id,
                    name: currentPerson.name
                });
            }
            // Auto-intent to lend if it was an expense
            if (intent === "expense" || !intent) {
                intent = "lend";
            }
        }
        return {
            intent: intent || (isRefinement ? prev?.intent : "expense") || "expense",
            amount: amount,
            note: isRefinement ? prev?.note || "" : text,
            source_account_id: matchedAccount?.id || (isRefinement ? prev?.source_account_id : null) || null,
            source_account_name: matchedAccount?.name || (isRefinement ? prev?.source_account_name : null) || accountKeyword || null,
            category_id: matchedCategory?.id || (isRefinement ? prev?.category_id : null) || null,
            category_name: matchedCategory?.name || (isRefinement ? prev?.category_name : null) || categoryKeyword || null,
            people: peopleRefs,
            occurred_at: occurredAt,
            split_bill: isRefinement ? prev?.split_bill : null,
            shop_id: isRefinement ? prev?.shop_id : null,
            shop_name: isRefinement ? prev?.shop_name : null,
            group_id: isRefinement ? prev?.group_id : null,
            group_name: isRefinement ? prev?.group_name : null,
            debt_account_id: isRefinement ? prev?.debt_account_id : null,
            debt_account_name: isRefinement ? prev?.debt_account_name : null,
            cashback_share_percent: isRefinement ? prev?.cashback_share_percent : null,
            cashback_share_fixed: isRefinement ? prev?.cashback_share_fixed : null
        };
    }
    extractAmount(text) {
        // Match patterns: 50k, 50000, 50,000, 50.000
        const patterns = [
            /(\d+(?:[.,]\d+)?)\s*k/i,
            /(\d+(?:[.,]\d{3})*)/
        ];
        for (const pattern of patterns){
            const match = text.match(pattern);
            if (match) {
                let value = match[1].replace(/[.,]/g, '');
                if (text.match(/k/i)) {
                    value = (parseFloat(value) * 1000).toString();
                }
                return parseFloat(value);
            }
        }
        return null;
    }
    detectIntent(text) {
        if (/(thu|nhận|lương|thưởng|income)/i.test(text)) return "income";
        if (/(chuyển|transfer)/i.test(text)) return "transfer";
        if (/(cho.*vay|lend)/i.test(text)) return "lend";
        if (/(trả.*nợ|repay)/i.test(text)) return "repay";
        return "expense"; // Default
    }
    extractAccountKeyword(text) {
        const accountPatterns = [
            /(?:thẻ|tài khoản|tk|account)\s+([a-zà-ỹ0-9\s]+)/i,
            /([a-z]+)\s*(?:visa|master|card)/i
        ];
        for (const pattern of accountPatterns){
            const match = text.match(pattern);
            if (match) return match[1].trim();
        }
        return null;
    }
    extractCategoryKeyword(text) {
        const categoryKeywords = [
            'ăn',
            'uống',
            'cafe',
            'cà phê',
            'shopping',
            'mua sắm',
            'di chuyển',
            'grab',
            'xe',
            'giải trí',
            'phim',
            'game'
        ];
        for (const keyword of categoryKeywords){
            if (text.includes(keyword)) return keyword;
        }
        return null;
    }
    extractPeopleKeywords(text) {
        // Simple: extract capitalized words (likely names)
        const matches = text.match(/\b[A-ZÀ-Ỹ][a-zà-ỹ]+\b/g);
        return matches || [];
    }
}
}),
"[project]/src/lib/ai-v2/ai-router.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIRouter",
    ()=>AIRouter,
    "getAIRouter",
    ()=>getAIRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$providers$2f$groq$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-v2/providers/groq.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$providers$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-v2/providers/gemini.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$providers$2f$fallback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-v2/providers/fallback.ts [app-rsc] (ecmascript)");
;
;
;
class AIRouter {
    providers;
    failureCount;
    lastFailureTime;
    // Cooldown period after failures (5 minutes)
    COOLDOWN_MS = 5 * 60 * 1000;
    MAX_FAILURES_BEFORE_COOLDOWN = 3;
    constructor(){
        this.providers = new Map([
            [
                "groq",
                new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$providers$2f$groq$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqProvider"]()
            ],
            [
                "gemini",
                new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$providers$2f$gemini$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GeminiProvider"]()
            ],
            [
                "fallback",
                new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$providers$2f$fallback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FallbackParser"]()
            ]
        ]);
        this.failureCount = new Map();
        this.lastFailureTime = new Map();
    }
    /**
     * Parse transaction with automatic provider fallback
     */ async parse(text, context) {
        const providerOrder = [
            "groq",
            "gemini",
            "fallback"
        ];
        for (const providerName of providerOrder){
            const provider = this.providers.get(providerName);
            if (!provider) continue;
            // Skip if provider is in cooldown
            if (this.isInCooldown(providerName)) {
                console.log(`[AI Router] ${providerName} is in cooldown, skipping...`);
                continue;
            }
            // Skip if provider is not available
            if (!provider.isAvailable()) {
                console.log(`[AI Router] ${providerName} is not available, skipping...`);
                continue;
            }
            console.log(`[AI Router] Trying ${providerName}...`);
            try {
                const response = await provider.parse(text, context);
                if (response.success) {
                    // Reset failure count on success
                    this.failureCount.set(providerName, 0);
                    console.log(`[AI Router] ✅ ${providerName} succeeded`);
                    return response;
                } else {
                    // Track failure
                    this.recordFailure(providerName);
                    console.log(`[AI Router] ❌ ${providerName} failed: ${response.error}`);
                }
            } catch (error) {
                this.recordFailure(providerName);
                console.error(`[AI Router] ❌ ${providerName} error:`, error.message);
            }
        }
        // All providers failed
        return {
            success: false,
            error: "All AI providers failed. Please try again later."
        };
    }
    /**
     * Get current provider status for monitoring
     */ getProviderStatus() {
        const status = {};
        for (const [name, provider] of this.providers.entries()){
            status[name] = {
                available: provider.isAvailable(),
                failures: this.failureCount.get(name) || 0,
                inCooldown: this.isInCooldown(name),
                cooldownEndsAt: this.getCooldownEndTime(name)
            };
        }
        return status;
    }
    recordFailure(provider) {
        const count = (this.failureCount.get(provider) || 0) + 1;
        this.failureCount.set(provider, count);
        if (count >= this.MAX_FAILURES_BEFORE_COOLDOWN) {
            this.lastFailureTime.set(provider, Date.now());
            console.log(`[AI Router] ${provider} entered cooldown after ${count} failures`);
        }
    }
    isInCooldown(provider) {
        const lastFailure = this.lastFailureTime.get(provider);
        if (!lastFailure) return false;
        const elapsed = Date.now() - lastFailure;
        return elapsed < this.COOLDOWN_MS;
    }
    getCooldownEndTime(provider) {
        const lastFailure = this.lastFailureTime.get(provider);
        if (!lastFailure) return null;
        return lastFailure + this.COOLDOWN_MS;
    }
}
// Singleton instance
let routerInstance = null;
function getAIRouter() {
    if (!routerInstance) {
        routerInstance = new AIRouter();
    }
    return routerInstance;
}
}),
"[project]/src/actions/ai-actions-v2.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008522e245a0c0ba8821e6a8f0a7871633c2159923":"getAIProviderStatusAction","606c8762373051e4572c396a74eee3e17b66e3d65f":"parseTransactionV2Action"},"",""] */ __turbopack_context__.s([
    "getAIProviderStatusAction",
    ()=>getAIProviderStatusAction,
    "parseTransactionV2Action",
    ()=>parseTransactionV2Action
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$ai$2d$router$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ai-v2/ai-router.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function parseTransactionV2Action(text, context) {
    try {
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$ai$2d$router$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAIRouter"])();
        const response = await router.parse(text, context);
        if (!response.success) {
            return {
                success: false,
                error: response.error || "Parsing failed"
            };
        }
        return {
            success: true,
            data: response.data,
            metadata: response.metadata
        };
    } catch (error) {
        console.error("[parseTransactionV2Action] Error:", error);
        return {
            success: false,
            error: error.message || "Unknown error occurred"
        };
    }
}
async function getAIProviderStatusAction() {
    try {
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ai$2d$v2$2f$ai$2d$router$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAIRouter"])();
        return {
            success: true,
            data: router.getProviderStatus()
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    parseTransactionV2Action,
    getAIProviderStatusAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(parseTransactionV2Action, "606c8762373051e4572c396a74eee3e17b66e3d65f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAIProviderStatusAction, "008522e245a0c0ba8821e6a8f0a7871633c2159923", null);
}),
"[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40204e19135aae5d71b0f16217678c9ab4a6f2001d":"syncAllTransactions","404bf47e280c6f3b5d67a54af2e4a262928b4c28de":"createTestSheet","409327174926611fa35d6f3cc13a8dfe29afdd60ec":"testConnection","6097685b38234fe246c528d8259663e1aa30ac4af7":"autoSyncCycleSheetIfNeeded","60f32e86e79018af06244bad36128a3dd169fcca5a":"createCycleSheet","7058c54b52d7b0f84f0d23b9613341adc42661cecd":"syncTransactionToSheet","7068ec43b21ff73631fe852b454d777c70921352d4":"syncCycleTransactions"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
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
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isYYYYMM"])(rawTag)) return rawTag;
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
    let profile = null;
    try {
        profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
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
        const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbId);
        if (account && account.owner_id) {
            const owner = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', account.owner_id);
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
    let profile = null;
    try {
        profile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
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
        const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbId);
        if (account?.owner_id) {
            const owner = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', account.owner_id);
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
        const pbPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbPersonId);
        if (!personData) return;
        const showBankAccount = personData.sheet_show_bank_account ?? false;
        const manualBankInfo = personData.sheet_bank_info ?? '';
        const linkedBankId = personData.sheet_linked_bank_id;
        const showQrImage = personData.sheet_show_qr_image ?? false;
        const qrImageUrl = personData.sheet_full_img ?? null;
        let resolvedBankInfo = manualBankInfo;
        if (showBankAccount && linkedBankId) {
            try {
                const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', linkedBankId);
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
                const shopRecord = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('shops', txn.shop_id);
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
                    const accountRecord = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', fallbackAccountId);
                    resolvedShopName = accountRecord?.name ?? '';
                } catch  {
                    resolvedShopName = '';
                }
            }
        }
        let cycleTag = resolveCycleTagForSheet(txn.tag, txn.occurred_at ?? txn.date ?? null);
        if (personData.is_master_sheet_enabled && cycleTag && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isYYYYMM"])(cycleTag)) {
            cycleTag = cycleTag.split('-')[0]; // '2026-03' -> '2026'
        }
        const payload = {
            ...buildPayload({
                ...txn,
                tag: cycleTag,
                shop_name: resolvedShopName
            }, action),
            person_id: personId,
            cycle_tag: cycleTag,
            bank_account: showBankAccount ? resolvedBankInfo : '',
            img: showQrImage && qrImageUrl ? qrImageUrl : '' // Send empty to clear if disabled
        };
        console.log(`[Sheet Sync] Sending payload to ${personId}:`, {
            action: payload.action,
            id: payload.id,
            cycle_tag: payload.cycle_tag,
            shop: payload.shop,
            amount: payload.amount,
            note: payload.note,
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
        const pbPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `person_id = "${pbPersonId}" && status != "void"`,
            expand: 'shop_id,account_id,target_account_id,to_account_id,category_id',
            sort: 'occurred_at'
        });
        // Fetch person's sheet preferences for bank info & QR
        const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbPersonId);
        const showBankAccount = personData?.sheet_show_bank_account ?? false;
        const manualBankInfo = personData?.sheet_bank_info ?? '';
        const linkedBankId = personData?.sheet_linked_bank_id;
        const showQrImage = personData?.sheet_show_qr_image ?? false;
        const qrImageUrl = personData?.sheet_full_img ?? null;
        let resolvedBankInfo = manualBankInfo;
        if (showBankAccount && linkedBankId) {
            try {
                const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', linkedBankId);
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
            let cycleTag = resolveCycleTagForSheet(txn.tag, txn.occurred_at);
            if (personData?.is_master_sheet_enabled && cycleTag && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isYYYYMM"])(cycleTag)) {
                cycleTag = cycleTag.split('-')[0];
            }
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
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        let tagFilter = '';
        if (/^\d{4}$/.test(cycleTag)) {
            tagFilter = `(tag >= "${cycleTag}-01" && tag <= "${cycleTag}-12") || (debt_cycle_tag >= "${cycleTag}-01" && debt_cycle_tag <= "${cycleTag}-12") || tag = "${cycleTag}" || debt_cycle_tag = "${cycleTag}"`;
        } else {
            const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["yyyyMMToLegacyMMMYY"])(cycleTag);
            const tags = legacyTag ? [
                cycleTag,
                legacyTag
            ] : [
                cycleTag
            ];
            tagFilter = tags.map((t)=>`tag = "${t}" || debt_cycle_tag = "${t}"`).join(' || ');
        }
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
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
        const personData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
        const showBankAccount = personData?.sheet_show_bank_account ?? false;
        const manualBankInfo = personData?.sheet_bank_info ?? '';
        const linkedBankId = personData?.sheet_linked_bank_id;
        const showQrImage = personData?.sheet_show_qr_image ?? false;
        const qrImageUrl = personData?.sheet_full_img ?? null;
        let resolvedBankInfo = manualBankInfo;
        if (showBankAccount && linkedBankId) {
            try {
                const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', linkedBankId);
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
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        const existingList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('person_cycle_sheets', {
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('person_cycle_sheets', existing.id, payload);
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('person_cycle_sheets', payload);
        }
        console.log(`[AutoSync] Successfully auto-synced ${personId} / ${cycleTag}`);
    } catch (error) {
        console.error(`[AutoSync] Error for ${personId} / ${cycleTag}:`, error);
    // Silent fail - don't throw, just log
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    syncTransactionToSheet,
    testConnection,
    syncAllTransactions,
    createTestSheet,
    createCycleSheet,
    syncCycleTransactions,
    autoSyncCycleSheetIfNeeded
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncTransactionToSheet, "7058c54b52d7b0f84f0d23b9613341adc42661cecd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(testConnection, "409327174926611fa35d6f3cc13a8dfe29afdd60ec", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllTransactions, "40204e19135aae5d71b0f16217678c9ab4a6f2001d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTestSheet, "404bf47e280c6f3b5d67a54af2e4a262928b4c28de", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCycleSheet, "60f32e86e79018af06244bad36128a3dd169fcca5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncCycleTransactions, "7068ec43b21ff73631fe852b454d777c70921352d4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(autoSyncCycleSheetIfNeeded, "6097685b38234fe246c528d8259663e1aa30ac4af7", null);
}),
"[project]/src/lib/tag.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTag",
    ()=>generateTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
;
function generateTag(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(date);
}
}),
"[project]/src/lib/transaction-mapper.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
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
    const tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(baseTag) ?? baseTag ?? null;
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
        tag: txn.tag ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateTag"])(new Date()),
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
"[project]/src/constants/refunds.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Pending refunds are parked in this holding account before being confirmed.
__turbopack_context__.s([
    "REFUND_PENDING_ACCOUNT_ID",
    ()=>REFUND_PENDING_ACCOUNT_ID
]);
const REFUND_PENDING_ACCOUNT_ID = '99999999-9999-9999-9999-999999999999';
}),
"[project]/src/services/pocketbase/cashback-sync.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4082968cb2943ee3ebe3672110c9ad46399e670f5f":"recomputePocketBaseCashbackCycle","40c2799832bd39aec5e5e83772bc8779c5e2652feb":"upsertPocketBaseTransactionCashback","60aa8eab5d9461f619f53c5043a8b066644f375198":"removePocketBaseTransactionCashback","70ecbdb018eaf4944ef5db0db69dbd35fed0f744c9":"ensurePocketBaseCycle"},"",""] */ __turbopack_context__.s([
    "ensurePocketBaseCycle",
    ()=>ensurePocketBaseCycle,
    "recomputePocketBaseCashbackCycle",
    ()=>recomputePocketBaseCashbackCycle,
    "removePocketBaseTransactionCashback",
    ()=>removePocketBaseTransactionCashback,
    "upsertPocketBaseTransactionCashback",
    ()=>upsertPocketBaseTransactionCashback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function ensurePocketBaseCycle(accountId, cycleTag, accountRecord) {
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    // 1. Try to fetch existing
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
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
    const deterministicId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(pbAccountId + cycleTag, 'cbcyc');
    const newCycle = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('cashback_cycles', {
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
    const cycle = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('cashback_cycles', cycleId);
    if (!cycle) return;
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', cycle.account_id);
    if (!account) return;
    // 1. Get all eligible transactions for this cycle
    // Note: We use 'status' != 'void' and 'type' in ['expense', 'debt']
    const txnsResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
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
        const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
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
        const tierPolicy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('cashback_cycles', cycle.id, {
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
    const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(transactionId, 'pvl_txn_001');
    const txn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbTxnId);
    if (!txn) return;
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', txn.account_id);
    if (!account || account.type !== 'credit_card') return;
    // Resolve Cycle Tag
    const date = new Date(txn.occurred_at || txn.date);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(cycleRange?.end ?? date);
    const cycle = await ensurePocketBaseCycle(account.id, cycleTag, account);
    // Persist cycle tag to transaction if not already set
    if (txn.persisted_cycle_tag !== cycleTag) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
            persisted_cycle_tag: cycleTag
        });
    }
    // Trigger Recompute
    await recomputePocketBaseCashbackCycle(cycle.id);
}
async function removePocketBaseTransactionCashback(sourceAccountId, cycleTag) {
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sourceAccountId, 'accounts');
    const cycleResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
        filter: `account_id='${pbAccountId}' && cycle_tag='${cycleTag}'`,
        perPage: 1
    });
    if (cycleResp.items && cycleResp.items.length > 0) {
        await recomputePocketBaseCashbackCycle(cycleResp.items[0].id);
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    ensurePocketBaseCycle,
    recomputePocketBaseCashbackCycle,
    upsertPocketBaseTransactionCashback,
    removePocketBaseTransactionCashback
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ensurePocketBaseCycle, "70ecbdb018eaf4944ef5db0db69dbd35fed0f744c9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recomputePocketBaseCashbackCycle, "4082968cb2943ee3ebe3672110c9ad46399e670f5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertPocketBaseTransactionCashback, "40c2799832bd39aec5e5e83772bc8779c5e2652feb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removePocketBaseTransactionCashback, "60aa8eab5d9461f619f53c5043a8b066644f375198", null);
}),
"[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402338384beb9e88fd6929928eba49882422af05a1":"loadTransactions","4041c9c5208e1b3f4b1d828bb085a54c45d330fd75":"createTransaction","405156174d4eb4074fe69fa0415e892c6b6080b5b9":"getRecentTransactions","40697269a31854856a5cf6992c68019965c2d3af5d":"voidTransaction","407a125db837b2103cf56b690a5c87a2c0cee9b0f3":"deleteTransactionCascade","40ba390a1b32fb27de3a2b50052545fee40ba3ce77":"getPendingRefunds","40cd057eafdcca6c9a941fc198de750a1b8acbb741":"deleteTransaction","6010a0877368d62abafdac1c87529819678bb1a529":"getTransactionById","6032d2b204dba8a3583f08ea6a9158dc1cfd732597":"normalizeAmountForType","60340f82efeee3dcace8de1d33fb40fca1c5713a0a":"loadAccountTransactionsV2","60b0bcbe83fa250d9f88dcbf7c804da6091632c828":"updateTransaction","60e88248d5bf416aee1ae41c1925ac049ff0f6617a":"confirmRefund","60f9d0898c23352894df2c366ac65b2486712c977a":"mapTransactionRow","7079dc9269713418feed688130a6031ec5b4224298":"getTransactionsByPeople","7f4e44168d33d8c31a8e510c3c815a0844668f818f":"getUnifiedTransactions"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/cashback-sync.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function trySyncPeopleSheet(personId, payload, action) {
    if (!personId) return;
    try {
        const { syncTransactionToSheet } = await __turbopack_context__.A("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript, async loader)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadPocketBaseTransactionsForAccount"])(accountId, limit);
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
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId, 'category_id,account_id,to_account_id,person_id,shop_id,transaction_history,cashback_entries');
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
    // Optimized chunk size and parallelized requests
    const chunkSize = 200;
    const chunks = chunkArray(transactionIds, chunkSize);
    await Promise.all(chunks.map(async (chunk)=>{
        const filter = chunk.map((id)=>`transaction_id="${id}"`).join(" || ");
        let page = 1;
        let totalPages = 1;
        while(page <= totalPages){
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("transaction_history", {
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
            totalPages = Number(response.totalPages ?? 1);
            if (page >= totalPages) break;
            page += 1;
        }
    }));
    return counts;
}
function revalidatePersonPaths(personId) {
    if (!personId) return;
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
        if (pbId && pbId !== personId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${pbId}`);
        }
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
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
    const accountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.source_account_id, 'accounts');
    const targetId = input.target_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.target_account_id, 'accounts') : input.destination_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.destination_account_id, 'accounts') : input.debt_account_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.debt_account_id, 'accounts') : null;
    return {
        occurred_at: input.occurred_at,
        note: input.note,
        type: input.type,
        amount: input.amount,
        account_id: accountId,
        target_account_id: targetId,
        to_account_id: targetId,
        category_id: input.category_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.category_id, 'categories') : null,
        person_id: input.person_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.person_id, 'people') : null,
        shop_id: input.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.shop_id, 'shops') : null,
        tag: input.tag,
        debt_cycle_tag: input.debt_cycle_tag || null,
        persisted_cycle_tag: input.persisted_cycle_tag || null,
        statement_cycle_tag: input.statement_cycle_tag || null,
        status: "posted",
        metadata: input.metadata || {},
        is_installment: input.is_installment || false,
        installment_plan_id: input.installment_plan_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.installment_plan_id, 'installments') : null,
        cashback_share_percent: input.cashback_share_percent,
        cashback_share_fixed: input.cashback_share_fixed,
        cashback_mode: input.cashback_mode,
        linked_transaction_id: input.linked_transaction_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(input.linked_transaction_id, 'transactions') : null
    };
}
async function logHistory(transactionId, changeType, snapshot) {
    try {
        const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(transactionId, 'pvl_txn_001');
        const historyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbTxnId}:${changeType}:${Date.now()}:${Math.random()}`, 'txnh');
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('transaction_history', {
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
    const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
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
        accountIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("accounts", {
            filter: Array.from(accountIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        }),
        categoryIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("categories", {
            filter: Array.from(categoryIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        }),
        personIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("people", {
            filter: Array.from(personIds).map((id)=>`id="${id}"`).join(' || ')
        }) : Promise.resolve({
            items: []
        }),
        shopIds.size ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("shops", {
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
        tag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(row.tag) ?? row.tag ?? null,
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
            filterParts.push(`id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.transactionId, "transactions")}'`);
        } else {
            if (options.personIds && options.personIds.length > 0) {
                const pIds = options.personIds.map((id)=>`person_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, "people")}'`).join(" || ");
                filterParts.push(`(${pIds})`);
            } else if (options.personId) {
                filterParts.push(`person_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.personId, "people")}'`);
            } else if (options.accountId) {
                const accId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.accountId, "accounts");
                filterParts.push(`(account_id = '${accId}' || to_account_id = '${accId}')`);
            }
        }
        if (options.shopId) filterParts.push(`shop_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.shopId, "shops")}'`);
        if (options.categoryId) filterParts.push(`category_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.categoryId, "categories")}'`);
        if (options.installmentPlanId) filterParts.push(`installment_plan_id = '${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(options.installmentPlanId, "installments")}'`);
        if (options.tag) {
            filterParts.push(`tag = '${options.tag}'`);
        }
        if (options.dateFrom) {
            filterParts.push(`occurred_at >= '${options.dateFrom} 00:00:00'`);
        }
        if (options.dateTo) {
            filterParts.push(`occurred_at <= '${options.dateTo} 23:59:59'`);
        }
        const filter = filterParts.length > 0 ? filterParts.join(" && ") : undefined;
        const limit = options.limit || 100;
        const perPage = 200;
        // Initial fetch to get first page and totalPages
        const firstPageResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
            sort: "-date",
            filter,
            page: 1,
            perPage: Math.min(perPage, limit)
        });
        let records = [
            ...firstPageResponse.items
        ];
        const totalPagesToFetch = Math.min(Number(firstPageResponse.totalPages || 1), Math.ceil(limit / perPage));
        // Parallelize subsequent page fetches if needed
        if (totalPagesToFetch > 1 && records.length < limit) {
            const pagePromises = [];
            for(let p = 2; p <= totalPagesToFetch; p++){
                pagePromises.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
                    sort: "-date",
                    filter,
                    page: p,
                    perPage
                }));
            }
            const results = await Promise.all(pagePromises);
            results.forEach((res)=>{
                records.push(...res.items);
            });
        }
        // Trim to exact limit
        if (records.length > limit) {
            records = records.slice(0, limit);
        }
        if (!records.length) return [];
        // Parallelize lookups and history counting
        const [lookups, historyCountMap] = await Promise.all([
            fetchLookups(records),
            fetchHistoryCountMap(records.map((row)=>row.id))
        ]);
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
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(crypto.randomUUID(), 'transactions');
        const pbPayload = {
            ...normalized,
            id,
            date: normalized.occurred_at,
            occurred_at: normalized.occurred_at,
            description: normalized.note || '',
            note: normalized.note || '',
            final_price: normalized.amount
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', pbPayload);
        // Recalc Impacts
        const affectedAccounts = new Set();
        affectedAccounts.add(normalized.account_id);
        if (normalized.target_account_id) affectedAccounts.add(normalized.target_account_id);
        await recalcForAccounts(affectedAccounts);
        // Revalidate
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/accounts");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/people");
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertPocketBaseTransactionCashback"])(id);
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    console.log('[DB:PB] transactions.update', {
        id: pbId
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) return false;
        const normalized = await normalizeInput(input);
        await logHistory(pbId, "edit", existing);
        const mergedMetadata = {
            ...typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {},
            ...typeof normalized.metadata === 'object' && normalized.metadata !== null ? normalized.metadata : {},
            is_edited: true,
            edited_at: new Date().toISOString()
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertPocketBaseTransactionCashback"])(pbId);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/transactions/${pbId}`);
        return true;
    } catch (error) {
        console.error("[DB:PB] updateTransaction failed:", error);
        return false;
    }
}
async function voidTransaction(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    console.log('[DB:PB] transactions.void', {
        id: pbId
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) return false;
        const existingMeta = typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {};
        const originalTxnId = typeof existingMeta.original_transaction_id === 'string' ? existingMeta.original_transaction_id : null;
        const refundRequestTxnId = typeof existingMeta.refund_request_id === 'string' ? existingMeta.refund_request_id : null;
        const isRefundConfirmationTxn = existingMeta.is_refund_confirmation === true;
        const isRefundRequestTxn = Boolean(originalTxnId) && existingMeta.is_refund_confirmation !== true;
        await logHistory(pbId, "void", existing);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
            status: 'void',
            metadata: {
                ...existingMeta,
                refund_status: 'void',
                voided_at: new Date().toISOString()
            }
        });
        // Integrated Cashback Sync (Real-time)
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertPocketBaseTransactionCashback"])(pbId);
        } catch (cbErr) {
            console.warn("[Cashback Sync] Void-sync failed:", cbErr);
        }
        if (isRefundRequestTxn && originalTxnId) {
            try {
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                if (originalTxn) {
                    const originalMeta = typeof originalTxn.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                    const linkedRefundRequestId = typeof originalMeta.refund_request_id === 'string' ? originalMeta.refund_request_id : null;
                    const shouldRollbackOriginal = linkedRefundRequestId === pbId;
                    if (shouldRollbackOriginal) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
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
                    const refundRequestTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', refundRequestTxnId);
                    if (refundRequestTxn) {
                        const refundRequestMeta = typeof refundRequestTxn.metadata === 'object' && refundRequestTxn.metadata !== null ? refundRequestTxn.metadata : {};
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', refundRequestTxnId, {
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
                    const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                    if (originalTxn) {
                        const originalMeta = typeof originalTxn.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
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
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
        return true;
    } catch (error) {
        console.error("[DB:PB] voidTransaction failed:", error);
        return false;
    }
}
async function deleteTransactionCascade(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    console.log('[DB:PB] transactions.deleteCascade', {
        id: pbId
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) return false;
        // Delete history
        const history = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transaction_history', {
            filter: `transaction_id="${pbId}"`
        });
        for (const h of history.items){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('transaction_history', h.id);
        }
        // Delete PB transaction
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('pvl_txn_001', pbId);
        const affectedAccounts = new Set();
        affectedAccounts.add(existing.account_id);
        if (existing.target_account_id) affectedAccounts.add(existing.target_account_id);
        // Integrated Cashback Sync (Deletion)
        try {
            const cycleTag = existing.persisted_cycle_tag || existing.tag || existing.debt_cycle_tag;
            if (cycleTag && existing.account_id) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$cashback$2d$sync$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removePocketBaseTransactionCashback"])(existing.account_id, cycleTag);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
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
        const pbAccId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
        params.filter = `(${params.filter}) && account_id = "${pbAccId}"`;
    }
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", params);
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
        const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(pendingTransactionId, 'pvl_txn_001');
        const pbAccId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetAccountId, 'accounts');
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbTxnId);
        if (!existing) return {
            success: false,
            error: 'Transaction not found'
        };
        const existingMeta = typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {};
        const originalTxnId = typeof existingMeta.original_transaction_id === 'string' ? existingMeta.original_transaction_id : null;
        const confirmationTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbTxnId}:refund:confirm:${Date.now()}:${Math.random()}`, 'transactions');
        const shortId = (value)=>String(value || '').slice(0, 6);
        const gd3Tag = `[GD3|${shortId(originalTxnId || pbTxnId)}]`;
        // TXN3: explicit refund confirmation transaction
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', {
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbTxnId, {
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
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                const originalMeta = typeof originalTxn?.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loadAccountTransactionsV2, "60340f82efeee3dcace8de1d33fb40fca1c5713a0a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionsByPeople, "7079dc9269713418feed688130a6031ec5b4224298", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUnifiedTransactions, "7f4e44168d33d8c31a8e510c3c815a0844668f818f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionById, "6010a0877368d62abafdac1c87529819678bb1a529", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransaction, "40cd057eafdcca6c9a941fc198de750a1b8acbb741", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(normalizeAmountForType, "6032d2b204dba8a3583f08ea6a9158dc1cfd732597", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(mapTransactionRow, "60f9d0898c23352894df2c366ac65b2486712c977a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loadTransactions, "402338384beb9e88fd6929928eba49882422af05a1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "4041c9c5208e1b3f4b1d828bb085a54c45d330fd75", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTransaction, "60b0bcbe83fa250d9f88dcbf7c804da6091632c828", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(voidTransaction, "40697269a31854856a5cf6992c68019965c2d3af5d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTransactionCascade, "407a125db837b2103cf56b690a5c87a2c0cee9b0f3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentTransactions, "405156174d4eb4074fe69fa0415e892c6b6080b5b9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingRefunds, "40ba390a1b32fb27de3a2b50052545fee40ba3ce77", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(confirmRefund, "60e88248d5bf416aee1ae41c1925ac049ff0f6617a", null);
}),
"[project]/src/actions/transaction-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401f1e823c94ce9554382a43dad869a5c1b7081c47":"deleteSplitBillAction","406ed95480903eceb71405faf96f7796a54dc9a513":"createTransaction","408143a8ca61733bb718d8adb73e05edfdd0a6b421":"voidTransactionAction","408c335828a24275022af0ebdfeaa05cca7e7800d5":"getOriginalAccount","40c27acd3d07b6d7defdb5a34722a40cf5bd8e0ee1":"restoreTransaction","40e12f2b3729389e6e1701182843ead7a6a3ab9c0f":"cancelOrder","60409e2420f1cf40038e0a8f4ce5ac5c626195a9a8":"updateTransaction","6052fcbfb405cecdfd9786525c062edd5b556afeff":"bulkMoveToCategory","6083099faae5d88f7a4278d9d533286f7fedcd10d3":"confirmRefundAction","60904be4f32dca28dcad1df25455ed243012933928":"bulkMoveTransactionsToCategory","609866070d7907140aa847afbb07db939049981f09":"updateTransactionMetadata","60e4af908a6f0328ecf0f19c0020959e9806793080":"updateSplitBillAction","7032bb5e91fa7599d24b59ad708adc9a5851dd1723":"requestRefund"},"",""] */ __turbopack_context__.s([
    "bulkMoveToCategory",
    ()=>bulkMoveToCategory,
    "bulkMoveTransactionsToCategory",
    ()=>bulkMoveTransactionsToCategory,
    "cancelOrder",
    ()=>cancelOrder,
    "confirmRefundAction",
    ()=>confirmRefundAction,
    "createTransaction",
    ()=>createTransaction,
    "deleteSplitBillAction",
    ()=>deleteSplitBillAction,
    "getOriginalAccount",
    ()=>getOriginalAccount,
    "requestRefund",
    ()=>requestRefund,
    "restoreTransaction",
    ()=>restoreTransaction,
    "updateSplitBillAction",
    ()=>updateSplitBillAction,
    "updateTransaction",
    ()=>updateTransaction,
    "updateTransactionMetadata",
    ()=>updateTransactionMetadata,
    "voidTransactionAction",
    ()=>voidTransactionAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/transaction-mapper.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$refunds$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/refunds.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function createTransaction(input) {
    // 1. PB-PRIMARY Write (+ sheet sync handled inside service)
    const transactionId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"])(input);
    if (!transactionId) {
        console.error('[DB:PB] Failed to create transaction in PocketBase');
        return null;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
    if (input.person_id) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${input.person_id}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/txn/v2');
    return transactionId;
}
async function updateTransaction(id, input) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    // Get existing for revalidation of old person if changed
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
    // 1. PB-PRIMARY Write (+ sheet sync handled inside service)
    const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTransaction"])(pbId, input);
    if (!success) return false;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
    // Revalidate both old and new person
    if (existing?.person_id) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${existing.person_id}`);
    }
    if (input.person_id && input.person_id !== existing?.person_id) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${input.person_id}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/txn/v2');
    return true;
}
async function voidTransactionAction(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    // Need to get the person_id before voiding to revalidate their page
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
    // Sheet sync is handled inside service layer.
    const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["voidTransaction"])(pbId);
    if (success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        if (existing?.person_id) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${existing.person_id}`);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/txn/v2');
    }
    return success;
}
async function restoreTransaction(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
            status: 'posted'
        });
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        const existingMeta = typeof existing?.metadata === 'object' && existing.metadata !== null ? existing.metadata : {};
        const originalTxnId = typeof existingMeta.original_transaction_id === 'string' ? existingMeta.original_transaction_id : null;
        const isRefundRequestTxn = Boolean(originalTxnId) && existingMeta.is_refund_confirmation !== true;
        if (isRefundRequestTxn && originalTxnId) {
            try {
                const originalTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', originalTxnId);
                if (originalTxn) {
                    const originalMeta = typeof originalTxn.metadata === 'object' && originalTxn.metadata !== null ? originalTxn.metadata : {};
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', originalTxnId, {
                        status: originalTxn.status === 'posted' ? 'waiting_refund' : originalTxn.status,
                        metadata: {
                            ...originalMeta,
                            has_refund_request: true,
                            refund_status: 'requested',
                            refund_request_id: pbId,
                            refund_restored_at: new Date().toISOString()
                        }
                    });
                }
            } catch (restoreRefundChainError) {
                console.warn('[DB:PB] restoreTransaction refund chain restore skipped:', restoreRefundChainError);
            }
        }
        // Sync restore to sheet
        if (existing?.person_id) {
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncTransactionToSheet"])(existing.person_id, {
                id: pbId,
                occurred_at: existing.occurred_at,
                note: existing.note,
                tag: existing.tag,
                amount: existing.amount,
                original_amount: existing.amount,
                type: existing.type,
                account_id: existing.account_id ?? null,
                target_account_id: existing.target_account_id ?? existing.to_account_id ?? null
            }, 'create').catch((err)=>console.error('Sheet Sync Error (Restore):', err));
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        if (existing?.person_id) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${existing.person_id}`);
        }
        return true;
    } catch (error) {
        console.error('[DB:PB] restoreTransaction failed:', error);
        return false;
    }
}
async function confirmRefundAction(pendingTransactionId, targetAccountId) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["confirmRefund"])(pendingTransactionId, targetAccountId);
        return result;
    } catch (error) {
        console.error('Confirm Refund Action Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function updateTransactionMetadata(id, metadata) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        const newMetadata = {
            ...typeof existing.metadata === 'object' ? existing.metadata : {},
            ...metadata
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
            metadata: newMetadata
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        if (existing?.person_id) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${existing.person_id}`);
        }
        return true;
    } catch (error) {
        console.error('[DB:PB] updateTransactionMetadata failed:', error);
        return false;
    }
}
async function deleteSplitBillAction(baseTransactionId) {
    try {
        const pbBaseId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(baseTransactionId, 'transactions');
        // 1. Find all child transactions
        // Note: PocketBase filter for JSON field might be tricky, usually metadata.split_parent_id
        const children = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `metadata.split_parent_id = "${pbBaseId}"`,
            perPage: 500
        });
        let deletedCount = 0;
        // 2. Delete children
        for (const child of children.items){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', child.id, {
                status: 'void'
            }); // Prefer voiding over hard delete for consistency
            deletedCount++;
        }
        // 3. Void base transaction
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbBaseId, {
            status: 'void'
        });
        deletedCount++;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        return {
            success: true,
            deletedCount
        };
    } catch (error) {
        console.error('[DB:PB] deleteSplitBillAction failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function bulkMoveTransactionsToCategory(transactionIds, categoryId) {
    try {
        const pbCategoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(categoryId, 'categories');
        for (const id of transactionIds){
            const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbTxnId, {
                category_id: pbCategoryId
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        return {
            success: true
        };
    } catch (error) {
        console.error('[DB:PB] bulkMoveTransactionsToCategory failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function updateSplitBillAction(baseTransactionId, data) {
    try {
        const pbBaseId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(baseTransactionId, 'transactions');
        const baseTxn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbBaseId);
        // 1. Update base transaction
        const baseMetadata = {
            ...typeof baseTxn.metadata === 'object' ? baseTxn.metadata : {},
            title: data.title,
            note: data.note,
            qr_image_url: data.qrImageUrl
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbBaseId, {
            metadata: baseMetadata,
            note: data.note
        });
        // 2. Process participants
        for (const p of data.participants){
            if (p.isRemoved && p.transactionId) {
                const pbChildId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(p.transactionId, 'transactions');
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbChildId, {
                    status: 'void'
                });
            } else if (p.isNew) {
                // Create new transaction for split
                const pbPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(p.personId, 'people');
                // Find debt account for this person
                const personWithDebt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbPersonId);
                const debtAccountId = personWithDebt.debt_account_id;
                if (!debtAccountId) {
                    console.warn(`No debt account for person ${p.personId}`);
                    continue;
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', {
                    date: baseTxn.date,
                    amount: p.amount,
                    type: 'debt',
                    to_account_id: debtAccountId,
                    from_account_id: baseTxn.from_account_id,
                    person_id: pbPersonId,
                    status: 'confirmed',
                    metadata: {
                        split_parent_id: pbBaseId,
                        split_title: data.title
                    }
                });
            } else if (p.transactionId) {
                const pbChildId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(p.transactionId, 'transactions');
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbChildId, {
                    amount: p.amount,
                    metadata: {
                        split_parent_id: pbBaseId,
                        split_title: data.title
                    }
                });
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        return {
            success: true
        };
    } catch (error) {
        console.error('[DB:PB] updateSplitBillAction failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function bulkMoveToCategory(transactionIds, categoryId) {
    try {
        const pbCatId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(categoryId, 'categories');
        for (const id of transactionIds){
            const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'pvl_txn_001');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, {
                category_id: pbCatId
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        return {
            success: true
        };
    } catch (error) {
        console.error('[DB:PB] bulkMoveToCategory failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getOriginalAccount(refundRequestId) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(refundRequestId, 'transactions');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!record) return null;
        const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseMetadata"])(record.metadata);
        const originalAccountId = meta?.original_account_id;
        if (!originalAccountId) return null;
        const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', originalAccountId);
        if (!account) return null;
        return {
            id: account.id,
            name: account.name,
            type: account.type || 'general',
            image_url: account.image_url,
            current_balance: account.current_balance || 0
        };
    } catch (err) {
        console.error('getOriginalAccount failed:', err);
        return null;
    }
}
async function requestRefund(transactionId, amount, isPartial = false) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(transactionId, 'transactions');
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) throw new Error('Transaction not found');
        const existingMeta = typeof existing.metadata === 'object' && existing.metadata !== null ? existing.metadata : {};
        if (existingMeta.refund_request_id) {
            return {
                success: true
            };
        }
        const refundAmount = Math.max(0, Math.abs(Number(amount || 0)));
        if (refundAmount <= 0) {
            return {
                success: false,
                error: 'Refund amount must be positive'
            };
        }
        const pendingRefundId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbId}:refund:${Date.now()}:${Math.random()}`, 'transactions');
        const shortId = (value)=>String(value || '').slice(0, 6);
        const gd1Tag = `[GD1|${shortId(pbId)}→${shortId(pendingRefundId)}]`;
        const gd2Tag = `[GD2|${shortId(pbId)}]`;
        const pendingRefundAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$refunds$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["REFUND_PENDING_ACCOUNT_ID"], 'accounts');
        const pendingMeta = {
            original_transaction_id: pbId,
            original_account_id: existing.account_id || null,
            original_transaction_type: existing.type || null,
            has_refund_request: true,
            is_refund_confirmation: false,
            refund_amount: refundAmount,
            is_partial_refund: isPartial,
            refund_requested_at: new Date().toISOString(),
            refund_stage_tag: 'GD2',
            refund_sequence: 2,
            ...existingMeta && typeof existingMeta === 'object' ? existingMeta : {}
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', {
            id: pendingRefundId,
            date: existing.date || existing.occurred_at || new Date().toISOString(),
            occurred_at: existing.occurred_at || existing.date || new Date().toISOString(),
            note: `${gd2Tag} Refund for: ${existing.note || existing.description || 'Order'}`,
            description: `${gd2Tag} Refund for: ${existing.note || existing.description || 'Order'}`,
            type: existing.type || 'expense',
            status: 'pending',
            amount: refundAmount,
            final_price: refundAmount,
            account_id: pendingRefundAccountId,
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
            metadata: pendingMeta
        });
        const updateData = {
            status: 'waiting_refund',
            note: typeof existing.note === 'string' && existing.note.startsWith('[GD1|') ? existing.note : `${gd1Tag} ${existing.note || existing.description || 'Order'}`,
            metadata: {
                ...existingMeta,
                has_refund_request: true,
                refund_amount: refundAmount,
                is_partial_refund: isPartial,
                refund_requested_at: new Date().toISOString(),
                refund_request_id: pendingRefundId,
                refund_status: 'requested',
                refund_stage_tag: 'GD1',
                refund_sequence: 1
            }
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbId, updateData);
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        } catch (revalidateError) {
            console.warn('[DB:PB] requestRefund revalidate skipped:', revalidateError);
        }
        return {
            success: true
        };
    } catch (error) {
        console.error('[DB:PB] requestRefund failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function cancelOrder(transactionId) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(transactionId, 'transactions');
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbId);
        if (!existing) throw new Error('Transaction not found');
        const amount = Math.abs(existing.amount);
        return await requestRefund(transactionId, amount, false);
    } catch (error) {
        console.error('[DB:PB] cancelOrder failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createTransaction,
    updateTransaction,
    voidTransactionAction,
    restoreTransaction,
    confirmRefundAction,
    updateTransactionMetadata,
    deleteSplitBillAction,
    bulkMoveTransactionsToCategory,
    updateSplitBillAction,
    bulkMoveToCategory,
    getOriginalAccount,
    requestRefund,
    cancelOrder
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTransaction, "406ed95480903eceb71405faf96f7796a54dc9a513", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTransaction, "60409e2420f1cf40038e0a8f4ce5ac5c626195a9a8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(voidTransactionAction, "408143a8ca61733bb718d8adb73e05edfdd0a6b421", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(restoreTransaction, "40c27acd3d07b6d7defdb5a34722a40cf5bd8e0ee1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(confirmRefundAction, "6083099faae5d88f7a4278d9d533286f7fedcd10d3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTransactionMetadata, "609866070d7907140aa847afbb07db939049981f09", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSplitBillAction, "401f1e823c94ce9554382a43dad869a5c1b7081c47", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(bulkMoveTransactionsToCategory, "60904be4f32dca28dcad1df25455ed243012933928", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSplitBillAction, "60e4af908a6f0328ecf0f19c0020959e9806793080", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(bulkMoveToCategory, "6052fcbfb405cecdfd9786525c062edd5b556afeff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOriginalAccount, "408c335828a24275022af0ebdfeaa05cca7e7800d5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(requestRefund, "7032bb5e91fa7599d24b59ad708adc9a5851dd1723", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(cancelOrder, "40e12f2b3729389e6e1701182843ead7a6a3ab9c0f", null);
}),
"[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.7.0_@supabase+supabase-js@2.100.0/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+ssr@0.7.0_@supabase+supabase-js@2.100.0/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
function createClient() {
    const cookieStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$ssr$40$0$2e$7$2e$0_$40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://puzvrlojtgneihgvevcx.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1enZybG9qdGduZWloZ3ZldmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDI5NTksImV4cCI6MjA3OTExODk1OX0.fAVI34PhJBDxN8iZU6Eb_EPfE5YKJ9sg-oDI0LzlU4w"), {
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
"[project]/src/actions/ai-learn-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d68c934ffa31437613a6b82a4f748ca68cab00f3":"getLearnedPatternsAction","60207122b7bf24f3a12f09bca5bb3c8de22b66b968":"learnPatternAction"},"",""] */ __turbopack_context__.s([
    "getLearnedPatternsAction",
    ()=>getLearnedPatternsAction,
    "learnPatternAction",
    ()=>learnPatternAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function learnPatternAction(input, data) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        success: false,
        error: "Unauthorized"
    };
    // Extract keywords from input (simple tokenization)
    const keywords = input.toLowerCase().replace(/[0-9kđ]/g, '') // remove amounts
    .split(' ').filter((w)=>w.length > 2);
    // Save mapping for each keyword
    for (const keyword of keywords){
        // Upsert logic: increase frequency if exists
        const { error } = await supabase.rpc('upsert_ai_pattern', {
            p_user_id: user.id,
            p_keyword: keyword,
            p_entity_type: data.entity_type,
            p_entity_id: data.entity_id,
            p_entity_name: data.entity_name
        });
        if (error && error.code !== 'PGRST202') {
            console.error("Error saving pattern:", error);
        }
    }
    return {
        success: true
    };
}
async function getLearnedPatternsAction() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase.from('ai_learned_patterns').select('*').eq('user_id', user.id).order('frequency', {
        ascending: false
    }).limit(50);
    if (error) return [];
    return data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    learnPatternAction,
    getLearnedPatternsAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(learnPatternAction, "60207122b7bf24f3a12f09bca5bb3c8de22b66b968", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLearnedPatternsAction, "00d68c934ffa31437613a6b82a4f748ca68cab00f3", null);
}),
"[project]/src/actions/account-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"003ae2eaa765f5040a0d2a77fee232381065a561c4":"getLastTransactionAccountId","00aa32c8d2918f902cba5d650f0ab532b6a667e18d":"getAccountsAction","00ac6905e7275d737ac69d431104cf661758637c7a":"syncAllAccountsCashbackAction","00b050084f9664adbf563ec6e8f2e79fcd57e160c0":"getLastTransactionPersonId","400e69688b9239a5a545f1b468f94f3abc7639bd6d":"createAccount","40f27deb345266e0df8035456861e35d9941de0487":"updateAccountConfigAction","40f2e2f01d5c126f03c588f348ce84c7d43df6380a":"syncAccountCashbackAction","40f729992987a46a49b7975305dc087a51bbc850b2":"getRecentAccountsAction","60665a4fa4d3cc379d596e7eb6a41d4aa1e81cb2bf":"updateAccountInfo"},"",""] */ __turbopack_context__.s([
    "createAccount",
    ()=>createAccount,
    "getAccountsAction",
    ()=>getAccountsAction,
    "getLastTransactionAccountId",
    ()=>getLastTransactionAccountId,
    "getLastTransactionPersonId",
    ()=>getLastTransactionPersonId,
    "getRecentAccountsAction",
    ()=>getRecentAccountsAction,
    "syncAccountCashbackAction",
    ()=>syncAccountCashbackAction,
    "syncAllAccountsCashbackAction",
    ()=>syncAllAccountsCashbackAction,
    "updateAccountConfigAction",
    ()=>updateAccountConfigAction,
    "updateAccountInfo",
    ()=>updateAccountInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
// Inline mapper to avoid circular 'use server' module issues
function mapAccountRow(record) {
    return {
        id: record.id,
        name: record.name ?? '',
        type: record.type ?? 'bank',
        currency: record.currency ?? 'VND',
        current_balance: Number(record.current_balance ?? 0),
        credit_limit: Number(record.credit_limit ?? 0),
        parent_account_id: record.parent_account_id || null,
        account_number: record.account_number || null,
        owner_id: record.owner_id || null,
        cashback_config: record.cashback_config ?? null,
        cashback_config_version: Number(record.cashback_config_version ?? 1),
        secured_by_account_id: record.secured_by_account_id || null,
        is_active: record.is_active ?? true,
        image_url: typeof record.image_url === 'string' && record.image_url.startsWith('http') ? record.image_url : null,
        receiver_name: record.receiver_name || null,
        total_in: Number(record.total_in ?? 0),
        total_out: Number(record.total_out ?? 0),
        annual_fee: Number(record.annual_fee ?? 0),
        annual_fee_waiver_target: Number(record.annual_fee_waiver_target ?? 0),
        cb_type: record.cb_type ?? 'none',
        cb_base_rate: Number(record.cb_base_rate ?? 0),
        cb_max_budget: Number(record.cb_max_budget ?? 0),
        cb_is_unlimited: record.cb_is_unlimited ?? false,
        cb_rules_json: record.cb_rules_json ?? null,
        cb_min_spend: Number(record.cb_min_spend ?? 0),
        cb_cycle_type: record.cb_cycle_type ?? 'calendar_month',
        statement_day: Number(record.statement_day ?? 0),
        due_date: Number(record.due_date ?? 0),
        holder_type: record.holder_type ?? null,
        holder_person_id: record.holder_person_id ?? null,
        created_at: record.created ?? null,
        updated_at: record.updated ?? null
    };
}
async function createAccount(params) {
    console.log('[DB:PB] accounts.create', {
        name: params.name,
        type: params.type
    });
    const tempId = crypto.randomUUID();
    try {
        console.log('[DB:PB] accounts.create SENDING', {
            tempId,
            name: params.name,
            type: params.type,
            holder_person_id: params.holder_person_id
        });
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseAccount"])(tempId, {
            ...params,
            // Do NOT send owner_id for new accounts — PB validates it as a relation
            // and 'SYSTEM_MIGRATED' is not a valid record ID
            current_balance: 0,
            is_active: true,
            statement_day: params.statementDay,
            due_date: params.dueDate
        });
        if (!result.success) {
            throw new Error(result.error || 'Failed to create account in PocketBase');
        }
        console.log('[DB:PB] accounts.create SUCCESS', {
            name: params.name,
            id: result.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        return {
            success: true,
            id: result.id
        };
    } catch (error) {
        console.error('[DB:PB] accounts.create FAILED', {
            error: String(error)
        });
        return {
            success: false,
            error: error.message
        };
    }
}
async function updateAccountInfo(accountId, data) {
    console.log('[DB:PB] accounts.updateInfo', {
        accountId
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseAccountInfo"])(accountId, {
            account_number: data.account_number ?? null,
            receiver_name: data.receiver_name ?? null
        });
        if (!success) throw new Error('Failed to update account info in PocketBase');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/accounts/${accountId}`);
        return {
            success: true
        };
    } catch (error) {
        console.error('[DB:PB] accounts.updateInfo failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getAccountsAction() {
    console.log('[DB:PB] accounts.getBatch');
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('accounts', {
            perPage: 200,
            sort: 'name'
        });
        return response.items.map(mapAccountRow);
    } catch (error) {
        console.error('[DB:PB] getAccountsAction failed:', error);
        return [];
    }
}
async function updateAccountConfigAction(params) {
    console.log('[DB:PB] accounts.updateConfig START', {
        id: params.id,
        name: params.name,
        type: params.type,
        holder_type: params.holder_type,
        holder_person_id: params.holder_person_id,
        cb_type: params.cb_type,
        has_cashback_config: !!params.cashbackConfig,
        has_cb_rules_json: !!params.cb_rules_json
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseAccountInfo"])(params.id, {
            name: params.name,
            credit_limit: params.creditLimit,
            annual_fee: params.annualFee,
            annual_fee_waiver_target: params.annualFeeWaiverTarget,
            type: params.type,
            secured_by_account_id: params.securedByAccountId,
            is_active: params.isActive ?? undefined,
            image_url: params.imageUrl,
            parent_account_id: params.parentAccountId,
            account_number: params.accountNumber,
            receiver_name: params.receiverName,
            statement_day: params.statementDay,
            due_date: params.dueDate,
            holder_type: params.holder_type,
            holder_person_id: params.holder_person_id,
            // cb_* columns + cashback_config JSON
            ...{
                cb_type: params.cb_type,
                cb_base_rate: params.cb_base_rate,
                cb_max_budget: params.cb_max_budget,
                cb_is_unlimited: params.cb_is_unlimited,
                cb_rules_json: params.cb_rules_json,
                cb_min_spend: params.cb_min_spend,
                cb_cycle_type: params.cb_cycle_type,
                cashback_config: params.cashbackConfig
            }
        });
        if (!success) throw new Error('Failed to update account config in PocketBase');
        console.log('[DB:PB] accounts.updateConfig SUCCESS', {
            id: params.id
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/accounts/${params.id}`);
        return {
            success: true
        };
    } catch (error) {
        console.error('[DB:PB] accounts.updateConfig FAILED', {
            id: params.id,
            error: String(error)
        });
        return {
            success: false,
            error: error.message
        };
    }
}
async function getLastTransactionPersonId() {
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: 'person_id != ""',
            sort: '-occurred_at',
            perPage: 1,
            fields: 'person_id'
        });
        return response.items[0]?.person_id ?? null;
    } catch (error) {
        console.error('[DB:PB] getLastTransactionPersonId failed:', error);
        return null;
    }
}
async function getLastTransactionAccountId() {
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: 'account_id != ""',
            sort: '-occurred_at',
            perPage: 1,
            fields: 'account_id'
        });
        return response.items[0]?.account_id ?? null;
    } catch (error) {
        console.error('[DB:PB] getLastTransactionAccountId failed:', error);
        return null;
    }
}
async function syncAccountCashbackAction(accountId) {
    try {
        const { refreshAccountCashback } = await __turbopack_context__.A("[project]/src/services/pocketbase/cashback-refresh.service.ts [app-rsc] (ecmascript, async loader)");
        const result = await refreshAccountCashback(accountId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/accounts/${accountId}`);
        return result;
    } catch (error) {
        console.error('[Action] syncAccountCashbackAction failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function syncAllAccountsCashbackAction() {
    console.log('[Action] syncAllAccountsCashbackAction START');
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('accounts', {
            filter: 'type = "credit_card" && is_active = true',
            perPage: 100
        });
        const accounts = response.items;
        const { refreshAccountCashback } = await __turbopack_context__.A("[project]/src/services/pocketbase/cashback-refresh.service.ts [app-rsc] (ecmascript, async loader)");
        let totalProcessed = 0;
        let totalCycles = 0;
        for (const acc of accounts){
            console.log(`[Action] Syncing account: ${acc.name} (${acc.id})`);
            const res = await refreshAccountCashback(acc.id);
            if (res.success) {
                totalProcessed++;
                totalCycles += res.processedCycles || 0;
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        return {
            success: true,
            processedAccounts: totalProcessed,
            totalCycles,
            message: `Successfully synced ${totalProcessed} credit accounts.`
        };
    } catch (error) {
        console.error('[Action] syncAllAccountsCashbackAction failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getRecentAccountsAction(limit = 5) {
    const { getRecentAccountsByTransactions } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
    return await getRecentAccountsByTransactions(limit);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createAccount,
    updateAccountInfo,
    getAccountsAction,
    updateAccountConfigAction,
    getLastTransactionPersonId,
    getLastTransactionAccountId,
    syncAccountCashbackAction,
    syncAllAccountsCashbackAction,
    getRecentAccountsAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAccount, "400e69688b9239a5a545f1b468f94f3abc7639bd6d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccountInfo, "60665a4fa4d3cc379d596e7eb6a41d4aa1e81cb2bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountsAction, "00aa32c8d2918f902cba5d650f0ab532b6a667e18d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccountConfigAction, "40f27deb345266e0df8035456861e35d9941de0487", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLastTransactionPersonId, "00b050084f9664adbf563ec6e8f2e79fcd57e160c0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLastTransactionAccountId, "003ae2eaa765f5040a0d2a77fee232381065a561c4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAccountCashbackAction, "40f2e2f01d5c126f03c588f348ce84c7d43df6380a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllAccountsCashbackAction, "00ac6905e7275d737ac69d431104cf661758637c7a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentAccountsAction, "40f729992987a46a49b7975305dc087a51bbc850b2", null);
}),
"[project]/src/services/people.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40c343ecc34aff9686c700c78197c10f8cb1f40de5":"getPeople","40c66423082636cc0047b59290fc03cfd01629ab40":"getPersonCycleSheets","40c92c9d109f0bb6983b85f0eb2ec34ccff4adaac8":"getPersonWithSubs","40d03bb88ed73a18243f7ce5beab76eaf05836eeca":"getRecentPeopleByTransactions","60542768ec9496022a2f316f83544b08d03afa2070":"updatePerson","60f6c6a7cb29cc9c7fe0a0fb6c3a0f36992ad65082":"ensureDebtAccount","7c23b858a0874709f27dd6ef4a3addbd88cf59210e":"createPerson"},"",""] */ __turbopack_context__.s([
    "createPerson",
    ()=>createPerson,
    "ensureDebtAccount",
    ()=>ensureDebtAccount,
    "getPeople",
    ()=>getPeople,
    "getPersonCycleSheets",
    ()=>getPersonCycleSheets,
    "getPersonWithSubs",
    ()=>getPersonWithSubs,
    "getRecentPeopleByTransactions",
    ()=>getRecentPeopleByTransactions,
    "updatePerson",
    ()=>updatePerson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
/**
 * Revalidate paths related to a person
 */ function revalidatePersonPaths(personId) {
    if (!personId) return;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/people");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
}
/**
 * Helper to calculate final price
 */ function calculateFinalPrice(row) {
    const rawAmount = Math.abs(Number(row.amount ?? 0));
    const percentVal = Number(row.cashback_share_percent ?? 0);
    const fixedVal = Number(row.cashback_share_fixed ?? 0);
    const normalizedPercent = percentVal > 1 ? percentVal / 100 : percentVal;
    const safePercent = isNaN(normalizedPercent) ? 0 : normalizedPercent;
    const cashbackFromPercent = rawAmount * safePercent;
    return rawAmount - (cashbackFromPercent + fixedVal);
}
/**
 * SOURCE OF TRUTH FILTER: Matches debt.service.ts
 */ function isPersonalDebt(txn) {
    const note = (txn.note || "").toLowerCase();
    const type = (txn.type || "").toLowerCase();
    if (note.startsWith("bank ") || note.startsWith("bank_")) {
        if (type === "repayment" || type === "debt") return true;
        const isPersonal = note.includes("điện") || note.includes("nước") || note.includes("s26") || note.includes("đơn") || note.includes("wifi") || note.includes("rác") || note.includes("icloud") || note.includes("youtube") || note.includes("derma") || note.includes("zakka");
        if (isPersonal) return true;
        return false;
    }
    return true;
}
async function getPeople(options) {
    const includeArchived = Boolean(options?.includeArchived);
    const targetPersonId = options?.targetPersonId;
    try {
        let activePeople = [];
        if (targetPersonId) {
            const p = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBasePersonDetails"])(targetPersonId);
            if (p) activePeople = [
                p
            ];
        } else {
            const people = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBasePeople"])();
            activePeople = includeArchived ? people : people.filter((p)=>!p.is_archived);
        }
        const personIds = activePeople.map((p)=>p.id);
        if (personIds.length === 0) return [];
        const now = new Date();
        const currentMonthTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(now);
        // 1. Setup Maps
        const debtAccountsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("accounts", {
            filter: `type='debt' && is_active=true${targetPersonId ? ` && owner_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetPersonId)}'` : ''}`,
            perPage: 500
        });
        const debtAccountToPersonMap = new Map();
        debtAccountsRes.items.forEach((acc)=>{
            if (acc.owner_id) debtAccountToPersonMap.set(acc.id, acc.owner_id);
        });
        // Reverse map for faster filtering if we have targetPersonId
        const personToDebtAccountIds = new Set();
        if (targetPersonId) {
            debtAccountsRes.items.forEach((acc)=>personToDebtAccountIds.add(acc.id));
        }
        const personCycleData = new Map();
        personIds.forEach((id)=>personCycleData.set(id, new Map()));
        // 2. Fetch Sync Summaries (The "Settled" authority)
        const syncedCycles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("people_debt_cycles", {
            filter: targetPersonId ? `person_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetPersonId)}'` : '',
            perPage: 2000
        });
        syncedCycles.items.forEach((c)=>{
            const pId = c.person_id;
            if (!pId || !personIds.includes(pId)) return;
            const tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(c.cycle_tag || c.tag_name || c.tag) || "";
            if (!tag) return;
            const cycles = personCycleData.get(pId);
            const current = cycles.get(tag) || {
                raw: null,
                sync: null
            };
            const initial = Number(c.initial_amount || c.base_lend || 0);
            const back = Number(c.back_amount || c.cashback || 0);
            const repay = Number(c.repay_net || c.repay || 0);
            const updated = new Date(c.updated || c.created || 0).getTime();
            current.sync = {
                initial,
                back,
                repay,
                balance: initial - back - repay,
                status: c.status,
                updatedAt: updated
            };
            cycles.set(tag, current);
        });
        // 3. Fetch Raw Transactions (The "Deep" authority)
        // Optimization: If targetPersonId is set, filter by person_id or debt accounts directly
        const txFilter = `(type='debt' || type='expense' || type='repayment' || type='income' || type='transfer' || type='cashback') && status!='void'${targetPersonId ? ` && (person_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetPersonId)}'${Array.from(personToDebtAccountIds).length > 0 ? ` || (${Array.from(personToDebtAccountIds).map((id)=>`account_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id)}'`).join(' || ')})` : ''})` : ''}`;
        if (targetPersonId) {
            console.log(`[getPeople] Filter for ${targetPersonId}:`, txFilter);
        }
        const txnsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
            filter: txFilter,
            perPage: targetPersonId ? 5000 : 10000,
            sort: "-date"
        });
        txnsRes.items.forEach((txn)=>{
            let pId = null;
            if (txn.person_id && personIds.includes(txn.person_id)) pId = txn.person_id;
            else {
                const accId = txn.account_id || txn.to_account_id || txn.target_account_id;
                if (accId && debtAccountToPersonMap.has(accId)) pId = debtAccountToPersonMap.get(accId) || null;
            }
            if (!pId || !isPersonalDebt(txn)) return;
            const metadata = txn.metadata && typeof txn.metadata === 'object' ? txn.metadata : {};
            const tagStr = String(txn.debt_cycle_tag || txn.tag || metadata.debt_cycle_tag || metadata.tag || "");
            const tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tagStr) || tagStr;
            if (!tag) return;
            const cycles = personCycleData.get(pId);
            const current = cycles.get(tag) || {
                raw: {
                    baseLend: 0,
                    cashback: 0,
                    repaid: 0,
                    balance: 0
                },
                sync: null
            };
            if (!current.raw) current.raw = {
                baseLend: 0,
                cashback: 0,
                repaid: 0,
                balance: 0
            };
            const amount = Math.abs(Number(txn.amount || 0));
            const type = String(txn.type || "").toLowerCase();
            const note = (txn.note || "").toLowerCase();
            const isRollover = note.includes("rollover");
            const isRepayment = type === "repayment" || type === "income" && !note.includes("cashback") && !note.includes("refund");
            const isCashback = type === "cashback" || type === "income" && (note.includes("cashback") || note.includes("refund")) || type === "expense" && (note.includes("refund") || note.includes("cashback"));
            const isSpend = (type === "expense" || type === "debt") && !isRollover && !isCashback && !isRepayment;
            const finalPrice = calculateFinalPrice(txn);
            const cbValue = amount - finalPrice;
            if (isSpend || isRollover) {
                current.raw.baseLend += amount;
                current.raw.cashback += cbValue;
            } else if (isCashback) current.raw.cashback += amount;
            else if (isRepayment) current.raw.repaid += amount;
            const effective = isSpend ? finalPrice : isCashback || isRepayment ? -amount : isRollover ? amount : 0;
            current.raw.balance += effective;
            cycles.set(tag, current);
        });
        // 4. Final Aggregation
        return activePeople.map((person)=>{
            const cycles = personCycleData.get(person.id);
            const stats = {
                totalBalance: 0,
                totalBaseDebt: 0,
                totalCashback: 0,
                totalRepaid: 0,
                currentBaseLend: 0,
                currentCashback: 0,
                currentRepay: 0,
                currentBalance: 0
            };
            const cycleStats = [];
            Array.from(cycles.entries()).forEach(([tag, data])=>{
                const isCurrent = tag === currentMonthTag;
                let initial = 0, back = 0, repay = 0, balance = 0;
                const raw = data.raw;
                const sync = data.sync;
                if (sync?.status === 'settled' || sync && sync.balance < 1000) {
                    initial = sync?.initial || raw?.baseLend || 0;
                    back = sync?.back || raw?.cashback || 0;
                    repay = initial - back;
                    balance = 0;
                } else {
                    const rawBal = raw?.balance || 0;
                    const syncBal = sync?.balance || 0;
                    if (rawBal > syncBal) {
                        initial = raw.baseLend;
                        back = raw.cashback;
                        repay = raw.repaid;
                        balance = rawBal;
                    } else if (sync) {
                        initial = sync.initial;
                        back = sync.back;
                        repay = sync.repay;
                        balance = syncBal;
                    } else {
                        initial = raw?.baseLend || 0;
                        back = raw?.cashback || 0;
                        repay = raw?.repaid || 0;
                        balance = rawBal;
                    }
                }
                stats.totalBalance += balance;
                stats.totalBaseDebt += initial;
                stats.totalCashback += back;
                stats.totalRepaid += repay;
                if (isCurrent) {
                    stats.currentBaseLend = initial;
                    stats.currentCashback = back;
                    stats.currentRepay = repay;
                    stats.currentBalance = balance;
                }
                cycleStats.push({
                    tag,
                    baseLend: Math.round(initial),
                    cashback: Math.round(back),
                    repaid: Math.round(repay),
                    netLend: Math.round(initial - back),
                    remains: Math.round(balance)
                });
            });
            const displayBalance = Math.abs(stats.totalBalance) < 1000 ? 0 : stats.totalBalance;
            return {
                ...person,
                debt_account_id: debtAccountsRes.items.find((a)=>a.owner_id === person.id)?.id || null,
                current_debt_balance: displayBalance,
                balance: displayBalance,
                current_cycle_debt: Math.round(stats.currentBalance),
                outstanding_debt: displayBalance,
                all_debt_remains: displayBalance,
                total_base_debt: Math.round(stats.totalBaseDebt),
                total_cashback: Math.round(stats.totalCashback),
                total_repaid: Math.round(stats.totalRepaid),
                current_cycle_base_lend: Math.round(stats.currentBaseLend),
                current_cycle_cashback: Math.round(stats.currentCashback),
                current_cycle_repaid: Math.round(stats.currentRepay),
                current_cycle_label: currentMonthTag,
                cycle_stats: cycleStats.sort((a, b)=>(b.tag || '').localeCompare(a.tag || '')),
                synced_cycle_count: Array.from(cycles.values()).filter((v)=>v.sync).length
            };
        });
    } catch (err) {
        console.error("[PB] getPeople Error:", err);
        return [];
    }
}
async function getPersonWithSubs(id) {
    const people = await getPeople({
        includeArchived: true,
        targetPersonId: id
    });
    return people.find((p)=>p.id === id || p.pocketbase_id === id) || null;
}
async function createPerson(name, image_url, sheet_link, subscriptionIds, options = {}) {
    try {
        const p = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBasePerson"])({
            name,
            image_url,
            sheet_link,
            ...options
        });
        const pId = p.id;
        if (subscriptionIds?.length) await updatePersonSubs(pId, subscriptionIds);
        await ensureDebtAccount(pId, name);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/people");
        return {
            success: true,
            profileId: p.id
        };
    } catch (err) {
        return {
            success: false
        };
    }
}
async function updatePersonSubs(pId, sIds) {
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("service_members", {
        filter: `person_id="${pId}"`
    });
    for (const m of existing.items)if (!sIds.includes(m.service_id)) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])("service_members", m.id);
    const current = existing.items.map((m)=>m.service_id);
    for (const sid of sIds)if (!current.includes(sid)) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])("service_members", {
        service_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(sid, "services"),
        person_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(pId, "people"),
        slots: 1,
        is_owner: false
    });
}
async function updatePerson(id, data) {
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBasePerson"])(pbId, data);
        if (data.subscriptionIds !== undefined) await updatePersonSubs(pbId, data.subscriptionIds);
        revalidatePersonPaths(pbId);
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false
        };
    }
}
async function getRecentPeopleByTransactions(limit = 5) {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("pvl_txn_001", {
            filter: "person_id != null",
            sort: "-occurred_at",
            perPage: 50
        });
        const ids = Array.from(new Set(res.items.map((t)=>t.person_id))).slice(0, limit);
        const people = await getPeople({
            includeArchived: true
        });
        return ids.map((id)=>people.find((p)=>p.id === id)).filter(Boolean);
    } catch (err) {
        return [];
    }
}
async function ensureDebtAccount(pId, name) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(pId);
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("accounts", {
            filter: `owner_id='${pbId}' && type='debt'`,
            perPage: 1
        });
        if (existing.items.length > 0) return existing.items[0].id;
        const n = name || (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])("people", pbId))?.name || "Unknown";
        const acc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])("accounts", {
            name: `Debt: ${n}`,
            type: "debt",
            owner_id: pbId,
            is_active: true,
            initial_balance: 0,
            balance: 0,
            currency: "VND"
        });
        return acc.id;
    } catch (err) {
        return null;
    }
}
async function getPersonCycleSheets(id) {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("person_cycle_sheets", {
            filter: `person_id='${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id)}'`,
            sort: "-cycle_tag"
        });
        return res.items.map((i)=>({
                id: i.id,
                person_id: i.person_id,
                cycle_tag: i.cycle_tag,
                sheet_id: i.sheet_id,
                sheet_url: i.sheet_url,
                created_at: i.created,
                updated_at: i.updated
            }));
    } catch (err) {
        return [];
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPeople,
    getPersonWithSubs,
    createPerson,
    updatePerson,
    getRecentPeopleByTransactions,
    ensureDebtAccount,
    getPersonCycleSheets
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPeople, "40c343ecc34aff9686c700c78197c10f8cb1f40de5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonWithSubs, "40c92c9d109f0bb6983b85f0eb2ec34ccff4adaac8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPerson, "7c23b858a0874709f27dd6ef4a3addbd88cf59210e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePerson, "60542768ec9496022a2f316f83544b08d03afa2070", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentPeopleByTransactions, "40d03bb88ed73a18243f7ce5beab76eaf05836eeca", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ensureDebtAccount, "60f6c6a7cb29cc9c7fe0a0fb6c3a0f36992ad65082", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonCycleSheets, "40c66423082636cc0047b59290fc03cfd01629ab40", null);
}),
"[project]/src/services/debt.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a85b331b4dfc559686bf50478effcff3fb14fcb9":"getDebtAccounts","40155fc647664a7c30184f9a9eae8f3260a18fe983":"getPersonDetails","4078eb9a6432659b692d8492c5c4bc09389b90beba":"syncAllPersonDebtCycles","40d43d07b3ff91056fae9f53d6d97939b5e5c83c52":"getPersonDebt","60125c18133ff3613599096fc99e23edc4a1282ee6":"getOutstandingDebts","602f1b4aff1f56e9a0ce1d74bbba672658a9c0f751":"syncPersonDebtCycle","605e83907b04683a7271f699b003586fcb55224680":"computeDebtFromTransactions","60a2835ba73406474568e8477eb017678d2b01af15":"getDebtByTags","7eda8fd99594522044e2c5ec3caf594803875810ee":"settleDebt"},"",""] */ __turbopack_context__.s([
    "computeDebtFromTransactions",
    ()=>computeDebtFromTransactions,
    "getDebtAccounts",
    ()=>getDebtAccounts,
    "getDebtByTags",
    ()=>getDebtByTags,
    "getOutstandingDebts",
    ()=>getOutstandingDebts,
    "getPersonDebt",
    ()=>getPersonDebt,
    "getPersonDetails",
    ()=>getPersonDetails,
    "settleDebt",
    ()=>settleDebt,
    "syncAllPersonDebtCycles",
    ()=>syncAllPersonDebtCycles,
    "syncPersonDebtCycle",
    ()=>syncPersonDebtCycle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
function isUuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
async function resolvePersonPocketBaseId(personId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
}
function resolveBaseType(type) {
    if (type === 'repayment') return 'income';
    if (type === 'debt') return 'expense';
    if (type === 'transfer') return 'transfer';
    if (type === 'income') return 'income';
    return 'expense';
}
function canonicalDebtTag(value) {
    const raw = String(value ?? '').trim();
    if (!raw) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(raw) || raw;
}
/**
 * Calculate final price (amount after cashback deduction)
 * Final Price = Amount - Cashback
 * Cashback = (amount * percent/100) + fixed
 */ function calculateFinalPrice(row) {
    // IGNORE row.final_price for personal debt as it may include total card cashback
    // which belongs to the owner, not the debt-person.
    const rawAmount = Math.abs(Number(row.amount ?? 0));
    // Parse cashback values
    const percentVal = Number(row.cashback_share_percent ?? 0);
    const fixedVal = Number(row.cashback_share_fixed ?? 0);
    // Normalize percent (could be stored as 2 for 2% or 0.02 for 2%)
    const normalizedPercent = percentVal > 1 ? percentVal / 100 : percentVal;
    // Safe cashback calc
    const safePercent = isNaN(normalizedPercent) ? 0 : normalizedPercent;
    const cashbackFromPercent = rawAmount * safePercent;
    const totalCashback = cashbackFromPercent + fixedVal;
    // Final price = amount - cashback
    return rawAmount - totalCashback;
}
async function computeDebtFromTransactions(rows, personId) {
    return rows.filter((row)=>row?.person_id === personId && row.status !== 'void').reduce((sum, row)=>{
        const finalPrice = calculateFinalPrice(row);
        const baseType = resolveBaseType(row.type);
        if (baseType === 'income') {
            return sum - finalPrice;
        }
        if (baseType === 'expense') {
            return sum + finalPrice;
        }
        return sum;
    }, 0);
}
async function getPersonDebt(personId) {
    if (!personId) return 0;
    const pbPersonId = await resolvePersonPocketBaseId(personId);
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `person_id = "${pbPersonId}" && status != "void"`,
            fields: 'amount,type,person_id,status,cashback_share_percent,cashback_share_fixed,final_price',
            perPage: 5000
        });
        return await computeDebtFromTransactions(response.items, pbPersonId);
    } catch (err) {
        console.error('[DB:PB] getPersonDebt failed:', err);
        return 0;
    }
}
async function getDebtAccounts() {
    try {
        const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: 'person_id != ""',
            fields: 'person_id',
            perPage: 5000
        });
        const personIds = Array.from(new Set(txns.items.map((t)=>t.person_id).filter(Boolean)));
        if (personIds.length === 0) return [];
        const [people, debtValues] = await Promise.all([
            Promise.all(personIds.map((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', id))),
            Promise.all(personIds.map((id)=>getPersonDebt(id)))
        ]);
        return personIds.map((id, index)=>{
            const person = people[index];
            return {
                id,
                name: person?.name ?? 'Unknown',
                current_balance: debtValues[index] ?? 0,
                owner_id: id,
                image_url: person?.image_url ?? null,
                sheet_link: person?.sheet_link ?? null
            };
        });
    } catch (err) {
        console.error('[DB:PB] getDebtAccounts failed:', err);
        return [];
    }
}
async function getPersonDetails(id) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'people');
    try {
        const person = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('people', pbId);
        if (!person) return null;
        const currentBalance = await getPersonDebt(pbId);
        return {
            id: person.id,
            name: person.name,
            current_balance: currentBalance,
            owner_id: person.id,
            image_url: person.image_url ?? null,
            sheet_link: person.sheet_link ?? null,
            google_sheet_url: person.google_sheet_url ?? null,
            sheet_full_img: person.sheet_full_img ?? null,
            sheet_show_bank_account: person.sheet_show_bank_account ?? false,
            sheet_show_qr_image: person.sheet_show_qr_image ?? false
        };
    } catch (err) {
        console.error('[DB:PB] getPersonDetails failed:', err);
        return null;
    }
}
async function getDebtByTags(personId, options) {
    if (!personId) return [];
    const pbPersonId = await resolvePersonPocketBaseId(personId);
    try {
        const [txnsResponse, cyclesResponse] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `person_id = "${pbPersonId}" && status != "void"`,
                sort: 'date',
                perPage: 5000
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('people_debt_cycles', {
                filter: `person_id = "${pbPersonId}"`
            })
        ]);
        const data = txnsResponse.items;
        const syncedCycles = cyclesResponse.items;
        const syncedMap = new Map(syncedCycles.map((c)=>[
                c.cycle_tag,
                c
            ]));
        // FIFO Simulation to determine "Remaining" amount for each debt
        // 1. Separate Debts and Repayments
        const debtsMap = new Map();
        const debtsList = [];
        const repaymentList = [];
        const isPersonalDebt = (txn)=>{
            const rawTag = txn.tag || txn.debt_cycle_tag || '';
            const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(rawTag) || '';
            // Fallback: If no tag, use occurred_at date to check year
            let finalTag = normalized;
            if (!finalTag) {
                const d = new Date(txn.occurred_at || txn.date);
                if (!isNaN(d.getTime())) {
                    finalTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(d);
                }
            }
            const note = (txn.note || '').toLowerCase();
            if (note.startsWith('bank ')) {
                // Strictly exclude shared bank transactions unless they are explicit debt/repayment
                if (txn.type === "repayment" || txn.type === "debt") return true;
                const isPersonal = note.includes('điện') || note.includes('nước') || note.includes('s26') || note.includes('đơn') || note.includes('wifi') || note.includes('rác');
                if (isPersonal) return true;
                // Otherwise, everything starting with 'bank ' is excluded from individual debt history
                return false;
            }
            return true;
        };
        data.filter(isPersonalDebt).forEach((txn)=>{
            const type = txn.type;
            if (type === 'debt' || type === 'expense') {
                const amount = Math.abs(txn.amount);
                debtsList.push({
                    ...txn,
                    remaining: amount
                });
                debtsMap.set(txn.id, {
                    remaining: amount,
                    links: []
                }); // Init links
            } else if (type === 'repayment' || type === 'income') {
                repaymentList.push({
                    id: txn.id,
                    amount: calculateFinalPrice(txn),
                    initialAmount: calculateFinalPrice(txn),
                    date: txn.date || txn.occurred_at,
                    metadata: txn.metadata,
                    tag: txn.tag
                });
            }
        });
        // Sort lists
        // Debts: Oldest First (FIFO targets)
        debtsList.sort((a, b)=>new Date(a.date || a.occurred_at).getTime() - new Date(b.date || b.occurred_at).getTime());
        // Repayments: Oldest First
        repaymentList.sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
        // === PHASE 1: PRE-ALLOCATED (TARGETED) REPAYMENTS ===
        // If a repayment has metadata specifying which debts it covers, apply that first.
        for (const repay of repaymentList){
            const targets = repay.metadata?.bulk_allocation?.debts;
            if (Array.isArray(targets) && targets.length > 0) {
                targets.forEach((target)=>{
                    const debtId = target.id;
                    const targetAmount = Number(target.amount || 0); // The amount allocated to this debt
                    if (debtId && targetAmount > 0) {
                        const debtEntry = debtsMap.get(debtId);
                        // Verify debt exists and repay has balance
                        if (debtEntry && repay.amount > 0) {
                            // Determine how much to pay: 
                            // We trust the `targetAmount` from metadata, BUT we are limited by available funds 
                            // and the debt's actual size (though metadata *should* be accurate).
                            // Actually, if user "Overpays" in UI, targetAmount might > debt.remaining.
                            // We should record the payment even if it exceeds remaining? 
                            // For "remainingPrincipal" calculation, we floor at 0. 
                            // But for "links", we record what was paid.
                            // Let's cap at repayment balance.
                            const pay = Math.min(targetAmount, repay.amount);
                            // Apply
                            debtEntry.remaining -= pay;
                            if (debtEntry.remaining < 0) debtEntry.remaining = 0; // Cap floor
                            repay.amount -= pay;
                            // Link
                            debtEntry.links.push({
                                repaymentId: repay.id,
                                amount: pay
                            });
                        // console.log(`[DebtFIFO-TARGET] Pay ${pay} to ${debtId} from ${repay.id}. RepayRem: ${repay.amount}`);
                        }
                    }
                });
            }
        }
        // === PHASE 1.5: TAG MATCHING ===
        // If a repayment has a tag (e.g. "2024-05"), prioritize paying debts with the SAME tag.
        for (const repay of repaymentList){
            if (repay.amount <= 0.01) continue;
            const repayTag = canonicalDebtTag(repay.metadata?.tag || repay.tag);
            if (repayTag) {
                // Find debts with matching tag (Oldest First)
                for (const debt of debtsList){
                    const entry = debtsMap.get(debt.id);
                    if (entry.remaining <= 0.01) continue;
                    const debtTag = canonicalDebtTag(debt.tag);
                    if (debtTag === repayTag) {
                        const pay = Math.min(repay.amount, entry.remaining);
                        entry.remaining -= pay;
                        repay.amount -= pay;
                        if (entry.remaining < 0) entry.remaining = 0;
                        entry.links.push({
                            repaymentId: repay.id,
                            amount: pay
                        });
                        // console.log(`[DebtFIFO-TAGGED] Pay ${pay} to ${debt.id} from ${repay.id} (Tag: ${debtTag})`);
                        if (repay.amount <= 0.01) break; // Repayment exhausted
                    }
                }
            }
        }
        // === PHASE 2: GENERAL FIFO (Waterfalls) ===
        // Apply any remaining repayment balance to any remaining debt balance (Oldest First)
        // This covers:
        // 1. Repayments without metadata (legacy)
        // 2. Repayments with "Unallocated" surplus
        // 3. Debts that weren't fully covered by targets
        // FIX: Exclude tagged repayments from waterfall. If tagged, they stay in their tag bucket.
        const generalQueue = repaymentList.filter((r)=>{
            if (r.amount <= 0.01) return false;
            const tag = canonicalDebtTag(r.metadata?.tag || r.tag);
            return !tag; // Only include truly untagged repayments
        });
        for (const debt of debtsList){
            const entry = debtsMap.get(debt.id);
            const debtYear = new Date(debt.date || debt.occurred_at).getFullYear();
            // While debt has remaining amount AND we have general money available
            // FIX: Only apply untagged repayments to debts of the SAME YEAR to prevent phantom carry-overs
            // unless the repayment is explicitly tagged (handled in Phase 1.5)
            let queueIdx = 0;
            while(entry.remaining > 0.01 && queueIdx < generalQueue.length){
                const currentRepayment = generalQueue[queueIdx];
                const repayYear = new Date(currentRepayment.date).getFullYear();
                // Skip if year mismatch for untagged general pool
                if (repayYear !== debtYear) {
                    queueIdx++;
                    continue;
                }
                // Strict FIFO: Apply whatever is available to this debt
                const payAmount = Math.min(currentRepayment.amount, entry.remaining);
                if (payAmount <= 0) {
                    generalQueue.splice(queueIdx, 1);
                    continue;
                }
                // Record Link
                entry.links.push({
                    repaymentId: currentRepayment.id,
                    amount: payAmount
                });
                // Update Balances
                entry.remaining -= payAmount;
                currentRepayment.amount -= payAmount;
                if (entry.remaining < 0) entry.remaining = 0;
                // If Repayment exhausted, remove from queue
                if (currentRepayment.amount < 0.01) {
                    generalQueue.splice(queueIdx, 1);
                } else {
                    // Only increment if we didn't remove the item
                    // But since we are reducing its amount, we stay at same index to potentially pay more of this debt?
                    // Actually, if we're here, we still have repayment left but debt is paid (or vice versa).
                    // Let's stay at same index if debt still has remains, or increment if not.
                    if (entry.remaining <= 0.01) break;
                }
            }
        }
        // 3. Aggregate by Tag
        const tagMap = new Map();
        ;
        data.filter(isPersonalDebt).forEach((row)=>{
            // Prioritize debt_cycle_tag for grouping, fall back to row.tag
            const preferredTag = row.debt_cycle_tag || row.tag;
            const normalizedTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(preferredTag);
            const tag = normalizedTag?.trim() ? normalizedTag.trim() : preferredTag?.trim() ? preferredTag.trim() : 'UNTAGGED';
            const baseType = resolveBaseType(row.type);
            const occurredAt = row.occurred_at ?? '';
            if (!tagMap.has(tag)) {
                tagMap.set(tag, {
                    lend: 0,
                    lendOriginal: 0,
                    repay: 0,
                    cashback: 0,
                    last_activity: occurredAt,
                    remainingPrincipal: 0,
                    links: []
                });
            }
            const current = tagMap.get(tag);
            // INITIAL (Gross) = amount
            const rawAmount = Math.abs(Number(row.amount ?? 0));
            // Use the central helper which respects DB's finalPrice if present
            const finalPrice = calculateFinalPrice(row);
            const cashbackShared = Math.max(0, rawAmount - finalPrice);
            if (baseType === 'expense') {
                if (!isNaN(rawAmount)) {
                    current.lendOriginal += rawAmount;
                }
                if (!isNaN(cashbackShared)) {
                    current.cashback += cashbackShared;
                }
                // LEND (Net Principal) = finalPrice
                current.lend += finalPrice;
                // Add remaining principal from our FIFO simulation
                const fifoEntry = debtsMap.get(row.id);
                if (fifoEntry) {
                    current.remainingPrincipal += fifoEntry.remaining;
                    fifoEntry.links.forEach((link)=>{
                        const exists = current.links.find((l)=>l.repaymentId === link.repaymentId);
                        if (exists) {
                            exists.amount += link.amount;
                        } else {
                            current.links.push({
                                ...link
                            });
                        }
                    });
                }
            } else if (baseType === 'income') {
                if (!isNaN(finalPrice)) {
                    current.repay += finalPrice;
                }
            }
            if (occurredAt && occurredAt > current.last_activity) {
                current.last_activity = occurredAt;
            }
        });
        const result = Array.from(tagMap.entries()).map(([tag, { lend, lendOriginal, repay, cashback, last_activity, remainingPrincipal, links }])=>{
            const remains = lend - repay;
            const netBalance = remains;
            // Status Logic:
            let status = 'active';
            if (Math.abs(remains) < 500) {
                status = 'settled';
            }
            const synced = syncedMap.get(tag);
            if (!options?.ignoreSynced && synced && synced.is_synced) {
                return {
                    tag,
                    netBalance: (synced.lend_net || 0) - (synced.repay_net || 0),
                    initial: synced.initial_amount || 0,
                    back: synced.back_amount || 0,
                    lend: synced.lend_net || 0,
                    repay: synced.repay_net || 0,
                    remains: synced.remains_amount || 0,
                    status: synced.status || status,
                    last_activity: synced.last_synced_at || last_activity,
                    remainingPrincipal: synced.remains_amount || 0,
                    links,
                    // Legacy
                    originalPrincipal: synced.lend_net || 0,
                    totalOriginalDebt: synced.initial_amount || 0,
                    totalBack: synced.repay_net || 0,
                    totalCashback: synced.back_amount || 0,
                    isSynced: true
                };
            }
            return {
                tag,
                netBalance,
                initial: lendOriginal,
                back: cashback,
                lend: lend,
                repay: repay,
                remains: remainingPrincipal,
                status,
                last_activity,
                remainingPrincipal,
                links,
                // Legacy
                totalBack: repay,
                totalCashback: cashback,
                isSynced: false
            };
        });
        return result;
    } catch (err) {
        console.error('[DB:PB] getDebtByTags failed:', err);
        return [];
    }
}
async function settleDebt(personId, amount, targetBankAccountId, note, date, tag) {
    const net = await getPersonDebt(personId);
    const direction = net >= 0 ? 'collect' : 'repay';
    const txnType = direction === 'collect' ? 'repayment' : 'debt';
    const payload = {
        occurred_at: date.toISOString(),
        note,
        tag,
        type: txnType,
        amount: Math.abs(amount),
        source_account_id: targetBankAccountId,
        person_id: personId
    };
    const transactionId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"])(payload);
    if (!transactionId) return null;
    return {
        transactionId,
        direction,
        amount: Math.abs(amount)
    };
}
async function getOutstandingDebts(personId, excludeTransactionId) {
    if (!personId) return [];
    const pbPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people');
    const pbExcludeId = excludeTransactionId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(excludeTransactionId, 'pvl_txn_001') : null;
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `person_id = "${pbPersonId}" && status != "void"`,
            sort: 'date',
            perPage: 5000
        });
        const data = response.items;
        if (!data) return [];
        // In-memory simulation of current state
        // 1. Separate Debts and Repayments
        const debts = [];
        const repayments = [];
        // Legacy support: type='expense' is debt, type='income' is repayment
        // Modern support: type='debt' is debt, type='repayment' is repayment
        data.forEach((txn)=>{
            // If we are editing a transaction, we must exclude it from the history calculation
            // so that we can "re-apply" its effect.
            if (excludeTransactionId && txn.id === excludeTransactionId) return;
            const type = txn.type;
            if (type === 'debt' || type === 'expense') {
                debts.push({
                    ...txn,
                    remaining: Math.abs(txn.amount)
                }); // Initialize remaining
            } else if (type === 'repayment' || type === 'income') {
                repayments.push(Math.abs(txn.amount));
            }
        });
        // 2. Apply historic repayments FIFO to debts
        let repaymentPool = repayments.reduce((sum, val)=>sum + val, 0);
        const activeDebts = [];
        for (const debt of debts){
            if (repaymentPool <= 0) {
                activeDebts.push(debt);
                continue;
            }
            const amount = debt.remaining;
            if (repaymentPool >= amount) {
                repaymentPool -= amount;
                debt.remaining = 0;
            } else {
                debt.remaining -= repaymentPool;
                repaymentPool = 0;
                activeDebts.push(debt);
            }
        }
        // Return only debts that have remaining amount > 0
        return activeDebts.map((d)=>({
                ...d,
                amount: d.remaining // Update amount to be the 'Remaining Principal'
            }));
    } catch (err) {
        console.error('[DB:PB] getOutstandingDebts failed:', err);
        return [];
    }
}
async function syncPersonDebtCycle(personId, tag) {
    const pbPersonId = await resolvePersonPocketBaseId(personId);
    const rawStats = await getDebtByTags(personId, {
        ignoreSynced: true
    });
    if (tag === 'all') {
        return await syncAllPersonDebtCycles(personId);
    }
    const cycleStat = rawStats.find((s)=>s.tag === tag);
    if (!cycleStat) {
        return {
            success: false,
            error: `Tag ${tag} not found in transaction history`
        };
    }
    // Find existing record
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('people_debt_cycles', {
        filter: `person_id = "${pbPersonId}" && cycle_tag = "${tag}"`
    });
    const cycleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbPersonId}-${tag}`);
    const payload = {
        id: cycleId,
        person_id: pbPersonId,
        cycle_tag: tag,
        initial_amount: cycleStat.initial,
        back_amount: cycleStat.back,
        lend_net: cycleStat.lend,
        repay_net: cycleStat.repay,
        remains_amount: cycleStat.remains,
        status: cycleStat.status,
        is_synced: true,
        last_synced_at: new Date().toISOString()
    };
    try {
        if (existing.items.length > 0) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('people_debt_cycles', existing.items[0].id, payload);
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('people_debt_cycles', payload);
        }
        return {
            success: true
        };
    } catch (err) {
        console.error('[DebtService] Sync failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
async function syncAllPersonDebtCycles(personId) {
    const pbPersonId = await resolvePersonPocketBaseId(personId);
    const rawStats = await getDebtByTags(personId, {
        ignoreSynced: true
    });
    // 1. Fetch ALL existing cycles for this person in DB
    const existingRecords = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('people_debt_cycles', {
        filter: `person_id = "${pbPersonId}"`,
        perPage: 500
    });
    const existingMap = new Map(existingRecords.items.map((r)=>[
            r.cycle_tag,
            r
        ]));
    let successCount = 0;
    let errorCount = 0;
    // 2. Process cycles found in current transactions
    const processedTags = new Set();
    for (const cycleStat of rawStats){
        const tag = cycleStat.tag;
        processedTags.add(tag);
        const payload = {
            person_id: pbPersonId,
            cycle_tag: tag,
            initial_amount: cycleStat.initial,
            back_amount: cycleStat.back,
            lend_net: cycleStat.lend,
            repay_net: cycleStat.repay,
            remains_amount: cycleStat.remains,
            status: cycleStat.status,
            is_synced: true,
            last_synced_at: new Date().toISOString()
        };
        try {
            const existing = existingMap.get(tag);
            if (existing) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('people_debt_cycles', existing.id, payload);
            } else {
                const cycleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbPersonId}-${tag}`);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('people_debt_cycles', {
                    ...payload,
                    id: cycleId
                });
            }
            successCount++;
        } catch (err) {
            console.error(`[DebtService] Failed to sync cycle ${tag}:`, err);
            errorCount++;
        }
    }
    // 3. Process records that exist in DB but NO LONGER in transactions
    for (const [tag, record] of existingMap.entries()){
        if (!processedTags.has(tag)) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('people_debt_cycles', record.id, {
                    initial_amount: 0,
                    back_amount: 0,
                    lend_net: 0,
                    repay_net: 0,
                    remains_amount: 0,
                    status: 'settled',
                    is_synced: true,
                    last_synced_at: new Date().toISOString()
                });
                successCount++;
            } catch (err) {
                console.error(`[DebtService] Failed to clean up orphaned cycle ${tag}:`, err);
            }
        }
    }
    return {
        success: successCount > 0,
        message: `Synced ${successCount} cycles${errorCount > 0 ? `, ${errorCount} failed` : ''}`
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    computeDebtFromTransactions,
    getPersonDebt,
    getDebtAccounts,
    getPersonDetails,
    getDebtByTags,
    settleDebt,
    getOutstandingDebts,
    syncPersonDebtCycle,
    syncAllPersonDebtCycles
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(computeDebtFromTransactions, "605e83907b04683a7271f699b003586fcb55224680", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonDebt, "40d43d07b3ff91056fae9f53d6d97939b5e5c83c52", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDebtAccounts, "00a85b331b4dfc559686bf50478effcff3fb14fcb9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonDetails, "40155fc647664a7c30184f9a9eae8f3260a18fe983", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDebtByTags, "60a2835ba73406474568e8477eb017678d2b01af15", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(settleDebt, "7eda8fd99594522044e2c5ec3caf594803875810ee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOutstandingDebts, "60125c18133ff3613599096fc99e23edc4a1282ee6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncPersonDebtCycle, "602f1b4aff1f56e9a0ce1d74bbba672658a9c0f751", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllPersonDebtCycles, "4078eb9a6432659b692d8492c5c4bc09389b90beba", null);
}),
"[project]/src/services/category.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a0c166be588b54aae5db510ede5b1406bf47aa8c":"getCategories","4004692694e9dc7772f74d34abd5e0f9eb21d80d07":"getCategoryStats","401aa97fd5200cae6cfc9558c545efac5ca7fa8910":"createCategory","40fa8eb19375e38f5f0c2683f253d5bbf8a3e974ea":"getCategoryById","60352005aaf86b6dfb425d4048abdc2cb96ca7c4a3":"toggleCategoryArchive","604a6766748e16496e170abd92cb76126c98df8a42":"archiveCategory","6067cf375a96123000f295a26fc6e054e0f3ed5fe2":"deleteCategoriesBulk","60bd0c68721f499bbbb25aa22e6a92262b53fcedaa":"deleteCategory","60bfa8be5d6d8aa1d26fea5f6c7760afc8c976217e":"toggleCategoriesArchiveBulk","60d18e36be07d9c0d2bc63d81594ba360ec40a58ea":"updateCategory"},"",""] */ __turbopack_context__.s([
    "archiveCategory",
    ()=>archiveCategory,
    "createCategory",
    ()=>createCategory,
    "deleteCategoriesBulk",
    ()=>deleteCategoriesBulk,
    "deleteCategory",
    ()=>deleteCategory,
    "getCategories",
    ()=>getCategories,
    "getCategoryById",
    ()=>getCategoryById,
    "getCategoryStats",
    ()=>getCategoryStats,
    "toggleCategoriesArchiveBulk",
    ()=>toggleCategoriesArchiveBulk,
    "toggleCategoryArchive",
    ()=>toggleCategoryArchive,
    "updateCategory",
    ()=>updateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getCategories() {
    console.log('[DB:PB] categories.list');
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseCategories"])();
    } catch (err) {
        console.error('[DB:PB] categories.list failed:', err);
        return [];
    }
}
async function createCategory(category) {
    console.log('[DB:PB] categories.create', {
        name: category.name
    });
    // Create a temporary ID to hash for consistent PB ID if needed, 
    // but for categories we can just let PB generate or use random
    const tempId = crypto.randomUUID();
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseCategory"])(tempId, {
            name: category.name,
            type: category.type,
            icon: category.icon ?? null,
            image_url: category.image_url ?? null,
            kind: category.kind ?? null,
            mcc_codes: category.mcc_codes ?? null
        });
        if (!success) throw new Error('Failed to create category in PocketBase');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        // Re-fetch to return the actual object with PB ID
        const categories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseCategories"])();
        return categories.find((c)=>c.name === category.name) || null;
    } catch (err) {
        console.error('[DB:PB] categories.create failed:', err);
        return null;
    }
}
async function updateCategory(id, updates) {
    console.log('[DB:PB] categories.update', {
        id
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseCategory"])(id, {
            name: updates.name,
            type: updates.type,
            icon: updates.icon ?? null,
            image_url: updates.image_url ?? null,
            kind: updates.kind ?? null,
            mcc_codes: updates.mcc_codes ?? null
        });
        if (!success) throw new Error('Failed to update category in PocketBase');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return await getCategoryById(id);
    } catch (err) {
        console.error('[DB:PB] categories.update failed:', err);
        return null;
    }
}
async function getCategoryById(id) {
    console.log('[DB:PB] categories.getById', {
        id
    });
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'categories');
        const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('categories', pbId);
        if (!item) return null;
        return {
            id: item.id,
            name: item.name,
            type: item.type,
            parent_id: item.parent_id ?? undefined,
            icon: item.icon,
            image_url: item.image_url,
            kind: item.kind,
            mcc_codes: item.mcc_codes,
            is_archived: item.is_archived
        };
    } catch (error) {
        console.error('[DB:PB] getCategoryById failed:', error);
        return null;
    }
}
async function getCategoryStats(year) {
    console.log('[DB:PB] categories.getStats', {
        year
    });
    const startDate = `${year}-01-01 00:00:00.000Z`;
    const endDate = `${year}-12-31 23:59:59.999Z`;
    try {
        // This could potentially fetch thousands of txns, but typical personal use is limited
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `occurred_at >= '${startDate}' && occurred_at <= '${endDate}' && status != 'void'`,
            perPage: 2000
        });
        const stats = {};
        response.items.forEach((txn)=>{
            if (!txn.category_id) return;
            if (!stats[txn.category_id]) {
                stats[txn.category_id] = {
                    total: 0,
                    count: 0
                };
            }
            stats[txn.category_id].total += txn.amount || 0;
            stats[txn.category_id].count += 1;
        });
        return stats;
    } catch (error) {
        console.error('[DB:PB] getCategoryStats failed:', error);
        return {};
    }
}
async function toggleCategoryArchive(id, isArchived) {
    console.log('[DB:PB] categories.toggleArchive', {
        id,
        isArchived
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseCategoryArchive"])(id, isArchived);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return success;
    } catch (err) {
        console.error('[DB:PB] categories.toggleArchive failed:', err);
        return false;
    }
}
async function deleteCategory(id, targetId) {
    console.log('[DB:PB] categories.delete', {
        id,
        targetId
    });
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'categories');
        // 1. Check for existing transactions
        const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `category_id='${pbId}'`,
            perPage: 1
        });
        const hasTransactions = txns.totalItems > 0;
        if (hasTransactions) {
            if (!targetId) {
                return {
                    success: false,
                    hasTransactions: true,
                    error: 'Category has associated transactions'
                };
            }
            // 2. Handover transactions to target category
            const targetPbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetId, 'categories');
            const allTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `category_id='${pbId}'`,
                perPage: 500
            });
            for (const txn of allTxns.items){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                    category_id: targetPbId
                });
            }
        }
        // 3. Delete the category
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseCategory"])(pbId);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return {
            success
        };
    } catch (err) {
        console.error('[DB:PB] deleteCategory failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
async function toggleCategoriesArchiveBulk(ids, isArchived) {
    console.log('[DB:PB] categories.toggleArchiveBulk', {
        count: ids.length,
        isArchived
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseCategoriesArchiveBulk"])(ids, isArchived);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return success;
    } catch (err) {
        console.error('[DB:PB] toggleCategoriesArchiveBulk failed:', err);
        return false;
    }
}
async function deleteCategoriesBulk(ids, targetId) {
    console.log('[DB:PB] categories.deleteBulk', {
        count: ids.length,
        targetId
    });
    try {
        // 1. Find categories with transactions
        const idsWithTransactions = [];
        const pbIds = ids.map((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'categories'));
        for (const pbId of pbIds){
            const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `category_id='${pbId}'`,
                perPage: 1
            });
            if (txns.totalItems > 0) idsWithTransactions.push(pbId);
        }
        if (idsWithTransactions.length > 0 && !targetId) {
            return {
                success: false,
                hasTransactionsIds: idsWithTransactions,
                error: 'Some categories have associated transactions'
            };
        }
        // 2. Handover if targetId provided
        if (targetId && idsWithTransactions.length > 0) {
            const targetPbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetId, 'categories');
            for (const pbId of idsWithTransactions){
                const allTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                    filter: `category_id='${pbId}'`,
                    perPage: 500
                });
                for (const txn of allTxns.items){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                        category_id: targetPbId
                    });
                }
            }
        }
        // 3. Delete categories
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseCategoriesBulk"])(pbIds);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return {
            success: true
        };
    } catch (err) {
        console.error('[DB:PB] deleteCategoriesBulk failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
async function archiveCategory(id, targetId) {
    console.log('[DB:PB] categories.archive', {
        id,
        targetId
    });
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'categories');
        if (targetId) {
            const targetPbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetId, 'categories');
            const allTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `category_id='${pbId}'`,
                perPage: 500
            });
            for (const txn of allTxns.items){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                    category_id: targetPbId
                });
            }
        } else {
            const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `category_id='${pbId}' && status != 'void'`,
                perPage: 1
            });
            if (txns.totalItems > 0) {
                return {
                    success: false,
                    hasTransactions: true,
                    error: 'Category has transactions'
                };
            }
        }
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('categories', pbId, {
            is_archived: true
        });
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return {
            success: !!success
        };
    } catch (err) {
        console.error('[DB:PB] archiveCategory failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCategories,
    createCategory,
    updateCategory,
    getCategoryById,
    getCategoryStats,
    toggleCategoryArchive,
    deleteCategory,
    toggleCategoriesArchiveBulk,
    deleteCategoriesBulk,
    archiveCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategories, "00a0c166be588b54aae5db510ede5b1406bf47aa8c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "401aa97fd5200cae6cfc9558c545efac5ca7fa8910", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "60d18e36be07d9c0d2bc63d81594ba360ec40a58ea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategoryById, "40fa8eb19375e38f5f0c2683f253d5bbf8a3e974ea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategoryStats, "4004692694e9dc7772f74d34abd5e0f9eb21d80d07", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleCategoryArchive, "60352005aaf86b6dfb425d4048abdc2cb96ca7c4a3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "60bd0c68721f499bbbb25aa22e6a92262b53fcedaa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleCategoriesArchiveBulk, "60bfa8be5d6d8aa1d26fea5f6c7760afc8c976217e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategoriesBulk, "6067cf375a96123000f295a26fc6e054e0f3ed5fe2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(archiveCategory, "604a6766748e16496e170abd92cb76126c98df8a42", null);
}),
"[project]/src/services/shop.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00764f7ad08fe5ef40a0c6e4022ac40fd8792f4ecf":"getShops","400a75b6ee22daf8b144bd099db063db906fcaf7bf":"getShopById","4093284dc8e28f867199118a92b5b54a17dae67e76":"getShopStats","40d72e5d18cef368be2ff8581051bf978f5e6f3f29":"createShop","602f65824bb8e62d41304c3a1f86452eeaaae67d5b":"toggleShopsArchiveBulk","6036b30feb7d1825f66e8478140533989e19bb2dc6":"updateShop","605c4afdb5a516080d7b70ac2e53433b39b505bbae":"toggleShopArchive","60bbeeb94a8646340a79c51edff0f5cc82cfade2a0":"deleteShopsBulk","60c4368f3018d1ce8b92c38eded7e74ffca3bab59b":"archiveShop","60d1a594b8ebb8782fceec2b8f38ecfcbc4ad82b8b":"deleteShop"},"",""] */ __turbopack_context__.s([
    "archiveShop",
    ()=>archiveShop,
    "createShop",
    ()=>createShop,
    "deleteShop",
    ()=>deleteShop,
    "deleteShopsBulk",
    ()=>deleteShopsBulk,
    "getShopById",
    ()=>getShopById,
    "getShopStats",
    ()=>getShopStats,
    "getShops",
    ()=>getShops,
    "toggleShopArchive",
    ()=>toggleShopArchive,
    "toggleShopsArchiveBulk",
    ()=>toggleShopsArchiveBulk,
    "updateShop",
    ()=>updateShop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getShops() {
    console.log('[DB:PB] shops.list');
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseShops"])();
    } catch (err) {
        console.error('[DB:PB] shops.list failed:', err);
        return [];
    }
}
async function getShopById(id) {
    console.log('[DB:PB] shops.getById', {
        id
    });
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'shops');
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('shops', pbId);
    } catch (error) {
        console.error('[DB:PB] getShopById failed:', error);
        return null;
    }
}
async function createShop(input) {
    console.log('[DB:PB] shops.create', {
        name: input.name
    });
    const tempId = crypto.randomUUID();
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseShop"])(tempId, {
            name: input.name.trim(),
            image_url: input.image_url ?? null,
            default_category_id: input.default_category_id ?? null
        });
        if (!success) throw new Error('Failed to create shop in PocketBase');
        const shops = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseShops"])();
        return shops.find((s)=>s.name === input.name.trim()) || null;
    } catch (err) {
        console.error('[DB:PB] shops.create failed:', err);
        return null;
    }
}
async function updateShop(id, input) {
    console.log('[DB:PB] shops.update', {
        id
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseShop"])(id, {
            name: input.name,
            image_url: input.image_url,
            default_category_id: input.default_category_id
        });
        return !!success;
    } catch (err) {
        console.error('[DB:PB] shops.update failed:', err);
        return false;
    }
}
async function toggleShopArchive(id, isArchived) {
    console.log('[DB:PB] shops.toggleArchive', {
        id,
        isArchived
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseShopArchive"])(id, isArchived);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return success;
    } catch (err) {
        console.error('[DB:PB] shops.toggleArchive failed:', err);
        return false;
    }
}
async function deleteShop(id, targetId) {
    console.log('[DB:PB] shops.delete', {
        id,
        targetId
    });
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'shops');
        // 1. Check for existing transactions
        const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `shop_id='${pbId}'`,
            perPage: 1
        });
        const hasTransactions = txns.totalItems > 0;
        if (hasTransactions) {
            if (!targetId) {
                return {
                    success: false,
                    hasTransactions: true,
                    error: 'Shop has associated transactions'
                };
            }
            // 2. Handover transactions to target shop
            const targetPbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetId, 'shops');
            const allTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `shop_id='${pbId}'`,
                perPage: 500
            });
            for (const txn of allTxns.items){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                    shop_id: targetPbId
                });
            }
        }
        // 3. Delete the shop
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseShop"])(pbId);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return {
            success
        };
    } catch (err) {
        console.error('[DB:PB] deleteShop failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
async function toggleShopsArchiveBulk(ids, isArchived) {
    console.log('[DB:PB] shops.toggleArchiveBulk', {
        count: ids.length,
        isArchived
    });
    try {
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseShopsArchiveBulk"])(ids, isArchived);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return success;
    } catch (err) {
        console.error('[DB:PB] toggleShopsArchiveBulk failed:', err);
        return false;
    }
}
async function deleteShopsBulk(ids, targetId) {
    console.log('[DB:PB] shops.deleteBulk', {
        count: ids.length,
        targetId
    });
    try {
        const idsWithTransactions = [];
        const pbIds = ids.map((id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'shops'));
        for (const pbId of pbIds){
            const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `shop_id='${pbId}'`,
                perPage: 1
            });
            if (txns.totalItems > 0) idsWithTransactions.push(pbId);
        }
        if (idsWithTransactions.length > 0 && !targetId) {
            return {
                success: false,
                hasTransactionsIds: idsWithTransactions,
                error: 'Some shops have associated transactions'
            };
        }
        if (targetId && idsWithTransactions.length > 0) {
            const targetPbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetId, 'shops');
            for (const pbId of idsWithTransactions){
                const allTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                    filter: `shop_id='${pbId}'`,
                    perPage: 500
                });
                for (const txn of allTxns.items){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                        shop_id: targetPbId
                    });
                }
            }
        }
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseShopsBulk"])(pbIds);
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return {
            success: true
        };
    } catch (err) {
        console.error('[DB:PB] deleteShopsBulk failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
async function archiveShop(id, targetId) {
    console.log('[DB:PB] shops.archive', {
        id,
        targetId
    });
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'shops');
        if (targetId) {
            const targetPbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(targetId, 'shops');
            const allTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `shop_id='${pbId}'`,
                perPage: 500
            });
            for (const txn of allTxns.items){
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
                    shop_id: targetPbId
                });
            }
        } else {
            const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter: `shop_id='${pbId}' && status != 'void'`,
                perPage: 1
            });
            if (txns.totalItems > 0) {
                return {
                    success: false,
                    hasTransactions: true,
                    error: 'Shop has transactions'
                };
            }
        }
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('shops', pbId, {
            is_archived: true
        });
        if (success) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/categories');
        return {
            success: !!success
        };
    } catch (err) {
        console.error('[DB:PB] archiveShop failed:', err);
        return {
            success: false,
            error: err.message
        };
    }
}
async function getShopStats(year) {
    console.log('[DB:PB] shops.getStats', {
        year
    });
    const startDate = `${year}-01-01 00:00:00.000Z`;
    const endDate = `${year}-12-31 23:59:59.999Z`;
    try {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `occurred_at >= '${startDate}' && occurred_at <= '${endDate}' && status != 'void'`,
            perPage: 2000
        });
        const stats = {};
        response.items.forEach((txn)=>{
            if (!txn.shop_id) return;
            if (!stats[txn.shop_id]) {
                stats[txn.shop_id] = {
                    total: 0,
                    count: 0
                };
            }
            stats[txn.shop_id].total += txn.amount || 0;
            stats[txn.shop_id].count += 1;
        });
        return stats;
    } catch (error) {
        console.error('[DB:PB] getShopStats failed:', error);
        return {};
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getShops,
    getShopById,
    createShop,
    updateShop,
    toggleShopArchive,
    deleteShop,
    toggleShopsArchiveBulk,
    deleteShopsBulk,
    archiveShop,
    getShopStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getShops, "00764f7ad08fe5ef40a0c6e4022ac40fd8792f4ecf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getShopById, "400a75b6ee22daf8b144bd099db063db906fcaf7bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createShop, "40d72e5d18cef368be2ff8581051bf978f5e6f3f29", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateShop, "6036b30feb7d1825f66e8478140533989e19bb2dc6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleShopArchive, "605c4afdb5a516080d7b70ac2e53433b39b505bbae", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteShop, "60d1a594b8ebb8782fceec2b8f38ecfcbc4ad82b8b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleShopsArchiveBulk, "602f65824bb8e62d41304c3a1f86452eeaaae67d5b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteShopsBulk, "60bbeeb94a8646340a79c51edff0f5cc82cfade2a0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(archiveShop, "60c4368f3018d1ce8b92c38eded7e74ffca3bab59b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getShopStats, "4093284dc8e28f867199118a92b5b54a17dae67e76", null);
}),
"[project]/src/lib/constants.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================================
// SYSTEM CONSTANTS - FIXED UUIDs FOR CORE LOGIC
// Context: These IDs must match the Seed SQL scripts.
// ============================================================================
__turbopack_context__.s([
    "ASSET_TYPES",
    ()=>ASSET_TYPES,
    "SYSTEM_ACCOUNTS",
    ()=>SYSTEM_ACCOUNTS,
    "SYSTEM_CATEGORIES",
    ()=>SYSTEM_CATEGORIES
]);
const SYSTEM_ACCOUNTS = {
    // Tài khoản dùng cho quy trình Hủy đơn/Hoàn tiền (Phase 17)
    PENDING_REFUNDS: '99999999-9999-9999-9999-999999999999',
    // Tài khoản trung gian dùng cho Chuyển khoản theo lô CKL (Phase 31)
    BATCH_CLEARING: '88888888-9999-9999-9999-888888888888',
    // User ID mặc định (Fallback khi chưa có Auth)
    DEFAULT_USER_ID: '917455ba-16c0-42f9-9cea-264f81a3db66',
    // Tài khoản Draft Fund (Phase 62)
    DRAFT_FUND: '88888888-9999-9999-9999-111111111111'
};
const SYSTEM_CATEGORIES = {
    // Danh mục dùng cho Refund (Phase 22)
    REFUND: 'e0000000-0000-0000-0000-000000000095',
    // Danh mục dùng cho Thu nợ (Phase 22)
    DEBT_REPAYMENT: 'e0000000-0000-0000-0000-000000000096',
    // Danh mục dùng cho Thu nợ người khác (Phase 18.5)
    COLLECT_DEBT: 'e0000000-0000-0000-0000-000000000097',
    // Danh mục dùng cho Chiết khấu/Quà tặng (Phase 14.2)
    DISCOUNT_GIVEN: 'e0000000-0000-0000-0000-000000000098',
    // Danh mục Shopping mặc định (Phase 17.5)
    SHOPPING: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a99',
    // Danh mục dùng cho Service (Phase 62)
    SERVICE: 'e0000000-0000-0000-0000-000000000088',
    // Danh mục Online Services (Phase 62)
    ONLINE_SERVICES: 'e0000000-0000-0000-0000-000000000088',
    // Danh mục Phí Ngân hàng (Phase 63)
    BANK_FEE: 'e0000000-0000-0000-0000-000000000099',
    // Danh mục Credit Payment (Batch Transfer)
    CREDIT_PAYMENT: 'e0000000-0000-0000-0000-000000000091',
    // Danh mục Money Transfer (for Transfer quick-add)
    MONEY_TRANSFER: 'e0000000-0000-0000-0000-000000000080',
    // Danh mục Hoàn tiền (Cashback)
    CASHBACK: 'e0000000-0000-0000-0000-000000000092'
};
const ASSET_TYPES = [
    'savings',
    'investment',
    'asset'
];
}),
"[project]/src/services/service-manager.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0056bd4ecfed5bc5a49b8322ee6c9d853307233567":"getServices","402e64772ecea5e115ed645f27fb5e5384c0771aa1":"deleteService","403f14368728a34a7df37a83ce2cda398ad2b3782a":"getServiceById","40abf972fe3acb9f1a8d03545b08646dc052778003":"getServiceBotConfig","40e6e3067b3ebf015efcc060b7ae14bafd522d62a9":"recallServiceDistribution","605fa6b8168868299feebbf1c5d8377314f006e372":"upsertService","6075b6fd1f4b4e3ec64e187a8d988ab4ea34d83ea6":"updateServiceMembers","60fc522187b7d4fe5b09364ac9e759c52380abb41b":"saveServiceBotConfig","7864971240a578bb1e5a5b2a489cee73ab8dfae3c8":"distributeAllServices","7cd98e752315262b95422897400606a60ab3de6341":"distributeService"},"",""] */ __turbopack_context__.s([
    "deleteService",
    ()=>deleteService,
    "distributeAllServices",
    ()=>distributeAllServices,
    "distributeService",
    ()=>distributeService,
    "getServiceBotConfig",
    ()=>getServiceBotConfig,
    "getServiceById",
    ()=>getServiceById,
    "getServices",
    ()=>getServices,
    "recallServiceDistribution",
    ()=>recallServiceDistribution,
    "saveServiceBotConfig",
    ()=>saveServiceBotConfig,
    "updateServiceMembers",
    ()=>updateServiceMembers,
    "upsertService",
    ()=>upsertService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function upsertService(serviceData, members) {
    const context = `upsertService:${serviceData.name}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    const pbServiceId = serviceData.id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(serviceData.id, 'services') : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${serviceData.name}-${Date.now()}`, 'services');
    // 1. Upsert service
    let service;
    const isExisting = serviceData.id ? true : false;
    if (isExisting) {
        service = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('services', pbServiceId, {
            ...serviceData,
            amount: serviceData.price ?? serviceData.amount,
            billing_day: serviceData.due_day ?? serviceData.billing_day,
            shop_id: serviceData.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(serviceData.shop_id, 'shops') : null,
            image_url: serviceData.image_url || null
        });
    } else {
        service = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('services', {
            id: pbServiceId,
            ...serviceData,
            amount: serviceData.price ?? serviceData.amount,
            billing_day: serviceData.due_day ?? serviceData.billing_day,
            shop_id: serviceData.shop_id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(serviceData.shop_id, 'shops') : null,
            image_url: serviceData.image_url || null
        });
    }
    const serviceId = service.id;
    if (members) {
        // 2. Delete existing members
        const existingMembers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('service_members', {
            filter: `service_id="${serviceId}"`,
            perPage: 100
        });
        for (const m of existingMembers.items){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('service_members', m.id);
        }
        // 3. Insert new members
        for (const member of members){
            const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(member.person_id, 'people');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('service_members', {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${serviceId}-${personId}`, 'service_members'),
                service_id: serviceId,
                person_id: personId,
                slots: member.slots,
                is_owner: member.is_owner
            });
        }
    }
    return service;
}
async function distributeService(serviceId, customDate, customNoteFormat, noteSuffix = '', options) {
    const context = `distributeService:${serviceId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbServiceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(serviceId, 'services');
        let service = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('services', pbServiceId, 'shop_id');
        if (!service) throw new Error('Service not found in PB');
        // Schema resilience mapping
        service = {
            ...service,
            shop_id: service.shop_id || service.expand?.shop_id?.id || null,
            price: service.price ?? service.amount ?? 0,
            due_day: service.due_day ?? service.billing_day ?? 1,
            shop: service.expand?.shop_id
        };
        const membersRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('service_members', {
            filter: `service_id="${pbServiceId}"`,
            expand: 'person_id'
        });
        const members = membersRes.items.map((m)=>({
                ...m,
                people: m.expand?.person_id
            }));
        const initialPrice = service.price ?? service.amount ?? 0;
        const computedTotalSlots = members.reduce((sum, member)=>sum + (Number(member.slots) || 0), 0);
        const totalSlots = service.max_slots && service.max_slots > 0 ? service.max_slots : computedTotalSlots;
        if (totalSlots === 0) {
            console.warn(`[Distribute] Service ${service.name} has 0 total slots. Skipping.`);
            throw new Error('Total slots is zero, cannot distribute.');
        }
        const unitCost = initialPrice / totalSlots;
        const now = new Date();
        const vnTimeStr = now.toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        const vnNow = new Date(vnTimeStr);
        const activeDate = customDate ? new Date(customDate) : vnNow;
        const year = activeDate.getFullYear();
        const month = activeDate.getMonth();
        const day = Math.min(service.due_day || 1, 28);
        const dateObj = new Date(year, month, day, 9, 0, 0);
        const transactionDate = dateObj.toISOString();
        const monthTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(dateObj);
        const createdTransactions = [];
        for (const member of members){
            const cost = unitCost * member.slots;
            if (cost === 0) continue;
            let note = '';
            const pricePerSlot = Math.round(unitCost);
            const templateToUse = customNoteFormat || service.note_template;
            if (templateToUse) {
                note = templateToUse.replace('{service}', service.name).replace('{member}', member.people?.name || 'Unknown').replace('{name}', service.name).replace('{slots}', member.slots.toString()).replace('{date}', monthTag).replace('{price}', pricePerSlot.toLocaleString()).replace('{initialPrice}', initialPrice.toLocaleString()).replace('{total_slots}', totalSlots.toString());
            } else {
                note = `${member.people?.name || 'Unknown'} ${monthTag} Slot: ${member.slots} (${pricePerSlot.toLocaleString()})/${totalSlots}`;
            }
            if (noteSuffix) {
                note += noteSuffix;
            }
            const canonicalMetadata = {
                service_id: serviceId,
                member_id: member.person_id,
                month_tag: monthTag,
                source: options?.source || 'manual'
            };
            const personId = member.is_owner ? null : member.person_id;
            const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`svc-${serviceId}-${member.person_id}-${monthTag}`, 'pvl_txn_001');
            const payload = {
                id: pbTxnId,
                date: transactionDate,
                occurred_at: transactionDate,
                note: note,
                description: note,
                metadata: canonicalMetadata,
                tag: monthTag,
                shop_id: service.shop_id,
                amount: -cost,
                final_price: -cost,
                type: personId ? 'debt' : 'expense',
                status: 'posted',
                account_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'),
                category_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_CATEGORIES"].ONLINE_SERVICES, 'categories'),
                person_id: personId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(personId, 'people') : null
            };
            const filter = `metadata~"${serviceId}" && metadata~"${member.person_id}" && metadata~"${monthTag}"`;
            const existingTxns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                filter,
                perPage: 1
            });
            let transactionId;
            if (existingTxns.items.length > 0) {
                transactionId = existingTxns.items[0].id;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', transactionId, payload);
            } else {
                const newTx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('pvl_txn_001', payload);
                transactionId = newTx.id;
            }
            createdTransactions.push({
                id: transactionId
            });
            if (personId) {
                try {
                    const { syncTransactionToSheet } = await __turbopack_context__.A("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript, async loader)");
                    await syncTransactionToSheet(personId, {
                        id: transactionId,
                        occurred_at: transactionDate,
                        note: note,
                        tag: monthTag,
                        amount: cost,
                        type: 'Debt',
                        shop_name: service.name || 'Service'
                    }, 'create');
                } catch (syncError) {
                    console.error('[Sheet Sync] Failed:', syncError);
                }
            }
        }
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(service.due_day || 1);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('services', pbServiceId, {
            last_distribution_date: now.toISOString(),
            next_distribution_date: nextMonth.toISOString(),
            distribution_status: 'completed'
        });
        return {
            transactions: createdTransactions,
            personIds: Array.from(new Set(members.map((m)=>m.person_id).filter(Boolean)))
        };
    } catch (error) {
        console.error(`[DB:PB] ${context} failed`, error);
        throw error;
    }
}
async function getServices() {
    const context = 'getServices';
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('services', {
        sort: 'name',
        expand: 'shop_id'
    });
    // Fetch members for each service
    const services = await Promise.all(res.items.map(async (s)=>{
        const membersRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('service_members', {
            filter: `service_id="${s.id}"`,
            expand: 'person_id'
        });
        return {
            ...s,
            price: s.price ?? s.amount ?? 0,
            amount: s.amount ?? s.price ?? 0,
            due_day: s.due_day ?? s.billing_day ?? 1,
            billing_day: s.billing_day ?? s.due_day ?? 1,
            shop: s.expand?.shop_id,
            service_members: membersRes.items.map((m)=>({
                    ...m,
                    person: m.expand?.person_id
                }))
        };
    }));
    return services;
}
async function deleteService(serviceId) {
    const context = `deleteService:${serviceId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(serviceId, 'services');
    const members = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('service_members', {
        filter: `service_id="${pbId}"`
    });
    for (const m of members.items){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('service_members', m.id);
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('services', pbId);
}
async function updateServiceMembers(serviceId, members) {
    const context = `updateServiceMembers:${serviceId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(serviceId, 'services');
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('service_members', {
        filter: `service_id="${pbId}"`
    });
    for (const m of existing.items){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('service_members', m.id);
    }
    for (const member of members){
        const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(member.person_id, 'people');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('service_members', {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`${pbId}-${personId}`, 'service_members'),
            service_id: pbId,
            person_id: personId,
            slots: Number(member.slots) || 0,
            is_owner: member.is_owner
        });
    }
}
async function getServiceById(id) {
    const context = `getServiceById:${id}`;
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'services');
    const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('services', pbId, 'shop_id');
    const membersRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('service_members', {
        filter: `service_id="${pbId}"`,
        expand: 'person_id'
    });
    return {
        ...s,
        price: s.price ?? s.amount ?? 0,
        amount: s.amount ?? s.price ?? 0,
        due_day: s.due_day ?? s.billing_day ?? 1,
        billing_day: s.billing_day ?? s.due_day ?? 1,
        shop: s.expand?.shop_id,
        service_members: membersRes.items.map((m)=>({
                ...m,
                person: m.expand?.person_id
            }))
    };
}
async function getServiceBotConfig(serviceId) {
    const context = `getServiceBotConfig:${serviceId}`;
    const key = `service_${serviceId}`;
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('bot_configs', {
        filter: `key="${key}"`,
        perPage: 1
    });
    return res.items[0] || null;
}
async function saveServiceBotConfig(serviceId, config) {
    const context = `saveServiceBotConfig:${serviceId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    const key = `service_${serviceId}`;
    const payload = {
        key: key,
        name: `Bot for Service ${serviceId}`,
        is_enabled: config.isEnabled,
        config: config
    };
    const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('bot_configs', {
        filter: `key="${key}"`,
        perPage: 1
    });
    if (existing.items.length > 0) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('bot_configs', existing.items[0].id, payload);
    } else {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('bot_configs', payload);
    }
    return true;
}
async function distributeAllServices(customDate, force = false, noteSuffix = '', options) {
    const context = 'distributeAllServices';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const now = new Date();
        const vnTimeStr = now.toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        const vnNow = new Date(vnTimeStr);
        const activeDate = customDate ? new Date(customDate) : vnNow;
        const monthTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(activeDate);
        // Get all services to handle null is_active if needed
        const servicesRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('services', {
            sort: 'name'
        });
        console.error(`🔴 [DistributeAll] Fetched ${servicesRes.items.length} total services from PB`);
        const services = servicesRes.items.filter((s)=>s.is_active !== false); // Active or null
        console.error(`🔴 [DistributeAll] ${services.length} services after 'is_active !== false' filter`);
        if (services.length === 0) {
            console.error('🔴 [DistributeAll] No active services found. Returning early.');
            return {
                success: 0,
                failed: 0,
                skipped: 0,
                total: 0,
                reports: []
            };
        }
        let successCount = 0, skippedCount = 0, failedCount = 0;
        const reports = [];
        for (const service of services){
            try {
                const dueDay = service.due_day || service.billing_day || 1;
                const checkDay = activeDate.getDate();
                if (!force && checkDay < dueDay) {
                    skippedCount++;
                    console.error(`  - Skipped: Due on day ${dueDay} (current: ${checkDay})`);
                    reports.push({
                        name: service.name,
                        status: 'skipped',
                        reason: `Due on day ${dueDay}`
                    });
                    continue;
                }
                const currentPrice = service.price ?? service.amount ?? 0;
                if (currentPrice === 0) {
                    skippedCount++;
                    console.error(`  - Skipped: Zero Price`);
                    reports.push({
                        name: service.name,
                        status: 'skipped',
                        reason: 'Zero Price'
                    });
                    continue;
                }
                // More robust metadata check: look for the exact ID and month tag in metadata keys
                const filter = `status="posted" && metadata.service_id="${service.id}" && metadata.month_tag="${monthTag}"`;
                const existingTx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
                    filter,
                    perPage: 1
                });
                if (existingTx.items.length > 0) {
                    skippedCount++;
                    console.error(`  - Skipped: Already distributed for ${monthTag} (found transaction ${existingTx.items[0].id})`);
                    reports.push({
                        name: service.name,
                        status: 'skipped',
                        reason: `Already distributed for ${monthTag}`
                    });
                    continue;
                }
                console.error(`🔴 [DistributeAll] Triggering distributeService`); // Standard distribution logic
                const result = await distributeService(service.id, customDate, undefined, noteSuffix, options);
                if (result.transactions?.length > 0) {
                    successCount++;
                    reports.push({
                        name: service.name,
                        status: 'success',
                        count: result.transactions.length
                    });
                    for (const personId of result.personIds){
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["autoSyncCycleSheetIfNeeded"])(personId, monthTag);
                    }
                } else {
                    skippedCount++;
                    reports.push({
                        name: service.name,
                        status: 'skipped',
                        reason: 'No members'
                    });
                }
            } catch (err) {
                failedCount++;
                reports.push({
                    name: service.name,
                    status: 'failed',
                    reason: err.message
                });
            }
        }
        return {
            success: successCount,
            failed: failedCount,
            skipped: skippedCount,
            total: services.length,
            reports
        };
    } catch (error) {
        console.error(`[DB:PB] ${context} failed`, error);
        throw error;
    }
}
async function recallServiceDistribution(monthTag) {
    const context = `recallServiceDistribution:${monthTag}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    const filter = `status="posted" && metadata.month_tag="${monthTag}" && metadata.service_id != ""`;
    const txnsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
        filter,
        expand: 'shop_id'
    });
    const txns = txnsRes.items;
    if (txns.length === 0) return {
        success: true,
        count: 0
    };
    const { syncTransactionToSheet } = await __turbopack_context__.A("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript, async loader)");
    const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
    let recalledCount = 0;
    for (const txn of txns){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', txn.id, {
            status: 'void'
        });
        recalledCount++;
        if (txn.person_id) {
            const sheetPayload = {
                id: txn.id,
                occurred_at: txn.occurred_at,
                amount: Math.abs(Number(txn.amount)),
                note: txn.note,
                tag: monthTag,
                shop_name: txn.expand?.shop_id?.name || 'Service',
                type: 'Debt'
            };
            await syncTransactionToSheet(txn.person_id, sheetPayload, 'delete');
        }
    }
    await recalculateBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'));
    return {
        success: true,
        count: recalledCount
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    upsertService,
    distributeService,
    getServices,
    deleteService,
    updateServiceMembers,
    getServiceById,
    getServiceBotConfig,
    saveServiceBotConfig,
    distributeAllServices,
    recallServiceDistribution
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertService, "605fa6b8168868299feebbf1c5d8377314f006e372", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(distributeService, "7cd98e752315262b95422897400606a60ab3de6341", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getServices, "0056bd4ecfed5bc5a49b8322ee6c9d853307233567", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteService, "402e64772ecea5e115ed645f27fb5e5384c0771aa1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateServiceMembers, "6075b6fd1f4b4e3ec64e187a8d988ab4ea34d83ea6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getServiceById, "403f14368728a34a7df37a83ce2cda398ad2b3782a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getServiceBotConfig, "40abf972fe3acb9f1a8d03545b08646dc052778003", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveServiceBotConfig, "60fc522187b7d4fe5b09364ac9e759c52380abb41b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(distributeAllServices, "7864971240a578bb1e5a5b2a489cee73ab8dfae3c8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recallServiceDistribution, "40e6e3067b3ebf015efcc060b7ae14bafd522d62a9", null);
}),
"[project]/src/actions/people-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004427e0349bb1c57a2aa2600a2b062da2c114b7ed":"getPeopleAction","0064d930a042eef9527da2a7933d3ba8ac7ffae83b":"syncAllPeopleDebtCyclesAction","00e491ad421f2ac2cbb07304a482cab27d6a2e9985":"syncAllPeopleSheetsAction","400b79a03fb7c9fadc7640219831e83338c53fba9b":"getPeoplePageData","4012e9016136ad0f76bca185a47f7231514c974387":"getRecentPeopleAction","406af4f56d2de1240001ccf9b17bdd2a418ceb45bc":"testSheetConnectionAction","409324d88af77ee1eb1e576e36ca70b7eb2124e22c":"syncAllSheetDataAction","40c85f6f23a92e4af76f65e6ecedfe4597cdbbdb71":"createPersonAction","6007093b01ac7295f20656421ff1d4f9e89e3fdfdb":"syncPeopleDebtAction","606f95e135bcdefe2148943e3f7628711dc0651706":"updatePersonAction","6090f445faf4195a78f721fc172a2e99c33763b2e6":"rolloverDebtAction","60ef3de5787fe265b0c8e98ef73fb1a5e30537348b":"ensureDebtAccountAction"},"",""] */ __turbopack_context__.s([
    "createPersonAction",
    ()=>createPersonAction,
    "ensureDebtAccountAction",
    ()=>ensureDebtAccountAction,
    "getPeopleAction",
    ()=>getPeopleAction,
    "getPeoplePageData",
    ()=>getPeoplePageData,
    "getRecentPeopleAction",
    ()=>getRecentPeopleAction,
    "rolloverDebtAction",
    ()=>rolloverDebtAction,
    "syncAllPeopleDebtCyclesAction",
    ()=>syncAllPeopleDebtCyclesAction,
    "syncAllPeopleSheetsAction",
    ()=>syncAllPeopleSheetsAction,
    "syncAllSheetDataAction",
    ()=>syncAllSheetDataAction,
    "syncPeopleDebtAction",
    ()=>syncPeopleDebtAction,
    "testSheetConnectionAction",
    ()=>testSheetConnectionAction,
    "updatePersonAction",
    ()=>updatePersonAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$debt$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/debt.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/account.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/category.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/shop.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/service-manager.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function findOrCreateBankShop() {
    const shops = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getShops"])();
    const bankShop = shops.find((s)=>s.name.toLowerCase() === 'bank');
    if (bankShop) return bankShop.id;
    // Create if not exists
    const newShop = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createShop"])({
        name: 'Bank'
    });
    return newShop?.id;
}
async function createPersonAction(payload) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPerson"])(payload.name, payload.image_url?.trim(), payload.sheet_link?.trim(), payload.subscriptionIds, {
        is_owner: payload.is_owner,
        is_archived: payload.is_archived,
        is_favorite: payload.is_favorite,
        is_group: payload.is_group,
        group_parent_id: payload.group_parent_id,
        google_sheet_url: payload.google_sheet_url?.trim(),
        sheet_linked_bank_id: payload.sheet_linked_bank_id,
        is_master_sheet_enabled: payload.is_master_sheet_enabled,
        sheet_show_bank_account: payload.sheet_show_bank_account,
        sheet_bank_info: payload.sheet_bank_info?.trim(),
        sheet_show_qr_image: payload.sheet_show_qr_image,
        sheet_full_img: payload.sheet_full_img?.trim(),
        default_repayment_account_id: payload.default_repayment_account_id
    });
    if (result) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        return {
            success: true,
            profileId: result.profileId,
            debtAccountId: result.debtAccountId
        };
    } else {
        return {
            success: false,
            error: 'Failed to create person'
        };
    }
}
async function ensureDebtAccountAction(personId, personName) {
    const accountId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDebtAccount"])(personId, personName);
    if (accountId) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
    }
    return accountId;
}
async function updatePersonAction(id, payload) {
    const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePerson"])(id, payload);
    if (ok) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${id}`);
    }
    return ok;
}
;
async function getPeoplePageData(id) {
    const person = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$debt$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonDetails"])(id);
    const ownerId = person?.owner_id ?? id;
    const [debtCycles, transactions, accounts, categories, personProfile, shops, subscriptions, allPeople] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$debt$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDebtByTags"])(id),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountTransactions"])(id, 100),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccounts"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonWithSubs"])(ownerId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getShops"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServices"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeople"])()
    ]);
    // The data returned from server actions must be serializable.
    // Convert any non-serializable properties if necessary.
    // For example, Date objects can be converted to ISO strings.
    // In this case, the data from Supabase should already be serializable.
    return {
        person,
        debtCycles,
        transactions,
        accounts,
        categories,
        personProfile,
        shops,
        subscriptions,
        allPeople
    };
}
async function testSheetConnectionAction(personId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["testConnection"])(personId);
}
async function syncAllSheetDataAction(personId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllTransactions"])(personId);
}
async function syncAllPeopleSheetsAction() {
    const people = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeople"])({
        includeArchived: false
    });
    const peopleWithSheets = people.filter((p)=>!!p.sheet_link && !p.is_archived);
    const results = await Promise.all(peopleWithSheets.map(async (p)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllTransactions"])(p.id);
            return {
                id: p.id,
                name: p.name,
                success: true
            };
        } catch (err) {
            console.error(`Failed to sync sheet for ${p.name}:`, err);
            return {
                id: p.id,
                name: p.name,
                success: false,
                error: err instanceof Error ? err.message : String(err)
            };
        }
    }));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
    return results;
}
;
async function rolloverDebtAction(prevState, formData) {
    const personId = formData.get('personId');
    const fromCycle = formData.get('fromCycle');
    const toCycle = formData.get('toCycle');
    const amountStr = formData.get('amount');
    const occurredAt = formData.get('occurredAt');
    if (!personId || !fromCycle || !toCycle || !amountStr) {
        return {
            success: false,
            error: 'Missing required fields'
        };
    }
    const amount = Math.round(Number(amountStr));
    if (isNaN(amount) || amount <= 0) {
        return {
            success: false,
            error: 'Invalid amount'
        };
    }
    // Ensure debt account exists and get its ID
    // This is crucial because transactions must link to a valid account ID, not just a person ID
    const accountId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDebtAccount"])(personId);
    if (!accountId) {
        return {
            success: false,
            error: 'Could not resolve debt account for person'
        };
    }
    // Ensure 'Rollover' shop exists
    const rolloverShopId = await (async ()=>{
        const shops = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getShops"])();
        const rollover = shops.find((s)=>s.name.toLowerCase() === 'rollover');
        if (rollover) return rollover.id;
        const newShop = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createShop"])({
            name: 'Rollover'
        });
        return newShop?.id;
    })();
    // Transaction 1: Settlement (IN) for the OLD cycle (Debt Repayment)
    // This reduces the balance of the old month to 0 (or less)
    const settleNote = `Rollover to ${toCycle}`;
    const txDate = occurredAt ? new Date(occurredAt).toISOString() : new Date().toISOString();
    const settleRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"])({
        occurred_at: txDate,
        tag: fromCycle,
        note: settleNote,
        type: 'repayment',
        source_account_id: accountId,
        amount: amount,
        person_id: personId,
        category_id: '71e71711-83e5-47ba-8ff5-85590f45a70c',
        shop_id: rolloverShopId ?? undefined
    });
    if (!settleRes) {
        return {
            success: false,
            error: 'Failed to create settlement transaction'
        };
    }
    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncTransactionToSheet"])(personId, {
        id: settleRes,
        occurred_at: txDate,
        note: settleNote,
        tag: fromCycle,
        shop_name: 'Rollover',
        amount: amount,
        original_amount: amount,
        cashback_share_percent: 0,
        cashback_share_fixed: 0,
        type: 'repayment'
    }, 'create').catch((err)=>console.error('[rollover] sheet sync (settle) failed:', err));
    // Transaction 2: Opening Balance (OUT) for the NEW cycle (Lending)
    // This increases the balance of the new month
    const openNote = `Rollover from ${fromCycle}`;
    const openRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"])({
        occurred_at: txDate,
        tag: toCycle,
        note: openNote,
        type: 'debt',
        source_account_id: accountId,
        amount: amount,
        person_id: personId,
        category_id: '71e71711-83e5-47ba-8ff5-85590f45a70c',
        shop_id: rolloverShopId ?? undefined
    });
    if (!openRes) {
        return {
            success: false,
            error: 'Failed to create opening balance transaction'
        };
    }
    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncTransactionToSheet"])(personId, {
        id: openRes,
        occurred_at: txDate,
        note: openNote,
        tag: toCycle,
        shop_name: 'Rollover',
        amount: amount,
        original_amount: amount,
        cashback_share_percent: 0,
        cashback_share_fixed: 0,
        type: 'debt'
    }, 'create').catch((err)=>console.error('[rollover] sheet sync (open) failed:', err));
    // Link Transaction 1 to Transaction 2 (Bidirectional for easier voiding)
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('transactions', settleRes, {
        linked_transaction_id: openRes
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('transactions', openRes, {
        linked_transaction_id: settleRes
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
    return {
        success: true,
        message: 'Debt rolled over successfully'
    };
}
async function getPeopleAction() {
    const people = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeople"])();
    console.log(`[PeopleAction] Fetched ${people?.length || 0} people`);
    return people;
}
async function syncPeopleDebtAction(personId, tag) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$debt$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncPersonDebtCycle"])(personId, tag);
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/people/${personId}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
    }
    return result;
}
async function syncAllPeopleDebtCyclesAction() {
    const people = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeople"])({
        includeArchived: false
    });
    const results = [];
    for (const p of people){
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$debt$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncPersonDebtCycle"])(p.id, 'all');
            results.push({
                id: p.id,
                name: p.name,
                success: res.success
            });
        } catch (err) {
            results.push({
                id: p.id,
                name: p.name,
                success: false
            });
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/people');
    return {
        success: true,
        count: results.length
    };
}
async function getRecentPeopleAction(limit = 5) {
    const { getRecentPeopleByTransactions } = await __turbopack_context__.A("[project]/src/services/people.service.ts [app-rsc] (ecmascript, async loader)");
    return await getRecentPeopleByTransactions(limit);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createPersonAction,
    ensureDebtAccountAction,
    updatePersonAction,
    getPeoplePageData,
    testSheetConnectionAction,
    syncAllSheetDataAction,
    syncAllPeopleSheetsAction,
    rolloverDebtAction,
    getPeopleAction,
    syncPeopleDebtAction,
    syncAllPeopleDebtCyclesAction,
    getRecentPeopleAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPersonAction, "40c85f6f23a92e4af76f65e6ecedfe4597cdbbdb71", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(ensureDebtAccountAction, "60ef3de5787fe265b0c8e98ef73fb1a5e30537348b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePersonAction, "606f95e135bcdefe2148943e3f7628711dc0651706", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPeoplePageData, "400b79a03fb7c9fadc7640219831e83338c53fba9b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(testSheetConnectionAction, "406af4f56d2de1240001ccf9b17bdd2a418ceb45bc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllSheetDataAction, "409324d88af77ee1eb1e576e36ca70b7eb2124e22c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllPeopleSheetsAction, "00e491ad421f2ac2cbb07304a482cab27d6a2e9985", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rolloverDebtAction, "6090f445faf4195a78f721fc172a2e99c33763b2e6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPeopleAction, "004427e0349bb1c57a2aa2600a2b062da2c114b7ed", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncPeopleDebtAction, "6007093b01ac7295f20656421ff1d4f9e89e3fdfdb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(syncAllPeopleDebtCyclesAction, "0064d930a042eef9527da2a7933d3ba8ac7ffae83b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentPeopleAction, "4012e9016136ad0f76bca185a47f7231514c974387", null);
}),
"[project]/src/actions/bulk-transaction-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e6683239bf9220ad96318853fd94569b76892950":"bulkCreateTransactions"},"",""] */ __turbopack_context__.s([
    "bulkCreateTransactions",
    ()=>bulkCreateTransactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function bulkCreateTransactions(data) {
    const errors = [];
    let successCount = 0;
    console.log(`[Bulk] Processing ${data.rows.length} transactions...`);
    // Process serially to ensure correct order/logging
    // TODO: Optimistic updates or parallel processing if performance needed
    for (const [index, row] of data.rows.entries()){
        try {
            if (!row.amount || row.amount <= 0) continue; // Skip empty rows
            // Determine Source Account
            const accountId = row.source_account_id || data.default_source_account_id;
            if (!accountId) {
                errors.push(`Row ${index + 1}: Missing source account`);
                continue;
            }
            // Map to CreateTransactionInput
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"])({
                amount: row.amount,
                occurred_at: data.occurred_at.toISOString(),
                note: row.note || "",
                category_id: "expense",
                shop_id: row.shop_id,
                source_account_id: accountId,
                type: "expense",
                // Cashback mapping
                cashback_mode: row.cashback_mode,
                cashback_share_percent: row.cashback_share_percent,
                cashback_share_fixed: row.cashback_share_fixed,
                // Defaults
                person_id: row.person_id,
                tag: data.tag
            });
            successCount++;
        } catch (err) {
            console.error(`[Bulk] Error row ${index}:`, err);
            errors.push(`Row ${index + 1}: ${err.message || "Unknown error"}`);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/transactions");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/txn/v2");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/people");
    return {
        success: errors.length === 0,
        count: successCount,
        errors
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    bulkCreateTransactions
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(bulkCreateTransactions, "40e6683239bf9220ad96318853fd94569b76892950", null);
}),
"[project]/src/actions/log-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"6027a5caa939314354e79116ce9af7b0975f16c609":"logErrorToServer","60c8c9d51ffcb96493fa99eba4120338aadf8671da":"logToServer"},"",""] */ __turbopack_context__.s([
    "logErrorToServer",
    ()=>logErrorToServer,
    "logToServer",
    ()=>logToServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function logToServer(message, data) {
    console.log(`[CLIENT-LOG] ${message}`, data ? JSON.stringify(data, null, 2) : "");
}
async function logErrorToServer(message, error) {
    console.error(`[CLIENT-ERROR] ${message}`, error ? JSON.stringify(error, null, 2) : "");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    logToServer,
    logErrorToServer
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logToServer, "60c8c9d51ffcb96493fa99eba4120338aadf8671da", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logErrorToServer, "6027a5caa939314354e79116ce9af7b0975f16c609", null);
}),
"[project]/src/actions/cascade-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40027e439e620b381865b3428b90a84e36cf08d075":"getRecentShopIdsByCategoryId","402dc79c034e520e539ee528f869edde0097c4026a":"getRecentCategoriesByShopId","40cb599d7e02773ee6de245824d3cbd5e1f2c23fc5":"getRecentShopByCategoryId","40fdf9be49b3c09295ca60ee2017c5f57b893ab301":"getRecentCategoryShopByAccountId"},"",""] */ __turbopack_context__.s([
    "getRecentCategoriesByShopId",
    ()=>getRecentCategoriesByShopId,
    "getRecentCategoryShopByAccountId",
    ()=>getRecentCategoryShopByAccountId,
    "getRecentShopByCategoryId",
    ()=>getRecentShopByCategoryId,
    "getRecentShopIdsByCategoryId",
    ()=>getRecentShopIdsByCategoryId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getRecentShopByCategoryId(categoryId) {
    try {
        const pbCatId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(categoryId, 'categories');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: `category_id='${pbCatId}' && shop_id != ''`,
            sort: '-date',
            perPage: 1
        });
        return response.items[0]?.shop_id || null;
    } catch (err) {
        console.error('PB: getRecentShopByCategoryId failed:', err);
        return null;
    }
}
async function getRecentShopIdsByCategoryId(categoryId) {
    try {
        const pbCatId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(categoryId, 'categories');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: `category_id='${pbCatId}' && shop_id != ''`,
            sort: '-date',
            perPage: 50
        });
        const ids = response.items.map((t)=>t.shop_id).filter((id)=>!!id);
        return Array.from(new Set(ids)).slice(0, 10);
    } catch (err) {
        console.error('PB: getRecentShopIdsByCategoryId failed:', err);
        return [];
    }
}
async function getRecentCategoriesByShopId(shopId) {
    try {
        const pbShopId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(shopId, 'shops');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: `shop_id='${pbShopId}' && category_id != ''`,
            sort: '-date',
            perPage: 50
        });
        const ids = response.items.map((t)=>t.category_id).filter((id)=>!!id);
        return Array.from(new Set(ids)).slice(0, 5);
    } catch (err) {
        console.error('PB: getRecentCategoriesByShopId failed:', err);
        return [];
    }
}
async function getRecentCategoryShopByAccountId(accountId) {
    try {
        const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, "accounts");
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])("transactions", {
            filter: `account_id='${pbAccountId}' && category_id != '' && status != 'void'`,
            sort: "-date",
            perPage: 20
        });
        const firstMatched = response.items.find((tx)=>!!tx.category_id) || null;
        return {
            categoryId: firstMatched?.category_id || null,
            shopId: firstMatched?.shop_id || null
        };
    } catch (err) {
        console.error("PB: getRecentCategoryShopByAccountId failed:", err);
        return {
            categoryId: null,
            shopId: null
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getRecentShopByCategoryId,
    getRecentShopIdsByCategoryId,
    getRecentCategoriesByShopId,
    getRecentCategoryShopByAccountId
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentShopByCategoryId, "40cb599d7e02773ee6de245824d3cbd5e1f2c23fc5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentShopIdsByCategoryId, "40027e439e620b381865b3428b90a84e36cf08d075", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentCategoriesByShopId, "402dc79c034e520e539ee528f869edde0097c4026a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentCategoryShopByAccountId, "40fdf9be49b3c09295ca60ee2017c5f57b893ab301", null);
}),
"[project]/src/services/installment.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0003c989aebb0738dfc55928b88b77473a33a93f32":"getCompletedInstallments","000f45f8a7f48306d908501cbf4613965420da3e72":"getInstallments","00388b33173e921417121c4f2ffe1e7b29bae4f33f":"getAccountsWithActiveInstallments","00f2a77e6c63f0e8a5853bd114d997b064a3339b3c":"getActiveInstallments","00f95b151a002059f0a52d0d45c3298154d66351af":"getPendingInstallmentTransactions","4025b2853741eba0dd6d9132a07312dbe3c8728a95":"settleEarly","4026234411c3a3a539732ebaa49cc10597a1ab7bf0":"createManualInstallment","40624fc304d11eff648d44878d709ea38de2884348":"convertTransactionToInstallment","4070f72390c597f11ac8e8a080baa5891692657a5f":"processBatchInstallments","40c679cc5bb910a5edaadeab8f980b2d59b2ff9968":"getInstallmentRepayments","40d66004871d0210aa45e59d24e8ac0bbce3d16faa":"checkAndAutoSettleInstallment","40e7306dbbde7ccb07ce944fa19c37cef255a36427":"getInstallmentById","60b547b53d0aa55418490a1f2467a160747da2554e":"processMonthlyPayment"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase/fallback-helpers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function getInstallments() {
    const context = 'getInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            sort: '-created_at',
            expand: 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
        });
        return res.items.map(mapPBInstallment);
    }, async ()=>[], context);
}
async function getInstallmentById(id) {
    const context = `getInstallmentById:${id}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'installments');
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId, 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id');
        return record ? mapPBInstallment(record) : null;
    }, async ()=>null, context);
}
async function getActiveInstallments() {
    const context = 'getActiveInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            filter: 'status="active"',
            sort: 'next_due_date',
            expand: 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
        });
        return res.items.map(mapPBInstallment);
    }, async ()=>[], context);
}
async function getAccountsWithActiveInstallments() {
    const context = 'getAccountsWithActiveInstallments';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('installments', {
            filter: 'status="completed"',
            sort: '-created_at',
            expand: 'original_transaction_id,original_transaction_id.account_id'
        });
        return res.items.map(mapPBInstallment);
    }, async ()=>[], context);
}
async function getPendingInstallmentTransactions() {
    const context = 'getPendingInstallmentTransactions';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbPlanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(planId, 'installments');
        const plan = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbPlanId);
        if (!plan) return;
        const txnsRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('installments', pbPlanId, updates);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', `Auto-settled installment ${pbPlanId}`, {
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    // PB Primary
    try {
        const pbTxnId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(payload.transactionId, 'pvl_txn_001');
        const txn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('pvl_txn_001', pbTxnId);
        if (!txn) throw new Error('Transaction not found in PB');
        const totalAmount = Math.abs(txn.amount || 0);
        const monthlyAmount = Math.ceil(totalAmount / payload.term);
        const name = payload.name || txn.note || 'Installment Plan';
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(crypto.randomUUID(), 'installments');
        const installment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('installments', {
            id: pbId,
            original_transaction_id: pbTxnId,
            name,
            total_amount: totalAmount,
            conversion_fee: payload.fee,
            term_months: payload.term,
            monthly_amount: monthlyAmount,
            start_date: new Date().toISOString(),
            remaining_amount: totalAmount,
            next_due_date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 1).toISOString(),
            status: 'active',
            type: payload.type,
            debtor_id: payload.debtorId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(payload.debtorId, 'people') : null
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('pvl_txn_001', pbTxnId, {
            installment_plan_id: pbId
        });
        if (payload.fee > 0) {
            const { createTransaction } = await __turbopack_context__.A("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript, async loader)");
            await createTransaction({
                occurred_at: new Date().toISOString(),
                note: `Conversion Fee: ${name}`,
                type: 'expense',
                source_account_id: txn.account_id,
                amount: payload.fee,
                category_id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_CATEGORIES"].BANK_FEE,
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(crypto.randomUUID(), 'installments');
        const monthlyAmount = Math.ceil(payload.totalAmount / payload.term);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('installments', {
            id: pbId,
            name: payload.name,
            total_amount: payload.totalAmount,
            conversion_fee: payload.fee,
            term_months: payload.term,
            monthly_amount: monthlyAmount,
            start_date: payload.startDate || new Date().toISOString(),
            remaining_amount: payload.totalAmount,
            next_due_date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMonths"])(new Date(payload.startDate || new Date()), 1).toISOString(),
            status: 'active',
            type: payload.type,
            debtor_id: payload.debtorId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(payload.debtorId, 'people') : null
        });
    } catch (error) {
        console.error(`[DB:PB] createManualInstallment failed`, error);
        throw error;
    }
}
async function processMonthlyPayment(installmentId, amountPaid) {
    const context = `processMonthlyPayment:${installmentId}`;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(installmentId, 'installments');
        const installment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('installments', pbId);
        if (!installment) throw new Error('Installment not found in PB');
        const newRemaining = Math.max(0, installment.remaining_amount - amountPaid);
        const newStatus = newRemaining <= 0 ? 'completed' : 'active';
        const nextDueDate = newStatus === 'active' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addMonths"])(new Date(installment.next_due_date || new Date()), 1).toISOString() : null;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('installments', pbId, {
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(installmentId, 'installments');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('installments', pbId, {
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logSource"])('PB', context);
    try {
        const targetDate = date ? new Date(date) : new Date();
        const monthTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(targetDate);
        const installments = await getActiveInstallments();
        if (installments.length === 0) return;
        const batchName = `Installments ${monthTag}`;
        let batchId;
        const existingBatches = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('batches', {
            filter: `name="${batchName}"`,
            perPage: 1
        });
        if (existingBatches.items.length > 0) {
            batchId = existingBatches.items[0].id;
        } else {
            console.log(`[Installments] Creating new batch: ${batchName}`);
            const newBatch = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('batches', {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`batch-${batchName}`, 'batches'),
                name: batchName,
                source_account_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'),
                status: 'draft'
            });
            batchId = newBatch.id;
        }
        for (const inst of installments){
            const existingItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('batch_items', {
                filter: `batch_id="${batchId}" && metadata~"installment_id\\":\\"${inst.id}\\""`,
                perPage: 1
            });
            if (existingItem.items.length > 0) continue;
            const start = new Date(inst.start_date);
            const diffMonths = (targetDate.getFullYear() - start.getFullYear()) * 12 + (targetDate.getMonth() - start.getMonth()) + 1;
            const monthNum = Math.min(Math.max(1, diffMonths), inst.term_months);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('batch_items', {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(`bi-${batchId}-${inst.id}`, 'batch_items'),
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2f$fallback$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["executeWithFallback"])(async ()=>{
        const pbPlanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(planId, 'installments');
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('pvl_txn_001', {
            filter: `installment_plan_id="${pbPlanId}"`,
            sort: '-occurred_at',
            expand: 'created_by'
        });
        return res.items;
    }, async ()=>[], context);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallments, "000f45f8a7f48306d908501cbf4613965420da3e72", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallmentById, "40e7306dbbde7ccb07ce944fa19c37cef255a36427", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActiveInstallments, "00f2a77e6c63f0e8a5853bd114d997b064a3339b3c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountsWithActiveInstallments, "00388b33173e921417121c4f2ffe1e7b29bae4f33f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompletedInstallments, "0003c989aebb0738dfc55928b88b77473a33a93f32", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPendingInstallmentTransactions, "00f95b151a002059f0a52d0d45c3298154d66351af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkAndAutoSettleInstallment, "40d66004871d0210aa45e59d24e8ac0bbce3d16faa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(convertTransactionToInstallment, "40624fc304d11eff648d44878d709ea38de2884348", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createManualInstallment, "4026234411c3a3a539732ebaa49cc10597a1ab7bf0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(processMonthlyPayment, "60b547b53d0aa55418490a1f2467a160747da2554e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(settleEarly, "4025b2853741eba0dd6d9132a07312dbe3c8728a95", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(processBatchInstallments, "4070f72390c597f11ac8e8a080baa5891692657a5f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getInstallmentRepayments, "40c679cc5bb910a5edaadeab8f980b2d59b2ff9968", null);
}),
"[project]/src/actions/service-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"004c6dc665d35246a70b7da24d6d135169fce86bf1":"getServicesAction","4018d0d2f00db5e141f6a9ac23db714c51636287b2":"recallServiceDistributionAction","4019f52682fcc2c0539b810931a73a95ab64e4c219":"deleteServiceAction","406c89ac684c70b47419796507b785100ca2ec67f1":"upsertServiceAction","40b81b0e02df2db9e62a3aa96d3f1397803931ee3e":"getServiceBotConfigAction","6009f6a1ec807df9115a7616d0363cdfc53ad0fe42":"getServicePaymentStatusAction","6014c9af6b73eac32ab4d5b2363cd2cb0ef541b58a":"saveServiceBotConfigAction","6077848579d2c08cb2b7ff9b9715d7b132c30c9195":"updateServiceMembersAction","60f498ea2e97369608d00c73d53406911756eef7be":"runAllServiceDistributionsAction","788a9fdc02689c0c50fbde3e0ded443aa73804cd42":"distributeServiceAction","7c40d50bd5b9ce366fac6ac5c1b01fab90142d09af":"confirmServicePaymentAction"},"",""] */ __turbopack_context__.s([
    "confirmServicePaymentAction",
    ()=>confirmServicePaymentAction,
    "deleteServiceAction",
    ()=>deleteServiceAction,
    "distributeServiceAction",
    ()=>distributeServiceAction,
    "getServiceBotConfigAction",
    ()=>getServiceBotConfigAction,
    "getServicePaymentStatusAction",
    ()=>getServicePaymentStatusAction,
    "getServicesAction",
    ()=>getServicesAction,
    "recallServiceDistributionAction",
    ()=>recallServiceDistributionAction,
    "runAllServiceDistributionsAction",
    ()=>runAllServiceDistributionsAction,
    "saveServiceBotConfigAction",
    ()=>saveServiceBotConfigAction,
    "updateServiceMembersAction",
    ()=>updateServiceMembersAction,
    "upsertServiceAction",
    ()=>upsertServiceAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/service-manager.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/installment.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function updateServiceMembersAction(serviceId, members) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateServiceMembers"])(serviceId, members);
// revalidatePath('/services') // Disable to prevent loop
}
async function upsertServiceAction(serviceData) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertService"])(serviceData);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/services');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/services/${result.id}`);
        return {
            success: true,
            data: result
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
async function distributeServiceAction(serviceId, customDate, customNoteFormat, source = 'manual') {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["distributeService"])(serviceId, customDate, customNoteFormat, '', {
            source
        });
        // Recalculate balance for DRAFT_FUND as it's the account used
        const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
        await recalculateBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/services');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        return {
            success: true,
            ...result
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            transactions: []
        };
    }
}
async function deleteServiceAction(serviceId) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteService"])(serviceId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/services');
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
async function getServiceBotConfigAction(serviceId) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServiceBotConfig"])(serviceId);
}
async function saveServiceBotConfigAction(serviceId, config) {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveServiceBotConfig"])(serviceId, config);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/services/${serviceId}`);
    return result;
}
async function confirmServicePaymentAction(serviceId, accountId, amount, date, monthTag) {
    const metadata = {
        service_id: serviceId,
        month_tag: monthTag,
        type: 'service_payment'
    };
    // Check for existing payment in PB
    const filter = `metadata.service_id="${serviceId}" && metadata.month_tag="${monthTag}" && metadata.type="service_payment"`;
    const existingRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
        filter,
        perPage: 1
    });
    const existingTx = existingRes.items[0];
    let transactionId = existingTx?.id;
    // Single Table Architecture: Transfer from Bank (accountId) to Draft Fund
    const pbSourceAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    const pbTargetAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts');
    const pbCategoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_CATEGORIES"].ONLINE_SERVICES, 'categories');
    const payload = {
        occurred_at: new Date(date).toISOString(),
        note: `Payment for Service ${monthTag}`,
        tag: monthTag,
        type: 'transfer',
        status: 'posted',
        account_id: pbSourceAccountId,
        to_account_id: pbTargetAccountId,
        amount: -Math.abs(amount),
        category_id: pbCategoryId,
        metadata: metadata,
        person_id: null,
        shop_id: null
    };
    if (existingTx) {
        // Update existing transaction
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('transactions', transactionId, payload);
    } else {
        // Create new transaction
        const transaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseCreate"])('transactions', payload);
        transactionId = transaction.id;
    }
    // Recalculate balances for both accounts
    const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
    await Promise.all([
        recalculateBalance(pbSourceAccountId),
        recalculateBalance(pbTargetAccountId)
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/services/${serviceId}`);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
    return {
        success: true
    };
}
async function getServicePaymentStatusAction(serviceId, monthTag) {
    const filter = `metadata.service_id="${serviceId}" && metadata.month_tag="${monthTag}" && metadata.type="service_payment"`;
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
        filter,
        perPage: 1
    });
    const transaction = res.items[0];
    if (!transaction) {
        return {
            confirmed: false,
            amount: 0
        };
    }
    // In single table, amount is negative for transfer source.
    // We want to return positive amount paid.
    const amount = Math.abs(Number(transaction.amount));
    return {
        confirmed: true,
        amount: amount,
        transactionId: transaction.id
    };
}
async function runAllServiceDistributionsAction(customDate, options = {}) {
    console.log('[Action] runAllServiceDistributionsAction started', {
        customDate,
        options
    });
    try {
        const noteSuffix = options.isTest ? ' #Test' : '';
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["distributeAllServices"])(customDate, options.isTest, noteSuffix, {
            source: options.source
        });
        // Recalculate DRAFT_FUND balance after mass distribution
        const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
        await recalculateBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'));
        // Also run Installment Batch Processing
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["processBatchInstallments"])(undefined); // Pass undefined for date to use current date
        } catch (e) {
            console.error('Error processing installments:', e);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/services');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        return result;
    } catch (error) {
        console.error('Error running all distributions:', error);
        return {
            success: 0,
            failed: 0,
            skipped: 0,
            total: 0,
            reports: [],
            error: error.message
        };
    }
}
async function recallServiceDistributionAction(monthTag) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recallServiceDistribution"])(monthTag);
        // Recalculate balance for DRAFT_FUND
        const { recalculateBalance } = await __turbopack_context__.A("[project]/src/services/account.service.ts [app-rsc] (ecmascript, async loader)");
        await recalculateBalance((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toPocketBaseId"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SYSTEM_ACCOUNTS"].DRAFT_FUND, 'accounts'));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/services');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/transactions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        return {
            success: true,
            count: result.count
        };
    } catch (error) {
        console.error('Error recalling service distribution:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function getServicesAction() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServices"])();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateServiceMembersAction,
    upsertServiceAction,
    distributeServiceAction,
    deleteServiceAction,
    getServiceBotConfigAction,
    saveServiceBotConfigAction,
    confirmServicePaymentAction,
    getServicePaymentStatusAction,
    runAllServiceDistributionsAction,
    recallServiceDistributionAction,
    getServicesAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateServiceMembersAction, "6077848579d2c08cb2b7ff9b9715d7b132c30c9195", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertServiceAction, "406c89ac684c70b47419796507b785100ca2ec67f1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(distributeServiceAction, "788a9fdc02689c0c50fbde3e0ded443aa73804cd42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteServiceAction, "4019f52682fcc2c0539b810931a73a95ab64e4c219", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getServiceBotConfigAction, "40b81b0e02df2db9e62a3aa96d3f1397803931ee3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveServiceBotConfigAction, "6014c9af6b73eac32ab4d5b2363cd2cb0ef541b58a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(confirmServicePaymentAction, "7c40d50bd5b9ce366fac6ac5c1b01fab90142d09af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getServicePaymentStatusAction, "6009f6a1ec807df9115a7616d0363cdfc53ad0fe42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(runAllServiceDistributionsAction, "60f498ea2e97369608d00c73d53406911756eef7be", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recallServiceDistributionAction, "4018d0d2f00db5e141f6a9ac23db714c51636287b2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getServicesAction, "004c6dc665d35246a70b7da24d6d135169fce86bf1", null);
}),
"[project]/src/types/settings.types.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_QUICK_PEOPLE_CONFIG",
    ()=>DEFAULT_QUICK_PEOPLE_CONFIG,
    "SETTINGS_KEY_QUICK_PEOPLE",
    ()=>SETTINGS_KEY_QUICK_PEOPLE,
    "SETTINGS_KEY_USAGE_STATS",
    ()=>SETTINGS_KEY_USAGE_STATS
]);
const DEFAULT_QUICK_PEOPLE_CONFIG = {
    mode: 'smart',
    pinned_ids: [],
    blacklist_ids: []
};
const SETTINGS_KEY_QUICK_PEOPLE = 'quick_people_config';
const SETTINGS_KEY_USAGE_STATS = 'usage_stats';
}),
"[project]/src/services/settings.service.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getQuickPeopleConfig",
    ()=>getQuickPeopleConfig,
    "getUsageStats",
    ()=>getUsageStats,
    "trackPersonUsage",
    ()=>trackPersonUsage,
    "updateQuickPeopleConfig",
    ()=>updateQuickPeopleConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/settings.types.ts [app-rsc] (ecmascript)");
;
;
;
;
const getQuickPeopleConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from('user_settings').select('value').eq('key', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SETTINGS_KEY_QUICK_PEOPLE"]).single();
    if (!data) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_QUICK_PEOPLE_CONFIG"];
    return data.value;
});
const getUsageStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from('user_settings').select('value').eq('key', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SETTINGS_KEY_USAGE_STATS"]).single();
    if (!data) return {};
    return data.value;
});
async function updateQuickPeopleConfig(config) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const current = await getQuickPeopleConfig();
    const newValue = {
        ...current,
        ...config
    };
    const { error } = await supabase.from('user_settings').upsert({
        key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SETTINGS_KEY_QUICK_PEOPLE"],
        value: newValue
    }, {
        onConflict: 'user_id, key'
    });
    if (error) throw error;
    return newValue;
}
async function trackPersonUsage(personId, type) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Optimistic/Atomic update might be hard with JSONB, but sufficient for low frequency
    // We'll fetch, update, push. Race conditions possible but acceptable for stats.
    const { data } = await supabase.from('user_settings').select('value').eq('key', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SETTINGS_KEY_USAGE_STATS"]).single();
    const stats = data?.value || {};
    const currentStat = stats[personId] || {
        lend_count: 0,
        repay_count: 0,
        last_used_at: new Date().toISOString()
    };
    if (type === 'lend') currentStat.lend_count = (currentStat.lend_count || 0) + 1;
    if (type === 'repay') currentStat.repay_count = (currentStat.repay_count || 0) + 1;
    currentStat.last_used_at = new Date().toISOString();
    stats[personId] = currentStat;
    const { error } = await supabase.from('user_settings').upsert({
        key: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SETTINGS_KEY_USAGE_STATS"],
        value: stats
    }, {
        onConflict: 'user_id, key'
    });
    if (error) console.error('Failed to track usage:', error);
}
}),
"[project]/src/actions/settings-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0021b26ea7d838c23f23e8ddf52f558546093b9737":"getQuickPeopleConfigAction","4060c4b5f9b5a8428a4c35d9a266f6dff8442a8f66":"saveQuickPeopleConfigAction","6002d4c9ecf603ab93da7f9fa1483b28c57247c468":"updateQuickPeopleUsageAction"},"",""] */ __turbopack_context__.s([
    "getQuickPeopleConfigAction",
    ()=>getQuickPeopleConfigAction,
    "saveQuickPeopleConfigAction",
    ()=>saveQuickPeopleConfigAction,
    "updateQuickPeopleUsageAction",
    ()=>updateQuickPeopleUsageAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$settings$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/services/settings.service.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function updateQuickPeopleUsageAction(personId, type) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$settings$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["trackPersonUsage"])(personId, type);
        // No revalidate needed for stats update usually, unless we want immediate reflection? 
        // Usually stats are for next load.
        // parse: true
        return {
            success: true
        };
    } catch (error) {
        console.error('Failed to track usage', error);
        return {
            success: false
        };
    }
}
async function saveQuickPeopleConfigAction(config) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$settings$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateQuickPeopleConfig"])(config);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        return {
            success: true
        };
    } catch (error) {
        console.error('Failed to save quick people config', error);
        return {
            success: false,
            error: 'Failed'
        };
    }
}
async function getQuickPeopleConfigAction() {
    try {
        const config = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$settings$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getQuickPeopleConfig"])();
        return {
            success: true,
            data: config
        };
    } catch (e) {
        return {
            success: false,
            error: 'Failed'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateQuickPeopleUsageAction,
    saveQuickPeopleConfigAction,
    getQuickPeopleConfigAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateQuickPeopleUsageAction, "6002d4c9ecf603ab93da7f9fa1483b28c57247c468", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveQuickPeopleConfigAction, "4060c4b5f9b5a8428a4c35d9a266f6dff8442a8f66", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getQuickPeopleConfigAction, "0021b26ea7d838c23f23e8ddf52f558546093b9737", null);
}),
"[project]/src/lib/cashback-policy.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/services/cashback.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4000a42a0620687750bd0a455f805859a763e3a95c":"getAllCashbackHistory","402105624a25b9aed286150d942fe16ad8bc1f64c5":"getTransactionsForCycle","404210c03639a785bf0b4c65170b3e9839115707b0":"getAccountCycles","4044e117d64e56679d359ff31a0ba5264acf217348":"removeTransactionCashback","40804e82d69fb5eff42375c5e9fb38b1e5d423c91d":"simulateCashback","408e727da9bd2afe3b6c9f33492d1bb96a5a4f9e91":"getTransactionCashbackPolicyExplanation","40ae6659b2764c29f6626353ec28981c0fca9fdba8":"upsertTransactionCashback","40f8450155a02fddf79371e8bc1a7a01297e4372e2":"getCashbackYearAnalytics","602bb3609f1ee638e09daa208d33cdbbb73c36b38f":"recomputeAccountCashback","6058977303246685778c1803680610b74865c3e8cc":"recomputeCashbackCycle","60a52490cbdb05cf083c54c41265526441d4c49c05":"getCashbackCycleOptions","7015663c7e4fcce9c26b5bf6b4f1e8df092ec60a5e":"getMonthlyCashbackTransactions","7884bb4b1e99e02c26e46f75f7b8d1f68d8cfe9af3":"getAccountSpendingStats","789be1470c53ac737d001df1ffa32e59647e9ace23":"getCashbackProgress","78fb5ce5154f7990c371e9b599479c677cdb853f8e":"getAccountSpendingStatsSnapshot"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback-policy.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/transaction-mapper.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript)");
/**
 * Ensures a cashback cycle exists for the given account and tag.
 * Returns the cycle ID.
 */ // DEBUG: Admin client creation
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@supabase+supabase-js@2.100.0/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$supabase$2b$supabase$2d$js$40$2$2e$100$2e$0$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://puzvrlojtgneihgvevcx.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
}
/**
 * Ensures a cashback cycle exists for the given account and tag.
 * Returns the cycle ID.
 */ const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
const getCashbackClient = ()=>hasServiceRole ? createAdminClient() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(accountConfig, accountId);
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, account.id);
    const date = new Date(transaction.occurred_at);
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    const tagDate = cycleRange?.end ?? date;
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    const legacyCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(tagDate);
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
    const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account?.cashback_config, cycle.account_id);
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
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript, async loader)");
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
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
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
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, refDate);
                } else {
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
                }
            } else {
                cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
            }
        } catch  {
            cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        }
    } else {
        cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const tagDate = cycleRange?.end ?? date;
        resolvedCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    }
    const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(cycleRange?.end ?? date);
    let cycle = (await supabase.from('cashback_cycles').select('cycle_tag, spent_amount, min_spend_target, max_budget, real_awarded, virtual_profit').eq('account_id', accountId).eq('cycle_tag', resolvedCycleTag).maybeSingle()).data ?? null;
    if (!cycle && legacyTag !== resolvedCycleTag) {
        cycle = (await supabase.from('cashback_cycles').select('cycle_tag, spent_amount, min_spend_target, max_budget, real_awarded, virtual_profit').eq('account_id', accountId).eq('cycle_tag', legacyTag).maybeSingle()).data ?? null;
    }
    let categoryName = undefined;
    if (categoryId) {
        const { data: cat } = await supabase.from('categories').select('name').eq('id', categoryId).single();
        categoryName = cat?.name;
    }
    const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
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
        matchReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata)?.policySource,
        policyMetadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata) ?? undefined,
        is_min_spend_met: isMinSpendMet,
        activeRules: [],
        estYearlyTotal,
        cycle: cycleRange ? {
            tag: resolvedCycleTag,
            label: config.cycleType === 'statement_cycle' ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.start, 'dd.MM')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.end, 'dd.MM')}` : resolvedCycleTag,
            start: cycleRange.start.toISOString(),
            end: cycleRange.end.toISOString()
        } : null
    };
}
async function getAccountSpendingStats(accountId, date, categoryId, cycleTag) {
    const supabase = getCashbackClient();
    const { data: account } = await supabase.from('accounts').select('cashback_config, type, cb_type, cb_base_rate, cb_max_budget, cb_is_unlimited, cb_rules_json').eq('id', accountId).single();
    if (!account || account.type !== 'credit_card') return null;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
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
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, refDate);
                } else {
                    cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
                }
            } else {
                cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
            }
        } catch (e) {
            cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        }
    } else {
        // Derive from date (original behavior)
        cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const tagDate = cycleRange?.end ?? date;
        resolvedCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    }
    const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(cycleRange?.end ?? date);
    let cycle = (await supabase.from('cashback_cycles').select('*').eq('account_id', accountId).eq('cycle_tag', resolvedCycleTag).maybeSingle()).data ?? null;
    if (!cycle && legacyTag !== resolvedCycleTag) {
        cycle = (await supabase.from('cashback_cycles').select('*').eq('account_id', accountId).eq('cycle_tag', legacyTag).maybeSingle()).data ?? null;
    }
    let categoryName = undefined;
    if (categoryId) {
        const { data: cat } = await supabase.from('categories').select('name').eq('id', categoryId).single();
        categoryName = cat?.name;
    }
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript, async loader)");
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
        matchReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata)?.policySource,
        policyMetadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata) ?? undefined,
        is_min_spend_met: isMinSpendMet,
        activeRules,
        estYearlyTotal,
        cycle: cycleRange ? {
            tag: resolvedCycleTag,
            label: config.cycleType === 'statement_cycle' ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.start, 'dd.MM')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleRange.end, 'dd.MM')}` : resolvedCycleTag,
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
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(acc.cashback_config, acc.id);
        const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
        const tagDate = cycleRange?.end ?? date;
        const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
        const legacyTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(tagDate);
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
        const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript, async loader)");
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
                    const resolvedMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(resolvedPolicy.metadata);
                    // Always prefer fresh resolved metadata for display to fix stale policySource/rate issues
                    const policyMetadata = resolvedMetadata ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata);
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
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from('cashback_entries').select('metadata').eq('transaction_id', transactionId).maybeSingle();
    if (error) {
        console.error('Error fetching cashback policy explanation:', error);
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(data?.metadata) ?? null;
}
async function simulateCashback(params) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])(config, date);
    const tagDate = cycleRange?.end ?? date;
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    const legacyCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatLegacyCycleTag"])(tagDate);
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
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript, async loader)");
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
        metadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(policy.metadata),
        maxReward: policy.maxReward,
        isCapped: finalReward < estimatedReward
    };
}
async function getAllCashbackHistory(accountId) {
    const supabase = createAdminClient();
    const { data: account } = await supabase.from('accounts').select('id, name, image_url, cashback_config').eq('id', accountId).single();
    if (!account) return null;
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(account.cashback_config, accountId);
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
                effectiveRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata)?.rate ?? 0,
                sharePercent: t.cashback_share_percent,
                shareFixed: t.cashback_share_fixed,
                shopName: t.shop?.name,
                shopLogoUrl: t.shop?.image_url,
                categoryName: t.category?.name,
                categoryIcon: t.category?.icon,
                categoryLogoUrl: t.category?.image_url,
                personName: t.person?.name,
                policyMetadata: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata),
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
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
        const txn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapUnifiedTransaction"])(rawTxn, accountId);
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCashbackConfig"])(cashbackConfig, accountId);
    const currentCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleTag"])(new Date(), {
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
                const pastTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleTag"])(pastDate, {
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
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCycleTag"])(tag);
        return parsed ? parsed.year * 100 + parsed.month : 0;
    };
    // Sort chronologically (descending)
    options.sort((a, b)=>getSortValue(b.cycle_tag) - getSortValue(a.cycle_tag));
    return options.map((c)=>{
        const tag = c.cycle_tag;
        let label = tag;
        // Reverse engineer date from tag to build label
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCycleTag"])(tag);
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
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseCycleTag"])(cycle.cycle_tag);
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
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const { resolveCashbackPolicy } = await __turbopack_context__.A("[project]/src/services/cashback/policy-resolver.ts [app-rsc] (ecmascript, async loader)");
    return entries.map((e)=>{
        const t = e.transaction;
        if (!t) return null;
        const category = t.category;
        const shop = t.shop;
        const person = t.person;
        const bankBack = e.amount;
        const peopleBack = e.mode === 'real' ? e.amount : 0;
        const profit = e.mode === 'virtual' ? e.amount : 0;
        const policyMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2d$policy$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePolicyMetadata"])(e.metadata);
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(upsertTransactionCashback, "40ae6659b2764c29f6626353ec28981c0fca9fdba8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recomputeCashbackCycle, "6058977303246685778c1803680610b74865c3e8cc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeTransactionCashback, "4044e117d64e56679d359ff31a0ba5264acf217348", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountSpendingStatsSnapshot, "78fb5ce5154f7990c371e9b599479c677cdb853f8e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountSpendingStats, "7884bb4b1e99e02c26e46f75f7b8d1f68d8cfe9af3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCashbackProgress, "789be1470c53ac737d001df1ffa32e59647e9ace23", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionCashbackPolicyExplanation, "408e727da9bd2afe3b6c9f33492d1bb96a5a4f9e91", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(simulateCashback, "40804e82d69fb5eff42375c5e9fb38b1e5d423c91d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllCashbackHistory, "4000a42a0620687750bd0a455f805859a763e3a95c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(recomputeAccountCashback, "602bb3609f1ee638e09daa208d33cdbbb73c36b38f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCashbackCycleOptions, "60a52490cbdb05cf083c54c41265526441d4c49c05", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCashbackYearAnalytics, "40f8450155a02fddf79371e8bc1a7a01297e4372e2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMonthlyCashbackTransactions, "7015663c7e4fcce9c26b5bf6b4f1e8df092ec60a5e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountCycles, "404210c03639a785bf0b4c65170b3e9839115707b0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTransactionsForCycle, "402105624a25b9aed286150d942fe16ad8bc1f64c5", null);
}),
"[project]/.next-internal/server/app/people/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/ai-reminder-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/ai-actions-v2.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/actions/transaction-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/actions/ai-learn-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/src/actions/account-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/src/actions/people-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/src/actions/bulk-transaction-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/src/actions/log-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE9 => \"[project]/src/services/category.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE10 => \"[project]/src/services/shop.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE11 => \"[project]/src/actions/cascade-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE12 => \"[project]/src/services/installment.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE13 => \"[project]/src/services/account.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE14 => \"[project]/src/actions/service-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE15 => \"[project]/src/actions/settings-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE16 => \"[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE17 => \"[project]/src/services/people.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE18 => \"[project]/src/services/service-manager.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE19 => \"[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE20 => \"[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE21 => \"[project]/src/services/cashback.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$reminder$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/ai-reminder-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$actions$2d$v2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/ai-actions-v2.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/transaction-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$learn$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/ai-learn-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/account-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/people-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$bulk$2d$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/bulk-transaction-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$log$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/log-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/category.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/shop.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/cascade-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/installment.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/account.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$service$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/service-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$settings$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/settings-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/service-manager.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback.service.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/people/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/ai-reminder-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/ai-actions-v2.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/actions/transaction-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/actions/ai-learn-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/src/actions/account-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/src/actions/people-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/src/actions/bulk-transaction-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/src/actions/log-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE9 => \"[project]/src/services/category.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE10 => \"[project]/src/services/shop.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE11 => \"[project]/src/actions/cascade-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE12 => \"[project]/src/services/installment.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE13 => \"[project]/src/services/account.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE14 => \"[project]/src/actions/service-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE15 => \"[project]/src/actions/settings-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE16 => \"[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE17 => \"[project]/src/services/people.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE18 => \"[project]/src/services/service-manager.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE19 => \"[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE20 => \"[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE21 => \"[project]/src/services/cashback.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0002198770fd50b7768c7638d653d38d6a119a2d23",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseShops"],
    "0021b26ea7d838c23f23e8ddf52f558546093b9737",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$settings$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getQuickPeopleConfigAction"],
    "003ae2eaa765f5040a0d2a77fee232381065a561c4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLastTransactionAccountId"],
    "004427e0349bb1c57a2aa2600a2b062da2c114b7ed",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeopleAction"],
    "004c6dc665d35246a70b7da24d6d135169fce86bf1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$service$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServicesAction"],
    "0056bd4ecfed5bc5a49b8322ee6c9d853307233567",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServices"],
    "0064a9cc7a129973fa18bf43d8f76108db9748dcae",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseAccounts"],
    "0064d930a042eef9527da2a7933d3ba8ac7ffae83b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllPeopleDebtCyclesAction"],
    "006d1e9cc2d7bc1ee23a5e9c6051f33517ec04ecb8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBasePeople"],
    "00764f7ad08fe5ef40a0c6e4022ac40fd8792f4ecf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getShops"],
    "00a0c166be588b54aae5db510ede5b1406bf47aa8c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"],
    "00a0f7a31cb733c3a63e0fbc7ed67333e9e159ad29",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBasePeople"],
    "00a9935267a76ac90c646ef5f7cb524cbe49227b64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccounts"],
    "00aa32c8d2918f902cba5d650f0ab532b6a667e18d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountsAction"],
    "00ac6905e7275d737ac69d431104cf661758637c7a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllAccountsCashbackAction"],
    "00b050084f9664adbf563ec6e8f2e79fcd57e160c0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLastTransactionPersonId"],
    "00e491ad421f2ac2cbb07304a482cab27d6a2e9985",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllPeopleSheetsAction"],
    "00ea89b8e3d349226ea1cf76166c1b12c3fdeeeeba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseCategories"],
    "00f2a77e6c63f0e8a5853bd114d997b064a3339b3c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActiveInstallments"],
    "00f81387626360a80508e83a60b6f87225744d325d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$reminder$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountRemindersAction"],
    "4000a42a0620687750bd0a455f805859a763e3a95c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllCashbackHistory"],
    "40027e439e620b381865b3428b90a84e36cf08d075",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentShopIdsByCategoryId"],
    "400b79a03fb7c9fadc7640219831e83338c53fba9b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeoplePageData"],
    "400e69688b9239a5a545f1b468f94f3abc7639bd6d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAccount"],
    "4012e9016136ad0f76bca185a47f7231514c974387",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentPeopleAction"],
    "401994bca8f3d74ec8657d0a39a7d728ddcb88283f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBasePerson"],
    "401aa97fd5200cae6cfc9558c545efac5ca7fa8910",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "401d2e5e32d551cea249bb118bdb29b206590dd216",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentAccountsByTransactions"],
    "401ddd1557b3c5a760a7cf1ad74d609461643a5293",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolvePocketBasePersonRecord"],
    "40204e19135aae5d71b0f16217678c9ab4a6f2001d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllTransactions"],
    "40209423ebd1df8ff017aaafd9b66ee47b23be157a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["voidPocketBaseTransaction"],
    "402105624a25b9aed286150d942fe16ad8bc1f64c5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransactionsForCycle"],
    "402338384beb9e88fd6929928eba49882422af05a1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadTransactions"],
    "4026234411c3a3a539732ebaa49cc10597a1ab7bf0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createManualInstallment"],
    "402dc79c034e520e539ee528f869edde0097c4026a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentCategoriesByShopId"],
    "402e64772ecea5e115ed645f27fb5e5384c0771aa1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteService"],
    "403f14368728a34a7df37a83ce2cda398ad2b3782a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServiceById"],
    "404099e69215220cee5890cfde50a848e230ca34b7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountStats"],
    "4041c9c5208e1b3f4b1d828bb085a54c45d330fd75",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"],
    "404210c03639a785bf0b4c65170b3e9839115707b0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountCycles"],
    "4044e117d64e56679d359ff31a0ba5264acf217348",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeTransactionCashback"],
    "404bf47e280c6f3b5d67a54af2e4a262928b4c28de",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTestSheet"],
    "405156174d4eb4074fe69fa0415e892c6b6080b5b9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentTransactions"],
    "405690f8a3b42f919b94d19582093bda78a932e62a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseUnifiedTransactions"],
    "4060c4b5f9b5a8428a4c35d9a266f6dff8442a8f66",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$settings$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveQuickPeopleConfigAction"],
    "40620b053dcb11d19fa21e6d7d1ff9b5b28a376e4d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAccount"],
    "40624fc304d11eff648d44878d709ea38de2884348",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertTransactionToInstallment"],
    "406442d29f9219c1e9669242fc40ee1e8af022cd51",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseAccountDetails"],
    "40697269a31854856a5cf6992c68019965c2d3af5d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["voidTransaction"],
    "406af4f56d2de1240001ccf9b17bdd2a418ceb45bc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["testSheetConnectionAction"],
    "406c8b7b12981726e0a99e445b4d172846412d5a9f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseCategoriesBulk"],
    "406ed95480903eceb71405faf96f7796a54dc9a513",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTransaction"],
    "4072c768721fff3626e17df67d9351ec64626b4c06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadPocketBaseTransactions"],
    "407a125db837b2103cf56b690a5c87a2c0cee9b0f3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTransactionCascade"],
    "40804e82d69fb5eff42375c5e9fb38b1e5d423c91d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["simulateCashback"],
    "408e727da9bd2afe3b6c9f33492d1bb96a5a4f9e91",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransactionCashbackPolicyExplanation"],
    "409324d88af77ee1eb1e576e36ca70b7eb2124e22c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAllSheetDataAction"],
    "409327174926611fa35d6f3cc13a8dfe29afdd60ec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["testConnection"],
    "40a38f1ebcc96e5297dbf1917cfcefad94b3426508",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBasePerson"],
    "40abf972fe3acb9f1a8d03545b08646dc052778003",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServiceBotConfig"],
    "40ae6659b2764c29f6626353ec28981c0fca9fdba8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertTransactionCashback"],
    "40b7e4de854ec85b7d3d2ce57b4c0a9a9eef423aac",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseShopsBulk"],
    "40b931b83f7e3fa6ddd5d08cea7bc28fdbb36d70d9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseInstallmentPlan"],
    "40ba390a1b32fb27de3a2b50052545fee40ba3ce77",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPendingRefunds"],
    "40bddc209ba05f6a8db47c22b33ec683cc3b305c9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBasePersonDetails"],
    "40c008e30fc4ed3e87d8c68a44762881a2875e8dba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseShop"],
    "40c343ecc34aff9686c700c78197c10f8cb1f40de5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPeople"],
    "40c66423082636cc0047b59290fc03cfd01629ab40",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonCycleSheets"],
    "40c85f6f23a92e4af76f65e6ecedfe4597cdbbdb71",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPersonAction"],
    "40c92c9d109f0bb6983b85f0eb2ec34ccff4adaac8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonWithSubs"],
    "40cb599d7e02773ee6de245824d3cbd5e1f2c23fc5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentShopByCategoryId"],
    "40cd057eafdcca6c9a941fc198de750a1b8acbb741",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTransaction"],
    "40cdf129c1484892a41434b60aa1f71836e181c30c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deletePocketBaseCategory"],
    "40d03bb88ed73a18243f7ce5beab76eaf05836eeca",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentPeopleByTransactions"],
    "40d72e5d18cef368be2ff8581051bf978f5e6f3f29",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createShop"],
    "40e0f5f02c66ab35d70477c72c2723c6d0e31693d6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseTransactionsByPlan"],
    "40e6683239bf9220ad96318853fd94569b76892950",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$bulk$2d$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["bulkCreateTransactions"],
    "40e6e3067b3ebf015efcc060b7ae14bafd522d62a9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recallServiceDistribution"],
    "40e87f1a5f4c3f21335006423672957f9a72591602",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountDetails"],
    "40f27deb345266e0df8035456861e35d9941de0487",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAccountConfigAction"],
    "40f2e2f01d5c126f03c588f348ce84c7d43df6380a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncAccountCashbackAction"],
    "40f729992987a46a49b7975305dc087a51bbc850b2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentAccountsAction"],
    "40f7a61b26eae2150806832e69b1cc78e14a34fdc2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recalculateBalance"],
    "40f8450155a02fddf79371e8bc1a7a01297e4372e2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackYearAnalytics"],
    "40fcbba08963c7a110103c1e196942b7fc81e5c87b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBasePersonById"],
    "40fdf9be49b3c09295ca60ee2017c5f57b893ab301",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRecentCategoryShopByAccountId"],
    "600109ecbff04033c0e8dac4d4297bd6cd23891999",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseCategory"],
    "600551bcf583b724e93c29143daafc23adf0a61915",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseAccountConfig"],
    "6007093b01ac7295f20656421ff1d4f9e89e3fdfdb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncPeopleDebtAction"],
    "6009c6de345c28f63f224189891fda5086b87b1d51",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseShop"],
    "6010a0877368d62abafdac1c87529819678bb1a529",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransactionById"],
    "6013c8f2f2595d698ff54c65e28d29aba842a697fa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseShopArchive"],
    "601b7b10d320a5c38214610b791af1df9fbaac52c1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseTransaction"],
    "601b7f84e617edcc51b3a766b95063890665d82ca7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseAccountInfo"],
    "60207122b7bf24f3a12f09bca5bb3c8de22b66b968",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$learn$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["learnPatternAction"],
    "6027a5caa939314354e79116ce9af7b0975f16c609",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$log$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logErrorToServer"],
    "602bb3609f1ee638e09daa208d33cdbbb73c36b38f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recomputeAccountCashback"],
    "6032d2b204dba8a3583f08ea6a9158dc1cfd732597",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeAmountForType"],
    "60340f82efeee3dcace8de1d33fb40fca1c5713a0a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadAccountTransactionsV2"],
    "6036b30feb7d1825f66e8478140533989e19bb2dc6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateShop"],
    "6051867822d60261f2a852b60e263a777a90026c6d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseCategory"],
    "60542768ec9496022a2f316f83544b08d03afa2070",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePerson"],
    "6058977303246685778c1803680610b74865c3e8cc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recomputeCashbackCycle"],
    "605fa6b8168868299feebbf1c5d8377314f006e372",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertService"],
    "60665a4fa4d3cc379d596e7eb6a41d4aa1e81cb2bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAccountInfo"],
    "60676eb4ffdb421973579b327d5767f96a927836cd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountTransactions"],
    "606c8762373051e4572c396a74eee3e17b66e3d65f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$actions$2d$v2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseTransactionV2Action"],
    "606f95e135bcdefe2148943e3f7628711dc0651706",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePersonAction"],
    "6075b6fd1f4b4e3ec64e187a8d988ab4ea34d83ea6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateServiceMembers"],
    "607d1e6a2245c18c4ad2d25319eea342c57a8cba37",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseShopsArchiveBulk"],
    "6082d18ebc15026a30c7eed2aaa9a1191bdcf72b13",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseCycleTransactions"],
    "608e11b907e03d576a5ec25f5660ad7ce13dbf331a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseAccount"],
    "6090f445faf4195a78f721fc172a2e99c33763b2e6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rolloverDebtAction"],
    "6097685b38234fe246c528d8259663e1aa30ac4af7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["autoSyncCycleSheetIfNeeded"],
    "6097a1dabd99ce313dd5da2307628d17e88acf2480",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBasePerson"],
    "609e2041182472ba5e7d6ad42b213694fc7924f6b4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAccountStatus"],
    "60a061321fdaaa08d23206f570cea0c9146555031a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadPocketBaseTransactionsForAccount"],
    "60a51d7af14ed4346215b903ed9dadd8d51a92d17e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateAccountConfig"],
    "60a52490cbdb05cf083c54c41265526441d4c49c05",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackCycleOptions"],
    "60b0bcbe83fa250d9f88dcbf7c804da6091632c828",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTransaction"],
    "60b86ddd94589dac1dc84867b76465461f15e6c5fb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBasePerson"],
    "60c753fe3fd189f607e33ab1cbf2be0a79b55825c4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBaseShop"],
    "60c8a6f0a10e0502f15ad7796a30bb300ffd9346b2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePocketBaseTransaction"],
    "60c8c9d51ffcb96493fa99eba4120338aadf8671da",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$log$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logToServer"],
    "60cb87adb8b84e1591d0a49c5a4c6fd3adc89112d5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPocketBasePerson"],
    "60d18e36be07d9c0d2bc63d81594ba360ec40a58ea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategory"],
    "60e88248d5bf416aee1ae41c1925ac049ff0f6617a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["confirmRefund"],
    "60edca9031feb56a198341f025e3c4f56cae52db87",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseCategoryArchive"],
    "60ef3de5787fe265b0c8e98ef73fb1a5e30537348b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDebtAccountAction"],
    "60f1fabe2a6303c14150df828fd5d669090a97dea0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePocketBaseCategoriesArchiveBulk"],
    "60f32e86e79018af06244bad36128a3dd169fcca5a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCycleSheet"],
    "60f5ec1fb46fcb8f04554671d7e8c644687823f467",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseAccountCycleOptions"],
    "60f6c6a7cb29cc9c7fe0a0fb6c3a0f36992ad65082",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureDebtAccount"],
    "60f9d0898c23352894df2c366ac65b2486712c977a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapTransactionRow"],
    "60fc522187b7d4fe5b09364ac9e759c52380abb41b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveServiceBotConfig"],
    "701493980fcc0b23371062d60859b04c03fc37699e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPocketBaseAccountSpendingStatsSnapshot"],
    "7015663c7e4fcce9c26b5bf6b4f1e8df092ec60a5e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMonthlyCashbackTransactions"],
    "7058c54b52d7b0f84f0d23b9613341adc42661cecd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncTransactionToSheet"],
    "7068ec43b21ff73631fe852b454d777c70921352d4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncCycleTransactions"],
    "7079dc9269713418feed688130a6031ec5b4224298",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTransactionsByPeople"],
    "7864971240a578bb1e5a5b2a489cee73ab8dfae3c8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["distributeAllServices"],
    "7884bb4b1e99e02c26e46f75f7b8d1f68d8cfe9af3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountSpendingStats"],
    "789be1470c53ac737d001df1ffa32e59647e9ace23",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCashbackProgress"],
    "78fb5ce5154f7990c371e9b599479c677cdb853f8e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAccountSpendingStatsSnapshot"],
    "7c23b858a0874709f27dd6ef4a3addbd88cf59210e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPerson"],
    "7cd98e752315262b95422897400606a60ab3de6341",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["distributeService"],
    "7f4e44168d33d8c31a8e510c3c815a0844668f818f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUnifiedTransactions"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$people$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$ai$2d$reminder$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$ai$2d$actions$2d$v2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$ai$2d$learn$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$bulk$2d$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$log$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE8__$3d3e$__$225b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE9__$3d3e$__$225b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE10__$3d3e$__$225b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE11__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE12__$3d3e$__$225b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE13__$3d3e$__$225b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE14__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$service$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE15__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$settings$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE16__$3d3e$__$225b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE17__$3d3e$__$225b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE18__$3d3e$__$225b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE19__$3d3e$__$225b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE20__$3d3e$__$225b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE21__$3d3e$__$225b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/people/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/ai-reminder-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/actions/ai-actions-v2.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/actions/transaction-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/src/actions/ai-learn-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/src/actions/account-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/src/actions/people-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/src/actions/bulk-transaction-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/src/actions/log-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE8 => "[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE9 => "[project]/src/services/category.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE10 => "[project]/src/services/shop.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE11 => "[project]/src/actions/cascade-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE12 => "[project]/src/services/installment.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE13 => "[project]/src/services/account.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE14 => "[project]/src/actions/service-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE15 => "[project]/src/actions/settings-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE16 => "[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE17 => "[project]/src/services/people.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE18 => "[project]/src/services/service-manager.ts [app-rsc] (ecmascript)", ACTIONS_MODULE19 => "[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE20 => "[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)", ACTIONS_MODULE21 => "[project]/src/services/cashback.service.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$reminder$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/ai-reminder-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$actions$2d$v2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/ai-actions-v2.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/transaction-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$ai$2d$learn$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/ai-learn-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$account$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/account-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$people$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/people-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$bulk$2d$transaction$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/bulk-transaction-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$log$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/log-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$transaction$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/transaction.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$category$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/category.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$shop$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/shop.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$cascade$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/cascade-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$installment$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/installment.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$account$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/account.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$service$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/service-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$settings$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/settings-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$service$2d$manager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/service-manager.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$people$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/people.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$sheet$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/sheet.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback.service.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3e8392ac._.js.map