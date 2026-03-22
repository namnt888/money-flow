'use client'

import { useState, useMemo, useEffect, useTransition, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Person, TransactionWithDetails, PersonCycleSheet, Account, Category, Shop } from '@/types/moneyflow.types'
import { usePersonDetails } from '@/hooks/use-person-details'
import { SplitBillManager } from '@/components/people/split-bill-manager'
import { SimpleTransactionTable } from '@/components/people/v2/SimpleTransactionTable'
import { SimpleTransactionTableSkeleton } from '@/components/people/v2/SimpleTransactionTableSkeleton'
import { PaidTransactionsModal } from '@/components/people/paid-transactions-modal'
import { PeopleHeader } from '@/components/people/v2/PeopleHeader'
import { TransactionControlBar } from '@/components/people/v2/TransactionControlBar'
import { isYYYYMM, normalizeMonthTag, toYYYYMMFromDate } from '@/lib/month-tag'
import { useRecentItems } from '@/hooks/use-recent-items'
import { useBreadcrumbs } from '@/context/breadcrumb-context'
import { TransactionSlideV2 } from '@/components/transaction/slide-v2/transaction-slide-v2'
import { PeopleSlideV2 } from '@/components/people/v2/people-slide-v2'
import { FilterType } from '@/components/transactions-v2/header/TypeFilterDropdown'
import { StatusFilter } from '@/components/transactions-v2/header/StatusDropdown'
import { parseISO, isWithinInterval } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Info, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAppFavicon } from '@/hooks/use-app-favicon'
import { normalizeCashbackConfig } from '@/lib/cashback'
import { getPersonRouteId } from '@/lib/person-route'
import { getPocketBaseAccountSpendingStatsSnapshot } from '@/services/pocketbase/account-details.service'
import { AccountSpendingStats } from '@/types/cashback.types'

interface MemberDetailViewProps {
    person: Person
    balance: number
    balanceLabel: string
    transactions: TransactionWithDetails[]
    debtTags: any[]
    cycleSheets: PersonCycleSheet[]
    accounts: Account[]
    categories: Category[]
    people: Person[]
    shops: Shop[]
    subscriptions: any[]
}

