## Error Type
Console TypeError

## Error Message
Cannot read properties of undefined (reading 'localeCompare')


    at <anonymous> (src\services\people.service.ts:235:31)
    at Array.sort (<anonymous>:1:19)
    at <anonymous> (src\services\people.service.ts:235:10)
    at Array.map (<anonymous>:1:18)
    at getPeople (src\services\people.service.ts:214:25)
    at Promise.all (<anonymous>:1:20)
    at PeopleV2Page (src\app\people\page.tsx:18:66)
    at PeopleV2Page (<anonymous>:null:null)

## Code Frame
  233 |           remains: Math.round(cs.balance),
  234 |         }))
> 235 |         .sort((a, b) => b.tag.localeCompare(a.tag));
      |                               ^
  236 |
  237 |       const currentCycleStats = cycleStatsMap?.get(currentMonthTag);
  238 |

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__2437c96b._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:259:13)
    at Promise.all (<anonymous>:1:20)
    at PeopleV2Page (src\app\people\page.tsx:18:66)
    at PeopleV2Page (<anonymous>:null:null)

## Code Frame
  257 |     });
  258 |   } catch (error) {
> 259 |     console.error("[DB:PB] getPeople failed:", error);
      |             ^
  260 |     return [];
  261 |   }
  262 | }

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__03ed81c3._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:259:13)
    at Promise.all (<anonymous>:1:20)
    at PeopleV2Page (src\app\people\page.tsx:18:66)
    at PeopleV2Page (<anonymous>:null:null)

## Code Frame
  257 |     });
  258 |   } catch (error) {
> 259 |     console.error("[DB:PB] getPeople failed:", error);
      |             ^
  260 |     return [];
  261 |   }
  262 | }

Next.js version: 16.0.10 (Turbopack)
