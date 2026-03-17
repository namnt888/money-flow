# MONEY GLOSSARY — SINGLE SOURCE OF TRUTH

⚠️ Tất cả thuật ngữ dưới đây dùng CHUNG cho:
- UI
- Service
- API
- Logic
- Document

Agent không được tự diễn giải khác.

---

## TRANSACTION TYPES

### Spend
- Giao dịch chi tiền
- Làm tăng nợ

### Repayment
- Giao dịch trả nợ
- Làm giảm nợ

### Cashback
- Tiền hoàn
- Làm giảm Net Amount
- KHÔNG phải repayment

### Rollover
- Chuyển nợ từ kỳ trước
- KHÔNG phải repayment
- Chỉ dùng để tính Prev Debt

---

## CORE METRICS (ĐỊNH NGHĨA CHUẨN)

### Original Amount (Base)
= Tổng **Spend** theo cycle

### Cashback Total
= Tổng **Cashback** theo cycle

### Net Amount
= Original Amount − Cashback Total

### Repayment Amount
= Tổng **Repayment** thực sự
(KHÔNG tính rollover)

### Remaining Amount (Net)
= Net Amount − Repayment Amount

### Previous Debt
= Nợ carry từ cycle trước
(CÓ rollover, KHÔNG cộng vào repayment)

---

## UI NAMING (BẮT BUỘC DÙNG)

| UI Label | Nghĩa |
|-------|------|
| Original Amount | Base |
| Repayment | Settled |
| Cashback Total | Cashback |
| Remaining Amount | Remains |
| Previous Debt | Prev Debt |

❌ CẤM dùng “Base Lend”, “Settled” mơ hồ khi logic chưa rõ.