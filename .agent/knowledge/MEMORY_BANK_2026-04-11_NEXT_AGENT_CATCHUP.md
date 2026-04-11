# MEMORY BANK - Next Agent Catchup (2026-04-11)

## Fast Context
- User uu tien toc do handover + commit all truoc.
- Header account details can dai phau UI o sprint tiep theo.
- Yeu cau then chot: redesign phai tach rieng, tranh de logic cu.

## Header Logic Hotspots
- Main file: src/components/accounts/v2/AccountDetailHeaderV2.tsx
- Areas de vo logic nhat:
  1) fallbackRules parsing + dedupe
  2) rewardRuleTabs / selectedRuleTier / filteredDisplayRules
  3) collapsed mode chips (due, cycle, pending)
  4) rewards popover state open/close

## Chatbot Hotspots
- Legacy entry:
  - src/app/chatbot/page.tsx
  - src/actions/chatbot-actions.ts
  - src/services/bot-query.service.ts
- Bot runtime:
  - src/lib/bot/bot-handler.ts
  - src/app/api/bot/webhook/route.ts
  - src/app/api/bot/telegram/route.ts
  - src/app/api/bot/slack/route.ts
- New infra UI (in progress):
  - src/components/flow-bot/flow-bot-workspace.tsx
  - src/components/flow-bot/flow-bot-settings-sheet.tsx
  - src/lib/flow-bot/index.ts

## Working Agreements
- deterministic finance logic la first-class.
- LLM la optional enhancer, khong duoc override so lieu.
- redesign UI phai co feature flag rollback.

## First Actions For Next Agent
1. Chay build + lint de lock baseline.
2. Tao component redesign moi duoi header-redesign folder.
3. Tiep theo tao chatbot v1 API contract thay vi mo rong server action cu.
