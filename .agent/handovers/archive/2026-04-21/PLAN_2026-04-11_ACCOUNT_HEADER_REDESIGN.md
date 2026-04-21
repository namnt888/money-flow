# PLAN - ACCOUNT HEADER DETAILS UI REDESIGN (SPRINT NEXT)

## Objective
- Lam moi toan bo UI header trang account details.
- Tach rieng code redesign de KHONG de len logic cu.
- Bao toan toan bo logic nghiep vu da on dinh (cashback, cycle, rewards popover, pending, collapse).

## Hard Constraints
- Khong chinh sua truc tiep logic tinh toan trong file hien tai neu chua co test bao phu.
- Tao layer UI moi, co feature flag de rollback nhanh.
- Giu route hien tai va props contract de tranh pha vo account detail page.

## Current Source Of Truth (must read first)
1. src/components/accounts/v2/AccountDetailHeaderV2.tsx
2. src/components/accounts/v2/AccountDetailViewV2.tsx
3. src/services/cashback/policy-resolver.ts
4. src/services/account.service.ts
5. docs/handovers/SPRINT_PLAN_2026-04-07_CHATBOT_CALENDAR_HANDOVER.md (de hieu context tong)
6. .agent/HANDOVER_CHATBOT_V2.md (tham khao logic chat + account data)

## Implementation Strategy (safe split)
1. Tao component moi: src/components/accounts/v2/header-redesign/AccountDetailHeaderRedesign.tsx
2. Tach subcomponents moi:
   - HeaderIdentityBlock.tsx
   - HeaderBalanceBlock.tsx
   - HeaderCashbackBlock.tsx
   - HeaderRewardsPopover.tsx
   - HeaderCollapseToggle.tsx
3. Tao adapter map data tu props cu sang view-model moi:
   - src/components/accounts/v2/header-redesign/useAccountHeaderViewModel.ts
4. Giu nguyen logic cu, chi move rendering + style sang component moi.
5. Add feature flag:
   - env: NEXT_PUBLIC_ACCOUNT_HEADER_REDESIGN=1
   - neu off -> render AccountDetailHeaderV2 (legacy)
   - neu on -> render AccountDetailHeaderRedesign

## Verification Checklist
- Collapse/expand: dung state va dung layout o ca desktop + mobile.
- Rewards badge: format rate-first, no ghost +N, no fake tiers on simple card.
- Popover: tab chuyen tier dung va khong auto-close sai.
- Due/Cycle/Pending chips: du lieu va format dung.
- No regression voi account simple vs tiered cashback config.

## Test Plan
- Unit:
  - view-model mapping for simple card config.
  - view-model mapping for tiered card config.
- Manual smoke:
  - Vpbank Lady #Mom
  - Msb Online #Mom
- Build gates:
  - pnpm lint
  - pnpm test
  - pnpm build

## Delivery Milestones
- M1: Skeleton + feature flag + legacy fallback.
- M2: Visual redesign complete (identity/balance/cashback sections).
- M3: Rewards popover + tabs + compact mode parity.
- M4: QA fix + docs update + merge-ready PR.

## Rollback
- Tat NEXT_PUBLIC_ACCOUNT_HEADER_REDESIGN la quay ve legacy ngay.
- Khong xoa code cu cho toi khi redesign da qua 1 sprint stable.
