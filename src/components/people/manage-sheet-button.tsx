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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

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
    const isTagChanged = pendingCycleTag !== cycleTag;
    const isYearSelectedChanged = historyYear !== (selectedYear || 'all');

    if (onCycleChange && isTagChanged) {
      if (pendingCycleTag === 'all' && historyYear !== 'all' && onYearChange) {
        onYearChange(historyYear)
      } else {
        onCycleChange(pendingCycleTag)
      }
      setShowPopover(false)
    } else if (isYearSelectedChanged && onYearChange) {
      onYearChange(historyYear === 'all' ? null : historyYear)
      setShowPopover(false)
    } else if (onCycleChange) {
      // Force update if same tag and year but user clicked apply (ensures transition)
      onCycleChange(pendingCycleTag)
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
  const hasValidCycle = isYYYYMM(cycleTag)
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
    // If props selectedYear changes, sync state
    if (selectedYear) {
      setHistoryYear(selectedYear)
    } else if (!historyYear || historyYear === 'all') {
       // Only default if not already set to something specific
       const currentYear = new Date().getFullYear().toString()
       if (cycleYears.includes(currentYear)) setHistoryYear(currentYear)
    }
  }, [selectedYear, cycleYears])

  const filteredCycles = React.useMemo(() => {
    let searchStr = historySearch.trim().toLowerCase()
    
    // Normalize patterns like "-2" or " 2" to "-02"
    if (/^-\d$/.test(searchStr)) {
      searchStr = searchStr.replace('-', '-0')
    }

    const filtered = allCycles.filter((cycle) => {
      const tag = cycle.tag.toLowerCase()
      
      // Always show current active or pending cycle
      if (cycle.tag === cycleTag || cycle.tag === pendingCycleTag) return true;

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

    console.log('[ManageSheetButton] filterDebug:', {
      allCyclesCount: allCycles.length,
      historyYear,
      filteredCount: filtered.length,
      firstTag: allCycles[0]?.tag
    })

    return filtered
  }, [allCycles, historySearch, historyYear])

  const groupedFilteredCycles = React.useMemo(() => {
    const grouped = cycleYears
      .map((year) => ({
        year,
        cycles: filteredCycles.filter((cycle) => cycle.tag.startsWith(`${year}-`)),
      }))
      .filter((group) => group.cycles.length > 0)

    console.log('[ManageSheetButton] groupedDebug:', {
      cycleYears,
      groupedCount: grouped.length
    })

    return grouped
  }, [cycleYears, filteredCycles, pendingCycleTag])


  const handleManageCycle = () => {
    if (!hasValidCycle) {
      toast.error('Cycle tag must be YYYY-MM.')
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
        description: `Processing cycle ${cycleTag}`,
      })
      try {
        const res = await fetch('/api/sheets/manage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ personId, cycleTag }),
        })

        let data: ManageCycleSheetResponse | null = null
        try {
          data = (await res.json()) as ManageCycleSheetResponse
        } catch {
          data = null
        }

        if (!res.ok || data?.error) {
          toast.dismiss(toastId)
          const errorMessage = data?.error ?? res.statusText
          const debugParts = [
            data?.requestId ? `Req: ${data.requestId}` : null,
            data?.stage ? `Stage: ${data.stage}` : null,
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
                            ) : activeCycleRemains < -100 ? (
                              <span className="font-bold text-indigo-600 text-[10px]">
                                {numberFormatter.format(Math.abs(Math.round(activeCycleRemains)))}
                              </span>
                            ) : (
                              <span className="font-bold text-rose-600 text-[10px]">
                                {numberFormatter.format(Math.round(activeCycleRemains))}
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

        <PopoverContent className="w-[700px] p-0 overflow-hidden shadow-2xl border border-slate-200 rounded-3xl bg-white z-[100]" align={splitMode ? 'start' : 'end'} sideOffset={8}>
          <div className="flex flex-col max-h-[600px] bg-slate-50/10">
            {/* 1. COMPACT CONSOLIDATED STICKY HEADER */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
              {/* Main Row: Title + All Button + Search + Filter */}
              <div className="px-5 py-3 flex items-center gap-3">
                {/* Title Badge & All Switch */}
                <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl shrink-0">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all bg-white text-indigo-600 shadow-sm ring-1 ring-black/[0.03] uppercase tracking-wider">
                    <History className="h-3.5 w-3.5" /> History
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-wider ml-0.5 group",
                          (pendingCycleTag === 'all' || pendingCycleTag === '3m' || pendingCycleTag === 'year') 
                            ? "text-emerald-600 bg-emerald-50 shadow-sm" 
                            : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                        )}
                      >
                        <Zap className={cn("h-3 w-3", (pendingCycleTag === 'all' || pendingCycleTag === '3m' || pendingCycleTag === 'year') && "fill-emerald-600")} />
                        {pendingCycleTag === '3m' ? 'Last 3M' : pendingCycleTag === 'year' ? 'This Yr' : 'All'}
                        <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[180px] p-1 rounded-2xl shadow-2xl border-slate-200 z-[110]">
                      <DropdownMenuItem 
                        onClick={() => {
                          const now = new Date()
                          const currentTag = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
                          setPendingCycleTag(currentTag)
                        }}
                        className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                      >
                        Current Month
                        {pendingCycleTag === (new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0')) && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          setPendingCycleTag('3m')
                          setHistoryYear('all')
                        }}
                        className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                      >
                        Last 3 Months
                        {pendingCycleTag === '3m' && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          setPendingCycleTag('year')
                          setHistoryYear(new Date().getFullYear().toString())
                        }}
                        className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                      >
                        Entire Year
                        {pendingCycleTag === 'year' && <Check className="h-3.5 w-3.5 text-indigo-500" />}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-slate-100" />
                      <DropdownMenuItem 
                        onClick={() => {
                          setPendingCycleTag('all')
                          setHistoryYear('all')
                        }}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        All-Time History
                        {pendingCycleTag === 'all' && <Check className="h-3.5 w-3.5 text-rose-500" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Search Bar - Shrinked */}
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search YYYY-MM..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="w-full bg-slate-50/80 border border-slate-100 rounded-xl pl-9 pr-3 h-9 text-[12px] font-bold focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Year Selection - Smaller */}
                {cycleYears.length > 0 && (
                  <Select 
                    value={historyYear} 
                    onValueChange={(val) => setHistoryYear(val || 'all')}
                    items={[
                      { value: 'all', label: 'All Time' },
                      ...cycleYears.map(y => ({ value: y, label: y }))
                    ]}
                    className="h-9 min-w-[110px] w-auto px-3 bg-slate-50 border-slate-100 rounded-xl font-black text-slate-700 text-[10px] uppercase tracking-wider hover:bg-slate-100 transition-all border shrink-0 whitespace-nowrap overflow-hidden"
                    placeholder="Year"
                  />
                )}
              </div>

              {/* Sub-header: Column Labels - Also Sticky */}
              <div className="px-5 py-2 bg-slate-50/30 border-t border-slate-50 flex items-center">
                <div className="min-w-[100px] flex items-center">
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Time Cycle</span>
                </div>
                <div className="flex-1 grid grid-cols-4 items-center">
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest text-center">Initial</span>
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest text-center">Back</span>
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest text-center">Repaid</span>
                  <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest text-center">Result</span>
                </div>
              </div>
            </div>

            {/* 2. SCROLLABLE CYCLES LIST */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="space-y-1.5">
                {groupedFilteredCycles.length === 0 ? (
                  <div className="py-24 text-center flex flex-col items-center">
                    <Search className="h-10 w-10 text-slate-200 mb-4" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No cycles found</p>
                  </div>
                ) : (
                  groupedFilteredCycles.map((group) => (
                    <div key={group.year} className="space-y-1.5 pt-1.5 border-t border-slate-50 first:border-0 first:pt-0">
                      
                      {group.cycles.map((cycle) => {
                        const isSelected = cycleTag === cycle.tag // This is the actual active cycle from props
                        const settled = Math.abs(cycle.remains) <= 100
                        const isAdvance = cycle.remains < -100
                        const stats = cycle.stats || { originalLend: 0, cashback: 0, repay: 0 }
                        const initial = stats.originalLend || 0
                        const cashback = stats.cashback || 0
                        const repaid = stats.repay || 0
                        const remains = cycle.remains

                        return (
                          <button
                            key={cycle.tag}
                            type="button"
                            onClick={() => {
                              setPendingCycleTag(cycle.tag)
                            }}
                            className={cn(
                              "w-full text-left rounded-xl border transition-all duration-200 relative overflow-hidden flex h-12 items-center group/row",
                              pendingCycleTag === cycle.tag 
                                ? "bg-amber-100 border-amber-300 shadow-md ring-2 ring-amber-400/20 scale-[1.01] z-10" 
                                : isSelected
                                  ? "bg-slate-50 border-slate-200 shadow-sm"
                                  : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/50"
                            )}
                          >
                            {/* Left: Cycle Section */}
                            <div className={cn(
                                "min-w-[100px] px-3 py-2 flex flex-col justify-center border-r h-[70%] my-auto",
                                isSelected ? "border-amber-100" : "border-slate-50"
                            )}>
                              <span className={cn(
                                "text-sm font-black tracking-tight leading-none mb-0.5",
                                isSelected ? "text-amber-700" : "text-slate-900"
                              )}>
                                {cycle.tag}
                              </span>
                            </div>

                            {/* Right: Data Sections */}
                            <div className="flex-1 h-full grid grid-cols-4 items-center">
                              <div className={cn("flex flex-col items-center justify-center h-full border-r px-1 overflow-hidden", isSelected ? "border-amber-100/50" : "border-slate-50")}>
                                <span className={cn("text-[13px] font-bold tabular-nums truncate w-full text-center", isSelected ? "text-amber-900" : "text-slate-700")}>
                                  {numberFormatter.format(Math.round(initial))}
                                </span>
                              </div>
                              <div className={cn("flex flex-col items-center justify-center h-full border-r px-1 overflow-hidden", isSelected ? "border-amber-100/50" : "border-slate-50")}>
                                <span className="text-[13px] font-bold text-orange-500 tabular-nums truncate w-full text-center">
                                  {cashback > 0 ? `-${numberFormatter.format(Math.round(cashback))}` : '0'}
                                </span>
                              </div>
                              <div className={cn("flex flex-col items-center justify-center h-full border-r px-1 overflow-hidden", isSelected ? "border-amber-100/50" : "border-slate-50")}>
                                <span className="text-[13px] font-bold text-emerald-600 tabular-nums truncate w-full text-center">
                                  {numberFormatter.format(Math.round(repaid))}
                                </span>
                              </div>
                              <div className="h-full flex items-center justify-center px-2 min-w-0">
                                {settled ? (
                                  <div className={cn(
                                    "h-7 px-3 rounded-lg flex items-center justify-center shrink-0 w-fit",
                                    isSelected ? "bg-emerald-500 text-white shadow-sm" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  )}>
                                    <span className="text-[8px] font-black uppercase tracking-widest leading-none">SETTLED</span>
                                  </div>
                                ) : isAdvance ? (
                                  <div className={cn(
                                    "flex flex-col items-center justify-center py-1 px-3 rounded-lg shrink-0 w-fit min-w-[70px]",
                                    isSelected ? "bg-indigo-500 text-white shadow-sm" : "bg-indigo-50 border border-indigo-100"
                                  )}>
                                    <span className={cn("text-[12px] font-black tabular-nums", isSelected ? "text-white" : "text-indigo-600")}>
                                      {numberFormatter.format(Math.abs(Math.round(remains)))}
                                    </span>
                                  </div>
                                ) : (
                                  <div className={cn(
                                    "flex flex-col items-center justify-center py-1 px-3 rounded-lg shrink-0 w-fit min-w-[70px]",
                                    isSelected ? "bg-rose-500 text-white shadow-sm" : "bg-rose-50 border border-rose-100"
                                  )}>
                                    <span className={cn("text-[12px] font-black tabular-nums", isSelected ? "text-white" : "text-rose-600")}>
                                      {numberFormatter.format(Math.abs(Math.round(remains)))}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Hover Switch Indicator */}
                            <div className="absolute right-0 top-0 h-full w-1 bg-indigo-500 opacity-0 group-hover/row:opacity-100 transition-opacity" />
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. COMPACT FOOTER / APPLY ACTION */}
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-white text-[10px] font-bold">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 text-slate-400">
                   <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                   <span className="uppercase tracking-widest">Active: {cycleTag}</span>
                 </div>
                 {pendingCycleTag !== cycleTag && (
                   <div className="flex items-center gap-2 text-amber-600 animate-in fade-in slide-in-from-left-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                     <span className="uppercase tracking-widest">Selection: {pendingCycleTag}</span>
                   </div>
                 )}
               </div>
               
               <div className="flex items-center gap-3">
                 <button 
                   onClick={() => {
                     setPendingCycleTag(cycleTag)
                     setShowPopover(false)
                   }}
                   className="px-4 py-1.5 rounded-lg hover:bg-slate-50 transition-colors uppercase tracking-widest text-slate-400 hover:text-slate-600"
                 >
                   Cancel
                 </button>

                 {pendingCycleTag !== cycleTag && (
                   <Button
                     onClick={handleApply}
                     className="h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-6 font-black uppercase tracking-widest text-[9px] shadow-lg shadow-indigo-200 animate-in zoom-in-95"
                   >
                     Apply Change
                   </Button>
                 )}
               </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
