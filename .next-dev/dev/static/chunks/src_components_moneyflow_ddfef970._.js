(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/moneyflow/column-customizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColumnCustomizer",
    ()=>ColumnCustomizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sigma.js [app-client] (ecmascript) <export default as Sigma>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users-round.js [app-client] (ecmascript) <export default as Users2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
const getColumnIcon = (key)=>{
    switch(key){
        case 'date':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 68,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'shop':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 69,
                columnNumber: 29
            }, ("TURBOPACK compile-time value", void 0));
        case 'category':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 70,
                columnNumber: 33
            }, ("TURBOPACK compile-time value", void 0));
        case 'account':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 71,
                columnNumber: 32
            }, ("TURBOPACK compile-time value", void 0));
        case 'amount':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__["Sigma"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 72,
                columnNumber: 31
            }, ("TURBOPACK compile-time value", void 0));
        case 'total_back':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 73,
                columnNumber: 35
            }, ("TURBOPACK compile-time value", void 0));
        case 'final_price':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 74,
                columnNumber: 36
            }, ("TURBOPACK compile-time value", void 0));
        case 'tag':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 75,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0));
        case 'id':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 76,
                columnNumber: 27
            }, ("TURBOPACK compile-time value", void 0));
        case 'actions':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 77,
                columnNumber: 32
            }, ("TURBOPACK compile-time value", void 0));
        case 'actual_cashback':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 78,
                columnNumber: 40
            }, ("TURBOPACK compile-time value", void 0));
        case 'est_share':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users2$3e$__["Users2"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 79,
                columnNumber: 34
            }, ("TURBOPACK compile-time value", void 0));
        case 'net_profit':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 80,
                columnNumber: 35
            }, ("TURBOPACK compile-time value", void 0));
        case 'cycle':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 81,
                columnNumber: 30
            }, ("TURBOPACK compile-time value", void 0));
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 82,
                columnNumber: 25
            }, ("TURBOPACK compile-time value", void 0));
    }
};
function SortableItem({ id, label, visible, frozen, width, isHighlighted, onToggle, onWidthChange }) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id,
        disabled: frozen
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : "auto",
        opacity: isDragging ? 0.5 : 1
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between p-3 bg-card border rounded-md mb-2 transition-colors", isDragging && "shadow-lg bg-accent", isHighlighted && "bg-yellow-400/20 border-yellow-400/50 ring-1 ring-yellow-400/30"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 flex-1 min-w-0",
                children: [
                    frozen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                        className: "h-4 w-4 text-muted-foreground shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ...attributes,
                        ...listeners,
                        className: "cursor-grab hover:text-primary active:cursor-grabbing shrink-0 touch-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                            className: "h-4 w-4 text-muted-foreground"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                            lineNumber: 136,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 135,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-2 py-1 rounded bg-muted/50 text-muted-foreground shrink-0", isHighlighted && "bg-yellow-400/30 text-yellow-700"),
                        children: getColumnIcon(id)
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 139,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium text-sm truncate mr-2", isHighlighted && "bg-yellow-200 text-yellow-900 rounded px-1"),
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: "px"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                lineNumber: 153,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: "w-12 h-6 text-xs bg-transparent border-none focus:outline-none text-right",
                                value: width,
                                onChange: (e)=>{
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val > 0) onWidthChange(val);
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                lineNumber: 154,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 152,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                        checked: visible,
                        onCheckedChange: onToggle,
                        disabled: frozen
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                lineNumber: 151,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
        lineNumber: 122,
        columnNumber: 9
    }, this);
}
_s(SortableItem, "cckixe/EfNtiVy4dnK51XD1IVys=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c = SortableItem;
function ColumnCustomizer({ open, onOpenChange, columns, visibleColumns, onVisibilityChange, onOrderChange, widths, onWidthChange, onReset }) {
    _s1();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 5
        }
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = columns.findIndex((col)=>col.id === active.id);
            const newIndex = columns.findIndex((col)=>col.id === over.id);
            const newOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(columns, oldIndex, newIndex).map((c)=>c.id);
            onOrderChange(newOrder);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "w-[400px] sm:w-[540px] flex flex-col p-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                            className: "flex flex-row items-center justify-between space-y-0 pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                    children: "Customize Columns"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                    lineNumber: 216,
                                    columnNumber: 25
                                }, this),
                                onReset && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: onReset,
                                    className: "h-8 gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                            lineNumber: 224,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: "Reset Default"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                            lineNumber: 225,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                    lineNumber: 218,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                            lineNumber: 215,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                    lineNumber: 231,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    placeholder: "Search columns to highlight...",
                                    className: "pl-9 h-10 bg-muted/30 focus-visible:ring-1",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                    lineNumber: 232,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                            lineNumber: 230,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                    lineNumber: 214,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 pt-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                            sensors: sensors,
                            collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                            onDragEnd: handleDragEnd,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                                items: columns.map((c)=>c.id),
                                strategy: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                                children: columns.map((col)=>{
                                    const isHighlighted = searchQuery !== "" && col.label.toLowerCase().includes(searchQuery.toLowerCase());
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableItem, {
                                        id: col.id,
                                        label: col.label,
                                        visible: visibleColumns[col.id],
                                        frozen: col.frozen,
                                        width: widths[col.id] || 100,
                                        isHighlighted: isHighlighted,
                                        onToggle: (checked)=>onVisibilityChange(col.id, checked),
                                        onWidthChange: (w)=>onWidthChange(col.id, w)
                                    }, col.id, false, {
                                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                        lineNumber: 255,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                                lineNumber: 248,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                            lineNumber: 243,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                        lineNumber: 242,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
                    lineNumber: 241,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
            lineNumber: 213,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/column-customizer.tsx",
        lineNumber: 212,
        columnNumber: 9
    }, this);
}
_s1(ColumnCustomizer, "0qMsoYOm7rdwRkll8IJbwFUt+b4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c1 = ColumnCustomizer;
var _c, _c1;
__turbopack_context__.k.register(_c, "SortableItem");
__turbopack_context__.k.register(_c1, "ColumnCustomizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileTransactionsSimpleList",
    ()=>MobileTransactionsSimpleList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transactions$2d$v2$2f$badge$2f$CycleBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transactions-v2/badge/CycleBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/empty-state.tsx [app-client] (ecmascript)");
;
;
;
;
;
function MobileTransactionsSimpleList({ transactions, categories, selectedTxnIds, onSelectTxn, onRowClick, onCopyId, renderActions, formatters, accounts = [] }) {
    if (!transactions.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "block md:hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                title: "No transactions found",
                description: "Try adjusting your filters or search criteria"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                lineNumber: 37,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this);
    }
    // Note: Parent container handles scrolling (flex-1 overflow-y-auto on mobile)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "block md:hidden pb-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 p-3",
            children: transactions.map((txn)=>{
                const isSelected = selectedTxnIds.has(txn.id);
                // Line 1: Date & Note
                // Date: dd-mm format
                const dateValue = txn.occurred_at || txn.created_at;
                const date = dateValue ? new Date(dateValue) : new Date();
                const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                const noteText = txn.note || txn.shop_name || 'No note';
                // Shop Image logic: Square (rounded-none) and Contain (not cropped)
                const shopImage = txn.shop_image_url || txn.source_image;
                const isShop = !!txn.shop_image_url;
                // Line 2: Flow (Left) - Amount (Right)
                const showFlow = txn.type === 'transfer' || txn.type === 'debt' || txn.type === 'repayment';
                const sourceImage = txn.source_image || txn.shop_image_url;
                const targetImage = txn.person_image_url || txn.destination_image_url;
                // Value
                const rawAmount = typeof txn.original_amount === 'number' ? txn.original_amount : txn.amount ?? 0;
                const absAmount = Math.abs(rawAmount);
                const amountStr = formatters.currency(absAmount);
                // Determine amount color
                const visualType = txn.displayType ?? txn.type;
                const isRepayment = txn.type === 'repayment';
                const amountColor = visualType === 'income' || isRepayment ? 'text-emerald-700' : visualType === 'expense' ? 'text-red-500' : 'text-slate-600';
                // Type Badge Construction
                const badgeBaseClass = "inline-flex items-center justify-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold border";
                let typeBadge = null;
                const tType = txn.type;
                if (tType === 'expense') {
                    typeBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-red-50 text-red-600 border-red-200"),
                        children: "OUT"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                        lineNumber: 88,
                        columnNumber: 37
                    }, this);
                } else if (tType === 'income') {
                    typeBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-emerald-50 text-emerald-600 border-emerald-200"),
                        children: "IN"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                        lineNumber: 90,
                        columnNumber: 37
                    }, this);
                } else if (tType === 'transfer') {
                    typeBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-blue-50 text-blue-600 border-blue-200"),
                        children: "TF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                        lineNumber: 92,
                        columnNumber: 37
                    }, this);
                } else if (tType === 'debt' || tType === 'loan') {
                    typeBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-amber-50 text-amber-600 border-amber-200"),
                        children: "DEBT"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                        lineNumber: 94,
                        columnNumber: 37
                    }, this);
                } else if (tType === 'repayment') {
                    typeBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-purple-50 text-purple-600 border-purple-200"),
                        children: "REPAY"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                        lineNumber: 96,
                        columnNumber: 37
                    }, this);
                }
                // Line 3: Badges (Cycle, Tag) & Category
                // Category
                const actualCategory = categories.find((c)=>c.id === txn.category_id);
                const categoryName = actualCategory?.name || txn.category_name || 'Uncategorized';
                const categoryImage = actualCategory?.image_url;
                // Badges
                const cycleTag = txn.persisted_cycle_tag || txn.tag;
                const tag = txn.tag // e.g. debt tag
                ;
                // Cycle Logic using Refund Account (Source)
                const refundAccount = accounts.find((a)=>a.id === txn.account_id) // rough guess
                ;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `border border-slate-200 rounded-lg p-3 bg-white ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`,
                    onClick: ()=>onRowClick && onRowClick(txn),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    renderActions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        onClick: (e)=>e.stopPropagation(),
                                        children: renderActions(txn)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 123,
                                        columnNumber: 41
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onSelectTxn(txn.id, !isSelected);
                                        },
                                        title: "Quick actions",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                            lineNumber: 136,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 127,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500 whitespace-nowrap",
                                        children: dateStr
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 139,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 min-w-0 flex-1",
                                        children: [
                                            shopImage && !showFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: shopImage,
                                                alt: "",
                                                className: `h-5 w-5 object-contain flex-shrink-0 rounded-none`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 144,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-slate-900 truncate",
                                                children: noteText
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 150,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 142,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shrink-0",
                                        children: typeBadge
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 156,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                lineNumber: 121,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 min-w-0",
                                        children: showFlow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs text-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: sourceImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: sourceImage,
                                                        alt: "",
                                                        className: "h-6 w-6 rounded-none object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 57
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] italic text-slate-400",
                                                        children: "Src"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 57
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "h-3 w-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: targetImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: targetImage,
                                                        alt: "",
                                                        className: "h-6 w-6 rounded-none object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 57
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] italic text-slate-400",
                                                        children: "Dst"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 57
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                            lineNumber: 164,
                                            columnNumber: 45
                                        }, this) : // Ensure height consistency
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                            lineNumber: 191,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 162,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    onCopyId?.(txn.id);
                                                },
                                                className: "text-slate-400 hover:text-slate-600 p-0.5 active:bg-slate-100 rounded",
                                                title: "Copy ID",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 197,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-sm font-bold ${amountColor}`,
                                                children: amountStr
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 207,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 196,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                lineNumber: 160,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-2 mt-1 min-h-[24px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transactions$2d$v2$2f$badge$2f$CycleBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CycleBadge"], {
                                                account: refundAccount,
                                                cycleTag: cycleTag,
                                                txnDate: dateValue,
                                                mini: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 217,
                                                columnNumber: 41
                                            }, this),
                                            tag && tag !== cycleTag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-medium text-teal-700 ring-1 ring-inset ring-teal-700/10 whitespace-nowrap",
                                                children: tag
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 224,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 216,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 max-w-[150px] justify-end",
                                        children: [
                                            categoryImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: categoryImage,
                                                alt: "",
                                                className: "h-5 w-5 object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 233,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500 font-medium truncate",
                                                children: categoryName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                                lineNumber: 235,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                        lineNumber: 231,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                                lineNumber: 214,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                        lineNumber: 119,
                        columnNumber: 29
                    }, this)
                }, txn.id, false, {
                    fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
                    lineNumber: 113,
                    columnNumber: 25
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
            lineNumber: 48,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
}
_c = MobileTransactionsSimpleList;
var _c;
__turbopack_context__.k.register(_c, "MobileTransactionsSimpleList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/transaction-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ⚠️ STUB FILE - DO NOT USE ⚠️
 * 
 * This is a stub to prevent import errors from legacy components.
 * The actual 5300+ line implementation has been archived to:
 * Archive/components/moneyflow/transaction-form.DEPRECATED.tsx
 * 
 * **USE INSTEAD:** 
 * TransactionSlideV2 with modular sections in:
 * - src/components/transaction/slide-v2/single-mode/
 * - src/components/transaction/slide-v2/bulk-mode/
 * 
 * This stub exports empty placeholders to satisfy TypeScript.
 */ __turbopack_context__.s([
    "TransactionForm",
    ()=>TransactionForm
]);
function TransactionForm(props) {
    console.error("⚠️ TransactionForm (5300+ lines) is DEPRECATED. Use TransactionSlideV2 modular sections instead.");
    return null;
}
_c = TransactionForm;
var _c;
__turbopack_context__.k.register(_c, "TransactionForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmRefundDialogV2",
    ()=>ConfirmRefundDialogV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$5a768c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:5a768c [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$1561b9__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:1561b9 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
// import { AccountCard } from "./account-card" // Assuming we can simple row render
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
function ConfirmRefundDialogV2({ open, onOpenChange, transaction, accounts }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingOriginal, setIsLoadingOriginal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // State for selection
    const [selectedAccountId, setSelectedAccountId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [recommendedAccount, setRecommendedAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [openCombobox, setOpenCombobox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load recommended account on open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConfirmRefundDialogV2.useEffect": ()=>{
            if (open && transaction?.id) {
                setIsLoadingOriginal(true);
                setRecommendedAccount(null);
                setSelectedAccountId("");
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$1561b9__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getOriginalAccount"])(transaction.id).then({
                    "ConfirmRefundDialogV2.useEffect": (result)=>{
                        if (result) {
                            setRecommendedAccount(result);
                            setSelectedAccountId(result.id);
                        }
                    }
                }["ConfirmRefundDialogV2.useEffect"]).catch({
                    "ConfirmRefundDialogV2.useEffect": (err)=>console.error("Failed to get original account", err)
                }["ConfirmRefundDialogV2.useEffect"]).finally({
                    "ConfirmRefundDialogV2.useEffect": ()=>setIsLoadingOriginal(false)
                }["ConfirmRefundDialogV2.useEffect"]);
            }
        }
    }["ConfirmRefundDialogV2.useEffect"], [
        open,
        transaction?.id
    ]);
    const handleConfirm = async ()=>{
        if (!selectedAccountId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select an account to receive the refund");
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$5a768c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["confirmRefundAction"])(transaction.id, selectedAccountId);
            if (result.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Refund confirmed successfully");
                onOpenChange(false);
                router.refresh();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to confirm refund", {
                    description: result.error
                });
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Error", {
                description: error.message
            });
        } finally{
            setIsSubmitting(false);
        }
    };
    // Helper to get selected account object (either recommended or from list)
    const selectedAccountObj = recommendedAccount?.id === selectedAccountId ? recommendedAccount : accounts.find((a)=>a.id === selectedAccountId);
    const validAccounts = accounts.filter((a)=>a.id !== '99999999-9999-9999-9999-999999999999');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[500px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-green-700 flex items-center gap-2",
                            children: "Confirm Refund Received"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Confirm that the money has returned to your account."
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                            lineNumber: 112,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                    lineNumber: 108,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-4 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-50 p-4 rounded-xl border border-slate-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-slate-500 mb-1",
                                    children: "Refund Amount:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-3xl font-bold text-slate-900",
                                    children: Math.abs(transaction.amount).toLocaleString('vi-VN')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 121,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-slate-500 text-sm mt-1 italic",
                                    children: transaction.note || "Refund Transaction"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                            lineNumber: 119,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-slate-700 block",
                                    children: "Where was this refund received?"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 130,
                                    columnNumber: 25
                                }, this),
                                isLoadingOriginal ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 border rounded-lg bg-white flex items-center gap-3 animate-pulse",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-6 bg-slate-200 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 137,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 w-32 bg-slate-200 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 138,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 136,
                                    columnNumber: 29
                                }, this) : recommendedAccount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setSelectedAccountId(recommendedAccount.id),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("cursor-pointer p-3 border rounded-lg flex items-center justify-between transition-all", selectedAccountId === recommendedAccount.id ? "border-green-500 bg-green-50 ring-1 ring-green-500" : "border-slate-200 bg-white hover:border-green-200"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative w-12 h-8 rounded overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0",
                                                    children: recommendedAccount.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: recommendedAccount.image_url,
                                                        alt: recommendedAccount.name,
                                                        fill: true,
                                                        className: "object-contain"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 45
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-full flex items-center justify-center text-xs text-slate-400",
                                                        children: "N/A"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-medium text-sm text-slate-900",
                                                            children: recommendedAccount.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-green-600 font-medium",
                                                            children: "Recommended (Original Source)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 150,
                                            columnNumber: 33
                                        }, this),
                                        selectedAccountId === recommendedAccount.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 rounded-full bg-green-500 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-1 border-b-2 border-l-2 border-white -rotate-45 mb-[1px]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                lineNumber: 170,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 169,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 141,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 italic",
                                    children: "Original account could not be detected automatically. Please select manually below."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 175,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-full border-t border-slate-100"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 182,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex justify-center text-xs uppercase",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-white px-2 text-slate-400",
                                                children: "Or select another"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                lineNumber: 186,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 185,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 181,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                    open: openCombobox,
                                    onOpenChange: setOpenCombobox,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                role: "combobox",
                                                "aria-expanded": openCombobox,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full justify-between h-auto py-3", selectedAccountId && selectedAccountId !== recommendedAccount?.id ? "border-green-500 bg-green-50" : ""),
                                                children: selectedAccountObj && selectedAccountId !== recommendedAccount?.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        selectedAccountObj.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-6 h-4 relative",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: selectedAccountObj.image_url,
                                                                alt: "",
                                                                fill: true,
                                                                className: "object-contain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: selectedAccountObj.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 41
                                                }, this) : "Select from all accounts..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                lineNumber: 192,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 191,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                            className: "w-[400px] p-0 z-[1300]",
                                            align: "start",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                                        placeholder: "Search account...",
                                                        className: "h-9"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandList"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                                                children: "No account found."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                                children: validAccounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                                        value: account.name,
                                                                        onSelect: ()=>{
                                                                            setSelectedAccountId(account.id);
                                                                            setOpenCombobox(false);
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-2 w-full",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-8 h-5 relative bg-slate-100 rounded overflow-hidden shrink-0",
                                                                                    children: account.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                        src: account.image_url,
                                                                                        alt: "",
                                                                                        fill: true,
                                                                                        className: "object-contain"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                                        lineNumber: 234,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                                    lineNumber: 232,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex flex-col",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-medium",
                                                                                            children: account.name
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                                            lineNumber: 238,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-xs text-slate-500",
                                                                                            children: account.current_balance?.toLocaleString()
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                                            lineNumber: 239,
                                                                                            columnNumber: 61
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                                    lineNumber: 237,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                            lineNumber: 231,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    }, account.id, false, {
                                                                        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                        lineNumber: 223,
                                                                        columnNumber: 49
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                                lineNumber: 217,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                            lineNumber: 216,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 190,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                            lineNumber: 129,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                    lineNumber: 117,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>onOpenChange(false),
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                            lineNumber: 256,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "bg-green-600 hover:bg-green-700 text-white",
                            onClick: handleConfirm,
                            disabled: !selectedAccountId || isSubmitting,
                            children: [
                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                                    lineNumber: 262,
                                    columnNumber: 42
                                }, this),
                                "Confirm Received"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                            lineNumber: 257,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
                    lineNumber: 255,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
            lineNumber: 107,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx",
        lineNumber: 106,
        columnNumber: 9
    }, this);
}
_s(ConfirmRefundDialogV2, "70qMXoLSjIWCv4f59naMk1Fsqv4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ConfirmRefundDialogV2;
var _c;
__turbopack_context__.k.register(_c, "ConfirmRefundDialogV2");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/request-refund-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequestRefundDialog",
    ()=>RequestRefundDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$783af2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:783af2 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$f96405__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:f96405 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const formSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().positive("Amount must be positive"),
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
function RequestRefundDialog({ open, onOpenChange, transaction, type = 'refund' }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isCancel = type === 'cancel';
    const title = isCancel ? "Cancel Order" : "Request Refund";
    const description = isCancel ? "This will cancel the order and request a full refund." : "Request a refund for this transaction.";
    // Form definition
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(formSchema),
        defaultValues: {
            amount: Math.abs(transaction.amount || 0),
            note: ""
        }
    });
    // Reset form when transaction changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RequestRefundDialog.useEffect": ()=>{
            if (open) {
                form.reset({
                    amount: Math.abs(transaction.amount),
                    note: isCancel ? `Cancel Order: ${transaction.note || ''}` : `Refund for: ${transaction.note || 'Order'}`
                });
            }
        }
    }["RequestRefundDialog.useEffect"], [
        open,
        transaction,
        form,
        type,
        isCancel
    ]);
    const onSubmit = async (values)=>{
        setIsSubmitting(true);
        try {
            let result;
            if (isCancel) {
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$f96405__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["cancelOrder"])(transaction.id);
            } else {
                // Determine if partial
                const originalAmount = Math.abs(transaction.amount);
                const isPartial = values.amount < originalAmount;
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$783af2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["requestRefund"])(transaction.id, values.amount, isPartial);
            }
            if (result.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${title} successful`, {
                    description: isCancel ? "Order cancelled." : "Transaction marked as pending refund."
                });
                onOpenChange(false);
                router.refresh();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Failed to ${title.toLowerCase()}`, {
                    description: result.error
                });
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("An error occurred", {
                description: error.message
            });
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[425px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                    className: "h-5 w-5 text-blue-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                title
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                            lineNumber: 116,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: description
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                            lineNumber: 120,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
                    ...form,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: form.handleSubmit(onSubmit),
                        className: "space-y-4 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "amount",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                children: "Refund Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 132,
                                                columnNumber: 37
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            ...field,
                                                            type: "number",
                                                            className: "pl-8 font-bold text-lg",
                                                            min: 0,
                                                            max: Math.abs(transaction.amount)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 45
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold",
                                                            children: "₫"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 45
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 41
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 133,
                                                columnNumber: 37
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 145,
                                                columnNumber: 37
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                        lineNumber: 131,
                                        columnNumber: 33
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                lineNumber: 127,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "note",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                children: "Note / Reason"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 155,
                                                columnNumber: 37
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    ...field,
                                                    placeholder: "Reason for refund...",
                                                    className: "resize-none",
                                                    rows: 3
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 41
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 156,
                                                columnNumber: 37
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 164,
                                                columnNumber: 37
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                        lineNumber: 154,
                                        columnNumber: 33
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                                className: "gap-2 sm:gap-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        onClick: ()=>onOpenChange(false),
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                        lineNumber: 170,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "submit",
                                        className: "bg-blue-600 hover:bg-blue-700",
                                        disabled: isSubmitting,
                                        children: [
                                            isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                                lineNumber: 174,
                                                columnNumber: 50
                                            }, this),
                                            "Submit Request"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                        lineNumber: 173,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                                lineNumber: 169,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                        lineNumber: 126,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
                    lineNumber: 125,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
            lineNumber: 114,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/request-refund-dialog.tsx",
        lineNumber: 113,
        columnNumber: 9
    }, this);
}
_s(RequestRefundDialog, "pZC3fIDKfZO2Rj52FB22iuXYocs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = RequestRefundDialog;
var _c;
__turbopack_context__.k.register(_c, "RequestRefundDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/transaction-history-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionHistoryModal",
    ()=>TransactionHistoryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$6c2aa0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:6c2aa0 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
});
function formatValue(value) {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'number') return numberFormatter.format(value);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'string') {
        // Try to parse as date
        if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
            try {
                const d = new Date(value);
                return new Intl.DateTimeFormat('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(d);
            } catch  {
                return value;
            }
        }
        return value;
    }
    return String(value);
}
function formatTimestamp(isoString) {
    try {
        const d = new Date(isoString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(d);
    } catch  {
        return isoString;
    }
}
function DiffRow({ diff }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-b border-slate-100 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 text-xs font-semibold text-slate-600 align-top w-[180px]",
                children: diff.field
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 align-top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex max-w-[220px] break-all text-xs text-rose-700 line-through bg-rose-50 border border-rose-100 rounded px-2 py-1",
                    children: formatValue(diff.oldValue)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 69,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2 align-top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex max-w-[220px] break-all text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-2 py-1 font-semibold",
                    children: formatValue(diff.newValue)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 74,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
        lineNumber: 64,
        columnNumber: 9
    }, this);
}
_c = DiffRow;
function HistoryEntry({ entry, index }) {
    const isVoid = entry.change_type === 'void';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border overflow-hidden", isVoid ? "border-red-200 bg-red-50/50" : "border-slate-200 bg-white"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold", isVoid ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"),
                                children: isVoid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                            lineNumber: 99,
                                            columnNumber: 33
                                        }, this),
                                        "Voided"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                            lineNumber: 104,
                                            columnNumber: 33
                                        }, this),
                                        "Edited"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 93,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: [
                                    "#",
                                    index + 1
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-end gap-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-slate-700",
                                children: formatTimestamp(entry.created_at)
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 114,
                                columnNumber: 21
                            }, this),
                            entry.changed_by_email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-slate-400",
                                children: [
                                    "by ",
                                    entry.changed_by_email
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 118,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 113,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            entry.diffs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full min-w-[620px] text-sm border-collapse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "sticky top-0 z-10 bg-slate-100 border-b border-slate-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500",
                                        children: "Field"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                        lineNumber: 131,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500",
                                        children: "Before"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                        lineNumber: 132,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "text-left px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500",
                                        children: "After"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                        lineNumber: 133,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 130,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                            lineNumber: 129,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: entry.diffs.map((diff, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffRow, {
                                    diff: diff
                                }, i, false, {
                                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                    lineNumber: 138,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                            lineNumber: 136,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 128,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                lineNumber: 127,
                columnNumber: 17
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-slate-500 italic",
                    children: isVoid ? 'Transaction was voided' : 'No field changes detected'
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 145,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                lineNumber: 144,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
        lineNumber: 86,
        columnNumber: 9
    }, this);
}
_c1 = HistoryEntry;
function TransactionHistoryModal({ transactionId, transactionNote, isOpen, onClose }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionHistoryModal.useEffect": ()=>{
            if (!isOpen) return;
            const fetchHistory = {
                "TransactionHistoryModal.useEffect.fetchHistory": async ()=>{
                    setLoading(true);
                    setError(null);
                    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$6c2aa0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTransactionHistory"])(transactionId);
                    if (result.success && result.data) {
                        setHistory(result.data);
                    } else {
                        setError(result.error || 'Failed to load history');
                    }
                    setLoading(false);
                }
            }["TransactionHistoryModal.useEffect.fetchHistory"];
            fetchHistory();
        }
    }["TransactionHistoryModal.useEffect"], [
        isOpen,
        transactionId
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-2xl max-h-[80vh] rounded-xl bg-white shadow-2xl flex flex-col",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-slate-200 px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 rounded-lg bg-blue-100 text-blue-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                        lineNumber: 200,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                    lineNumber: 199,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-bold text-slate-900",
                                            children: "Transaction History"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                            lineNumber: 203,
                                            columnNumber: 29
                                        }, this),
                                        transactionNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-500 truncate max-w-[300px]",
                                            title: transactionNote,
                                            children: transactionNote
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                            lineNumber: 205,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                    lineNumber: 202,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                            lineNumber: 198,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 215,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                            lineNumber: 211,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 197,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6",
                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-12 text-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "h-8 w-8 animate-spin mb-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 223,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: "Loading history..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 224,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 222,
                        columnNumber: 25
                    }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-12 text-red-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "h-8 w-8 mb-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 228,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 229,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 227,
                        columnNumber: 25
                    }, this) : history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-12 text-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                className: "h-8 w-8 mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 233,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: "No history recorded"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 234,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-400 mt-1",
                                children: "This transaction has not been modified since creation."
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 235,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 232,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 mb-4",
                                children: [
                                    "Showing ",
                                    history.length,
                                    " change",
                                    history.length !== 1 ? 's' : '',
                                    " (newest first)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                lineNumber: 241,
                                columnNumber: 29
                            }, this),
                            history.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistoryEntry, {
                                    entry: entry,
                                    index: index
                                }, entry.id, false, {
                                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                                    lineNumber: 245,
                                    columnNumber: 33
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 240,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 220,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-slate-200 px-6 py-3 bg-slate-50 rounded-b-xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-slate-400 text-center",
                        children: [
                            "Transaction ID: ",
                            transactionId.slice(0, 8),
                            "...",
                            transactionId.slice(-4)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                        lineNumber: 253,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
                    lineNumber: 252,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
            lineNumber: 192,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/transaction-history-modal.tsx",
        lineNumber: 188,
        columnNumber: 9
    }, this), document.body);
}
_s(TransactionHistoryModal, "hNvUzvUxR3900JXhDFadeEtZXBU=");
_c2 = TransactionHistoryModal;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DiffRow");
__turbopack_context__.k.register(_c1, "HistoryEntry");
__turbopack_context__.k.register(_c2, "TransactionHistoryModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/quick-people-settings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuickPeopleSettings",
    ()=>QuickPeopleSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/settings.types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$3253a2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:3253a2 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$09f738__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:09f738 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
function QuickPeopleSettings({ people, onClose }) {
    _s();
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$settings$2e$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_QUICK_PEOPLE_CONFIG"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isSaving, startSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuickPeopleSettings.useEffect": ()=>{
            async function fetchConfig() {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$3253a2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getQuickPeopleConfigAction"])();
                if (res.success && res.data) {
                    setConfig(res.data);
                }
                setLoading(false);
            }
            fetchConfig();
        }
    }["QuickPeopleSettings.useEffect"], []);
    const handleSave = ()=>{
        startSaving(async ()=>{
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$09f738__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["saveQuickPeopleConfigAction"])(config);
            if (res.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Settings saved successfully');
                onClose?.();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Failed to save settings');
            }
        });
    };
    const togglePin = (personId)=>{
        setConfig((prev)=>{
            const current = prev.pinned_ids || [];
            const exists = current.includes(personId);
            return {
                ...prev,
                pinned_ids: exists ? current.filter((id)=>id !== personId) : [
                    ...current,
                    personId
                ]
            };
        });
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 flex justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-6 w-6 animate-spin text-slate-400"
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                lineNumber: 71,
                columnNumber: 57
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
            lineNumber: 71,
            columnNumber: 16
        }, this);
    }
    // Filter available people (exclude already pinned)
    const pinnedPeople = (config.pinned_ids || []).map((id)=>people.find((p)=>p.id === id)).filter((p)=>!!p);
    const availablePeople = people.filter((p)=>!config.pinned_ids?.includes(p.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-base",
                                children: "Smart Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "Automatically show top 5 most recently used people."
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                        checked: config.mode === 'smart',
                        onCheckedChange: (checked)=>setConfig((prev)=>({
                                    ...prev,
                                    mode: checked ? 'smart' : 'manual'
                                }))
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, this),
            config.mode === 'manual' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold text-slate-700",
                                children: "Quick Access List"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 100,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: [
                                    pinnedPeople.length,
                                    " selected"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 101,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 99,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                        open: open,
                        onOpenChange: setOpen,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    role: "combobox",
                                    "aria-expanded": open,
                                    className: "w-full justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                lineNumber: 114,
                                                columnNumber: 37
                                            }, this),
                                            "Search person to add..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                        lineNumber: 113,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                    lineNumber: 107,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 106,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                className: "w-[400px] p-0",
                                align: "start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                            placeholder: "Search people..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                            lineNumber: 121,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandList"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                                    children: "No person found."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                    heading: "Available People",
                                                    children: availablePeople.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                            value: person.name,
                                                            onSelect: ()=>{
                                                                togglePin(person.id);
                                                                setOpen(false);
                                                            },
                                                            className: "flex items-center gap-2 cursor-pointer",
                                                            children: [
                                                                person.image_url ? // eslint-disable-next-line @next/next/no-img-element
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: person.image_url,
                                                                    alt: "",
                                                                    className: "w-6 h-6 rounded-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                                    lineNumber: 137,
                                                                    columnNumber: 53
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountInitial"])(person.name)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                                    lineNumber: 139,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: person.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, person.id, true, {
                                                            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 45
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                            lineNumber: 122,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                    lineNumber: 120,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 119,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 105,
                        columnNumber: 21
                    }, this),
                    pinnedPeople.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 border border-slate-100 rounded-lg p-2 bg-slate-50/50 max-h-[300px] overflow-y-auto",
                        children: pinnedPeople.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group flex items-center justify-between p-2 rounded-md bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            person.image_url ? // eslint-disable-next-line @next/next/no-img-element
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: person.image_url,
                                                alt: "",
                                                className: "w-8 h-8 rounded-full object-cover border border-slate-100"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                lineNumber: 163,
                                                columnNumber: 45
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountInitial"])(person.name)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                lineNumber: 165,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-slate-700",
                                                children: person.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                                lineNumber: 169,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                        lineNumber: 160,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: ()=>togglePin(person.id),
                                        className: "h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                            lineNumber: 177,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                        lineNumber: 171,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, person.id, true, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 156,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 154,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-sm",
                        children: "No people selected. Use the search bar to add."
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 183,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                lineNumber: 98,
                columnNumber: 17
            }, this),
            config.mode === 'smart' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border border-blue-100 bg-blue-50/50 rounded-lg text-sm text-blue-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Note:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 193,
                                columnNumber: 25
                            }, this),
                            ' In Smart Mode, the system tracks your "Lend" and "Repay" actions and automatically updates the Quick List.'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 192,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-xs text-blue-600",
                        children: [
                            "Currently tracking ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: people.length
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                                lineNumber: 196,
                                columnNumber: 44
                            }, this),
                            " people."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                        lineNumber: 195,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                lineNumber: 191,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-2 flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: handleSave,
                    disabled: isSaving,
                    className: "gap-2",
                    children: [
                        isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "h-4 w-4 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                            lineNumber: 203,
                            columnNumber: 33
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                            lineNumber: 203,
                            columnNumber: 80
                        }, this),
                        "Save Settings"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                    lineNumber: 202,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/moneyflow/quick-people-settings.tsx",
        lineNumber: 82,
        columnNumber: 9
    }, this);
}
_s(QuickPeopleSettings, "BK8Sdl/SIGy6nf90lDU47LoiwX4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = QuickPeopleSettings;
var _c;
__turbopack_context__.k.register(_c, "QuickPeopleSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/quick-people-settings-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuickPeopleSettingsDialog",
    ()=>QuickPeopleSettingsDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$quick$2d$people$2d$settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/quick-people-settings.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function QuickPeopleSettingsDialog({ isOpen, onOpenChange, people }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: "Quick People Settings"
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/quick-people-settings-dialog.tsx",
                        lineNumber: 18,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/quick-people-settings-dialog.tsx",
                    lineNumber: 17,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$quick$2d$people$2d$settings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickPeopleSettings"], {
                    people: people,
                    onClose: ()=>onOpenChange(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/quick-people-settings-dialog.tsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/quick-people-settings-dialog.tsx",
            lineNumber: 16,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/quick-people-settings-dialog.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_c = QuickPeopleSettingsDialog;
var _c;
__turbopack_context__.k.register(_c, "QuickPeopleSettingsDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/moneyflow/unified-transaction-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnifiedTransactionTable",
    ()=>UnifiedTransactionTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-down.js [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-check.js [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sigma.js [app-client] (ecmascript) <export default as Sigma>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Files$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/files.js [app-client] (ecmascript) <export default as Files>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-basket.js [app-client] (ecmascript) <export default as ShoppingBasket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-left.js [app-client] (ecmascript) <export default as ArrowDownLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserMinus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-minus.js [app-client] (ecmascript) <export default as UserMinus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users-round.js [app-client] (ecmascript) <export default as Users2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book.js [app-client] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$column$2d$customizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/column-customizer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/transaction-mapper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$mobile$2f$MobileTransactionsSimpleList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/mobile/MobileTransactionsSimpleList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/custom-tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$transaction$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/transaction-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$c1cae6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:c1cae6 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$f42329__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:f42329 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$4e2153__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:4e2153 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$e4ab40__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:e4ab40 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$refunds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/refunds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycle-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$person$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/person-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$confirm$2d$refund$2d$dialog$2d$v2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/confirm-refund-dialog-v2.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$request$2d$refund$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/request-refund-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$transaction$2d$history$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/transaction-history-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$transaction$2d$slide$2d$v2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$excel$2d$status$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/excel-status-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/empty-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transactions$2d$v2$2f$badge$2f$CycleBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transactions-v2/badge/CycleBadge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
});
;
const UnifiedTransactionTable = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(_c = _s(({ data, transactions, accountType, accountId, contextId, selectedTxnIds, onSelectionChange, onSelectTxn, onSelectAll, accounts = [], categories = [], people = [], shops = [], activeTab, hiddenColumns = [], columnOrder, onBulkActionStateChange, sortState: externalSortState, onSortChange, context, isExcelMode = false, showPagination = true, currentPage: propCurrentPage, totalPages, pageSize: propPageSize, onPageChange, onPageSizeChange, fontSize: externalFontSize, onFontSizeChange, onEdit: externalOnEdit, onDuplicate: externalOnDuplicate, onSuccess, loadingIds, setIsGlobalLoading, setLoadingMessage, searchQuery, hideFilters = false, compact = false }, ref)=>{
    _s();
    const [tableData, setTableData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "UnifiedTransactionTable.useState": ()=>data ?? transactions ?? []
    }["UnifiedTransactionTable.useState"]);
    const [updatingTxnIds, setUpdatingTxnIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    // Refund/Cancel Dialog State
    const [isRefundOpen, setIsRefundOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [refundTarget, setRefundTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refundType, setRefundType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("refund");
    // Confirm Refund Dialog State
    const [confirmRefundOpen, setConfirmRefundOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmRefundTxn, setConfirmRefundTxn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Store optimistic updates to persist across parent re-renders/stale server updates
    const optimisticTxns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            // Merge server data with pending optimistic updates
            const baseData = data ?? transactions ?? [];
            const merged = [
                ...baseData
            ];
            optimisticTxns.current.forEach({
                "UnifiedTransactionTable.useEffect": (optTxn)=>{
                    const idx = merged.findIndex({
                        "UnifiedTransactionTable.useEffect.idx": (t)=>t.id === optTxn.id
                    }["UnifiedTransactionTable.useEffect.idx"]);
                    if (idx !== -1) {
                        merged[idx] = optTxn;
                    } else {
                        // Prepend new transactions
                        merged.unshift(optTxn);
                    }
                }
            }["UnifiedTransactionTable.useEffect"]);
            setTableData(merged);
        }
    }["UnifiedTransactionTable.useEffect"], [
        data,
        transactions
    ]);
    const handleOptimisticUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[handleOptimisticUpdate]": (optimisticTxn)=>{
            // Safety check: if no ID, cannot update
            if (!optimisticTxn?.id) {
                console.warn("[Optimistic Update] Transaction has no ID, skipping update");
                return;
            }
            // 1. Store in ref for persistence
            optimisticTxns.current.set(optimisticTxn.id, optimisticTxn);
            // 2. Trigger Highlight Effect
            setUpdatingTxnIds({
                "UnifiedTransactionTable.useCallback[handleOptimisticUpdate]": (prev)=>{
                    const next = new Set(prev);
                    next.add(optimisticTxn.id);
                    return next;
                }
            }["UnifiedTransactionTable.useCallback[handleOptimisticUpdate]"]);
            // 3. Force Update Table Data immediately
            setTableData({
                "UnifiedTransactionTable.useCallback[handleOptimisticUpdate]": (prev)=>{
                    const index = prev.findIndex({
                        "UnifiedTransactionTable.useCallback[handleOptimisticUpdate].index": (t)=>t.id === optimisticTxn.id
                    }["UnifiedTransactionTable.useCallback[handleOptimisticUpdate].index"]);
                    if (index !== -1) {
                        const next = [
                            ...prev
                        ];
                        next[index] = optimisticTxn;
                        return next;
                    }
                    return [
                        optimisticTxn,
                        ...prev
                    ];
                }
            }["UnifiedTransactionTable.useCallback[handleOptimisticUpdate]"]);
            setTimeout({
                "UnifiedTransactionTable.useCallback[handleOptimisticUpdate]": ()=>{
                    setUpdatingTxnIds({
                        "UnifiedTransactionTable.useCallback[handleOptimisticUpdate]": (prev)=>{
                            const next = new Set(prev);
                            next.delete(optimisticTxn.id);
                            return next;
                        }
                    }["UnifiedTransactionTable.useCallback[handleOptimisticUpdate]"]);
                }
            }["UnifiedTransactionTable.useCallback[handleOptimisticUpdate]"], 2000);
        }
    }["UnifiedTransactionTable.useCallback[handleOptimisticUpdate]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "UnifiedTransactionTable.useImperativeHandle": ()=>({
                handleOptimisticUpdate
            })
    }["UnifiedTransactionTable.useImperativeHandle"], [
        handleOptimisticUpdate
    ]);
    const copyToClipboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[copyToClipboard]": async (value, successLabel)=>{
            try {
                if (navigator?.clipboard?.writeText) {
                    await navigator.clipboard.writeText(value);
                } else {
                    const textarea = document.createElement("textarea");
                    textarea.value = value;
                    textarea.style.position = "fixed";
                    textarea.style.opacity = "0";
                    const container = document.getElementById("portal-root") || document.body;
                    container.appendChild(textarea);
                    textarea.focus();
                    textarea.select();
                    document.execCommand("copy");
                    if (textarea.parentNode) {
                        textarea.parentNode.removeChild(textarea);
                    }
                }
                if (successLabel) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${successLabel} copied`);
                }
                return true;
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Copy failed");
                return false;
            }
        }
    }["UnifiedTransactionTable.useCallback[copyToClipboard]"], []);
    const handleQuickSyncCycle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[handleQuickSyncCycle]": async (personId, cycleTag)=>{
            const loadingId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading(`Syncing ${cycleTag} to Sheet...`);
            try {
                const response = await fetch("/api/sheets/manage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        personId,
                        cycleTag,
                        action: "sync"
                    })
                });
                const payload = await response.json().catch({
                    "UnifiedTransactionTable.useCallback[handleQuickSyncCycle]": ()=>null
                }["UnifiedTransactionTable.useCallback[handleQuickSyncCycle]"]);
                if (!response.ok) {
                    const details = [
                        payload?.requestId ? `Req ${payload.requestId}` : "",
                        payload?.stage ? `Stage ${payload.stage}` : ""
                    ].filter(Boolean).join(" | ");
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(payload?.error || "Sheet sync failed", {
                        id: loadingId,
                        description: details || undefined
                    });
                    return;
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Synced cycle ${cycleTag}`, {
                    id: loadingId,
                    description: typeof payload?.syncedCount === "number" ? `${payload.syncedCount} rows synced` : undefined
                });
            } catch (error) {
                const message = error instanceof Error ? error.message : "Sheet sync failed";
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(message, {
                    id: loadingId
                });
            }
        }
    }["UnifiedTransactionTable.useCallback[handleQuickSyncCycle]"], []);
    const defaultColumns = [
        {
            key: "date",
            label: "Date",
            defaultWidth: 138,
            minWidth: 124
        },
        {
            key: "shop",
            label: "Notes Flow",
            defaultWidth: 300,
            minWidth: 220
        },
        {
            key: "account",
            label: "Money Flow",
            defaultWidth: 380,
            minWidth: 280
        },
        {
            key: "amount",
            label: "BASE",
            defaultWidth: 120,
            minWidth: 100
        },
        {
            key: "total_back",
            label: "Total Back",
            defaultWidth: 120,
            minWidth: 100
        },
        {
            key: "final_price",
            label: "Net Value",
            defaultWidth: 120,
            minWidth: 100
        },
        {
            key: "category",
            label: "Category",
            defaultWidth: 130,
            minWidth: 110
        },
        {
            key: "cycle",
            label: "Debt Cycle",
            defaultWidth: 120,
            minWidth: 100
        },
        {
            key: "people",
            label: "People",
            defaultWidth: 150
        },
        {
            key: "id",
            label: "ID",
            defaultWidth: 100
        },
        {
            key: "actual_cashback",
            label: "Est. Cashback",
            defaultWidth: 120,
            minWidth: 100
        },
        {
            key: "est_share",
            label: "Cashback Shared",
            defaultWidth: 100,
            minWidth: 80
        },
        {
            key: "net_profit",
            label: "Profit",
            defaultWidth: 100,
            minWidth: 80
        },
        {
            key: "actions",
            label: "Action",
            defaultWidth: 100,
            minWidth: 60
        }
    ];
    const [isColumnCustomizerOpen, setIsColumnCustomizerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize with prop or default
    const [customColumnOrder, setCustomColumnOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "UnifiedTransactionTable.useState": ()=>columnOrder ?? defaultColumns.map({
                "UnifiedTransactionTable.useState": (c)=>c.key
            }["UnifiedTransactionTable.useState"])
    }["UnifiedTransactionTable.useState"]);
    const mobileColumnOrder = [
        "date",
        "shop",
        "category",
        "account",
        "amount"
    ];
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Internal state removed for activeTab, now using prop with fallback
    const lastSelectedIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showSelectedOnly, setShowSelectedOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTotals, setShowTotals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [internalSelection, setInternalSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "UnifiedTransactionTable.useState": ()=>{
            const initial = {
                date: true,
                shop: true,
                note: false,
                category: true,
                tag: false,
                account: true,
                amount: true,
                final_price: true,
                total_back: false,
                id: false,
                actions: true,
                actual_cashback: false,
                est_share: false,
                net_profit: false,
                back_info: false,
                people: false,
                cycle: false
            };
            if (hiddenColumns.length > 0) {
                hiddenColumns.forEach({
                    "UnifiedTransactionTable.useState": (col)=>{
                        initial[col] = false;
                    }
                }["UnifiedTransactionTable.useState"]);
            }
            return initial;
        }
    }["UnifiedTransactionTable.useState"]);
    // ... (skipping some lines for brevity in replacing, but need to be careful with context)
    // Actually I will target the defaultColumns block first.
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [columnWidths, setColumnWidths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "UnifiedTransactionTable.useState": ()=>{
            const map = {};
            defaultColumns.forEach({
                "UnifiedTransactionTable.useState": (col)=>{
                    map[col.key] = col.defaultWidth;
                }
            }["UnifiedTransactionTable.useState"]);
            return map;
        }
    }["UnifiedTransactionTable.useState"]);
    // --- Persistence Logic ---
    const hiddenColsStr = JSON.stringify(hiddenColumns);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            // Load saved settings
            try {
                const savedOrder = localStorage.getItem("mf_v3_col_order");
                const savedVis = localStorage.getItem("mf_v3_col_vis");
                const savedWidths = localStorage.getItem("mf_v3_col_width");
                if (savedOrder) {
                    const parsed = JSON.parse(savedOrder);
                    // Append any missing default columns (new features)
                    const missing = defaultColumns.filter({
                        "UnifiedTransactionTable.useEffect.missing": (c)=>!parsed.includes(c.key)
                    }["UnifiedTransactionTable.useEffect.missing"]).map({
                        "UnifiedTransactionTable.useEffect.missing": (c)=>c.key
                    }["UnifiedTransactionTable.useEffect.missing"]);
                    setCustomColumnOrder([
                        ...parsed,
                        ...missing
                    ]);
                }
                if (savedVis) {
                    const parsedVis = JSON.parse(savedVis);
                    // Apply hiddenColumns prop override
                    if (hiddenColumns && hiddenColumns.length > 0) {
                        hiddenColumns.forEach({
                            "UnifiedTransactionTable.useEffect": (col)=>{
                                parsedVis[col] = false;
                            }
                        }["UnifiedTransactionTable.useEffect"]);
                    }
                    // AUTO-SHOW Cycle Column in Person/Account context if not explicitly hidden
                    if ((context === "person" || context === "account") && !hiddenColumns?.includes("cycle")) {
                        parsedVis["cycle"] = true;
                    }
                    setVisibleColumns({
                        "UnifiedTransactionTable.useEffect": (prev)=>({
                                ...prev,
                                ...parsedVis
                            })
                    }["UnifiedTransactionTable.useEffect"]);
                }
                if (savedWidths) {
                    setColumnWidths({
                        "UnifiedTransactionTable.useEffect": (prev)=>({
                                ...prev,
                                ...JSON.parse(savedWidths)
                            })
                    }["UnifiedTransactionTable.useEffect"]);
                }
            } catch (e) {
                console.error("Failed to load column settings", e);
            }
        }
    }["UnifiedTransactionTable.useEffect"], [
        hiddenColsStr,
        context
    ]); // Stable dependency
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            if (customColumnOrder.length > 0) localStorage.setItem("mf_v3_col_order", JSON.stringify(customColumnOrder));
        }
    }["UnifiedTransactionTable.useEffect"], [
        customColumnOrder
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            localStorage.setItem("mf_v3_col_vis", JSON.stringify(visibleColumns));
        }
    }["UnifiedTransactionTable.useEffect"], [
        visibleColumns
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            localStorage.setItem("mf_v3_col_width", JSON.stringify(columnWidths));
        }
    }["UnifiedTransactionTable.useEffect"], [
        columnWidths
    ]);
    // --- Excel Mode State & Logic ---
    const [selectedCells, setSelectedCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [selectedColumn, setSelectedColumn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSelectingCells, setIsSelectingCells] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectionStartId, setSelectionStartId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCellMouseDown = (txnId, colKey, e)=>{
        if (!isExcelMode) return;
        // Only allow selection on amount (VALUE) column
        if (colKey !== "amount") return;
        if (!e.shiftKey && !e.ctrlKey) {
            // Clear previous if not multi-select modifier
            setSelectedCells(new Set([
                txnId
            ]));
            setSelectionStartId(txnId);
            setSelectedColumn(colKey); // Lock selection to this column type
            setIsSelectingCells(true);
        } else if (e.shiftKey && selectionStartId && selectedColumn === colKey) {
            // Shift select range
            const startIdx = tableData.findIndex((t)=>t.id === selectionStartId);
            const currentIdx = tableData.findIndex((t)=>t.id === txnId);
            if (startIdx !== -1 && currentIdx !== -1) {
                const min = Math.min(startIdx, currentIdx);
                const max = Math.max(startIdx, currentIdx);
                const rangeIds = tableData.slice(min, max + 1).map((t)=>t.id);
                setSelectedCells((prev)=>{
                    const next = new Set(prev);
                    rangeIds.forEach((id)=>next.add(id));
                    return next;
                });
            }
        } else if (e.ctrlKey) {
            // Toggle single
            setSelectedCells((prev)=>{
                const next = new Set(prev);
                if (next.has(txnId)) next.delete(txnId);
                else next.add(txnId);
                return next;
            });
            setSelectionStartId(txnId);
            setSelectedColumn(colKey);
        }
        // PREVENT NATIVE TEXT SELECTION
        e.preventDefault();
    };
    const handleCellMouseEnter = (txnId, colKey)=>{
        if (isExcelMode && isSelectingCells && selectionStartId && selectedColumn === colKey) {
            const startIdx = tableData.findIndex((t)=>t.id === selectionStartId);
            const currentIdx = tableData.findIndex((t)=>t.id === txnId);
            if (startIdx !== -1 && currentIdx !== -1) {
                const min = Math.min(startIdx, currentIdx);
                const max = Math.max(startIdx, currentIdx);
                const rangeIds = tableData.slice(min, max + 1).map((t)=>t.id);
                setSelectedCells(new Set(rangeIds));
            }
        }
    };
    const handleCellMouseUp = ()=>{
        setIsSelectingCells(false);
    };
    // Clear selection when mode changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            if (!isExcelMode) {
                setSelectedCells(new Set());
                setSelectedColumn(null);
                setIsSelectingCells(false);
            }
        }
    }["UnifiedTransactionTable.useEffect"], [
        isExcelMode
    ]);
    const resolveCashbackFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[resolveCashbackFields]": (txn)=>{
            const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMetadata"])(txn.metadata);
            const fromMetadata = {
                "UnifiedTransactionTable.useCallback[resolveCashbackFields].fromMetadata": (key)=>{
                    const direct = metadata?.[key];
                    if (direct !== undefined && direct !== null) return Number(direct);
                    const nested = metadata?.cashback?.[key];
                    if (nested !== undefined && nested !== null) return Number(nested);
                    return undefined;
                }
            }["UnifiedTransactionTable.useCallback[resolveCashbackFields].fromMetadata"];
            const percentRaw = Number(txn.cashback_share_percent ?? fromMetadata("cashback_share_percent") ?? fromMetadata("share_percent") ?? 0);
            const fixedRaw = Number(txn.cashback_share_fixed ?? fromMetadata("cashback_share_fixed") ?? fromMetadata("share_fixed") ?? 0);
            const percentMagnitude = Math.abs(percentRaw);
            const fixedMagnitude = Math.abs(fixedRaw);
            const amountAbs = Math.abs(Number(txn.original_amount ?? txn.amount ?? 0));
            const normalizedPercent = percentMagnitude > 1 ? percentMagnitude / 100 : percentMagnitude;
            const shareComputed = amountAbs * normalizedPercent + fixedMagnitude;
            const shareAmountRaw = Number(txn.cashback_share_amount ?? fromMetadata("cashback_share_amount") ?? fromMetadata("share_amount") ?? (shareComputed > 0 ? shareComputed : 0));
            const bankBackRaw = Number(txn.bank_back ?? fromMetadata("bank_back") ?? fromMetadata("estimated_cashback") ?? 0);
            return {
                percentRaw: Number.isFinite(percentMagnitude) ? percentMagnitude : 0,
                fixedRaw: Number.isFinite(fixedMagnitude) ? fixedMagnitude : 0,
                shareAmount: Number.isFinite(shareAmountRaw) ? Math.abs(shareAmountRaw) : 0,
                bankBack: Number.isFinite(bankBackRaw) ? Math.abs(bankBackRaw) : 0
            };
        }
    }["UnifiedTransactionTable.useCallback[resolveCashbackFields]"], []);
    const selectedStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[selectedStats]": ()=>{
            if (selectedCells.size === 0 || !selectedColumn) return {
                totalIn: 0,
                totalOut: 0,
                average: 0,
                count: 0
            };
            let totalIn = 0;
            let totalOut = 0;
            let count = 0;
            selectedCells.forEach({
                "UnifiedTransactionTable.useMemo[selectedStats]": (id)=>{
                    const txn = tableData.find({
                        "UnifiedTransactionTable.useMemo[selectedStats].txn": (t)=>t.id === id
                    }["UnifiedTransactionTable.useMemo[selectedStats].txn"]);
                    if (txn) {
                        let val = 0;
                        if (selectedColumn === "amount") {
                            // Use final price if has cashback, otherwise use original amount
                            const originalAmount = typeof txn.original_amount === "number" ? txn.original_amount : txn.amount;
                            const { percentRaw, fixedRaw, shareAmount } = resolveCashbackFields(txn);
                            const hasCashback = percentRaw > 0 || fixedRaw > 0 || shareAmount > 0;
                            if (hasCashback) {
                                const cashbackAmount = shareAmount;
                                const baseAmount = Math.abs(Number(originalAmount ?? 0));
                                const finalDisp = typeof txn.final_price === "number" ? Math.abs(txn.final_price) : cashbackAmount > baseAmount ? baseAmount : Math.max(0, baseAmount - cashbackAmount);
                                // Force sign based on type if available, otherwise trust amount
                                if ([
                                    "expense",
                                    "debt",
                                    "transfer"
                                ].includes(txn.type)) val = -finalDisp;
                                else if ([
                                    "income",
                                    "repayment"
                                ].includes(txn.type)) val = finalDisp;
                                else val = (originalAmount ?? 0) < 0 ? -finalDisp : finalDisp;
                            } else {
                                // Force sign based on type
                                const absVal = Math.abs(originalAmount ?? 0);
                                if ([
                                    "expense",
                                    "debt",
                                    "transfer"
                                ].includes(txn.type)) val = -absVal;
                                else if ([
                                    "income",
                                    "repayment"
                                ].includes(txn.type)) val = absVal;
                                else val = originalAmount ?? 0;
                            }
                        }
                        if (val > 0) totalIn += val;
                        else totalOut += Math.abs(val);
                        count++;
                    }
                }
            }["UnifiedTransactionTable.useMemo[selectedStats]"]);
            return {
                totalIn,
                totalOut,
                average: count > 0 ? (totalIn - totalOut) / count : 0,
                count
            };
        }
    }["UnifiedTransactionTable.useMemo[selectedStats]"], [
        resolveCashbackFields,
        selectedCells,
        selectedColumn,
        tableData
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            setVisibleColumns({
                "UnifiedTransactionTable.useEffect": (prev)=>{
                    const next = {
                        ...prev
                    };
                    if (hiddenColumns.length > 0) {
                        hiddenColumns.forEach({
                            "UnifiedTransactionTable.useEffect": (col)=>{
                                next[col] = false;
                            }
                        }["UnifiedTransactionTable.useEffect"]);
                    }
                    next.date = hiddenColumns.includes("date") ? false : true;
                    next.shop = hiddenColumns.includes("shop") ? false : true;
                    next.category = hiddenColumns.includes("category") ? false : true;
                    next.account = hiddenColumns.includes("account") ? false : true;
                    next.amount = hiddenColumns.includes("amount") ? false : true;
                    next.id = hiddenColumns.includes("id") ? false : false;
                    // Simple deep equality check to prevent infinite loop
                    if (JSON.stringify(prev) === JSON.stringify(next)) {
                        return prev;
                    }
                    return next;
                }
            }["UnifiedTransactionTable.useEffect"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["UnifiedTransactionTable.useEffect"], [
        JSON.stringify(hiddenColumns),
        isMobile
    ]);
    // Cashback Columns Visibility based on Account Type
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            setVisibleColumns({
                "UnifiedTransactionTable.useEffect": (prev)=>{
                    const next = {
                        ...prev
                    };
                    const showCashback = accountType === "credit_card";
                    // Only update if changed
                    if (prev.actual_cashback === showCashback && prev.est_share === showCashback && prev.net_profit === showCashback) {
                        return prev;
                    }
                    next.actual_cashback = showCashback;
                    next.est_share = showCashback;
                    next.net_profit = showCashback;
                    return next;
                }
            }["UnifiedTransactionTable.useEffect"]);
        }
    }["UnifiedTransactionTable.useEffect"], [
        accountType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            const updateIsMobile = {
                "UnifiedTransactionTable.useEffect.updateIsMobile": ()=>{
                    if ("TURBOPACK compile-time truthy", 1) {
                        setIsMobile(window.innerWidth < 768);
                    }
                }
            }["UnifiedTransactionTable.useEffect.updateIsMobile"];
            updateIsMobile();
            window.addEventListener("resize", updateIsMobile);
            return ({
                "UnifiedTransactionTable.useEffect": ()=>window.removeEventListener("resize", updateIsMobile)
            })["UnifiedTransactionTable.useEffect"];
        }
    }["UnifiedTransactionTable.useEffect"], []);
    // Realtime Subscription
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const channel = supabase.channel("realtime-transactions").on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "transactions"
            }, {
                "UnifiedTransactionTable.useEffect.channel": ()=>{
                    router.refresh();
                }
            }["UnifiedTransactionTable.useEffect.channel"]).subscribe();
            return ({
                "UnifiedTransactionTable.useEffect": ()=>{
                    supabase.removeChannel(channel);
                }
            })["UnifiedTransactionTable.useEffect"];
        }
    }["UnifiedTransactionTable.useEffect"], [
        router
    ]);
    // State for actions
    const [actionMenuOpen, setActionMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingTxn, setEditingTxn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [successTxnIds, setSuccessTxnIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set()); // For green flash effect if needed
    const [confirmVoidTarget, setConfirmVoidTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmCancelTarget, setConfirmCancelTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVoiding, setIsVoiding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRestoring, setIsRestoring] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voidError, setVoidError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [historyTarget, setHistoryTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmDeletingTarget, setConfirmDeletingTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [operationMode, setOperationMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("edit");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            if (!actionMenuOpen) return;
            const handleOutsideClick = {
                "UnifiedTransactionTable.useEffect.handleOutsideClick": (event)=>{
                    const target = event.target;
                    if (!target) return;
                    if (target.closest("[data-action-menu]") || target.closest("[data-action-trigger]")) return;
                    setActionMenuOpen(null);
                }
            }["UnifiedTransactionTable.useEffect.handleOutsideClick"];
            document.addEventListener("mousedown", handleOutsideClick);
            return ({
                "UnifiedTransactionTable.useEffect": ()=>document.removeEventListener("mousedown", handleOutsideClick)
            })["UnifiedTransactionTable.useEffect"];
        }
    }["UnifiedTransactionTable.useEffect"], [
        actionMenuOpen
    ]);
    const [statusOverrides, setStatusOverrides] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [refundFormTxn, setRefundFormTxn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [refundFormStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("request");
    const [internalSortState, setInternalSortState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        key: "date",
        dir: "desc"
    });
    const [bulkDialog, setBulkDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const stopBulk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Font Size Logic
    const [internalFontSize, setInternalFontSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(14);
    const fontSize = externalFontSize ?? internalFontSize;
    const setFontSize = onFontSizeChange ?? setInternalFontSize;
    // Pagination State Logic
    const [internalPageSize, setInternalPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const [internalCurrentPage, setInternalCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const pageSize = propPageSize ?? internalPageSize;
    const currentPage = propCurrentPage ?? internalCurrentPage;
    const setPageSize = (size)=>{
        setInternalPageSize(size);
        onPageSizeChange?.(size);
    };
    const setCurrentPage = (page)=>{
        setInternalCurrentPage(page);
        onPageChange?.(page);
    };
    const sortState = externalSortState ?? internalSortState;
    const setSortState = onSortChange ?? setInternalSortState;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            if (!propCurrentPage) {
                setCurrentPage(1);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["UnifiedTransactionTable.useEffect"], [
        data,
        transactions,
        accountType,
        accountId,
        sortState,
        context
    ]);
    const editingInitialValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[editingInitialValues]": ()=>editingTxn ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildEditInitialValues"])(editingTxn) : null
    }["UnifiedTransactionTable.useMemo[editingInitialValues]"], [
        editingTxn
    ]);
    const refundAccountOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[refundAccountOptions]": ()=>accounts.filter({
                "UnifiedTransactionTable.useMemo[refundAccountOptions]": (acc)=>acc.id !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$refunds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REFUND_PENDING_ACCOUNT_ID"]
            }["UnifiedTransactionTable.useMemo[refundAccountOptions]"])
    }["UnifiedTransactionTable.useMemo[refundAccountOptions]"], [
        accounts
    ]);
    const selection = selectedTxnIds ?? internalSelection;
    const updateSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[updateSelection]": (next)=>{
            if (onSelectionChange) {
                onSelectionChange(next);
                return;
            }
            setInternalSelection(next);
        }
    }["UnifiedTransactionTable.useCallback[updateSelection]"], [
        onSelectionChange
    ]);
    // Auto-disable Show Selected Only when selection is cleared
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            if (selection.size === 0 && showSelectedOnly) {
                setShowSelectedOnly(false);
            }
        }
    }["UnifiedTransactionTable.useEffect"], [
        selection.size,
        showSelectedOnly
    ]);
    const resetColumns = ()=>{
        const map = {};
        defaultColumns.forEach((col)=>{
            map[col.key] = col.defaultWidth;
        });
        setColumnWidths(map);
        setFontSize(14); // Reset font size to default
    // Note: Column visibility is NOT reset - user's choice is preserved
    };
    // --- Date Formatting (Updated to DD-MM format) ---
    const formattedDate = (value)=>{
        const d = new Date(value);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        return `${day}-${month}`;
    };
    // --- Actions ---
    const closeVoidDialog = ()=>{
        setConfirmVoidTarget(null);
        setVoidError(null);
        setIsVoiding(false);
    };
    const handleRestore = async (txn)=>{
        setIsRestoring(true);
        try {
            const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$e4ab40__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["restoreTransaction"])(txn.id);
            if (!ok) {
                setVoidError("Unable to restore transaction. Please try again.");
                return;
            }
            setActionMenuOpen(null);
            setVoidError(null);
            setStatusOverrides((prev)=>({
                    ...prev,
                    [txn.id]: "posted"
                }));
            if (onSuccess) await onSuccess();
            window.dispatchEvent(new CustomEvent("refresh-account-data"));
            router.refresh();
        } catch (err) {
            console.error("Failed to restore transaction:", err);
            setVoidError("Unable to restore transaction. Please try again.");
        } finally{
            setIsRestoring(false);
        }
    };
    const handleRefundFormSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[handleRefundFormSuccess]": ()=>{
            setRefundFormTxn(null);
            router.refresh();
        }
    }["UnifiedTransactionTable.useCallback[handleRefundFormSuccess]"], [
        router
    ]);
    const validateRefundVoidOrder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[validateRefundVoidOrder]": (target)=>{
            const findTxnById = {
                "UnifiedTransactionTable.useCallback[validateRefundVoidOrder].findTxnById": (id)=>{
                    if (!id) return null;
                    return tableData.find({
                        "UnifiedTransactionTable.useCallback[validateRefundVoidOrder].findTxnById": (txn)=>txn.id === id
                    }["UnifiedTransactionTable.useCallback[validateRefundVoidOrder].findTxnById"]) ?? null;
                }
            }["UnifiedTransactionTable.useCallback[validateRefundVoidOrder].findTxnById"];
            const effectiveStatus = {
                "UnifiedTransactionTable.useCallback[validateRefundVoidOrder].effectiveStatus": (txn)=>{
                    if (!txn) return null;
                    return statusOverrides[txn.id] ?? txn.status;
                }
            }["UnifiedTransactionTable.useCallback[validateRefundVoidOrder].effectiveStatus"];
            const targetMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMetadata"])(target.metadata);
            const isGD3 = targetMeta?.is_refund_confirmation === true;
            const isGD2 = typeof targetMeta?.original_transaction_id === 'string' && !isGD3;
            if (isGD3) return null;
            if (isGD2) {
                const directGd3Id = typeof targetMeta?.confirmation_transaction_id === 'string' ? targetMeta.confirmation_transaction_id : null;
                const gd3FromDirectLink = findTxnById(directGd3Id);
                const gd3Fallback = tableData.find({
                    "UnifiedTransactionTable.useCallback[validateRefundVoidOrder]": (txn)=>{
                        const meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMetadata"])(txn.metadata);
                        return meta?.is_refund_confirmation === true && meta?.refund_request_id === target.id;
                    }
                }["UnifiedTransactionTable.useCallback[validateRefundVoidOrder]"]) ?? null;
                const gd3Txn = gd3FromDirectLink ?? gd3Fallback;
                if (gd3Txn && effectiveStatus(gd3Txn) !== 'void') {
                    return {
                        title: 'Void blocked by refund order',
                        description: 'Please void GD3 (refund confirmation) before GD2.'
                    };
                }
                return null;
            }
            const isGD1 = target.status === 'waiting_refund' || targetMeta?.has_refund_request === true || typeof targetMeta?.refund_request_id === 'string';
            if (!isGD1) return null;
            const gd2Id = typeof targetMeta?.refund_request_id === 'string' ? targetMeta.refund_request_id : null;
            const gd2Txn = findTxnById(gd2Id);
            if (gd2Txn && effectiveStatus(gd2Txn) !== 'void') {
                return {
                    title: 'Void blocked by refund order',
                    description: 'Please void GD2 (refund request) before GD1.'
                };
            }
            const gd3IdFromOriginal = typeof targetMeta?.refund_confirmation_id === 'string' ? targetMeta.refund_confirmation_id : null;
            const gd2Meta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMetadata"])(gd2Txn?.metadata);
            const gd3IdFromGd2 = typeof gd2Meta?.confirmation_transaction_id === 'string' ? gd2Meta.confirmation_transaction_id : null;
            const gd3Txn = findTxnById(gd3IdFromOriginal) ?? findTxnById(gd3IdFromGd2) ?? null;
            if (gd3Txn && effectiveStatus(gd3Txn) !== 'void') {
                return {
                    title: 'Void blocked by refund order',
                    description: 'Please void GD3 (refund confirmation) before GD1.'
                };
            }
            return null;
        }
    }["UnifiedTransactionTable.useCallback[validateRefundVoidOrder]"], [
        tableData,
        statusOverrides
    ]);
    const handleVoidConfirm = async ()=>{
        if (!confirmVoidTarget) return;
        setVoidError(null);
        const orderWarning = validateRefundVoidOrder(confirmVoidTarget);
        if (orderWarning) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(orderWarning.title, {
                description: orderWarning.description
            });
            return;
        }
        setIsVoiding(true);
        if (setIsGlobalLoading) setIsGlobalLoading(true);
        if (setLoadingMessage) setLoadingMessage("Voiding transaction...");
        const targetId = confirmVoidTarget.id;
        setConfirmVoidTarget(null);
        setUpdatingTxnIds((prev)=>new Set(prev).add(targetId));
        try {
            const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$4e2153__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["voidTransactionAction"])(targetId);
            if (!ok) {
                setVoidError("Unable to void transaction. Please try again.");
                return;
            }
            setStatusOverrides((prev)=>({
                    ...prev,
                    [targetId]: "void"
                }));
            if (onSuccess) await onSuccess();
            window.dispatchEvent(new CustomEvent("refresh-account-data"));
            router.refresh();
        } catch (err) {
            if (err.message && err.message.includes("BATCH_LOCKED:")) {
                const batchId = err.message.split("BATCH_LOCKED:")[1]?.trim();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold",
                            children: "Giao dịch Bot Batch"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1161,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs",
                            children: "Không được xóa tại đây để tránh lệch Data."
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1162,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        batchId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `/batch/detail/${batchId}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "font-bold underline text-indigo-400 mt-1",
                            children: "Mở trang Batch để Unconfirm"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1166,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 1160,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)), {
                    duration: 8000
                });
            } else if (err.message && err.message.includes("void the confirmation transaction first")) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please void the Confirmation Transaction (GD3) first.", {
                    description: "Linked confirmation exists."
                });
            } else {
                setVoidError(err.message || "Unable to void transaction. Please try again.");
            }
        } finally{
            setIsVoiding(false);
            if (setIsGlobalLoading) setIsGlobalLoading(false);
            setUpdatingTxnIds((prev)=>{
                const next = new Set(prev);
                next.delete(targetId);
                return next;
            });
        }
    };
    const handleCancelOrderConfirm = (moneyReceived)=>{
        if (!confirmCancelTarget) return;
        setVoidError(null);
        setIsVoiding(true);
        Promise.all([
            __turbopack_context__.A("[project]/src/actions/transaction-actions.ts [app-client] (ecmascript, async loader)"),
            __turbopack_context__.A("[project]/src/services/transaction.service.ts [app-client] (ecmascript, async loader)")
        ]).then(async ([actions, service])=>{
            const { requestRefund, confirmRefundAction } = actions;
            const { confirmRefund } = service; // If we still want the service version, but let's use the one that works.
            const originalAmount = typeof confirmCancelTarget.original_amount === "number" ? confirmCancelTarget.original_amount : confirmCancelTarget.amount;
            const amountToRefund = Math.abs(originalAmount ?? 0);
            try {
                // 1. Request Refund
                const reqRes = await requestRefund(confirmCancelTarget.id, amountToRefund, false);
                if (!reqRes.success) {
                    throw new Error(reqRes.error || "Failed to request refund");
                }
                // 2. If Money Received, Confirm it immediately
                if (moneyReceived) {
                    const targetAccountId = confirmCancelTarget.account_id;
                    if (!targetAccountId) {
                        throw new Error("Cannot determine target account for immediate refund.");
                    }
                    // Use action version for consistency
                    const confRes = await confirmRefundAction(confirmCancelTarget.id, targetAccountId);
                    if (!confRes.success) {
                        throw new Error(confRes.error || "Failed to confirm refund");
                    }
                }
                if (onSuccess) await onSuccess();
                window.dispatchEvent(new CustomEvent("refresh-account-data"));
                router.refresh();
                setConfirmCancelTarget(null);
            } catch (err) {
                console.error(err);
                setVoidError(err.message || "Failed to cancel order");
            } finally{
                setIsVoiding(false);
            }
        });
    };
    const handleBulkVoid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[handleBulkVoid]": async ()=>{
            if (selection.size === 0) return;
            setBulkDialog({
                mode: "void",
                open: true
            });
        }
    }["UnifiedTransactionTable.useCallback[handleBulkVoid]"], [
        selection.size
    ]);
    const handleBulkRestore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[handleBulkRestore]": async ()=>{
            if (selection.size === 0) return;
            setBulkDialog({
                mode: "restore",
                open: true
            });
        }
    }["UnifiedTransactionTable.useCallback[handleBulkRestore]"], [
        selection.size
    ]);
    const handleBulkDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[handleBulkDelete]": async ()=>{
            if (selection.size === 0) return;
            setBulkDialog({
                mode: "delete",
                open: true
            });
        }
    }["UnifiedTransactionTable.useCallback[handleBulkDelete]"], [
        selection.size
    ]);
    const currentTab = activeTab ?? "active";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnifiedTransactionTable.useEffect": ()=>{
            if (!onBulkActionStateChange) return;
            onBulkActionStateChange({
                selectionCount: selection.size,
                currentTab,
                onVoidSelected: handleBulkVoid,
                onRestoreSelected: handleBulkRestore,
                onDeleteSelected: handleBulkDelete,
                isVoiding,
                isRestoring,
                isDeleting
            });
        }
    }["UnifiedTransactionTable.useEffect"], [
        currentTab,
        handleBulkRestore,
        handleBulkVoid,
        handleBulkDelete,
        isRestoring,
        isVoiding,
        isDeleting,
        onBulkActionStateChange,
        selection.size
    ]);
    // Duplicate feature temporarily removed - will rewrite from scratch later
    const handleEdit = (txn)=>{
        const metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMetadata"])(txn.metadata);
        const isBatchTxn = Boolean(metadata?.batch_id);
        if (isBatchTxn) {
            const explicitStep = String(metadata?.batch_step || "").toLowerCase();
            const isStep3 = explicitStep === "step3" || Boolean(metadata?.batch_item_id) || String(txn.note || "").startsWith("[C] ");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(isStep3 ? "This is a Batch Step 3 confirmed transaction. Editing may desync checklist confirmation." : "This is a Batch Step 1 funding transaction. Editing may desync batch funding totals.", {
                duration: 5000
            });
        }
        if (externalOnEdit) {
            externalOnEdit(txn);
            return;
        }
        setOperationMode("edit");
        setEditingTxn(txn);
        setActionMenuOpen(null);
    };
    const handleDuplicate = (txn)=>{
        if (externalOnDuplicate) {
            externalOnDuplicate(txn);
            return;
        }
        setOperationMode("duplicate");
        setEditingTxn(txn);
        setActionMenuOpen(null);
    };
    const handleSingleDeleteConfirm = async ()=>{
        if (!confirmDeletingTarget) return;
        setIsDeleting(true);
        setLoadingMessage?.("Deleting transaction...");
        setIsGlobalLoading?.(true);
        try {
            const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$c1cae6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteTransaction"])(confirmDeletingTarget.id);
            if (ok) {
                setConfirmDeletingTarget(null);
                if (onSuccess) await onSuccess();
                window.dispatchEvent(new CustomEvent("refresh-account-data"));
                router.refresh();
            } else {
                setVoidError("Failed to delete transaction.");
            }
        } catch (err) {
            setVoidError(err.message || "Failed to delete transaction.");
        } finally{
            setIsDeleting(false);
            setIsGlobalLoading?.(false);
        }
    };
    const handleOpenLinkedDebt = async (id, e)=>{
        e.stopPropagation();
        try {
            const txn = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$f42329__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getTransactionById"])(id);
            if (txn) {
                setEditingTxn(txn);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Linked transaction not found.");
            }
        } catch (err) {
            console.error("Failed to fetch linked transaction", err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to load linked transaction.");
        }
    };
    const executeBulk = async (mode)=>{
        if (selection.size === 0) return;
        stopBulk.current = false;
        let processedCount = 0;
        const processIds = Array.from(selection);
        // Initial loading state
        setUpdatingTxnIds(new Set(processIds));
        if (mode === "void") {
            setIsVoiding(true);
            let errorCount = 0;
            for (const id of processIds){
                if (stopBulk.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Process stopped. ${processedCount} items processed.`);
                    break;
                }
                try {
                    const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$4e2153__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["voidTransactionAction"])(id);
                    if (ok) {
                        setStatusOverrides((prev)=>({
                                ...prev,
                                [id]: "void"
                            }));
                    } else {
                        errorCount++;
                    }
                } catch  {
                    errorCount++;
                } finally{
                    setUpdatingTxnIds((prev)=>{
                        const next = new Set(prev);
                        next.delete(id);
                        return next;
                    });
                }
                processedCount++;
            }
            setIsVoiding(false);
            updateSelection(new Set());
            if (onSuccess) await onSuccess();
            window.dispatchEvent(new CustomEvent("refresh-account-data"));
            router.refresh();
            if (errorCount > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Failed to void ${errorCount} transactions.`);
            }
        } else if (mode === "restore") {
            setIsRestoring(true);
            let errorCount = 0;
            for (const id of processIds){
                if (stopBulk.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Process stopped. ${processedCount} items processed.`);
                    break;
                }
                const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$e4ab40__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["restoreTransaction"])(id);
                if (ok) {
                    setStatusOverrides((prev)=>({
                            ...prev,
                            [id]: "posted"
                        }));
                } else {
                    errorCount++;
                }
                setUpdatingTxnIds((prev)=>{
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
                processedCount++;
            }
            setIsRestoring(false);
            updateSelection(new Set());
            if (onSuccess) await onSuccess();
            window.dispatchEvent(new CustomEvent("refresh-account-data"));
            router.refresh();
            if (errorCount > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Failed to restore ${errorCount} transactions.`);
            }
        } else if (mode === "delete") {
            setIsDeleting(true);
            let errorCount = 0;
            for (const id of processIds){
                if (stopBulk.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Process stopped. ${processedCount} items processed.`);
                    break;
                }
                const ok = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$c1cae6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["deleteTransaction"])(id);
                if (!ok) {
                    errorCount++;
                }
                setUpdatingTxnIds((prev)=>{
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
                processedCount++;
            }
            setIsDeleting(false);
            updateSelection(new Set());
            if (onSuccess) await onSuccess();
            window.dispatchEvent(new CustomEvent("refresh-account-data"));
            router.refresh();
            if (errorCount > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Failed to delete ${errorCount} transactions.`);
            }
        }
        setBulkDialog(null);
        setUpdatingTxnIds(new Set()); // Safety clear
    };
    const displayedTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[displayedTransactions]": ()=>{
            if (showSelectedOnly && selection.size > 0) {
                return tableData.filter({
                    "UnifiedTransactionTable.useMemo[displayedTransactions]": (t)=>selection.has(t.id)
                }["UnifiedTransactionTable.useMemo[displayedTransactions]"]);
            }
            const filtered = tableData.filter({
                "UnifiedTransactionTable.useMemo[displayedTransactions].filtered": (txn)=>{
                    if (context === "account" && accountId) {
                    // If necessary, check if txn belongs to account.
                    // Assuming tableData is correct from server/parent.
                    }
                    // Add Search Logic
                    if (searchQuery) {
                        const q = searchQuery.toLowerCase();
                        const match = (txn.shop_name?.toLowerCase() || "").includes(q) || (txn.note?.toLowerCase() || "").includes(q) || (txn.category_name?.toLowerCase() || "").includes(q) || (txn.amount || "").toString().includes(q) || (txn.metadata?.original_description?.toLowerCase() || "").includes(q);
                        if (!match) return false;
                    }
                    // 2. Tab Filter
                    const status = statusOverrides[txn.id] ?? txn.status;
                    if (currentTab === "void") {
                        if (status !== "void") return false;
                    } else if (currentTab === "pending") {
                        // Pending logic (Yellow)
                        const isPending = status === "pending";
                        const isWaitingRefund = status === "waiting_refund";
                        if (!isPending && !isWaitingRefund) return false;
                    } else {
                        // Active tab: Show everything EXCEPT void
                        if (status === "void") return false;
                    }
                    return true;
                }
            }["UnifiedTransactionTable.useMemo[displayedTransactions].filtered"]);
            // Sort
            return filtered.sort({
                "UnifiedTransactionTable.useMemo[displayedTransactions]": (a, b)=>{
                    const dateA = new Date(a.occurred_at ?? a.created_at ?? 0).getTime();
                    const dateB = new Date(b.occurred_at ?? b.created_at ?? 0).getTime();
                    if (sortState.key === "date") {
                        return sortState.dir === "asc" ? dateA - dateB : dateB - dateA;
                    } else if (sortState.key === "amount") {
                        const amtA = Math.abs(a.amount ?? 0);
                        const amtB = Math.abs(b.amount ?? 0);
                        return sortState.dir === "asc" ? amtA - amtB : amtB - amtA;
                    }
                    // Default: sort by date descending
                    return dateB - dateA;
                }
            }["UnifiedTransactionTable.useMemo[displayedTransactions]"]);
        }
    }["UnifiedTransactionTable.useMemo[displayedTransactions]"], [
        tableData,
        showSelectedOnly,
        selection,
        context,
        accountId,
        statusOverrides,
        currentTab,
        sortState
    ]);
    const paginatedTransactions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[paginatedTransactions]": ()=>{
            const start = (currentPage - 1) * pageSize;
            return displayedTransactions.slice(start, start + pageSize);
        }
    }["UnifiedTransactionTable.useMemo[paginatedTransactions]"], [
        displayedTransactions,
        currentPage,
        pageSize
    ]);
    // Calculate total pages from displayedTransactions (not paginatedTransactions)
    const calculatedTotalPages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[calculatedTotalPages]": ()=>{
            return Math.ceil(displayedTransactions.length / pageSize) || 1;
        }
    }["UnifiedTransactionTable.useMemo[calculatedTotalPages]"], [
        displayedTransactions.length,
        pageSize
    ]);
    const handleSelectAll = (checked)=>{
        if (checked) {
            updateSelection(new Set(displayedTransactions.map((txn)=>txn.id)));
        } else {
            updateSelection(new Set());
        }
        onSelectAll?.(checked);
    };
    const handleSelectOne = (txnId, checked, shiftKey = false)=>{
        const newSet = new Set(selection);
        if (shiftKey && lastSelectedIdRef.current) {
            const startIdx = displayedTransactions.findIndex((t)=>t.id === lastSelectedIdRef.current);
            const endIdx = displayedTransactions.findIndex((t)=>t.id === txnId);
            if (startIdx !== -1 && endIdx !== -1) {
                const min = Math.min(startIdx, endIdx);
                const max = Math.max(startIdx, endIdx);
                const range = displayedTransactions.slice(min, max + 1);
                range.forEach((t)=>{
                    if (checked) newSet.add(t.id);
                    else newSet.delete(t.id);
                });
            }
        } else {
            if (checked) {
                newSet.add(txnId);
            } else {
                newSet.delete(txnId);
            }
        }
        lastSelectedIdRef.current = txnId;
        updateSelection(newSet);
        onSelectTxn?.(txnId, checked);
    };
    // --- Summary Calculation ---
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[summary]": ()=>{
            const selectedTxns = tableData.filter({
                "UnifiedTransactionTable.useMemo[summary].selectedTxns": (txn)=>selection.has(txn.id)
            }["UnifiedTransactionTable.useMemo[summary].selectedTxns"]);
            const initialSummary = {
                sumAmount: 0
            };
            const incomeSummary = {
                ...initialSummary
            };
            const expenseSummary = {
                ...initialSummary
            };
            for (const txn of selectedTxns){
                const visualType = txn.displayType ?? txn.type;
                const originalAmount = typeof txn.original_amount === "number" ? txn.original_amount : txn.amount;
                const absAmount = Math.abs(originalAmount ?? 0);
                if (visualType === "income") {
                    incomeSummary.sumAmount += absAmount;
                } else if (visualType === "expense") {
                    expenseSummary.sumAmount += absAmount;
                } else {
                    const amount = txn.amount ?? 0;
                    if (amount > 0) {
                        incomeSummary.sumAmount += absAmount;
                    } else {
                        expenseSummary.sumAmount += absAmount;
                    }
                }
            }
            return {
                incomeSummary,
                expenseSummary
            };
        }
    }["UnifiedTransactionTable.useMemo[summary]"], [
        selection,
        tableData
    ]);
    const inferTieredPolicyByCategoryName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName]": (account, categoryName)=>{
            if (!account || account.type !== "credit_card" || account.cb_type !== "tiered" || !categoryName) return null;
            const tiers = Array.isArray(account.cb_rules_json?.tiers) ? account.cb_rules_json.tiers : [];
            const policies = tiers[0]?.policies || [];
            if (policies.length === 0) return null;
            const normalizedPolicies = policies.map({
                "UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].normalizedPolicies": (item)=>({
                        rate: Number(item.rate || 0),
                        maxReward: item.max != null ? Number(item.max) : undefined
                    })
            }["UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].normalizedPolicies"]).filter({
                "UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].normalizedPolicies": (item)=>item.rate > 0
            }["UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].normalizedPolicies"]);
            if (normalizedPolicies.length === 0) return null;
            const lowerName = categoryName.toLowerCase();
            const byRateAsc = [
                ...normalizedPolicies
            ].sort({
                "UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].byRateAsc": (left, right)=>left.rate - right.rate
            }["UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].byRateAsc"]);
            const byRateDesc = [
                ...normalizedPolicies
            ].sort({
                "UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].byRateDesc": (left, right)=>right.rate - left.rate
            }["UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName].byRateDesc"]);
            if (lowerName.includes("online")) return byRateAsc[0];
            if (lowerName.includes("offline") || lowerName.includes("utilities") || lowerName.includes("utility")) return byRateDesc[0];
            return null;
        }
    }["UnifiedTransactionTable.useCallback[inferTieredPolicyByCategoryName]"], []);
    const estimateTxnCashback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "UnifiedTransactionTable.useCallback[estimateTxnCashback]": (txn)=>{
            const scopedAccount = context === "account" && contextId ? accounts.find({
                "UnifiedTransactionTable.useCallback[estimateTxnCashback]": (a)=>a.id === contextId
            }["UnifiedTransactionTable.useCallback[estimateTxnCashback]"]) : undefined;
            const account = scopedAccount ?? accounts.find({
                "UnifiedTransactionTable.useCallback[estimateTxnCashback]": (a)=>a.id === txn.account_id || a.id === txn.source_account_id || a.id === txn.target_account_id
            }["UnifiedTransactionTable.useCallback[estimateTxnCashback]"]);
            if (!account || account.type !== "credit_card") return {
                estimated: 0,
                rate: 0,
                maxReward: undefined,
                isFallback: false
            };
            const amountAbs = Math.abs(txn.amount);
            const categoryName = txn.category_name || categories.find({
                "UnifiedTransactionTable.useCallback[estimateTxnCashback]": (c)=>c.id === txn.category_id
            }["UnifiedTransactionTable.useCallback[estimateTxnCashback]"])?.name || undefined;
            const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
                account: account,
                categoryId: txn.category_id,
                amount: amountAbs,
                categoryName,
                cycleTotals: {
                    spent: 0
                }
            });
            const fallback = inferTieredPolicyByCategoryName(account, categoryName);
            const shouldUseFallback = Boolean(fallback) && (policy.metadata?.policySource === "program_default" || policy.metadata?.policySource === "level_default");
            const effectiveRate = shouldUseFallback ? Number(fallback?.rate || policy.rate || 0) : Number(policy.rate || 0);
            const effectiveMaxReward = shouldUseFallback ? fallback?.maxReward : policy.maxReward;
            const baseVal = amountAbs * effectiveRate;
            const estimated = effectiveMaxReward !== undefined && effectiveMaxReward !== null ? Math.min(baseVal, effectiveMaxReward) : baseVal;
            return {
                estimated,
                rate: effectiveRate,
                maxReward: effectiveMaxReward,
                isFallback: shouldUseFallback
            };
        }
    }["UnifiedTransactionTable.useCallback[estimateTxnCashback]"], [
        accounts,
        categories,
        inferTieredPolicyByCategoryName
    ]);
    const tableTotals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[tableTotals]": ()=>{
            let base = 0, net = 0, back = 0, estCb = 0, shared = 0, profit = 0;
            const sourceData = selection.size > 0 ? tableData.filter({
                "UnifiedTransactionTable.useMemo[tableTotals]": (t)=>selection.has(t.id)
            }["UnifiedTransactionTable.useMemo[tableTotals]"]) : paginatedTransactions;
            sourceData.forEach({
                "UnifiedTransactionTable.useMemo[tableTotals]": (txn)=>{
                    const isVoided = (statusOverrides[txn.id] ?? txn.status) === "void";
                    if (isVoided) return;
                    const amount = Math.abs(txn.amount ?? 0);
                    const originalAmount = typeof txn.original_amount === "number" ? Math.abs(txn.original_amount) : amount;
                    const { percentRaw, fixedRaw, shareAmount } = resolveCashbackFields(txn);
                    const rate = percentRaw > 1 ? percentRaw / 100 : percentRaw;
                    const cashbackAmount = shareAmount;
                    const finalPrice = typeof txn.final_price === "number" ? Math.abs(txn.final_price) : Math.max(0, originalAmount - cashbackAmount);
                    // Est Cashback (From Policy)
                    let est_cb = 0;
                    const isSpendType = txn.type === "expense" || txn.type === "debt" || txn.type === "service";
                    if (isSpendType) {
                        est_cb = estimateTxnCashback(txn).estimated;
                    }
                    base += originalAmount;
                    back += cashbackAmount;
                    net += finalPrice;
                    estCb += est_cb;
                    const computedShared = originalAmount * rate + fixedRaw;
                    const sharedAmount = shareAmount > 0 ? shareAmount : computedShared;
                    shared += sharedAmount;
                    profit += est_cb - sharedAmount;
                }
            }["UnifiedTransactionTable.useMemo[tableTotals]"]);
            return {
                base,
                net,
                back,
                estCb,
                shared,
                profit
            };
        }
    }["UnifiedTransactionTable.useMemo[tableTotals]"], [
        paginatedTransactions,
        statusOverrides,
        estimateTxnCashback,
        resolveCashbackFields
    ]);
    const renderActionMenuItems = (txn, isVoided, variant)=>{
        const isSheet = variant === "sheet";
        const isPendingRefund = txn.account_id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$refunds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REFUND_PENDING_ACCOUNT_ID"];
        const hasRefundRequest = txn.metadata?.has_refund_request || txn.metadata?.refund_request_id;
        const resolvedCategory = txn.category_id ? categories.find((category)=>category.id === txn.category_id) : null;
        const categoryName = String(txn.category_name || resolvedCategory?.name || "").toLowerCase();
        const hasShoppingSignal = Boolean(txn.shop_id) || categoryName.includes("shopping") || categoryName.includes("mua s") || categoryName.includes("shop");
        const canShowCancelActions = !isPendingRefund && (txn.type === "expense" || txn.type === "debt") && hasShoppingSignal;
        const baseItemClass = isSheet ? "flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700" : "flex w-full items-center gap-2 rounded px-3 py-1 text-left hover:bg-slate-50";
        const dangerItemClass = isSheet ? `${baseItemClass} text-rose-600 hover:bg-rose-50` : `${baseItemClass} text-red-600 hover:bg-red-50`;
        const successItemClass = isSheet ? `${baseItemClass} text-emerald-700 hover:bg-emerald-50` : `${baseItemClass} text-green-700 hover:bg-green-50`;
        const neutralItemClass = isSheet ? `${baseItemClass} text-slate-700 hover:bg-slate-50` : `${baseItemClass} text-slate-600 hover:bg-slate-50`;
        const divider = isSheet ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-px bg-slate-100"
        }, void 0, false, {
            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
            lineNumber: 1848,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
            className: "my-1 border-slate-200"
        }, void 0, false, {
            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
            lineNumber: 1850,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
        if (currentTab === "void" || isVoided) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: `${successItemClass} disabled:cursor-not-allowed disabled:opacity-60`,
                    disabled: isRestoring,
                    onClick: (event)=>{
                        event.stopPropagation();
                        handleRestore(txn);
                        setActionMenuOpen(null);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1865,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: isRestoring ? "Restoring..." : "Restore"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1866,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 1856,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: baseItemClass,
                    onClick: (event)=>{
                        event.stopPropagation();
                        handleEdit(txn);
                        setActionMenuOpen(null);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1882,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Edit"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1883,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 1874,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: baseItemClass,
                    onClick: (event)=>{
                        event.stopPropagation();
                        handleDuplicate(txn);
                        setActionMenuOpen(null);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1893,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Duplicate"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1894,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 1885,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: dangerItemClass,
                    onClick: (event)=>{
                        event.stopPropagation();
                        setConfirmVoidTarget(txn);
                        setActionMenuOpen(null);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1904,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Void"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1905,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 1896,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                canShowCancelActions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `${neutralItemClass} ${hasRefundRequest ? "opacity-50 cursor-not-allowed" : ""}`,
                            disabled: !!hasRefundRequest,
                            onClick: (event)=>{
                                event.stopPropagation();
                                setRefundTarget(txn);
                                setRefundType("refund");
                                setIsRefundOpen(true);
                                setActionMenuOpen(null);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 1922,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: hasRefundRequest ? "Refund Requested" : "Request Refund"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 1923,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1911,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `${dangerItemClass} ${hasRefundRequest ? "opacity-50 cursor-not-allowed" : ""}`,
                            disabled: !!hasRefundRequest,
                            onClick: (event)=>{
                                event.stopPropagation();
                                // For Cancel Order, we can reuse the dialog or call specialized handler
                                // If RequestRefundDialog doesn't support 'type', we might need to adjust it
                                // But for now, let's open it as refund but maybe pre-set
                                // Actually, let's use the same dialog but with a title change if possible
                                setRefundTarget(txn);
                                setRefundType("cancel");
                                setIsRefundOpen(true);
                                setActionMenuOpen(null);
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 1942,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: hasRefundRequest ? "Order Cancelled" : "Cancel Order (100%)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 1943,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1927,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                divider,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: dangerItemClass,
                    onClick: (event)=>{
                        event.stopPropagation();
                        setConfirmDeletingTarget(txn);
                        setActionMenuOpen(null);
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1959,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Delete (Forever)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1960,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 1951,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true);
    };
    const renderRowActions = (txn, isVoided)=>{
        const isMenuOpen = actionMenuOpen === txn.id;
        if (isMobile) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: isMenuOpen,
                onOpenChange: (open)=>setActionMenuOpen(open ? txn.id : null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            id: `action-btn-${txn.id}`,
                            type: "button",
                            "data-action-trigger": true,
                            className: "inline-flex items-center justify-center rounded-md p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors",
                            disabled: isExcelMode,
                            onClick: (event)=>{
                                event.stopPropagation();
                                setActionMenuOpen(isMenuOpen ? null : txn.id);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                                className: "h-4 w-4 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 1991,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 1980,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 1979,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                        side: "bottom",
                        className: "p-0 rounded-t-2xl w-full",
                        showClose: false,
                        "data-action-menu": true,
                        onPointerDownOutside: ()=>setActionMenuOpen(null),
                        onEscapeKeyDown: ()=>setActionMenuOpen(null),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                                className: "flex-row items-center justify-between gap-2 space-y-0 px-4 py-3 border-b border-slate-200 text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                        className: "text-sm font-semibold text-slate-900",
                                        children: "Quick actions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 2003,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetClose"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700",
                                            "aria-label": "Close",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2012,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 2007,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 2006,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 2002,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: renderActionMenuItems(txn, isVoided, "sheet")
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 2016,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 1994,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                lineNumber: 1975,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0));
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-0.5",
            "data-action-menu-wrapper": true,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                    content: "Edit",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
                        onClick: (e)=>{
                            e.stopPropagation();
                            handleEdit(txn);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 2039,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 2032,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 2031,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                    content: "Duplicate",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors",
                        onClick: (e)=>{
                            e.stopPropagation();
                            externalOnDuplicate?.(txn);
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Files$3e$__["Files"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 2051,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 2044,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 2043,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                    open: isMenuOpen,
                    onOpenChange: (open)=>setActionMenuOpen(open ? txn.id : null),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: `action-btn-${txn.id}`,
                                type: "button",
                                "data-action-trigger": true,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center rounded-md p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors", isMenuOpen && "bg-slate-100 text-slate-700"),
                                disabled: isExcelMode,
                                onClick: (event)=>{
                                    event.stopPropagation();
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                    className: "h-3.5 w-3.5 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 2074,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 2061,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 2060,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                            className: "w-48 p-1 z-[100]",
                            align: "end",
                            side: "bottom",
                            sideOffset: 5,
                            onClick: (e)=>e.stopPropagation(),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: renderActionMenuItems(txn, isVoided, "popover")
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 2084,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 2077,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 2056,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
            lineNumber: 2025,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    };
    const effectiveColumnOrder = columnOrder ?? customColumnOrder;
    const displayedColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "UnifiedTransactionTable.useMemo[displayedColumns]": ()=>{
            if (isMobile) {
                return mobileColumnOrder.map({
                    "UnifiedTransactionTable.useMemo[displayedColumns]": (key)=>defaultColumns.find({
                            "UnifiedTransactionTable.useMemo[displayedColumns]": (col)=>col.key === key
                        }["UnifiedTransactionTable.useMemo[displayedColumns]"])
                }["UnifiedTransactionTable.useMemo[displayedColumns]"]).filter(Boolean).filter({
                    "UnifiedTransactionTable.useMemo[displayedColumns]": (col)=>visibleColumns[col.key]
                }["UnifiedTransactionTable.useMemo[displayedColumns]"]);
            }
            return effectiveColumnOrder.map({
                "UnifiedTransactionTable.useMemo[displayedColumns]": (key)=>defaultColumns.find({
                        "UnifiedTransactionTable.useMemo[displayedColumns]": (col)=>col.key === key
                    }["UnifiedTransactionTable.useMemo[displayedColumns]"])
            }["UnifiedTransactionTable.useMemo[displayedColumns]"]).filter({
                "UnifiedTransactionTable.useMemo[displayedColumns]": (col)=>!!col && visibleColumns[col.key] !== false && !hiddenColumns?.includes(col.key)
            }["UnifiedTransactionTable.useMemo[displayedColumns]"]);
        }
    }["UnifiedTransactionTable.useMemo[displayedColumns]"], [
        isMobile,
        effectiveColumnOrder,
        visibleColumns,
        mobileColumnOrder,
        defaultColumns,
        hiddenColumns
    ]);
    if (tableData.length === 0 && activeTab === "active") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
            title: "No transactions yet",
            description: "Add your first transaction to get started"
        }, void 0, false, {
            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
            lineNumber: 2121,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    const isAllSelected = displayedTransactions.length > 0 && selection.size >= displayedTransactions.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col w-full h-full min-h-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full rounded-xl border border-slate-200 bg-card shadow-sm transition-colors duration-300 flex flex-col h-full min-h-0", isExcelMode && "border-emerald-500 shadow-emerald-100 ring-4 ring-emerald-50"),
            style: {},
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden flex-1 min-h-0 overflow-y-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$mobile$2f$MobileTransactionsSimpleList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileTransactionsSimpleList"], {
                        transactions: paginatedTransactions,
                        categories: categories,
                        selectedTxnIds: selection,
                        onSelectTxn: (id, selected)=>handleSelectOne(id, selected),
                        renderActions: isMobile ? (txn)=>renderRowActions(txn, (statusOverrides[txn.id] ?? txn.status) === "void") : undefined,
                        onRowClick: (txn)=>{
                            if (isExcelMode) return;
                            handleEdit(txn);
                        },
                        onCopyId: async (id)=>{
                            const ok = await copyToClipboard(id, "Transaction ID");
                            if (!ok) return;
                        },
                        formatters: {
                            currency: (val)=>numberFormatter.format(val),
                            date: formattedDate
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 2143,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 2142,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:block flex-1 min-h-0 overflow-auto w-full h-full bg-white relative",
                    style: {
                        scrollbarGutter: "stable"
                    },
                    children: [
                        (isRestoring || isDeleting) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-white/60 backdrop-blur-[2px] z-[100] flex items-center justify-center transition-all duration-300 animate-in fade-in",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white shadow-xl border border-slate-100 scale-in-95 animate-in",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-12 w-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2181,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "absolute inset-0 m-auto h-5 w-5 text-indigo-600 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2182,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 2180,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-black text-slate-800 uppercase tracking-tight",
                                                children: isRestoring ? "Restoring Transaction..." : "Deleting Permanently..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2185,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse",
                                                children: "Processing Database"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2190,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 2184,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 2179,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 2178,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full caption-bottom text-sm border-collapse min-w-[800px] lg:min-w-0",
                            onMouseUp: handleCellMouseUp,
                            onMouseLeave: handleCellMouseUp,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                    className: "sticky top-0 z-30 bg-gradient-to-b from-slate-50 to-white backdrop-blur-sm border-b-2 border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        className: "hover:bg-transparent border-0",
                                        children: displayedColumns.map((col)=>{
                                            const stickyStyle = {
                                                width: columnWidths[col.key]
                                            };
                                            const isMobileCategoryDate = isMobile && col.key === "category";
                                            const columnLabel = isMobileCategoryDate ? "Category / Date" : col.label;
                                            // Check if any sort is active
                                            const isSorted = sortState.key !== "date" || sortState.dir !== "desc";
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-r border-slate-400 bg-transparent text-slate-700 whitespace-nowrap font-semibold h-11"),
                                                style: stickyStyle,
                                                children: col.key === "category" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: columnLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 2229,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)) : col.key === "date" || isMobileCategoryDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            className: "rounded border-gray-300",
                                                            checked: isAllSelected,
                                                            onChange: (e)=>handleSelectAll(e.target.checked),
                                                            disabled: isExcelMode
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2232,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: sortState.key === "date" ? sortState.dir === "asc" ? "Sorted: Oldest to Newest" : "Sorted: Newest to Oldest" : "Click to sort",
                                                            side: "top",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "flex items-center gap-1 group",
                                                                onClick: ()=>{
                                                                    const nextDir = sortState.key === "date" ? sortState.dir === "asc" ? "desc" : "asc" : "desc";
                                                                    setSortState({
                                                                        key: "date",
                                                                        dir: nextDir
                                                                    });
                                                                },
                                                                children: [
                                                                    columnLabel,
                                                                    sortState.key === "date" ? sortState.dir === "asc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                                                        className: "h-3 w-3 text-blue-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2266,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                                        className: "h-3 w-3 text-blue-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2268,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                                        className: "h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2271,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2251,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2241,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        isSorted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: "Clear sort (reset to default)",
                                                            side: "top",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setSortState({
                                                                        key: "date",
                                                                        dir: "desc"
                                                                    });
                                                                },
                                                                className: "ml-1 p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors",
                                                                title: "Clear sort",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 2292,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2281,
                                                                columnNumber: 35
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2277,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 2231,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)) : col.key === "amount" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                    content: sortState.key === "amount" ? sortState.dir === "asc" ? "Sorted: Low to High" : "Sorted: High to Low" : "Click to sort",
                                                    side: "top",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "flex items-center gap-1 group w-full justify-end",
                                                        onClick: ()=>{
                                                            const nextDir = sortState.key === "amount" ? sortState.dir === "asc" ? "desc" : "asc" : "desc";
                                                            setSortState({
                                                                key: "amount",
                                                                dir: nextDir
                                                            });
                                                        },
                                                        children: [
                                                            columnLabel,
                                                            sortState.key === "amount" ? sortState.dir === "asc" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                                                className: "h-3 w-3 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2323,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                                className: "h-3 w-3 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2325,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
                                                                className: "h-3 w-3 text-slate-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2328,
                                                                columnNumber: 35
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                        lineNumber: 2308,
                                                        columnNumber: 31
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 2298,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)) : col.key === "final_price" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: columnLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 2333,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)) : col.key === "actions" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center w-full relative group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: columnLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2336,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: "Customize Columns",
                                                            side: "top",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setIsColumnCustomizerOpen(true);
                                                                },
                                                                className: "absolute right-0 p-1.5 hover:bg-slate-300 rounded-md transition-colors text-slate-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                                    className: "h-3.5 w-3.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 2348,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2341,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2337,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 2335,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0)) : columnLabel
                                            }, col.key, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2220,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 2203,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 2202,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                    children: paginatedTransactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                            colSpan: displayedColumns.length,
                                            className: "h-[400px] text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$empty$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
                                                title: "No transactions found",
                                                description: "Try adjusting your filters or search criteria"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 2367,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 2363,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 2362,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : paginatedTransactions.map((txn, rowIndex)=>{
                                        const isRepayment = txn.type === "repayment";
                                        const visualType = txn.displayType ?? txn.type;
                                        const amountClass = visualType === "income" || isRepayment ? "text-emerald-700" : visualType === "expense" ? "text-red-500" : "text-slate-600";
                                        // Shared ID Resolution for Smart Context (Type Badge + Account Column)
                                        const txnSourceId = txn.source_account_id || txn.account_id;
                                        const destNameRaw = txn.destination_name || "Unknown";
                                        const txnDestId = txn.destination_account_id || txn.target_account_id || (destNameRaw !== "Unknown" ? accounts.find((a)=>a.name === destNameRaw)?.id : undefined);
                                        const isSelected = selection.has(txn.id);
                                        const effectiveStatus = statusOverrides[txn.id] ?? txn.status;
                                        const isVoided = effectiveStatus === "void";
                                        const isMenuOpen = actionMenuOpen === txn.id;
                                        const sequenceNumber = (currentPage - 1) * pageSize + rowIndex + 1;
                                        const txnMetadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$transaction$2d$mapper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMetadata"])(txn.metadata);
                                        const refundStatus = typeof txnMetadata?.refund_status === 'string' ? txnMetadata.refund_status : null;
                                        const hasActiveRefundRequest = (txnMetadata?.has_refund_request || txnMetadata?.refund_request_id) && refundStatus !== 'request_voided' && refundStatus !== 'void';
                                        // Refund SEQ Logic (Global for row)
                                        let refundSeq = 0;
                                        if (hasActiveRefundRequest || txn.status === "waiting_refund") refundSeq = 1;
                                        else if (txnMetadata?.original_transaction_id && !txnMetadata.is_refund_confirmation) refundSeq = 2;
                                        else if (txnMetadata?.is_refund_confirmation) refundSeq = 3;
                                        let displayIdForBadge = txn.id;
                                        if (refundSeq === 2 || refundSeq === 3) {
                                            displayIdForBadge = txnMetadata?.original_transaction_id || txn.id;
                                        }
                                        const voidedTextClass = "";
                                        // Row Background Logic (Restored)
                                        let rowBgColor = "bg-white";
                                        if (isVoided) {
                                            rowBgColor = "opacity-80 bg-gray-50 scale-[0.99] border-dashed";
                                        } else {
                                            const refundSeqCheck = txn.metadata?.refund_sequence || 0;
                                            if (txn.is_installment || txn.installment_plan_id) rowBgColor = "bg-amber-50";
                                            else if (refundSeqCheck > 0) rowBgColor = "bg-purple-50"; // Refund shading
                                            else if (txn.type === "repayment") rowBgColor = "bg-slate-50";
                                            else if (effectiveStatus === "pending" || effectiveStatus === "waiting_refund") rowBgColor = "bg-emerald-50/50";
                                        }
                                        const renderCell = (key)=>{
                                            const refundAccount = accounts.find((a)=>a.id === txn.account_id); // Lifted up for Category case availability
                                            switch(key){
                                                case "date":
                                                    {
                                                        const d = new Date(txn.occurred_at ?? txn.created_at ?? Date.now());
                                                        const day = String(d.getDate()).padStart(2, "0");
                                                        const month = String(d.getMonth() + 1).padStart(2, "0");
                                                        const timeStr = d.toLocaleTimeString("vi-VN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        });
                                                        const fullDateStr = d.toLocaleDateString("vi-VN", {
                                                            weekday: "short",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit"
                                                        });
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 w-full min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    className: "rounded border-slate-300 pointer-events-auto",
                                                                    checked: isSelected,
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        if (e.shiftKey) handleSelectOne(txn.id, !isSelected, true);
                                                                    },
                                                                    onChange: (e)=>handleSelectOne(txn.id, e.target.checked),
                                                                    disabled: isExcelMode
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 2486,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                    content: fullDateStr,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "group flex cursor-help items-center gap-2 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex h-5 min-w-[22px] items-center justify-center rounded-md border border-slate-200 bg-white px-1 text-[10px] font-black text-slate-500 shrink-0",
                                                                                children: sequenceNumber
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2507,
                                                                                columnNumber: 37
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex min-w-0 flex-col items-start justify-center",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-sm font-black text-slate-700 leading-none group-hover:text-blue-700 transition-colors whitespace-nowrap",
                                                                                        children: [
                                                                                            day,
                                                                                            ".",
                                                                                            month
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 2511,
                                                                                        columnNumber: 39
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 leading-tight group-hover:text-blue-500 transition-colors whitespace-nowrap",
                                                                                        children: timeStr
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 2514,
                                                                                        columnNumber: 39
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2510,
                                                                                columnNumber: 37
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2506,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 2505,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2485,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "cycle":
                                                    {
                                                        const txnAccount = accounts.find((a)=>a.id === txn.account_id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transactions$2d$v2$2f$badge$2f$CycleBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CycleBadge"], {
                                                                account: txnAccount,
                                                                cycleTag: txn.tag,
                                                                txnDate: txn.occurred_at || txn.created_at || new Date(),
                                                                personContext: !!txn.person_id || context === 'person'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2527,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2526,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "actions":
                                                    {
                                                        const isUpdating = updatingTxnIds.has(txn.id) || loadingIds?.has(txn.id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-end w-full",
                                                            children: isUpdating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100/80 animate-pulse",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                        className: "h-3 w-3 animate-spin text-slate-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2544,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-semibold text-slate-500 uppercase",
                                                                        children: "Updating"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2545,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2543,
                                                                columnNumber: 35
                                                            }, ("TURBOPACK compile-time value", void 0)) : renderRowActions(txn, isVoided)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2541,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "actual_cashback":
                                                    {
                                                        const amountAbs = Math.abs(txn.amount);
                                                        // EXCLUSION LOGIC:
                                                        const status = String(txn?.status || "").toLowerCase();
                                                        if (status === "void") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2563,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        const isIncome = txn.type === "income";
                                                        const isTransfer = txn.type === "transfer";
                                                        const isRepayment = txn.type === "repayment";
                                                        const note = String(txn?.note || "").toLowerCase();
                                                        const isCreateInitial = note.includes("create initial") || note.includes("số dư đầu") || note.includes("opening balance") || note.includes("rollover");
                                                        if (isIncome || isTransfer || isRepayment || isCreateInitial) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-300",
                                                                children: "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2581,
                                                                columnNumber: 38
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        const estimate = estimateTxnCashback(txn);
                                                        const policyRate = estimate.rate;
                                                        const baseVal = amountAbs * policyRate;
                                                        const val = estimate.estimated;
                                                        if (val === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2590,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        const effectiveRate = amountAbs > 0 ? val / amountAbs : 0;
                                                        const isCapped = estimate.maxReward !== undefined && estimate.maxReward !== null && baseVal > estimate.maxReward;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs space-y-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold",
                                                                        children: "Est. Cashback (Calculated)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2603,
                                                                        columnNumber: 37
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-slate-400",
                                                                        children: [
                                                                            numberFormatter.format(amountAbs),
                                                                            " ×",
                                                                            " ",
                                                                            (policyRate * 100).toFixed(policyRate * 100 % 1 === 0 ? 0 : 2),
                                                                            "% = ",
                                                                            numberFormatter.format(baseVal)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2606,
                                                                        columnNumber: 37
                                                                    }, void 0),
                                                                    isCapped && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-rose-400 font-bold border-t border-white/10 pt-1",
                                                                        children: [
                                                                            "Config card max =",
                                                                            " ",
                                                                            numberFormatter.format(estimate.maxReward || 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2614,
                                                                        columnNumber: 39
                                                                    }, void 0),
                                                                    estimate.isFallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] italic border-t border-white/5 pt-1 mt-1 text-amber-500",
                                                                        children: "Rule fallback: mapped by category name"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2622,
                                                                        columnNumber: 39
                                                                    }, void 0),
                                                                    !estimate.isFallback && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] italic border-t border-white/5 pt-1 mt-1 text-slate-500",
                                                                        children: "Rule: policy-based category match"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2627,
                                                                        columnNumber: 39
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2602,
                                                                columnNumber: 35
                                                            }, void 0),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium cursor-help border-b border-dotted", isCapped ? "text-amber-600 border-amber-200" : "text-emerald-600 border-emerald-200"),
                                                                children: numberFormatter.format(val)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2634,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2600,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "est_share":
                                                    {
                                                        // EXCLUSION LOGIC:
                                                        const status = String(txn?.status || "").toLowerCase();
                                                        if (status === "void") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2653,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        const isIncome = txn.type === "income";
                                                        const isTransfer = txn.type === "transfer";
                                                        const note = String(txn?.note || "").toLowerCase();
                                                        const isCreateInitial = note.includes("create initial") || note.includes("số dư đầu") || note.includes("opening balance") || note.includes("rollover");
                                                        if (isIncome || isTransfer || isCreateInitial) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-300",
                                                                children: "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2665,
                                                                columnNumber: 38
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        const { fixedRaw, percentRaw, shareAmount } = resolveCashbackFields(txn);
                                                        const shareRate = percentRaw > 1 ? percentRaw / 100 : percentRaw;
                                                        const amountAbs = Math.abs(txn.amount);
                                                        const computedShared = amountAbs * shareRate + fixedRaw;
                                                        const val = shareAmount > 0 ? shareAmount : computedShared;
                                                        if (val === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2678,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        const formulaLabelParts = [];
                                                        if (fixedRaw > 0) formulaLabelParts.push(numberFormatter.format(fixedRaw));
                                                        if (shareRate > 0) {
                                                            const percentLabel = (shareRate * 100).toFixed(shareRate * 100 % 1 === 0 ? 0 : 2);
                                                            formulaLabelParts.push(`${percentLabel}%`);
                                                        }
                                                        const formulaLabel = formulaLabelParts.length > 0 ? formulaLabelParts.join(" + ") : numberFormatter.format(val);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold text-orange-400",
                                                                        children: "Cashback Shared"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2700,
                                                                        columnNumber: 37
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-slate-400",
                                                                        children: [
                                                                            shareRate > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    numberFormatter.format(amountAbs),
                                                                                    " ×",
                                                                                    " ",
                                                                                    (shareRate * 100).toFixed(shareRate * 100 % 1 === 0 ? 0 : 2),
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2705,
                                                                                columnNumber: 41
                                                                            }, void 0),
                                                                            shareRate > 0 && fixedRaw > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: " + "
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2714,
                                                                                columnNumber: 41
                                                                            }, void 0),
                                                                            fixedRaw > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    numberFormatter.format(fixedRaw),
                                                                                    " ",
                                                                                    "(fixed)"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2717,
                                                                                columnNumber: 41
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    " ",
                                                                                    "= ",
                                                                                    numberFormatter.format(val)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2722,
                                                                                columnNumber: 39
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2703,
                                                                        columnNumber: 37
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2699,
                                                                columnNumber: 35
                                                            }, void 0),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-orange-600 cursor-help border-b border-dotted border-orange-200",
                                                                children: formulaLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2730,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2697,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "net_profit":
                                                    {
                                                        // EXCLUSION LOGIC:
                                                        const status = String(txn?.status || "").toLowerCase();
                                                        if (status === "void") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2742,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        const isIncome = txn.type === "income";
                                                        const isTransfer = txn.type === "transfer";
                                                        const isRepayment = txn.type === "repayment";
                                                        const note = String(txn?.note || "").toLowerCase();
                                                        const isCreateInitial = note.includes("create initial") || note.includes("số dư đầu") || note.includes("opening balance") || note.includes("rollover");
                                                        if (isIncome || isTransfer || isRepayment || isCreateInitial) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-300",
                                                                children: "-"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2760,
                                                                columnNumber: 38
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        const amountAbs = Math.abs(txn.amount);
                                                        const estimate = estimateTxnCashback(txn);
                                                        const { fixedRaw, percentRaw, shareAmount, bankBack } = resolveCashbackFields(txn);
                                                        const estimateBack = Math.max(Number(estimate.estimated || 0), bankBack);
                                                        const shareRate = percentRaw > 1 ? percentRaw / 100 : percentRaw;
                                                        const computedShared = amountAbs * shareRate + fixedRaw;
                                                        const share = shareAmount > 0 ? shareAmount : computedShared;
                                                        const profit = estimateBack - share;
                                                        if (profit === 0 && estimateBack === 0 && share === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2789,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-bold text-indigo-400",
                                                                        children: "Profit Calculation"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2795,
                                                                        columnNumber: 37
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-slate-400",
                                                                        children: [
                                                                            numberFormatter.format(estimateBack),
                                                                            " ",
                                                                            "(est) - ",
                                                                            numberFormatter.format(share),
                                                                            " ",
                                                                            "(share) =",
                                                                            " ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: profit > 0 ? "text-emerald-400" : "text-rose-400",
                                                                                children: numberFormatter.format(profit)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 2802,
                                                                                columnNumber: 39
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 2798,
                                                                        columnNumber: 37
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2794,
                                                                columnNumber: 35
                                                            }, void 0),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(profit > 0 ? "text-emerald-700 font-black" : profit < 0 ? "text-rose-500 font-bold" : "text-slate-500", "cursor-help border-b border-dotted border-slate-300"),
                                                                children: numberFormatter.format(profit)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2815,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2792,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                // Note: 'type' column was removed - it's now merged into the 'date' column
                                                case "shop":
                                                    {
                                                        const resolvedShop = txn.shop_id ? shops.find((shop)=>shop.id === txn.shop_id) : null;
                                                        let shopLogo = txn.shop_image_url || resolvedShop?.image_url || null;
                                                        // ROLLOVER IMAGE OVERRIDE: If category is Rollover, use Category Image (takes precedence over Shop/Bank)
                                                        if (txn.category_name === "Rollover" || txn.category_id === "71e71711-83e5-47ba-8ff5-85590f45a70c") {
                                                            const rolloverCat = categories.find((c)=>c.id === "71e71711-83e5-47ba-8ff5-85590f45a70c");
                                                            if (rolloverCat?.image_url) {
                                                                shopLogo = rolloverCat.image_url;
                                                            }
                                                        }
                                                        // Check if Shop Image is MISSING. If so, attempt to use Target Bank Image for relevant types.
                                                        if (!shopLogo) {
                                                            if (txn.type === "repayment" || txn.type === "transfer") {
                                                                // Target is Destination
                                                                const destId = txn.destination_account_id || txn.target_account_id;
                                                                const destAccount = accounts.find((a)=>a.id === destId);
                                                                if (destAccount?.image_url) {
                                                                    shopLogo = destAccount.image_url;
                                                                }
                                                            } else if (txn.type === "income") {
                                                                // Target is Account (Receiver)
                                                                const targetAccount = accounts.find((a)=>a.id === txn.account_id);
                                                                if (targetAccount?.image_url) {
                                                                    shopLogo = targetAccount.image_url;
                                                                }
                                                            }
                                                        }
                                                        // Original Fallback Logic (modified to respect new target logic if set)
                                                        if (!shopLogo && (txn.type === "repayment" || txn.type === "income")) {
                                                            const repaymentAccount = txnSourceId ? accounts.find((account)=>account.id === txnSourceId) : null;
                                                            const repaymentLogo = txn.source_image ?? repaymentAccount?.image_url ?? null;
                                                            shopLogo = repaymentLogo;
                                                        }
                                                        const isServicePayment = txn.note?.startsWith("Payment for Service") || txn.metadata?.type === "service_payment";
                                                        if (isServicePayment && !shopLogo) {
                                                            shopLogo = txn.source_image;
                                                        }
                                                        const installmentBadge = txn.is_installment || txn.installment_plan_id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: "Trả góp - Click để xem",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/installments?tab=active&highlight=${txn.id}`,
                                                                onClick: (e)=>e.stopPropagation(),
                                                                className: "flex items-center justify-center rounded bg-amber-100 border border-amber-400 px-1 py-0.5 text-amber-700 hover:bg-amber-200 transition-colors shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 2917,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2912,
                                                                columnNumber: 35
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 2911,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)) : null;
                                                        const refundAccount = accounts.find((a)=>a.id === txn.account_id);
                                                        // Check joined account name (txn.accounts) OR looked up account name
                                                        const accountName = txn.accounts?.name || refundAccount?.name;
                                                        const isPendingRefund = txn.account_id === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$refunds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REFUND_PENDING_ACCOUNT_ID"] || accountName === "Pending Refunds (System)";
                                                        // BADGE LOGIC & CONFIRM BUTTON VISIBILITY
                                                        const originalMetadata = txn.metadata ?? {};
                                                        // 1. isPendingRefund (For Confirm Button)
                                                        // This logic determines if the "Confirm" button should show.
                                                        // It serves Tx 2 (Request) which is NOT yet completed.
                                                        const isOriginalTxn = Boolean(originalMetadata.original_transaction_id);
                                                        const isRefundConfirmation = Boolean(originalMetadata.is_refund_confirmation);
                                                        const isRefundRequest = isOriginalTxn && !isRefundConfirmation;
                                                        const canConfirm = isRefundRequest && txn.status !== "completed";
                                                        // 2. VISUAL BADGES
                                                        // Hourglass (Tx 1): Shows on Original if refund is requested but not fully refunded
                                                        const refundStatus = originalMetadata.refund_status;
                                                        const hasActiveRefundRequest = Boolean(originalMetadata.has_refund_request || originalMetadata.refund_request_id) && refundStatus !== 'request_voided' && refundStatus !== 'void';
                                                        // Show hourglass only if requested AND NOT completed
                                                        const showHourglass = hasActiveRefundRequest && txn.status !== "refunded" && refundStatus !== "completed" && refundStatus !== "refunded";
                                                        // Reversed/Refunded Icon (Tx 1): Shows if refund is COMPLETED
                                                        // This replaces the hourglass when the cycle is done (GD3 exists)
                                                        const showReversed = hasActiveRefundRequest && (refundStatus === "completed" || refundStatus === "refunded" || txn.status === "refunded");
                                                        // Check (Tx 2): Shows on Request if it is Completed (Confirmed)
                                                        const showCheck = isRefundRequest && txn.status === "completed";
                                                        // OK (Tx 3): Shows on Confirmation
                                                        const showOK = isRefundConfirmation;
                                                        let refundBadge = null;
                                                        const badgeBaseClass = "inline-flex items-center gap-1.5 px-2 h-[22px] min-w-[70px] justify-center rounded-full border text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm";
                                                        if (showHourglass) {
                                                            refundBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Refund Requested - Waiting for Confirmation",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-amber-50 text-amber-600 border-amber-200"),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 2996,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "WAIT"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 2997,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 2990,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 2989,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (showReversed) {
                                                            refundBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Refund Completed",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-slate-50 text-slate-500 border-slate-200"),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3010,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "REFUNDED"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3011,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3004,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3003,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (showCheck) {
                                                            refundBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Refund Confirmed",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-emerald-50 text-emerald-600 border-emerald-200"),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3024,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "DONE"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3025,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3018,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3017,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (showOK) {
                                                            refundBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Refund Received (OK)",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeBaseClass, "bg-indigo-50 text-indigo-600 border-indigo-200"),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3038,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "OK"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3039,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3032,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3031,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        const confirmRefundBadge = canConfirm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                            content: "Click to Confirm Refund",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    setConfirmRefundTxn(txn);
                                                                    setConfirmRefundOpen(true);
                                                                },
                                                                className: "flex items-center justify-center rounded-full bg-emerald-500 text-white px-2.5 h-[22px] shrink-0 transition-all hover:bg-emerald-600 hover:shadow-md cursor-pointer ml-1 shadow-sm text-[10px] font-bold",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                        className: "h-3 w-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3055,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1",
                                                                        children: "Confirm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3056,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3047,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3046,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)) : null;
                                                        // Transaction ID display - No prefix, just truncated ID
                                                        const txnIdShort = txn.id.slice(0, 4) + "...";
                                                        const txnIdFull = txn.id;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 w-full overflow-hidden group",
                                                            children: [
                                                                shopLogo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: shopLogo,
                                                                        alt: "",
                                                                        className: "h-8 w-8 object-contain shrink-0 rounded-none border-none ring-0 outline-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3071,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-8 w-8 items-center justify-center bg-slate-50 rounded-none shrink-0",
                                                                    children: txn.type === "repayment" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                                        className: "h-4 w-4 text-orange-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3080,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__["ShoppingBasket"], {
                                                                        className: "h-4 w-4 text-slate-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3082,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3078,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 min-w-0 flex-1 justify-between",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1.5 min-w-0 flex-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: `Click to copy: ${txnIdFull}`,
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: (e)=>{
                                                                                            e.stopPropagation();
                                                                                            copyToClipboard(txn.id).then((ok)=>{
                                                                                                if (!ok) return;
                                                                                                setCopiedId(txn.id);
                                                                                                setTimeout(()=>setCopiedId(null), 2000);
                                                                                            });
                                                                                        },
                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-slate-600 transition-colors shrink-0", copiedId === txn.id && "text-emerald-500"),
                                                                                        title: `Copy Transaction ID: ${txn.id}`,
                                                                                        children: copiedId === txn.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3113,
                                                                                            columnNumber: 43
                                                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3115,
                                                                                            columnNumber: 43
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3093,
                                                                                        columnNumber: 39
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3090,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: "Open in new tab",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: (e)=>{
                                                                                            e.stopPropagation();
                                                                                            window.open(`/transactions?highlight=${txn.id}`, "_blank", "noopener,noreferrer");
                                                                                        },
                                                                                        className: "p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-emerald-600 transition-colors shrink-0",
                                                                                        title: "Open in new tab",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3133,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3121,
                                                                                        columnNumber: 39
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3120,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: "Open DB (new tab)",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: (e)=>{
                                                                                            e.stopPropagation();
                                                                                            const url = `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_txn_001&filter=${encodeURIComponent(txn.id)}&sort=-%40rowid`;
                                                                                            window.open(url, "_blank", "noopener,noreferrer");
                                                                                        },
                                                                                        className: "p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-indigo-600 transition-colors shrink-0",
                                                                                        title: "Open DB (new tab)",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3151,
                                                                                            columnNumber: 41
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3138,
                                                                                        columnNumber: 39
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3137,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                (()=>{
                                                                                    const note = txn.note || "";
                                                                                    const isConfirmed = note.startsWith("[C] ");
                                                                                    const displayNote = isConfirmed ? note.substring(4) : note;
                                                                                    if (!note) {
                                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-400 italic text-[0.9em]",
                                                                                            children: "No note"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3165,
                                                                                            columnNumber: 43
                                                                                        }, ("TURBOPACK compile-time value", void 0));
                                                                                    }
                                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                        content: note,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-slate-900 font-black truncate cursor-help block flex-1",
                                                                                            style: {
                                                                                                fontSize: `1.15em`
                                                                                            },
                                                                                            children: displayNote
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3173,
                                                                                            columnNumber: 43
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3172,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0));
                                                                                })()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3089,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        (()=>{
                                                                            const metadata = typeof txn.metadata === "string" ? JSON.parse(txn.metadata) : txn.metadata;
                                                                            const isSplitParent = metadata?.is_split_bill === true || metadata?.is_split_bill_base === true;
                                                                            const isSplitChild = !!(metadata?.parent_transaction_id || metadata?.split_parent_id);
                                                                            const splitGroupName = metadata?.split_group_name;
                                                                            let splitBadge = null;
                                                                            if (isSplitParent || isSplitChild) {
                                                                                const badgeText = isSplitParent ? "SPLIT" : "SHARE";
                                                                                const badgeColor = isSplitParent ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-slate-50 text-slate-600 border-slate-200";
                                                                                const tooltipText = isSplitParent ? splitGroupName ? `Split Bill Parent - Group: ${splitGroupName}` : "Split Bill Parent (Total)" : "Split Bill Share (Linked)";
                                                                                splitBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: tooltipText,
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1.5 px-2 h-[22px] min-w-[70px] justify-center rounded-full border text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm", badgeColor),
                                                                                        children: [
                                                                                            isSplitParent ? "⚡" : "🔗",
                                                                                            " ",
                                                                                            badgeText
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3218,
                                                                                        columnNumber: 43
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3217,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            }
                                                                            const duplicatedFromId = metadata?.duplicated_from_id;
                                                                            let duplicationBadge = null;
                                                                            if (duplicatedFromId) {
                                                                                duplicationBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: `Duplicated from ID: ${duplicatedFromId}`,
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "inline-flex items-center gap-1.5 px-2 h-[22px] min-w-[70px] justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-200 text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm hover:text-slate-600 hover:border-slate-300",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Files$3e$__["Files"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 3240,
                                                                                                columnNumber: 45
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            "CLONE",
                                                                                            " ",
                                                                                            String(duplicatedFromId).slice(0, 4)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3239,
                                                                                        columnNumber: 43
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3236,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            }
                                                                            const hasBulkDebts = metadata?.bulk_allocation?.debts?.length > 0 || metadata?.bulkAllocation?.debts?.length > 0;
                                                                            const currentInstallmentBadge = txn.is_installment || txn.installment_plan_id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                content: "Trả góp - Click để xem",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                    href: `/installments?tab=active&highlight=${txn.id}`,
                                                                                    onClick: (e)=>e.stopPropagation(),
                                                                                    className: "inline-flex items-center gap-1.5 px-2 h-[22px] min-w-[70px] justify-center rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm hover:bg-amber-100",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 3265,
                                                                                            columnNumber: 45
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        "PLAN"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3260,
                                                                                    columnNumber: 43
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3259,
                                                                                columnNumber: 41
                                                                            }, ("TURBOPACK compile-time value", void 0)) : null;
                                                                            const batchId = metadata?.batch_id;
                                                                            const batchType = metadata?.type;
                                                                            const batchStep = String(metadata?.batch_step || "").toLowerCase();
                                                                            const isBatchStep3 = batchStep === "step3" || Boolean(metadata?.batch_item_id) || String(txn.note || "").startsWith("[C] ");
                                                                            let batchBadge = null;
                                                                            if (batchId || batchType === "batch_funding") {
                                                                                batchBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: `Batch: ${batchId || "System Funding"}`,
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                        href: batchId ? `/batch/detail/${batchId}` : `/batch`,
                                                                                        onClick: (e)=>e.stopPropagation(),
                                                                                        className: "inline-flex items-center gap-1.5 px-2 h-[22px] min-w-[70px] justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm hover:bg-indigo-100",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 3293,
                                                                                                columnNumber: 45
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            isBatchStep3 ? "BATCH S3" : "BATCH S1"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3284,
                                                                                        columnNumber: 43
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3281,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            }
                                                                            const isConfirmed = txn.note?.startsWith("[C] ");
                                                                            let confirmedBadge = null;
                                                                            if (isConfirmed) {
                                                                                confirmedBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: "Batch Item Confirmed",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "inline-flex items-center gap-1.5 px-2 h-[22px] justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-black whitespace-nowrap shadow-sm",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 3307,
                                                                                                columnNumber: 45
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            "CONFIRMED"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3306,
                                                                                        columnNumber: 43
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3305,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            }
                                                                            const updatedAtRaw = txn.updated_at || txn.updated || null;
                                                                            const createdAtRaw = txn.created_at || txn.created || null;
                                                                            const editedFromMetadata = Boolean(metadata?.is_edited || metadata?.edited || metadata?.edited_at);
                                                                            const historyCount = Number(txn.history_count || 0);
                                                                            const editedFromTimestamps = Boolean(updatedAtRaw) && Boolean(createdAtRaw) && Math.abs(new Date(String(updatedAtRaw)).getTime() - new Date(String(createdAtRaw)).getTime()) > 2000;
                                                                            const isEdited = historyCount > 0 || editedFromMetadata || editedFromTimestamps;
                                                                            let editedBadge = null;
                                                                            if (isEdited) {
                                                                                editedBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: "Transaction was edited - click to view history",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: (e)=>{
                                                                                            e.stopPropagation();
                                                                                            setHistoryTarget(txn);
                                                                                        },
                                                                                        className: "inline-flex items-center gap-1.5 px-2 h-[22px] min-w-[70px] justify-center rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[10px] font-bold whitespace-nowrap transition-all duration-200 shadow-sm hover:bg-cyan-100",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                                                className: "h-3 w-3"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 3354,
                                                                                                columnNumber: 45
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            "EDITED"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3346,
                                                                                        columnNumber: 43
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3345,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            }
                                                                            const showBadges = currentInstallmentBadge || refundBadge || confirmRefundBadge || splitBadge || duplicationBadge || hasBulkDebts || batchBadge || confirmedBadge || editedBadge;
                                                                            if (!showBadges) return null;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-1 ml-auto",
                                                                                children: [
                                                                                    currentInstallmentBadge,
                                                                                    refundBadge,
                                                                                    confirmRefundBadge,
                                                                                    splitBadge,
                                                                                    duplicationBadge,
                                                                                    batchBadge,
                                                                                    confirmedBadge,
                                                                                    editedBadge,
                                                                                    hasBulkDebts && (()=>{
                                                                                        const bulkAllocation = metadata?.bulk_allocation || metadata?.bulkAllocation;
                                                                                        if (bulkAllocation?.debts && bulkAllocation.debts.length > 0) {
                                                                                            const debts = bulkAllocation.debts;
                                                                                            const count = debts.length;
                                                                                            if (count <= 1) return null;
                                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex flex-col gap-1",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            className: "font-semibold border-b border-slate-600 pb-1 mb-1",
                                                                                                            children: [
                                                                                                                "Repayment for ",
                                                                                                                count,
                                                                                                                " ",
                                                                                                                "items:"
                                                                                                            ]
                                                                                                        }, void 0, true, {
                                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                            lineNumber: 3408,
                                                                                                            columnNumber: 55
                                                                                                        }, void 0),
                                                                                                        debts.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "flex justify-between gap-4 text-xs",
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                        children: [
                                                                                                                            d.tag || "Unknown Period",
                                                                                                                            ":"
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                                        lineNumber: 3417,
                                                                                                                        columnNumber: 59
                                                                                                                    }, void 0),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                        className: "font-bold",
                                                                                                                        children: numberFormatter.format(d.amount)
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                                        lineNumber: 3422,
                                                                                                                        columnNumber: 59
                                                                                                                    }, void 0)
                                                                                                                ]
                                                                                                            }, i, true, {
                                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                                lineNumber: 3413,
                                                                                                                columnNumber: 57
                                                                                                            }, void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                    lineNumber: 3407,
                                                                                                    columnNumber: 53
                                                                                                }, void 0),
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    type: "button",
                                                                                                    onClick: (e)=>{
                                                                                                        e.stopPropagation();
                                                                                                        handleEdit(txn);
                                                                                                    },
                                                                                                    className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 w-fit cursor-pointer hover:bg-indigo-300 transition-colors",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-[10px] font-bold",
                                                                                                        children: [
                                                                                                            "+",
                                                                                                            count,
                                                                                                            " Paid"
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                        lineNumber: 3440,
                                                                                                        columnNumber: 53
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                    lineNumber: 3432,
                                                                                                    columnNumber: 51
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 3405,
                                                                                                columnNumber: 49
                                                                                            }, ("TURBOPACK compile-time value", void 0));
                                                                                        }
                                                                                        return null;
                                                                                    })()
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3375,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0));
                                                                        })()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3087,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3066,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "note":
                                                    {
                                                        const linkedIdForCopy = refundSeq === 2 || refundSeq === 3 ? displayIdForBadge : null;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 max-w-none group/note justify-between w-full min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1.5 min-w-0 flex-1",
                                                                    children: [
                                                                        linkedIdForCopy && linkedIdForCopy !== txn.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                copyToClipboard(linkedIdForCopy).then((ok)=>{
                                                                                    if (!ok) return;
                                                                                    setCopiedId(`linked-${txn.id}`);
                                                                                    setTimeout(()=>setCopiedId(null), 2000);
                                                                                });
                                                                            },
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("opacity-0 group-hover/note:opacity-100 transition-opacity p-0.5 hover:bg-blue-50 rounded text-blue-400 hover:text-blue-600 shrink-0", copiedId === `linked-${txn.id}` && "opacity-100 text-emerald-500"),
                                                                            title: `Copy Linked ID: ${linkedIdForCopy}`,
                                                                            children: copiedId === `linked-${txn.id}` ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3489,
                                                                                columnNumber: 43
                                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3491,
                                                                                columnNumber: 43
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3467,
                                                                            columnNumber: 39
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-slate-900 font-bold truncate cursor-help block flex-1",
                                                                            style: {
                                                                                fontSize: `0.9em`
                                                                            },
                                                                            children: txn.note?.startsWith("[C] ") ? txn.note.substring(4) : txn.note
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3496,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        txn.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "max-w-[300px] whitespace-normal break-words",
                                                                                children: txn.note
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3508,
                                                                                columnNumber: 41
                                                                            }, void 0),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                                className: "h-3 w-3 text-slate-400 flex-shrink-0"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3513,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3506,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3464,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1 ml-auto shrink-0 pl-1 border-l border-slate-100",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                copyToClipboard(txn.id).then((ok)=>{
                                                                                    if (!ok) return;
                                                                                    setCopiedId(txn.id);
                                                                                    setTimeout(()=>setCopiedId(null), 2000);
                                                                                });
                                                                            },
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-700 transition-colors shrink-0", copiedId === txn.id && "text-emerald-500"),
                                                                            title: `Copy Transaction ID: ${txn.id}`,
                                                                            children: copiedId === txn.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3540,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                className: "h-3.5 w-3.5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3542,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3521,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                            content: "Open in new tab",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.stopPropagation();
                                                                                    window.open(`/transactions?highlight=${txn.id}`, "_blank", "noopener,noreferrer");
                                                                                },
                                                                                className: "p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-emerald-600 transition-colors shrink-0",
                                                                                title: "Open in new tab",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                                    className: "h-3.5 w-3.5"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3559,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3547,
                                                                                columnNumber: 37
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3546,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3519,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3462,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "category":
                                                    {
                                                        const actualCategory = categories.find((c)=>c.id === txn.category_id) || null;
                                                        const displayCategory = actualCategory?.name || txn.category_name || "Uncategorized";
                                                        const categoryImage = actualCategory?.image_url || actualCategory?.image_url || txn.category_image_url || null;
                                                        const categoryIcon = actualCategory?.icon || txn.category_icon || null;
                                                        // Internal vs External Logic
                                                        const isInternal = actualCategory?.kind === "internal";
                                                        const kindLabel = isInternal ? "internal" : "external";
                                                        const KindIcon = isInternal ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users2$3e$__["Users2"];
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "shrink-0 h-8 w-8 rounded-none border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shadow-sm",
                                                                    children: categoryImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: categoryImage,
                                                                        alt: displayCategory,
                                                                        className: "h-full w-full object-contain"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3599,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : categoryIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm",
                                                                        children: categoryIcon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3605,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"], {
                                                                        className: "h-4 w-4 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3609,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3597,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-bold text-slate-900 truncate leading-tight",
                                                                            title: displayCategory,
                                                                            children: displayCategory
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3614,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest leading-none mt-0.5", isInternal ? "text-indigo-600" : "text-slate-500"),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KindIcon, {
                                                                                    className: "h-2.5 w-2.5"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3628,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: kindLabel
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3629,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3620,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3613,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3595,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "account":
                                                    {
                                                        // FLOW COLUMN WITH CYCLE BADGES
                                                        // ==============================
                                                        // Extract data
                                                        const sourceId = txnSourceId;
                                                        const sourceAccountFromId = sourceId ? accounts.find((a)=>a.id === sourceId) : null;
                                                        const sourceName = txn.source_name || txn.account_name || sourceAccountFromId?.name || "Unknown";
                                                        const sourceIcon = txn.source_image || sourceAccountFromId?.image_url || null;
                                                        const personPocketBaseId = txn.person_pocketbase_id;
                                                        const personId = personPocketBaseId || txn.person_id;
                                                        const resolvedPerson = personId ? people.find((person)=>person.id === personId) : null;
                                                        const personName = txn.person_name || resolvedPerson?.name || "Unknown";
                                                        const personImage = txn.person_image_url || resolvedPerson?.image_url || null;
                                                        const destId = txnDestId;
                                                        const destAccountFromId = destId ? accounts.find((a)=>a.id === destId) : null;
                                                        const destName = txn.destination_name || destAccountFromId?.name || destNameRaw;
                                                        const destIcon = txn.destination_image || destAccountFromId?.image_url || null;
                                                        // Determine what to display
                                                        const hasPerson = !!personId;
                                                        const hasTarget = !!destId;
                                                        // Get cycle tags
                                                        const cycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(txn.persisted_cycle_tag) ?? txn.persisted_cycle_tag;
                                                        const debtTag = personId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(txn.tag) ?? txn.tag : null;
                                                        // Get source account for cycle badge
                                                        const sourceAccount = accounts.find((a)=>a.id === sourceId);
                                                        const destAccount = accounts.find((a)=>a.id === destId);
                                                        // Type icon
                                                        let typeIcon = null;
                                                        if (txn.type === "expense") {
                                                            typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Expense",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                                    className: "h-4 w-4 text-red-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3715,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3714,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (txn.type === "income") {
                                                            typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Income",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"], {
                                                                    className: "h-4 w-4 text-emerald-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3721,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3720,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (txn.type === "transfer") {
                                                            typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Transfer",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                                                    className: "h-4 w-4 text-blue-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3727,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3726,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (txn.type === "debt" || txn.type === "loan") {
                                                            typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Debt",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserMinus$3e$__["UserMinus"], {
                                                                    className: "h-4 w-4 text-amber-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3736,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3735,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        } else if (txn.type === "repayment") {
                                                            typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: "Repayment",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                                    className: "h-4 w-4 text-purple-600"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3742,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3741,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        // Wrapper for Type Icon with border as requested for alignment check
                                                        const borderedTypeIconWide = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-slate-100 bg-white shadow-sm",
                                                            children: typeIcon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3749,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        // Cycle badge for source (only credit_card with cashback_config)
                                                        const sourceCycleBadge = sourceAccount && sourceAccount.type === "credit_card" && sourceAccount.cashback_config ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transactions$2d$v2$2f$badge$2f$CycleBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CycleBadge"], {
                                                            account: sourceAccount,
                                                            cycleTag: cycleTag,
                                                            txnDate: txn.occurred_at || txn.created_at,
                                                            compact: true,
                                                            className: "h-full min-w-[92px] justify-center px-2 rounded-r-md rounded-l-none text-[10px] border-amber-400 bg-amber-200 text-amber-900",
                                                            entityName: sourceName
                                                        }, `cycle-source-${txn.id}`, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3759,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)) : null;
                                                        // People debt tag badge with click/hover logic
                                                        const person = resolvedPerson;
                                                        const personRouteId = personId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$person$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersonRouteId"])(person ?? {
                                                            id: personId,
                                                            pocketbase_id: null
                                                        }) : null;
                                                        const cycleSheet = person?.cycle_sheets?.find((s)=>s.cycle_tag === debtTag);
                                                        const sheetUrl = cycleSheet?.sheet_url || person?.google_sheet_url || person?.sheet_link;
                                                        const peopleDebtTag = personId && debtTag ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-stretch gap-0 shrink-0 h-full",
                                                            children: [
                                                                sheetUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex min-w-[230px] items-center justify-between gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    "Open Tracking Sheet for ",
                                                                                    personName,
                                                                                    " (",
                                                                                    debtTag,
                                                                                    ")"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3798,
                                                                                columnNumber: 43
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: (e)=>{
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    void handleQuickSyncCycle(personId, debtTag);
                                                                                },
                                                                                className: "inline-flex items-center rounded border border-emerald-300 bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-emerald-600 transition-colors",
                                                                                children: "Sync"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 3801,
                                                                                columnNumber: 43
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3797,
                                                                        columnNumber: 41
                                                                    }, void 0),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: (e)=>{
                                                                            e.stopPropagation();
                                                                            window.open(sheetUrl, "_blank", "noopener,noreferrer");
                                                                        },
                                                                        className: "inline-flex h-full w-7 items-center justify-center rounded-none bg-emerald-200 border-y border-l border-emerald-300 text-emerald-900 cursor-pointer hover:bg-emerald-300 transition-colors",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3829,
                                                                            columnNumber: 41
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3818,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3795,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                    content: `Open Debt Cycle for ${personName} (${debtTag})`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        onClick: (e)=>{
                                                                            e.stopPropagation();
                                                                            e.preventDefault();
                                                                            window.open(`/people/${personRouteId}?tag=${debtTag}`, "_blank", "noopener,noreferrer");
                                                                        },
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center bg-blue-200 border-y border-r border-blue-300 text-blue-900 px-2 h-full text-[10px] font-extrabold whitespace-nowrap cursor-pointer hover:bg-blue-300 transition-colors", sheetUrl ? "rounded-r-md rounded-l-none" : "rounded-r-md rounded-l-none border-l"),
                                                                        children: debtTag
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3836,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3833,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, `debt-tag-${txn.id}`, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 3790,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0)) : null;
                                                        // CONTEXT HIDING LOGIC
                                                        // Determine transparency based on context to simplify view
                                                        const isPersonContext = hasPerson && personId === contextId;
                                                        const isSourceContext = sourceId === contextId;
                                                        const isDestContext = destId === contextId;
                                                        // Should we use Single Flow Mode?
                                                        // Yes if:
                                                        // 1. Pure Single (No target/person)
                                                        // 2. Or Context matches one side (so we hide that side and show the other in single mode)
                                                        const showSingleFlow = !hasTarget && !hasPerson || isPersonContext || hasPerson && isSourceContext || hasTarget && isDestContext || hasTarget && isSourceContext;
                                                        if (showSingleFlow) {
                                                            // Determine WHICH entity to show
                                                            let entityToShow = "source";
                                                            if (isSourceContext) {
                                                                // Viewing Account. Show where money went/came from.
                                                                entityToShow = hasPerson ? "person" : "dest";
                                                            } else if (isDestContext || isPersonContext) {
                                                                // Viewing Person/Target. Show the Source Account involved.
                                                                entityToShow = "source";
                                                            } else {
                                                                // Default if somehow showSingleFlow is true but context not matched
                                                                // (e.g. general view for simple single transactions)
                                                                entityToShow = "dest";
                                                            }
                                                            let displayName = sourceName;
                                                            let displayImage = sourceIcon;
                                                            let displayLink = sourceId ? `/accounts/${sourceId}` : null;
                                                            let displayIsAccount = true;
                                                            let badgeToDisplay = sourceCycleBadge;
                                                            let isCycleBadge = true;
                                                            const isRepaymentFlowWithPerson = (txn.type === "repayment" || txn.type === "income") && hasPerson;
                                                            let roleLabel = "FROM";
                                                            if (entityToShow === "person") {
                                                                displayName = personName;
                                                                displayImage = personImage;
                                                                displayLink = personRouteId ? `/people/${personRouteId}` : null;
                                                                displayIsAccount = false;
                                                                roleLabel = isRepaymentFlowWithPerson ? "FROM" : "TO";
                                                                badgeToDisplay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1.5",
                                                                    children: peopleDebtTag
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 3917,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                isCycleBadge = false;
                                                            } else if (entityToShow === "dest") {
                                                                displayName = destName;
                                                                displayImage = destIcon;
                                                                displayLink = destId ? `/accounts/${destId}` : null;
                                                                displayIsAccount = !hasPerson;
                                                                roleLabel = "TO";
                                                                // Destination usually no badge unless debt, but for account transfer no badge currently
                                                                badgeToDisplay = null;
                                                                isCycleBadge = false;
                                                                // Fallback to Category/Shop for simple transactions
                                                                if (displayName === "Unknown" && !hasPerson && !hasTarget) {
                                                                    const cat = categories.find((c)=>c.id === txn.category_id);
                                                                    displayName = cat?.name || txn.category_name || "General";
                                                                    displayImage = cat?.image_url || null;
                                                                    displayLink = null;
                                                                }
                                                            }
                                                            if (entityToShow === "source") {
                                                                roleLabel = isRepaymentFlowWithPerson ? "TO" : "FROM";
                                                            }
                                                            // Universal fallback for Unknown in Single Flow
                                                            if (displayName === "Unknown" && !hasPerson && !hasTarget) {
                                                                const cat = categories.find((c)=>c.id === txn.category_id);
                                                                displayName = cat?.name || txn.category_name || "General";
                                                                displayImage = cat?.image_url || null;
                                                                displayLink = null;
                                                                badgeToDisplay = null;
                                                                isCycleBadge = false;
                                                            }
                                                            // If showing Source, ensure badge is set (cycle badge)
                                                            // If showing Source but simple expense, badge is sourceCycleBadge
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5 w-full min-w-0 h-9",
                                                                children: [
                                                                    borderedTypeIconWide,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 min-w-0 h-9 pl-1.5 pr-0 py-0 rounded-md bg-slate-50 border border-slate-200 flex items-stretch gap-0 cursor-pointer hover:bg-slate-100 transition-colors group/pill shadow-sm overflow-hidden",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0 flex items-center gap-2 pr-0",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                    content: `Open ${displayName} in new tab`,
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex-1 min-w-0 flex items-center gap-2 h-full",
                                                                                        onClick: (e)=>{
                                                                                            if (displayLink) {
                                                                                                e.stopPropagation();
                                                                                                window.open(displayLink, "_blank", "noopener,noreferrer");
                                                                                            }
                                                                                        },
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "shrink-0 h-7 w-7 flex items-center justify-center",
                                                                                                children: displayImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                    src: displayImage,
                                                                                                    alt: "",
                                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full w-full object-contain", displayIsAccount ? "rounded-sm" : "rounded-none")
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                    lineNumber: 4001,
                                                                                                    columnNumber: 47
                                                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full w-full flex items-center justify-center border border-slate-100 bg-white", displayIsAccount ? "rounded-sm" : "rounded-none"),
                                                                                                    children: displayIsAccount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                                                                        className: "h-4 w-4 text-slate-400"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                        lineNumber: 4021,
                                                                                                        columnNumber: 51
                                                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                                        className: "h-4 w-4 text-slate-400"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                        lineNumber: 4023,
                                                                                                        columnNumber: 51
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                    lineNumber: 4012,
                                                                                                    columnNumber: 47
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 3999,
                                                                                                columnNumber: 43
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "min-w-0 overflow-hidden",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex min-w-0 items-center",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center rounded-md border px-1.5 h-4 text-[9px] font-black tracking-wide mr-1.5 shrink-0", roleLabel === "FROM" ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"),
                                                                                                            children: roleLabel
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                            lineNumber: 4030,
                                                                                                            columnNumber: 47
                                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            className: "min-w-0 block text-sm font-bold text-slate-700 truncate group-hover/pill:text-blue-600 transition-colors",
                                                                                                            children: displayName
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                            lineNumber: 4040,
                                                                                                            columnNumber: 47
                                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                    lineNumber: 4029,
                                                                                                    columnNumber: 45
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 4028,
                                                                                                columnNumber: 43
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 3986,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 3983,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                badgeToDisplay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "ml-auto shrink-0 self-stretch flex items-stretch",
                                                                                    children: isCycleBadge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                                        content: `Open details for ${displayName} in new tab filtered by cycle ${cycleTag || ""}`,
                                                                                        children: badgeToDisplay
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 4052,
                                                                                        columnNumber: 45
                                                                                    }, ("TURBOPACK compile-time value", void 0)) : // If debt tag (it manages its own tooltip inside the component)
                                                                                    badgeToDisplay
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4050,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 3981,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 3980,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 3977,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        // CASE 2: Dual flow - source LEFT, target RIGHT (includes Account → Person)
                                                        const sourceBadges = [
                                                            sourceCycleBadge
                                                        ].filter(Boolean);
                                                        // Target badges - debt tag for people OR nothing for accounts
                                                        const targetBadges = hasPerson ? [
                                                            peopleDebtTag
                                                        ].filter(Boolean) : [];
                                                        // Repayment swap logic: if repayment/income + person, swap display
                                                        const isRepayment = txn.type === "repayment" || txn.type === "income";
                                                        const shouldSwap = isRepayment && hasPerson;
                                                        // Build entity objects
                                                        const sourceEntity = {
                                                            name: sourceName,
                                                            icon: sourceIcon,
                                                            link: sourceId ? `/accounts/${sourceId}` : null,
                                                            isAccount: true
                                                        };
                                                        const targetEntity = {
                                                            name: hasPerson ? personName : destName,
                                                            icon: hasPerson ? personImage : destIcon,
                                                            link: hasPerson ? personRouteId ? `/people/${personRouteId}` : null : destId ? `/accounts/${destId}` : null,
                                                            isAccount: !hasPerson
                                                        };
                                                        // Swap if repayment with person
                                                        const [displayLeft, displayRight] = shouldSwap ? [
                                                            targetEntity,
                                                            sourceEntity
                                                        ] : [
                                                            sourceEntity,
                                                            targetEntity
                                                        ];
                                                        const [leftBadges, rightBadges] = shouldSwap ? [
                                                            targetBadges,
                                                            sourceBadges
                                                        ] : [
                                                            sourceBadges,
                                                            targetBadges
                                                        ];
                                                        const [leftRole, rightRole] = [
                                                            "FROM",
                                                            "TO"
                                                        ];
                                                        // Helper to render entity with badge
                                                        const renderFlowEntity = (entity, badges, roleLabel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0 h-9 pl-1.5 pr-0 py-0 rounded-md bg-slate-50 border border-slate-200 flex items-stretch gap-0 cursor-pointer hover:bg-slate-100 transition-colors group/pill shadow-sm overflow-hidden",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                        content: `Open ${entity.name} in new tab`,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex-1 min-w-0 flex items-center gap-2 h-full pr-0",
                                                                            onClick: (e)=>{
                                                                                if (entity.link) {
                                                                                    e.stopPropagation();
                                                                                    window.open(entity.link, "_blank", "noopener,noreferrer");
                                                                                }
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "shrink-0 h-7 w-7 flex items-center justify-center",
                                                                                    children: entity.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: entity.icon,
                                                                                        alt: "",
                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full w-full object-contain", entity.isAccount ? "rounded-sm" : "rounded-none")
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 4142,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full w-full flex items-center justify-center border border-slate-100 bg-white", entity.isAccount ? "rounded-sm" : "rounded-none"),
                                                                                        children: entity.isAccount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                                                            className: "h-4 w-4 text-slate-400"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 4162,
                                                                                            columnNumber: 45
                                                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                            className: "h-4 w-4 text-slate-400"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                            lineNumber: 4164,
                                                                                            columnNumber: 45
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 4153,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4140,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1 min-w-0 overflow-hidden",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex min-w-0 items-center",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center rounded-md border px-1.5 h-4.5 text-[9px] font-black tracking-wide mr-1.5 shrink-0 shadow-sm", roleLabel === "FROM" ? "border-indigo-700 bg-indigo-600 text-white" : "border-emerald-700 bg-emerald-600 text-white"),
                                                                                                children: roleLabel
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 4171,
                                                                                                columnNumber: 41
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "min-w-0 block text-sm font-bold text-slate-700 truncate group-hover/pill:text-blue-600 transition-colors",
                                                                                                children: entity.name
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                                lineNumber: 4181,
                                                                                                columnNumber: 41
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                        lineNumber: 4170,
                                                                                        columnNumber: 39
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4169,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4127,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4124,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    badges.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "ml-auto shrink-0 self-stretch flex items-stretch justify-end gap-0",
                                                                        children: badges.map((badge, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                                                children: badge
                                                                            }, idx, false, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 4193,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4191,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4122,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5 w-full min-w-0 h-9",
                                                            children: [
                                                                borderedTypeIconWide,
                                                                renderFlowEntity(displayLeft, leftBadges, leftRole),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-200 shadow-sm mx-0.5",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        className: "h-2.5 w-2.5 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4211,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4210,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                renderFlowEntity(displayRight, rightBadges, rightRole)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4203,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "people":
                                                    {
                                                        const personPocketBaseId = txn.person_pocketbase_id;
                                                        const personId = personPocketBaseId || txn.person_id;
                                                        const resolvedPerson = personId ? people.find((person)=>person.id === personId) : null;
                                                        const personName = txn.person_name || resolvedPerson?.name || "Unknown";
                                                        const personImage = txn.person_image_url || resolvedPerson?.image_url || null;
                                                        if (!personId) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300 italic text-xs",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4247,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-6 w-6 rounded-none border border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0",
                                                                    children: personImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: personImage,
                                                                        alt: personName,
                                                                        className: "h-full w-full object-contain"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4256,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                        className: "h-3 w-3 text-slate-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4262,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4254,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-medium text-slate-700 truncate",
                                                                    children: personName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4265,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4253,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "tag":
                                                    {
                                                        const displayTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMonthTag"])(txn.tag) ?? txn.tag ?? "";
                                                        const acc = accounts.find((a)=>a.id === (txn.account_id || txn.source_account_id || txn.target_account_id));
                                                        const stmtDay = Number(acc?.statement_day ?? acc?.credit_card_info?.statement_day ?? 25) || 25;
                                                        const dateRangeTooltip = displayTag ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCycleTag"])(displayTag, stmtDay) : "";
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-1 min-w-[120px] justify-end",
                                                            children: [
                                                                displayTag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                    content: dateRangeTooltip || displayTag,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "inline-flex items-center rounded-md bg-amber-400 px-2.5 py-1 text-xs font-semibold text-black border border-amber-500 shadow-sm cursor-help whitespace-nowrap",
                                                                        children: displayTag
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4288,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4285,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                (txn.is_installment || txn.installment_plan_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/installments",
                                                                    className: "text-blue-600 hover:text-blue-800 transition-colors",
                                                                    title: "View Installment Plan",
                                                                    onClick: (e)=>e.stopPropagation(),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4302,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4296,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                !txn.tag && !txn.is_installment && !txn.installment_plan_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-400 opacity-50 text-xs",
                                                                    children: "-"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4308,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4283,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "amount":
                                                    {
                                                        const amount = typeof txn.amount === "number" ? txn.amount : 0;
                                                        const originalAmount = typeof txn.original_amount === "number" ? txn.original_amount : amount;
                                                        // Calculate Cashback/Fee for display
                                                        const { percentRaw, fixedRaw, shareAmount } = resolveCashbackFields(txn);
                                                        const cashbackVal = shareAmount;
                                                        const percentDisp = percentRaw;
                                                        const fixedDisp = fixedRaw;
                                                        const rate = percentDisp > 1 ? percentDisp / 100 : percentDisp;
                                                        const isRepayment = txn.type === "repayment";
                                                        const visualType = txn.displayType ?? txn.type;
                                                        const amountClass = visualType === "income" || isRepayment ? "text-emerald-700" : visualType === "expense" ? "text-red-500" : "text-slate-600";
                                                        // Calculate final price
                                                        const cashbackAmount = cashbackVal;
                                                        const baseAmount = Math.abs(Number(originalAmount ?? 0));
                                                        const finalDisp = typeof txn.final_price === "number" ? Math.abs(txn.final_price) : cashbackAmount > baseAmount ? baseAmount : Math.max(0, baseAmount - cashbackAmount);
                                                        const hasCashback = cashbackVal > 0 || percentDisp > 0 || fixedDisp > 0;
                                                        // Price breakdown tooltip content
                                                        const priceBreakdown = hasCashback ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs space-y-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-semibold border-b border-slate-200 pb-1 mb-1",
                                                                    children: "💰 Price Breakdown"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4362,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "Original Amount:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4366,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold",
                                                                            children: numberFormatter.format(Math.abs(originalAmount))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4367,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4365,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                percentDisp > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between gap-4 text-emerald-600",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                "Discount (",
                                                                                percentDisp > 1 ? percentDisp : percentDisp * 100,
                                                                                "%):"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4375,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold",
                                                                            children: [
                                                                                "-",
                                                                                numberFormatter.format(Math.abs(originalAmount) * rate)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4382,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4374,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                fixedDisp > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between gap-4 text-emerald-600",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "Fixed Discount:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4392,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold",
                                                                            children: [
                                                                                "-",
                                                                                numberFormatter.format(fixedDisp)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4393,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4391,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between gap-4 font-bold border-t border-slate-200 pt-1 mt-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: "Final Price:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4399,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold",
                                                                            children: numberFormatter.format(finalDisp)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4400,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4398,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4361,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0)) : null;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-start gap-1 w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex w-full items-center justify-between gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 min-w-0",
                                                                        children: [
                                                                            percentDisp > 0 && !visibleColumns.total_back && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex items-center px-2 h-6 rounded-md text-[10px] font-black bg-sky-100 text-sky-700 border border-sky-200 shrink-0",
                                                                                children: [
                                                                                    "-",
                                                                                    (()=>{
                                                                                        const percentBadgeValue = percentDisp > 1 ? percentDisp : percentDisp * 100;
                                                                                        return percentBadgeValue % 1 === 0 ? percentBadgeValue.toFixed(0) : percentBadgeValue.toFixed(2);
                                                                                    })(),
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 4413,
                                                                                columnNumber: 41
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            fixedDisp > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "inline-flex items-center px-2 h-6 rounded-md text-[10px] font-black bg-sky-100 text-sky-700 border border-sky-200 shrink-0",
                                                                                children: [
                                                                                    "-",
                                                                                    numberFormatter.format(fixedDisp)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                lineNumber: 4428,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4410,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-auto text-right font-black tabular-nums tracking-tight truncate", amountClass),
                                                                        style: {
                                                                            fontSize: `0.95em`
                                                                        },
                                                                        children: numberFormatter.format(Math.abs(amount))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                        lineNumber: 4433,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4409,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4408,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "final_price":
                                                    {
                                                        const amount = typeof txn.amount === "number" ? txn.amount : 0;
                                                        const originalAmount = typeof txn.original_amount === "number" ? txn.original_amount : amount;
                                                        const { percentRaw, fixedRaw, shareAmount, bankBack } = resolveCashbackFields(txn);
                                                        const percentDisp = percentRaw;
                                                        const fixedDisp = fixedRaw;
                                                        const cashbackAmount = shareAmount > 0 ? shareAmount : bankBack;
                                                        const baseAmount = Math.abs(Number(originalAmount ?? 0));
                                                        const finalDisp = typeof txn.final_price === "number" ? Math.abs(txn.final_price) : cashbackAmount > baseAmount ? baseAmount : Math.max(0, baseAmount - cashbackAmount);
                                                        const estimatedRewardDisplay = cashbackAmount > 0 ? cashbackAmount : Math.max(0, baseAmount - finalDisp);
                                                        const netBackAmount = cashbackAmount > 0 ? cashbackAmount : Math.max(0, baseAmount - finalDisp);
                                                        const netBackClass = netBackAmount > 0 ? "text-emerald-700" : "text-slate-500";
                                                        const isRepayment = txn.type === "repayment";
                                                        const visualType = txn.displayType ?? txn.type;
                                                        const finalAmountClass = visualType === "income" || isRepayment ? "text-emerald-700" : visualType === "expense" ? "text-red-500" : "text-slate-600";
                                                        const hasCashback = percentDisp > 0 || fixedDisp > 0 || cashbackAmount > 0;
                                                        if (!hasCashback) {
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col items-start gap-1 w-full",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-auto text-right font-black tabular-nums tracking-tight truncate", finalAmountClass),
                                                                    style: {
                                                                        fontSize: `0.95em`
                                                                    },
                                                                    children: numberFormatter.format(Math.abs(finalDisp))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4506,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4505,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        }
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-start gap-1 w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-semibold border-b border-slate-200 pb-1 mb-1",
                                                                            children: "💰 Net Value Formula"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4524,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Base Amount:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4528,
                                                                                    columnNumber: 41
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: numberFormatter.format(baseAmount)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4529,
                                                                                    columnNumber: 41
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4527,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between gap-4 text-emerald-600",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Est. Refund/Bank Reward:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4534,
                                                                                    columnNumber: 41
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: numberFormatter.format(estimatedRewardDisplay)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4535,
                                                                                    columnNumber: 41
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4533,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between gap-4 font-bold border-t border-slate-200 pt-1 mt-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Back Amount:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4542,
                                                                                    columnNumber: 41
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: numberFormatter.format(netBackAmount)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4543,
                                                                                    columnNumber: 41
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4541,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[10px] text-slate-400 italic pt-1",
                                                                            children: "Formula: Base Amount - Final Amount"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4547,
                                                                            columnNumber: 39
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4523,
                                                                    columnNumber: 37
                                                                }, void 0),
                                                                side: "bottom",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex w-full items-center justify-between gap-1.5 cursor-help",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "inline-flex items-center h-6 px-2 rounded-md border border-sky-200 bg-sky-100 text-sky-700 font-black tabular-nums tracking-tight truncate",
                                                                            children: [
                                                                                "-",
                                                                                numberFormatter.format(netBackAmount)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4555,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-auto text-right font-black tabular-nums tracking-tight truncate", finalAmountClass),
                                                                            style: {
                                                                                fontSize: `0.95em`
                                                                            },
                                                                            children: numberFormatter.format(Math.abs(finalDisp))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4558,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4554,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4521,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4520,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "total_back":
                                                    {
                                                        const amount = typeof txn.amount === "number" ? txn.amount : 0;
                                                        const originalAmount = typeof txn.original_amount === "number" ? txn.original_amount : amount;
                                                        const baseAmount = Math.abs(Number(originalAmount ?? 0));
                                                        const { percentRaw, fixedRaw, shareAmount, bankBack } = resolveCashbackFields(txn);
                                                        const percentDisp = percentRaw;
                                                        const fixedDisp = fixedRaw;
                                                        const cashbackAmount = shareAmount > 0 ? shareAmount : bankBack;
                                                        if (cashbackAmount === 0 && !percentDisp && !fixedDisp) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4599,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        const effectivePercent = baseAmount > 0 ? cashbackAmount / baseAmount * 100 : 0;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-end gap-0.5 w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-semibold border-b border-slate-200 pb-1 mb-1",
                                                                            children: "💰 Total Back Details"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4611,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Base:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4615,
                                                                                    columnNumber: 41
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: numberFormatter.format(baseAmount)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4616,
                                                                                    columnNumber: 41
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4614,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between gap-4 text-emerald-600",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Back:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4621,
                                                                                    columnNumber: 41
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-bold",
                                                                                    children: numberFormatter.format(cashbackAmount)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4622,
                                                                                    columnNumber: 41
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4620,
                                                                            columnNumber: 39
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[10px] text-slate-400 italic pt-1 text-right",
                                                                            children: [
                                                                                "~ ",
                                                                                effectivePercent.toFixed(2),
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4628,
                                                                            columnNumber: 39
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4610,
                                                                    columnNumber: 37
                                                                }, void 0),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-baseline gap-1.5 justify-end cursor-help",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-bold text-emerald-600",
                                                                            children: [
                                                                                "-",
                                                                                effectivePercent % 1 === 0 ? effectivePercent.toFixed(0) : effectivePercent.toFixed(2),
                                                                                "% ="
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4635,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-black text-emerald-700 tabular-nums",
                                                                            children: numberFormatter.format(cashbackAmount)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4642,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4634,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4608,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4607,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "back_info":
                                                    {
                                                        const { percentRaw, fixedRaw, shareAmount, bankBack } = resolveCashbackFields(txn);
                                                        const cashbackAmount = bankBack + shareAmount;
                                                        const pRaw = percentRaw;
                                                        const fRaw = fixedRaw;
                                                        if (!pRaw && !fRaw && typeof txn.profit !== "number") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-300",
                                                            children: "-"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4665,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col text-[1em]",
                                                            children: [
                                                                (pRaw || fRaw) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[0.7em] text-slate-500 mb-0.5",
                                                                    children: [
                                                                        pRaw ? `${(pRaw > 1 ? pRaw : pRaw * 100) % 1 === 0 ? (pRaw > 1 ? pRaw : pRaw * 100).toFixed(0) : (pRaw > 1 ? pRaw : pRaw * 100).toFixed(2)}%` : "",
                                                                        pRaw && fRaw ? " + " : "",
                                                                        fRaw ? numberFormatter.format(fRaw) : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4669,
                                                                    columnNumber: 35
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        cashbackAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-emerald-600 font-bold flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__["Sigma"], {
                                                                                    className: "h-3 w-3"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4685,
                                                                                    columnNumber: 39
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                numberFormatter.format(cashbackAmount)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                            lineNumber: 4684,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        typeof txn.profit === "number" && txn.profit !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                cashbackAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-slate-300",
                                                                                    children: ";"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4693,
                                                                                    columnNumber: 43
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: `font-bold flex items-center gap-1 ${txn.profit >= 0 ? "text-emerald-600" : "text-rose-600"}`,
                                                                                    children: [
                                                                                        "🤑",
                                                                                        " ",
                                                                                        numberFormatter.format(txn.profit)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                                    lineNumber: 4697,
                                                                                    columnNumber: 41
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                    lineNumber: 4682,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4667,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    }
                                                case "id":
                                                    const isCopied = copiedId === txn.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$custom$2d$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CustomTooltip"], {
                                                        content: isCopied ? "Copied!" : txn.id,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e)=>{
                                                                e.stopPropagation();
                                                                copyToClipboard(txn.id).then((ok)=>{
                                                                    if (!ok) return;
                                                                    setCopiedId(txn.id);
                                                                    setTimeout(()=>setCopiedId(null), 2000);
                                                                });
                                                            },
                                                            className: "p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-slate-600 transition-colors shrink-0",
                                                            title: "Copy ID",
                                                            children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                                className: "h-4 w-4 text-emerald-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4728,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                                lineNumber: 4730,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                            lineNumber: 4715,
                                                            columnNumber: 33
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                        lineNumber: 4712,
                                                        columnNumber: 31
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                default:
                                                    return "";
                                            }
                                        };
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-slate-200 transition-colors text-base relative", isMenuOpen ? "bg-blue-50" : rowBgColor, !isExcelMode && "hover:bg-slate-50/50", (updatingTxnIds.has(txn.id) || loadingIds?.has(txn.id)) && "opacity-70 animate-pulse bg-slate-50", successTxnIds.has(txn.id) && "bg-emerald-50/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"),
                                            children: displayedColumns.map((col)=>{
                                                const allowOverflow = col.key === "date";
                                                const stickyStyle = {
                                                    width: columnWidths[col.key],
                                                    maxWidth: columnWidths[col.key],
                                                    overflow: allowOverflow ? "visible" : "hidden",
                                                    whiteSpace: allowOverflow ? "nowrap" : "nowrap"
                                                };
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                    onMouseDown: (e)=>handleCellMouseDown(txn.id, col.key, e),
                                                    onMouseEnter: ()=>handleCellMouseEnter(txn.id, col.key),
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(`border-r border-slate-200 ${col.key === "amount" ? "font-bold" : ""} ${col.key === "amount" ? amountClass : ""} ${voidedTextClass} truncate`, (col.key === "amount" || col.key === "final_price") && "text-right", col.key === "account" && "pr-1", col.key === "actions" && "px-1", col.key === "date" && "p-1", col.key === "date" && "relative overflow-visible", isExcelMode && "select-none cursor-crosshair active:cursor-crosshair", isExcelMode && selectedCells.has(txn.id) && col.key === "amount" && "bg-blue-100 ring-2 ring-inset ring-blue-500 z-10"),
                                                    style: stickyStyle,
                                                    children: renderCell(col.key)
                                                }, `${txn.id}-${col.key}`, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4765,
                                                    columnNumber: 31
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, txn.id, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4741,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 2360,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                selection.size > 0 && paginatedTransactions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                    className: "sticky bottom-0 z-40 bg-slate-900 text-white font-black shadow-[0_-4px_12px_rgba(0,0,0,0.2)] border-t-2 border-slate-700",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        className: "hover:bg-slate-900 border-0",
                                        children: displayedColumns.map((col, idx)=>{
                                            const width = columnWidths[col.key];
                                            const isFirst = idx === 0;
                                            let content = null;
                                            if (isFirst) {
                                                content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] uppercase tracking-widest opacity-60 ml-8",
                                                    children: "Total Rows"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4812,
                                                    columnNumber: 29
                                                }, ("TURBOPACK compile-time value", void 0));
                                            } else if (col.key === "amount") {
                                                content = numberFormatter.format(tableTotals.base);
                                            } else if (col.key === "total_back") {
                                                content = numberFormatter.format(tableTotals.back);
                                            } else if (col.key === "final_price") {
                                                content = numberFormatter.format(tableTotals.net);
                                            } else if (col.key === "actual_cashback") {
                                                content = numberFormatter.format(tableTotals.estCb);
                                            } else if (col.key === "est_share") {
                                                content = numberFormatter.format(tableTotals.shared);
                                            } else if (col.key === "net_profit") {
                                                content = numberFormatter.format(tableTotals.profit);
                                            }
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-2.5 px-3 whitespace-nowrap border-r border-slate-800", (col.key === "amount" || col.key === "total_back" || col.key === "final_price" || col.key === "actual_cashback" || col.key === "est_share" || col.key === "net_profit") && "text-right tabular-nums"),
                                                style: {
                                                    width,
                                                    maxWidth: width
                                                },
                                                children: content
                                            }, `total-${col.key}`, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 4831,
                                                columnNumber: 27
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 4804,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 4803,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 2197,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 2172,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                !isExcelMode && showPagination && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        typeof document !== "undefined" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed bottom-0 left-0 right-0 flex md:hidden bg-white border-t border-slate-200 px-3 py-2 items-center justify-between gap-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-slate-500 font-medium whitespace-nowrap hidden sm:inline",
                                            children: "Rows"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4862,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "h-7 w-14 rounded-md border border-slate-200 text-[11px] font-semibold focus:border-blue-500 focus:outline-none bg-white px-1",
                                            value: pageSize,
                                            onChange: (e)=>setPageSize(Number(e.target.value)),
                                            children: [
                                                10,
                                                20,
                                                50,
                                                100,
                                                200,
                                                500
                                            ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: size,
                                                    children: size
                                                }, size, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4871,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4865,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 4861,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
                                            disabled: currentPage === 1,
                                            className: "flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 4886,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4879,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[11px] font-medium whitespace-nowrap",
                                            children: [
                                                currentPage,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400",
                                                    children: [
                                                        "/ ",
                                                        calculatedTotalPages
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4890,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4888,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage(Math.min(calculatedTotalPages, currentPage + 1)),
                                            disabled: currentPage >= calculatedTotalPages,
                                            className: "flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 4903,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4894,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 4878,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 4860,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0)), document.body),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex flex-none bg-white border-t border-slate-200 p-2 lg:p-3 items-center justify-between gap-2 z-40 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-slate-500 font-medium whitespace-nowrap hidden sm:inline",
                                            children: "Rows"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4913,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "h-7 w-14 rounded-md border border-slate-200 text-[11px] font-semibold focus:border-blue-500 focus:outline-none bg-white px-1",
                                            value: pageSize,
                                            onChange: (e)=>setPageSize(Number(e.target.value)),
                                            children: [
                                                10,
                                                20,
                                                50,
                                                100,
                                                200,
                                                500
                                            ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: size,
                                                    children: size
                                                }, size, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4922,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4916,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 4912,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
                                            disabled: currentPage === 1,
                                            className: "flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 4936,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4931,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[11px] font-medium whitespace-nowrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Page "
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4939,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                currentPage,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-400",
                                                    children: [
                                                        "/ ",
                                                        calculatedTotalPages
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4941,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4938,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setCurrentPage(Math.min(calculatedTotalPages, currentPage + 1)),
                                            disabled: currentPage >= calculatedTotalPages,
                                            className: "flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "h-3.5 w-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 4954,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4945,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 4930,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden lg:flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 bg-slate-100 rounded-md p-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setFontSize(Math.max(10, fontSize - 1)),
                                                    className: "rounded p-1 hover:bg-slate-200 disabled:opacity-50",
                                                    disabled: fontSize <= 10,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                        className: "h-3 w-3 text-slate-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                        lineNumber: 4966,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4961,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold w-6 text-center",
                                                    children: fontSize
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4968,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setFontSize(Math.min(20, fontSize + 1)),
                                                    className: "rounded p-1 hover:bg-slate-200 disabled:opacity-50",
                                                    disabled: fontSize >= 20,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        className: "h-3 w-3 text-slate-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                        lineNumber: 4976,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4971,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4960,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSortState({
                                                    key: "date",
                                                    dir: "desc"
                                                });
                                                updateSelection(new Set());
                                                resetColumns();
                                                setCurrentPage(1);
                                            },
                                            className: "flex h-7 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50",
                                            title: "Reset view",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4990,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden xl:inline",
                                                    children: "Reset"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 4991,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 4980,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 4959,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 4910,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                editingTxn && editingInitialValues && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$transaction$2d$slide$2d$v2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionSlideV2"], {
                    open: !!editingTxn,
                    onOpenChange: (open)=>{
                        if (!open) setEditingTxn(null);
                    },
                    mode: "single",
                    operationMode: operationMode,
                    editingId: operationMode === "edit" ? editingTxn.id : undefined,
                    initialData: editingInitialValues,
                    accounts: accounts,
                    categories: categories,
                    people: people,
                    shops: shops,
                    onSubmissionStart: ()=>{
                        // IMMEDIATE CLOSE - for performance and feel
                        setEditingTxn(null);
                        // Show processing spinner on the row if we have an ID
                        if (editingTxn?.id) {
                            setUpdatingTxnIds((prev)=>new Set(prev).add(editingTxn.id));
                        }
                    },
                    onSuccess: async (txn)=>{
                        // If we have a txn being updated, show processing effect
                        if (txn?.id) {
                            // Ensure ID is in updating state (in case onSubmissionStart missed it or it's a new ID)
                            setUpdatingTxnIds((prev)=>new Set(prev).add(txn.id));
                            // Optimistic update
                            handleOptimisticUpdate(txn);
                            // Simulate revalidation wait or wait for router refresh
                            setTimeout(()=>{
                                setUpdatingTxnIds((prev)=>{
                                    const next = new Set(prev);
                                    next.delete(txn.id);
                                    return next;
                                });
                                setSuccessTxnIds((prev)=>new Set(prev).add(txn.id));
                                setTimeout(()=>{
                                    setSuccessTxnIds((prev)=>{
                                        const next = new Set(prev);
                                        next.delete(txn.id);
                                        return next;
                                    });
                                }, 2000);
                            }, 1500);
                        } else {
                            // If no specific txn (like bulk), refresh everything
                            router.refresh();
                        }
                    },
                    onSubmissionEnd: ()=>{
                    // Optional: ensure global busy states are cleared
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 4999,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                confirmVoidTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4",
                    onClick: closeVoidDialog,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-sm rounded-lg bg-white p-5 shadow-2xl",
                        onClick: (event)=>event.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-900",
                                children: "Void transaction?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5067,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600",
                                children: [
                                    "This transaction will be marked as",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-rose-600",
                                        children: "VOID"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5072,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    ". It will not be deleted, but it will be hidden from default views and excluded from calculations."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5070,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            (confirmVoidTarget.note?.includes("[C]") || typeof confirmVoidTarget.metadata === "string" && confirmVoidTarget.metadata?.includes("batch_id") || confirmVoidTarget.metadata?.batch_id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "h-4 w-4 text-amber-600 shrink-0 mt-0.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5083,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] font-medium text-amber-800 leading-normal",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "block text-amber-900 mb-0.5 uppercase tracking-wider",
                                                children: "Confirmed Transaction Detected"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5085,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "This transaction is part of a BATCH. Voiding it here will automatically UNCHECK (revert) the corresponding item in the Batch Checklist."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5084,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5082,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            voidError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-red-600",
                                children: voidError
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5095,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100",
                                        onClick: closeVoidDialog,
                                        disabled: isVoiding,
                                        children: "Keep"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5098,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70",
                                        onClick: handleVoidConfirm,
                                        disabled: isVoiding,
                                        children: [
                                            isVoiding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5111,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Void Transaction"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5105,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5097,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 5063,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5059,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)), document.body),
                confirmCancelTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4",
                    onClick: ()=>setConfirmCancelTarget(null),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-sm rounded-lg bg-white p-5 shadow-2xl",
                        onClick: (event)=>event.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-900",
                                children: "Cancel Order (Full Refund)?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5131,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600",
                                children: [
                                    "This will request a full refund of",
                                    " ",
                                    numberFormatter.format(Math.abs(confirmCancelTarget.original_amount ?? confirmCancelTarget.amount ?? 0)),
                                    " ",
                                    "and mark the order as cancelled."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5134,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-amber-600",
                                children: 'Money will stay in "Pending" account until you confirm receipt.'
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5145,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            voidError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 rounded-md bg-red-50 p-3 text-sm text-red-800",
                                children: voidError
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5150,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex-1 rounded-md bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-200",
                                        onClick: ()=>setConfirmCancelTarget(null),
                                        disabled: isVoiding,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5155,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex-1 rounded-md bg-amber-500 px-4 py-1 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50",
                                        onClick: ()=>handleCancelOrderConfirm(false),
                                        disabled: isVoiding,
                                        children: isVoiding ? "Processing..." : "Pending (Wait)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5162,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex-1 rounded-md bg-emerald-600 px-4 py-1 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50",
                                        onClick: ()=>handleCancelOrderConfirm(true),
                                        disabled: isVoiding,
                                        children: isVoiding ? "Processing..." : "Received (Instant)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5169,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5154,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 5127,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5123,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)), document.body),
                confirmDeletingTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4",
                    onClick: ()=>setConfirmDeletingTarget(null),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-sm rounded-lg bg-white p-5 shadow-2xl",
                        onClick: (event)=>event.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-900 text-rose-600",
                                children: "Delete Forever?"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5192,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600",
                                children: [
                                    "This will",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-black text-rose-600 underline",
                                        children: "PERMANENTLY remove"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5197,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    "this data from the database. This action",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold italic",
                                        children: "CANNOT be undone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5201,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    "and will affect your reports."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5195,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            voidError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-red-600",
                                children: voidError
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5205,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100",
                                        onClick: ()=>setConfirmDeletingTarget(null),
                                        disabled: isDeleting,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5208,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70",
                                        onClick: handleSingleDeleteConfirm,
                                        disabled: isDeleting,
                                        children: [
                                            isDeleting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5221,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Delete Permanently"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5215,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5207,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 5188,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5184,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)), document.body),
                refundFormTxn && (()=>{
                    const baseAmount = refundFormStage === "confirm" ? Math.abs(refundFormTxn.amount ?? 0) : Math.abs(refundFormTxn.original_amount ?? refundFormTxn.amount ?? 0);
                    // Source account for refund (where money goes back to)
                    // If request, it's the original source (account_id).
                    // If confirm, we might default to the first available account or just null.
                    // Note: Logic above is approximation.
                    // Better: If request, use refundFormTxn.account_id.
                    // If confirm, refundFormTxn is the request (on Pending Account). We need a target.
                    // The request doesn't explicitly store the "return to" account until confirmed.
                    // But usually we default to the first real account.
                    const defaultAccountId = (refundFormStage === "confirm" ? null : refundFormTxn.account_id) ?? refundAccountOptions[0]?.id ?? null;
                    const initialNote = refundFormStage === "confirm" ? refundFormTxn.note ?? "Confirm refund" : `Refund: ${refundFormTxn.note ?? refundFormTxn.id}`;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4",
                        onClick: ()=>setRefundFormTxn(null),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full max-w-md rounded-lg bg-white p-6 shadow-2xl",
                            onClick: (event)=>event.stopPropagation(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-slate-900",
                                            children: refundFormStage === "confirm" ? "Confirm Refund" : "Request Refund"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5270,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-slate-500 transition hover:text-slate-700",
                                            onClick: ()=>setRefundFormTxn(null),
                                            children: "X"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5275,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 5269,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$transaction$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionForm"], {
                                    accounts: accounts,
                                    categories: categories,
                                    people: people,
                                    shops: shops,
                                    mode: "refund",
                                    defaultSourceAccountId: defaultAccountId ?? undefined,
                                    initialValues: {
                                        amount: baseAmount,
                                        note: initialNote,
                                        shop_id: refundFormTxn.shop_id ?? undefined,
                                        tag: refundFormTxn.tag ?? undefined,
                                        occurred_at: refundFormTxn.occurred_at ? new Date(refundFormTxn.occurred_at) : new Date(),
                                        source_account_id: defaultAccountId ?? undefined,
                                        category_id: refundFormTxn.category_id ?? undefined,
                                        person_id: refundFormTxn.person_id ?? undefined
                                    },
                                    onSuccess: handleRefundFormSuccess
                                }, void 0, false, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 5282,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 5265,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 5261,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)), document.body);
                })(),
                bulkDialog?.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4",
                    onClick: ()=>setBulkDialog(null),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-sm rounded-lg bg-white p-5 shadow-2xl",
                        onClick: (event)=>event.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-900",
                                children: bulkDialog.mode === "void" ? "Bulk Void" : bulkDialog.mode === "restore" ? "Bulk Restore" : "Permanent Delete"
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5318,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600",
                                children: bulkDialog.mode === "void" ? `Are you sure you want to void ${selection.size} transactions?` : bulkDialog.mode === "restore" ? `Are you sure you want to restore ${selection.size} transactions?` : `Are you sure you want to PERMANENTLY DELETE ${selection.size} transactions? This cannot be undone.`
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5325,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex justify-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-100",
                                        onClick: ()=>{
                                            if (isVoiding || isRestoring || isDeleting) {
                                                stopBulk.current = true;
                                            } else {
                                                setBulkDialog(null);
                                            }
                                        },
                                        children: isVoiding || isRestoring || isDeleting ? "Stop" : "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5333,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-70 ${bulkDialog.mode === "restore" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`,
                                        onClick: ()=>executeBulk(bulkDialog.mode),
                                        disabled: isVoiding || isRestoring || isDeleting,
                                        children: [
                                            (isVoiding || isRestoring || isDeleting) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5357,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            bulkDialog.mode === "void" ? "Void" : bulkDialog.mode === "restore" ? "Restore" : "Delete Forever"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5347,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5332,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                        lineNumber: 5314,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5310,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)), document.body),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$transaction$2d$history$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionHistoryModal"], {
                    transactionId: historyTarget?.id ?? "",
                    transactionNote: historyTarget?.note,
                    isOpen: !!historyTarget,
                    onClose: ()=>setHistoryTarget(null)
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5371,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                confirmRefundTxn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$confirm$2d$refund$2d$dialog$2d$v2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmRefundDialogV2"], {
                    open: !!confirmRefundTxn,
                    onOpenChange: (open)=>{
                        if (!open) setConfirmRefundTxn(null);
                    },
                    transaction: confirmRefundTxn,
                    accounts: accounts
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5378,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$excel$2d$status$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExcelStatusBar"], {
                    totalIn: selectedStats.totalIn,
                    totalOut: selectedStats.totalOut,
                    average: selectedStats.average,
                    count: selectedStats.count,
                    isVisible: !!isExcelMode && selectedCells.size > 0
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5387,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                refundTarget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$request$2d$refund$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestRefundDialog"], {
                    open: isRefundOpen,
                    onOpenChange: setIsRefundOpen,
                    transaction: refundTarget,
                    type: refundType
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5397,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                !isExcelMode && selection.size > 0 && typeof document !== "undefined" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none",
                    children: [
                        showTotals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 sm:grid-cols-6 gap-4",
                                children: [
                                    {
                                        label: "BASE",
                                        value: tableTotals.base,
                                        color: "text-slate-200"
                                    },
                                    {
                                        label: "NET",
                                        value: tableTotals.net,
                                        color: "text-blue-400"
                                    },
                                    {
                                        label: "BACK",
                                        value: tableTotals.back,
                                        color: "text-emerald-400"
                                    },
                                    {
                                        label: "EST. CASHBACK",
                                        value: tableTotals.estCb,
                                        color: "text-emerald-500"
                                    },
                                    {
                                        label: "C. SHARED",
                                        value: tableTotals.shared,
                                        color: "text-amber-400"
                                    },
                                    {
                                        label: "PROFIT",
                                        value: tableTotals.profit,
                                        color: tableTotals.profit >= 0 ? "text-emerald-400" : "text-rose-400"
                                    }
                                ].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5 min-w-[80px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black text-slate-500 tracking-tighter uppercase",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5454,
                                                columnNumber: 27
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-black tabular-nums tracking-tighter", item.color),
                                                children: numberFormatter.format(item.value)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5457,
                                                columnNumber: 27
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                        lineNumber: 5450,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                lineNumber: 5414,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 5413,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 rounded-2xl bg-slate-900/95 border border-slate-800 p-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-300 pointer-events-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 border-r border-slate-700 mr-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white",
                                            children: selection.size
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5474,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-black text-slate-400 uppercase tracking-tighter",
                                            children: "Selected"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5477,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 5473,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        currentTab === "void" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBulkRestore,
                                            disabled: isRestoring,
                                            className: "flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-500 transition-all disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5489,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "RESTORE"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5484,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBulkVoid,
                                            disabled: isVoiding,
                                            className: "flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-black text-white hover:bg-amber-500 transition-all disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5498,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "VOID"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5493,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBulkDelete,
                                            disabled: isDeleting,
                                            className: "flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-black text-white hover:bg-rose-500 transition-all disabled:opacity-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5508,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "DELETE"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5503,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-8 w-px bg-slate-700 mx-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5512,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer select-none", showSelectedOnly ? "bg-blue-600/20 border-blue-500 text-blue-400" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800"),
                                            onClick: ()=>setShowSelectedOnly(!showSelectedOnly),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all", showSelectedOnly ? "bg-blue-500 border-blue-400" : "border-slate-500"),
                                                    children: showSelectedOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "h-2.5 w-2.5 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                        lineNumber: 5532,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5523,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black uppercase tracking-tight",
                                                    children: "Show Selected"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5535,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5514,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer select-none", showTotals ? "bg-emerald-600/20 border-emerald-500 text-emerald-400" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800"),
                                            onClick: ()=>setShowTotals(!showTotals),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sigma$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sigma$3e$__["Sigma"], {
                                                    className: "h-3.5 w-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5549,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black uppercase tracking-tight",
                                                    children: "Totals"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                    lineNumber: 5550,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5540,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateSelection(new Set()),
                                            className: "ml-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 transition-colors",
                                            title: "Clear Selection",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                                lineNumber: 5560,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                            lineNumber: 5555,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                                    lineNumber: 5482,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                            lineNumber: 5472,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5410,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)), document.body),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$column$2d$customizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColumnCustomizer"], {
                    open: isColumnCustomizerOpen,
                    onOpenChange: setIsColumnCustomizerOpen,
                    columns: customColumnOrder.map((key)=>{
                        const def = defaultColumns.find((c)=>c.key === key);
                        if (!def) return null;
                        return {
                            id: key,
                            label: def.label || (key === "actions" ? "Action" : key),
                            frozen: key === "date" || key === "actions"
                        };
                    }).filter(Boolean),
                    visibleColumns: visibleColumns,
                    onVisibilityChange: (key, visible)=>{
                        setVisibleColumns((prev)=>({
                                ...prev,
                                [key]: visible
                            }));
                    },
                    onOrderChange: (newOrder)=>{
                        // Enforce Date always first and Actions always last
                        const content = newOrder.filter((k)=>k !== "date" && k !== "actions");
                        setCustomColumnOrder([
                            "date",
                            ...content,
                            "actions"
                        ]);
                    },
                    onReset: ()=>{
                        // 1. Reset Order
                        setCustomColumnOrder(defaultColumns.map((c)=>c.key));
                        localStorage.removeItem("mf_v3_col_order");
                        // 2. Reset Visibility
                        const defaultVis = {
                            date: true,
                            shop: true,
                            note: false,
                            category: false,
                            tag: false,
                            account: true,
                            amount: true,
                            total_back: false,
                            final_price: true,
                            id: false,
                            actions: true,
                            actual_cashback: false,
                            est_share: false,
                            net_profit: false,
                            back_info: false,
                            people: true,
                            cycle: false
                        };
                        setVisibleColumns(defaultVis);
                        localStorage.removeItem("mf_v3_col_vis");
                        // 3. Reset Widths
                        const map = {};
                        defaultColumns.forEach((col)=>{
                            map[col.key] = col.defaultWidth;
                        });
                        setColumnWidths(map);
                        localStorage.removeItem("mf_v3_col_width");
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Column settings reset to default");
                    },
                    widths: columnWidths,
                    onWidthChange: (key, width)=>{
                        setColumnWidths((prev)=>({
                                ...prev,
                                [key]: width
                            }));
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
                    lineNumber: 5569,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
            lineNumber: 2134,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/moneyflow/unified-transaction-table.tsx",
        lineNumber: 2133,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "skubosQOExzGs7Dyp6Zf3rca/0Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
})), "skubosQOExzGs7Dyp6Zf3rca/0Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = UnifiedTransactionTable;
var _c, _c1;
__turbopack_context__.k.register(_c, "UnifiedTransactionTable$React.forwardRef");
__turbopack_context__.k.register(_c1, "UnifiedTransactionTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_moneyflow_ddfef970._.js.map