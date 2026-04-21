export function buildCycleSyncTagFilter(cycleTag: string): string {
  const yearMatch = cycleTag.match(/^(\d{4})$/)
  const monthMatch = cycleTag.match(/^(\d{4})-(\d{2})$/)

  if (yearMatch) {
    const year = yearMatch[1]
    const monthTagRange = `(debt_cycle_tag >= "${year}-01" && debt_cycle_tag <= "${year}-12")`
    const yearAlias = `debt_cycle_tag = "${year}"`
    const rolloverYearMatch = buildRolloverYearMatch(year)

    // Keep cycle sync strict while allowing rollover rows that intentionally keep
    // debt_cycle_tag blank but still carry cycle metadata in tag fields.
    return `(${monthTagRange} || ${yearAlias} || ${rolloverYearMatch})`
  }

  const legacyMonthTag = yyyyMMToLegacyMMMYY(cycleTag)
  const tags = legacyMonthTag && legacyMonthTag !== cycleTag ? [cycleTag, legacyMonthTag] : [cycleTag]
  const debtTagMatch = tags.map((tag) => `debt_cycle_tag = "${tag}"`).join(' || ')
  const rolloverMonthMatch = buildRolloverMonthMatch(tags)

  return `(${debtTagMatch} || ${rolloverMonthMatch})`
}

function buildRolloverMonthMatch(tags: string[]): string {
  const cycleFieldMatch = ['tag', 'persisted_cycle_tag', 'statement_cycle_tag']
    .flatMap((field) => tags.map((tag) => `${field} = "${tag}"`))
    .join(' || ')

  return `((debt_cycle_tag = "") && (${cycleFieldMatch}) && (note ~ "rollover" || description ~ "rollover"))`
}

function buildRolloverYearMatch(year: string): string {
  const cycleFieldMatch = ['tag', 'persisted_cycle_tag', 'statement_cycle_tag']
    .map((field) => `(((${field} >= "${year}-01" && ${field} <= "${year}-12") || ${field} = "${year}"))`)
    .join(' || ')

  return `((debt_cycle_tag = "") && (${cycleFieldMatch}) && (note ~ "rollover" || description ~ "rollover"))`
}

function yyyyMMToLegacyMMMYY(tag: string): string | null {
  const match = tag.match(/^(\d{4})-(\d{2})$/)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return null

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthName = monthNames[month - 1]
  return `${monthName}-${String(year).slice(-2)}`
}