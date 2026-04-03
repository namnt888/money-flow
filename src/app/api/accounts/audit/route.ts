import { NextResponse } from 'next/server'
import { loadTransactions } from '@/services/transaction.service'
import { isIncomingType } from '@/lib/account-balance'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const accountId = searchParams.get('accountId')
  const year = searchParams.get('year')

  if (!accountId) {
    return NextResponse.json({ success: false, error: 'Account ID is required' }, { status: 400 })
  }

  try {
    // Fetch all transactions for this account
    // High limit to ensure we get full history for cumulative sum
    const transactions = await loadTransactions({
      accountId,
      limit: 10000,
      includeVoided: false
    })

    // Sort by occurred_at ascending for cumulative sum calculation
    const sorted = [...transactions].sort((a, b) => 
      new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime()
    )

    let cumulativeSum = 0
    const hasYearFilter = !!year && year !== 'All Time'
    
    const auditTransactions = sorted.map(t => {
      const rawAmount = Math.abs(Number(t.amount || 0))
      const tag = t.tag || t.debt_cycle_tag || t.persisted_cycle_tag || 'UNTAGGED'

      // Logic for Account Balance / Debt accumulation
      // If we are the SOURCE account:
      //   - Incoming types (refund, payment, etc.) DECREASE debt.
      //   - Outgoing types (expense, transfer out) INCREASE debt.
      // If we are the TARGET account:
      //   - Incoming transfer DECREASES debt (for credit cards/debts) or increases balance.
      // In this app's Audit view, we show "Spend" accumulation for Credit Cards (matching People Audit pattern).
      
      let impact = 0
      if (t.account_id === accountId) {
        if (isIncomingType(t.type)) {
          impact = -rawAmount
        } else {
          impact = rawAmount
        }
      } else if (t.target_account_id === accountId) {
        impact = -rawAmount
      }

      cumulativeSum += impact

      return {
        id: t.id,
        occurred_at: t.occurred_at,
        type: t.type,
        note: t.note,
        amount: rawAmount,
        cashback: (t.cashback_share_fixed ?? 0) + (rawAmount * (t.cashback_share_percent ?? 0)),
        finalPrice: t.final_price || rawAmount,
        cumulativeSum: cumulativeSum,
        tag: tag,
        shop_name: t.shop_name
      }
    })

    // Filter by year if requested
    let finalTransactions = auditTransactions
    if (hasYearFilter) {
      finalTransactions = auditTransactions.filter(t => t.tag.startsWith(year))
      
      // Re-calculate local cumulative sum for the filtered view if isolated year view is preferred
      // However, usually we want to see the sequence within that year.
      let localSum = 0
      finalTransactions = finalTransactions.map(t => {
        // Redraw the local sum based on the filtered set's logic
        // But for consistency with People Audit, we'll just show the filtered transactions with their original sums
        // Or re-calculate if we want 0-based year view.
        // The user suggested "match the People Audit pattern", which in the API uses recalculate localSum for filtered view.
        return t
      })

      // Following People Audit pattern: re-calculate localSum for filtered view
      let lSum = 0
      finalTransactions = finalTransactions.map(t => {
        // Find the original impact
        // (Wait, we can just re-derive it)
        const t_orig = auditTransactions.find(at => at.id === t.id);
        const prev_sum = auditTransactions.indexOf(t_orig!) > 0 
           ? auditTransactions[auditTransactions.indexOf(t_orig!) - 1].cumulativeSum 
           : 0;
        const impact = t_orig!.cumulativeSum - prev_sum;
        
        lSum += impact;
        return { ...t, cumulativeSum: lSum };
      })
    }

    return NextResponse.json({ 
      success: true, 
      transactions: finalTransactions,
      totalSum: finalTransactions.length > 0 ? finalTransactions[finalTransactions.length - 1].cumulativeSum : 0
    })
  } catch (err: any) {
    console.error('[API:AccountAudit] Failed:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
