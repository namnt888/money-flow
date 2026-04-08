"use client"

import { useState, useEffect, KeyboardEvent, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Loader2, 
    Check,
  X, 
  Plus, 
  Hash, 
  Tag, 
  ArrowLeft, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ArrowRightLeft, 
  TrendingUp, 
  PiggyBank,
  Brain,
  Zap,
    Info,
    ChevronDown
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { ShopSlide } from "@/components/shops/ShopSlide"
import { UnsavedChangesDialog } from "@/components/transaction/slide-v2/unsaved-changes-dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Account, Category, Shop } from "@/types/moneyflow.types"
import { createCategory, updateCategory } from "@/services/category.service"
import { cn } from "@/lib/utils"
import { Combobox } from "@/components/ui/combobox"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["expense", "income", "transfer", "investment"]),
    icon: z.string().optional(),
    image_url: z.string().optional(),
    kind: z.enum(["internal", "external"]),
    keywords: z.array(z.string()).optional(),
})

interface CategorySlideProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    category?: Category | null
    defaultType?: "expense" | "income" | "transfer"
    defaultKind?: "internal" | "external"
    onSuccess?: (newCategoryId?: string) => void
    onBack?: () => void
    zIndex?: number
    isExternalLoading?: boolean
    accounts?: Account[]
    shops?: Shop[]
}

