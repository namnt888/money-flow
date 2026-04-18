'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AmountInput } from '@/components/ui/amount-input'
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxItem } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import {
    cancelOrder,
    instantRefund,
    requestRefund,
    updateTransactionMetadata,
} from '@/actions/transaction-actions'
import { toast } from 'sonner'
import { Account, TransactionWithDetails } from '@/types/moneyflow.types'

interface ReturnRefundSlideProps {
    transaction: TransactionWithDetails
    accounts: Account[]
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ReturnRefundSlide({
    transaction,
    accounts,
    open,
    onOpenChange,
}: ReturnRefundSlideProps) {
    const transactionAmount = Math.abs(Number(transaction.amount || 0))
    const originalAccountId = transaction.account_id || ''
    const transactionMeta =
        transaction.metadata && typeof transaction.metadata === 'object'
            ? (transaction.metadata as Record<string, unknown>)
            : null
    const refundStatus = String(transactionMeta?.refund_status || '')
    const isWaitingRefundLocked =
        refundStatus === 'requested' || refundStatus === 'request_voided'

    const [activeTab, setActiveTab] = useState('waiting-refund')
    const [amount, setAmount] = useState(transactionAmount)
    const [selectedAccountId, setSelectedAccountId] = useState(originalAccountId)
    const [isLoading, setIsLoading] = useState(false)

    const accountItems = useMemo<ComboboxItem[]>(() => {
        return accounts.map((account) => ({
            value: account.id,
            label: account.name,
            description: account.type,
            searchValue: `${account.name} ${account.type}`,
            icon: account.image_url ? (
                <div className="relative h-5 w-5 overflow-hidden rounded-sm bg-slate-100">
                    <Image src={account.image_url} alt={account.name} fill className="object-cover" />
                </div>
            ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-slate-100 text-[10px] font-bold text-slate-500">
                    {account.name.slice(0, 1).toUpperCase()}
                </div>
            ),
        }))
    }, [accounts])

    useEffect(() => {
        if (!open) return
        setActiveTab('waiting-refund')
        setAmount(transactionAmount)
        setSelectedAccountId(originalAccountId)
    }, [open, transactionAmount, originalAccountId])

    useEffect(() => {
        if (activeTab === 'waiting-refund') {
            setAmount(transactionAmount)
        }
    }, [activeTab, transactionAmount])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value)
    }

    const persistTargetAccountMetadata = async () => {
        if (!originalAccountId || !selectedAccountId || selectedAccountId === originalAccountId) {
            return
        }

        await updateTransactionMetadata(transaction.id, {
            target_account_id: selectedAccountId,
            target_account_changed_from: originalAccountId,
        })
    }

    const handleWaitingRefund = async () => {
        if (isWaitingRefundLocked) return

        setIsLoading(true)
        try {
            await persistTargetAccountMetadata()
            const result = await cancelOrder(transaction.id)

            if (result.success) {
                toast.success('Waiting refund request created')
                onOpenChange(false)
            } else {
                toast.error(result.error || 'Unable to request waiting refund')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRefunded = async () => {
        if (amount <= 0 || amount > transactionAmount) {
            toast.error('Amount must be greater than 0 and not exceed the original amount')
            return
        }

        const targetAccountId = selectedAccountId || originalAccountId
        if (!targetAccountId) {
            toast.error('Please select a target account')
            return
        }

        setIsLoading(true)
        try {
            await persistTargetAccountMetadata()
            const result = await instantRefund(transaction.id, amount, targetAccountId)

            if (result.success) {
                toast.success('Immediate refund completed')
                onOpenChange(false)
            } else {
                toast.error(result.error || 'Unable to process immediate refund')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRefundPart = async () => {
        if (amount <= 0 || amount > transactionAmount) {
            toast.error('Amount must be greater than 0 and not exceed the original amount')
            return
        }

        setIsLoading(true)
        try {
            await persistTargetAccountMetadata()
            const result = await requestRefund(transaction.id, amount, true)

            if (result.success) {
                toast.success('Partial refund request created')
                onOpenChange(false)
            } else {
                toast.error(result.error || 'Unable to request partial refund')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const renderTargetAccountPicker = () => {
        return (
            <div className="space-y-2">
                <Label className="text-sm font-medium">Target Account</Label>
                <Combobox
                    items={accountItems}
                    value={selectedAccountId || undefined}
                    onValueChange={(value) => setSelectedAccountId(value || '')}
                    placeholder="Select target account"
                    inputPlaceholder="Search account..."
                    emptyState="No account found"
                    onAddNew={() => window.open('/accounts/new', '_blank', 'noopener,noreferrer')}
                    addLabel="Account"
                    className="h-11"
                    hideClearButton
                />
                <p className="text-xs text-slate-500">
                    Default target account is the original account.
                </p>
            </div>
        )
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[85vh] max-h-[85vh] overflow-y-auto">
                <SheetHeader className="mb-4">
                    <SheetTitle className="text-lg">Refund Flow</SheetTitle>
                </SheetHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-6 grid grid-cols-3">
                        <TabsTrigger value="waiting-refund">Waiting Refund</TabsTrigger>
                        <TabsTrigger value="refunded">Refunded</TabsTrigger>
                        <TabsTrigger value="refund-part">Refund a Part</TabsTrigger>
                    </TabsList>

                    <TabsContent value="waiting-refund" className="space-y-5">
                        <div>
                            <Label className="text-sm font-medium">Amount</Label>
                            <AmountInput
                                value={transactionAmount}
                                onChange={setAmount}
                                disabled
                                max={transactionAmount}
                            />
                            <p className="mt-2 text-xs text-amber-700">
                                To refund a partial amount, go to Refund a Part tab
                            </p>
                        </div>

                        {renderTargetAccountPicker()}

                        {isWaitingRefundLocked && (
                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                                Waiting Refund is currently locked for this transaction (status: {refundStatus}).
                            </div>
                        )}

                        <Button
                            onClick={handleWaitingRefund}
                            disabled={isLoading || isWaitingRefundLocked}
                            className="w-full"
                        >
                            {isLoading ? 'Processing...' : 'Request Waiting Refund'}
                        </Button>
                    </TabsContent>

                    <TabsContent value="refunded" className="space-y-5">
                        <div>
                            <Label className="text-sm font-medium">Amount</Label>
                            <AmountInput
                                value={amount}
                                onChange={setAmount}
                                min={1}
                                max={transactionAmount}
                                step={1000}
                            />
                            <p className="mt-2 text-xs text-slate-500">
                                Maximum: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                            </p>
                        </div>

                        {renderTargetAccountPicker()}

                        <Button
                            onClick={handleRefunded}
                            disabled={isLoading || amount <= 0 || amount > transactionAmount}
                            className="w-full"
                        >
                            {isLoading ? 'Processing...' : 'Confirm Refunded'}
                        </Button>
                    </TabsContent>

                    <TabsContent value="refund-part" className="space-y-5">
                        <div>
                            <Label className="text-sm font-medium">Amount</Label>
                            <AmountInput
                                value={amount}
                                onChange={setAmount}
                                min={1}
                                max={transactionAmount}
                                step={1000}
                            />
                            <p className="mt-2 text-xs text-slate-500">
                                Maximum: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                            </p>
                        </div>

                        {renderTargetAccountPicker()}

                        <Button
                            onClick={handleRefundPart}
                            disabled={isLoading || amount <= 0 || amount > transactionAmount}
                            className="w-full"
                        >
                            {isLoading ? 'Processing...' : 'Request Partial Refund'}
                        </Button>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}
