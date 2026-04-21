# Phase 1 Plan: Header Section Components Extraction

**Branch:** feat/transactions-header-thu-ba-21-04  
**Date:** 2026-04-21  
**Goal:** Extract `renderDesktopFilters()` into separate section components while preserving all behavior.

---

## Architecture Summary (Current State)

### Data Flow
```
RSC Page (src/app/transactions/page.tsx)
  ↓ (loads data via services)
Client Orchestrator (UnifiedTransactionsPage.tsx)
  ↓ (owns state, passes props/handlers)
Header Shell (TransactionHeader.tsx)
  ↓ (local buffer state + renderDesktopFilters)
Visual Sections (inline rendering)
```

### TransactionHeader Responsibilities
1. **Local state buffer** for all filter values (account, person, category, search, type, status, cycle, date)
2. **Sync effects** to mirror parent props into local state
3. **Debounced search** (500ms delay)
4. **Account-first cycle UX** (auto-switch to cycle mode when account selected)
5. **Apply/Clear/Reset semantics** (Clear Filter vs Clear All)
6. **Desktop filters rendering** (`renderDesktopFilters()` - ~400 lines)
7. **Mobile dialog rendering** (`renderMobileFilters()` - ~200 lines)

### Current renderDesktopFilters() Structure
- Refresh button
- TypeFilterDropdown (income/expense/lend/repay/transfer/cashback/all)
- Status toggles (Active/Void/Refund) - segmented control
- QuickFilterDropdown: People
- QuickFilterDropdown: Categories  
- QuickFilterDropdown: Accounts
- UnifiedSmartDatePicker (month/year/date/range/cycle modes)
- Cycle dropdown (when account selected)
- Search input with debounce
- Clear button (with popover: Clear Filter / Clear All)
- AddTransactionDropdown

---

## Phase 1 Scope

**In Scope:**
- Extract desktop filter sections into presentational components
- Keep all state management in TransactionHeader.tsx
- Maintain exact prop contracts between UnifiedTransactionsPage ↔ TransactionHeader
- Preserve all behaviors (debounce, account-first cycle, clear semantics, etc.)

**Out of Scope:**
- Moving state ownership upward
- Changing business logic in services
- Modifying mobile dialog behavior
- Altering add flow or refresh mechanics

---

## Files to Create

All under `src/components/transactions-v2/header/sections/`:

1. **HeaderSearchSection.tsx** (~80 lines)
   - Props: `searchTerm`, `onSearchChange`, `isPending?`
   - Contains: Search input with debounced apply handler
   - Behavior: Controlled input, parent manages debounce timing

2. **HeaderFiltersSection.tsx** (~150 lines)
   - Props: `filterType`, `onFilterChange`, `statusFilter`, `onStatusChange`, `people`, `onPersonChange`, `categories`, `onCategoryChange`, `accounts`, `onAccountChange`, `availablePersonIds?`, `availableAccountIds?`, `availableCategoryIds?`, `hasActiveFilters?`, `isPending?`
   - Contains: TypeFilterDropdown, Status toggles (3 buttons), People/Category/Account QuickFilterDropdowns
   - Behavior: Real-time updates when hasActiveFilters, otherwise local-only

3. **HeaderDateSection.tsx** (~120 lines)
   - Props: `date`, `dateRange`, `dateMode`, `onDateChange`, `onRangeChange`, `onModeChange`, `cycles`, `selectedCycle`, `onCycleChange`, `disabledRange`, `availableMonths`, `isCycleLoading?`, `hasActiveFilters?`
   - Contains: UnifiedSmartDatePicker, Cycle dropdown (conditional)
   - Behavior: Account-first cycle UX handled by parent, this component just renders

4. **HeaderActionsSection.tsx** (~100 lines)
   - Props: `onRefresh`, `onClearFilters`, `onReset`, `hasActiveFilters`, `hasResetSelections`, `searchTerm`, `onSearchConfirm`, `isPending?`
   - Contains: Refresh button, ClearDropdownButton (with popover), Search confirm handler
   - Behavior: Clear Filter vs Clear All distinction

5. **MobileFilterDialog.tsx** (~250 lines)
   - Props: All filter states + handlers, `open`, `onOpenChange`
   - Contains: Mobile-optimized version of all filters in Dialog
   - Behavior: Apply on close, preserve current selection display

---

## Files to Modify

1. **src/components/transactions-v2/header/TransactionHeader.tsx**
   - Import new section components
   - Replace `renderDesktopFilters()` JSX with component composition
   - Keep all state management, effects, handlers intact
   - Pass appropriate props to each section component

---

## Parity Checklist (Must Verify Before Commit)

### Functional Behaviors
- [ ] Search typing updates local state immediately
- [ ] Search applies to parent after 500ms debounce
- [ ] Date mode switches work (all/year/month/date/range/cycle)
- [ ] Cycle options populate when account selected
- [ ] Cycle auto-selects current/highlighted option on account change
- [ ] Account/person/category filter application unchanged
- [ ] Type filter changes apply correctly
- [ ] Status toggles (Active/Void/Refund) work independently
- [ ] Clear Filter keeps search term
- [ ] Clear All resets everything including search
- [ ] Refresh triggers router refresh with loading feedback
- [ ] Add dropdown opens correct transaction type mode

### UI/UX Parity
- [ ] Desktop layout identical (flex order, spacing, heights)
- [ ] Button sizes match (h-9, h-8, etc.)
- [ ] Dropdown triggers same width/alignment
- [ ] Status toggle segmented control styling preserved
- [ ] Search input width/position unchanged
- [ ] Clear button popover behavior identical
- [ ] Mobile dialog opens/closes correctly
- [ ] Mobile filter form shows current selections

### Edge Cases
- [ ] Empty people/categories/accounts lists handled
- [ ] Selected item not in available list still displays
- [ ] Cycle loading state shows correctly
- [ ] Disabled date ranges enforce correctly
- [ ] Year selection outside available months constrained

---

## Implementation Order

1. Create directory: `src/components/transactions-v2/header/sections/`
2. Create HeaderSearchSection.tsx (simplest, isolated)
3. Create HeaderActionsSection.tsx (depends on search section pattern)
4. Create HeaderFiltersSection.tsx (largest, most complex)
5. Create HeaderDateSection.tsx (wraps existing DatePicker)
6. Create MobileFilterDialog.tsx (extract from existing renderMobileFilters)
7. Update TransactionHeader.tsx to compose sections
8. Run `pnpm build` - fix TypeScript errors
9. Run `pnpm lint` - fix style issues
10. Manual testing against parity checklist
11. Commit with message: `refactor(header): extract section components (phase 1)`

---

## Rollback Strategy

If issues detected post-commit:
1. `git revert <commit-hash>` - single command rollback
2. No service logic changed, so backend unaffected
3. Prop contracts unchanged, so parent components compatible
4. Can selectively re-extract sections if only some problematic

---

## Success Criteria

- [ ] Build passes (`pnpm build` exit code 0)
- [ ] Lint passes (`pnpm lint` exit code 0)
- [ ] Tests pass (`pnpm test` if applicable)
- [ ] All parity checklist items verified
- [ ] No visual regressions in desktop/mobile header
- [ ] Git diff shows only intended file changes
- [ ] Handover doc updated with any new caveats

---

## Notes

- Do NOT use `any` types - maintain strict TypeScript
- Use existing Shadcn UI primitives (Popover, Dialog, etc.)
- Follow existing naming conventions (onValueChange, etc.)
- Keep components presentational (no internal state beyond UI toggles)
- All business logic stays in TransactionHeader.tsx or UnifiedTransactionsPage.tsx
