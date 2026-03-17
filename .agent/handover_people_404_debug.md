# Handover: People Details 404/400 Debugging

> [!IMPORTANT]
> The People page and Detail pages are currently failing with 404 (Next.js notFound) and 400 (PocketBase request failed) because several files in the service layer are still using generic collection names instead of the specific production collection IDs.

## 🚩 Root Cause

Most service functions were originally written for a Supabase-like schema with names like `transactions`, `people`, and `accounts`. The production PocketBase instance requires specific IDs starting with `pvl_`.

### Collection ID Mapping Table
| Generic Name | Production ID |
| :--- | :--- |
| `transactions` | `pvl_txn_001` |
| `people` | `pvl_people_001` |
| `accounts` | `pvl_acc_001` |
| `categories` | `pvl_cat_001` |
| `shops` | `pvl_shop_001` |
| `installments` | `pvl_inst_001` |
| `services` | `pvl_serv_001` |
| `service_members` | `pvl_smb_001` (Needs verification in `schema.json`) |

---

## 🛠️ Tasks for Next Agent

### 1. Complete Collection Renaming
The following files still contain hardcoded generic names that trigger 400 errors:

- **`src/services/debt.service.ts`**:
    - Line 119: `pocketbaseList<any>('transactions', ...)`
    - Line 133: `pocketbaseList<any>('transactions', ...)`
    - Line 143: `pocketbaseGetById<any>('people', ...)`
    - Lines 176, 179: `toPocketBaseId(id, 'people')`, `pocketbaseGetById<any>('people', ...)`
    - Line 206: `pocketbaseList<any>('transactions', ...)`
    - Line 519: `toPocketBaseId(personId, 'people')`
    - Line 523: `pocketbaseList<any>('transactions', ...)`

- **`src/services/split-bill.service.ts`**:
    - Lines 130, 131, 132: `toPocketBaseId(..., 'accounts'/'categories'/'people')`
    - Lines 141, 150, 168, 173, 205, 206, 207, 216, 224, 227, 232: Still use `transactions`, `accounts`, `people`, etc.

- **`src/services/people.service.ts`**:
    - Lines 430: `pocketbaseList<any>("service_members", ...)` (Check if it should be `pvl_smb_001`)
    - Lines 722, 734, 739: `pocketbaseList("accounts", ...)`, `pocketbaseGetById("people", ...)`, `pocketbaseCreate("accounts", ...)`

### 2. ID Mapping Refinement
The user ID `wlv4acbrq11l8de` is **13 characters**.
The `toPocketBaseId` function in `src/services/pocketbase/server.ts` has a regex check for exactly **15 characters**:
```typescript
if (/^[a-z0-9]{15}$/.test(sourceId)) {
    return sourceId
}
```
If the ID is 13 characters, it will fall through to the hashing logic, creating a mismatched 15-char hash.
- **Fix**: Update the regex to handle varied-length PocketBase IDs or refine the logic to detect native IDs more reliably.

### 3. Verification
- After renaming, check the terminal logs.
- If you see `[DB:PB] ... failed [400] /api/collections/.../records`, it means a collection name is still wrong.
- Ensure `getPersonWithSubs` successfully returns a person object so that the page doesn't trigger `notFound()`.

---

## 📝 Recent Progress Summary
- Renamed collections in `transaction.service.ts`.
- Renamed collections in `pocketbase/people.service.ts`.
- Aligned `PeopleHeader` and `use-person-details` logic with the **Money Flow 3 Glossary** (Net Lend, Remaining Amount, etc.).
- Fixed JSX parsing errors in `MemberDetailView.tsx`.

**Last Active Agent State**: 6/6 People Details logic bugs are likely fixed, but data cannot be fetched due to the naming issues above.
