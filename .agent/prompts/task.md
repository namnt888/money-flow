You are continuing the implementation for add-txn v2 and Multi-Cycle Repay.

The previous implementation is incomplete. Fix the remaining UI + data behavior issues below.

## Context
We already have:
- a parent repayment transaction
- child allocation transactions already created for each cycle
- a Multi-Cycle Repay slide
- add-txn v2 edit flow

You must inspect the current implementation and existing saved data before making assumptions.

## Reference problems

### A. Add-txn v2 layout bug
In the Edit Transaction slide, when "Ready for Multi-Cycle" is shown/expanded, the block is still rendered below the Debt Tag Cycle column only.

Expected:
- This block must span across the full form width, similar to the Note field row.
- It should visually flow across both Person and Debt Cycle area, not stay trapped under Debt Cycle.
- Rework the layout/grid structure if needed. Do not fake it with fragile CSS hacks only.

Please investigate why it still renders inside the Debt Cycle column and fix the parent layout structure properly.

### B. Multi-Cycle Repay slide incomplete
For each cycle row, after "New Balance", there should be working actions:
- Open TXN in new tab
- Open DB in new tab

Current issue:
- There is an Action area/column conceptually, but it is not clickable or not properly wired.
- Research whether the web app can map from the parent repayment txn to each allocated child txn.
- Determine whether the link currently exists via:
  - top-level `parent_transaction_id`
  - `metadata.parent_transaction_id`
  - another relation/helper
- If current mapping is incomplete or fragile, propose and implement the safest fix.

## Sample data to inspect
Parent txn example:
- id = `3biw3oicnl2tnln`
- metadata.is_debt_repayment_parent = true
- metadata.multi_cycle_repay_allocations exists
- metadata.multi_cycle_repay_volunteer = false

Child txn example:
- id = `su14lcrc09azdm7`
- metadata.is_debt_repayment_child = true
- metadata.parent_transaction_id = `3biw3oicnl2tnln`
- metadata.debt_cycle_tag = `2025-12`
- top-level `parent_transaction_id` is currently empty

You must confirm how the app should query and map child txns for each cycle row.

## Required fixes

### 1) Fix add-txn v2 expanded layout
- Move the "Ready for Multi-Cycle" section out of the narrow Debt Cycle column flow.
- Render it as a full-width row in the form layout, like Note.
- Preserve current spacing and design consistency.

### 2) Wire cycle row actions in Multi-Cycle Repay
For each cycle row that already has a created child txn:
- show working "Open TXN" action
- show working "Open DB" action
- disable/hide actions if no child txn exists yet
- make the row clearly indicate whether a child txn already exists

### 3) Research and fix parent-child mapping
- Inspect current query logic for repayment parent/child transactions
- Confirm whether child txns are linked through metadata only
- If needed, normalize mapping logic so edit/reopen flow can reliably find existing child txns by:
  - parent transaction id
  - person id
  - debt cycle tag
  - repayment-child markers

### 4) Volunteer repay behavior
If notes are marked `#Volunteer_Repay`, then do NOT simply attach that note to the parent txn.

Expected behavior:
- Do not put `#Volunteer_Repay` note onto the parent transaction note
- Create a separate draft txn from the System account
- That draft txn must:
  - use category = Repayment
  - use the matching people/person
  - carry `#Volunteer_Repay`
  - represent the amount needed to bring remaining debt to 0

Also:
- Link this volunteer txn correctly with the related allocation/repayment context
- Reuse existing link conventions if available
- If relation support is missing, identify whether we need a PocketBase migration or schema update

### 5) Prevent duplicate submit on edit
When editing a transaction that already has submitted child repayment txns:
- reopening the Multi-Cycle Repay slide must show those submitted allocations
- user must NOT be able to press Allocate again in a way that creates duplicated submitted child txns
- guard against duplicate generation/submission
- show a clear read-only / already-created / update-only state where appropriate

### 6) Migration / schema fallback
If existing collection schema is insufficient to safely support parent-child linking:
- identify exactly what field is missing
- propose the minimal PocketBase migration needed
- only implement it if truly necessary
- explain why current metadata-only approach is not enough

## Rules
- Do not guess business logic. Inspect current implementation first.
- Reuse existing helper/components/query patterns where possible.
- Prefer a robust mapping strategy over a UI-only patch.
- Avoid breaking existing parent repayment flow.
- Keep changes minimal but correct.

## Expected report after coding
Return:
1. files changed
2. root cause of the layout bug
3. root cause of missing/non-clickable action icons
4. exact mapping logic used to find child txns
5. whether migration/schema update was required
6. how duplicate child txn creation is prevented
7. manual QA checklist for:
   - edit existing parent repayment
   - reopen Multi-Cycle Repay
   - view child txn actions per cycle
   - volunteer repay flow
   - duplicate submit prevention

Before coding:
- first print the current component tree / layout structure involved in add-txn v2
- first print the current query path used to locate repayment child txns
- do not start editing until you identify both root causes   