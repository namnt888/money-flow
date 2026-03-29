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
    Zap,
    TrendingDown,
    MoreHorizontal,
    CircleDollarSign,
    ArrowUpRight,
    RefreshCw,
    Users,
    LayoutGrid
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { isYYYYMM } from '@/lib/month-tag'
import { formatMoneyVND } from '@/lib/utils'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
    return tag
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
    activeTab: 'timeline' | 'split-bill'
    onTabChange: (tab: 'timeline' | 'split-bill') => void
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
        accountName?: string
        accountImage?: string
    }
    allCashbackStatuses?: Array<{
        earned: number
        shared?: number
        cap: number
        currentSpend: number
        minSpend: number
        needToSpend: number
        remaining: number
        profit?: number
        account_id?: string
        accountName?: string
        accountImage?: string
    }>
    isSyncing?: boolean
    syncingText?: string
    hasFilter?: boolean
    onSyncCycle?: (tag: string) => Promise<any>
}

function CircularProgress({ percent, size = 44, label, colorClass = "text-blue-500" }: { percent: number, size?: number, label?: string, colorClass?: string }) {
    const stroke = 3
    const radius = (size - stroke) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percent / 100) * circumference

    return (
        <div className="flex flex-col items-center gap-1 shrink-0">
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
                        className={cn(colorClass, "transition-all duration-1000")}
                    />
                </svg>
                <span className="absolute text-[10px] font-bold leading-none text-slate-900">
                    {percent}%
                </span>
            </div>
            {label && <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</span>}
        </div>
    )
}

