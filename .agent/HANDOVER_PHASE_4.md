# Money Flow 3 - Phase 4 Handover (Automation & Service)

## ✅ Status Update
- **Phase 1-3C**: COMPLETED. People UI is stabilized, columns aligned, sorting optimized.
- **Phase 5 (Account Create)**: FIXED. Removed invalid `owner_id` relation for new records.

## 🚀 Phase 4 Objectives (Next Agent)

### 1. Service Management Layer
- [ ] Implement `service.service.ts` to manage recurring subscriptions.
- [ ] Integrate service payments into `transaction.service.ts` so they auto-create transactions based on schedule.
- [ ] UI for managing service lifecycle (Active/Paused/History).

### 2. Automation Bot (Money Flow Bot)
- [ ] Create a background worker pattern (or cron job API) to check for daily recurring transactions.
- [ ] Implement early-warning logic (Toast/Notification) when a credit card statement is closing soon.

### 3. Advanced Cashback Logic
- [ ] Refine `cashback.service.ts` to support multi-tier rules (e.g., 1% for first 5M, 2% after).
- [ ] Link cashback earnings to generic "Income" transactions automatically.

---

## ⚠️ Important Context for Next Agent

### Data Source Priority
- **PocketBase (PB)** is the primary source. Supabase is fallback/legacy.
- Log formats: Use `[DB:PB]` for all server-side operations.

### Relationship Mapping
- **Accounts** -> `holder_person_id` links to **People**.
- **Transactions** -> `debt_cycle_tag` links to **Sheet Cycles**.

### UI Rules (STRICT)
- Avatars must be **rounded-none** (square).
- No **monospace** fonts in UI.
- All "Open Detail" links must use `target="_blank"`.

### Recent UI Changes
- **Copy ID** & **Open PB** icons are placed *before* name in tables.
- **Remains** column now shows absolute VND amount (color-coded).
- **Sorting** groups people with sheet configs at the top.

---
**Last Updated**: 2026-03-16
**Status**: Ready for Phase 4
