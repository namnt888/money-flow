'use client'

import {
    Calendar,
    ChevronDown,
    CheckCircle,
    TrendingUp,
    ExternalLink,
    Split,
    Edit,
    Wallet,
    Gift,
    X,
    Loader2,
    ArrowLeft,
    BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { isYYYYMM } from '@/lib/month-tag'
import { formatMoneyVND } from '@/lib/utils'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ManageSheetButton } from '@/components/people/manage-sheet-button'
import { EditPersonButton } from '@/components/people/edit-person-button'
import { Person, Account } from '@/types/moneyflow.types'

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
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

interface PeopleHeaderProps {
    person: Person
    balanceLabel: string
    activeCycle?: {
        tag: string
        remains: number
        stats: {
            lend: number
            repay: number
            originalLend: number
            cashback: number
            paidRollover: number
            receiveRollover: number
        }
    }
    allCycles: any[]
    accounts: Account[]
    stats: {
        originalLend: number
        cashback: number
        netLend: number
        repay: number
        remains: number
        paidRollover: number
        receiveRollover: number
    }
    selectedYear: string | null
    availableYears: string[]
    onYearChange: (year: string | null) => void
    activeTab: 'timeline' | 'history' | 'split-bill'
    onTabChange: (tab: 'timeline' | 'history' | 'split-bill') => void
    onEdit: () => void
    onCycleChange?: (cycle: string) => void
    cashbackStatus?: {
        earned: number
        cap: number
        currentSpend: number
        minSpend: number
        needToSpend: number
        remaining: number
    }
    isSyncing?: boolean
    syncingText?: string
}

function CircularProgress({ percent }: { percent: number }) {
    const size = 32
    const stroke = 3
    const radius = (size - stroke) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percent / 100) * circumference

    return (
        <div className="relative flex items-center justify-center shrink-0">
            <svg height={size} width={size} className="rotate-[-90deg]">
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    className="text-slate-100"
                />
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset: offset }}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    className="text-emerald-500 transition-all duration-1000"
                />
            </svg>
            <span className="absolute text-[8px] font-black font-mono leading-none">{percent}%</span>
        </div>
    )
}

function SummaryItem({ label, value, colorClass = "text-slate-900", isNegative = false }: { label: string, value: number, colorClass?: string, isNegative?: boolean }) {
    return (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label}:</span>
            <span className={cn("text-[11px] font-black tabular-nums", colorClass)}>
                {isNegative ? '-' : ''}{numberFormatter.format(Math.abs(value))}
            </span>
        </div>
    )
}

