import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../../.env.local'), override: true })

const PB_URL = process.env.POCKETBASE_URL || process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://api-db.reiwarden.io.vn'
const PB_EMAIL = (process.env.POCKETBASE_DB_EMAIL || '').trim()
const PB_PASSWORD = (process.env.POCKETBASE_DB_PASSWORD || '').trim()

const isApply = process.argv.includes('--apply')
const perPage = 200

if (!PB_EMAIL || !PB_PASSWORD) {
  console.error('[pb-migrate] Missing POCKETBASE_DB_EMAIL or POCKETBASE_DB_PASSWORD in .env.local')
  process.exit(1)
}

function isYYYYMM(value) {
  return /^\d{4}-\d{2}$/.test(value)
}

function toYYYYMM(dateLike) {
  const dt = new Date(dateLike)
  if (Number.isNaN(dt.getTime())) return null
  const year = dt.getUTCFullYear()
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function canonicalDebtCycleTag(rawTag, occurredAt, fallbackDate) {
  const raw = String(rawTag ?? '').trim()
  if (isYYYYMM(raw)) return raw

  const derived = toYYYYMM(occurredAt || fallbackDate)
  return derived || null
}

async function pbAuth() {
  const res = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: PB_EMAIL, password: PB_PASSWORD }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(`Auth failed [${res.status}]: ${JSON.stringify(json)}`)
  }

  return json.token
}

async function listAllTransactions(token) {
  const all = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const filter = encodeURIComponent("person_id != ''")
    const fields = encodeURIComponent('id,person_id,type,status,date,occurred_at,debt_cycle_tag,tag')
    const url = `${PB_URL}/api/collections/pvl_txn_001/records?page=${page}&perPage=${perPage}&sort=date,id&filter=${filter}&fields=${fields}`
    const res = await fetch(url, {
      headers: { Authorization: token },
    })
    const json = await res.json()

    if (!res.ok) {
      throw new Error(`List failed page=${page} [${res.status}]: ${JSON.stringify(json)}`)
    }

    all.push(...(json.items || []))
    totalPages = json.totalPages || 1
    page += 1
  }

  return all
}

async function patchTransaction(token, id, body) {
  const res = await fetch(`${PB_URL}/api/collections/pvl_txn_001/records/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PATCH failed id=${id} [${res.status}]: ${text}`)
  }
}

async function main() {
  console.log(`[pb-migrate] backfill debt cycle tag mode=${isApply ? 'APPLY' : 'DRY-RUN'}`)
  const token = await pbAuth()

  const rows = await listAllTransactions(token)
  console.log(`[pb-migrate] loaded transactions: ${rows.length}`)

  const stats = {
    total: rows.length,
    candidate: 0,
    updated: 0,
    debtFilled: 0,
    tagSynced: 0,
    skippedNoDate: 0,
    errors: 0,
  }

  const sampleUpdates = []

  for (const row of rows) {
    const currentDebt = String(row.debt_cycle_tag ?? '').trim()
    const currentTag = String(row.tag ?? '').trim()
    const resolvedDebt = canonicalDebtCycleTag(currentDebt, row.occurred_at, row.date)

    if (!resolvedDebt) {
      stats.skippedNoDate += 1
      continue
    }

    const nextDebt = resolvedDebt
    const nextTag = resolvedDebt

    const shouldUpdateDebt = currentDebt !== nextDebt
    const shouldUpdateTag = currentTag !== nextTag

    if (!shouldUpdateDebt && !shouldUpdateTag) continue

    stats.candidate += 1
    if (shouldUpdateDebt) stats.debtFilled += 1
    if (shouldUpdateTag) stats.tagSynced += 1

    if (sampleUpdates.length < 20) {
      sampleUpdates.push({
        id: row.id,
        currentDebt,
        nextDebt,
        currentTag,
        nextTag,
        date: row.occurred_at || row.date || null,
      })
    }

    if (!isApply) continue

    try {
      await patchTransaction(token, row.id, {
        debt_cycle_tag: nextDebt,
        tag: nextTag,
      })
      stats.updated += 1
    } catch (error) {
      stats.errors += 1
      console.error(`[pb-migrate] update error id=${row.id}:`, String(error))
    }
  }

  console.log('[pb-migrate] summary', stats)
  console.log('[pb-migrate] sample updates', sampleUpdates)

  if (!isApply) {
    console.log('[pb-migrate] DRY-RUN complete. Re-run with --apply to persist changes.')
  }
}

main().catch((error) => {
  console.error('[pb-migrate] fatal', error)
  process.exit(1)
})
