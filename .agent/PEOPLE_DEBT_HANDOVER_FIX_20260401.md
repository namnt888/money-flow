# Handover: People Debt History & Cron Stabilization (2026-04-01)

## ✅ Completed Fixes

### 1. People Debt History Restoration
**Problem:** The 'Debt History' list in the `ManageSheetButton` popover (People List view) was not rendering historical cycles.
**Root Cause:**
- `ManageSheetButton` in `people-row-v2.tsx` was missing the `allCycles` prop.
- The `PersonCycleStats` type was missing the `stats` nested object (originalLend, cashback, repay) expected by the UI.

**Fix Details:**
- **Service Layer (`src/services/people.service.ts`):** Updated `getPeople` to return a fully compatible `cycle_stats` array, including a nested `stats` object with `originalLend`, `cashback`, and `repay` fields. Added `isSettled` boolean per cycle.
- **Type System (`src/types/moneyflow.types.ts`):** Extended `PersonCycleStats` interface to include `isSettled` and the `stats` breakdown.
- **UI Component (`src/components/people/v2/people-row-v2.tsx`):** Added the missing `allCycles`, `activeCycleRemains`, and `isSettled` props to the `ManageSheetButton` in the row view.
- **Navigation:** Updated the `onCycleChange` handler in the row view to redirect to the person's detail page with the selected cycle tag for a deep dive.

### 2. Cron Job Distribution Fix
**Problem:** The `/api/cron/distribute` job was failing with `401 Unauthorized` in Vercel.
**Improvements:**
- **Route Logic (`src/app/api/cron/distribute/route.ts`):** 
    - Fixed a bug where `authHeader` was missing due to a malformed edit.
    - Added explicit logging for `CRON_SECRET` configuration status.
    - Added logging for unauthorized requests (header length) to help debug if the secret in Vercel is mismatched or empty.
- **Business Logic (`src/services/service-manager.ts`):** Verified the distribution logic. It correctly targets the first day of the month for services with `due_day = 1`. Currently, on April 1st, it should trigger for all active services.

## ⚠️ Action Required for USER
1. **CRON_SECRET:** If the cron job still returns 401, verify that `CRON_SECRET` is set in Vercel's **Environment Variables** AND that it matches the one configured in the Vercel Cron settings (which sends it as a Bearer token).
2. **Refresh:** If balances on the People page don't update immediately after a Lend/Repay, ensure you are not seeing a cached version (though `revalidatePath` is implemented).

## 🚀 Technical Context (Service v9 Engine)
The reconciliation logic is now stable using the **MAX(Raw, Sync)** strategy per cycle bucket:
- If a cycle is marked as `settled` in the sync records, it is forced to 0.
- Otherwise, it uses the higher value between the raw transaction sum and the sync record to prevent data loss or double-counting.
- Total balance is the sum of all individual cycle buckets.
- `Cashback Total` is now strictly scoped to the `currentMonthTag` (2026-04).

--- 
*Last Updated: 2026-04-01 | Antigravity AI*
