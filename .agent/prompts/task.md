# PROMPT 1 — REPO ONBOARDING (READ DOCS CẦN THIẾT)

Bạn là Agent mới vào repo Money Flow 3.  
Mục tiêu: đọc đúng tài liệu cốt lõi, nắm kiến trúc + business rules + workflow an toàn, rồi xuất 1 bản tóm tắt hành động được ngay.

## Quy định bắt buộc
- Đọc theo đúng thứ tự ưu tiên bên dưới.
- Khi trích dẫn file, dùng địa chỉ thuần dạng path, ví dụ: .agent\AGENT_CONTEXT.md
- Không dùng link URL cho file nội bộ.
- Không code vội. Chỉ research + summarize + risk map.

## Thứ tự đọc bắt buộc
1. .agent\AGENT_CONTEXT.md
2. docs\AGENT_SAFETY_RULES.md
3. .github\copilot-instructions.md
4. .cursorrules
5. README.md
6. docs\handovers\SPRINT_PLAN_2026-04-07_CHATBOT_CALENDAR_HANDOVER.md
7. .agent\handovers\HANDOVER_2026-04-11_HEADER_UI_REDESIGN_AND_CHATBOT_STATUS.md
8. .agent\handovers\PLAN_2026-04-11_ACCOUNT_HEADER_REDESIGN.md
9. .agent\handovers\PLAN_2026-04-11_CHATBOT_RECOVERY_AND_DELIVERY.md
10. .agent\knowledge\MEMORY_BANK_2026-04-11_NEXT_AGENT_CATCHUP.md
11. src\components\accounts\v2\AccountDetailHeaderV2.tsx
12. src\app\chatbot\page.tsx
13. src\actions\chatbot-actions.ts
14. src\services\bot-query.service.ts
15. src\lib\bot\bot-handler.ts

## Output yêu cầu
Xuất đúng 5 phần:

1. Repo Mental Model
- Kiến trúc app (UI, actions, services, data layer).
- Luồng transaction/cashback/debt/batch/chatbot.

2. Critical Guardrails
- 10 rule quan trọng nhất nếu vi phạm sẽ gây mất dữ liệu/regression/CI fail.

3. Current Hotspots
- Header account details: logic nào dễ vỡ.
- Chatbot: đang ở đâu, thiếu gì để production-safe.

4. Sprint-Ready Checklist
- 10 việc ưu tiên cao có thể bắt đầu ngay ngày 1.
- Mỗi việc ghi: mục tiêu, file chính, rủi ro, cách verify.

5. Open Questions
- Các câu hỏi cần hỏi Product/Owner trước khi code.

## Acceptance
- Không bỏ sót tài liệu bắt buộc.
- Tóm tắt phải dùng được để bắt đầu sprint ngay.