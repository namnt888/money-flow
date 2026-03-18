'use client'

import {
    Calendar,
    ChevronDown,
    CheckCircle,
    TrendingUp,
    Split,
    Edit,
    Wallet,
    Gift,
    X,
    Loader2,
    ArrowLeft,
    BarChart3,
    ExternalLink,
    Zap
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
import { StatsPopover } from './StatsPopover'
import { Person, Account } from '@/types/moneyflow.types'

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})

function getMonthName(tag: string, includeYear: boolean = false) {
    if (!isYYYYMM(tag)) return tag
    if (!includeYear) {
        const month = parseInt(tag.split('-')[1], 10)
        const date = new Date(2000, month - 1, 1)
        return date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    }
    return tag // For YYYY-MM badge as requested
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
        shared?: number
        cap: number
        currentSpend: number
        minSpend: number
        needToSpend: number
        remaining: number
        profit?: number
        account_id?: string
    }
    isSyncing?: boolean
    syncingText?: string
    hasFilter?: boolean
}

function CircularProgress({ percent, size = 32 }: { percent: number, size?: number }) {
    const stroke = size / 10
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
            <span className={cn(
                "absolute font-black leading-none",
                size > 40 ? "text-[10px]" : "text-[8px]"
            )}>
                {percent}%
            </span>
        </div>
    )
}

function SummaryItem({ label, value, colorClass = "text-slate-900" }: { label: string, value: number, colorClass?: string }) {
    return (
        <div className={cn(
            "flex flex-col justify-center px-5 py-2.5 rounded-2xl border border-slate-100 bg-white shadow-sm min-w-[150px] h-full transition-all hover:border-slate-300 hover:shadow-md cursor-default text-left",
            label.includes('REMAINS') && "bg-slate-50 border-slate-200"
        )}>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
            <span className={cn(
                "font-black tabular-nums leading-none tracking-tight", 
                label.includes('REMAINS') ? "text-3xl" : "text-2xl",
                colorClass
            )}>
                {numberFormatter.format(Math.abs(value))}
            </span>
        </div>
    )
}

