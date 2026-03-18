'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { 
    ChevronLeft, 
    Edit, 
    LayoutDashboard, 
    History, 
    UserMinus, 
    Filter, 
    Search, 
    ChevronDown, 
    ArrowLeft, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Gift, 
    Wallet, 
    X, 
    RefreshCw, 
    CheckCircle, 
    Plus,
    Calendar,
    TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Person, TransactionWithDetails, PersonCycleSheet } from '@/types/moneyflow.types'
import { usePersonDetails } from '@/hooks/use-person-details'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { isYYYYMM } from '@/lib/month-tag'
import { AddTransactionDialog } from '@/components/moneyflow/add-transaction-dialog'
import { SplitBillManager } from '@/components/people/split-bill-manager'
import { RolloverDebtDialog } from '@/components/people/rollover-debt-dialog'
import { SimpleTransactionTable } from '@/components/people/v2/SimpleTransactionTable'
import { PaidTransactionsModal } from '@/components/people/paid-transactions-modal'
import { ManageSheetButton } from '@/components/people/manage-sheet-button'
import { EditPersonButton } from '@/components/people/edit-person-button'

interface MemberDetailViewProps {
    person: Person
    balance: number
    balanceLabel: string
    transactions: TransactionWithDetails[]
    debtTags: any[]
    cycleSheets: PersonCycleSheet[]
    accounts: any[]
    categories: any[]
    people: Person[]
    shops: any[]
}

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})

const compactNumberFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
})

function getMonthName(tag: string, includeYear: boolean = false) {
    if (!isYYYYMM(tag)) return tag
    const month = parseInt(tag.split('-')[1], 10)
    const date = new Date(2000, month - 1, 1)
    const monthName = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()

    if (includeYear) {
        const year = tag.split('-')[0].slice(2)
        return `${monthName} ${year}`
    }
    return monthName
}

