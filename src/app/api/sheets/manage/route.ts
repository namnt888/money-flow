import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isYYYYMM, normalizeMonthTag } from '@/lib/month-tag'
import { createCycleSheet, syncCycleTransactions, createTestSheet } from '@/services/sheet.service'
import type { ManageCycleSheetRequest, ManageCycleSheetResponse } from '@/types/sheet.types'
import { toPocketBaseId, pocketbaseList, pocketbaseCreate, pocketbaseUpdate, pocketbaseGetById } from '@/services/pocketbase/server'

function isUuidLike(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function makeRequestId(): string {
  try {
    // Check if crypto exists and has randomUUID
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    return `sh-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  } catch (err) {
    console.error('[RequestId] generation error:', err)
    return `sh-${Date.now()}`
  }
}

function getPreviousCycleTag(cycleTag: string): string | null {
  if (!isYYYYMM(cycleTag)) return null

  const [yearPart, monthPart] = cycleTag.split('-')
  const year = Number(yearPart)
  const month = Number(monthPart)
  if (!Number.isFinite(year) || !Number.isFinite(month)) return null

  const previousDate = new Date(year, month - 2, 1)
  if (Number.isNaN(previousDate.getTime())) return null

  return `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, '0')}`
}

function getCascadeCycleTags(cycleTag: string): string[] {
  const tags = [cycleTag]
  const previousTag = getPreviousCycleTag(cycleTag)

  if (previousTag && previousTag !== cycleTag) {
    tags.push(previousTag)
  }

  return tags
}

async function syncSingleCycleSheet(params: {
  requestId: string
  personId: string
  cycleTag: string
  isMasterSheet: boolean
  tableAvailable: boolean
  pbAvailable: boolean
}) {
  const { requestId, personId, cycleTag, isMasterSheet, tableAvailable, pbAvailable } = params
  const pbId = toPocketBaseId(personId, 'people')

  let normalizedCycle = normalizeMonthTag(cycleTag)
  if (isMasterSheet && normalizedCycle) {
    normalizedCycle = normalizedCycle.split('-')[0]
  }

  if (!normalizedCycle || (!isYYYYMM(normalizedCycle) && !/^\d{4}$/.test(normalizedCycle))) {
    return {
      ok: false,
      error: 'Invalid cycleTag format',
      normalizedCycle: null as string | null,
      status: null as ManageCycleSheetResponse['status'] | null,
      sheetUrl: null as string | null,
      sheetId: null as string | null,
      syncResult: null as any,
    }
  }

  type CycleSheetRow = { id: string; sheet_id?: string | null; sheet_url?: string | null }
  let existing: CycleSheetRow | null = null

  if (tableAvailable) {
    const existingResult = await (createClient() as any)
      .from('person_cycle_sheets')
      .select('id, sheet_id, sheet_url')
      .eq('person_id', personId)
      .eq('cycle_tag', normalizedCycle)
      .maybeSingle()

    if (!existingResult.error) {
      existing = existingResult.data as CycleSheetRow | null
    }
  } else if (pbAvailable) {
    try {
      const existingList = await pocketbaseList('person_cycle_sheets', {
        filter: `person_id = "${pbId}" && cycle_tag = "${normalizedCycle}"`
      })
      existing = (existingList?.items?.[0] as any) || null
    } catch (err) {
      console.warn('[ManageSheet API] person_cycle_sheets (PocketBase) lookup failed:', { requestId, err })
    }
  }

  let status: ManageCycleSheetResponse['status'] = 'synced'
  const existingRowId = existing?.id ?? null
  const hasSheetInfo = Boolean(existing?.sheet_id || existing?.sheet_url)
  let sheetUrl =
    existing?.sheet_url ??
    (existing?.sheet_id ? `https://docs.google.com/spreadsheets/d/${existing.sheet_id}` : null)
  let sheetId = existing?.sheet_id ?? null

  if (!hasSheetInfo) {
    const createResult = await createCycleSheet(personId, normalizedCycle)
    if (!createResult.success) {
      return {
        ok: false,
        error: createResult.message ?? 'Create failed',
        normalizedCycle,
        status: null as ManageCycleSheetResponse['status'] | null,
        sheetUrl: null as string | null,
        sheetId: null as string | null,
        syncResult: null as any,
      }
    }

    status = 'created'
    sheetUrl = createResult.sheetUrl ?? sheetUrl ?? null
    sheetId = createResult.sheetId ?? sheetId ?? null

    if (tableAvailable) {
      const sbPayload = {
        person_id: personId,
        cycle_tag: normalizedCycle,
        sheet_id: sheetId,
        sheet_url: sheetUrl,
      }
      if (existingRowId) {
        await (createClient() as any)
          .from('person_cycle_sheets')
          .update(sbPayload)
          .eq('id', existingRowId)
      } else {
        await (createClient() as any)
          .from('person_cycle_sheets')
          .insert(sbPayload)
      }
    } else if (pbAvailable) {
      const pbPayload = {
        person_id: pbId,
        cycle_tag: normalizedCycle,
        sheet_id: sheetId,
        sheet_url: sheetUrl,
      }
      try {
        if (existingRowId) {
          await pocketbaseUpdate('person_cycle_sheets', existingRowId, pbPayload)
        } else {
          await pocketbaseCreate('person_cycle_sheets', pbPayload)
        }
      } catch (pbErr) {
        console.error('[ManageSheet API] failed to store sheet info in PB', { requestId, pbErr })
      }
    }

    if (sheetUrl) {
      if (tableAvailable) {
        try {
          await (createClient() as any)
            .from('profiles')
            .update({ google_sheet_url: sheetUrl })
            .eq('id', personId)
        } catch (profileError) {
          console.warn('[ManageSheet API] unable to update profile sheet url in Supabase', { requestId, personId, profileError })
        }
      } else if (pbAvailable) {
        try {
          await pocketbaseUpdate('people', pbId, { google_sheet_url: sheetUrl })
        } catch (profileError) {
          console.warn('[ManageSheet API] unable to update profile sheet url in PocketBase', { requestId, personId, profileError })
        }
      }
    }
  } else if (tableAvailable && existingRowId) {
    await (createClient() as any)
      .from('person_cycle_sheets')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', existingRowId)
  } else if (pbAvailable && existingRowId) {
    try {
      await pocketbaseUpdate('person_cycle_sheets', existingRowId, { updated_at: new Date().toISOString() })
    } catch (pbErr) {
      console.warn('[ManageSheet API] unable to update timestamp in PB', { requestId, pbErr })
    }
  }

  const syncResult = await syncCycleTransactions(personId, normalizedCycle, sheetId)
  if (!syncResult.success) {
    return {
      ok: false,
      error: syncResult.message ?? 'Sync failed',
      normalizedCycle,
      status,
      sheetUrl,
      sheetId,
      syncResult,
    }
  }

  return {
    ok: true,
    normalizedCycle,
    status,
    sheetUrl,
    sheetId,
    syncResult,
  }
}

