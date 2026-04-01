## Error Type
Console TypeError

## Error Message
Cannot read properties of null (reading 'baseLend')


    at <anonymous> (src\services\people.service.ts:273:26)
    at Array.forEach (<anonymous>:1:22)
    at <anonymous> (src\services\people.service.ts:272:35)
    at Array.map (<anonymous>:1:18)
    at getPeople (src\services\people.service.ts:246:25)
    at Promise.all (<anonymous>:1:20)
    at PeopleV2Page (src\app\people\page.tsx:18:66)
    at PeopleV2Page (<anonymous>:null:null)

## Code Frame
  271 |       let dbLend = 0, dbBack = 0, dbRepay = 0;
  272 |       Array.from(cycles.values()).forEach(c => {
> 273 |          dbLend += c.raw.baseLend;
      |                          ^
  274 |          dbBack += c.raw.cashback;
  275 |          dbRepay += c.raw.repaid;
  276 |       });

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__3e8392ac._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:354:27)
    at Promise.all (<anonymous>:1:20)
    at PeopleV2Page (src\app\people\page.tsx:18:66)
    at PeopleV2Page (<anonymous>:null:null)

## Code Frame
  352 |       };
  353 |     });
> 354 |   } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
      |                           ^
  355 | }
  356 |
  357 | export async function getPersonWithSubs(id: string): Promise<Person | null> {

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console Error

## Error Message
C:\Users\nam.thanhnguyen\Personal_Project\money-flow-3\.next-dev\dev\server\chunks\ssr\[root-of-the-server]__03ed81c3._.js: Invalid source map. Only conformant source maps can be used to find the original code. Cause: Error: sourceMapURL could not be parsed


    at getPeople (src\services\people.service.ts:354:27)
    at Promise.all (<anonymous>:1:20)
    at PeopleV2Page (src\app\people\page.tsx:18:66)
    at PeopleV2Page (<anonymous>:null:null)

## Code Frame
  352 |       };
  353 |     });
> 354 |   } catch (err) { console.error("[PB] getPeople Error:", err); return []; }
      |                           ^
  355 | }
  356 |
  357 | export async function getPersonWithSubs(id: string): Promise<Person | null> {

Next.js version: 16.0.10 (Turbopack)
