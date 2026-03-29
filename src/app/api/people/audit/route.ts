import { NextResponse } from 'next/server'
import { loadTransactions } from '@/services/transaction.service'
import { toPocketBaseId } from '@/services/pocketbase/server'

/**
 * Calculate final price (amount after cashback deduction)
 * Final Price = Amount - Cashback
 * Cashback = (amount * percent/100) + fixed
 */
function calculateFinalPrice(txn: any): number {
  const rawAmount = Math.abs(Number(txn.amount ?? 0))
  const percentVal = Number(txn.cashback_share_percent ?? 0)
  const fixedVal = Number(txn.cashback_share_fixed ?? 0)

  // Use share logic exclusively for person debt audit to match user's manual ledger
  const normalizedPercent = (percentVal > 1 ? percentVal / 100 : percentVal)
  const sharedCashback = (rawAmount * normalizedPercent) + fixedVal

  return Math.max(0, rawAmount - sharedCashback)
}

function resolveBaseType(type: string | null | undefined): 'income' | 'expense' | 'transfer' {
  if (type === 'repayment') return 'income'
  if (type === 'debt') return 'expense'
  if (type === 'transfer' || type === 'invest') return 'transfer'
  if (type === 'income') return 'income'
  return 'expense'
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const personId = searchParams.get('personId')
  const year = searchParams.get('year')

  if (!personId) {
    return NextResponse.json({ success: false, error: 'Person ID is required' }, { status: 400 })
  }

  try {
    // Fetch all transactions for this person
    // We fetch a large limit to ensure we get the full history for cumulative sum
    const transactions = await loadTransactions({
      personId,
      limit: 10000,
      includeVoided: false
    })

    // Sort by occurred_at ascending for cumulative sum calculation
    const sorted = [...transactions].sort((a, b) => 
      new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()
    )

    let cumulativeSum = 0
    let balanceBeforeYear = 0
    const hasYearFilter = !!year && year !== 'All Time'
    
    // Pass 1: If has year filter, we need to know the starting point.
    // However, user specifically asked to "tính 2026 thôi" (calculate 2026 only/separately)
    // So for year filter, we start from 0 if isolated, or use balanceBeforeYear if all-time consistent.
    // Let's implement isolated sum for year filter but keep the balanceBeforeYear reference.
    
    const auditTransactions = sorted.map(t => {
      const finalPrice = calculateFinalPrice(t)
      const baseType = resolveBaseType(t.type)
      
      const rawAmount = Math.abs(Number(t.amount || 0))
      const cashback = Math.max(0, rawAmount - finalPrice)
      const tag = t.tag || t.debt_cycle_tag || t.persisted_cycle_tag || 'UNTAGGED'

      const isBeforeYear = hasYearFilter && !tag.startsWith(year) && tag < year
      const isInYear = hasYearFilter && tag.startsWith(year)

      if (baseType === 'income') {
        cumulativeSum -= finalPrice
        if (isBeforeYear) balanceBeforeYear -= finalPrice
      } else if (baseType === 'expense') {
        cumulativeSum += finalPrice
        if (isBeforeYear) balanceBeforeYear += finalPrice
      }

      return {
        id: t.id,
        occurred_at: t.occurred_at,
        type: t.type,
        note: t.note,
        amount: Math.abs(Number(t.amount || 0)),
        cashback: cashback,
        finalPrice: finalPrice,
        allTimeSum: cumulativeSum,
        tag: tag,
        shop_name: t.shop_name
      }
    })

    // Pass 2: Filter by tag AND Logic (Year Aware Personal Debt)
    const isPersonalDebt = (t: any) => {
        const note = (t.note || '').toLowerCase()
        if (note.includes('tất toán') || note.includes('final') || note.includes('hết')) {
            // Include only if it has specific personal markers
            return note.includes('điện') || note.includes('nước') || note.includes('s26') || note.includes('đơn')
        }
        return true
    }

    let finalTransactions = auditTransactions.filter(t => {
        // If year is "All Time" or not set, show everything.
        // If year is specific (e.g. 2025), filter by tag starting with that year.
        const currentYearFilter = year && year !== 'All Time' ? year : null
        const isCorrectPeriod = !currentYearFilter || t.tag.startsWith(currentYearFilter)
        
        return isCorrectPeriod && isPersonalDebt(t)
    })

    // Re-calculate local cumulative sum for the filtered view
    let localSum = 0
    finalTransactions = finalTransactions.map(t => {
        const baseType = resolveBaseType(t.type)
        if (baseType === 'income') {
            localSum -= t.finalPrice
        } else if (baseType === 'expense') {
            localSum += t.finalPrice
        }
        return { ...t, cumulativeSum: localSum }
    })

    return NextResponse.json({ 
      success: true, 
      transactions: finalTransactions,
      totalSum: finalTransactions.length > 0 ? (finalTransactions[finalTransactions.length - 1] as any).cumulativeSum : 0,
      balanceBeforeYear
    })
  } catch (err: any) {
    console.error('[API:Audit] Failed:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
