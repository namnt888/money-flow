(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hooks/usePeopleColumnPreferences.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePeopleColumnPreferences",
    ()=>usePeopleColumnPreferences
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const defaultPeopleColumns = [
    {
        key: 'name',
        label: 'Name',
        defaultWidth: 160,
        minWidth: 140,
        frozen: true
    },
    {
        key: 'base_lend',
        label: 'All Debt Remains',
        defaultWidth: 140,
        minWidth: 120
    },
    {
        key: 'repayment',
        label: 'Repayment',
        defaultWidth: 140,
        minWidth: 120
    },
    {
        key: 'cashback_total',
        label: 'Cashback Total',
        defaultWidth: 130,
        minWidth: 110
    },
    {
        key: 'current_tag',
        label: 'Current Tag',
        defaultWidth: 320,
        minWidth: 300
    },
    {
        key: 'balance',
        label: 'Remaining Amount',
        defaultWidth: 140,
        minWidth: 120
    },
    {
        key: 'current_debt',
        label: 'Outstanding Debt',
        defaultWidth: 140,
        minWidth: 120
    },
    {
        key: 'net_lend',
        label: 'Previous Debt',
        defaultWidth: 130,
        minWidth: 110
    },
    {
        key: 'action',
        label: 'Actions',
        defaultWidth: 100,
        minWidth: 80,
        frozen: true
    }
];
function usePeopleColumnPreferences() {
    _s();
    const [columnOrder, setColumnOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePeopleColumnPreferences.useState": ()=>defaultPeopleColumns.map({
                "usePeopleColumnPreferences.useState": (c)=>c.key
            }["usePeopleColumnPreferences.useState"])
    }["usePeopleColumnPreferences.useState"]);
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: true,
        current_tag: true,
        current_debt: false,
        base_lend: true,
        repayment: true,
        cashback_total: true,
        net_lend: false,
        balance: false,
        action: true
    });
    const [columnWidths, setColumnWidths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "usePeopleColumnPreferences.useState": ()=>{
            const map = {};
            defaultPeopleColumns.forEach({
                "usePeopleColumnPreferences.useState": (col)=>{
                    map[col.key] = col.defaultWidth;
                }
            }["usePeopleColumnPreferences.useState"]);
            return map;
        }
    }["usePeopleColumnPreferences.useState"]);
    // Persistence
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePeopleColumnPreferences.useEffect": ()=>{
            try {
                const savedOrder = localStorage.getItem('mf_v3_people_col_order');
                const savedVis = localStorage.getItem('mf_v3_people_col_vis');
                const savedWidths = localStorage.getItem('mf_v3_people_col_width');
                if (savedOrder) {
                    let parsedOrder = JSON.parse(savedOrder);
                    // Filter out invalid/removed columns and add missing ones
                    const validKeys = defaultPeopleColumns.map({
                        "usePeopleColumnPreferences.useEffect.validKeys": (c)=>c.key
                    }["usePeopleColumnPreferences.useEffect.validKeys"]);
                    parsedOrder = parsedOrder.filter({
                        "usePeopleColumnPreferences.useEffect": (k)=>validKeys.includes(k)
                    }["usePeopleColumnPreferences.useEffect"]);
                    validKeys.forEach({
                        "usePeopleColumnPreferences.useEffect": (k)=>{
                            if (!parsedOrder.includes(k)) parsedOrder.push(k);
                        }
                    }["usePeopleColumnPreferences.useEffect"]);
                    setColumnOrder(parsedOrder);
                }
                if (savedVis) {
                    const parsedVis = JSON.parse(savedVis);
                    // Ensure new column is visible by default if it wasn't there
                    if (parsedVis.debt_tag !== undefined) {
                        parsedVis.current_tag = parsedVis.debt_tag;
                        delete parsedVis.debt_tag;
                    }
                    if (parsedVis.active_subs !== undefined) delete parsedVis.active_subs;
                    setVisibleColumns({
                        "usePeopleColumnPreferences.useEffect": (prev)=>({
                                ...prev,
                                ...parsedVis
                            })
                    }["usePeopleColumnPreferences.useEffect"]);
                }
                if (savedWidths) setColumnWidths(JSON.parse(savedWidths));
            } catch (e) {
                console.error("Failed to load people column settings", e);
            }
        }
    }["usePeopleColumnPreferences.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePeopleColumnPreferences.useEffect": ()=>{
            localStorage.setItem('mf_v3_people_col_order', JSON.stringify(columnOrder));
        }
    }["usePeopleColumnPreferences.useEffect"], [
        columnOrder
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePeopleColumnPreferences.useEffect": ()=>{
            localStorage.setItem('mf_v3_people_col_vis', JSON.stringify(visibleColumns));
        }
    }["usePeopleColumnPreferences.useEffect"], [
        visibleColumns
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePeopleColumnPreferences.useEffect": ()=>{
            localStorage.setItem('mf_v3_people_col_width', JSON.stringify(columnWidths));
        }
    }["usePeopleColumnPreferences.useEffect"], [
        columnWidths
    ]);
    const toggleColumn = (key, visible)=>{
        setVisibleColumns((prev)=>({
                ...prev,
                [key]: visible
            }));
    };
    const reorderColumns = (newOrder)=>{
        setColumnOrder(newOrder);
    };
    const resetPreferences = ()=>{
        setColumnOrder(defaultPeopleColumns.map((c)=>c.key));
        setVisibleColumns({
            name: true,
            current_tag: true,
            current_debt: false,
            base_lend: true,
            repayment: true,
            cashback_total: true,
            net_lend: false,
            balance: false,
            action: true
        });
        const map = {};
        defaultPeopleColumns.forEach((col)=>{
            map[col.key] = col.defaultWidth;
        });
        setColumnWidths(map);
    };
    const getVisibleColumns = ()=>{
        return columnOrder.filter((key)=>visibleColumns[key]).map((key)=>defaultPeopleColumns.find((c)=>c.key === key));
    };
    return {
        columns: defaultPeopleColumns,
        columnOrder,
        visibleColumns,
        columnWidths,
        toggleColumn,
        reorderColumns,
        setColumnWidths,
        savePreferences: ()=>{},
        resetPreferences,
        getVisibleColumns
    };
}
_s(usePeopleColumnPreferences, "MFl3xKj2pzlaBjGKQlxWuB1KacI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/usePeopleExpandableRows.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePeopleExpandableRows",
    ()=>usePeopleExpandableRows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.29.0_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function usePeopleExpandableRows() {
    _s();
    const [expandedRows, setExpandedRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const toggleRow = (id)=>{
        setExpandedRows((prev)=>{
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };
    const isExpanded = (id)=>{
        return expandedRows.has(id);
    };
    const clearAll = ()=>{
        setExpandedRows(new Set());
    };
    return {
        expandedRows,
        toggleRow,
        isExpanded,
        clearAll
    };
}
_s(usePeopleExpandableRows, "ioo8tJKml5uQ84B7eQT4Aja/hTc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/person-route.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPersonRouteId",
    ()=>getPersonRouteId
]);
function getPersonRouteId(person) {
    const pbId = person.pocketbase_id?.trim();
    if (pbId) return pbId;
    return person.id;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/month-tag.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, 'yyyy-MM');
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/number-to-text.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatShortVietnameseCurrency",
    ()=>formatShortVietnameseCurrency,
    "formatVietnameseCurrencyText",
    ()=>formatVietnameseCurrencyText,
    "readMoney",
    ()=>readMoney
]);
function readMoney(amount) {
    if (amount === 0) return 'không đồng';
    const units = [
        '',
        'ngàn',
        'triệu',
        'tỷ',
        'ngàn tỷ',
        'triệu tỷ'
    ];
    const digits = [
        'không',
        'một',
        'hai',
        'ba',
        'bốn',
        'năm',
        'sáu',
        'bảy',
        'tám',
        'chín'
    ];
    let s = Math.abs(amount).toString();
    const groups = [];
    while(s.length > 0){
        groups.push(s.slice(-3));
        s = s.slice(0, -3);
    }
    let result = '';
    for(let i = 0; i < groups.length; i++){
        const group = parseInt(groups[i]);
        if (group === 0 && i < groups.length - 1) continue; // Skip empty groups unless it's the last one (handled by amount===0 check)
        // Simple reading for now, can be enhanced for "lẻ", "mốt", "lăm"
        // For the UI requirement "22 ngàn 3 trăm...", we want a concise format.
        // Let's try to format it nicely.
        if (group > 0) {
            result = `${group} ${units[i]} ` + result;
        }
    }
    return result.trim();
}
function formatVietnameseCurrencyText(amount) {
    if (!amount || isNaN(amount)) return [];
    const str = Math.round(Math.abs(amount)).toString();
    const len = str.length;
    const parts = [];
    // Basic logic to split into billions, millions, thousands
    // 123456789 -> 123 triệu 456 ngàn 789
    let remaining = Math.abs(amount);
    const billions = Math.floor(remaining / 1_000_000_000);
    remaining %= 1_000_000_000;
    const millions = Math.floor(remaining / 1_000_000);
    remaining %= 1_000_000;
    const thousands = Math.floor(remaining / 1_000);
    remaining %= 1_000;
    const units = remaining;
    if (billions > 0) parts.push({
        value: billions.toString(),
        unit: 'tỷ'
    });
    if (millions > 0) parts.push({
        value: millions.toString(),
        unit: 'triệu'
    });
    if (thousands > 0) parts.push({
        value: thousands.toString(),
        unit: 'ngàn'
    });
    if (units > 0) parts.push({
        value: units.toString(),
        unit: 'đồng'
    });
    return parts;
}
function formatShortVietnameseCurrency(amount) {
    if (!amount) return '';
    const absAmount = Math.abs(amount);
    if (absAmount >= 1_000_000_000) {
        const billion = Math.floor(absAmount / 1_000_000_000);
        const remainder = absAmount % 1_000_000_000;
        const million = Math.floor(remainder / 1_000_000);
        return `${billion} tỷ${million > 0 ? ` ${million} triệu` : ''}`;
    }
    if (absAmount >= 1_000_000) {
        const million = Math.floor(absAmount / 1_000_000);
        const remainder = absAmount % 1_000_000;
        const thousand = Math.floor(remainder / 1_000);
        return `${million} triệu${thousand > 0 ? ` ${thousand} ngàn` : ''}`;
    }
    if (absAmount >= 1_000) {
        const thousand = Math.floor(absAmount / 1_000);
        const remainder = absAmount % 1_000;
        return `${thousand} ngàn${remainder > 0 ? ` ${remainder}` : ''}`;
    }
    return absAmount.toString();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cashback.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cycle-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setDate.js [app-client] (ecmascript)");
;
;
function formatCycleTag(tag, statementDay = 25) {
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tag);
    if (!normalized || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalized)) return tag;
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
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(tag);
    if (!normalized || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isYYYYMM"])(normalized)) return tag;
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
    const targetDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(date);
    const day = targetDate.getDate();
    // Cycle ends on statementDay.
    // Start depends on month.
    let cycleEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$setDate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDate"])(targetDate, statementDay));
    // If current day > statementDay, we are in NEXT cycle (which ends next month)
    // If current day <= statementDay, we are in CURRENT cycle (which ends this month)
    if (day > statementDay) {
        cycleEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(cycleEndDate, 1);
    }
    // Cycle Start is (Cycle End - 1 month) + 1 day
    const cycleStartDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(cycleEndDate, -1);
    cycleStartDate.setDate(cycleStartDate.getDate() + 1);
    return {
        start: cycleStartDate,
        end: cycleEndDate
    };
}
function resolveTransactionCycleTag(transaction, account) {
    const persisted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.persisted_cycle_tag || "");
    if (persisted) return persisted;
    const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.derived_cycle_tag || "");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(transaction.tag || "") || "";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/tag.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTag",
    ()=>generateTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-client] (ecmascript)");
;
function generateTag(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toYYYYMMFromDate"])(date);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/settings.types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f0788db9._.js.map