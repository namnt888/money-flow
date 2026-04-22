'use client'

import { useMemo, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, ChevronDown, Loader2, RefreshCw, Search } from 'lucide-react'
import { rolloverDebtAction, RolloverDebtState } from '@/actions/people-actions'
import { toast } from 'sonner'
import { toYYYYMMFromDate, isYYYYMM } from '@/lib/month-tag'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface RolloverDebtDialogProps {
    personId: string
    currentCycle: string
    allCycles?: { tag: string }[]
    remains: number
    trigger?: React.ReactNode
    setIsGlobalLoading?: (loading: boolean) => void
    setLoadingMessage?: (msg: string | null) => void
}

const initialState: RolloverDebtState = {
    success: false,
    message: '',
}

// Helper to get next month tag
const getNextMonth = (cycle: string) => {
    if (!isYYYYMM(cycle)) return ''
    const [year, month] = cycle.split('-').map(Number)
    const date = new Date(year, month, 1) // Month is 0-indexed in Date, so month (1-12) used as index is actually next month.
    return toYYYYMMFromDate(date)
}

type CycleDropdownProps = {
    label: string
    value: string
    onChange: (value: string) => void
    items: { value: string; label: string }[]
    placeholder: string
}

function CycleDropdown({ label, value, onChange, items, placeholder }: CycleDropdownProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [yearFilter, setYearFilter] = useState('all')

    const years = useMemo(() => {
        const values = new Set<string>()
        items.forEach((item) => {
            const year = item.value.match(/^(\d{4})-/)?.[1]
            if (year) values.add(year)
        })
        return Array.from(values).sort((a, b) => Number(b) - Number(a))
    }, [items])

    const filteredItems = useMemo(() => {
        const keyword = search.trim().toLowerCase()
        return items.filter((item) => {
            if (yearFilter !== 'all') {
                const year = item.value.match(/^(\d{4})-/)?.[1]
                if (year !== yearFilter) return false
            }

            if (!keyword) return true
            return item.value.toLowerCase().includes(keyword) || item.label.toLowerCase().includes(keyword)
        })
    }, [items, search, yearFilter])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="col-span-3 h-10 w-full justify-between bg-white font-medium"
                >
                    <span className="truncate">{value || placeholder}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[2000] w-[320px] p-0" align="start">
                <div className="border-b px-3 pt-3 pb-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{label}</div>
                </div>
                <div className="flex gap-2 border-b px-3 py-2">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search cycle..."
                            className="h-8 pl-8 text-xs"
                        />
                    </div>
                    <select
                        value={yearFilter}
                        onChange={(event) => setYearFilter(event.target.value)}
                        className="h-8 min-w-[84px] rounded-md border border-slate-200 bg-white px-2 text-xs outline-none"
                    >
                        <option value="all">All</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <Command>
                    <CommandList className="max-h-[220px]">
                        <CommandEmpty>No cycle found.</CommandEmpty>
                        {filteredItems.map((item) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => {
                                    onChange(item.value)
                                    setOpen(false)
                                }}
                            >
                                <div className="flex w-full items-center justify-between gap-3">
                                    <div className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm font-medium">{item.label}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-slate-400">{item.value}</span>
                                    </div>
                                    {value === item.value && <Check className="h-4 w-4 shrink-0" />}
                                </div>
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export function RolloverDebtDialog({
    personId,
    currentCycle,
    allCycles = [],
    remains,
    trigger,
    setIsGlobalLoading,
    setLoadingMessage
}: RolloverDebtDialogProps) {
    const [open, setOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const prefillAmount = Math.max(0, Math.round(Math.abs(Number(remains) || 0)))
    const rolloverDirection = (Number(remains) || 0) < 0 ? 'credit' : 'debt'
    const isCreditCarry = rolloverDirection === 'credit'

    // Internal state for form since we'll handle submission manually for immediate closure
    const [fromCycle, setFromCycle] = useState(currentCycle)
    const [toCycle, setToCycle] = useState(isYYYYMM(currentCycle) ? getNextMonth(currentCycle) : '')
    const [amount, setAmount] = useState(prefillAmount)
    const [occurredAt, setOccurredAt] = useState(new Intl.DateTimeFormat('en-CA').format(new Date()))
    const [note, setNote] = useState('')

    // Generate from cycle options
    const fromCycleItems = useMemo(() => (
        (allCycles.length > 0
            ? Array.from(new Set([currentCycle, ...allCycles.map(c => c.tag)]))
            : [currentCycle]
        ).filter(isYYYYMM).sort().reverse().map(tag => ({ value: tag, label: tag }))
    ), [allCycles, currentCycle])

    // Generate upcoming cycle options (next 12 months)
    const toCycleItems = useMemo(() => {
        const items: { value: string; label: string }[] = []
        if (isYYYYMM(fromCycle)) {
            let baseCycle = fromCycle
            for (let i = 0; i < 12; i++) {
                const next = getNextMonth(baseCycle)
                if (!next) break
                items.push({ value: next, label: next })
                baseCycle = next
            }
        }
        return items
    }, [fromCycle])

    useEffect(() => {
        if (open && isYYYYMM(currentCycle)) {
            setFromCycle(currentCycle)
            setAmount(prefillAmount)
            setToCycle(getNextMonth(currentCycle))
            setOccurredAt(new Intl.DateTimeFormat('en-CA').format(new Date()))
            setNote('')
        }
    }, [open, currentCycle, prefillAmount])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        // 1. Close modal immediately
        setOpen(false)

        // 2. Start global loading
        if (setIsGlobalLoading) setIsGlobalLoading(true)
        if (setLoadingMessage) setLoadingMessage('Creating rollover transactions...')
        setIsProcessing(true)

        try {
            const result = await rolloverDebtAction(initialState, formData)
            if (result.success) {
                toast.success(result.message || 'Debt rolled over successfully')
            } else {
                toast.error(result.error || 'Failed to rollover debt')
                // Re-open if failed? Maybe not, keep it simple.
            }
        } catch (err: any) {
            toast.error('An unexpected error occurred')
            console.error(err)
        } finally {
            setIsProcessing(false)
            if (setIsGlobalLoading) setIsGlobalLoading(false)
            if (setLoadingMessage) setLoadingMessage(null)
        }
    }

    if (!isYYYYMM(currentCycle)) {
        return null
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                        <span className="sr-only sm:not-sr-only text-xs">Rollover</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rollover Debt</DialogTitle>
                    <DialogDescription>
                        Move remaining debt from <strong>{currentCycle}</strong> to a future cycle.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <input type="hidden" name="personId" value={personId} />
                    <input type="hidden" name="fromCycle" value={fromCycle} />
                    <input type="hidden" name="toCycle" value={toCycle} />
                    <input type="hidden" name="rolloverDirection" value={rolloverDirection} />

                    <div
                        className={cn(
                            'rounded-md border px-3 py-2 text-xs',
                            isCreditCarry
                                ? 'border-indigo-200 bg-indigo-50 text-indigo-800'
                                : 'border-amber-200 bg-amber-50 text-amber-800'
                        )}
                    >
                        <div className="font-semibold">
                            {isCreditCarry ? 'Hướng rollover: Trả dư sang kỳ mới' : 'Hướng rollover: Còn nợ sang kỳ mới'}
                        </div>
                        <div className="mt-1">
                            {isCreditCarry
                                ? 'From Cycle sẽ tạo Debt, To Cycle sẽ tạo Repayment.'
                                : 'From Cycle sẽ tạo Repayment, To Cycle sẽ tạo Debt.'}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="occurredAt" className="text-right">
                            Date
                        </Label>
                        <Input
                            id="occurredAt"
                            name="occurredAt"
                            type="date"
                            value={occurredAt}
                            onChange={(e) => setOccurredAt(e.target.value)}
                            className="col-span-3 text-xs"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fromCycleSelect" className="text-right">
                            From Cycle
                        </Label>
                        <div className="col-span-3">
                            <CycleDropdown
                                label="From Cycle"
                                value={fromCycle}
                                onChange={(val) => setFromCycle(val)}
                                items={fromCycleItems}
                                placeholder="Select source cycle"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="toCycleSelect" className="text-right">
                            To Cycle
                        </Label>
                        <div className="col-span-3">
                            <CycleDropdown
                                label="To Cycle"
                                value={toCycle}
                                onChange={(val) => setToCycle(val)}
                                items={toCycleItems}
                                placeholder="Select target cycle"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="note" className="text-right">
                            Notes
                        </Label>
                        <Input
                            id="note"
                            name="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="col-span-3 text-xs"
                            placeholder="Tiền dư T3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="col-span-3 font-semibold"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isProcessing}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm Rollover
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
