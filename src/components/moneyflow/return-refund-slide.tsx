'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SmartAmountInput } from '@/components/ui/smart-amount-input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select-shadcn'
import { cancelOrder, requestRefund, instantRefund } from '@/actions/transaction-actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatShortVietnameseCurrency } from '@/lib/number-to-text'

interface ReturnRefundSlideProps {
    transactionId: string
    transactionAmount: number
    originalAccountId: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmitStart?: () => void
    onSubmitEnd?: () => void | Promise<void>
}

interface Account {
    id: string
    name: string
    type: string
}

function toDatetimeLocal(value: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(value.getMinutes())}`
}

export function ReturnRefundSlide({
    transactionId,
    transactionAmount,
    originalAccountId,
    open,
    onOpenChange,
    onSubmitStart,
    onSubmitEnd,
}: ReturnRefundSlideProps) {
    const [activeTab, setActiveTab] = useState('cancel-100')
    const [amount, setAmount] = useState(transactionAmount)
    const [selectedAccountId, setSelectedAccountId] = useState(originalAccountId)
    const [refundDestination, setRefundDestination] = useState<'original' | 'other'>('original')
    const [refundAt, setRefundAt] = useState<string>(toDatetimeLocal(new Date()))
    const [isLoading, setIsLoading] = useState(false)
    const [accounts, setAccounts] = useState<Account[]>([])

    useEffect(() => {
        let cancelled = false

        const loadAccounts = async () => {
            try {
                const { getAccountsAction } = await import('@/actions/account-actions')
                const result = await getAccountsAction()
                if (!cancelled && Array.isArray(result)) {
                    setAccounts(result)
                }
            } catch {
                if (!cancelled) setAccounts([])
            }
        }

        void loadAccounts()

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (open) {
            setAmount(transactionAmount)
            setSelectedAccountId(originalAccountId)
            setRefundDestination('original')
            setActiveTab('cancel-100')
            setRefundAt(toDatetimeLocal(new Date()))
        }
    }, [open, transactionAmount, originalAccountId])

    const refundOccurredAt = (() => {
        const parsed = refundAt ? new Date(refundAt) : new Date()
        return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
    })()

    const handleCancel100 = async () => {
        onSubmitStart?.()
        onOpenChange(false)
        setIsLoading(true)
        try {
            const result = await cancelOrder(transactionId, refundOccurredAt)

            if (result.success) {
                toast.success('Hủy đơn 100% thành công')
            } else {
                toast.error(result.error || 'Không thể hủy đơn')
            }
        } finally {
            setIsLoading(false)
            await onSubmitEnd?.()
        }
    }

    const handlePartialRefund = async () => {
        if (amount <= 0 || amount > transactionAmount) {
            toast.error('Amount must be greater than 0 and not exceed the original amount')
            return
        }

        onSubmitStart?.()
        onOpenChange(false)
        setIsLoading(true)
        try {
            const result = await requestRefund(transactionId, amount, true, refundOccurredAt)

            if (result.success) {
                toast.success('Yêu cầu hoàn tiền một phần thành công')
            } else {
                toast.error(result.error || 'Không thể yêu cầu hoàn tiền')
            }
        } finally {
            setIsLoading(false)
            await onSubmitEnd?.()
        }
    }

    const handleInstantRefund = async () => {
        if (amount <= 0 || amount > transactionAmount) {
            toast.error('Amount must be greater than 0 and not exceed the original amount')
            return
        }

        const targetAccountId = refundDestination === 'original' ? originalAccountId : selectedAccountId
        if (!targetAccountId) {
            toast.error('Please select a refund account')
            return
        }

        onSubmitStart?.()
        onOpenChange(false)
        setIsLoading(true)
        try {
            const result = await instantRefund(transactionId, amount, targetAccountId, refundOccurredAt)

            if (result.success) {
                toast.success('Hoàn tiền ngay thành công')
            } else {
                toast.error(result.error || 'Không thể hoàn tiền ngay')
            }
        } finally {
            setIsLoading(false)
            await onSubmitEnd?.()
        }
    }

    const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
    const accountCandidates = accounts.filter((account) => account.id !== originalAccountId)
    const amountHint = amount > 0 ? formatShortVietnameseCurrency(amount) : 'Input to show text'
    const isOtherSelected = refundDestination === 'other'

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader className="mb-4">
                    <SheetTitle className="text-lg">Refund Flow</SheetTitle>
                </SheetHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="cancel-100">Waiting Refund</TabsTrigger>
                        <TabsTrigger value="partial">Refund a Part</TabsTrigger>
                        <TabsTrigger value="instant">Refunded</TabsTrigger>
                    </TabsList>

                    <div className="mb-4 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                        <div>
                            <Label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-indigo-500">Date & Time</Label>
                            <Input
                                type="datetime-local"
                                value={refundAt}
                                onChange={(e) => setRefundAt(e.target.value)}
                                className="h-10 border-slate-200 bg-white text-sm font-semibold"
                            />
                        </div>
                    </div>

                    {/* Tab 1: Waiting Refund */}
                    <TabsContent value="cancel-100" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-violet-500">Amount</Label>
                                <SmartAmountInput
                                    value={amount}
                                    onChange={(val) => setAmount(val ?? 0)}
                                    hideLabel
                                    disabled={true}
                                    className="h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-indigo-500"
                                    placeholder="0"
                                />
                                <p className="mt-1 text-[12px] font-semibold text-slate-500 truncate">{amountHint}</p>
                                <p className="text-xs text-slate-500 mt-2">
                                    Original amount: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>. To refund a partial amount, switch to the Refund a Part tab.
                                </p>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-sm text-amber-800">
                                    <strong>Note:</strong> Waiting refund creates a pending refund transaction (GD2). You will need to confirm it later.
                                </p>
                            </div>

                            <Button
                                onClick={handleCancel100}
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? 'Processing...' : 'Confirm waiting refund'}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Tab 2: Refund a Part */}
                    <TabsContent value="partial" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-violet-500">Amount</Label>
                                <SmartAmountInput
                                    value={amount}
                                    onChange={(val) => setAmount(val ?? 0)}
                                    hideLabel
                                    className="h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-indigo-500"
                                    placeholder="0"
                                />
                                <p className="mt-1 text-[12px] font-semibold text-slate-500 truncate">{amountHint}</p>
                                <p className="text-xs text-slate-500 mt-2">
                                    Maximum amount: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Info:</strong> Refund a part creates a pending refund transaction (GD2) for the amount you choose.
                                </p>
                            </div>

                            <Button
                                onClick={handlePartialRefund}
                                disabled={isLoading || amount <= 0 || amount > transactionAmount}
                                className="w-full"
                            >
                                {isLoading ? 'Processing...' : 'Request partial refund'}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Tab 3: Refunded */}
                    <TabsContent value="instant" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-violet-500">Amount</Label>
                                <SmartAmountInput
                                    value={amount}
                                    onChange={(val) => setAmount(val ?? 0)}
                                    hideLabel
                                    className="h-10 border-slate-200 bg-white px-3 text-sm font-black focus-visible:border-indigo-500"
                                    placeholder="0"
                                />
                                <p className="mt-1 text-[12px] font-semibold text-slate-500 truncate">{amountHint}</p>
                                <p className="text-xs text-slate-500 mt-2">
                                    Maximum amount: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                                </p>
                            </div>

                            <div>
                                <Label className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-indigo-500">Refund destination</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRefundDestination('original')
                                            setSelectedAccountId(originalAccountId)
                                        }}
                                        className={cn(
                                            'h-10 rounded-lg border text-xs font-bold transition-colors',
                                            !isOtherSelected
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        )}
                                    >
                                        Original account
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRefundDestination('other')
                                            if (!accountCandidates.some((account) => account.id === selectedAccountId)) {
                                                setSelectedAccountId(accountCandidates[0]?.id || '')
                                            }
                                        }}
                                        className={cn(
                                            'h-10 rounded-lg border text-xs font-bold transition-colors',
                                            isOtherSelected
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        )}
                                    >
                                        Another account
                                    </button>
                                </div>
                            </div>

                            {isOtherSelected && (
                                <div>
                                    <Label className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-indigo-500">Select account</Label>
                                    {accountCandidates.length > 0 ? (
                                        <Select
                                            value={selectedAccountId}
                                            onValueChange={(val) => setSelectedAccountId(val)}
                                        >
                                            <SelectTrigger className="h-10 border-slate-200 bg-white text-sm font-semibold">
                                                <SelectValue placeholder="Select an account..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {accountCandidates.map((account) => (
                                                    <SelectItem key={account.id} value={account.id}>
                                                        {account.name} ({account.type})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="text-xs text-slate-400">No alternative account available.</p>
                                    )}
                                </div>
                            )}

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-800">
                                    <strong>Refunded:</strong> The refund will be completed immediately and will not create a pending GD2 transaction.
                                </p>
                            </div>

                            <Button
                                onClick={handleInstantRefund}
                                disabled={isLoading || amount <= 0 || amount > transactionAmount}
                                className="w-full"
                            >
                                {isLoading ? 'Processing...' : 'Refund now'}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}
