'use client'

import React, { useMemo, useState } from 'react'
import { Account, TransactionWithDetails, Category, Person, Shop } from '@/types/moneyflow.types'
import { formatMoneyVND, cn } from '@/lib/utils'
import { TrendingUp, ArrowUpRight, ArrowDownRight, Package, Calculator, History, LineChart, Target, DollarSign, Wallet } from 'lucide-react'
import { UnifiedTransactionTable } from '@/components/moneyflow/unified-transaction-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AccountDetailInvestmentProps {
    account: Account
    transactions: TransactionWithDetails[]
    accounts: Account[]
    categories: Category[]
    people: Person[]
    shops: Shop[]
}

export function AccountDetailInvestment({
    account,
    transactions,
    accounts,
    categories,
    people,
    shops
}: AccountDetailInvestmentProps) {
    const [marketPrice, setMarketPrice] = useState<number | undefined>(undefined)

    const stats = useMemo(() => {
        let realizedPL = 0
        let currentQuantity = 0
        let cumulativeBuyAmount = 0
        let cumulativeBuyQuantity = 0
        let totalInvested = 0
        let totalSold = 0

        const investmentTxns = transactions
            .filter(t => t.status !== 'void' && (t.account_id === account.id || t.target_account_id === account.id))
            .sort((a, b) => new Date(a.occurred_at || a.date || 0).getTime() - new Date(b.occurred_at || b.date || 0).getTime())

        let incompleteCount = 0

        investmentTxns.forEach(t => {
            const isBuy = t.target_account_id === account.id
            const isSell = t.account_id === account.id
            const amount = Math.abs(t.final_price || t.amount || 0)
            const metadata = (t.metadata as any) || {}
            const quantity = Number(metadata.quantity || 0)

            if (quantity <= 0 && amount > 0) {
                incompleteCount++
            }

            if (isBuy && quantity > 0) {
                cumulativeBuyAmount += amount
                cumulativeBuyQuantity += quantity
                currentQuantity += quantity
                totalInvested += amount
            } else if (isSell && quantity > 0) {
                const avgBuyPrice = cumulativeBuyQuantity > 0 ? (cumulativeBuyAmount / cumulativeBuyQuantity) : 0
                const sellPricePerUnit = amount / quantity
                realizedPL += (sellPricePerUnit - avgBuyPrice) * quantity
                
                totalSold += amount
                currentQuantity -= quantity
            }
        })

        const avgBuyPrice = cumulativeBuyQuantity > 0 ? (cumulativeBuyAmount / cumulativeBuyQuantity) : 0
        const currentCostBasis = currentQuantity * avgBuyPrice
        const unrealizedPL = (marketPrice !== undefined && currentQuantity > 0) 
            ? (marketPrice - avgBuyPrice) * currentQuantity 
            : 0
        const currentHoldingsValue = (marketPrice !== undefined) 
            ? currentQuantity * marketPrice 
            : currentCostBasis

        return {
            currentQuantity,
            avgBuyPrice,
            totalInvested,
            totalSold,
            realizedPL,
            unrealizedPL,
            totalPL: realizedPL + unrealizedPL,
            currentMarketValue: currentHoldingsValue,
            transactionCount: investmentTxns.length,
            incompleteCount
        }
    }, [transactions, account.id, marketPrice])

    const formatShortNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toLocaleString()
    }

    return (
        <div className="flex flex-col gap-6 p-6 h-full bg-slate-50/10">
            {/* Header / Market Price Controller */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-indigo-600" />
                        Investment Dashboard
                    </h1>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">
                        Real-time tracking of holdings and profit performance
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col px-2">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Market Price Simulation</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Input
                                type="number"
                                placeholder="Enter current unit price"
                                value={marketPrice || ''}
                                onChange={(e) => setMarketPrice(e.target.value ? Number(e.target.value) : undefined)}
                                className="h-8 w-36 text-xs font-bold border-slate-200 focus:ring-indigo-500"
                            />
                            {marketPrice !== undefined && (
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => setMarketPrice(undefined)}
                                    className="h-8 text-[10px] font-black uppercase text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Holdings Card */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col gap-4 group transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Package className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</span>
                            {stats.incompleteCount > 0 ? (
                                <span className="text-xs font-black text-rose-500 mt-1 uppercase animate-pulse">Missing Data ({stats.incompleteCount})</span>
                            ) : (
                                <span className="text-xs font-black text-emerald-500 mt-1 uppercase">Active</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-slate-900 tabular-nums">
                            {stats.currentQuantity.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1 flex items-center gap-1.5">
                            Units Currently Held
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div className={cn(
                            "h-full rounded-full",
                            stats.incompleteCount > 0 ? "bg-rose-500" : "bg-indigo-500"
                        )} style={{ width: '65%' }} />
                    </div>
                </div>

                {/* Market Value Card */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col gap-4 group transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Net Value</span>
                            <span className="text-xs font-black text-slate-900 mt-1">
                                {marketPrice ? 'Market' : 'Cost'}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-2xl font-black tabular-nums",
                            marketPrice ? "text-emerald-600" : "text-slate-900"
                        )}>
                            {formatMoneyVND(stats.currentMarketValue)}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                            {marketPrice ? 'Current Market Value' : 'Original Cost Basis'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">
                        Avg: {formatMoneyVND(Math.round(stats.avgBuyPrice))} / unit
                    </div>
                </div>

                {/* Realized Profit Card */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col gap-4 group transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <History className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Sales</span>
                            <span className="text-xs font-black text-amber-600 mt-1">
                                {formatShortNumber(stats.totalSold)} Out
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-2xl font-black tabular-nums",
                            stats.realizedPL >= 0 ? "text-emerald-600" : "text-rose-600"
                        )}>
                            {stats.realizedPL >= 0 ? '+' : ''}{formatMoneyVND(stats.realizedPL)}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                            Total Realized Profit
                        </span>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic flex items-center gap-1">
                        <ArrowDownRight className="h-3 w-3" /> From completed trades
                    </div>
                </div>

                {/* Unrealized P/L Card */}
                <div className={cn(
                    "p-5 rounded-3xl border shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col gap-4 group transition-all hover:shadow-lg hover:-translate-y-1",
                    !marketPrice 
                        ? "bg-slate-50/50 border-slate-200 grayscale opacity-60" 
                        : (stats.unrealizedPL >= 0 ? "bg-emerald-50/20 border-emerald-100" : "bg-rose-50/20 border-rose-100")
                )}>
                    <div className="flex justify-between items-start">
                        <div className={cn(
                            "h-10 w-10 rounded-2xl flex items-center justify-center transition-colors",
                            !marketPrice ? "bg-slate-200 text-slate-400" : (stats.unrealizedPL >= 0 ? "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" : "bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white")
                        )}>
                            <LineChart className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Forecast</span>
                            <span className={cn("text-xs font-black mt-1", marketPrice ? (stats.unrealizedPL >= 0 ? "text-emerald-600" : "text-rose-600") : "text-slate-400")}>
                                {marketPrice ? (stats.unrealizedPL >= 0 ? "Bullish" : "Bearish") : "Idle"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-2xl font-black tabular-nums",
                            marketPrice ? (stats.unrealizedPL >= 0 ? "text-emerald-600" : "text-rose-600") : "text-slate-400"
                        )}>
                            {marketPrice ? (stats.unrealizedPL >= 0 ? '+' : '') + formatMoneyVND(stats.unrealizedPL) : 'N/A'}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mt-1">
                            Floating Profit / Loss
                        </span>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter italic">
                        {marketPrice ? `Gap: ${stats.totalInvested > 0 ? ((stats.unrealizedPL / stats.totalInvested) * 100).toFixed(2) : '0.00'}%` : 'Simulate price to see P/L'}
                    </div>
                </div>
            </div>

            {/* Detailed Performance Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Investment Stats */}
                <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Calculator className="h-4 w-4" /> Account Analytics
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Total Investments</span>
                                <span className="text-sm font-black text-slate-700">{formatMoneyVND(stats.totalInvested)}</span>
                            </div>
                            <div className="text-right flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Avg Price</span>
                                <span className="text-sm font-black text-slate-700">{formatMoneyVND(Math.round(stats.avgBuyPrice))}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Realized Profit</span>
                                <span className={cn("text-sm font-black", stats.realizedPL >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                    {formatMoneyVND(stats.realizedPL)}
                                </span>
                            </div>
                            <div className="text-right flex flex-col">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Transactions</span>
                                <span className="text-sm font-black text-slate-700">{stats.transactionCount} Trades</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Total Net Benefit</span>
                                <span className={cn("text-xl font-black tabular-nums", stats.totalPL >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                    {formatMoneyVND(stats.totalPL)}
                                </span>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                <Target className={cn("h-5 w-5", stats.totalPL >= 0 ? "text-emerald-500" : "text-rose-500")} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investment History Table */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <History className="h-5 w-5 text-slate-400" />
                            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase tracking-widest">Trade History</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex-1 min-h-[400px]">
                        <UnifiedTransactionTable
                            transactions={transactions}
                            accounts={accounts}
                            categories={categories}
                            people={people}
                            shops={shops}
                            accountId={account.id}
                            onEdit={() => {}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
