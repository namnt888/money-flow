# 🤖 Handover: Chatbot Refactor & Transaction Calendar (Phase 2)

## 1. Tổng Quan Mục Tiêu (Phase 2)
Mục tiêu chính là chuyển đổi Chatbot từ dạng keyword-matching thô sang một hệ thống **Deterministic Engine** (quyết định dựa trên dữ liệu thực) thay vì phụ thuộc hoàn toàn vào LLM. Đồng thời, triển khai giải pháp "Plan B" cho việc nhập liệu thông qua Calendar.

### Hai trục phát triển chính:
1. **Chatbot Rewrite (v2 API):** Xây dựng hệ thống hỏi đáp chính xác về cashback, hạn mức, và đề xuất thẻ.
2. **Txn Calendar:** Tạo giao diện nhập liệu theo ngày, hỗ trợ mobile capture (chụp ảnh + note + amount).

---

## 2. Hiện Trạng Hệ Thống (Snapshot)
- **UI:** `src/app/chatbot/page.tsx` (đã có shell giao diện).
- **Logic cũ:** `src/actions/chatbot-actions.ts` gọi `src/services/bot-query.service.ts` (sử dụng keyword-matching đơn giản, độ chính xác thấp).
- **Webhook:** Có sẵn `src/app/api/bot/webhook/route.ts` cho Telegram.
- **Vấn đề hiện tại:** Match account thô, thiếu Intent Classification, không có structured data trong response, không có cơ chế giải thích (explainability).

---

## 3. Kế Hoạch Triển Khai Chi Tiết (Technical Plan)

### Trục A: Chatbot Rewrite (Deterministic v2)
Kiến trúc đề xuất: `User Input` $\rightarrow$ `Intent Router` $\rightarrow$ `Entity Resolver` $\rightarrow$ `Deterministic Service` $\rightarrow$ `Response Formatter` $\rightarrow$ `LLM Paraphrase (Optional)`.

#### 🛠 Kiến trúc thư mục cần xây dựng:
- `src/services/chatbot/intents/`: Xử lý logic cho từng loại câu hỏi.
- `src/services/chatbot/resolvers/`: Giải mã alias account, từ khóa category, mã MCC.
- `src/services/chatbot/formatters/`: Chuẩn hóa output (StandardResponse).
- `src/app/api/chatbot/v1/`: API endpoints mới (`/query`, `/feedback`, `/health`).

#### 🎯 4 Intent cốt lõi cần ưu tiên:
1. **Budget Card:** "Budget back thẻ HD còn bao nhiêu?" $\rightarrow$ Tính toán `remains_cap`, `min_spend`.
2. **Best Card By Category:** "Mua sắm Online dùng thẻ gì lợi?" $\rightarrow$ Rank top thẻ theo policy rate.
3. **Best Card By MCC:** "MCC 6300 dùng thẻ gì?" $\rightarrow$ Map MCC $\rightarrow$ Category $\rightarrow$ Rank thẻ.
4. **Card Limit:** "Thẻ HD còn hạn mức bao nhiêu?" $\rightarrow$ `credit_limit` - `current_balance`.

### Trục B: Transaction Calendar (Plan B)
- **Feature:** Trang `src/app/calendar/page.tsx` hiển thị tổng hợp giao dịch theo ngày.
- **Mobile Flow:** Capture ảnh $\rightarrow$ Upload Cloudinary $\rightarrow$ Lưu metadata vào transaction.
- **Quick Add:** Modal nhập nhanh giao dịch gắn với ngày đang chọn trên calendar.

---

## 4. Roadmap & Definition of Done (DoD)

### Week 1: Core API & Deterministic Intents
- [ ] Thiết kế xong schema `QueryRequest` và `StandardResponse`.
- [ ] Hoàn thành `Intent Router` và các `Resolvers` (Account, Category, MCC).
- [ ] Implement xong 4 Intent chính.
- [ ] API `/api/chatbot/v1/query` hoạt động ổn định.
- **DoD:** 10/10 câu hỏi mẫu trả đúng intent và số liệu chính xác.

### Week 2: Hardening & Feedback Loop
- [ ] Triển khai API `/feedback` để log thumbs up/down.
- [ ] Xây dựng bảng audit log cho feedback để tinh chỉnh resolver.
- [ ] Tích hợp Web UI sang API v1.
- **DoD:** Có dashboard cơ bản theo dõi fail rate và feedback.

### Week 3: Calendar MVP
- [ ] Xây dựng UI Calendar + Daily Summary.
- [ ] Tích hợp Cloudinary cho mobile capture.
- [ ] Hoàn thành luồng Quick Add.
- **DoD:** Mobile capture end-to-end chạy thành công.

---

## 5. Hướng Dẫn Cho Agent Tiếp Theo

### 📚 Tài liệu cần đọc:
1. `.cursorrules`: Chuẩn coding (Type safety, No `any`).
2. `docs/plans/CHATBOT_REFACTOR_WEEK1_DETAILED_PLAN.md`: Chi tiết logic và schema.
3. `docs/handovers/SPRINT_PLAN_2026-04-07_CHATBOT_CALENDAR_HANDOVER.md`: Tầm nhìn sprint.

### ⚠️ Lưu ý quan trọng:
- **Số liệu là tuyệt đối:** Không để LLM tự "sáng tạo" số liệu. LLM chỉ được dùng để diễn đạt lại câu trả lời từ deterministic engine.
- **Reuse Services:** Tận dụng tối đa `getAccountStats()`, `resolveCashbackPolicy()` đã có sẵn.
- **Test-Driven:** Mọi Intent mới phải có unit test đi kèm.
- **Backward Compatibility:** Giữ nguyên `handleBotQuery()` để không làm hỏng webhook Telegram hiện tại.

### Debt Repayment AC Decision (Apr 14 2026)
- Repay input stays as a single total amount.
- Default allocation is FIFO across multiple debt cycles, oldest cycle first.
- UI should allow manual override per cycle in the repay dialog breakdown.
- Save model should remain `parent repayment + child allocations` so audit and cycle tracking stay intact.
- Keep cycle history visible even when master sheet sync is enabled; master sheet changes sync target only, not debt visibility.

### 🧪 Prompt mẫu để verify:
- "Budget back tháng này thẻ HD còn bao nhiêu?"
- "Mua sắm Online dùng thẻ gì lợi nhất?"
- "Thẻ có MCC 6300 nên dùng thẻ nào?"
- "Hạn mức còn lại của VPBank Lady là bao nhiêu?"