import { NextResponse } from 'next/server'
import { getPersonWithSubs } from '@/services/people.service'
import { MonthlyDebtSummary } from '@/types/moneyflow.types'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const personId = searchParams.get('personId')

  if (!personId) {
    return NextResponse.json({ success: false, error: 'Missing personId', monthly_debts: [] }, { status: 400 })
  }

  try {
    const person = await getPersonWithSubs(personId)
    const monthlyDebts: MonthlyDebtSummary[] = (person?.cycle_stats ?? [])
      .filter((cycle) => Number(cycle?.remains ?? 0) > 0)
      .sort((a, b) => String(b?.tag || '').localeCompare(String(a?.tag || '')))
      .map((cycle) => ({
        tag: cycle.tag,
        tagLabel: cycle.tag,
        amount: Number(cycle.remains || 0),
        total_debt: Number(cycle.baseLend || 0),
        total_cashback: Number(cycle.cashback || 0),
        total_repaid: Number(cycle.repaid || 0),
        status: Number(cycle.remains || 0) <= 0 ? 'settled' : 'active',
      }))

    return NextResponse.json({
      success: true,
      monthly_debts: monthlyDebts,
    })
  } catch (error) {
    console.error('[api/people/debts] failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load debts', monthly_debts: [] }, { status: 500 })
  }
}
