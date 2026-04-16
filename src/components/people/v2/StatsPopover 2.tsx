import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { FileText, ArrowRight, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { syncPeopleDebtAction } from '@/actions/people-actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface StatsPopoverProps {
    personId?: string
    tag?: string
    originalLend: number
    cashback: number
    netLend: number
    repay: number
    remains: number
    paidRollover?: number | null
    receiveRollover?: number | null
    outstandingDebt?: number | null
    children?: React.ReactNode
    tabs?: Array<{
        key: string
        label: string
        stats: {
            originalLend: number
            cashback: number
            netLend: number
            repay: number
            remains: number
            paidRollover?: number | null
            receiveRollover?: number | null
            outstandingDebt?: number | null
        }
    }>
}

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})

export function StatsPopover({
    personId,
    tag,
    originalLend,
    cashback,
    netLend,
    repay,
    remains,
    paidRollover,
    receiveRollover,
    outstandingDebt,
    children,
    tabs,
}: StatsPopoverProps) {
    const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.key ?? 'default')
    const [isSyncing, setIsSyncing] = useState(false)

    const tabStats = tabs?.find((tab) => tab.key === activeTab)?.stats
    const view = tabStats ?? {
        originalLend,
        cashback,
        netLend,
        repay,
        remains,
        paidRollover,
        receiveRollover,
        outstandingDebt,
    }

    const handleSync = async () => {
        if (!personId || !tag || isSyncing) return
        setIsSyncing(true)
        try {
            const res = await syncPeopleDebtAction(personId, tag)
            if (res.success) {
                toast.success('Debt cycle synced successfully')
            } else {
                toast.error((res as any).error || (res as any).message || 'Failed to sync debt cycle')
            }
        } catch (err) {
            toast.error('Unexpected error during sync')
        } finally {
            setIsSyncing(false)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children || (
                    <button className="flex items-center justify-center h-6 w-6 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors ml-2">
                        <FileText className="h-3.5 w-3.5" />
                    </button>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-4" align="center" side="bottom">
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <h4 className="font-bold text-sm text-slate-900">Balance Calculation</h4>
                </div>

                {tabs && tabs.length > 1 && (
                    <div className="mb-3 inline-flex items-center rounded-lg border border-slate-200 p-1 bg-slate-50">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={cn(
                                    'h-7 px-3 rounded-md text-[11px] font-bold transition-colors',
                                    activeTab === tab.key
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between text-xs mb-2 text-slate-500">
                    <span>Flow logic</span>
                    <span>Values</span>
                </div>

                <div className="space-y-4 relative">
                    {/* 1. INITIAL (Gross) */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 group hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">1. Initial (Gross)</span>
                            <span className="text-[9px] text-slate-400">Total spent for member</span>
                        </div>
                        <span className="text-sm font-black text-slate-900 tabular-nums">
                            {numberFormatter.format(view.originalLend)}
                        </span>
                    </div>

                    <div className="flex justify-center -my-2.5 relative z-10 w-full">
                        <div className="p-1 bg-white border border-slate-200 rounded-full shadow-sm text-slate-300">
                            <ArrowRight className="h-2.5 w-2.5 rotate-90" />
                        </div>
                    </div>

                    {/* 2. BACK (Shared) */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/30 group hover:bg-emerald-50 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.1em]">2. Back (Shared)</span>
                            <span className="text-[9px] text-emerald-400">Cashback share/adjustments</span>
                        </div>
                        <span className="text-sm font-black text-emerald-600 tabular-nums">
                            -{numberFormatter.format(view.cashback)}
                        </span>
                    </div>

                    <div className="flex justify-center -my-2.5 relative z-10 w-full">
                        <div className="p-1 bg-white border border-slate-200 rounded-full shadow-sm text-slate-300">
                            <ArrowRight className="h-2.5 w-2.5 rotate-90" />
                        </div>
                    </div>

                    {/* 3. LEND (Net) */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-indigo-100 bg-indigo-50/30 group hover:bg-indigo-50 transition-colors">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.1em]">3. Lend (Net)</span>
                                <div className="h-1 w-1 rounded-full bg-indigo-400" />
                            </div>
                            <span className="text-[9px] text-indigo-400 font-medium">Principal (INITIAL - BACK)</span>
                        </div>
                        <span className="text-sm font-black text-indigo-700 tabular-nums">
                            {numberFormatter.format(view.netLend)}
                        </span>
                    </div>

                    <div className="flex justify-center -my-2.5 relative z-10 w-full">
                        <div className="p-1 bg-white border border-slate-200 rounded-full shadow-sm text-slate-300">
                            <ArrowRight className="h-2.5 w-2.5 rotate-90" />
                        </div>
                    </div>

                    {/* 4. REPAY */}
                    <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 group hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">4. Repay (Paid)</span>
                            <span className="text-[9px] text-slate-400">Transactions / Rollovers</span>
                        </div>
                        <span className="text-sm font-black text-slate-600 tabular-nums">
                            -{numberFormatter.format(view.repay)}
                        </span>
                    </div>

                    {/* Divider for Grand Final */}
                    <div className="h-px bg-slate-100 mx-2 my-1" />

                    {/* 5. REMAINS */}
                    <div className={cn(
                        "flex items-center justify-between p-3 rounded-xl border group transition-all duration-300",
                        view.remains <= 1000 
                            ? "bg-emerald-500 border-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.2)]" 
                            : "bg-rose-500 border-rose-400 shadow-[0_4px_12px_rgba(244,63,94,0.2)]"
                    )}>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-white/90 uppercase tracking-[0.15em]">5. Remains (Out)</span>
                            <span className="text-[9px] text-white/70">Calculated Debt: LEND - REPAY</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-black text-white tabular-nums drop-shadow-sm">
                                {numberFormatter.format(view.remains)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">Data Integrity</span>
                        <span className="text-[8px] text-slate-400">Lock calculations to database</span>
                    </div>

                    <button
                        onClick={handleSync}
                        disabled={!personId || !tag || isSyncing}
                        type="button"
                        className={cn(
                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                            isSyncing 
                                ? "bg-slate-100 text-slate-400 cursor-wait"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-indigo-300 active:scale-95"
                        )}
                    >
                        {isSyncing ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                            <RefreshCw className="h-3 w-3" />
                        )}
                        {isSyncing ? 'Syncing...' : 'Fix Data'}
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
