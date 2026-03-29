module.exports = [
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

/* __next_internal_action_entry_do_not_use__ [{"005f377338d56a86eb1c7b7ae4773fbb1798106f67":"getPocketBaseAccounts","00654154a2fec281ddce1d3cd3cd44283f7e682440":"getPocketBasePeople","00b0b30a0630b3a9d57906c896f7e7e515ca4b3809":"getPocketBaseCategories","00d1e799a76d8c5ad7abc3dac4940d3cc4d94e454f":"getPocketBaseShops","40153dc47cdaa8e859dfe8647adbcc5f585c726df1":"voidPocketBaseTransaction","40277ab004c0aac1705417f954a3fa7e91a2c63cc6":"deletePocketBaseCategory","40293829e3fcbfcec9ab52a841d261ed04ee52d236":"getPocketBaseAccountDetails","406b78c12be29dd91b1e7353edd5f42affd36661b2":"getPocketBaseInstallmentPlan","40925691271c9d7e119d0f2b860c4646a9bade6428":"deletePocketBaseShop","40b5406df9bd5959c857de838cd28d148b5eda248a":"deletePocketBaseShopsBulk","40bd82b0c40511f6f59de49b3b5e87da8ba5050f5d":"deletePocketBaseCategoriesBulk","40c7738050a3b59b5f5b9756451773d8fd9c646280":"getPocketBaseTransactionsByPlan","40e04331779953bb431045641b747d023376c1b189":"getPocketBaseUnifiedTransactions","40f6320600171caa538993337ebbf75b31ba696ca2":"loadPocketBaseTransactions","6001a27f82997542c1fb279661f5c5f48a3db2207c":"createPocketBaseAccount","6011200167e489b37c6f0376f72fcbcbfb16053b3b":"getPocketBaseCycleTransactions","601da855c967ee7f3c82ab8886b625468fde2160b9":"createPocketBasePerson","6030abb992b1c71e3a0e51d59c1d40132f33ca7dfb":"loadPocketBaseTransactionsForAccount","603415761abedd1a16a71294c571262c594179c599":"updatePocketBaseAccountConfig","6037aadfea6c579a5ac2cfca6ec337c2f1fd056253":"updatePocketBaseShop","603c043434d4d981a74065fc66255fc9e74a7991c5":"createPocketBaseTransaction","603d415d94d6f006207f8888625089bbcbd5337022":"getPocketBaseAccountCycleOptions","604701f8205b0575038e9a79c95e4036b3cc4a1013":"createPocketBaseShop","60496949d80bf4c6d59db2981e9541067c5d8f3697":"togglePocketBaseCategoriesArchiveBulk","606ede7a063e0189cd3da6884e8f45c81ac5ca5814":"togglePocketBaseShopsArchiveBulk","60839672cdefb991eb5e70a35f9ca2c578e72a8360":"updatePocketBaseAccountInfo","6089e6aa7342d0b26fc05e05366b0cae5f0ae68e55":"togglePocketBaseCategoryArchive","60aa69af3f07d6fb87077511985d52140885cb4fb3":"createPocketBaseCategory","60b3a5e29679d48ded144919e7b890b9cfcb9db176":"updatePocketBasePerson","60bd5613d64f6dcdcfa0b3bd0b63070298de00d815":"updatePocketBaseTransaction","60ed2591729216d06510d93a705db902623348d94c":"togglePocketBaseShopArchive","60fe70676b40bd85ba5eeb95a0450ee6d3143502bd":"updatePocketBaseCategory","7085e841e98d5e478119cfc9402ce495ce15bfbe90":"getPocketBaseAccountSpendingStatsSnapshot"},"",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseCategories, "00b0b30a0630b3a9d57906c896f7e7e515ca4b3809", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseCategory, "60aa69af3f07d6fb87077511985d52140885cb4fb3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseCategory, "60fe70676b40bd85ba5eeb95a0450ee6d3143502bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseCategoryArchive, "6089e6aa7342d0b26fc05e05366b0cae5f0ae68e55", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseCategory, "40277ab004c0aac1705417f954a3fa7e91a2c63cc6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseCategoriesArchiveBulk, "60496949d80bf4c6d59db2981e9541067c5d8f3697", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseCategoriesBulk, "40bd82b0c40511f6f59de49b3b5e87da8ba5050f5d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBasePeople, "00654154a2fec281ddce1d3cd3cd44283f7e682440", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseShops, "00d1e799a76d8c5ad7abc3dac4940d3cc4d94e454f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseInstallmentPlan, "406b78c12be29dd91b1e7353edd5f42affd36661b2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseTransactionsByPlan, "40c7738050a3b59b5f5b9756451773d8fd9c646280", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseShop, "604701f8205b0575038e9a79c95e4036b3cc4a1013", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseShop, "6037aadfea6c579a5ac2cfca6ec337c2f1fd056253", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseShopArchive, "60ed2591729216d06510d93a705db902623348d94c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseShop, "40925691271c9d7e119d0f2b860c4646a9bade6428", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePocketBaseShopsArchiveBulk, "606ede7a063e0189cd3da6884e8f45c81ac5ca5814", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePocketBaseShopsBulk, "40b5406df9bd5959c857de838cd28d148b5eda248a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBasePerson, "601da855c967ee7f3c82ab8886b625468fde2160b9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBasePerson, "60b3a5e29679d48ded144919e7b890b9cfcb9db176", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseAccount, "6001a27f82997542c1fb279661f5c5f48a3db2207c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseAccountInfo, "60839672cdefb991eb5e70a35f9ca2c578e72a8360", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseAccountConfig, "603415761abedd1a16a71294c571262c594179c599", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccounts, "005f377338d56a86eb1c7b7ae4773fbb1798106f67", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountSpendingStatsSnapshot, "7085e841e98d5e478119cfc9402ce495ce15bfbe90", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountDetails, "40293829e3fcbfcec9ab52a841d261ed04ee52d236", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(loadPocketBaseTransactionsForAccount, "6030abb992b1c71e3a0e51d59c1d40132f33ca7dfb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(loadPocketBaseTransactions, "40f6320600171caa538993337ebbf75b31ba696ca2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseAccountCycleOptions, "603d415d94d6f006207f8888625089bbcbd5337022", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseCycleTransactions, "6011200167e489b37c6f0376f72fcbcbfb16053b3b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(createPocketBaseTransaction, "603c043434d4d981a74065fc66255fc9e74a7991c5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePocketBaseTransaction, "60bd5613d64f6dcdcfa0b3bd0b63070298de00d815", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(voidPocketBaseTransaction, "40153dc47cdaa8e859dfe8647adbcc5f585c726df1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getPocketBaseUnifiedTransactions, "40e04331779953bb431045641b747d023376c1b189", null);
}),
"[project]/src/services/pocketbase/mappers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/services/account.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00938a881820c05166aae6ab060c0e1ed8e5841578":"getAccounts","4001ab97e0c2a86a01a16d8be81bf6977979b51e45":"recalculateBalance","4009884b397af047122e40827f5853d1f9d911eef9":"getAccountStats","40397a62c1824e6f0410f92b9ba8e48e8d4788e0fd":"deleteAccount","407a4aef3d2d970c8ca006c7982dfffc04e6482a4d":"getRecentAccountsByTransactions","40dcfa98758b2db910f5d9fa43952e91e3bef377fb":"getAccountDetails","6066f7cd4fce799816e07ddb058b7305a1bd65c375":"getAccountTransactions","60a6fef44b5427ef7f526117fca5624f17fab9d162":"updateAccountStatus","60aed7d64903e922ddae5ee956d9df4aed8dfbe9eb":"updateAccountConfig"},"",""] */ __turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/account-details.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/account-balance.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/pocketbase/mappers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
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
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('accounts', {
            perPage: 200,
            sort: 'name'
        });
        return response.items.map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapPocketBaseAccountRow"]);
    } catch (error) {
        console.error('[DB:PB] accounts.list failed:', error);
        return [];
    }
}
async function getStatsForAccount(account) {
    const creditLimit = account.credit_limit ?? 0;
    const currentBalance = account.current_balance ?? 0;
    const usage_percent = account.type === 'credit_card' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCreditCardUsage"])({
        type: account.type,
        credit_limit: creditLimit,
        current_balance: currentBalance
    }).percent : 0;
    const remaining_limit = account.type === 'credit_card' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCreditCardAvailableBalance"])({
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
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(account.cashback_config, account);
    if (!config) return baseStats;
    const now = new Date();
    const explicitCycleType = account.cb_cycle_type || config.cycleType;
    const cycleRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCashbackCycleRange"])({
        ...config,
        cycleType: explicitCycleType
    }, now);
    if (!cycleRange) return baseStats;
    const { start, end } = cycleRange;
    const tagDate = cycleRange.end;
    const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatIsoCycleTag"])(tagDate);
    // Fetch Cycle from PB
    const cycleResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('cashback_cycles', {
        filter: `account_id = "${account.id}" && cycle_tag = "${cycleTag}"`,
        perPage: 1
    });
    const cycle = cycleResp.items[0] || null;
    let spent_this_cycle = cycle?.spent_amount ?? 0;
    let real_awarded = cycle?.real_awarded ?? 0;
    const virtual_profit = cycle?.virtual_profit ?? 0;
    // Fallback for real_awarded (Income)
    if (real_awarded === 0) {
        const incomeResp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
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
            cashback_config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(item.cashback_config),
            is_active: typeof item.is_active === 'boolean' ? item.is_active : null,
            image_url: typeof item.image_url === 'string' ? item.image_url : null,
            total_in: item.total_in ?? 0,
            total_out: item.total_out ?? 0,
            stats,
            relationships,
            credit_card_info: (()=>{
                const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(item.cashback_config);
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
            cashback_config: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(row.cashback_config),
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
        const record = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', id);
        if (!record) return null;
        return mapAccountRowToDetails((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapPocketBaseAccountRow"])(record));
    } catch (err) {
        console.error('[DB:PB] getAccountDetails failed:', err);
        return null;
    }
}
// GroupedTransactionLines removed as lines are deprecated
async function fetchTransactions(accountId, limit) {
    try {
        const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
            filter: `account_id = "${pbAccountId}" || target_account_id = "${pbAccountId}"`,
            sort: '-occurred_at',
            perPage: limit,
            expand: 'account_id,target_account_id,category_id,shop_id,person_id'
        });
        // Reuse mapPocketBaseTransaction from account-details.service if available, 
        // but here we might need a general mapper. 
        // Since loadPocketBaseTransactionsForAccount is already exported from account-details.service, 
        // we can use it.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$account$2d$details$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPocketBaseTransactionsForAccount"])(accountId, limit);
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    console.log('[DB:PB] accounts.updateConfig', {
        id: pbId
    });
    try {
        const payload = {
            ...data
        };
        // MF5.3 Compatibility Mapping
        if (data.secured_by_account_id) payload.secured_by_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.secured_by_account_id, 'accounts');
        if (data.parent_account_id) payload.parent_account_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.parent_account_id, 'accounts');
        if (data.holder_person_id) payload.holder_person_id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(data.holder_person_id, 'people');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('accounts', pbId, payload);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(`/accounts/${accountId}`);
        return true;
    } catch (error) {
        console.error('[DB:PB] updateAccountConfig failed:', error);
        return false;
    }
}
async function getAccountStats(accountId) {
    const { getAccountSpendingStatsSnapshot } = await __turbopack_context__.A("[project]/src/services/cashback.service.ts [app-route] (ecmascript, async loader)");
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
    const pbAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(accountId, 'accounts');
    console.log('[DB:PB] accounts.recalcBalance', {
        accountId: pbAccountId
    });
    // 1. Get account type
    const account = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseGetById"])('accounts', pbAccountId);
    if (!account) {
        console.warn('[PB:Recalc] Account not found:', pbAccountId);
        return false;
    }
    // 2. Fetch all transactions for this account (posted, no parent)
    // PerPage=5000 as safety for now. 
    // We use filter for account_id and target_account_id (mapped by migrate to both names)
    const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
        filter: `status = "posted" && parent_transaction_id = "" && (account_id = "${pbAccountId}" || to_account_id = "${pbAccountId}")`,
        perPage: 5000
    });
    const { totalIn, totalOut, currentBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeAccountTotals"])({
        accountId: pbAccountId,
        accountType: account.type,
        transactions: txns.items || []
    });
    // 3. Update PB
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('accounts', pbAccountId, {
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
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'accounts');
    console.log('[DB:PB] accounts.delete', {
        id: pbId
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseDelete"])('accounts', pbId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
        return true;
    } catch (err) {
        console.error('[DB:PB] accounts.delete failed:', err);
        return false;
    }
}
async function updateAccountStatus(id, isActive) {
    const pbId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toPocketBaseId"])(id, 'accounts');
    console.log('[DB:PB] accounts.updateStatus', {
        id: pbId,
        isActive
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseUpdate"])('accounts', pbId, {
            is_active: isActive
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/accounts');
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
        const txns = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$pocketbase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pocketbaseList"])('transactions', {
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccounts, "00938a881820c05166aae6ab060c0e1ed8e5841578", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountDetails, "40dcfa98758b2db910f5d9fa43952e91e3bef377fb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountTransactions, "6066f7cd4fce799816e07ddb058b7305a1bd65c375", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccountConfig, "60aed7d64903e922ddae5ee956d9df4aed8dfbe9eb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getAccountStats, "4009884b397af047122e40827f5853d1f9d911eef9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(recalculateBalance, "4001ab97e0c2a86a01a16d8be81bf6977979b51e45", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAccount, "40397a62c1824e6f0410f92b9ba8e48e8d4788e0fd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(updateAccountStatus, "60a6fef44b5427ef7f526117fca5624f17fab9d162", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentAccountsByTransactions, "407a4aef3d2d970c8ca006c7982dfffc04e6482a4d", null);
}),
];

//# sourceMappingURL=src_c08b1347._.js.map