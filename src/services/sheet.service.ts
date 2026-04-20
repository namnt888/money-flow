'use server'

import { toPocketBaseId, pocketbaseGetById, pocketbaseList, pocketbaseCreate, pocketbaseUpdate } from './pocketbase/server'
import { yyyyMMToLegacyMMMYY } from '@/lib/month-tag'
import { isYYYYMM } from '@/lib/month-tag'
import { Account, Person } from '@/types/moneyflow.types'

type SheetSyncTransaction = {
  id: string
  occurred_at?: string
  date?: string
  note?: string | null
  description?: string | null
  tag?: string | null
  shop_name?: string | null
  shop_id?: string | null
  account_id?: string | null
  target_account_id?: string | null
  to_account_id?: string | null
  destination_account_id?: string | null
  amount?: number | null
  original_amount?: number | null
  cashback_share_percent?: number | null
  cashback_share_percent_input?: number | null
  cashback_share_fixed?: number | null
  cashback_share_amount?: number | null
  type?: string | null
  img_url?: string | null
  debt_cycle_tag?: string | null
  metadata?: unknown
}

function getCycleTag(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function resolveCycleTagForSheet(tag: unknown, occurredAt?: string | null): string {
  const rawTag = typeof tag === 'string' ? tag.trim() : ''
  if (isYYYYMM(rawTag)) return rawTag
  if (/^\d{4}$/.test(rawTag)) return rawTag

  const parsedDate = occurredAt ? new Date(occurredAt) : new Date()
  if (Number.isNaN(parsedDate.getTime())) {
    return getCycleTag(new Date())
  }

  return getCycleTag(parsedDate)
}

function toSheetCompatibleCycleTag(cycleTag: string): string {
  const normalized = String(cycleTag || '').trim()
  if (/^\d{4}$/.test(normalized)) {
    return `${normalized}-01`
  }
  return normalized
}

function numberOrDefault(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === '') return fallback
  if (typeof value === 'number') return Number.isFinite(value) ? value : fallback

  let text = String(value).trim()
  if (!text) return fallback

  // Accept both 1,234,567 and 1.234.567 notations from legacy/imported records.
  text = text.replace(/\s+/g, '')
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(text)) {
    text = text.replace(/\./g, '').replace(',', '.')
  } else {
    text = text.replace(/,/g, '')
  }

  const numeric = Number(text)
  return Number.isFinite(numeric) ? numeric : fallback
}

function firstFiniteNumber(values: unknown[], fallback = 0): number {
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue
    const numeric = numberOrDefault(value, Number.NaN)
    if (Number.isFinite(numeric)) return numeric
  }
  return fallback
}

function firstNonZeroNumber(values: unknown[], fallback = 0): number {
  let finiteFallback: number | null = null
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue
    const numeric = numberOrDefault(value, Number.NaN)
    if (!Number.isFinite(numeric)) continue
    if (Math.abs(numeric) > 0) return numeric
    if (finiteFallback === null) finiteFallback = numeric
  }
  return finiteFallback ?? fallback
}

function extractAmountFromFeeNote(note: unknown): number {
  const text = String(note ?? '').trim()
  if (!text) return 0

  // Examples:
  // "Điện Th2 (1.635.230 | Fee: 33.828)"
  // "ABC (166,000/6)"
  const paren = text.match(/\(([^)]+)\)/)
  if (!paren || !paren[1]) return 0

  const candidate = paren[1]
    .split('|')[0]
    .split('/')[0]
    .trim()

  return Math.abs(numberOrDefault(candidate, 0))
}

function resolveOriginalAmountForSheet(txn: any, metadata: any): number {
  const direct = firstNonZeroNumber([
    txn?.original_amount,
    txn?.amount,
    txn?.final_price,
    metadata?.original_amount,
    metadata?.principal,
    metadata?.base_amount,
    metadata?.gross_amount,
    metadata?.final_price,
  ], 0)

  if (Math.abs(direct) > 0) return Math.abs(direct)

  const fromNote = extractAmountFromFeeNote(txn?.note ?? txn?.description)
  return Math.abs(fromNote)
}

function isValidWebhook(url: string | null | undefined): url is string {
  if (!url) return false
  const trimmed = url.trim()
  return /^https?:\/\//i.test(trimmed)
}

function normalizePercent(value: number | null | undefined): number {
  if (value === null || value === undefined) return 0
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || numeric <= 0) return 0

  // If value > 1, assume it's a percentage number (5 = 5%).
  // If value <= 1, assume it's a decimal (0.05 = 5%).
  // This is a heuristic, but covers 99% of cases (nobody has >100% cashback, and nobody has <1% cashback typically indistinguishable from decimal).
  // Actually, we should standardize. 
  // The service now sends raw number (5, 8). 
  // So if we get 5, we return 0.05.
  // If we get 0.05, we return 0.05.

  return numeric > 1 ? numeric / 100 : numeric
}

