"use client"

import React, { useCallback, useEffect, useState, useTransition, useMemo, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import {
    Account,
    Category,
    Person,
    Shop
} from '@/types/moneyflow.types'
import { AccountSpendingStats } from '@/types/cashback.types'
import { AccountDetailHeaderV2 } from './AccountDetailHeaderV2'
import { AccountDetailTransactions } from './AccountDetailTransactions'
import { getAccountCashbackStatsAction } from '@/actions/account-cashback-actions'
import { AccountContentWrapper } from '@/components/moneyflow/account-content-wrapper'
import { resolveTransactionCycleTag } from '@/lib/cycle-utils'
import { normalizeMonthTag } from '@/lib/month-tag'
import { useRecentItems } from '@/hooks/use-recent-items'
import { Info } from 'lucide-react'
import { AccountPendingItemsModal } from './AccountPendingItemsModal'
import { useBreadcrumbs } from '@/context/breadcrumb-context'
import { useAppFavicon } from '@/hooks/use-app-favicon'
import { AccountDetailInvestment } from './AccountDetailInvestment'
import { cn } from '@/lib/utils'

// Shared utility imported from @/lib/cycle-utils

type PendingBatchItem = {
    id: string
    amount: number
    batch_id: string
    month_year?: string | null
    period?: string | null
    phase_id?: string | null
    bank_type?: string | null
    batch?: {
        id?: string | null
        name?: string | null
        month_year?: string | null
        period?: string | null
        phase_id?: string | null
        bank_type?: string | null
    } | null
}

interface AccountDetailViewV2Props {
    account: Account
    allAccounts: Account[]
    categories: Category[]
    people: Person[]
    shops: Shop[]
    initialTransactions: any[]
    initialCashbackStats: AccountSpendingStats | null
}

export function AccountDetailViewV2({
    account,
    allAccounts,
    categories,
    people,
    shops,
    initialTransactions,
    initialCashbackStats
}: AccountDetailViewV2Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [isCashbackLoading, setIsCashbackLoading] = useState(false)
    const [cashbackStats, setCashbackStats] = useState<AccountSpendingStats | null>(initialCashbackStats)
    const [cycleApplyTick, setCycleApplyTick] = useState(0)

    // Dynamic Icon for Account Detail (Shows Bank Logo on Tab)
    useAppFavicon(isPending, account.image_url ?? undefined)

    // Year Filter State (for header)
    const [selectedYear, setSelectedYear] = useState<string | null>(null)

    // Selected Cycle State (for cashback badge in header)
    const [selectedCycle, setSelectedCycle] = useState<string | undefined>()

    const handleCycleChange = useCallback((cycle: string | undefined) => {
        // Trigger cashback loading immediately so health spinner starts together with txn spinner
        if (cycle && cycle !== 'all') {
            setIsCashbackLoading(true)
        } else {
            setIsCashbackLoading(false)
        }
        setSelectedCycle(cycle)
        setCycleApplyTick((prev) => prev + 1)
    }, [])

       // Sync cycle from URL
    useEffect(() => {
        const tag = searchParams.get('tag')
        if (tag && tag !== selectedCycle) {
            setSelectedCycle(tag)
        }
       }, [searchParams, selectedCycle])

       // Fetch cashback when cycle changes (from any source: URL or dropdown)
       useEffect(() => {
           if (!selectedCycle) return
       
           setIsCashbackLoading(true)
           getAccountCashbackStatsAction(account.id, selectedCycle).then(result => {
               setIsCashbackLoading(false)
               if (result.success && result.data) {
                   setCashbackStats(result.data)
               }
           }).catch(err => {
               setIsCashbackLoading(false)
               console.warn('Failed to fetch cashback stats:', err)
           })
       }, [selectedCycle, account.id, cycleApplyTick])

    useEffect(() => {
        setCashbackStats(initialCashbackStats)
    }, [initialCashbackStats])

    // Batch Stats State
    const [pendingItems, setPendingItems] = useState<PendingBatchItem[]>([])
    const [isConfirmingPending, setIsConfirmingPending] = useState(false)
    const [pendingRefundAmount, setPendingRefundAmount] = useState(0)
    const [pendingRefundCount, setPendingRefundCount] = useState(0)
    const [isLoadingPending, setIsLoadingPending] = useState(true)
    const pendingQueryOpenedRef = useRef(false)

    const availableYears = React.useMemo(() => {
        const years = new Set<string>()
        initialTransactions.forEach(txn => {
            const tag = resolveTransactionCycleTag(txn, account)
            if (tag && /^\d{4}-\d{2}$/.test(tag)) {
                years.add(tag.split('-')[0])
            }
        })
        const currentYear = new Date().getFullYear().toString()
        years.add(currentYear)
        return Array.from(years).sort().reverse()
    }, [initialTransactions, account])

    const summary = useMemo(() => {
        const fallbackYear = availableYears.length > 0 ? parseInt(availableYears[0]) : new Date().getFullYear();
        const targetYearInt = selectedYear 
            ? parseInt(selectedYear) 
            : (selectedCycle && selectedCycle !== 'all' 
                ? parseInt(selectedCycle.split('-')[0]) 
                : fallbackYear);

        const categoryMap = new Map(categories.map(c => [c.id, c]));
        
        // Effective Rate Calculation from current cycle (Backend rules)
        let effectiveCycleRate = 0;
        if (cashbackStats?.currentSpend && cashbackStats.currentSpend > 0) {
            effectiveCycleRate = (cashbackStats.earnedSoFar || 0) / cashbackStats.currentSpend;
        }
        
        // Use base rate as minimum fallback
        const baseRate = account.cb_base_rate ? account.cb_base_rate / 100 : 0;
        const estimateRate = effectiveCycleRate > 0 ? effectiveCycleRate : baseRate;

        let cardYearlyCashbackTotal = 0;
        let cardYearlyCashbackGivenTotal = 0;
        let yearEligibleSpendForEstimate = 0;
        let cashbackTotal = 0;
        let yearPureIncomeTotal = 0;
        let yearPureExpenseTotal = 0;
        let yearTotalInflow = 0;
        let yearTotalOutflow = 0;
        let yearDebtTotal = 0;
        let yearLentTotal = 0;
        let yearRepaidTotal = 0;
        
        initialTransactions.forEach(tx => {
            const status = String(tx?.status || '').toLowerCase()
            if (status === 'void') return

            const rawDate = tx?.occurred_at || tx?.date || tx?.created_at;
            const date = rawDate ? new Date(rawDate) : null;
            if (!date || isNaN(date.getTime())) return;
            
            const txCycleTag = resolveTransactionCycleTag(tx as any, account);
            const txYearMatch = txCycleTag && /^\d{4}-\d{2}$/.test(txCycleTag) 
                ? parseInt(txCycleTag.split('-')[0]) 
                : date.getFullYear();

            const amount = Math.abs(Number(tx?.amount || 0));
            const type = String(tx?.type || '').toLowerCase();
            const note = String(tx?.notes || tx?.note || '').toLowerCase();
            if (note.includes('create initial') || note.includes('số dư đầu') || note.includes('opening balance') || note.includes('rollover')) return;

            if (txYearMatch === targetYearInt) {
                const isTargetAccount = tx.target_account_id === account.id || tx.to_account_id === account.id;
                const isSourceAccount = tx.account_id === account.id || tx.source_account_id === account.id;

                const isIncoming = (type === 'income') || (type === 'repayment') || (type === 'transfer' && isTargetAccount);
                const isOutgoing = (type === 'expense') || (type === 'service') || (type === 'debt') || (type === 'invest') || (type === 'transfer' && isSourceAccount);

                if (type === 'income') {
                    yearPureIncomeTotal += amount;
                    const cat = tx.category_id ? categoryMap.get(tx.category_id) : null;
                    const catName = (cat?.name || tx?.category_name || "").toLowerCase();
                    if (catName.includes('cashback') || catName.includes('hoàn tiền')) {
                        cashbackTotal += amount;
                    }
                }
                
                if (isOutgoing) {
                    yearPureExpenseTotal += amount;
                    yearEligibleSpendForEstimate += amount;
                    
                    // Track how much spend actually has cashback records
                    const entries = Array.isArray((tx as any).cashback_entries) ? (tx as any).cashback_entries : [];
                    const txEarned = entries.reduce((s: number, e: any) => {
                        if (e.mode === 'virtual' || e.mode === 'real') {
                            return s + Math.abs(Number(e.amount || 0));
                        }
                        return s;
                    }, 0);

                    if (txEarned > 0) {
                        cardYearlyCashbackTotal += txEarned;
                    } else {
                        // For transactions without explicit entries, we use the estimation rate
                        cardYearlyCashbackTotal += (amount * estimateRate);
                    }
                    
                    // Sum actual shared amount
                    const sharedAmt = Number(tx?.cashback_share_amount || 0);
                    const sharedFixed = Number(tx?.cashback_share_fixed || 0);
                    const sharedPercent = Number(tx?.cashback_share_percent || 0);
                    
                    if (sharedAmt > 0) {
                        cardYearlyCashbackGivenTotal += sharedAmt;
                    } else if (sharedFixed > 0 || sharedPercent > 0) {
                        const rate = sharedPercent > 1 ? sharedPercent / 100 : sharedPercent;
                        cardYearlyCashbackGivenTotal += (amount * rate) + sharedFixed;
                    } else {
                        const cat = tx.category_id ? categoryMap.get(tx.category_id) : null;
                        const catName = (cat?.name || tx?.category_name || "").toLowerCase();
                        if (catName.includes('shared') || catName.includes('chia sẻ cashback')) {
                            cardYearlyCashbackGivenTotal += amount;
                        }
                    }
                }

                if (type === 'repayment') yearRepaidTotal += amount;
                if (type === 'debt') yearLentTotal += amount;
                if (isIncoming) yearTotalInflow += amount;
                if (isOutgoing) yearTotalOutflow += amount;
                
                if (type === 'debt') yearDebtTotal += amount;
            }
        });

        // Apply global limit cap if defined
        if (account.type === 'credit_card' && account.cb_max_budget && cardYearlyCashbackTotal > account.cb_max_budget) {
            cardYearlyCashbackTotal = account.cb_max_budget;
        }

        // Safety check: Potential rewards should never be less than what we actually already received (income)
        // unless there's a serious data recording mismatch. Usually Potential >= Actual Claimed.
        if (cashbackTotal > cardYearlyCashbackTotal) {
            cardYearlyCashbackTotal = cashbackTotal;
        }

        const netProfitYearly = cardYearlyCashbackTotal - cardYearlyCashbackGivenTotal;

        if (initialTransactions.length > 0) {
            console.log(`[CalcEngine] Target YEAR: ${targetYearInt}`, {
                totalTx: initialTransactions.length,
                yearTx: initialTransactions.filter(tx => {
                    const status = String(tx?.status || '').toLowerCase();
                    if (status === 'void') return false;
                    const rawDate = tx?.occurred_at || tx?.date || tx?.created_at;
                    const date = rawDate ? new Date(rawDate) : null;
                    if (!date || isNaN(date.getTime())) return false;
                    const txCycleTag = resolveTransactionCycleTag(tx as any, account);
                    const txYearMatch = txCycleTag && /^\d{4}-\d{2}$/.test(txCycleTag) 
                        ? parseInt(txCycleTag.split('-')[0]) 
                        : date.getFullYear();
                    return txYearMatch === targetYearInt;
                }).length,
                profit: netProfitYearly,
                actual: cashbackTotal,
                est: cardYearlyCashbackTotal
            });
        }

        return {
            netProfitYearly,
            cashbackTotal,
            cardYearlyCashbackTotal,
            cardYearlyCashbackGivenTotal,
            yearPureIncomeTotal,
            yearPureExpenseTotal,
            yearTotalInflow,
            yearTotalOutflow,
            yearLentTotal,
            yearRepaidTotal,
            yearEligibleSpendForEstimate,
            yearDebtTotal,
            pendingCount: pendingItems.length,
            
            // Legacy fields for type safety
            debtTotal: yearDebtTotal,
            expensesTotal: yearPureExpenseTotal,
            yearExpensesTotal: yearPureExpenseTotal,
            targetYear: targetYearInt
        };
    }, [initialTransactions, categories, selectedYear, pendingItems.length, pendingRefundCount, selectedCycle, availableYears, cashbackStats])

    useEffect(() => {
        document.title = `${account.name} History`
    }, [account.name])

    const { addRecentItem } = useRecentItems()

    useEffect(() => {
        if (account.id && account.name) {
            addRecentItem({
                id: account.id,
                type: 'account',
                name: account.name,
                image_url: account.image_url
            })
        }
    }, [account.id, account.name, addRecentItem])

    const { setCustomName } = useBreadcrumbs();
    useEffect(() => {
        if (account.name) {
            setCustomName(`/accounts/${account.id}`, account.name);
        }
    }, [account.id, account.name, setCustomName]);

    const syncPendingStats = useCallback(async () => {
        setIsLoadingPending(true)
        try {
            const safeFetch = async (url: string) => {
                try {
                    return await fetch(url, { cache: 'no-store' })
                } catch {
                    return null
                }
            }

            const [batchRes] = await Promise.all([
                safeFetch(`/api/batch/pending-items?accountId=${account.id}&t=${Date.now()}`)
            ])

            if (batchRes?.ok) {
                const data = await batchRes.json()
                setPendingItems(Array.isArray(data) ? data : [])
            }
        } catch (error) {
            console.error('Failed to fetch pending data', error)
        } finally {
            setIsLoadingPending(false)
        }
    }, [account.id])

    const handleGlobalRefresh = useCallback(() => {
        startTransition(() => {
            router.refresh()
            setCycleApplyTick(prev => prev + 1)
            syncPendingStats()
        })
    }, [router, syncPendingStats])

    useEffect(() => {
        syncPendingStats()

        const handleRefresh = () => {
            console.log('Refreshing account data via event')
            handleGlobalRefresh()
        }
        window.addEventListener('refresh-account-data', handleRefresh)

        const pollTimer = window.setInterval(() => {
            syncPendingStats()
        }, 30_000)

        return () => {
            window.removeEventListener('refresh-account-data', handleRefresh)
            window.clearInterval(pollTimer)
        }
    }, [account.id, syncPendingStats])

    // Remove pending refund - DB is now PocketBase only, no more Supabase refunds
    useEffect(() => {
        setPendingRefundAmount(0)
        setPendingRefundCount(0)
    }, [account.id])

    const handleConfirmPending = async () => {
        if (isConfirmingPending) return
        if (pendingItems.length === 0) {
            router.push('/batch')
            return
        }

        setIsConfirmingPending(true)
        const toastId = toast.loading(`Confirming ${pendingItems.length} items...`)
        try {
            let successCount = 0
            for (const item of pendingItems) {
                const response = await fetch('/api/batch/confirm-item', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemId: item.id, batchId: item.batch_id }),
                })
                if (response.ok) successCount += 1
            }

            if (successCount > 0) {
                toast.success(`Confirmed ${successCount} items`, { id: toastId })
                setPendingItems([])
                setPendingRefundAmount(0)
                router.refresh()
            } else {
                toast.error('Failed to confirm items', { id: toastId })
            }
        } catch (error) {
            toast.error('Error confirming items', { id: toastId })
        } finally {
            setIsConfirmingPending(false)
        }
    }


    // Initialize selectedYear to first available year if not set
    useEffect(() => {
        if (!selectedYear && availableYears.length > 0) {
            setSelectedYear(availableYears[0])
        }
    }, [availableYears, selectedYear])

    const pendingBatchAmount = pendingItems.reduce((sum, item) => sum + Math.abs(item.amount ?? 0), 0)
    const pendingTotal = pendingBatchAmount + pendingRefundAmount

    useEffect(() => {
        const wantsPendingModal = searchParams.get('pending') === '1'
        if (!wantsPendingModal || isLoadingPending || pendingQueryOpenedRef.current) return

        pendingQueryOpenedRef.current = true
        const pendingCount = pendingItems.length
        if (pendingCount > 0) {
            window.dispatchEvent(new CustomEvent('open-pending-items-modal', {
                detail: { accountId: account.id },
            }))
        }
    }, [searchParams, isLoadingPending, pendingItems.length, pendingRefundCount, account.id])

    return (
        <div className="flex flex-col h-full overflow-hidden bg-white relative">
            {/* Header V2 */}
            <AccountDetailHeaderV2
                account={account}
                allAccounts={allAccounts}
                categories={categories}
                cashbackStats={cashbackStats}
                isCashbackLoading={isCashbackLoading}
                initialTransactions={initialTransactions}
                selectedYear={selectedYear}
                availableYears={availableYears}
                onYearChange={setSelectedYear}
                selectedCycle={selectedCycle}
                summary={summary}
                isLoadingPending={isLoadingPending}
                pendingBatchCount={pendingItems.length}
                pendingRefundCount={pendingRefundCount}
                pendingRefundAmount={pendingRefundAmount}
            />

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b border-slate-100 bg-white px-6">
                <button
                    onClick={() => {
                        const params = new URLSearchParams(window.location.search)
                        params.delete('tab')
                        router.push(`${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`)
                    }}
                    className={cn(
                        "px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 hover:text-slate-900 shadow-sm",
                        !searchParams.get('tab') || searchParams.get('tab') === 'transactions'
                            ? "border-indigo-500 text-indigo-600 bg-indigo-50/10"
                            : "border-transparent text-slate-400 hover:bg-slate-50"
                    )}
                >
                    Transactions
                </button>
                {account.type === 'investment' && (
                    <button
                        onClick={() => {
                            const params = new URLSearchParams(window.location.search)
                            params.set('tab', 'investment')
                            router.push(`${window.location.pathname}?${params.toString()}`)
                        }}
                        className={cn(
                            "px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 hover:text-slate-900 shadow-sm",
                            searchParams.get('tab') === 'investment'
                                ? "border-indigo-500 text-indigo-600 bg-indigo-50/10"
                                : "border-transparent text-slate-400 hover:bg-slate-50"
                        )}
                    >
                        Investment
                    </button>
                )}
                {/* Add more tabs if needed like 'analysis' */}
            </div>

            {/* Content Area - Loading indicator moved here for "middle of table" feel */}
            <div className="flex-1 overflow-y-auto space-y-4 relative">
                {isPending && (
                    <div className="absolute inset-0 z-[999] pointer-events-none flex items-center justify-center animate-in fade-in duration-500">
                        <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-700/50 flex items-center gap-3 animate-in zoom-in duration-300">
                            <div className="relative flex items-center justify-center">
                                <div className="h-5 w-5 border-2 border-slate-700 border-t-indigo-400 rounded-full animate-spin" />
                                <div className="absolute inset-0 m-auto h-1 w-1 bg-indigo-400 rounded-full animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">Syncing Transactions</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest animate-pulse mt-0.5">Updating Ledger</span>
                            </div>
                        </div>
                    </div>
                )}
                {searchParams.get('tab') === 'investment' ? (
                    <AccountDetailInvestment
                        account={account}
                        transactions={initialTransactions}
                        accounts={allAccounts}
                        categories={categories}
                        people={people}
                        shops={shops}
                    />
                ) : (
                    <AccountDetailTransactions
                        account={account}
                        transactions={initialTransactions}
                        accounts={allAccounts}
                        categories={categories}
                        people={people}
                        shops={shops}
                        selectedCycle={selectedCycle}
                        onCycleChange={handleCycleChange}
                        onSuccess={handleGlobalRefresh}
                    />
                )}
            </div>
            <FlowLegend />

            <AccountPendingItemsModal
                accountId={account.id}
                accountName={account.name}
                pendingItems={pendingItems}
                onSuccess={() => syncPendingStats()}
            />
        </div>
    )
}

const FlowLegend = () => (
    <div className="px-6 py-2 border-t border-slate-200 bg-white flex items-center gap-6 text-[11px] text-slate-500 font-medium shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 group cursor-help">
            <span className="inline-flex items-center justify-center rounded-[4px] h-5 w-11 text-[9px] font-black bg-orange-50 border border-orange-200 text-orange-700 shadow-sm transition-transform group-hover:scale-105">FROM</span>
            <span className="text-slate-400 font-normal">→ Origin / Source</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
            <span className="inline-flex items-center justify-center rounded-[4px] h-5 w-11 text-[9px] font-black bg-sky-50 border border-sky-200 text-sky-700 shadow-sm transition-transform group-hover:scale-105">TO</span>
            <span className="text-slate-400 font-normal">→ Target / Destination</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-slate-300">
            <Info className="h-3.5 w-3.5" />
            <span className="italic">Flow labels are context-aware (Income = FROM Sender)</span>
        </div>
    </div>
)
