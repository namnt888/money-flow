/**
 * PocketBase Fallback Helpers
 * Provides resilient query retry and fallback logic
 */

/**
 * Check if error is PB 400 or 404 (recoverable for fallback)
 */
export function isPocketBase400Or404(error: unknown): boolean {
  const err = error as any
  return err?.status === 400 || err?.status === 404 || 
         err?.name === 'AbortError' ||
         err?.message?.includes('400') ||
         err?.message?.includes('404') ||
         err?.message?.includes('fetch failed') ||
         err?.message?.includes('aborted') ||
         err?.code === 'UND_ERR_SOCKET' ||
         err?.cause?.code === 'UND_ERR_SOCKET'
}

/**
 * Check if error is PB auth/permission error (not recoverable with fallback)
 */
export function isPocketBaseAuthError(error: unknown): boolean {
  const err = error as any
  return err?.status === 401 || err?.status === 403
}

/**
 * Execute query with automatic fallback to Supabase
 * @param pbQuery - Primary PocketBase query function
 * @param sbQuery - Fallback Supabase query function
 * @param context - Logging context (e.g., 'load:transactions')
 */
export async function executeWithFallback<T>(
  pbQuery: () => Promise<T>,
  fallbackQuery: () => Promise<T>,
  context: string,
  options?: {
    quietRecoverable?: boolean
    expectedStatuses?: number[]
  }
): Promise<T> {
  try {
    return await pbQuery()
  } catch (error) {
    const status = (error as any)?.status
    const expectedStatusSet = new Set(options?.expectedStatuses ?? [400, 404])
    const isRecoverable = isPocketBase400Or404(error) || (typeof status === 'number' && expectedStatusSet.has(status))

    if (isRecoverable) {
      if (!options?.quietRecoverable) {
        console.debug(`[source:PB] ${context} recoverable (${status || '?'})`)
      }
      return await fallbackQuery()
    }

    console.error(`[source:PB] ${context} - error`, {
      status,
      message: (error as any)?.message || String(error),
      error,
    })
    return await fallbackQuery()
  }
}

export async function executeSafely<T>(
  query: () => Promise<T>,
  fallbackValue: T,
  _context: string,
): Promise<T> {
  try {
    return await query()
  } catch {
    return fallbackValue
  }
}

/**
 * Execute multiple query attempts with fallback
 * Useful for PB schema drift handling
 */
export async function executeWithAttempts<T>(
  attempts: Array<() => Promise<T>>,
  context: string,
  sbQuery?: () => Promise<T>
): Promise<T> {
  let lastError: unknown
  
  for (let i = 0; i < attempts.length; i++) {
    try {
      // console.log(`[source:PB] ${context} - attempt ${i + 1}/${attempts.length}`)
      const result = await attempts[i]()
      return result
    } catch (error) {
      lastError = error
      if (!isPocketBase400Or404(error)) {
        // Rethrow non-recoverable errors immediately
        console.error(`[source:PB] ${context} - non-recoverable error on attempt ${i + 1}`, error)
        throw error
      }
      console.warn(`[source:PB] ${context} - attempt ${i + 1} failed (${(error as any)?.status || '?'}), trying next...`)
    }
  }
  
  // All PB attempts failed, try Supabase
  if (sbQuery) {
    console.log(`[source:SB] ${context} - all PB attempts failed, falling back to Supabase`)
    try {
      const result = await sbQuery()
      return result
    } catch (sbError) {
      console.error(`[source:SB] ${context} - fallback also failed`, sbError)
      throw sbError
    }
  }
  
  // No fallback provided, rethrow last error
  console.error(`[source:PB] ${context} - all attempts exhausted, no fallback available`)
  throw lastError
}

/**
 * Log source tracking (for debugging data flow)
 */
export function logSource(_source: 'PB' | 'SB', _action: string, _details?: any) {
  // Silent in production/clean mode
}