function calculateTotals(txn: SheetSyncTransaction) {
  const originalAmount = Math.abs(Number(txn.original_amount ?? txn.amount ?? 0)) || 0
  const percentCandidate = firstNonZeroNumber(
    [
      txn.cashback_share_percent_input,
      txn.cashback_share_percent,
    ],
    firstFiniteNumber(
      [
        txn.cashback_share_percent,
        txn.cashback_share_percent_input,
      ],
      0,
    ),
  )

  const percentRate = normalizePercent(percentCandidate)
  const fixedBack = Math.max(0, Number(txn.cashback_share_fixed ?? 0) || 0)
  const percentBack = originalAmount * percentRate
  const totalBackCandidate =
    txn.cashback_share_amount !== null && txn.cashback_share_amount !== undefined
      ? Number(txn.cashback_share_amount)
      : percentBack + fixedBack

  const totalBack = Math.min(originalAmount, Math.max(0, totalBackCandidate))

  return {
    originalAmount,
    percentRate,
    percentBack,
    fixedBack,
    totalBack,
  }
}

function shouldExcludeFromSheet(note: string | null | undefined, metadata?: unknown): boolean {
  const normalized = String(note ?? '').toLowerCase()
  return normalized.includes('#nosync') || normalized.includes('#deprecated')
}