function errorResponse(
  requestId: string,
  stage: NonNullable<ManageCycleSheetResponse['stage']>,
  error: string,
  status: number,
  debugMessage?: string,
) {
  return NextResponse.json(
    {
      error,
      requestId,
      stage,
      debugMessage,
    } satisfies Partial<ManageCycleSheetResponse>,
    { status },
  )
}

export async function POST(request: Request) {
  const requestId = makeRequestId()
  try {
    const payload = (await request.json()) as ManageCycleSheetRequest
    const personId = payload?.personId?.trim()
    const action = payload?.action || 'sync'

    console.info('[ManageSheet API] request:start', { requestId, action, hasPersonId: Boolean(personId) })

    if (!personId) {
      console.warn('[ManageSheet API] validation failed: missing personId', { requestId })
      return errorResponse(requestId, 'validate_payload', 'Missing personId', 400)
    }

    // Handle Test Create Action
    if (action === 'test_create') {
      const result = await createTestSheet(personId)
      if (!result.success) {
        console.warn('[ManageSheet API] test_create failed', { requestId, personId, message: result.message })
        return errorResponse(
          requestId,
          'test_create',
          result.message ?? 'Test create failed',
          400,
          result.message ?? 'createTestSheet returned success=false',
        )
      }
      return NextResponse.json({
        status: 'test_created',
        sheetUrl: result.sheetUrl,
        sheetId: result.sheetId,
        requestId,
        stage: 'test_create',
      })
    }

    // Default Sync Action
    const rawCycle = payload?.cycleTag?.trim()
    if (!rawCycle) {
      console.warn('[ManageSheet API] validation failed: missing cycleTag', { requestId, personId })
      return errorResponse(requestId, 'validate_payload', 'Missing cycleTag', 400)
    }

    // Check if person exists in PocketBase if not UUID
    const pbId = toPocketBaseId(personId, 'people')
    let isMasterSheet = false
    try {
      const personData = await pocketbaseGetById<any>('people', pbId)
      isMasterSheet = personData?.is_master_sheet_enabled === true
    } catch {
      // ignore
    }

    let normalizedCycle = normalizeMonthTag(rawCycle)
    if (isMasterSheet && normalizedCycle) {
      normalizedCycle = normalizedCycle.split('-')[0] // '2026-03' -> '2026'
    }

    if (!normalizedCycle || (!isYYYYMM(normalizedCycle) && !/^\d{4}$/.test(normalizedCycle))) {
      console.warn('[ManageSheet API] validation failed: invalid cycleTag', { requestId, personId, rawCycle, normalizedCycle })
      return errorResponse(
        requestId,
        'validate_payload',
        `Sync cycle validation failed: raw=${rawCycle || '(empty)'} resolved=${normalizedCycle || '(empty)'} masterSheet=${isMasterSheet ? 'on' : 'off'}`,
        400,
      )
    }

    console.info('[ManageSheet API] request', { requestId, personId, cycleTag: normalizedCycle, isMasterSheet })

    console.info('[ManageSheet API] target', { requestId, personId, pbId, cycleTag: normalizedCycle })

    const supabase = createClient()
    type CycleSheetRow = { id: string; sheet_id?: string | null; sheet_url?: string | null }
    let existing: CycleSheetRow | null = null
    let tableAvailable = isUuidLike(personId)
    let pbAvailable = !tableAvailable && /^[a-z0-9]{15}$/.test(pbId)

    if (tableAvailable) {
      const existingResult = await (supabase as any)
        .from('person_cycle_sheets')
        .select('id, sheet_id, sheet_url')
        .eq('person_id', personId)
        .eq('cycle_tag', normalizedCycle)
        .maybeSingle()

      if (existingResult.error) {
        console.warn('[ManageSheet API] person_cycle_sheets (Supabase) lookup failed:', {
          requestId,
          personId,
          cycleTag: normalizedCycle,
          error: existingResult.error,
        })
      } else {
        existing = existingResult.data as CycleSheetRow | null
      }
    } else if (pbAvailable) {
      try {
        const existingList = await pocketbaseList('person_cycle_sheets', {
          filter: `person_id = "${pbId}" && cycle_tag = "${normalizedCycle}"`
        })
        existing = (existingList?.items?.[0] as any) || null
        console.info('[ManageSheet API] person_cycle_sheets (PocketBase) lookup:', { requestId, found: !!existing })
      } catch (err) {
        console.warn('[ManageSheet API] person_cycle_sheets (PocketBase) lookup failed:', { requestId, err })
      }
    }

    const cascadeTags = getCascadeCycleTags(normalizedCycle)
    const cycleResults: Array<{
      tag: string
      success: boolean
      status: ManageCycleSheetResponse['status']
      sheetId: string | null
      sheetUrl: string | null
      syncResult: { syncedCount?: number; manualPreserved?: number; totalRows?: number } | null
    }> = []

    for (const targetCycle of cascadeTags) {
      const cycleResult = await syncSingleCycleSheet({
        requestId,
        personId,
        cycleTag: targetCycle,
        isMasterSheet,
        tableAvailable,
        pbAvailable,
      })

      console.info('[ManageSheet API] sync result', {
        requestId,
        cycleTag: targetCycle,
        success: cycleResult.ok,
        message: cycleResult.ok ? 'ok' : cycleResult.error,
        syncedCount: (cycleResult.syncResult as any)?.syncedCount,
      })

      if (!cycleResult.ok) {
        const upstreamError = cycleResult.error ?? 'Sync failed'
        const normalizedError = upstreamError.includes('Cycle tag must be YYYY-MM')
          ? `Sheet upstream rejected cycle tag: raw=${rawCycle || '(empty)'} resolved=${targetCycle || '(empty)'} masterSheet=${isMasterSheet ? 'on' : 'off'}`
          : upstreamError
        return errorResponse(
          requestId,
          'sync_transactions',
          normalizedError,
          400,
          upstreamError,
        )
      }

      cycleResults.push({
        tag: targetCycle,
        success: true,
        status: cycleResult.status ?? 'synced',
        sheetId: cycleResult.sheetId,
        sheetUrl: cycleResult.sheetUrl,
        syncResult: cycleResult.syncResult ? {
          syncedCount: (cycleResult.syncResult as any)?.syncedCount,
          manualPreserved: (cycleResult.syncResult as any)?.manualPreserved,
          totalRows: (cycleResult.syncResult as any)?.totalRows,
        } : null,
      })
    }

    const primaryResult = cycleResults[0] ?? { sheetId: null, sheetUrl: null }
    const primarySync = primaryResult.syncResult ?? null

    return NextResponse.json({
      status: primaryResult.status ?? 'synced',
      sheetUrl: primaryResult.sheetUrl,
      sheetId: primaryResult.sheetId,
      requestId,
      stage: 'sync_transactions',
      syncedCount: primarySync?.syncedCount,
      manualPreserved: primarySync?.manualPreserved,
      totalRows: primarySync?.totalRows,
      cascadeTags,
    })
  } catch (error: any) {
    console.error('[ManageSheet API] unexpected failure', {
      requestId,
      error: error?.message,
      stack: error?.stack,
    })
    return errorResponse(
      requestId,
      'unexpected',
      error?.message ?? 'Unexpected error',
      500,
      error?.message ?? 'Unhandled exception in manage sheet API',
    )
  }
}
