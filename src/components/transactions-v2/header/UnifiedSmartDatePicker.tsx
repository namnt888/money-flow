'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { 
    CalendarIcon, 
    Check, 
    ChevronDown, 
    ChevronLeft, 
    ChevronRight, 
    Loader2, 
    Search, 
    X,
    History,
    Settings,
    RefreshCw,
    TrendingUp
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type PickerMode = 'month' | 'range' | 'date' | 'all' | 'year' | 'cycle'

interface UnifiedSmartDatePickerProps {
  date: Date
  dateRange: DateRange | undefined
  mode: PickerMode
  onDateChange: (date: Date) => void
  onRangeChange: (range: DateRange | undefined) => void
  onModeChange: (mode: PickerMode) => void
  disabledRange?: { start: Date; end: Date } | undefined
  availableMonths?: Set<string>
  availableDateRange?: DateRange | undefined
  statType?: 'debt' | 'cashback'
  cycles?: Array<{ 
    label: string; 
    value: string; 
    count?: number; 
    highlight?: boolean;
    stats?: {
      initial?: number;
      cashback?: number;
      repay?: number;
      shared?: number;
      spent?: number;
      earned?: number;
      profit?: number;
      remains?: number;
      isSettled?: boolean;
    }
  }>
  selectedCycleValue?: string
  onCycleSelect?: (cycleValue: string) => void
  isCycleLoading?: boolean
  fullWidth?: boolean
  locked?: boolean
  disabled?: boolean
  selectedYearValue?: string | null
  onYearSelect?: (year: string | null) => void
  onSyncCycle?: (tag: string) => Promise<{ success: boolean; error?: string }>
  isPending?: boolean
}

function parseStrictDate(input: string): Date | null {
  const match = input.trim().match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/)
  if (!match) return null

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const parsed = new Date(year, month - 1, day)

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null
  }

  return parsed
}

function parseSmartDateInput(input: string): { mode: 'date'; date: Date } | { mode: 'range'; range: DateRange } | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const single = parseStrictDate(trimmed)
  if (single) {
    return { mode: 'date', date: single }
  }

  const matches = trimmed.match(/\d{1,2}[\/-]\d{1,2}[\/-]\d{4}/g) || []
  if (matches.length < 2) return null

  const firstRaw = matches[0]
  const secondRaw = matches[1]
  if (!firstRaw || !secondRaw) return null

  const first = parseStrictDate(firstRaw)
  const second = parseStrictDate(secondRaw)
  if (!first || !second) return null

  const from = first <= second ? first : second
  const to = first <= second ? second : first
  return { mode: 'range', range: { from, to } }
}

function formatDateDigits(digits: string): string {
  const raw = digits.replace(/\D/g, '').slice(0, 8)
  if (raw.length <= 2) return raw
  if (raw.length <= 4) return `${raw.slice(0, 2)}-${raw.slice(2)}`
  return `${raw.slice(0, 2)}-${raw.slice(2, 4)}-${raw.slice(4)}`
}

function formatSmartInputMask(rawInput: string): string {
  const digits = rawInput.replace(/\D/g, '').slice(0, 16)
  if (digits.length <= 8) return formatDateDigits(digits)
  const first = formatDateDigits(digits.slice(0, 8))
  const second = formatDateDigits(digits.slice(8))
  return second ? `${first} - ${second}` : first
}

