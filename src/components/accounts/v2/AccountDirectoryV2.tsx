"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Account, Category, Person, Shop } from "@/types/moneyflow.types";
import { AccountHeaderV2, AdvancedFilters } from "./AccountHeaderV2";
import { AccountTableV2 } from "./AccountTableV2";
import { AccountGridView } from "./AccountGridView";
import { AccountSlideV2 } from "./AccountSlideV2";
import { AccountQuickStats } from "./AccountQuickStats";
import { AccountPendingItemsModal } from "./AccountPendingItemsModal";
import { TransactionSlideV2 } from "@/components/transaction/slide-v2/transaction-slide-v2";
import { toast } from "sonner";
import { getUniqueFamilyCreditLimitTotal } from "@/lib/account-family";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Copy, Search } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AccountAuditDialog } from "./AccountAuditDialog";

interface AccountDirectoryV2Props {
    accounts: Account[];
    categories: Category[];
    people: Person[];
    shops: Shop[];
}

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

export function AccountDirectoryV2({
    accounts: initialAccounts,
    categories,
    people,
    shops
}: AccountDirectoryV2Props) {
    const router = useRouter();
    // State
    const [searchTerm, setSearchTerm] = useState('');

    console.log('AccountDirectoryV2: initialAccounts count', initialAccounts?.length);
    console.log('AccountDirectoryV2: sample account', initialAccounts?.find(a => a.name === 'Exim Violet'));
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<'accounts_cards' | 'credit' | 'savings' | 'debt' | 'closed' | 'system'>('accounts_cards');
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
        family: false,
        dueSoon: false,
        needsSpendMore: false,
        multiRuleCb: false,
        holderOthers: false
    });
    const [viewMode, setViewMode] = useState<'table' | 'grid'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('mf_account_view_mode');
            if (saved === 'table' || saved === 'grid') return saved;
        }
        return 'table';
    });

    useEffect(() => {
        localStorage.setItem('mf_account_view_mode', viewMode);
    }, [viewMode]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [pendingSummaryMap, setPendingSummaryMap] = useState<Record<string, {
        count: number
        totalAmount: number
        accountName?: string | null
    }>>({});
    const [pendingModalOpen, setPendingModalOpen] = useState(false)
    const [pendingModalAccountId, setPendingModalAccountId] = useState<string>('')
    const [pendingModalAccountName, setPendingModalAccountName] = useState<string>('')
    const [pendingModalItems, setPendingModalItems] = useState<PendingBatchItem[]>([])

    // CRUD state (Account)
    const [isAccountSlideOpen, setIsAccountSlideOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [isCloneMode, setIsCloneMode] = useState(false);
    const [editStack, setEditStack] = useState<Account[]>([]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

    // Transaction state
    const [isTxnSlideOpen, setIsTxnSlideOpen] = useState(false);
    const [txnInitialData, setTxnInitialData] = useState<any>(null);
    const [lastTxnAccountId, setLastTxnAccountId] = useState<string | null>(null);

    // Audit state
    // Audit state
    const [isAuditOpen, setIsAuditOpen] = useState(false);
    const [auditAccount, setAuditAccount] = useState<Account | null>(null);

    // Balance sync audit modal state
    const [isSyncBalanceAuditOpen, setIsSyncBalanceAuditOpen] = useState(false)
    const [syncSearch, setSyncSearch] = useState('')
    const [syncSelectedIds, setSyncSelectedIds] = useState<string[]>([])
    const [isSyncRunning, setIsSyncRunning] = useState(false)
    const [syncProgress, setSyncProgress] = useState(0)
    const [syncLogs, setSyncLogs] = useState<string[]>([])
    const [afterBalanceMap, setAfterBalanceMap] = useState<Record<string, number>>({})

    const syncCandidates = useMemo(() => {
        return initialAccounts
            .filter((acc) => acc.type !== 'debt')
            .filter((acc) => {
                if (!syncSearch.trim()) return true
                const q = syncSearch.toLowerCase().trim()
                return (
                    acc.name.toLowerCase().includes(q) ||
                    (acc.receiver_name || '').toLowerCase().includes(q) ||
                    acc.id.toLowerCase().includes(q)
                )
            })
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [initialAccounts, syncSearch])

    const allVisibleSelected = syncCandidates.length > 0 && syncCandidates.every((acc) => syncSelectedIds.includes(acc.id))

    const toggleSelectAllVisible = () => {
        if (allVisibleSelected) {
            setSyncSelectedIds((prev) => prev.filter((id) => !syncCandidates.some((acc) => acc.id === id)))
            return
        }
        const merged = new Set(syncSelectedIds)
        syncCandidates.forEach((acc) => merged.add(acc.id))
        setSyncSelectedIds(Array.from(merged))
    }

    const toggleSelectOne = (accountId: string) => {
        setSyncSelectedIds((prev) => prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId])
    }

    const handleCopySyncLogs = async () => {
        const payload = [
            'SYNC BALANCE AUDIT LOGS',
            `timestamp=${new Date().toISOString()}`,
            `selected=${syncSelectedIds.length}`,
            ...syncLogs,
        ].join('\n')

        await navigator.clipboard.writeText(payload)
        toast.success('Copied sync logs to clipboard')
    }

    const runSyncBalanceAudit = async () => {
        if (syncSelectedIds.length === 0) {
            toast.error('Select at least 1 account')
            return
        }

        setIsSyncRunning(true)
        setSyncProgress(0)
        setSyncLogs([])
        setAfterBalanceMap({})

        const { syncSingleAccountBalanceAudit } = await import('@/actions/admin-actions')
        const total = syncSelectedIds.length
        let processed = 0

        for (const accountId of syncSelectedIds) {
            const result = await syncSingleAccountBalanceAudit(accountId)
            processed += 1
            setSyncProgress(Math.round((processed / total) * 100))

            if (Array.isArray(result.logs)) {
                setSyncLogs((prev) => [...prev, ...result.logs])
            }

            if (Array.isArray(result.affected)) {
                setAfterBalanceMap((prev) => {
                    const next = { ...prev }
                    for (const item of result.affected) {
                        next[item.id] = Number(item.afterBalance || 0)
                    }
                    return next
                })
            }
        }

        setIsSyncRunning(false)
        router.refresh()
        toast.success('Sync Balance audit completed')
    }

    useEffect(() => {
        let mounted = true;
        const fetchLastAccountId = async () => {
            try {
                const response = await fetch('/api/accounts/last-transaction-account', {
                    method: 'GET',
                    cache: 'no-store',
                });
                if (!response.ok) return;
                const payload = await response.json();
                if (mounted) {
                    setLastTxnAccountId(payload?.accountId ?? null);
                }
            } catch (error) {
                console.error('Failed to fetch last transaction account id', error);
            }
        };

        fetchLastAccountId();
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true

        async function loadPendingSummary() {
            try {
                const res = await fetch('/api/batch/pending-summary', {
                    method: 'GET',
                    cache: 'no-store',
                })
                if (!res.ok) return
                const rows = await res.json()
                if (!mounted || !Array.isArray(rows)) return

                const nextMap: Record<string, { count: number; totalAmount: number; accountName?: string | null }> = {}
                for (const row of rows) {
                    const accountId = String(row?.accountId || '').trim()
                    if (!accountId) continue
                    nextMap[accountId] = {
                        count: Number(row?.count || 0),
                        totalAmount: Number(row?.totalAmount || 0),
                        accountName: row?.accountName || null,
                    }
                }
                setPendingSummaryMap(nextMap)
            } catch {
                // keep UI functional even when pending summary endpoint is unavailable
            }
        }

        loadPendingSummary()
        const timer = window.setInterval(loadPendingSummary, 30_000)
        return () => {
            mounted = false
            window.clearInterval(timer)
        }
    }, [])

    const filteredAccounts = useMemo(() => {
        let result = initialAccounts;

        // --- Main Filter Logic ---
        if (activeFilter === 'accounts_cards') {
            result = result.filter(a => ['bank', 'ewallet', 'cash', 'credit_card'].includes(a.type) && a.is_active !== false);
        } else if (activeFilter === 'credit') {
            result = result.filter(a => a.type === 'credit_card' && a.is_active !== false);
        } else if (activeFilter === 'savings') {
            result = result.filter(a => ['savings', 'investment'].includes(a.type) && a.is_active !== false);
        } else if (activeFilter === 'debt') {
            result = result.filter(a => a.type === 'debt' && a.is_active !== false);
        } else if (activeFilter === 'closed') {
            result = result.filter(a => a.is_active === false);
        } else if (activeFilter === 'system') {
            result = result.filter(a => a.type === 'system');
        }

        // --- Advanced Filter Logic ---
        if (advancedFilters.family) {
            result = result.filter(a => (a.relationships?.is_parent || a.parent_account_id));
        }

        if (advancedFilters.dueSoon) {
            const today = new Date();
            const fiveDaysFromNow = new Date();
            fiveDaysFromNow.setDate(today.getDate() + 5);

            result = result.filter(a => {
                if (!a.stats?.due_date) return false;
                const dueDate = new Date(a.stats.due_date);
                return dueDate >= today && dueDate <= fiveDaysFromNow;
            });
        }

        if (advancedFilters.needsSpendMore) {
            result = result.filter(a => {
                const spent = a.stats?.spent_this_cycle || 0;
                const target = a.cb_min_spend || a.stats?.min_spend || 0;
                return target > 0 && spent < target;
            });
        }

        if (advancedFilters.multiRuleCb) {
            result = result.filter(a => {
                const rules = a.cb_rules_json ? (Array.isArray(a.cb_rules_json) ? a.cb_rules_json : (a.cb_rules_json as any).tiers?.flatMap((t: any) => t.rules || [])) : [];
                return (rules?.length || 0) > 1;
            });
        }

        if (advancedFilters.holderOthers) {
            result = result.filter(a => a.holder_type && a.holder_type !== 'me');
        }

        // --- Search Filter ---
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.name.toLowerCase().includes(q) ||
                a.type.toLowerCase().includes(q) ||
                a.id.toLowerCase().includes(q) ||
                a.account_number?.toLowerCase().includes(q)
            );
        }

        return result;
    }, [initialAccounts, searchQuery, activeFilter, advancedFilters]);

    // Derived stats for header
    const activeCount = initialAccounts.filter(a => a.is_active !== false && a.type !== 'debt').length;
    const debtCount = initialAccounts.filter(a => a.type === 'debt' && a.is_active !== false).length;
    const closedCount = initialAccounts.filter(a => a.is_active === false).length;
    const systemCount = initialAccounts.filter(a => a.type === 'system' && a.is_active !== false).length;

    const othersStats = useMemo(() => {
        const otherAccounts = initialAccounts.filter(a => a.holder_type && a.holder_type !== 'me' && a.is_active !== false);
        const limit = getUniqueFamilyCreditLimitTotal(otherAccounts, initialAccounts);
        const debt = otherAccounts.reduce((sum, a) => {
            if (a.type === 'credit_card') return sum + Math.abs(a.current_balance || 0);
            return sum + (a.current_balance < 0 ? Math.abs(a.current_balance) : 0);
        }, 0);
        return { limit, debt };
    }, [initialAccounts]);

    // --- Account Handlers ---
    const handleAddAccount = () => {
        setSelectedAccount(null);
        setIsCloneMode(false);
        setEditStack([]);
        setIsAccountSlideOpen(true);
    };

    const handleCloneAccount = (account: Account) => {
        setSelectedAccount(account);
        setIsCloneMode(true);
        setEditStack([]);
        setIsAccountSlideOpen(true);
    };

    const handleEditAccount = (account: Account) => {
        if (isAccountSlideOpen && selectedAccount && selectedAccount.id !== account.id) {
            setEditStack(prev => [...prev, selectedAccount]);
        } else if (!isAccountSlideOpen) {
            setEditStack([]);
        }
        setSelectedAccount(account);
        setIsCloneMode(false); // Reset clone mode when switching to edit
        setIsAccountSlideOpen(true);
    };

    const handleBack = () => {
        if (editStack.length > 0) {
            const previous = editStack[editStack.length - 1];
            setEditStack(prev => prev.slice(0, -1));
            setSelectedAccount(previous);
            setIsCloneMode(false); // Stack currently only supports edits
        } else {
            setIsAccountSlideOpen(false);
            setIsCloneMode(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setAccountToDelete(id);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!accountToDelete) return;

        try {
            const { deleteAccount } = await import("@/services/account.service");
            const ok = await deleteAccount(accountToDelete);
            if (ok) {
                toast.success("Account deleted successfully");
            } else {
                toast.error("Failed to delete account");
            }
        } catch (err) {
            toast.error("Error deleting account");
        } finally {
            setIsDeleteOpen(false);
            setAccountToDelete(null);
        }
    };

    // --- Transaction Handlers ---
    const handleLend = (account: Account) => {
        setTxnInitialData({
            type: 'debt',
            source_account_id: account.id,
            occurred_at: new Date(),
        });
        setIsTxnSlideOpen(true);
    };

    const handleRepay = (account: Account) => {
        // Repay TO this account? Or this account is REPAYING someone?
        // Usually repaying a credit card bill or loan.
        setTxnInitialData({
            type: 'repayment',
            target_account_id: account.id, // Paying into this account
            occurred_at: new Date(),
        });
        setIsTxnSlideOpen(true);
    };

    const handlePay = (account: Account) => {
        setTxnInitialData({
            type: 'expense',
            source_account_id: account.id,
            occurred_at: new Date(),
        });
        setIsTxnSlideOpen(true);
    };

    const handleTransfer = (account: Account) => {
        setTxnInitialData({
            type: 'transfer',
            source_account_id: account.id,
            occurred_at: new Date(),
        });
        setIsTxnSlideOpen(true);
    };

    const handleAudit = (account: Account) => {
        setAuditAccount(account);
        setIsAuditOpen(true);
    };

    const handleOpenPending = async (account: Account) => {
        try {
            const res = await fetch(`/api/batch/pending-items?accountId=${encodeURIComponent(account.id)}`, {
                method: 'GET',
                cache: 'no-store',
            })

            if (!res.ok) {
                toast.error('Unable to load pending items')
                return
            }

            const rows = await res.json()
            setPendingModalItems(Array.isArray(rows) ? rows : [])
            setPendingModalAccountId(account.id)
            setPendingModalAccountName(account.name || '')
            setPendingModalOpen(true)
        } catch {
            toast.error('Unable to load pending items')
        }
    }

    const handleCategoryChange = (categoryId: string | undefined) => {
        setSelectedCategory(categoryId || null);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50/50">
            <AccountHeaderV2
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter as any} // Cast to any to bypass strict check if header types aren't perfectly synced yet, but we updated header props
                onFilterChange={setActiveFilter as any}
                onAdd={handleAddAccount}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                activeCount={activeCount}
                debtCount={debtCount}
                closedCount={closedCount}
                systemCount={systemCount}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                advancedFilters={advancedFilters}
                onAdvancedFiltersChange={setAdvancedFilters}
                othersStats={othersStats}
                onOpenSyncBalanceAudit={() => setIsSyncBalanceAuditOpen(true)}
            />

            <AccountQuickStats
                accounts={initialAccounts}
                lastTxnAccountId={lastTxnAccountId || undefined}
                pendingSummaryMap={pendingSummaryMap}
            />

            <div className="flex-1 overflow-auto px-6 py-4 scrollbar-hide">
                {viewMode === 'table' ? (
                    <AccountTableV2
                        accounts={filteredAccounts}
                        onEdit={handleEditAccount}
                        onClone={handleCloneAccount}
                        onLend={handleLend}
                        onRepay={handleRepay}
                        onPay={handlePay}
                        onTransfer={handleTransfer}
                        onAudit={handleAudit}
                        onOpenPending={handleOpenPending}
                        allAccounts={initialAccounts}
                        categories={categories}
                        people={people}
                        pendingSummaryMap={pendingSummaryMap}
                    />
                ) : (
                    <AccountGridView
                        accounts={filteredAccounts}
                        onEdit={handleEditAccount}
                        onClone={handleCloneAccount}
                        onDelete={handleDeleteClick}
                    />
                )}
            </div>

            {/* Account CRUD Slide */}
            <AccountSlideV2
                open={isAccountSlideOpen}
                onOpenChange={setIsAccountSlideOpen}
                account={selectedAccount}
                isClone={isCloneMode}
                allAccounts={initialAccounts}
                categories={categories}
                existingAccountNumbers={Array.from(new Set(initialAccounts.map(a => a.account_number).filter(Boolean))) as string[]}
                existingReceiverNames={Array.from(new Set(initialAccounts.map(a => a.receiver_name).filter(Boolean))) as string[]}
                onEditAccount={handleEditAccount}
                onBack={editStack.length > 0 ? handleBack : undefined}
            />

            {/* Transaction Quick Action Slide */}
            <TransactionSlideV2
                open={isTxnSlideOpen}
                onOpenChange={setIsTxnSlideOpen}
                initialData={txnInitialData}
                accounts={initialAccounts}
                categories={categories}
                people={people}
                shops={shops}
                onSuccess={() => {
                    setIsTxnSlideOpen(false);
                    router.refresh(); // Refresh account list/stats
                }}
            />

            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-black text-rose-600">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 font-medium">
                            This action cannot be undone. This will permanently delete the account and all associated transaction records.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="font-bold">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-wider"
                        >
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {auditAccount && (
                <AccountAuditDialog 
                    open={isAuditOpen} 
                    onOpenChange={setIsAuditOpen} 
                    account={{ id: auditAccount.id, name: auditAccount.name }}
                    availableYears={['2025', '2026']}
                />
            )}

            {pendingModalAccountId && (
                <AccountPendingItemsModal
                    open={pendingModalOpen}
                    onOpenChange={setPendingModalOpen}
                    accountId={pendingModalAccountId}
                    accountName={pendingModalAccountName}
                    pendingItems={pendingModalItems}
                    onSuccess={async () => {
                        const res = await fetch('/api/batch/pending-summary', {
                            method: 'GET',
                            cache: 'no-store',
                        })
                        if (!res.ok) return
                        const rows = await res.json()
                        if (!Array.isArray(rows)) return

                        const nextMap: Record<string, { count: number; totalAmount: number; accountName?: string | null }> = {}
                        for (const row of rows) {
                            const accountId = String(row?.accountId || '').trim()
                            if (!accountId) continue
                            nextMap[accountId] = {
                                count: Number(row?.count || 0),
                                totalAmount: Number(row?.totalAmount || 0),
                                accountName: row?.accountName || null,
                            }
                        }
                        setPendingSummaryMap(nextMap)
                        router.refresh()
                    }}
                />
            )}

            <Dialog open={isSyncBalanceAuditOpen} onOpenChange={setIsSyncBalanceAuditOpen}>
                <DialogContent className="max-w-5xl">
                    <DialogHeader>
                        <DialogTitle>Sync Balance Audit</DialogTitle>
                        <DialogDescription>
                            Select accounts to recalculate balances. Family-linked cards are recalculated together (parent + children).
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={syncSearch}
                                    onChange={(e) => setSyncSearch(e.target.value)}
                                    placeholder="Search accounts (excluding receivable/debt)..."
                                    className="pl-8"
                                />
                            </div>
                            <Button variant="outline" onClick={toggleSelectAllVisible}>
                                {allVisibleSelected ? 'Unselect All' : 'Select All'}
                            </Button>
                        </div>

                        <div className="max-h-[320px] overflow-auto rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-white border-b">
                                    <tr>
                                        <th className="px-3 py-2 text-left w-12">Sel</th>
                                        <th className="px-3 py-2 text-left">Account</th>
                                        <th className="px-3 py-2 text-left">Type</th>
                                        <th className="px-3 py-2 text-right">Before</th>
                                        <th className="px-3 py-2 text-right">After</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syncCandidates.map((acc) => {
                                        const before = Number(acc.current_balance || 0)
                                        const after = afterBalanceMap[acc.id]
                                        return (
                                            <tr key={acc.id} className="border-b last:border-0">
                                                <td className="px-3 py-2">
                                                    <Checkbox
                                                        checked={syncSelectedIds.includes(acc.id)}
                                                        onCheckedChange={() => toggleSelectOne(acc.id)}
                                                        disabled={isSyncRunning}
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="font-semibold">{acc.name}</div>
                                                    <div className="text-xs text-slate-500">{acc.id}</div>
                                                </td>
                                                <td className="px-3 py-2 uppercase text-xs text-slate-600">{acc.type}</td>
                                                <td className="px-3 py-2 text-right tabular-nums">{before.toLocaleString('vi-VN')}</td>
                                                <td className="px-3 py-2 text-right tabular-nums">{typeof after === 'number' ? after.toLocaleString('vi-VN') : '—'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-600">
                                <span>Progress</span>
                                <span>{syncProgress}%</span>
                            </div>
                            <Progress value={syncProgress} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">Logs</h4>
                                <Button variant="outline" size="sm" onClick={handleCopySyncLogs}>
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy Logs
                                </Button>
                            </div>
                            <div className="max-h-[180px] overflow-auto rounded-md border bg-slate-50 p-2 text-xs whitespace-pre-wrap font-mono">
                                {syncLogs.length > 0 ? syncLogs.join('\n') : 'No logs yet'}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSyncBalanceAuditOpen(false)} disabled={isSyncRunning}>
                            Close
                        </Button>
                        <Button onClick={runSyncBalanceAudit} disabled={isSyncRunning || syncSelectedIds.length === 0}>
                            {isSyncRunning ? 'Running...' : 'Run Sync Balance'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
