## Error Type
Console Error

## Error Message
[DB:PB] Request FAILED [404] /api/collections/pvl_txns_001/records: "{\"data\":{},\"message\":\"Missing collection context.\",\"status\":404}\n"


    at pocketbaseRequest (src\services\pocketbase\server.ts:144:17)
    at getStatsForAccount (src\services\account.service.ts:134:26)
    at getAccounts (src\services\account.service.ts:191:19)
    at Promise.all (<anonymous>:1:20)
    at ClassificationsPage (src\app\categories\page.tsx:21:51)
    at ClassificationsPage (<anonymous>:null:null)

## Code Frame
  142 |       const text = await response.text()
  143 |       if (!options?.silent) {
> 144 |         console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
      |                 ^
  145 |       }
  146 |       throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
  147 |     }

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
PocketBase request failed [404] /api/collections/pvl_txns_001/records: {"data":{},"message":"Missing collection context.","status":404}



    at pocketbaseRequest (src\services\pocketbase\server.ts:146:13)
    at  getStatsForAccount (src\services\account.service.ts:134:26)
    at  getAccounts (src\services\account.service.ts:191:19)
    at  ClassificationsPage (src\app\categories\page.tsx:21:51)
    at RootLayout (src\app\layout.tsx:59:17)

## Code Frame
  144 |         console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
  145 |       }
> 146 |       throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
      |             ^
  147 |     }
  148 |
  149 |     if (response.status === 204) {

Next.js version: 16.0.10 (Turbopack)
