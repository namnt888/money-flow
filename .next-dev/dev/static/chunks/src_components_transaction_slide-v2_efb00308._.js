(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryShopSection",
    ()=>CategoryShopSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book.js [app-client] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/combobox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$d3d8cf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:d3d8cf [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$839499__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:839499 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$6b73e6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:6b73e6 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$14ae22__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:14ae22 [app-client] (ecmascript) <text/javascript>");
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
function CategoryShopSection({ shops, categories, onAddNewCategory, onAddNewShop, isLoadingCategories, isLoadingShops, isEditing }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const transactionType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const categoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "category_id"
    });
    const shopId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "shop_id"
    });
    const sourceAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "source_account_id"
    });
    const targetAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "target_account_id"
    });
    const isEditingMode = Boolean(isEditing);
    const normalizeValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CategoryShopSection.useCallback[normalizeValue]": (value)=>value?.trim().toLowerCase() || null
    }["CategoryShopSection.useCallback[normalizeValue]"], []);
    const resolveCategoryValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CategoryShopSection.useCallback[resolveCategoryValue]": (value)=>{
            const normalized = normalizeValue(value);
            if (!normalized) return null;
            const matched = categories.find({
                "CategoryShopSection.useCallback[resolveCategoryValue].matched": (category)=>{
                    return normalizeValue(category.id) === normalized || normalizeValue(category.slug ?? null) === normalized || normalizeValue(category.name) === normalized;
                }
            }["CategoryShopSection.useCallback[resolveCategoryValue].matched"]);
            return matched?.id ?? value ?? null;
        }
    }["CategoryShopSection.useCallback[resolveCategoryValue]"], [
        categories,
        normalizeValue
    ]);
    const resolveShopValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CategoryShopSection.useCallback[resolveShopValue]": (value)=>{
            const normalized = normalizeValue(value);
            if (!normalized) return null;
            const matched = shops.find({
                "CategoryShopSection.useCallback[resolveShopValue].matched": (shop)=>{
                    return normalizeValue(shop.id) === normalized || normalizeValue(shop.name) === normalized;
                }
            }["CategoryShopSection.useCallback[resolveShopValue].matched"]);
            return matched?.id ?? value ?? null;
        }
    }["CategoryShopSection.useCallback[resolveShopValue]"], [
        normalizeValue,
        shops
    ]);
    // Track historical relationships to support many-to-many
    const [shopHistoricalCategoryIds, setShopHistoricalCategoryIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categoryHistoricalShopIds, setCategoryHistoricalShopIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [prefilledAccountId, setPrefilledAccountId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filter categories based on transaction type
    const filteredCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CategoryShopSection.useMemo[filteredCategories]": ()=>{
            return categories.filter({
                "CategoryShopSection.useMemo[filteredCategories]": (c)=>{
                    const normalizedCurrentCategoryId = normalizeValue(categoryId);
                    const isCurrentSelection = normalizedCurrentCategoryId !== null && [
                        normalizeValue(c.id),
                        normalizeValue(c.slug ?? null),
                        normalizeValue(c.name)
                    ].includes(normalizedCurrentCategoryId);
                    if (isCurrentSelection) return true;
                    if (!c.type) return true;
                    const catType = c.type.toLowerCase();
                    const txType = transactionType?.toLowerCase() || "expense";
                    if ([
                        "expense",
                        "debt",
                        "credit_pay"
                    ].includes(txType)) return catType === "expense";
                    if ([
                        "income",
                        "repayment"
                    ].includes(txType)) return catType === "income";
                    if (txType === "transfer") return catType === "transfer";
                    if (txType === "invest") return catType === "investment" || catType === "transfer";
                    return true;
                }
            }["CategoryShopSection.useMemo[filteredCategories]"]);
        }
    }["CategoryShopSection.useMemo[filteredCategories]"], [
        categories,
        categoryId,
        transactionType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryShopSection.useEffect": ()=>{
            const normalizedCategoryId = resolveCategoryValue(categoryId);
            if (normalizedCategoryId && normalizedCategoryId !== categoryId) {
                form.setValue("category_id", normalizedCategoryId, {
                    shouldDirty: false,
                    shouldTouch: false
                });
            }
            const normalizedShopId = resolveShopValue(shopId);
            if (normalizedShopId && normalizedShopId !== shopId) {
                form.setValue("shop_id", normalizedShopId, {
                    shouldDirty: false,
                    shouldTouch: false
                });
            }
        }
    }["CategoryShopSection.useEffect"], [
        categoryId,
        form,
        shopId,
        categories,
        shops
    ]);
    const activeAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CategoryShopSection.useMemo[activeAccountId]": ()=>{
            if ([
                "income",
                "repayment"
            ].includes(transactionType)) {
                return targetAccountId || null;
            }
            return sourceAccountId || null;
        }
    }["CategoryShopSection.useMemo[activeAccountId]"], [
        sourceAccountId,
        targetAccountId,
        transactionType
    ]);
    // Shop is only truly irrelevant for Internal Transfers, Credit Card Payments, Income and Repayment
    const isShopHidden = [
        "transfer",
        "credit_pay",
        "income",
        "repayment"
    ].includes(transactionType);
    const isValidUrl = (url)=>{
        if (!url) return false;
        try {
            // Next.js Image handles relative paths and absolute URLs
            if (url.startsWith("/") || url.startsWith("http")) return true;
            return false;
        } catch  {
            return false;
        }
    };
    // 2. Derive many-to-many relationship for shops (CASCADE)
    // If a category is selected, prioritize shops that belong to it or have been used with it.
    const effectiveCategoryHistoricalShopIds = categoryId ? categoryHistoricalShopIds : [];
    const effectiveShopHistoricalCategoryIds = shopId ? shopHistoricalCategoryIds : [];
    const sortedShopOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CategoryShopSection.useMemo[sortedShopOptions]": ()=>{
            if (!categoryId) {
                return shops.map({
                    "CategoryShopSection.useMemo[sortedShopOptions]": (s)=>({
                            value: s.id,
                            label: s.name,
                            icon: isValidUrl(s.image_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: s.image_url,
                                alt: s.name,
                                width: 24,
                                height: 24,
                                className: "object-contain rounded-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                                className: "w-4 h-4 text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        })
                }["CategoryShopSection.useMemo[sortedShopOptions]"]);
            }
            const historicalSet = new Set(effectiveCategoryHistoricalShopIds);
            // Filter and sort:
            // 1. Matches via default_category_id or History
            // 2. Others below
            return [
                ...shops
            ].sort({
                "CategoryShopSection.useMemo[sortedShopOptions]": (a, b)=>{
                    const aMatch = a.default_category_id === categoryId || historicalSet.has(a.id);
                    const bMatch = b.default_category_id === categoryId || historicalSet.has(b.id);
                    if (aMatch && !bMatch) return -1;
                    if (!aMatch && bMatch) return 1;
                    return 0;
                }
            }["CategoryShopSection.useMemo[sortedShopOptions]"]).map({
                "CategoryShopSection.useMemo[sortedShopOptions]": (s)=>({
                        value: s.id,
                        label: s.name,
                        icon: isValidUrl(s.image_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: s.image_url,
                            alt: s.name,
                            width: 24,
                            height: 24,
                            className: "object-contain rounded-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                            className: "w-4 h-4 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    })
            }["CategoryShopSection.useMemo[sortedShopOptions]"]);
        }
    }["CategoryShopSection.useMemo[sortedShopOptions]"], [
        shops,
        categoryId,
        effectiveCategoryHistoricalShopIds
    ]);
    const categoryOptions = filteredCategories.map((c)=>{
        let badgeLabel = c.type === "expense" ? "Expense" : c.type === "income" ? "Income" : "Transfer";
        let badgeColor = "bg-slate-100 text-slate-500 border-slate-200";
        if (c.type === "expense") {
            if (c.kind === "internal") {
                badgeLabel = "Lend";
                badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
            } else {
                badgeColor = "bg-rose-50 text-rose-600 border-rose-100";
            }
        } else if (c.type === "income") {
            if (c.kind === "internal") {
                badgeLabel = "Repay";
                badgeColor = "bg-blue-50 text-blue-600 border-blue-100";
            } else {
                badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
            }
        } else if (c.type === "transfer") {
            badgeColor = "bg-indigo-50 text-indigo-600 border-indigo-100";
        }
        return {
            value: c.id,
            label: c.name,
            icon: isValidUrl(c.image_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: c.image_url,
                alt: c.name,
                width: 20,
                height: 20,
                className: "object-contain rounded-none"
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this) : c.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm",
                children: c.icon
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                lineNumber: 274,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"], {
                className: "w-4 h-4 text-slate-400"
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                lineNumber: 276,
                columnNumber: 9
            }, this),
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                variant: "outline",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[9px] uppercase tracking-tighter py-0 px-1.5 font-bold border rounded-md", badgeColor),
                children: badgeLabel
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this)
        };
    });
    // Prioritize categories that this shop has been used with (many-to-many relationship support)
    const sortedCategoryOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CategoryShopSection.useMemo[sortedCategoryOptions]": ()=>{
            if (!shopId || effectiveShopHistoricalCategoryIds.length === 0) return categoryOptions;
            const historicalSet = new Set(effectiveShopHistoricalCategoryIds);
            return [
                ...categoryOptions
            ].sort({
                "CategoryShopSection.useMemo[sortedCategoryOptions]": (a, b)=>{
                    const aIsHist = historicalSet.has(a.value);
                    const bIsHist = historicalSet.has(b.value);
                    if (aIsHist && !bIsHist) return -1;
                    if (!aIsHist && bIsHist) return 1;
                    return 0;
                }
            }["CategoryShopSection.useMemo[sortedCategoryOptions]"]);
        }
    }["CategoryShopSection.useMemo[sortedCategoryOptions]"], [
        categoryOptions,
        shopId,
        effectiveShopHistoricalCategoryIds
    ]);
    // CASCADE: Select Category -> Suggest Shop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryShopSection.useEffect": ()=>{
            if (!categoryId) return;
            const currentShopId = form.getValues("shop_id");
            const fetchShops = {
                "CategoryShopSection.useEffect.fetchShops": async ()=>{
                    // Fetch multiple historical shops to improve the dropdown sorting
                    const recentShopIds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$839499__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecentShopIdsByCategoryId"])(categoryId);
                    setCategoryHistoricalShopIds(recentShopIds);
                    if (!currentShopId) {
                        if (recentShopIds.length > 0) {
                            form.setValue("shop_id", recentShopIds[0], {
                                shouldDirty: true
                            });
                        } else {
                            // Fallback to the single most recent shop logic
                            const recentShopId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$d3d8cf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecentShopByCategoryId"])(categoryId);
                            if (recentShopId) {
                                form.setValue("shop_id", recentShopId, {
                                    shouldDirty: true
                                });
                            }
                        }
                    }
                }
            }["CategoryShopSection.useEffect.fetchShops"];
            fetchShops();
        }
    }["CategoryShopSection.useEffect"], [
        categoryId,
        form,
        shops
    ]);
    // CASCADE: Select Shop -> Auto-set Category
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryShopSection.useEffect": ()=>{
            if (!shopId) return;
            const currentCategoryId = form.getValues("category_id");
            if (currentCategoryId) {
                return;
            }
            const selectedShop = shops.find({
                "CategoryShopSection.useEffect.selectedShop": (s)=>s.id === shopId
            }["CategoryShopSection.useEffect.selectedShop"]);
            const applyCategory = {
                "CategoryShopSection.useEffect.applyCategory": async ()=>{
                    // Fetch historical categories for this shop to check compatibility
                    const recentCategoryIds = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$6b73e6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecentCategoriesByShopId"])(shopId);
                    setShopHistoricalCategoryIds(recentCategoryIds);
                    // Determine if current category is compatible with the new shop
                    if (!currentCategoryId) {
                        // 1. Try default category from shop definition
                        if (selectedShop?.default_category_id) {
                            form.setValue("category_id", resolveCategoryValue(selectedShop.default_category_id), {
                                shouldDirty: true
                            });
                        } else if (recentCategoryIds.length > 0) {
                            form.setValue("category_id", resolveCategoryValue(recentCategoryIds[0]), {
                                shouldDirty: true
                            });
                        }
                    }
                }
            }["CategoryShopSection.useEffect.applyCategory"];
            applyCategory();
        }
    }["CategoryShopSection.useEffect"], [
        shopId,
        form,
        shops,
        resolveCategoryValue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryShopSection.useEffect": ()=>{
            if (isEditingMode) return;
            if (!activeAccountId) return;
            if (prefilledAccountId === activeAccountId) return;
            const currentCategoryId = resolveCategoryValue(form.getValues("category_id"));
            const currentShopId = resolveShopValue(form.getValues("shop_id"));
            if (currentCategoryId || currentShopId) return;
            let cancelled = false;
            const hydrateRecentForAccount = {
                "CategoryShopSection.useEffect.hydrateRecentForAccount": async ()=>{
                    const recent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$14ae22__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecentCategoryShopByAccountId"])(activeAccountId);
                    if (cancelled) return;
                    const nextCategoryId = resolveCategoryValue(recent.categoryId);
                    const nextShopId = resolveShopValue(recent.shopId);
                    if (nextCategoryId) {
                        form.setValue("category_id", nextCategoryId, {
                            shouldDirty: true,
                            shouldTouch: true
                        });
                    }
                    if (nextShopId && !isShopHidden) {
                        form.setValue("shop_id", nextShopId, {
                            shouldDirty: true,
                            shouldTouch: true
                        });
                    }
                    setPrefilledAccountId(activeAccountId);
                }
            }["CategoryShopSection.useEffect.hydrateRecentForAccount"];
            hydrateRecentForAccount();
            return ({
                "CategoryShopSection.useEffect": ()=>{
                    cancelled = true;
                }
            })["CategoryShopSection.useEffect"];
        }
    }["CategoryShopSection.useEffect"], [
        activeAccountId,
        form,
        isEditingMode,
        isShopHidden,
        prefilledAccountId,
        resolveCategoryValue,
        resolveShopValue
    ]);
    // Auto-select defaults logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryShopSection.useEffect": ()=>{
            const currentCategoryId = resolveCategoryValue(form.getValues("category_id"));
            const isCurrentCategoryCompatible = !!currentCategoryId && filteredCategories.some({
                "CategoryShopSection.useEffect": (c)=>c.id === currentCategoryId
            }["CategoryShopSection.useEffect"]);
            if (isEditingMode && isCurrentCategoryCompatible) return;
            if (isCurrentCategoryCompatible) return;
            if (currentCategoryId && !isCurrentCategoryCompatible) {
                const fallback = filteredCategories[0];
                if (fallback) {
                    form.setValue("category_id", fallback.id, {
                        shouldDirty: true
                    });
                }
                return;
            }
            if (transactionType === "debt") {
                const shoppingCat = categories.find({
                    "CategoryShopSection.useEffect.shoppingCat": (c)=>c.name === "Shopping" || c.name === "Mua sắm"
                }["CategoryShopSection.useEffect.shoppingCat"]);
                if (shoppingCat) {
                    form.setValue("category_id", shoppingCat.id);
                    return;
                }
            } else if (transactionType === "repayment") {
                const repaymentCat = categories.find({
                    "CategoryShopSection.useEffect.repaymentCat": (c)=>c.name === "Repayment" || c.name === "Thu nợ"
                }["CategoryShopSection.useEffect.repaymentCat"]);
                if (repaymentCat) {
                    form.setValue("category_id", repaymentCat.id);
                    return;
                }
            }
            const fallback = filteredCategories[0];
            if (fallback) form.setValue("category_id", fallback.id);
        }
    }["CategoryShopSection.useEffect"], [
        transactionType,
        categories,
        filteredCategories,
        form,
        isEditingMode,
        resolveCategoryValue
    ]);
    // Auto-clear shop if hidden
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CategoryShopSection.useEffect": ()=>{
            if (isShopHidden) {
                const currentShop = form.getValues("shop_id");
                if (currentShop) form.setValue("shop_id", null);
            }
        }
    }["CategoryShopSection.useEffect"], [
        isShopHidden,
        form
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid gap-4", isShopHidden ? "grid-cols-1" : "grid-cols-2"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: "category_id",
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    className: "text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1",
                                    children: "Category"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                        items: sortedCategoryOptions,
                                        value: field.value || undefined,
                                        onValueChange: field.onChange,
                                        placeholder: "Select Category",
                                        hideTriggerBadge: true,
                                        className: "w-full h-11 bg-slate-50/50 border-slate-200 rounded-xl",
                                        onAddNew: onAddNewCategory,
                                        addLabel: "Category",
                                        isLoading: isLoadingCategories
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                        lineNumber: 497,
                                        columnNumber: 17
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                            lineNumber: 492,
                            columnNumber: 13
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                    lineNumber: 488,
                    columnNumber: 9
                }, this),
                !isShopHidden && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: "shop_id",
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    className: "text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1",
                                    children: "Merchant / Shop"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                    lineNumber: 521,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                        items: sortedShopOptions,
                                        value: field.value || undefined,
                                        onValueChange: field.onChange,
                                        placeholder: "External Source",
                                        hideTriggerBadge: true,
                                        className: "w-full h-11 bg-slate-50/50 border-slate-200 rounded-xl",
                                        onAddNew: onAddNewShop,
                                        addLabel: "Shop",
                                        isLoading: isLoadingShops
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                        lineNumber: 525,
                                        columnNumber: 19
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                    lineNumber: 524,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                                    lineNumber: 537,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                            lineNumber: 520,
                            columnNumber: 15
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
                    lineNumber: 516,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
            lineNumber: 481,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx",
        lineNumber: 479,
        columnNumber: 5
    }, this);
}
_s(CategoryShopSection, "G4YoTGhIkfX3fe84tmmqvqGVx2I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = CategoryShopSection;
var _c;
__turbopack_context__.k.register(_c, "CategoryShopSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/schema.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bulkRowSchema",
    ()=>bulkRowSchema,
    "bulkTransactionSchema",
    ()=>bulkTransactionSchema,
    "singleTransactionSchema",
    ()=>singleTransactionSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-client] (ecmascript) <export * as z>");
;
const singleTransactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    occurred_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date format"
    }),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0, "Amount must be positive"),
    service_fee: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0).optional().nullable(),
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "expense",
        "income",
        "debt",
        "transfer",
        "repayment",
        "credit_pay",
        "invest"
    ]),
    // Relations
    source_account_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    target_account_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    // Categorization
    category_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    shop_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    tag: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    // Person / Debt
    person_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    // Cashback
    cashback_mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "none_back",
        "percent",
        "fixed",
        "real_fixed",
        "real_percent",
        "voluntary"
    ]).default("none_back"),
    cashback_share_percent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    cashback_share_fixed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional().nullable(),
    // Split Bill
    participants: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        person_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        is_fixed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
        note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable()
    })).optional().nullable(),
    // Installment
    is_installment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false).optional(),
    installment_plan_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional().nullable(),
    // Temporary UI state (not sent to API directly, packed into metadata)
    ui_is_cashback_expanded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false).optional(),
    ui_quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0).optional().nullable(),
    ui_market_price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0).optional().nullable(),
    // Metadata for various features (Duplication, etc)
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional().nullable()
});
const bulkRowSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].coerce.number().min(0),
    note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    shop_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    person_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    source_account_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    // Cashback (Inline/Compact)
    cashback_mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "none_back",
        "percent",
        "fixed",
        "real_fixed",
        "real_percent",
        "voluntary"
    ]).default("none_back"),
    cashback_share_percent: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    cashback_share_fixed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
    // Cycle
    cycle: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    // UI State
    is_expanded: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false)
});
const bulkTransactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    occurred_at: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].date(),
    tag: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    default_source_account_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    rows: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(bulkRowSchema)
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionTypeSelector",
    ()=>TransactionTypeSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/piggy-bank.js [app-client] (ecmascript) <export default as PiggyBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-left.js [app-client] (ecmascript) <export default as ArrowDownLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function TransactionTypeSelector({ accounts, people }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "person_id"
    });
    const sourceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "source_account_id"
    });
    const targetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "target_account_id"
    });
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentAccountId = params?.id;
    const selectedPerson = people?.find((p)=>p.id === personId);
    const isIncomeFlow = !sourceId && !!targetId;
    const isExpenseFlow = !!sourceId && !targetId;
    const isTransferFlow = [
        'transfer',
        'credit_pay',
        'invest'
    ].includes(type) || !!sourceId && !!targetId;
    // Helper to switch types safely
    const setMode = (mode)=>{
        if (!!personId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Special modes disabled when person is involved", {
                position: "top-right",
                className: "bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest border-none shadow-xl"
            });
            return;
        }
        const newType = type === mode ? 'expense' : mode;
        form.setValue('type', newType);
        if (newType === 'credit_pay' && currentAccountId) {
            form.setValue('target_account_id', currentAccountId);
            form.setValue('source_account_id', undefined);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 p-3 rounded-2xl border border-slate-200 bg-white shadow-sm animate-in fade-in zoom-in-95 duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMode('transfer'),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 p-2 rounded-xl border transition-all text-left group", type === 'transfer' ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-100 ring-2 ring-blue-100" : "bg-slate-50 border-slate-200/50 border-dashed hover:bg-slate-100 hover:border-slate-300", !!personId && "opacity-40 cursor-not-allowed grayscale"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-7 h-7 shrink-0 rounded-lg flex items-center justify-center transition-colors", type === 'transfer' ? "bg-white/20 text-white" : "bg-white text-slate-400 border border-slate-100 shadow-sm"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                    lineNumber: 64,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-black uppercase tracking-tight block truncate leading-none", type === 'transfer' ? "text-white" : "text-slate-800"),
                                        children: "Transfer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                        lineNumber: 67,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[8px] font-bold uppercase tracking-widest block truncate leading-none mt-0.5", type === 'transfer' ? "text-blue-100" : "text-slate-400"),
                                        children: "Internal"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                        lineNumber: 49,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMode('credit_pay'),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 p-2 rounded-xl border transition-all text-left group", type === 'credit_pay' ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-100 ring-2 ring-violet-100" : "bg-slate-50 border-slate-200/50 border-dashed hover:bg-slate-100 hover:border-slate-300", !!personId && "opacity-40 cursor-not-allowed grayscale"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-7 h-7 shrink-0 rounded-lg flex items-center justify-center transition-colors", type === 'credit_pay' ? "bg-white/20 text-white" : "bg-white text-slate-400 border border-slate-100 shadow-sm"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                    lineNumber: 94,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-black uppercase tracking-tight block truncate leading-none", type === 'credit_pay' ? "text-white" : "text-slate-800"),
                                        children: "Card Pay"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                        lineNumber: 97,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[8px] font-bold uppercase tracking-widest block truncate leading-none mt-0.5", type === 'credit_pay' ? "text-violet-100" : "text-slate-400"),
                                        children: "Repay"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                        lineNumber: 101,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 96,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setMode('invest'),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 p-2 rounded-xl border transition-all text-left group", type === 'invest' ? "bg-sky-600 border-sky-600 shadow-lg shadow-sky-100 ring-2 ring-sky-100" : "bg-slate-50 border-slate-200/50 border-dashed hover:bg-slate-100 hover:border-slate-300", !!personId && "opacity-40 cursor-not-allowed grayscale"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-7 h-7 shrink-0 rounded-lg flex items-center justify-center transition-colors", type === 'invest' ? "bg-white/20 text-white" : "bg-white text-slate-400 border border-slate-100 shadow-sm"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 120,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-black uppercase tracking-tight block truncate leading-none", type === 'invest' ? "text-white" : "text-slate-800"),
                                        children: "Invest"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                        lineNumber: 127,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[8px] font-bold uppercase tracking-widest block truncate leading-none mt-0.5", type === 'invest' ? "text-sky-100" : "text-slate-400"),
                                        children: "Assets"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                        lineNumber: 131,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 126,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                        lineNumber: 109,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-200 bg-slate-50/70 px-2.5 py-2 flex items-start gap-2.5 transition-all overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6.5 h-6.5 rounded-md flex items-center justify-center shrink-0 border transition-all duration-300", type === 'invest' ? "bg-sky-600 text-white border-sky-700 shadow-sky-100" : type === 'credit_pay' ? "bg-violet-600 text-white border-violet-700 shadow-violet-100" : type === 'transfer' || !!sourceId && !!targetId ? "bg-blue-500 text-white border-blue-600 shadow-blue-100" : isIncomeFlow ? "bg-emerald-500 text-white border-emerald-600 shadow-emerald-100" : isExpenseFlow ? "bg-rose-500 text-white border-rose-600 shadow-rose-100" : "bg-white text-slate-400 border-slate-200"),
                        children: type === 'invest' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                            lineNumber: 150,
                            columnNumber: 42
                        }, this) : type === 'credit_pay' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                            lineNumber: 151,
                            columnNumber: 49
                        }, this) : type === 'transfer' || !!sourceId && !!targetId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                            lineNumber: 152,
                            columnNumber: 81
                        }, this) : isIncomeFlow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                            lineNumber: 153,
                            columnNumber: 48
                        }, this) : isExpenseFlow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                            lineNumber: 154,
                            columnNumber: 53
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                            className: "w-3.5 h-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                            lineNumber: 155,
                            columnNumber: 41
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                        lineNumber: 141,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-0.5 flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] block",
                                children: "Flow"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 158,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-slate-600 leading-snug font-medium",
                                children: type === 'credit_pay' ? sourceId && targetId ? "Card Repayment Match: Moving funds to settle credit debt." : "Card Repayment Mode: Please choose source bank and target credit card." : type === 'invest' ? sourceId && targetId ? "Investment Match: Securing funds into asset accounts." : "Invest Mode: Please choose funding source and target asset." : isTransferFlow ? sourceId && targetId ? "Internal Transfer: Moving funds between your own assets." : "Transfer Mode: Please select both source and destination accounts." : isIncomeFlow ? personId ? `Repayment Flow: ${selectedPerson?.name} is paying you back into ${accounts.find((a)=>a.id === targetId)?.name}.` : `Income Flow: Receiving funds into ${accounts.find((a)=>a.id === targetId)?.name}.` : isExpenseFlow ? personId ? `Lending Flow: You are lending to ${selectedPerson?.name} from ${accounts.find((a)=>a.id === sourceId)?.name}.` : `Expense Flow: Paying from ${accounts.find((a)=>a.id === sourceId)?.name}.` : "Intelligent Transaction Flow: Start by picking an account or person."
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                                lineNumber: 159,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                        lineNumber: 157,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
                lineNumber: 140,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
