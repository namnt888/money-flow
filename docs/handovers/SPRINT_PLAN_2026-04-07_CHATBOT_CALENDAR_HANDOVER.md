# Sprint Plan & Hand-over (2026-04-07)

## 1) Mục tiêu sprint tới

- Viết lại chatbot theo hướng hỏi đáp thẻ/cashback/hạn mức chính xác, ưu tiên deterministic trước, LLM chỉ hỗ trợ diễn đạt.
- Bổ sung API riêng cho hỏi đáp + feedback, dễ test thủ công và monitor.
- Chuẩn bị Plan B: trang calendar nhập giao dịch theo ngày + capture ảnh ghi chú/amount trên mobile.
- Chốt hand-over rõ ràng để bất kỳ agent/dev nào tiếp quản vẫn làm tiếp được ngay.

## 2) Snapshot hiện trạng code (đã đọc nhanh code bot)

Các điểm đã tồn tại trong codebase:

- Luồng chat UI gọi server action: `src/app/chatbot/page.tsx` -> `sendChatMessageAction` trong `src/actions/chatbot-actions.ts`.
- Bot query local đang ở `src/services/bot-query.service.ts` (keyword-based, có account lookup, category lookup, history lookup).
- Có webhook bot: `src/app/api/bot/webhook/route.ts`, `src/app/api/bot/telegram/route.ts`.
- Có bot handler/wizard cho quick-add: `src/lib/bot/bot-handler.ts`.
- MCC hiện chưa có đường dữ liệu hoàn chỉnh ở UI account cell: `src/components/accounts/v2/cells/account-mcc-cell.tsx` còn TODO.

Các hạn chế chính của bot hiện tại:

- Match account theo token text còn thô, dễ trúng sai (word length > 2).
- Intent classifier chưa tách bạch theo domain (budget/cashback suggest/MCC/limit/history).
- Chưa có contract API hỏi đáp ổn định riêng cho Web UI và external callers (chưa có payload/response schema chuẩn hóa theo use-case cashback).
- Chưa có lớp "explainability" cho câu trả lời (vì sao còn budget, công thức, giả định amount/category).
- Case MCC 6300 -> đề xuất thẻ bảo hiểm chưa có deterministic mapping rõ ràng ở tầng service.

## 3) Phạm vi sprint đề xuất

### Track A - Chatbot Rewrite (ưu tiên cao)

Mục tiêu nghiệp vụ bắt buộc:

- Hỏi: "budget back tháng này thẻ HD là bao nhiêu" -> trả về:
  - budget cashback còn lại (vd 200k)
  - khả năng chi thêm theo category cụ thể (vd Online Shopping, 5%, cap còn)
  - amount có thể mua thêm = remains_cap / effective_rate (có xét cap category nếu có)
- Hỏi: "Mua sắm Online dùng thẻ gì lợi" -> đề xuất top thẻ theo category keyword tiếng Việt.
- Hỏi: "thẻ có MCC 6300 dùng thẻ gì" -> map sang Insurance và gợi ý thẻ phù hợp.
- Có thể hỏi limit/available/spent trong kỳ của từng thẻ.

Thiết kế kỹ thuật:

- Tạo lớp intent router mới: `src/services/chatbot/intents/*`
  - `cardBudget.intent.ts`
  - `bestCardByCategory.intent.ts`
  - `bestCardByMcc.intent.ts`
  - `cardLimit.intent.ts`
  - `recentTransactions.intent.ts`
- Tạo lớp entity resolver: `src/services/chatbot/resolvers/*`
  - resolve account alias (HD, HDBank, Lady, SuperCard...)
  - resolve category bằng keyword tiếng Việt từ bảng categories
  - resolve MCC -> canonical category slug/name
- Tạo lớp response formatter chuẩn: `src/services/chatbot/formatters/response.ts`
  - luôn trả kèm `reasoning_short`, `data_points`, `confidence`
- Tách `LLM paraphrase` thành optional layer, không quyết định số liệu.

### Track B - API riêng cho hỏi đáp + feedback (ưu tiên cao)

Tạo API mới (versioned):

- `POST /api/chatbot/v1/query`
  - input: `message`, `profileId?`, `channel`, `context?`
  - output chuẩn:
    - `intent`
    - `answer`
    - `cards[]` (structured data để UI render)
    - `sources[]` (account/txn ids)
    - `confidence`
    - `needs_feedback` (bool)
- `POST /api/chatbot/v1/feedback`
  - log thumbs up/down + expected answer
- `GET /api/chatbot/v1/health`
  - check config + db connectivity + model availability

Yêu cầu free-first:

- Runtime mặc định không phụ thuộc LLM trả phí.
- Có thể dùng model free tier chỉ để rewrite ngôn ngữ câu trả lời (nếu có key), fallback deterministic 100%.

### Track C - Data & query support cho bot (ưu tiên cao)

Để bot trả lời đúng cashback/limit:

- Chuẩn hóa helper đọc account cycle stats từ service hiện có (`getAccountStats` + cashback policy resolver).
- Bổ sung helper tính "có thể mua thêm" theo category:
  - `maxSpendByRemainingCap = floor(remainsCap / effectiveRate)`
  - nếu có category max riêng thì chặn theo rule max còn lại.
- Bổ sung mapping MCC:
  - bảng mapping mới (nếu chưa có): `mcc_category_map`.
  - seed tối thiểu cho case bắt buộc: `6300 -> insurance`.
- Chuẩn hóa account alias dictionary để nhận diện câu tiếng Việt tự nhiên.

### Track D - Calendar Plan B (ưu tiên trung bình)

Scope tính năng:

