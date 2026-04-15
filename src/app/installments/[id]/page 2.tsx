import { Suspense } from 'react'
import {
    getPocketBaseInstallmentPlan,
    getPocketBaseTransactionsByPlan,
    getPocketBaseAccounts,
    getPocketBaseCategories,
    getPocketBasePeople,
    getPocketBaseShops
} from '@/services/pocketbase/account-details.service'
import { UnifiedTransactionTable } from '@/components/moneyflow/unified-transaction-table'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Calendar, CreditCard, Landmark, Info, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'
import { formatMoneyVND, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function InstallmentDetailPage({ params }: PageProps) {
    const { id } = await params

    if (!id) notFound()

    const [plan, allTransactions, accounts, categories, people, shops] = await Promise.all([
        getPocketBaseInstallmentPlan(id),
        getPocketBaseTransactionsByPlan(id),
        getPocketBaseAccounts(),
        getPocketBaseCategories(),
        getPocketBasePeople(),
        getPocketBaseShops()
    ])

    if (!plan) notFound()

    // Filter out void transactions
    const transactions = allTransactions.filter(t => t.status !== 'void')

    const totalPaid = transactions.reduce((sum, t) => sum + Math.abs(t.amount || 0), 0)
    const totalAmount = plan.total_amount || 0
    const remainingAmount = Math.max(0, totalAmount - totalPaid)
    const progress = totalAmount > 0 ? (totalPaid / totalAmount) * 100 : 0
    
    // Find the latest transaction to get current status
    const sortedTxns = [...transactions].sort((a, b) => 
        new Date(b.occurred_at || 0).getTime() - new Date(a.occurred_at || 0).getTime()
    )
    const lastPayment = sortedTxns[0]

    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            {/* Elegant Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/installments" 
                            className="group h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                        >
                            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                        </Link>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-black text-slate-900 tracking-tight">
                                    {plan.name || 'Installment Plan'}
                                </h1>
                                <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 px-2 py-0 h-5 text-[10px] font-black uppercase">
                                    {plan.status || 'Active'}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mt-0.5">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Started {plan.start_date ? new Date(plan.start_date).toLocaleDateString() : 'N/A'}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="flex items-center gap-1">
                                    <Landmark className="h-3 w-3" />
                                    {plan.expand?.account_id?.name || 'Account'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end mr-4">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Value</span>
                            <span className="text-xl font-black text-slate-900 tabular-nums leading-none">
                                {formatMoneyVND(totalAmount)}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
                    {/* Progress Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <DashboardCard 
                            label="Paid Amount" 
                            value={totalPaid} 
                            color="text-emerald-600"
                            icon={<ArrowDownRight className="h-4 w-4" />}
                            subLabel={`${transactions.length} Installments Paid`}
                        />
                        <DashboardCard 
                            label="Remaining" 
                            value={remainingAmount} 
                            color="text-rose-600"
                            icon={<ArrowUpRight className="h-4 w-4" />}
                            subLabel={`${plan.total_months || 0} Months Total`}
                        />
                        <DashboardCard 
                            label="Next Payment" 
                            value={totalAmount / (plan.total_months || 1)} 
                            color="text-slate-900"
                            icon={<CreditCard className="h-4 w-4" />}
                            subLabel="Estimated Amount"
                        />
                        
                        {/* Progress Circular/Stats */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan Progress</span>
                                <span className="text-xs font-black text-indigo-600">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/20">
                                <div 
                                    className="h-full bg-indigo-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 italic">
                                    {plan.months_paid || 0} of {plan.total_months || 0} months
                                </span>
                                <TrendingUp className="h-4 w-4 text-indigo-500 opacity-50" />
                            </div>
                        </div>
                    </div>

                    {/* Transactions Section */}
                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-slate-400" />
                                <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Payment Ledger</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Info className="h-3 w-3" />
                                    Synchronized with Database
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-0">
                            <Suspense fallback={<div className="p-20 text-center text-slate-400 font-bold animate-pulse">Loading Ledger...</div>}>
                                <UnifiedTransactionTable 
                                    transactions={transactions}
                                    accounts={accounts}
                                    categories={categories}
                                    people={people}
                                    shops={shops}
                                    hideFilters={true}
                                    compact={true}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>

            {/* Legend / Footer */}
            <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Paid</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Future</span>
                </div>
                <div className="italic opacity-60">System Version 3.2.1 • Installment Tracker</div>
            </div>
        </div>
    )
}

function DashboardCard({ label, value, color, icon, subLabel }: { label: string, value: number, color: string, icon: React.ReactNode, subLabel?: string }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm group hover:border-indigo-200/50 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3 text-slate-400">
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                    {icon}
                </div>
            </div>
            <div className={cn("text-xl font-black tabular-nums tracking-tight", color)}>
                {formatMoneyVND(value)}
            </div>
            {subLabel && (
                <div className="mt-2 text-[10px] font-bold text-slate-400/70 border-t border-slate-50 pt-2">
                    {subLabel}
                </div>
            )}
        </div>
    )
}
