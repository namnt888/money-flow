# Accounts Table Layout (V2) - Column Reordering Guide

**Last Updated:** April 5, 2026  
**Status:** Column order finalized and persisted via localStorage

## Overview
The accounts table V2 component displays account information in a dynamic, resizable grid layout. Columns are persisted in localStorage and automatically restored.

## Current Column Order (2026-04-05)
```
1. Account Name (Account)     - 195px (frozen)
2. Balance                    - 180px
3. Due                        - 160px
4. Role & Ownership           - 180px
5. Limit                      - 155px
6. Rewards                    - 150px
7. Actions                    - 120px (frozen)
```

## Key Files Modified
- **`src/hooks/useAccountColumnPreferences.ts`** – Column order definition, width defaults, localStorage persistence logic
- **`src/components/accounts/v2/AccountRowV2.tsx`** – Cell rendering for each column type
- **`src/components/accounts/v2/AccountTableV2.tsx`** – Table wrapper and row orchestration

## Implementation Details

### localStorage Persistence
The hook maintains three localStorage keys:
- `mf_v3_account_col_order` – Persists column order
- `mf_v3_account_col_vis` – Persists column visibility
- `mf_v3_account_col_width` – Persists resizable widths (clamped to minWidth)

### Column Reorder Logic
When loading from localStorage:
1. Filters out removed columns
2. **Forces Balance to appear immediately after Account** (via splice logic in `savedOrder` load effect)
3. Fills in any missing columns at the end
4. Clamps persistent widths to minimum allowed per column

### Balance Column Features
- **Type:** Credit-card-specific balance pill
- **Colors:** 
  - 🔴 Red (<30% remaining credit)
  - 🟊 Amber (30-80% remaining)
  - 🟢 Green (≥80% remaining)
- **Logic:** Uses `remainingPercent = (finalBalance / limit) * 100` for credit cards

### Role Column Features  
- **Type:** Grid-based layout with fixed slots
- **Slots:** `[108px_14px_52px_28px_14px_42px]` (6-column layout)
  - Parent/Child/Standalone badge (108px)
  - Arrow/spacer (14px)
  - Account image (52px, no border)
  - +x badge (28px, visible if children > 1)
  - Network icon (14px)
  - Owner/Crown badge (42px)

## Migration & Width Clamping
When column defaults are reduced (e.g., Name: 210px → 195px):
- localStorage migration applies `Math.max(minWidth, persistedWidth)` during load
- Prevents users with old localStorage from seeing unclamped widths
- Next save will use new width if user hasn't manually resized

## Example Feature Request: Add New Column
1. Add to `AccountColumnKey` union type
2. Add to `defaultAccountColumns` array with defaults
3. Add to `visibleColumns` initial state
4. Implement `renderCell()` case for new column key
5. Add width migration logic if needed

## Known Patterns & Gotchas
- **Don't reorder frozen columns** – Account (left freeze) and Actions (right freeze) must stay at edges
- **Don't allow Balance in front of Account** – UX intent is to show name first, then balance at-a-glance
- **Always clamp widths on load** – Prevents layout breaks from old localStorage values
- **Test at 100% zoom** – Primary breakpoint for horizontal scroll verification

## Related Docs
- [Accounts V2 Component Architecture](./)
- [Balance Color Thresholds](./BALANCE_PILL_COLORS.md)
- [Role Column Alignment](./ROLE_COLUMN_LAYOUT.md)

---
**Next improvements:** Column customization modal, column reorder UI, persistent column preferences per account type.
