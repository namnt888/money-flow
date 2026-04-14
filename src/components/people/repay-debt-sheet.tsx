'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { allocateDebtRepayment } from '@/lib/debt-allocation'
import { MonthlyDebtSummary, Person } from '@/types/moneyflow.types'
import { toast } from 'sonner'
import { Loader2, Coins, RefreshCw, Sparkles, Copy, Database, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RepayDebtSheetProps {
  person: Person
  amount: number
  initialAllocations?: Record<string, number>
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply?: (payload: {
    allocations: Record<string, number>
    volunteerRepay: boolean
    shortfall: number
  }) => void
}

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

export function RepayDebtSheet({
  person,
  amount,
  initialAllocations,
  open,
  onOpenChange,
  onApply,
}: RepayDebtSheetProps) {
  const [isLoadingDebts, setIsLoadingDebts] = useState(false)
  const [debts, setDebts] = useState<MonthlyDebtSummary[]>(person.monthly_debts ?? [])
  const [allocationDraft, setAllocationDraft] = useState<Record<string, number>>({})
  const [volunteerRepay, setVolunteerRepay] = useState(false)
  const allocationToastIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!open) return

    let cancelled = false
    const fetchDebts = async () => {
      setIsLoadingDebts(true)
      try {
        const response = await fetch(`/api/people/debts?personId=${encodeURIComponent(person.id)}`, {
          cache: 'no-store',
        })
        const payload = await response.json()
        if (cancelled) return

        if (payload?.success && Array.isArray(payload.monthly_debts)) {
          setDebts(payload.monthly_debts)
        } else {
          setDebts(person.monthly_debts ?? [])
        }
      } catch {
        if (!cancelled) {
          setDebts(person.monthly_debts ?? [])
        }
      } finally {
        if (!cancelled) {
          setIsLoadingDebts(false)
        }
      }
    }

    fetchDebts()
    return () => {
      cancelled = true
    }
  }, [open, person.id, person.monthly_debts])

  const totalAmount = Math.max(0, Number(amount || 0))
  const peopleDbId = person.pocketbase_id || person.id

  const displayDebts = useMemo(() => {
    return [...debts]
      .filter((debt) => debt.amount > 0)
      .sort((a, b) => a.tagLabel.localeCompare(b.tagLabel))
  }, [debts])

  const totalOutstanding = useMemo(() => {
    return displayDebts.reduce((sum, debt) => sum + Number(debt.amount || 0), 0)
  }, [displayDebts])
  const shortfall = Math.max(0, totalOutstanding - totalAmount)
  const canAutoVolunteer = shortfall > 0 && shortfall <= 10000

  const fifoAllocationMap = useMemo(() => {
    return allocateDebtRepayment(totalAmount, debts)
  }, [totalAmount, debts])

  useEffect(() => {
    if (!open) return

    const nextDraft: Record<string, number> = {}
    const hasInitial = Boolean(initialAllocations && Object.keys(initialAllocations).length > 0)

    displayDebts.forEach((debt) => {
      if (hasInitial) {
        nextDraft[debt.tagLabel] = Number(initialAllocations?.[debt.tagLabel] || 0)
      } else {
        nextDraft[debt.tagLabel] = fifoAllocationMap.get(debt.tagLabel) || 0
      }
    })

    setAllocationDraft(nextDraft)
  }, [open, initialAllocations, displayDebts, fifoAllocationMap])

  useEffect(() => {
    if (!open) return
    setVolunteerRepay(canAutoVolunteer)
  }, [open, canAutoVolunteer])

  const normalizedAllocationMap = useMemo(() => {
    const values = new Map<string, number>()
    let used = 0

    displayDebts.forEach((debt) => {
      const raw = Number(allocationDraft[debt.tagLabel] ?? 0)
      const safeRaw = Number.isFinite(raw) ? Math.max(0, raw) : 0
      const capped = Math.min(safeRaw, debt.amount)
      const remainingBudget = Math.max(0, totalAmount - used)
      const allocated = Math.min(capped, remainingBudget)
      values.set(debt.tagLabel, allocated)
      used += allocated
    })

    return values
  }, [allocationDraft, displayDebts, totalAmount])

  const totalAllocated = Array.from(normalizedAllocationMap.values()).reduce((a, b) => a + b, 0)
  const remainingUnused = Math.max(0, totalAmount - totalAllocated)

  const hasCustomAllocation = useMemo(() => {
    return displayDebts.some(
      (debt) => (allocationDraft[debt.tagLabel] || 0) !== (fifoAllocationMap.get(debt.tagLabel) || 0),
    )
  }, [allocationDraft, displayDebts, fifoAllocationMap])

  const resetToFifo = () => {
    const nextDraft: Record<string, number> = {}
    displayDebts.forEach((debt) => {
      nextDraft[debt.tagLabel] = fifoAllocationMap.get(debt.tagLabel) || 0
    })
    setAllocationDraft(nextDraft)
  }

  const allocateEvenly = () => {
    if (displayDebts.length === 0 || totalAmount <= 0) return

    const nextDraft: Record<string, number> = {}
    let remaining = totalAmount

    displayDebts.forEach((debt) => {
      if (remaining <= 0) {
        nextDraft[debt.tagLabel] = 0
        return
      }

      const allocation = Math.min(debt.amount, remaining)
      nextDraft[debt.tagLabel] = allocation
      remaining -= allocation
    })

    setAllocationDraft(nextDraft)
  }

  const showAllocationToast = (tagLabel: string, allocated: number, owed: number) => {
    const id = `repay-allocation-${tagLabel}`
    allocationToastIdRef.current = id
    toast.dismiss(id)
    toast.info(`${tagLabel}: allocated ${numberFormatter.format(allocated)} / owed ${numberFormatter.format(owed)}`, {
      id,
      duration: 1800,
    })
  }

  const handleApply = () => {
    if (totalAmount <= 0) {
      toast.error('Enter repayment amount in the main transaction first')
      return
    }

    if (volunteerRepay && shortfall > 10000) {
      toast.warning('Volunteer repay shortfall is above 10,000. Please re-check before apply.')
    }

    const allocations = Object.fromEntries(
      Array.from(normalizedAllocationMap.entries())
        .filter(([, value]) => value > 0)
    )

    onApply?.({
      allocations,
      volunteerRepay,
      shortfall,
    })
    onOpenChange(false)
  }

  const handleCopyPeopleId = async () => {
    try {
      await navigator.clipboard.writeText(peopleDbId)
      toast.success('People ID copied')
    } catch {
      toast.error('Cannot copy People ID')
    }
  }

  const handleOpenDb = () => {
    if (typeof window === 'undefined') return
    const url = `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_people_001&filter=${encodeURIComponent(peopleDbId)}&sort=-%40rowid&recordId=${encodeURIComponent(peopleDbId)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        zIndex={1200}
        className="w-full sm:max-w-[760px] p-0 bg-slate-50 border-l border-slate-200"
      >
        <div className="h-full flex flex-col">
          <div className="bg-white border-b px-6 py-4">
            <SheetHeader>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="space-y-2">
                  <SheetTitle className="flex items-center gap-2 text-slate-900">
                    <Coins className="h-5 w-5 text-amber-500" />
                    Multi-Cycle Repay: {person.name}
                  </SheetTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="h-6 rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-2.5 text-[11px] font-bold">
                      Active cycles: {displayDebts.length}
                    </Badge>
                    <Badge className="h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 text-[11px] font-bold">
                      Txn amount: {numberFormatter.format(totalAmount)}
                    </Badge>
                    <Badge className="h-6 rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-2.5 text-[11px] font-bold">
                      Total owed: {numberFormatter.format(totalOutstanding)}
                    </Badge>
                    <Badge className="h-6 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 text-[11px] font-bold max-w-[280px] truncate">
                      People ID: {peopleDbId}
                    </Badge>
                    {volunteerRepay && (
                      <Badge className="h-6 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 text-[11px] font-black uppercase tracking-wide">
                        #Volunteer_Repay
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPeopleId}
                    className="h-8 px-2.5 text-[11px] font-semibold"
                  >
                    <Copy className="h-3.5 w-3.5 mr-1.5" />
                    Copy People ID
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenDb}
                    className="h-8 px-2.5 text-[11px] font-semibold"
                  >
                    <Database className="h-3.5 w-3.5 mr-1.5" />
                    Open DB
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 px-4 py-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm border border-indigo-100">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900">Auto FIFO is the default</p>
                  <p className="text-xs leading-5 text-slate-600">
                    Amount comes from the main transaction slide. Adjust cycle allocations here, then apply back to the parent transaction draft.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3 flex items-center justify-between gap-3">
              <div className="text-xs text-amber-800 font-medium">
                If you accept shortfall as settled, enable volunteer repay tag.
              </div>
              <button
                type="button"
                onClick={() => setVolunteerRepay((v) => !v)}
                className={cn(
                  'text-[11px] font-bold uppercase tracking-wide rounded-full border px-2.5 py-1 transition-colors',
                  volunteerRepay
                    ? 'border-amber-300 bg-amber-100 text-amber-800'
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                )}
              >
                #Volunteer_Repay
              </button>
            </div>

            <div className="border rounded-lg overflow-hidden bg-white">
              <div className="bg-slate-50 px-4 py-2 border-b flex flex-wrap gap-2 justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-slate-700">Allocation Breakdown</h3>
                  <button
                    type="button"
                    onClick={resetToFifo}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset FIFO
                  </button>
                  <button
                    type="button"
                    onClick={allocateEvenly}
                    className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Phân bổ theo thứ tự
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">
                      FIFO fill. Small shortfall auto-tags as volunteer repay.
                  </span>
                </div>
                <span
                  className={cn(
                    'text-xs font-bold px-2 py-0.5 rounded',
                    remainingUnused > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700',
                  )}
                >
                  Allocated: {numberFormatter.format(totalAllocated)} / {numberFormatter.format(totalAmount)}
                </span>
              </div>

              <div className="max-h-[340px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr className="text-left text-xs font-medium text-slate-500">
                      <th className="px-4 py-2">Cycle</th>
                      <th className="px-4 py-2 text-right">Owed</th>
                      <th className="px-4 py-2 text-right">Allocated</th>
                      <th className="px-4 py-2 text-right">New Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingDebts ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                          <div className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading debt cycles...
                          </div>
                        </td>
                      </tr>
                    ) : displayDebts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">
                          No outstanding debts found for this person.
                        </td>
                      </tr>
                    ) : (
                      displayDebts.map((debt) => {
                        const allocated = normalizedAllocationMap.get(debt.tagLabel) || 0
                        const newBalance = debt.amount - allocated
                        const isFullyPaid = newBalance <= 0
                        const isActive = allocated > 0

                        return (
                          <tr
                            key={debt.tagLabel}
                            className={cn('transition-colors', isActive ? 'bg-emerald-50/50' : 'bg-white')}
                          >
                            <td className="px-4 py-2 font-medium text-slate-700">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="h-6 rounded-full px-2.5 text-[11px] font-bold border-slate-300 bg-slate-50 text-slate-700">
                                  {debt.tagLabel}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'h-5 rounded-full px-2 text-[10px] font-black uppercase tracking-wider border',
                                    allocated > 0
                                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                      : 'border-slate-200 bg-slate-50 text-slate-500',
                                  )}
                                  onMouseEnter={() => showAllocationToast(debt.tagLabel, allocated, debt.amount)}
                                  onMouseLeave={() =>
                                    allocationToastIdRef.current && toast.dismiss(allocationToastIdRef.current)
                                  }
                                >
                                  {allocated > 0 ? `Alloc ${numberFormatter.format(allocated)}` : 'Unassigned'}
                                </Badge>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-right text-amber-700 font-mono">
                              {numberFormatter.format(debt.amount)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Input
                                  type="text"
                                  inputMode="numeric"
                                  value={numberFormatter.format(allocationDraft[debt.tagLabel] ?? 0)}
                                  onChange={(e) => {
                                    const nextValue = Number(String(e.target.value || '').replace(/,/g, ''))
                                    setAllocationDraft((prev) => ({
                                      ...prev,
                                      [debt.tagLabel]: Number.isFinite(nextValue) ? nextValue : 0,
                                    }))
                                  }}
                                  className={cn(
                                    'h-8 w-[110px] text-right font-bold',
                                    isActive ? 'border-emerald-200 text-emerald-700 bg-emerald-50/40' : 'border-slate-200',
                                  )}
                                />
                              </div>
                            </td>
                            <td
                              className={cn(
                                'px-4 py-2 text-right font-mono',
                                isFullyPaid ? 'text-slate-400 line-through' : 'text-slate-900 font-semibold',
                              )}
                            >
                              {numberFormatter.format(newBalance)}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {remainingUnused > 0 && (
              <div className="p-3 bg-amber-50 text-amber-800 text-sm rounded-md flex items-start gap-2">
                <Coins className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <strong>Unallocated amount:</strong> {numberFormatter.format(remainingUnused)} is not assigned to any cycle yet. Increase a cycle allocation or reset to FIFO.
                </div>
              </div>
            )}

            {hasCustomAllocation && (
              <div className="p-3 bg-indigo-50 text-indigo-800 text-sm rounded-md flex items-start gap-2">
                <Sparkles className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <strong>Custom allocation active:</strong> the saved breakdown will follow the numbers shown in the table, not the FIFO default.
                </div>
              </div>
            )}

            {canAutoVolunteer && (
              <div className="p-3 bg-amber-50 text-amber-800 text-sm rounded-md flex items-start gap-2 border border-amber-200">
                <Coins className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <strong>Small shortfall detected:</strong> missing {numberFormatter.format(shortfall)} can be tagged as #Volunteer_Repay when applied.
                </div>
              </div>
            )}

            {volunteerRepay && shortfall > 10000 && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                Volunteer repay shortfall is {numberFormatter.format(shortfall)} (&gt; 10,000). Please review carefully.
              </div>
            )}
          </div>

          <div className="bg-white border-t px-6 py-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={totalAmount <= 0}>
              Apply Allocation
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
