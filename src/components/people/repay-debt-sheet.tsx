'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { allocateDebtRepayment } from '@/lib/debt-allocation'
import { MonthlyDebtSummary, Person } from '@/types/moneyflow.types'
import { toast } from 'sonner'
import { Loader2, Coins, RefreshCw, Sparkles, Copy, Database, ExternalLink, ArrowLeft, Eye, EyeOff } from 'lucide-react'
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
  const [allocationDraft, setAllocationDraft] = useState<Record<string, number | null>>({})
  const [excludedCycles, setExcludedCycles] = useState<Record<string, boolean>>({})
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

  const includedDebts = useMemo(() => {
    return displayDebts.filter((debt) => !excludedCycles[debt.tagLabel])
  }, [displayDebts, excludedCycles])

  const excludedCount = displayDebts.length - includedDebts.length

  const totalOutstanding = useMemo(() => {
    return includedDebts.reduce((sum, debt) => sum + Number(debt.amount || 0), 0)
  }, [includedDebts])

  const fifoAllocationMap = useMemo(() => {
    return allocateDebtRepayment(totalAmount, includedDebts)
  }, [totalAmount, includedDebts])

  useEffect(() => {
    if (!open) return

    const nextDraft: Record<string, number | null> = {}
    const nextExcluded: Record<string, boolean> = {}
    const hasInitial = Boolean(initialAllocations && Object.keys(initialAllocations).length > 0)

    displayDebts.forEach((debt) => {
      nextExcluded[debt.tagLabel] = false
      if (hasInitial) {
        nextDraft[debt.tagLabel] = Number(initialAllocations?.[debt.tagLabel] || 0)
      } else {
        nextDraft[debt.tagLabel] = null
      }
    })

    setAllocationDraft(nextDraft)
    setExcludedCycles(nextExcluded)
  }, [open, initialAllocations, displayDebts])

  const normalizedAllocationMap = useMemo(() => {
    const values = new Map<string, number>()
    let used = 0

    displayDebts.forEach((debt) => {
      if (excludedCycles[debt.tagLabel]) {
        values.set(debt.tagLabel, 0)
        return
      }

      const rawDraft = allocationDraft[debt.tagLabel]
      const raw = rawDraft == null ? 0 : Number(rawDraft)
      const safeRaw = Number.isFinite(raw) ? Math.max(0, raw) : 0
      const capped = Math.min(safeRaw, debt.amount)
      const remainingBudget = Math.max(0, totalAmount - used)
      const allocated = Math.min(capped, remainingBudget)
      values.set(debt.tagLabel, allocated)
      used += allocated
    })

    return values
  }, [allocationDraft, displayDebts, excludedCycles, totalAmount])

  const totalAllocated = Array.from(normalizedAllocationMap.values()).reduce((a, b) => a + b, 0)
  const remainingUnused = Math.max(0, totalAmount - totalAllocated)

  const remainingDebtTotal = useMemo(() => {
    return includedDebts.reduce((sum, debt) => {
      const allocated = normalizedAllocationMap.get(debt.tagLabel) || 0
      return sum + Math.max(0, Number(debt.amount || 0) - allocated)
    }, 0)
  }, [includedDebts, normalizedAllocationMap])

  const shortfall = remainingDebtTotal
  const canAutoVolunteer = shortfall > 0 && shortfall <= 10000

  useEffect(() => {
    if (!open) return
    setVolunteerRepay(canAutoVolunteer)
  }, [open, canAutoVolunteer])

  const hasCustomAllocation = useMemo(() => {
    return displayDebts.some(
      (debt) =>
        !excludedCycles[debt.tagLabel] &&
        (allocationDraft[debt.tagLabel] ?? 0) !== (fifoAllocationMap.get(debt.tagLabel) || 0),
    )
  }, [allocationDraft, displayDebts, excludedCycles, fifoAllocationMap])

  const resetToFifo = () => {
    const nextDraft: Record<string, number | null> = {}
    displayDebts.forEach((debt) => {
      nextDraft[debt.tagLabel] = null
    })
    setAllocationDraft(nextDraft)
  }

  const allocateEvenly = () => {
    if (displayDebts.length === 0 || totalAmount <= 0) return

    const nextDraft: Record<string, number | null> = { ...allocationDraft }
    let used = 0

    // Keep user-fixed values (including 0) untouched.
    displayDebts.forEach((debt) => {
      if (excludedCycles[debt.tagLabel]) return

      const rawDraft = nextDraft[debt.tagLabel]
      if (rawDraft == null) return

      const safeRaw = Number.isFinite(Number(rawDraft)) ? Math.max(0, Number(rawDraft)) : 0
      const capped = Math.min(safeRaw, debt.amount)
      const remainingBudget = Math.max(0, totalAmount - used)
      const allocated = Math.min(capped, remainingBudget)
      used += allocated
    })

    let remaining = Math.max(0, totalAmount - used)

    displayDebts.forEach((debt) => {
      if (excludedCycles[debt.tagLabel]) {
        nextDraft[debt.tagLabel] = null
        return
      }

      if (nextDraft[debt.tagLabel] != null) return

      if (remaining <= 0) {
        nextDraft[debt.tagLabel] = null
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

    console.log('[RepayDebtSheet] handleApply - about to call onApply with:', {
      allocations,
      volunteerRepay,
      shortfall,
      canAutoVolunteer,
    });
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

  const handleOpenTxn = (transactionId: string) => {
    if (typeof window === 'undefined') return
    const url = `${window.location.origin}/transactions?highlight=${encodeURIComponent(transactionId)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleOpenTxnDb = (transactionId: string) => {
    if (typeof window === 'undefined') return
    const url = `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_txn_001&filter=${encodeURIComponent(transactionId)}&sort=-%40rowid&recordId=${encodeURIComponent(transactionId)}`
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
            <div className="flex items-start justify-between gap-3 mb-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 px-2 text-slate-500 hover:text-slate-700"
                title="Back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
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
              <div className="bg-slate-50 px-4 py-3 border-b space-y-3">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-700">Allocation Breakdown</h3>
                  <span
                    className={cn(
                      'text-xs font-bold px-2.5 py-1 rounded-full',
                      remainingUnused > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700',
                    )}
                  >
                    Allocated: {numberFormatter.format(totalAllocated)} / {numberFormatter.format(totalAmount)}
                  </span>
                </div>
                {/* Controls Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={resetToFifo}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset NULL
                  </button>
                  <button
                    type="button"
                    onClick={allocateEvenly}
                    className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Allocate in Order
                  </button>
                  <span className="text-[11px] text-slate-500 font-medium ml-auto">
                    Auto allocate runs on NULL only, 0 stays fixed
                  </span>
                </div>
                {excludedCount > 0 && (
                  <div className="text-[11px] font-medium text-slate-500">
                    Not include: {excludedCount} cycle{excludedCount > 1 ? 's' : ''} (ignored in Allocate and Volunteer)
                  </div>
                )}
              </div>

              <div className="max-h-[340px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr className="text-left text-xs font-medium text-slate-500">
                      <th className="px-4 py-2">Cycle</th>
                      <th className="px-4 py-2 text-right">Owned</th>
                      <th className="px-4 py-2 text-right">Allocated</th>
                      <th className="px-4 py-2 text-right">Balance</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingDebts ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                          <div className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading debt cycles...
                          </div>
                        </td>
                      </tr>
                    ) : displayDebts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">
                          No outstanding debts found for this person.
                        </td>
                      </tr>
                    ) : (
                      displayDebts.map((debt) => {
                        const isExcluded = excludedCycles[debt.tagLabel] === true
                        const draftValue = allocationDraft[debt.tagLabel]
                        const isNullDraft = draftValue == null
                        const allocated = normalizedAllocationMap.get(debt.tagLabel) || 0
                        const newBalance = debt.amount - allocated
                        const isFullyPaid = newBalance <= 0
                        const isActive = !isExcluded && allocated > 0
                        const hasTxn = Boolean(debt.transaction_id)

                        return (
<tr
                             key={debt.tagLabel}
                             className={cn(
                               'transition-colors',
                               isExcluded ? 'bg-slate-50/70 opacity-70' : isActive ? 'bg-emerald-50/50' : 'bg-white',
                             )}
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
                                     isExcluded
                                       ? 'border-slate-300 bg-slate-100 text-slate-600'
                                       : isNullDraft
                                       ? 'border-slate-200 bg-slate-50 text-slate-500'
                                       : allocated > 0
                                       ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                       : 'border-amber-200 bg-amber-50 text-amber-700',
                                   )}
                                   onMouseEnter={() => showAllocationToast(debt.tagLabel, allocated, debt.amount)}
                                   onMouseLeave={() =>
                                     allocationToastIdRef.current && toast.dismiss(allocationToastIdRef.current)
                                   }
                                 >
                                   {isExcluded
                                     ? 'Not include'
                                     : isNullDraft
                                     ? 'NULL'
                                     : allocated > 0
                                       ? `Alloc ${numberFormatter.format(allocated)}`
                                       : '0 Fixed'}
                                 </Badge>
                               </div>
                             </td>
                             <td className="px-4 py-2 text-right font-semibold text-slate-900">
                               {numberFormatter.format(debt.amount)}
                             </td>
                             <td className="px-4 py-2 text-right">
                               <div className="flex items-center justify-end gap-2">
                                 <Input
                                   type="text"
                                   inputMode="numeric"
                                   value={isExcluded ? '' : draftValue == null ? '' : numberFormatter.format(draftValue)}
                                   onChange={(e) => {
                                     if (isExcluded) return

                                     const raw = String(e.target.value || '').replace(/,/g, '').trim()
                                     if (raw === '') {
                                       setAllocationDraft((prev) => ({
                                         ...prev,
                                         [debt.tagLabel]: null,
                                       }))
                                       return
                                     }

                                     const nextValue = Number(raw)
                                     setAllocationDraft((prev) => ({
                                       ...prev,
                                       [debt.tagLabel]: Number.isFinite(nextValue) && nextValue >= 0 ? nextValue : prev[debt.tagLabel],
                                     }))
                                   }}
                                   className={cn(
                                     'h-8 w-[110px] text-right font-bold',
                                     isExcluded
                                       ? 'border-slate-200 bg-slate-100 text-slate-400'
                                       : isNullDraft
                                       ? 'border-slate-200 bg-white text-slate-500'
                                       : isActive
                                         ? 'border-emerald-200 text-emerald-700 bg-emerald-50/40'
                                         : 'border-amber-200 text-amber-700 bg-amber-50/40',
                                   )}
                                   placeholder={isExcluded ? 'OFF' : 'NULL'}
                                   disabled={isExcluded}
                                 />
                               </div>
                             </td>
                             <td
                               className={cn(
                                 'px-4 py-2 text-right font-semibold',
                                 isFullyPaid ? 'text-slate-400 line-through' : 'text-slate-900',
                               )}
                             >
                               {numberFormatter.format(newBalance)}
                             </td>
                             <td className="px-4 py-2 text-center">
                               <div className="flex items-center justify-center gap-1.5">
                                 <Button
                                   type="button"
                                   variant={isExcluded ? 'secondary' : 'outline'}
                                   size="icon"
                                   className={cn(
                                     'h-7 w-7 rounded-md',
                                     isExcluded
                                       ? 'border-slate-300 bg-slate-200 text-slate-700'
                                       : 'border-slate-200 bg-white text-slate-600',
                                   )}
                                   onClick={() => {
                                     setExcludedCycles((prev) => ({
                                       ...prev,
                                       [debt.tagLabel]: !isExcluded,
                                     }))
                                   }}
                                   title={isExcluded ? 'Include cycle' : 'Not include cycle'}
                                 >
                                   {isExcluded ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                 </Button>

                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   onClick={() => {
                                     if (!debt.transaction_id) return
                                     handleOpenTxn(debt.transaction_id)
                                   }}
                                   title={hasTxn ? 'Open Transaction' : 'Available after submit'}
                                   disabled={!hasTxn}
                                   className="h-7 w-7 rounded-md"
                                 >
                                   <ExternalLink className={cn('h-3.5 w-3.5', hasTxn ? 'opacity-100' : 'opacity-30')} />
                                 </Button>
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   onClick={() => {
                                     if (!debt.transaction_id) return
                                     handleOpenTxnDb(debt.transaction_id)
                                   }}
                                   title={hasTxn ? 'Open in Database' : 'Available after submit'}
                                   disabled={!hasTxn}
                                   className="h-7 w-7 rounded-md"
                                 >
                                   <Database className={cn('h-3.5 w-3.5', hasTxn ? 'opacity-100' : 'opacity-30')} />
                                 </Button>
                               </div>
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