function extractServiceNameFromNote(note: unknown): string {
  const raw = String(note ?? '').trim()
  if (!raw) return ''

  const primarySegment = raw
    .split('|')[0]
    ?.split('\n')[0]
    ?.trim() || ''
  if (!primarySegment) return ''

  const cleaned = primarySegment
    .replace(/^shop\s*[:\-]?\s*/i, '')
    .replace(/#\S+/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[?.!]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  if (!cleaned) return ''

  const normalized = cleaned.toLowerCase()
  if (
    normalized.includes('allocated repayment') ||
    normalized.includes('volunteer shortfall repayment') ||
    normalized.includes('draft fund (pending source)')
  ) {
    return ''
  }

  const cyclePrefixed = cleaned.match(/^\d{4}-\d{2}\s+([A-Za-z][A-Za-z0-9+_.-]*)\b/)
  if (cyclePrefixed?.[1]) {
    return cyclePrefixed[1]
  }

  const servicePrefixed = cleaned.match(/^([A-Za-z][A-Za-z0-9+_.-]*)\s+\d{4}-\d{2}\b/)
  if (servicePrefixed?.[1]) {
    return servicePrefixed[1]
  }

  const slotPrefixed = cleaned.match(/^([A-Za-z][A-Za-z0-9+_.-]*)\s+slot\b/i)
  if (slotPrefixed?.[1]) {
    return slotPrefixed[1]
  }

  // Avoid leaking full numeric notes into Shop column (e.g. fee math, installment text).
  if (/\d/.test(cleaned)) {
    return ''
  }

  return cleaned
}

function getPersonRelatedAccountIds(personData: Person | null | undefined): string[] {
  const ids = [
    personData?.debt_account_id,
    personData?.default_repayment_account_id,
  ]
    .map(id => (typeof id === 'string' ? id.trim() : ''))
    .filter(Boolean)

  return Array.from(new Set(ids))
}

function buildPersonTransactionsFilter(pbPersonId: string, relatedAccountIds: string[], extraClause?: string): string {
  const accountClause = relatedAccountIds
    .map(id => `(account_id = "${id}" || to_account_id = "${id}")`)
    .join(' || ')

  const personScope = accountClause
    ? `(person_id = "${pbPersonId}" || ${accountClause})`
    : `person_id = "${pbPersonId}"`

  const base = `status != "void" && ${personScope}`
  return extraClause ? `${base} && (${extraClause})` : base
}

function extractSheetId(sheetUrl: string | null | undefined): string | null {
  if (!sheetUrl) return null
  const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return match?.[1] ?? null
}

async function getProfileSheetLink(personId: string): Promise<string | null> {
  const pbId = toPocketBaseId(personId, 'people')
  let profile: Person | null = null

  try {
    profile = await pocketbaseGetById<Person>('people', pbId, undefined, undefined, true)
  } catch {
    profile = null
  }

  if (profile) {
    const sheetLink = profile.sheet_link?.trim() ?? null
    console.log('[Sheet] Profile lookup result', {
      lookupId: personId,
      pbId,
      sheet_link: sheetLink,
    })
    if (isValidWebhook(sheetLink)) {
      return sheetLink
    }
  }

  // Fallback: Check if it's a debt account (which also has owner_id)
  // Actually, people should be enough.
  try {
    const account = await pocketbaseGetById<Account>('accounts', pbId, undefined, undefined, true)
    if (account && account.owner_id) {
      const owner = await pocketbaseGetById<Person>('people', account.owner_id as string)
      if (owner?.sheet_link) {
        const sheetLink = owner.sheet_link?.trim()
        if (isValidWebhook(sheetLink)) return sheetLink
      }
    }
  } catch {
    // The provided id is usually a person id; account lookup is best-effort only.
  }

  console.warn('[Sheet] No valid sheet link configured for', personId)
  return null
}

async function getProfileSheetInfo(personId: string): Promise<{ sheetUrl: string | null; sheetId: string | null }> {
  const pbId = toPocketBaseId(personId, 'people')
  let profile: Person | null = null

  try {
    profile = await pocketbaseGetById<Person>('people', pbId)
  } catch {
    profile = null
  }

  if (profile?.google_sheet_url) {
    const sheetUrl = profile.google_sheet_url.trim()
    return { sheetUrl, sheetId: extractSheetId(sheetUrl) }
  }

  // Fallback to account owner
  try {
    const account = await pocketbaseGetById<Account>('accounts', pbId)
    if (account?.owner_id) {
      const owner = await pocketbaseGetById<Person>('people', account.owner_id as string)
      if (owner?.google_sheet_url) {
        const sheetUrl = owner.google_sheet_url.trim()
        return { sheetUrl, sheetId: extractSheetId(sheetUrl) }
      }
    }
  } catch {
    // Ignore account lookup failure for person ids.
  }

  return { sheetUrl: null, sheetId: null }
}

type SheetPostResult = {
  success: boolean
  json?: Record<string, any> | null
  message?: string
}

async function postToSheet(sheetLink: string, payload: Record<string, unknown>): Promise<SheetPostResult> {
  const response = await fetch(sheetLink, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  let json: Record<string, any> | null = null
  try {
    json = (await response.json()) as Record<string, any>
  } catch (error) {
    json = null
  }

  if (!response.ok) {
    return {
      success: false,
      json,
      message: json?.error ?? `Sheet response ${response.status}`,
    }
  }

  if (json && json.ok === false) {
    return {
      success: false,
      json,
      message: json.error ?? 'Sheet returned error',
    }
  }

  return { success: true, json }
}

function buildPayload(txn: SheetSyncTransaction, action: 'create' | 'delete' | 'update') {
  const resolvedOccurredAt = txn.occurred_at ?? txn.date ?? null
  const resolvedTag = resolveCycleTagForSheet(txn.debt_cycle_tag, resolvedOccurredAt)
  const { originalAmount, percentRate, fixedBack, totalBack } = calculateTotals(txn)

  // If amount is negative, it's a credit to the debt account (Repayment) -> Type "In"
  // If amount is positive, it's a debit to the debt account (Lending) -> Type "Debt"
  // Allow override via txn.type
  const type = txn.type ?? ((txn.amount ?? 0) < 0 ? 'In' : 'Debt');

  return {
    action: action === 'update' ? 'edit' : action, // Map 'update' to 'edit' for backend if needed, or keep 'update'
    id: txn.id,
    type: type,
    date: resolvedOccurredAt,
    occurred_at: resolvedOccurredAt, // Legacy compatibility
    shop: txn.shop_name ?? '',
    notes: txn.note ?? '',
    note: txn.note ?? '', // Legacy compatibility
    amount: originalAmount,
    // We want to send the raw number (0-100).
    // If input was 5, normalizePercent made it 0.05.
    // So we assume 'percentRate' is ALWAYS decimal [0..1].
    // We multiply by 100 to send to sheet.
    percent_back: Math.round(percentRate * 100 * 100) / 100, // Round to 2 decimals for safety
    fixed_back: fixedBack,
    total_back: totalBack,
    tag: resolvedTag,
    debt_cycle_tag: txn.debt_cycle_tag ?? undefined,
    img: txn.img_url ?? undefined
  }
}

export async function syncTransactionToSheet(
  personId: string,
  txn: SheetSyncTransaction,
  action: 'create' | 'delete' | 'update' = 'create'
) {
  try {
    // Check for #nosync or #deprecated tags
    if (shouldExcludeFromSheet(txn.note, txn.metadata)) {
      // If tagged as nosync, we treat it as a deletion from the sheet
      action = 'delete'
    }

    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) return

    const pbPersonId = toPocketBaseId(personId, 'people')
    const personData = await pocketbaseGetById<Person>('people', pbPersonId)
    if (!personData) return

    const showBankAccount = personData.sheet_show_bank_account ?? false
    const manualBankInfo = personData.sheet_bank_info ?? ''
    const linkedBankId = personData.sheet_linked_bank_id
    const showQrImage = personData.sheet_show_qr_image ?? false
    const qrImageUrl = personData.sheet_full_img ?? null

    let resolvedBankInfo = manualBankInfo
    if (showBankAccount && linkedBankId) {
      try {
        const acc = await pocketbaseGetById<Account>('accounts', linkedBankId, undefined, undefined, true)
        if (acc) {
          const parts = [
            acc.name,
            acc.account_number,
            acc.receiver_name
          ].filter(Boolean)
          resolvedBankInfo = parts.join(' ') || manualBankInfo
        }
      } catch (error) {
        console.warn('[syncTransactionToSheet] linked bank account lookup failed, fallback to manual bank info', {
          personId,
          linkedBankId,
          error: (error as any)?.message,
        })
      }
    }

    console.log('[syncTransactionToSheet] Person sheet preferences:', {
      personId,
      showBankAccount,
      resolvedBankInfo,
      showQrImage,
      qrImageUrl: qrImageUrl ? '(URL set)' : '(not set)'
    })

    const repaymentServiceName = txn.type === 'repayment'
      ? extractServiceNameFromNote(txn.note ?? txn.description)
      : ''
    let resolvedShopName = repaymentServiceName || txn.shop_name || ''
    if (!resolvedShopName && txn.shop_id) {
      try {
        const shopRecord = await pocketbaseGetById<{ name?: string | null }>('shops', txn.shop_id)
        resolvedShopName = shopRecord?.name ?? ''
      } catch {
        resolvedShopName = ''
      }
    }

    if (!resolvedShopName) {
      resolvedShopName = extractServiceNameFromNote(txn.note ?? txn.description)
    }

    // Repayment/Service rows: ensuring shop_name stays as is if provided.
    // If not provided, fallback to target bank name for sheet column K.
    if (!resolvedShopName) {
      const fallbackAccountId =
        txn.type === 'repayment'
          ? (txn.target_account_id || txn.to_account_id || txn.destination_account_id || txn.account_id || null)
          : (txn.account_id || null)
      if (fallbackAccountId) {
        try {
          const accountRecord = await pocketbaseGetById<{ name?: string | null }>('accounts', fallbackAccountId)
          resolvedShopName = accountRecord?.name ?? ''
        } catch {
          resolvedShopName = ''
        }
      }
    }

    let cycleTag = resolveCycleTagForSheet(txn.debt_cycle_tag, txn.occurred_at ?? txn.date ?? null)
    if (personData.is_master_sheet_enabled && cycleTag && isYYYYMM(cycleTag)) {
      cycleTag = cycleTag.split('-')[0] // '2026-03' -> '2026'
    }

    const payload = {
      ...buildPayload({
        ...txn,
        tag: cycleTag, // Pass the truncated tag to builder for consistency
        shop_name: resolvedShopName,
      }, action),
      person_id: personId,
      cycle_tag: cycleTag,
      bank_account: showBankAccount ? resolvedBankInfo : '', // Send empty to clear if disabled
      img: showQrImage && qrImageUrl ? qrImageUrl : '' // Send empty to clear if disabled
    }

    console.log(`[Sheet Sync] Sending payload to ${personId}:`, {
      action: payload.action,
      id: payload.id,
      cycle_tag: payload.cycle_tag,
      shop: payload.shop,
      amount: payload.amount,
      note: payload.note,
      type: payload.type
    })

    const result = await postToSheet(sheetLink, payload)
    if (!result.success) {
      console.error('Sheet sync failed:', result.message ?? 'Sheet sync failed')
    }
  } catch (err) {
    console.error('Sheet sync failed:', err)
  }
}

export async function testConnection(personId: string) {
  try {
    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) {
      return { success: false, message: 'No valid sheet link configured' }
    }

    const today = new Date().toISOString().slice(0, 10)
    const payload = {
      action: 'create',
      type: 'TEST-CONNECTION',
      amount: 0,
      shop: 'MoneyFlow Bot',
      notes: 'Connection successful!',
      date: today,
    }

    const result = await postToSheet(sheetLink, payload)
    if (!result.success) {
      return { success: false, message: result.message ?? 'Sheet create failed' }
    }
    return { success: true }
  } catch (err) {
    console.error('Test connection failed:', err)
    return { success: false, message: 'Failed to send test signal' }
  }
}

