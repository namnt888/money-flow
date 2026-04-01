## Error Type
Console ReferenceError

## Error Message
getPocketBasePersonById is not defined


    at getPeople (src\services\people.service.ts:115:17)
    at getPersonWithSubs (src\services\people.service.ts:296:18)
    at Module.generateMetadata (src\app\people\[id]\page.tsx:34:18)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  113 |       const person = await resolvePocketBasePersonRecord(targetPersonId).then(r => r ? resolvePocketBasePersonRecord(r.id as string).then(full => full ? [full].map(resolvePocketBasePersonRecord as any) : []) : []);
  114 |       // Actually simpler:
> 115 |       const p = await getPocketBasePersonById(targetPersonId);
      |                 ^
  116 |       if (p) activePeople = [p];
  117 |     } else {
  118 |       const people = await getPocketBasePeople();

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__c3abf807._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:292:27)
    at getPersonWithSubs (src\services\people.service.ts:296:18)
    at Module.generateMetadata (src\app\people\[id]\page.tsx:34:18)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  290 |       };
  291 |     });
> 292 |   } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
      |                           ^
  293 | }
  294 |
  295 | export async function getPersonWithSubs(id: string): Promise<Person | null> {

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__5a3ff7c4._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:292:27)
    at getPersonWithSubs (src\services\people.service.ts:296:18)
    at Module.generateMetadata (src\app\people\[id]\page.tsx:34:18)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  290 |       };
  291 |     });
> 292 |   } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
      |                           ^
  293 | }
  294 |
  295 | export async function getPersonWithSubs(id: string): Promise<Person | null> {

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
[DB:PB] Request FAILED [404] /api/collections/pvl_people_001/records/[object Object]: "{\"data\":{},\"message\":\"The requested resource wasn't found.\",\"status\":404}\n"


    at pocketbaseRequest (src\services\pocketbase\server.ts:142:15)
    at resolvePocketBasePersonRecord (src\services\pocketbase\people.service.ts:66:12)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  140 |     if (!response.ok) {
  141 |       const text = await response.text()
> 142 |       console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
      |               ^
  143 |       throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
  144 |     }
  145 |

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
[DB:PB] Request FAILED [404] /api/collections/pvl_people_001/records/86e8zu84ryav0w1: "{\"data\":{},\"message\":\"The requested resource wasn't found.\",\"status\":404}\n"


    at pocketbaseRequest (src\services\pocketbase\server.ts:142:15)
    at resolvePocketBasePersonRecord (src\services\pocketbase\people.service.ts:73:12)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  140 |     if (!response.ok) {
  141 |       const text = await response.text()
> 142 |       console.error(`[DB:PB] Request FAILED [${response.status}] ${path}:`, text)
      |               ^
  143 |       throw new Error(`PocketBase request failed [${response.status}] ${path}: ${text}`)
  144 |     }
  145 |

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console ReferenceError

## Error Message
getPocketBasePersonById is not defined


    at getPeople (src\services\people.service.ts:115:17)
    at getPersonWithSubs (src\services\people.service.ts:296:18)
    at PeopleDetailContent (src\app\people\[id]\page.tsx:119:18)
    at PeopleDetailPage (src\app\people\[id]\page.tsx:93:7)

## Code Frame
  113 |       const person = await resolvePocketBasePersonRecord(targetPersonId).then(r => r ? resolvePocketBasePersonRecord(r.id as string).then(full => full ? [full].map(resolvePocketBasePersonRecord as any) : []) : []);
  114 |       // Actually simpler:
> 115 |       const p = await getPocketBasePersonById(targetPersonId);
      |                 ^
  116 |       if (p) activePeople = [p];
  117 |     } else {
  118 |       const people = await getPocketBasePeople();

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__c3abf807._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:292:27)
    at getPersonWithSubs (src\services\people.service.ts:296:18)
    at PeopleDetailContent (src\app\people\[id]\page.tsx:119:18)
    at PeopleDetailPage (src\app\people\[id]\page.tsx:93:7)

## Code Frame
  290 |       };
  291 |     });
> 292 |   } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
      |                           ^
  293 | }
  294 |
  295 | export async function getPersonWithSubs(id: string): Promise<Person | null> {

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__5a3ff7c4._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:292:27)
    at getPersonWithSubs (src\services\people.service.ts:296:18)
    at PeopleDetailContent (src\app\people\[id]\page.tsx:119:18)
    at PeopleDetailPage (src\app\people\[id]\page.tsx:93:7)

## Code Frame
  290 |       };
  291 |     });
> 292 |   } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
      |                           ^
  293 | }
  294 |
  295 | export async function getPersonWithSubs(id: string): Promise<Person | null> {

Next.js version: 16.0.10 (Turbopack)
