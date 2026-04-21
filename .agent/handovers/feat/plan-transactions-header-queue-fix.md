# Plan: Fix /transactions Header and Queue UI Issues

**Branch:** feat/transactions-header-thu-ba-21-04  
**Date:** 2026-04-21  
**Related Issue:** Header bar cleanup + Queue panel re-design

---

## Problem Summary

The `/transactions` page has several UI issues to fix:

### Part 1 — Header Bar Cleanup
1. **Remove "Refund" button** - leftover from older design (lines 469-484 in TransactionHeader.tsx)
2. **Remove red "Clear" button** - legacy UI, keep only "Reset" button (lines 612-616 in TransactionHeader.tsx)
3. **Fix Active/Void toggle state** - currently doesn't change visual state or filter the list properly (lines 436-485)
4. **Add "Collapse All / Expand All" button** - new feature to control all queue panels globally

### Part 2 — Queue Panel Re-design
1. **Collapsed state** - show only title, count badge, and horizontal scrollable avatar pills (≤48px height)
2. **Expanded state** - show full detailed list as current
3. **Per-panel toggle** - keep existing individual expand/collapse
4. **Global toggle integration** - new button drives all panels but allows individual override

---

## Files to Modify

### Primary Files
1. **src/components/transactions-v2/header/TransactionHeader.tsx**
   - Remove Refund button (lines 469-484)
   - Remove ClearDropdownButton usage (lines 612-616)
   - Fix Active/Void toggle logic to be radio-style (mutually exclusive)
   - Add CollapseAll button with icon (before Search input)
   - Pass `queuesCollapsed` and `onToggleQueuesCollapsed` props (already passed from parent)

2. **src/components/transactions/UnifiedTransactionsPage.tsx**
   - Update `renderQueueSection()` to support collapsed pill-row mode
   - Update `renderQueueRow()` to render pills when collapsed
   - Integrate global collapse state with per-panel expanded state
   - Ensure collapsed panel height ≤48px
   - Make pills horizontally scrollable

---

## Implementation Details

### 1a. Remove Refund Button
**File:** `src/components/transactions-v2/header/TransactionHeader.tsx`

Delete lines 469-484 (the entire third `<button>` element inside the status toggle div).

Also remove `refund` from the `StatusFilter` type if not used elsewhere:
```typescript
// Current (line 37-41)
export type StatusFilter = {
  active: boolean
  void: boolean
  refund: boolean
}

// New
export type StatusFilter = {
  active: boolean
  void: boolean
}
```

**Check:** Verify `statusFilter.refund` is not used in filtering logic before removing.

---

### 1b. Remove Red Clear Button
**File:** `src/components/transactions-v2/header/TransactionHeader.tsx`

The ClearDropdownButton component (lines 114-183) is used at lines 612-616. Remove this usage entirely.

Keep the `ClearDropdownButton` component definition for now (may be used elsewhere), but remove its invocation in the desktop header.

The "Clear Filter" and "Clear All" functionality should remain accessible through other means if needed, but the requirement says to remove the red button entirely.

---

### 1c. Fix Active/Void Toggle State
**File:** `src/components/transactions-v2/header/TransactionHeader.tsx`

**Current behavior (broken):**
```typescript
onClick={() => {
  const next = { ...localStatusFilter, active: !localStatusFilter.active }
  setLocalStatusFilter(next)
  if (hasActiveFilters) onStatusChange(next)
}}
```

This toggles independently, allowing both to be off or on.

**Required behavior (radio-style):**
```typescript
// Active button
onClick={() => {
  if (!localStatusFilter.active) {
    const next = { active: true, void: false }
    setLocalStatusFilter(next)
    if (hasActiveFilters) onStatusChange(next)
  }
  // If already active, do nothing (keep selected)
}}

// Void button
onClick={() => {
  if (!localStatusFilter.void) {
    const next = { active: false, void: true }
    setLocalStatusFilter(next)
    if (hasActiveFilters) onStatusChange(next)
  }
  // If already void, do nothing (keep selected)
}}
```

**Styling requirements:**
- Selected: filled background with primary color token, white text
- Unselected: ghost/outline style

Update the className logic:
```typescript
// Active button
className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-colors ${
  localStatusFilter.active
    ? 'bg-primary text-primary-foreground'  // Use design system token
    : 'text-slate-500 hover:bg-slate-100'
}`}

