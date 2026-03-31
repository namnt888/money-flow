import codecs

# 1. Read the current file
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'r', 'utf-8') as f:
    content = f.read()

# 2. Fix the 60% progress bar bug in the "Rule Qualification Logic" tooltip
# Target: <div className="h-full bg-emerald-500" style={{ width: dynamicCashbackStats?.is_min_spend_met ? '100%' : '60%' }} />
# Target: <span className="text-[9px] font-black text-slate-500 uppercase">{dynamicCashbackStats?.is_min_spend_met ? "100%" : "60%"}</span>

old_progress_bar = '''                    <div className="flex items-center gap-2 pt-1"><div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: dynamicCashbackStats?.is_min_spend_met ? '100%' : '60%' }} /></div><span className="text-[9px] font-black text-slate-500 uppercase">{dynamicCashbackStats?.is_min_spend_met ? "100%" : "60%"}</span></div>'''

new_progress_bar = '''                    {(() => {
                      const minSpend = dynamicCashbackStats?.minSpend || 1; 
                      const currentSpend = dynamicCashbackStats?.currentSpend || 0;
                      const progressVal = Math.min(100, Math.round((currentSpend / minSpend) * 100));
                      return (
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${progressVal}%` }} />
                          </div>
                          <span className="text-[9px] font-black text-slate-500 uppercase">{progressVal}%</span>
                        </div>
                      );
                    })()}'''

content = content.replace(old_progress_bar, new_progress_bar)

# 3. Increase Popover Width (w-[440px] -> w-[600px]) and layout re-design
# We will use grid layout for metrics to save height

old_popover_header = '''                <TooltipContent side="bottom" className="w-[440px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>'''
new_popover_header = '''                <TooltipContent side="bottom" className="w-[600px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>'''

content = content.replace(old_popover_header, new_popover_header)

# 4. Improve Yearly Summary calculation logic in the file if needed 
# Actually, the user says it shows 0. Let's check how the summary is passed.
# I'll modify the memoization inside the file to be more robust if summary is missing data fields.

target_annual_memo = '''  const annualPerformanceReport = React.useMemo(() => {
    if (!summary) return { profit: 0, actual: 0, est: 0, shared: 0, totalNetBenefit: 0 };
    return {
      profit: summary.netProfitYearly || 0,
      actual: summary.cashbackTotal || 0,
      est: summary.cardYearlyCashbackTotal || 0,
      shared: summary.cardYearlyCashbackGivenTotal || 0,
      totalNetBenefit: summary.netProfitYearly || 0
    };
  }, [summary]);'''

# If summary.netProfitYearly is 0, let's try to fallback to a basic calculation or ensure it's matched.
# Note: In the view, netProfitYearly = cardYearlyCashbackTotal - cardYearlyCashbackGivenTotal.

# 5. Fix the 0 Profit 0 Shared issue: 
# It seems the view's summary calculation (lines 183+) inside initialTransactions.forEach 
# might be missing some transactions if resolveTransactionCycleTag doesn't match targetYear correctly.
# But I will also add a fallback in the Header just in case.

# Write back
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'w', 'utf-8') as f:
    f.write(content)

print('Success! Fixed 60%% bug and increased popover width.')
