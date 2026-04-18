'use client'

import { useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from 'react'
import { TransactionWithDetails, Account, Category, Person, Shop } from '@/types/moneyflow.types'
import { UnifiedTransactionTable, UnifiedTransactionTableRef } from '../moneyflow/unified-transaction-table'
import { FilterType } from './TransactionToolbar'
import { DateRange } from 'react-day-picker'
import { startOfMonth, endOfMonth, isWithinInterval, parseISO, isSameDay, isSameMonth } from 'date-fns'
import { TransactionSlideV2 } from '@/components/transaction/slide-v2/transaction-slide-v2'
import { UnsavedChangesWarning } from '@/components/transaction/unsaved-changes-warning'
import { ConfirmRefundDialogV2 } from '@/components/moneyflow/confirm-refund-dialog-v2'
import { voidTransactionAction } from '@/actions/transaction-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TransactionHeader } from '@/components/transactions-v2/header/TransactionHeader'
import { formatCycleTag } from '@/lib/cycle-utils'
import { isYYYYMM, normalizeMonthTag } from '@/lib/month-tag'
import { emitTransactionSync } from '@/lib/transaction-realtime-sync'
import { AccountPendingItemsModal } from '@/components/accounts/v2/AccountPendingItemsModal'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ChevronDown, ChevronUp, Loader2, RotateCcw } from 'lucide-react'
import { CustomTooltip } from '@/components/ui/custom-tooltip'

interface UnifiedTransactionsPageProps {
    transactions: TransactionWithDetails[]
    accounts: Account[]
    categories: Category[]
    people: Person[]
    shops: Shop[]
}

type StatusToggles = {
    active: boolean
    void: boolean
}

type PendingBatchSummary = {
    accountId: string
    accountName: string | null
    count: number
    totalAmount: number
}