_s(TransactionTypeSelector, "j8TkLBPMCTdec7IUCGnFog9afSQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = TransactionTypeSelector;
var _c;
__turbopack_context__.k.register(_c, "TransactionTypeSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CashbackSection",
    ()=>CashbackSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Percent$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/percent.js [app-client] (ecmascript) <export default as Percent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/smart-amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cashback/policy-resolver.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cashback.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
function CashbackSection({ accounts, categories = [], hideHeader = false }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const isExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "ui_is_cashback_expanded"
    });
    const cashbackMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "cashback_mode"
    });
    const transactionType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const sourceAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "source_account_id"
    });
    const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "amount"
    }) || 0;
    const sharePercent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "cashback_share_percent"
    });
    const shareFixed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "cashback_share_fixed"
    });
    const categoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "category_id"
    });
    const occurredAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "occurred_at"
    });
    const [cycleStats, setCycleStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingStats, setIsLoadingStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAllRules, setShowAllRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // CONSTANTS & HELPERS
    const formatVN = (val)=>new Intl.NumberFormat("vi-VN").format(Math.round(val));
    const isVisible = !(transactionType === "income" || transactionType === "repayment" || transactionType === "transfer");
    const activeAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[activeAccount]": ()=>{
            if (!sourceAccountId || !accounts) return null;
            return accounts.find({
                "CashbackSection.useMemo[activeAccount]": (a)=>a.id === sourceAccountId
            }["CashbackSection.useMemo[activeAccount]"]) || null;
        }
    }["CashbackSection.useMemo[activeAccount]"], [
        sourceAccountId,
        accounts
    ]);
    const serviceFee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "service_fee"
    }) || 0;
    const totalGrossAmount = Math.abs(amount) + serviceFee;
    const fetchStats = async ()=>{
        if (!sourceAccountId || !occurredAt) {
            setCycleStats(null);
            return;
        }
        setIsLoadingStats(true);
        try {
            const dateParam = occurredAt instanceof Date ? occurredAt.toISOString() : new Date(occurredAt).toISOString();
            const res = await fetch(`/api/cashback/stats?accountId=${sourceAccountId}&date=${dateParam}&mode=snapshot`);
            if (res.ok) {
                const data = await res.json();
                setCycleStats(data);
            }
        } catch (err) {
            console.error("Failed to fetch cycle stats for slide", err);
        } finally{
            setIsLoadingStats(false);
        }
    };
    // FETCH CYCLE STATS WHEN DATE OR ACCOUNT CHANGES
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CashbackSection.useEffect": ()=>{
            fetchStats();
        }
    }["CashbackSection.useEffect"], [
        sourceAccountId,
        occurredAt,
        transactionType
    ]);
    const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[category]": ()=>{
            return categories.find({
                "CashbackSection.useMemo[category]": (c)=>c.id === categoryId
            }["CashbackSection.useMemo[category]"]);
        }
    }["CashbackSection.useMemo[category]"], [
        categories,
        categoryId
    ]);
    const policy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[policy]": ()=>{
            if (!activeAccount) return null;
            const cycleSpent = cycleStats?.currentSpend || activeAccount.stats?.spent_this_cycle || 0;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
                account: activeAccount,
                categoryId,
                amount: totalGrossAmount,
                cycleTotals: {
                    spent: cycleSpent
                },
                categoryName: category?.name,
                categorySlug: category?.slug ?? undefined
            });
        }
    }["CashbackSection.useMemo[policy]"], [
        activeAccount,
        categoryId,
        totalGrossAmount,
        category,
        cycleStats
    ]);
    // Compute potential policy bypassing minSpendTarget gate — shows what rate would apply once threshold is met
    const potentialPolicy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[potentialPolicy]": ()=>{
            if (!activeAccount || !policy) return null;
            if (!policy.metadata?.reason?.includes("Below min spend")) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cashback$2f$policy$2d$resolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCashbackPolicy"])({
                account: activeAccount,
                categoryId,
                amount: totalGrossAmount,
                cycleTotals: {
                    spent: Infinity
                },
                categoryName: category?.name,
                categorySlug: category?.slug ?? undefined
            });
        }
    }["CashbackSection.useMemo[potentialPolicy]"], [
        activeAccount,
        categoryId,
        totalGrossAmount,
        category,
        policy
    ]);
    const displayPolicy = potentialPolicy ?? policy;
    const { actualBankReward, previewBankReward, remainsCap, rawReward, isCappedByRule, isCappedByCycle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo": ()=>{
            const estimateWithPolicy = {
                "CashbackSection.useMemo.estimateWithPolicy": (candidatePolicy, remains)=>{
                    const rate = candidatePolicy?.rate ?? 0;
                    const raw = totalGrossAmount * rate;
                    const cappedByRule = candidatePolicy?.maxReward !== undefined && candidatePolicy.maxReward !== null ? Math.min(raw, candidatePolicy.maxReward) : raw;
                    return {
                        reward: Math.min(cappedByRule, remains),
                        rawRuleReward: cappedByRule,
                        isCappedByRule: candidatePolicy?.maxReward !== undefined && candidatePolicy.maxReward !== null && raw > candidatePolicy.maxReward,
                        isCappedByCycle: remains !== Infinity && cappedByRule > remains
                    };
                }
            }["CashbackSection.useMemo.estimateWithPolicy"];
            const isUnlimitedBudget = Boolean(activeAccount?.cb_is_unlimited);
            const rawRemains = isUnlimitedBudget ? null : cycleStats?.remainingBudget ?? activeAccount?.stats?.remains_cap;
            const remains = rawRemains === null || rawRemains === undefined ? Infinity : rawRemains;
            const actual = estimateWithPolicy(policy, remains);
            const preview = estimateWithPolicy(displayPolicy, remains);
            return {
                remainsCap: rawRemains,
                actualBankReward: actual.reward,
                previewBankReward: preview.reward,
                rawReward: totalGrossAmount * (displayPolicy?.rate ?? 0),
                isCappedByRule: preview.isCappedByRule,
                isCappedByCycle: preview.isCappedByCycle
            };
        }
    }["CashbackSection.useMemo"], [
        totalGrossAmount,
        policy,
        displayPolicy,
        activeAccount,
        cycleStats
    ]);
    const isSharing = [
        "real_percent",
        "real_fixed",
        "voluntary"
    ].includes(cashbackMode);
    const cycleSpendInsight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[cycleSpendInsight]": ()=>{
            if (!activeAccount) return null;
            try {
                const program = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cashback$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeCashbackConfig"])(activeAccount.cashback_config, activeAccount);
                const levels = Array.isArray(program.levels) ? [
                    ...program.levels
                ] : [];
                const cycleSpend = Number(cycleStats?.currentSpend || 0);
                if (levels.length === 0) {
                    return {
                        cycleSpend,
                        matchedLevelName: null,
                        matchedThreshold: null,
                        nextThreshold: null,
                        hasRules: false
                    };
                }
                const sortedLevels = levels.map({
                    "CashbackSection.useMemo[cycleSpendInsight].sortedLevels": (lvl)=>({
                            name: lvl.name || `Level ≥ ${lvl.minTotalSpend}`,
                            minTotalSpend: Number(lvl.minTotalSpend || 0)
                        })
                }["CashbackSection.useMemo[cycleSpendInsight].sortedLevels"]).sort({
                    "CashbackSection.useMemo[cycleSpendInsight].sortedLevels": (a, b)=>a.minTotalSpend - b.minTotalSpend
                }["CashbackSection.useMemo[cycleSpendInsight].sortedLevels"]);
                const matched = [
                    ...sortedLevels
                ].reverse().find({
                    "CashbackSection.useMemo[cycleSpendInsight]": (lvl)=>cycleSpend >= lvl.minTotalSpend
                }["CashbackSection.useMemo[cycleSpendInsight]"]) || null;
                const next = sortedLevels.find({
                    "CashbackSection.useMemo[cycleSpendInsight]": (lvl)=>cycleSpend < lvl.minTotalSpend
                }["CashbackSection.useMemo[cycleSpendInsight]"]) || null;
                return {
                    cycleSpend,
                    matchedLevelName: matched?.name || null,
                    matchedThreshold: matched?.minTotalSpend ?? null,
                    nextThreshold: next?.minTotalSpend ?? null,
                    hasRules: true
                };
            } catch  {
                return {
                    cycleSpend: Number(cycleStats?.currentSpend || 0),
                    matchedLevelName: null,
                    matchedThreshold: null,
                    nextThreshold: null,
                    hasRules: false
                };
            }
        }
    }["CashbackSection.useMemo[cycleSpendInsight]"], [
        activeAccount,
        cycleStats
    ]);
    const totalSharedVal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[totalSharedVal]": ()=>{
            if (!isSharing) return 0;
            const rate = (sharePercent || 0) / 100;
            return totalGrossAmount * rate + (shareFixed || 0);
        }
    }["CashbackSection.useMemo[totalSharedVal]"], [
        totalGrossAmount,
        sharePercent,
        shareFixed,
        isSharing
    ]);
    const netProfitValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[netProfitValue]": ()=>{
            return previewBankReward - totalSharedVal;
        }
    }["CashbackSection.useMemo[netProfitValue]"], [
        previewBankReward,
        totalSharedVal
    ]);
    // AMBIGUITY FIX: Show Net Profit % in the header instead of sharing %
    const netProfitPercent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[netProfitPercent]": ()=>{
            if (totalGrossAmount > 0) return (netProfitValue / totalGrossAmount * 100).toFixed(2);
            return (displayPolicy?.rate ? displayPolicy.rate * 100 : 0).toFixed(2);
        }
    }["CashbackSection.useMemo[netProfitPercent]"], [
        totalGrossAmount,
        netProfitValue,
        displayPolicy
    ]);
    const cycleRuleBreakdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[cycleRuleBreakdown]": ()=>{
            const rules = (cycleStats?.activeRules || []).filter({
                "CashbackSection.useMemo[cycleRuleBreakdown].rules": (rule)=>Number(rule?.earned || 0) > 0
            }["CashbackSection.useMemo[cycleRuleBreakdown].rules"]).map({
                "CashbackSection.useMemo[cycleRuleBreakdown].rules": (rule)=>({
                        ruleId: rule.ruleId,
                        name: rule.name || "Rule",
                        spent: Number(rule.spent || 0),
                        earned: Number(rule.earned || 0),
                        rate: Number(rule.rate || 0)
                    })
            }["CashbackSection.useMemo[cycleRuleBreakdown].rules"]).sort({
                "CashbackSection.useMemo[cycleRuleBreakdown].rules": (a, b)=>b.earned - a.earned
            }["CashbackSection.useMemo[cycleRuleBreakdown].rules"]);
            const cycleEarnTotal = rules.reduce({
                "CashbackSection.useMemo[cycleRuleBreakdown].cycleEarnTotal": (sum, item)=>sum + item.earned
            }["CashbackSection.useMemo[cycleRuleBreakdown].cycleEarnTotal"], 0);
            return {
                rules,
                cycleEarnTotal
            };
        }
    }["CashbackSection.useMemo[cycleRuleBreakdown]"], [
        cycleStats
    ]);
    const suggestedShareRate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CashbackSection.useMemo[suggestedShareRate]": ()=>{
            return displayPolicy?.rate ? Number((displayPolicy.rate * 100).toFixed(2)) : undefined;
        }
    }["CashbackSection.useMemo[suggestedShareRate]"], [
        displayPolicy
    ]);
    const toggleSharing = (checked)=>{
        if (!checked) {
            form.setValue("cashback_mode", "percent");
        } else {
            form.setValue("cashback_mode", "real_percent");
            if (sharePercent === null && shareFixed === null && suggestedShareRate) {
                form.setValue("cashback_share_percent", suggestedShareRate);
            }
        }
    };
    const lastAutoPopulatedSig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const policySignature = displayPolicy ? `${displayPolicy.rate}-${displayPolicy.maxReward}` : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CashbackSection.useEffect": ()=>{
            if (isExpanded && policy && sharePercent === null && shareFixed === null && transactionType === "debt") {
                if (lastAutoPopulatedSig.current !== policySignature) {
                    lastAutoPopulatedSig.current = policySignature;
                    form.setValue("cashback_mode", "real_percent");
                    if (suggestedShareRate) {
                        form.setValue("cashback_share_percent", suggestedShareRate);
                    }
                }
            }
        // If the mode is not debt or expanded is closed, we can reset the ref if needed
        // but keeping it until the policy actually changes is safer.
        }
    }["CashbackSection.useEffect"], [
        isExpanded,
        policy,
        transactionType,
        suggestedShareRate,
        form,
        sharePercent,
        shareFixed,
        policySignature
    ]);
    if (!isVisible) return null;
    const showHeader = !hideHeader;
    const wrapperClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl transition-all duration-300 overflow-hidden", hideHeader ? "bg-transparent border-0 shadow-none" : isExpanded ? "bg-white border border-slate-200 shadow-xl shadow-slate-100/50" : "bg-transparent");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: wrapperClass,
        children: [
            showHeader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-between p-3 cursor-pointer select-none", isExpanded ? "bg-slate-50/80 border-b border-slate-100" : ""),
                onClick: ()=>form.setValue("ui_is_cashback_expanded", !isExpanded),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", isExpanded ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                    lineNumber: 375,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-slate-800",
                                                children: "Cashback Reward"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this),
                                            previewBankReward > 0 && !isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md font-bold border border-emerald-100",
                                                children: [
                                                    "~",
                                                    formatVN(previewBankReward)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                className: "h-2.5 w-2.5 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 389,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-slate-400 font-medium whitespace-nowrap",
                                                children: cycleStats?.cycle?.label || activeAccount?.credit_card_info?.statement_day ? `Cycle: ${cycleStats?.cycle?.label || `resets on ${activeAccount?.credit_card_info?.statement_day}`}` : "Checking cycle..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 388,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 377,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            !isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-slate-400 uppercase font-bold tracking-wider",
                                        children: "Net Yield"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 405,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-black", Number(netProfitPercent) >= 0 ? "text-emerald-600" : "text-rose-500"),
                                        children: [
                                            Number(netProfitPercent) >= 0 ? "+" : "",
                                            netProfitPercent,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 408,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 404,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 bg-white border border-slate-100 shadow-sm", isExpanded ? "rotate-180" : ""),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-3.5 h-3.5 text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                    lineNumber: 427,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                lineNumber: 359,
                columnNumber: 9
            }, this),
            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-50/50 rounded-xl p-3 border border-slate-100 flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-2 rounded-lg shadow-sm border border-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-4 w-4 text-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                    lineNumber: 437,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-slate-400 uppercase tracking-wider",
                                                children: "Strategy Match"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 441,
                                                columnNumber: 17
                                            }, this),
                                            policy?.metadata?.reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100",
                                                children: policy.metadata.reason
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 445,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 440,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-600 font-medium leading-relaxed",
                                        children: [
                                            activeAccount?.name,
                                            " applies",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-900 font-bold",
                                                children: [
                                                    (displayPolicy?.rate ? displayPolicy.rate * 100 : 0).toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 452,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            "reward rate",
                                            displayPolicy?.maxReward ? ` (Capped at ${formatVN(displayPolicy.maxReward)})` : " (Unlimited per transaction)",
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 450,
                                        columnNumber: 15
                                    }, this),
                                    potentialPolicy && potentialPolicy.rate > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-slate-400 mt-1 leading-relaxed",
                                        children: [
                                            "Potential:",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-emerald-600 font-bold",
                                                children: [
                                                    (potentialPolicy.rate * 100).toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 464,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            "for this category once min spend is met."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 462,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 439,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                        lineNumber: 435,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1 py-1 bg-slate-50/50 rounded-xl border border-slate-100/50 pr-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5 pl-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-7 h-7 rounded-lg flex items-center justify-center transition-colors", isSharing ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                            lineNumber: 483,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-black text-slate-700 uppercase tracking-tight",
                                                children: "Sharing Mode"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 486,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] text-slate-400 font-bold uppercase tracking-widest",
                                                children: "Share with others?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 489,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 485,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                checked: isSharing,
                                onCheckedChange: toggleSharing,
                                className: "data-[state=checked]:bg-amber-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-300 transition-all", !isSharing && "opacity-40 pointer-events-none grayscale-[0.5]"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "cashback_share_percent",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            className: "text-[10px] font-black text-slate-400 uppercase tracking-wider",
                                                            children: "Rate (%)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 23
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Percent$3e$__["Percent"], {
                                                        className: "w-2.5 h-2.5 text-slate-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 21
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                    ...field,
                                                                    type: "number",
                                                                    placeholder: suggestedShareRate ? `Suggest: ${suggestedShareRate}%` : "0.0",
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-10 font-black bg-white border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all pr-8 text-xs", (field.value || 0) > 100 && "border-rose-300 bg-rose-50/30 text-rose-600"),
                                                                    onChange: (e)=>{
                                                                        const rawVal = e.target.value;
                                                                        if (rawVal === "") {
                                                                            field.onChange(null);
                                                                            return;
                                                                        }
                                                                        const val = parseFloat(rawVal);
                                                                        // Allow 0, prevent negative
                                                                        field.onChange(!isNaN(val) ? Math.max(0, val) : null);
                                                                    },
                                                                    value: field.value ?? ""
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 523,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5",
                                                                    children: [
                                                                        field.value !== null && field.value !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>field.onChange(null),
                                                                            className: "p-0.5 hover:bg-slate-100 rounded transition-colors",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                className: "w-3 h-3 text-slate-300"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                lineNumber: 558,
                                                                                columnNumber: 33
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                            lineNumber: 553,
                                                                            columnNumber: 31
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-slate-400 font-bold text-[10px]",
                                                                            children: "%"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                            lineNumber: 561,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 550,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 23
                                                        }, void 0),
                                                        (field.value || 0) > 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5 text-[9px] font-bold text-rose-500 px-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                    className: "w-2.5 h-2.5 animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 568,
                                                                    columnNumber: 27
                                                                }, void 0),
                                                                "Efficiency > 100% means sharing more than total amount!"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 567,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 21
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 520,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 511,
                                        columnNumber: 17
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 507,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "cashback_share_fixed",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        className: "space-y-1.5 focus-within:z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                        className: "text-[10px] font-black text-slate-400 uppercase tracking-wider",
                                                        children: "Fixed (đ)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                        className: "w-2.5 h-2.5 text-slate-300"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 587,
                                                        columnNumber: 21
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 583,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                    value: field.value || 0,
                                                    onChange: (val)=>field.onChange(val !== undefined ? Math.max(0, val) : null),
                                                    hideLabel: true,
                                                    placeholder: "Amount",
                                                    className: "h-10 font-black bg-white border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 21
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 589,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 582,
                                        columnNumber: 17
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 578,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                        lineNumber: 501,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl p-4 transition-all border-2", netProfitValue < 0 ? "bg-rose-50 border-rose-200" : totalSharedVal > 0 ? "bg-amber-50/50 border-amber-200/50" : "bg-emerald-50/50 border-emerald-200/50 shadow-[0_4px_12px_rgba(16,185,129,0.05)]"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-black text-slate-500 uppercase tracking-[0.15em]",
                                                children: "Profit Analytics"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 619,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    fetchStats();
                                                },
                                                disabled: isLoadingStats,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1 hover:bg-slate-200 rounded-md transition-colors", isLoadingStats && "animate-spin opacity-50 text-indigo-500"),
                                                title: "Force Sync Stats",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    className: "h-3 w-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 636,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 622,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 618,
                                        columnNumber: 15
                                    }, this),
                                    netProfitValue < 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 641,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black uppercase tracking-tighter",
                                                children: "Voluntary Sharing"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 642,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 640,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 648,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-black uppercase tracking-tighter",
                                                children: "Optimized"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 649,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 647,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 617,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 rounded-lg border border-slate-200 bg-white px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-slate-500 uppercase tracking-wide",
                                                children: "Total Profit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 658,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-black tabular-nums", netProfitValue >= 0 ? "text-emerald-600" : "text-rose-600"),
                                                children: [
                                                    netProfitValue >= 0 ? "+" : "",
                                                    formatVN(netProfitValue)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 661,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 text-[10px] text-slate-400 font-semibold",
                                        children: [
                                            "My Profit = Earned (",
                                            formatVN(previewBankReward),
                                            ") - Shared (",
                                            formatVN(totalSharedVal),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 656,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 rounded-lg border border-slate-200 bg-white px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-slate-500 uppercase tracking-wide",
                                                children: "Earn Breakdown (Cycle)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 678,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-emerald-600 tabular-nums",
                                                children: formatVN(cycleRuleBreakdown.cycleEarnTotal)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 681,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 677,
                                        columnNumber: 15
                                    }, this),
                                    cycleRuleBreakdown.rules.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            (showAllRules ? cycleRuleBreakdown.rules : cycleRuleBreakdown.rules.slice(0, 4)).map((rule)=>{
                                                const displayRate = rule.rate > 0 && rule.rate <= 1 ? rule.rate * 100 : rule.rate;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-[1fr_auto] items-center gap-2 rounded border border-slate-100 bg-slate-50 px-2 py-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "truncate text-[10px] font-black text-slate-600",
                                                                    children: rule.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 699,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[9px] text-slate-400 font-semibold",
                                                                    children: [
                                                                        formatVN(rule.spent),
                                                                        " x ",
                                                                        displayRate.toFixed(0),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 702,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 698,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-black text-emerald-600 tabular-nums",
                                                            children: formatVN(rule.earned)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, rule.ruleId, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 23
                                                }, this);
                                            }),
                                            cycleRuleBreakdown.rules.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between pt-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[9px] text-slate-400 font-bold",
                                                        children: showAllRules ? "Showing all rules" : `+${cycleRuleBreakdown.rules.length - 4} more rules`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 714,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setShowAllRules((prev)=>!prev),
                                                        className: "text-[9px] font-black uppercase tracking-wide text-indigo-600 hover:text-indigo-700",
                                                        children: showAllRules ? "Show less" : "Show all rules"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                lineNumber: 713,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 687,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-slate-400 font-semibold",
                                        children: "No earned rule data in this cycle yet."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                        lineNumber: 730,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 676,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3.5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-end",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-center text-xs group cursor-help gap-3 w-full",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 text-slate-500 group-hover:text-indigo-600 transition-colors",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "w-5 h-5 rounded-md bg-white border border-slate-100 flex items-center justify-center shadow-sm",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                                                    className: "h-3 w-3 text-indigo-500"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                    lineNumber: 744,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                lineNumber: 743,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-medium tracking-tight",
                                                                                children: "Bank Reward (Est)"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                lineNumber: 746,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 742,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col items-end",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-black tabular-nums tracking-tight", isCappedByRule || isCappedByCycle ? "text-amber-600" : "text-slate-900"),
                                                                                children: formatVN(previewBankReward)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                lineNumber: 751,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            (isCappedByRule || isCappedByCycle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[8px] font-black text-amber-500 uppercase tracking-tighter -mt-0.5",
                                                                                children: [
                                                                                    "Capped ",
                                                                                    isCappedByRule ? "by Rule" : "by Cycle"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                lineNumber: 758,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 750,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 741,
                                                                columnNumber: 23
                                                            }, this),
                                                            actualBankReward === 0 && activeAccount?.type === "credit_card" && policy?.metadata?.reason?.includes("Below min spend") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[8px] font-black text-amber-500 uppercase tracking-tighter mt-0.5",
                                                                children: "Spend gate not met"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 769,
                                                                columnNumber: 27
                                                            }, this),
                                                            actualBankReward === 0 && activeAccount?.type === "credit_card" && !policy?.metadata?.reason?.includes("Below min spend") && (!policy || policy.rate === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[8px] font-black text-rose-500 uppercase tracking-tighter mt-0.5 animate-pulse",
                                                                children: "No policy matched"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 779,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 740,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "right",
                                                    className: "max-w-[240px] bg-slate-900 text-white p-3 border-none shadow-xl space-y-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold text-indigo-400 uppercase tracking-widest",
                                                                children: "Calculation Formula:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 790,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white/10 p-2 rounded text-[11px] font-mono",
                                                                children: [
                                                                    formatVN(totalGrossAmount),
                                                                    " ×",
                                                                    " ",
                                                                    (displayPolicy?.rate ? displayPolicy.rate * 100 : 0).toFixed(2),
                                                                    "%",
                                                                    isCappedByRule && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-amber-400",
                                                                        children: [
                                                                            "(Wait: Capped by Rule to ",
                                                                            formatVN(displayPolicy?.maxReward || 0),
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 797,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    isCappedByCycle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-amber-400",
                                                                        children: [
                                                                            "(Wait: Cycle Budget Remains ",
                                                                            formatVN(remainsCap || 0),
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 802,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-1 pt-1 border-t border-white/10 text-emerald-400 font-bold",
                                                                        children: [
                                                                            "= ",
                                                                            formatVN(previewBankReward)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 806,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 793,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[9px] opacity-60 italic pt-1 border-t border-white/5",
                                                                children: [
                                                                    "* Using ",
                                                                    displayPolicy?.metadata?.reason || "default",
                                                                    " strategy for this category."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 810,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 789,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                            lineNumber: 738,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center text-xs group cursor-help",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 text-slate-500 group-hover:text-amber-600 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-5 h-5 rounded-md bg-white border border-slate-100 flex items-center justify-center shadow-sm",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                                            className: "h-3 w-3 text-amber-500"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                            lineNumber: 823,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 822,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium tracking-tight",
                                                                        children: "Shared with People"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 825,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-black text-amber-600 tabular-nums tracking-tight",
                                                                children: [
                                                                    "-",
                                                                    formatVN(totalSharedVal)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 829,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 819,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "right",
                                                    className: "max-w-[240px] bg-slate-900 text-white p-3 border-none shadow-xl space-y-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold text-amber-400 uppercase tracking-widest",
                                                                children: "Calculation Formula:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 839,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white/10 p-2 rounded text-[11px] font-mono",
                                                                children: [
                                                                    sharePercent ? `(${formatVN(totalGrossAmount)} × ${sharePercent}%)` : "",
                                                                    sharePercent && shareFixed ? " + " : "",
                                                                    shareFixed ? formatVN(shareFixed) : "",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-1 pt-1 border-t border-white/10 text-amber-400 font-bold",
                                                                        children: [
                                                                            "= ",
                                                                            formatVN(totalSharedVal)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 848,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 842,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[9px] opacity-60 pt-1",
                                                                children: "Amount deducted from reward to person."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 852,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 838,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 834,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                            lineNumber: 818,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2.5 border-t border-slate-200/60 flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] font-black text-slate-400 uppercase tracking-widest",
                                                    children: "Profit Efficiency"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-slate-500 font-black",
                                                    children: totalGrossAmount > 0 ? `~${netProfitPercent}%` : "0%"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 863,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                            lineNumber: 859,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-4 mt-2 border-t border-dashed border-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                                    className: "h-2.5 w-2.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 872,
                                                                    columnNumber: 23
                                                                }, this),
                                                                "Cycle Budget"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 871,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[8px] font-bold text-slate-300 uppercase tracking-tighter",
                                                            children: cycleStats?.cycle?.label || "Current"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 875,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 870,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-3 rounded-lg border border-indigo-100 bg-indigo-50/40 p-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-indigo-500 uppercase tracking-widest",
                                                                    children: "Cycle"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 882,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-indigo-700 tabular-nums",
                                                                    children: cycleStats?.cycle?.label || "Current"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 883,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 881,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-slate-400 uppercase tracking-wider",
                                                                    children: "Total Spend This Cycle"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 888,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-slate-700 tabular-nums",
                                                                    children: formatVN(cycleSpendInsight?.cycleSpend || 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 889,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 887,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1.5 border-t border-indigo-100 pt-1.5 text-[9px] font-bold text-slate-500",
                                                            children: cycleSpendInsight?.hasRules ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-indigo-600",
                                                                        children: "Matched:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 896,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    " ",
                                                                    cycleSpendInsight?.matchedLevelName ? `${cycleSpendInsight.matchedLevelName} (>= ${formatVN(cycleSpendInsight.matchedThreshold || 0)})` : "No level matched yet",
                                                                    cycleSpendInsight?.nextThreshold !== null && cycleSpendInsight?.nextThreshold !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "ml-1 text-slate-400",
                                                                        children: [
                                                                            "| Next: ",
                                                                            formatVN(cycleSpendInsight.nextThreshold)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 901,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "No Total Spend rules"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 907,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 893,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 880,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-slate-50 border border-slate-100 rounded-lg p-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5",
                                                                    children: "Total Shared"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 914,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-black text-amber-600 tabular-nums leading-none",
                                                                    children: formatVN(cycleStats?.sharedAmount || 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                    lineNumber: 917,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 913,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white border border-slate-100 rounded-lg p-2 shadow-sm",
                                                            children: (()=>{
                                                                const ruleId = policy?.metadata?.ruleId;
                                                                const activeRule = ruleId ? cycleStats?.activeRules?.find((r)=>r.ruleId === ruleId) : null;
                                                                const rawRuleRemaining = activeRule ? activeRule.max - activeRule.earned : policy?.maxReward ?? cycleStats?.remainingBudget ?? remainsCap ?? null;
                                                                const ruleRemaining = rawRuleRemaining === null ? null : Math.max(0, rawRuleRemaining - actualBankReward);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[8px] font-black text-slate-400 uppercase tracking-tighter block mb-0.5 flex items-center gap-1",
                                                                            children: [
                                                                                "Remains Cashback",
                                                                                isLoadingStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-1 h-1 bg-indigo-400 rounded-full animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                                    lineNumber: 945,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                            lineNumber: 942,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-black tabular-nums leading-none", ruleRemaining === null || ruleRemaining > 0 ? "text-indigo-600" : "text-rose-600"),
                                                                            children: ruleRemaining !== null ? formatVN(ruleRemaining) : "Unlimited"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                            lineNumber: 948,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true);
                                                            })()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                            lineNumber: 921,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                    lineNumber: 912,
                                                    columnNumber: 19
                                                }, this),
                                                (()=>{
                                                    const ruleId = policy?.metadata?.ruleId;
                                                    const activeRule = ruleId ? cycleStats?.activeRules?.find((r)=>r.ruleId === ruleId) : null;
                                                    const rawRewardRemaining = activeRule ? activeRule.max - activeRule.earned : policy?.maxReward ?? cycleStats?.remainingBudget ?? remainsCap ?? null;
                                                    const rewardRemaining = rawRewardRemaining === null ? null : Math.max(0, rawRewardRemaining - actualBankReward);
                                                    if (rewardRemaining === null || rewardRemaining === Infinity || !policy?.rate || policy.rate <= 0) return null;
                                                    const spendableRemaining = Math.max(0, rewardRemaining / policy.rate);
                                                    const isOverbudget = totalGrossAmount > spendableRemaining;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border rounded-lg p-2 transition-all", isOverbudget ? "bg-rose-50 border-rose-200" : "bg-indigo-50/50 border-indigo-100"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[8px] font-black uppercase tracking-tighter", isOverbudget ? "text-rose-600" : "text-indigo-600"),
                                                                        children: isOverbudget ? "Budget Exceeded!" : "Remains Spendable Target"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 1009,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isOverbudget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                        className: "h-2.5 w-2.5 text-rose-500 animate-pulse"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 1022,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 1008,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-baseline gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-black tabular-nums tracking-tight", isOverbudget ? "text-rose-700" : "text-indigo-700"),
                                                                        children: formatVN(spendableRemaining)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 1026,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[8px] text-slate-400 font-bold uppercase",
                                                                        children: "suggested limit"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                        lineNumber: 1036,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 1025,
                                                                columnNumber: 25
                                                            }, this),
                                                            isOverbudget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[7px] text-rose-500 font-bold italic mt-1 uppercase tracking-tight",
                                                                children: "Note: amount > remains means NO cashback earned for overflow."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                                lineNumber: 1041,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                                        lineNumber: 1000,
                                                        columnNumber: 23
                                                    }, this);
                                                })()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                            lineNumber: 869,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                    lineNumber: 737,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                        lineNumber: 607,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
                lineNumber: 434,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx",
        lineNumber: 357,
        columnNumber: 5
    }, this);
}
_s(CashbackSection, "hQaFyXnoqqXfhbkJel8wDxFYYaQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = CashbackSection;
var _c;
__turbopack_context__.k.register(_c, "CashbackSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AmountSection",
    ()=>AmountSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/smart-amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$number$2d$to$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/number-to-text.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$cashback$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/cashback-section.tsx [app-client] (ecmascript)");
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
function renderHighlightedNumericWords(text) {
    const normalized = text?.trim();
    if (!normalized) return null;
    const parts = normalized.split(/(\d+[.,]?\d*)/g);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: parts.map((part, index)=>{
            if (!part) return null;
            const isNumber = /\d/.test(part);
            if (isNumber) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-extrabold text-rose-500",
                    children: part
                }, `num-${index}`, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                    lineNumber: 38,
                    columnNumber: 13
                }, this);
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: part
            }, `txt-${index}`, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                lineNumber: 44,
                columnNumber: 16
            }, this);
        })
    }, void 0, false);
}
function AmountSection({ accounts, categories }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "amount"
    });
    const serviceFee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "service_fee"
    });
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const isHideFee = type === "income" || type === "repayment";
    const isCashbackExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "ui_is_cashback_expanded"
    });
    const quantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "ui_quantity"
    });
    const categoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "category_id"
    });
    const sourceAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "source_account_id"
    });
    const targetAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "target_account_id"
    });
    const category = categories.find((c)=>c.id === categoryId);
    const sourceAccount = accounts.find((a)=>a.id === sourceAccountId);
    const targetAccount = accounts.find((a)=>a.id === targetAccountId);
    const isInvestment = category?.type === "investment" || sourceAccount?.type === "investment" || targetAccount?.type === "investment" || type === "invest";
    const [showFeeInput, setShowFeeInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AmountSection.useState": ()=>{
            const existing = form.getValues("service_fee");
            return typeof existing === "number" && existing > 0;
        }
    }["AmountSection.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AmountSection.useEffect": ()=>{
            if (!isHideFee && (Number(serviceFee) || 0) > 0) {
                setShowFeeInput(true);
            }
        }
    }["AmountSection.useEffect"], [
        serviceFee,
        isHideFee
    ]);
    const isFeeVisible = !isHideFee && (showFeeInput || (Number(serviceFee) || 0) > 0);
    const principal = Number(amount) || 0;
    const fee = isFeeVisible ? Number(serviceFee) || 0 : 0;
    const total = principal + fee;
    const totalText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AmountSection.useMemo[totalText]": ()=>total > 0 ? new Intl.NumberFormat("vi-VN").format(total) : ""
    }["AmountSection.useMemo[totalText]"], [
        total
    ]);
    const amountSummaryText = principal > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$number$2d$to$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatShortVietnameseCurrency"])(principal) : "";
    const feeSummaryText = fee > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$number$2d$to$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatShortVietnameseCurrency"])(fee) : "";
    const totalSummaryText = total > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$number$2d$to$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatShortVietnameseCurrency"])(total) : "";
    const unitPrice = quantity && Number(quantity) > 0 ? total / Number(quantity) : 0;
    const unitPriceText = unitPrice > 0 ? new Intl.NumberFormat("vi-VN").format(unitPrice) : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-3 border-t border-slate-100 pt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "amount",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        className: "space-y-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                className: "flex items-center gap-1.5 text-[10px] font-bold text-violet-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                                children: "Amount"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                    value: field.value,
                                                    onChange: field.onChange,
                                                    hideLabel: true,
                                                    className: "h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-indigo-500",
                                                    placeholder: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 19
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[12px] font-semibold text-slate-500 truncate",
                                children: amountSummaryText ? renderHighlightedNumericWords(amountSummaryText) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-slate-400",
                                    children: "Input to show text"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                    lineNumber: 143,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    !isHideFee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[130px] shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-1.5 text-[10px] font-bold text-amber-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                children: "Fee"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this),
                            isFeeVisible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                        control: form.control,
                                        name: "service_fee",
                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                className: "min-w-0 flex-1 space-y-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                            value: field.value || undefined,
                                                            onChange: field.onChange,
                                                            hideLabel: true,
                                                            placeholder: "0",
                                                            className: "h-10 border-slate-200 bg-white px-3 text-right text-sm font-black focus-visible:border-indigo-500",
                                                            compact: true,
                                                            hideCurrencyText: true,
                                                            hideCalculator: true,
                                                            hideClearButton: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                            lineNumber: 161,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 159,
                                                columnNumber: 21
                                            }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            form.setValue("service_fee", null, {
                                                shouldDirty: true
                                            });
                                            setShowFeeInput(false);
                                        },
                                        className: "flex h-10 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:text-slate-700",
                                        "aria-label": "Remove service fee",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                size: "sm",
                                onClick: ()=>setShowFeeInput(true),
                                className: "h-10 w-full border-slate-200 bg-white text-[10px] font-bold text-slate-400 hover:text-indigo-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "mr-1 h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this),
                                    "Add fee"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 190,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[12px] font-semibold text-slate-500 truncate",
                                children: !isHideFee ? isFeeVisible && feeSummaryText ? renderHighlightedNumericWords(feeSummaryText) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-slate-400",
                                    children: "Input to show text"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                    lineNumber: 206,
                                    columnNumber: 21
                                }, this) : null
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            isInvestment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "ui_quantity",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        className: "space-y-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                className: "flex items-center gap-1.5 text-[10px] font-bold text-sky-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                                children: "Asset Quantity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 223,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                    value: field.value || undefined,
                                                    onChange: field.onChange,
                                                    hideLabel: true,
                                                    className: "h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-sky-500",
                                                    placeholder: "0.00",
                                                    hideCurrencyText: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 226,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 222,
                                        columnNumber: 17
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium text-slate-400 truncate",
                                        children: "Required for P/L. e.g. 0.5 (taels/shares)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    unitPrice > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-black text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full animate-in fade-in zoom-in duration-200",
                                        children: [
                                            "≈ ",
                                            unitPriceText,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sky-400 font-bold",
                                                children: "/ unit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 246,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[140px] shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "ui_market_price",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        className: "space-y-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                className: "flex items-center gap-1.5 text-[10px] font-bold text-teal-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                                children: "Market Price"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 259,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                    value: field.value || undefined,
                                                    onChange: field.onChange,
                                                    hideLabel: true,
                                                    className: "h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-teal-500",
                                                    placeholder: "Optional",
                                                    hideCurrencyText: true,
                                                    compact: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 262,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[11px] font-medium text-slate-400 truncate",
                                children: "True price (no fees)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-100 bg-slate-50 px-3 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 text-[12px] font-semibold text-slate-500 truncate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-black uppercase tracking-wider text-slate-400 mr-2",
                                    children: "Total:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                totalSummaryText ? renderHighlightedNumericWords(totalSummaryText) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-slate-400",
                                    children: "Input to show text"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                    lineNumber: 291,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                            lineNumber: 287,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-black tabular-nums text-slate-900 shrink-0",
                            children: totalText
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                    lineNumber: 286,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] font-black uppercase tracking-[0.3em] text-slate-500",
                                children: "Cashback Reward"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-slate-400",
                                children: "Toggle to reveal optimizations"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                        checked: Boolean(isCashbackExpanded),
                        onCheckedChange: (checked)=>form.setValue("ui_is_cashback_expanded", checked)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$cashback$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CashbackSection"], {
                accounts: accounts,
                categories: categories,
                hideHeader: true
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_s(AmountSection, "AJ/Atl8hcEKe6oeC0dkOiA3KyYs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = AmountSection;
var _c;
__turbopack_context__.k.register(_c, "AmountSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BasicInfoSection",
    ()=>BasicInfoSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/calendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/combobox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$person$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/person-avatar.tsx [app-client] (ecmascript)");
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
function BasicInfoSection({ people, operationMode }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    // Sync Tag with Date - ONLY if empty and in ADD mode
    const occurredAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "occurred_at"
    });
    const peopleItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BasicInfoSection.useMemo[peopleItems]": ()=>people.map({
                "BasicInfoSection.useMemo[peopleItems]": (person)=>({
                        value: person.id,
                        label: person.name,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$person$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersonAvatar"], {
                            name: person.name,
                            imageUrl: person.image_url,
                            size: "sm"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                            lineNumber: 47,
                            columnNumber: 21
                        }, this)
                    })
            }["BasicInfoSection.useMemo[peopleItems]"])
    }["BasicInfoSection.useMemo[peopleItems]"], [
        people
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BasicInfoSection.useEffect": ()=>{
            if (occurredAt && operationMode === 'add') {
                const currentTag = form.getValues("tag");
                const dateTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(occurredAt, "yyyy-MM");
                // Only auto-update if tag is empty OR it looks like a year-month tag
                // We want it to be dynamic but not overwrite custom manual tags
                const isManualTag = currentTag && !/^\d{4}-\d{2}$/.test(currentTag);
                if (!currentTag || !isManualTag) {
                    form.setValue("tag", dateTag);
                }
            }
        }
    }["BasicInfoSection.useEffect"], [
        occurredAt,
        form,
        operationMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                control: form.control,
                name: "occurred_at",
                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                className: "flex items-center gap-1.5 text-[10px] font-bold text-sky-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 82,
                                        columnNumber: 29
                                    }, void 0),
                                    "Date"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 81,
                                columnNumber: 25
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full pl-3 text-left font-normal h-10 border-slate-200 bg-white", !field.value && "text-muted-foreground"),
                                                children: [
                                                    field.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(field.value, "dd/MM/yyyy") : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Pick a date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 45
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                        className: "ml-auto h-4 w-4 opacity-50"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 41
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                lineNumber: 88,
                                                columnNumber: 37
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                            lineNumber: 87,
                                            columnNumber: 33
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                        className: "w-auto p-0",
                                        align: "start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Calendar"], {
                                            mode: "single",
                                            selected: field.value,
                                            onSelect: (newDate)=>{
                                                if (!newDate) return;
                                                const current = field.value || new Date();
                                                const preserved = new Date(newDate);
                                                preserved.setHours(current.getHours(), current.getMinutes(), current.getSeconds(), current.getMilliseconds());
                                                field.onChange(preserved);
                                            },
                                            disabled: (date)=>date > new Date() || date < new Date("1900-01-01"),
                                            initialFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                            lineNumber: 105,
                                            columnNumber: 33
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 104,
                                        columnNumber: 29
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 85,
                                columnNumber: 25
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 122,
                                columnNumber: 25
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                        control: form.control,
                        name: "person_id",
                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                        className: "flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                lineNumber: 135,
                                                columnNumber: 33
                                            }, void 0),
                                            "Involved Person"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 134,
                                        columnNumber: 29
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                            items: peopleItems,
                                            value: field.value || undefined,
                                            onValueChange: (value)=>field.onChange(value ?? null),
                                            placeholder: "Personal Flow (No one)",
                                            hideTriggerBadge: true,
                                            className: "w-full h-10 bg-white border-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                            lineNumber: 139,
                                            columnNumber: 33
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 138,
                                        columnNumber: 29
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 148,
                                        columnNumber: 29
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 133,
                                columnNumber: 25
                            }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                        lineNumber: 129,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                        control: form.control,
                        name: "tag",
                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                        className: "flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 capitalize tracking-wide mb-1.5 min-h-[14px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                lineNumber: 159,
                                                columnNumber: 33
                                            }, void 0),
                                            "Debt Tag Cycle"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 158,
                                        columnNumber: 29
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex gap-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 37
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    placeholder: "Debt Tag Cycle",
                                                    className: "pl-9 pr-16 bg-white border-slate-200 h-10",
                                                    ...field,
                                                    value: field.value || ''
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 37
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                    type: "button",
                                                                    variant: "ghost",
                                                                    size: "icon",
                                                                    className: "h-6 w-6 text-slate-400 hover:text-blue-600 transition-colors",
                                                                    title: "Recent Tags",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                        lineNumber: 181,
                                                                        columnNumber: 53
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                    lineNumber: 174,
                                                                    columnNumber: 49
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 45
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                                className: "w-40 p-1",
                                                                align: "end",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex flex-col gap-0.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-semibold text-slate-500 px-2 py-1 bg-slate-50 rounded-sm mb-1",
                                                                            children: "Recent Cycles"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                            lineNumber: 186,
                                                                            columnNumber: 53
                                                                        }, void 0),
                                                                        Array.from({
                                                                            length: 3
                                                                        }).map((_, i)=>{
                                                                            const date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMonths"])(new Date(), i);
                                                                            const tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM");
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>field.onChange(tag),
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs px-2 py-1.5 rounded-sm hover:bg-slate-100 text-left transition-colors flex items-center justify-between group", field.value === tag && "bg-blue-50 text-blue-600 font-medium hover:bg-blue-100"),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: tag
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                                        lineNumber: 202,
                                                                                        columnNumber: 65
                                                                                    }, void 0),
                                                                                    field.value === tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                                        lineNumber: 203,
                                                                                        columnNumber: 89
                                                                                    }, void 0)
                                                                                ]
                                                                            }, tag, true, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                                lineNumber: 193,
                                                                                columnNumber: 61
                                                                            }, void 0);
                                                                        }),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-px bg-slate-100 my-1"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                            lineNumber: 207,
                                                                            columnNumber: 53
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>field.onChange((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), "yyyy-MM")),
                                                                            className: "text-xs px-2 py-1.5 rounded-sm hover:bg-slate-100 text-left text-slate-500 hover:text-slate-800 flex items-center gap-1.5",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                                    className: "h-3 w-3"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                                    lineNumber: 213,
                                                                                    columnNumber: 57
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: "Current"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                                    lineNumber: 214,
                                                                                    columnNumber: 57
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                            lineNumber: 208,
                                                                            columnNumber: 53
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                    lineNumber: 185,
                                                                    columnNumber: 49
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 45
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 41
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 37
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                            lineNumber: 163,
                                            columnNumber: 33
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 222,
                                        columnNumber: 29
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 157,
                                columnNumber: 25
                            }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                        lineNumber: 153,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                lineNumber: 128,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                control: form.control,
                name: "note",
                render: ({ field })=>{
                    // Calculate #nosync label based on selected person
                    const personId = form.getValues("person_id");
                    const selectedPerson = people?.find((p)=>p.id === personId);
                    const hasSheet = !!selectedPerson?.google_sheet_url;
                    const nosyncLabel = hasSheet ? "+ Not sync" : "+ #nosync";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-1 mb-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
                                        children: "Note"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 242,
                                        columnNumber: 33
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        onClick: (e)=>{
                                            e.preventDefault(); // Prevent focus stealing issues
                                            const current = field.value || "";
                                            if (!current.includes("#nosync")) {
                                                const newValue = current ? `${current} #nosync` : "#nosync";
                                                field.onChange(newValue);
                                            }
                                        },
                                        className: "text-[10px] text-slate-400 hover:text-blue-600 hover:bg-slate-100 px-1.5 py-0.5 rounded cursor-pointer transition-colors",
                                        title: "Click to add #nosync tag",
                                        children: nosyncLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                        lineNumber: 243,
                                        columnNumber: 33
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 241,
                                columnNumber: 29
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                            placeholder: "Add a note...",
                                            className: "resize-none min-h-[60px] bg-white border-slate-200 pr-8",
                                            ...field,
                                            value: field.value || ''
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                            lineNumber: 260,
                                            columnNumber: 37
                                        }, void 0),
                                        field.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>field.onChange(""),
                                            className: "absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                                lineNumber: 272,
                                                columnNumber: 45
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                            lineNumber: 267,
                                            columnNumber: 41
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                    lineNumber: 259,
                                    columnNumber: 33
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 258,
                                columnNumber: 29
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                                lineNumber: 277,
                                columnNumber: 29
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                        lineNumber: 240,
                        columnNumber: 25
                    }, void 0);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
                lineNumber: 229,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx",
        lineNumber: 73,
        columnNumber: 9
    }, this);
}
_s(BasicInfoSection, "qxha97hiZnD+lH/JVlOTwbqhEGw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = BasicInfoSection;
var _c;
__turbopack_context__.k.register(_c, "BasicInfoSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountSelector",
    ()=>AccountSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/piggy-bank.js [app-client] (ecmascript) <export default as PiggyBank>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/combobox.tsx [app-client] (ecmascript)");
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
function getPocketBaseAccountAdminUrl(accountId) {
    const encoded = encodeURIComponent(accountId);
    return `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_acc_001&filter=${encoded}&sort=-%40rowid`;
}
function AccountActionBadges({ accountId, onEditAccount }) {
    if (!accountId) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onEditAccount?.(accountId),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center gap-1 rounded-md border px-2.5 h-7 shadow-sm transition-colors", "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"),
                title: "Edit selected account",
                "aria-label": "Edit selected account",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                        className: "h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold",
                        children: "Edit"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>{
                    window.open(getPocketBaseAccountAdminUrl(accountId), "_blank", "noopener,noreferrer");
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center gap-1 rounded-md border px-2.5 h-7 shadow-sm transition-colors", "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"),
                title: "Open in PocketBase Admin",
                "aria-label": "Open in PocketBase Admin",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                        className: "h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-semibold",
                        children: "DB"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = AccountActionBadges;
function AccountSelector({ accounts, people, onAddNewAccount, onEditAccount }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "person_id"
    });
    const sourceId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "source_account_id"
    });
    const targetId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "target_account_id"
    });
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentAccountId = params?.id;
    const selectedPerson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountSelector.useMemo[selectedPerson]": ()=>people.find({
                "AccountSelector.useMemo[selectedPerson]": (p)=>p.id === personId
            }["AccountSelector.useMemo[selectedPerson]"])
    }["AccountSelector.useMemo[selectedPerson]"], [
        people,
        personId
    ]);
    // Mode detection
    const isSpecialMode = [
        "transfer",
        "credit_pay",
        "invest"
    ].includes(type);
    // Smart Type Inferrer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountSelector.useEffect": ()=>{
            if (isSpecialMode) return;
            if (personId) {
                if (sourceId && !targetId) form.setValue("type", "debt");
                else if (!sourceId && targetId) form.setValue("type", "repayment");
                else if (!sourceId && !targetId) form.setValue("type", "debt"); // both cleared → neutral debt
            } else {
                if (sourceId && !targetId) form.setValue("type", "expense");
                else if (!sourceId && targetId) form.setValue("type", "income");
                else if (!sourceId && !targetId) form.setValue("type", "expense"); // both cleared → neutral expense
            }
        }
    }["AccountSelector.useEffect"], [
        sourceId,
        targetId,
        personId,
        isSpecialMode,
        form
    ]);
    // Enforce BẬP BÊNH from Type (inverse logic)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountSelector.useEffect": ()=>{
            if (isSpecialMode) return;
            if ([
                "income",
                "repayment"
            ].includes(type)) {
                if (sourceId) form.setValue("source_account_id", null);
            } else if ([
                "expense",
                "debt"
            ].includes(type)) {
                if (targetId) form.setValue("target_account_id", null);
            }
        }
    }["AccountSelector.useEffect"], [
        type,
        isSpecialMode,
        sourceId,
        targetId,
        form
    ]);
    // Filtering logic for special rules
    const mapAccountToItem = (a)=>{
        let typeIcon = null;
        let typeLabel = a.type || "Acc";
        let colorClass = "text-slate-500 border-slate-200 bg-slate-50";
        switch(a.type){
            case "bank":
                typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"], {
                    className: "h-2.5 w-2.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 152,
                    columnNumber: 20
                }, this);
                typeLabel = "Bank";
                colorClass = "text-blue-600 border-blue-200 bg-blue-50";
                break;
            case "credit_card":
                typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                    className: "h-2.5 w-2.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 157,
                    columnNumber: 20
                }, this);
                typeLabel = "Credit";
                colorClass = "text-violet-600 border-violet-200 bg-violet-50";
                break;
            case "cash":
                typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                    className: "h-2.5 w-2.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 162,
                    columnNumber: 20
                }, this);
                typeLabel = "Cash";
                colorClass = "text-emerald-600 border-emerald-200 bg-emerald-50";
                break;
            case "ewallet":
                typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                    className: "h-2.5 w-2.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 167,
                    columnNumber: 20
                }, this);
                typeLabel = "Wallet";
                colorClass = "text-orange-600 border-orange-200 bg-orange-50";
                break;
            case "savings":
            case "investment":
                typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$piggy$2d$bank$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PiggyBank$3e$__["PiggyBank"], {
                    className: "h-2.5 w-2.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 173,
                    columnNumber: 20
                }, this);
                typeLabel = "Saving";
                colorClass = "text-sky-600 border-sky-200 bg-sky-50";
                break;
            default:
                typeIcon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"], {
                    className: "h-2.5 w-2.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 178,
                    columnNumber: 20
                }, this);
                typeLabel = a.type || "Acc";
        }
        return {
            value: a.id,
            label: a.name,
            icon: a.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: a.image_url,
                alt: "",
                className: "w-5 h-auto max-w-[20px] object-contain rounded-none"
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this) : undefined,
            badge: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex items-center gap-1 rounded-[4px] border px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest ${colorClass}`,
                children: [
                    typeIcon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: typeLabel
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this)
        };
    };
    const getAccountGroups = (side)=>{
        let filtered = accounts;
        if (type === "transfer") {
            if (side === "source" && targetId) filtered = accounts.filter((a)=>a.id !== targetId);
            if (side === "target" && sourceId) filtered = accounts.filter((a)=>a.id !== sourceId);
        } else if (type === "credit_pay") {
            if (side === "source") filtered = accounts.filter((a)=>a.type !== "credit_card");
            else filtered = accounts.filter((a)=>a.type === "credit_card");
        }
        const currentAccount = currentAccountId ? filtered.find((a)=>a.id === currentAccountId) : null;
        const creditAccounts = filtered.filter((a)=>a.type === "credit_card" && a.id !== currentAccountId);
        const cashAccounts = filtered.filter((a)=>a.type !== "credit_card" && a.type !== "debt" && a.id !== currentAccountId);
        return [
            ...currentAccount ? [
                {
                    label: "Current Account",
                    items: [
                        mapAccountToItem(currentAccount)
                    ]
                }
            ] : [],
            ...creditAccounts.length > 0 ? [
                {
                    label: "Credit Cards",
                    items: creditAccounts.map(mapAccountToItem)
                }
            ] : [],
            {
                label: "Cash & Banks",
                items: cashAccounts.map(mapAccountToItem)
            }
        ];
    };
    const isIncomeFlow = !sourceId && !!targetId;
    const isExpenseFlow = !!sourceId && !targetId;
    const isTransferFlow = isSpecialMode || !!sourceId && !!targetId;
    // --- Dynamic Placeholder Logic (BẬP BÊNH) ---
    const sourcePlaceholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountSelector.useMemo[sourcePlaceholder]": ()=>{
            if (targetId && !isSpecialMode) {
                if (personId) return `Payer: ${selectedPerson?.name || "Person"}`;
                return "Receiving Mode (Bank Active)";
            }
            return "Choose Pay With";
        }
    }["AccountSelector.useMemo[sourcePlaceholder]"], [
        targetId,
        isSpecialMode,
        personId,
        selectedPerson
    ]);
    const targetPlaceholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountSelector.useMemo[targetPlaceholder]": ()=>{
            if (sourceId && !isSpecialMode) {
                if (personId) return `Borrower: ${selectedPerson?.name || "Person"}`;
                return "Spending Mode (Bank Active)";
            }
            return "Choose Deposit To";
        }
    }["AccountSelector.useMemo[targetPlaceholder]"], [
        sourceId,
        isSpecialMode,
        personId,
        selectedPerson
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 pt-1",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4 items-start relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 top-11 -translate-x-1/2 w-8 h-[2px] bg-slate-100 z-0 hidden sm:block"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 277,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5 z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-black uppercase tracking-wider block transition-colors", isIncomeFlow ? "text-slate-200" : "text-rose-500"),
                                    children: "Pay With (Từ)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                    lineNumber: 282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-7 min-w-[124px] items-center justify-end",
                                    children: !isIncomeFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountActionBadges, {
                                        accountId: sourceId || null,
                                        onEditAccount: onEditAccount
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                            control: form.control,
                            name: "source_account_id",
                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                                        groups: getAccountGroups("source"),
                                                        value: field.value ?? undefined,
                                                        onValueChange: (val)=>{
                                                            field.onChange(val || undefined); // Use undefined instead of null to fix lint
                                                            // BẬP BÊNH logic: Selecting source clears target if standard mode
                                                            if (val && !isSpecialMode && targetId) {
                                                                form.setValue("target_account_id", undefined);
                                                            }
                                                        },
                                                        placeholder: sourcePlaceholder,
                                                        hideTriggerBadge: true,
                                                        hideClearButton: true,
                                                        triggerClassName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-11 border-slate-200 transition-all duration-300", isIncomeFlow && "opacity-40 border-dashed bg-slate-50 grayscale", field.value && "border-rose-100 shadow-sm ring-1 ring-rose-50"),
                                                        className: "w-full",
                                                        onAddNew: onAddNewAccount,
                                                        addLabel: "Account"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    field.value && !isIncomeFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            // Use form.setValue with full options to ensure RHF re-renders all watchers
                                                            form.setValue("source_account_id", null, {
                                                                shouldDirty: true,
                                                                shouldTouch: true,
                                                                shouldValidate: false
                                                            });
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Switched to ${personId ? 'REPAYMENT' : 'INCOME'} mode`);
                                                        },
                                                        className: "flex h-11 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:text-slate-700",
                                                        "aria-label": "Clear source account",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                            lineNumber: 346,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                            lineNumber: 305,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                            lineNumber: 351,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                            lineNumber: 300,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5 z-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[10px] font-black uppercase tracking-wider block transition-colors", isExpenseFlow ? "text-slate-200" : "text-emerald-500"),
                                    children: "Deposit To (Đến)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                    lineNumber: 360,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-7 min-w-[124px] items-center justify-end",
                                    children: !isExpenseFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountActionBadges, {
                                        accountId: targetId || null,
                                        onEditAccount: onEditAccount
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                            lineNumber: 359,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                            control: form.control,
                            name: "target_account_id",
                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                                        groups: getAccountGroups("target"),
                                                        value: field.value ?? undefined,
                                                        onValueChange: (val)=>{
                                                            field.onChange(val || undefined);
                                                            // BẬP BÊNH logic: Selecting target clears source if standard mode
                                                            if (val && !isSpecialMode && sourceId) {
                                                                form.setValue("source_account_id", undefined);
                                                            }
                                                        },
                                                        placeholder: targetPlaceholder,
                                                        hideTriggerBadge: true,
                                                        hideClearButton: true,
                                                        triggerClassName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-11 border-slate-200 transition-all duration-300", isExpenseFlow && "opacity-40 border-dashed bg-slate-50 grayscale", field.value && "border-emerald-100 shadow-sm ring-1 ring-emerald-50"),
                                                        className: "w-full",
                                                        onAddNew: onAddNewAccount,
                                                        addLabel: "Account"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 21
                                                    }, void 0),
                                                    field.value && !isExpenseFlow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            // Use form.setValue with full options to ensure RHF re-renders all watchers
                                                            form.setValue("target_account_id", null, {
                                                                shouldDirty: true,
                                                                shouldTouch: true,
                                                                shouldValidate: false
                                                            });
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(`Switched to ${personId ? 'DEBT' : 'EXPENSE'} mode`);
                                                        },
                                                        className: "flex h-11 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:text-slate-700",
                                                        "aria-label": "Clear target account",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                            lineNumber: 424,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                                lineNumber: 384,
                                                columnNumber: 19
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                            lineNumber: 383,
                                            columnNumber: 17
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                                    lineNumber: 382,
                                    columnNumber: 15
                                }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                            lineNumber: 378,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
                    lineNumber: 358,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
            lineNumber: 275,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_s(AccountSelector, "hL61f146ezNBJuAu7OdP0ExL9xY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c1 = AccountSelector;
var _c, _c1;
__turbopack_context__.k.register(_c, "AccountActionBadges");
__turbopack_context__.k.register(_c1, "AccountSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SplitBillSection",
    ()=>SplitBillSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/collapsible.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/combobox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/smart-amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$person$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/person-avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
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
function SplitBillSection({ people, forceShow = false }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { fields, append, remove, replace } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control: form.control,
        name: "participants"
    });
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const transactionType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "amount"
    });
    const participants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "participants"
    }) || [];
    const personId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "person_id"
    });
    const totalSplit = participants.reduce((sum, participant)=>sum + (participant.amount || 0), 0);
    const remainder = (amount || 0) - totalSplit;
    const shouldShow = forceShow || !!personId || [
        "expense",
        "debt"
    ].includes(transactionType);
    const isExpanded = isOpen || participants.length > 0;
    const peopleOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SplitBillSection.useMemo[peopleOptions]": ()=>people.map({
                "SplitBillSection.useMemo[peopleOptions]": (person)=>({
                        value: person.id,
                        label: person.name,
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$person$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersonAvatar"], {
                            name: person.name,
                            imageUrl: person.image_url,
                            size: "sm"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this)
                    })
            }["SplitBillSection.useMemo[peopleOptions]"])
    }["SplitBillSection.useMemo[peopleOptions]"], [
        people
    ]);
    const handleAddPerson = ()=>{
        append({
            person_id: "",
            amount: 0
        });
        setIsOpen(true);
    };
    const handleSplitEqually = ()=>{
        if (participants.length === 0 || !amount) return;
        const count = participants.length;
        const share = Math.floor(amount / count);
        const leftover = amount - share * count;
        replace(participants.map((participant, index)=>({
                ...participant,
                amount: index === 0 ? share + leftover : share
            })));
    };
    const handleDistributeRemainder = ()=>{
        if (!amount || participants.length === 0) return;
        const currentClaimed = participants.reduce((sum, participant)=>sum + (participant.amount || 0), 0);
        const remaining = amount - currentClaimed;
        if (remaining <= 0) return;
        const emptyIndexes = participants.map((participant, index)=>({
                participant,
                index
            })).filter(({ participant })=>!participant.amount);
        if (emptyIndexes.length === 0) return;
        const share = Math.floor(remaining / emptyIndexes.length);
        const dust = remaining - share * emptyIndexes.length;
        const nextParticipants = participants.map((participant)=>({
                ...participant
            }));
        emptyIndexes.forEach(({ index }, itemIndex)=>{
            nextParticipants[index].amount = itemIndex === 0 ? share + dust : share;
        });
        replace(nextParticipants);
    };
    if (!shouldShow) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                className: "h-4 w-4 text-slate-500"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                lineNumber: 128,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-sm font-medium text-slate-700",
                                        children: "Split Bill"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                        lineNumber: 130,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-slate-500",
                                        children: "Keep people and shares in sync with the form."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                        lineNumber: 133,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                lineNumber: 129,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                        lineNumber: 127,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative cursor-pointer",
                        onClick: (event)=>{
                            if (!amount && !isExpanded) {
                                event.preventDefault();
                                event.stopPropagation();
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please input amount to split with people", {
                                    position: "top-right",
                                    className: "bg-rose-500 text-white font-black text-[10px] uppercase tracking-widest border-none shadow-xl"
                                });
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                            checked: isExpanded,
                            onCheckedChange: (checked)=>{
                                setIsOpen(checked);
                                if (checked) {
                                    if (fields.length === 0) append({
                                        person_id: "",
                                        amount: 0
                                    });
                                } else {
                                    form.setValue("participants", [], {
                                        shouldDirty: true
                                    });
                                }
                            },
                            disabled: !amount && !isExpanded,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(!amount && !isExpanded && "pointer-events-none")
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                            lineNumber: 152,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                        lineNumber: 138,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                lineNumber: 126,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
                open: isExpanded,
                onOpenChange: setIsOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                    className: "space-y-3 pt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between px-1 text-xs text-slate-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Total: ",
                                        new Intl.NumberFormat().format(amount || 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                    lineNumber: 171,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium", remainder < 0 ? "text-red-600" : remainder > 0 ? "text-orange-600" : "text-green-600"),
                                    children: [
                                        "Remaining: ",
                                        new Intl.NumberFormat().format(remainder)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                    lineNumber: 172,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                            lineNumber: 170,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: fields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid flex-1 grid-cols-[minmax(0,1fr)_132px] gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: `participants.${index}.person_id`,
                                                    render: ({ field: personField })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            className: "w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                                                    items: peopleOptions,
                                                                    value: personField.value || undefined,
                                                                    onValueChange: (value)=>personField.onChange(value || ""),
                                                                    placeholder: "Person",
                                                                    className: "h-10 w-full",
                                                                    addLabel: "Person"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                                    lineNumber: 196,
                                                                    columnNumber: 53
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                                lineNumber: 195,
                                                                columnNumber: 49
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 45
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: `participants.${index}.amount`,
                                                    render: ({ field: amountField })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            className: "w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                                    value: amountField.value || 0,
                                                                    onChange: (value)=>amountField.onChange(value || 0),
                                                                    hideLabel: true,
                                                                    className: "h-10 font-medium",
                                                                    placeholder: "0",
                                                                    compact: true,
                                                                    hideCalculator: true
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                                    lineNumber: 217,
                                                                    columnNumber: 53
                                                                }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 49
                                                            }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 45
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                            lineNumber: 189,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ()=>remove(index),
                                            className: "h-10 w-10 shrink-0 text-slate-400 hover:text-red-500",
                                            type: "button",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                                lineNumber: 239,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                            lineNumber: 232,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, field.id, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                    lineNumber: 188,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                            lineNumber: 186,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    size: "sm",
                                    onClick: handleAddPerson,
                                    className: "h-9 flex-1 border-dashed",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                            lineNumber: 253,
                                            columnNumber: 29
                                        }, this),
                                        "Add Person"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                    lineNumber: 246,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: handleSplitEqually,
                                    className: "h-9 text-xs text-blue-600",
                                    disabled: !amount || fields.length === 0,
                                    children: "Split Equally"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                    lineNumber: 256,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: handleDistributeRemainder,
                                    className: "h-9 text-xs text-orange-600",
                                    disabled: !amount || fields.length === 0 || remainder <= 0,
                                    children: "Distribute Rem."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                                    lineNumber: 266,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                            lineNumber: 245,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                    lineNumber: 169,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx",
        lineNumber: 125,
        columnNumber: 9
    }, this);
}
_s(SplitBillSection, "fN6JRtpu61zlt9ogZRa16AGxImw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = SplitBillSection;
var _c;
__turbopack_context__.k.register(_c, "SplitBillSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstallmentSelector",
    ()=>InstallmentSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/combobox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$20590b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:20590b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$installments$2f$create$2d$installment$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/installments/create-installment-dialog.tsx [app-client] (ecmascript)");
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
function InstallmentSelector({ forceShow = false }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const isInstallment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "is_installment"
    });
    const transactionType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "type"
    });
    const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "amount"
    });
    const note = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "note"
    });
    const [installments, setInstallments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Unified fetch on mount to decide visibility and populate list
    const fetchInstallments = async ()=>{
        setLoading(true);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$20590b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getActiveInstallments"])();
            setInstallments(data);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InstallmentSelector.useEffect": ()=>{
            fetchInstallments();
        }
    }["InstallmentSelector.useEffect"], []);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Only show for Expense, Repayment, Credit Pay, Income, or Debt
    const shouldShowByType = forceShow || [
        'expense',
        'repayment',
        'credit_pay',
        'income',
        'debt'
    ].includes(transactionType);
    // Don't show if type doesn't match
    if (!shouldShowByType) return null;
    const installmentGroups = [
        {
            label: "Active Plans",
            items: installments.map((inst)=>({
                    value: inst.id,
                    label: `${inst.name} (${new Intl.NumberFormat('en-US').format(inst.monthly_amount)}/mo)`
                }))
        }
    ];
    const isIncomeType = transactionType === 'income';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                    className: "w-4 h-4 text-indigo-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-black text-slate-700 uppercase tracking-widest block",
                                        children: isIncomeType ? "Plan Repayment" : "Installment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[8px] text-slate-400 font-bold uppercase tracking-widest",
                                        children: isIncomeType ? "Debt Settlement" : "Plan Payment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                            control: form.control,
                            name: "is_installment",
                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                    className: "flex items-center space-x-2 space-y-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                            checked: field.value,
                                            onCheckedChange: field.onChange,
                                            className: "data-[state=checked]:bg-indigo-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                            lineNumber: 93,
                                            columnNumber: 37
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                        lineNumber: 92,
                                        columnNumber: 33
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                    lineNumber: 91,
                                    columnNumber: 29
                                }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                        lineNumber: 86,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, this),
            isInstallment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-in fade-in slide-in-from-top-2 duration-300 space-y-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: "installment_plan_id",
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                        className: "text-[9px] font-black text-slate-400 uppercase tracking-wider block",
                                        children: isIncomeType ? "Link to Plan (Repay)" : "Link to Plan (Pay)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                        lineNumber: 113,
                                        columnNumber: 37
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                    lineNumber: 112,
                                    columnNumber: 33
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                                groups: installmentGroups,
                                                value: field.value || undefined,
                                                onValueChange: field.onChange,
                                                placeholder: isIncomeType ? "Which plan are they paying?" : "Pick an installment plan",
                                                className: "w-full h-11 bg-slate-50/50 border-slate-200 rounded-xl",
                                                isLoading: loading,
                                                onAddNew: !isIncomeType ? ()=>setIsCreateDialogOpen(true) : undefined,
                                                addLabel: "Manual Plan"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                                lineNumber: 119,
                                                columnNumber: 41
                                            }, void 0),
                                            !isIncomeType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$installments$2f$create$2d$installment$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateInstallmentDialog"], {
                                                open: isCreateDialogOpen,
                                                onOpenChange: setIsCreateDialogOpen,
                                                initialData: {
                                                    name: note || "",
                                                    totalAmount: amount || 0
                                                },
                                                trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hidden"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 58
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                                lineNumber: 130,
                                                columnNumber: 45
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                        lineNumber: 118,
                                        columnNumber: 37
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                    lineNumber: 117,
                                    columnNumber: 33
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                                    lineNumber: 142,
                                    columnNumber: 33
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                            lineNumber: 111,
                            columnNumber: 29
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                    lineNumber: 107,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
                lineNumber: 106,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx",
        lineNumber: 71,
        columnNumber: 9
    }, this);
}
_s(InstallmentSelector, "INxeaQKfANLJ+bFy/KvcmBva9oM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = InstallmentSelector;
var _c;
__turbopack_context__.k.register(_c, "InstallmentSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuickCashbackInput",
    ()=>QuickCashbackInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Percent$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/percent.js [app-client] (ecmascript) <export default as Percent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/smart-amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cycle-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
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
function QuickCashbackInput({ index, accounts }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const basePath = `rows.${index}`;
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: `${basePath}.cashback_mode`
    });
    const percent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: `${basePath}.cashback_share_percent`
    });
    const fixed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: `${basePath}.cashback_share_fixed`
    });
    const globalDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: 'occurred_at'
    });
    const rowSourceAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: `${basePath}.source_account_id`
    });
    const defaultSourceAccountId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: 'default_source_account_id'
    });
    const effectiveSourceAccountId = rowSourceAccountId || defaultSourceAccountId;
    let cycleInfo = null;
    if (effectiveSourceAccountId && globalDate) {
        const acc = accounts?.find((a)=>a.id === effectiveSourceAccountId);
        if (acc?.credit_card_info?.statement_day) {
            cycleInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cycle$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateStatementCycle"])(new Date(globalDate), acc.credit_card_info.statement_day);
        }
    }
    // Helper to get display text
    const getButtonLabel = ()=>{
        if (mode === 'none_back') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-400",
            children: "Add Cashback"
        }, void 0, false, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 48,
            columnNumber: 42
        }, this);
        if (mode === 'percent') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-amber-700 font-medium",
            children: [
                percent,
                "% Back"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 49,
            columnNumber: 40
        }, this);
        if (mode === 'fixed') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-amber-700 font-medium",
            children: "Fix Back"
        }, void 0, false, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 50,
            columnNumber: 38
        }, this);
        if (mode === 'real_percent') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-green-600 font-medium",
            children: [
                "Real ",
                percent,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 51,
            columnNumber: 45
        }, this);
        if (mode === 'real_fixed') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-green-600 font-medium",
            children: "Real Fix"
        }, void 0, false, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 52,
            columnNumber: 43
        }, this);
        if (mode === 'voluntary') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-blue-600 font-medium",
            children: "Voluntary"
        }, void 0, false, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 53,
            columnNumber: 42
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "Cashback"
        }, void 0, false, {
            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
            lineNumber: 54,
            columnNumber: 16
        }, this);
    };
    // Derive active Tab from mode
    const getTabFromMode = (m)=>{
        if ([
            'real_percent',
            'real_fixed'
        ].includes(m)) return 'real';
        if (m === 'voluntary') return 'voluntary';
        return 'virtual'; // 'none_back', 'percent', 'fixed'
    };
    const currentTab = getTabFromMode(mode);
    // Handle tab switching default values
    const handleTabChange = (val)=>{
        if (val === 'virtual') form.setValue(`${basePath}.cashback_mode`, 'percent');
        if (val === 'real') form.setValue(`${basePath}.cashback_mode`, 'real_percent');
        if (val === 'voluntary') form.setValue(`${basePath}.cashback_mode`, 'voluntary');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 px-2 text-xs w-[110px] justify-center transition-all", mode === 'none_back' && "border border-dashed text-slate-500 hover:bg-slate-50", mode.includes('percent') && "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200", (mode.includes('real') || mode === 'real_fixed') && "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200", mode === 'voluntary' && "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"),
                    children: getButtonLabel()
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                className: "w-80 p-0 shadow-lg border-slate-100",
                align: "end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2 border-b bg-slate-50 flex justify-between items-center rounded-t-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold text-slate-700",
                                children: "Cashback"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                lineNumber: 93,
                                columnNumber: 21
                            }, this),
                            cycleInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium border border-blue-200",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleInfo.start, "dd/MM"),
                                    " - ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleInfo.end, "dd/MM")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                lineNumber: 95,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            value: currentTab,
                            onValueChange: handleTabChange,
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "grid w-full grid-cols-3 h-9 bg-slate-100 p-1 rounded-lg mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "virtual",
                                            className: "text-[10px] h-7 px-0 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500",
                                            children: "Virtual"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 103,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "real",
                                            className: "text-[10px] h-7 px-0 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500",
                                            children: "Real"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 104,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "voluntary",
                                            className: "text-[10px] h-7 px-0 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500",
                                            children: "Voluntary"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 105,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this),
                                (currentTab === 'virtual' || currentTab === 'real') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: `${basePath}.cashback_share_percent`,
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                            className: "text-[10px] font-semibold text-slate-500",
                                                                            children: "% Rate"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                            lineNumber: 118,
                                                                            columnNumber: 53
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-slate-400",
                                                                            children: "Max: 10%"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                            lineNumber: 119,
                                                                            columnNumber: 53
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                    lineNumber: 117,
                                                                    columnNumber: 49
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                            type: "number",
                                                                            placeholder: "0",
                                                                            ...field,
                                                                            onChange: (e)=>{
                                                                                const val = Math.min(Number(e.target.value), 10);
                                                                                field.onChange(val);
                                                                                if (currentTab === 'virtual') form.setValue(`${basePath}.cashback_mode`, 'percent');
                                                                                if (currentTab === 'real') form.setValue(`${basePath}.cashback_mode`, 'real_percent');
                                                                            },
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pr-6 h-8 text-xs text-right", mode.includes('percent') ? "border-amber-500 ring-1 ring-amber-500" : "")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                            lineNumber: 122,
                                                                            columnNumber: 53
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$percent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Percent$3e$__["Percent"], {
                                                                            className: "absolute right-2 top-2 h-3.5 w-3.5 text-muted-foreground"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                            lineNumber: 137,
                                                                            columnNumber: 53
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 49
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 116,
                                                            columnNumber: 45
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: `${basePath}.cashback_share_fixed`,
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                            className: "text-[10px] font-semibold text-slate-500",
                                                                            children: "Fixed"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                            lineNumber: 149,
                                                                            columnNumber: 53
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-slate-400",
                                                                            children: "Max: 33"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                            lineNumber: 150,
                                                                            columnNumber: 53
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                    lineNumber: 148,
                                                                    columnNumber: 49
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                                    value: field.value ?? 0,
                                                                    onChange: (val)=>{
                                                                        const safeVal = Math.min(val || 0, 33);
                                                                        field.onChange(safeVal);
                                                                        if (safeVal > 0) {
                                                                            if (currentTab === 'virtual') form.setValue(`${basePath}.cashback_mode`, 'fixed');
                                                                            if (currentTab === 'real') form.setValue(`${basePath}.cashback_mode`, 'real_fixed');
                                                                        }
                                                                    },
                                                                    placeholder: "0",
                                                                    hideLabel: true,
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 text-xs", mode.includes('fixed') ? "border-amber-500 ring-1 ring-amber-500" : "")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                    lineNumber: 152,
                                                                    columnNumber: 49
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 147,
                                                            columnNumber: 45
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 111,
                                            columnNumber: 33
                                        }, this),
                                        cycleInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-slate-50 p-2 rounded text-[10px] text-slate-500 mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 176,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: "Info"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "Cycle: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono bg-white px-1 border rounded relative group cursor-help",
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleInfo.start, 'dd/MM'),
                                                                " - ",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleInfo.end, 'dd/MM'),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none mb-1 z-50",
                                                                    children: [
                                                                        "Statement Date: ",
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(cycleInfo.end, 'dd/MM/yyyy')
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                                    lineNumber: 181,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 51
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 174,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                    lineNumber: 110,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-3 border-t border-slate-100 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-[10px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "Match Policy:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-slate-700",
                                                            children: "Legacy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 196,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-[10px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-500",
                                                            children: "Applied Rate:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium bg-slate-50 px-1 rounded text-slate-700",
                                                            children: "10%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 200,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-[10px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-600 font-medium",
                                                            children: "Budget Left:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-amber-600 font-bold",
                                                            children: "294,900"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 204,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 195,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-md border border-slate-100 bg-slate-50/50 p-2 space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 37
                                                        }, this),
                                                        " Policy Details"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-y-1 text-[10px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400",
                                                            children: "Summary:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-right font-medium text-slate-600",
                                                            children: "Virtual • 10.0%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400",
                                                            children: "Source:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-right font-medium text-slate-600",
                                                            children: "Auto-Policy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-slate-400",
                                                            children: "Reason:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-right font-medium text-slate-600",
                                                            children: "Legacy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-1 mt-1 border-t border-slate-200 flex justify-between text-[10px] text-amber-600",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Min Spend:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "333 / 3,000,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 211,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                    lineNumber: 193,
                                    columnNumber: 25
                                }, this),
                                currentTab === 'voluntary' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                    control: form.control,
                                    name: `${basePath}.cashback_share_fixed`,
                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                        className: "text-[10px] font-semibold text-slate-500",
                                                        children: "Contribution"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 45
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 41
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                                    value: field.value ?? 0,
                                                    onChange: field.onChange,
                                                    placeholder: "Enter amount...",
                                                    hideLabel: true,
                                                    className: "h-8 text-xs"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 41
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-slate-400 mt-1",
                                                    children: "Tracked but not deducted from total."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 41
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                            lineNumber: 236,
                                            columnNumber: 37
                                        }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                                    lineNumber: 232,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
                lineNumber: 90,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, this);
}
_s(QuickCashbackInput, "B0xymoI8LF22Dmw/Jr+LCe/62+g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = QuickCashbackInput;
var _c;
__turbopack_context__.k.register(_c, "QuickCashbackInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkTransactionRow",
    ()=>BulkTransactionRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.js [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$clearable$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/clearable-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/smart-amount-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/combobox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$bulk$2d$mode$2f$quick$2d$cashback$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/bulk-mode/quick-cashback-input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$person$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/person-avatar.tsx [app-client] (ecmascript)");
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
function BulkTransactionRow({ index, onRemove, shops, accounts, people, onAddNewAccount, onAddNewPerson }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const basePath = `rows.${index}`;
    const shopOptions = shops.map((s)=>({
            value: s.id,
            label: s.name,
            icon: s.image_url ? // eslint-disable-next-line @next/next/no-img-element
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: s.image_url,
                alt: s.name,
                className: "w-4 h-4 object-contain rounded-md"
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"], {
                className: "w-4 h-4 text-slate-400"
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this)
        }));
    const peopleOptions = people.map((p)=>({
            value: p.id,
            label: p.name,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$person$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersonAvatar"], {
                name: p.name,
                imageUrl: p.image_url,
                size: "sm"
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 48,
                columnNumber: 15
            }, this)
        }));
    const creditAccounts = accounts.filter((a)=>a.type === 'credit_card');
    const cashAccounts = accounts.filter((a)=>a.type !== 'credit_card' && a.type !== 'debt');
    // Prepare Groups for Account Combobox
    const accountGroups = [
        {
            label: "Credit Cards",
            items: creditAccounts.map((a)=>({
                    value: a.id,
                    label: a.name,
                    icon: a.image_url ? // eslint-disable-next-line @next/next/no-img-element
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: a.image_url,
                        alt: "",
                        className: "w-4 h-4 object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                        lineNumber: 63,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                        className: "w-4 h-4 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this)
                }))
        },
        {
            label: "Cash / Bank",
            items: cashAccounts.map((a)=>({
                    value: a.id,
                    label: a.name,
                    icon: a.image_url ? // eslint-disable-next-line @next/next/no-img-element
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: a.image_url,
                        alt: "",
                        className: "w-4 h-4 object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                        lineNumber: 76,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                        className: "w-4 h-4 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                        lineNumber: 78,
                        columnNumber: 21
                    }, this)
                }))
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2 items-center p-2 border rounded-lg bg-white hover:bg-slate-50 transition-colors group h-[52px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-[140px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: `${basePath}.shop_id`,
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            className: "space-y-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                        items: shopOptions,
                                        value: field.value,
                                        onValueChange: (val)=>field.onChange(val),
                                        placeholder: "Merchant...",
                                        className: "h-9 text-sm",
                                        inputPlaceholder: "Search merchant...",
                                        emptyState: "No merchant found.",
                                        onAddNew: ()=>console.log("Add new merchant"),
                                        addLabel: "Merchant"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                        lineNumber: 95,
                                        columnNumber: 33
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 94,
                                    columnNumber: 29
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {
                                    className: "text-[10px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 107,
                                    columnNumber: 29
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                            lineNumber: 93,
                            columnNumber: 25
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 89,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[120px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: `${basePath}.person_id`,
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            className: "space-y-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                        items: peopleOptions,
                                        value: field.value,
                                        onValueChange: (val)=>field.onChange(val),
                                        placeholder: "Person...",
                                        className: "h-9 text-sm",
                                        inputPlaceholder: "Search person...",
                                        emptyState: "No person found.",
                                        onAddNew: onAddNewPerson,
                                        addLabel: "Person"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                        lineNumber: 121,
                                        columnNumber: 33
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 120,
                                    columnNumber: 29
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {
                                    className: "text-[10px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 133,
                                    columnNumber: 29
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                            lineNumber: 119,
                            columnNumber: 25
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[180px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: `${basePath}.amount`,
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            className: "space-y-0 relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$smart$2d$amount$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartAmountInput"], {
                                    value: field.value,
                                    onChange: field.onChange,
                                    placeholder: "0",
                                    className: "h-9 text-sm font-medium space-y-0",
                                    hideLabel: true,
                                    hideCurrencyText: false
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 147,
                                    columnNumber: 33
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                lineNumber: 146,
                                columnNumber: 29
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                            lineNumber: 145,
                            columnNumber: 25
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 141,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 140,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-[100px] hidden sm:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: `${basePath}.note`,
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            className: "space-y-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$clearable$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClearableInput"], {
                                    ...field,
                                    value: field.value ?? "",
                                    placeholder: "Note...",
                                    className: "h-9 text-sm text-muted-foreground",
                                    onClear: ()=>field.onChange("")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 169,
                                    columnNumber: 33
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                lineNumber: 168,
                                columnNumber: 29
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                            lineNumber: 167,
                            columnNumber: 25
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 163,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[130px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                    control: form.control,
                    name: `${basePath}.source_account_id`,
                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                            className: "space-y-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$combobox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Combobox"], {
                                    groups: accountGroups,
                                    value: field.value,
                                    onValueChange: field.onChange,
                                    onAddNew: onAddNewAccount,
                                    addLabel: "Account",
                                    placeholder: "Account",
                                    className: "h-9 text-xs"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                    lineNumber: 190,
                                    columnNumber: 33
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                                lineNumber: 189,
                                columnNumber: 29
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                            lineNumber: 188,
                            columnNumber: 25
                        }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 184,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 183,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$bulk$2d$mode$2f$quick$2d$cashback$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickCashbackInput"], {
                    index: index,
                    accounts: accounts
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 207,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 206,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity",
                onClick: ()=>onRemove(index),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                    className: "w-4 h-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                    lineNumber: 218,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
                lineNumber: 211,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx",
        lineNumber: 85,
        columnNumber: 9
    }, this);
}
_s(BulkTransactionRow, "/yGPYa8sRNoCP6WoK/+E/Mno1Ks=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"]
    ];
});
_c = BulkTransactionRow;
var _c;
__turbopack_context__.k.register(_c, "BulkTransactionRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkInputSection",
    ()=>BulkInputSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subMonths.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$bulk$2d$mode$2f$bulk$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/bulk-mode/bulk-row.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/calendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$number$2d$to$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/number-to-text.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
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
function BulkInputSection({ shops, accounts, people, onAddNewAccount, onAddNewPerson }) {
    _s();
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const { fields, append, remove } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"])({
        control: form.control,
        name: "rows"
    });
    // Calculate totals
    const rows = form.watch("rows");
    const totalAmount = rows?.reduce((sum, row)=>sum + (row.amount || 0), 0) || 0;
    const rowCount = rows?.length || 0;
    // Sync Tag with Date
    const occurredAt = form.watch("occurred_at");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BulkInputSection.useEffect": ()=>{
            if (occurredAt) {
                form.setValue("tag", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(occurredAt, "yyyy-MM"));
            }
        }
    }["BulkInputSection.useEffect"], [
        occurredAt,
        form
    ]);
    // Initial row if empty
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BulkInputSection.useEffect": ()=>{
            if (fields.length === 0) {
                append({
                    id: crypto.randomUUID(),
                    amount: 0,
                    cashback_mode: 'none_back',
                    is_expanded: false
                });
            }
        }
    }["BulkInputSection.useEffect"], [
        fields.length,
        append
    ]);
    const addRow = ()=>{
        append({
            id: crypto.randomUUID(),
            amount: 0,
            cashback_mode: 'none_back',
            is_expanded: false
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-slate-50 border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                control: form.control,
                                name: "occurred_at",
                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                        className: "flex flex-col",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "outline",
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-[130px] pl-3 text-left font-normal h-9 bg-white text-xs", !field.value && "text-muted-foreground"),
                                                            children: [
                                                                field.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(field.value, "dd/MM/yyyy") : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Pick a date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                    lineNumber: 100,
                                                                    columnNumber: 53
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                                    className: "ml-auto h-3 w-3 opacity-50"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                    lineNumber: 102,
                                                                    columnNumber: 49
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 45
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 41
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 37
                                                }, void 0),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                    className: "w-auto p-0",
                                                    align: "start",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Calendar"], {
                                                        mode: "single",
                                                        selected: field.value,
                                                        onSelect: field.onChange,
                                                        disabled: (date)=>date > new Date() || date < new Date("1900-01-01"),
                                                        initialFocus: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 41
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 37
                                                }, void 0)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                            lineNumber: 87,
                                            columnNumber: 33
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                lineNumber: 82,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 max-w-[150px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                    control: form.control,
                                    name: "tag",
                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                        className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 41
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            placeholder: "Tag...",
                                                            className: "pl-8 pr-8 w-full h-9 bg-white text-xs",
                                                            ...field,
                                                            value: field.value || ''
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                            lineNumber: 132,
                                                            columnNumber: 45
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                        lineNumber: 131,
                                                        columnNumber: 41
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                                    asChild: true,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        type: "button",
                                                                        variant: "ghost",
                                                                        size: "icon",
                                                                        className: "h-6 w-6 text-slate-400 hover:text-blue-600 transition-colors",
                                                                        title: "Recent Tags",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                            lineNumber: 151,
                                                                            columnNumber: 57
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                        lineNumber: 144,
                                                                        columnNumber: 53
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 49
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                                    className: "w-40 p-1",
                                                                    align: "end",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col gap-0.5",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] font-semibold text-slate-500 px-2 py-1 bg-slate-50 rounded-sm mb-1",
                                                                                children: "Recent Cycles"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                lineNumber: 156,
                                                                                columnNumber: 57
                                                                            }, void 0),
                                                                            Array.from({
                                                                                length: 3
                                                                            }).map((_, i)=>{
                                                                                const date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMonths$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMonths"])(new Date(), i);
                                                                                const tag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM");
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    onClick: ()=>field.onChange(tag),
                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs px-2 py-1.5 rounded-sm hover:bg-slate-100 text-left transition-colors flex items-center justify-between group", field.value === tag && "bg-blue-50 text-blue-600 font-medium hover:bg-blue-100"),
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            children: tag
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                            lineNumber: 172,
                                                                                            columnNumber: 69
                                                                                        }, void 0),
                                                                                        field.value === tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                            lineNumber: 173,
                                                                                            columnNumber: 93
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, tag, true, {
                                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                    lineNumber: 163,
                                                                                    columnNumber: 65
                                                                                }, void 0);
                                                                            }),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-px bg-slate-100 my-1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                lineNumber: 177,
                                                                                columnNumber: 57
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    const currentDate = form.getValues('occurred_at') || new Date();
                                                                                    field.onChange((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(currentDate, "yyyy-MM"));
                                                                                },
                                                                                className: "text-xs px-2 py-1.5 rounded-sm hover:bg-slate-100 text-left text-slate-500 hover:text-slate-800 flex items-center gap-1.5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                                        className: "h-3 w-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                        lineNumber: 186,
                                                                                        columnNumber: 61
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: "Sync Date"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                        lineNumber: 187,
                                                                                        columnNumber: 61
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                                lineNumber: 178,
                                                                                columnNumber: 57
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                        lineNumber: 155,
                                                                        columnNumber: 53
                                                                    }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                                    lineNumber: 154,
                                                                    columnNumber: 49
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 45
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                        lineNumber: 141,
                                                        columnNumber: 41
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                lineNumber: 129,
                                                columnNumber: 37
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                            lineNumber: 128,
                                            columnNumber: 33
                                        }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 w-px bg-slate-200 mx-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                lineNumber: 199,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-sm text-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Rows: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-slate-900",
                                                children: rowCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                lineNumber: 202,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                        lineNumber: 202,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2",
                                        children: [
                                            "Total: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "text-slate-900",
                                                children: new Intl.NumberFormat('vi-VN').format(totalAmount)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                                lineNumber: 203,
                                                columnNumber: 55
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                        lineNumber: 203,
                                        columnNumber: 25
                                    }, this),
                                    totalAmount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500 italic ml-1",
                                        children: [
                                            "(",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$number$2d$to$2d$text$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readMoney"])(totalAmount),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                        lineNumber: 205,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                lineNumber: 201,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        type: "button",
                        onClick: addRow,
                        className: "gap-1 h-8 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                lineNumber: 213,
                                columnNumber: 21
                            }, this),
                            " Add Row"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                        lineNumber: 212,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-2",
                children: [
                    fields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$bulk$2d$mode$2f$bulk$2d$row$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BulkTransactionRow"], {
                            index: index,
                            onRemove: remove,
                            shops: shops,
                            accounts: accounts,
                            people: people,
                            onAddNewAccount: onAddNewAccount,
                            onAddNewPerson: onAddNewPerson
                        }, field.id, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                            lineNumber: 220,
                            columnNumber: 21
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: addRow,
                        className: "border-2 border-dashed border-slate-200 rounded-lg p-4 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-5 h-5 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                                lineNumber: 236,
                                columnNumber: 21
                            }, this),
                            " Add another transaction"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                        lineNumber: 232,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
                lineNumber: 218,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_s(BulkInputSection, "sBSiPXmY3IzoBTgGt/1eiqBSbTU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldArray"]
    ];
});
_c = BulkInputSection;
var _c;
__turbopack_context__.k.register(_c, "BulkInputSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnsavedChangesDialog",
    ()=>UnsavedChangesDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)");