function MetricItem({ 
    label, 
    value, 
    colorClass = "text-slate-900", 
    icon: Icon,
    prefix = "",
    className
}: { 
    label: string, 
    value: number | string, 
    colorClass?: string, 
    icon?: any,
    prefix?: string,
    className?: string
}) {
    return (
        <div className={cn("flex flex-col gap-0.5 justify-center", className)}>
            <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">{label}</span>
                {Icon && <Icon className="h-2.5 w-2.5 text-slate-300" />}
            </div>
            <span className={cn(
                "text-lg font-bold tabular-nums leading-none tracking-tight whitespace-nowrap",
                colorClass
            )}>
                {typeof value === 'number' ? `${prefix}${numberFormatter.format(Math.abs(value))}` : value}
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
    allCashbackStatuses = [],
    isSyncing = false,
    syncingText,
    hasFilter = false,
    onSyncCycle
}: PeopleHeaderProps) {
    const isSettled = Math.abs(stats.remains) < 100
    const currentCycleRepayPercent = stats.netLend > 0 ? Math.min(100, Math.round((Math.abs(stats.repay) / Math.abs(stats.netLend)) * 100)) : 0
    
    const cashbackGoalPercent = (cashbackStatus && hasFilter) ? (
        cashbackStatus.needToSpend > 0 
            ? Math.min(100, Math.round(((cashbackStatus.minSpend > 0 ? (cashbackStatus.minSpend - cashbackStatus.needToSpend) / cashbackStatus.minSpend : 1)) * 100))
            : Math.min(100, Math.round(((cashbackStatus.cap > 0 ? cashbackStatus.earned / cashbackStatus.cap : (cashbackStatus.earned > 0 ? 1 : 0))) * 100))
    ) : (allCashbackStatuses.length > 0 ? (() => {
        const totalEarned = allCashbackStatuses.reduce((acc, curr) => acc + (curr.earned || 0), 0);
        const totalCap = allCashbackStatuses.reduce((acc, curr) => acc + (curr.cap > 0 ? curr.cap : 0), 0);
        return totalCap > 0 ? Math.min(100, Math.round((totalEarned / totalCap) * 100)) : (totalEarned > 0 ? 100 : 0);
    })() : 0)

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
            {/* COMPACT MAIN HEADER */}
            <div className="flex items-center px-4 py-3 gap-3 overflow-x-auto scrollbar-hide">
                
                {/* 1. IDENTITY CARD */}
                <div className="flex items-center gap-3 shrink-0 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm min-w-[220px] h-[92px]">
                    <div className="h-14 w-14 rounded-xl overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100 flex items-center justify-center">
                        {person.image_url ? (
                            <img src={person.image_url} alt={person.name} className="h-full w-full object-contain rounded-none bg-white" />
                        ) : (
                            <span className="text-xl font-bold text-emerald-600">{person.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div className="flex flex-col justify-center gap-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                            <h1 className="text-base font-bold text-slate-900 truncate tracking-tight">{person.name}</h1>
                            <span className={cn(
                                "text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest",
                                isSettled ? "bg-emerald-500 text-white shadow-sm" : "bg-slate-900 text-white"
                            )}>
                                {isSettled ? 'SETTLED' : 'ACTIVE'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-orange-100 bg-orange-50/50 w-fit">
                            <Calendar className="h-2.5 w-2.5 text-orange-600" />
                            <span className="text-[10px] font-bold text-orange-700 tracking-tight leading-none uppercase">
                                {activeCycle?.tag || 'All Time'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN DASHBOARD CARD */}
                <div className="flex flex-1 items-stretch bg-white border border-slate-100 rounded-2xl shadow-sm h-[92px] overflow-hidden relative">
                    {/* Inner Loader Overlay */}
                    {isSyncing && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center transition-all duration-300">
                            <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                        </div>
                    )}

                    {/* SUMMARY SECTION */}
                    <div className="flex items-center gap-0 px-6 py-2 shrink-0">
                        <div className="flex items-center gap-6 pr-6">
                            <CircularProgress percent={currentCycleRepayPercent} label="Repaid" colorClass="text-emerald-500" />
                        </div>
                        
                        <div className="flex items-center border-l border-slate-200 ml-4 pl-10 gap-10">
                            <MetricItem label="Initial" value={stats.originalLend} colorClass="text-slate-900" className="pr-10 border-r border-slate-200" />
                            <MetricItem label="Back" value={stats.cashback} colorClass="text-amber-600" className="pr-10 border-r border-slate-200" />
                            <MetricItem label="Repaid" value={stats.repay} colorClass="text-emerald-600" className="pr-10 border-r border-slate-200" />
                            
                            <StatsPopover
                                personId={person.id}
                                tag={activeCycle?.tag}
                                originalLend={stats.originalLend}
                                cashback={stats.cashback}
                                netLend={stats.netLend}
                                repay={stats.repay}
                                remains={stats.remains}
                                paidRollover={stats.paidRollover}
                                receiveRollover={stats.receiveRollover}
                            >
                                <button className="text-left hover:opacity-80 transition-opacity">
                                    <MetricItem label="Remains" value={stats.remains} colorClass="text-rose-600" />
                                </button>
                            </StatsPopover>
                        </div>
                    </div>

                    {/* VERTICAL DIVIDER */}
                    <div className="w-px bg-slate-100 my-4" />

                    {/* REWARDS SECTION */}
                    <div className="flex flex-1 items-center gap-6 px-6 py-2 bg-slate-50/40">
                        <CircularProgress percent={cashbackGoalPercent} label="Goal" colorClass="text-blue-500" />

                        {(cashbackStatus && hasFilter) ? (
                            <div className="flex-1 flex items-center gap-6 min-w-0">
                                <div className="flex items-center gap-6">
                                    <MetricItem 
                                        label="Profit" 
                                        value={cashbackStatus.profit || 0} 
                                        colorClass="text-emerald-600" 
                                        icon={TrendingUp}
                                        prefix="+"
                                    />
                                    <MetricItem label="Earned" value={cashbackStatus.earned} colorClass="text-slate-900" icon={Gift} />
                                    <MetricItem label="Shared" value={cashbackStatus.shared || 0} colorClass="text-slate-600" icon={Users} />
                                </div>

                                {/* Status / Missing section */}
                                <div className="flex items-center h-full">
                                    {cashbackStatus.needToSpend > 0 ? (
                                        <MetricItem 
                                            label="Missing" 
                                            value={cashbackStatus.needToSpend} 
                                            colorClass="text-orange-600" 
                                            icon={TrendingDown}
                                            prefix="-"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-end gap-0.5">
                                            <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">STATUS</span>
                                            <div className="flex items-center gap-1 text-emerald-600">
                                                <Zap className="h-3 w-3 fill-emerald-600" />
                                                <span className="text-sm font-bold tracking-tight uppercase">QUALIFIED</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : allCashbackStatuses.length > 0 ? (
                            <div className="flex-1 flex items-center gap-4 overflow-hidden min-w-0">
                                <div className="flex items-center gap-2 flex-nowrap overflow-hidden">
                                    {allCashbackStatuses
                                        .filter(s => s.needToSpend > 0 || (s.profit || 0) > 0)
                                        .slice(0, 4)
                                        .map((status, idx) => (
                                        <div key={status.account_id} className={cn(
                                            "h-11 px-4 rounded-lg border flex items-center gap-3 shrink-0 animate-in fade-in slide-in-from-left-2 duration-300",
                                            status.needToSpend > 0 
                                                ? "bg-orange-50/50 border-orange-100 shadow-[0_1px_2px_rgba(249,115,22,0.05)]" 
                                                : "bg-emerald-50/50 border-emerald-100 shadow-[0_1px_2px_rgba(16,185,129,0.05)]",
                                            idx > 2 && "hidden lg:flex",
                                            idx > 3 && "hidden xl:flex"
                                        )}>
                                            <div className="h-9 w-9 rounded-md bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                                {status.accountImage ? (
                                                    <img src={status.accountImage} alt={status.accountName} className="h-full w-full object-contain rounded-none bg-white p-0.5" />
                                                ) : (
                                                    <Wallet className="h-3.5 w-3.5 text-slate-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter truncate leading-none mb-1 pr-2">
                                                    {status.accountName}
                                                </span>
                                                <div className="flex items-center gap-1.5 leading-none">
                                                    {status.needToSpend > 0 ? (
                                                        <>
                                                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-tighter leading-none mb-0.5">MISSING</span>
                                                            <span className="text-[12px] font-black text-orange-900 tracking-tight leading-none tabular-nums">
                                                                {Math.round(status.needToSpend).toLocaleString()}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter leading-none mb-0.5">OK</span>
                                                            <span className="text-[12px] font-black text-emerald-900 tracking-tight leading-none tabular-nums">
                                                                +{Math.round(status.profit || 0).toLocaleString()}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {allCashbackStatuses.length > 4 && (
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600 shrink-0 shadow-sm hover:border-blue-400 hover:text-blue-600 transition-colors cursor-help group">
                                                        +{allCashbackStatuses.length - 4}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="bottom" align="center" className="p-2 w-64 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-xl z-[200]">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="px-2 py-1 border-b border-slate-100 mb-1">
                                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Other Reward Cards</span>
                                                        </div>
                                                        {allCashbackStatuses.slice(4).map(s => (
                                                            <div key={s.account_id} className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                                                <div className="h-6 w-6 rounded border border-slate-100 overflow-hidden shrink-0 bg-white">
                                                                    <img src={s.accountImage} className="h-full w-full object-contain rounded-none bg-white" />
                                                                </div>
                                                                <div className="flex-1 flex flex-col min-w-0">
                                                                    <span className="text-[10px] font-bold text-slate-700 truncate">{s.accountName}</span>
                                                                    <span className={cn(
                                                                        "text-[9px] font-black truncate uppercase",
                                                                        s.needToSpend > 0 ? "text-orange-600" : "text-emerald-600"
                                                                    )}>
                                                                        {s.needToSpend > 0 ? `Missing ${Math.round(s.needToSpend).toLocaleString()}` : `Profit +${Math.round(s.profit || 0).toLocaleString()}`}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>

                                <div className="ml-auto pr-6 flex flex-col items-end shrink-0 group cursor-help transition-all duration-300 min-w-0">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 whitespace-nowrap">
                                        COMBINED PROFIT <TrendingUp className="h-2.5 w-2.5" />
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[20px] font-black text-emerald-600 tracking-tighter leading-none [text-shadow:0_1px_1px_rgba(255,255,255,0.8)] tabular-nums">
                                            +{allCashbackStatuses.reduce((acc, curr) => acc + (curr.profit || 0), 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center h-full">
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic flex items-center gap-2">
                                    <Wallet className="h-3 w-3" /> No Rewards Data
                                </span>
                            </div>
                        )}
                        
                        {/* Detail Link for Rewards */}
                        {cashbackStatus?.account_id && (
                            <button 
                                onClick={() => window.open(`/accounts/${cashbackStatus.account_id}?tag=${activeCycle?.tag}`, '_blank')}
                                className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all ml-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* 3. ACTIONS CARD */}
                <div className="flex items-center gap-2 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm h-[92px] shrink-0">
                    <button 
                        onClick={() => onEdit()}
                        className="flex flex-col items-center justify-center gap-1 h-full w-[64px] rounded-xl border border-slate-100 hover:bg-slate-50 transition-all hover:border-indigo-100 group shadow-sm bg-white"
                        title="Edit Profile"
                    >
                        <Edit className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">EDIT</span>
                    </button>
                </div>
            </div>
            
            {/* TABS BAR (Consistent height) */}
            <div className="px-6 py-0 bg-white flex items-center justify-between border-t border-slate-100 h-9">
                <div className="flex items-center gap-2 h-full">
                    {(['timeline', 'split-bill'] as const).map((tab) => {
                        const Icon = tab === 'split-bill' ? Split : LayoutGrid;
                        const label = tab === 'split-bill' ? 'Split Bill' : 'Transactions';
                        return (
                            <button
                                key={tab}
                                onClick={() => onTabChange(tab)}
                                className={cn(
                                    "px-4 h-full text-[10px] font-black uppercase tracking-[0.1em] relative transition-all flex items-center gap-2",
                                    activeTab === tab 
                                        ? "text-indigo-600 bg-indigo-50/30" 
                                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <Icon className={cn("h-3.5 w-3.5", activeTab === tab ? "text-indigo-600" : "text-slate-300")} />
                                <span>{label}</span>
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full shadow-[0_-2px_4px_rgba(79,70,229,0.3)]" />
                                )}
                            </button>
                        );
                    })}
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
