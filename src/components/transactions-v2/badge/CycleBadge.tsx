'use client'

import { Account } from '@/types/moneyflow.types'
import { parseCashbackConfig, getCashbackCycleRange, parseCycleTag } from '@/lib/cashback'
import { cn } from '@/lib/utils'
import { parseISO, format, startOfMonth, endOfMonth } from 'date-fns'
import { CustomTooltip } from '@/components/ui/custom-tooltip'
import { useRouter } from 'next/navigation'

interface CycleBadgeProps {
    account: Account | undefined
    cycleTag: string | undefined | null
    txnDate: string | Date
    className?: string
    mini?: boolean
    compact?: boolean
    clickable?: boolean // New prop to enable navigation
    entityName?: string // Entity name for tooltip
    personContext?: boolean // NEW: Show tag instead of range
}

export function CycleBadge({ account, cycleTag, txnDate, className, mini = false, compact = false, clickable = true, entityName, personContext = false }: CycleBadgeProps) {
    const router = useRouter()

    // NEW: Priority logic for person context (Debt cycles)
    if (personContext) {
        if (!cycleTag) return null
        
        const handleClick = (e: React.MouseEvent) => {
            if (!clickable) return
            e.stopPropagation()
            e.preventDefault()
            const url = account?.id 
                ? `/accounts/${account.id}?tag=${cycleTag}`
                : `/transactions?tag=${cycleTag}`
            window.open(url, '_blank', 'noopener,noreferrer')
        }

        const ui = (
            <span
                onClick={handleClick}
                className={cn(
                    "inline-flex items-center justify-center rounded-[4px] bg-blue-500 border border-blue-600 text-white whitespace-nowrap font-semibold shadow-sm",
                    compact ? "px-2 h-6 text-[14px]" : (mini ? "px-1.5 h-4.5 text-[11px]" : "px-3 h-6 text-[14px]"),
                    clickable && "cursor-pointer hover:bg-blue-600 hover:border-blue-700 transition-all active:scale-95",
                    className
                )}
            >
                {cycleTag}
            </span>
        )

        return (
            <CustomTooltip content={entityName ? `Open details for ${entityName} in new tab filtered by cycle ${cycleTag}` : cycleTag}>
                {ui}
            </CustomTooltip>
        )
    }

    // Default Account Billing Cycle Range behavior
    if (!account || !account.cashback_config) return null

    const config = parseCashbackConfig(account.cashback_config)
    if (!config.cycleType) return null

    let refDate = typeof txnDate === 'string' ? parseISO(txnDate) : txnDate
    if (cycleTag) {
        const parsed = parseCycleTag(cycleTag)
        if (parsed) {
            refDate = new Date(parsed.year, parsed.month - 1, 15)
        }
    }

    let range: { start: Date; end: Date } | null = null
    if (config.cycleType === 'calendar_month') {
        const baseDate = cycleTag ? (() => {
            const parsed = parseCycleTag(cycleTag)
            return parsed ? new Date(parsed.year, parsed.month - 1, 1) : refDate
        })() : refDate
        range = { start: startOfMonth(baseDate), end: endOfMonth(baseDate) }
    } else {
        range = getCashbackCycleRange(config, refDate)
    }
    if (!range) return null

    const formatRange = (start: Date, end: Date) => {
        return `${format(start, 'dd-MM')} to ${format(end, 'dd-MM')}`
    }

    const formattedText = formatRange(range.start, range.end)

    const handleClick = (e: React.MouseEvent) => {
        if (!clickable) return
        e.stopPropagation() 
        e.preventDefault() 

        if (cycleTag && account?.id) {
            const url = `/accounts/${account.id}?tag=${cycleTag}`
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }

    const commonClasses = cn(
        "inline-flex items-center justify-center rounded-[4px] bg-amber-400 border border-amber-500 text-black whitespace-nowrap font-semibold shadow-sm",
        compact ? "px-2 h-6 text-[14px]" : (mini ? "px-1.5 h-4.5 text-[11px]" : "px-3 h-6 text-[14px]"),
        clickable && "cursor-pointer hover:bg-amber-500/80 hover:border-amber-600 transition-colors",
        !clickable && "cursor-help",
        className
    )

    return (
        <CustomTooltip content={entityName ? `Open details for ${entityName} in new tab filtered by cycle ${cycleTag || ''}` : formattedText}>
            <span onClick={handleClick} className={commonClasses}>
                {formattedText}
            </span>
        </CustomTooltip>
    )
}
