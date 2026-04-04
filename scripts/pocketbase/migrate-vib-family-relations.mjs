import fs from 'node:fs/promises'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const PB_URL = process.env.POCKETBASE_URL || process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://api-db.reiwarden.io.vn'
const PB_EMAIL = process.env.POCKETBASE_DB_EMAIL
const PB_PASSWORD = process.env.POCKETBASE_DB_PASSWORD
const APPLY = process.argv.includes('--apply')
const SAMPLE_PATH = path.resolve('database/migrations/sampleSql.sql')

if (!PB_EMAIL || !PB_PASSWORD) {
  console.error('[vib-family-migrate] Missing POCKETBASE_DB_EMAIL or POCKETBASE_DB_PASSWORD in .env.local')
  process.exit(1)
}

function extractJsonObjects(text) {
  const result = []
  let depth = 0
  let start = -1

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]
    if (ch === '{') {
      if (depth === 0) start = i
      depth += 1
    } else if (ch === '}') {
      depth -= 1
      if (depth === 0 && start !== -1) {
        const raw = text.slice(start, i + 1)
        try {
          result.push(JSON.parse(raw))
        } catch {
          // ignore malformed blocks
        }
        start = -1
      }
    }
  }

  return result
}

async function pbRequest(urlPath, options = {}, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {}),
    ...(options.headers || {}),
  }

  const response = await fetch(`${PB_URL}${urlPath}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`PB ${response.status} ${urlPath}: ${body}`)
  }

  return response.json()
}

async function authenticate() {
  const payload = {
    identity: PB_EMAIL,
    password: PB_PASSWORD,
  }

  try {
    return await pbRequest('/api/admins/auth-with-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch {
    return pbRequest('/api/collections/_superusers/auth-with-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
}

async function main() {
  console.log(`[vib-family-migrate] mode=${APPLY ? 'APPLY' : 'DRY-RUN'}`)

  const auth = await authenticate()
  const token = auth?.token
  if (!token) throw new Error('Failed to authenticate with PocketBase')

  const sampleRaw = await fs.readFile(SAMPLE_PATH, 'utf8')
  const sampleObjects = extractJsonObjects(sampleRaw)

  const vibRows = sampleObjects.filter((row) => {
    const name = String(row?.name || '').toLowerCase()
    return name.includes('vib') && row?.collectionName === 'accounts'
  })

  if (vibRows.length === 0) {
    console.log('[vib-family-migrate] No VIB rows found in sampleSql.sql')
    return
  }

  const existingRes = await pbRequest('/api/collections/pvl_acc_001/records?page=1&perPage=500', { method: 'GET' }, token)
  const existing = Array.isArray(existingRes?.items) ? existingRes.items : []
  const byId = new Map(existing.map((item) => [item.id, item]))

  let scanned = 0
  let patched = 0
  let skipped = 0

  for (const row of vibRows) {
    scanned += 1
    const id = String(row?.id || '').trim()
    if (!id) {
      skipped += 1
      continue
    }

    const current = byId.get(id)
    if (!current) {
      console.warn(`[vib-family-migrate] skip missing PB record id=${id}`)
      skipped += 1
      continue
    }

    const nextParent = row.parent_account_id ? String(row.parent_account_id) : null
    const nextSecured = row.secured_by_account_id ? String(row.secured_by_account_id) : null

    const patch = {
      parent_account_id: nextParent,
      secured_by_account_id: nextSecured,
      account_number: row.account_number || current.account_number || null,
      holder_type: row.holder_type || current.holder_type || 'me',
      holder_person_id: row.holder_person_id || null,
      is_active: typeof row.is_active === 'boolean' ? row.is_active : current.is_active,
    }

    const isChanged =
      (current.parent_account_id || null) !== patch.parent_account_id ||
      (current.secured_by_account_id || null) !== patch.secured_by_account_id ||
      (current.account_number || null) !== patch.account_number ||
      (current.holder_type || null) !== patch.holder_type ||
      (current.holder_person_id || null) !== patch.holder_person_id ||
      (current.is_active ?? true) !== patch.is_active

    if (!isChanged) {
      skipped += 1
      continue
    }

    if (!APPLY) {
      console.log(`[vib-family-migrate][dry-run] patch id=${id} name=${row.name} parent=${patch.parent_account_id}`)
      patched += 1
      continue
    }

    await pbRequest(`/api/collections/pvl_acc_001/records/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }, token)

    patched += 1
    console.log(`[vib-family-migrate][apply] patched id=${id} name=${row.name}`)
  }

  console.log('[vib-family-migrate] summary:', { scanned, patched, skipped, mode: APPLY ? 'APPLY' : 'DRY-RUN' })
}

main().catch((error) => {
  console.error('[vib-family-migrate] fatal:', error)
  process.exit(1)
})
