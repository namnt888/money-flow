# HEADER REDESIGN ANALYSIS - Based on Mockup (2026-04-11)

## Mockup Analysis (IMG1)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [VISA Logo] MSB ONLINE                                    COLLAPSE Button   │
│             042010109... NGUYEN THANH T...                                   │
│             [PARENT] [CYCLE 26]                                              │
│             ⚡ 10% ONLINE SHOPPING                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ BALANCE          HEALTH                                                      │
│ AVAILABLE  SOLD        LIMIT                                                 │
│ 16.900     23,207,817  30,000,000                                           │
│                                                                              │
│ RATIO 43.7%           PACE 8,446,162 / 30,000,000                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ PERFORMANCE                    CB PERF                    ANALYTICS         │
│ NET PROFIT  ACTUAL CLAIMED  EST EARNED  ACTUAL EARN  SHARED TO GROUP        │
│ 49,370      0               49,370      49,370       0                      │
│                                                                              │
│ 🎯 GOAL 36%    NEEDS 1,925,050    SPENT 1,074,950    📅 26.03-25.04       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Design Elements

**1. Identity Section (Top Left)**
- Card logo (VISA) - rounded-sm (square)
- Account name: MSB ONLINE (bold, uppercase)
- Account number + receiver name (smaller, gray)
- Badges: PARENT (blue), CYCLE 26 (green)
- Cashback badge: ⚡ 10% ONLINE SHOPPING (amber/yellow)

**2. Balance Section (Left Column)**
- Header: BALANCE + HEALTH labels
- Three metrics in row:
  - AVAILABLE: 16.900 (green, large)
  - SOLD: 23,207,817 (blue, large)
  - LIMIT: 30,000,000 (gray, large)
- Progress indicators:
  - RATIO 43.7% (blue badge)
  - PACE 8,446,162 / 30,000,000 (gray text)

**3. Performance Section (Right Column)**
- Header: PERFORMANCE + CB PERF + ANALYTICS
- Five metrics in row:
  - NET PROFIT: 49,370 (green)
  - ACTUAL CLAIMED: 0 (gray)
  - EST EARNED: 49,370 (amber)
  - ACTUAL EARN: 49,370 (blue)
  - SHARED TO GROUP: 0 (gray)
- Goal progress:
  - 🎯 GOAL 36% (blue badge)
  - NEEDS 1,925,050 (red/amber)
  - SPENT 1,074,950 (gray)
  - 📅 26.03-25.04 (cycle range, gray)

### Design Principles from Mockup

1. **Clean Grid Layout:** 3 main sections (Identity, Balance, Performance)
2. **Consistent Typography:** 
   - Labels: UPPERCASE, small, gray
   - Values: Large, bold, colored by type
   - Numbers: tabular-nums for alignment
3. **Color Coding:**
   - Green: Positive/Available
   - Blue: Neutral/Info
   - Amber/Yellow: Cashback/Rewards
   - Red: Urgent/Needs attention
   - Gray: Secondary info
4. **Badge System:**
   - Rounded-full for status (PARENT, CYCLE)
   - Inline icons for context (⚡, 🎯, 📅)
5. **Spacing:** Generous padding, clear visual hierarchy

## Problems Identified (IMG2)

From the screenshot showing 3 files with issues:

1. **AccountDetailHeaderV2.tsx** - 788 problems
   - Legacy component with accumulated technical debt
   - Complex logic mixed with presentation
   - Needs complete UI refresh

2. **AccountDetailViewV2.tsx** - 43 problems
   - Parent component integration issues
   - Props passing complexity

3. **AccountDetailHeaderRedesign.tsx** - 152 problems
   - New component in progress
   - Needs cleanup and completion

## Redesign Strategy

### Phase 1: Component Architecture
```
AccountDetailHeaderRedesign (Main Container)
├── HeaderIdentityBlock
│   ├── Account logo (rounded-sm)
│   ├── Account name + number
│   └── Badges (PARENT, CYCLE, Cashback)
├── HeaderBalanceBlock
│   ├── Available/Sold/Limit metrics
│   └── Ratio + Pace indicators
└── HeaderPerformanceBlock
    ├── Cashback metrics (5 columns)
    └── Goal progress bar
```

### Phase 2: Data Flow
```
AccountDetailViewV2 (Page)
  ↓ props
AccountDetailHeaderRedesign
  ↓ useAccountHeaderViewModel (adapter)
  ↓ view-model
[HeaderIdentityBlock, HeaderBalanceBlock, HeaderPerformanceBlock]
```

### Phase 3: Feature Flag
```typescript
// .env.local
NEXT_PUBLIC_ACCOUNT_HEADER_REDESIGN=1

// In AccountDetailViewV2.tsx
const useRedesign = process.env.NEXT_PUBLIC_ACCOUNT_HEADER_REDESIGN === '1'
return useRedesign 
  ? <AccountDetailHeaderRedesign {...props} />
  : <AccountDetailHeaderV2 {...props} />
```

## Implementation Checklist

- [ ] Clean up AccountDetailHeaderRedesign.tsx (fix 152 problems)
- [ ] Create HeaderIdentityBlock component
- [ ] Create HeaderBalanceBlock component  
- [ ] Create HeaderPerformanceBlock component
- [ ] Create useAccountHeaderViewModel hook
- [ ] Add feature flag logic in AccountDetailViewV2.tsx
- [ ] Test with VPBank Lady (family card)
- [ ] Test with MSB Online (standalone card)
- [ ] Verify cashback calculations
- [ ] Verify cycle accuracy
- [ ] Run pnpm lint
- [ ] Run pnpm build

## Next Actions

1. Read current AccountDetailHeaderRedesign.tsx to understand existing progress
2. Identify and fix the 152 problems
3. Implement missing components based on mockup
4. Wire up feature flag
5. Test and verify

---
**Generated:** 2026-04-11 17:02 ICT  
**Status:** Analysis Complete, Ready for Implementation