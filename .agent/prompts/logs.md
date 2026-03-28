## Error Type
Console Error

## Error Message
[DB:PB] Request FAILED [400] /api/collections/batch_items/records: "{\"data\":{},\"message\":\"Something went wrong while processing your request.\",\"status\":400}\n"


    at pocketbaseRequest (src\services\pocketbase\server.ts:104:13)
    at MBBBatchPage (src\app\batch\mbb\page.tsx:53:35)
    at MBBBatchPage (<anonymous>:null:null)

## Code Frame
  102 |   if (!response.ok) {
  103 |     const text = await response.text()
> 104 |     console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
      |             ^
  105 |     throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
  106 |   }
  107 |

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__5dfbb803._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at MBBBatchPage (src\app\batch\mbb\page.tsx:60:21)
    at MBBBatchPage (<anonymous>:null:null)

## Code Frame
  58 |             autoSelectedPhaseId = latestItemRes.items?.[0]?.phase_id || null
  59 |         } catch (e) {
> 60 |             console.warn('Smart phase selection failed:', e)
     |                     ^
  61 |         }
  62 |     }
  63 |

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__a0da3610._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at MBBBatchPage (src\app\batch\mbb\page.tsx:60:21)
    at MBBBatchPage (<anonymous>:null:null)

## Code Frame
  58 |             autoSelectedPhaseId = latestItemRes.items?.[0]?.phase_id || null
  59 |         } catch (e) {
> 60 |             console.warn('Smart phase selection failed:', e)
     |                     ^
  61 |         }
  62 |     }
  63 |

Next.js version: 16.0.10 (Turbopack)
