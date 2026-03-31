import codecs
import re

# 1. Update AccountDetailViewV2.tsx Summary Logic
with codecs.open('src/components/accounts/v2/AccountDetailViewV2.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Fix 1: Ensure targetYear is definitely matching. Use a simpler but robust loop.
# Fix 2: Use effective rate for estimation if base rate is 0

# Let's find the summary useMemo block
# It starts around line 133

new_summary_logic = '''    const summary = useMemo(() => {
        const fallbackYear = availableYears.length > 0 ? parseInt(availableYears[0]) : new Date().getFullYear();
        const targetYearInt = selectedYear ? parseInt(selectedYear) : fallbackYear;

        // Effective Rate Calculation from current cycle
        let effectiveCycleRate = 0;
        if (cashbackStats?.currentSpend && cashbackStats.currentSpend > 0) {
            effectiveCycleRate = (cashbackStats.earnedSoFar || 0) / cashbackStats.currentSpend;
        }
        
        // Fallback to base rate if no cycle data or it's too low
        const baseRate = account.cb_base_rate ? account.cb_base_rate / 100 : 0;
        const estimateRate = Math.max(baseRate, effectiveCycleRate || 0);

        let cardYearlyCashbackTotal = 0;
        let cardYearlyCashbackGivenTotal = 0;
        let yearEligibleSpendForEstimate = 0;
        let debtTotal = 0;
        let expensesTotal = 0;
        let cashbackTotal = 0;
        let yearExpensesTotal = 0;
        let yearPureIncomeTotal = 0;
        let yearPureExpenseTotal = 0;
        let yearLentTotal = 0;
        let yearRepaidTotal = 0;
        let yearTotalInflow = 0;
        let yearTotalOutflow = 0;

        initialTransactions.forEach(tx => {
            const status = String(tx?.status || '').toLowerCase()
            if (status === 'void') return

            // 1. Determine local year for matching
            const rawDate = tx?.occurred_at || tx?.date || tx?.created_at;
            const date = rawDate ? new Date(rawDate) : null;
            if (!date || isNaN(date.getTime())) return;
            
            const txCycleTag = resolveTransactionCycleTag(tx, account);
            const txYearMatch = txCycleTag && /^\\d{4}-\\d{2}$/.test(txCycleTag) 
                ? parseInt(txCycleTag.split('-')[0]) 
                : date.getFullYear();

            const amount = Math.abs(Number(tx?.amount || 0));
            const type = String(tx?.type || '').toLowerCase();
            const note = String(tx?.notes || tx?.note || '').toLowerCase();
            
            if (note.includes('create initial') || note.includes('số dư đầu') || note.includes('opening balance') || note.includes('rollover')) return;

            // Stats for target year
            if (txYearMatch === targetYearInt) {
                const isTargetAccount = tx.target_account_id === account.id || tx.to_account_id === account.id;
                const isSourceAccount = tx.account_id === account.id || tx.source_account_id === account.id;

                const isIncoming = (type === 'income') || (type === 'repayment') || (type === 'transfer' && isTargetAccount);
                const isOutgoing = (type === 'expense') || (type === 'service') || (type === 'debt') || (type === 'invest') || (type === 'transfer' && isSourceAccount);

                if (type === 'income') {
                    yearPureIncomeTotal += amount;
                    const catName = (tx?.category_name || "").toLowerCase();
                    if (catName.includes('cashback') || catName.includes('hoàn tiền')) {
                        cashbackTotal += amount;
                    }
                }
                
                if (isOutgoing) {
                    yearPureExpenseTotal += amount;
                    yearEligibleSpendForEstimate += amount;
                    
                    // Shared/Given Cashback
                    const sharedAmt = Number(tx?.cashback_share_amount || 0);
                    if (sharedAmt > 0) {
                        cardYearlyCashbackGivenTotal += sharedAmt;
                    } else {
                        const catName = (tx?.category_name || "").toLowerCase();
                        if (catName.includes('shared') || catName.includes('chia sẻ cashback')) {
                            cardYearlyCashbackGivenTotal += amount;
                        }
                    }
                }

                if (type === 'repayment') yearRepaidTotal += amount;
                if (type === 'debt') yearLentTotal += amount;
                if (isIncoming) yearTotalInflow += amount;
                if (isOutgoing) yearTotalOutflow += amount;
            }
        });

        // Final Estimation calculation
        if (account.type === 'credit_card') {
            const estimatedPotential = yearEligibleSpendForEstimate * estimateRate;
            const maxBudget = account.cb_max_budget || null;
            cardYearlyCashbackTotal = (maxBudget !== null && maxBudget > 0) 
                ? Math.min(estimatedPotential, maxBudget) 
                : estimatedPotential;
        }

        const netProfitYearly = cardYearlyCashbackTotal - cardYearlyCashbackGivenTotal;

        return {
            netProfitYearly,
            cashbackTotal,
            cardYearlyCashbackTotal,
            cardYearlyCashbackGivenTotal,
            yearPureIncomeTotal,
            yearPureExpenseTotal,
            yearTotalInflow,
            yearTotalOutflow,
            yearLentTotal,
            yearRepaidTotal,
            yearEligibleSpendForEstimate,
        };
    }, [initialTransactions, account, selectedYear, availableYears, cashbackStats]);'''

# Replace from line 133 to 261 approx
# I'll use a regex to find the start of useMemo and the return block
start_marker = re.search(r'const summary = useMemo\(\(\) => \{', content)
if start_marker:
    # Find the end of the useMemo return block
    # It ends with }, [initialTransactions, account, selectedYear, availableYears]);
    # But now I need to add cashbackStats to the dependency array.
    end_pattern = r'\}, \[initialTransactions, account, selectedYear, availableYears\]\);'
    end_marker = re.search(end_pattern, content)
    if end_marker:
        content = content[:start_marker.start()] + new_summary_logic + content[end_marker.end():]

with codecs.open('src/components/accounts/v2/AccountDetailViewV2.tsx', 'w', 'utf-8') as f:
    f.write(content)

print(\'Success! Fixed yearly performance logic to use effective cycle rate.\')
