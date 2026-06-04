# Đặc tả nghiệp vụ: Batch Transfer (Chuyển khoản theo lô)

## 1) Tổng quan nghiệp vụ

`Batch Transfer` (Chuyển khoản theo lô) là quy trình xử lý hàng loạt các giao dịch chuyển tiền từ một tài khoản nguồn đến nhiều tài khoản đích khác nhau. Quy trình này thường được sử dụng cho các mục đích như:
- Thanh toán lương cho nhân viên.
- Thanh toán cho các nhà cung cấp/hộ kinh doanh.
- Chuyển tiền định kỳ cho nhiều người nhận.

Mục tiêu của hệ thống Batch Transfer là tự động hóa việc tạo giao dịch, đồng bộ dữ liệu với Google Sheets để thực hiện chuyển khoản thực tế qua ngân hàng (MBB, VIB), và quản lý trạng thái xác nhận nhận tiền.

## 2) Quy trình 3 bước (3-Step Lifecycle)

Quy trình Batch Transfer trong Money Flow tuân thủ mô hình 3 bước để đảm bảo tính chính xác của dòng tiền:

### Bước 1: Funding (Cấp vốn) - `Step 1`
- **Mô tả:** Chuyển tổng số tiền cần thiết từ **Source Account** (ví dụ: Techcombank) vào tài khoản trung gian **BATCH_CLEARING**.
- **Giao dịch tạo ra:** 1 giao dịch `type = transfer`, `source_account_id = [Source]`, `target_account_id = BATCH_CLEARING`.
- **Mục đích:** "Khóa" số tiền sẽ chi tiêu, đảm bảo số dư tài khoản nguồn phản ánh đúng số tiền còn lại sau khi đã dành ra một khoản cho lô chuyển khoản.

### Bước 2: Export (Xuất dữ liệu) - `Step 2`
- **Mô tả:** Đẩy danh sách các mục tin trong lô (Batch Items) sang Google Sheets thông qua Google Apps Script (GAS).
- **Hành động:** Hệ thống gọi đến endpoint GAS được cấu hình trong `batch_settings`.
- **Dữ liệu:** Bao gồm tên người nhận, số tài khoản, tên ngân hàng, số tiền và nội dung chuyển khoản được chuẩn hóa.

### Bước 3: Confirmation (Xác nhận) - `Step 3`
- **Mô tả:** Khi lệnh chuyển khoản thực tế tại ngân hàng thành công, user xác nhận từng mục tin trên UI.
- **Giao dịch tạo ra:** Với mỗi item được xác nhận, hệ thống tạo 1 giao dịch `type = transfer`, `source_account_id = BATCH_CLEARING`, `target_account_id = [Recipient Account]`.
- **Mục đích:** Ghi nhận tiền đã thực sự đi từ tài khoản trung gian đến tài khoản đích, làm giảm số dư tại `BATCH_CLEARING`.

## 3) Thực thể dữ liệu (Entities)

### 3.1 Batches
Lưu thông tin tổng quát về một lô chuyển khoản.
- `id`: UUID
- `name`: Tên lô (ví dụ: "Lương tháng 03/2026")
- `bank_type`: Loại ngân hàng xử lý (`MBB` hoặc `VIB`)
- `status`: Trạng thái (`draft`, `funded`, `completed`, `archived`)
- `source_account_id`: Tài khoản nguồn cấp vốn.
- `month_year`: Tag tháng áp dụng (YYYY-MM).
- `funding_transaction_id`: Link tới giao dịch Step 1.

### 3.2 Batch Items
Chi tiết từng người nhận trong một lô.
- `batch_id`: Link tới Batch cha.
- `receiver_name`: Tên người nhận.
- `bank_number`: Số tài khoản nhận.
- `bank_name`: Tên ngân hàng nhận (đã chuẩn hóa kèm mã bank).
- `amount`: Số tiền.
- `status`: Trạng thái (`pending`, `confirmed`).
- `transaction_id`: Link tới giao dịch Step 3 (khi đã confirmed).
- `master_item_id`: Link tới thông tin mẫu trong Master Items.

### 3.3 Batch Master Items
Danh mục "danh bạ" những người thường xuyên nhận tiền.
- Dùng để map tự động `target_account_id` và các thông tin ngân hàng khi import lô mới.
- Giúp duy trì tính nhất quán của dữ liệu người nhận.

### 3.4 Batch Settings
Cấu hình cho từng loại ngân hàng (MBB/VIB).
- `sheet_url`: Link Google Sheet mục tiêu.
- `gas_endpoint`: URL của Apps Script xử lý export.

## 4) Tài khoản trung gian: BATCH_CLEARING

Tài khoản `BATCH_CLEARING` (UUID: `88888888-9999-9999-9999-888888888888`) đóng vai trò then chốt:
- **Số dư lý tưởng:** Phải bằng 0 sau khi lô hoàn tất.
- **Dư nợ dương:** Nghĩa là tiền đã được cấp vốn (Step 1) nhưng chưa xác nhận chuyển hết (Step 3).
- **Dư nợ âm:** Lỗi nghiệp vụ (Xác nhận chuyển tiền nhiều hơn số vốn đã cấp).

## 5) Các tính năng nâng cao

### 5.1 Smart Sort (Sắp xếp thông minh)
Tự động sắp xếp thứ tự các mục tin trong lô theo:
1. Nhóm theo ngân hàng (`bank_code`).
2. Trong mỗi nhóm, ưu tiên các giao dịch có số tiền lớn nhất lên đầu.
- **Lý do:** Giúp việc kiểm tra và thực hiện lệnh tại ngân hàng dễ dàng hơn, tránh nhầm lẫn.

### 5.2 Auto-cloning & Month Cycle
- Hỗ trợ tạo lô mới cho tháng tiếp theo bằng cách clone từ lô tháng trước.
- Tự động cập nhật nội dung chuyển khoản (`note`) theo tháng mới (ví dụ: đổi "T3/2026" thành "T4/2026").

### 5.3 Sync Master Data
- Cho phép cập nhật thông tin từ lô hiện tại vào danh sách Master Items để sử dụng cho các lần sau.

## 6) Quy tắc nghiệp vụ bắt buộc (Business Rules)

- **RULE-BCH-001:** Chỉ được confirm Step 3 khi Batch đã ở trạng thái `funded` (đã qua Step 1).
- **RULE-BCH-002:** Không được phép xóa Batch Item đã ở trạng thái `confirmed`. Phải void giao dịch liên quan trước.
- **RULE-BCH-003:** Khi thay đổi số tiền trong lô sau khi đã Step 1, hệ thống phải cập nhật lại giao dịch Funding (TXN1) hoặc tạo giao dịch bổ sung để đảm bảo khớp số liệu.
- **RULE-BCH-004:** Giao dịch tại Step 3 mặc định sử dụng danh mục `MONEY_TRANSFER` (UUID: `e0000000-0000-0000-0000-000000000080`), trừ trường hợp note chứa "Online Service" sẽ map vào danh mục tương ứng.

## 7) Tích hợp Google Sheets

Hệ thống gửi payload JSON qua POST request tới GAS:
```json
{
  "bank_type": "MBB",
  "sheet_name": "Sheet1",
  "spreadsheet_url": "...",
  "items": [
    {
      "receiver_name": "NGUYEN VAN A",
      "bank_number": "123456789",
      "amount": 5000000,
      "note": "THANH TOAN LUONG T3/2026",
      "bank_name": "VIETCOMBANK (VCB)"
    }
  ]
}
```
GAS có nhiệm vụ append dữ liệu này vào đúng tab và định dạng yêu cầu của ngân hàng.
