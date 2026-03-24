# Handover: Phase 16 - Cashback Display Fixes & Header Optimization

**Date:** 2026-03-22  
**Status:** COMPLETED  
**Focus:** Accurate Cashback Reporting and Account Detail UX

---

## 🚀 Changes Overview

This session focused on fixing discrepancies in cashback calculations and improving the consistency of cycle display across the application.

### 1. Cashback Calculation Engine
- **Inclusion of Invest/Transfer Types**: Updated `getPocketBaseAccountSpendingStatsSnapshot` in `src/services/pocketbase/account-details.service.ts` to include `invest` and `transfer` transaction types in the "Spent this cycle" total.
  - *Impact:* Buying assets (like Gold) now correctly contributes to the credit card spend target.
- **Tier Name Normalization**: Overrode the hardcoded "Standard" tier name with **"Dưới 15 triệu"** in `src/services/cashback/policy-resolver.ts` and `src/services/pocketbase/cashback-sync.service.ts`.
  - *Impact:* UI tooltips and "Sync DB" toasts now display user-friendly tier names.

### 2. UI/UX Refinements
- **Account Detail Header**: Fixed the "Standard" text in the Earned tooltip to dynamically show the correct tier name.
- **Cycle Synchronization (People Page)**: Modified `src/components/people/v2/TransactionControlBar.tsx` to automatically sync the cycle filter with the selected account's billing cycle.
  - *Behavior:* Selecting "VPBank Lady" now correctly jumps to the `20.02 - 19.03` cycle instead of "All".

### 4. Debt Cycle & People Details Fixes
- **Classification Fix**: Refined `isSpend` and `isRepayment` logic in `src/hooks/use-person-details.ts` to correctly handle negative amounts in incomes (common in some sheet/bank imports).
  - *Impact:* "In (Gross)" spending transactions with negative values are now correctly categorized as **DEBT** (Spend) instead of REPAID (Back).
- **Settlement Threshold**: Increased the `isSettled` threshold from **100 VND to 1000 VND**.
  - *Impact:* Minute rounding differences in bank statements no longer show as "REMAINS", correctly displaying as **SETTLED**.
- **UI Label Clarity**: In the cycle list (UnionSmartDatePicker), changed labels from `BACK` to `REPAID` for debtor context.

---

## 🛠️ Technical Details

- **Affected Files:**
  - `src/services/pocketbase/account-details.service.ts`
  - `src/services/pocketbase/cashback-refresh.service.ts`
  - `src/services/pocketbase/cashback-sync.service.ts`
  - `src/services/cashback/policy-resolver.ts`
  - `src/components/people/v2/TransactionControlBar.tsx`
  - `src/components/accounts/v2/AccountDetailHeaderV2.tsx`
  - `src/hooks/use-person-details.ts`
  - `src/components/transactions-v2/header/UnifiedSmartDatePicker.tsx`

---

## 📋 QA Checklist (Verified)
- [x] Invest transactions are added to cycle spent amount.
- [x] "Standard" string is replaced by "Dưới 15 triệu" in tooltips.
- [x] "Sync DB" button works without 400 errors.
- [x] People page cycle filter defaults to account cycle on selection.
- [x] Debt Cycle "Remains" uses Net calculation (Gross - Cashback - Repay).
- [x] Small balances (< 1000 VND) show as **SETTLED**.

---

## ⏩ Next Steps
- [ ] Monitor cashback accuracy for higher tiers (e.g., >15M spent).
- [ ] Implement manual "Cashback Earned" entry for missing legacy data.
- [ ] Refine Vietnamese note classification if more false positives are found.
