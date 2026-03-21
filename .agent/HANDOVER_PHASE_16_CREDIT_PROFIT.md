# Phase 16: Credit Card Advance & Cashback Profit Tracking

## 🎯 Objective
Manage credit card "withdrawals" (rút tiền thẻ) where the user pays a fee to an intermediary (People) but earns a higher cashback rate from the bank, resulting in a net profit.

## 🛠️ Requirements & Logic
1.  **Withdrawal Transaction (Type: Debt)**: 
    *   **Amount**: Total amount charged to the credit card (e.g., 100,000,000).
    *   **Fee**: Fee paid to the intermediary (e.g., 2% = 2,000,000).
    *   **Net Received**: Amount actually received from the intermediary (e.g., 98,000,000).
    *   **Bank Cashback**: Cashback earned from the bank (e.g., 3% = 3,000,000).
    *   **Net Profit**: `Cashback - Fee` (e.g., 3,000,000 - 2,000,000 = 1,000,000).

2.  **Tracking Method**:
    *   **People Approach**: Treat the intermediary as a "Person" (e.g., "Rút Thẻ A").
    *   **Debt Cycle**: Track the repayment to the bank vs. the incoming cash.

## 🏗️ Implementation Steps
### 1. Database & Types (`moneyflow.types.ts`)
*   Add `withdrawal_fee` or `advance_fee` to `metadata` or as a first-class field.
*   Update `Transaction` type to include calculated `net_profit`.

### 2. Services (`cashback.service.ts` & `transaction.service.ts`)
*   Refine `calculateCashback` to account for fees when calculating "True Profit".
*   Add logic to automatically create the "received" transaction (Transfer/Income) when a Withdrawal/Debt is recorded.

### 3. UI Layer (Slide V2)
*   Add a "Withdrawal Mode" toggle for Debt transactions.
*   Input fields for: `Fee Percentage` (%), `Fixed Fee`, and `Bank Cashback Rate`.
*   Real-time display of "Estimated Profit".

### 4. Dashboard & Reports
*   New "Cashback Profit" widget showing total earned vs. total fees paid.
*   People view: Filter to show only "Withdrawal Intermediaries" to track pending cash arrivals.

## 📊 Example Workflow
1.  **User pulls 100M** from VIB card via Intermediary X.
2.  User creates **Debt Transaction**:
    *   Account: VIB Credit.
    *   Person: Intermediary X.
    *   Amount: 100,000,000.
    *   Fee: 2% (2,000,000).
3.  System calculates:
    *   **Bank Cashback (3%)**: 3,000,000.
    *   **True Profit**: +1,000,000.
4.  User is reminded to settle the 100M when the statement is due.

---
**Status**: Ready for Implementation (Phase 16)
**Last Updated**: 2026-03-21
