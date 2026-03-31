import codecs

# 1. Read fresh restored file (the one we just built in V4)
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'r', 'utf-8') as f:
    lines = f.readlines()

# We'll use the same Prefix Segments logic if it was clean, 
# but let's just do a multi_replace for accuracy on the specific UI parts.

# 2. Extract specific blocks we need to change

# POP-OVER CONTENT FOR REWARDS (Rule loop fix)
target_reward_mapping = '''                    const displayRules = rules.length > 0 ? rules : (program.levels?.[0]?.rules || []).map((r: any) => ({ name: r.description || "Rules", rate: r.rate, max: r.maxReward }));'''
replacement_reward_mapping = '''                    const displayRules = rules.length > 0 ? rules : (program.levels || []).flatMap(l => l.rules || []).map((r: any) => ({ name: r.description || "Rules", rate: r.rate, max: r.maxReward }));'''

# QUALIFY PILL AND CYCLE BADGE
target_bottom_row = '''          <div className="flex items-center gap-2.5 h-10 w-full border-t border-slate-100/40 pt-1.5 px-2">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95 group">
                    <BarChart3 className="h-4 w-4 group-hover:rotate-12 transition-transform" />ANALYTICS REPORT
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-[440px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>
                  <div className="bg-white">
                    {/* Header Image Restore Logic Block from Fresh Restore */}
                    <div className="bg-emerald-950 px-6 py-4 flex justify-between items-center text-white relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-transparent pointer-events-none" />
                      <div className="flex flex-col relative z-10"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 leading-none mb-1.5">INTUITION ENGINE V3</span><h3 className="font-black text-[16px] uppercase tracking-[0.1em] text-white flex items-center gap-3">PERFORMANCE ANALYTICS <div className="h-px w-8 bg-emerald-500" /></h3></div>
                      <div className="relative z-10 p-2 bg-emerald-900/40 rounded-full border border-emerald-800/50"><Zap className="h-6 w-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" /></div>
                    </div>
                    
                    <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar scroll-smooth">
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
                      </div>

                      {/* Rule Breakdown Restore - Master Striped */}
                      {dynamicCashbackStats?.activeRules && dynamicCashbackStats.activeRules.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center"><h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1.5 h-4 bg-indigo-500 rounded-sm" />RULE PERFORMANCE BREAKDOWN</h4><div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100"><span className="text-[9px] font-black text-indigo-700 uppercase">{dynamicCashbackStats.currentTierName} TIER OPTIMIZED</span></div></div>
                          <div className="grid gap-4">
                            {dynamicCashbackStats.activeRules.map((rule: any, idx: number) => {
                              const ruleProgress = rule.max ? Math.min(100, (rule.earned / rule.max) * 100) : 100;
                              return (
                                <div key={idx} className="bg-slate-50/50 hover:bg-white rounded-[1.5rem] p-5 border border-slate-100 transition-all duration-300 hover:shadow-xl group/rule relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600/5 rounded-bl-[4rem] group-hover/rule:bg-indigo-600/10 transition-colors" />
                                  <div className="flex justify-between items-start mb-4">
                                     <div className="flex flex-col gap-1">
                                       <div className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600" /></div><span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{rule.name}</span></div>
                                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md w-fit">{formatMoneyVND(rule.spent)} ELIGIBLE SPENT</span>
                                     </div>
                                     <div className="flex flex-col items-end"><span className="text-[22px] font-black text-emerald-600 tabular-nums leading-none drop-shadow-sm">{rule.rate}%</span><span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] leading-none mt-1">REWARD MULTIPLIER</span></div>
                                  </div>
                                  <div className="space-y-2.5 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                                    <div className="flex justify-between items-baseline mb-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rewards Accumulation</span><div className="text-[16px] font-black text-slate-900 tabular-nums">{formatMoneyVND(rule.earned)}<span className="text-slate-300 ml-1.5 font-bold uppercase tracking-widest text-[10px]">/ {rule.max ? formatVNShort(rule.max) : "∞"}</span></div></div>
                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] p-0.5"><div className={cn("h-full transition-all duration-1500 ease-in-out rounded-full shadow-sm relative group/bar progress-glow", ruleProgress >= 100 ? "bg-gradient-to-r from-emerald-600 to-emerald-400" : "bg-gradient-to-r from-indigo-700 to-indigo-500")} style={{ width: `${ruleProgress}%` }}><div className="absolute inset-0 bg-white/20 animate-pulse" /></div></div>
                                    <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-[0.25em] pt-1"><span>REWARD PROGRESS</span><span>{ruleProgress >= 100 ? "BENEFIT OPTIMIZED" : `${Math.round(ruleProgress)}% UTILIZED`}</span></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Yearly Detailed Restore - Master Footprint */}
                      <div className="mt-4 pt-8 border-t-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-slate-100/50 -mx-6 px-8 pb-8 rounded-b-[2rem]">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20"><Calendar className="h-5 w-5 text-white" /></div><div className="flex flex-col"><span className="text-[10px] font-black text-indigo-700/60 uppercase tracking-[0.4em] leading-none mb-1">ANNUAL TRACKER</span><h3 className="font-black text-[15px] text-slate-800 uppercase tracking-widest">Yearly Performance {selectedYear || currentYear}</h3></div></div>
                            <div className="px-4 py-2 bg-white border border-indigo-100 text-indigo-700 text-[10px] font-black rounded-xl uppercase shadow-md flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> ENGINE CALCULATED REPORT</div>
                          </div>
                          <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="space-y-6">
                              <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-emerald-500/30" /> TOTAL YEAR PROFIT</span><span className={cn("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", annualPerformanceReport.profit >= 0 ? "text-emerald-700" : "text-rose-700")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.profit))}</span></div>
                              <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-indigo-500/30" /> ACTUAL PAID BACK</span><span className="text-2xl font-black text-indigo-700 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.actual))}</span></div>
                            </div>
                            <div className="space-y-6 text-right">
                              <div className="flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">EST. POTENTIAL REWARDS <div className="w-1 h-3 bg-emerald-500/30" /></span><span className="text-2xl font-black text-emerald-600 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.est))}</span></div>
                              <div className="flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">SHARED WITH OTHERS <div className="w-1 h-3 bg-rose-500/30" /></span><span className="text-2xl font-black text-rose-500 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.shared))}</span></div>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-[2rem] border border-slate-200/80 shadow-2xl relative overflow-hidden group/benefit animate-in slide-in-from-bottom duration-1000">
                             <div className="absolute top-0 left-0 w-3 h-full bg-emerald-600 group-hover/benefit:w-full group-hover/benefit:opacity-5 transition-all duration-700" />
                             <div className="flex justify-between items-center relative z-10">
                               <div className="flex flex-col"><span className="text-[13px] font-black text-slate-600 uppercase tracking-[0.3em] leading-none mb-1.5">NET ANNUAL BENEFIT</span><span className="text-[11px] font-medium text-slate-400 italic tracking-wide">Real financial impact accrued across all metrics</span></div>
                               <div className={cn("text-3xl font-black tabular-nums tracking-tighter transition-all group-hover/benefit:scale-110", annualPerformanceReport.totalNetBenefit >= 0 ? "text-emerald-700 drop-shadow-[0_2px_10px_rgba(5,150,105,0.2)]" : "text-rose-700")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.totalNetBenefit))}</div>
                             </div>
                          </div>
                      </div>
                    </div>
                    <div className="bg-slate-900 px-8 py-4 flex justify-between items-center text-white text-[11px] font-black uppercase tracking-[0.4em] opacity-100 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-glow" />
                        <span className="text-emerald-400">ENGINE CASHBACK V3.2 STATUS: ACTIVE</span>
                      </div>
                      <span className="text-slate-500 font-bold opacity-60">SNAPSHOT: {format(new Date(), "HH:mm:ss MMM d, yyyy").toUpperCase()}</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className={cn("flex items-center gap-2.5 px-4 py-2.5 rounded-xl h-full border transition-all cursor-help hover:shadow-md active:scale-95 transform shadow-sm relative group overflow-hidden", (dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"))}>
                    <div className={cn("absolute inset-y-0 left-0 w-1 transition-all group-hover:w-2", (dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-600" : "bg-amber-600"))} />
                    <Zap className={cn("h-4.5 w-4.5 fill-current transition-transform group-hover:scale-110", (dynamicCashbackStats?.is_min_spend_met ? "text-emerald-600" : "text-amber-600"))} />
                    <span className="text-[11px] font-black uppercase tracking-[0.15em] ml-0.5">{(dynamicCashbackStats?.is_min_spend_met ? "QUALIFIED • EARNING" : "PROGRESS • INCOMPLETE")}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-950 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 rounded-[1.5rem] text-white w-[340px] z-[120]" sideOffset={15}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3"><div className={cn("w-2.5 h-2.5 rounded-full", dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]")} /><h4 className="font-black text-[12px] uppercase tracking-[0.2em] text-white">Rule Qualification Logic</h4></div>
                    <p className="text-[13px] font-medium leading-relaxed italic text-slate-400">
                      {dynamicCashbackStats?.is_min_spend_met ? "✅ TARGET ACHIEVED: Minimum spending requirement has been successfully met for this cycle. All rule multipliers are currently active and accruing rewards." : `⚠️ ACTION REQUIRED: Target spend not reached. Chi tiêu thêm ${formatMoneyVND(Math.ceil((dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))} để mở khóa toàn bộ quyền lợi hoàn tiền.`}
                    </p>
                    <div className="flex items-center gap-2 pt-1"><div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: dynamicCashbackStats?.is_min_spend_met ? '100%' : '60%' }} /></div><span className="text-[9px] font-black text-slate-500 uppercase">{dynamicCashbackStats?.is_min_spend_met ? "100%" : "60%"}</span></div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-indigo-600 text-white rounded-xl border border-indigo-700 shadow-lg ml-auto hover:bg-indigo-700 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 group">
              <Calendar className="h-4 w-4 text-indigo-300 group-hover:text-white transition-colors" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-none drop-shadow-sm">CYCLE: {selectedCycle || "NOT SET"}</span>
            </div>
          </div>'''

