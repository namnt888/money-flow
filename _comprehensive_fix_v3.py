import codecs

# -----------------------------------------------------------------------------
# FIX 1: UnifiedSmartDatePicker.tsx (IMG4)
# - Remove Debt History / Configs buttons if not debt context
# - Label the last column as "PROFIT"
# -----------------------------------------------------------------------------
with codecs.open('src/components/transactions-v2/header/UnifiedSmartDatePicker.tsx', 'r', 'utf-8') as f:
    dp_content = f.read()

old_tab_header = '''        <div className="px-6 pt-5 pb-6 bg-slate-50/50 border-b border-slate-200/60 rounded-t-2xl">
          <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
            <button
              onClick={() => setDebtTab(\'history\')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                debtTab === \'history\' 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
              )}
            >
              <History className="h-3.5 w-3.5" /> Debt History
            </button>
            <button
              onClick={() => setDebtTab(\'configs\')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                debtTab === \'configs\' 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
              )}
            >
              <Settings className="h-3.5 w-3.5" /> Configurations
            </button>
          </div>
        </div>'''

new_tab_header = '''        {statType === \'debt\' && (
          <div className="px-6 pt-5 pb-6 bg-slate-50/50 border-b border-slate-200/60 rounded-t-2xl">
            <div className="flex bg-slate-200/50 p-1 rounded-xl w-fit">
              <button
                onClick={() => setDebtTab(\'history\')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  debtTab === \'history\' 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                )}
              >
                <History className="h-3.5 w-3.5" /> Debt History
              </button>
              <button
                onClick={() => setDebtTab(\'configs\')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  debtTab === \'configs\' 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                )}
              >
                <Settings className="h-3.5 w-3.5" /> Configurations
              </button>
            </div>
          </div>
        )}'''

dp_content = dp_content.replace(old_tab_header, new_tab_header)

old_profit_col = '''                                  {/* Profit */}
                                  <div className="h-full flex items-center justify-center px-2">
                                    <div className={cn(
                                       "flex flex-col items-center justify-center py-1 px-2 rounded border shrink-0 w-full",
                                       isSelected ? "bg-indigo-600 text-white border-indigo-700 shadow-sm" : "bg-indigo-50/50 border-indigo-100"
                                    )}>'''

new_profit_col = '''                                  {/* Profit */}
                                  <div className="h-full flex items-center justify-center px-2">
                                    <div className={cn(
                                       "flex flex-col items-center justify-center py-1 px-2 rounded border shrink-0 w-full",
                                       isSelected ? "bg-indigo-600 text-white border-indigo-700 shadow-sm" : "bg-indigo-50/50 border-indigo-100"
                                    )}>
                                      <span className={cn("text-[8px] font-black uppercase tracking-tighter mb-0.5", isSelected ? "text-indigo-200" : "text-slate-400")}>Profit</span>'''

dp_content = dp_content.replace(old_profit_col, new_profit_col)

with codecs.open('src/components/transactions-v2/header/UnifiedSmartDatePicker.tsx', 'w', 'utf-8') as f:
    f.write(dp_content)


# -----------------------------------------------------------------------------
# FIX 2: AccountDetailViewV2.tsx (IMG2 - Year Stats Zero Issue)
# - Robust year matching and stats calculation
# -----------------------------------------------------------------------------
with codecs.open('src/components/accounts/v2/AccountDetailViewV2.tsx', 'r', 'utf-8') as f:
    v2_content = f.read()

old_available_years = '''    const availableYears = React.useMemo(() => {
        const years = new Set<string>()
        initialTransactions.forEach(txn => {
            const tag = resolveTransactionCycleTag(txn, account)
            if (tag && /^\\d{4}-\\d{2}$/.test(tag)) {
                years.add(tag.split(\'-\')[0])
            }
        })
        const currentYear = new Date().getFullYear().toString()
        years.add(currentYear)
        return Array.from(years).sort().reverse()
    }, [initialTransactions, account])'''

new_available_years = '''    const availableYears = React.useMemo(() => {
        const years = new Set<string>()
        initialTransactions.forEach(txn => {
            // First check tag from transaction directly if exists
            const txTag = txn.tag || txn.cycle_tag;
            if (txTag && /^\\d{4}-\\d{2}$/.test(txTag)) {
                years.add(txTag.split(\'-\')[0])
                return;
            }
            
            // Fallback to date
            const rawDate = txn?.occurred_at || txn?.date || txn?.created_at;
            const date = rawDate ? new Date(rawDate) : null;
            if (date && !isNaN(date.getTime())) {
                years.add(date.getFullYear().toString())
            }
        })
        const currentYear = new Date().getFullYear().toString()
        years.add(currentYear)
        return Array.from(years).sort().reverse()
    }, [initialTransactions])'''

