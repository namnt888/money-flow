# Fix Task: transaction-actions.ts — Missing Imports + server-only Leakage

## Context từ summary
Agent đã xác nhận 2 root cause chính:
1. `src/actions/transaction-actions.ts` gọi các hàm không được import/không tồn tại.
2. `unified-transaction-table.tsx` (Client Component) import trực tiếp từ `transaction.service.ts` → kéo `server-only` vào client bundle.

---

## Fix 1 — transaction-actions.ts: Resolve tất cả undefined functions

### Bước 1: Audit imports hiện tại
Mở `src/actions/transaction-actions.ts`.
Liệt kê tất cả functions đang được gọi nhưng chưa có import:
- `pocketbaseGetById`, `pocketbaseCreate`, `pocketbaseUpdate`, `pocketbaseList`, `pocketbaseDelete`
- `toPocketBaseId`
- `createPBTransaction`, `updatePBTransaction`, `voidPBTransaction`, `confirmPBRefund`
- `syncTransactionToSheet`
- `getAccountsAction`

### Bước 2: Phân loại từng function
Với mỗi function trên, tìm trong codebase xem nó đang tồn tại ở đâu:
- Search `src/services/pocketbase/server.ts` — tìm: `pocketbaseGetById`, `pocketbaseCreate`, `pocketbaseUpdate`, `pocketbaseList`, `toPocketBaseId`.
- Search `src/services/pocketbase/people.service.ts`, `transaction.service.ts` — tìm: `createPBTransaction`, `updatePBTransaction`, `voidPBTransaction`, `confirmPBRefund`.
- Search `src/actions/` — tìm: `getAccountsAction`, `syncTransactionToSheet`.

### Bước 3: Fix theo từng trường hợp

**Trường hợp A — Function tồn tại, chỉ thiếu import:**
Thêm import đúng đường dẫn vào đầu file.
Ví dụ:
```ts
import {
  pocketbaseGetById,
  pocketbaseCreate,
  pocketbaseUpdate,
  pocketbaseList,
  toPocketBaseId,
} from '@/services/pocketbase/server'
```
Lưu ý: `transaction-actions.ts` là Server Action (`'use server'`), nên import từ `server.ts` là hợp lệ.

**Trường hợp B — Function không tồn tại (createPBTransaction, updatePBTransaction, voidPBTransaction, confirmPBRefund):**
Đây là wrapper function chưa được tạo. Refactor các call này để gọi trực tiếp `pocketbaseCreate`, `pocketbaseUpdate` với đúng params thay vì qua wrapper không tồn tại.
Không tạo thêm file mới — inline logic vào action function hiện tại.

**Trường hợp C — getAccountsAction không tồn tại trong transaction-actions.ts:**
Search toàn repo tìm `getAccountsAction`. Nếu tồn tại ở file khác: import từ đó.
Nếu không tồn tại: tạo một Server Action đơn giản trong `src/actions/account-actions.ts`:
```ts
'use server'
export async function getAccountsAction() {
  // fetch accounts from PocketBase
}
```
Sau đó update import trong file đang dùng nó.

**Trường hợp D — syncTransactionToSheet:**
Search repo tìm function này. Nếu tồn tại: import đúng path.
Nếu không tồn tại: stub nó với `async function syncTransactionToSheet() { /* TODO */ }` và log warning.

### Bước 4: Fix `Parameter 'err' implicitly has 'any' type`
Tìm tất cả `catch (err)` trong file và thêm type:
```ts
catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err)
}
```

---

## Fix 2 — unified-transaction-table.tsx: Loại bỏ server-only leakage

### Root cause đã xác nhận
`unified-transaction-table.tsx` (Client Component) import:
```ts
import { deleteTransaction, getTransactionById } from "@/services/transaction.service"
```
`transaction.service.ts` import từ `server.ts` (có `import 'server-only'`) → compile fail.

### Fix
1. Mở `unified-transaction-table.tsx`, tìm tất cả import từ `transaction.service.ts`.
2. Với mỗi function được import, tìm xem đã có Server Action wrapper trong `src/actions/transaction-actions.ts` chưa.
   - Nếu có: thay import từ service → import từ actions file.
   - Nếu chưa có: tạo Server Action wrapper trong `transaction-actions.ts`:
     ```ts
     export async function getTransactionByIdAction(id: string) {
       const { pocketbaseGetById } = await import('@/services/pocketbase/server')
       return pocketbaseGetById('transactions', id)
     }
     ```
3. Đảm bảo `unified-transaction-table.tsx` KHÔNG import bất cứ thứ gì từ:
   - `src/services/pocketbase/server.ts`
   - `src/services/transaction.service.ts`
   - `src/services/pocketbase/*.service.ts`
   Chỉ được import từ `src/actions/`.

---

## Fix 3 — amount-input.tsx: onFocus missing prop

Mở `src/components/ui/amount-input.tsx`.
Tìm interface `SmartAmountInputProps`.
Thêm: `onFocus?: () => void`
Pass nó xuống underlying `<input>`: `<input ... onFocus={onFocus} />`

---

## Yêu cầu sau khi fix

1. Chạy `npx tsc --noEmit` — phải về 0 errors.
2. Test compile 2 routes:
   - `GET /transactions` — không còn 500, không còn `server-only` error.
   - `GET /people/[id]` — không còn 500, không còn `server-only` error.
3. Không thay đổi bất kỳ business logic nào — chỉ fix imports, types, và boundary violations.

---

## Thứ tự fix
1. `src/actions/transaction-actions.ts` — fix tất cả undefined functions (Fix 1).
2. `src/components/moneyflow/unified-transaction-table.tsx` — loại bỏ server-only leakage (Fix 2).
3. `src/components/ui/amount-input.tsx` — fix onFocus prop (Fix 3).
4. Chạy `tsc --noEmit` và confirm 0 errors.