type QueueCardItem = {
    id: string
    title: string
    subtitle: string
    amount: number
    badge: string
    imageUrl?: string | null
    onClick: () => void
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

function resolveCycleTagByStatementDay(date: Date, statementDay?: number | null): string {
    const day = Number(statementDay || 0)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (day > 0 && date.getDate() > day) {
        month += 1
        if (month > 12) {
            month = 1
            year += 1
        }
    }
    return `${year}-${String(month).padStart(2, '0')}`
}

function resolveTransactionCycleTagForAccount(transaction: TransactionWithDetails, statementDay?: number | null): string {
    const persisted = normalizeMonthTag(transaction.persisted_cycle_tag || transaction.account_billing_cycle || '')
    if (persisted) return persisted

    const derived = normalizeMonthTag(transaction.derived_cycle_tag || '')
    if (derived) return derived

    if ((statementDay || 0) > 0) {
        const parsed = parseISO(transaction.occurred_at || transaction.created_at || '')
        if (!Number.isNaN(parsed.getTime())) {
            return resolveCycleTagByStatementDay(parsed, statementDay)
        }
    }

    return normalizeMonthTag(transaction.tag || '') || ''
}

function resolveAccountStatementDay(account?: Account): number | null {
    const raw = account?.statement_day ?? account?.credit_card_info?.statement_day
    const day = Number(raw || 0)
    return day > 0 ? day : null
}

function transactionMatchesAccount(transaction: TransactionWithDetails, accountId?: string): boolean {
    if (!accountId) return true
    return (
        transaction.account_id === accountId ||
        transaction.source_account_id === accountId ||
        transaction.target_account_id === accountId ||
        (transaction as any).to_account_id === accountId
    )
}

function getTransactionAccountIds(transaction: TransactionWithDetails): string[] {
    const ids = [
        transaction.account_id,
        transaction.source_account_id,
        transaction.target_account_id,
        (transaction as any).to_account_id,
    ].filter((value): value is string => Boolean(value))
    return Array.from(new Set(ids))
}

function getCycleTagForSelection(transaction: TransactionWithDetails, statementDay?: number | null): string {
    const normalizedPersisted = normalizeMonthTag(transaction.persisted_cycle_tag || transaction.account_billing_cycle || undefined)
    if (normalizedPersisted && isYYYYMM(normalizedPersisted)) return normalizedPersisted

    const normalizedDerived = normalizeMonthTag(transaction.derived_cycle_tag || undefined)
    if (normalizedDerived && isYYYYMM(normalizedDerived)) return normalizedDerived

    const fallback = resolveTransactionCycleTagForAccount(transaction, statementDay)
    return isYYYYMM(fallback) ? fallback : ''
}

export function UnifiedTransactionsPage({
    transactions,
    accounts,
    categories,
    people,
    shops
}: UnifiedTransactionsPageProps) {
    const router = useRouter()
    const tableRef = useRef<UnifiedTransactionTableRef>(null)
    const [isPending, startTransition] = useTransition()

    // Toolbar State
    const [search, setSearch] = useState('')
    const [filterType, setFilterType] = useState<FilterType>('all')
    const [statusFilter, setStatusFilter] = useState<StatusToggles>({
        active: true,
        void: false,
    })

    const [date, setDate] = useState<Date>(new Date())
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
    const [dateMode, setDateMode] = useState<'month' | 'range' | 'date' | 'all' | 'year' | 'cycle'>('year')

    const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>()
    const [selectedPersonId, setSelectedPersonId] = useState<string | undefined>()
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>()
    const [selectedCycle, setSelectedCycle] = useState<string | undefined>()
    const [disabledRange, setDisabledRange] = useState<{ start: Date; end: Date } | undefined>(undefined)

    const [expandedQueues, setExpandedQueues] = useState({
        refund: false,
        batch: false,
    })
    const [queuesCollapsed, setQueuesCollapsed] = useState(false)
    const [pendingBatchSummary, setPendingBatchSummary] = useState<PendingBatchSummary[]>([])
    const [highlightedRefundTxnIds, setHighlightedRefundTxnIds] = useState<Set<string>>(new Set())
    const [pendingBatchModalOpen, setPendingBatchModalOpen] = useState(false)
    const [pendingBatchModalAccountId, setPendingBatchModalAccountId] = useState<string>('')
    const [pendingBatchModalAccountName, setPendingBatchModalAccountName] = useState<string>('')
    const [pendingBatchModalItems, setPendingBatchModalItems] = useState<PendingBatchItem[]>([])
    const [statusSwitchLoading, setStatusSwitchLoading] = useState(false)
    const [statusSwitchTarget, setStatusSwitchTarget] = useState<'active' | 'void'>('active')
    const [fetchedCycles, setFetchedCycles] = useState<Array<{ label: string; value: string; count?: number; highlight?: boolean }>>([])
    const [isCyclesLoading, setIsCyclesLoading] = useState(false)

    const isManualDateChange = useRef(false)
    const prevAccountIdRef = useRef<string | undefined>(undefined)
    const selectionOrderRef = useRef<'range' | 'account' | undefined>(undefined)

    // Transaction Slide V2 States
    const [isSlideOpen, setIsSlideOpen] = useState(false)
    const [slideMode, setSlideMode] = useState<'add' | 'edit' | 'duplicate'>('add')
    const [selectedTxn, setSelectedTxn] = useState<TransactionWithDetails | null>(null)
    const [slideOverrideType, setSlideOverrideType] = useState<string | undefined>(undefined)
    const [slideOverrideData, setSlideOverrideData] = useState<any>(null)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)
    const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())
    const [isGlobalLoading, setIsGlobalLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('Updating...')

    const handleSlideSubmissionStart = () => {
        setIsSlideOpen(false) // Close immediately
        setLoadingMessage(
            slideMode === 'edit' ? 'Updating transaction...' :
                slideMode === 'duplicate' ? 'Duplicating transaction...' :
                    'Creating transaction...'
        )
        setIsGlobalLoading(true) // Show loading
    }

    const handleSlideSubmissionEnd = () => {
        setIsGlobalLoading(false)
    }

    // Clear loading IDs when transaction data updates
    useMemo(() => {
        setLoadingIds(new Set())
    }, [transactions])

    // Other Dialog States
    const [refundTxn, setRefundTxn] = useState<TransactionWithDetails | null>(null)
    const [isRefundOpen, setIsRefundOpen] = useState(false)

    const [voidTxn, setVoidTxn] = useState<TransactionWithDetails | null>(null)
    const [isVoidAlertOpen, setIsVoidAlertOpen] = useState(false)

    const availableMonths = useMemo(() => {
        const months = new Set<string>()
        transactions.forEach(t => {
            const d = parseISO(t.occurred_at)
            const key = `${d.getFullYear()}-${d.getMonth()}`
            months.add(key)
        })
        return months
    }, [transactions])

    const cycleOptions = useMemo(() => {
        if (!selectedAccountId) return []

        const selectedAccount = accounts.find(account => account.id === selectedAccountId)

        const relevantTxns = transactions.filter((t) => transactionMatchesAccount(t, selectedAccountId))

        const statementDay = resolveAccountStatementDay(selectedAccount)
        const cycleCountByTag = relevantTxns.reduce<Record<string, number>>((acc, txn) => {
            const tag = getCycleTagForSelection(txn, statementDay)
            if (!tag) return acc
            acc[tag] = (acc[tag] || 0) + 1
            return acc
        }, {})

        const currentCycleTag = statementDay
            ? resolveCycleTagByStatementDay(new Date(), statementDay)
            : undefined

        // Build transaction-derived cycles (always available as fallback)
        const txnTags = new Set<string>()
        relevantTxns.forEach(t => {
            const normalized = getCycleTagForSelection(t, statementDay)
            if (normalized) txnTags.add(normalized)
        })
        const txnDerivedCycles = Array.from(txnTags)
            .sort((a, b) => b.localeCompare(a))
            .map(tag => ({
                value: tag,
                label: formatCycleTag(tag, statementDay || 25) || tag,
                count: cycleCountByTag[tag] || 0,
                highlight: tag === currentCycleTag,
            }))

        // Use API-fetched cycles when available; otherwise fall back to derived cycles.
        const base = fetchedCycles.length > 0 ? fetchedCycles : txnDerivedCycles
        if (selectedCycle === 'custom') base.unshift({ value: 'custom', label: 'Custom' })
        return base
    }, [transactions, selectedAccountId, selectedCycle, accounts, fetchedCycles])

    useEffect(() => {
        if (!selectedAccountId) {
            setFetchedCycles([])
            setIsCyclesLoading(false)
            return
        }

        const selectedAccount = accounts.find(account => account.id === selectedAccountId)

        const relevantTxns = transactions.filter((t) => transactionMatchesAccount(t, selectedAccountId))
        const statementDay = resolveAccountStatementDay(selectedAccount)
        const cycleCountByTag = relevantTxns.reduce<Record<string, number>>((acc, txn) => {
            const tag = getCycleTagForSelection(txn, statementDay)
            if (!tag) return acc
            acc[tag] = (acc[tag] || 0) + 1
            return acc
        }, {})

        setIsCyclesLoading(true)
        fetch(`/api/cashback/cycle-options?accountId=${encodeURIComponent(selectedAccountId)}&t=${Date.now()}`, {
            method: 'GET',
            cache: 'no-store',
        })
            .then((res) => (res.ok ? res.json() : { options: [] }))
            .then((payload) => {
                const options = Array.isArray(payload?.options) ? payload.options : []
                const mapped = options.map((opt: any) => ({
                    label: formatCycleTag(opt.tag, statementDay || 25),
                    value: opt.tag,
                    count: cycleCountByTag[opt.tag] || 0,
                    highlight: statementDay
                        ? opt.tag === resolveCycleTagByStatementDay(new Date(), statementDay)
                        : options.length > 0 && opt.tag === options[0].tag,
                }))
                setFetchedCycles(mapped)
                setIsCyclesLoading(false)
            })
            .catch(() => {
                setFetchedCycles([])
                setIsCyclesLoading(false)
            })
    }, [selectedAccountId, accounts, transactions])

    useEffect(() => {
        if (!selectedAccountId) {
            setSelectedCycle(undefined)
            if (dateMode === 'cycle') setDateMode('all')
            return
        }

        if (dateMode !== 'cycle') setDateMode('cycle')

        const hasValidCurrent = !selectedCycle || cycleOptions.some((option) => option.value === selectedCycle)
        if (hasValidCurrent) return

        const highlighted = cycleOptions.find((option) => option.highlight && option.value !== 'all')
        setSelectedCycle(highlighted?.value)
    }, [selectedAccountId, cycleOptions, selectedCycle, dateMode])

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);
        const draftParam = urlParams.get('draft');

        if (draftParam) {
            try {
                const parsedDraft = JSON.parse(decodeURIComponent(draftParam));
                console.log("🔗 Deep Link Draft detected:", parsedDraft);

                // Set up slide
                setSlideMode('add');
                setDuplicateData({
                    type: parsedDraft.type || parsedDraft.intent || 'expense',
                    occurred_at: parsedDraft.occurred_at ? new Date(parsedDraft.occurred_at) : new Date(),
                    amount: Math.round(parsedDraft.amount || 0),
                    note: parsedDraft.note || '',
                    source_account_id: ['income', 'repayment'].includes(parsedDraft.type || parsedDraft.intent) ? undefined : (parsedDraft.source_account_id || (accounts[0]?.id || '')),
                    target_account_id: ['income', 'repayment'].includes(parsedDraft.type || parsedDraft.intent) ? (parsedDraft.source_account_id || (accounts[0]?.id || '')) : (parsedDraft.destination_account_id || undefined),
                    category_id: parsedDraft.category_id || undefined,
                    shop_id: parsedDraft.shop_id || undefined,
                    person_id: (parsedDraft.person_ids && parsedDraft.person_ids.length > 0) ? parsedDraft.person_ids[0] : undefined,
                    cashback_mode: parsedDraft.cashback_mode || 'none_back',
                    cashback_share_percent: parsedDraft.cashback_share_percent,
                    cashback_share_fixed: parsedDraft.cashback_share_fixed,
                });
                setIsSlideOpen(true);

                // Clear the param from URL without refreshing
                const newUrl = window.location.pathname;
                window.history.replaceState({}, '', newUrl);
            } catch (e) {
                console.error("❌ Failed to parse deep link draft:", e);
            }
        }

        // Handle highlight search
        const highlightId = urlParams.get('highlight');
        if (highlightId && highlightId !== 'undefined') {
            setSearch(highlightId);
            // Switch to All Time to ensure the transaction is visible
            setDateMode('all');

            // Clear the param to avoid re-triggering on manual reset
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, [accounts]);

    useEffect(() => {
        if (selectedCycle && !cycleOptions.some(o => o.value === selectedCycle)) {
            setSelectedCycle(undefined)
        }
    }, [cycleOptions, selectedCycle])

    useEffect(() => {
        if (selectedCycle === 'custom') {
            setDisabledRange(undefined)
            return
        }

        if (!selectedCycle) {
            setDisabledRange(undefined)
            return
        }

        const [yearStr, monthStr] = selectedCycle.split('-')
        const year = Number(yearStr)
        const month = Number(monthStr)
        if (!Number.isFinite(year) || !Number.isFinite(month)) {
            setDisabledRange(undefined)
            return
        }

        const selectedAccount = accounts.find(account => account.id === selectedAccountId)
        const statementDay = Number(selectedAccount?.statement_day || 0)

        let cycleStart: Date
        let cycleEnd: Date
        if (statementDay > 0) {
            cycleStart = new Date(year, month - 2, statementDay)
            cycleEnd = new Date(year, month - 1, statementDay - 1)
        } else {
            cycleStart = new Date(year, month - 1, 1)
            cycleEnd = new Date(year, month, 0)
        }

        setDisabledRange({ start: cycleStart, end: cycleEnd })

        if (!isManualDateChange.current && selectionOrderRef.current !== 'range' && dateMode !== 'range') {
            setDateMode('range')
            setDateRange({ from: cycleStart, to: cycleEnd })
        }
        isManualDateChange.current = false
    }, [selectedCycle, dateMode, accounts, selectedAccountId])

    useEffect(() => {
        if (prevAccountIdRef.current !== selectedAccountId) {
            setSelectedCycle(undefined)
            setDisabledRange(undefined)
            selectionOrderRef.current = undefined
        }
        prevAccountIdRef.current = selectedAccountId
    }, [selectedAccountId])

    const handleReset = () => {
        startTransition(() => {
            setHighlightedRefundTxnIds(new Set())
            setSearch('')
            setFilterType('all')
            setStatusFilter({ active: true, void: false })
            setSelectedAccountId(undefined)
            setSelectedPersonId(undefined)
            setSelectedCategoryId(undefined)
            setSelectedCycle(undefined)
            setDate(new Date())
            setDateMode('all') // Reset to All Time
            setDateRange(undefined)
            setDisabledRange(undefined)
            selectionOrderRef.current = undefined
        })
    }

    const handleDateChange = (newDate: Date) => {
        isManualDateChange.current = true
        startTransition(() => {
            setDate(newDate)
            if (dateMode !== 'range') {
                setDateRange(undefined)
            }
        })
    }

    const handleRangeChange = (range: DateRange | undefined) => {
        isManualDateChange.current = true
        startTransition(() => {
            setDateRange(range)
            if (range) {
                setSelectedCycle(undefined)
            }
            if (range?.from && range?.to && !selectedAccountId) {
                selectionOrderRef.current = 'range'
            }
        })
    }

    const handleModeChange = (mode: 'month' | 'range' | 'date' | 'all' | 'year' | 'cycle') => {
        startTransition(() => {
            setDateMode(mode)
            if (mode === 'all') {
                setDateRange(undefined)
                setSelectedCycle(undefined)
            } else if (mode === 'year') {
                setDateRange(undefined)
                setSelectedCycle(undefined)
            } else if (mode !== 'range') {
                setDateRange(undefined)
            } else {
                setSelectedCycle(undefined)
            }
        })
    }

    const prevSearchRef = useRef(search)
    // Auto-switch to All Time when searching starts
    useEffect(() => {
        if (search && !prevSearchRef.current) {
            setDateMode('all')
            setDateRange(undefined)
            setSelectedCycle(undefined)
        }
        prevSearchRef.current = search
    }, [search])

    const handleCycleChange = (cycle?: string) => {
        startTransition(() => {
            setSelectedCycle(cycle === 'all' ? undefined : cycle)
        })
    }

    const handleSetSearch = (val: string) => {
        // Search updating state can be immediate for responsiveness, 
        // but the filtering useMemo will respond to the pending state if we want.
        // For search, usually it's better to stay responsive, but the user wants a spinner.
        startTransition(() => {
            setHighlightedRefundTxnIds(new Set())
            setSearch(val)
        })
    }

    const handleSetFilterType = (val: FilterType) => {
        startTransition(() => {
            setFilterType(val)
        })
    }

    const handleSetStatusFilter = (val: StatusToggles) => {
        const target: 'active' | 'void' = val.void && !val.active ? 'void' : 'active'
        setStatusSwitchTarget(target)
        setStatusSwitchLoading(true)
        startTransition(() => {
            setStatusFilter(val)
        })
    }

    useEffect(() => {
        if (isPending) return
        if (!statusSwitchLoading) return
        const timer = setTimeout(() => setStatusSwitchLoading(false), 220)
        return () => clearTimeout(timer)
    }, [isPending, statusSwitchLoading])

    const handleSetAccountId = (val?: string) => {
        startTransition(() => {
            setSelectedAccountId(val)
        })
    }

    const handleSetPersonId = (val?: string) => {
        startTransition(() => {
            setSelectedPersonId(val)
        })
    }

    const handleSetCategoryId = (val?: string) => {
        startTransition(() => {
            setSelectedCategoryId(val)
        })
    }

    const hasActiveFilters =
        search !== '' ||
        filterType !== 'all' ||
        !!selectedAccountId ||
        !!selectedPersonId ||
        !!selectedCategoryId ||
        !!selectedCycle ||
        (dateMode === 'month' ? !isSameMonth(date, new Date()) : false) ||
        (dateMode === 'year' ? date.getFullYear() !== new Date().getFullYear() : false) ||
        (dateMode === 'date') ||
        (dateMode === 'range' && !!dateRange)

    // Calculate available date range from filtered transactions (Context only: Account/Person)
    // We ignore Search, Type, and Status filters to avoid locking the calendar too tightly
    const availableDateRange = useMemo(() => {
        const preFiltered = transactions.filter(t => {
            // Account Context
            if (selectedAccountId) {
                if (!transactionMatchesAccount(t, selectedAccountId)) return false
            }

            // Person Context
            if (selectedPersonId) {
                if (t.person_id !== selectedPersonId) return false
            }

            // Category Context
            if (selectedCategoryId) {
                if (t.category_id !== selectedCategoryId) return false
            }

            return true
        })

        if (preFiltered.length === 0) return undefined

        const dates = preFiltered.map(t => parseISO(t.occurred_at))
        const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))

        return { from: minDate, to: maxDate }
    }, [transactions, selectedAccountId, selectedPersonId])

    const handleClearFilters = () => {
        startTransition(() => {
            setFilterType('all')
            setStatusFilter({ active: true, void: false })
            setSelectedAccountId(undefined)
            setSelectedPersonId(undefined)
            setSelectedCategoryId(undefined)
            setSelectedCycle(undefined)
            setDate(new Date())
            setDateMode('all')
            setDateRange(undefined)
            setDisabledRange(undefined)
            selectionOrderRef.current = undefined
        })
    }

    // Auto-set date range when Filter button clicked
    useEffect(() => {
        if (hasActiveFilters && availableDateRange && dateMode === 'range' && !dateRange && !selectedCycle) {
            setDateRange(availableDateRange)
        }
    }, [hasActiveFilters, availableDateRange, dateMode, dateRange, selectedCycle])

    // Filter Logic
    const alwaysVisibleRefundTxnIds = useMemo(() => {
        const ids = new Set<string>()

        transactions.forEach((txn) => {
            const metadata =
                typeof txn.metadata === 'string'
                    ? (() => {
                        try {
                            return JSON.parse(txn.metadata)
                        } catch {
                            return {}
                        }
                    })()
                    : (txn.metadata || {})

            const stageTag = String((metadata as any)?.refund_stage_tag || '').toUpperCase()
            const refundStatus = String((metadata as any)?.refund_status || '').toLowerCase()
            const isGD2Pending =
                stageTag === 'GD2' &&
                !Boolean((metadata as any)?.is_refund_confirmation) &&
                !['confirmed', 'completed', 'refunded', 'request_voided', 'void'].includes(refundStatus) &&
                txn.status !== 'void'

            if (!isGD2Pending) return

            ids.add(txn.id)
            const originalId = String((metadata as any)?.original_transaction_id || '').trim()
            if (originalId) ids.add(originalId)
        })

        return ids
    }, [transactions])

    const filteredTransactions = useMemo(() => {
        const lowerSearch = search.toLowerCase()
        const matchedAccountIds = search ? accounts.filter(a => a.name.toLowerCase().includes(lowerSearch)).map(a => a.id) : []
        const matchedPersonIds = search ? people.filter(p => p.name.toLowerCase().includes(lowerSearch)).map(p => p.id) : []

        return transactions.filter(t => {
            const forceVisibleRefundPair = alwaysVisibleRefundTxnIds.has(t.id)
            // 0. Status Filter
            const hasStatusSelection = statusFilter.active || statusFilter.void
            if (hasStatusSelection) {
                const isVoidTxn = t.status === 'void'
                if (isVoidTxn && !statusFilter.void) return false
                if (!isVoidTxn && !statusFilter.active) return false
            }

            if (forceVisibleRefundPair) return true

            // 1. Date Filter
            const tDate = parseISO(t.occurred_at)
            if (dateMode === 'month') {
                const start = startOfMonth(date)
                const end = endOfMonth(date)
                if (!isWithinInterval(tDate, { start, end })) return false
            } else if (dateMode === 'year') {
                if (tDate.getFullYear() !== date.getFullYear()) return false
            } else if (dateMode === 'date') {
                if (!isSameDay(tDate, date)) return false
            } else if (dateMode === 'range' && dateRange?.from) {
                const start = dateRange.from
                const end = dateRange.to || dateRange.from
                if (tDate < start || (end && tDate > end)) return false
            }

            // 2. Account Filter
            if (selectedAccountId) {
                if (!transactionMatchesAccount(t, selectedAccountId)) return false
            }

            if (selectedCycle && selectedAccountId && selectedCycle !== 'all') {
                const selectedAccount = accounts.find(account => account.id === selectedAccountId)
                const txCycle = resolveTransactionCycleTagForAccount(t, resolveAccountStatementDay(selectedAccount))
                if (txCycle !== selectedCycle) return false
            }

            // 3. Person Filter
            if (selectedPersonId) {
                if (t.person_id !== selectedPersonId) return false
            }

            // 4. Category Filter
            if (selectedCategoryId) {
                if (t.category_id !== selectedCategoryId) return false
            }

            // 5. Search
            if (search) {
                const metadataMatch = (() => {
                    try {
                        const m = (typeof t.metadata === 'string' ? JSON.parse(t.metadata) : t.metadata) as any;
                        const linkedIds = [
                            m?.duplicated_from_id,
                            m?.original_transaction_id,
                            m?.refund_request_id,
                            m?.refund_confirmation_id,
                            m?.confirmation_transaction_id,
                        ]
                            .filter((value): value is string => typeof value === 'string' && value.length > 0)
                            .map(value => value.toLowerCase());
                        return linkedIds.some(value => value.includes(lowerSearch));
                    } catch {
                        return false;
                    }
                })();

                const match =
                    t.note?.toLowerCase().includes(lowerSearch) ||
                    t.shop_name?.toLowerCase().includes(lowerSearch) ||
                    t.category_name?.toLowerCase().includes(lowerSearch) ||
                    String(t.amount).includes(lowerSearch) ||
                    t.id.toLowerCase().includes(lowerSearch) ||
                    metadataMatch ||
                    getTransactionAccountIds(t).some((accId) => matchedAccountIds.includes(accId)) ||
                    (t.person_id && matchedPersonIds.includes(t.person_id))

                if (!match) return false
            }
            // ... rest matches

            // 5. Type Filter
            if (filterType === 'all') return true

            if (filterType === 'income') return t.type === 'income'
            if (filterType === 'expense') return t.type === 'expense'
            if (filterType === 'transfer') return t.type === 'transfer'

            // Debt specific
            if (filterType === 'lend') {
                const amount = Number(t.amount) || 0
                const isDebt = t.type === 'debt'
                return (isDebt && amount < 0) || (t.type === 'expense' && !!t.person_id)
            }

            if (filterType === 'repay') {
                const amount = Number(t.amount) || 0
                const isDebt = t.type === 'debt'
                return (isDebt && amount > 0) || t.type === 'repayment' || (t.type === 'income' && !!t.person_id)
            }

            if (filterType === 'cashback') {
                return (t.cashback_share_percent && t.cashback_share_percent > 0) || (t.cashback_share_amount && t.cashback_share_amount > 0)
            }

            return true
        })
    }, [
        transactions, search, filterType, statusFilter,
        date, dateRange, dateMode,
        selectedAccountId, selectedPersonId, selectedCategoryId, selectedCycle,
        alwaysVisibleRefundTxnIds
    ])

    const refundQueueTransactions = useMemo(() => {
        return transactions.filter((txn) => {
            if (txn.status === 'void') return false
            const metadata =
                typeof txn.metadata === 'string'
                    ? (() => {
                        try {
                            return JSON.parse(txn.metadata)
                        } catch {
                            return {}
                        }
                    })()
                    : (txn.metadata || {})

            const stageTag = String((metadata as any)?.refund_stage_tag || '')
            const note = String(txn.note || '')
            const refundStatus = String((metadata as any)?.refund_status || '').toLowerCase()
            const isConfirmed =
                Boolean((metadata as any)?.is_refund_confirmation) ||
                ['confirmed', 'completed', 'refunded'].includes(refundStatus) ||
                txn.status === 'refunded'
            if (isConfirmed) return false

            return stageTag.toUpperCase() === 'GD2' || note.toUpperCase().startsWith('[GD2|')
        })
    }, [transactions])

    const loadPendingBatchSummary = async () => {
        try {
            const response = await fetch('/api/batch/pending-summary', { cache: 'no-store' })
            if (!response.ok) {
                setPendingBatchSummary([])
                return
            }
            const data = await response.json()
            if (!Array.isArray(data)) {
                setPendingBatchSummary([])
                return
            }

            const normalized = data
                .map((item) => ({
                    accountId: String(item?.accountId || ''),
                    accountName: typeof item?.accountName === 'string' ? item.accountName : null,
                    count: Number(item?.count || 0),
                    totalAmount: Number(item?.totalAmount || 0),
                }))
                .filter((item) => item.accountId && item.count > 0)

            setPendingBatchSummary(normalized)
        } catch {
            setPendingBatchSummary([])
        }
    }

    useEffect(() => {
        void loadPendingBatchSummary()
    }, [transactions])

    const getTxnAccounts = (txn: TransactionWithDetails) => {
        const candidates = [
            txn.source_account_id,
            txn.target_account_id,
            txn.account_id,
            (txn as any).to_account_id,
        ].filter((value): value is string => Boolean(value))

        const found = candidates
            .map((id) => accounts.find((account) => account.id === id))
            .find((account): account is Account => Boolean(account))

        return found ?? null
    }

    const getTxnShop = (txn: TransactionWithDetails) => {
        if (!txn.shop_id) return null
        return shops.find((shop) => shop.id === txn.shop_id) ?? null
    }

    const refundQueueItems = useMemo<QueueCardItem[]>(() => {
        return refundQueueTransactions.map((txn) => {
            const shop = getTxnShop(txn)
            const account = getTxnAccounts(txn)
            return {
                id: txn.id,
                title: txn.note || 'Pending refund',
                subtitle: account?.name || 'Waiting refund confirmation',
                amount: Math.abs(Number(txn.amount || 0)),
                badge: 'GD2',
                imageUrl: shop?.image_url || null,
                onClick: () => {
                    const nextHighlights = new Set<string>([txn.id])

                    setHighlightedRefundTxnIds(nextHighlights)
                    setSearch(txn.id)
                    setStatusFilter({ active: true, void: false })
                },
            }
        })
    }, [refundQueueTransactions, accounts, shops])

    const batchQueueItems = useMemo<QueueCardItem[]>(() => {
        return pendingBatchSummary.map((item) => {
            const account = accounts.find((row) => row.id === item.accountId)
            return {
                id: item.accountId,
                title: item.accountName || account?.name || 'Batch pending confirmation',
                subtitle: `${item.count} item(s) waiting confirm`,
                amount: Math.abs(item.totalAmount),
                badge: 'PENDING',
                imageUrl: account?.image_url || null,
                onClick: () => {
                    void (async () => {
                        try {
                            const response = await fetch(`/api/batch/pending-items?accountId=${encodeURIComponent(item.accountId)}`, { cache: 'no-store' })
                            if (!response.ok) {
                                throw new Error('Failed to load pending items')
                            }

                            const data = await response.json()
                            if (!Array.isArray(data) || data.length === 0) {
                                toast.info('No pending batch items left for this account')
                                await loadPendingBatchSummary()
                                return
                            }

                            const normalizedItems: PendingBatchItem[] = data
                                .map((row) => ({
                                    id: String(row?.id || ''),
                                    amount: Number(row?.amount || 0),
                                    batch_id: String(row?.batch_id || ''),
                                    month_year: row?.month_year || null,
                                    period: row?.period || null,
                                    phase_id: row?.phase_id || null,
                                    bank_type: row?.bank_type || null,
                                    batch: row?.batch || null,
                                }))
                                .filter((row) => row.id && row.batch_id)

                            if (normalizedItems.length === 0) {
                                toast.info('No valid pending items available')
                                await loadPendingBatchSummary()
                                return
                            }

                            setPendingBatchModalAccountId(item.accountId)
                            setPendingBatchModalAccountName(item.accountName || account?.name || 'Batch pending confirmation')
                            setPendingBatchModalItems(normalizedItems)
                            setPendingBatchModalOpen(true)
                        } catch (error) {
                            console.error('Failed to open pending items modal:', error)
                            toast.error('Cannot open Pending Items right now')
                        }
                    })()
                },
            }
        })
    }, [pendingBatchSummary, accounts])

    const renderQueueRow = (item: QueueCardItem, kind: 'refund' | 'batch', expanded: boolean) => {
        return (
            <CustomTooltip
                key={item.id}
                content={
                    <div className="max-w-[280px] text-xs">
                        <div className="font-semibold text-slate-200">{item.title}</div>
                        <div className="text-slate-400">{item.subtitle}</div>
                    </div>
                }
            >
                <button
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                        "inline-flex min-w-0 items-center gap-2 rounded-full border bg-white px-2 py-1 text-left shadow-sm transition",
                        expanded ? "w-full border-slate-300 hover:bg-slate-50" : "w-[260px] max-w-full border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                >
                    <div className="shrink-0">
                        {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" className="h-7 w-7 rounded-none border-none object-contain" />
                        ) : (
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full border border-white text-[9px] font-black ${kind === 'refund' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                {kind === 'refund' ? 'S' : 'B'}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className={cn("truncate text-xs font-semibold text-slate-900", !expanded && "whitespace-nowrap")}>{item.title}</div>
                        {expanded ? (
                            <div className="truncate text-[10px] text-slate-500 whitespace-nowrap">{item.subtitle}</div>
                        ) : null}
                    </div>
                    <div className="shrink-0 text-right">
                        <div className="text-[10px] font-bold text-slate-700">{item.amount.toLocaleString('vi-VN')}</div>
                        <div className="text-[9px] uppercase tracking-wide text-slate-400">{item.badge}</div>
                    </div>
                </button>
            </CustomTooltip>
        )
    }

    const renderQueueSection = (
        title: string,
        icon: ReactNode,
        items: QueueCardItem[],
        expanded: boolean,
        onToggle: () => void,
        kind: 'refund' | 'batch',
        accentClass: string,
        emptyHint: string,
    ) => {
        const showInline = expanded ? items.slice(0, 12) : items.slice(0, 4)
        const hasItems = items.length > 0

        return (
            <div className={cn(
                "mb-3 rounded-2xl border px-3 py-2 shadow-sm transition-colors",
                hasItems ? `bg-white/90 ${accentClass}` : "bg-slate-50 border-slate-200 opacity-80"
            )}>
                <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700">
                        {icon}
                        {title}
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                            {items.length}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onToggle}
                        disabled={!hasItems}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        {!hasItems ? (
                            <span>No items</span>
                        ) : expanded ? (
                            <>
                                <ChevronUp className="h-3 w-3" />
                                Collapse
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-3 w-3" />
                                Expand
                            </>
                        )}
                    </button>
                </div>
                {!hasItems ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
                        {emptyHint}
                    </div>
                ) : (
                    <div className={expanded ? 'flex flex-wrap gap-2' : 'flex flex-nowrap gap-2 overflow-hidden'}>
                        {showInline.map((item) => renderQueueRow(item, kind, expanded))}
                        {!expanded && items.length > showInline.length && (
                            <button
                                type="button"
                                onClick={onToggle}
                                className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-dashed border-slate-300 bg-slate-50 px-2 text-[10px] font-bold text-slate-500"
                            >
                                +{items.length - showInline.length}
                            </button>
                        )}
                    </div>
                )}
            </div>
        )
    }

    // Calculate available filter options based on current filtered view
    const { availableAccountIds, availablePersonIds, availableCategoryIds } = useMemo(() => {
        // If no active filters, we don't need to restrict options (optimization)
        if (!hasActiveFilters) return { availableAccountIds: undefined, availablePersonIds: undefined, availableCategoryIds: undefined }

        const accIds = new Set<string>()
        const personIds = new Set<string>()
        const catIds = new Set<string>()

        filteredTransactions.forEach(t => {
            getTransactionAccountIds(t).forEach((accId) => accIds.add(accId))
            if (t.person_id) personIds.add(t.person_id)
            if (t.category_id) catIds.add(t.category_id)
        })

        return {
            availableAccountIds: accIds,
            availablePersonIds: personIds,
            availableCategoryIds: catIds
        }
    }, [filteredTransactions, hasActiveFilters])

    // Selection State
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

    const handleSelect = (id: string) => {
        if (id === 'ALL_CLEAR') {
            setSelectedIds(new Set())
            return
        }
        const newSelected = new Set(selectedIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedIds(newSelected)
    }

    // Slide Handlers
    const handleAdd = () => {
        setSlideOverrideType(undefined)
        setSlideOverrideData(null)
        setSlideMode('add')
        setSelectedTxn(null)
        setIsSlideOpen(true)
    }

    const handleAddWithState = (type: string) => {
        if (type === 'invest') {
            const fundingGoldCategory = categories.find(c => c.name === 'Funding Gold' || c.name === 'Gold')
            setSlideOverrideType('transfer')
            setSlideOverrideData({ category_id: fundingGoldCategory?.id })
            setSlideMode('add')
            setSelectedTxn(null)
            setIsSlideOpen(true)
            return
        }

        setSlideOverrideType(type)
        setSlideOverrideData(null)
        setSlideMode('add')
        setSelectedTxn(null)
        setIsSlideOpen(true)
    }

    const handleAddFromHeader = (type?: string) => {
        if (type) {
            handleAddWithState(type)
            return
        }
        handleAdd()
    }

    const handleEdit = (t: TransactionWithDetails) => {
        setSlideOverrideType(undefined)
        setSlideMode('edit')
        setSelectedTxn(t)
        setIsSlideOpen(true)
    }

    const handleDuplicate = (input: string | TransactionWithDetails) => {
        const transactionId = typeof input === 'string' ? input : input.id;
        console.log("🛠 handleDuplicate called with:", transactionId);
        const t = typeof input === 'string'
            ? transactions.find((txn) => txn.id === input)
            : input;
        if (!t) {
            console.error("❌ Transaction not found in list for ID:", transactionId);
            return;
        }
        console.log("✅ Transaction found:", t);

        // Pre-compute duplication data
        const sourceAccountId = t.account_id || accounts[0]?.id || '';
        const newData = {
            type: t.type as any,
            occurred_at: new Date(), // Always            occurred_at: new Date(),
            amount: Math.round(Math.abs(Number(t.amount))),
            note: t.note || '',
            source_account_id: ['income', 'repayment'].includes(t.type) ? undefined : (t.account_id || accounts[0]?.id || ''),
            target_account_id: ['income', 'repayment'].includes(t.type) ? (t.account_id || undefined) : (t.to_account_id || undefined),
            category_id: t.category_id || undefined,
            shop_id: t.shop_id || undefined,
            person_id: t.person_id || undefined,
            tag: t.tag || undefined,
            cashback_mode: t.cashback_mode || "none_back",
            cashback_share_percent: t.cashback_share_percent,
            cashback_share_fixed: t.cashback_share_fixed,
            metadata: { duplicated_from_id: t.id },
            ui_is_cashback_expanded: false
        };

        setSlideOverrideType(undefined)
        setDuplicateData(newData); // Set computed data directly
        setSlideMode('duplicate')
        setSelectedTxn(t) // Still set this for reference
        setIsSlideOpen(true)
    }


    const handleSlideClose = (force = false) => {
        if (hasUnsavedChanges && !force) {
            setShowUnsavedWarning(true)
        } else {
            setIsSlideOpen(false)
            setHasUnsavedChanges(false)
            setSelectedTxn(null)
            setSlideOverrideType(undefined)
            setSlideOverrideData(null)
        }
    }

    const handleSlideOpenChange = (open: boolean) => {
        // When closing from Sheet (backdrop/outside click), force close
        if (!open) {
            handleSlideClose(true);
        }
    }

    const handleBackButtonClick = () => {
        // Back button always forces close (no warning)
        setIsSlideOpen(false)
        setHasUnsavedChanges(false)
        setSelectedTxn(null)
        setSlideOverrideType(undefined)
        setSlideOverrideData(null)
    }

    const confirmCloseSlide = () => {
        setShowUnsavedWarning(false)
        setIsSlideOpen(false)
        setHasUnsavedChanges(false)
        setSelectedTxn(null)
        setSlideOverrideType(undefined)
        setSlideOverrideData(null)
    }

    const handleSlideSuccess = (data?: any) => {
        setIsSlideOpen(false)
        setHasUnsavedChanges(false)
        setSelectedTxn(null)
        setSlideOverrideType(undefined)
        setSlideOverrideData(null)
        if (data?.id) {
            setLoadingIds(prev => new Set(prev).add(data.id))
        }
        // Save last submitted person for recent logic
        if (data?.person_id) {
            try {
                localStorage.setItem("mf_last_submitted_person_id", data.person_id);
            } catch (e) { console.error(e) }
        }
        if (data?.account_id) {
            try {
                localStorage.setItem("mf_last_submitted_account_id", data.account_id);
            } catch (e) { console.error(e) }
        }
        if (data) {
            console.log("🚀 Calling optimistic update for:", data)
            tableRef.current?.handleOptimisticUpdate(data as TransactionWithDetails)
        }
        emitTransactionSync(data?.id ? 'transaction-updated-page' : 'transaction-mutated-page')
        router.refresh()
    }

    const handleRefund = (t: TransactionWithDetails) => {
        setRefundTxn(t)
        setIsRefundOpen(true)
    }

    const handleVoid = (t: TransactionWithDetails) => {
        setVoidTxn(t)
        setIsVoidAlertOpen(true)
    }

    const confirmVoid = async () => {
        if (!voidTxn) return
        setLoadingMessage('Voiding transaction...')
        setIsGlobalLoading(true)
        try {
            const success = await voidTransactionAction(voidTxn.id)
            if (success) {
                toast.success("Transaction voided successfully")
                emitTransactionSync('transaction-voided')
                router.refresh()
            } else {
                toast.error("Failed to void transaction")
            }
        } catch (e) {
            toast.error("Error voiding transaction")
        } finally {
            setIsVoidAlertOpen(false)
            setVoidTxn(null)
            setIsGlobalLoading(false)
        }
    }

    // Safe duplication state to avoid race conditions
    const [duplicateData, setDuplicateData] = useState<any | null>(null);

    const initialSlideData = useMemo(() => {
        console.log("🔄 initialSlideData useMemo triggered");
        console.log("   slideMode:", slideMode);

        if (slideOverrideType) {
            const isTypeIn = ['income', 'repayment'].includes(slideOverrideType);
            return {
                type: slideOverrideType as any,
                occurred_at: new Date(),
                amount: 0,
                cashback_mode: "none_back" as const,
                source_account_id: isTypeIn ? undefined : undefined,
                target_account_id: isTypeIn ? undefined : undefined,
                ...(slideOverrideData || {}),
            };
        }

        // Priority 1: Duplicate Data (Computed immediately on click)
        if (slideMode === 'duplicate' && duplicateData) {
            console.log("   ✅ Using pre-computed duplicateData");
            return duplicateData;
        }

        if (!selectedTxn) {
            console.log("   ⚠️ selectedTxn/duplicateData is null - returning undefined");
            return undefined;
        }

        // Use local variable for stability
        const txn = selectedTxn;
        const isTypeIn = ['income', 'repayment'].includes(txn.type);
        const accountId = txn.account_id || undefined;

        const result = {
            type: txn.type as any,
            occurred_at: slideMode === 'duplicate' ? new Date() : new Date(txn.occurred_at),
            amount: Math.round(Math.abs(Number(txn.amount))),
            note: txn.note || '',
            source_account_id: isTypeIn ? undefined : accountId,
            target_account_id: isTypeIn ? accountId : (txn.to_account_id || undefined),
            category_id: txn.category_id || undefined,
            shop_id: txn.shop_id || undefined,
            person_id: txn.person_id || undefined,
            tag: txn.tag || undefined,
            cashback_mode: txn.cashback_mode || "none_back",
            cashback_share_percent: txn.cashback_share_percent,
            cashback_share_fixed: txn.cashback_share_fixed,
            metadata: slideMode === 'duplicate' ? { duplicated_from_id: txn.id } : txn.metadata,
        };
        console.log("   ✅ Computed initialSlideData from selectedTxn:", JSON.stringify(result, null, 2));
        return result;

    }, [selectedTxn?.id, selectedTxn?.occurred_at, selectedTxn?.amount, slideMode, slideOverrideType, accounts, duplicateData]);

    return (
        <div className="flex flex-col h-full bg-background/50">
            {/* Header Section */}
            <div className="flex flex-col gap-0 bg-background sticky top-0 z-10">
                <TransactionHeader
                    accounts={accounts}
                    people={people}
                    date={date}
                    dateRange={dateRange}
                    dateMode={dateMode}
                    onDateChange={handleDateChange}
                    onRangeChange={handleRangeChange}
                    onModeChange={handleModeChange}

                    accountId={selectedAccountId}
                    onAccountChange={handleSetAccountId}

                    personId={selectedPersonId}
                    onPersonChange={handleSetPersonId}

                    categoryId={selectedCategoryId}
                    onCategoryChange={handleSetCategoryId}

                    searchTerm={search}
                    onSearchChange={handleSetSearch}

                    filterType={filterType}
                    onFilterChange={handleSetFilterType}

                    statusFilter={statusFilter}
                    onStatusChange={handleSetStatusFilter}

                    hasActiveFilters={hasActiveFilters}
                    onReset={handleReset}
                    onClearFilters={handleClearFilters}
                    onRefresh={() => {
                        setLoadingMessage("Syncing latest data...")
                        setIsGlobalLoading(true)
                        router.refresh()
                        // Keep loading for at least 500ms to show feedback
                        setTimeout(() => setIsGlobalLoading(false), 500)
                    }}

                    onAdd={handleAddFromHeader}

                    cycles={cycleOptions}
                    selectedCycle={selectedCycle}
                    onCycleChange={handleCycleChange}
                    isCycleLoading={isCyclesLoading}
                    disabledRange={disabledRange}
                    availableMonths={availableMonths}
                    availableAccountIds={availableAccountIds}
                    availablePersonIds={availablePersonIds}
                    availableCategoryIds={availableCategoryIds}
                    availableDateRange={availableDateRange}
                    categories={categories}
                    isPending={isPending}
                    queuesCollapsed={queuesCollapsed}
                    onToggleQueuesCollapsed={() => setQueuesCollapsed((prev) => !prev)}
                    statusSwitchLoading={statusSwitchLoading}
                    statusSwitchTarget={statusSwitchTarget}
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-hidden p-0 sm:p-4 relative">
                <div className={cn(
                    "transition-all duration-300 ease-out",
                    queuesCollapsed ? 'max-h-0 opacity-0 -translate-y-1 overflow-hidden mb-0' : 'max-h-[520px] opacity-100 translate-y-0 mb-2'
                )}>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {renderQueueSection(
                        'Pending Ref',
                        <RotateCcw className="h-3.5 w-3.5 text-amber-600" />,
                        refundQueueItems,
                        expandedQueues.refund,
                        () => setExpandedQueues((prev) => ({ ...prev, refund: !prev.refund })),
                        'refund',
                        'border-amber-200 bg-amber-50',
                        'No pending refund wait right now. New GD2 requests will appear here.',
                    )}
                    {renderQueueSection(
                        'Pending Confirm',
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-black text-indigo-700">B</span>,
                        batchQueueItems,
                        expandedQueues.batch,
                        () => setExpandedQueues((prev) => ({ ...prev, batch: !prev.batch })),
                        'batch',
                        'border-indigo-200 bg-indigo-50',
                        'No batch items waiting confirmation. Use /batch when new pending items arrive.',
                    )}
                    </div>
                </div>
                {statusSwitchLoading && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        {statusSwitchTarget === 'void' ? 'Switching to Void...' : 'Switching to Active...'}
                    </div>
                )}
                {isGlobalLoading && (
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[550] pointer-events-none">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm font-semibold text-white">{loadingMessage}</span>
                        </div>
                    </div>
                )}
                <UnifiedTransactionTable
                    ref={tableRef}
                    transactions={filteredTransactions}
                    activeTab={statusFilter.void && !statusFilter.active ? 'void' : 'active'}
                    accounts={accounts}
                    categories={categories}
                    people={people}
                    shops={shops}
                    selectedTxnIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                    onSelectTxn={handleSelect}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    setIsGlobalLoading={setIsGlobalLoading}
                    setLoadingMessage={setLoadingMessage}
                    context="general"
                    loadingIds={loadingIds}
                    highlightedTransactionIds={highlightedRefundTxnIds}
                />
            </div>

            {/* Transaction Slide V2 - Primary Interface */}
            <TransactionSlideV2
                open={isSlideOpen}
                onOpenChange={handleSlideOpenChange}
                onBackButtonClick={handleBackButtonClick}
                onSubmissionStart={handleSlideSubmissionStart}
                onSubmissionEnd={handleSlideSubmissionEnd}
                mode="single"
                operationMode={slideMode}
                editingId={(slideMode === 'edit' && selectedTxn) ? selectedTxn.id : undefined}
                initialData={initialSlideData}
                accounts={accounts}
                categories={categories}
                people={people}
                shops={shops}
                onSuccess={handleSlideSuccess}
                onHasChanges={setHasUnsavedChanges}
            />

            {/* Unsaved Changes Warning */}
            <UnsavedChangesWarning
                open={showUnsavedWarning}
                onOpenChange={setShowUnsavedWarning}
                onContinueEditing={() => setShowUnsavedWarning(false)}
                onDiscardChanges={confirmCloseSlide}
            />

            {isRefundOpen && refundTxn && (
                <ConfirmRefundDialogV2
                    open={isRefundOpen}
                    onOpenChange={setIsRefundOpen}
                    transaction={refundTxn}
                    accounts={accounts}
                />
            )}

            <AlertDialog open={isVoidAlertOpen} onOpenChange={setIsVoidAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will mark the transaction as void. This action cannot be easily undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmVoid} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Void Transaction
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {pendingBatchModalAccountId && (
                <AccountPendingItemsModal
                    accountId={pendingBatchModalAccountId}
                    accountName={pendingBatchModalAccountName}
                    pendingItems={pendingBatchModalItems}
                    open={pendingBatchModalOpen}
                    onOpenChange={(open) => {
                        setPendingBatchModalOpen(open)
                        if (!open) {
                            setPendingBatchModalItems([])
                            setPendingBatchModalAccountId('')
                            setPendingBatchModalAccountName('')
                        }
                    }}
                    onSuccess={async () => {
                        await loadPendingBatchSummary()
                    }}
                />
            )}

        </div>
    )
}
