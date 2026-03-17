# AGENT SELF‑REVIEW CHECKLIST (PRE‑PR)

❗ Nếu trả lời “KHÔNG” cho bất kỳ câu hỏi nào → KHÔNG ĐƯỢC MERGE.

---

## DATA & LOGIC
- [ ] Tôi đã đọc `MONEY_GLOSSARY.md`
- [ ] Tôi có thể giải thích từng chỉ số bằng 1 câu
- [ ] Tôi đã verify bằng raw DB (API / simulator)
- [ ] Tôi không đoán số liệu

---

## COMPUTATION
- [ ] Spend / Repay / Cashback / Rollover không bị trộn
- [ ] Rollover không được tính là repayment
- [ ] Net = Base − Cashback
- [ ] Remaining = Net − Repayment

---

## CONSISTENCY
- [ ] `/people` và `/people/[id]` dùng chung logic
- [ ] Không có duplicate công thức
- [ ] Cycle scope rõ ràng

---

## TEST
- [ ] Tôi test case chưa repay
- [ ] Tôi test case có rollover
- [ ] Tôi test cycle khác

---

## UI SAFETY
- [ ] Tôi không sửa UI trước khi logic đúng
- [ ] Tôi không đổi tên cột khi chưa confirm glossary

---

## FINAL
- [ ] QA VERIFY_ONLY.md PASS toàn bộ
- [ ] Tôi có thể viết lại công thức không nhìn code

✅ Chỉ khi tất cả đều check, PR mới hợp lệ.