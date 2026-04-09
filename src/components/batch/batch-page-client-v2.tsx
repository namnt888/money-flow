'use client'

import { useState, useEffect, useTransition } from 'react'
import { BatchList } from '@/components/batch/batch-list-simple'
import { BatchDetail } from '@/components/batch/batch-detail'
import { BatchSettingsSlide } from '@/components/batch/batch-settings-slide'
import { BatchMasterChecklist } from '@/components/batch/BatchMasterChecklist'
import { BatchMasterSlide } from '@/components/batch/BatchMasterSlide'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Sparkles, Database, Loader2, RefreshCw, ExternalLink, FileSpreadsheet, CheckCircle2, CheckCircle, CircleDashed, Snowflake, Leaf, Flower2, SunMedium, CloudSun } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { bulkInitializeFromMasterAction } from '@/actions/batch-speed.actions'
import { Combobox } from '@/components/ui/combobox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface BatchPageClientV2Props {
    batches: any[]
    accounts: any[]
    categories?: any[]
    bankMappings: any[]
    webhookLinks: any[]
    bankType: string
    activeBatch?: any
    activeInstallmentAccounts?: string[]
    cutoffDay?: number
    globalSheetUrl?: string | null
    globalSheetName?: string | null
    phases?: any[]
    selectedPhaseId?: string | null
    checklistData?: any
    batchSettings?: any
}

