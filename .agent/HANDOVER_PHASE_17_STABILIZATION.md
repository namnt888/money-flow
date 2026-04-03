# HANDOVER: Financial Reporting Engine Stabilization (Phase 17)

## 🎯 Current Status
The current phase focused on stabilizing account relationships (VIB Family) and fixing cashback calculation discrepancies for tiered cards (HDBank). While UI polish (percentage deduplication, role icons) has been completed, core logic issues remain in data synchronization.

---

## ❌ Unresolved Issues

### 1. VIB Family Balance Synchronization
**Observed Behavior**:
- Parent and Child accounts show **different remaining percentages and usages** in the Account list.
- "Group Balance" badge only appears consistently on the Parent.
- Example: Vib Online (Child) shows 80% remaining, while Vib Super Card (Parent) shows 75%.

**Root Cause Analysis**:
1. **Missing `is_parent` flag**: In `AccountTableV2.tsx`, line 439 tries to resolve the group ID using `account.parent_account_id` (for children) OR `account.relationships?.is_parent` (for parents). The `sampleSql.sql` data for the Parent (Vib Super Card) **lacks** the `is_parent: true` flag. Thus, the Parent fails to recognize itself as a Group Root and defaults to its own balance (`grpId` becomes `''`).
2. **Sibling Visibility**: In `AccountTableV2.tsx`, `robustAllAccounts` defaults to the current `accounts` list (which may be filtered) if `allAccounts` prop is not passed. If the Parent and Children are not in the same filtered list, the `filter` on line 444 will return an incomplete set.

**Action for Next Agent**:
- **Data Fix**: Add `"relationships": { "is_parent": true }` to the parent account in the database.
- **UI Fix**: In the parent component of `AccountTableV2`, ensure the `allAccounts` prop (containing the UNFILTERED list) is always passed to facilitate cross-account Lookups.

### 2. HDBank Tiered Cashback Mapping
**Observed Behavior**:
- HDBank transactions show a **6% estimate (Base Tier)** in high-spend scenarios where they should trigger the **10% High Tier** (>10M spend).
- Hovering shows `5,009,000 x 6%`, ignoring the fact that cumulative monthly spend has exceeded 10M.

**Diagnosis**:
- `resolveCashbackFields` in `UnifiedTransactionTable.tsx` computes `stats.spentBefore` to resolve the policy. If the table ordering or cycle aggregation is off, the "High Tier" (10M threshold) won't trigger.
- **Data Check**: In `sampleSql.sql`, ensure `cb_rules_json` follows the correct tiered structure that `resolveCashbackPolicy` expects.
- **Config Mismatch**: The UI sometimes displays "2.30%" (the shared amount) while the hover shows "6%" (the bank estimate). This indicates a mismatch between the *resolved policy* and the *saved metadata*.

---

## 🛠️ Logic & File References

- **Policy Resolver**: `src/services/cashback/policy-resolver.ts` -> Master logic for tiered/simple matching.
- **Relationship UI**: `src/components/accounts/v2/AccountRowV2.tsx` -> Rendering of Parent/Child badges and balances.
- **Table Data Logic**: `src/components/moneyflow/unified-transaction-table.tsx` -> `resolveCashbackFields` and `transactionCycleStats`.

## ⚠️ Warning
The user has reached the 10M+ spend audit, so any transaction in HDBank after the first 10M MUST show 10% in the `Est. Cashback (Calculated)` hover. If it shows 6%, the `spentBefore` logic is likely failing to look back correctly across the entire month.

---
**Last Agent Note**: Prioritize `spentBefore` debugging in the transaction table first, as it affects the core financial "Truth" of the app.
