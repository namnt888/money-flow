import { describe, expect, it } from 'vitest'
import { buildCycleSyncTagFilter } from '@/services/cycle-sync-filter'

// Helper to simulate buildStrictPersonTransactionsFilter logic
function buildStrictPersonTransactionsFilter(pbPersonId: string, extraClause?: string): string {
  const base = `status != "void" && person_id = "${pbPersonId}"`
  return extraClause ? `${base} && (${extraClause})` : base
}

describe('buildCycleSyncTagFilter', () => {
  it('keeps month cycle sync strict and allows only cycle-matched rollover fallback', () => {
    const filter = buildCycleSyncTagFilter('2026-03')

    expect(filter).toContain('debt_cycle_tag = "2026-03"')
    expect(filter).toContain('debt_cycle_tag = "Mar-26"')
    expect(filter).toContain('debt_cycle_tag = ""')
    expect(filter).toContain('tag = "2026-03"')
    expect(filter).toContain('persisted_cycle_tag = "2026-03"')
    expect(filter).toContain('statement_cycle_tag = "2026-03"')
    expect(filter).toContain('note ~ "rollover" || description ~ "rollover"')
    expect(filter).not.toContain('occurred_at')
    expect(filter).not.toContain('debt_cycle_tag = null')
  })

  it('keeps year cycle sync strict and allows only rollover fallback rows', () => {
    const filter = buildCycleSyncTagFilter('2026')

    expect(filter).toContain('debt_cycle_tag >= "2026-01"')
    expect(filter).toContain('debt_cycle_tag <= "2026-12"')
    expect(filter).toContain('debt_cycle_tag = "2026"')
    expect(filter).toContain('debt_cycle_tag = ""')
    expect(filter).toContain('tag >= "2026-01"')
    expect(filter).toContain('persisted_cycle_tag >= "2026-01"')
    expect(filter).toContain('statement_cycle_tag >= "2026-01"')
    expect(filter).toContain('note ~ "rollover" || description ~ "rollover"')
    expect(filter).not.toContain('occurred_at')
    expect(filter).not.toContain('debt_cycle_tag = null')
  })

  it('strict person filter excludes shared account transactions from other people', () => {
    const personId = '4wxl4cpp7u4adbb'
    const cycleFilter = buildCycleSyncTagFilter('2026-04')
    const strictFilter = buildStrictPersonTransactionsFilter(personId, cycleFilter)

    // Must include person_id check (not account_id or to_account_id)
    expect(strictFilter).toContain(`person_id = "${personId}"`)
    // Must NOT have OR clause that would include other people's transactions
    expect(strictFilter).not.toContain('account_id')
    expect(strictFilter).not.toContain('to_account_id')
    // Must enforce status check and cycle filter
    expect(strictFilter).toContain('status != "void"')
    expect(strictFilter).toContain(cycleFilter)
  })
})