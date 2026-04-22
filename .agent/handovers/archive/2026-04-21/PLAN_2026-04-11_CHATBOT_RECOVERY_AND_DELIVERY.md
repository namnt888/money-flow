# PLAN - CHATBOT RECOVERY, RESEARCH, AND DELIVERY

## Objective
- Xac dinh chatbot dang o dau.
- Lap ke hoach day du de dua chatbot vao trang thai production-safe.
- Uu tien deterministic finance answers, LLM chi la optional paraphrase layer.

## Current Status Snapshot
- UI chat shell da co: src/app/chatbot/page.tsx
- Server action da co: src/actions/chatbot-actions.ts
- Deterministic query service da co: src/services/bot-query.service.ts
- Multi-platform webhook da co:
  - src/app/api/bot/webhook/route.ts
  - src/app/api/bot/telegram/route.ts
  - src/app/api/bot/slack/route.ts
- Bot orchestration da co: src/lib/bot/bot-handler.ts
- Flow-bot workspace/settings moi da duoc tao:
  - src/components/flow-bot/flow-bot-workspace.tsx
  - src/components/flow-bot/flow-bot-settings-sheet.tsx
  - src/lib/flow-bot/index.ts
- Khoang trong chinh: chua co versioned chatbot API v1 va intent/resolver architecture dung nhu sprint plan.

## Critical Gaps
1. Chua co API contract on dinh: /api/chatbot/v1/query, /feedback, /health.
2. Chua co intent router + entity resolver module hoa.
3. Chua co test matrix cho cac cau hoi bat buoc (budget/category/mcc/limit).
4. Config token/provider dang phan manh (local storage + env + DB).
5. Chua co feedback loop de hoc tu tra loi dung/sai.

## Proposed Architecture (next sprint)
1. Query API layer (versioned)
   - POST /api/chatbot/v1/query
   - POST /api/chatbot/v1/feedback
   - GET /api/chatbot/v1/health
2. Domain layer
   - src/services/chatbot/intents/*
   - src/services/chatbot/resolvers/*
   - src/services/chatbot/formatters/*
3. Data adapters
   - account stats adapter
   - cashback cap/remaining spend adapter
   - mcc mapping adapter
4. Optional LLM layer
   - paraphrase only
   - never override deterministic numbers

## Task Breakdown
- Phase 1: Inventory + freeze current behaviors
  - capture sample inputs/outputs tu chatbot-actions va bot-query.
- Phase 2: Build v1 API contract + response schema.
- Phase 3: Implement 5 intents uu tien:
  - cardBudget
  - bestCardByCategory
  - bestCardByMcc
  - cardLimit
  - recentTransactions
- Phase 4: Wire UI /chatbot sang v1 API.
- Phase 5: Add feedback + observability.
- Phase 6: Telegram/Slack parity + regression tests.

## Acceptance Criteria
- 10/10 query mau cho ket qua dung so lieu.
- Co source IDs + confidence tren response.
- Fallback mode hoat dong khi khong co LLM key.
- Build/lint/test xanh, khong lam vo flow bot webhook.

## Risks
- Mapping category alias tieng Viet chua day du.
- Wrong owner/profile link co the lam sai data scope.
- LLM output neu khong guard co the lam sai so lieu tai chinh.

## Mitigation
- deterministic-first + strict schema validation.
- confidence threshold + safe fallback message.
- test fixture cho cac card quan trong (VPBank Lady, MSB Online, HDBank cases).
