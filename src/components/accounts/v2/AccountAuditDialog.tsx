'use client'

import { useState, useMemo, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { 
    Search, 
    Copy, 
    Check, 
    RefreshCw, 
    AlertCircle,
    Download
} from 'lucide-react'
import { formatMoneyVND } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { isYYYYMM } from '@/lib/month-tag'

interface AuditTransaction {
    id: string
    occurred_at: string
    type: string
    note: string
    amount: number
    cashback: number
    finalPrice: number
    cumulativeSum: number
    tag: string
    shop_name?: string
}

interface AccountAuditDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    account: { id: string; name: string }
    initialYear?: string
    availableYears?: string[]
}

export function AccountAuditDialog({
    open,
    onOpenChange,
    account,
    initialYear = '2026',
    availableYears = []
}: AccountAuditDialogProps) {
    const [selectedYear, setSelectedYear] = useState(initialYear)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [transactions, setTransactions] = useState<AuditTransaction[]>([])
    const [copied, setCopied] = useState(false)

    const fetchAuditData = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`/api/accounts/audit?accountId=${account.id}&year=${selectedYear === 'All Time' ? '' : selectedYear}`)
            const data = await response.json()
            if (data.success) {
                setTransactions(data.transactions)
            } else {
                toast.error(data.error || 'Failed to fetch audit data')
            }
        } catch (err) {
            console.error('Audit fetch failed:', err)
            toast.error('Network error while fetching audit data')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (open) {
            fetchAuditData()
        }
    }, [open, selectedYear, account.id])

    const filteredTransactions = useMemo(() => {
        if (!searchTerm) return transactions
        const s = searchTerm.toLowerCase()
        return transactions.filter(t => 
            t.id.toLowerCase().includes(s) || 
            t.note.toLowerCase().includes(s) || 
            t.tag.toLowerCase().includes(s) ||
            t.shop_name?.toLowerCase().includes(s)
        )
    }, [transactions, searchTerm])

    const handleCopyForAgent = () => {
        const headers = ['Date', 'ID', 'Tag', 'Amt', 'CB', 'Net', 'Sum', 'Note']
        const rows = transactions.map(t => [
            new Date(t.occurred_at).toLocaleDateString('en-GB'),
            t.id.slice(0, 6),
            t.tag,
            t.amount,
            t.cashback,
            t.finalPrice,
            t.cumulativeSum,
            t.note
        ])
        
        const csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n")
        navigator.clipboard.writeText(csvContent)
        toast.success('CSV copied for Agent')
    }

    const handleCopyAll = () => {
        const text = transactions.map(t => 
            `${t.occurred_at}\t${t.id}\t${t.type}\t${t.tag}\t${t.amount}\t${t.cashback}\t${t.finalPrice}\t${t.cumulativeSum}\t${t.note}`
        ).join('\n')
        
        navigator.clipboard.writeText(`Date\tID\tType\tTag\tAmount\tCashback\tFinalPrice\tSum\tNote\n${text}`)
        toast.success('Audit data copied to clipboard')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleExportCsv = () => {
        const headers = ['Date', 'ID', 'Type', 'Tag', 'Amount', 'Cashback', 'FinalPrice', 'Sum', 'Note']
        const rows = transactions.map(t => [
            t.occurred_at,
            t.id,
            t.type,
            t.tag,
            t.amount,
            t.cashback,
            t.finalPrice,
            t.cumulativeSum,
            t.note?.replace(/,/g, ';') || ''
        ])
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n")
            
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `audit_account_${account.name}_${selectedYear}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white">
                <DialogHeader className="p-6 pb-2 border-b">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                                <RefreshCw className={cn("h-5 w-5 text-indigo-600", isLoading && "animate-spin")} />
                                Re-Align Audit: {account.name}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-500 font-medium">
                                Cross-check every statement record and transaction for reconciliation.
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleCopyForAgent}
                                className="h-9 px-3 gap-2 font-bold text-xs border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                             >
                                <Copy className="h-4 w-4" />
                                Copy CSV for Agent
                             </Button>
                             <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleExportCsv}
                                className="h-9 px-3 gap-2 font-bold text-xs"
                             >
                                <Download className="h-4 w-4" />
                                Export CSV
                             </Button>
                             <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleCopyAll}
                                className={cn("h-9 px-3 gap-2 font-bold text-xs transition-all", copied && "bg-emerald-50 text-emerald-600 border-emerald-200")}
                             >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'Copied' : 'Copy All'}
                             </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 bg-slate-50/50 border-b flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input 
                                    placeholder="Search by ID, note, tag..." 
                                    className="h-9 pl-9 text-xs bg-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select 
                                value={selectedYear} 
                                onValueChange={(v) => setSelectedYear(v || 'All Time')}
                                items={[
                                    { value: 'All Time', label: 'All Time' },
                                    ...availableYears.map(y => ({ value: y, label: y }))
                                ]}
                                className="w-[140px] h-9 text-xs font-bold"
                            />
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
                             <div className="flex items-center gap-1.5">
                                 <div className="h-2 w-2 rounded-full bg-rose-500" /> 
                                 <span>Expense (+)</span>
                             </div>
                             <div className="flex items-center gap-1.5">
                                 <div className="h-2 w-2 rounded-full bg-emerald-500" /> 
                                 <span>Income (-)</span>
                             </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="flex-1 overflow-auto relative min-h-[400px]">
                        {isLoading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-[1px] z-10 transition-all duration-300">
                                <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-indigo-600 animate-spin" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Ledger...</span>
                            </div>
                        ) : filteredTransactions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <AlertCircle className="h-10 w-10 text-slate-200" />
                                <span className="text-sm font-bold text-slate-400 italic">No account transactions found.</span>
                            </div>
                        ) : (
                            <Table className="border-separate border-spacing-0">
                                <TableHeader className="sticky top-0 bg-white z-20 shadow-sm">
                                    <TableRow className="hover:bg-transparent border-b">
                                        <TableHead className="w-[100px] text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r py-3">Date</TableHead>
                                        <TableHead className="w-[120px] text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r">ID</TableHead>
                                        <TableHead className="w-[80px] text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r">Tag</TableHead>
                                        <TableHead className="flex-1 text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r">Note / Context</TableHead>
                                        <TableHead className="w-[100px] text-right text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r">Amount</TableHead>
                                        <TableHead className="w-[90px] text-right text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r">Cashback</TableHead>
                                        <TableHead className="w-[100px] text-right text-[10px] font-black uppercase tracking-tighter text-slate-400 border-r ring-inset">Net Price</TableHead>
                                        <TableHead className="w-[120px] text-right text-[10px] font-black uppercase tracking-tighter text-slate-400 bg-slate-50">Cumulative SUM</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTransactions.map((t) => (
                                        <TableRow 
                                            key={t.id} 
                                            className="group hover:bg-slate-50 transition-colors border-b"
                                        >
                                            <TableCell className="text-[11px] font-bold text-slate-500 py-3 border-r">
                                                {new Date(t.occurred_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-900 transition-colors uppercase">
                                                        {t.id.slice(0, 8)}...
                                                    </span>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(t.id)
                                                            toast.success('ID copied')
                                                        }}
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <span className={cn(
                                                    "text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter",
                                                    isYYYYMM(t.tag) ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-700 border border-amber-100"
                                                )}>
                                                    {t.tag}
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-w-[300px] border-r">
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-1.5">
                                                        {t.cumulativeSum > (transactions[transactions.indexOf(t)-1]?.cumulativeSum || 0) ? (
                                                            <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.4)]" />
                                                        ) : (
                                                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                                                        )}
                                                        <span className="text-[11px] font-bold text-slate-700 truncate">
                                                            {t.note || (t.type === 'expense' ? 'Spend' : 'Payment')}
                                                        </span>
                                                    </div>
                                                    {t.shop_name && (
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-3.5">
                                                            {t.shop_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-[11px] tabular-nums text-slate-600 border-r">
                                                {formatMoneyVND(t.amount)}
                                            </TableCell>
                                            <TableCell className={cn(
                                                "text-right font-bold text-[11px] tabular-nums border-r",
                                                t.cashback > 0 ? "text-amber-500" : "text-slate-200"
                                            )}>
                                                {t.cashback > 0 ? `-${formatMoneyVND(t.cashback)}` : '—'}
                                            </TableCell>
                                            <TableCell className="text-right font-black text-[12px] tabular-nums border-r text-slate-700">
                                                {formatMoneyVND(t.finalPrice)}
                                            </TableCell>
                                            <TableCell className={cn(
                                                "text-right font-black text-[13px] tabular-nums bg-slate-50/50",
                                                t.cumulativeSum > 0 ? "text-slate-900" : "text-emerald-600"
                                            )}>
                                                {formatMoneyVND(t.cumulativeSum)}
                                                <div className="h-[1.5px] w-full bg-slate-100 mt-1 rounded-full overflow-hidden">
                                                    <div 
                                                        className={cn(
                                                            "h-full transition-all duration-1000",
                                                            t.cumulativeSum > 0 ? "bg-rose-400" : "bg-emerald-400"
                                                        )}
                                                        style={{ width: `${Math.min(100, (Math.abs(t.cumulativeSum) / 25000000) * 100)}%` }}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>

                    {/* Footer Summary */}
                    <div className="p-4 bg-white border-t flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">TOTAL COUNT</span>
                                <span className="text-base font-black text-slate-900 leading-none">{filteredTransactions.length} <span className="text-[10px] text-slate-400">entries</span></span>
                            </div>
                            
                            <div className="w-px h-8 bg-slate-100" />
                            
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-[0.2em] leading-none">TOTAL SPEND (GROSS)</span>
                                    <span className="text-[13px] font-black text-rose-600 tabular-nums leading-none">
                                        {formatMoneyVND(transactions.reduce((acc, t) => {
                                            const prev = transactions[transactions.indexOf(t)-1]?.cumulativeSum || 0;
                                            return t.cumulativeSum > prev ? acc + t.amount : acc;
                                        }, 0))}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 border-l pl-6">
                                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] leading-none">TOTAL PAYMENTS / IN</span>
                                    <span className="text-[13px] font-black text-emerald-600 tabular-nums leading-none">
                                        {formatMoneyVND(transactions.reduce((acc, t) => {
                                             const prev = transactions[transactions.indexOf(t)-1]?.cumulativeSum || 0;
                                             return t.cumulativeSum < prev ? acc + t.amount : acc;
                                        }, 0))}
                                    </span>
                                </div>
                            </div>

                            <div className="w-px h-8 bg-slate-100" />
                            
                            <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">NET REMAINS (DEBT)</span>
                                <span className={cn(
                                    "text-lg font-black leading-none tracking-tight",
                                    (transactions[transactions.length-1]?.cumulativeSum || 0) > 0 ? "text-slate-900" : "text-emerald-600"
                                )}>
                                    {formatMoneyVND(transactions[transactions.length-1]?.cumulativeSum || 0)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs font-bold text-slate-500"
                                onClick={() => onOpenChange(false)}
                            >
                                Close
                            </Button>
                            <Button 
                                size="sm" 
                                className="text-xs font-black uppercase tracking-widest bg-slate-900 hover:bg-slate-800"
                                onClick={fetchAuditData}
                                disabled={isLoading}
                            >
                                <RefreshCw className={cn("h-3.5 w-3.5 mr-2", isLoading && "animate-spin")} />
                                Refetch
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
