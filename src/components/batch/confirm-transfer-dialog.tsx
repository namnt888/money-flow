'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Loader2, ArrowRightLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConfirmTransferDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    item: any
    accounts: any[] // Pass from parent
    onConfirm: (targetAccountId: string) => Promise<void>
}

export function ConfirmTransferDialog({ open, onOpenChange, item, accounts, onConfirm }: ConfirmTransferDialogProps) {
    const [selectedAccountId, setSelectedAccountId] = useState<string>('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open) {
            // Pre-select if item has target_account_id
            if (item?.target_account_id) {
                setSelectedAccountId(item.target_account_id)
            } else {
                setSelectedAccountId('')
            }
        }
    }, [open, item])

    async function handleConfirm() {
        if (!selectedAccountId) return
        setLoading(true)
        try {
            await onConfirm(selectedAccountId)
            onOpenChange(false)
        } catch (error) {
            console.error('Failed to confirm:', error)
        } finally {
            setLoading(false)
        }
    }

    const selectItems = accounts
        .filter(acc => acc.is_active !== false)
        .map((acc) => ({
            value: acc.id,
            label: `${acc.name} ${acc.bank_name ? `(${acc.bank_name})` : ''}`
        }))
        .sort((a, b) => a.label.localeCompare(b.label))

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-2xl border-slate-200">
                <DialogHeader>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-2">
                        <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
                    </div>
                    <DialogTitle className="text-lg font-black text-slate-900 tracking-tight">Confirm Transfer Target</DialogTitle>
                    <DialogDescription className="text-slate-500 text-xs">
                        Select the real account where this money will be transferred to.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="account" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Account</Label>
                        <Select
                            items={selectItems}
                            value={selectedAccountId}
                            onValueChange={(val) => setSelectedAccountId(val || '')}
                            placeholder="Select target account..."
                            disabled={loading}
                            className="h-10 border-slate-200 text-xs font-bold rounded-xl"
                        />
                    </div>
                    {item && (
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-2">
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="font-bold text-slate-400 uppercase tracking-tighter">Receiver</span>
                                <span className="font-black text-slate-700">{item.receiver_name}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="font-bold text-slate-400 uppercase tracking-tighter">Amount</span>
                                <span className="font-black text-indigo-600">{new Intl.NumberFormat('en-US').format(item.amount)} VND</span>
                            </div>
                            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Details</span>
                                <p className="text-[11px] text-slate-500 italic leading-tight">{item.note || 'No description provided'}</p>
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={loading} className="text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-xl">
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirm} 
                        disabled={!selectedAccountId || loading}
                        className={cn(
                            "rounded-xl h-10 px-6 text-xs font-black uppercase tracking-widest transition-all",
                            !selectedAccountId ? "bg-slate-100 text-slate-400" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100"
                        )}
                    >
                        {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                        Confirm Target
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
