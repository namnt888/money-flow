# MISSION: ACCOUNT HEADER UI OVERHAUL

**TARGET FILE:** `src/components/accounts/v2/AccountDetailHeaderV2.tsx`
**CURRENT BRANCH:** `feature/account-header-ui-overhaul-0412`

## ⚠️ STRICT ANTI-LOOP CONSTRAINTS (READ FIRST)
1. **NO ANALYSIS PARALYSIS:** Do not read any external documentation. Do not create risk registers, test matrices, or architecture plans. 
2. **PRESERVE ALL DATA LOGIC:** You MUST KEEP all existing React hooks, `useMemo` variables (e.g., `cycleMetricSnapshot`, `availableBalance`, `soloAvailable`, `fallbackRules`), state, Tooltips, Popovers, and Modals (like Performance Analytics).
3. **NO MATH REWRITE:** Do not rewrite any calculations. Use the exact variables from the legacy code.
4. **NO ABBREVIATIONS:** Do not format numbers with 'M' or 'K'. Use the legacy `formatMoneyVND` or equivalent formatter so numbers look like `35.527.000`.

## 🎨 UI SPECIFICATIONS (TAILWIND CSS)

Rewrite the `return` JSX markup of the target file to perfectly match the attached Mockup image using these rules:

### Global Layout
- **Container:** Wrap the entire content in a standard Card: `bg-white border border-slate-200 rounded-2xl shadow-sm p-6 w-full`. (Stretch to edges, do not use max-w).
- **Sections:** Split into 3 sections horizontally (`xl:flex-row flex-col`). Separate them using `gap-6` or `gap-8` and vertical dashed dividers (`xl:border-l border-dashed border-slate-300 pl-6`).
- **Bottom Alignment Sync (CRITICAL):** The "Category Pill" (Section 1), "Ratio Bar" (Section 2), and "Goal Bar" (Section 3) MUST align perfectly on the same horizontal bottom line. Ensure column wrappers have `flex flex-col h-full` and apply `mt-auto` to these 3 bottom elements.
- **Typography:** Labels (`text-[10px] font-bold uppercase text-slate-500 tracking-wider`), Main Numbers (`text-[18px] font-extrabold`).

### Section 1: Account Info (22% width)
- **Top:** Dynamic Card Logo (fetch from config, do not hardcode Visa) + Account Name + Settings/Database icons (Database icon MUST open in new tab `target="_blank"`).
- **Subtext:** Account number and owner name on a SINGLE line (`whitespace-nowrap overflow-hidden text-ellipsis flex flex-row items-center gap-2`).
- **Badges:** "PARENT" and "CYCLE 26" side-by-side. Ensure hover tooltips from legacy code are attached.
- **Bottom (Category Pill):** Dynamically render the rule name (e.g., `${fallbackRules.length} Rules`) with a Zap icon. Wrap with the legacy Popover to show "PROGRAM STATUS" active rules on hover. Width: `w-[90%]`. Set `mt-auto`.

### Section 2: Balance & Health (30% width)
- **Top:** "Balance" label + "Health" badge + Status badges ("29 Days", "No Wait").
- **Middle (3-column grid):** - AVAILABLE (Use `displayBalance` or `availableBalance`, text: Emerald)
  - SOLO (Use `soloAvailable`, text: Indigo)
  - LIMIT (Use `displayLimit`, text: Slate)
- **Bottom (Ratio Bar):**
  - STRICT PROGRESS BAR STRUCTURE: Relative parent wrapper -> Absolute background fill layer (`bg-indigo-50/80 -z-10` with inline width %) -> Foreground text layer (`z-10` flex justify-between).
  - Set `mt-auto`. Restore any legacy hover Tooltips.

### Section 3: Performance (48% width)
- **Top:** "Performance" label + "CB Perf" badge + "Analytics" ghost button. (Button MUST trigger the legacy INTUITION ENGINE V3 modal `onClick`).
- **Middle (5-column grid):** - Net Profit: `cycleMetricSnapshot.totalProfit` (Emerald)
  - Actual Claimed: `cycleMetricSnapshot.actualClaimed` (Rose)
  - Est. Earned: `cycleMetricSnapshot.estCashback` (Amber)
  - Actual Earn: `cycleMetricSnapshot.actualEarn` (Blue)
  - Shared To Group: `cycleMetricSnapshot.sharedAmount` (Indigo)
- **Bottom (Goal Bar & Date):** - Goal Bar: Same relative/absolute structure as the Ratio bar. MUST include the legacy hover tooltip for "Rule Qualification Logic" (Needs/Spent values like "Target spend not reached"). Set `mt-auto`.
  - Right side: Rounded "Date Range" button.