// Void button
className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-colors ${
  localStatusFilter.void
    ? 'bg-primary text-primary-foreground'
    : 'text-slate-500 hover:bg-slate-100'
}`}
```

**Filter integration:**
Verify the filtering logic in UnifiedTransactionsPage.tsx correctly uses `statusFilter`:
```typescript
// Lines 688-690
const isVoidTxn = t.status === 'void'
if (isVoidTxn && !statusFilter.void) return false
if (!isVoidTxn && !statusFilter.active) return false
```

This looks correct - just needs the toggle to properly update the state.

---

### 1d. Add "Collapse All" Button
**File:** `src/components/transactions-v2/header/TransactionHeader.tsx`

Add a new button in the right area of the header bar (before Search input).

**Props needed:**
- `queuesCollapsed?: boolean`
- `onToggleQueuesCollapsed?: () => void`

These are already passed from UnifiedTransactionsPage (line 1402-1403).

**Implementation:**
```typescript
// Import ChevronDown, ChevronUp, LayoutList (or ChevronsUp)
import { ..., LayoutList } from 'lucide-react'

// In renderDesktopFilters(), after Reset button, before Search section:
{onToggleQueuesCollapsed && (
  <Button
    variant="outline"
    size="sm"
    onClick={onToggleQueuesCollapsed}
    className="h-9 px-3 gap-1.5 font-medium"
    title={queuesCollapsed ? "Expand All" : "Collapse All"}
  >
    {queuesCollapsed ? (
      <ChevronDown className="w-4 h-4" />
    ) : (
      <ChevronUp className="w-4 h-4" />
    )}
    <span className="hidden sm:inline text-xs">
      {queuesCollapsed ? "Expand All" : "Collapse All"}
    </span>
  </Button>
)}
```

**Icon choice:** Use `ChevronUp` for collapse, `ChevronDown` for expand (matches panel chevrons).

---

### Part 2. Queue Panel Re-design

**File:** `src/components/transactions/UnifiedTransactionsPage.tsx`

#### Collapsed State Requirements
When `!expanded && queuesCollapsed`:
- Show only panel title and count badge on left
- Show horizontal scrollable row of avatar pills on right
- Each pill: account/shop image (or initials) + pending amount as small badge
- No labels, no amount text outside pill
- Pill size: ~32px image, compact chip style
- Total row height: ≤48px

#### Implementation Strategy

**Step 1:** Update `renderQueueRow()` to support pill mode

```typescript
const renderQueueRow = (item: QueueCardItem, kind: 'refund' | 'batch', expanded: boolean, isPillMode: boolean = false) => {
  if (isPillMode) {
    // Render compact pill
    return (
      <CustomTooltip key={item.id} content={...}>
        <button
          type="button"
          onClick={item.onClick}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border bg-white px-1.5 py-1 shadow-sm hover:bg-slate-50"
          style={{ height: '32px' }}
        >
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-slate-100 text-[8px] font-black">
              {kind === 'refund' ? 'S' : 'B'}
            </div>
          )}
          <span className="text-[10px] font-bold text-slate-700">
            {item.amount.toLocaleString('vi-VN')}
          </span>
        </button>
      </CustomTooltip>
    )
  }
  
  // Existing expanded rendering...
}
```

**Step 2:** Update `renderQueueSection()` to handle collapsed mode

