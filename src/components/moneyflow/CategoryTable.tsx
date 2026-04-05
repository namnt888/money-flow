"use client"

import Link from "next/link"
import React, { useState } from 'react'
import { Account, Category, Shop } from "@/types/moneyflow.types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Search, X, Copy, ExternalLink, TrendingUp, TrendingDown, ArrowRightLeft, ArrowUpDown, Archive, ArchiveRestore, Info, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { CustomTooltip } from "@/components/ui/custom-tooltip"

interface CategoryTableProps {
    categories: Category[]
    accounts?: Account[]
    shops?: Shop[]
    onEdit: (category: Category) => void
    activeTab: string
    searchQuery: string
    stats?: Record<string, { total: number; count: number }>
    selectedYear?: number
    onArchive?: (category: Category) => void
    onDelete?: (category: Category) => void
    selectedIds?: Set<string>
    onSelect?: (id: string) => void
    onSelectAll?: (ids: string[]) => void
    className?: string
}

type SortKey = 'name' | 'type' | 'total' | 'linked_account';
type SortDirection = 'asc' | 'desc';

export function CategoryTable({
    categories,
    accounts = [],
    shops = [],
    onEdit,
    activeTab,
    searchQuery,
    stats = {},
    selectedYear,
    onArchive,
    onDelete,
    selectedIds = new Set(),
    onSelect,
    onSelectAll,
    className
}: CategoryTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'linked_account', direction: 'desc' });

    const handleSort = (key: SortKey) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const filteredCategories = categories.filter(cat => {
        const matchesTab = activeTab === "all"
            ? !cat.is_archived
            : activeTab === "transfer"
                ? ((cat.type === "transfer" || cat.name.toLowerCase().includes("transfer")) && !cat.is_archived)
                : activeTab === "archived"
                    ? cat.is_archived
                    : (cat.type === activeTab && !cat.is_archived)

        const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cat.mcc_codes && cat.mcc_codes.some(code => code.includes(searchQuery))) ||
            cat.id.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesTab && matchesSearch
    }).sort((a, b) => {
        const { key, direction } = sortConfig;
        const multiplier = direction === 'asc' ? 1 : -1;

        if (key === 'total') {
            const statA = stats[a.id]?.total || 0;
            const statB = stats[b.id]?.total || 0;
            return (statA - statB) * multiplier;
        }

        if (key === 'name') {
            return a.name.localeCompare(b.name) * multiplier;
        }

        if (key === 'type') {
            return a.type.localeCompare(b.type) * multiplier;
        }

        if (key === 'linked_account') {
            const countA = a.linked_account_ids?.length || 0;
            const countB = b.linked_account_ids?.length || 0;
            if (countA === countB) {
                return a.name.localeCompare(b.name) * multiplier;
            }
            return (countA - countB) * multiplier;
        }

        return 0;
    });

    const internalCategories = filteredCategories.filter(cat => cat.kind === 'internal')
    const externalCategories = filteredCategories.filter(cat => cat.kind !== 'internal')

    const copyToClipboard = (text: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        toast.success("Category ID copied to clipboard");
    };

    const accountMap = new Map(accounts.map((account) => [account.id, account]))
    const shopMap = new Map(shops.map((shop) => [shop.id, shop]))

    const renderLinkedAccounts = (ids?: string[] | null) => {
        if (!ids || ids.length === 0) {
            return <span className="text-[10px] text-slate-300 italic font-medium">-</span>
        }

        const visibleIds = ids.slice(0, 3)
        const hiddenIds = ids.slice(3)

        return (
            <div className="space-y-1 leading-5">
                {visibleIds.map((id) => {
                    const account = accountMap.get(id)
                    const label = account?.name || id
                    return (
                        <Link
                            key={id}
                            href={`/accounts/${id}`}
                            className="flex items-center gap-1.5 rounded-md px-1 py-0.5 hover:bg-blue-50 transition-colors"
                        >
                            <div className="h-5 w-5 rounded-sm overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                                {account?.image_url ? (
                                    <img src={account.image_url} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-[9px] font-black text-slate-400 uppercase">{label[0]}</span>
                                )}
                            </div>
                            <span className="text-[11px] text-slate-700 font-semibold truncate hover:text-blue-700">{label}</span>
                        </Link>
                    )
                })}
                {hiddenIds.length > 0 && (
                    <CustomTooltip
                        content={
                            <div className="max-w-[260px] space-y-1">
                                {hiddenIds.map((id) => {
                                    const account = accountMap.get(id)
                                    const label = account?.name || id
                                    return (
                                        <div key={id} className="flex items-center gap-1.5 text-[11px] text-slate-100">
                                            <span>{label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        side="right"
                    >
                        <button
                            type="button"
                            className="text-[10px] font-black uppercase tracking-wide text-blue-600 hover:text-blue-700"
                        >
                            +{hiddenIds.length} show list
                        </button>
                    </CustomTooltip>
                )}
            </div>
        )
    }

    const renderLinkedShops = (ids?: string[] | null) => {
        if (!ids || ids.length === 0) {
            return <span className="text-[10px] text-slate-300 italic font-medium">-</span>
        }

        const visibleIds = ids.slice(0, 3)
        const hiddenIds = ids.slice(3)

        return (
            <div className="space-y-1 leading-5">
                {visibleIds.map((id) => {
                    const shop = shopMap.get(id)
                    const label = shop?.name || id
                    return (
                        <div key={id} className="flex items-center gap-1.5 rounded-md px-1 py-0.5">
                            <div className="h-5 w-5 rounded-sm overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                                {shop?.image_url ? (
                                    <img src={shop.image_url} alt="" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-[9px] font-black text-slate-400 uppercase">{label[0]}</span>
                                )}
                            </div>
                            <span className="text-[11px] text-slate-700 font-semibold truncate">{label}</span>
                        </div>
                    )
                })}
                {hiddenIds.length > 0 && (
                    <CustomTooltip
                        content={
                            <div className="max-w-[260px] space-y-1">
                                {hiddenIds.map((id) => {
                                    const shop = shopMap.get(id)
                                    const label = shop?.name || id
                                    return (
                                        <div key={id} className="text-[11px] text-slate-100">{label}</div>
                                    )
                                })}
                            </div>
                        }
                        side="right"
                    >
                        <button
                            type="button"
                            className="text-[10px] font-black uppercase tracking-wide text-blue-600 hover:text-blue-700"
                        >
                            +{hiddenIds.length} show list
                        </button>
                    </CustomTooltip>
                )}
            </div>
        )
    }

    const renderRows = (cats: Category[]) => {
        return cats.map((category) => {
            const stat = stats[category.id] || { total: 0, count: 0 };
            const canDelete = stat.count === 0;
            const dbRecordUrl = `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_cat_001&filter=online&sort=-%40rowid&recordId=${category.id}`;

            return (
                <TableRow key={category.id} className={cn(
                    "group hover:bg-slate-50/80 transition-colors border-slate-100",
                    selectedIds.has(category.id) && "bg-blue-50/50 hover:bg-blue-50/80"
                )}>
                    <TableCell className="px-4 py-4 w-10">
                        <div className="flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={selectedIds.has(category.id)}
                                onChange={() => onSelect?.(category.id)}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center bg-slate-100 border border-slate-200">
                                {category.image_url ? (
                                    <img src={category.image_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-lg font-black text-slate-300 uppercase">{category.icon || category.name[0]}</span>
                                )}
                            </div>
                            <CustomTooltip
                                content={
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold">{category.name}</span>
                                        <span className="text-xs text-slate-400 font-mono">{category.id}</span>
                                        <Link href={`/categories/${category.id}`} target="_blank" className="text-[10px] text-blue-400 mt-1 flex items-center gap-1 hover:underline">
                                            Open in new tab <ExternalLink className="h-3 w-3" />
                                        </Link>
                                        <Link href={dbRecordUrl} target="_blank" className="text-[10px] text-indigo-400 flex items-center gap-1 hover:underline">
                                            Open DB record <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </div>
                                }
                                side="right"
                            >
                                <div className="group/link relative flex items-center gap-2 max-w-[300px]">
                                    <Link
                                        href={`/categories/${category.id}`}
                                        target="_blank"
                                        className="flex flex-col min-w-0 hover:opacity-80 transition-opacity hover:underline"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-extrabold text-slate-900 text-sm truncate hover:text-blue-600 transition-colors uppercase tracking-tight">{category.name}</span>
                                            <ExternalLink className="h-3 w-3 text-blue-500/90" />
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider truncate flex items-center gap-1">
                                            {category.id.slice(0, 8)}
                                        </span>
                                    </Link>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={(e) => copyToClipboard(category.id, e)}
                                            className="p-1 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded transition-all"
                                            title="Copy ID"
                                        >
                                            <Copy className="h-3 w-3" />
                                        </button>
                                        <Link
                                            href={dbRecordUrl}
                                            target="_blank"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1 text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded transition-all"
                                            title="Open DB category record"
                                        >
                                            <Database className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            </CustomTooltip>
                        </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                        <div className={cn(
                            "flex items-center gap-2 px-2.5 py-1 rounded-md w-fit border shadow-sm",
                            category.type === 'expense' ? "bg-rose-50 text-rose-700 border-rose-100" :
                                category.type === 'income' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                    "bg-blue-50 text-blue-700 border-blue-100"
                        )}>
                            {category.type === 'expense' && <TrendingDown className="h-3.5 w-3.5" />}
                            {category.type === 'income' && <TrendingUp className="h-3.5 w-3.5" />}
                            {category.type === 'transfer' && <ArrowRightLeft className="h-3.5 w-3.5" />}
                            <span className="text-[10px] font-black uppercase tracking-wider">{category.type}</span>
                        </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                        <span className={cn(
                            "text-sm font-black tracking-tight tabular-nums",
                            stat.total === 0 ? "text-slate-400" :
                                category.type === 'expense' ? "text-rose-600" :
                                    category.type === 'income' ? "text-emerald-600" :
                                        "text-blue-600"
                        )}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.abs(stat.total))}
                        </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-1">
                            <span className={cn(
                                "text-xs font-bold",
                                stat.count > 0 ? "text-slate-600" : "text-slate-300"
                            )}>
                                {stat.count}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold">txns</span>
                        </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 align-top">
                        {renderLinkedAccounts(category.linked_account_ids)}
                    </TableCell>
                    <TableCell className="px-6 py-4 align-top">
                        {renderLinkedShops(category.linked_shop_ids)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                            {category.mcc_codes && category.mcc_codes.length > 0 ? (
                                category.mcc_codes.map(code => (
                                    <Badge key={code} variant="outline" className="text-[13px] font-mono px-1.5 py-0 bg-slate-50 border-slate-200 text-slate-500 font-bold hover:bg-slate-100 transition-colors">
                                        {code}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-[10px] text-slate-300 italic font-medium">-</span>
                            )}
                        </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                            {category.keywords && category.keywords.length > 0 ? (
                                category.keywords.map(kw => (
                                    <Badge key={kw} variant="secondary" className="text-[10px] px-1.5 py-0 bg-emerald-50 border-emerald-100 text-emerald-700 font-black uppercase tracking-tight">
                                        {kw}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-[10px] text-slate-300 italic font-medium">-</span>
                            )}
                        </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                            <CustomTooltip content="Edit Category">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onEdit(category)}
                                    className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm border border-transparent hover:border-blue-100 rounded-lg"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                            </CustomTooltip>

                            {activeTab === 'archived' ? (
                                <>
                                    <CustomTooltip content="Unarchive Category">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onArchive?.(category)}
                                            className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm border border-transparent hover:border-emerald-100 rounded-lg"
                                        >
                                            <ArchiveRestore className="h-4 w-4" />
                                        </Button>
                                    </CustomTooltip>
                                    <CustomTooltip content={canDelete ? "Delete Category" : "Cannot delete category with transactions"}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                if (canDelete) onDelete?.(category);
                                                else toast.error("Cannot delete category with existing transactions");
                                            }}
                                            className={cn(
                                                "h-8 w-8 transition-all shadow-sm border border-transparent rounded-lg",
                                                canDelete
                                                    ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100"
                                                    : "text-slate-200 cursor-not-allowed hover:bg-transparent"
                                            )}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </CustomTooltip>
                                </>
                            ) : (
                                <CustomTooltip content="Archive Category">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onArchive?.(category)}
                                        className="h-8 w-8 text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm border border-transparent hover:border-orange-100 rounded-lg"
                                    >
                                        <Archive className="h-4 w-4" />
                                    </Button>
                                </CustomTooltip>
                            )}
                        </div>
                    </TableCell>
                </TableRow>
            )
        })
    }

    const SortIcon = ({ colKey }: { colKey: SortKey }) => {
        return <ArrowUpDown className={cn(
            "ml-1 h-3 w-3 transition-colors",
            sortConfig.key === colKey ? "text-blue-600 opacity-100" : "text-slate-300 opacity-0 group-hover:opacity-50"
        )} />
    }

    return (
        <div className={cn("rounded-xl border border-slate-200 bg-white shadow-sm w-full flex flex-col overflow-hidden", className || "h-full")}>
            <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <Table className="relative w-full border-collapse">
                    <TableHeader className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md shadow-sm border-b border-slate-200">
                        <TableRow className="hover:bg-transparent border-slate-100 uppercase text-[10px] font-black text-slate-500 tracking-[0.1em]">
                            <TableHead className="w-10 px-4">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={filteredCategories.length > 0 && selectedIds.size === filteredCategories.length}
                                        onChange={() => onSelectAll?.(filteredCategories.map(c => c.id))}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>
                            </TableHead>
                            <TableHead className="min-w-[200px] h-10 px-4 cursor-pointer group select-none hover:text-slate-800 transition-colors" onClick={() => handleSort('name')}>
                                <div className="flex items-center">Category <SortIcon colKey="name" /></div>
                            </TableHead>
                            <TableHead className="w-[120px] h-10 px-6 cursor-pointer group select-none hover:text-slate-800 transition-colors" onClick={() => handleSort('type')}>
                                <div className="flex items-center">Type <SortIcon colKey="type" /></div>
                            </TableHead>
                            <TableHead className="w-[150px] h-10 px-6 cursor-pointer group select-none hover:text-slate-800 transition-colors" onClick={() => handleSort('total')}>
                                <div className="flex items-center">Total ({selectedYear}) <SortIcon colKey="total" /></div>
                            </TableHead>
                            <TableHead className="w-[100px] h-10 px-6">Txns</TableHead>
                            <TableHead className="h-10 px-6 cursor-pointer group select-none hover:text-slate-800 transition-colors" onClick={() => handleSort('linked_account')}>
                                <div className="flex items-center gap-1.5">
                                    Linked account <SortIcon colKey="linked_account" />
                                    <CustomTooltip content="Default sort: categories with more linked accounts first.">
                                        <Info className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </CustomTooltip>
                                </div>
                            </TableHead>
                            <TableHead className="h-10 px-6">Link shop</TableHead>
                            <TableHead className="h-10 px-6">MCC Codes</TableHead>
                            <TableHead className="h-10 px-6">Key words</TableHead>
                            <TableHead className="w-[120px] text-right h-10 px-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="h-48 text-center text-slate-400 text-sm font-medium italic">
                                    No categories found matching your criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {internalCategories.length > 0 && (
                                    <>
                                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 pointer-events-none">
                                            <TableCell colSpan={10} className="px-6 py-2.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600/70">Internal Categories</span>
                                                    <div className="flex-1 h-px bg-indigo-100/50 ml-2" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {renderRows(internalCategories)}
                                    </>
                                )}

                                {externalCategories.length > 0 && (
                                    <>
                                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 pointer-events-none">
                                            <TableCell colSpan={10} className="px-6 py-2.5 pt-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500/70">External Categories</span>
                                                    <div className="flex-1 h-px bg-slate-100 ml-2" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        {renderRows(externalCategories)}
                                    </>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
