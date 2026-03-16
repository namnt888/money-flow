MỤC TIÊU CHUNG
- Hoàn thiện UX/UI & logic trang /people (IMG1/IMG2/IMG3).
- Rà soát & điều chỉnh Slide Txn v2 (Profit Analytics & Cashback Performance).
- Sửa lỗi tạo mới account ở /accounts (AccountSlideV2, PocketBase).
- Chia theo pha, mỗi pha có VERIFY riêng; ưu tiên dữ liệu từ PocketBase (PB).

────────────────────────────────────────────────────────────────
PHA 3 — /people (ENHANCE SAU FIX)

A) Remains (IMG1)
- Cell Remains hiển thị chấm (dot) làm indicator.
- Hover/focus: chỉ hiện **tooltip bằng chữ** (số đã format); **tooltip không lặp icon dot**.
- A11y: hỗ trợ bàn phím, tooltip không che thao tác.

B) Section expand (IMG2)
- Bỏ nút “Collapse Stats”; **stats luôn hiển thị**.
- Phạm vi mặc định: **Entire Year** (cả năm), không giới hạn current/previous.
- Nếu có chỉ báo dư nợ cũ “(+N)”: khi mở chi tiết, **stats hiển thị đủ N kỳ** chưa trả hết, có cách xem từng kỳ.
- Layout giữ ổn định, không đẩy “Recent Activity” lệch vị trí.

C) Group “people có sheet config ở trên đầu”
- Thêm khu vực group/config ở phần đầu /people:
  • Thể hiện tình trạng sheet config theo người/nhóm.
  • Lối tắt mở sheet config.
  • Không phá vỡ layout bảng.

D) Outstanding hiển thị “0.06” (IMG3) — RESEARCH & FIX
- Kiểm tra công thức Outstanding; soát parse/format locale (vi-VN), đơn vị (VND vs triệu), scale/round, double‑format.
- Đối chiếu số thô từ PB với số sau compute ở service/UI để tìm điểm lệch.
- Kỳ vọng: giá trị đúng đơn vị, không “0.06” phi thực tế; tooltip có thể hiện breakdown ngắn gọn.

E) Cycle pills — đồng nhất độ dài
- Pill cycle **không có sheet config** phải **dài bằng** pill có sheet config (độ rộng thống nhất, label không co).

VERIFY — PHA 3
- Remains: bình thường dot; hover/focus thấy tooltip số (không có dot trong tooltip).
- Stats: luôn hiển thị (Entire Year); khi có (+N) thì thấy đủ N kỳ chưa trả.
- Group sheet config: ở đầu trang, không phá layout.
- Outstanding: không còn hiển thị “0.06” sai.
- Cycle pills: chiều dài thống nhất.

────────────────────────────────────────────────────────────────
PHA 4 — Slide Txn v2 (Profit Analytics & Cashback Performance)

A) Nút “Sync”
- Thêm nút “Sync” buộc refetch toàn bộ dữ liệu liên quan **từ PocketBase** theo accountId + cycle (ví dụ 25.02–24.03).
- Trong “Sync”: có loading; disable thao tác; log rõ nguồn fetch `source=PB`; sau khi xong, recompute tất cả chỉ số.
- Fail → hiện banner lỗi, cho phép retry.

B) Profit Analytics — kiểm tra & sửa công thức/luồng
- Xác nhận input cho cycle: tổng spend, shared, bank reward (est), prev debt…; filter đúng window thời gian (UTC/local), category match (“Online Shopping”), exclude/refund/fee hợp lý.
- Rà soát cache/memo: tránh giữ state cũ làm “Total Shared / Remains Cashback / Target” không đổi.
- Sau Sync, các thẻ trong “Cycle Budget” phải cập nhật đúng dữ liệu kỳ.

C) Cashback Performance — hiển thị áp CAP
- Nếu cấu hình thẻ: hoàn tiền 10% **cap 300.000**:
  • Giá trị “Earned” trên UI = **min(rawEarned, cap) = 300.000**.
  • Tooltip hiển thị breakdown: “Earned by cycle rules”, phép tính 10%, “Rule sum fallback”, “Total”, và “Applied Cap: 300.000”.
- Đảm bảo rounding & format tiền tệ nhất quán.

VERIFY — PHA 4
- Trước Sync: ghi nhận số hiện tại.
- Sau Sync: chỉ số cập nhật khớp với txn cycle (ví dụ có 3 txn Online Shopping).
- Cashback: UI hiển thị số đã áp cap; tooltip nêu đủ breakdown + cap.
- Profit Analytics: Total Shared, Remains Cashback, Spendable Target đổi đúng theo dữ liệu sau Sync.
- Edge cases: 0 txn hợp lệ (Earned=0, Remains Cashback=cap), có refund/void, chuyển cycle.

────────────────────────────────────────────────────────────────
PHA 5 — /accounts (BUG CREATE ACCOUNT FAIL — AccountSlideV2)

LOG
- Error Type: Console Error
- Message: `[AccountSlideV2] Create failed "Failed to create account in PocketBase"`
- Callsite: `handleSave` tại `src_components_accounts_v2_*.js:4353:29`
- Môi trường: Next.js 16.0.10 (Turbopack), Dev

YÊU CẦU
1) Research luồng `handleSave`:
   - Xác định hàm gọi PB: collection, payload (fields bắt buộc, quan hệ, file).
   - Ghi log chi tiết từ PB: status code, validation error theo field, rule trigger.

2) Kiểm tra schema & quyền PB:
   - Required/unique, relation integrity, rule “create”, kích thước/loại file nếu có.
   - Xác thực: token (admin/user), quyền collection.

3) Sửa & UX:
   - Nếu validation fail → hiển thị lỗi chỉ rõ field; không throw chung chung.
   - Nếu network/transient → retry/backoff hợp lý.
   - Thành công → toast/notification, refetch list, focus về item mới.

VERIFY — PHA 5
- Tạo account với payload hợp lệ → Thành công, không còn log lỗi.
- Thiếu field bắt buộc → Có thông báo chi tiết field lỗi; không crash.
- Sau tạo mới → Danh sách cập nhật, mở được slide txn của account vừa tạo.

────────────────────────────────────────────────────────────────
GHI CHÚ TRIỂN KHAI
- Không cần xuất code trong báo cáo; chỉ cần nêu phạm vi file/logic đã chạm, thay đổi gì và tại sao (1–2 dòng/mục).
- Giữ style system/a11y; thống nhất tooltip; hạn chế thay đổi màu/spacing lớn.
- Dữ liệu ưu tiên PocketBase; log rõ ràng nguồn (`source=PB`); tránh dùng cache cũ.