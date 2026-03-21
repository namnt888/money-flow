# Phase 25 Plan: Quản lý Đáo hạn/Rút tiền Thẻ tín dụng (Credit Card Cash Advance / Arbitrage)

## 📌 Bài toán (Use Case)
Thẻ tín dụng có tính năng hoàn tiền (Ví dụ: 3%). 
Người dùng muốn rút tiền mặt từ thẻ này thông qua dịch vụ quẹt thẻ (chịu phí 2%).
Lợi nhuận ròng thu về = `3% (Bank Back)` - `2% (Phí rút)` = `1% (Net Profit)`.
Làm sao để hệ thống Money Flow 3 ghi nhận chính xác dòng tiền và tính toán lợi nhuận này mà không làm hỏng logic nợ/hoàn tiền hiện tại?

## 💡 Đề xuất Giải pháp: Sử dụng "People" để tracking (Mô hình Dịch vụ là Con Nợ)
Giống như cách hệ thống đang xử lý "Shared Bills", chúng ta sẽ coi bên dịch vụ rút thẻ là một `Person` (Ví dụ: `Dịch vụ Đáo hạn thẻ`).

### Bước 1: Ghi nhận Expense & Sinh Cashback
*   **Hành động**: Bạn quẹt thẻ tại dịch vụ (Rót tiền từ Credit Card sang Dịch vụ).
*   **Giao dịch**: 
    *   **Type**: `Expense` (hoặc `Debt` tùy theo định nghĩa UI để gom nợ).
    *   **Source Account**: Thẻ tín dụng (Ví dụ: Vpbank Lady).
    *   **Person**: `Dịch vụ quẹt thẻ`.
    *   **Amount**: Tống số tiền quẹt (Ví dụ: 100M).
    *   **Category**: `Credit Advance` hoặc `Rút tiền thẻ`.
*   **Kết quả**: 
    *   Hệ thống tự động tính Cashback `3%` (3tr) cho thẻ này.
    *   Dashboard báo bạn đang "Cho mượn" (Lent) Dịch vụ 100M.

### Bước 2: Ghi nhận Tiền mặt nhận về (Repayment)
*   **Hành động**: Dịch vụ chuyển khoản hoặc đưa tiền mặt lại cho bạn.
*   **Giao dịch**:
    *   **Type**: `Repayment` (hoặc Transfer / Income từ Person).
    *   **Target Account**: Tài khoản Ngân hàng / Tiền mặt.
    *   **Person**: `Dịch vụ quẹt thẻ`.
    *   **Amount**: Số tiền nhận về (100M).
*   **Kết quả**: 
    *   Khoản nợ của Dịch vụ = 0.
    *   Tiền đã chảy vào Ngân hàng của bạn đúng 100M.

### Bước 3: Ghi nhận Phí rút tiền (Fee)
*   **Hành động**: Trả tiền phí cho dịch vụ.
*   **Giao dịch**:
    *   **Type**: `Expense`.
    *   **Source Account**: Tài khoản Ngân hàng / Tiền mặt.
    *   **Amount**: `2% * 100M = 2M`.
    *   **Category**: `Banking Fee` hoặc `Chi phí Quẹt thẻ`.
*   **Kết quả cuối cùng**:
    *   Cashback kiếm được: + 3,000,000 (Từ thẻ tín dụng).
    *   Phí đã trả: - 2,000,000.
    *   **Net Profit tổng cục thực tế**: + 1,000,000. Lợi nhuận hiển thị đúng.

### 🌟 Tính năng Mở rộng (Có thể dev trong Phase 25):
Để quy trình này nhanh chóng hơn (chỉ cần 1 nút bấm):
1. **Quick Action "Cash Advance"**: Nhập Amount (100M), Fee Rate (2%), chọn Thẻ, chọn Bank. Hệ thống tự tách ra làm 3 giao dịch nội bộ phía dưới:
   - Giao dịch 1: `Expense` từ thẻ (100M).
   - Giao dịch 2: `Repay` vào Bank (100M).
   - Giao dịch 3: `Expense` từ Bank (2M phí).
2. Tự động hiển thị `Profit = Cashback - Fee` ngay trên bảng thông báo.
