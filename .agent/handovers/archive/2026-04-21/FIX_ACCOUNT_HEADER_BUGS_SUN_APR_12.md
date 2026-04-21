# Handover: Account Detail Header Polish & Performance Stability (Phase 16)

## 🎯 Context
**Branch**: `fix-account-header-bugs-sun-apr-12`
**Objective**: Finalize the high-fidelity UI refactoring for `AccountDetailHeaderV2` and resolve critical data display bugs related to tiered cashback rules.

---

## ✅ Completed Tasks

### 1. UI Refinement & Interaction
- **Intuition Engine V3.2 Header**: Implemented a minimalist, high-contrast technical header using Indigo/Slate colors.
- **Family Network Popover**: Restored and improved the popover for Parent/Child account members. It now opens in a new tab and avoids collision with the left sidebar navigation.
- **Header Expansion**: Added a global `onClick` handler to the collapsed header, allowing expansion by clicking anywhere on the surface.
- **Ratio & Pace**:
    - Renamed "PACE" to "SPENT" for better clarity.
    - Added a `toast.info` trigger to the RATIO text to explain credit utilization.
- **Performance Labels**: Expanded all abbreviations in the expanded header (e.g., `ACTUAL CLAIMED`, `ESTIMATED EARNED`).

### 2. Cashback Rules Logic
- **Rule Deduplication**: Fixed a bug where multiple rows with the same tier name appeared in the "General" card. Rules are now deduplicated by a composite key (`tier-rate-max`).
- **Category Fallbacks**: Added a specific icon fallback (Briefcase/Shopping bag) for "Shopping" related categories when the standard image is missing.

### 3. Account Edit Slide
- **Field Highlighting**: Added a `highlightAccountInfo` prop to `AccountSlideV2`.
- **Targeted Focus**: The **Account Number** and **Receiver Name** pickers are now highlighted in **Amber (yellow)** when the slide is triggered from the header edit icon.

---

## 🔍 Investigation: "General" Rules Overload
**Issue**: Some accounts (like VPBank Lady) show a large list of rules under the "General" category.
**Reason**: This happens because the `categories` array passed from the server is missing the specific IDs defined in the account's `cb_rules_json` (e.g., IDs for Insurance, Beauty, Medical). When `categories.find` fails, the system fallbacks to "General".
**Fix Status**: Deduplication is implemented to prevent *identical* tiers from repeating, but as long as the categories are unknown, they will stay grouped in "General" but with distinct caps/rates.

---

## ⏭️ Next Steps for Successor Agent
1. **Batch Module Fixes**: Prepare to work on `src/app/batch` and `src/components/batch`. Specifically, review `BatchMasterChecklist.tsx` for complex state management.
2. **Category Data Sync**: Investigate why some cashback-specific category IDs are not present in the main category dictionary.
3. **Credit Card Advance**: (Future Phase) Logic for tracking profit from cash advances.

---

## 📂 Key Files
- `src/components/accounts/v2/AccountDetailHeaderV2.tsx`: Main UI logic.
- `src/components/accounts/v2/AccountSlideV2.tsx`: Editing experience & highlighting.
- `src/lib/cashback.ts`: Underlying calculation logic (Unchanged).