export async function syncAllTransactions(personId: string) {
  try {
    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) {
      return { success: false, message: 'No valid sheet link configured' }
    }

    const pbPersonId = toPocketBaseId(personId, 'people')

    // Fetch person's sheet preferences and account relations once to keep filters consistent.
    const personData = await pocketbaseGetById<Person>('people', pbPersonId)
    const relatedAccountIds = getPersonRelatedAccountIds(personData)

    const data = await pocketbaseList('transactions', {
      filter: buildPersonTransactionsFilter(pbPersonId, relatedAccountIds),
      expand: 'shop_id,account_id,to_account_id,category_id',
      sort: 'occurred_at'
    })

    // Person sheet preferences for bank info & QR

    const showBankAccount = personData?.sheet_show_bank_account ?? false
    const manualBankInfo = personData?.sheet_bank_info ?? ''
    const linkedBankId = personData?.sheet_linked_bank_id
    const showQrImage = personData?.sheet_show_qr_image ?? false
    const qrImageUrl = personData?.sheet_full_img ?? null

    let resolvedBankInfo = manualBankInfo
    if (showBankAccount && linkedBankId) {
      try {
        const acc = await pocketbaseGetById<Account>('accounts', linkedBankId)
        if (acc) {
          const parts = [
            acc.name,
            acc.account_number,
            acc.receiver_name
          ].filter(Boolean)
          resolvedBankInfo = parts.join(' ') || manualBankInfo
        }
      } catch (error) {
        console.warn('[syncAllTransactions] linked bank account lookup failed, fallback to manual bank info', {
          personId,
          linkedBankId,
          error: (error as any)?.message,
        })
      }
    }

    const rows = (data.items || []).map(txn => {
      const expanded = (txn as any).expand || {}
      const metadata = (txn as any).metadata && typeof (txn as any).metadata === 'object'
        ? (txn as any).metadata
        : {}
      const occurredAt = (txn as any).occurred_at || (txn as any).date
      const resolvedOriginalAmount = resolveOriginalAmountForSheet(txn as any, metadata)

      return {
        id: (txn as any).id,
        occurred_at: occurredAt,
        note: (txn as any).note || (txn as any).description,
        description: (txn as any).description || (txn as any).note,
        status: (txn as any).status,
        tag: resolveCycleTagForSheet((txn as any).debt_cycle_tag, occurredAt),
        type: (txn as any).type,
        amount: (txn as any).amount,
        original_amount: resolvedOriginalAmount,
        debt_cycle_tag: (txn as any).debt_cycle_tag,
        metadata,
        cashback_share_percent: numberOrDefault(
          firstNonZeroNumber([
            (txn as any).cashback_share_percent_input,
            (txn as any).cashback_share_percent,
            (txn as any).percent_back,
            (txn as any).cashback_percent,
            metadata.cashback_share_percent_input,
            metadata.cashback_share_percent,
            metadata.percent_back,
          ], firstFiniteNumber([
            (txn as any).cashback_share_percent,
            metadata.cashback_share_percent,
            (txn as any).cashback_share_percent_input,
            metadata.cashback_share_percent_input,
          ], 0)),
          0,
        ),
        cashback_share_percent_input: numberOrDefault(
          firstFiniteNumber([
            (txn as any).cashback_share_percent_input,
            (txn as any).percent_back,
            metadata.cashback_share_percent_input,
            metadata.percent_back,
          ], 0),
          0,
        ),
        cashback_share_fixed: numberOrDefault(
          firstNonZeroNumber([
            (txn as any).cashback_share_fixed,
            (txn as any).fixed_back,
            metadata.cashback_share_fixed,
            metadata.fixed_back,
          ], firstFiniteNumber([
            (txn as any).cashback_share_fixed,
            metadata.cashback_share_fixed,
          ], 0)),
          0,
        ),
        cashback_share_amount: numberOrDefault(
          (txn as any).cashback_share_amount
            ?? metadata.cashback_share_amount
            ?? metadata.total_back,
          0,
        ),
        shop_id: (txn as any).shop_id,
        shops: expanded.shop_id ? { name: expanded.shop_id.name } : null,
        account_id: (txn as any).account_id,
        accounts: expanded.account_id ? { name: expanded.account_id.name } : null,
        target_account_id: (txn as any).target_account_id || (txn as any).to_account_id,
        target_accounts: (expanded.target_account_id || expanded.to_account_id) ? { name: (expanded.target_account_id?.name || expanded.to_account_id?.name) } : null,
        categories: expanded.category_id ? { name: expanded.category_id.name } : null,
      }
    })

    const eligibleRows = rows.filter(txn => !shouldExcludeFromSheet(txn.note, txn.metadata))

    console.log(`[SheetSync] syncAllTransactions for personId: ${personId}. Found ${rows.length} transactions, eligible ${eligibleRows.length} after #nosync/#deprecated filtering.`)

    // Group transactions by cycle tag
    const cycleMap = new Map<string, typeof rows>()

    for (const txn of eligibleRows) {
      let cycleTag = resolveCycleTagForSheet(txn.debt_cycle_tag, txn.occurred_at)
      if (personData?.is_master_sheet_enabled && cycleTag && isYYYYMM(cycleTag)) {
        cycleTag = cycleTag.split('-')[0]
      }
      if (!cycleMap.has(cycleTag)) {
        cycleMap.set(cycleTag, [])
      }
      cycleMap.get(cycleTag)!.push(txn)
    }

    let totalSynced = 0

    // Sync each cycle as a batch
    for (const [cycleTag, cycleTxns] of cycleMap.entries()) {
      const rowsPayload = cycleTxns.map(txn => {
        const shopData = txn.shops as any
        const serviceFromNote = extractServiceNameFromNote(txn.note || txn.description)
        
        // For repayments: prioritize account name, then shop, never use note service name
        // For normal txns: prioritize shop, then service from note
        let shopName = txn.type === 'repayment'
          ? ((Array.isArray(shopData) ? shopData[0]?.name : shopData?.name))
          : ((Array.isArray(shopData) ? shopData[0]?.name : shopData?.name) || serviceFromNote)

        // Fallback for Repayment/Transfer if shop is empty -> Use Account Name
        if (!shopName) {
          const categoryName = (txn.categories as any)?.name
          if (txn.note?.toLowerCase().startsWith('rollover') || categoryName === 'Rollover') {
            shopName = 'Rollover'
          } else {
            const accData = txn.accounts as any
            const sourceName = (Array.isArray(accData) ? accData[0]?.name : accData?.name) ?? ''
            const targetData = (txn as any).target_accounts as any
            const targetName = (Array.isArray(targetData) ? targetData[0]?.name : targetData?.name) ?? ''
            shopName = txn.type === 'repayment' ? (targetName || sourceName) : sourceName
          }
        }

        // Pass the raw transaction fields that buildPayload needs
        return buildPayload({
          ...txn,
          shop_name: shopName
        }, 'create')
      })

      const payload = {
        action: 'syncTransactions',
        personId: personId,
        cycleTag: cycleTag,
        rows: rowsPayload,
        bank_account: showBankAccount ? resolvedBankInfo : '',
        img: showQrImage && qrImageUrl ? qrImageUrl : ''
      }

      const result = await postToSheet(sheetLink, payload)
      if (!result.success) {
        return { success: false, message: result.message ?? `Sheet sync failed for cycle ${cycleTag}` }
      }

      totalSynced += rowsPayload.length
    }

    return { success: true, count: totalSynced }
  } catch (err) {
    console.error('Sync all transactions failed:', err)
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Sync failed',
    }
  }
}

