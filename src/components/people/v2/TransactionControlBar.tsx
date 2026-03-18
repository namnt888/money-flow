import { Search, RotateCcw, UserMinus, Plus, Check, ChevronDown, RefreshCw, RefreshCcw, X, Clipboard, Info, ArrowUpRight, TrendingUp } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { DebtCycle } from '@/hooks/use-person-details'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CustomTooltip } from '@/components/ui/custom-tooltip'
import { RolloverDebtDialog } from '@/components/people/rollover-debt-dialog'
import { TypeFilterDropdown, FilterType } from '@/components/transactions-v2/header/TypeFilterDropdown'
import { StatusDropdown, StatusFilter } from '@/components/transactions-v2/header/StatusDropdown'
import { QuickFilterDropdown } from '@/components/transactions-v2/header/QuickFilterDropdown'
import { UnifiedSmartDatePicker } from '@/components/transactions-v2/header/UnifiedSmartDatePicker'
import { DateRange } from 'react-day-picker'
import { toast } from 'sonner'

import { ManageSheetButton } from '@/components/people/manage-sheet-button'
import { Person, Account, Category, Shop } from '@/types/moneyflow.types'
import { formatCycleTag } from '@/lib/cycle-utils'
import { isYYYYMM } from '@/lib/month-tag'

interface PaidCounterProps {
    paidCount: number
    onViewPaid: () => void
}

interface TransactionControlBarProps {
    person: Person
    activeCycle: DebtCycle
    allCycles: DebtCycle[]
    onCycleChange: (tag: string) => void
    onCycleSelect?: (tag: string, year: string | null) => void
    availableYears: string[]
    selectedYear: string | null
    onYearChange: (year: string | null) => void
    transactionCount: number
    paidCount: number
    onViewPaid: () => void
    searchTerm: string
    onSearchChange: (value: string) => void
    filterType: FilterType
    onFilterTypeChange: (value: FilterType) => void
    statusFilter: StatusFilter
    onStatusChange: (value: StatusFilter) => void
    selectedAccountId?: string
    onAccountChange: (value?: string) => void
    date: Date
    dateRange: DateRange | undefined
    dateMode: 'month' | 'range' | 'date' | 'all' | 'year' | 'cycle'
    onDateChange: (date: Date) => void
    onRangeChange: (range: DateRange | undefined) => void
    onModeChange: (mode: 'month' | 'range' | 'date' | 'all' | 'year' | 'cycle') => void
    accountItems: { id: string; name: string; image_url?: string | null }[]
    accounts: Account[]
    categories: Category[]
    shops: Shop[]
    onAddTransaction: (type: string) => void
    currentCycleTag: string
    isPending?: boolean
    initialSheetUrl?: string | null
    onRefresh?: () => void
    setIsGlobalLoading?: (loading: boolean) => void
    setLoadingMessage?: (msg: string | null) => void
}

import { useRouter } from 'next/navigation'

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})

function getMonthDisplayName(tag: string) {
    if (isYYYYMM(tag)) return formatCycleTag(tag)
    return tag
}

function resolveCycleTagByStatementDay(date: Date, statementDay?: number | null): string {
    const day = Number(statementDay || 0)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (day > 0 && date.getDate() > day) {
        month += 1
        if (month > 12) {
            month = 1
            year += 1
        }
    }
    return `${year}-${String(month).padStart(2, '0')}`
}

function transactionMatchesAccount(txn: any, accountId?: string): boolean {
    if (!accountId) return true
    return (
        txn.account_id === accountId ||
        txn.source_account_id === accountId ||
        txn.target_account_id === accountId ||
        txn.to_account_id === accountId
    )
}