export function MemberDetailView({
    person,
    balance,
    balanceLabel,
    transactions,
    debtTags,
    cycleSheets,
    accounts,
    categories,
    people,
    shops,
}: MemberDetailViewProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'timeline' | 'history' | 'split-bill'>('timeline')
    const [selectedYear, setSelectedYear] = useState<string | null>(new Date().getFullYear().toString())
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState<'all' | 'lend' | 'repay' | 'cashback'>('all')
    const [showPaidModal, setShowPaidModal] = useState(false)

    const { metrics, debtCycles, availableYears } = usePersonDetails({
        person,
        transactions,
        debtTags,
        cycleSheets,
    })

    // Generate timeline pills based on selected year
    const timelinePills = useMemo(() => {
        const now = new Date()
        const currentYear = now.getFullYear()
        const targetYear = selectedYear ? parseInt(selectedYear) : currentYear
        const pills: Array<{ tag: string; remains: number; isSettled: boolean; hasData: boolean }> = []

        // Generate ALL 12 months for the target year
        for (let month = 1; month <= 12; month++) {
            const tag = `${targetYear}-${String(month).padStart(2, '0')}`
            const cycle = debtCycles.find(c => c.tag === tag)

            pills.push({
                tag,
                remains: cycle?.remains ?? 0,
                isSettled: cycle?.isSettled ?? true,
                hasData: !!cycle,
            })
        }

        // Sort: For current year, ascending (JAN, FEB, MAR...); For past years, descending (DEC, NOV, OCT...)
        if (targetYear === currentYear) {
            pills.sort((a, b) => {
                const aMonth = parseInt(a.tag.split('-')[1])
                const bMonth = parseInt(b.tag.split('-')[1])
                return aMonth - bMonth
            })
        } else {
            pills.sort((a, b) => {
                const aMonth = parseInt(a.tag.split('-')[1])
                const bMonth = parseInt(b.tag.split('-')[1])
                return bMonth - aMonth
            })
        }

        return pills
    }, [debtCycles, selectedYear])

    // Outstanding debts from previous years
    const outstandingFromPreviousYears = useMemo(() => {
        if (!selectedYear) return []
        const targetYear = parseInt(selectedYear)
        if (isNaN(targetYear)) return []

        return debtCycles.filter(cycle => {
            if (!isYYYYMM(cycle.tag)) return false
            const [yearStr] = cycle.tag.split('-')
            const year = parseInt(yearStr)
            return year < targetYear && !cycle.isSettled && Math.abs(cycle.remains) > 100
        }).sort((a, b) => (b.tagDateVal || 0) - (a.tagDateVal || 0))
    }, [debtCycles, selectedYear])

    // Active cycle
    const [activeCycleTag, setActiveCycleTag] = useState<string>(() => {
        const now = new Date()
        const currentTag = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        const match = debtCycles.find(c => c.tag === currentTag)
        return match ? match.tag : (debtCycles[0]?.tag || currentTag)
    })

    const activeCycle = debtCycles.find(c => c.tag === activeCycleTag)

    // Transactions for active cycle
    const cycleTransactions = useMemo(() => {
        if (!activeCycle) return []
        let txns = activeCycle.transactions

        // Apply filter type
        if (filterType === 'lend') {
            txns = txns.filter(t => {
                const isDebt = t.type === 'debt'
                const amount = Number(t.amount) || 0
                return (isDebt && amount < 0) || (t.type === 'expense' && !!t.person_id)
            })
        } else if (filterType === 'repay') {
            txns = txns.filter(t => t.type === 'repayment' || (t.type === 'debt' && (Number(t.amount) || 0) > 0) || (t.type === 'income' && !!t.person_id))
        } else if (filterType === 'cashback') {
            txns = txns.filter(t => {
                const amount = Math.abs(Number(t.amount) || 0)
                let cashback = 0

                // Calculate actual cashback
                if (t.final_price !== null && t.final_price !== undefined) {
                    const effectiveFinal = Math.abs(Number(t.final_price))
                    if (amount > effectiveFinal) {
                        cashback = amount - effectiveFinal
                    }
                } else if (t.cashback_share_amount) {
                    cashback = Number(t.cashback_share_amount)
                } else if (t.cashback_share_percent && t.cashback_share_percent > 0) {
                    cashback = amount * t.cashback_share_percent
                }

                if (t.type === 'income' && (t.note?.toLowerCase().includes('cashback') || (t.metadata as any)?.is_cashback)) {
                    cashback += amount
                }

                return cashback > 0
            })
        }

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            txns = txns.filter(t =>
                t.note?.toLowerCase().includes(term) ||
                t.shop?.name?.toLowerCase().includes(term) ||
                t.category?.name?.toLowerCase().includes(term)
            )
        }

        return txns
    }, [activeCycle, filterType, searchTerm])

    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            {/* HEADER */}
            <div className="flex-none bg-white border-b border-slate-200">
                {/* Line 1: Identity, Progress & Quick Actions */}
                <div className="flex items-center justify-between px-6 py-6">
                    {/* Left: Identity */}
                    <div className="flex items-center gap-5 min-w-0">
                        <div className="shrink-0">
                            {person.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                    src={person.image_url} 
                                    alt={person.name} 
                                    className="h-16 w-16 rounded-none object-cover border border-slate-200 shadow-sm" 
                                />
                            ) : (
                                <div className="flex h-16 w-16 items-center justify-center rounded-none bg-indigo-50 text-2xl font-black text-indigo-600 border border-indigo-100 shadow-sm">
                                    {person.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5 min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight truncate leading-none">
                                    {person.name}
                                </h1>
                                <span className={cn(
                                    "text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest leading-none shrink-0", 
                                    Math.abs(balance) < 100 
                                        ? "bg-emerald-500 text-white" 
                                        : "bg-slate-900 text-white"
                                )}>
                                    {Math.abs(balance) < 100 ? 'SETTLED' : 'ACTIVE'}
                                </span>
                            </div>

                            {/* Cycle Dropdown & Selector */}
                            <div className="flex items-center gap-1">
                                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors group">
                                            <Calendar className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600" />
                                            <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter">
                                                {getMonthName(activeCycleTag, true)}
                                            </span>
                                            <ChevronDown className="h-3 w-3 text-slate-400 opacity-50" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-2 shadow-2xl border-indigo-100" align="start">
                                        <div className="flex items-center justify-between mb-2 px-1 pb-1 border-b border-slate-100">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Cycle</span>
                                            <div className="flex items-center gap-1">
                                                {availableYears.map(year => (
                                                    <button 
                                                        key={year}
                                                        onClick={() => setSelectedYear(year)}
                                                        className={cn(
                                                            "px-1.5 py-0.5 text-[9px] font-black rounded border transition-all",
                                                            selectedYear === year 
                                                                ? "bg-indigo-600 border-indigo-600 text-white" 
                                                                : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                                                        )}
                                                    >
                                                        {year}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-1">
                                            {timelinePills.map((pill) => (
                                                <button
                                                    key={pill.tag}
                                                    onClick={() => {
                                                        setActiveCycleTag(pill.tag)
                                                        setIsFilterOpen(false)
                                                    }}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-2 rounded border transition-all h-14",
                                                        activeCycleTag === pill.tag
                                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                                                            : pill.isSettled
                                                                ? "bg-emerald-50 border-emerald-100 text-emerald-700 hover:border-emerald-200"
                                                                : pill.hasData
                                                                    ? "bg-white border-slate-200 text-slate-900 hover:border-indigo-300"
                                                                    : "bg-slate-50 border-slate-100 text-slate-300 hover:bg-slate-100"
                                                    )}
                                                >
                                                    <span className="text-[9px] font-black uppercase leading-none mb-1">
                                                        {getMonthName(pill.tag)}
                                                    </span>
                                                    {pill.hasData && (
                                                        <span className={cn(
                                                            "text-[9px] font-bold tabular-nums",
                                                            activeCycleTag === pill.tag ? "text-indigo-100" : (pill.isSettled ? "text-emerald-500" : "text-slate-500")
                                                        )}>
                                                            {compactNumberFormatter.format(pill.remains)}
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                {outstandingFromPreviousYears.length > 0 && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 animate-pulse transition-all">
                                                <History className="h-3 w-3" />
                                                <span className="text-[9px] font-black uppercase tracking-tighter">
                                                    {outstandingFromPreviousYears.length} Unpaid Past
                                                </span>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-56 p-2" align="start">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Debt History</div>
                                            <div className="space-y-1">
                                                {outstandingFromPreviousYears.map(cycle => (
                                                    <button
                                                        key={cycle.tag}
                                                        onClick={() => {
                                                            setSelectedYear(cycle.tag.split('-')[0])
                                                            setActiveCycleTag(cycle.tag)
                                                        }}
                                                        className="w-full flex items-center justify-between p-2 rounded hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                                                    >
                                                        <span className="text-[11px] font-bold text-slate-600">{getMonthName(cycle.tag, true)}</span>
                                                        <span className="text-[11px] font-black text-rose-600">{numberFormatter.format(Math.abs(cycle.remains))}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Center: Reward/Payment Progress */}
                    <div className="hidden lg:flex flex-1 max-w-sm flex-col gap-2 px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <Gift className="h-3.5 w-3.5 text-indigo-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Health</span>
                            </div>
                            <span className="text-[10px] font-black text-indigo-600">
                                {activeCycle ? Math.round((activeCycle.stats.repay / Math.max(1, activeCycle.stats.lend)) * 100) : 0}%
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[1px]">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                                style={{ width: `${activeCycle ? Math.min(100, (activeCycle.stats.repay / Math.max(1, activeCycle.stats.lend)) * 100) : 0}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                            <span>Repaid: {numberFormatter.format(activeCycle?.stats.repay ?? 0)}</span>
                            <span>Target: {numberFormatter.format(activeCycle?.stats.lend ?? 0)}</span>
                        </div>
                    </div>

                    {/* Right: Consolidated Action Stack */}
                    <div className="flex flex-col items-end gap-3">
                        {/* Tabs Integration */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('timeline')}
                                className={cn("px-4 py-1.5 text-[10px] font-black transition-all rounded-md uppercase tracking-widest", activeTab === 'timeline' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                            >
                                Timeline
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={cn("px-4 py-1.5 text-[10px] font-black transition-all rounded-md uppercase tracking-widest", activeTab === 'history' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                            >
                                History
                            </button>
                            <button
                                onClick={() => setActiveTab('split-bill')}
                                className={cn("px-4 py-1.5 text-[10px] font-black transition-all rounded-md uppercase tracking-widest", activeTab === 'split-bill' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                            >
                                Split
                            </button>
                        </div>

                        {/* Button Stack */}
                        <div className="flex items-center gap-2">
                             <ManageSheetButton
                                personId={person.id}
                                cycleTag={activeCycleTag}
                                scriptLink={person.sheet_link}
                                googleSheetUrl={person.google_sheet_url}
                                sheetFullImg={person.sheet_full_img}
                                showBankAccount={person.sheet_show_bank_account ?? false}
                                showQrImage={person.sheet_show_qr_image ?? false}
                                size="sm"
                                buttonClassName="h-8 text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                linkedLabel="Google Sheet"
                                unlinkedLabel="Link Sheet"
                            />
                            <EditPersonButton
                                person={person}
                                subscriptions={[]} 
                                accounts={accounts}
                                className="h-8 px-3.5 text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                            />
                            <button 
                                onClick={() => setActiveTab('split-bill')}
                                className="flex items-center gap-1.5 h-8 px-3 text-[10px] font-black uppercase tracking-widest border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
                            >
                                <UserMinus className="h-3.5 w-3.5" />
                                Split Bill
                            </button>
                        </div>
                    </div>
                </div>

                {/* Line 2: High Contrast Summary Badges */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                        <div className="flex flex-col min-w-[140px] p-3 rounded-xl bg-white border border-slate-200 shadow-sm group hover:border-slate-300 transition-all">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-500">Original Amount</span>
                            <span className="text-lg font-black text-slate-900 tabular-nums leading-none">
                                {numberFormatter.format(activeCycle?.stats.originalLend ?? 0)}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[140px] p-3 rounded-xl bg-amber-50 border border-amber-100 shadow-sm group hover:border-amber-200 transition-all">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest group-hover:text-amber-700">Cashback</span>
                                <Gift className="h-3 w-3 text-amber-400" />
                            </div>
                            <span className="text-lg font-black text-amber-700 tabular-nums leading-none">
                                -{numberFormatter.format(activeCycle?.stats.cashback ?? 0)}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[140px] p-3 rounded-xl bg-blue-50 border border-blue-100 shadow-sm group hover:border-blue-200 transition-all">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:text-blue-700">Net Lend</span>
                                <TrendingUp className="h-3 w-3 text-blue-400" />
                            </div>
                            <span className="text-lg font-black text-blue-700 tabular-nums leading-none">
                                {numberFormatter.format(activeCycle?.stats.lend ?? 0)}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[140px] p-3 rounded-xl bg-emerald-50 border border-emerald-100 shadow-sm group hover:border-emerald-200 transition-all">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest group-hover:text-emerald-700">Repayment</span>
                                <CheckCircle className="h-3 w-3 text-emerald-400" />
                            </div>
                            <span className="text-lg font-black text-emerald-700 tabular-nums leading-none">
                                -{numberFormatter.format(activeCycle?.stats.repay ?? 0)}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[180px] p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-lg group ml-auto">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">REMAINING AMOUNT</span>
                                <Wallet className="h-3.5 w-3.5 text-indigo-400" />
                            </div>
                            <span className="text-xl font-black text-white tabular-nums leading-none">
                                {numberFormatter.format(activeCycle?.remains ?? 0)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Cycle Stats + Transaction Table */}
            {activeTab === 'timeline' && activeCycle && (
                <div className="flex-1 overflow-y-auto px-4 py-3">
                    <div className="bg-white rounded-lg border border-slate-200 p-3 mb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 mr-2">
                                    <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">{getMonthName(activeCycle.tag)}</h2>
                                    {metrics.paidCount > 0 && (
                                        <button
                                            onClick={() => setShowPaidModal(true)}
                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 transition-colors cursor-pointer uppercase"
                                        >
                                            +{metrics.paidCount} Paid
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={() => setFilterType('all')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg transition-all relative group text-xs font-black uppercase tracking-widest shadow-sm",
                                        filterType === 'all'
                                            ? "bg-rose-600 border-rose-600 text-white"
                                            : "bg-white border-slate-200 hover:border-rose-300 text-slate-600"
                                    )}
                                >
                                    <span>Remains:</span>
                                    <span>{numberFormatter.format(activeCycle.remains)}</span>
                                </button>

                                <button
                                    onClick={() => setFilterType('lend')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg transition-all text-xs font-black uppercase tracking-widest shadow-sm",
                                        filterType === 'lend' 
                                            ? "bg-blue-600 border-blue-600 text-white" 
                                            : "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
                                    )}
                                >
                                    <span>Lend:</span>
                                    <span>{numberFormatter.format(activeCycle.stats.lend)}</span>
                                </button>

                                <button
                                    onClick={() => setFilterType('repay')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg transition-all text-xs font-black uppercase tracking-widest shadow-sm",
                                        filterType === 'repay' 
                                            ? "bg-emerald-600 border-emerald-600 text-white" 
                                            : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700"
                                    )}
                                >
                                    <span>Repay:</span>
                                    <span>{numberFormatter.format(activeCycle.stats.repay)}</span>
                                </button>

                                <button
                                    onClick={() => setFilterType('cashback')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg transition-all text-xs font-black uppercase tracking-widest shadow-sm",
                                        filterType === 'cashback' 
                                            ? "bg-amber-500 border-amber-500 text-white" 
                                            : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700"
                                    )}
                                >
                                    <Gift className="h-3 w-3" />
                                    <span>Cashback:</span>
                                    <span>{numberFormatter.format(activeCycle.stats.cashback)}</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                {activeCycle.remains > 100 && (
                                    <RolloverDebtDialog
                                        personId={person.id}
                                        currentCycle={activeCycle.tag}
                                        remains={activeCycle.remains}
                                        trigger={
                                            <button className="flex items-center gap-1.5 h-9 px-3 text-[10px] font-black uppercase tracking-widest border-2 border-amber-300 text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 hover:border-amber-400 transition-colors shadow-sm">
                                                <RefreshCw className="h-3.5 w-3.5" />
                                                Rollover
                                            </button>
                                        }
                                    />
                                )}

                                <AddTransactionDialog
                                    accounts={accounts}
                                    categories={categories}
                                    people={[person]}
                                    shops={shops}
                                    buttonText="Debt"
                                    defaultType="debt"
                                    defaultPersonId={person.id}
                                    buttonClassName="h-9 px-4 text-[10px] font-black uppercase tracking-widest border-2 border-blue-300 text-blue-700 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-500 hover:text-blue-800 transition-colors shadow-sm"
                                    asChild
                                    triggerContent={
                                        <button className="flex items-center gap-1.5 h-9 px-4 text-[10px] font-black uppercase tracking-widest border-2 border-blue-400 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                                            <Plus className="h-3.5 w-3.5 shrink-0" />
                                            Debt
                                        </button>
                                    }
                                />

                                <AddTransactionDialog
                                    accounts={accounts}
                                    categories={categories}
                                    people={[person]}
                                    shops={shops}
                                    buttonText="Repay"
                                    defaultType="repayment"
                                    defaultPersonId={person.id}
                                    buttonClassName="h-9 px-4 text-[10px] font-black uppercase tracking-widest border-2 border-emerald-300 text-emerald-700 bg-white rounded-lg hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-800 transition-colors shadow-sm"
                                    asChild
                                    triggerContent={
                                        <button className="flex items-center gap-1.5 h-9 px-4 text-[10px] font-black uppercase tracking-widest border-2 border-emerald-400 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-md">
                                            <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                                            Repay
                                        </button>
                                    }
                                />

                                <div className="relative ml-2">
                                    <Input
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-9 w-48 text-[11px] font-black uppercase tracking-widest pr-8 pl-9 border-slate-200 focus:ring-slate-900 rounded-lg"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <SimpleTransactionTable
                        transactions={cycleTransactions}
                        accounts={accounts}
                        categories={categories}
                        people={people}
                        shops={shops}
                        searchTerm={searchTerm}
                        context="person"
                        contextId={person.id}
                    />
                </div>
            )}

            {activeTab === 'history' && (
                <div className="flex-1 overflow-y-auto px-4 py-3">
                    <SimpleTransactionTable
                        transactions={transactions.filter(t => !selectedYear || t.occurred_at?.startsWith(selectedYear))}
                        accounts={accounts}
                        categories={categories}
                        people={people}
                        shops={shops}
                        searchTerm={searchTerm}
                        context="person"
                        contextId={person.id}
                    />
                </div>
            )}

            {activeTab === 'split-bill' && (
                <div className="flex-1 overflow-y-auto px-4 py-3">
                    <SplitBillManager
                        transactions={transactions}
                        personId={person.id}
                        people={people}
                        accounts={accounts}
                        categories={categories}
                        shops={shops}
                    />
                </div>
            )}

            <PaidTransactionsModal
                open={showPaidModal}
                onOpenChange={setShowPaidModal}
                transactions={transactions}
                personId={person.id}
                accounts={accounts}
                categories={categories}
                people={people}
                shops={shops}
            />
        </div>
    )
}
