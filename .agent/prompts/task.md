# CRITICAL TASK: FIX REWARDS SYNC & CYCLE FILTERING (PHASE 15/16)

## 🎯 OBJECTIVE
Đồng bộ hóa dữ liệu Rewards và Summary giữa "Account Details" (Source of Truth) và "People Detail View". Xử lý lỗi fetch Cycle khi chọn Account.

## 🟥 SOURCE OF TRUTH (IMG1 - Account Details)
Khi Cycle "25.02 - 24.03" được chọn:
- My Profit: 219.741
- Earned: 366.235
- Shared: 146.494
- Actual: 0
- Status: 100% Qualified / Earned

## 🐞 BUGS TO FIX (IMG2 & PEOPLE DETAIL)

### 1. Xử lý Messaging & Pipeline (Gốc rễ của Cashback = 0)
- Lỗi: 'Failed to initialize messaging: tx_attempts_exceeded' / 'tx_ack_timeout'.
- Hiện tượng: Data không fetch được dẫn đến hiển thị mặc định = 0.
- Yêu cầu: Kiểm tra bridge giữa Chrome Extension và Next.js 16 (Turbopack). Nếu Messaging timeout, phải FALLBACK gọi trực tiếp API/Service (PocketBase).

### 2. Logic Cycle & Date Picker (UnifiedSmartDatePicker.tsx)
- Khi chọn Account (mMsb Online #Mom):
    - Research tại sao Cycle dropdown bị Blank.
    - Ép tự động chuyển sang tab "Cycle" (nếu account có cycle).
    - Tự động pick "Current Cycle" dựa trên Today (18.03.2026) -> Phải chọn được cycle '25.02 - 24.03'.
    - Khi lọc theo Account, `UnifiedSmartDatePicker` phải trigger fetch cycles của đúng `account_id` đó.

### 3. Summary Card & Rewards Refactor (MemberDetailView.tsx)
- REMOVE: Card "Net Lend" (Thừa, trùng với Remains).
- FIX: "Cashback" đang hiển thị 0 là sai. Phải lấy từ `earnedSoFar` của Account snapshot.
- RECALC: `Remains = Original Spend - Correct Cashback`.
- REWARDS SECTION: 
    - Tuyệt đối KHÔNG lấy data theo từng dòng transaction lẻ của People (+-66,762).
    - PHẢI FORCE lấy data Global của Account: My Profit (219.741), Earned (366.235), Shared (146.494).
    - UI: Label "My Profit" phải nằm TRÊN giá trị (Top aligned).

### 4. Logic 10x Shared & Double Counting (account-details.service.ts)
- Kiểm tra `cashback_share_percent`: Đảm bảo không bị chia 100 hai lần (xem bug #1 trong handover).
- Kiểm tra `getPocketBaseAccountSpendingStatsSnapshot`: Tại sao `Original Spend` bị nhân đôi (~3.6M) khi filter theo account? Kiểm tra xem có bị fetch trùng transaction do overlap filter không.