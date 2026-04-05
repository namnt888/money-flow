# Batch Component Integration Guide

## Quick Start for Agents

### 1. Understanding the Scope
This branch implements **Smart Sort feature** for batch payment checklist. The key file is:
```
src/components/batch/BatchMasterChecklist.tsx
```

### 2. Key Features to Remember

| Feature | Location | What | Why |
|---------|----------|------|-----|
| Smart Sort Button | Line 1376 | Triggers refresh with loading state | Better UX for large batch sets |
| Sort Algorithm | Line 1183 (useMemo) | Groups by bank_code, ranks by max amount | Ensures correct order (15M > 5M) |
| Bank Code Badge | Line 1857 | Shows HDB, MSB, VPB codes | Clearer than Vietnamese names |
| Image Styling | Line 1864 | h-12 w-12, no background/shadow | Cleaner visual appearance |
| DB Link Fix | Line ~1600 | Includes recordId param | Direct edit mode access |

### 3. Build & Deploy

```bash
# Verify build passes
pnpm build
# Expected: ✓ Compiled successfully in ~25s

# Test locally
pnpm dev
# Navigate to /batch/mbb or /batch/vib to see changes

# Push to remote
git push origin feat/category-account-link-defaults-resest-0405

# Create PR when ready
# https://github.com/rei6688/money-flow/pull/new/feat/category-account-link-defaults-resest-0405
```

### 4. Common Issues & Fixes

**Problem:** Badge shows Vietnamese name instead of "HDB"
```typescript
// ✗ WRONG
displayCode = foundMapping?.short_name

// ✓ CORRECT
displayCode = item.bank_code || foundMapping?.bank_code || '?'
```

**Problem:** Sort order is wrong (5M appears before 15M)
```typescript
// ✗ WRONG - Sorts alphabetically by bank name first
sort((a,b) => a.accounts.name.localeCompare(b.accounts.name))

// ✓ CORRECT - Calculate group max amounts FIRST, then sort groups
const groupMaxAmounts = new Map()
items.forEach(item => { /* calculate max per group */ })
sort((a,b) => groupMaxAmounts.get(getGroupKey(b)) - groupMaxAmounts.get(getGroupKey(a)))
```

**Problem:** Image has border/background
```typescript
// ✗ WRONG
className="... bg-slate-50 shadow-sm ..."

// ✓ CORRECT
className="shrink-0 h-12 w-12 rounded-none overflow-hidden flex items-center justify-center"
```

### 5. Testing Checklist

- [ ] Smart Sort button shows spinner when clicked
- [ ] Button text changes to "Sorting..." during operation
- [ ] Sort order is correct: largest group amount appears first
- [ ] Badge displays "HDB"/"MSB"/"VPB" (3-letter codes)
- [ ] Image size is clearly visible at h-12 w-12
- [ ] No visible border or shadow around images
- [ ] Clicking "DB" link opens PocketBase in edit mode
- [ ] Works on both /batch/mbb and /batch/vib pages

### 6. Documentation References

| File | Purpose |
|------|---------|
| HANDOVER_BATCH_SMART_SORT_APR2026.md | Complete handover doc with all details |
| .github/copilot-instructions.md | Updated with batch component section |
| /memories/session/smart-sort-fixes.md | Session notes with code samples |
| /memories/repo/batch-component-architecture.md | Repo facts for future reference |

### 7. Props & Data Flow

```typescript
// Props passed to component
interface BatchMasterChecklistProps {
  bankType: 'MBB' | 'VIB'
  accounts: any[]
  bankMappings?: any[]  // CRITICAL: Need this for badge display
  globalSheetUrl?: string | null
  // ... other props
}

// Data flow
User clicks Smart Sort
  → handleSmartSort() called
  → performingAction = true (button shows spinner)
  → handleFastRefresh() reloads data
  → sortedItems useMemo recalculates sort order
  → PeriodSection re-renders with new order
  → performingAction = false (button back to normal)
```

### 8. Performance Notes

- useMemo for sortedItems: Recalculates only when `items` dependency changes
- Sort complexity: O(n log n) - acceptable for <1000 batch items
- Image loading: No performance impact (h-12 w-12 is small)
- Smart Sort refresh: Uses handleFastRefresh (consider caching for >500 items)

### 9. Future Improvements

- [ ] Add estimated time for large batch sorts
- [ ] Cache sort results for repeated Quick Sorts
- [ ] Add sort preference persistence (remember user's last sort)
- [ ] Analytics tracking for sort button usage
- [ ] Batch completion time estimation based on sort order

### 10. Questions?

Refer to the handover document or memory files:
- Session notes: `/memories/session/smart-sort-fixes.md`
- Repo facts: `/memories/repo/batch-component-architecture.md`
- Full context: `HANDOVER_BATCH_SMART_SORT_APR2026.md`

---

**Last Updated:** April 5, 2026  
**Branch:** `feat/category-account-link-defaults-resest-0405`  
**Status:** ✅ Ready for deployment
