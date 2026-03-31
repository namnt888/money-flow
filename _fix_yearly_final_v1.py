import codecs

# 1. Update AccountDetailViewV2.tsx Summary Logic
with codecs.open('src/components/accounts/v2/AccountDetailViewV2.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Fix the Summary Logic: Use effective cycle rate from cashbackStats
new_summary_logic = '''    const summary = useMemo(() => {
        const fallbackYear = availableYears.length > 0 ? parseInt(availableYears[0]) : new Date().getFullYear();
        const targetYearInt = selectedYear ? parseInt(selectedYear) : fallbackYear;

        // Effective Rate Calculation from current cycle (Backend rules)
        let effectiveCycleRate = 0;
        if (cashbackStats?.currentSpend && cashbackStats.currentSpend > 0) {
            effectiveCycleRate = (cashbackStats.earnedSoFar || 0) / cashbackStats.currentSpend;
        }
        
        // Use base rate as minimum fallback
        const baseRate = account.cb_base_rate ? account.cb_base_rate / 100 : 0;
        const estimateRate = effectiveCycleRate > 0 ? effectiveCycleRate : baseRate;

        let cardYearlyCashbackTotal = 0;
        let cardYearlyCashbackGivenTotal = 0;
        let yearEligibleSpendForEstimate = 0;
        let cashbackTotal = 0;
        let yearPureIncomeTotal = 0;
        let yearPureExpenseTotal = 0;
        let yearTotalInflow = 0;
        let yearTotalOutflow = 0;
        let yearDebtTotal = 0;
        let yearLentTotal = 0;
        let yearRepaidTotal = 0;

        initialTransactions.forEach(tx => {
            const status = String(tx?.status || '').toLowerCase()
            if (status === 'void') return

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
                
                if (type === 'debt') yearDebtTotal += amount;
            }
        });

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
            yearDebtTotal,
            pendingCount: pendingItems.length + pendingRefundCount
        };
    }, [initialTransactions, categories, selectedYear, pendingItems.length, pendingRefundCount, selectedCycle, availableYears, cashbackStats]);'''

# Find boundaries and replace
old_start = '''    const summary = useMemo(() => {
        const fallbackYear = availableYears.length > 0 ? parseInt(availableYears[0]) : new Date().getFullYear();'''

old_end = '''    }, [initialTransactions, categories, selectedYear, pendingItems.length, pendingRefundCount, selectedCycle, availableYears])'''

if old_start in content and old_end in content:
    start_idx = content.find(old_start)
    end_idx = content.find(old_end) + len(old_end)
    content = content[:start_idx] + new_summary_logic + content[end_idx:]

with codecs.open('src/components/accounts/v2/AccountDetailViewV2.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Success! Unified summary logic updated with effective cycle rate fallback.")
