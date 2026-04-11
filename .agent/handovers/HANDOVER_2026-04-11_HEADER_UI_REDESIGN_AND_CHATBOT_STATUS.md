# HANDOVER - Sprint Next Prep (Header UI Redesign + Chatbot)

## Why this handover
- Tam dung implementation hien tai de chot state an toan.
- Ban giao context de sprint sau vao viec nhanh, khong mat logic cu.

## Scope completed in this sprint
1. Account header da duoc tinh chinh nhieu vong trong file:
   - src/components/accounts/v2/AccountDetailHeaderV2.tsx
2. Da giai quyet cac issue chinh:
   - rewards badge format rate-first
   - giam duplicate/ghost rules
   - restore collapse mode + compact metrics
   - remove sync icon o rewards area
3. Build da pass truoc khi stop.

## Important warning for next agent
- KHONG rewrite truc tiep AccountDetailHeaderV2.tsx de redesign lon.
- Can tao component UI moi trong thu muc tach rieng, bat bang feature flag.
- Muc tieu la thay ao UI, KHONG duoc danh mat logic cashback/rules/cycle.

## Chatbot status research summary
- Chatbot co 2 nhanh dang song song:
  1) Legacy web chat shell + server action:
     - src/app/chatbot/page.tsx
     - src/actions/chatbot-actions.ts
     - src/services/bot-query.service.ts
  2) Bot webhook orchestration:
     - src/lib/bot/bot-handler.ts
     - src/app/api/bot/webhook/route.ts
     - src/app/api/bot/telegram/route.ts
     - src/app/api/bot/slack/route.ts
- Them flow-bot UI/settings moi (dang o muc infra UI, chua fully wired backend):
  - src/components/flow-bot/flow-bot-workspace.tsx
  - src/components/flow-bot/flow-bot-settings-sheet.tsx
  - src/lib/flow-bot/index.ts

## Priority for next sprint
1. Header redesign track:
   - Implement theo file plan: .agent/handovers/PLAN_2026-04-11_ACCOUNT_HEADER_REDESIGN.md
2. Chatbot recovery track:
   - Implement theo file plan: .agent/handovers/PLAN_2026-04-11_CHATBOT_RECOVERY_AND_DELIVERY.md

## Suggested start checklist (first 30 mins)
1. Read:
   - docs/AGENT_SAFETY_RULES.md
   - src/components/accounts/v2/AccountDetailHeaderV2.tsx
   - .agent/handovers/PLAN_2026-04-11_ACCOUNT_HEADER_REDESIGN.md
   - .agent/handovers/PLAN_2026-04-11_CHATBOT_RECOVERY_AND_DELIVERY.md
2. Run quick checks:
   - git status
   - pnpm build
3. Create branch for redesign only, khong tron voi chatbot refactor.

## Done state at handover
- Repo dang co nhieu file changes (batch + account + flow bot).
- User yeu cau stop tai day, commit all, push, va handover docs day du.