export function TransactionControlBar({
    person,
    activeCycle,
    allCycles,
    onCycleChange,
    onCycleSelect,
    availableYears,
    selectedYear,
    onYearChange,
    transactionCount,
    paidCount,
    onViewPaid,
    searchTerm,
    onSearchChange,
    filterType,
    onFilterTypeChange,
    statusFilter,
    onStatusChange,
    selectedAccountId,
    onAccountChange,
    date,
    dateRange,
    dateMode,
    onDateChange,
    onRangeChange,
    onModeChange,
    accountItems,
    accounts,
    categories,
    shops,
    onAddTransaction,
    currentCycleTag,
    isPending: isPendingProp,
    initialSheetUrl,
    onRefresh,
    setIsGlobalLoading,
    setLoadingMessage,
}: TransactionControlBarProps) {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const isSettled = Math.abs(activeCycle.remains) < 100
    const isCurrentCycle = activeCycle.tag === currentCycleTag
    const isAllHistory = selectedYear === null
    const cycleLabel = isAllHistory ? 'All History' : activeCycle.tag
    const prevAccountIdRef = useRef<string | undefined>(selectedAccountId)

    const selectedAccount = useMemo(
        () => accounts.find((account) => account.id === selectedAccountId),
        [accounts, selectedAccountId],
    )

    const accountCurrentCycleTag = useMemo(() => {
        const statementDay = selectedAccount?.statement_day ?? selectedAccount?.credit_card_info?.statement_day
        if (statementDay) {
            return resolveCycleTagByStatementDay(new Date(), statementDay)
        }
        return currentCycleTag
    }, [selectedAccount, currentCycleTag])

    const cycleOptions = useMemo(() => {
        if (!selectedAccountId) return [] as Array<{ label: string; value: string; count?: number; highlight?: boolean }>

        const options = allCycles
            .filter((cycle) => isYYYYMM(cycle.tag))
            .map((cycle) => {
                const count = cycle.transactions.filter((txn) => transactionMatchesAccount(txn, selectedAccountId)).length
                return {
                    label: getMonthDisplayName(cycle.tag),
                    value: cycle.tag,
                    count,
                    highlight: cycle.tag === accountCurrentCycleTag,
                    stats: {
                        debt: cycle.stats.lend,
                        back: cycle.stats.repay,
                        remains: cycle.remains,
                        isSettled: cycle.isSettled
                    }
                }
            })
            .filter((cycle) => cycle.count! > 0 || cycle.highlight)

        // Ensure current account cycle is always an option even if no transactions yet
        if (accountCurrentCycleTag && !options.find(o => o.value === accountCurrentCycleTag)) {
            options.push({
                label: getMonthDisplayName(accountCurrentCycleTag),
                value: accountCurrentCycleTag,
                count: 0,
                highlight: true,
                stats: {
                    debt: 0,
                    back: 0,
                    remains: 0,
                    isSettled: true
                }
            })
        }

        return options.sort((a, b) => b.value.localeCompare(a.value))
    }, [allCycles, selectedAccountId, accountCurrentCycleTag])

    useEffect(() => {
        const accountChanged = prevAccountIdRef.current !== selectedAccountId
        prevAccountIdRef.current = selectedAccountId
        if (!accountChanged || !selectedAccountId) return

        const nextCycle = cycleOptions.find((cycle) => cycle.highlight)?.value || accountCurrentCycleTag || 'all'
        if (onCycleSelect) {
            onCycleSelect(nextCycle, selectedYear)
        } else {
            onCycleChange(nextCycle)
        }
    }, [selectedAccountId, cycleOptions, onCycleChange, onCycleSelect, selectedYear])

    const handleCycleChange = (tag: string) => {
        onCycleChange(tag)
    }

    const handleYearChange = (year: string | null) => {
        onYearChange(year)
    }

    const hasActiveFilters = useMemo(() => {
        return filterType !== 'all' || 
               statusFilter !== 'active' || 
               !!selectedAccountId || 
               searchTerm !== '' || 
               activeCycle.tag !== currentCycleTag ||
               selectedYear !== currentCycleTag.split('-')[0]
    }, [filterType, statusFilter, selectedAccountId, searchTerm, activeCycle.tag, currentCycleTag, selectedYear])

    const handleClearAllFilters = () => {
        toast('Clear all filters?', {
            description: 'This will reset view to current cycle and clear all search/filters.',
            action: {
                label: 'Clear',
                onClick: () => {
                    const currentYear = currentCycleTag.split('-')[0]
                    onFilterTypeChange('all')
                    onStatusChange('active')
                    onAccountChange(undefined)
                    onSearchChange('')
                    if (onCycleSelect) {
                        onCycleSelect(currentCycleTag, currentYear)
                    } else {
                        onYearChange(currentYear)
                        onCycleChange(currentCycleTag)
                    }
                }
            }
        })
    }

    const isPending = isPendingProp

    const handlePasteSearch = async () => {
        try {
            const text = await navigator.clipboard.readText()
            if (text) onSearchChange(text)
        } catch (err) {
            if (err instanceof DOMException && err.name === 'NotAllowedError') {
                toast.error('Clipboard access denied. Please allow clipboard permission.')
                return
            }
            toast.error('Unable to read clipboard.')
        }
    }

    return (
        <div className="flex flex-col gap-2 p-4 pb-0 relative">
            {isPending && (
                <div className="absolute inset-0 bg-white/40 z-50 flex items-center justify-center rounded-xl backdrop-blur-[1px] animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-2xl shadow-xl border border-slate-200/50">
                        <RefreshCw className="h-4 w-4 animate-spin text-indigo-600" />
                        <span className="text-[11px] font-bold text-slate-600 tracking-tight uppercase">Syncing...</span>
                    </div>
                </div>
            )}
            {/* Single Row: Status + Paid + Cycle Selector + Filters + Sheet */}
            <div className="flex flex-nowrap items-center gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm overflow-x-auto">

                {/* 1. Primary Actions: Add Transaction Group */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                className="flex items-center gap-2 h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black transition-all flex-shrink-0 shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                                Add Record
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1" align="start">
                            <div className="space-y-0.5">
                                <button
                                    onClick={() => onAddTransaction('debt')}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                                >
                                    <div className="h-6 w-6 rounded bg-rose-50 flex items-center justify-center">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                    </div>
                                    Lend / Debt
                                </button>
                                <button
                                    onClick={() => onAddTransaction('repayment')}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
                                >
                                    <div className="h-6 w-6 rounded bg-emerald-50 flex items-center justify-center">
                                        <Plus className="h-3.5 w-3.5" />
                                    </div>
                                    Repayment
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex items-center h-9 w-[280px] rounded-lg border border-slate-200 bg-white shadow-sm">
                        <ManageSheetButton 
                            personId={person.id}
                            cycleTag={activeCycle.tag}
                            initialSheetUrl={initialSheetUrl}
                            googleSheetUrl={person.google_sheet_url}
                            availableYears={availableYears}
                            allCycles={allCycles}
                            selectedYear={selectedYear}
                            onCycleChange={onCycleChange}
                            onYearChange={onYearChange}
                            activeCycleRemains={activeCycle.remains}
                            isSettled={isSettled}
                            splitMode={true}
                            linkedLabel="Sheet"
                            unlinkedLabel="Sheet"
                        />
                    </div>
                </div>

                <div className="h-6 w-px bg-slate-200" />

                {/* 2. Basic Filters Group */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <TypeFilterDropdown
                        value={filterType}
                        onChange={onFilterTypeChange}
                        allowedTypes={['all', 'lend', 'repay', 'cashback']}
                    />

                    <StatusDropdown value={statusFilter} onChange={onStatusChange} />

                    <div className="min-w-[140px]">
                        <QuickFilterDropdown
                            items={accountItems.map(account => ({
                                id: account.id,
                                name: account.name,
                                image: account.image_url || undefined,
                                type: 'account' as const,
                                badge: (account as any).type || (accounts.find(a => a.id === account.id)?.type) || null
                            }))}
                            value={selectedAccountId}
                            onValueChange={onAccountChange}
                            placeholder="Accounts"
                            fullWidth
                            emptyText="No accounts"
                        />
                    </div>

                    <UnifiedSmartDatePicker
                        date={date}
                        dateRange={dateRange}
                        mode={dateMode}
                        onDateChange={onDateChange}
                        onRangeChange={onRangeChange}
                        onModeChange={onModeChange}
                        cycles={cycleOptions}
                        selectedCycleValue={activeCycle.tag}
                        onCycleSelect={(tag: string) => onCycleSelect ? onCycleSelect(tag, selectedYear) : onCycleChange(tag)}
                        selectedYearValue={selectedYear}
                        onYearSelect={onYearChange}
                    />
                </div>

                {/* 3. Dynamic Search Bar (Stretches to fill gap) */}
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <button
                        type="button"
                        onClick={handlePasteSearch}
                        className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Paste"
                    >
                        <Clipboard className="h-3.5 w-3.5" />
                    </button>
                    <Input
                        placeholder="Search transactions..."
                        className="h-9 pl-12 pr-8 text-xs bg-slate-50 border-slate-200 focus:bg-white transition-colors w-full"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleClearAllFilters}
                        className="flex items-center gap-1.5 h-9 px-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-100 transition-all shrink-0 animate-in fade-in slide-in-from-right-2"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Clear All
                    </button>
                )}

                <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                    <TooltipProvider delayDuration={100}>
                        {!isSettled ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div> {/* Wrapper for PopoverTrigger inside Tooltip */}
                                        <RolloverDebtDialog
                                            personId={person.id}
                                            currentCycle={activeCycle.tag}
                                            allCycles={allCycles}
                                            remains={activeCycle.remains}
                                            setIsGlobalLoading={setIsGlobalLoading}
                                            setLoadingMessage={setLoadingMessage}
                                            trigger={
                                                <button
                                                    className="flex items-center gap-1.5 h-9 px-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors"
                                                >
                                                    <ArrowUpRight className="h-4 w-4" />
                                                    Rollover
                                                </button>
                                            }
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="center" className="z-[100]">
                                    <p>Forward outstanding debt to current cycle</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <div className="flex items-center gap-1.5 h-9 px-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                <Check className="h-4 w-4" />
                                Settled
                            </div>
                        )}

                        {paidCount > 0 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={onViewPaid}
                                        className="flex items-center gap-1.5 h-9 px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-700 transition-colors uppercase tracking-wider"
                                    >
                                        <Check className="h-4 w-4" />
                                        +{paidCount} paid
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="center" className="z-[100]">
                                    <p>View recently paid transactions</p>
                                </TooltipContent>
                            </Tooltip>
                        )}

                        {onRefresh && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={onRefresh}
                                        className="flex items-center justify-center h-9 w-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-colors flex-shrink-0 shadow-sm"
                                    >
                                        <RefreshCw className={cn("h-4 w-4", isPending && "animate-spin")} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="end" className="z-[100]">
                                    <p>Refresh table data</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}
