"use server"
import 'server-only'

import { executeWithFallback, logSource } from '@/lib/pocketbase/fallback-helpers'
import { createClient } from '@/lib/supabase/server'
import { Person } from '@/types/moneyflow.types'
import {
  pocketbaseCreate,
  pocketbaseDelete,
  pocketbaseGetById,
  pocketbaseList,
  pocketbaseUpdate,
  toPocketBaseId,
} from './server'
import { PB_COLLECTIONS } from '@/lib/pocketbase/collections'

type PocketBaseRecord = Record<string, unknown>

const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)

type PocketBasePersonWrite = {
  name: string
  image_url?: string | null
  sheet_link?: string | null
  google_sheet_url?: string | null
  is_owner?: boolean | null
  is_archived?: boolean | null
  is_favorite?: boolean | null
  is_group?: boolean | null
  group_parent_id?: string | null
  sheet_full_img?: string | null
  sheet_show_bank_account?: boolean
  sheet_bank_info?: string | null
  sheet_linked_bank_id?: string | null
  sheet_show_qr_image?: boolean
  is_master_sheet_enabled?: boolean | null
  default_repayment_account_id?: string | null
}

function mapPerson(record: PocketBaseRecord): Person {
  return {
    id: String(record.id || ''),
    pocketbase_id: typeof record.id === 'string' ? record.id : null,
    created_at: typeof record.created === 'string' ? record.created : undefined,
    name: String(record.name || ''),
    image_url: (record.image_url as string | null | undefined) ?? null,
    sheet_link: (record.sheet_link as string | null | undefined) ?? null,
    google_sheet_url: (record.google_sheet_url as string | null | undefined) ?? null,
    sheet_full_img: (record.sheet_full_img as string | null | undefined) ?? null,
    sheet_show_bank_account: (record.sheet_show_bank_account as boolean | null | undefined) ?? null,
    sheet_bank_info: (record.sheet_bank_info as string | null | undefined) ?? null,
    sheet_linked_bank_id: (record.sheet_linked_bank_id as string | null | undefined) ?? null,
    sheet_show_qr_image: (record.sheet_show_qr_image as boolean | null | undefined) ?? null,
    is_master_sheet_enabled: (record.is_master_sheet_enabled as boolean | null | undefined) ?? null,
    is_owner: (record.is_owner as boolean | null | undefined) ?? null,
    is_archived: (record.is_archived as boolean | null | undefined) ?? null,
    is_favorite: (record.is_favorite as boolean | null | undefined) ?? null,
    is_group: (record.is_group as boolean | null | undefined) ?? null,
    group_parent_id: (record.group_parent_id as string | null | undefined) ?? null,
    default_repayment_account_id: (record.default_repayment_account_id as string | null | undefined) ?? null,
  }
}

async function getOptionalSheetLink(name: string): Promise<string | null> {
  const supabase = createClient()
  const normalizedName = name.trim().toLowerCase()
  const { data, error } = await supabase
    .from('sheet_webhook_links')
    .select('url, name, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return null
  }

  const rows = (data ?? []) as Array<{ url?: string | null; name?: string | null }>
  const byName = rows.find((row) => String(row.name || '').trim().toLowerCase() === normalizedName)
  return String(byName?.url || rows[0]?.url || '') || null
}

async function getOptionalCycleSheetUrl(pbPersonId: string): Promise<string | null> {
  try {
    const cycleSheetRows = await pocketbaseList<PocketBaseRecord>('person_cycle_sheets', {
      filter: `person_id='${pbPersonId}' && sheet_url != ''`,
      sort: '-updated,-created',
      perPage: 1,
    }, true)
    const latest = cycleSheetRows.items?.[0] || null
    return latest?.sheet_url ? String(latest.sheet_url) : null
  } catch {
    return null
  }
}