```typescript
const renderQueueSection = (
  title: string,
  icon: ReactNode,
  items: QueueCardItem[],
  expanded: boolean,
  onToggle: () => void,
  kind: 'refund' | 'batch',
  accentClass: string,
  emptyHint: string,
) => {
  const showInline = expanded ? items.slice(0, 12) : items.slice(0, 4)
  const hasItems = items.length > 0
  
  // Determine if in pill mode (collapsed by global OR local)
  const isPillMode = !expanded
  
  return (
    <div className={cn(
      "mb-3 rounded-2xl border px-3 py-2 shadow-sm transition-all duration-300",
      hasItems ? `bg-white/90 ${accentClass}` : "bg-slate-50 border-slate-200 opacity-80",
      isPillMode && "py-1"  // Reduce padding in pill mode
    )}>
      <div className={cn(
        "flex items-center justify-between gap-2",
        isPillMode ? "mb-0" : "mb-2"
      )}>
        <div className={cn(
          "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700",
          isPillMode && "h-6"  // Constrain height
        )}>
          {icon}
          {title}
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
            {items.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onToggle}
          disabled={!hasItems}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-50",
            isPillMode && "h-7"  // Constrain height
          )}
        >
          {!hasItems ? (
            <span>No items</span>
          ) : expanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Expand
            </>
          )}
        </button>
      </div>
      
      {!hasItems ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
          {emptyHint}
        </div>
      ) : (
        <div className={cn(
          "flex gap-2",
          isPillMode 
            ? "flex-nowrap overflow-x-auto pb-1"  // Horizontal scroll
            : "flex-wrap"
        )}>
          {isPillMode ? (
            // Show ALL items as pills in collapsed mode
            items.map((item) => renderQueueRow(item, kind, false, true))
          ) : (
            // Show limited items in expanded mode
            <>
              {showInline.map((item) => renderQueueRow(item, kind, true, false))}
              {items.length > showInline.length && (
                <button
                  type="button"
                  onClick={onToggle}
                  className="inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-dashed border-slate-300 bg-slate-50 px-2 text-[10px] font-bold text-slate-500"
                >
                  +{items.length - showInline.length}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
```

**Step 3:** Ensure container constraints

In the parent JSX where `renderQueueSection` is called, ensure the container respects the global collapse:

```typescript
// Line 1411-1414
<div className={cn(
  "transition-all duration-300 ease-out",
  queuesCollapsed 
    ? 'max-h-0 opacity-0 -translate-y-1 overflow-hidden mb-0' 
    : 'max-h-[520px] opacity-100 translate-y-0 mb-2'
)}>
```

Wait - this hides the ENTIRE queue section when `queuesCollapsed` is true. But the requirement says:
- Global button collapses/expands all panels
- Individual panels can still be toggled independently AFTER global toggle

So we need to change the logic:
- `queuesCollapsed` sets the DEFAULT state for all panels
- But individual `expandedQueues.refund` and `expandedQueues.batch` can override

**Updated approach:**

```typescript
// In UnifiedTransactionsPage.tsx, line 180-184
const [expandedQueues, setExpandedQueues] = useState({
  refund: false,
  batch: false,
})
const [queuesCollapsed, setQueuesCollapsed] = useState(false)

// When global toggle is clicked, set all panels to match
const handleToggleQueuesCollapsed = () => {
  const newState = !queuesCollapsed
  setQueuesCollapsed(newState)
  // Set all panels to opposite of new state (if collapsing, all false; if expanding, all true)
  setExpandedQueues({
    refund: !newState,
    batch: !newState,
  })
}

// But individual panel toggle can override:
const handleToggleRefund = () => {
  setExpandedQueues((prev) => ({ ...prev, refund: !prev.refund }))
  // Don't change queuesCollapsed - this is an override
}
```

Actually, re-reading the requirement:
> The "Collapse All / Expand All" button added in Part 1d must drive the collapsed/expanded state of all panels simultaneously, while still allowing individual panels to override after the global toggle.

So:
1. Click "Collapse All" → all panels collapse
2. User manually expands one panel → that panel is now expanded (override)
3. Click "Expand All" → all panels expand
4. User manually collapses one panel → that panel is now collapsed (override)

The `queuesCollapsed` state is just the LAST GLOBAL COMMAND, not the current state of all panels.

Let me reconsider the implementation...

Actually, looking at the current code structure, I think we should simplify:
- Remove `queuesCollapsed` state
- Just use `expandedQueues` object
- "Collapse All" button sets all to `false`
- "Expand All" button sets all to `true`
- Individual toggle changes just that panel

But the requirement says:
> Default state: "Collapse All"

So initially all panels should be collapsed. And the button label switches based on whether ALL panels are collapsed or ALL are expanded.

**Revised implementation:**