type CycleSheetResult = {
  success: boolean
  sheetUrl?: string | null
  sheetId?: string | null
  message?: string
}


export async function createTestSheet(personId: string): Promise<CycleSheetResult> {
  try {
    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) {
      return { success: false, message: 'No valid sheet link configured' }
    }
    const sheetInfo = await getProfileSheetInfo(personId)

    const response = await postToSheet(sheetLink, {
      action: 'create_test_sheet',
      person_id: personId,
      sheet_id: sheetInfo.sheetId ?? undefined,
      sheet_url: sheetInfo.sheetUrl ?? undefined,
    })

    if (!response.success) {
      return { success: false, message: response.message ?? 'Test create failed' }
    }

    return {
      success: true,
      sheetUrl: (response.json?.sheetUrl as string) ?? null,
      sheetId: (response.json?.sheetId as string) ?? null
    }
  } catch (err) {
    return { success: false, message: 'Unexpected error testing sheet' }
  }
}

export async function createCycleSheet(personId: string, cycleTag: string): Promise<CycleSheetResult> {
  try {
    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) {
      return { success: false, message: 'No valid sheet link configured' }
    }
    const sheetInfo = await getProfileSheetInfo(personId)
    const sheetCycleTag = toSheetCompatibleCycleTag(cycleTag)
    const isMasterSheet = await (async () => {
      try {
        const pbId = toPocketBaseId(personId, 'people')
        const personData = await pocketbaseGetById<Person>('people', pbId)
        return personData?.is_master_sheet_enabled === true
      } catch {
        return false
      }
    })()

    const response = await postToSheet(sheetLink, {
      action: 'create_cycle_sheet',
      person_id: personId,
      cycle_tag: sheetCycleTag,
      master_sheet: isMasterSheet,
      sheet_id: sheetInfo.sheetId ?? undefined,
      sheet_url: sheetInfo.sheetUrl ?? undefined,
    })

    if (!response.success) {
      return { success: false, message: response.message ?? 'Failed to create cycle sheet' }
    }

    const json = response.json ?? null
    const sheetUrl = (json?.sheetUrl ?? json?.sheet_url ?? null) as string | null
    const sheetId = (json?.sheetId ?? json?.sheet_id ?? null) as string | null

    return { success: true, sheetUrl, sheetId }
  } catch (error) {
    console.error('Create cycle sheet failed:', error)
    return { success: false, message: 'Failed to create cycle sheet' }
  }
}