export function PeopleHeader({
    person,
    balanceLabel,
    activeCycle,
    allCycles,
    accounts,
    stats,
    selectedYear,
    availableYears,
    onYearChange,
    activeTab,
    onTabChange,
    onEdit,
    onCycleChange,
    cashbackStatus,
    isSyncing = false,
    syncingText,
}: PeopleHeaderProps) {
    const isSettled = Math.abs(stats.remains) < 100
    const currentCycleRepayPercent = activeCycle ? Math.min(100, Math.round((Math.abs(activeCycle.stats.repay) / Math.max(1, Math.abs(activeCycle.stats.repay) + Math.abs(activeCycle.remains))) * 100)) : 0

    // Group cycles by year for the grid selector
    const cyclesByYear = (allCycles || [])
        .filter(c => isYYYYMM(c.tag))
        .reduce((acc: Record<string, string[]>, cycle) => {
            const year = cycle.tag.split('-')[0]
            if (!acc[year]) acc[year] = []
            acc[year].push(cycle.tag)
            return acc
        }, {})

    const years = Object.keys(cyclesByYear).sort((a, b) => b.localeCompare(a))
    const displayYear = selectedYear || (years.length > 0 ? years[0] : new Date().getFullYear().toString())
    const monthsForYear = cyclesByYear[displayYear] || []

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
            {/* COMPACT SINGLE HEADER BAR */}
            <div className="flex items-stretch px-4 py-2 gap-0 overflow-x-auto scrollbar-hide">
                
                {/* SECTION 1: Identity & Cycle (Accounts) */}
                <div className="flex items-center gap-3 pr-4 border-r border-slate-100 shrink-0">
                    <button 
                        onClick={() => window.history.back()}
                        className="p-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 hover:border-indigo-100 transition-all shadow-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3">
                        {person.image_url ? (
                            <img 
                                src={person.image_url} 
                                alt={person.name} 
                                className="h-10 w-10 rounded-none border border-slate-200 object-cover shrink-0 shadow-sm" 
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-none bg-indigo-50 text-indigo-600 text-base font-black border border-indigo-100 shrink-0">
                                {person.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 leading-none">
                                <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none truncate max-w-[120px]">
                                    {person.name}
                                </h1>
                                <span className={cn(
                                    "text-[7px] font-black px-1 py-0.5 rounded-sm uppercase tracking-tighter leading-none whitespace-nowrap", 
                                    isSettled ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"
                                )}>
                                    {isSettled ? 'SETTLED' : 'ACTIVE'}
                                </span>
                            </div>

                            <div className="flex items-center mt-0.5">
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-orange-100 bg-amber-50 text-orange-700">
                                    <Calendar className="h-2 w-2" />
                                    <span className="text-[8px] font-black uppercase tracking-tighter leading-none">
                                        {activeCycle?.tag && isYYYYMM(activeCycle.tag)
                                            ? getMonthName(activeCycle.tag, true)
                                            : (activeCycle?.tag === 'all' ? 'All Time' : 'All Time')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Debt Summary */}
                <div className="flex-1 flex flex-col justify-center px-6 border-r border-slate-100 gap-1.5">
                    <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_auto] items-center gap-x-8 gap-y-1">
                        <div className="flex flex-col">
                            <SummaryItem label="Net Lend" value={stats.netLend} colorClass="text-blue-600" />
                            <SummaryItem label="Orig. Spend" value={stats.originalLend} colorClass="text-slate-900" />
                        </div>
                        <div className="flex flex-col">
                            <SummaryItem label="Cashback" value={stats.cashback} colorClass="text-emerald-600" isNegative />
                            <div className="flex items-baseline gap-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter shrink-0">REMAINS</span>
                                <span className={cn(
                                    "text-lg font-black leading-none tracking-tight tabular-nums",
                                    stats.remains < 0 ? "text-rose-600" : "text-emerald-600"
                                )}>
                                    {numberFormatter.format(stats.remains)}
                                </span>
                            </div>
                        </div>
                        <button className="hidden lg:flex p-1.5 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 text-slate-400 transition-all shadow-sm">
                            <BarChart3 className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                {/* SECTION 3: Reward Progress / Cashback Status */}
                <div className="flex items-center gap-4 px-6 border-r border-slate-100 shrink-0 min-w-[160px]">
                    <div className="flex items-center gap-3">
                        <CircularProgress percent={cashbackStatus ? Math.min(100, Math.round(((cashbackStatus.cap > 0 ? cashbackStatus.earned / cashbackStatus.cap : 0)) * 100)) : currentCycleRepayPercent} />
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                                <div className="h-1 w-1 rounded-full bg-amber-400" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Reward Progress</span>
                            </div>
                            {cashbackStatus ? (
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[9px] font-black text-emerald-600 tabular-nums">
                                        +{numberFormatter.format(Math.round(cashbackStatus.earned))}
                                    </span>
                                    {cashbackStatus.needToSpend > 0 && (
                                        <span className="text-[8px] text-orange-500 font-bold">
                                            -{numberFormatter.format(Math.round(cashbackStatus.needToSpend))} to min
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-[8px] font-medium text-slate-400 italic leading-tight">
                                    Select card to<br/>view rewards
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Actions (Horizontal Stack) */}
                <div className="flex items-center gap-2 pl-4 shrink-0">
                    <button 
                        onClick={() => onTabChange('split-bill')}
                        className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black text-slate-700 uppercase tracking-wider transition-all shadow-sm"
                    >
                        <Split className="h-3 w-3 text-indigo-500" />
                        Split
                    </button>
                    <EditPersonButton 
                        person={person}
                        subscriptions={[]}
                        accounts={accounts}
                        className="h-8 px-3 rounded-lg bg-white text-[10px] font-black border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                    />
                </div>
            </div>
            
            {/* TABS BAR (Consistent height) */}
            <div className="px-6 py-0 bg-white flex items-center justify-between border-t border-slate-100 h-9">
                <div className="flex items-center gap-2 h-full">
                    {(['timeline', 'history', 'split-bill'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={cn(
                                "px-4 h-full text-[10px] font-black uppercase tracking-[0.1em] relative transition-all flex items-center",
                                activeTab === tab 
                                    ? "text-indigo-600" 
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {tab === 'split-bill' ? 'Split Bill' : tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {isSyncing && (
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest animate-pulse">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        {syncingText || 'Syncing...'}
                    </div>
                )}
            </div>
        </div>
    )
}
