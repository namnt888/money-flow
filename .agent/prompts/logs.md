🚨 INTEGRATED TASK — PEOPLE DETAILS BROKEN (6/6 BUGS) 🚨
READ CAREFULLY. DO NOT SKIP STEPS.

PAGE AFFECTED:
- /people
- /people/[id]  (example: http://localhost:3001/people/wlv4acbrq11l8de)
- Repro: mở People list → Open person in new tab

====================================================
CURRENT STATUS
====================================================

Page /people/[id] hiện tại GÃY NẶNG:
- Build fail / runtime fail
- Khi render được thì số liệu SAI HOÀN TOÀN
- Tổng cộng **6 BUG RIÊNG BIỆT**, không được gộp nhầm

====================================================
THE 6 REAL BUGS (DO NOT MIX)
====================================================

❌ BUG #1 — JS PARSE ERROR (HARD BLOCKER)
- Errors:
  • Parsing ecmascript source code failed
  • Expression expected
  • Expected ',', got 'const'
  • Unexpected token '}'
- Files:
  • src/hooks/use-person-details.ts
  • src/components/people/v2/MemberDetailView.tsx
- Root cause:
  • const / if đặt trực tiếp trong expression
  • reduce() / JSX bị dùng sai cú pháp
- Status:
  ⛔ App không render được
- Rule:
  👉 FIX BUG #1 FIRST OR STOP

----------------------------------------------------

❌ BUG #2 — RUNTIME Reference / TDZ ERROR
- Errors:
  • Cannot access 'rawAmount' before initialization
- File:
  • src/services/people.service.ts
- Root cause:
  • let/const dùng trước khi khai báo
- Status:
  ⛔ Crash khi load page

----------------------------------------------------

❌ BUG #3 — WRONG DATA SCOPE (CURRENT vs AGGREGATE)
- Symptoms:
  • People ROW hiển thị:
    - Original Amount = 289,647,940 (WRONG)
    - Repayment = 289,150,883
    - Cashback = 898,733
- Reality:
  • Đây là ENTIRE YEAR / MULTI-CYCLE aggregate
  • ROW phải là CURRENT CYCLE (~1.8M)
- Root cause:
  • reuse aggregate selector cho row
- Status:
  ❌ Business logic major bug

----------------------------------------------------

❌ BUG #4 — HEADER INCONSISTENCY (/people vs /people/[id])
- /people uses:
  • Original Amount
  • Repayment
  • Cashback
  • Remaining Amount
- /people/[id] header uses:
  • Orig. Spend
  • Net Lend
  • Total Repay
- Root cause:
  • header detail chưa refactor theo glossary
- Status:
  ❌ Inconsistent logic & UX

----------------------------------------------------

❌ BUG #5 — PREV DEBT COLUMN SHOULD NOT EXIST IN ROW
- Symptoms:
  • Prev Debt vẫn xuất hiện ở People table row
  • Giá trị “—” hoặc sai ngữ nghĩa
- Root cause:
  • Glossary mới đã loại Prev Debt khỏi ROW
  • UI + mapping chưa cleanup
- Rule:
  • Prev Debt chỉ được tồn tại ở EXPAND / DETAILS (nếu cần)

----------------------------------------------------

❌ BUG #6 — REMAINING VALUE NOT VERIFIABLE
- Symptom:
  • Remains = 1,784,577 (looks OK)
- BUT:
  • Base, Repay, Cashback đều sai scope
  • → Remains chỉ đúng NGẪU NHIÊN
- Status:
  ⚠️ Không được xác nhận cho tới khi #1–#5 xong

====================================================
MANDATORY FIX ORDER (NO EXCEPTIONS)
====================================================

STEP 1 — SYNTAX STABILITY
✅ Fix BUG #1 + BUG #2 ONLY
- Không sửa logic tiền
- Không sửa UI
- Mục tiêu:
  • next build PASS
  • Page render được

----------------------------------------------------

STEP 2 — SCOPE SEPARATION
- PEOPLE TABLE ROW:
  • CURRENT CYCLE ONLY
  • Original Amount (current)
