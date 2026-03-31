import 'server-only'
import { createHash } from 'crypto'

type PocketBaseAuth = {
  token: string
}

type PocketBaseListResponse<T> = {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: T[]
}

const POCKETBASE_URL = (process.env.POCKETBASE_URL || 'https://api-db.reiwarden.io.vn').replace(/\/+$/, '')
const POCKETBASE_EMAIL = (process.env.POCKETBASE_DB_EMAIL || '').trim()
const POCKETBASE_PASSWORD = (process.env.POCKETBASE_DB_PASSWORD || '').trim()

let cachedToken: string | null = null
let cachedTokenExpiresAt = 0

function decodeTokenExpiry(token: string): number {
  try {
    const segments = token.split('.')
    if (segments.length < 2) return Date.now() + 5 * 60 * 1000
    const payload = JSON.parse(Buffer.from(segments[1], 'base64url').toString('utf8'))
    if (!payload?.exp) return Date.now() + 5 * 60 * 1000
    return Number(payload.exp) * 1000
  } catch {
    return Date.now() + 5 * 60 * 1000
  }
}

async function getAuthToken(): Promise<string> {
  const now = Date.now()
  if (cachedToken && now < cachedTokenExpiresAt - 30_000) {
    return cachedToken
  }

  if (!POCKETBASE_EMAIL || !POCKETBASE_PASSWORD) {
    throw new Error('Missing POCKETBASE_DB_EMAIL or POCKETBASE_DB_PASSWORD')
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30_000)

  // Try newer superuser endpoint first, fallback to older admin endpoint if 404
  const authEndpoints = [
    '/api/collections/_superusers/auth-with-password',
    '/api/admins/auth-with-password'
  ]

  let lastError: unknown

  try {
    for (const endpoint of authEndpoints) {
      try {
        const response = await fetch(`${POCKETBASE_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identity: POCKETBASE_EMAIL, password: POCKETBASE_PASSWORD }),
          cache: 'no-store',
          signal: controller.signal,
        })

        if (response.ok) {
          const payload = (await response.json()) as PocketBaseAuth
          cachedToken = payload.token
          cachedTokenExpiresAt = decodeTokenExpiry(payload.token)
          return payload.token
        }

        const text = await response.text()
        lastError = `PocketBase auth failed at ${endpoint}: [${response.status}] ${text}`
        
        // If not 404, the path is correct but auth simply failed (wrong credentials)
        if (response.status !== 404) {
          throw new Error(lastError as string)
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') throw err
        lastError = err
      }
    }

    throw new Error(String(lastError || 'PocketBase auth failed: All endpoints returned 404'))
  } finally {
    clearTimeout(timeoutId)
  }
}

function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return ''
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'undefined') continue
    search.set(key, String(value))
  }
  const query = search.toString()
  return query ? `?${query}` : ''
}

export async function pocketbaseRequest<T>(
  path: string,
  options?: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    params?: Record<string, string | number | boolean | undefined>
    body?: unknown
  },
): Promise<T> {
  const token = await getAuthToken()
  const query = buildQuery(options?.params)
  // Ensure we don't have double slashes if path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const url = `${POCKETBASE_URL}${cleanPath}${query}`
  const method = options?.method || 'GET'
  if (method !== 'GET') {
    console.log(`[DB:PB] ${method} ${url}`)
    if (options?.body) {
      console.log(`[DB:PB] body:`, JSON.stringify(options.body).substring(0, 500))
    }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30_000)

  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: typeof options?.body === 'undefined' ? undefined : JSON.stringify(options.body),
      cache: 'no-store',
      signal: controller.signal,
    })

    if (!response.ok) {
      const text = await response.text()
      console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
      throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
    }

    if (response.status === 204) {
      return null as T
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function pocketbaseList<T>(
  collection: string,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<PocketBaseListResponse<T>> {
  return pocketbaseRequest<PocketBaseListResponse<T>>(`/api/collections/${collection}/records`, {
    method: 'GET',
    params,
  })
}

export async function pocketbaseGetById<T>(collection: string, id: string, expand?: string, fields?: string): Promise<T> {
  return pocketbaseRequest<T>(`/api/collections/${collection}/records/${id}`, {
    method: 'GET',
    params: {
      expand,
      fields,
    },
  })
}

export function toPocketBaseId(sourceId: string, fallbackPrefix = 'mf3'): string {
  if (!sourceId) {
    const randomSeed = `${fallbackPrefix}-${Date.now()}-${Math.random()}`
    const seed = createHash('sha256').update(randomSeed).digest()
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomId = ''
    for (let index = 0; index < 15; index++) {
      randomId += chars[seed[index] % chars.length]
    }
    return randomId
  }

  // Idempotency: If already 15-char lowercase alphanumeric, assume it's a PB ID
  if (/^[a-z0-9]{15}$/.test(sourceId)) {
    return sourceId
  }

  const digest = createHash('sha256').update(String(sourceId)).digest()
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let index = 0; index < 15; index++) {
    result += chars[digest[index] % chars.length]
  }
  return result
}
export async function pocketbaseCreate<T>(collection: string, body: unknown): Promise<T> {
  return pocketbaseRequest<T>(`/api/collections/${collection}/records`, {
    method: 'POST',
    body,
  })
}

export async function pocketbaseUpdate<T>(collection: string, id: string, body: unknown): Promise<T> {
  return pocketbaseRequest<T>(`/api/collections/${collection}/records/${id}`, {
    method: 'PATCH',
    body,
  })
}

export async function pocketbaseDelete(collection: string, id: string): Promise<void> {
  return pocketbaseRequest<void>(`/api/collections/${collection}/records/${id}`, {
    method: 'DELETE',
  })
}