export function BatchPageClientV2({
    batches,
    accounts,
    categories = [],
    bankMappings,
    webhookLinks,
    bankType,
    activeBatch,
    activeInstallmentAccounts,
    cutoffDay = 15,
    globalSheetUrl,
    globalSheetName,
    phases = [],
    selectedPhaseId = null,
    checklistData,
    batchSettings,
}: BatchPageClientV2Props) {
    const router = useRouter()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [templateOpen, setTemplateOpen] = useState(false)

    const [isPending, startTransition] = useTransition()
    const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active')
    const [isSyncingMaster, setIsSyncingMaster] = useState(false)
    const [loadingMonth, setLoadingMonth] = useState<string | null>(null)
    const [checklistRefreshNonce, setChecklistRefreshNonce] = useState(0)

    const searchParams = useSearchParams()
    const selectedMonthParam = searchParams.get('month')
    const selectedPeriodParam = searchParams.get('period') || 'before'
    const selectedPhaseParam = searchParams.get('phase') || selectedPhaseId || null

    const effectivePhases = phases.length > 0 ? phases : [
        { id: 'before', label: 'Phase 1', period_type: 'before', cutoff_day: cutoffDay, sort_order: 0, is_active: true },
        { id: 'after', label: 'Phase 2', period_type: 'after', cutoff_day: cutoffDay, sort_order: 1, is_active: true },
    ]
    const currentPhase =
        effectivePhases.find((phase: any) => phase.id === selectedPhaseParam)
        || effectivePhases.find((phase: any) => phase.period_type === selectedPeriodParam)
        || effectivePhases[0]
    const currentPhaseId = currentPhase?.id || null

    // Current active month is derived from activeBatch or search param
    const currentMonth = activeBatch ? activeBatch.month_year : selectedMonthParam || null
    const currentPeriod = currentPhase?.period_type || (activeBatch ? (activeBatch.period || 'before') : selectedPeriodParam)

    const [optimisticMonth, setOptimisticMonth] = useState<string | null>(currentMonth)
    const [selectedYear, setSelectedYear] = useState(() =>
        currentMonth ? currentMonth.split('-')[0] : String(new Date().getFullYear())
    )


    useEffect(() => {
        setOptimisticMonth(currentMonth)
        if (currentMonth) setSelectedYear(currentMonth.split('-')[0])
    }, [currentMonth])

    useEffect(() => {
        if (!isPending) {
            setLoadingMonth(null)
            setOptimisticMonth(currentMonth)
        }
    }, [isPending, currentMonth])

    const visibleBatches = batches.filter(b => b.is_archived)

    const getPhaseRangeLabel = (phase: any) => {
        const cutoff = Number(phase?.cutoff_day || cutoffDay)
        if ((phase?.period_type || 'before') === 'before') {
            return `Day <= ${cutoff}`
        }
        return `Day > ${cutoff}`
    }

    async function handleStartBatch() {
        if (!selectedMonthParam) {
            toast.error('Please select a month first')
            return
        }

        // Implicitly create batch for the selected month
        const date = new Date(selectedMonthParam + '-01')
        const monthBaseName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        const monthName = `${monthBaseName} (${currentPhase?.label || (currentPeriod === 'before' ? `Before ${cutoffDay}` : `After ${cutoffDay}`)})`

        try {
            const { createFreshBatchAction, setBatchPeriodAction, setBatchPhaseAction } = await import('@/actions/batch-create.actions')
            const result = await createFreshBatchAction({
                monthYear: selectedMonthParam,
                monthName,
                bankType: bankType as 'MBB' | 'VIB'
            })

            if (result.success) {
                await setBatchPeriodAction(result.data.id, currentPeriod as 'before' | 'after')
                if (currentPhaseId) {
                    await setBatchPhaseAction(result.data.id, currentPhaseId)
                }

                toast.success(`Started batch for ${monthName}`)
                router.refresh()
            } else {
                toast.error(result.error || 'Failed to start batch')
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to create batch')
        }
    }

    function closeTransientPortals() {
        const activeElement = document.activeElement as HTMLElement | null
        activeElement?.blur()
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    }

    function handleMonthSelect(month: string) {
        if (month === currentMonth) return;
        setLoadingMonth(month)
        setOptimisticMonth(month)
        closeTransientPortals()
        startTransition(() => {
            const queryPhase = currentPhaseId ? `&phase=${currentPhaseId}` : ''
            router.push(`/batch/${bankType.toLowerCase()}?month=${month}&period=${currentPeriod}${queryPhase}`)
        })
    }

    function handlePeriodSelect(period: string, phaseId?: string | null) {
        if (currentMonth) {
            closeTransientPortals()
            startTransition(() => {
                const queryPhase = phaseId ? `&phase=${phaseId}` : ''
                router.push(`/batch/${bankType.toLowerCase()}?month=${currentMonth}&period=${period}${queryPhase}`)
            })
        }
    }

    async function handleSyncCurrentPhase() {
        if (!currentMonth) {
            toast.error('Select a month first')
            return
        }
        setIsSyncingMaster(true)
        try {
            const result = await bulkInitializeFromMasterAction({
                monthYear: currentMonth,
                period: currentPeriod as 'before' | 'after',
                bankType: bankType as 'MBB' | 'VIB',
                phaseId: currentPhaseId || undefined,
            })
            if (result.success) {
                toast.success(`Synced ${result.initializedCount ?? 0} items`)
                setChecklistRefreshNonce((prev) => prev + 1)
                router.refresh()
            } else {
                toast.error('Sync failed')
            }
        } catch (e: any) {
            toast.error(e.message || 'Sync failed')
        } finally {
            setIsSyncingMaster(false)
        }
    }

    const calendarYear = new Date().getFullYear()
    const calendarMonth = new Date().getMonth() + 1
    const yearSelectorItems = [calendarYear, calendarYear - 1, calendarYear - 2].map(y => ({
        value: String(y), label: String(y)
    }))
    const MONTH_NAMES_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const getSeasonIcon = (monthNum: number) => {
        if (monthNum === 12 || monthNum <= 2) return Snowflake
        if (monthNum <= 4) return Flower2
        if (monthNum <= 8) return SunMedium
        if (monthNum <= 10) return Leaf
        return CloudSun
    }
    const getMonthStatusMeta = (mTotal: number, mConfirmed: number) => {
        if (mTotal === 0) {
            return { label: 'None', tone: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', icon: CircleDashed }
        }
        if (mConfirmed >= mTotal) {
            return { label: 'Done', tone: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle }
        }
        return { label: 'Process', tone: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', icon: Loader2 }
    }
    const getPhaseLabel = (phase: any) => {
        const cutoff = String(phase?.cutoff_day || cutoffDay).padStart(2, '0')
        if (phase?.label) return phase.label
        return phase?.period_type === 'before' ? `Before ${cutoff}` : `After ${cutoff}`
    }
    const normalizePhaseText = (value: string) =>
        String(value || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
    const getMonthBatches = (monthYear: string) => {
        const activeMonthBatches = Array.isArray(checklistData?.batches) ? checklistData.batches : []
        const sourceBatches = activeMonthBatches.length > 0 && monthYear === effectiveMonth
            ? activeMonthBatches
            : batches
        return sourceBatches.filter((batch) => batch.month_year === monthYear)
    }
    const getBatchCounts = (batch: any) => {
        const totalFromField = Number(batch?.total_items || 0)
        const confirmedFromField = Number(batch?.confirmed_items || 0)
        if (totalFromField > 0 || confirmedFromField > 0) {
            return { total: totalFromField, confirmed: confirmedFromField }
        }
        const rows = Array.isArray(batch?.batch_items) ? batch.batch_items : []
        const total = rows.length
        const confirmed = rows.filter((row: any) => row?.status === 'confirmed').length
        return { total, confirmed }
    }
    const getMonthPhaseSummary = (monthYear: string) => {
        const monthBatches = getMonthBatches(monthYear)
        const usedBatchIds = new Set<string>()

        const phaseRows = effectivePhases.map((phase: any) => {
            const phaseLabel = normalizePhaseText(getPhaseLabel(phase))
            const pickBatch = (predicate: (b: any) => boolean) => {
                const found = monthBatches.find((b: any) => {
                    const id = String(b?.id || '')
                    if (id && usedBatchIds.has(id)) return false
                    return predicate(b)
                })
                if (found?.id) usedBatchIds.add(String(found.id))
                return found || null
            }

            let batch = pickBatch((b: any) => String(b.phase_id || '') === String(phase.id || ''))

            if (!batch && phaseLabel) {
                batch = pickBatch((b: any) => normalizePhaseText(String(b.name || '')).includes(phaseLabel))
            }

            if (!batch) {
                batch = pickBatch((b: any) => String(b.period || '') === String(phase.period_type || ''))
            }

            if (!batch) {
                batch = pickBatch(() => true)
            }

            const { total, confirmed } = getBatchCounts(batch)
            const status = getMonthStatusMeta(total, confirmed)
            return { phase, total, confirmed, status }
        })

        const doneCount = phaseRows.filter((row) => row.total > 0 && row.confirmed >= row.total).length
        const processCount = phaseRows.filter((row) => row.total > 0 && row.confirmed < row.total).length
        const progressCount = doneCount + processCount
        const totalPhases = effectivePhases.length || phaseRows.length || 0

        const monthStatus = processCount > 0
            ? getMonthStatusMeta(1, 0)
            : doneCount > 0
                ? getMonthStatusMeta(1, 1)
                : getMonthStatusMeta(0, 0)

        return { phaseRows, doneCount, processCount, progressCount, totalPhases, monthStatus }
    }
    const monthSelectorItems = MONTH_NAMES_FULL.map((name, i) => {
        const monthNum = i + 1
        const mStr = `${selectedYear}-${String(monthNum).padStart(2, '0')}`
        const monthStats = batches.filter(b => b.month_year === mStr)
        const mTotal = monthStats.reduce((acc, b) => acc + (b.total_items || 0), 0)
        const mConfirmed = monthStats.reduce((acc, b) => acc + (b.confirmed_items || 0), 0)
        const isCurrent = String(calendarYear) === selectedYear && calendarMonth === monthNum
        const isActive = optimisticMonth === mStr
        return {
            value: mStr,
            label: name,
            searchValue: `${monthNum} ${name} ${MONTH_NAMES_SHORT[i]}`,
            description: mTotal > 0 ? `${mConfirmed}/${mTotal} confirmed` : undefined,
            icon: (
                <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0",
                    isActive ? "bg-slate-900 text-white" :
                    isCurrent ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                )}>
                    {loadingMonth === mStr ? <Loader2 className="h-3 w-3 animate-spin" /> : monthNum}
                </div>
            )
        }
    })
    const phaseSelectorItems = effectivePhases.map((phase: any, index: number) => ({
        value: phase.id,
        label: phase.label || `Phase ${index + 1}`,
        description:
            phase.period_type === 'before'
                ? `Day 1 - ${phase.cutoff_day}`
                : `Day ${Number(phase.cutoff_day || cutoffDay) + 1} - End`,
    }))

    return (
        <div className="h-full flex flex-col bg-slate-50/50">
            {/* Premium Header - Non-sticky as requested */}
            <div className="bg-white border-b border-slate-200 z-50 shadow-sm">
                <div className="w-full px-6 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* LEFT: LOGO & BANK TYPE */}
                        <div className="flex items-center gap-6 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "p-2 rounded-xl shadow-sm border",
                                    bankType === 'MBB' ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-purple-50 border-purple-100 text-purple-600"
                                )}>
                                    <Database className="h-5 w-5" />
                                </div>
                                <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">
                                    {bankType} Batch
                                </h1>
                            </div>
                        </div>

                        {/* RIGHT: MONTH TABS & ACTIONS */}
                        <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
                                <div className="flex flex-col gap-1.5 shrink-0">
                                    <TooltipProvider delayDuration={100}>
                                        {[...Array(2)].map((_, rowIdx) => (
                                            <div key={`month-row-${rowIdx}`} className="flex items-center gap-1.5">
                                                {MONTH_NAMES_FULL.slice(rowIdx * 6, rowIdx * 6 + 6).map((name, iLocal) => {
                                            const i = rowIdx * 6 + iLocal
                                            const monthNum = i + 1
                                            const mStr = `${selectedYear}-${String(monthNum).padStart(2, '0')}`
                                            const isActive = optimisticMonth === mStr
                                            const isCurrent = String(new Date().getFullYear()) === selectedYear && (new Date().getMonth() + 1) === monthNum
                                            const SeasonIcon = getSeasonIcon(monthNum)
                                            const { phaseRows, progressCount, totalPhases, monthStatus } = getMonthPhaseSummary(mStr)
                                            const MonthStatusIcon = monthStatus.icon

                                            return (
                                                <Tooltip key={mStr}>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => handleMonthSelect(mStr)}
                                                            disabled={isPending}
                                                            className={cn(
                                                                "px-3 h-10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-tight transition-all border shrink-0 whitespace-nowrap min-w-[108px]",
                                                                isActive 
                                                                    ? "bg-slate-900 text-white border-slate-950 shadow-lg shadow-slate-200 ring-2 ring-slate-900/10 -translate-y-0.5" 
                                                                    : isCurrent
                                                                        ? "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100"
                                                                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                                                            )}
                                                        >
                                                            {loadingMonth === mStr ? (
                                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <div className="flex items-center gap-1.5">
                                                                        <SeasonIcon className={cn("h-3.5 w-3.5", isActive ? "text-white/80" : isCurrent ? "text-indigo-500" : "text-slate-300")} />
                                                                        <span>{monthNum} {name.slice(0, 3)}</span>
                                                                    </div>
                                                                    <div className={cn(
                                                                        "flex items-center gap-1 pl-1.5 border-l",
                                                                        isActive ? "border-white/20" : "border-slate-100"
                                                                    )}>
                                                                        <MonthStatusIcon className={cn("h-3.5 w-3.5", isPending ? "animate-pulse" : "", isActive ? "text-white/90" : monthStatus.tone)} />
                                                                        <span className={cn("text-[10px] tabular-nums", isActive ? "text-white/90" : monthStatus.tone)}>{progressCount}/{totalPhases}</span>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent 
                                                        side="bottom" 
                                                        className="bg-slate-900 text-white p-3 rounded-2xl shadow-2xl border border-slate-800 min-w-[160px] z-[100]"
                                                    >
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 border-b border-slate-800 pb-1">
                                                            {name} Status
                                                        </p>
                                                        <div className="space-y-1.5">
                                                            {phaseRows.length > 0 ? phaseRows.map(({ phase, total, confirmed, status }) => {
                                                                const StatusIconRow = status.icon
                                                                return (
                                                                <div key={`${mStr}-${phase.id}`} className={cn("flex items-center justify-between gap-4 rounded-xl px-2 py-1.5 border", status.bg, status.border)}>
                                                                    <div className="flex items-center gap-1.5 min-w-0">
                                                                        <StatusIconRow className={cn("h-3.5 w-3.5 shrink-0", status.tone, status.icon === Loader2 ? "animate-spin" : "")} />
                                                                        <span className={cn("text-[10px] font-black truncate", status.tone)}>
                                                                            {getPhaseLabel(phase)}
                                                                        </span>
                                                                    </div>
                                                                    <span className={cn("text-[10px] font-black tabular-nums", status.tone)}>
                                                                        {status.label} {confirmed}/{total}
                                                                    </span>
                                                                </div>
                                                            )}) : (
                                                                <p className="text-[9px] text-slate-500 italic">No cycles started</p>
                                                            )}
                                                        </div>
                                                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center">
                                                            <span className="text-[10px] font-black text-indigo-400">TOTAL</span>
                                                            <span className="text-[10px] font-black">{progressCount}/{totalPhases}</span>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            )
                                                })}
                                            </div>
                                        ))}
                                    </TooltipProvider>
                                </div>
                                <div className="h-8 w-px bg-slate-100 mx-1 shrink-0" />
                                <div className="w-[100px] shrink-0">
                                    <Combobox
                                        value={selectedYear}
                                        onValueChange={(v) => v && setSelectedYear(v)}
                                        items={yearSelectorItems}
                                        placeholder="Year"
                                        hideClearButton={true}
                                        triggerClassName="h-8 border-slate-100 bg-slate-50/50 rounded-lg text-[10px] font-black pr-1"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {globalSheetUrl && (
                                    <a
                                        href={globalSheetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 transition-all shadow-sm shrink-0"
                                        title={globalSheetName || "Open Google Sheet"}
                                    >
                                        <FileSpreadsheet className="h-5 w-5" />
                                    </a>
                                )}
                                <Button
                                    onClick={() => setTemplateOpen(true)}
                                    variant="outline"
                                    className="h-10 px-3 rounded-xl border-amber-200 hover:bg-amber-50 font-black text-[9px] uppercase tracking-widest gap-2 text-amber-600 bg-amber-50/10 shrink-0"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    <span>Phases</span>
                                </Button>
                                <Button
                                    onClick={() => setSettingsOpen(true)}
                                    variant="outline"
                                    className="h-10 px-3 rounded-xl border-slate-200 hover:bg-slate-50 font-black text-[9px] uppercase tracking-widest gap-2 text-slate-600 shrink-0"
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </Button>
                            </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-slate-50">
                {activeTab === 'active' ? (
                    <div className="mx-auto px-6 py-6 max-w-[1600px] w-full">
                        <div className="relative space-y-6">
                            {isPending && (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/80 py-32 text-slate-400">
                                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                                    <p className="font-medium text-sm">Loading data for {optimisticMonth}...</p>
                                </div>
                            )}
                            <div className={isPending ? 'pointer-events-none opacity-40' : undefined}>
                                <BatchMasterChecklist
                                    bankType={bankType as 'MBB' | 'VIB'}
                                    accounts={accounts}
                                    bankMappings={bankMappings}
                                    batchSettings={batchSettings}
                                    globalSheetUrl={globalSheetUrl}
                                    globalSheetName={globalSheetName}
                                    monthYear={currentMonth || ''}
                                    initialPhaseId={currentPhaseId}
                                    refreshNonce={checklistRefreshNonce}
                                    serverChecklistData={checklistData}
                                    onManagePhases={() => setTemplateOpen(true)}
                                    onPhaseChange={(phaseId) => {
                                        const nextPhase = effectivePhases.find((phase: any) => phase.id === phaseId)
                                        if (!nextPhase || !currentMonth) return
                                        handlePeriodSelect(nextPhase.period_type || 'before', phaseId)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Archive View - List
                    <div className="container mx-auto px-4 py-6">
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h2 className="text-lg font-semibold text-slate-900 mb-4">Archived Batches</h2>
                            <BatchList
                                batches={visibleBatches}
                                mode="done"
                                accounts={accounts}
                                webhookLinks={webhookLinks}
                            />
                        </div>
                    </div>
                )}
            </div>

            <BatchSettingsSlide
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
            />

            <BatchMasterSlide
                open={templateOpen}
                onOpenChange={setTemplateOpen}
                bankType={bankType as any}
                accounts={accounts}
                categories={categories}
                bankMappings={bankMappings}
                initialPhaseId={selectedPhaseParam}
            />
        </div >
    )
}
