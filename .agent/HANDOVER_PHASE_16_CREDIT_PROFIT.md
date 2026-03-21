# Handover: People Sync Completion & Phase 16 Kick-off

## 🎯 Completed: People Sync & Data Integrity
We have successfully finalized the Google Sheets synchronization for the People module and restored historical data integrity.

### 1. Architecture & API
- **PocketBase Support**: The `/api/sheets/manage` route now fully supports PocketBase IDs. It stores `person_cycle_sheets` directly in PB when applicable.
- **Robust Sync**: Added better error handling and `requestId` tracking to avoid silent failures on Next.js 16/Turbopack.
- **Automation**: Updated `pnpm run sheet:people` (push-sheet.mjs) with a **5-second countdown**. It giờ đây sẽ tự động push cho TẤT CẢ các profile nếu không có lựa chọn nào được nhập.

### 2. Data Restoration (PocketBase)
- **Service Shop Fix**:
    - Đã gắn `shop_id` của Youtube/iCloud vào bản ghi Service tương ứng.
    - Backfill thành công **10+ giao dịch** đang bị trống `shop_id`.
- **Repayment Fix**:
    - Tự động gán `to_account_id` cho hơn 50 giao dịch repayment dựa trên "Default Bank Account" của từng người.
    - Kết quả: Cột K (ShopSource) trên Sheet giờ đã hiện tên Ngân hàng thay vì "Draft Fund".

### 3. Google Sheets (Code.js)
- **Image Scaling**: Chuyển về Mode 1 (Giữ tỷ lệ).
- **Bug Fix**: Định nghĩa biến `escapedUrl` bị thiếu, giúp script không bị lỗi và chèn ảnh QR thành công vào `N7:O21`.

---

## 🚀 Phase 16: Credit Card Advance & Profit Tracking
**Trọng tâm**: Quản lý luồng rút tiền mặt từ thẻ tín dụng (để lấy cashback) và theo dõi lợi nhuận sau khi trừ phí dịch vụ.

### Key Requirements:
1. **Withdrawal Logic**: Ghi nhận việc rút tiền như một giao dịch "Transfer" (về ví/bank của mình) hoặc "Debt" (nếu nhờ người khác cầm hộ).
2. **Fee Management**: Theo dõi phí trả cho dịch vụ rút (ví dụ: phí 2%).
3. **Cashback Tracking**: Liên kết số tiền rút với luật cashback của thẻ (ví dụ: được hoàn 3%).
4. **Profit Calculation**: 
   - `Profit = Cashback - Withdrawal Fee`.
   - Cần UI để theo dõi tổng tiền lời đang treo và đánh dấu "đã thu tiền" (Claimed).

---
**Status**: Sẵn sàng triển khai.
**Last Action**: Đã commit toàn bộ thay đổi và cập nhật script tự động hóa.