export async function syncCycleTransactions(
  personId: string,
  cycleTag: string,
  sheetId?: string | null
) {
  try {
    const pbId = toPocketBaseId(personId, 'people')
    const personData: any = await pocketbaseGetById('people', pbId)
    const relatedAccountIds = getPersonRelatedAccountIds(personData)
    let tagFilter = ''

    // Parse cycleTag to get filter
    const yearMatch = cycleTag.match(/^(\d{4})$/)
    const monthMatch = cycleTag.match(/^(\d{4})-(\d{2})$/)

    if (yearMatch) {
      // Full year like "2026"
      const year = yearMatch[1]
      const nextYear = String(Number(year) + 1)
      tagFilter = `((debt_cycle_tag >= "${year}-01" && debt_cycle_tag <= "${year}-12") || debt_cycle_tag = "${year}") || ((debt_cycle_tag = "" || debt_cycle_tag = null) && occurred_at >= "${year}-01-01 00:00:00.000Z" && occurred_at < "${nextYear}-01-01 00:00:00.000Z")`
    } else if (monthMatch) {
      // Specific month like "2026-03"
      const year = Number(monthMatch[1])
      const month = Number(monthMatch[2])
      const nextDate = new Date(Date.UTC(year, month, 1))
      const nextMonth = `${nextDate.getUTCFullYear()}-${String(nextDate.getUTCMonth() + 1).padStart(2, '0')}`
      const legacyTag = yyyyMMToLegacyMMMYY(cycleTag)
      const tags = legacyTag && legacyTag !== cycleTag ? [cycleTag, legacyTag] : [cycleTag]
      const debtTagMatches = tags.map(t => `debt_cycle_tag = "${t}"`).join(' || ')
      
      // FIX: For cycle-specific sync, ONLY include transactions where debt_cycle_tag
      // explicitly matches the requested cycle (or its legacy alias).
      // Do NOT include transactions with empty/null debt_cycle_tag via occurred_at fallback,
      // because those are ambiguous and may belong to different cycles.
      // The occurred_at fallback is intentionally removed here to prevent pollution
      // from adjacent cycles (e.g., 2026-04 transactions appearing in 2026-03 sync).
      // See: Bug A — Sync sai cycleTag (cascade sang 2026-04)
      tagFilter = debtTagMatches
    } else {
      // Legacy format
      const legacyTag = yyyyMMToLegacyMMMYY(cycleTag)
      const tags = legacyTag && legacyTag !== cycleTag ? [cycleTag, legacyTag] : [cycleTag]
      tagFilter = tags.map(t => `debt_cycle_tag = "${t}"`).join(' || ')
    }

    const data = await pocketbaseList('transactions', {
      filter: buildPersonTransactionsFilter(pbId, relatedAccountIds, tagFilter),
      expand: 'shop_id,account_id,to_account_id,category_id',
      sort: 'occurred_at'
    })

    if (!data) {
      console.error('Failed to load cycle transactions from PB')
      return { success: false, message: 'Failed to load transactions' }
    }

    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) return { success: false, message: 'No valid sheet link' }

    const rows = (data.items as any[])
      .filter(txn => !shouldExcludeFromSheet(txn.note || txn.description, txn.metadata))
      .map(txn => {
        const expanded = txn.expand || {}
        const metadata = txn.metadata && typeof txn.metadata === 'object' ? txn.metadata : {}
        const occurredAt = txn.occurred_at || txn.date
        const serviceFromNote = extractServiceNameFromNote(txn.note || txn.description)
        
        // For repayments: prioritize target account, then shop, never use note
        // For normal txns: prioritize shop, then service from note
        let shopName = txn.type === 'repayment'
          ? (expanded.to_account_id?.name || expanded.shop_id?.name)
          : (expanded.shop_id?.name || serviceFromNote)

        if (!shopName) {
          const categoryName = expanded.category_id?.name
          if (txn.note?.toLowerCase().startsWith('rollover') || categoryName === 'Rollover') {
            shopName = 'Rollover'
          } else {
            const sourceName = expanded.account_id?.name || ''
            const targetName = expanded.to_account_id?.name || ''
            shopName = txn.type === 'repayment' ? (targetName || sourceName) : (sourceName || '')
          }
        }

        // Pass the raw transaction fields that buildPayload needs
        const resolvedOriginalAmount = resolveOriginalAmountForSheet(txn, metadata)

        return buildPayload({
          ...txn,
          debt_cycle_tag: txn.debt_cycle_tag,
          occurred_at: occurredAt,
          tag: resolveCycleTagForSheet(txn.debt_cycle_tag, occurredAt),
          original_amount: resolvedOriginalAmount,
          cashback_share_percent: numberOrDefault(
            firstNonZeroNumber([
              txn.cashback_share_percent_input,
              txn.cashback_share_percent,
              txn.percent_back,
              txn.cashback_percent,
              metadata.cashback_share_percent_input,
              metadata.cashback_share_percent,
              metadata.percent_back,
            ], firstFiniteNumber([
              txn.cashback_share_percent,
              metadata.cashback_share_percent,
              txn.cashback_share_percent_input,
              metadata.cashback_share_percent_input,
            ], 0)),
            0,
          ),
          cashback_share_percent_input: numberOrDefault(
            firstFiniteNumber([
              txn.cashback_share_percent_input,
              txn.percent_back,
              metadata.cashback_share_percent_input,
              metadata.percent_back,
            ], 0),
            0,
          ),
          cashback_share_fixed: numberOrDefault(
            firstNonZeroNumber([
              txn.cashback_share_fixed,
              txn.fixed_back,
              metadata.cashback_share_fixed,
              metadata.fixed_back,
            ], firstFiniteNumber([
              txn.cashback_share_fixed,
              metadata.cashback_share_fixed,
            ], 0)),
            0,
          ),
          cashback_share_amount: numberOrDefault(
            txn.cashback_share_amount
              ?? metadata.cashback_share_amount
              ?? metadata.total_back,
            0,
          ),
          shop_name: shopName
        }, 'create')
      })

    const missingIdRows = rows.filter((r: any) => !r?.id)
    const zeroAmountRows = rows.filter((r: any) => Number(r?.amount || 0) === 0)

    console.log('[syncCycleTransactions] Mapped rows diagnostics:', {
      total: rows.length,
      missingId: missingIdRows.length,
      zeroAmount: zeroAmountRows.length,
      sample: rows.slice(0, 5).map((r: any) => ({
        id: r.id,
        date: r.date,
        debt_cycle_tag: r.debt_cycle_tag,
        resolved_tag: r.tag,
        amount: r.amount,
        percent_back: r.percent_back,
        fixed_back: r.fixed_back,
        notes: r.notes,
      }))
    })
    
    // Log raw transactions for debugging
    if (data.items && data.items.length > 0) {
      console.log('[syncCycleTransactions] Raw PB rows sample:', data.items.slice(0, 3).map((t: any) => ({
        id: t.id,
        occurred_at: t.occurred_at,
        debt_cycle_tag: t.debt_cycle_tag,
        tag: t.tag,
      })))
    }

    const sheetCycleTag = toSheetCompatibleCycleTag(cycleTag)

    console.log(`[Sheet Sync] Sending ${rows.length} mapped transactions to ${personId} for cycle ${cycleTag} (sheet cycle ${sheetCycleTag})`)

    const showBankAccount = personData?.sheet_show_bank_account ?? false
    const manualBankInfo = personData?.sheet_bank_info ?? ''
    const linkedBankId = personData?.sheet_linked_bank_id
    const showQrImage = personData?.sheet_show_qr_image ?? false
    const qrImageUrl = personData?.sheet_full_img ?? null

    let resolvedBankInfo = manualBankInfo
    if (showBankAccount && linkedBankId) {
      try {
        const acc = await pocketbaseGetById<Account>('accounts', linkedBankId)
        if (acc) {
          const parts = [
            acc.name,
            acc.account_number,
            acc.receiver_name
          ].filter(Boolean)
          resolvedBankInfo = parts.join(' ') || manualBankInfo
        }
      } catch (error) {
        console.warn('[syncCycleTransactions] linked bank account lookup failed, fallback to manual bank info', {
          personId,
          linkedBankId,
          error: (error as any)?.message,
        })
      }
    }

    console.log('[syncCycleTransactions] Person sheet preferences:', {
      personId,
      showBankAccount,
      resolvedBankInfo,
      showQrImage,
      qrImageUrl: qrImageUrl ? '(URL set)' : '(not set)'
    })

    const payload = {
      action: 'syncTransactions',
      person_id: personId,
      cycle_tag: sheetCycleTag,
      master_sheet: personData?.is_master_sheet_enabled === true,
      sheet_id: sheetId ?? undefined,
      rows: rows,
      bank_account: showBankAccount ? resolvedBankInfo : '',
      img: showQrImage && qrImageUrl ? qrImageUrl : ''
    }

    console.log('[syncCycleTransactions] Final payload:', { ...payload, rows: `[${payload.rows.length} rows]` })

    const result = await postToSheet(sheetLink, payload)

    if (!result.success) {
      return { success: false, message: result.message ?? 'Sheet sync failed' }
    }

    return {
      success: true,
      count: rows.length,
      syncedCount: result.json?.syncedCount,
      manualPreserved: result.json?.manualPreserved,
      totalRows: result.json?.totalRows
    }
  } catch (error) {
    console.error('Sync cycle transactions failed:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Sync failed',
    }
  }
}

