## Error Type
Console Error

## Error Message
Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.


    at UnifiedTransactionTable.useEffect (src/components/moneyflow/unified-transaction-table.tsx:550:47)
    at AccountDetailTransactions (src/components/accounts/v2/AccountDetailTransactions.tsx:879:17)
    at AccountDetailViewV2 (src/components/accounts/v2/AccountDetailViewV2.tsx:517:21)
    at AccountPage (src\app\accounts\[id]\page.tsx:197:9)

## Code Frame
  548 |       try {
  549 |     
> 550 |       const transactionProfitBalance = useMemo(() => {
      |                                               ^
  551 |         const map = new Map<string, number>();
  552 |         const grouped = new Map<string, TransactionWithDetails[]>();
  553 |

Next.js version: 16.0.10 (Turbopack)
## Error Type
Console ReferenceError

## Error Message
transactionProfitBalance is not defined


    at renderCell (src/components/moneyflow/unified-transaction-table.tsx:3123:31)
    at <unknown> (src/components/moneyflow/unified-transaction-table.tsx:5201:34)
    at Array.map (<anonymous>:null:null)
    at <unknown> (src/components/moneyflow/unified-transaction-table.tsx:5164:45)
    at Array.map (<anonymous>:null:null)
    at <unknown> (src/components/moneyflow/unified-transaction-table.tsx:2698:43)
    at RootLayout (src\app\layout.tsx:59:17)

## Code Frame
  3121 |
  3122 |                             const runningProfit =
> 3123 |                               transactionProfitBalance.get(txn.id) ?? 0;
       |                               ^
  3124 |
  3125 |                             if (runningProfit === 0)
  3126 |                               return <span className="text-slate-300">-</span>;

Next.js version: 16.0.10 (Turbopack)