v2_content = v2_content.replace(old_available_years, new_available_years)

with codecs.open('src/components/accounts/v2/AccountDetailViewV2.tsx', 'w', 'utf-8') as f:
    f.write(v2_content)


# -----------------------------------------------------------------------------
# FIX 3: AccountDetailHeaderV2.tsx (IMG3 - Report Design & Width)
# - Re-layout the report for higher density and less vertical height
# -----------------------------------------------------------------------------
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'r', 'utf-8') as f:
    h2_content = f.read()

old_report_metrics = '''                    <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar scroll-smooth">
                      {/* Metric Table Restore - Master Visual */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Statistics</span><span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">{dynamicCashbackStats?.cycle?.label || "CYCLE DATA"}</span></div>
                        <div className="bg-slate-50/50 rounded-2xl p-2 border border-slate-100 shadow-inner">
                          <div className="divide-y divide-slate-100/50">
                            {[
                              { label: "Interval", val: dynamicCashbackStats?.cycle?.label || "?", sub: "Billing period range", color: "text-slate-900", icon: Calendar },
                              { label: "Eligible Spend", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}`, sub: "Counted toward cashback", color: "text-indigo-600", icon: BarChart3 },
                              { label: "Cashback Earned", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}`, sub: "Estimated rewards earned", color: "text-emerald-600", icon: Zap },
                              { label: "Shared Out", val: `-${formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}`, sub: "Sent to group members", color: "text-rose-500", icon: Users2 },
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center py-3.5 px-3 group hover:bg-white hover:rounded-xl hover:shadow-sm transition-all duration-300">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-50"><item.icon className="h-4 w-4 text-slate-400" /></div>
                                  <div className="flex flex-col"><span className="text-[12px] font-black text-slate-800 uppercase tracking-tight leading-none mb-0.5">{item.label}</span><span className="text-[10px] font-medium text-slate-400 italic leading-none">{item.sub}</span></div>
                                </div>
                                <span className={cn("text-[15px] font-black tabular-nums tracking-tight", item.color)}>{item.val}</span>
                              </div>
                            ))}
                            <div className="flex justify-between items-center py-4 px-4 bg-emerald-600 rounded-xl mt-2 shadow-lg shadow-emerald-600/20">
                              <div className="flex flex-col"><span className="text-[11px] font-black text-emerald-100 uppercase tracking-[0.2em] leading-none mb-1">NET CYCLE PROFIT</span><span className="text-[10px] text-emerald-200/80 italic leading-none font-medium">Post-split profitability</span></div>
                              <span className="text-[20px] font-black text-white tabular-nums tracking-tighter drop-shadow-md">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</span>
                            </div>
                          </div>
                        </div>
                      </div>'''

new_report_metrics = '''                    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth">
                      {/* Metric Grid - High Density 2 Cols */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Statistics Pipeline</span><span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">{dynamicCashbackStats?.cycle?.label || "CYCLE DATA"}</span></div>
                        <div className="grid grid-cols-2 gap-3 pb-2">
                           {[
                              { label: "Eligible Spend", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}`, sub: "Rule matching spend", color: "text-indigo-600", icon: BarChart3 },
                              { label: "Cashback Earned", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}`, sub: "Estimated rewards", color: "text-emerald-600", icon: Zap },
                              { label: "Shared Out", val: `-${formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}`, sub: "Sent to members", color: "text-rose-500", icon: Users2 },
                              { label: "Net Profit", val: `${formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}`, sub: "Cycle profitability", color: "text-slate-900", icon: Briefcase },
                            ].map((item, i) => (
                              <div key={i} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:bg-white transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-lg border border-slate-100"><item.icon className="h-3.5 w-3.5 text-slate-400" /></div>
                                  <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">{item.label}</span><span className={cn("text-[16px] font-black tabular-nums tracking-tighter", item.color)}>{item.val}</span></div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>'''

h2_content = h2_content.replace(old_report_metrics, new_report_metrics)

with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'w', 'utf-8') as f:
    f.write(h2_content)

print("Success! Applied all refinements for Header, View, and DatePicker.")