```typescript
// State
const [expandedQueues, setExpandedQueues] = useState({
  refund: false,  // Default collapsed
  batch: false,
})

// Check if all are collapsed
const allCollapsed = !expandedQueues.refund && !expandedQueues.batch
const allExpanded = expandedQueues.refund && expandedQueues.batch

// Global toggle handler
const handleToggleQueuesCollapsed = () => {
  if (allCollapsed || !allExpanded) {
    // Expand all
    setExpandedQueues({ refund: true, batch: true })
  } else {
    // Collapse all
    setExpandedQueues({ refund: false, batch: false })
  }
}

// Button label
<Button onClick={handleToggleQueuesCollapsed}>
  {allCollapsed ? 'Expand All' : 'Collapse All'}
  {allCollapsed ? <ChevronDown /> : <ChevronUp />}
</Button>

// Pass to header
queuesCollapsed={allCollapsed}
onToggleQueuesCollapsed={handleToggleQueuesCollapsed}
```

Wait, this doesn't match the requirement either. Let me re-read:

> Default state: "Collapse All" (icon: chevrons-up or layout-list).
> Clicking it collapses every queue panel on the page simultaneously.
> When all panels are already collapsed, the button label switches to "Expand All"

So:
- Initial state: panels are EXPANDED (default), button shows "Collapse All"
- Click "Collapse All": all panels collapse, button changes to "Expand All"
- Click "Expand All": all panels expand, button changes to "Collapse All"

But then:
> Individual panel collapse/expand must still work independently (see Part 2 below); the global button only sets the default open/closed state for all panels at once.

Hmm, this is ambiguous. Let me interpret it as:
- Global button toggles ALL panels at once
- After global toggle, user can still individually toggle any panel
- Button label reflects current state of ALL panels (if ANY panel differs, show mixed state? Or base on majority?)

Simplest interpretation:
- Button shows "Collapse All" if ANY panel is expanded
- Button shows "Expand All" if ALL panels are collapsed
- Clicking button does the opposite to ALL panels

Let me implement this way.

---

## Acceptance Criteria Checklist

### Header Bar
- [ ] No "Refund" button visible
- [ ] No red "Clear" button visible
- [ ] Only "Reset" button remains for clearing filters
- [ ] Active button highlights when selected (filled background, white text)
- [ ] Void button highlights when selected (filled background, white text)
- [ ] Clicking Active when already active keeps it selected (no deselection)
- [ ] Clicking Void when already void keeps it selected (no deselection)
- [ ] Clicking Active deselects Void (mutually exclusive)
- [ ] Clicking Void deselects Active (mutually exclusive)
- [ ] "Collapse All / Expand All" button appears before Search input
- [ ] Button shows "Collapse All" with chevron-up when panels expanded
- [ ] Button shows "Expand All" with chevron-down when panels collapsed
- [ ] Clicking button toggles all panels simultaneously

### Queue Panels
- [ ] Collapsed panel height ≤48px
- [ ] Collapsed panel shows only title, count badge, and pill row
- [ ] Pills show account/shop image (or initials fallback)
- [ ] Pills show pending amount as small badge
- [ ] Pills are horizontally scrollable if more than fit
- [ ] No transaction details visible in collapsed state
- [ ] Expanded panel shows full detailed list (unchanged from current)
- [ ] Individual panel header click toggles that panel only
- [ ] Global "Collapse All" collapses all panels
- [ ] Global "Expand All" expands all panels
- [ ] Individual override works after global toggle

### Technical
- [ ] No TypeScript errors
- [ ] No regressions to existing filters (People, Account, Category, Year, etc.)
- [ ] Build passes: `pnpm build`
- [ ] Tests pass: `pnpm test`
- [ ] Lint passes: `pnpm lint`

---

## Implementation Order

1. **Fix Active/Void toggle logic** (TransactionHeader.tsx)
2. **Remove Refund button** (TransactionHeader.tsx)
3. **Remove Clear button** (TransactionHeader.tsx)
4. **Add Collapse All button** (TransactionHeader.tsx)
5. **Update queue panel rendering** (UnifiedTransactionsPage.tsx)
6. **Test all acceptance criteria**
7. **Commit with clear message**

---

## Rollback Strategy

If issues detected:
1. Single commit can be reverted: `git revert <commit-hash>`
2. No service logic changed, backend unaffected
3. Prop contracts maintained where possible

---

## Notes

- Use design system tokens (`bg-primary`, `text-primary-foreground`) for active states
- Maintain mobile/desktop parity
- Keep existing debounce, search, and filter behaviors unchanged
- Pill mode should gracefully degrade if images fail to load (show initials)