export function UnifiedSmartDatePicker({
  date,
  dateRange,
  mode,
  onDateChange,
  onRangeChange,
  onModeChange,
  disabledRange,
  availableMonths,
  availableDateRange,
  statType,
  cycles = [],
  selectedCycleValue,
  onCycleSelect,
  isCycleLoading,
  fullWidth,
  locked,
  disabled = false,
  selectedYearValue,
  onYearSelect,
  onSyncCycle,
  isPending = false,
}: UnifiedSmartDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [yearOpen, setYearOpen] = useState(false)
  const [localMode, setLocalMode] = useState<PickerMode>(mode)
  const [localDate, setLocalDate] = useState<Date>(date)
  const [localRange, setLocalRange] = useState<DateRange | undefined>(dateRange)
  const [localCycle, setLocalCycle] = useState<string>(selectedCycleValue || 'all')
  const [cycleSearch, setCycleSearch] = useState('')
  const [typedInput, setTypedInput] = useState('')
  const [inputWarning, setInputWarning] = useState<string | null>(null)

  const [debtTab, setDebtTab] = useState<'history' | 'configs'>('history')

  const cycleYears = useMemo(() => {
    const years = new Set<string>()
    ;(cycles || []).forEach((cycle) => {
      const valueYear = cycle.value.match(/^(\d{4})-/)?.[1]
      if (valueYear) years.add(valueYear)
    })
    return Array.from(years).sort((a, b) => Number(b) - Number(a))
  }, [cycles])

  const [cycleYearFilter, setCycleYearFilter] = useState<string>('all')

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    years.add(new Date().getFullYear())
    if (availableMonths) {
      availableMonths.forEach((monthTag) => {
        const year = Number(monthTag.slice(0, 4))
        if (!Number.isNaN(year)) years.add(year)
      })
    }
    return Array.from(years).sort((a, b) => b - a)
  }, [availableMonths])

  const [localAllYear, setLocalAllYear] = useState<string>(selectedYearValue || 'all')
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const cyclesWithAll = useMemo(() => {
    const base = cycles || []
    return base.some((c) => c.value === 'all') ? base : [{ label: 'All cycles', value: 'all' }, ...base]
  }, [cycles])

  const filteredCycles = useMemo(() => {
    const keyword = cycleSearch.trim().toLowerCase()
    return cyclesWithAll.filter((cycle: any) => {
      if (cycle.value !== 'all' && cycleYearFilter !== 'all') {
        const year = cycle.value.match(/^(\d{4})-/)?.[1]
        if (year !== cycleYearFilter) return false
      }
      if (!keyword) return true
      return cycle.label.toLowerCase().includes(keyword) || cycle.value.toLowerCase().includes(keyword)
    })
  }, [cyclesWithAll, cycleSearch, cycleYearFilter])

  const disabledMatchers = disabledRange
    ? [{ before: disabledRange.start }, { after: disabledRange.end }]
    : availableDateRange?.from && availableDateRange?.to
      ? [{ before: availableDateRange.from }, { after: availableDateRange.to }]
      : undefined

  const resetDraftFromProps = () => {
    setLocalMode(mode)
    setLocalDate(date)
    setLocalRange(dateRange)
    setLocalCycle(selectedCycleValue || 'all')
    setTypedInput('')
    setInputWarning(null)
    const defaultCycleYear = cycleYears.includes(String(new Date().getFullYear()))
      ? String(new Date().getFullYear())
      : cycleYears[0] || 'all'
    setCycleYearFilter(defaultCycleYear)
    setLocalAllYear(selectedYearValue || 'all')
  }

  const selectedCycleLabel = cyclesWithAll.find((cycle: any) => cycle.value === (selectedCycleValue || 'all'))?.label
  const displayText = (() => {
    if (mode === 'cycle') return selectedCycleLabel || 'All cycles'
    if (mode === 'all') {
      if (selectedYearValue) return `All ${selectedYearValue}`
      return 'All Time'
    }
    if (mode === 'year') return format(date, 'yyyy')
    if (mode === 'month') return format(date, 'MMM yyyy')
    if (mode === 'date') return format(date, 'dd MMM yyyy')
    if (mode === 'range') {
      if (!dateRange?.from) return 'Date Range'
      if (!dateRange.to) return format(dateRange.from, 'dd MMM yyyy')
      return `${format(dateRange.from, 'dd MMM')} - ${format(dateRange.to, 'dd MMM')}`
    }
    return 'Select date'
  })()

  const applyTypedInput = (): boolean => {
    const parsed = parseSmartDateInput(typedInput)
    if (!parsed) {
      setInputWarning('Invalid date input. Use dd-mm-yyyy or a two-date range.')
      toast.warning('Invalid date input. Use dd-mm-yyyy or enter 2 dates for range.')
      return false
    }

    setInputWarning(null)
    if (parsed.mode === 'date') {
      onModeChange('date')
      onDateChange(parsed.date)
      onRangeChange(undefined)
      return true
    }

    onModeChange('range')
    onRangeChange(parsed.range)
    return true
  }

  const handleApply = () => {
    if (typedInput.trim()) {
      const ok = applyTypedInput()
      if (ok) setOpen(false)
      return
    }

    if (localMode === 'cycle') {
      onModeChange('cycle')
      if (onCycleSelect) onCycleSelect(localCycle || 'all')
      setOpen(false)
      return
    }

    if (localMode === 'all') {
      onModeChange('all')
      onRangeChange(undefined)
      if (onYearSelect) {
        onYearSelect(localAllYear === 'all' ? null : localAllYear)
      }
      setOpen(false)
      return
    }

    if (localMode === 'month' || localMode === 'date' || localMode === 'year') {
      onModeChange(localMode)
      onDateChange(localDate)
      onRangeChange(undefined)
      if (localMode === 'year' && onYearSelect) {
        onYearSelect(format(localDate, 'yyyy'))
      }
      setOpen(false)
      return
    }

    onModeChange('range')
    onRangeChange(localRange)
    setOpen(false)
  }
  
  const handleInternalSync = async (tag?: string) => {
    const targetTag = tag || localCycle;
    if (!onSyncCycle || !targetTag) {
        toast.warning('Please select a specific cycle to sync')
        return
    }
    
    const isGlobal = targetTag === 'all';
    toast.promise(onSyncCycle(targetTag), {
        loading: isGlobal ? `Synchronizing ALL historical data...` : `Synchronizing technical data for ${targetTag}...`,
        success: (res: any) => {
            if (res && !res.success) throw new Error(res.error || 'Unknown error');
            return isGlobal ? `All cycles synchronized successfully.` : `Cycle ${targetTag} synchronized successfully.`;
        },
        error: (err: any) => `Sync failed: ${err.message || 'Check connection'}`
    })
  }

  const CyclePickerContent = () => {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* 1. Header Navigation Tabs */}
        {statType === 'debt' && (
          <div className="px-6 pt-5 pb-6 bg-slate-50/50 border-b border-slate-200/60 rounded-t-2xl">
            <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
              <button
                onClick={() => setDebtTab('history')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  debtTab === 'history' 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                )}
              >
                <History className="h-3.5 w-3.5" /> Debt History
              </button>
              <button
                onClick={() => setDebtTab('configs')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  debtTab === 'configs' 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                )}
              >
                <Settings className="h-3.5 w-3.5" /> Configurations
              </button>
            </div>
          </div>
        )}

        {/* 2. Sub-header with Sync Controller */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100/60 bg-slate-50/30">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Sync Controller</span>
          </div>
          <div className="flex items-center gap-4">
              <button 
                onClick={() => handleInternalSync('all')}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Sync All Global
              </button>
              <button 
                onClick={() => handleInternalSync()}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Sync Current Cycle
              </button>
          </div>
        </div>

        {/* 3. Search & Year Filter */}
        <div className="px-6 py-4 flex items-center gap-4 bg-white sticky top-0 z-20">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input 
              placeholder="Search cycle..." 
              className="pl-11 h-12 bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-indigo-500/10 rounded-xl font-medium transition-all"
              value={cycleSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCycleSearch(e.target.value)}
            />
          </div>
          <Popover open={yearOpen} onOpenChange={setYearOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-12 px-5 bg-slate-50/50 border-slate-100 rounded-xl font-bold text-slate-700 min-w-[110px]">
                {cycleYearFilter === 'all' ? 'All Years' : cycleYearFilter}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-0" align="end">
              <Command>
                <CommandInput placeholder="Filter year..." />
                <CommandList>
                  <CommandEmpty>No year found.</CommandEmpty>
                  <CommandItem onSelect={() => { setCycleYearFilter('all'); setYearOpen(false); }}>
                    <span>All Years</span>
                    {cycleYearFilter === 'all' && <Check className="w-3.5 h-3.5" />}
                  </CommandItem>
                  {cycleYears.map((year: string) => (
                    <CommandItem 
                      key={year} 
                      onSelect={() => { 
                        setCycleYearFilter(year)
                        setYearOpen(false)
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>{year}</span>
                      {cycleYearFilter === year && <Check className="w-3.5 h-3.5" />}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* 4. Cycle List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 max-h-[460px]">
          {isCycleLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-400">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
              <span className="text-sm font-medium">Loading technical data...</span>
            </div>
          ) : filteredCycles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-400 border-2 border-dashed border-slate-100 rounded-3xl">
              <Search className="h-12 w-12 opacity-10" />
              <span className="text-sm font-medium">No cycles discovered for this year</span>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <AnimatePresence mode="popLayout">
                {filteredCycles.map((cycle: any, idx: number) => {
                  const isSelected = localCycle === cycle.value
                  const isSettled = cycle.stats?.isSettled || false
                  const remains = statType === 'debt' ? (cycle.stats?.remains || 0) : (cycle.stats?.profit || 0)
                  const reallySettled = isSettled || Math.abs(Number(remains)) < 100

                    return (
                      <motion.div
                        key={cycle.value}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: idx * 0.02 }}
                        layout
                      >
                        <button
                          type="button"
                          onClick={() => setLocalCycle(cycle.value)}
                          className={cn(
                            "w-full text-left rounded-xl border transition-all duration-200 relative overflow-hidden group/item",
                            isSelected 
                              ? "bg-indigo-50/40 border-indigo-200 shadow-sm ring-1 ring-indigo-100" 
                              : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/50"
                          )}
                        >
                          <div className="flex h-[48px] items-center">
                            {/* Cycle Label (Left) */}
                            <div className="min-w-[100px] px-3 py-2 flex flex-col justify-center border-r border-slate-50 h-[70%] my-auto">
                              <span className={cn(
                                "text-sm font-black tracking-tight leading-none mb-0.5",
                                isSelected ? "text-indigo-600" : "text-slate-900"
                              )}>
                                {cycle.value}
                              </span>
                              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tight">CYCLE</span>
                            </div>

                            {/* Data Grid (Right) */}
                            <div className="flex-1 grid grid-cols-4 items-center h-full">
                              {statType === 'debt' ? (
                                <>
                                  {/* Initial */}
                                  <div className="flex flex-col items-center justify-center h-[60%] border-r border-slate-50 px-1 overflow-hidden">
                                    <span className="text-[8px] font-bold text-slate-400 mb-0.5 uppercase tracking-tighter">Initial</span>
                                    <span className="text-sm font-bold text-slate-700 tabular-nums truncate w-full text-center">
                                      {new Intl.NumberFormat('en-US').format(cycle.stats?.initial || 0)}
                                    </span>
                                  </div>
                                  {/* Cashback */}
                                  <div className="flex flex-col items-center justify-center h-[60%] border-r border-slate-50 px-1 overflow-hidden">
                                    <span className="text-[8px] font-bold text-orange-400 mb-0.5 uppercase tracking-tighter">Cashback</span>
                                    <span className="text-sm font-bold text-orange-500 tabular-nums truncate w-full text-center text-[11px]">
                                      {Number(cycle.stats?.cashback || 0) > 0 ? `-${new Intl.NumberFormat('en-US').format(Number(cycle.stats?.cashback))}` : '0'}
                                    </span>
                                  </div>
                                  {/* Repaid */}
                                  <div className="flex flex-col items-center justify-center h-[60%] border-r border-slate-50 px-1 overflow-hidden">
                                    <span className="text-[8px] font-bold text-emerald-500 mb-0.5 uppercase tracking-tighter">Repaid</span>
                                    <span className="text-sm font-bold text-emerald-600 tabular-nums truncate w-full text-center">
                                      {new Intl.NumberFormat('en-US').format(cycle.stats?.repay || 0)}
                                    </span>
                                  </div>
                                  {/* Status */}
                                  <div className="h-full flex items-center justify-center px-2">
                                    {reallySettled ? (
                                      <div className="h-7 px-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 w-full hover:bg-emerald-100 transition-colors">
                                        <span className="text-[9px] font-black uppercase tracking-widest">SETTLED</span>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center py-1 px-2 rounded bg-rose-50 border border-rose-100 shrink-0 w-full hover:bg-rose-100 transition-colors group/profit">
                                        <span className="text-[8px] font-black text-rose-300 uppercase tracking-tighter mb-0.5 group-hover/profit:text-rose-400 transition-colors">REMAINS</span>
                                        <span className="text-[11px] font-black text-rose-600 tabular-nums">
                                          {new Intl.NumberFormat('en-US').format(remains)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* Spent */}
                                  <div className="flex flex-col items-center justify-center h-[60%] border-r border-slate-50 px-1 overflow-hidden">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Spent</span>
                                    <span className="text-sm font-bold text-slate-700 tabular-nums truncate w-full text-center">
                                      {new Intl.NumberFormat('en-US').format(cycle.stats?.spent || 0)}
                                    </span>
                                  </div>
                                  {/* Earned */}
                                  <div className="flex flex-col items-center justify-center h-[60%] border-r border-slate-50 px-1 overflow-hidden">
                                    <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter mb-0.5">Earned</span>
                                    <span className="text-sm font-bold text-emerald-600 tabular-nums truncate w-full text-center">
                                      {new Intl.NumberFormat('en-US').format(cycle.stats?.earned || 0)}
                                    </span>
                                  </div>
                                  {/* Shared */}
                                  <div className="flex flex-col items-center justify-center h-[60%] border-r border-slate-50 px-1 overflow-hidden">
                                    <span className="text-[8px] font-bold text-amber-500 uppercase tracking-tighter mb-0.5">Shared</span>
                                    <span className="text-sm font-bold text-amber-600 tabular-nums truncate w-full text-center">
                                      {new Intl.NumberFormat('en-US').format(cycle.stats?.shared || 0)}
                                    </span>
                                  </div>
                                  {/* Profit */}
                                  <div className="h-full flex items-center justify-center px-2">
                                    <div className={cn(
                                       "flex flex-col items-center justify-center py-1.5 px-2 rounded border shrink-0 w-full hover:bg-opacity-80 transition-all group/profit",
                                       isSelected ? "bg-indigo-600 text-white border-indigo-700 shadow-sm" : "bg-indigo-50/50 border-indigo-100"
                                    )}>
                                      <span className={cn("text-[9px] font-black uppercase tracking-wider mb-0.5", isSelected ? "text-indigo-200" : "text-slate-400 group-hover/profit:text-indigo-500")}>PROFIT</span>
                                      <span className={cn("text-[12px] font-black tabular-nums", isSelected ? "text-white" : "text-indigo-600")}>
                                        {new Intl.NumberFormat('en-US').format(remains)}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (locked && value) {
          toast.error("Please select Cycle 'All' to pick a custom date.")
          return
        }
        resetDraftFromProps()
        setOpen(value)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className={cn(
            'gap-2 justify-between font-bold text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 transition-all',
            fullWidth ? 'w-full h-10' : 'w-[145px] h-9'
          )}
        >
          <span className="flex items-center gap-1.5 truncate">
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500 shrink-0" />
            ) : (
              <History className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            )}
            <span className="truncate tabular-nums text-[11px]">{displayText}</span>
          </span>
          <ChevronDown className="w-3 h-3 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          'p-0 border-slate-200/60 shadow-2xl backdrop-blur-xl bg-white/95 rounded-2xl overflow-hidden',
          localMode === 'range' ? 'min-w-[360px]' : localMode === 'cycle' ? 'w-[850px] max-w-[95vw]' : 'w-[450px]'
        )}
        align="start"
        sideOffset={6}
      >
        <div className="p-2 border-b grid grid-cols-6 gap-1 bg-muted/30">
          {(['cycle', 'date', 'range', 'month', 'year', 'all'] as PickerMode[]).map((tab) => (
            <Button
              key={tab}
              variant={localMode === tab ? 'default' : 'ghost'}
              size="sm"
              className="h-7 text-[10px] capitalize px-1"
              onClick={() => setLocalMode(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className={cn(localMode !== 'cycle' && 'p-3 space-y-3', localMode === 'range' && 'pr-3')}>
          {localMode !== 'cycle' && (
            <div>
              <Input
                value={typedInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTypedInput(formatSmartInputMask(e.target.value))
                  if (inputWarning) setInputWarning(null)
                }}
                placeholder="Type: dd-mm-yyyy or dd-mm-yyyy to dd-mm-yyyy"
                className="h-9 text-xs"
              />
              {inputWarning && <p className="text-[11px] text-amber-600 mt-1">{inputWarning}</p>}
            </div>
          )}

          {localMode === 'cycle' && <CyclePickerContent />}

          {localMode === 'date' && (
            <Calendar
              mode="single"
              selected={localDate}
              onSelect={(d: Date | undefined) => {
                if (!d) return
                setLocalDate(d)
                setTypedInput(format(d, 'dd-MM-yyyy'))
              }}
              captionLayout="label"
              disabled={disabledMatchers}
            />
          )}

          {localMode === 'month' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setLocalDate(new Date(localDate.getFullYear() - 1, localDate.getMonth(), 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-semibold text-slate-700">{localDate.getFullYear()}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setLocalDate(new Date(localDate.getFullYear() + 1, localDate.getMonth(), 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {monthLabels.map((label, index) => {
                  const isSelected = localDate.getMonth() === index
                  return (
                    <Button
                      key={label}
                      type="button"
                      size="sm"
                      variant={isSelected ? 'default' : 'outline'}
                      className="h-8"
                      onClick={() => {
                        const next = new Date(localDate.getFullYear(), index, 1)
                        setLocalDate(next)
                        setTypedInput(format(next, 'MM-yyyy'))
                      }}
                    >
                      {label}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {localMode === 'range' && (
            <div className="w-fit max-w-[calc(100vw-80px)] overflow-x-auto">
              <Calendar
                mode="range"
                selected={localRange}
                onSelect={(range: DateRange | undefined) => {
                  setLocalRange(range)
                  if (range?.from && range?.to) {
                    setTypedInput(`${format(range.from, 'dd-MM-yyyy')} - ${format(range.to, 'dd-MM-yyyy')}`)
                  } else if (range?.from) {
                    setTypedInput(format(range.from, 'dd-MM-yyyy'))
                  }
                }}
                disabled={disabledMatchers}
                numberOfMonths={2}
                className="w-fit"
                classNames={{
                  months: 'flex flex-row gap-3 w-fit',
                  month: 'space-y-4 w-[280px]'
                }}
              />
            </div>
          )}

          {localMode === 'year' && (
            <div className="grid grid-cols-3 gap-2">
              {availableYears.map((year: number) => (
                <Button
                  key={year}
                  size="sm"
                  variant={format(localDate, 'yyyy') === String(year) ? 'default' : 'outline'}
                  onClick={() => setLocalDate(new Date(year, 0, 1))}
                  className="h-8"
                >
                  {year}
                </Button>
              ))}
            </div>
          )}

          {localMode === 'all' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-600">All-time scope with optional year focus</p>
              <Popover open={yearOpen} onOpenChange={setYearOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 w-full justify-between text-xs">
                    {localAllYear === 'all' ? 'All years' : localAllYear}
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Find year" />
                    <CommandList>
                      <CommandItem
                        value="all-years"
                        onSelect={() => {
                          setLocalAllYear('all')
                          setYearOpen(false)
                        }}
                        className="flex items-center justify-between"
                      >
                        <span>All years</span>
                        {localAllYear === 'all' && <Check className="w-3.5 h-3.5" />}
                      </CommandItem>
                      {availableYears.map((year: number) => (
                        <CommandItem
                          key={year}
                          value={String(year)}
                          onSelect={() => {
                            setLocalAllYear(String(year))
                            setYearOpen(false)
                          }}
                          className="flex items-center justify-between"
                        >
                          <span>{year}</span>
                          {localAllYear === String(year) && <Check className="w-3.5 h-3.5" />}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div className="p-2 border-t flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setOpen(false)
              setTypedInput('')
              setInputWarning(null)
            }}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleApply}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
