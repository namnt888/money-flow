'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Combobox } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { allocateDebtRepayment } from '@/lib/debt-allocation'
import { repayBatchDebt } from '@/actions/debt-actions'
import { Account, Person } from '@/types/moneyflow.types'
import { toast } from 'sonner'
import { Loader2, Coins, RefreshCw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RepayDebtDialogProps {
    person: Person
    accounts: Account[]
    trigger?: React.ReactNode
    onSuccess?: () => void
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})

export function RepayDebtDialog({
    person,
    accounts,
    trigger,
    onSuccess,
    isOpen: controlledOpen,
    onOpenChange: controlledOnOpenChange,
}: RepayDebtDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen
    const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen

    const [amountStr, setAmountStr] = useState('')
    const [selectedAccountId, setSelectedAccountId] = useState<string>('')
    const [note, setNote] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [allocationDraft, setAllocationDraft] = useState<Record<string, number>>({})
    const allocationToastIdRef = useRef<string | null>(null)

    // Filter valid accounts (Bank/Cash/Wallet)
    const validAccounts = useMemo(() => {
        return accounts.filter(a => ['bank', 'cash', 'ewallet'].includes(a.type))
    }, [accounts])

    // Calculation Logic
    const totalAmount = parseFloat(amountStr) || 0
    const debts = useMemo(() => person.monthly_debts ?? [], [person.monthly_debts])

    // Sort debts for display (matches allocation logic sorting inside helper, but we sort here for UI)
    const displayDebts = useMemo(() => {
        return [...debts]
            .filter(d => d.amount > 0)
            .sort((a, b) => a.tagLabel.localeCompare(b.tagLabel))
    }, [debts])

    const fifoAllocationMap = useMemo(() => {
        return allocateDebtRepayment(totalAmount, debts)
    }, [totalAmount, debts])

    useEffect(() => {
        const nextDraft: Record<string, number> = {}
        displayDebts.forEach((debt) => {
            nextDraft[debt.tagLabel] = fifoAllocationMap.get(debt.tagLabel) || 0
        })
        setAllocationDraft(nextDraft)
    }, [fifoAllocationMap, displayDebts])

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
        return displayDebts.some((debt) => (allocationDraft[debt.tagLabel] || 0) !== (fifoAllocationMap.get(debt.tagLabel) || 0))
    }, [allocationDraft, displayDebts, fifoAllocationMap])

    const resetToFifo = () => {
        const nextDraft: Record<string, number> = {}
        displayDebts.forEach((debt) => {
            nextDraft[debt.tagLabel] = fifoAllocationMap.get(debt.tagLabel) || 0
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

    const handleSubmit = async () => {
        if (!selectedAccountId) {
            toast.error("Please select a payment account")
            return
        }
        if (totalAmount <= 0) {
            toast.error("Please enter a valid amount")
            return
        }

        setIsSubmitting(true)
        try {
            const allocationObj = Object.fromEntries(normalizedAllocationMap)

            const result = await repayBatchDebt(
                person.id,
                totalAmount,
                selectedAccountId,
                allocationObj,
                note
            )

            if (result.success) {
                toast.success("Repayment processed successfully")
                if (setOpen) setOpen(false)
                setAmountStr('')
                setNote('')
                setAllocationDraft({})
                if (onSuccess) onSuccess()
            } else {
                toast.error(`Repayment failed: ${result.error}`)
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unexpected error'
            toast.error(`Error: ${message}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Auto-select first valid account
    useMemo(() => {
        if (!selectedAccountId && validAccounts.length > 0) {
            setSelectedAccountId(validAccounts[0].id)
        }
    }, [validAccounts, selectedAccountId])

    const accountOptions = useMemo(() => {
        return validAccounts.map(acc => ({
            value: acc.id,
            label: acc.name,
            description: `Balance: ${numberFormatter.format(acc.current_balance)}`,
            icon: acc.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={acc.image_url} alt="" className="w-4 h-4 rounded-full" />
            ) : undefined
        }))
    }, [validAccounts])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-amber-500" />
                        Repay Debt: {person.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 px-4 py-3 text-sm text-slate-700">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm border border-indigo-100">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-slate-900">Auto FIFO is the default</p>
                                <p className="text-xs leading-5 text-slate-600">
                                    Enter the total repay amount, then adjust cycle allocations below if you want to override the automatic oldest-first split.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Repayment Amount</Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={amountStr}
                                onChange={(e) => setAmountStr(e.target.value)}
                                className="text-lg font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Pay From (Account)</Label>
                            <Combobox
                                items={accountOptions}
                                value={selectedAccountId}
                                onValueChange={(val) => setSelectedAccountId(val || '')}
                                placeholder="Select Account"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Note (Optional)</Label>
                        <Textarea
                            placeholder="e.g. Returned borrowed money"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={2}
                        />
                    </div>

                    {/* Allocation Preview Table */}
                    <div className="border rounded-lg overflow-hidden">
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
                            </div>
                            <span className={cn(
                                "text-xs font-bold px-2 py-0.5 rounded",
                                remainingUnused > 0 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                            )}>
                                Allocated: {numberFormatter.format(totalAllocated)} / {numberFormatter.format(totalAmount)}
                            </span>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto">
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
                                    {displayDebts.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-slate-400 italic">
                                                No outstanding debts found.
                                            </td>
                                        </tr>
                                    ) : (
                                        displayDebts.map((debt) => {
                                            const allocated = normalizedAllocationMap.get(debt.tagLabel) || 0
                                            const newBalance = debt.amount - allocated
                                            const isFullyPaid = newBalance <= 0

                                            // Highlight row if allocated
                                            const isActive = allocated > 0

                                            return (
                                                <tr key={debt.tagLabel} className={cn(
                                                    "transition-colors",
                                                    isActive ? "bg-emerald-50/50" : "bg-white"
                                                )}>
                                                    <td className="px-4 py-2 font-medium text-slate-700">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span>{debt.tagLabel}</span>
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    "h-5 rounded-full px-2 text-[10px] font-black uppercase tracking-wider border",
                                                                    allocated > 0
                                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                                        : "border-slate-200 bg-slate-50 text-slate-500"
                                                                )}
                                                                onMouseEnter={() => showAllocationToast(debt.tagLabel, allocated, debt.amount)}
                                                                onMouseLeave={() => allocationToastIdRef.current && toast.dismiss(allocationToastIdRef.current)}
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
                                                                type="number"
                                                                min={0}
                                                                max={debt.amount}
                                                                step={1}
                                                                value={allocationDraft[debt.tagLabel] ?? 0}
                                                                onChange={(e) => {
                                                                    const nextValue = Number(e.target.value)
                                                                    setAllocationDraft(prev => ({
                                                                        ...prev,
                                                                        [debt.tagLabel]: Number.isFinite(nextValue) ? nextValue : 0,
                                                                    }))
                                                                }}
                                                                className={cn(
                                                                    "h-8 w-[92px] text-right font-bold font-mono",
                                                                    isActive ? "border-emerald-200 text-emerald-700 bg-emerald-50/40" : "border-slate-200"
                                                                )}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={cn(
                                                        "px-4 py-2 text-right font-mono",
                                                        isFullyPaid ? "text-slate-400 line-through" : "text-slate-900 font-semibold"
                                                    )}>
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
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setOpen && setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting || totalAmount <= 0}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Repayment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
