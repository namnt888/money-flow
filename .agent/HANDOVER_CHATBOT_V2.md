# Handover - Chatbot V2 Infrastructure & Data Logic

> [!IMPORTANT]
> **Objective**: Transition from rule-based keyword matching (V1) to an LLM-powered (Gemini) intelligent assistant (V2) that provides accurate cashback advice, budget reports, and financial history.

## 1. Current Architecture (V1)
- **Entry Point**: `src/actions/chatbot-actions.ts` -> Calls `handleBotQuery`.
- **Query Engine**: `src/services/bot-query.service.ts` (Uses regex & keywords).
- **Cashback Brain**: `src/services/cashback/policy-resolver.ts` (Core logic for calculating rates).
- **UI**: `src/app/chatbot/page.tsx` (Supports Gemini API Key storage in LocalStorage).

## 2. Known Issues & Lessons Learned
- **Owner Identification**: The system identifies the "Owner" by `filter: 'is_owner = true'`. However, in some DB states, primary cards (like **Mb JCB Ultimate**) are linked to secondary profiles (e.g., `vf8urhl0asfy3a8`).
- **Data Isolation**: A strict `owner_id` filter caused the bot to miss valid cards. We pivoted to a **Smart Global Filter** that allows all active cards but strictly excludes names containing `DUPLICATE`, `DO NOT USE`, or `TEST`.
- **Keyword Fragility**: Simple keyword matching (e.g., "bao hiem") fails when users use natural language.

## 3. Requirements for Chatbot V2
- [ ] **LLM Integration**: Use the `apiKey` passed from the UI to trigger Gemini for intent parsing.
- [ ] **Robust Filtering**: Maintain the exclusion of junk data while intelligently aggregating cards belonging to the "Real" user.
- [ ] **Feature Parity**:
  - **Cashback**: "Dùng thẻ nào cho [Category]?"
  - **Budget**: "[Bank] còn bao nhiêu hạn mức?"
  - **Statements**: "Kỳ sao kê của thẻ [Name]?"
  - **History**: "Gần đây tôi chi tiêu gì?"
- [ ] **UI Enhancements**: Improve message formatting and add quick-action buttons.

## 4. Key Files to Reference
- [bot-query.service.ts](file:///c:/Users/nam.thanhnguyen/Personal_Project/money-flow-3/src/services/bot-query.service.ts): Revert/Refactor for LLM.
- [policy-resolver.ts](file:///c:/Users/nam.thanhnguyen/Personal_Project/money-flow-3/src/services/cashback/policy-resolver.ts): Use for rate calculations.
- [chatbot-actions.ts](file:///c:/Users/nam.thanhnguyen/Personal_Project/money-flow-3/src/actions/chatbot-actions.ts): Improve profile detection logic.

---
**Status**: V1 is stabilized with a Smart Global Filter. Ready for V2 refactor.
**Last Success**: Mb JCB Ultimate (10% Insurance) correctly listed via Smart Filter.
