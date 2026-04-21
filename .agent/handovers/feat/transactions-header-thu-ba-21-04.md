# Handover Skill - transactions-header-thu-ba-21-04

## 1) Branch + Scope
- Branch: feat/transactions-header-thu-ba-21-04
- Goal: Prepare a safe UI refactor for the header area of /transactions without breaking transaction table behavior, filters, refund/void flows, or server data loading.

## 2) Why This Exists
- The /transactions header now contains mixed responsibilities (date mode, cycle selection, account/person/category filter, status toggles, search, add action, refresh).
- Refactor should improve maintainability and UI clarity while preserving behavior.

## 3) Mandatory Read Order (Skill)
1. docs/AGENT_SAFETY_RULES.md
2. .github/copilot-instructions.md
3. src/app/transactions/page.tsx
4. src/components/transactions/UnifiedTransactionsPage.tsx
5. src/components/transactions-v2/header/TransactionHeader.tsx
6. src/context/tag-filter-context.tsx
7. src/components/moneyflow/unified-transaction-table.tsx

## 4) Header Architecture Map
- src/app/transactions/page.tsx
  - Server component entry for /transactions.
  - Loads accounts, categories, people, transactions, shops.
  - Wraps view with TagFilterProvider.

- src/components/transactions/UnifiedTransactionsPage.tsx
  - Main client orchestrator.
  - Owns header state, passes props/handlers into TransactionHeader.
  - Owns table, slide modal, void/refund dialogs, queue cards.

- src/components/transactions-v2/header/TransactionHeader.tsx
  - Visual + interaction shell for header controls.
  - Has local state buffer and apply/clear/refresh/add actions.

- src/context/tag-filter-context.tsx
  - URL tag synchronization and shared tag filter state.

## 5) Refactor Guardrails
- Do not change business logic in services while refactoring header UI.
- Keep existing prop contract between UnifiedTransactionsPage and TransactionHeader until parity is verified.
- Preserve account-first cycle UX:
  - When account selected, cycle mode behavior still works.
- Preserve search debounce behavior.
- Preserve status toggles and reset semantics.
- Keep add action paths unchanged (AddTransactionDropdown + slide flow).
- Keep mobile and desktop header behavior parity.

## 6) Proposed Refactor Plan (Safe)
1. Create presentational subcomponents under src/components/transactions-v2/header/sections/:
   - HeaderSearchSection.tsx
   - HeaderFiltersSection.tsx
   - HeaderDateSection.tsx
   - HeaderActionsSection.tsx
2. Extract state mapping helpers to src/components/transactions-v2/header/header-state.ts.
3. Keep TransactionHeader.tsx as composition wrapper first.
4. Validate zero behavior drift with manual checklist below.
5. Optional phase 2: move more state ownership upward if needed.

## 7) Behavior Parity Checklist
- Search typing updates and debounced apply still works.
- Date mode switches between all/year/month/date/range/cycle correctly.
- Cycle options react to selected account.
- Account/person/category filter application unchanged.
- Clear Filter vs Clear All behavior unchanged.
- Refresh action still triggers router refresh with loading feedback.
- Add dropdown still opens correct transaction type mode.
- Queue collapse toggle still works in UnifiedTransactionsPage.

## 8) Test Commands Before Commit
- pnpm build
- pnpm test
- pnpm lint

## 9) Known Risks
- Prop drift between TransactionHeader and UnifiedTransactionsPage.
- Local buffer state can desync if refactor removes sync useEffect.
- Header layout changes can regress mobile sheet/dialog interactions.

## 10) Definition Of Done
- No visual regressions for desktop/mobile header.
- Behavior parity checklist fully passed.
- Build/test/lint pass.
- Update this handover with any new caveats before merge.
