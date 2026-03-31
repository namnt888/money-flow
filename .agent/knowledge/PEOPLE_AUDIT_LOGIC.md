# People & Debt Audit Logic - Phase 75 Stabilization

This document explains the core logic behind the People Debt tracking and the Audit Ledger system to ensure consistency and prevent "phantom debt" carry-overs.

## 🎯 Core Objectives
1. **Single Source of Truth**: Balance calculations must rely on fresh transaction-based metrics (Lend - Repay - Cashback) rather than stale cumulative database fields.
2. **Year Isolation**: Personal debt is tracked by calendar year. Surplus repayments from previous years (phantom debt) must NOT be applied to debts in the current or future years unless explicitly tagged.
3. **Audit Ledger Consistency**: UI summary cards and headers must match the dynamic Audit modal results.

---

## 🏗️ Technical Architecture

### 1. Calculation Formula (The "Fresh Net" Rule)
The system calculates remains using the following logic across all components:
```typescript
const cycleNet = (lend || 0) - (repay || 0) - (cashback || 0)
const remains = cycleNet > 0 ? cycleNet : 0 // Treat negative remains (surplus) as 0
```
This formula is implemented in:
- `src/components/people/v2/people-row-v2.tsx` (Total Balance column)
- `src/components/people/v2/people-row-details-v2.tsx` (Yearly stats)
- `src/components/people/v2/PersonDetailHeaderV2.tsx` (Header stats)
- `src/components/people/v2/MemberDetailView.tsx` (Financial Portfolio)

### 2. Backend FIFO Waterfall Isolation
In `src/services/debt.service.ts`, the `getDebtByTags` function performs a FIFO simulation to allocate untagged repayments to debts.
- **Rule**: Untagged repayments (general pool) only apply to debts of the **SAME YEAR**.
- **Impact**: This prevents a surplus (like -19.9M from 2025) from carrying over to 2026 transactions, which was the cause of the "15.8M discrepancy" reported by the user.

### 3. Audit API (`/api/people/audit`)
The Audit API is the Reference Truth. It:
1. Fetches all historical transactions.
2. Filters by selected year (if any).
3. Re-calculates cumulative sums from an isolated starting point (0).
4. Groups transactions to show a clear Ledger (Date, ID, Type, Note, Amount, Net, Running Sum).

---

## 🛠️ Maintenance & Troubleshooting

### Why is the balance wrong?
If the UI doesn't match the Audit:
1. **Check for "Phantom Debt"**: Look at the "Previous Debt" box in the expanded row. If it's negative, it means there are untagged repayments from previous years.
2. **Re-align Database**: Click the **"Re-align" (Sync)** button in the People header. This triggers `syncAllPeopleDebtCyclesAction` which runs the isolated FIFO logic on the server and updates the `people_debt_cycles` records in the database.
3. **Verify Tags**: Ensure transactions have correct tags (`YYYY-MM`). Mis-tagged transactions may fall into the wrong yearly bucket.

### UI Standards
- **Icons**: Use large (h-7 w-7), colorful action icons with premium hover effects.
- **Avatars**: Use `rounded-none` (square) for all shop/person/account images in lists.
- **Contrast**: Use high-contrast badges for status (e.g., Active vs. Settled).

---
**Last Updated**: 2026-03-29
**Phase**: 75 Stabilization Flow