export function MemberDetailView({
    person,
    balance,
    balanceLabel,
    transactions,
    debtTags,
    cycleSheets,
    accounts,
    categories,
    people,
    shops,
    subscriptions = [],
}: MemberDetailViewProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const urlTag = searchParams.get('tag')
    const dateFrom = searchParams.get('dateFrom') || ''
    const dateTo = searchParams.get('dateTo') || ''
    const currentMonthTag = toYYYYMMFromDate(new Date())

    const [activeTab, setActiveTab] = useState<'timeline' | 'history' | 'split-bill'>('timeline')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState<FilterType>('all')
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('active')
    const urlAccountId = searchParams.get('accountId')
    const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(urlAccountId || undefined)
    const [dateMode, setDateMode] = useState<'month' | 'range' | 'date' | 'all' | 'year' | 'cycle'>('all')
    const [dateValue, setDateValue] = useState<Date>(new Date())
    const [dateRangeValue, setDateRangeValue] = useState<DateRange | undefined>(undefined)
    const [showPaidModal, setShowPaidModal] = useState(false)
    const [dateRangeFilter, setDateRangeFilter] = useState<{ from: Date; to: Date } | undefined>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Global loading for table actions (e.g. Voiding, Rollover, Sync)
    const [isGlobalLoading, setIsGlobalLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null)
    const [accountGlobalCashbackStatus, setAccountGlobalCashbackStatus] = useState<AccountSpendingStats | null>(null)
    const [allAccountsCashbackStats, setAllAccountsCashbackStats] = useState<Record<string, AccountSpendingStats>>({})

    const [isPending, startTransition] = useTransition()

    // Helper function for tag extraction
    const getEffectiveTxnTag = useMemo(() => {
        return (txn: TransactionWithDetails): string => {
            const metadata = (txn.metadata as any) || {}
            const metadataDebtCycle = metadata.debt_cycle_tag as string | undefined
            const metadataPersisted = metadata.persisted_cycle_tag as string | undefined
            const persisted = (txn as any).persisted_cycle_tag as string | undefined
            const debtCycle = (txn as any).debt_cycle_tag as string | undefined
            const metadataTag = (metadata.tag as string | undefined)
            const rawTag = debtCycle || metadataDebtCycle || txn.tag || persisted || metadataPersisted || metadataTag || ''
            return normalizeMonthTag(rawTag) || rawTag
        }
    }, [])

    // Browser Tab Spinner Enhancement
    useAppFavicon(isSubmitting || isGlobalLoading || isPending, person.image_url ?? undefined)

    // Derive active month/year from URL (Single Source of Truth)
    const urlYear = searchParams.get('year')
    const activeCycleTag = useMemo(() => {
        if (urlTag) {
            return urlTag
        }

        const hasCurrentData = transactions.some((txn) => {
            const normalizedTag = normalizeMonthTag(getEffectiveTxnTag(txn) || '')
            return normalizedTag === currentMonthTag
        })
        if (hasCurrentData) {
            return currentMonthTag
        }

        const sortedTags = transactions
            .map((txn) => normalizeMonthTag(getEffectiveTxnTag(txn) || ''))
            .filter((tag): tag is string => Boolean(tag))
            .sort((a, b) => b.localeCompare(a))

        return sortedTags[0] || currentMonthTag
    }, [urlTag, transactions, currentMonthTag, getEffectiveTxnTag])

    const selectedYear = useMemo(() => {
        if (urlYear) {
            return urlYear
        }
        if (urlTag === 'all') {
            return null
        }
        if (urlTag && urlTag.includes('-')) {
            return urlTag.split('-')[0]
        }
        if (activeCycleTag.includes('-')) {
            return activeCycleTag.split('-')[0]
        }
        return new Date().getFullYear().toString()
    }, [urlTag, urlYear, activeCycleTag])

    // Data Hooks
    const { debtCycles, availableYears, currentCycle } = usePersonDetails({
        person,
        transactions,
        debtTags,
        cycleSheets,
        urlTag,
    })

    const accountItems = useMemo(() => {
        const ids = new Set<string>()
        transactions.forEach(t => {
            if (t.source_account_id) ids.add(t.source_account_id)
            if (t.target_account_id) ids.add(t.target_account_id)
            if (t.account_id) ids.add(t.account_id)
            const toAccountId = (t as any).to_account_id as string | undefined
            if (toAccountId) ids.add(toAccountId)
        })
        return accounts.filter(a => ids.has(a.id))
    }, [transactions, accounts])

    // Slide State
    const [isSlideOpen, setIsSlideOpen] = useState(false)
    const [slideMode, setSlideMode] = useState<'add' | 'edit' | 'duplicate'>('add')
    const [selectedTxn, setSelectedTxn] = useState<TransactionWithDetails | null>(null)
    const [slideOverrideType, setSlideOverrideType] = useState<string | undefined>(undefined)

    // Person Slide State
    const [isPersonSlideOpen, setIsPersonSlideOpen] = useState(false)

    const { setCustomName } = useBreadcrumbs()

    useEffect(() => {
        const tabLabel = activeTab === 'history' ? 'History' : activeTab === 'split-bill' ? 'Split Bill' : 'Transactions'
        document.title = `${person.name} ${tabLabel}`

        const path = `/people/${getPersonRouteId(person)}`
        setCustomName(path, `${person.name} detail history`)
    }, [person.id, person.name, person.pocketbase_id, activeTab, setCustomName, person])

    const { addRecentItem } = useRecentItems()

    useEffect(() => {
        if (person.id && person.name) {
            addRecentItem({
                id: person.id,
                type: 'person',
                name: person.name,
                image_url: person.image_url
            })
        }
    }, [person.id, person.name, person.image_url, addRecentItem])

    // Update Navigation Handlers
    const handleCycleChange = useCallback((tag: string) => {
        const params = new URLSearchParams(searchParams.toString())
        
        if (tag !== 'all') {
            setDateMode('all') 
            setDateRangeValue(undefined)
            setDateRangeFilter(undefined)
        }

        params.set('tag', tag)
        if (tag.includes('-')) {
            params.set('year', tag.split('-')[0])
        }
        
        // Always include accountId if we have one in state
        if (selectedAccountId) {
            params.set('accountId', selectedAccountId)
        } else {
            params.delete('accountId')
        }

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }, [searchParams, selectedAccountId, router])

    const handleCycleSelect = useCallback((tag: string, year: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        
        params.delete('dateFrom')
        params.delete('dateTo')
        
        if (tag === 'all') {
            params.set('tag', 'all')
            if (year) params.set('year', year)
            else params.delete('year')
        } else {
            params.set('tag', tag)
            if (tag.includes('-')) {
                params.set('year', tag.split('-')[0])
            }
        }

        // Always include accountId if we have one in state
        if (selectedAccountId) {
            params.set('accountId', selectedAccountId)
        }

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }, [searchParams, selectedAccountId, router])

    const handleYearChange = useCallback((year: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (year === null) {
            params.set('tag', 'all')
            params.delete('year')
        } else {
            params.set('tag', 'all')
            params.set('year', year)
        }
        params.delete('dateFrom')
        params.delete('dateTo')
        
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }, [searchParams, router])
    const handleRefresh = useCallback(() => {
        startTransition(() => {
            router.refresh()
            toast.success('Table data refreshed')
        })
    }, [router])

    useEffect(() => {
        if (dateFrom && dateTo) {
            try {
                const parsedFrom = parseISO(dateFrom)
                const parsedTo = parseISO(dateTo)
                if (Number.isNaN(parsedFrom.getTime()) || Number.isNaN(parsedTo.getTime())) {
                    setDateRangeFilter(undefined)
                    setDateRangeValue(undefined)
                    setDateMode('all')
                    return
                }
                setDateRangeFilter({ from: parsedFrom, to: parsedTo })
                setDateRangeValue({ from: parsedFrom, to: parsedTo })
                setDateValue(parsedFrom)
                setDateMode('range')
            } catch (err) {
                setDateRangeFilter(undefined)
                setDateRangeValue(undefined)
                setDateMode('all')
            }
        } else {
            setDateRangeFilter(undefined)
            setDateRangeValue(undefined)
            setDateMode('all')
        }
    }, [dateFrom, dateTo])

    const updateDateRangeParams = (nextFrom: string, nextTo: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (nextFrom) {
            params.set('dateFrom', nextFrom)
        } else {
            params.delete('dateFrom')
        }
        if (nextTo) {
            params.set('dateTo', nextTo)
        } else {
            params.delete('dateTo')
        }
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }

    const handleClearDateRange = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('tag', 'all')
        params.delete('year')
        params.delete('dateFrom')
        params.delete('dateTo')
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false })
        })
    }

    const handlePickerDateChange = (nextDate: Date) => {
        setDateValue(nextDate)
    }

    const handlePickerRangeChange = (nextRange: DateRange | undefined) => {
        setDateRangeValue(nextRange)
        if (nextRange?.from && nextRange?.to) {
            const fromStr = nextRange.from.toISOString().slice(0, 10)
            const toStr = nextRange.to.toISOString().slice(0, 10)
            updateDateRangeParams(fromStr, toStr)
        } else if (!nextRange?.from && !nextRange?.to) {
            handleClearDateRange()
        }
    }

    const handlePickerModeChange = (mode: 'month' | 'range' | 'date' | 'all' | 'year' | 'cycle') => {
        setDateMode(mode)
        if (mode !== 'all' && urlTag !== 'all') {
            const params = new URLSearchParams(searchParams.toString())
            params.set('tag', 'all')
            if (!params.get('year')) {
                params.set('year', selectedYear ?? new Date().getFullYear().toString())
            }
            startTransition(() => {
                router.push(`?${params.toString()}`, { scroll: false })
            })
            toast.info(`Switched debt cycle to all ${params.get('year')}`)
        }
        if (mode === 'all') {
            handleClearDateRange()
        }
    }

    const handleAccountChange = (value?: string) => {
        setSelectedAccountId(value)
        if (!value) {
            const params = new URLSearchParams(searchParams.toString())
            params.delete('accountId')
            if (!urlTag) params.set('tag', 'all')
            params.delete('year')
            params.delete('dateFrom')
            params.delete('dateTo')
            startTransition(() => {
                router.push(`?${params.toString()}`, { scroll: false })
            })
        } else {
            // ONLY set local state. 
            // The TransactionControlBar's useEffect will detect this change,
            // find the correct cycle, and trigger onCycleSelect/Change,
            // which will handle the single consolidated router.push.
            setDateMode('cycle')
        }
    }

    // Mapping Global Stats to Header Expected Interface
    const mappedGlobalStats = useMemo(() => {
        if (!accountGlobalCashbackStatus) return null;
        return {
            earned: accountGlobalCashbackStatus.earnedSoFar,
            shared: accountGlobalCashbackStatus.sharedAmount,
            profit: accountGlobalCashbackStatus.netProfit,
            cap: accountGlobalCashbackStatus.maxCashback || 0,
            currentSpend: accountGlobalCashbackStatus.currentSpend,
            minSpend: accountGlobalCashbackStatus.minSpend || 0,
            needToSpend: accountGlobalCashbackStatus.minSpend 
                ? Math.max(0, accountGlobalCashbackStatus.minSpend - accountGlobalCashbackStatus.currentSpend) 
                : 0,
            remaining: accountGlobalCashbackStatus.remainingBudget || 0,
            account_id: selectedAccountId
        }
    }, [accountGlobalCashbackStatus, selectedAccountId])

    useEffect(() => {
        if (!selectedAccountId) {
            setAccountGlobalCashbackStatus(null)
            return
        }

        // Prioritize state over URL for tag if they differ during transition
        const effectiveTag = activeCycleTag || urlTag || undefined

        const fetchGlobalStats = async () => {
            // Clear current global status to show transition/loading
            setAccountGlobalCashbackStatus(null)
            
            console.log('[MemberDetailView] fetching global stats:', { selectedAccountId, effectiveTag })
            try {
                const stats = await getPocketBaseAccountSpendingStatsSnapshot(selectedAccountId, new Date(), effectiveTag === 'all' ? undefined : effectiveTag)
                console.log('[MemberDetailView] global stats result:', stats ? 'received' : 'null', stats?.currentSpend)
                setAccountGlobalCashbackStatus(stats)
            } catch (err) {
                console.error("Failed to fetch global cashback stats:", err)
            }
        }

        fetchGlobalStats()
    }, [selectedAccountId, urlTag, activeCycleTag])

    // Calculate stats for Header based on Selected Cycle, Year or All Time
    const headerStats = useMemo(() => {
        const now = new Date()
        const currentMonthTag = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        
        let originalLend = 0
        let cashback = 0
        let netLend = 0
        let repay = 0
        let remains = 0
        let paidRollover = 0
        let receiveRollover = 0

        // 1. Calculate stats from local debtCycles based on selection
        if (urlTag === 'all') {
            const targets = selectedYear && selectedYear !== 'All Time' && selectedYear !== 'Other'
                ? debtCycles.filter(c => c.tag.startsWith(selectedYear))
                : debtCycles;
            
            targets.forEach(c => {
                originalLend += c.stats.originalLend || 0
                cashback += c.stats.cashback || 0
                netLend += c.stats.lend || 0
                repay += c.stats.repay || 0
                remains += c.remains || 0
                paidRollover += c.stats.paidRollover || 0
                receiveRollover += c.stats.receiveRollover || 0
            })
        } else {
            const effectiveTag = urlTag && urlTag !== 'all' ? urlTag : (activeCycleTag !== 'all' ? activeCycleTag : currentMonthTag)
            const cycle = debtCycles.find(c => c.tag === effectiveTag) || debtCycles[0]

            if (cycle) {
                originalLend = cycle.stats.originalLend || 0
                cashback = cycle.stats.cashback || 0
                netLend = cycle.stats.lend || 0
                repay = cycle.stats.repay || 0
                remains = cycle.remains || 0
                paidRollover = cycle.stats.paidRollover || 0
                receiveRollover = cycle.stats.receiveRollover || 0
            }
        }

        // 2. OVERRIDE with Global Account Data if an account is selected
        // Requirement from task.md: "SOURCE OF TRUTH: If an Account filter is active, the Reward section MUST display Global Account Data"
        // Also "RE-CALCULATE "Remains": Remains = Original Spend - Correct Cashback."
        if (selectedAccountId && accountGlobalCashbackStatus) {
            originalLend = accountGlobalCashbackStatus.currentSpend || 0
            cashback = accountGlobalCashbackStatus.earnedSoFar || 0
            // Naming from task.md: Remains = Original Spend - Correct Cashback
            remains = originalLend - cashback
            
            // keep repay and rollovers from local person context if we still want to show them 
            // in the StatsPopover, but for the main summary cards, we use global spend/cashback.
        }

        return { originalLend, cashback, netLend, repay, remains, paidRollover, receiveRollover }
    }, [debtCycles, urlTag, activeCycleTag, selectedAccountId, accountGlobalCashbackStatus, selectedYear])

    // Absolute Active Cycle Logic
    const activeCycle = useMemo(() => {
        if (urlTag === 'all') {
            return {
                tag: selectedYear ? `All for ${selectedYear}` : "All History",
                remains: headerStats.remains,
                transactions: [], 
                stats: {
                    lend: headerStats.netLend,
                    repay: headerStats.repay,
                    originalLend: headerStats.originalLend,
                    cashback: headerStats.cashback,
                    paidRollover: headerStats.paidRollover,
                    receiveRollover: headerStats.receiveRollover,
                },
                isSettled: Math.abs(headerStats.remains) < 100,
                latestDate: 0,
                tagDateVal: 0,
            }
        }
        return debtCycles.find(c => c.tag === (urlTag || activeCycleTag)) || currentCycle
    }, [urlTag, debtCycles, headerStats, selectedYear, activeCycleTag, currentCycle])

    const applyFilters = (txns: TransactionWithDetails[]) => {
        let result = txns
        if (statusFilter === 'void') {
            result = result.filter(t => t.status === 'void')
        } else if (statusFilter === 'pending') {
            result = result.filter(t => t.status === 'pending' || t.status === 'waiting_refund')
        } else {
            result = result.filter(t => t.status !== 'void')
        }

        if (filterType !== 'all') {
            if (filterType === 'cashback') {
                result = result.filter(t => {
                    const amount = Math.abs(Number(t.amount) || 0)
                    const finalPrice = t.final_price !== null && t.final_price !== undefined ? Math.abs(Number(t.final_price)) : amount
                    const hasBackMetadata = (t.metadata as any)?.is_cashback === true || t.note?.toLowerCase().includes('cashback')
                    const hasSharedCashback = (Number(t.cashback_share_amount) || 0) > 0 || (Number(t.cashback_share_percent) || 0) > 0
                    return (finalPrice < amount && finalPrice > 0) || hasBackMetadata || hasSharedCashback
                })
            } else {
                const matchType = filterType === 'lend' ? 'debt' : (filterType === 'repay' ? 'repayment' : filterType)
                result = result.filter(t => (t.type || '').toLowerCase() === matchType)
            }
        }

        if (selectedAccountId) {
            result = result.filter(t => {
                const toAccountId = (t as any).to_account_id as string | undefined
                return t.source_account_id === selectedAccountId
                    || t.target_account_id === selectedAccountId
                    || t.account_id === selectedAccountId
                    || toAccountId === selectedAccountId
            })
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            result = result.filter(t =>
                t.note?.toLowerCase().includes(term) ||
                t.shop?.name?.toLowerCase().includes(term) ||
                t.category?.name?.toLowerCase().includes(term) ||
                t.id?.toLowerCase().includes(term)
            )
        }

        if (dateRangeFilter) {
            result = result.filter(t => {
                const rawDate = t.occurred_at || t.created_at
                if (!rawDate) return false
                const txDate = parseISO(rawDate)
                if (Number.isNaN(txDate.getTime())) return false
                return isWithinInterval(txDate, { start: dateRangeFilter.from, end: dateRangeFilter.to })
            })
        }
        return result
    }

    const cycleTransactions = useMemo(() => {
        if (selectedYear === null) {
            return applyFilters(transactions)
        }
        if (activeCycleTag === 'all') {
            const yearTransactions = transactions.filter(t => getEffectiveTxnTag(t)?.startsWith(selectedYear))
            return applyFilters(yearTransactions)
        }
        const cycle = debtCycles.find(c => c.tag === activeCycleTag)
        if (!cycle) return []
        return applyFilters(cycle.transactions)
    }, [activeCycleTag, debtCycles, selectedYear, searchTerm, filterType, statusFilter, selectedAccountId, dateRangeFilter, transactions, getEffectiveTxnTag])

    const historyTransactions = useMemo(() => {
        const base = transactions.filter(t => {
            if (!selectedYear) return true
            const effectiveTag = getEffectiveTxnTag(t)
            if (effectiveTag?.startsWith(`${selectedYear}-`)) return true
            return t.occurred_at?.startsWith(selectedYear) ?? false
        })
        return applyFilters(base)
    }, [transactions, selectedYear, searchTerm, filterType, statusFilter, selectedAccountId, dateRangeFilter, getEffectiveTxnTag])

    const selectedAccountCashbackStatus = useMemo(() => {
        if (!selectedAccountId) return null
        const selectedAccount = accounts.find((account) => account.id === selectedAccountId)
        if (!selectedAccount) return null
        const config = normalizeCashbackConfig(selectedAccount.cashback_config, selectedAccount)
        const minSpend = config.minSpendTarget ?? null

        const sourceTransactions = (() => {
            if (selectedYear === null) return transactions
            if (activeCycleTag === 'all') {
                return transactions.filter((txn) => {
                    const effectiveTag = getEffectiveTxnTag(txn)
                    if (effectiveTag?.startsWith(`${selectedYear}-`)) return true
                    return txn.occurred_at?.startsWith(selectedYear) ?? false
                })
            }
            return transactions.filter((txn) => getEffectiveTxnTag(txn) === activeCycleTag)
        })()

        const accountTransactions = sourceTransactions.filter((txn) => {
            const toAccountId = (txn as any).to_account_id as string | undefined
            return txn.account_id === selectedAccountId
                || txn.source_account_id === selectedAccountId
                || txn.target_account_id === selectedAccountId
                || toAccountId === selectedAccountId
        })

        const spendTransactions = accountTransactions.filter((txn) => {
            if (txn.status === 'void') return false
            return txn.type === 'expense' || txn.type === 'debt'
        })

        const currentSpend = spendTransactions.reduce((sum, txn) => sum + Math.abs(Number(txn.amount) || 0), 0)
        
        // Advanced cashback calculation logic consistent with AccountDetailHeaderV2
        let estEarned = 0
        let sharedAmount = 0
        
        spendTransactions.forEach(txn => {
            const amount = Math.abs(Number(txn.amount) || 0)
            const metadata = (txn.metadata as any) || {}
            
            // 1. Earned Calculation
            const entries = Array.isArray(txn.cashback_entries) ? txn.cashback_entries : []
            const entryAmount = entries.reduce((s: number, e: any) => {
                if (e.mode === "virtual" || e.mode === "real") {
                    return s + Math.abs(Number(e.amount || 0))
                }
                return s
            }, 0)

            if (entryAmount > 0) {
                estEarned += entryAmount
            } else {
                // Fallback to final_price
                const finalPrice = txn.final_price !== null && txn.final_price !== undefined
                    ? Math.abs(Number(txn.final_price) || 0)
                    : amount
                estEarned += Math.max(0, amount - finalPrice)
            }

            // 2. Shared Calculation
            const sharedFixed = Number(txn.cashback_share_fixed || metadata.cashback_share_fixed || 0)
            const rawSharePercent = Number(txn.cashback_share_percent || metadata.cashback_share_percent || 0)
            const sharePercent = rawSharePercent > 1 ? rawSharePercent / 100 : rawSharePercent
            const computedShared = amount * sharePercent + sharedFixed
            const rawShareAmount = Number(txn.cashback_share_amount ?? metadata.cashback_share_amount ?? 0)
            const txShared = rawShareAmount > 0 ? rawShareAmount : computedShared
            sharedAmount += (isNaN(txShared) ? 0 : txShared)
        })

        const profit = estEarned - sharedAmount
        const needToSpend = minSpend && minSpend > 0 ? Math.max(0, minSpend - currentSpend) : 0
        
        if (currentSpend <= 0 && estEarned <= 0 && needToSpend <= 0) return null

        return {
            earned: estEarned,
            shared: sharedAmount,
            profit: profit,
            cap: config.maxBudget ?? 0,
            currentSpend,
            minSpend: minSpend ?? 0,
            needToSpend,
            remaining: config.maxBudget !== null && config.maxBudget !== undefined
                ? Math.max(0, config.maxBudget - estEarned)
                : 0,
            account_id: selectedAccountId
        }
    }, [accounts, selectedAccountId, selectedYear, activeCycleTag, transactions, getEffectiveTxnTag])

    // Syncing global stats for all involvement accounts
    const sourceTransactionsForRewards = useMemo(() => {
        if (activeCycleTag === 'all') {
            if (selectedYear === null) return transactions
            return transactions.filter((txn) => {
                const effectiveTag = getEffectiveTxnTag(txn)
                if (effectiveTag?.startsWith(`${selectedYear}-`)) return true
                return txn.occurred_at?.startsWith(selectedYear) ?? false
            })
        }
        return transactions.filter((txn) => getEffectiveTxnTag(txn) === activeCycleTag)
    }, [transactions, activeCycleTag, selectedYear, getEffectiveTxnTag])

    const relevantAccountIds = useMemo(() => {
        const ids = new Set<string>()
        sourceTransactionsForRewards.forEach(t => {
            if (t.account_id) ids.add(t.account_id)
            if (t.source_account_id) ids.add(t.source_account_id)
            if (t.target_account_id) ids.add(t.target_account_id)
            const toAcc = (t as any).to_account_id
            if (toAcc) ids.add(toAcc)
        })
        return Array.from(ids)
    }, [sourceTransactionsForRewards])

    useEffect(() => {
        if (selectedAccountId || relevantAccountIds.length === 0) {
            setAllAccountsCashbackStats({})
            return
        }

        let isMounted = true
        const fetchAllStats = async () => {
            const results: Record<string, AccountSpendingStats> = {}
            await Promise.all(relevantAccountIds.map(async (accId) => {
                try {
                    const stats = await getPocketBaseAccountSpendingStatsSnapshot(accId, new Date(), activeCycleTag === 'all' ? undefined : activeCycleTag)
                    if (stats && isMounted) results[accId] = stats
                } catch (err) {
                    console.error(`Failed to fetch stats for ${accId}:`, err)
                }
            }))
            if (isMounted) setAllAccountsCashbackStats(results)
        }

        fetchAllStats()
        return () => { isMounted = false }
    }, [selectedAccountId, activeCycleTag, relevantAccountIds])

    const allCashbackStatuses = useMemo(() => {
        if (selectedAccountId) return []

        const statuses: any[] = []
        relevantAccountIds.forEach(accId => {
            const acc = accounts.find(a => a.id === accId)
            if (!acc) return

            const globalStats = allAccountsCashbackStats[accId]
            if (globalStats) {
                const needToSpend = globalStats.minSpend ? Math.max(0, globalStats.minSpend - globalStats.currentSpend) : 0
                statuses.push({
                    earned: globalStats.earnedSoFar,
                    shared: globalStats.sharedAmount,
                    profit: globalStats.netProfit,
                    cap: globalStats.maxCashback || 0,
                    currentSpend: globalStats.currentSpend,
                    minSpend: globalStats.minSpend || 0,
                    needToSpend,
                    remaining: globalStats.remainingBudget || 0,
                    account_id: accId,
                    accountName: acc.name,
                    accountImage: acc.image_url
                })
            } else {
                // Fallback to local calculation while loading or if fetch fails
                const config = acc.cashback_config ? normalizeCashbackConfig(acc.cashback_config, acc) : { minSpendTarget: 0, maxBudget: 0 }
                const minSpend = config.minSpendTarget ?? 0
                const accTxns = sourceTransactionsForRewards.filter(t => (t.account_id === accId || t.source_account_id === accId || t.target_account_id === accId || (t as any).to_account_id === accId))
                const spendTxns = accTxns.filter(t => t.status !== 'void' && (t.type === 'expense' || t.type === 'debt'))
                
                let earned = 0
                const currentSpend = spendTxns.reduce((s, t) => {
                    const amount = Math.abs(Number(t.amount) || 0)
                    const final = t.final_price !== null ? Math.abs(Number(t.final_price)) : amount
                    if (final < amount) earned += (amount - final)
                    return s + amount
                }, 0)
                
                const needToSpend = minSpend > 0 ? Math.max(0, minSpend - currentSpend) : 0

                if (currentSpend > 0 || earned > 0) {
                    statuses.push({
                        earned, 
                        shared: 0,
                        profit: earned, 
                        cap: config.maxBudget || 0,
                        currentSpend,
                        minSpend,
                        needToSpend,
                        remaining: config.maxBudget ? Math.max(0, config.maxBudget - earned) : 0,
                        account_id: accId,
                        accountName: acc.name,
                        accountImage: acc.image_url
                    })
                }
            }
        })

        return statuses.sort((a, b) => (b.needToSpend - a.needToSpend) || (b.profit - a.profit))
    }, [accounts, selectedAccountId, relevantAccountIds, allAccountsCashbackStats, sourceTransactionsForRewards])


    // Slide Handlers
    const handleAddTransaction = (type: string) => {
        setSlideOverrideType(type)
        setSlideMode('add')
        setSelectedTxn(null)
        setIsSlideOpen(true)
    }

    const handleEditTransaction = (t: TransactionWithDetails) => {
        setSlideMode('edit')
        setSelectedTxn(t)
        setIsSlideOpen(true)
    }

    const handleDuplicateTransaction = (input: string | TransactionWithDetails) => {
        const t = typeof input === 'string'
            ? transactions.find(x => x.id === input)
            : input
        if (!t) return
        setSlideMode('duplicate')
        setSelectedTxn(t)
        setSlideOverrideType(undefined)
        setIsSlideOpen(true)
    }

    const handleSlideSuccess = () => {
        setSelectedTxn(null)
        setSlideOverrideType(undefined)
        router.refresh()
    }

    const handleSubmissionStart = () => {
        setIsSlideOpen(false)
        setIsSubmitting(true)
    }

    const handleSubmissionEnd = () => {
        setIsSubmitting(false)
    }

    // Initial Data for Slide
    const slideInitialData = useMemo(() => {
        if (slideOverrideType) {
            const isRepayment = slideOverrideType === 'repayment';
            const initialTag = activeCycle?.tag && isYYYYMM(activeCycle.tag)
                ? activeCycle.tag
                : undefined
            return {
                type: slideOverrideType as any,
                occurred_at: new Date(),
                amount: isRepayment ? Math.round(activeCycle?.remains || 0) : 0,
                cashback_mode: "none_back" as const,
                person_id: person.id,
                tag: initialTag,
                target_account_id: (isRepayment && person.sheet_linked_bank_id) ? person.sheet_linked_bank_id : undefined,
            }
        }
        if (!selectedTxn) return undefined
        const isTypeIn = ['income', 'repayment'].includes(selectedTxn.type);
        const selectedTxnFallbackTag = (selectedTxn.tag)
            || ((selectedTxn as any).persisted_cycle_tag)
            || ((selectedTxn as any).debt_cycle_tag)
            || ((selectedTxn.metadata as any)?.tag)
            || undefined

        return {
            type: selectedTxn.type as any,
            occurred_at: slideMode === 'duplicate' ? new Date() : new Date(selectedTxn.occurred_at),
            amount: Math.round(Math.abs(Number(selectedTxn.amount))),
            note: selectedTxn.note || '',
            source_account_id: isTypeIn ? undefined : (selectedTxn.account_id || ''),
            target_account_id: isTypeIn ? (selectedTxn.account_id || undefined) : (selectedTxn.to_account_id || undefined),
            category_id: selectedTxn.category_id || undefined,
            shop_id: selectedTxn.shop_id || undefined,
            person_id: selectedTxn.person_id || person.id,
            tag: selectedTxnFallbackTag,
            cashback_mode: selectedTxn.cashback_mode || "none_back",
            cashback_share_percent: selectedTxn.cashback_share_percent,
            cashback_share_fixed: selectedTxn.cashback_share_fixed,
            metadata: slideMode === 'duplicate' ? { duplicated_from_id: selectedTxn.id } : selectedTxn.metadata,
        }
    }, [selectedTxn, slideMode, slideOverrideType, person, activeCycle])

    const paidCount = useMemo(() => {
        if (!activeCycle) return 0
        return activeCycle.transactions.filter(t => {
            if (t.type !== 'repayment' && t.type !== 'income') return false
            const metadata = (t.metadata as any) || {}
            return metadata.is_settled === true || metadata.paid_at !== null
        }).length
    }, [activeCycle])

    const activeCycleSheet = useMemo(() => {
        if (!activeCycle?.tag) return undefined
        return cycleSheets.find(s => s.cycle_tag === activeCycle.tag)
    }, [cycleSheets, activeCycle])

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* V2 Header */}
            <PeopleHeader
                person={person}
                balanceLabel={balanceLabel}
                activeCycle={activeCycle}
                allCycles={debtCycles}
                accounts={accounts}
                stats={headerStats}
                selectedYear={selectedYear}
                availableYears={availableYears}
                onYearChange={handleYearChange}
                onCycleChange={handleCycleChange}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onEdit={() => setIsPersonSlideOpen(true)}
                cashbackStatus={mappedGlobalStats || selectedAccountCashbackStatus || undefined}
                allCashbackStatuses={allCashbackStatuses}
                isSyncing={isGlobalLoading || isPending}
                syncingText={isGlobalLoading ? (loadingMessage || 'Syncing...') : 'Loading...'}
                hasFilter={!!selectedAccountId}
            />

            {/* Content Area */}
            {activeTab === 'timeline' && activeCycle && (
                <>
                    <TransactionControlBar
                        person={person}
                        activeCycle={activeCycle}
                        allCycles={debtCycles}
                        onCycleChange={handleCycleChange}
                        onCycleSelect={handleCycleSelect}
                        availableYears={availableYears}
                        selectedYear={selectedYear}
                        onYearChange={handleYearChange}
                        transactionCount={cycleTransactions.length}
                        paidCount={paidCount}
                        onViewPaid={() => setShowPaidModal(true)}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        filterType={filterType}
                        onFilterTypeChange={setFilterType}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        selectedAccountId={selectedAccountId}
                        onAccountChange={handleAccountChange}
                        date={dateValue}
                        dateRange={dateRangeValue}
                        dateMode={dateMode}
                        onDateChange={handlePickerDateChange}
                        onRangeChange={handlePickerRangeChange}
                        onModeChange={handlePickerModeChange}
                        accountItems={accountItems}
                        accounts={accounts}
                        categories={categories}
                        shops={shops}
                        onAddTransaction={handleAddTransaction}
                        currentCycleTag={currentMonthTag}
                        isPending={isPending}
                        initialSheetUrl={activeCycleSheet?.sheet_url}
                        onRefresh={handleRefresh}
                        setIsGlobalLoading={setIsGlobalLoading}
                        setLoadingMessage={setLoadingMessage}
                    />
                    <div className="flex-1 overflow-y-auto px-4 py-3 relative">
                        {(isSubmitting || isGlobalLoading) && (
                            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] pointer-events-none">
                                <div className="flex items-center gap-3 bg-slate-900/95 shadow-2xl border border-slate-800 px-6 py-3 rounded-full text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
                                    <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                                    <span className="text-[11px] font-black uppercase tracking-widest leading-none">
                                        {isGlobalLoading ? (loadingMessage || 'Executing...') :
                                            slideMode === 'edit' ? 'Updating...' :
                                                slideMode === 'duplicate' ? 'Cloning...' :
                                                    'Saving...'}
                                    </span>
                                </div>
                            </div>
                        )}
                        {isPending ? (
                            <SimpleTransactionTableSkeleton />
                        ) : (
                            <SimpleTransactionTable
                                transactions={cycleTransactions}
                                accounts={accounts}
                                categories={categories}
                                people={people}
                                shops={shops}
                                searchTerm={searchTerm}
                                context="person"
                                contextId={person.id}
                                onEdit={handleEditTransaction}
                                onDuplicate={handleDuplicateTransaction}
                                setIsGlobalLoading={setIsGlobalLoading}
                                setLoadingMessage={setLoadingMessage}
                            />
                        )}
                    </div>
                </>
            )}

            {activeTab === 'history' && (
                <div className="flex-1 overflow-y-auto px-4 py-3">
                    <SimpleTransactionTable
                        transactions={historyTransactions}
                        accounts={accounts}
                        categories={categories}
                        people={people}
                        shops={shops}
                        searchTerm={searchTerm}
                        context="person"
                        contextId={person.id}
                        setIsGlobalLoading={setIsGlobalLoading}
                        setLoadingMessage={setLoadingMessage}
                    />
                </div>
            )}

            {activeTab === 'split-bill' && (
                <div className="flex-1 overflow-y-auto px-4 py-3">
                    <SplitBillManager
                        transactions={transactions}
                        personId={person.id}
                        people={people}
                        accounts={accounts}
                        categories={categories}
                        shops={shops}
                    />
                </div>
            )}

            {/* Paid Transactions Modal */}
            <PaidTransactionsModal
                open={showPaidModal}
                onOpenChange={setShowPaidModal}
                personId={person.id}
                transactions={transactions}
                accounts={accounts}
                categories={categories}
                people={people}
                shops={shops}
            />

            <PeopleSlideV2
                open={isPersonSlideOpen}
                onOpenChange={setIsPersonSlideOpen}
                person={person}
                subscriptions={subscriptions}
                accounts={accounts}
            />
            {/* Transaction Slide V2 */}
            <TransactionSlideV2
                open={isSlideOpen}
                onOpenChange={(val) => {
                    if (!val) {
                        setIsSlideOpen(false)
                        setSelectedTxn(null)
                        setSlideOverrideType(undefined)
                    }
                }}
                mode="single"
                operationMode={slideMode}
                editingId={(slideMode === 'edit' && selectedTxn) ? selectedTxn.id : undefined}
                initialData={slideInitialData}
                accounts={accounts}
                categories={categories}
                people={people}
                shops={shops}
                onSuccess={handleSlideSuccess}
                onSubmissionStart={handleSubmissionStart}
                onSubmissionEnd={handleSubmissionEnd}
            />
            <FlowLegend />
        </div>
    )
}

const FlowLegend = () => (
    <div className="px-6 py-2 border-t border-slate-200 bg-white flex items-center gap-6 text-[11px] text-slate-500 font-medium shrink-0 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2 group cursor-help">
            <span className="inline-flex items-center justify-center rounded-[4px] h-5 w-11 text-[9px] font-black bg-orange-50 border border-orange-200 text-orange-700 shadow-sm transition-transform group-hover:scale-105">FROM</span>
            <span className="text-slate-400 font-normal">{"->"} Origin / Source</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
            <span className="inline-flex items-center justify-center rounded-[4px] h-5 w-11 text-[9px] font-black bg-sky-50 border border-sky-200 text-sky-700 shadow-sm transition-transform group-hover:scale-105">TO</span>
            <span className="text-slate-400 font-normal">{"->"} Target / Destination</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-slate-300">
            <Info className="h-3.5 w-3.5" />
            <span className="italic">Flow labels are context-aware (Repayment = TO Account)</span>
        </div>
    </div>
)