/**
 * Auto-sync cycle sheet after service distribution
 * Only triggers if:
 * 1. Person has sheet_link configured
 * 2. Cycle sheet doesn't exist yet
 */
export async function autoSyncCycleSheetIfNeeded(personId: string, cycleTag: string): Promise<void> {
  try {
    console.log(`[AutoSync] Checking if auto-sync needed for ${personId} / ${cycleTag}`)

    // 1. Check if person has sheet_link configured
    const sheetLink = await getProfileSheetLink(personId)
    if (!sheetLink) {
      console.log(`[AutoSync] Skipping ${personId}: No sheet link configured`)
      return
    }

    // 2. Check if cycle sheet already exists in PB
    const pbId = toPocketBaseId(personId, 'people')
    const existingList = await pocketbaseList('person_cycle_sheets', {
      filter: `person_id = "${pbId}" && cycle_tag = "${cycleTag}"`
    })
    const existing = existingList.items[0] as any

    if (existing?.sheet_id || existing?.sheet_url) {
      console.log(`[AutoSync] Skipping ${personId}: Cycle sheet already exists`)
      return
    }

    console.log(`[AutoSync] Triggering auto-sync for ${personId} / ${cycleTag}`)

    // 3. Create cycle sheet
    const createResult = await createCycleSheet(personId, cycleTag)
    if (!createResult.success) {
      console.error(`[AutoSync] Failed to create cycle sheet: ${createResult.message}`)
      return
    }

    // 4. Sync transactions
    const syncResult = await syncCycleTransactions(personId, cycleTag, createResult.sheetId)
    if (!syncResult.success) {
      console.error(`[AutoSync] Failed to sync transactions: ${syncResult.message}`)
      return
    }

    // 5. Update PB
    const payload = {
      person_id: pbId,
      cycle_tag: cycleTag,
      sheet_id: createResult.sheetId,
      sheet_url: createResult.sheetUrl,
    }

    if (existing?.id) {
        await pocketbaseUpdate('person_cycle_sheets', existing.id, payload)
    } else {
        await pocketbaseCreate('person_cycle_sheets', payload)
    }

    console.log(`[AutoSync] Successfully auto-synced ${personId} / ${cycleTag}`)
  } catch (error) {
    console.error(`[AutoSync] Error for ${personId} / ${cycleTag}:`, error)
    // Silent fail - don't throw, just log
  }
}
