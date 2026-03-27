# Money Flow 3 - Development Log (Batch Module Stabilization)

## Period: 2026-03-27
**Developer**: Antigravity (Google DeepMind)
**Phase**: 15/16 - Batch Module Refinement & Phase Selection Optimization

---

## ⚡ Key Improvements

### 1. Smart Phase Selection (Auto-Navigate)
- **Problem**: Opening `/batch/mbb` always defaulted to the first available phase, even if the user was working on a different one.
- **Solution**: Implemented logic to query the most recently updated item for the bank/month and automatically navigate to its phase.
- **Robustness**: Fixed PocketBase 400 errors by switching from dot-notation filters to explicit batch ID list filters and optimized sorting.

### 2. Automated Note Generation (Phase Alignment)
- **Problem**: Notes in DB were missing phase identifiers (e.g. "Before 5").
- **Solution**: Updated `generateBatchItemNote` to use `phase.label` instead of `phase.name`.
- **Backfill**: Corrected **62 existing records** in PocketBase to reflect the unified note format matching Google Sheets.

### 3. Critical Performance Optimization
- **Problem**: "Preparing" page load for 12 months was slow (4-7s).
- **Optimization**:
    -   Implemented `Promise.all` for all metadata fetches (Accounts, Categories, Mappings, Phases, Settings, Installments).
    -   Reduced sequential DB calls in Server Components.
    -   **Deep Linking**: Updated Landing Page to include `?month=YYYY-MM` in links, allowing direct navigation and reducing initial data overhead.
    -   **Heuristic Fast-Path**: Smart phase selection now uses a minimal 1-record query with system sort.

---

## 🛠️ Technical Fixes (PocketBase)
- Found and resolved issue where `batch_id.bank_type` filter combined with `sort` caused 400 errors.
- **Working Pattern**: 
    1. Fetch Batch IDs for month.
    2. Filter items by `(batch_id = "id1" || batch_id = "id2")`.
    3. Sort in-memory or use system `updated` field for very small pages.

---

## 👥 People & Debt Module Analysis (Pre-Refactor)
*   **Current State**: The `/people` page uses `PeopleDirectoryV2` as a central hub. It fetches people, subscriptions, and financial metadata in parallel.
*   **Key Logic**:
    *   **Heuristic Sorting**: Prioritizes people with active Google Sheet configurations and outstanding balance.
    *   **Deep Integration**: Seamlessly triggers `TransactionSlideV2` for lending/repayment actions.
    *   **Data Consistency**: Uses `syncAllPeopleDebtCyclesAction` for historical realignment.
*   **Refactor Plan (Future)**: 
    *   Align "Current Tag" displays with the "Unified Transaction Table" style.
    *   Optimize multi-sheet sync performance (similar to Batch optimizations).
    *   Standardize debt calculation formulas across all views.

---

## 📅 Future Plan: Phase 17 - Caching & Advanced Tracking
1.  **Cookie-based Persistent State**: Store `last_selected_phase` in cookies to eliminate "Smart Selection" queries on every refresh.
2.  **Credit Card Advance & Profit Tracking**: (See `.agent/HANDOVER_PHASE_16_CREDIT_PROFIT.md` for context).
3.  **Lazy Loaded Month Selector**: Only load month summaries for the sidebar after the main component has rendered.

---

---
 
## 📜 Git History Snapshot (2026-03-27)
- `2681be6` - feat: stabilize batch and people modules, fix TS build errors (2026-03-27)
- `ecad49f` - fix: batch import sorting and phase selection (2026-03-27)
- `ee3f3dc` - fix: smart phase selection for batch import (2026-03-27)
- `fb427e0` - feat: batch module stability and data integrity fix (2026-03-27)
- `b58c0ff` - fix(people): synchronization (2026-03-22)
- `f49c0a1` - feat: people module refactor (2026-03-22)

---
**Status**: STABLE | **Performance**: OPTIMIZED
