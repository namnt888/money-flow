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

async function listAllPersonalRepayments(token) {
  const all = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const filter = encodeURIComponent("person_id != '' && (type='repayment' || type='income')")
    const fields = encodeURIComponent('id,person_id,type,status,date,occurred_at,note,metadata')
    const url = `${PB_URL}/api/collections/pvl_txn_001/records?page=${page}&perPage=${perPage}&sort=date,id&filter=${filter}&fields=${fields}`
    const res = await fetch(url, { headers: { Authorization: token } })
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

function hasObjectEntries(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0
}

function shouldMarkAsRepaymentParent(row) {
  if (!row || row.status === 'void') return false

  const metadata = row.metadata && typeof row.metadata === 'object' ? row.metadata : {}

  const isAlreadyParent = metadata.is_debt_repayment_parent === true
  if (isAlreadyParent) return false

  if (metadata.is_debt_repayment_child === true) return false

  const hasMultiCycleAllocations = hasObjectEntries(metadata.multi_cycle_repay_allocations)
  if (!hasMultiCycleAllocations) return false

  return true
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
  console.log(`[pb-migrate] backfill repayment parent flag mode=${isApply ? 'APPLY' : 'DRY-RUN'}`)
  const token = await pbAuth()

  const rows = await listAllPersonalRepayments(token)
  console.log(`[pb-migrate] loaded repayment candidates: ${rows.length}`)

  const stats = {
    total: rows.length,
    candidate: 0,
    updated: 0,
    skippedChild: 0,
    skippedNoAlloc: 0,
    skippedAlreadyParent: 0,
    skippedVoid: 0,
    errors: 0,
  }

  const sampleUpdates = []

  for (const row of rows) {
    const metadata = row.metadata && typeof row.metadata === 'object' ? row.metadata : {}

    if (row.status === 'void') {
      stats.skippedVoid += 1
      continue
    }
    if (metadata.is_debt_repayment_child === true) {
      stats.skippedChild += 1
      continue
    }
    if (metadata.is_debt_repayment_parent === true) {
      stats.skippedAlreadyParent += 1
      continue
    }
    if (!hasObjectEntries(metadata.multi_cycle_repay_allocations)) {
      stats.skippedNoAlloc += 1
      continue
    }

    if (!shouldMarkAsRepaymentParent(row)) {
      continue
    }

    stats.candidate += 1

    if (sampleUpdates.length < 20) {
      sampleUpdates.push({
        id: row.id,
        type: row.type,
        date: row.occurred_at || row.date || null,
        note: String(row.note || '').slice(0, 120),
      })
    }

    if (!isApply) continue

    try {
      await patchTransaction(token, row.id, {
        metadata: {
          ...metadata,
          is_debt_repayment_parent: true,
        },
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