replacement_bottom_row = '''          <div className="flex items-center gap-2.5 h-10 w-full border-t border-slate-100/40 pt-1.5 px-2">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95 group shrink-0">
                    <BarChart3 className="h-4 w-4 group-hover:rotate-12 transition-transform" />ANALYTICS REPORT
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-[440px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>
                  <div className="bg-white">
                    {/* Header Image Restore Logic Block from Fresh Restore */}
                    <div className="bg-emerald-950 px-6 py-4 flex justify-between items-center text-white relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-transparent pointer-events-none" />
                      <div className="flex flex-col relative z-10"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 leading-none mb-1.5">INTUITION ENGINE V3</span><h3 className="font-black text-[16px] uppercase tracking-[0.1em] text-white flex items-center gap-3">PERFORMANCE ANALYTICS <div className="h-px w-8 bg-emerald-500" /></h3></div>
                      <div className="relative z-10 p-2 bg-emerald-900/40 rounded-full border border-emerald-800/50"><Zap className="h-6 w-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" /></div>
                    </div>
                    
                    <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar scroll-smooth">
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
                      </div>

                      {/* Rule Breakdown Restore - Master Striped */}
                      {dynamicCashbackStats?.activeRules && dynamicCashbackStats.activeRules.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center"><h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1.5 h-4 bg-indigo-500 rounded-sm" />RULE PERFORMANCE BREAKDOWN</h4><div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100"><span className="text-[9px] font-black text-indigo-700 uppercase">{dynamicCashbackStats.currentTierName} TIER OPTIMIZED</span></div></div>
                          <div className="grid gap-4">
                            {dynamicCashbackStats.activeRules.map((rule: any, idx: number) => {
                              const ruleProgress = rule.max ? Math.min(100, (rule.earned / rule.max) * 100) : 100;
                              return (
                                <div key={idx} className="bg-slate-50/50 hover:bg-white rounded-[1.5rem] p-5 border border-slate-100 transition-all duration-300 hover:shadow-xl group/rule relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600/5 rounded-bl-[4rem] group-hover/rule:bg-indigo-600/10 transition-colors" />
                                  <div className="flex justify-between items-start mb-4">
                                     <div className="flex flex-col gap-1">
                                       <div className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-600/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600" /></div><span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{rule.name}</span></div>
                                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md w-fit">{formatMoneyVND(rule.spent)} ELIGIBLE SPENT</span>
                                     </div>
                                     <div className="flex flex-col items-end"><span className="text-[22px] font-black text-emerald-600 tabular-nums leading-none drop-shadow-sm">{rule.rate}%</span><span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] leading-none mt-1">REWARD MULTIPLIER</span></div>
                                  </div>
                                  <div className="space-y-2.5 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                                    <div className="flex justify-between items-baseline mb-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rewards Accumulation</span><div className="text-[16px] font-black text-slate-900 tabular-nums">{formatMoneyVND(rule.earned)}<span className="text-slate-300 ml-1.5 font-bold uppercase tracking-widest text-[10px]">/ {rule.max ? formatVNShort(rule.max) : "∞"}</span></div></div>
                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] p-0.5"><div className={cn("h-full transition-all duration-1500 ease-in-out rounded-full shadow-sm relative group/bar progress-glow", ruleProgress >= 100 ? "bg-gradient-to-r from-emerald-600 to-emerald-400" : "bg-gradient-to-r from-indigo-700 to-indigo-500")} style={{ width: `${ruleProgress}%` }}><div className="absolute inset-0 bg-white/20 animate-pulse" /></div></div>
                                    <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-[0.25em] pt-1"><span>REWARD PROGRESS</span><span>{ruleProgress >= 100 ? "BENEFIT OPTIMIZED" : `${Math.round(ruleProgress)}% UTILIZED`}</span></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Yearly Detailed Restore - Master Footprint */}
                      <div className="mt-4 pt-8 border-t-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-slate-100/50 -mx-6 px-8 pb-8 rounded-b-[2rem]">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20"><Calendar className="h-5 w-5 text-white" /></div><div className="flex flex-col"><span className="text-[10px] font-black text-indigo-700/60 uppercase tracking-[0.4em] leading-none mb-1">ANNUAL TRACKER</span><h3 className="font-black text-[15px] text-slate-800 uppercase tracking-widest">Yearly Performance {selectedYear || currentYear}</h3></div></div>
                            <div className="px-4 py-2 bg-white border border-indigo-100 text-indigo-700 text-[10px] font-black rounded-xl uppercase shadow-md flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> ENGINE CALCULATED REPORT</div>
                          </div>
                          <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="space-y-6">
                              <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-emerald-500/30" /> TOTAL YEAR PROFIT</span><span className={cn("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", annualPerformanceReport.profit >= 0 ? "text-emerald-700" : "text-rose-700")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.profit))}</span></div>
                              <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-indigo-500/30" /> ACTUAL PAID BACK</span><span className="text-2xl font-black text-indigo-700 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.actual))}</span></div>
                            </div>
                            <div className="space-y-6 text-right">
                              <div className="flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">EST. POTENTIAL REWARDS <div className="w-1 h-3 bg-emerald-500/30" /></span><span className="text-2xl font-black text-emerald-600 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.est))}</span></div>
                              <div className="flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">SHARED WITH OTHERS <div className="w-1 h-3 bg-rose-500/30" /></span><span className="text-2xl font-black text-rose-500 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.shared))}</span></div>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-[2rem] border border-slate-200/80 shadow-2xl relative overflow-hidden group/benefit animate-in slide-in-from-bottom duration-1000">
                             <div className="absolute top-0 left-0 w-3 h-full bg-emerald-600 group-hover/benefit:w-full group-hover/benefit:opacity-5 transition-all duration-700" />
                             <div className="flex justify-between items-center relative z-10">
                               <div className="flex flex-col"><span className="text-[13px] font-black text-slate-600 uppercase tracking-[0.3em] leading-none mb-1.5">NET ANNUAL BENEFIT</span><span className="text-[11px] font-medium text-slate-400 italic tracking-wide">Real financial impact accrued across all metrics</span></div>
                               <div className={cn("text-3xl font-black tabular-nums tracking-tighter transition-all group-hover/benefit:scale-110", annualPerformanceReport.totalNetBenefit >= 0 ? "text-emerald-700 drop-shadow-[0_2px_10px_rgba(5,150,105,0.2)]" : "text-rose-700")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.totalNetBenefit))}</div>
                             </div>
                          </div>
                      </div>
                    </div>
                    <div className="bg-slate-900 px-8 py-4 flex justify-between items-center text-white text-[11px] font-black uppercase tracking-[0.4em] opacity-100 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-glow" />
                        <span className="text-emerald-400">ENGINE CASHBACK V3.2 STATUS: ACTIVE</span>
                      </div>
                      <span className="text-slate-500 font-bold opacity-60">SNAPSHOT: {format(new Date(), "HH:mm:ss MMM d, yyyy").toUpperCase()}</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className={cn("flex items-center gap-2.5 px-4 py-2.5 rounded-xl h-full border transition-all cursor-help hover:shadow-md active:scale-95 transform shadow-sm relative group overflow-hidden flex-1", (dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"))}>
                    <div className={cn("absolute inset-y-0 left-0 w-1 transition-all group-hover:w-2", (dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-600" : "bg-amber-600"))} />
                    <Zap className={cn("h-4.5 w-4.5 fill-current transition-transform group-hover:scale-110", (dynamicCashbackStats?.is_min_spend_met ? "text-emerald-600" : "text-amber-600"))} />
                    <div className="flex items-center justify-between flex-1 ml-0.5">
                      <span className="text-[11px] font-black uppercase tracking-[0.15em]">
                        {dynamicCashbackStats?.is_min_spend_met 
                          ? "QUALIFIED" 
                          : `NEEDS: ${formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))}`}
                      </span>
                      <span className="text-[11px] font-black uppercase tracking-[0.15em] opacity-40">
                         SPENT: {formatMoneyVND(Math.ceil(dynamicCashbackStats?.currentSpend || 0))}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-950 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 rounded-[1.5rem] text-white w-[340px] z-[120]" sideOffset={15}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3"><div className={cn("w-2.5 h-2.5 rounded-full", dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]")} /><h4 className="font-black text-[12px] uppercase tracking-[0.2em] text-white">Rule Qualification Logic</h4></div>
                    <p className="text-[13px] font-medium leading-relaxed italic text-slate-400">
                      {dynamicCashbackStats?.is_min_spend_met ? "✅ TARGET ACHIEVED: Minimum spending requirement has been successfully met for this cycle. All rule multipliers are currently active and accruing rewards." : `⚠️ ACTION REQUIRED: Target spend not reached. Chi tiêu thêm ${formatMoneyVND(Math.ceil((dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))} để mở khóa toàn bộ quyền lợi hoàn tiền.`}
                    </p>
                    <div className="flex items-center gap-2 pt-1"><div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: dynamicCashbackStats?.is_min_spend_met ? '100%' : '60%' }} /></div><span className="text-[9px] font-black text-slate-500 uppercase">{dynamicCashbackStats?.is_min_spend_met ? "100%" : "60%"}</span></div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-2.5 px-4 py-2 bg-indigo-600 text-white rounded-xl border border-indigo-700 shadow-lg ml-auto hover:bg-indigo-700 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 group">
              <Calendar className="h-4 w-4 text-indigo-300 group-hover:text-white transition-colors" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-none drop-shadow-sm">{dynamicCashbackStats?.cycle?.label || selectedCycle || "NOT SET"}</span>
            </div>
          </div>'''

# 3. Apply the fix
content = "".join(lines)
content = content.replace(target_reward_mapping, replacement_reward_mapping)
content = content.replace(target_bottom_row, replacement_bottom_row)

# 4. Write back
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'w', 'utf-8') as f:
    f.write(content)

print('Success! V5 UI Refinement applied.')
