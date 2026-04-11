# PROMPT 2 — TAKE HANDOVER REDESIGN UI

Bạn là Agent chịu trách nhiệm tiếp quản cuộc đại phẫu UI cho Account Detail Header.  
Lưu ý: redesign phải tách riêng, không đè logic cũ.

## Bối cảnh bạn sẽ nhận thêm từ user
- Prompt nghiệp vụ chi tiết.
- Link/ảnh Figma.
- Ưu tiên UI/UX mong muốn.

## Việc cần làm ngay khi nhận Figma
1. Đọc context nền:
- .agent\AGENT_CONTEXT.md
- docs\AGENT_SAFETY_RULES.md
- .agent\handovers\PLAN_2026-04-11_ACCOUNT_HEADER_REDESIGN.md
- .agent\handovers\HANDOVER_2026-04-11_HEADER_UI_REDESIGN_AND_CHATBOT_STATUS.md
- .agent\knowledge\MEMORY_BANK_2026-04-11_NEXT_AGENT_CATCHUP.md
- src\components\accounts\v2\AccountDetailHeaderV2.tsx
- src\components\accounts\v2\AccountDetailViewV2.tsx

2. Đề xuất kiến trúc tách lớp UI mới
- Tạo folder mới cho redesign:
  src\components\accounts\v2\header-redesign\
- Giữ nguyên legacy:
  src\components\accounts\v2\AccountDetailHeaderV2.tsx
- Dùng feature flag để bật/tắt an toàn.

3. Mapping Figma -> component tree
- Liệt kê block UI, state, props, data dependencies.
- Chỉ rõ phần nào chỉ là visual, phần nào đụng logic.

4. Kế hoạch triển khai theo phase
- Phase 1: Skeleton + adapter/view-model.
- Phase 2: Identity/Balance/Cashback sections.
- Phase 3: Rewards popover/tier tabs/collapsed mode parity.
- Phase 4: polish + regression fix + docs.

5. Verification bắt buộc
- Không regression simple card vs tiered card.
- Rewards badge/rules/tier filtering đúng.
- Collapse/expand đúng desktop + mobile.
- Chạy: pnpm test, pnpm build.
- Báo rõ nếu lint fail do backlog cũ toàn repo.

## Output yêu cầu sau khi phân tích Figma
1. UI Diff Plan
2. File-by-file Change Plan
3. Risk Register
4. Test Matrix
5. Rollback Plan (feature flag)

## Nguyên tắc cứng
- Không rewrite trực tiếp toàn bộ legacy file.
- Không phá logic cashback/rules/cycle/pending đã ổn định.
- Mọi trích dẫn file dùng địa chỉ thuần dạng .agent\AGENT_CONTEXT.md
# PROMPT 2.1 — prompt REDESIGN UI
Prompt Design Header "All-in-One Bar"
Copy đoạn dưới đây:
Task: Redesign the Account Details header into a single, high-density, modern horizontal bar using React, Tailwind CSS, and Lucide icons.
Layout Structure:
A single Card component with xl:flex-row and flex-col for responsiveness.
Use vertical dashed dividers (border-dashed) to separate 3 main sections.
Implement a "Collapse/Expand" toggle at the top right using framer-motion for smooth height transitions.
Section 1: Account Info (22% width)
Top: A mini Visa card icon (orange-red gradient) + Account Name (MSB Online) + Settings/Database icons.
Subtext: Monospaced account number and owner name.
Badges: "PARENT" (Indigo) and "CYCLE 26" (Emerald) side-by-side.
Bottom: A unified "Online Shopping" pill (Amber) with a Zap icon.
Section 2: Balance & Health (30% width)
Top: "Balance" label + "Health" badge. Right side: "29 Days" and "No Wait" status badges.
Middle: 3-column grid for "Available" (Emerald), "Solo" (Indigo), and "Limit" (Slate) using large bold numbers.
Bottom: A "Ratio" pill with a dynamic progress background (Indigo) showing percentage and PACE data.
Section 3: Performance (48% width)
Top: "Performance" label + "CB Perf" badge + "Analytics" ghost button.
Middle: 5-column grid with unique colors for each metric: Net Profit (Emerald), Actual Claimed (Rose), Est. Earned (Amber), Actual Earn (Blue), Shared To Group (Indigo).
Bottom: A unified "Goal" pill containing: Progress background (36%), Goal percentage, and "Needs/Spent" values separated by a divider.
Right side: A rounded-full "Date Range" button (Indigo).
Design Requirements:
Typography: Use Inter for UI and JetBrains Mono for numbers.
Style: Clean, professional, minimal white space, uppercase labels, 10px font for labels, 18px for main numbers.
Color Palette: Slate-50 background, Emerald-600 for success, Rose-500 for alerts, Indigo-600 for primary actions.