# HANDOVER: Rewards Sync & Header Inconsistency (Phase 15/16)

## 🚨 Status: DEBT SYNC INCOMPLETE (Research Required)

Despite multiple attempts to sync **Global Account Data** with the **People Detail View**, several mission-critical data discrepancies remain. This document outlines the current state, known bugs, and the research path for the next agent.

---

## 🔍 Identified Bugs & Anomalies

### 1. The "10x Shared" Error
- **Symptom**: `Shared` amount on People Detail shows `14,649` while expected is `146,494`.
- **Potential Root Cause**: `cashback_share_percent` mapping. 
  - If a card has a 40% share, it might be stored as `40` (percent) or `0.4` (decimal).
  - Current logic in `MemberDetailView.tsx` and `account-details.service.ts` might be dividing by 100 twice or misinterpreting the decimal scale. 
  - **Check**: `146,494 / 366,235 = 0.4`. `14,649 / 366,235 = 0.04`.

### 2. Original Spend Double-Counting (Account Filter)
- **Symptom**: When filtering by Account (e.g., MSB Online), the `Original Spend` jumps to `~3.6M` which is exactly double the cycle's debt (`~1.8M`).
- **Potential Root Cause**: Duplicate aggregation in `getPocketBaseAccountSpendingStatsSnapshot`.
  - The `listAllRecords` call for `transactions` might be returning duplicates if the filters are overlapping.
  - Or, if a transaction is a `Transfer` or `Debt` that involves the same account twice (internal mapping), it might be counted twice.

### 3. Cashback Cap Logic
- **Symptom**: `Earned` displays the raw calculated cashback (`366.235`) even if the card has a monthly cap (e.g., `300,000`).
- **Required Fix**: Update `getPocketBaseAccountSpendingStatsSnapshot` to apply the `maxReward` caps from the `ParshedCashbackConfig` as a final gate on the total `earnedSoFar`.

---

## 🎨 UI Mitigations Implemented

### Header Blur Effect
- **Feature**: When an Account Filter is active, the **Summary Section** (Original Spend, Cashback, Remains) is now **Blurred** with an overlay: `Context Filtered`.
- **Reason**: To avoid showing incorrect/doubled debt numbers until the aggregation logic is verified. The Reward section remains visible as it's intended to be global.

### Label Refactor
- **Fix**: Moved "My Profit" label above the numerical value to match design.
- **Added**: Clear breakdown for `Earned` and `Shared` in the Rewards card.

---

## 🛠️ Repository State

- **Branch**: `agent/pb-migration-20260305-stabilize-migration` (or current active)
- **Modified Files**:
  - `src/services/pocketbase/account-details.service.ts`: Query improvements (tag/field fixes).
  - `src/components/people/v2/PeopleHeader.tsx`: Layout refactor & Blur effect.
  - `src/components/people/v2/MemberDetailView.tsx`: Navigation consolidation & Global mapping.

---

## ⏭️ Next Steps for Research Agent

1. **Verify PB Data Scale**: Check if `cashback_share_percent` is consistent across all cards/transactions.
2. **Debug Aggregation**: Log the `id` of every transaction in `spendTransactions` to find why it doubles when filtered by account.
3. **Impelement Cap Logic**: Ensure `netProfit` calculation subtracting `sharedAmount` is performed *after* applying the earns cap.

---
*End of Handover*