export function CategorySlide({
    open,
    onOpenChange,
    category,
    defaultType = "expense",
    defaultKind,
    onSuccess,
    onBack,
    zIndex = 600,
    allCategories = [],
    isExternalLoading = false,
    accounts = [],
    shops = [],
}: CategorySlideProps & { allCategories?: Category[] }) {
    const [isLoading, setIsLoading] = useState(false)
    const combinedLoading = isLoading || isExternalLoading
    const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)
    const [pendingCloseAction, setPendingCloseAction] = useState<"close" | "back" | null>(null)
    const [mccCodes, setMccCodes] = useState<string[]>([])
    const [mccInput, setMccInput] = useState("")
    const [keywords, setKeywords] = useState<string[]>([])
    const [keywordInput, setKeywordInput] = useState("")
    const [linkedAccountIds, setLinkedAccountIds] = useState<string[]>([])
    const [linkedShopIds, setLinkedShopIds] = useState<string[]>([])
    const [isLinkedAccountsOpen, setIsLinkedAccountsOpen] = useState(false)
    const [isLinkedShopsOpen, setIsLinkedShopsOpen] = useState(false)
    const [defaultShopId, setDefaultShopId] = useState<string | undefined>(undefined)

    const [isShopSlideOpen, setIsShopSlideOpen] = useState(false)

    const normalizeStringArray = (value?: string[] | null) =>
        Array.isArray(value) ? [...value].sort() : []

    const isSameStringArray = (left?: string[] | null, right?: string[] | null) => {
        const normalizedLeft = normalizeStringArray(left)
        const normalizedRight = normalizeStringArray(right)
        return JSON.stringify(normalizedLeft) === JSON.stringify(normalizedRight)
    }

    const accountOptions = useMemo(
        () =>
            accounts.map((account) => ({
                value: account.id,
                label: account.name,
                icon: account.image_url ? (
                    <img src={account.image_url} alt={account.name} className="h-4 w-4 object-contain rounded-none" />
                ) : undefined,
            })),
        [accounts],
    )

    const shopOptions = useMemo(
        () =>
            shops.map((shop) => ({
                value: shop.id,
                label: shop.name,
                icon: shop.image_url ? (
                    <img src={shop.image_url} alt={shop.name} className="h-4 w-4 object-contain rounded-none" />
                ) : undefined,
            })),
        [shops],
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: defaultType,
            icon: "",
            image_url: "",
            kind: defaultKind || (defaultType === 'transfer' ? 'internal' : 'external'),
        },
    })

    const hasChanges = form.formState.isDirty || 
        mccCodes.length !== (category?.mcc_codes?.length || 0) || 
        keywords.length !== (category?.keywords?.length || 0) ||
        linkedAccountIds.length !== ((category?.linked_account_ids?.length) || 0) ||
        linkedShopIds.length !== ((category?.linked_shop_ids?.length) || 0) ||
        defaultShopId !== (category?.default_shop_id || null) ||
        (category && JSON.stringify(mccCodes) !== JSON.stringify(category.mcc_codes || [])) || 
        (category && JSON.stringify(keywords) !== JSON.stringify(category.keywords || [])) ||
        (category ? !isSameStringArray(linkedAccountIds, category.linked_account_ids) : linkedAccountIds.length > 0) ||
        (category ? !isSameStringArray(linkedShopIds, category.linked_shop_ids) : linkedShopIds.length > 0) ||
        (category ? (defaultShopId || "") !== (category.default_shop_id || "") : Boolean(defaultShopId)) ||
        mccInput !== "" || keywordInput !== ""

    const handleBack = () => {
        if (hasChanges) {
            setPendingCloseAction("back")
            setShowUnsavedDialog(true)
        } else {
            onBack?.()
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && hasChanges) {
            setPendingCloseAction("close")
            setShowUnsavedDialog(true)
        } else {
            onOpenChange(newOpen)
        }
    }

    const confirmDiscard = () => {
        setShowUnsavedDialog(false)
        if (pendingCloseAction === "back") {
            onBack?.()
        } else {
            onOpenChange(false)
        }
        setPendingCloseAction(null)
    }

    useEffect(() => {
        if (open) {
            if (category) {
                form.reset({
                    name: category.name,
                    type: (category.type as any) || "expense",
                    icon: category.icon || "",
                    image_url: category.image_url || "",
                    kind: (category.kind as any) || (category.type === 'transfer' ? 'internal' : 'external'),
                })
                setMccCodes(Array.isArray(category.mcc_codes) ? category.mcc_codes : [])
                setKeywords(Array.isArray(category.keywords) ? category.keywords : [])
                setLinkedAccountIds(Array.isArray(category.linked_account_ids) ? category.linked_account_ids : [])
                setLinkedShopIds(Array.isArray(category.linked_shop_ids) ? category.linked_shop_ids : [])
                setDefaultShopId(category.default_shop_id || undefined)
            } else {
                form.reset({
                    name: "",
                    type: defaultType,
                    icon: "",
                    image_url: "",
                    kind: defaultKind || (defaultType === 'transfer' ? 'internal' : 'external'),
                })
                setMccCodes([])
                setKeywords([])
                setLinkedAccountIds([])
                setLinkedShopIds([])
                setDefaultShopId(undefined)
            }
            setMccInput("")
            setKeywordInput("")
        }
    }, [category, defaultType, defaultKind, form, open])

    useEffect(() => {
        if (defaultShopId && !linkedShopIds.includes(defaultShopId)) {
            setDefaultShopId(undefined)
        }
    }, [defaultShopId, linkedShopIds])

    const toggleLinkedAccount = (accountId: string) => {
        setLinkedAccountIds((prev) =>
            prev.includes(accountId)
                ? prev.filter((id) => id !== accountId)
                : [...prev, accountId]
        )
    }

    const toggleLinkedShop = (shopId: string) => {
        setLinkedShopIds((prev) =>
            prev.includes(shopId)
                ? prev.filter((id) => id !== shopId)
                : [...prev, shopId]
        )
    }

    const removeLinkedAccount = (accountId: string) => {
        setLinkedAccountIds((prev) => prev.filter((id) => id !== accountId))
    }

    const removeLinkedShop = (shopId: string) => {
        setLinkedShopIds((prev) => prev.filter((id) => id !== shopId))
        if (defaultShopId === shopId) {
            setDefaultShopId(undefined)
        }
    }

    const renderAvatar = (name: string, imageUrl?: string | null) => (
        <div className="h-5 w-5 rounded-sm overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
            {imageUrl ? (
                <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
                <span className="text-[9px] font-black text-slate-400 uppercase">{name[0] || "?"}</span>
            )}
        </div>
    )

    const handleAddMcc = () => {
        const trimmed = mccInput.trim().replace(/[^0-9]/g, "")
        if (trimmed && !mccCodes.includes(trimmed)) {
            setMccCodes([...mccCodes, trimmed])
            setMccInput("")
        } else {
            setMccInput("")
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            handleAddMcc()
        }
    }

    const removeMcc = (code: string) => {
        setMccCodes(mccCodes.filter(c => c !== code))
    }

    const handleAddKeyword = () => {
        const trimmed = keywordInput.trim()
        if (trimmed && !keywords.includes(trimmed)) {
            setKeywords([...keywords, trimmed])
            setKeywordInput("")
        } else {
            setKeywordInput("")
        }
    }

    const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            handleAddKeyword()
        }
    }

    const removeKeyword = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword))
    }

    const addLinkedAccount = (accountId: string | null | undefined) => {
        if (!accountId) return
        if (linkedAccountIds.includes(accountId)) return
        setLinkedAccountIds((prev) => [...prev, accountId])
    }

    const addLinkedShop = (shopId: string | null | undefined) => {
        if (!shopId) return
        if (linkedShopIds.includes(shopId)) return
        setLinkedShopIds((prev) => [...prev, shopId])
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const payload = {
                ...values,
                mcc_codes: mccCodes.length > 0 ? mccCodes : undefined,
                keywords: keywords.length > 0 ? keywords : undefined,
                linked_account_ids: linkedAccountIds.length > 0 ? linkedAccountIds : undefined,
                linked_shop_ids: linkedShopIds.length > 0 ? linkedShopIds : undefined,
                default_shop_id: defaultShopId || undefined,
            }

            if (category) {
                await updateCategory(category.id, payload)
                toast.success("Category updated")
                if (onSuccess) {
                    onSuccess()
                } else {
                    onOpenChange(false)
                }
            } else {
                const newCategory = await createCategory(payload)
                toast.success("Category created")
                if (onSuccess) {
                    onSuccess(newCategory?.id)
                } else {
                    onOpenChange(false)
                }
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Sheet open={open} onOpenChange={handleOpenChange}>
                <SheetContent
                    side="right"
                    className="sm:max-w-[480px] p-0 flex flex-col h-full bg-slate-50 border-l border-slate-200"
                    zIndex={zIndex}
                    onPointerDownOutside={(e) => {
                        if (hasChanges) {
                            e.preventDefault()
                            setPendingCloseAction("close")
                            setShowUnsavedDialog(true)
                        }
                    }}
                    onEscapeKeyDown={(e) => {
                        if (hasChanges) {
                            e.preventDefault()
                            setPendingCloseAction("close")
                            setShowUnsavedDialog(true)
                        }
                    }}
                >
                    {combinedLoading && (
                        <div className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all animate-in fade-in duration-300">
                            <div className="p-8 rounded-3xl bg-white shadow-2xl shadow-blue-100 flex flex-col items-center gap-4 border border-blue-50/50">
                                <div className="relative">
                                    <div className="h-16 w-16 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
                                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-600 animate-pulse" />
                                </div>
                                <div className="space-y-1 text-center">
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">
                                        {isExternalLoading ? "Syncing..." : (category ? "Updating..." : "Creating...")}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 italic">Please wait for synchronization</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <SheetHeader className="px-6 py-6 bg-white border-b sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            {onBack && (
                                <button
                                    onClick={handleBack}
                                    className="h-8 w-8 flex items-center justify-center -ml-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                                    title="Back"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                            )}
                            <div className="min-w-0 flex-1">
                                <SheetTitle className="text-xl font-black text-slate-900 leading-tight">
                                    {category ? "Edit Category" : "New Category"}
                                </SheetTitle>
                                <SheetDescription className="text-xs font-medium text-slate-500 mt-1">
                                    {category ? "Update category details." : "Create a new category for your transactions."}
                                </SheetDescription>
                            </div>
                            {!category && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setIsShopSlideOpen(true)}
                                    className="h-8 text-[10px] font-black uppercase border-dashed hover:bg-slate-50 text-blue-600"
                                >
                                    Add Shop
                                </Button>
                            )}
                        </div>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-none relative">
                        <Form {...form}>
                            <form id="category-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Food & Dining" {...field} className="h-11 bg-white border-slate-200 focus:ring-blue-500 font-bold" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Type</FormLabel>
                                            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                                                {[
                                                    { id: "expense", label: "Expense", icon: ArrowDownLeft, color: "bg-rose-500", activeText: "text-rose-600", activeBg: "bg-rose-50 border-rose-200" },
                                                    { id: "income", label: "Income", icon: ArrowUpRight, color: "bg-emerald-500", activeText: "text-emerald-600", activeBg: "bg-emerald-50 border-emerald-200" },
                                                    { id: "transfer", label: "Transfer", icon: ArrowRightLeft, color: "bg-blue-500", activeText: "text-blue-600", activeBg: "bg-blue-50 border-blue-200" },
                                                    { id: "investment", label: "Invest", icon: TrendingUp, color: "bg-indigo-500", activeText: "text-indigo-600", activeBg: "bg-indigo-50 border-indigo-200" },
                                                ].map((t) => (
                                                    <button
                                                        key={t.id}
                                                        type="button"
                                                        onClick={() => field.onChange(t.id)}
                                                        className={cn(
                                                            "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border shrink-0",
                                                            field.value === t.id
                                                                ? `${t.activeBg} ${t.activeText} shadow-sm z-10`
                                                                : "bg-transparent border-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50"
                                                        )}
                                                    >
                                                        <t.icon className={cn("w-3.5 h-3.5", field.value === t.id ? t.activeText : "text-slate-300")} />
                                                        {t.label}
                                                    </button>
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="kind"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 bg-white shadow-sm transition-all hover:border-slate-300">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-sm font-black text-slate-900">Category Kind</FormLabel>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                                        {field.value === 'external' ? 'External (People, Shops)' : 'Internal (Transfers, Accounts)'}
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={field.value === 'internal'}
                                                    onCheckedChange={(checked) => field.onChange(checked ? 'internal' : 'external')}
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                                            <Zap className="h-3 w-3 text-slate-400" /> Linked Accounts (Auto-fill)
                                        </FormLabel>
                                        {linkedAccountIds.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => setLinkedAccountIds([])}
                                                className="text-[9px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-tighter"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    <Combobox
                                        items={accountOptions}
                                        value={undefined}
                                        onValueChange={(value) => addLinkedAccount(value || null)}
                                        placeholder="Select account to link"
                                        className="w-full h-10 border-slate-200 bg-white"
                                    />

                                    <div className="min-h-[72px] p-3 rounded-xl border border-slate-200 bg-white shadow-inner flex flex-wrap gap-2 content-start">
                                        {linkedAccountIds.length === 0 && (
                                            <span className="text-[10px] text-slate-400 font-semibold">No linked account yet.</span>
                                        )}
                                        {linkedAccountIds.map((accountId) => {
                                            const account = accounts.find((item) => item.id === accountId)
                                            const label = account?.name || accountId
                                            return (
                                                <div
                                                    key={accountId}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 border border-sky-100 rounded-lg text-[11px] font-bold text-sky-700"
                                                >
                                                    {account?.image_url ? (
                                                        <img src={account.image_url} alt={label} className="h-4 w-4 object-contain rounded-none" />
                                                    ) : null}
                                                    <span>{label}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeLinkedAccount(accountId)}
                                                        className="text-sky-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold italic bg-sky-50/50 p-2 rounded-lg border border-sky-100/50">
                                        * TIP: Transaction slide will prioritize this category when selected account matches.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                                            <Tag className="h-3 w-3 text-slate-400" /> Linked Shops (Category {'->'} Shop)
                                        </FormLabel>
                                        {linkedShopIds.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLinkedShopIds([])
                                                    setDefaultShopId(null)
                                                }}
                                                className="text-[9px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-tighter"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    <Combobox
                                        items={shopOptions}
                                        value={undefined}
                                        onValueChange={(value) => addLinkedShop(value || null)}
                                        placeholder="Select shop to link"
                                        className="w-full h-10 border-slate-200 bg-white"
                                    />

                                    <div className="min-h-[72px] p-3 rounded-xl border border-slate-200 bg-white shadow-inner flex flex-wrap gap-2 content-start">
                                        {linkedShopIds.length === 0 && (
                                            <span className="text-[10px] text-slate-400 font-semibold">No linked shop yet.</span>
                                        )}
                                        {linkedShopIds.map((shopId) => {
                                            const shop = shops.find((item) => item.id === shopId)
                                            const label = shop?.name || shopId
                                            const isDefault = defaultShopId === shopId
                                            return (
                                                <div
                                                    key={shopId}
                                                    className={cn(
                                                        "flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[11px] font-bold cursor-pointer",
                                                        isDefault
                                                            ? "bg-amber-50 border-amber-200 text-amber-700"
                                                            : "bg-violet-50 border-violet-100 text-violet-700",
                                                    )}
                                                    onClick={() => setDefaultShopId(shopId)}
                                                    title={isDefault ? "Default shop" : "Click to set as default"}
                                                >
                                                    {shop?.image_url ? (
                                                        <img src={shop.image_url} alt={label} className="h-4 w-4 object-contain rounded-none" />
                                                    ) : null}
                                                    <span>{label}</span>
                                                    {isDefault && <span className="text-[9px] uppercase">default</span>}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeLinkedShop(shopId)}
                                                        className="text-violet-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border border-amber-200/70 bg-amber-50/50 px-3 py-2">
                                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">
                                            {defaultShopId
                                                ? `Default Shop: ${shops.find((shop) => shop.id === defaultShopId)?.name || defaultShopId}`
                                                : "Default Shop: Not selected"}
                                        </p>
                                        {defaultShopId && (
                                            <button
                                                type="button"
                                                onClick={() => setDefaultShopId(null)}
                                                className="text-[9px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-tighter"
                                            >
                                                Clear Default
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold italic bg-violet-50/50 p-2 rounded-lg border border-violet-100/50">
                                        * TIP: When account resolves to this category, transaction slide will suggest default/linked shop first.
                                    </p>
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                        <div className="h-4 w-4 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">✨</div>
                                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Appearance</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="icon"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Icon (Emoji)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="🍔" {...field} value={field.value || ""} className="h-11 bg-white border-slate-200 text-lg" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="image_url"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Image URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://..." {...field} value={field.value || ""} className="h-11 bg-white border-slate-200 text-xs" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="image_url"
                                        render={({ field }) => (
                                            <FormItem className="space-y-0">
                                                {field.value ? (
                                                    <div className="mt-2 flex justify-center bg-slate-50 p-2 rounded-xl border border-slate-100 border-dashed">
                                                        <div className="relative h-24 w-24 rounded-xl overflow-hidden border-2 border-white shadow-md ring-1 ring-slate-100">

                                                            <img
                                                                src={field.value}
                                                                alt="Preview"
                                                                className="h-full w-full object-cover"
                                                                onError={(e) => e.currentTarget.style.display = 'none'}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-2 flex justify-center bg-slate-50 p-2 rounded-xl border border-slate-100 border-dashed">
                                                        <div className="h-24 w-24 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200">
                                                            <div className="text-3xl grayscale opacity-50">{form.watch('icon') || '✨'}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                        <div className="h-4 w-4 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">🔗</div>
                                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Linked Entities</h3>
                                    </div>

                                    <div className="space-y-2">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Linked Accounts</FormLabel>
                                        <Popover open={isLinkedAccountsOpen} onOpenChange={setIsLinkedAccountsOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-10 w-full justify-between bg-white border-slate-200 text-slate-700"
                                                >
                                                    <span className="truncate text-xs font-bold">
                                                        {linkedAccountIds.length > 0
                                                            ? `${linkedAccountIds.length} linked account${linkedAccountIds.length > 1 ? "s" : ""} selected`
                                                            : "Select linked accounts"}
                                                    </span>
                                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[420px] p-0 [overscroll-behavior:contain]"
                                                align="start"
                                                onWheel={(e) => e.stopPropagation()}
                                            >
                                                <Command>
                                                    <CommandInput placeholder="Search accounts..." />
                                                    <CommandList
                                                        className="max-h-64 overflow-y-auto [overscroll-behavior:contain]"
                                                        onWheel={(e) => e.stopPropagation()}
                                                    >
                                                        <CommandEmpty>No account found</CommandEmpty>
                                                        {accounts.map((account) => {
                                                            const selected = linkedAccountIds.includes(account.id)
                                                            return (
                                                                <CommandItem
                                                                    key={account.id}
                                                                    value={account.name}
                                                                    onSelect={() => toggleLinkedAccount(account.id)}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <span className={cn(
                                                                        "h-4 w-4 rounded border flex items-center justify-center",
                                                                        selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                                                                    )}>
                                                                        {selected && <Check className="h-3 w-3" />}
                                                                    </span>
                                                                    {renderAvatar(account.name, account.image_url)}
                                                                    <span className="truncate text-sm">{account.name}</span>
                                                                </CommandItem>
                                                            )
                                                        })}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <div className="min-h-8 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                                            {linkedAccountIds.length === 0 ? (
                                                <span className="text-[10px] text-slate-400">No linked accounts selected</span>
                                            ) : linkedAccountIds.map((id) => {
                                                const account = accounts.find((item) => item.id === id)
                                                const accountName = account?.name || id
                                                return (
                                                    <Badge key={id} variant="secondary" className="h-6 px-2 gap-1.5 bg-blue-50 text-blue-700 border border-blue-100">
                                                        {renderAvatar(accountName, account?.image_url)}
                                                        <span className="max-w-[140px] truncate">{accountName}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLinkedAccount(id)}
                                                            className="text-blue-400 hover:text-rose-500 transition-colors"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Linked Shops</FormLabel>
                                        <Popover open={isLinkedShopsOpen} onOpenChange={setIsLinkedShopsOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-10 w-full justify-between bg-white border-slate-200 text-slate-700"
                                                >
                                                    <span className="truncate text-xs font-bold">
                                                        {linkedShopIds.length > 0
                                                            ? `${linkedShopIds.length} linked shop${linkedShopIds.length > 1 ? "s" : ""} selected`
                                                            : "Select linked shops"}
                                                    </span>
                                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[420px] p-0 [overscroll-behavior:contain]"
                                                align="start"
                                                onWheel={(e) => e.stopPropagation()}
                                            >
                                                <Command>
                                                    <CommandInput placeholder="Search shops..." />
                                                    <CommandList
                                                        className="max-h-64 overflow-y-auto [overscroll-behavior:contain]"
                                                        onWheel={(e) => e.stopPropagation()}
                                                    >
                                                        <CommandEmpty>No shop found</CommandEmpty>
                                                        {shops
                                                            .filter((shop) => !shop.is_archived)
                                                            .map((shop) => {
                                                                const selected = linkedShopIds.includes(shop.id)
                                                                return (
                                                                    <CommandItem
                                                                        key={shop.id}
                                                                        value={shop.name}
                                                                        onSelect={() => toggleLinkedShop(shop.id)}
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        <span className={cn(
                                                                            "h-4 w-4 rounded border flex items-center justify-center",
                                                                            selected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white"
                                                                        )}>
                                                                            {selected && <Check className="h-3 w-3" />}
                                                                        </span>
                                                                        {renderAvatar(shop.name, shop.image_url)}
                                                                        <span className="truncate text-sm">{shop.name}</span>
                                                                    </CommandItem>
                                                                )
                                                            })}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <div className="min-h-8 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                                            {linkedShopIds.length === 0 ? (
                                                <span className="text-[10px] text-slate-400">No linked shops selected</span>
                                            ) : linkedShopIds.map((id) => {
                                                const shop = shops.find((item) => item.id === id)
                                                const shopName = shop?.name || id
                                                return (
                                                    <Badge key={id} variant="secondary" className="h-6 px-2 gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                        {renderAvatar(shopName, shop?.image_url)}
                                                        <span className="max-w-[140px] truncate">{shopName}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLinkedShop(id)}
                                                            className="text-emerald-400 hover:text-rose-500 transition-colors"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </Badge>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Default Shop</FormLabel>
                                        <Combobox
                                            value={defaultShopId}
                                            onValueChange={setDefaultShopId}
                                            placeholder="Select default shop"
                                            inputPlaceholder="Search shops..."
                                            emptyState="No matching shop"
                                            className="h-10"
                                            items={shops
                                                .filter((shop) => !shop.is_archived && linkedShopIds.includes(shop.id))
                                                .map((shop) => ({
                                                    value: shop.id,
                                                    label: shop.name,
                                                    icon: renderAvatar(shop.name, shop.image_url),
                                                }))}
                                        />
                                        {linkedShopIds.length === 0 && (
                                            <p className="text-[10px] text-slate-400">Select at least one linked shop before setting a default.</p>
                                        )}
                                    </div>
                                </div>

                                {/* MCC Section Enhanced */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                                            <Hash className="h-3 w-3 text-slate-400" /> MCC Codes (Merchants)
                                        </FormLabel>
                                        {mccCodes.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => setMccCodes([])}
                                                className="text-[9px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-tighter"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    <div className="min-h-[120px] p-3 rounded-xl border border-slate-200 bg-white shadow-inner flex flex-wrap gap-2 content-start group focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all cursor-text" onClick={() => document.getElementById('mcc-input')?.focus()}>
                                        {mccCodes.map(code => (
                                            <div
                                                key={code}
                                                onDoubleClick={() => {
                                                    setMccInput(code);
                                                    removeMcc(code);
                                                }}
                                                title="Double-click to edit"
                                                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-black text-slate-700 hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 group/mcc cursor-pointer"
                                            >
                                                <span className="font-mono tracking-wider">{code}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeMcc(code); }}
                                                    className="text-slate-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}

                                        <div className="flex-1 min-w-[80px]">
                                            <Input
                                                id="mcc-input"
                                                value={mccInput}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/[^0-9]/g, "");
                                                    if (val.length <= 4) {
                                                        setMccInput(val);
                                                    }
                                                }}
                                                onKeyDown={handleKeyDown}
                                                onBlur={handleAddMcc}
                                                placeholder={mccCodes.length === 0 ? "Type code (e.g. 5411) & Enter" : "..."}
                                                className="h-7 border-none focus-visible:ring-0 px-0 text-[11px] font-bold placeholder:text-slate-300 bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        * TIP: These codes are used to automatically match credit card rewards tiers based on merchant codes.
                                    </p>
                                </div>

                                {/* Keywords Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                                            <Tag className="h-3 w-3 text-slate-400" /> AI Keywords (Bot Training)
                                        </FormLabel>
                                        {keywords.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => setKeywords([])}
                                                className="text-[9px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-tighter"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>

                                    <div className="min-h-[120px] p-4 rounded-xl border border-slate-200 bg-white shadow-inner flex flex-wrap gap-2 content-start group focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-500 transition-all cursor-text border-dashed" onClick={() => document.getElementById('keyword-input')?.focus()}>
                                        {keywords.map(k => (
                                            <div
                                                key={k}
                                                onDoubleClick={() => {
                                                    setKeywordInput(k);
                                                    removeKeyword(k);
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-100 transition-all hover:scale-105 active:scale-95 group/keyword cursor-pointer"
                                            >
                                                <span>{k}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeKeyword(k); }}
                                                    className="text-emerald-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}

                                        <div className="flex-1 min-w-[120px]">
                                            <Input
                                                id="keyword-input"
                                                value={keywordInput}
                                                onChange={(e) => setKeywordInput(e.target.value)}
                                                onKeyDown={handleKeywordKeyDown}
                                                onBlur={handleAddKeyword}
                                                placeholder={keywords.length === 0 ? "Type keywords (e.g. mua thuốc) & Enter" : "..."}
                                                className="h-7 border-none focus-visible:ring-0 px-0 text-[11px] font-bold placeholder:text-slate-300 bg-transparent"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold italic bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/50">
                                        * TIP: Add Vietnamese keywords to help the AI bot map user queries to this category correctly.
                                    </p>
                                </div>

                            </form>
                        </Form>
                    </div>

                    <SheetFooter className="p-6 bg-white border-t shrink-0">
                        <Button
                            type="submit"
                            form="category-form"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase text-xs tracking-[0.2em] h-12 shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {category ? "Update Category" : "Save Category"}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet >

            <UnsavedChangesDialog
                open={showUnsavedDialog}
                onOpenChange={setShowUnsavedDialog}
                onConfirm={confirmDiscard}
                onCancel={() => {
                    setShowUnsavedDialog(false)
                    setPendingCloseAction(null)
                }}
            />

            <ShopSlide
                open={isShopSlideOpen}
                onOpenChange={setIsShopSlideOpen}
                categories={allCategories}
                onBack={() => setIsShopSlideOpen(false)}
                zIndex={zIndex + 100}
                onSuccess={() => setIsShopSlideOpen(false)}
                defaultCategoryId={category?.id}
            />
        </>
    )
}
