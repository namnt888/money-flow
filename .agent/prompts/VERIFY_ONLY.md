# VERIFY_ONLY — QA WALKTHROUGH

## PHẠM VI
- Áp dụng cho mọi task liên quan:
  - Money flow
  - People / Accounts / Financial Portfolio
- Verify dựa trên **DB PocketBase thật** và UI hiện tại.

---

## VERIFY 0 — SETUP
- Đã chạy:
  - `next dev` thành công
  - Không crash runtime
- Đã đăng nhập PocketBase (email/pass từ .env.local)

✅ PASS nếu vào được app và load trang test.

---

## VERIFY 1 — DATA SOURCE
- Mở DevTools → Network
- Load trang cần test (`/people`, `/people/[id]`, `/accounts/...`)

✅ EXPECT:
- API fetch từ **PocketBase**
- Không dùng mock, cache cũ
- Có cycle param đúng

❌ FAIL nếu:
- Data đến từ source không xác định
- Không match cycle đang test

---

## VERIFY 2 — RAW DATA CHECK (BẮT BUỘC)
- Dùng API / simulator:
  - Pull raw transactions theo:
    - personId
    - cycle
- QA **tự cộng tay**:
  - total spend
  - total cashback
  - total repayment

✅ PASS nếu:
- Raw total = tổng DB

---

## VERIFY 3 — LOGIC NUMBERS CHECK
So sánh UI với DB:

| Chỉ số | Điều kiện đúng |
|------|---------------|
| Original Amount | = tổng spend |
| Cashback Total | = tổng cashback |
| Repayment | = tổng repay |
| Net Amount | = Original − Cashback |
| Remaining | = Net − Repayment |

❌ FAIL nếu bất kỳ giá trị nào lệch DB.

---

## VERIFY 4 — PEOPLE LIST vs DETAILS
- Mở `/people`
- Chọn 1 person
- Mở `/people/[id]`

✅ PASS nếu:
- Số **khớp 100%**
- Không có công thức khác nhau giữa 2 page

---

## VERIFY 5 — CYCLE SCOPE
- Đổi cycle (nếu có)
✅ PASS nếu:
- Số liệu thay đổi đúng cycle
- Không leak dữ liệu cycle khác

---

## VERIFY 6 — EDGE CASES
- Chưa repay → Repayment = 0
- Có rollover → không tính vào repay
- Không cashback → Cashback = 0

---

## RESULT
- ✅ PASS / ❌ FAIL cho từng verify
- Nếu FAIL:
  - Ghi rõ chỉ số nào sai
  - Attach screenshot + DB total