"use client";
;
;
function UnsavedChangesDialog({ open, onOpenChange, onConfirm, onCancel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                            children: "Unsaved Changes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                            children: "You have unsaved changes. Are you sure you want to discard them?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
                            lineNumber: 32,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                            onClick: onCancel,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                            onClick: onConfirm,
                            className: "bg-red-600 hover:bg-red-700",
                            children: "Discard Changes"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
                            lineNumber: 38,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_c = UnsavedChangesDialog;
var _c;
__turbopack_context__.k.register(_c, "UnsavedChangesDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionSlideV2",
    ()=>TransactionSlideV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$category$2d$shop$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/category-shop-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/schema.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$81e0ca__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:81e0ca [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$607edf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:607edf [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$cd5ba2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/actions/data:cd5ba2 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$b98823__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:b98823 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$bf6e18__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:bf6e18 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$9b0111__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:9b0111 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$00652b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/services/data:00652b [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$type$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/type-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$amount$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/amount-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$basic$2d$info$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/basic-info-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$account$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/account-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$split$2d$bill$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/split-bill-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$installment$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/single-mode/installment-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$bulk$2d$mode$2f$bulk$2d$input$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/bulk-mode/bulk-input-section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tag.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/month-tag.ts [app-client] (ecmascript)");
// Dialogs
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$accounts$2f$v2$2f$AccountSlideV2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/accounts/v2/AccountSlideV2.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$accounts$2f$v2$2f$CategorySlide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/accounts/v2/CategorySlide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$quick$2d$people$2d$settings$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/moneyflow/quick-people-settings-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$people$2f$create$2d$person$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/people/create-person-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shops$2f$ShopSlide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shops/ShopSlide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$unsaved$2d$changes$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/transaction/slide-v2/unsaved-changes-dialog.tsx [app-client] (ecmascript)");
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
;
;
function formatVndNumber(value) {
    return new Intl.NumberFormat("vi-VN").format(Math.round(value));
}
function stripFeeMarkers(note) {
    return (note || "").replace(/\s*#Fee=[\d.,]+\s*/g, " ").replace(/\s*\(\s*[\d.,]+\s*\|\s*Fee:\s*[\d.,]+\s*\)\s*/g, " ").replace(/\s{2,}/g, " ").trim();
}
function upsertFeeNote(note, principal, fee) {
    const cleaned = stripFeeMarkers(note || "");
    if (!fee || fee <= 0) return cleaned;
    const marker = `(${formatVndNumber(principal)} | Fee: ${formatVndNumber(fee)})`;
    return cleaned ? `${cleaned} ${marker}` : marker;
}
function normalizeLookup(value) {
    if (!value) return null;
    const normalized = value.trim().toLowerCase();
    return normalized || null;
}
function resolveCategoryOptionId(value, categories, fallbacks = []) {
    const candidates = [
        value,
        ...fallbacks
    ].map(normalizeLookup).filter((candidate)=>Boolean(candidate));
    if (candidates.length === 0) return value ?? null;
    for (const candidate of candidates){
        const matched = categories.find((category)=>{
            const categoryId = normalizeLookup(category.id);
            const categorySlug = normalizeLookup(category.slug ?? null);
            const categoryName = normalizeLookup(category.name);
            return categoryId === candidate || categorySlug === candidate || categoryName === candidate;
        });
        if (matched) return matched.id;
    }
    return value ?? null;
}
function resolveShopOptionId(value, shops, fallbacks = []) {
    const candidates = [
        value,
        ...fallbacks
    ].map(normalizeLookup).filter((candidate)=>Boolean(candidate));
    if (candidates.length === 0) return value ?? null;
    for (const candidate of candidates){
        const matched = shops.find((shop)=>{
            const shopId = normalizeLookup(shop.id);
            const shopName = normalizeLookup(shop.name);
            return shopId === candidate || shopName === candidate;
        });
        if (matched) return matched.id;
    }
    return value ?? null;
}
function TransactionSlideV2({ open, onOpenChange, mode: initialMode = "single", initialData, editingId, operationMode = "add", accounts, categories, people, shops, onSuccess, onHasChanges, onBackButtonClick, onSubmissionStart, onSubmissionEnd }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingEdit, setIsLoadingEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasChanges, setHasChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Dialog States
    const [isAccountDialogOpen, setIsAccountDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accountToEdit, setAccountToEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPeopleDialogOpen, setIsPeopleDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCreatePersonDialogOpen, setIsCreatePersonDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isShopDialogOpen, setIsShopDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Category Auto-Refresh State
    const [isLoadingCategories, setIsLoadingCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localCategories, setLocalCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(categories);
    const [isLoadingShops, setIsLoadingShops] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localShops, setLocalShops] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(shops);
    const isConfigReloading = isLoadingCategories || isLoadingShops;
    // Sync localCategories and localShops with prop changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            setLocalCategories(categories);
        }
    }["TransactionSlideV2.useEffect"], [
        categories
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            setLocalShops(shops);
        }
    }["TransactionSlideV2.useEffect"], [
        shops
    ]);
    // Unsaved Changes Dialog State
    const [showUnsavedDialog, setShowUnsavedDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingClose, setPendingClose] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isEditingContext = Boolean(editingId || initialData || operationMode !== "add");
    // DEBUG: Verify schemas are defined
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (open) {
                console.log("🔍 TransactionSlideV2 Schema Check:", {
                    single: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTransactionSchema"],
                    bulk: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkTransactionSchema"]
                });
            }
        }
    }["TransactionSlideV2.useEffect"], [
        open
    ]);
    // Get default values based on initialData - memoized to prevent infinite loops
    const defaultFormValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TransactionSlideV2.useMemo[defaultFormValues]": ()=>{
            const resolveCategoryId = {
                "TransactionSlideV2.useMemo[defaultFormValues].resolveCategoryId": (catId)=>{
                    if (!catId) return null;
                    const matched = localCategories.find({
                        "TransactionSlideV2.useMemo[defaultFormValues].resolveCategoryId.matched": (c)=>c.id === catId || c.slug === catId
                    }["TransactionSlideV2.useMemo[defaultFormValues].resolveCategoryId.matched"]);
                    return matched?.id ?? catId;
                }
            }["TransactionSlideV2.useMemo[defaultFormValues].resolveCategoryId"];
            const resolveShopId = {
                "TransactionSlideV2.useMemo[defaultFormValues].resolveShopId": (shopId)=>{
                    if (!shopId) return null;
                    const matched = localShops.find({
                        "TransactionSlideV2.useMemo[defaultFormValues].resolveShopId.matched": (s)=>s.id === shopId
                    }["TransactionSlideV2.useMemo[defaultFormValues].resolveShopId.matched"]);
                    return matched?.id ?? shopId;
                }
            }["TransactionSlideV2.useMemo[defaultFormValues].resolveShopId"];
            console.log("🎨 defaultFormValues computed:");
            console.log("   initialData:", initialData);
            console.log("   operationMode:", operationMode);
            if (initialData) {
                // MF5.5: Check if we should override type based on initialData
                let type = initialData.type || "expense";
                // If we have both accounts, it's likely a transfer (even if not explicitly set)
                if (!initialData.type && initialData.source_account_id && initialData.target_account_id) {
                    type = "transfer";
                }
                // Duplicate logic: set occurred_at to now (note stays clean - badge shown in table)
                let note = initialData.note ?? "";
                let occurredAt = initialData.occurred_at || new Date();
                if (operationMode === "duplicate") {
                    occurredAt = new Date(); // Always now for duplicates
                // Do NOT append #Clone to note - the table shows a CLONE badge instead
                }
                const isIncome = type === "income" || type === "repayment";
                const candidateTag = initialData.tag ?? initialData.debt_cycle_tag ?? initialData.persisted_cycle_tag ?? null;
                const normalizedInitialTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isYYYYMM"])(String(candidateTag || "").trim()) ? String(candidateTag).trim() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTag"])(occurredAt ? new Date(occurredAt) : new Date());
                const values = {
                    type,
                    category_id: resolveCategoryId(initialData.category_id),
                    occurred_at: occurredAt,
                    amount: Math.round(Math.abs(initialData.amount ?? 0)),
                    note: note,
                    source_account_id: isIncome ? null : initialData.source_account_id ?? null,
                    target_account_id: isIncome ? initialData.source_account_id ?? initialData.target_account_id ?? null : initialData.target_account_id ?? null,
                    shop_id: resolveShopId(initialData.shop_id),
                    person_id: initialData.person_id ?? null,
                    tag: normalizedInitialTag,
                    cashback_mode: initialData.cashback_mode || "none_back",
                    cashback_share_percent: typeof initialData.cashback_share_percent === "number" ? initialData.cashback_share_percent * 100 : null,
                    cashback_share_fixed: initialData.cashback_share_fixed ?? null,
                    ui_is_cashback_expanded: initialData.ui_is_cashback_expanded ?? false,
                    is_installment: initialData.is_installment ?? false,
                    metadata: initialData.metadata ?? null,
                    ui_quantity: initialData.metadata?.quantity ? Number(initialData.metadata.quantity) : null,
                    ui_market_price: initialData.metadata?.market_price ? Number(initialData.metadata.market_price) : null,
                    service_fee: initialData.service_fee ?? (initialData.metadata?.service_fee ? Number(initialData.metadata.service_fee) : null)
                };
                console.log("   ✅ Using initialData values:", values);
                return values;
            }
            console.log("   ℹ️ No initialData - using defaults");
            // MF5.5: Default logic for blank new transaction
            const defaultValues = {
                type: "expense",
                category_id: null,
                occurred_at: new Date(),
                amount: 0,
                note: "",
                source_account_id: null,
                cashback_mode: "percent",
                ui_is_cashback_expanded: false,
                target_account_id: null,
                shop_id: null,
                person_id: null,
                tag: null,
                cashback_share_percent: null,
                cashback_share_fixed: null,
                is_installment: false,
                metadata: null,
                ui_quantity: null,
                ui_market_price: null,
                service_fee: null
            };
            return defaultValues;
        }
    }["TransactionSlideV2.useMemo[defaultFormValues]"], [
        initialData,
        accounts,
        operationMode
    ]);
    // --- Helper for safe schema resolution ---
    // Wraps zodResolver in a try-catch to prevent "Cannot read properties of undefined" crashes
    const safeResolver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TransactionSlideV2.useCallback[safeResolver]": (schema, name)=>{
            return ({
                "TransactionSlideV2.useCallback[safeResolver]": async (values, context, options)=>{
                    try {
                        // 1. Basic Schema Validation
                        if (!schema || typeof schema.safeParse !== "function") {
                            const msg = `🚨 CRITICAL ERROR: ${name} schema is invalid or undefined! Type: ${typeof schema}`;
                            console.error(msg);
                            return {
                                values: values,
                                errors: {}
                            };
                        }
                        // 2. Safe Execution
                        try {
                            const resolver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(schema);
                            return await resolver(values, context, options);
                        } catch (e) {
                            console.error("Zod Resolver inner crash:", e);
                            return {
                                values: values,
                                errors: {}
                            };
                        }
                    } catch (error) {
                        // 3. Crash Prevention
                        const msg = `🚨 CRASH CAUGHT: Resolver failed for ${name}`;
                        console.error(msg, error);
                        // If it's the specific "_zod" error, log it clearly
                        if (error instanceof TypeError && error.message.includes("_zod")) {
                            console.error("⚠️ This looks like a Zod/HookForm version mismatch or malformed schema issue.");
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$cd5ba2__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logErrorToServer"])(msg, {
                            error: String(error)
                        });
                        // Return valid empty result to keep form alive
                        return {
                            values: values,
                            errors: {}
                        };
                    }
                }
            })["TransactionSlideV2.useCallback[safeResolver]"];
        }
    }["TransactionSlideV2.useCallback[safeResolver]"], []);
    // DEBUG: Verify schemas are defined
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (open) {
                const status = {
                    single: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTransactionSchema"],
                    bulk: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkTransactionSchema"],
                    initialData: !!initialData
                };
                console.log("🔍 TransactionSlideV2 Schema Check:", status);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$607edf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logToServer"])("TransactionSlideV2 Open - Schema Check", status);
            }
        }
    }["TransactionSlideV2.useEffect"], [
        open,
        initialData
    ]);
    // --- Single Transaction Form ---
    const singleForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: safeResolver(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleTransactionSchema"], "singleTransactionSchema"),
        defaultValues: defaultFormValues
    });
    const { isDirty: isSingleDirty } = singleForm.formState;
    const cashbackPercentWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "cashback_share_percent"
    });
    const cashbackFixedWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "cashback_share_fixed"
    });
    // --- Bulk Transaction Form ---
    const bulkForm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: safeResolver(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$schema$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bulkTransactionSchema"], "bulkTransactionSchema"),
        defaultValues: {
            rows: [],
            occurred_at: new Date(),
            default_source_account_id: accounts[0]?.id || ""
        }
    });
    const onAddNewAccount = ()=>{
        setAccountToEdit(null);
        setIsAccountDialogOpen(true);
    };
    const onAddNewPerson = ()=>{
        setIsCreatePersonDialogOpen(true);
    };
    const onAddNewShop = ()=>{
        setIsShopDialogOpen(true);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            const hasCashbackInput = Boolean(cashbackPercentWatch || cashbackFixedWatch);
            if (isEditingContext && hasCashbackInput && !singleForm.getValues("ui_is_cashback_expanded")) {
                singleForm.setValue("ui_is_cashback_expanded", true);
            }
        }
    }["TransactionSlideV2.useEffect"], [
        cashbackPercentWatch,
        cashbackFixedWatch,
        isEditingContext,
        singleForm
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (!open || !isEditingContext) return;
            singleForm.setValue("ui_is_cashback_expanded", true, {
                shouldDirty: false,
                shouldTouch: false
            });
        }
    }["TransactionSlideV2.useEffect"], [
        open,
        isEditingContext,
        singleForm
    ]);
    const { isDirty: isBulkDirty } = bulkForm.formState;
    // Watch transaction type to sync with category creation
    const txnType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "type"
    });
    const categoryDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TransactionSlideV2.useMemo[categoryDefaults]": ()=>{
            // Map transaction type to category defaults
            // Lend (debt) and Repay (repayment) suggest Internal kind
            // Income/Expense suggest External kind
            // Transfer/Credit Pay suggest Internal kind
            switch(txnType){
                case "income":
                    return {
                        type: "income",
                        kind: "external"
                    };
                case "repayment":
                    return {
                        type: "income",
                        kind: "internal"
                    };
                case "debt":
                    return {
                        type: "expense",
                        kind: "internal"
                    };
                case "transfer":
                case "credit_pay":
                    return {
                        type: "transfer",
                        kind: "internal"
                    };
                case "invest":
                    return {
                        type: "expense",
                        kind: "internal"
                    };
                case "expense":
                default:
                    return {
                        type: "expense",
                        kind: "external"
                    };
            }
        }
    }["TransactionSlideV2.useMemo[categoryDefaults]"], [
        txnType
    ]);
    // Reset form when slide opens or initialData changes - optimized to prevent unnecessary resets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (open) {
                console.log("🔄 TransactionSlideV2 RESET TRIGGERED");
                console.log("   - operationMode:", operationMode);
                console.log("   - initialData present:", !!initialData);
                console.log("   - reset values:", defaultFormValues);
                singleForm.reset(defaultFormValues);
                setHasChanges(false);
                onHasChanges?.(false);
            }
        }
    }["TransactionSlideV2.useEffect"], [
        open,
        defaultFormValues
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (!open || !isEditingContext) return;
            const currentCategoryId = singleForm.getValues("category_id");
            const normalizedCategoryId = resolveCategoryOptionId(currentCategoryId, localCategories, [
                initialData?.category_slug,
                initialData?.category_name
            ]);
            if (normalizedCategoryId && normalizedCategoryId !== currentCategoryId && localCategories.some({
                "TransactionSlideV2.useEffect": (category)=>category.id === normalizedCategoryId
            }["TransactionSlideV2.useEffect"])) {
                singleForm.setValue("category_id", normalizedCategoryId, {
                    shouldDirty: false,
                    shouldTouch: false
                });
            }
            const currentShopId = singleForm.getValues("shop_id");
            const normalizedShopId = resolveShopOptionId(currentShopId, localShops, [
                initialData?.shop_name
            ]);
            if (normalizedShopId && normalizedShopId !== currentShopId && localShops.some({
                "TransactionSlideV2.useEffect": (shop)=>shop.id === normalizedShopId
            }["TransactionSlideV2.useEffect"])) {
                singleForm.setValue("shop_id", normalizedShopId, {
                    shouldDirty: false,
                    shouldTouch: false
                });
            }
        }
    }["TransactionSlideV2.useEffect"], [
        open,
        isEditingContext,
        initialData,
        localCategories,
        localShops,
        singleForm
    ]);
    // Watch for bulk form rows
    const bulkRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: bulkForm.control,
        name: "rows"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (mode === "bulk") {
                // In bulk mode, if form is dirty and has rows, we check changes
                const hasBulkChanges = isBulkDirty && bulkRows && bulkRows.length > 0 && bulkRows.some({
                    "TransactionSlideV2.useEffect": (row)=>row.amount > 0 || row.note || row.shop_id
                }["TransactionSlideV2.useEffect"]);
                setHasChanges(hasBulkChanges);
                onHasChanges?.(hasBulkChanges);
            }
        }
    }["TransactionSlideV2.useEffect"], [
        bulkRows,
        mode,
        onHasChanges,
        isBulkDirty
    ]);
    // Removed singleForm and onHasChanges from deps to avoid extra resets if they are stable
    // Note: react-hook-form provides stable identities for reset and the form object usually.
    // Track form changes by comparing with initial values
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (!open) return; // Don't track when closed
            const subscription = singleForm.watch({
                "TransactionSlideV2.useEffect.subscription": (currentValues)=>{
                    // Check if form is actually dirty from user interaction
                    if (!isSingleDirty) {
                        setHasChanges(false);
                        onHasChanges?.(false);
                        return;
                    }
                    // Deep comparison of relevant fields
                    const hasActualChanges = currentValues.type !== defaultFormValues.type || currentValues.amount !== defaultFormValues.amount || currentValues.note !== defaultFormValues.note || currentValues.source_account_id !== defaultFormValues.source_account_id || currentValues.target_account_id !== defaultFormValues.target_account_id || currentValues.category_id !== defaultFormValues.category_id || currentValues.shop_id !== defaultFormValues.shop_id || currentValues.person_id !== defaultFormValues.person_id || currentValues.tag !== defaultFormValues.tag || currentValues.cashback_mode !== defaultFormValues.cashback_mode || currentValues.cashback_share_percent !== defaultFormValues.cashback_share_percent || currentValues.cashback_share_fixed !== defaultFormValues.cashback_share_fixed || currentValues.service_fee !== defaultFormValues.service_fee || currentValues.ui_quantity !== defaultFormValues.ui_quantity || currentValues.ui_market_price !== defaultFormValues.ui_market_price || currentValues.is_installment !== defaultFormValues.is_installment || currentValues.occurred_at?.getTime() !== defaultFormValues.occurred_at?.getTime();
                    setHasChanges(hasActualChanges);
                    onHasChanges?.(hasActualChanges);
                }
            }["TransactionSlideV2.useEffect.subscription"]);
            return ({
                "TransactionSlideV2.useEffect": ()=>subscription.unsubscribe()
            })["TransactionSlideV2.useEffect"];
        }
    }["TransactionSlideV2.useEffect"], [
        open,
        defaultFormValues,
        singleForm,
        onHasChanges,
        isSingleDirty
    ]);
    // Watch for cashback auto-expand and reset special modes when person selected
    const sourceAccId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "source_account_id"
    });
    const targetAccId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "target_account_id"
    });
    const currentTxnType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "type"
    });
    const currentPersonId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control: singleForm.control,
        name: "person_id"
    });
    // MF5.5: Reset Transfer/Pay when person selected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (!open) return;
            if (currentPersonId && (currentTxnType === "transfer" || currentTxnType === "credit_pay")) {
                console.log("👤 Person selected: Resetting special mode...");
                singleForm.setValue("type", "expense", {
                    shouldDirty: true
                });
            }
        }
    }["TransactionSlideV2.useEffect"], [
        currentPersonId,
        currentTxnType,
        open,
        singleForm
    ]);
    // MF5.5: Account selector logic to smartly move IDs when switching flow types
    const prevTypeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (!open) {
                prevTypeRef.current = null;
                return;
            }
            const type = singleForm.getValues("type");
            const sourceId = singleForm.getValues("source_account_id");
            const targetId = singleForm.getValues("target_account_id");
            if (prevTypeRef.current === null) {
                prevTypeRef.current = type;
                return;
            }
            if (prevTypeRef.current !== type) {
                const currentSourceAcc = accounts.find({
                    "TransactionSlideV2.useEffect.currentSourceAcc": (a)=>a.id === sourceId
                }["TransactionSlideV2.useEffect.currentSourceAcc"]);
                const currentTargetAcc = accounts.find({
                    "TransactionSlideV2.useEffect.currentTargetAcc": (a)=>a.id === targetId
                }["TransactionSlideV2.useEffect.currentTargetAcc"]);
                // 1. Logic for switching TO Special Modes (Transfer or Card Pay)
                if (type === "credit_pay") {
                    // Moving CC from source to target for Card Pay
                    if (currentSourceAcc?.type === "credit_card" && !targetId) {
                        console.log("💳 Credit Card Pay: Moving CC from source to target...");
                        singleForm.setValue("target_account_id", sourceId, {
                            shouldDirty: true
                        });
                        // Try to find a bank account for source (Pay From), but ONLY if current source is now the CC we just moved
                        const bankAcc = accounts.find({
                            "TransactionSlideV2.useEffect.bankAcc": (a)=>a.type === "bank"
                        }["TransactionSlideV2.useEffect.bankAcc"]);
                        if (bankAcc) {
                            singleForm.setValue("source_account_id", bankAcc.id, {
                                shouldDirty: true
                            });
                        } else {
                            singleForm.setValue("source_account_id", null, {
                                shouldDirty: true
                            });
                        }
                    }
                } else if (type === "transfer") {
                    // If moving to Transfer and source is a Credit Card, it MUST move to target (Credit Pay logic)
                    // because you can't "transfer" from a CC effectively in this system's context.
                    if (currentSourceAcc?.type === "credit_card") {
                        console.log("🔄 Transfer with CC: Moving CC to target...");
                        singleForm.setValue("target_account_id", sourceId, {
                            shouldDirty: true
                        });
                        singleForm.setValue("source_account_id", null, {
                            shouldDirty: true
                        });
                    }
                } else if ([
                    "credit_pay",
                    "transfer"
                ].includes(prevTypeRef.current) && [
                    "expense",
                    "debt",
                    "income",
                    "repayment"
                ].includes(type)) {
                    // If we had a CC in target, move it back to source for Expense/Debt
                    if (currentTargetAcc?.type === "credit_card" && [
                        "expense",
                        "debt"
                    ].includes(type)) {
                        console.log("🔄 Restoring CC from target back to source...");
                        singleForm.setValue("source_account_id", targetId, {
                            shouldDirty: true
                        });
                        singleForm.setValue("target_account_id", null, {
                            shouldDirty: true
                        });
                    } else if ([
                        "income",
                        "repayment"
                    ].includes(type)) {
                        if (sourceId && !targetId) {
                            singleForm.setValue("target_account_id", sourceId, {
                                shouldDirty: true
                            });
                            singleForm.setValue("source_account_id", null, {
                                shouldDirty: true
                            });
                        }
                    } else if (sourceId && targetId) {
                        if ([
                            "expense",
                            "debt"
                        ].includes(type)) {
                            singleForm.setValue("target_account_id", null, {
                                shouldDirty: true
                            });
                        } else if ([
                            "income",
                            "repayment"
                        ].includes(type)) {
                            singleForm.setValue("source_account_id", null, {
                                shouldDirty: true
                            });
                        }
                    }
                } else if ([
                    "income",
                    "repayment"
                ].includes(type)) {
                    if (sourceId && !targetId) {
                        singleForm.setValue("target_account_id", sourceId, {
                            shouldDirty: true
                        });
                        singleForm.setValue("source_account_id", null, {
                            shouldDirty: true
                        });
                    }
                } else if ([
                    "expense",
                    "debt"
                ].includes(type)) {
                    if (targetId && !sourceId) {
                        singleForm.setValue("source_account_id", targetId, {
                            shouldDirty: true
                        });
                        singleForm.setValue("target_account_id", null, {
                            shouldDirty: true
                        });
                    }
                }
                prevTypeRef.current = type;
            }
        }
    }["TransactionSlideV2.useEffect"], [
        currentTxnType,
        open,
        accounts,
        singleForm
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            // Only auto-expand cashback for new transactions, not edit/duplicate
            if (!open || operationMode === "edit" || operationMode === "duplicate") return;
            const acc = accounts.find({
                "TransactionSlideV2.useEffect.acc": (a)=>a.id === sourceAccId
            }["TransactionSlideV2.useEffect.acc"]);
            const hasCashback = acc && acc.cb_type !== "none";
            if (hasCashback) {
                singleForm.setValue("ui_is_cashback_expanded", true, {
                    shouldDirty: false
                });
                // If it's debt (External Debt tab), auto Give Away
                if (currentTxnType === "debt") {
                    singleForm.setValue("cashback_mode", "real_percent", {
                        shouldDirty: false
                    });
                }
            }
        }
    }["TransactionSlideV2.useEffect"], [
        sourceAccId,
        currentTxnType,
        open,
        operationMode,
        accounts,
        singleForm
    ]);
    // Fetch data if editingId provided but no initialData
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TransactionSlideV2.useEffect": ()=>{
            if (open && editingId && !initialData) {
                setIsLoadingEdit(true);
                __turbopack_context__.A("[project]/src/services/transaction.service.ts [app-client] (ecmascript, async loader)").then({
                    "TransactionSlideV2.useEffect": ({ loadTransactions })=>{
                        loadTransactions({
                            transactionId: editingId,
                            limit: 1
                        }).then({
                            "TransactionSlideV2.useEffect": ([txn])=>{
                                if (txn) {
                                    const isIncome = txn.type === "income" || txn.type === "repayment";
                                    const formVal = {
                                        type: txn.type || "expense",
                                        amount: txn.original_amount ?? Math.abs(txn.amount),
                                        occurred_at: new Date(txn.occurred_at),
                                        note: txn.note || "",
                                        source_account_id: isIncome ? null : txn.account_id,
                                        target_account_id: isIncome ? txn.account_id : txn.target_account_id || null,
                                        category_id: txn.category_id || null,
                                        shop_id: txn.shop_id || null,
                                        person_id: txn.person_id || null,
                                        tag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isYYYYMM"])(String(txn.tag || "").trim()) ? String(txn.tag).trim() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTag"])(new Date(txn.occurred_at)),
                                        cashback_mode: txn.cashback_mode || "none_back",
                                        cashback_share_percent: typeof txn.cashback_share_percent === "number" ? txn.cashback_share_percent * 100 : null,
                                        cashback_share_fixed: txn.cashback_share_fixed || null,
                                        ui_is_cashback_expanded: !!txn.is_installment || !!txn.cashback_mode && txn.cashback_mode !== "none_back",
                                        is_installment: !!txn.is_installment,
                                        service_fee: txn.metadata?.service_fee ? Number(txn.metadata.service_fee) : null,
                                        ui_quantity: txn.metadata?.quantity ? Number(txn.metadata.quantity) : null,
                                        ui_market_price: txn.metadata?.market_price ? Number(txn.metadata.market_price) : null
                                    };
                                    singleForm.reset(formVal);
                                } else {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to load transaction details");
                                }
                                setIsLoadingEdit(false);
                            }
                        }["TransactionSlideV2.useEffect"]).catch({
                            "TransactionSlideV2.useEffect": ()=>{
                                setIsLoadingEdit(false);
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to load transaction");
                            }
                        }["TransactionSlideV2.useEffect"]);
                    }
                }["TransactionSlideV2.useEffect"]);
            }
        }
    }["TransactionSlideV2.useEffect"], [
        open,
        editingId,
        initialData,
        singleForm
    ]);
    const onSingleSubmit = async (data)=>{
        if (!data || Object.keys(data).length === 0 && operationMode !== "add") {
            console.error("❌ CRITICAL: Form data is EMPTY during submit!");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Form data is empty. Please try again.");
            return;
        }
        console.log("✅ onSingleSubmit triggered:", {
            type: data.type,
            category_id: data.category_id,
            account_id: data.source_account_id,
            target_account_id: data.target_account_id,
            amount: data.amount,
            mode: operationMode
        });
        console.log("✅ onSingleSubmit called - Form validation PASSED");
        console.log("📋 Form data raw:", data);
        console.log("🎯 Operation:", operationMode, "| editingId:", editingId);
        console.log("🔀 Will call:", editingId ? "updateTransaction()" : "createTransaction()");
        const effectiveServiceFee = data.type === "income" || data.type === "repayment" ? 0 : Number(data.service_fee) || 0;
        // Auto-Note for Fee: Append "(principal | Fee: fee)" if service_fee exists
        const finalNote = upsertFeeNote(data.note || "", data.amount, effectiveServiceFee);
        const payload = {
            occurred_at: data.occurred_at.toISOString(),
            amount: data.amount + effectiveServiceFee,
            note: finalNote,
            type: data.type,
            // Directional Logic:
            // For Income/Repayment: Money goes TO target_account_id. Service expects principal in source_account_id.
            // For Expense/Debt: Money comes FROM source_account_id.
            // For Transfer/Credit Pay: Both are used.
            source_account_id: (data.type === "income" || data.type === "repayment" ? data.target_account_id || data.source_account_id : data.source_account_id || data.target_account_id) || "",
            target_account_id: data.type === "transfer" || data.type === "credit_pay" ? data.target_account_id : null,
            category_id: data.category_id || null,
            shop_id: data.shop_id || null,
            person_id: data.person_id || null,
            tag: data.tag || "",
            cashback_mode: data.cashback_mode,
            cashback_share_percent: data.cashback_share_percent ? data.cashback_share_percent / 100 : null,
            cashback_share_fixed: data.cashback_share_fixed,
            is_installment: !!data.is_installment,
            installment_plan_id: data.installment_plan_id,
            metadata: {
                ...data.metadata,
                service_fee: effectiveServiceFee || undefined,
                quantity: data.ui_quantity || undefined,
                market_price: data.ui_market_price || undefined
            }
        };
        const resolvedCycleTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$month$2d$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isYYYYMM"])(String(data.tag || "").trim()) ? String(data.tag).trim() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tag$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTag"])(data.occurred_at);
        if (data.type === "debt" || data.type === "repayment") {
            payload.tag = resolvedCycleTag;
            payload.debt_cycle_tag = resolvedCycleTag;
            payload.persisted_cycle_tag = resolvedCycleTag;
            payload.statement_cycle_tag = resolvedCycleTag;
            payload.metadata = {
                ...payload.metadata,
                debt_cycle_tag: resolvedCycleTag,
                persisted_cycle_tag: resolvedCycleTag
            };
        }
        console.log("🚀 Mapped Payload for Service:", payload);
        // UX: Close immediately if handler provided
        if (onSubmissionStart) {
            onSubmissionStart();
        } else {
            setIsSubmitting(true);
        }
        try {
            let success = false;
            let finalTxnId = editingId;
            if (editingId) {
                success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$bf6e18__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateTransaction"])(editingId, payload);
                if (success) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Transaction updated successfully");
                else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update transaction");
            } else {
                const newId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$b98823__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createTransaction"])(payload);
                if (newId) {
                    success = true;
                    finalTxnId = newId;
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Transaction created successfully");
                } else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to create transaction");
            }
            console.log("🎉 Submit success:", success);
            if (success) {
                if (!onSubmissionStart) {
                    setHasChanges(false);
                    onHasChanges?.(false);
                }
                onSuccess?.(finalTxnId ? {
                    id: finalTxnId,
                    ...payload
                } : undefined);
            }
        } catch (error) {
            console.error("❌ Submission error caught:", error);
            console.error("Error details:", {
                message: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            });
            const errorMsg = error instanceof Error ? error.message : String(error);
            if (errorMsg.includes("BATCH_LOCKED:")) {
                const batchId = errorMsg.split("BATCH_LOCKED:")[1]?.trim();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold",
                            children: "Giao dịch Bot Batch"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 967,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs",
                            children: "Không được sửa tại đây để tránh lệch Data."
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 968,
                            columnNumber: 13
                        }, this),
                        batchId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `/batch/detail/${batchId}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "font-bold underline text-indigo-400 mt-1",
                            children: "Mở trang Batch để Unconfirm"
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 972,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                    lineNumber: 966,
                    columnNumber: 11
                }, this), {
                    duration: 8000
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMsg || "An error occurred. Please try again.");
            }
        } finally{
            if (onSubmissionEnd) {
                onSubmissionEnd();
            } else {
                setIsSubmitting(false);
            }
        }
    };
    const onBulkSubmit = async (data)=>{
        setIsSubmitting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$data$3a$81e0ca__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["bulkCreateTransactions"])(data);
            onSuccess?.();
        } catch (error) {
            console.error("Bulk submit failed", error);
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleOpenChange = (newOpen)=>{
        if (!newOpen && hasChanges && !isSubmitting) {
            setPendingClose(true);
            setShowUnsavedDialog(true);
            return;
        }
        // Force reset changes state to allow closing
        if (!newOpen) {
            setHasChanges(false);
        }
        onOpenChange(newOpen);
    };
    const handleConfirmDiscard = ()=>{
        setShowUnsavedDialog(false);
        setHasChanges(false);
        setPendingClose(false);
        onOpenChange(false);
    };
    const handleCancelDiscard = ()=>{
        setShowUnsavedDialog(false);
        setPendingClose(false);
    };
    const handleBackWithCheck = ()=>{
        if (hasChanges) {
            setShowUnsavedDialog(true);
            return;
        }
        onBackButtonClick?.();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                open: open,
                onOpenChange: handleOpenChange,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                    showClose: false,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full p-0 flex flex-col h-full bg-slate-50 transition-all duration-300 ease-in-out z-[500] max-w-screen", mode === "single" ? "sm:max-w-[680px]" : "sm:max-w-[1000px]"),
                    side: "right",
                    onInteractOutside: (e)=>{
                        // Prevent closing if a dialog is open on top
                        if (isAccountDialogOpen || isCategoryDialogOpen || isPeopleDialogOpen) {
                            e.preventDefault();
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border-b px-6 py-4 flex items-center justify-between shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleBackWithCheck,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all", initialData?.metadata?.source === "chatbot" ? "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"),
                                            title: "Back",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                    lineNumber: 1077,
                                                    columnNumber: 17
                                                }, this),
                                                initialData?.metadata?.source === "chatbot" && "Quay lại Chat"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                            lineNumber: 1066,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                            className: "flex items-center gap-2",
                                            children: [
                                                mode === "single" ? operationMode === "duplicate" ? "Duplicate Transaction" : operationMode === "edit" || editingId ? "Edit Transaction" : "New Transaction" : "Bulk Add",
                                                isLoadingEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "animate-spin h-3 w-3",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                    className: "opacity-25",
                                                                    cx: "12",
                                                                    cy: "12",
                                                                    r: "10",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                    lineNumber: 1097,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    className: "opacity-75",
                                                                    fill: "currentColor",
                                                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                    lineNumber: 1105,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                            lineNumber: 1091,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Loading..."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                    lineNumber: 1090,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                            lineNumber: 1081,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1064,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex bg-slate-100 rounded-lg p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setMode("single"),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-1 text-xs font-semibold rounded-md transition-all", mode === "single" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"),
                                            children: "Single"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                            lineNumber: 1119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setMode("bulk"),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-1 text-xs font-semibold rounded-md transition-all", mode === "bulk" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"),
                                            children: "Bulk"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1063,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto bg-slate-50/50 relative",
                            children: [
                                isLoadingEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-50 bg-white/60 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-10 w-10 rounded-xl bg-white shadow-xl flex items-center justify-center border border-slate-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-6 w-6 text-slate-900 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                    lineNumber: 1151,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                lineNumber: 1150,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-slate-900 uppercase tracking-widest animate-pulse",
                                                children: "Loading Details..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                lineNumber: 1153,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                        lineNumber: 1149,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1148,
                                    columnNumber: 15
                                }, this),
                                !isLoadingEdit && isConfigReloading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-40 bg-white/45 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-150 pointer-events-none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 bg-white/90 px-3 py-2 rounded-xl border border-slate-200 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-4 w-4 animate-spin text-indigo-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                lineNumber: 1162,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold text-slate-700 uppercase tracking-wider",
                                                children: "Updating options..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                lineNumber: 1163,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1160,
                                    columnNumber: 15
                                }, this),
                                mode === "single" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-6 py-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormProvider"], {
                                        ...singleForm,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                id: "single-txn-form",
                                                onSubmit: singleForm.handleSubmit(onSingleSubmit, (errors)=>{
                                                    console.error("❌ Form validation FAILED");
                                                    console.error("Validation errors object:", errors);
                                                    console.error("Form state:", {
                                                        isValid: singleForm.formState.isValid,
                                                        isSubmitting: singleForm.formState.isSubmitting,
                                                        errors: singleForm.formState.errors
                                                    });
                                                    console.error("Current form values:", singleForm.getValues());
                                                    console.error("Operation mode:", operationMode, "| editingId:", editingId);
                                                    console.error("Initial data passed:", initialData);
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please fill in all required fields correctly.");
                                                }),
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$type$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TransactionTypeSelector"], {
                                                        accounts: accounts,
                                                        people: people
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                        lineNumber: 1204,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pt-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$account$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountSelector"], {
                                                            accounts: accounts,
                                                            people: people,
                                                            onAddNewAccount: onAddNewAccount,
                                                            onEditAccount: (accountId)=>{
                                                                const account = accounts.find((a)=>a.id === accountId) || null;
                                                                if (!account) {
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Account not found");
                                                                    return;
                                                                }
                                                                setAccountToEdit(account);
                                                                setIsAccountDialogOpen(true);
                                                            },
                                                            onAddNewPerson: onAddNewPerson
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                            lineNumber: 1211,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                        lineNumber: 1210,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-6 pt-6 border-t border-slate-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$basic$2d$info$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BasicInfoSection"], {
                                                                people: people,
                                                                operationMode: operationMode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                lineNumber: 1231,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-slate-200 bg-white shadow-sm p-5 space-y-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$category$2d$shop$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryShopSection"], {
                                                                        shops: localShops,
                                                                        categories: localCategories,
                                                                        onAddNewCategory: ()=>setIsCategoryDialogOpen(true),
                                                                        onAddNewShop: onAddNewShop,
                                                                        isLoadingCategories: isLoadingCategories,
                                                                        isLoadingShops: isLoadingShops,
                                                                        isEditing: isEditingContext
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                        lineNumber: 1237,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$amount$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmountSection"], {
                                                                            accounts: accounts,
                                                                            categories: categories
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                            lineNumber: 1250,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                        lineNumber: 1249,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                lineNumber: 1236,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "rounded-2xl border border-slate-200 bg-white shadow-sm p-4 space-y-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$installment$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstallmentSelector"], {
                                                                        forceShow: isEditingContext
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                        lineNumber: 1258,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$single$2d$mode$2f$split$2d$bill$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SplitBillSection"], {
                                                                        people: people,
                                                                        forceShow: isEditingContext
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                        lineNumber: 1259,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                                lineNumber: 1257,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                        lineNumber: 1230,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                                lineNumber: 1174,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                        lineNumber: 1172,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1171,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormProvider"], {
                                    ...bulkForm,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        id: "bulk-txn-form",
                                        onSubmit: bulkForm.handleSubmit(onBulkSubmit),
                                        className: "flex flex-col min-h-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$bulk$2d$mode$2f$bulk$2d$input$2d$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BulkInputSection"], {
                                            shops: shops,
                                            accounts: accounts,
                                            people: people,
                                            onAddNewAccount: onAddNewAccount,
                                            onAddNewPerson: onAddNewPerson
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                            lineNumber: 1277,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                        lineNumber: 1271,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1270,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white border-t px-6 py-4 shrink-0 flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>handleOpenChange(false),
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    form: mode === "single" ? "single-txn-form" : "bulk-txn-form",
                                    disabled: isSubmitting,
                                    className: "bg-slate-900 hover:bg-slate-800 text-white min-w-[100px]",
                                    children: isSubmitting ? "Saving..." : "Save Transaction"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                                    lineNumber: 1294,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1290,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$accounts$2f$v2$2f$AccountSlideV2$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountSlideV2"], {
                            open: isAccountDialogOpen,
                            onOpenChange: (nextOpen)=>{
                                setIsAccountDialogOpen(nextOpen);
                                if (!nextOpen) setAccountToEdit(null);
                            },
                            account: accountToEdit,
                            allAccounts: accounts,
                            categories: localCategories,
                            zIndex: 900
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1305,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$accounts$2f$v2$2f$CategorySlide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategorySlide"], {
                            open: isCategoryDialogOpen,
                            onOpenChange: setIsCategoryDialogOpen,
                            defaultType: categoryDefaults.type,
                            defaultKind: categoryDefaults.kind,
                            onBack: ()=>setIsCategoryDialogOpen(false),
                            isExternalLoading: isLoadingCategories,
                            onSuccess: async (newCategoryId)=>{
                                if (newCategoryId) {
                                    setIsLoadingCategories(true);
                                    try {
                                        // Fetch updated categories from Supabase
                                        const updatedCategories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$9b0111__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getCategories"])();
                                        setLocalCategories(updatedCategories);
                                        // Auto-select the newly created category
                                        singleForm.setValue("category_id", newCategoryId);
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Category created and selected");
                                        setIsCategoryDialogOpen(false);
                                    } catch (error) {
                                        console.error("Failed to refresh categories:", error);
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Category created but failed to refresh list");
                                        setIsCategoryDialogOpen(false);
                                    } finally{
                                        setIsLoadingCategories(false);
                                    }
                                } else {
                                    setIsCategoryDialogOpen(false);
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$moneyflow$2f$quick$2d$people$2d$settings$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickPeopleSettingsDialog"], {
                            isOpen: isPeopleDialogOpen,
                            onOpenChange: setIsPeopleDialogOpen,
                            people: people
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1350,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$people$2f$create$2d$person$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreatePersonDialog"], {
                            open: isCreatePersonDialogOpen,
                            onOpenChange: setIsCreatePersonDialogOpen,
                            subscriptions: [],
                            accounts: accounts
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1356,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shops$2f$ShopSlide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShopSlide"], {
                            open: isShopDialogOpen,
                            onOpenChange: setIsShopDialogOpen,
                            categories: localCategories,
                            defaultCategoryId: singleForm.getValues("category_id") || undefined,
                            onSuccess: async (newShopId)=>{
                                if (newShopId) {
                                    setIsLoadingShops(true);
                                    try {
                                        const updatedShops = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$data$3a$00652b__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getShops"])();
                                        setLocalShops(updatedShops);
                                        singleForm.setValue("shop_id", newShopId, {
                                            shouldDirty: true
                                        });
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Shop created and selected");
                                    } catch (error) {
                                        console.error("Failed to refresh shops:", error);
                                    } finally{
                                        setIsLoadingShops(false);
                                    }
                                }
                                setIsShopDialogOpen(false);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                            lineNumber: 1363,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                    lineNumber: 1044,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                lineNumber: 1043,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$transaction$2f$slide$2d$v2$2f$unsaved$2d$changes$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UnsavedChangesDialog"], {
                open: showUnsavedDialog,
                onOpenChange: setShowUnsavedDialog,
                onConfirm: handleConfirmDiscard,
                onCancel: handleCancelDiscard
            }, void 0, false, {
                fileName: "[project]/src/components/transaction/slide-v2/transaction-slide-v2.tsx",
                lineNumber: 1391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(TransactionSlideV2, "+0iJ9Q8uKjO2NBt1kdpTGZyoY0Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = TransactionSlideV2;
var _c;
__turbopack_context__.k.register(_c, "TransactionSlideV2");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_transaction_slide-v2_efb00308._.js.map