- Trang mới: `src/app/calendar/page.tsx`
- Theo từng ngày hiển thị:
  - tổng số transaction
  - tổng chi/tổng thu
  - danh sách txn rút gọn click mở detail
- Nhập nhanh transaction theo ngày (quick add modal).
- Mobile mode "locket-like":
  - chụp ảnh + nhập note + amount nhanh
  - lưu cùng timestamp/date bucket

Storage ảnh đề xuất (Cloudinary vs Google Drive):

- Cloudinary (khuyến nghị cho app flow):
  - Ưu: upload API rõ ràng, URL public ổn định, transform/responsive tốt, dễ preview trên mobile.
  - Nhược: quota free có giới hạn theo tháng.
- Google Drive:
  - Ưu: free cho tài khoản cá nhân.
  - Nhược: permission/link phức tạp, không tối ưu media delivery cho app, dễ lỗi quyền chia sẻ.

Kết luận:

- Chọn Cloudinary cho tính năng app-facing (UX ổn định hơn).
- Chỉ dùng Drive khi mục tiêu là lưu trữ backup nội bộ.

## 4) Cần viết thêm gì ở page hiện tại để bot "đi vào" dễ hơn

Không bắt buộc sửa nhiều ở page UI trước. Nên thêm:

- Endpoint query chuẩn (`/api/chatbot/v1/query`) để mọi page gọi đồng nhất.
- UI chatbot hiển thị block structured:
  - budget còn lại
  - spend tối đa theo category
  - top card suggestions
  - nguồn dữ liệu sử dụng
- Nút feedback trong UI chatbot (đúng/sai) để cải thiện resolver.

Giai đoạn 1 có thể giữ `src/app/chatbot/page.tsx` làm shell UI, chỉ đổi data source sang API mới.

## 5) Backlog chi tiết theo tuần

## Week 1 (Core rewrite)

- Thiết kế schema request/response cho `chatbot/v1/query`.
- Tách intent router + resolver + formatter.
- Implement 4 intent chính: budget, best card by category, mcc, limit.
- Thêm test unit cho resolver tiếng Việt (keyword/alias).

Definition of Done:

- 10/10 câu hỏi mẫu trả đúng intent.
- Case HD 5% max 500k trả đúng budget và spend thêm.
- Case Online Shopping gợi ý top card đúng policy.
- Case MCC 6300 trả insurance recommendation.

## Week 2 (API feedback + hardening)

- Implement `/query`, `/feedback`, `/health`.
- Add audit log table cho feedback (timestamp, prompt, answer, expected, profile).
- Add regression tests cho công thức cashback/budget.
- Tích hợp chatbot page sang API mới.

Definition of Done:

- API response có schema ổn định, docs đầy đủ.
- Có dashboard cơ bản theo dõi số query, fail rate, feedback xấu.

## Week 3 (Calendar Plan B MVP)

- Tạo page calendar + daily transaction count.
- Quick add theo ngày.
- Mobile capture ảnh + note + amount.
- Upload Cloudinary + gắn media URL vào transaction metadata.

Definition of Done:

- Mobile capture end-to-end chạy được.
- Ảnh xem lại nhanh trong lịch sử ngày.

## 6) Test plan bắt buộc

- Unit test intent resolver (Vietnamese queries + alias + MCC).
- Unit test cashback math:
  - remains cap
  - min spend gate
  - category rate + rule max
- Integration test API `chatbot/v1/query` với mock data accounts/transactions.
- E2E smoke:
  - hỏi budget thẻ cụ thể
  - hỏi category nên dùng thẻ nào
  - hỏi MCC 6300

## 7) Risk & giảm thiểu

- Rủi ro: alias account tiếng Việt đa dạng, dễ match sai.
  - Giảm thiểu: dictionary + fuzzy threshold + fallback hỏi lại xác nhận.
- Rủi ro: policy cashback cấu hình không đồng nhất giữa thẻ.
  - Giảm thiểu: normalize policy resolver, luôn trả metadata nguồn rule.
- Rủi ro: LLM trả lời "hay" nhưng sai số.
  - Giảm thiểu: số liệu chỉ lấy deterministic service, LLM chỉ diễn đạt.

## 8) Hand-over checklist cho agent/dev tiếp theo

Trước khi code:

- Đọc `docs/AGENT_SAFETY_RULES.md`.
- Đọc file này + rà `src/actions/chatbot-actions.ts`, `src/services/bot-query.service.ts`, `src/lib/bot/bot-handler.ts`.

Trong khi code:

- Không sửa trực tiếp business math trong UI; đặt ở service layer.
- Mọi intent mới phải có test.
- Tránh gọi LLM trực tiếp từ UI route; đi qua query API chuẩn.

Trước khi push:

- `pnpm test` phải pass.
- `pnpm lint` nếu fail do lỗi cũ ngoài scope thì ghi rõ trong hand-over note.
- Ghi changelog ngắn + examples prompt/output đã verify.

## 9) Prompt mẫu để verify nhanh sau rewrite

- "Budget back tháng này thẻ HD còn bao nhiêu?"
- "Mua sắm Online dùng thẻ gì lợi nhất?"
- "Thẻ có MCC 6300 nên dùng thẻ nào?"
- "Hạn mức còn lại của VPBank Lady là bao nhiêu?"
- "Giao dịch gần nhất của mình là gì?"

## 10) Quyết định kiến trúc chốt cho sprint này

- Chatbot trả lời số liệu theo deterministic engine.
- API chatbot versioned, có feedback loop.
- MCC mapping đưa vào data model chính thức.
- Calendar mobile capture dùng Cloudinary cho media app-facing.
