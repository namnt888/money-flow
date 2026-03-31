(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountDetailHeaderV2",
    ()=>AccountDetailHeaderV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7._577207839b545f50e0fdb06bbee3ea77/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/calculator.js [app-client] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/users-round.js [app-client] (ecmascript) <export default as Users2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.554.0_react@19.2.4/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/account-balance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$accounts$2f$v2$2f$AccountSlideV2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/accounts/v2/AccountSlideV2.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$828c6c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:828c6c [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$isToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isToday.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$isTomorrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isTomorrow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInDays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycle-utils.ts [app-client] (ecmascript)");
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
const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
});
const formatVNShort = (amount)=>{
    const absAmount = Math.abs(amount);
    if (absAmount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} B`;
    if (absAmount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} M`;
    if (absAmount >= 1_000) return `${(amount / 1_000).toFixed(0)} k`;
    return amount.toString();
};
function AccountDetailHeaderV2({ account, allAccounts, categories, cashbackStats, isCashbackLoading, initialTransactions, selectedYear, availableYears, onYearChange, selectedCycle, summary, isLoadingPending }) {
    _s();
    const [isPending, startTransition] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useTransition();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isSlideOpen, setIsSlideOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [dynamicCashbackStats, setDynamicCashbackStats] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(cashbackStats);
    // Use passed loading prop or fall back to false
    const effectiveIsCashbackLoading = isCashbackLoading ?? false;
    const [isSyncing, setIsSyncing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isAccountIdCopied, setIsAccountIdCopied] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    // Sync selected year with URL
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AccountDetailHeaderV2.useEffect": ()=>{
            const urlYear = searchParams.get("year");
            if (urlYear && urlYear !== selectedYear) {
                onYearChange(urlYear);
            }
        }
    }["AccountDetailHeaderV2.useEffect"], [
        searchParams,
        selectedYear,
        onYearChange
    ]);
    const handleYearChange = (year)=>{
        startTransition(()=>{
            onYearChange(year);
            const params = new URLSearchParams(searchParams.toString());
            if (year) params.set("year", year);
            else params.delete("year");
            router.push(`?${params.toString()}`, {
                scroll: false
            });
            router.refresh();
        });
    };
    const isCreditCard = account.type === "credit_card";
    const currentYear = new Date().getFullYear().toString();
    const isHistoricalYear = !!selectedYear && selectedYear !== currentYear;
    const availableBalance = isCreditCard ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$account$2d$balance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCreditCardAvailableBalance"])(account) : account.current_balance ?? 0;
    const outstandingBalance = isCreditCard ? Math.abs(account.current_balance ?? 0) : 0;
    // Family Balance Calculation
    const isParent = account.relationships?.is_parent;
    const parentId = account.parent_account_id;
    const accountFamilyId = isParent ? account.id : parentId;
    const familyChildren = accountFamilyId ? allAccounts.filter((a)=>a.parent_account_id === accountFamilyId && a.id !== account.id) : [];
    const childrenBalancesSum = familyChildren.reduce((sum, child)=>sum + (child.current_balance || 0), 0);
    const mainAccountBalance = isParent ? account.current_balance || 0 : allAccounts.find((a)=>a.id === parentId)?.current_balance || 0;
    const familyDebtAbs = Math.abs(mainAccountBalance + childrenBalancesSum);
    const soloDebtAbs = Math.abs(account.current_balance || 0);
    // Cleanup 'tab' param if present (fix for persistent url)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AccountDetailHeaderV2.useEffect": ()=>{
            if (searchParams.has("tab")) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("tab");
                router.replace(`?${params.toString()}`, {
                    scroll: false
                });
            }
        }
    }["AccountDetailHeaderV2.useEffect"], [
        searchParams,
        router
    ]);
    // Sync dynamic stats when props update (e.g. after router.refresh())
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AccountDetailHeaderV2.useEffect": ()=>{
            setDynamicCashbackStats(cashbackStats);
        }
    }["AccountDetailHeaderV2.useEffect"], [
        cashbackStats
    ]);
    const handleCopyAccountId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "AccountDetailHeaderV2.useCallback[handleCopyAccountId]": async ()=>{
            try {
                await navigator.clipboard.writeText(account.id);
                setIsAccountIdCopied(true);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Copied account ID");
                setTimeout({
                    "AccountDetailHeaderV2.useCallback[handleCopyAccountId]": ()=>setIsAccountIdCopied(false)
                }["AccountDetailHeaderV2.useCallback[handleCopyAccountId]"], 1500);
            } catch (error) {
                console.error("Failed to copy account ID:", error);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to copy account ID");
            }
        }
    }["AccountDetailHeaderV2.useCallback[handleCopyAccountId]"], [
        account.id
    ]);
    const selectedCycleMetrics = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AccountDetailHeaderV2.useMemo[selectedCycleMetrics]": ()=>{
            if (!selectedCycle || selectedCycle === "all" || !Array.isArray(initialTransactions)) {
                return null;
            }
            const categoryMap = new Map(categories.map({
                "AccountDetailHeaderV2.useMemo[selectedCycleMetrics]": (c)=>[
                        c.id,
                        c
                    ]
            }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics]"]));
            const cycleTransactions = initialTransactions.filter({
                "AccountDetailHeaderV2.useMemo[selectedCycleMetrics].cycleTransactions": (tx)=>{
                    if (!tx || tx.status === "void") return false;
                    const txCycle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTransactionCycleTag"])(tx, account);
                    return txCycle === selectedCycle;
                }
            }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics].cycleTransactions"]);
            const cycleSpendRows = cycleTransactions.filter({
                "AccountDetailHeaderV2.useMemo[selectedCycleMetrics].cycleSpendRows": (tx)=>[
                        "expense",
                        "debt",
                        "service"
                    ].includes(tx.type)
            }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics].cycleSpendRows"]);
            // Calculate earned (est) from cashback_entries
            const est = cycleSpendRows.reduce({
                "AccountDetailHeaderV2.useMemo[selectedCycleMetrics].est": (sum, tx)=>{
                    const entries = Array.isArray(tx.cashback_entries) ? tx.cashback_entries : [];
                    const entryAmount = entries.reduce({
                        "AccountDetailHeaderV2.useMemo[selectedCycleMetrics].est.entryAmount": (s, e)=>{
                            // Sum all virtual or real entries
                            if (e.mode === "virtual" || e.mode === "real") {
                                return s + Math.abs(Number(e.amount || 0));
                            }
                            return s;
                        }
                    }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics].est.entryAmount"], 0);
                    return sum + entryAmount;
                }
            }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics].est"], 0);
            // Calculate shared from share fields
            const shared = cycleSpendRows.reduce({
                "AccountDetailHeaderV2.useMemo[selectedCycleMetrics].shared": (sum, tx)=>{
                    const sharedFixed = Number(tx.cashback_share_fixed || 0);
                    const rawSharePercent = Number(tx.cashback_share_percent || 0);
                    const sharePercent = rawSharePercent > 1 ? rawSharePercent / 100 : rawSharePercent;
                    const txAmount = Math.abs(Number(tx.amount || 0));
                    const computedShared = txAmount * sharePercent + sharedFixed;
                    const rawShareAmount = Number(tx.cashback_share_amount ?? 0);
                    const sharedAmount = rawShareAmount > 0 ? rawShareAmount : computedShared;
                    return sum + (isNaN(sharedAmount) ? 0 : sharedAmount);
                }
            }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics].shared"], 0);
            const actual = cycleTransactions.reduce({
                "AccountDetailHeaderV2.useMemo[selectedCycleMetrics].actual": (sum, tx)=>{
                    if (tx.type !== "income") return sum;
                    const category = tx.category_id ? categoryMap.get(tx.category_id) : null;
                    const categoryName = category?.name?.toLowerCase() || "";
                    if (categoryName.includes("cashback") || categoryName.includes("hoàn tiền")) {
                        return sum + Math.abs(Number(tx.amount || 0));
                    }
                    return sum;
                }
            }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics].actual"], 0);
            return {
                est,
                shared,
                profit: est - shared,
                actual
            };
        }
    }["AccountDetailHeaderV2.useMemo[selectedCycleMetrics]"], [
        selectedCycle,
        initialTransactions,
        categories
    ]);
    const [isEditPopoverOpen, setIsEditPopoverOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [editValues, setEditValues] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState({
        account_number: account.account_number || "",
        receiver_name: account.receiver_name || ""
    });
    const handleSaveInfo = async ()=>{
        try {
            const hasChanges = editValues.account_number !== (account.account_number || "") || editValues.receiver_name !== (account.receiver_name || "");
            if (!hasChanges) {
                setIsEditPopoverOpen(false);
                return;
            }
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$828c6c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateAccountInfo"])(account.id, {
                account_number: editValues.account_number || undefined,
                receiver_name: editValues.receiver_name || undefined
            });
            if (result.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Account info updated");
                setIsEditPopoverOpen(false);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update");
            }
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Something went wrong");
        }
    };
    // Helper Component for Sections
    // Helper Component for Sections
    const HeaderSection = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(({ label, children, className, borderColor = "border-slate-200", badge, hint, hideHintInHeader, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative border rounded-xl px-4 py-1.5 flex flex-col group/header", borderColor, className),
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-2 left-3 flex items-center gap-2 z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-white px-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, this),
                        hint && !hideHintInHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[7px] text-slate-300 font-black uppercase tracking-widest opacity-0 group-hover/header:opacity-100 transition-all transform translate-x-2 group-hover/header:translate-x-0 duration-300",
                            children: [
                                "• ",
                                hint
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 369,
                            columnNumber: 13
                        }, this),
                        badge
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
            lineNumber: 355,
            columnNumber: 7
        }, this));
    HeaderSection.displayName = "HeaderSection";
    const dueDateBadge = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AccountDetailHeaderV2.useMemo[dueDateBadge]": ()=>{
            const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(new Date());
            let label = "";
            let dateLabel = "";
            let isUrgent = false;
            if (account.stats?.due_date) {
                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(new Date(account.stats.due_date));
                dateLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(d, "MMM d").toUpperCase();
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$isToday$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToday"])(d)) {
                    label = "Today Due";
                    isUrgent = true;
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$isTomorrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTomorrow"])(d)) {
                    label = "Tomorrow";
                    isUrgent = true;
                } else {
                    const daysLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInDays"])(d, now);
                    if (daysLeft < 0) {
                        label = `${Math.abs(daysLeft)} Overdue`;
                        isUrgent = true;
                    } else {
                        label = `${daysLeft} Days`.toUpperCase();
                    }
                }
            } else {
                const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(account.cashback_config, account);
                const rawDueDay = account.due_date || account.credit_card_info?.payment_due_day || config?.dueDate;
                if (rawDueDay) {
                    const d = new Date();
                    d.setDate(rawDueDay);
                    if (d < now) d.setMonth(d.getMonth() + 1);
                    dateLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(d, "MMM d").toUpperCase();
                    const daysLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$differenceInDays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["differenceInDays"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"])(d), now);
                    if (daysLeft === 0) {
                        label = "Today Due";
                        isUrgent = true;
                    } else if (daysLeft === 1) {
                        label = "Tomorrow";
                        isUrgent = true;
                    } else {
                        label = `${daysLeft} Days`.toUpperCase();
                    }
                }
            }
            if (!label) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-black text-slate-400 uppercase tracking-tighter opacity-50",
                    children: "No Due Date"
                }, void 0, false, {
                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                    lineNumber: 434,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, this);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center h-full gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none",
                        children: "Due Term"
                    }, void 0, false, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-black tracking-tight shadow-sm whitespace-nowrap", isUrgent ? "bg-rose-50 border-rose-200 text-rose-600 animate-pulse shadow-[0_0_10px_rgba(225,29,72,0.1)]" : "bg-emerald-50 border-emerald-200 text-emerald-700"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: "h-3 w-3 opacity-70"
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 454,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "opacity-30",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: "h-3 w-3 opacity-70"
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: dateLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 445,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                lineNumber: 441,
                columnNumber: 7
            }, this);
        }
    }["AccountDetailHeaderV2.useMemo[dueDateBadge]"], [
        account,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$startOfDay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfDay"]
    ]);
    const rewardsCount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AccountDetailHeaderV2.useMemo[rewardsCount]": ()=>{
            try {
                const program = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(account.cashback_config, account);
                const counts = (program.levels || []).reduce({
                    "AccountDetailHeaderV2.useMemo[rewardsCount].counts": (acc, lvl)=>acc + (lvl.rules?.length || 0)
                }["AccountDetailHeaderV2.useMemo[rewardsCount].counts"], 0);
                if (counts > 0) return counts;
                if (program.defaultRate > 0) return 1;
                return 0;
            } catch (e) {
                return 0;
            }
        }
    }["AccountDetailHeaderV2.useMemo[rewardsCount]"], [
        account.cashback_config
    ]);
    const cycleMetricSnapshot = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AccountDetailHeaderV2.useMemo[cycleMetricSnapshot]": ()=>{
            const activeRuleEarned = (dynamicCashbackStats?.activeRules || []).reduce({
                "AccountDetailHeaderV2.useMemo[cycleMetricSnapshot].activeRuleEarned": (sum, rule)=>sum + Number(rule?.earned || 0)
            }["AccountDetailHeaderV2.useMemo[cycleMetricSnapshot].activeRuleEarned"], 0);
            const derivedEst = selectedCycleMetrics?.est ?? 0;
            const derivedShared = selectedCycleMetrics?.shared ?? 0;
            const derivedProfit = selectedCycleMetrics?.profit ?? derivedEst - derivedShared;
            const snapshotEst = Number(dynamicCashbackStats?.earnedSoFar || 0);
            const snapshotShared = Number(dynamicCashbackStats?.sharedAmount || 0);
            const rawEst = selectedCycleMetrics ? derivedEst : snapshotEst;
            const estCashback = rawEst > 0 ? rawEst : activeRuleEarned;
            const sharedAmount = selectedCycleMetrics ? derivedShared : snapshotShared;
            const totalProfit = estCashback - sharedAmount;
            return {
                estCashback,
                sharedAmount,
                totalProfit,
                actualClaimed: Number(dynamicCashbackStats?.actualClaimed ?? selectedCycleMetrics?.actual ?? 0),
                currentSpend: Number(dynamicCashbackStats?.currentSpend || 0),
                source: selectedCycleMetrics ? "cycle_transactions" : "snapshot",
                activeRuleEarned
            };
        }
    }["AccountDetailHeaderV2.useMemo[cycleMetricSnapshot]"], [
        dynamicCashbackStats,
        selectedCycleMetrics
    ]);
    const annualPerformanceReport = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "AccountDetailHeaderV2.useMemo[annualPerformanceReport]": ()=>{
            if (!summary) return {
                profit: 0,
                actual: 0,
                est: 0,
                shared: 0,
                totalNetBenefit: 0
            };
            return {
                profit: summary.netProfitYearly || 0,
                actual: summary.cashbackTotal || 0,
                est: summary.cardYearlyCashbackTotal || 0,
                shared: summary.cardYearlyCashbackGivenTotal || 0,
                totalNetBenefit: summary.netProfitYearly || 0
            };
        }
    }["AccountDetailHeaderV2.useMemo[annualPerformanceReport]"], [
        summary
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-b border-slate-200 px-6 py-2.5 flex gap-4 items-stretch sticky top-0 z-60 shadow-sm transition-all duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$accounts$2f$v2$2f$AccountSlideV2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountSlideV2"], {
                open: isSlideOpen,
                onOpenChange: setIsSlideOpen,
                account: account,
                allAccounts: allAccounts,
                categories: categories,
                existingAccountNumbers: Array.from(new Set(allAccounts.map((a)=>a.account_number).filter(Boolean))),
                existingReceiverNames: Array.from(new Set(allAccounts.map((a)=>a.receiver_name).filter(Boolean)))
            }, void 0, false, {
                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                lineNumber: 519,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSection, {
                label: "Account",
                className: "flex-[3] min-w-[300px] max-w-[340px] flex flex-col gap-0 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 flex-1 h-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shrink-0 h-10 flex items-center pr-1 border-r border-slate-50",
                                children: account.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: account.image_url,
                                    alt: "",
                                    className: "h-10 w-auto max-w-[70px] object-contain rounded-none shadow-sm border border-slate-100"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 flex items-center justify-center border border-slate-200 bg-slate-50 rounded-none shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl font-black text-slate-400 capitalize",
                                        children: account.name.charAt(0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 537,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 536,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 532,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col min-w-0 flex-1 pt-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-[13px] font-black text-slate-900 leading-tight truncate uppercase tracking-tight",
                                                title: account.name,
                                                children: account.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 543,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    handleCopyAccountId();
                                                                },
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-slate-300 hover:text-emerald-600 transition-colors ml-0.5", isAccountIdCopied && "text-emerald-500"),
                                                                "aria-label": "Copy account ID",
                                                                children: isAccountIdCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 548,
                                                                    columnNumber: 44
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 548,
                                                                    columnNumber: 76
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 547,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                            children: "Copy account ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 544,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                                open: isEditPopoverOpen,
                                                onOpenChange: setIsEditPopoverOpen,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "text-slate-300 hover:text-indigo-500 transition-colors transform hover:scale-110",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 120
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                        className: "w-[300px] z-[100] shadow-[0_20px_50px_rgba(79,70,229,0.15)] border-indigo-100 rounded-2xl",
                                                        align: "start",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4 p-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 border-b border-slate-50 pb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                                            className: "h-3.5 w-3.5 text-indigo-500"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 560,
                                                                            columnNumber: 92
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "text-[11px] font-black uppercase text-slate-700 tracking-widest",
                                                                            children: "Update Identification"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 560,
                                                                            columnNumber: 140
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 560,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] text-slate-400 font-black uppercase tracking-wider ml-1",
                                                                                    children: "Account Number"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 563,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                    value: editValues.account_number,
                                                                                    onChange: (e)=>setEditValues((p)=>({
                                                                                                ...p,
                                                                                                account_number: e.target.value
                                                                                            })),
                                                                                    placeholder: "Enter number...",
                                                                                    className: "h-9 text-xs font-medium bg-slate-50/50 border-slate-100 focus:bg-white transition-all shadow-sm rounded-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 564,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 562,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] text-slate-400 font-black uppercase tracking-wider ml-1",
                                                                                    children: "Receiver Name"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 567,
                                                                                    columnNumber: 25
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                    value: editValues.receiver_name,
                                                                                    onChange: (e)=>setEditValues((p)=>({
                                                                                                ...p,
                                                                                                receiver_name: e.target.value
                                                                                            })),
                                                                                    placeholder: "Enter name...",
                                                                                    className: "h-9 text-xs font-medium bg-slate-50/50 border-slate-100 focus:bg-white transition-all shadow-sm rounded-lg"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 568,
                                                                                    columnNumber: 25
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 566,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleSaveInfo,
                                                                    className: "w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-widest rounded-xl mt-2 shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98]",
                                                                    children: "Update Details"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 571,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 559,
                                                            columnNumber: 20
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 554,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 542,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mt-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-black text-slate-600 tracking-widest tabular-nums bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100",
                                                children: account.account_number || "•••• •••• ••••"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 577,
                                                columnNumber: 15
                                            }, this),
                                            account.receiver_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px] opacity-80",
                                                children: account.receiver_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 578,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 576,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 531,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 h-12 w-full border-t border-slate-50 mt-1 pt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 flex-1 scrollbar-hide overflow-x-auto py-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSlideOpen(true),
                                    className: "flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all text-[9.5px] font-black uppercase tracking-[0.1em] shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 586,
                                            columnNumber: 313
                                        }, this),
                                        "CONFIG"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 586,
                                    columnNumber: 13
                                }, this),
                                summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        window.dispatchEvent(new CustomEvent("open-pending-items-modal", {
                                            detail: {
                                                accountId: account.id
                                            }
                                        }));
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[9.5px] font-black uppercase tracking-[0.1em] transition-all shadow-sm", (summary.pendingCount || 0) > 0 ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100 animate-pulse" : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100"),
                                    children: (summary.pendingCount || 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative flex h-1.5 w-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 65
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 174
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 593,
                                                columnNumber: 21
                                            }, this),
                                            summary.pendingCount,
                                            " WAIT"
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 594,
                                                columnNumber: 23
                                            }, this),
                                            "NO WAIT"
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 588,
                                    columnNumber: 15
                                }, this),
                                isCreditCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: async ()=>{
                                        try {
                                            setIsSyncing(true);
                                            const { syncAccountCashbackAction } = await __turbopack_context__.A("[project]/src/actions/account-actions.ts [app-client] (ecmascript, async loader)");
                                            const result = await syncAccountCashbackAction(account.id);
                                            if (result && result.success) {
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Sync OK");
                                                router.refresh();
                                            }
                                        } catch  {
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Sync error");
                                        } finally{
                                            setIsSyncing(false);
                                        }
                                    },
                                    disabled: isSyncing,
                                    className: "flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all text-[9.5px] font-black uppercase tracking-[0.1em] shadow-sm disabled:opacity-50",
                                    children: [
                                        isSyncing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-3 h-3 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 605,
                                            columnNumber: 30
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 605,
                                            columnNumber: 77
                                        }, this),
                                        "SYNC"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 585,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 h-10 w-full border-t border-slate-50 pt-1",
                        children: rewardsCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF9E6] border border-[#FFE082] rounded-lg cursor-help hover:bg-[#FFF3C8] transition-all group shrink-0 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "h-4 w-4 text-[#F59E0B] fill-[#F59E0B] group-hover:scale-110 transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 617,
                                                columnNumber: 19
                                            }, this),
                                            (()=>{
                                                const rules = dynamicCashbackStats?.activeRules || [];
                                                const program = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(account.cashback_config, account);
                                                const displayRules = rules.length > 0 ? rules : (program.levels?.[0]?.rules || []).map((r)=>({
                                                        name: r.description || "Rules",
                                                        rate: r.rate
                                                    }));
                                                const topRule = displayRules[0];
                                                const remaining = rewardsCount - 1;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-black text-[#92400E] uppercase tracking-wider",
                                                            children: topRule?.name || "REWARDS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 23
                                                        }, this),
                                                        remaining > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-bold text-[#D97706] uppercase ml-1 opacity-60",
                                                            children: [
                                                                "+",
                                                                remaining,
                                                                " MORE"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true);
                                            })()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 616,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 615,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                    className: "p-0 border-none shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden w-[380px] z-[120]",
                                    align: "start",
                                    sideOffset: 12,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-4 flex justify-between items-center text-white border-b-2 border-orange-700/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-black text-white/60 uppercase tracking-[0.2em] leading-none mb-1",
                                                            children: "PROGRAM STATUS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 50
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                    className: "h-4 w-4 fill-white/30"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 633,
                                                                    columnNumber: 212
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[14px] font-black uppercase tracking-[0.1em]",
                                                                    children: "Active Rewards"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 633,
                                                                    columnNumber: 253
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 171
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 633,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase border border-white/20 backdrop-blur-sm",
                                                    children: [
                                                        rewardsCount,
                                                        " Rules Enabled"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 632,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-[#F8F9FB] p-5 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar shadow-inner",
                                            children: [
                                                (()=>{
                                                    const rules = dynamicCashbackStats?.activeRules || [];
                                                    const program = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(account.cashback_config, account);
                                                    const displayRules = rules.length > 0 ? rules : (program.levels || []).flatMap((l)=>l.rules || []).map((r)=>({
                                                            name: r.description || "Rules",
                                                            rate: r.rate,
                                                            max: r.maxReward
                                                        }));
                                                    return displayRules.map((rule, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow space-y-3 relative overflow-hidden group/rule",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute top-0 right-0 w-1.5 h-full bg-orange-500 opacity-0 group-hover/rule:opacity-100 transition-opacity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 643,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-col gap-0.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]",
                                                                                    children: "Rule Priority"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 645,
                                                                                    columnNumber: 66
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-[12px] font-black text-slate-800 uppercase tracking-tight",
                                                                                    children: rule.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 645,
                                                                                    columnNumber: 170
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 645,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[18px] font-black text-emerald-600 tabular-nums bg-emerald-50 px-2 rounded-lg",
                                                                            children: [
                                                                                rule.rate,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 646,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 644,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-1 flex-col gap-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between text-[9px] font-bold uppercase text-slate-400",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: "Progress"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 650,
                                                                                        columnNumber: 114
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: "Limit Cap"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 650,
                                                                                        columnNumber: 135
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 650,
                                                                                columnNumber: 30
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "h-full bg-orange-500",
                                                                                    style: {
                                                                                        width: rule.max ? '40%' : '100%'
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 651,
                                                                                    columnNumber: 115
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 651,
                                                                                columnNumber: 30
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 28
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 25
                                                                }, this),
                                                                rule.max && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2 text-indigo-600/70 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit border border-indigo-100/50",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                            className: "h-3.5 w-3.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 654,
                                                                            columnNumber: 177
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-black uppercase tracking-wider",
                                                                            children: [
                                                                                "CAP REACHED AT: ",
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(rule.max)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                            lineNumber: 654,
                                                                            columnNumber: 209
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 654,
                                                                    columnNumber: 47
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 23
                                                        }, this));
                                                })(),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center py-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] italic border-t border-slate-200/50 mt-2",
                                                    children: "Detailed MCC matching required to qualify"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 636,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 631,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 614,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 612,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                lineNumber: 530,
                columnNumber: 7
            }, this),
            isCreditCard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                    delayDuration: 300,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSection, {
                                label: "Credit Health",
                                borderColor: "border-indigo-100",
                                className: "flex-[5] min-w-[400px] bg-indigo-50/10 cursor-help flex flex-col gap-0 py-2 border-dashed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-4 items-start flex-1 pt-1.5 px-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1.5 border-r border-indigo-100/50 pr-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]",
                                                        children: "AVAILABLE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 674,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[17px] font-black tracking-tight leading-none tabular-nums drop-shadow-sm", availableBalance >= 0 ? "text-emerald-600" : "text-rose-600"),
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(availableBalance))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 675,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 673,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1.5 border-r border-indigo-100/50 pr-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]",
                                                        children: "LIMIT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 678,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[17px] font-black tracking-tight leading-none tabular-nums text-slate-900 drop-shadow-sm",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(account.credit_limit || 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 677,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center pt-1 animate-in fade-in zoom-in duration-700",
                                                children: dueDateBadge
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 681,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-end pt-1 gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-0.5",
                                                        children: "HEALTH"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] font-black text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 684,
                                                                columnNumber: 216
                                                            }, this),
                                                            "STABLE"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 682,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 672,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between h-12 border-t border-slate-100/40 mt-1.5 pt-1.5 px-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-1.5 h-1.5 rounded-sm bg-indigo-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 689,
                                                        columnNumber: 60
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-black text-indigo-400/80 uppercase tracking-[0.15em]",
                                                        children: [
                                                            selectedYear || currentYear,
                                                            " SPENDING PACE"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 689,
                                                        columnNumber: 116
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 689,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[14px] font-black text-slate-700 tabular-nums bg-slate-50 px-3 py-0.5 rounded-lg border border-slate-100 shadow-sm",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(summary?.yearPureExpenseTotal || 0)),
                                                        " / ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(account.credit_limit || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 690,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 688,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-10 w-full border-t border-slate-100/40 pt-1.5 px-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-full h-[36px] bg-slate-200/50 rounded-full overflow-hidden border border-slate-200/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] p-0.5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full transition-all duration-1200 rounded-full flex items-center justify-center min-w-[5rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative group", account.credit_limit && outstandingBalance / account.credit_limit > 0.8 ? "bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400" : "bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-400"),
                                                style: {
                                                    width: `${Math.max(account.credit_limit ? outstandingBalance / account.credit_limit * 100 : 0, 8)}%`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:25px_25px] animate-[shimmer_2s_infinite_linear]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 701,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[12px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md z-10 transition-transform group-hover:scale-105",
                                                        children: [
                                                            (account.credit_limit ? outstandingBalance / account.credit_limit * 100 : 0).toFixed(1),
                                                            "% RATIO"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 702,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 697,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 696,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 695,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 671,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 670,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                            side: "bottom",
                            className: "w-[380px] p-0 border-none shadow-[0_30px_70px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden bg-white z-[110]",
                            sideOffset: 10,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-indigo-950 px-5 py-3 flex justify-between items-center text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1",
                                                children: "HEALTH ANALYTICS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 710,
                                                columnNumber: 50
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-black text-[13px] uppercase tracking-[0.1em] text-indigo-100 flex items-center gap-2",
                                                children: [
                                                    "Credit Utilization Index ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                        className: "h-4 w-4 text-emerald-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 710,
                                                        columnNumber: 304
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 710,
                                                columnNumber: 173
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 710,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 709,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 group hover:bg-indigo-100/50 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5",
                                                            children: "Annual Spend"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 715,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-black text-indigo-900 tabular-nums",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(summary?.yearPureExpenseTotal || 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 716,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 group hover:bg-emerald-100/50 transition-colors text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5",
                                                            children: "Efficiency Score"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 719,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xl font-black text-emerald-700 tabular-nums",
                                                            children: "9.4/10"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 720,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 718,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 713,
                                            columnNumber: 19
                                        }, this),
                                        !!account.annual_fee_waiver_target && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4 shadow-inner",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-full bg-gradient-to-r from-indigo-600 to-sky-400 shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-1000",
                                                        style: {
                                                            width: `${Math.min(100, (summary?.yearPureExpenseTotal || 0) / (account.annual_fee_waiver_target || 1) * 100)}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 107
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 24
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-semibold text-slate-400 text-center uppercase tracking-widest pt-1 border-t border-slate-200/50",
                                                    children: "Keep spending to waive annual fee"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 24
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 724,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 712,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 708,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                    lineNumber: 669,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                lineNumber: 668,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSection, {
                        label: "Cash Flow",
                        borderColor: "border-sky-100",
                        className: "flex-1 min-w-[260px] bg-sky-50/10 flex flex-col gap-0 py-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col h-full justify-between py-1 px-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] font-black text-sky-700 uppercase tracking-widest",
                                                    children: (summary?.yearPureIncomeTotal || 0) > 0 || (summary?.yearPureExpenseTotal || 0) > 0 ? "Net Efficiency" : "Aggregate Cashflow"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", (summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0) >= 0 ? "text-emerald-600" : "text-rose-600"),
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 738,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-2 bg-white rounded-xl shadow-sm border border-sky-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                className: "h-6 w-6 text-sky-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 744,
                                                columnNumber: 90
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 744,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 737,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-sky-200/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-slate-400 uppercase tracking-tight",
                                                    children: "Incoming"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 747,
                                                    columnNumber: 56
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[15px] font-black text-emerald-600 tabular-nums",
                                                    children: [
                                                        "+",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(summary?.yearPureIncomeTotal || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 747,
                                                    columnNumber: 152
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 747,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-0.5 text-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-slate-400 uppercase tracking-tight",
                                                    children: "Outgoing"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 67
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[15px] font-black text-rose-500 tabular-nums",
                                                    children: [
                                                        "-",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(summary?.yearPureExpenseTotal || 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                    lineNumber: 748,
                                                    columnNumber: 163
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 746,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 736,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 735,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSection, {
                        label: "Available",
                        className: "flex-1 min-w-[200px] bg-emerald-50/10 flex flex-col gap-0 py-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col h-full justify-center items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2.5 bg-white rounded-2xl shadow-md border border-emerald-100 mb-1 animate-pulse",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                        className: "h-7 w-7 text-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 754,
                                        columnNumber: 116
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 754,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1",
                                    children: "Liquid Capital"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 755,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-black tracking-tighter tabular-nums text-center leading-none", availableBalance >= 0 ? "text-emerald-700" : "text-rose-700"),
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(availableBalance))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 756,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 753,
                            columnNumber: 14
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            isCreditCard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderSection, {
                label: "Cashback Performance",
                borderColor: "border-emerald-100",
                className: "flex-[6] min-w-[420px] bg-emerald-50/10 flex flex-col gap-0 py-2 relative overflow-hidden",
                hideHintInHeader: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 p-1 opacity-20 hover:opacity-100 transition-opacity",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "h-4 w-4 text-emerald-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                            lineNumber: 765,
                            columnNumber: 103
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 765,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-5 flex-1 h-12 pt-1 px-2",
                        children: [
                            dynamicCashbackStats && selectedCycle && selectedCycle !== "all" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative inline-flex items-center justify-center flex-shrink-0 group cursor-help ml-1",
                                children: (()=>{
                                    const stats = dynamicCashbackStats;
                                    const isQualified = stats.is_min_spend_met;
                                    const minSpend = stats.minSpend || 0;
                                    const spent = stats.currentSpend || 0;
                                    const cap = stats.maxCashback || 0;
                                    const earned = stats.earnedSoFar || 0;
                                    const activeMax = stats.activeRules?.reduce((acc, r)=>acc + (r.max || 0), 0) || 0;
                                    const effectiveCap = cap > 0 ? cap : activeMax;
                                    let progress = 0;
                                    let strokeColor = "#10b981";
                                    if (!isQualified && minSpend > 0) {
                                        progress = Math.min(spent / minSpend * 100, 100);
                                        strokeColor = progress >= 90 ? "#10b981" : "#4f46e5";
                                    } else {
                                        progress = effectiveCap > 0 ? Math.min(100, earned / effectiveCap * 100) : 0;
                                        strokeColor = "#10b981";
                                    }
                                    const circumference = 2 * Math.PI * 28;
                                    const strokeDashoffset = circumference - progress / 100 * circumference;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "68",
                                                height: "68",
                                                viewBox: "0 0 68 68",
                                                className: "transform -rotate-90 drop-shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "34",
                                                        cy: "34",
                                                        r: "28",
                                                        fill: "none",
                                                        stroke: "#e2e8f0",
                                                        strokeWidth: "6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 792,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "34",
                                                        cy: "34",
                                                        r: "28",
                                                        fill: "none",
                                                        stroke: strokeColor,
                                                        strokeWidth: "6",
                                                        strokeDasharray: circumference,
                                                        strokeDashoffset: strokeDashoffset,
                                                        strokeLinecap: "round",
                                                        className: "transition-all duration-1500 ease-out"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 791,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute flex flex-col items-center justify-center transition-transform group-hover:scale-110",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[17px] font-black text-slate-900 leading-none tabular-nums tracking-tighter",
                                                        children: [
                                                            Math.round(progress),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 796,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[7.5px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70 transition-opacity group-hover:opacity-100",
                                                        children: !isQualified ? "GOAL" : "EARNED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 797,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 795,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true);
                                })()
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 768,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-12 w-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-emerald-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    className: "h-7 w-7 text-emerald-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 803,
                                    columnNumber: 133
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 803,
                                columnNumber: 17
                            }, this),
                            dynamicCashbackStats && selectedCycle && selectedCycle !== "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 grid grid-cols-2 gap-x-6 gap-y-2.5 pt-0.5 border-l border-emerald-100/50 pl-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none",
                                                children: "Net Profit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 808,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[16px] font-black tabular-nums tracking-tight drop-shadow-sm", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-700" : "text-rose-700"),
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.totalProfit))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 809,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 807,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none",
                                                children: "Paid Back"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 812,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[16px] font-black text-indigo-700 tabular-nums tracking-tight drop-shadow-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.actualClaimed))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 813,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 811,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black text-emerald-500/70 uppercase tracking-widest leading-none",
                                                children: "Est. Earned"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 816,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[16px] font-black text-emerald-600 tabular-nums tracking-tight drop-shadow-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.estCashback))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 817,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 815,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none",
                                                children: "Shared To Group"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 820,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[16px] font-black text-rose-600 tabular-nums tracking-tight drop-shadow-sm",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.sharedAmount))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 821,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 819,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 806,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 766,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 h-12 border-t border-slate-100/40 mt-1.5 pt-1.5 px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none",
                                children: "CYCLE CONTEXT:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 828,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    dynamicCashbackStats?.currentTierName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 px-3.5 py-1.5 bg-indigo-950 text-white border border-indigo-900 rounded-lg shadow-sm hover:translate-y-[-1px] transition-all cursor-default group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-3 w-3 text-amber-400 fill-amber-400 group-hover:animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 832,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black uppercase tracking-[0.15em]",
                                                children: [
                                                    dynamicCashbackStats.currentTierName,
                                                    " STATUS"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 833,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 831,
                                        columnNumber: 18
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9.5px] font-black text-slate-500 uppercase tracking-tight tabular-nums",
                                            children: [
                                                "CURRENT SPEND: ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.currentSpend))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 837,
                                            columnNumber: 18
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 836,
                                        columnNumber: 16
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 829,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 827,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5 h-10 w-full border-t border-slate-100/40 pt-1.5 px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    delayDuration: 200,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95 group shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                        className: "h-4 w-4 group-hover:rotate-12 transition-transform"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 847,
                                                        columnNumber: 21
                                                    }, this),
                                                    "ANALYTICS REPORT"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 846,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 845,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            side: "bottom",
                                            className: "w-[600px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]",
                                            sideOffset: 15,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-emerald-950 px-6 py-4 flex justify-between items-center text-white relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-transparent pointer-events-none"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 854,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col relative z-10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 leading-none mb-1.5",
                                                                        children: "INTUITION ENGINE V3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 855,
                                                                        columnNumber: 68
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "font-black text-[16px] uppercase tracking-[0.1em] text-white flex items-center gap-3",
                                                                        children: [
                                                                            "PERFORMANCE ANALYTICS ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-px w-8 bg-emerald-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 855,
                                                                                columnNumber: 322
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 855,
                                                                        columnNumber: 199
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 855,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative z-10 p-2 bg-emerald-900/40 rounded-full border border-emerald-800/50",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                    className: "h-6 w-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 856,
                                                                    columnNumber: 118
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 856,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 853,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between items-center mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px] font-black text-slate-400 uppercase tracking-widest",
                                                                                children: "Active Statistics Pipeline"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 862,
                                                                                columnNumber: 81
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase",
                                                                                children: dynamicCashbackStats?.cycle?.label || "CYCLE DATA"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 862,
                                                                                columnNumber: 196
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 862,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-2 gap-3 pb-2",
                                                                        children: [
                                                                            {
                                                                                label: "Eligible Spend",
                                                                                val: `+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.currentSpend))}`,
                                                                                sub: "Rule matching spend",
                                                                                color: "text-indigo-600",
                                                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
                                                                            },
                                                                            {
                                                                                label: "Cashback Earned",
                                                                                val: `+${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.estCashback))}`,
                                                                                sub: "Estimated rewards",
                                                                                color: "text-emerald-600",
                                                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"]
                                                                            },
                                                                            {
                                                                                label: "Shared Out",
                                                                                val: `-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.sharedAmount))}`,
                                                                                sub: "Sent to members",
                                                                                color: "text-rose-500",
                                                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users2$3e$__["Users2"]
                                                                            },
                                                                            {
                                                                                label: "Net Profit",
                                                                                val: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(cycleMetricSnapshot.totalProfit))}`,
                                                                                sub: "Cycle profitability",
                                                                                color: "text-slate-900",
                                                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
                                                                            }
                                                                        ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "bg-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:bg-white transition-all",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-3",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "p-2 bg-white rounded-lg border border-slate-100",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                                                                className: "h-3.5 w-3.5 text-slate-400"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 872,
                                                                                                columnNumber: 100
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                            lineNumber: 872,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex flex-col",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1",
                                                                                                    children: item.label
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                    lineNumber: 873,
                                                                                                    columnNumber: 66
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[16px] font-black tabular-nums tracking-tighter", item.color),
                                                                                                    children: item.val
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                    lineNumber: 873,
                                                                                                    columnNumber: 184
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                            lineNumber: 873,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 871,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, i, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 870,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 863,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 861,
                                                                columnNumber: 23
                                                            }, this),
                                                            dynamicCashbackStats?.activeRules && dynamicCashbackStats.activeRules.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-1.5 h-4 bg-indigo-500 rounded-sm"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 883,
                                                                                        columnNumber: 183
                                                                                    }, this),
                                                                                    "RULE PERFORMANCE BREAKDOWN"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 883,
                                                                                columnNumber: 78
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-[9px] font-black text-indigo-700 uppercase",
                                                                                    children: [
                                                                                        dynamicCashbackStats.currentTierName,
                                                                                        " TIER OPTIMIZED"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                    lineNumber: 883,
                                                                                    columnNumber: 370
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 883,
                                                                                columnNumber: 268
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 883,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid gap-4",
                                                                        children: dynamicCashbackStats.activeRules.map((rule, idx)=>{
                                                                            const ruleProgress = rule.max ? Math.min(100, rule.earned / rule.max * 100) : 100;
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "bg-slate-50/50 hover:bg-white rounded-[1.5rem] p-5 border border-slate-100 transition-all duration-300 hover:shadow-xl group/rule relative overflow-hidden",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute top-0 right-0 w-12 h-12 bg-indigo-600/5 rounded-bl-[4rem] group-hover/rule:bg-indigo-600/10 transition-colors"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 889,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex justify-between items-start mb-4",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex flex-col gap-1",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "flex items-center gap-2.5",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                className: "w-2.5 h-2.5 rounded-full bg-indigo-600/20 flex items-center justify-center",
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                                    className: "w-1.5 h-1.5 rounded-full bg-indigo-600"
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                                    lineNumber: 892,
                                                                                                                    columnNumber: 175
                                                                                                                }, this)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                                lineNumber: 892,
                                                                                                                columnNumber: 83
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "text-[13px] font-black text-slate-800 uppercase tracking-tight",
                                                                                                                children: rule.name
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                                lineNumber: 892,
                                                                                                                columnNumber: 239
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 892,
                                                                                                        columnNumber: 40
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md w-fit",
                                                                                                        children: [
                                                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(rule.spent),
                                                                                                            " ELIGIBLE SPENT"
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 893,
                                                                                                        columnNumber: 40
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 891,
                                                                                                columnNumber: 38
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex flex-col items-end",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-[22px] font-black text-emerald-600 tabular-nums leading-none drop-shadow-sm",
                                                                                                        children: [
                                                                                                            rule.rate,
                                                                                                            "%"
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 895,
                                                                                                        columnNumber: 79
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] leading-none mt-1",
                                                                                                        children: "REWARD MULTIPLIER"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 895,
                                                                                                        columnNumber: 197
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 895,
                                                                                                columnNumber: 38
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 890,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "space-y-2.5 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex justify-between items-baseline mb-1",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-[10px] font-black text-slate-400 uppercase tracking-widest",
                                                                                                        children: "Rewards Accumulation"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 898,
                                                                                                        columnNumber: 95
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "text-[16px] font-black text-slate-900 tabular-nums",
                                                                                                        children: [
                                                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(rule.earned),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                                className: "text-slate-300 ml-1.5 font-bold uppercase tracking-widest text-[10px]",
                                                                                                                children: [
                                                                                                                    "/ ",
                                                                                                                    rule.max ? formatVNShort(rule.max) : "∞"
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                                lineNumber: 898,
                                                                                                                columnNumber: 301
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 898,
                                                                                                        columnNumber: 204
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 898,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] p-0.5",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-full transition-all duration-1500 ease-in-out rounded-full shadow-sm relative group/bar progress-glow", ruleProgress >= 100 ? "bg-gradient-to-r from-emerald-600 to-emerald-400" : "bg-gradient-to-r from-indigo-700 to-indigo-500"),
                                                                                                    style: {
                                                                                                        width: `${ruleProgress}%`
                                                                                                    },
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "absolute inset-0 bg-white/20 animate-pulse"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 899,
                                                                                                        columnNumber: 470
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                    lineNumber: 899,
                                                                                                    columnNumber: 180
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 899,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-[0.25em] pt-1",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        children: "REWARD PROGRESS"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 900,
                                                                                                        columnNumber: 145
                                                                                                    }, this),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        children: ruleProgress >= 100 ? "BENEFIT OPTIMIZED" : `${Math.round(ruleProgress)}% UTILIZED`
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 900,
                                                                                                        columnNumber: 173
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 900,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 897,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, idx, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 888,
                                                                                columnNumber: 33
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 882,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 pt-8 border-t-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-slate-100/50 -mx-6 px-8 pb-8 rounded-b-[2rem]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between mb-6",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                            className: "h-5 w-5 text-white"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                            lineNumber: 912,
                                                                                            columnNumber: 187
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 912,
                                                                                        columnNumber: 70
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-black text-indigo-700/60 uppercase tracking-[0.4em] leading-none mb-1",
                                                                                                children: "ANNUAL TRACKER"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 912,
                                                                                                columnNumber: 267
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                                className: "font-black text-[15px] text-slate-800 uppercase tracking-widest",
                                                                                                children: [
                                                                                                    "Yearly Performance ",
                                                                                                    selectedYear || currentYear
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 912,
                                                                                                columnNumber: 393
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 912,
                                                                                        columnNumber: 236
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 912,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "px-4 py-2 bg-white border border-indigo-100 text-indigo-700 text-[10px] font-black rounded-xl uppercase shadow-md flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-2 h-2 rounded-full bg-indigo-500 animate-pulse"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 913,
                                                                                        columnNumber: 184
                                                                                    }, this),
                                                                                    " ENGINE CALCULATED REPORT"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 913,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 911,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-2 gap-8 mb-8",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "space-y-6",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col gap-1.5 transition-transform hover:translate-x-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "w-1 h-3 bg-emerald-500/30"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 917,
                                                                                                        columnNumber: 218
                                                                                                    }, this),
                                                                                                    " TOTAL YEAR PROFIT"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 917,
                                                                                                columnNumber: 111
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", annualPerformanceReport.profit >= 0 ? "text-emerald-700" : "text-rose-700"),
                                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(annualPerformanceReport.profit))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 917,
                                                                                                columnNumber: 288
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 917,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col gap-1.5 transition-transform hover:translate-x-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "w-1 h-3 bg-indigo-500/30"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 918,
                                                                                                        columnNumber: 218
                                                                                                    }, this),
                                                                                                    " ACTUAL PAID BACK"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 918,
                                                                                                columnNumber: 111
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-2xl font-black text-indigo-700 tabular-nums tracking-tighter drop-shadow-sm",
                                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(annualPerformanceReport.actual))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 918,
                                                                                                columnNumber: 286
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 918,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 916,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "space-y-6 text-right",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",
                                                                                                children: [
                                                                                                    "EST. POTENTIAL REWARDS ",
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "w-1 h-3 bg-emerald-500/30"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 921,
                                                                                                        columnNumber: 252
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 921,
                                                                                                columnNumber: 122
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-2xl font-black text-emerald-600 tabular-nums tracking-tighter drop-shadow-sm",
                                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(annualPerformanceReport.est))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 921,
                                                                                                columnNumber: 304
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 921,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2",
                                                                                                children: [
                                                                                                    "SHARED WITH OTHERS ",
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "w-1 h-3 bg-rose-500/30"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                        lineNumber: 922,
                                                                                                        columnNumber: 248
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 922,
                                                                                                columnNumber: 122
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-2xl font-black text-rose-500 tabular-nums tracking-tighter drop-shadow-sm",
                                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(annualPerformanceReport.shared))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 922,
                                                                                                columnNumber: 297
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 922,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 920,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 915,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "bg-white p-6 rounded-[2rem] border border-slate-200/80 shadow-2xl relative overflow-hidden group/benefit animate-in slide-in-from-bottom duration-1000",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "absolute top-0 left-0 w-3 h-full bg-emerald-600 group-hover/benefit:w-full group-hover/benefit:opacity-5 transition-all duration-700"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 926,
                                                                                columnNumber: 30
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-between items-center relative z-10",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-col",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[13px] font-black text-slate-600 uppercase tracking-[0.3em] leading-none mb-1.5",
                                                                                                children: "NET ANNUAL BENEFIT"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 928,
                                                                                                columnNumber: 63
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[11px] font-medium text-slate-400 italic tracking-wide",
                                                                                                children: "Real financial impact accrued across all metrics"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                                lineNumber: 928,
                                                                                                columnNumber: 191
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 928,
                                                                                        columnNumber: 32
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-3xl font-black tabular-nums tracking-tighter transition-all group-hover/benefit:scale-110", annualPerformanceReport.totalNetBenefit >= 0 ? "text-emerald-700 drop-shadow-[0_2px_10px_rgba(5,150,105,0.2)]" : "text-rose-700"),
                                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(annualPerformanceReport.totalNetBenefit))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                        lineNumber: 929,
                                                                                        columnNumber: 32
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                                lineNumber: 927,
                                                                                columnNumber: 30
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 925,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 910,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 859,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-slate-900 px-8 py-4 flex justify-between items-center text-white text-[11px] font-black uppercase tracking-[0.4em] opacity-100 border-t border-white/5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-2 h-2 rounded-full bg-emerald-500 animate-glow"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 936,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-emerald-400",
                                                                        children: "ENGINE CASHBACK V3.2 STATUS: ACTIVE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 937,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 935,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-500 font-bold opacity-60",
                                                                children: [
                                                                    "SNAPSHOT: ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$date$2d$fns$40$4$2e$1$2e$0$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "HH:mm:ss MMM d, yyyy").toUpperCase()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 939,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 934,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 851,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 850,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 844,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 843,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    delayDuration: 100,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2.5 px-4 py-2.5 rounded-xl h-full border transition-all cursor-help hover:shadow-md active:scale-95 transform shadow-sm relative group overflow-hidden flex-1", dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-y-0 left-0 w-1 transition-all group-hover:w-2", dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-600" : "bg-amber-600")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4.5 w-4.5 fill-current transition-transform group-hover:scale-110", dynamicCashbackStats?.is_min_spend_met ? "text-emerald-600" : "text-amber-600")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 951,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between flex-1 ml-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-black uppercase tracking-[0.15em]",
                                                                children: dynamicCashbackStats?.is_min_spend_met ? "QUALIFIED" : `NEEDS: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 953,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-black uppercase tracking-[0.15em] opacity-40",
                                                                children: [
                                                                    "SPENT: ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil(dynamicCashbackStats?.currentSpend || 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 958,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 949,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 948,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            side: "top",
                                            className: "bg-slate-950 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 rounded-[1.5rem] text-white w-[340px] z-[120]",
                                            sideOffset: 15,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 border-b border-white/10 pb-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-2.5 h-2.5 rounded-full", dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]")
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 966,
                                                                columnNumber: 92
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-black text-[12px] uppercase tracking-[0.2em] text-white",
                                                                children: "Rule Qualification Logic"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                lineNumber: 966,
                                                                columnNumber: 268
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 966,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[13px] font-medium leading-relaxed italic text-slate-400",
                                                        children: dynamicCashbackStats?.is_min_spend_met ? "✅ TARGET ACHIEVED: Minimum spending requirement has been successfully met for this cycle. All rule multipliers are currently active and accruing rewards." : `⚠️ ACTION REQUIRED: Target spend not reached. Chi tiêu thêm ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoneyVND"])(Math.ceil((dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))} để mở khóa toàn bộ quyền lợi hoàn tiền.`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 21
                                                    }, this),
                                                    (()=>{
                                                        const minSpend = dynamicCashbackStats?.minSpend || 1;
                                                        const currentSpend = dynamicCashbackStats?.currentSpend || 0;
                                                        const progressVal = Math.min(100, Math.round(currentSpend / minSpend * 100));
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 pt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 h-1 bg-slate-800 rounded-full overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-full bg-emerald-500 transition-all duration-700",
                                                                        style: {
                                                                            width: `${progressVal}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                        lineNumber: 977,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 976,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[9px] font-black text-slate-500 uppercase",
                                                                    children: [
                                                                        progressVal,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                                    lineNumber: 979,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                            lineNumber: 975,
                                                            columnNumber: 25
                                                        }, this);
                                                    })()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                                lineNumber: 965,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                            lineNumber: 964,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                    lineNumber: 947,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 946,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5 px-4 py-2 bg-indigo-600 text-white rounded-xl border border-indigo-700 shadow-lg ml-auto hover:bg-indigo-700 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$554$2e$0_react$40$19$2e$2$2e$4$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "h-4 w-4 text-indigo-300 group-hover:text-white transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 989,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] font-black uppercase tracking-[0.2em] leading-none drop-shadow-sm",
                                        children: dynamicCashbackStats?.cycle?.label || selectedCycle || "NOT SET"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                        lineNumber: 990,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                                lineNumber: 988,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                        lineNumber: 842,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
                lineNumber: 764,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/accounts/v2/AccountDetailHeaderV2.tsx",
        lineNumber: 518,
        columnNumber: 5
    }, this);
}
_s(AccountDetailHeaderV2, "g6pkMBVX1n4g9uMMgVVCREgWScw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_$40$babel$2b$core$40$7$2e$_577207839b545f50e0fdb06bbee3ea77$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = AccountDetailHeaderV2;
var _c;
__turbopack_context__.k.register(_c, "AccountDetailHeaderV2");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_accounts_v2_AccountDetailHeaderV2_tsx_1392282f._.js.map