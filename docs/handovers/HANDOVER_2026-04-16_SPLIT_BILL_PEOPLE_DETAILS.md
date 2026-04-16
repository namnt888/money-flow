# Handover - Split Bill + People Details (2026-04-16)

## Branch
- `branchA-wed-apr-15`

## Scope Summary
This handover captures the split-bill flow alignment for People details page and UI migration from modal-heavy interactions to slide/sheet interactions in the split-bill tab.

## Key Findings (Root Cause)
1. Split transactions were created with current metadata contract (`metadata.split_bill`, `split_group_id`, `split_parent_id`, etc.), but split-bill tab still relied heavily on legacy note-prefix parsing.
2. People debt cycle grouping logic in `usePersonDetails` depended primarily on `debt_cycle_tag`; split child transactions with empty `debt_cycle_tag` but valid `tag` / `persisted_cycle_tag` could be hidden from expected cycle views.
3. Split-bill tab had outdated modal patterns mixed with newer slide UX.

## Implemented Changes

### 1) Cycle tag fallback fix for People detail debt grouping
- File: `src/hooks/use-person-details.ts`
- Updated `getTxnCycleTag()` fallback chain to include:
  - `txn.tag`
  - `txn.persisted_cycle_tag`
  - `metadata.persisted_cycle_tag`
- Impact: split debt rows with empty `debt_cycle_tag` are no longer silently omitted from cycle grouping.

### 2) Split Bill tab now reads current metadata-based flow
- File: `src/components/people/split-bill-manager.tsx`
- Reworked split grouping to recognize current split markers:
  - `metadata.split_bill`
  - `metadata.is_split_bill_base`
  - `metadata.is_split_share`
  - `metadata.split_group_id`
  - `metadata.split_parent_id`
  - `parent_transaction_id`
- Participant extraction now prefers `metadata.split_bill.participants` and falls back safely.
- Empty-state text updated to indicate this tab reflects split-created transactions.

### 3) Split row quick actions migrated toward slide/sheet UX
- File: `src/components/people/split-bill-row.tsx`
- Replaced quick repay modal trigger with `TransactionSlideV2` launch.
- Converted delete confirmation from custom fixed overlay to `Sheet`-based panel.

### 4) Split bill edit dialog migrated from modal overlay to sheet
- File: `src/components/people/edit-split-bill-dialog.tsx`
- Converted UI to `Sheet` + `SheetContent` side panel.
- Preserved existing edit/update behavior while aligning UX with slide/sheet direction.

## Validation
- Build: `pnpm build` ✅
- Test: `pnpm test -- --runInBand` ✅
  - 2 files passed
  - 17 tests passed

## Notes / Risks
1. `updateSplitBillAction` in `src/actions/transaction-actions.ts` still contains legacy assumptions (`from_account_id`, status string differences, minimal metadata writes). This was not fully refactored in this handover and should be aligned next to the current transaction model.
2. Workspace had many unrelated local changes (`.icloud`, `* 2.tsx`, migration helper artifacts). Per user instruction, commit may include all current changes in working tree.

## Suggested Next Step
- Refactor `updateSplitBillAction` and split-bill edit persistence to fully match `createSplitTransactions()` metadata contract and account field naming used by current PocketBase schema.
