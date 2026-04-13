# PROMPT: Giao việc fix bug Sync Sheet

**Bối cảnh:** Hiện tại hệ thống đang bị lỗi sync transactions sang Google Sheets (chỉ sync được 1 record thay vì tất cả). Agent trước đã có cố gắng fix nhưng chưa giải quyết triệt để.

**Nhiệm vụ của bạn:**
1. **Hiểu dự án:** Đọc `START_HERE.md` và `.cursorrules` để nắm stack (Next.js 15, PB, Tailwind) và chuẩn coding.
2. **Nghiên cứu lỗi:** Đọc file handover tại `.agent/handover/SHEET_SYNC_BUG_2026-03.md`. Đây là file tổng hợp toàn bộ context về lỗi này.
3. **Điều tra:**
    - Không được vội vã fix code. Hãy chạy query trực tiếp (via `execute_command`) vào PocketBase để xác nhận số lượng transaction thực tế khớp với logic filter.
    - Kiểm tra tại sao `syncCycleTransactions` lại chỉ map được 1 row.
4. **Giải pháp:**
    - Trình bày Root Cause và phương án fix cho user trước khi thực hiện.
    - Đảm bảo fix triệt để, không gây side effect cho các tính năng cũ.

**Yêu cầu:** Tuân thủ 100% quy tắc dự án. Nếu cần, hãy tạo reproduction script để test lỗi trước khi sửa.