function HeaderSection({ label, children, className }: { label: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("relative border border-slate-100 rounded-2xl px-5 py-3 h-full flex flex-col justify-center bg-white/50", className)}>
            <div className="absolute -top-2.5 left-4 bg-white px-2 z-10">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">{label}</span>
            </div>
            {children}
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
    hasFilter = false,
}: PeopleHeaderProps) {
    const isSettled = Math.abs(stats.remains) < 100
    const currentCycleRepayPercent = stats.netLend > 0 ? Math.min(100, Math.round((Math.abs(stats.repay) / Math.abs(stats.netLend)) * 100)) : 0
    
    // Historical remains for sparkline
    const historicalRemains = (allCycles || [])
        .slice().reverse() // chronological order
        .map(c => c.remains)

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
            <div className="flex items-stretch px-4 py-4 gap-4 overflow-x-auto scrollbar-hide min-h-[140px]">
                
                {/* SECTION 1: Identity */}
                <HeaderSection label="Identity" className="shrink-0 min-w-[220px]">
                    <div className="flex items-center gap-4">
                        {person.image_url ? (
                            <img 
                                src={person.image_url} 
                                alt={person.name} 
                                className="h-14 w-14 rounded-none border-none object-cover shrink-0 shadow-md ring-1 ring-slate-100" 
                            />
                        ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-none bg-indigo-50 text-indigo-600 text-2xl font-black shrink-0 shadow-sm border-none">
                                {person.name.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 leading-none">
                                <h1 className="text-base font-black text-slate-900 tracking-tight leading-none truncate max-w-[140px]">
                                    {person.name}
                                </h1>
                            </div>
                            <span className={cn(
                                "w-fit text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest leading-none whitespace-nowrap", 
                                isSettled ? "bg-emerald-500 text-white" : "bg-slate-900 text-white"
                            )}>
                                {isSettled ? 'SETTLED' : 'ACTIVE'}
                            </span>

                            <div className="flex items-center mt-1.5">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-100 bg-amber-50 text-orange-700 shadow-sm">
                                    <Calendar className="h-2.5 w-2.5" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter leading-none">
                                        {activeCycle?.tag && isYYYYMM(activeCycle.tag)
                                            ? activeCycle.tag
                                            : (activeCycle?.tag === 'all' ? 'All Time' : 'All Time')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </HeaderSection>

                {/* SECTION 2: Debt Summary */}
                <HeaderSection label="Summary" className="flex-1 min-w-[600px] overflow-hidden">
                    <div className={cn(
                        "flex items-center justify-between h-full gap-4 transition-all duration-300",
                        hasFilter && "blur-[6px] opacity-70 pointer-events-none grayscale-[0.3]"
                    )}>
                        <div className="flex items-center gap-3 h-full py-1">
                            <SummaryItem label="Original Spend" value={stats.originalLend} colorClass="text-slate-900" />
                            <SummaryItem label="Cashback" value={stats.cashback} colorClass="text-emerald-600" />
                            
                            <StatsPopover
                                originalLend={stats.originalLend}
                                cashback={stats.cashback}
                                netLend={stats.netLend}
                                repay={stats.repay}
                                remains={stats.remains}
                                paidRollover={stats.paidRollover}
                                receiveRollover={stats.receiveRollover}
                            >
                                <button className="h-full">
                                    <SummaryItem label="REMAINS" value={stats.remains} colorClass="text-rose-600" />
                                </button>
                            </StatsPopover>
                        </div>

                        <div className="flex items-center gap-4 px-6 border-l border-slate-100 h-full">
                            <div className="flex flex-col items-center gap-1.5">
                                <CircularProgress 
                                    percent={currentCycleRepayPercent} 
                                    size={52}
                                />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Debt Paid</span>
                            </div>
                        </div>
                    </div>
                    {hasFilter && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="flex flex-col items-center gap-1 bg-white/80 px-4 py-2 rounded-xl shadow-sm border border-slate-100/50 backdrop-blur-md">
                                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Context Filtered</span>
                            </div>
                        </div>
                    )}
                </HeaderSection>

                {/* SECTION 3: Reward Progress / Profit */}
                <HeaderSection label="Rewards" className="shrink-0 min-w-[280px]">
                    <div className="flex items-center h-full gap-4">
                        <div className="relative">
                            <CircularProgress 
                                percent={cashbackStatus ? (
                                    cashbackStatus.needToSpend > 0 
                                        ? Math.min(100, Math.round(((cashbackStatus.minSpend > 0 ? (cashbackStatus.minSpend - cashbackStatus.needToSpend) / cashbackStatus.minSpend : 1)) * 100))
                                        : Math.min(100, Math.round(((cashbackStatus.cap > 0 ? cashbackStatus.earned / cashbackStatus.cap : 0)) * 100))
                                ) : 0} 
                                size={64}
                                color={cashbackStatus && cashbackStatus.needToSpend > 0 ? "text-blue-500" : "text-emerald-500"}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className={cn(
                                    "text-[10px] font-black leading-none",
                                    cashbackStatus && cashbackStatus.needToSpend > 0 ? "text-blue-600" : "text-emerald-600"
                                )}>
                                    {cashbackStatus ? (
                                        cashbackStatus.needToSpend > 0 
                                            ? `${Math.round(Math.min(100, (cashbackStatus.minSpend > 0 ? (cashbackStatus.minSpend - cashbackStatus.needToSpend) / cashbackStatus.minSpend : 1) * 100))}%`
                                            : `${Math.round(Math.min(100, (cashbackStatus.cap > 0 ? cashbackStatus.earned / cashbackStatus.cap : 0) * 100))}%`
                                    ) : '0%'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center h-full gap-1.5 pt-1">
                            {cashbackStatus ? (
                                <>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">My Profit</span>
                                                <span className="text-[18px] font-black text-emerald-600 tabular-nums leading-none">
                                                    +{numberFormatter.format(Math.round(cashbackStatus.profit || 0))}
                                                </span>
                                            </div>
                                            {cashbackStatus.account_id && (
                                                <button 
                                                    onClick={() => window.open(`/accounts/${cashbackStatus.account_id}?tag=${activeCycle?.tag}`, '_blank')}
                                                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all border border-slate-100 shadow-sm"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 mt-1">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none">Earned</span>
                                                <span className="text-[11px] font-bold text-slate-700 tabular-nums leading-none">{numberFormatter.format(Math.round(cashbackStatus.earned || 0))}</span>
                                            </div>
                                            <div className="h-6 w-px bg-slate-100" />
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none">Shared</span>
                                                <span className="text-[11px] font-bold text-slate-500 tabular-nums leading-none">{numberFormatter.format(Math.round(cashbackStatus.shared || 0))}</span>
                                            </div>
                                        </div>
                                        
                                        {cashbackStatus.needToSpend > 0 ? (
                                            <div className="px-2.5 py-1.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-2 shadow-sm mt-0.5">
                                                <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] text-rose-600 font-black tabular-nums leading-none">
                                                        -{numberFormatter.format(Math.round(cashbackStatus.needToSpend / 1000))}k
                                                    </span>
                                                    <span className="text-[7px] text-rose-400 font-black uppercase tracking-tighter mt-0.5">Need for Reward</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2 shadow-sm mt-0.5">
                                                <Zap className="h-3 w-3 text-emerald-500 fill-emerald-500" />
                                                <span className="text-[10px] text-emerald-700 font-black uppercase tracking-[0.1em]">Qualified</span>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <span className="text-[11px] font-bold text-slate-400 italic leading-tight">
                                        Select card to<br/>view rewards
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </HeaderSection>

                {/* SECTION 4: Actions */}
                <HeaderSection label="Actions" className="shrink-0">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onTabChange('split-bill')}
                            className="flex flex-col items-center justify-center gap-1.5 h-16 w-16 rounded-2xl border border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-200 group transition-all shadow-sm"
                        >
                            <Split className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-black text-slate-700 uppercase tracking-wider">Split</span>
                        </button>
                        <EditPersonButton 
                            person={person}
                            subscriptions={[]}
                            accounts={accounts}
                            className="h-16 w-16 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex flex-col items-center justify-center gap-1.5"
                        />
                    </div>
                </HeaderSection>
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