export async function resolvePocketBasePersonRecord(sourceOrPocketBaseId: string): Promise<PocketBaseRecord | null> {
  if (!sourceOrPocketBaseId) return null

  const isPbId = sourceOrPocketBaseId.length === 15 && !sourceOrPocketBaseId.includes('-')

  // 1. Direct fetch if it looks like a PB ID
  if (isPbId) {
    try {
      return await pocketbaseGetById<PocketBaseRecord>(PB_COLLECTIONS.PEOPLE, sourceOrPocketBaseId)
    } catch { /* Probing next */ }
  }

  // 2. Try as source_id / source ID
  try {
    const pbId = toPocketBaseId(sourceOrPocketBaseId)
    if (pbId !== sourceOrPocketBaseId) {
        return await pocketbaseGetById<PocketBaseRecord>(PB_COLLECTIONS.PEOPLE, pbId)
    }
  } catch { /* Probing next */ }

  // 3. Try lookup by slug
  try {
    const escapedId = sourceOrPocketBaseId.replace(/'/g, "\\'")
    const bySlug = await pocketbaseList<PocketBaseRecord>(PB_COLLECTIONS.PEOPLE, {
      perPage: 1,
      page: 1,
      filter: `slug='${escapedId}' || name~'${escapedId}'`,
    })
    return bySlug.items?.[0] ?? null
  } catch {
    return null
  }
}

export async function getPocketBasePeople(): Promise<Person[]> {
  return executeWithFallback(
    async () => {
      logSource('PB', 'people.list')
      const response = await pocketbaseList<PocketBaseRecord>(PB_COLLECTIONS.PEOPLE, {
        perPage: 500,
        page: 1,
      })
      return response.items.map(mapPerson).sort((a, b) => a.name.localeCompare(b.name))
    },
    async () => [],
    'people.list'
  )
}

export async function getPocketBasePersonSummary(sourceOrPocketBaseId: string): Promise<Person | null> {
  const personRecord = await resolvePocketBasePersonRecord(sourceOrPocketBaseId)
  return personRecord ? mapPerson(personRecord) : null
}

export async function getPocketBasePersonDetails(sourceOrPocketBaseId: string): Promise<Person | null> {
  return executeWithFallback(
    async () => {
      logSource('PB', 'people.get', { sourceOrPocketBaseId })
      const personRecord = await resolvePocketBasePersonRecord(sourceOrPocketBaseId)
      if (!personRecord) return null
      const mapped = mapPerson(personRecord)
      const sourcePersonId = (() => {
        if (typeof personRecord.slug === 'string' && isUuid(personRecord.slug)) return personRecord.slug
        if (typeof personRecord.source_id === 'string' && isUuid(personRecord.source_id)) return personRecord.source_id
        if (isUuid(sourceOrPocketBaseId)) return sourceOrPocketBaseId
        if (isUuid(mapped.id)) return mapped.id
        return null
      })()

      if (!sourcePersonId) {
        return mapped
      }

      const [sheetLink, googleSheetUrl] = await Promise.all([
        mapped.sheet_link ? Promise.resolve(mapped.sheet_link) : getOptionalSheetLink(mapped.name),
        mapped.google_sheet_url ? Promise.resolve(mapped.google_sheet_url) : getOptionalCycleSheetUrl(String(personRecord.id || mapped.id)),
      ])

      const hydrated = {
        ...mapped,
        sheet_link: sheetLink || mapped.sheet_link,
        google_sheet_url: googleSheetUrl || mapped.google_sheet_url,
      }

      return hydrated
    },
    async () => null,
    'people.get',
    { quietRecoverable: true }
  )
}

export async function getPocketBasePersonById(sourceOrPocketBaseId: string): Promise<Person | null> {
  return getPocketBasePersonDetails(sourceOrPocketBaseId)
}

export async function createPocketBasePerson(
  data: PocketBasePersonWrite & { id?: string; slug?: string }
): Promise<PocketBaseRecord> {
  const pbId = data.id || toPocketBaseId(data.slug || crypto.randomUUID())
  const payload = {
    ...data,
    id: pbId,
    slug: data.slug || pbId,
    group_parent_id: data.group_parent_id ? toPocketBaseId(data.group_parent_id) : null,
  }
  logSource('PB', 'people.create', { id: pbId, name: data.name })
  return await pocketbaseCreate<PocketBaseRecord>(PB_COLLECTIONS.PEOPLE, payload)
}

export async function updatePocketBasePerson(
  sourceOrPocketBaseId: string,
  data: Partial<PocketBasePersonWrite>
): Promise<boolean> {
  return executeWithFallback(
    async () => {
      const record = await resolvePocketBasePersonRecord(sourceOrPocketBaseId)
      if (!record?.id) return false

      const body: Record<string, unknown> = { ...data }
      if (typeof body.group_parent_id === 'string' && body.group_parent_id) {
        body.group_parent_id = toPocketBaseId(body.group_parent_id)
      }

      await pocketbaseUpdate<PocketBaseRecord>(PB_COLLECTIONS.PEOPLE, String(record.id), body)
      return true
    },
    async () => false, // Supabase fallback removed
    'people.update'
  )
}

export async function deletePocketBasePerson(sourceOrPocketBaseId: string): Promise<boolean> {
  return executeWithFallback(
    async () => {
      const record = await resolvePocketBasePersonRecord(sourceOrPocketBaseId)
      if (!record?.id) return false
      await pocketbaseDelete(PB_COLLECTIONS.PEOPLE, String(record.id))
      return true
    },
    async () => false, // Supabase fallback removed
    'people.delete'
  )
}
