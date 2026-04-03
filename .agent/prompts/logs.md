## Error Type
Console TypeError

## Error Message
Cannot read properties of undefined (reading 'cb_rules_json')


    at resolveCashbackPolicy (src/services/cashback/policy-resolver.ts:43:31)
    at UnifiedTransactionTable.useCallback[resolveCashbackFields] (src/components/moneyflow/unified-transaction-table.tsx:702:51)
    at renderCell (src/components/moneyflow/unified-transaction-table.tsx:4444:31)
    at <unknown> (src/components/moneyflow/unified-transaction-table.tsx:4911:34)
    at Array.map (<anonymous>:null:null)
    at <unknown> (src/components/moneyflow/unified-transaction-table.tsx:4874:45)
    at Array.map (<anonymous>:null:null)
    at <unknown> (src/components/moneyflow/unified-transaction-table.tsx:2393:43)
    at AccountDetailTransactions (src/components/accounts/v2/AccountDetailTransactions.tsx:879:17)
    at AccountDetailViewV2 (src/components/accounts/v2/AccountDetailViewV2.tsx:517:21)
    at AccountPage (src\app\accounts\[id]\page.tsx:197:9)

## Code Frame
  41 |     let effectiveCategorySlug = categorySlug
  42 |
> 43 |     const rulesJson = account.cb_rules_json
     |                               ^
  44 |     if (rulesJson && typeof rulesJson === 'object' && !Array.isArray(rulesJson) && rulesJson.aliases) {
  45 |         const aliases = rulesJson.aliases as Record<string, string>
  46 |         if (categoryId && aliases[categoryId]) {

Next.js version: 16.0.10 (Turbopack)
