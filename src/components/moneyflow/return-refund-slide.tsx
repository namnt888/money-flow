'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AmountInput } from '@/components/ui/amount-input'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select-shadcn'
import { cancelOrder, requestRefund, instantRefund } from '@/actions/transaction-actions'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

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
    const [isLoading, setIsLoading] = useState(false)

    // Fetch accounts for the "other account" picker
    const { data: accounts = [] } = useQuery<Account[]>({
        queryKey: ['accounts'],
        queryFn: async () => {
            const { getAccountsAction } = await import('@/actions/transaction-actions')
            return await getAccountsAction()
        },
    })

    useEffect(() => {
        if (open) {
            setAmount(transactionAmount)
            setSelectedAccountId(originalAccountId)
            setRefundDestination('original')
            setActiveTab('cancel-100')
        }
    }, [open, transactionAmount, originalAccountId])

    const handleCancel100 = async () => {
        onSubmitStart?.()
        onOpenChange(false)
        setIsLoading(true)
        try {
            const result = await cancelOrder(transactionId)

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
            toast.error('Số tiền phải lớn hơn 0 và không vượt quá số tiền gốc')
            return
        }

        onSubmitStart?.()
        onOpenChange(false)
        setIsLoading(true)
        try {
            const result = await requestRefund(transactionId, amount, true)

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
            toast.error('Số tiền phải lớn hơn 0 và không vượt quá số tiền gốc')
            return
        }

        const targetAccountId = refundDestination === 'original' ? originalAccountId : selectedAccountId
        if (!targetAccountId) {
            toast.error('Vui lòng chọn tài khoản hoàn tiền')
            return
        }

        onSubmitStart?.()
        onOpenChange(false)
        setIsLoading(true)
        try {
            const result = await instantRefund(transactionId, amount, targetAccountId)

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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[85vh] max-h-[85vh] overflow-y-auto">
                <SheetHeader className="mb-4">
                    <SheetTitle className="text-lg">Hoàn / Hủy đơn</SheetTitle>
                </SheetHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="cancel-100">Hủy đơn 100%</TabsTrigger>
                        <TabsTrigger value="partial">Hủy một phần</TabsTrigger>
                        <TabsTrigger value="instant">Hoàn ngay</TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Hủy đơn 100% */}
                    <TabsContent value="cancel-100" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">Số tiền</Label>
                                <AmountInput
                                    value={amount}
                                    onChange={setAmount}
                                    disabled={true}
                                    hint="Để hủy một phần, chuyển sang tab 'Hủy một phần' bên dưới."
                                    max={transactionAmount}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Số tiền gốc: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                                </p>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-sm text-amber-800">
                                    <strong>Lưu ý:</strong> Hủy đơn 100% sẽ tạo giao dịch hoàn tiền chờ xác nhận (GD2). Bạn cần xác nhận hoàn tiền sau đó.
                                </p>
                            </div>

                            <Button
                                onClick={handleCancel100}
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Xác nhận hủy đơn 100%'}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Tab 2: Hủy một phần */}
                    <TabsContent value="partial" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">Số tiền hoàn</Label>
                                <AmountInput
                                    value={amount}
                                    onChange={setAmount}
                                    min={1}
                                    max={transactionAmount}
                                    step={1000}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Số tiền tối đa: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>Thông tin:</strong> Hủy một phần sẽ tạo giao dịch hoàn tiền chờ xác nhận (GD2) với số tiền bạn chọn.
                                </p>
                            </div>

                            <Button
                                onClick={handlePartialRefund}
                                disabled={isLoading || amount <= 0 || amount > transactionAmount}
                                className="w-full"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Yêu cầu hoàn tiền một phần'}
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Tab 3: Hoàn ngay */}
                    <TabsContent value="instant" className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium">Số tiền hoàn</Label>
                                <AmountInput
                                    value={amount}
                                    onChange={setAmount}
                                    min={1}
                                    max={transactionAmount}
                                    step={1000}
                                />
                                <p className="text-xs text-slate-500 mt-2">
                                    Số tiền tối đa: <span className="font-semibold">{formatCurrency(transactionAmount)}</span>
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-3 block">Đích đến hoàn tiền</Label>
                                <RadioGroup
                                    value={refundDestination}
                                    onValueChange={(value: string) => setRefundDestination(value as 'original' | 'other')}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="original" id="original" />
                                        <Label htmlFor="original" className="text-sm">
                                            Hoàn về tài khoản gốc
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="other" id="other" />
                                        <Label htmlFor="other" className="text-sm">
                                            Hoàn về tài khoản khác
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {refundDestination === 'other' && (
                                <div>
                                    <Label className="text-sm font-medium">Chọn tài khoản</Label>
                                    <Select
                                        value={selectedAccountId}
                                        onValueChange={(val) => val !== undefined && setSelectedAccountId(val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn tài khoản..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accounts.map((account: Account) => (
                                                <SelectItem key={account.id} value={account.id}>
                                                    {account.name} ({account.type})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-800">
                                    <strong>Hoàn ngay:</strong> Giao dịch hoàn tiền sẽ được hoàn tất ngay lập tức, không tạo GD2 chờ xác nhận.
                                </p>
                            </div>

                            <Button
                                onClick={handleInstantRefund}
                                disabled={isLoading || amount <= 0 || amount > transactionAmount}
                                className="w-full"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Hoàn tiền ngay'}
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}
