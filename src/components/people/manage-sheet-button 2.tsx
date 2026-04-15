'use client'

import React, { useEffect, useState, useTransition } from 'react'
import type { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { FileSpreadsheet, RefreshCcw, ExternalLink, Settings2, Save, Link2, FileJson, Landmark, QrCode, X, History, Calculator, ChevronUp, RotateCcw, RefreshCw, Lock, LockOpen, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { ManageCycleSheetResponse } from '@/types/sheet.types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Combobox, ComboboxItem } from '@/components/ui/combobox'
import { Search, ChevronDown, Check, ChevronsUpDown, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { isYYYYMM } from '@/lib/month-tag'
import { updatePersonAction } from '@/actions/people-actions'
import { SyncReportDialog } from './sync-report-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Account } from '@/types/moneyflow.types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
} from "@/components/ui/select"

interface DebtCycle {
  tag: string
  remains: number
  stats?: {
    lend: number
    repay: number
    originalLend: number
    cashback: number
  }
  isSettled?: boolean
  isSynced?: boolean
}

function extractCycleTagFromUrl(input?: string | null): string | null {
  if (!input) return null
  const raw = input.trim()
  if (!raw) return null

  try {
    const parsed = new URL(raw)
    const haystack = `${parsed.pathname} ${parsed.search} ${parsed.hash}`
    const match = haystack.match(/(20\d{2})[-_./](0[1-9]|1[0-2])/)
    if (!match) return null
    return `${match[1]}-${match[2]}`
  } catch {
    const match = raw.match(/(20\d{2})[-_./](0[1-9]|1[0-2])/)
    if (!match) return null
    return `${match[1]}-${match[2]}`
  }
}

function isValidLink(value: string | null | undefined): boolean {
  if (!value) return false
  const trimmed = value.trim()
  return /^https?:\/\//i.test(trimmed)
}

export interface ManageSheetButtonProps {
  personId?: string | null
  cycleTag: string
  initialSheetUrl?: string | null
  scriptLink?: string | null
  googleSheetUrl?: string | null
  sheetFullImg?: string | null
  showBankAccount?: boolean
  sheetBankInfo?: string | null
  sheetLinkedBankId?: string | null
  showQrImage?: boolean
  isMasterSheetEnabled?: boolean | null
  accounts?: Account[]
  className?: string
  buttonClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default'
  iconOnly?: boolean
  linkedLabel?: string
  unlinkedLabel?: string
  disabled?: boolean
  openAfterSuccess?: boolean
  showCycleAction?: boolean
  connectHref?: string
  showViewLink?: boolean
  splitMode?: boolean
  // New props for Multi-purpose Dropdown
  allCycles?: DebtCycle[]
  availableYears?: string[]
  selectedYear?: string | null
  onCycleChange?: (tag: string) => void
  onYearChange?: (year: string | null) => void
  currentCycleTag?: string
  isSettled?: boolean
  activeCycle?: DebtCycle
  activeCycleRemains?: number
  isPending?: boolean
  setIsGlobalLoading?: (loading: boolean) => void
  setLoadingMessage?: (msg: string | null) => void
  onSyncCycle?: (tag: string) => Promise<{ success: boolean; error?: string }>
  onOpenSettings?: () => void
}

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

function getMonthDisplayName(tag: string) {
  return tag
}

export function ManageSheetButton({
  personId,
  cycleTag,
  initialSheetUrl = null,
  scriptLink = null,
  googleSheetUrl = null,
  sheetFullImg = null,
  showBankAccount = false,
  sheetBankInfo = null,
  sheetLinkedBankId = null,
  showQrImage = false,
  accounts = [],
  className,
  buttonClassName,
  size = 'sm',
  iconOnly = false,
  linkedLabel = 'Manage Sheet',
  unlinkedLabel = 'Manage Sheet',
  disabled,
  openAfterSuccess = false,
  showCycleAction = true,
  connectHref,
  showViewLink = false,
  splitMode = false,
  allCycles = [],
  availableYears = [],
  selectedYear = null,
  onCycleChange,
  onYearChange,
  currentCycleTag,
  isSettled = false,
  activeCycle,
  activeCycleRemains = 0,
  isPending = false,
  isMasterSheetEnabled = false,
  setIsGlobalLoading,
  setLoadingMessage,
  onSyncCycle,
  onOpenSettings,
}: ManageSheetButtonProps) {
  const [historySearch, setHistorySearch] = useState('')
  const [sheetUrl, setSheetUrl] = useState<string | null>(initialSheetUrl ?? null)
  const [isManaging, startManageTransition] = useTransition()
  const [isSaving, startSaveTransition] = useTransition()
  const [showPopover, setShowPopover] = useState(false)
  const [pendingCycleTag, setPendingCycleTag] = useState<string>(cycleTag)

  // Memoize resolved active cycle for stability
  const activeCycleResolved = React.useMemo(() => {
    return activeCycle ?? allCycles.find(c => c.tag === cycleTag)
  }, [activeCycle, allCycles, cycleTag])

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPopover(!showPopover)
  }

  // Sync pending when cycleTag changes from outside
  useEffect(() => {
    setPendingCycleTag(cycleTag)
  }, [cycleTag])

  const handleApply = () => {
    if (onCycleChange && pendingCycleTag !== cycleTag) {
      if (pendingCycleTag === 'all' && historyYear !== 'all' && onYearChange) {
        onYearChange(historyYear)
      } else {
        onCycleChange(pendingCycleTag)
      }
      setShowPopover(false)
    }
  }

  // Sync Report State
  const [showReport, setShowReport] = useState(false)
  const [syncStats, setSyncStats] = useState<any>(null)
  
  const router = useRouter()

  useEffect(() => {
    setSheetUrl(initialSheetUrl ?? null)
  }, [initialSheetUrl])

  const label = sheetUrl ? linkedLabel : unlinkedLabel
  const icon = sheetUrl ? RefreshCcw : FileSpreadsheet
  const Icon = icon
  const isDisabled = disabled || !personId || isManaging || isSaving
  const hasValidScriptLink = scriptLink && scriptLink.trim().length > 0 && (scriptLink.startsWith('http') || scriptLink.startsWith('https'))

  // Get most recent year as default year
  const cycleYears = React.useMemo(() => {
    const sourceYears = availableYears.length > 0
      ? availableYears
      : Array.from(new Set(allCycles.filter(cycle => isYYYYMM(cycle.tag)).map(cycle => cycle.tag.split('-')[0]))).sort().reverse()

    return sourceYears.filter(Boolean)
  }, [allCycles, availableYears])

  const [historyYear, setHistoryYear] = useState<string>(() => {
    const currentYear = new Date().getFullYear().toString()
    return cycleYears.includes(currentYear) ? currentYear : (cycleYears[0] || 'all')
  })

  useEffect(() => {
    setHistoryYear(historyYear)
  }, [cycleYears])

  const filteredCycles = React.useMemo(() => {
    let searchStr = historySearch.trim().toLowerCase()
    
    // Normalize patterns like "-2" or " 2" to "-02"
    if (/^-\d$/.test(searchStr)) {
      searchStr = searchStr.replace('-', '-0')
    }

    return allCycles.filter((cycle) => {
      const tag = cycle.tag.toLowerCase()
      
      // Basic text matching
      const matchesSearch = !searchStr || 
                          tag.includes(searchStr) || 
                          getMonthDisplayName(cycle.tag).toLowerCase().includes(searchStr) ||
                          numberFormatter.format(cycle.remains).includes(searchStr)

      if (!matchesSearch) return false

      // If user is searching specifically (e.g., "-02" or "2026"), it should override the year filter
      const isGlobalPattern = searchStr.startsWith('-') || /^(20\d{2})/.test(searchStr)
      if (isGlobalPattern) return matchesSearch

      // Otherwise respect the year filter
      const matchesYear = historyYear === 'all' || tag.startsWith(`${historyYear}-`)
      return matchesYear
    })
  }, [allCycles, historySearch, historyYear])

  const groupedFilteredCycles = React.useMemo(() => {
    return cycleYears
      .map((year) => ({
        year,
        cycles: filteredCycles.filter((cycle) => cycle.tag.startsWith(`${year}-`) && cycle.tag !== pendingCycleTag),
      }))
      .filter((group) => group.cycles.length > 0)
  }, [cycleYears, filteredCycles, pendingCycleTag])


  const handleManageCycle = () => {
    const selectedCycle = pendingCycleTag || cycleTag
    const normalizedSelectedCycle = (() => {
      const raw = String(selectedCycle || '').trim()
      const lower = raw.toLowerCase()
      if (!raw) return raw
      if (lower === 'all history' || lower === 'all-time history' || lower === 'all time history') return 'all'
      if (lower === 'this yr' || lower === 'year' || lower === 'entire year') return historyYear || raw
      return raw
    })()
    const resolvedSyncCycleTag = (() => {
      if (isYYYYMM(normalizedSelectedCycle)) return normalizedSelectedCycle
      if (isMasterSheetEnabled && /^\d{4}$/.test(normalizedSelectedCycle)) return normalizedSelectedCycle
      if (isMasterSheetEnabled && normalizedSelectedCycle === 'all' && /^\d{4}$/.test(historyYear)) return historyYear
      return normalizedSelectedCycle
    })()

    const hasValidCycle =
      isYYYYMM(resolvedSyncCycleTag) ||
      Boolean(isMasterSheetEnabled && /^\d{4}$/.test(resolvedSyncCycleTag))

    if (!hasValidCycle) {
      toast.error('Sync cycle is invalid for current mode.', {
        description: `raw=${selectedCycle || '(empty)'} | normalized=${normalizedSelectedCycle || '(empty)'} | resolved=${resolvedSyncCycleTag || '(empty)'} | masterSheet=${isMasterSheetEnabled ? 'on' : 'off'}`,
      })
      return
    }
    if (!hasValidScriptLink) {
      toast.error('Add a valid Script Link before syncing.')
      return
    }

    setShowPopover(false)
    if (setIsGlobalLoading) setIsGlobalLoading(true)
    if (setLoadingMessage) setLoadingMessage(sheetUrl ? 'Syncing to Google Sheets...' : 'Creating Google Sheet...')

    startManageTransition(async () => {
      const toastId = toast.loading(sheetUrl ? 'Syncing sheet...' : 'Creating sheet...', {
        description: `Processing cycle ${resolvedSyncCycleTag}`,
      })
      try {
        const res = await fetch('/api/sheets/manage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ personId, cycleTag: resolvedSyncCycleTag }),
        })

        let data: ManageCycleSheetResponse | null = null
        try {
          data = (await res.json()) as ManageCycleSheetResponse
        } catch {
          data = null
        }

        if (!res.ok || data?.error) {
          toast.dismiss(toastId)
          const upstreamMessage = data?.error ?? res.statusText
          const errorMessage = upstreamMessage?.includes('Cycle tag must be YYYY-MM')
            ? 'Sheet rejected sync cycle format (upstream validation).'
            : upstreamMessage
          const debugParts = [
            data?.requestId ? `Req: ${data.requestId}` : null,
            data?.stage ? `Stage: ${data.stage}` : null,
            `raw=${selectedCycle || '(empty)'}`,
            `normalized=${normalizedSelectedCycle || '(empty)'}`,
            `resolved=${resolvedSyncCycleTag || '(empty)'}`,
            `masterSheet=${isMasterSheetEnabled ? 'on' : 'off'}`,
            upstreamMessage?.includes('Cycle tag must be YYYY-MM') ? `Upstream: ${upstreamMessage}` : null,
          ].filter(Boolean)

          toast.error(errorMessage || 'Manage sheet failed', {
            description: debugParts.length > 0 ? debugParts.join(' | ') : undefined,
          })

          if (data?.requestId || data?.stage || data?.debugMessage) {
            console.error('[ManageSheet] API failure', {
              requestId: data?.requestId,
              stage: data?.stage,
              error: data?.error,
              debugMessage: data?.debugMessage,
              status: res.status,
            })
          }
          return
        }

        if (!data) {
          toast.error('Sync failed: No response from server', { id: toastId })
          return
        }

        const nextUrl = data.sheetUrl ?? sheetUrl
        if (data.sheetUrl) {
          setSheetUrl(data.sheetUrl)
        }
        toast.dismiss(toastId)

        if (data.status === 'created' || data.status === 'synced') {
          // Success! Store stats but don't auto-open modal
          setSyncStats({
            syncedCount: data.syncedCount,
            manualPreserved: data.manualPreserved,
            totalRows: data.totalRows,
            sheetUrl: nextUrl
          })

          toast.success(data.status === 'created' ? 'Sheet created & synced' : 'Sheet synced successfully', {
            id: toastId,
            description: `Synced ${data.syncedCount} transactions.`,
            action: {
              label: 'View Report',
              onClick: () => setShowReport(true)
            },
          })
        } else {
          toast.error('Failed to sync sheet.', { id: toastId })
        }

        router.refresh()
      } catch (error) {
        toast.dismiss(toastId)
        toast.error('Manage sheet failed.')
        console.error('[ManageSheet] unexpected client failure', error)
      } finally {
        if (setIsGlobalLoading) setIsGlobalLoading(false)
        if (setLoadingMessage) setLoadingMessage(null)
      }
    })
  }
  const isAggregate = !cycleTag || cycleTag.toLowerCase().includes('all')

  return (
    <div className={cn(
      splitMode
        ? 'flex items-center rounded-xl border border-slate-200 hover:border-slate-300 overflow-hidden transition-all bg-white shadow-sm h-9'
        : 'inline-flex items-center gap-2',
      className
    )}>
      <SyncReportDialog
        open={showReport}
        onOpenChange={setShowReport}
        stats={syncStats}
        cycleTag={cycleTag}
      />

      <Popover open={showPopover} onOpenChange={setShowPopover}>
        {splitMode ? (
          <TooltipProvider delayDuration={100}>
            <div className="flex items-center h-full w-full">
              {/* 1. External Sheet Link Icon */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-none w-10 px-0 hover:bg-slate-50 h-full text-emerald-600 shrink-0 border-r border-slate-100"
                    disabled={!googleSheetUrl || !isValidLink(googleSheetUrl)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (googleSheetUrl) window.open(googleSheetUrl, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <FileSpreadsheet className="h-4.5 w-4.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="start" className="z-[100]">
                  <p>Open Sheet</p>
                </TooltipContent>
              </Tooltip>

              {/* 2. Quick Sync Icon Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-none w-10 px-0 hover:bg-slate-100 h-full text-slate-500 shrink-0 border-r border-slate-100"
                    disabled={isDisabled || isSaving}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleManageCycle();
                    }}
                  >
                    <RefreshCcw className={cn("h-4 w-4", (isManaging || isSaving || isPending) && "animate-spin")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center" className="z-[100]">
                  <p>Sync Now</p>
                </TooltipContent>
              </Tooltip>

              {/* 3. History Trigger (Middle Info Part) */}
              <div className="flex-1 h-full min-w-[120px]">
                <Tooltip>
                  <PopoverTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-none px-3 hover:bg-slate-50 h-full w-full flex items-center justify-between border-none overflow-hidden group",
                          buttonClassName
                        )}
                        disabled={isDisabled}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPopover(true)
                        }}
                      >
                        <span className="font-bold text-slate-800 tabular-nums truncate text-[11px] min-w-[80px]">{cycleTag || 'History'}</span>

                        {allCycles.length > 0 && (
                          <div className="flex items-center gap-1.5 ml-auto pl-2 shrink-0">
                            {selectedYear === null ? (
                              <span className="text-amber-700 font-bold text-[10px] uppercase">All</span>
                            ) : isSettled ? (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <span className="font-bold text-rose-600 text-[10px]">
                                {numberFormatter.format(activeCycleRemains)}
                              </span>
                            )}
                            <ChevronDown className="h-3 w-3 text-slate-300 group-hover:text-slate-500" />
                          </div>
                        )}
                      </Button>
                    </TooltipTrigger>
                  </PopoverTrigger>
                  <TooltipContent side="bottom" align="center" className="z-[100]">
                    <p>Debt History</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* 4. Settings Trigger Icon (Now calls prop) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-none w-10 px-0 hover:bg-slate-50 h-full text-slate-400 hover:text-indigo-600 shrink-0 flex items-center justify-center border-l border-slate-100"
                    disabled={!onOpenSettings}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowPopover(false)
                      onOpenSettings?.()
                    }}
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="end" className="z-[100]">
                  <p>Sheet Configurations</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        ) : (
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size={size === 'md' ? 'default' : size}
              className={cn("h-9 border-slate-200 rounded-xl", buttonClassName)}
              disabled={isDisabled}
              onClick={handleTriggerClick}
            >
              <Icon className={cn('h-4 w-4', !iconOnly && 'mr-2')} />
              {!iconOnly && label}
            </Button>
          </PopoverTrigger>
        )}

        <PopoverContent className="w-[700px] p-0 overflow-hidden shadow-2xl border border-slate-200 rounded-3xl bg-white" align={splitMode ? 'start' : 'end'} sideOffset={8}>
          <div className="flex flex-col max-h-[600px] bg-slate-50/10">
            {/* Header with Tabs */}
            <div className="px-8 pt-6 pb-6 bg-slate-50 border-b border-slate-200/60">
              <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit">
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all bg-white text-indigo-600 shadow-sm ring-1 ring-black/[0.03]"
                >
                  <History className="h-4 w-4" /> Debt History
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="px-8 py-5 flex items-center gap-4 bg-white sticky top-0 z-30 border-b border-slate-100 flex-nowrap overflow-x-auto scrollbar-hide">
              <div className="relative flex-1 min-w-[200px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search dates (YYYY-MM)..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl pl-11 pr-4 h-12 text-[13px] font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <Select 
                value={historyYear} 
                onValueChange={(val) => setHistoryYear(val || 'all')}
                items={[
                  { value: 'all', label: 'All Years' },
                  ...cycleYears.map(y => ({ value: y, label: y }))
                ]}
                className="h-12 w-32 bg-slate-50 border-slate-100 rounded-2xl font-bold text-slate-700 text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm border shrink-0"
                placeholder="Year"
              />
            </div>

            {/* Filter Summary Indicator */}
            <div className="px-8 py-2.5 bg-slate-50/50 border-y border-slate-100 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    {historySearch ? `Results for "${historySearch}"` : historyYear === 'all' ? 'All History Trace' : `${historyYear} History`}
                </span>
            </div>

            {/* Cycles List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* CURRENT SELECTION AT TOP */}
              <div className="space-y-4">
                <div className="px-2 sticky top-0 bg-white/95 backdrop-blur-sm py-1 z-10 flex items-center gap-4">
                  <span className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase">Selection</span>
                  <div className="h-px flex-1 bg-indigo-100/50" />
                </div>
                
                {pendingCycleTag === 'all' ? (
                  <div className={cn(
                    "group flex items-center p-0 rounded-[1.5rem] transition-all border text-left relative overflow-hidden h-[60px] bg-white border-blue-400 shadow-[0_10px_30px_rgba(59,130,246,0.1)] ring-1 ring-blue-50",
                    activeCycleResolved?.tag === '' && "border-emerald-400 ring-emerald-50 shadow-emerald-500/10"
                  )}>
                    <div className="flex-1 h-full flex items-center px-6 gap-4">
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shadow-md",
                          activeCycleResolved?.tag === '' ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
                        )}>
                          <History className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black tracking-tight text-slate-900 uppercase">
                             {historyYear === 'all' ? 'All Time History' : `All History ${historyYear}`}
                          </span>
                          {activeCycleResolved?.tag === '' && <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">Active View</span>}
                        </div>
                    </div>
                    
                    {activeCycleResolved?.tag !== '' ? (
                      <div className="w-[120px] h-full border-l border-slate-100 bg-blue-50/20 flex items-stretch">
                        <button
                          type="button"
                          onClick={() => {
                            if (historyYear === 'all') {
                                onCycleChange?.('all')
                            } else {
                                // If a specific year is chosen, we switch to All of that year
                                if (onYearChange) onYearChange(historyYear)
                                else onCycleChange?.('all')
                            }
                            setShowPopover(false)
                          }}
                          className="flex-1 flex flex-col items-center justify-center gap-1 bg-blue-600 hover:bg-slate-900 text-white transition-all shadow-md active:scale-95 group/btn"
                        >
                          <Zap className="h-4 w-4 transition-transform group-hover/btn:scale-125" />
                          <span className="text-[10px] font-black uppercase tracking-widest leading-none">Switch</span>
                        </button>
                      </div>
                    ) : (
                      <div className="w-[80px] h-full border-l border-slate-100 bg-emerald-50/20 flex items-center justify-center">
                        <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-500">
                          <Check className="h-5 w-5" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (() => {
                  const selectedCycle = allCycles.find(c => c.tag === pendingCycleTag)
                  if (!selectedCycle) return null
                  
                  const settled = selectedCycle.remains <= 100 // Threshold for settled
                  const stats = selectedCycle.stats || { originalLend: 0, cashback: 0, repay: 0 }
                  const initial = stats.originalLend || 0
                  const cashback = stats.cashback || 0
                  const repaid = stats.repay || 0
                  const remains = selectedCycle.remains

                  const isCurrentlyActive = activeCycleResolved?.tag === pendingCycleTag

                  return (
                    <div className={cn(
                      "group flex items-center p-0 rounded-[1.5rem] transition-all border text-left relative overflow-hidden h-[80px] bg-white ring-1",
                      isCurrentlyActive ? "border-emerald-400 ring-emerald-50 shadow-emerald-500/10" : "border-indigo-400 ring-indigo-50 shadow-[0_15px_40px_rgba(79,70,229,0.12)]"
                    )}>
                      {/* Left: Cycle Section */}
                      <div className={cn(
                        "w-[100px] h-full flex flex-col items-center justify-center border-r border-slate-100/80 transition-colors shrink-0",
                        isCurrentlyActive ? "bg-emerald-50/50" : "bg-indigo-50/50"
                      )}>
                        <span className={cn(
                          "text-lg font-black tracking-tight tabular-nums",
                          isCurrentlyActive ? "text-emerald-600" : "text-indigo-600"
                        )}>
                          {selectedCycle.tag}
                        </span>
                        {isCurrentlyActive && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">Active</span>
                          </div>
                        )}
                      </div>

                      {/* Right Data: 4 Column Grid */}
                      <div className="flex-1 h-full flex items-stretch overflow-hidden">
                        <div className="flex-1 grid grid-cols-4 px-2 min-w-0">
                          <div className="flex flex-col justify-center items-end text-right border-r border-slate-100 pr-3">
                            <span className="text-[9px] font-bold text-slate-400 tracking-tight leading-none mb-1 uppercase">Initial</span>
                            <span className="text-[13px] font-bold text-slate-700 tabular-nums">
                              {numberFormatter.format(initial)}
                            </span>
                          </div>
                          <div className="flex flex-col justify-center items-end text-right border-r border-slate-100 px-3">
                            <span className="text-[9px] font-bold text-orange-400 tracking-tight leading-none mb-1 uppercase">Back</span>
                            <span className="text-[12px] font-black text-orange-500 tabular-nums">
                              -{numberFormatter.format(cashback)}
                            </span>
                          </div>
                          <div className={cn("flex flex-col justify-center items-end text-right border-r border-slate-100 px-3", settled && "border-r-0")}>
                            <span className="text-[9px] font-bold text-emerald-400 tracking-tight leading-none mb-1 uppercase">Repaid</span>
                            <span className="text-[12px] font-black text-emerald-600 tabular-nums">
                              {numberFormatter.format(repaid)}
                            </span>
                          </div>
                          <div className="flex items-center justify-end pl-3">
                            {settled ? (
                              <div className="flex flex-col justify-center items-end text-right w-full">
                                  <span className="text-[9px] font-bold text-emerald-400 tracking-tight leading-none mb-1 uppercase">Status</span>
                                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none font-black text-[10px] uppercase tracking-wider py-0.5">Settled</Badge>
                              </div>
                            ) : (
                              <div className="flex flex-col justify-center items-end text-right w-full">
                                <span className="text-[9px] font-bold text-rose-400 tracking-tight leading-none mb-1 uppercase">Remains</span>
                                <span className={cn("text-[13px] font-black tabular-nums transition-colors text-rose-600")}>
                                  {numberFormatter.format(remains)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Column */}
                        <div className={cn(
                          "w-[100px] border-l border-slate-100 flex items-stretch shrink-0",
                          isCurrentlyActive ? "bg-emerald-50/20" : "bg-indigo-50/20"
                        )}>
                          {!isCurrentlyActive ? (
                             <button
                               type="button"
                               onClick={() => onCycleChange?.(pendingCycleTag)}
                               className="flex-1 flex flex-col items-center justify-center gap-1 bg-indigo-600 hover:bg-slate-900 text-white transition-all shadow-md active:scale-95 group/btn"
                             >
                                <Zap className="h-4 w-4 transition-transform group-hover/btn:scale-125" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Switch</span>
                             </button>
                          ) : (
                            <div className="flex-1 flex items-center justify-center">
                              <div className={cn(
                                "h-10 w-10 rounded-full text-white flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-500",
                                settled ? "bg-emerald-500 shadow-emerald-500/20" : "bg-emerald-400 shadow-emerald-400/20"
                              )}>
                                <Check className="h-5 w-5" strokeWidth={3} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

              {pendingCycleTag !== 'all' && (
                <div className="space-y-4">
                   <div className="px-2 sticky top-0 bg-white/95 backdrop-blur-sm py-1 z-10 flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Actions</span>
                    <div className="h-px flex-1 bg-slate-100/80" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setPendingCycleTag('all')}
                    className="group flex flex-col px-6 rounded-3xl transition-all border text-left relative overflow-hidden bg-white border-slate-100 hover:border-slate-300 shadow-sm h-14 justify-center"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <History className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-slate-500 group-hover:text-slate-900 transition-colors">
                          SWITCH TO ALL TIME VIEW
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {groupedFilteredCycles.length === 0 ? (
                <div className="py-24 text-center flex flex-col items-center">
                  <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Search className="h-10 w-10 text-slate-200" />
                  </div>
                  <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">No other cycles found</p>
                </div>
              ) : (
                groupedFilteredCycles.map((group) => (
                  <div key={group.year} className="space-y-4">
                    <div className="px-2 sticky top-0 bg-white/95 backdrop-blur-sm py-2.5 z-10 flex items-center gap-4">
                      <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">{group.year}</span>
                      <div className="h-px flex-1 bg-slate-100/80" />
                    </div>
                    <div className="grid gap-6">
                      {group.cycles.map((cycle) => {
                        const settled = Math.abs(cycle.remains) <= 100
                        const stats = cycle.stats || { originalLend: 0, cashback: 0, repay: 0 }
                        const initial = stats.originalLend || 0
                        const cashback = stats.cashback || 0
                        const repaid = stats.repay || 0
                        const remains = cycle.remains

                        return (
                          <button
                            key={cycle.tag}
                            type="button"
                            onClick={() => setPendingCycleTag(cycle.tag)}
                            className="group flex items-center p-0 rounded-[1.5rem] transition-all border border-slate-100 hover:border-slate-200 hover:shadow-md text-left relative overflow-hidden h-[80px] bg-white"
                          >
                            {/* Left: Cycle Section */}
                            <div className="min-w-[100px] h-full flex items-center justify-center border-r border-slate-100/80 bg-slate-50/30">
                              <span className="text-lg font-bold tracking-tight tabular-nums text-slate-800">
                                {cycle.tag}
                              </span>
                            </div>

                            {/* Right: Data Sections */}
                            <div className="flex-1 h-full grid grid-cols-4 px-2">
                              <div className="flex flex-col justify-center items-end text-right border-r border-slate-100 pr-3">
                                <span className="text-[9px] font-bold text-slate-400 tracking-tight leading-none mb-1">Initial</span>
                                <span className="text-[13px] font-bold text-slate-700 tabular-nums">
                                  {numberFormatter.format(initial)}
                                </span>
                              </div>
                              <div className="flex flex-col justify-center items-end text-right border-r border-slate-100 px-3">
                                <span className="text-[9px] font-bold text-orange-400 tracking-tight leading-none mb-1">Total Back</span>
                                <span className="text-[13px] font-bold text-orange-500 tabular-nums">
                                  -{numberFormatter.format(cashback)}
                                </span>
                              </div>
                              <div className={cn("flex flex-col justify-center items-end text-right px-3", !settled && "border-r border-slate-100")}>
                                <span className="text-[9px] font-bold text-emerald-400 tracking-tight leading-none mb-1">Repaid</span>
                                <span className="text-[13px] font-bold text-emerald-600 tabular-nums">
                                  {numberFormatter.format(repaid)}
                                </span>
                              </div>
                              <div className="flex items-center justify-end pl-3">
                                {settled ? (
                                  <div className="h-full w-full py-2 flex items-center justify-center">
                                    <div className="bg-emerald-500 text-white rounded-xl w-full h-[80%] flex flex-col items-center justify-center shadow-lg">
                                      <span className="text-[9px] font-bold tracking-widest leading-none mb-0.5">Status</span>
                                      <span className="text-[11px] font-bold leading-none">Settled</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col justify-center items-end text-right w-full">
                                    <span className="text-[9px] font-bold text-rose-400 tracking-tight leading-none mb-1">Remains</span>
                                    <div className="bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                                      <span className="text-[13px] font-bold text-rose-600 tabular-nums">
                                        {numberFormatter.format(remains)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Action Bar */}
            <div className="p-6 bg-white border-t border-slate-100 flex items-center gap-4">
              <Button
                size="lg"
                className="flex-1 h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 disabled:opacity-30"
                disabled={!pendingCycleTag || (pendingCycleTag === cycleTag && (pendingCycleTag !== 'all' || historyYear === selectedYear))}
                onClick={handleApply}
              >
                Switch to {pendingCycleTag === 'all' 
                  ? (historyYear === 'all' ? 'All History' : `History ${historyYear}`)
                  : (pendingCycleTag?.toUpperCase() || 'Cycle')}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
