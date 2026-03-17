TÌNH TRẠNG HIỆN TẠI (GẦN ĐÚNG NHƯNG VẪN SAI)

1) People Row (IMG1) đang SAI do SCOPE
- Original Amount: 289.647.940 ❌
  → Đây là TOTAL (entire year/cross-cycle)
  → Nhưng ROW TABLE phải hiển thị THEO CURRENT CYCLE
  → Tổng (entire year) chỉ được hiển thị khi EXPAND row.

- Repayment: 289.150.883 ❌
- Cashback: 898.733 ❌
→ Cùng lỗi: đang dùng aggregate toàn kỳ/nhiều kỳ cho row current.

- Prev Debt: vẫn đang tồn tại ❌
  → Sau khi reset glossary: cột Prev Debt KHÔNG còn dùng ở People row.
  → Prev Debt chỉ tồn tại trong EXPAND/DETAIL context (hoặc bỏ hẳn nếu đã absorb vào Remaining).

- Remains: 1.784.577
  → Có vẻ ĐÚNG cho current cycle, nhưng cần verify lại công thức sau khi fix scope.

2) Page /people/[id] (IMG2) — HEADER CHƯA ĐỒNG BỘ
- Header details vẫn dùng logic CŨ:
  • Orig. Spend
  • Net Lend
  • Total Repay
- Trong khi /people đã đổi sang:
  • Original Amount
  • Repayment
  • Cashback
  • Remaining Amount

=> /people và /people/[id] HEADER đang dùng 2 bộ chỉ số khác nhau ❌

========================
YÊU CẦU AGENT — FIX CHUẨN, KHÔNG LAN MAN
========================

PHASE 1 — TÁCH RÕ 2 SCOPE (BẮT BUỘC)
Agent phải tách logic rõ ràng:

A) PEOPLE ROW (TABLE)
- Scope: CURRENT CYCLE ONLY
- Hiển thị:
  • Original Amount (Base, current cycle)
  • Repayment (current cycle)
  • Cashback (current cycle)
  • Remaining Amount (Net, current cycle)
- KHÔNG dùng:
  • Prev Debt
  • Aggregate cross-cycle

B) PEOPLE EXPAND ROW / DETAILS
- Scope: ENTIRE YEAR (hoặc multi-cycle)
- Mới được hiển thị:
  • Total Original Amount
  • Total Repayment
  • Total Cashback
  • Previous Debt (nếu cần)
- Expand dùng aggregate riêng, KHÔNG reuse số ở row.

PHASE 2 — UNIFY HEADER DETAILS
- Header của `/people/[id]` PHẢI dùng cùng:
  • glossary
  • naming
  • công thức
với `/people`.

❌ Không được tồn tại 2 hệ thuật ngữ song song.

PHASE 3 — CLEANUP COLUMN
- Remove cột Prev Debt khỏi People table row.
- Nếu cần retain:
  → chỉ hiển thị trong expand/details với tooltip giải thích.

PHASE 4 — VERIFY LẠI
- Với cycle 2026-03:
  • Row numbers ≈ tổng 4 txn trong cycle (≈ 1.8M)
  • Expand numbers ≈ aggregate lớn (289M+…)
- /people và /people/[id] khớp hoàn toàn cho cùng scope.

========================
RULE CUỐI
========================
- Sai hiện tại KHÔNG phải do công thức, mà do DÙNG SAI SCOPE.
- Fix scope xong KHÔNG được phát sinh:
  • số “55.334”
  • hoặc aggregate tổng nhảy vào row current.
- Nếu chưa chắc → dừng lại và re-check glossary + DB.

=> Làm đúng thứ tự:
  1. Scope
  2. Naming
  3. Mapping
  4. Verify
  STOP. READ CAREFULLY.

Có tổng cộng ~6 lỗi trên page /people details.
TẤT CẢ đang bắt nguồn từ 2 vấn đề chính:

============================
A) SYNTAX / STRUCTURE BROKEN
============================

Build hiện FAIL do JavaScript syntax, KHÔNG PHẢI logic tiền.

Các lỗi parse:
- "Expression expected"
- "Expected ',', got 'const'"
- "Unexpected token '}'"

Nguyên nhân gốc:
- Có `const / if` đặt TRỰC TIẾP trong:
  • reduce(...)
  • JSX expression
→ JS chỉ cho phép expression, không cho statement.

YÊU CẦU:
1. Fix SYNTAX trước, không được sửa logic.
2. Trong `.reduce()`:
   - Mọi `const`, `if` PHẢI nằm trong callback `(acc, txn) => { ... }`
3. Kiểm tra lại tất cả `{ } ( ) <>` trong:
   - use-person-details.ts
   - MemberDetailView.tsx
4. Remove mọi HTML entity còn sót:
   - `&amp;` → `&&`
   - `&lt;` → `<`
5. Build PHẢI PASS trước khi làm việc khác.

Nếu syntax chưa pass → DỪNG.

============================
B) BUSINESS LOGIC (CHƯA CHẠM)
============================

Sau khi build pass, mới quay lại:
- MONEY_GLOSSARY.md
- task.md (scope & mapping)
- VERIFY_ONLY.md

TUYỆT ĐỐI:
- Không sửa số
- Không sửa UI
- Không sửa scope

khi build chưa pass.

============================
RULE CUỐI
============================
Fix theo THỨ TỰ:
1. Syntax
2. Build pass
3. Verify raw DB
4. Sau đó mới được đụng logic tiền

Nếu còn lỗi parse → in toàn bộ block code gây lỗi và đọc như JS engine, không suy diễn.