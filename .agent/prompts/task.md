### ROLE: SENIOR FULLSTACK ENGINEER (NEXT.JS 16 / TURBOPACK)

### TASK: CRITICAL DATA SYNC & UI REFACTOR
The current implementation is hallucinating data. You must strictly follow these logic rules to fix the "People Detail" page based on the "Account" source of truth.

1. FIX MESSAGING ERRORS: 
- Resolve 'tx_ack_timeout' and 'tx_attempts_exceeded'.
- Ensure the data bridge between the Chrome extension (ID: iohjgamcilhbgmhbnllfolmkmmekfmci) and the app is stable. If messaging fails, fallback to direct API/State fetching.

2. SUMMARY CARD CLEANUP:
- DELETE "Net Lend" card. It is redundant as it mirrors "Remains".
- FIX "Cashback": Currently defaulting to 0 (Incorrect). It must fetch the total cashback for the selected Account Cycle (e.g., 25.02 - 24.03).
- RE-CALCULATE "Remains": Remains = Original Spend - Correct Cashback.

3. REWARD SECTION REFACTOR (GLOBAL VS LOCAL):
- STOP using local person transaction values (+-66,762) for the Reward Widget.
- SOURCE OF TRUTH: If an Account filter is active, the Reward section MUST display Global Account Data:
    - Status: 100% Earned / Qualified
    - My Profit: 219.741 (Ensure label is ABOVE the value)
    - Earned: 366.235
    - Shared: 146.494
    - Actual: 0

4. CYCLE DROPDOWN LOGIC:
- Fix the blank Cycle dropdown. When an Account is selected, fetch its specific cycles.
- Default to the "Current Cycle" based on today's date (18.03.2026).

### REQUIREMENT: 
Check your math. If "Earned" is 366k and "Shared" is 146k, "My Profit" must be the result of their difference. Do not display -1,331k or "Need for Reward" when the account is already Qualified.