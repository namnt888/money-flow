import codecs

# 1. Read original file
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'r', 'utf-8-sig') as f:
    lines = f.readlines()

# 2. Keep header part (up to line 507)
prefix = lines[:507]

# 3. Component logic enrichment (re-added correctly)
logic_block = '''
  const rewardsCount = React.useMemo(() => {
    const rules = dynamicCashbackStats?.activeRules || [];
    const program = normalizeCashbackConfig(account.cashback_config, account);
    const displayRules = rules.length > 0 ? rules : (program.levels?.[0]?.rules || []);
    return displayRules.length;
  }, [dynamicCashbackStats, account]);

  const cycleMetricSnapshot = React.useMemo(() => {
    const defaults = {
      estCashback: 0,
      sharedAmount: 0,
      totalProfit: 0,
      actualClaimed: 0,
      currentSpend: 0,
      source: "defaults"
    };
    if (selectedCycle && selectedCycle !== "all" && dynamicCashbackStats) {
      return {
        estCashback: dynamicCashbackStats.earnedSoFar || 0,
        sharedAmount: dynamicCashbackStats.sharedWithOthers || 0,
        totalProfit: (dynamicCashbackStats.earnedSoFar || 0) - (dynamicCashbackStats.sharedWithOthers || 0),
        actualClaimed: dynamicCashbackStats.actualClaimed || 0,
        currentSpend: dynamicCashbackStats.currentSpend || 0,
        source: "dynamic_stats"
      };
    }
    return defaults;
  }, [selectedCycle, dynamicCashbackStats]);

  const annualPerformanceReport = React.useMemo(() => {
    if (!summary) return { profit: 0, actual: 0, est: 0, shared: 0, totalNetBenefit: 0 };
    return {
      profit: summary.netProfitYearly || 0,
      actual: summary.cashbackTotal || 0,
      est: summary.cardYearlyCashbackTotal || 0,
      shared: summary.cardYearlyCashbackGivenTotal || 0,
      totalNetBenefit: summary.netProfitYearly || 0
    };
  }, [summary]);
'''

# 4. Redesigned return statement - HARMONIOUS VERSION
redesigned_return = '''  return (
    <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex gap-4 items-stretch sticky top-0 z-60 shadow-sm">
      <AccountSlideV2
        open={isSlideOpen}
        onOpenChange={setIsSlideOpen}
        account={account}
        allAccounts={allAccounts}
        categories={categories}
        existingAccountNumbers={Array.from(new Set(allAccounts.map((a) => a.account_number).filter(Boolean))) as string[]}
        existingReceiverNames={Array.from(new Set(allAccounts.map((a) => a.receiver_name).filter(Boolean))) as string[]}
      />

      {/* CARD 1: ACCOUNT */}
      <HeaderSection label="Account" className="flex-[3] min-w-[280px] max-w-[340px] flex flex-col gap-0 py-2">
        <div className="flex items-start gap-3 flex-1 h-12">
          <div className="shrink-0 h-10 flex items-center">
            {account.image_url ? (
              <img src={account.image_url} alt="" className="h-10 w-auto max-w-[70px] object-contain rounded-none shadow-sm border border-slate-50" />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center border border-slate-100 bg-slate-50 rounded-none">
                <span className="text-lg font-bold text-slate-400">{account.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1">
              <h1 className="text-[13px] font-black text-slate-900 leading-tight truncate uppercase tracking-tight">{account.name}</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={(e) => { e.stopPropagation(); handleCopyAccountId(); }} className={cn("text-slate-300 hover:text-emerald-600 transition-colors ml-0.5", isAccountIdCopied && "text-emerald-500")} aria-label="Copy account ID">
                      {isAccountIdCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Copy account ID</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Popover open={isEditPopoverOpen} onOpenChange={setIsEditPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className="text-slate-300 hover:text-indigo-500 transition-colors"><Edit className="h-3 w-3" /></button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] z-[90] shadow-2xl border-indigo-100" align="start">
                   <div className="space-y-3 p-1">
                    <h4 className="text-[10px] font-black uppercase text-slate-400">Edit Account Info</h4>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Account Number</span>
                      <Input value={editValues.account_number} onChange={(e) => setEditValues((p) => ({ ...p, account_number: e.target.value }))} placeholder="Account Number" className="h-8 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Receiver Name</span>
                      <Input value={editValues.receiver_name} onChange={(e) => setEditValues((p) => ({ ...p, receiver_name: e.target.value }))} placeholder="Receiver Name" className="h-8 text-xs" />
                    </div>
                    <button onClick={handleSaveInfo} className="w-full h-8 bg-indigo-600 text-white text-xs font-bold rounded mt-2">Save Settings</button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-black text-slate-500 tracking-wide">{account.account_number || "•••• •••• ••••"}</span>
              {account.receiver_name && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">· {account.receiver_name}</span>}
            </div>
          </div>
        </div>

        {/* MIDDLE ROW SYSTEM (h-12) */}
        <div className="flex items-center gap-2 h-12 w-full border-t border-slate-50 mt-1 pt-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            <button onClick={() => setIsSlideOpen(true)} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-[9px] font-black uppercase tracking-wider"><Settings className="w-2.5 h-2.5" />CONFIG</button>
            {summary && (
              <button
                onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("open-pending-items-modal", { detail: { accountId: account.id } })); }}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider transition-all", (summary.pendingCount || 0) > 0 ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100" : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100")}
              >
                {(summary.pendingCount || 0) > 0 ? `${summary.pendingCount} WAIT` : "NO WAIT"}
              </button>
            )}
            {isCreditCard && (
              <button
                onClick={async () => {
                  try { setIsSyncing(true); const { syncAccountCashbackAction } = await import("@/actions/account-actions"); const result = await syncAccountCashbackAction(account.id); if (result && (result as any).success) { toast.success("Sync OK"); router.refresh(); } } catch { toast.error("Sync error"); } finally { setIsSyncing(false); }
                }}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all text-[9px] font-black uppercase tracking-wider disabled:opacity-50"
              >
                {isSyncing ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <RefreshCw className="w-2.5 h-2.5" />}SYNC
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM ROW Awards (h-10) */}
        <div className="flex items-center gap-1.5 h-10 w-full border-t border-slate-50 pt-1">
          {rewardsCount > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFF9E6] border border-[#FFE082] rounded-full cursor-help hover:bg-[#FFF3C8] transition-all group shrink-0">
                  <Zap className="h-3.5 w-3.5 text-[#F59E0B] fill-[#F59E0B] group-hover:scale-110 transition-transform" />
                  {(() => {
                    const rules = dynamicCashbackStats?.activeRules || [];
                    const program = normalizeCashbackConfig(account.cashback_config, account);
                    const displayRules = rules.length > 0 ? rules : (program.levels?.[0]?.rules || []);
                    const topRules = displayRules.slice(0, 2);
                    const remaining = rewardsCount - topRules.length;
                    return (<>
                      {topRules.map((r: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-[#92400E] uppercase tracking-wider">{r.name}</span>
                          {idx < topRules.length - 1 && <span className="w-px h-2.5 bg-[#FFE082] opacity-50" />}
                        </div>
                      ))}
                      {remaining > 0 && <span className="text-[10px] font-black text-[#D97706] uppercase ml-0.5">+{remaining} more</span>}
                    </>);
                  })()}
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 border-none shadow-2xl rounded-xl overflow-hidden w-[360px] z-[100]" align="start" sideOffset={8}>
                <div className="bg-[#FF5A00] px-4 py-3 flex justify-between items-center text-white">
                  <div className="flex items-center gap-2"><Zap className="h-4 w-4 fill-white/30" /><span className="text-[13px] font-black uppercase tracking-[0.1em]">Active Rewards</span></div>
                  <span className="bg-white/20 px-2.5 py-0.5 rounded-sm text-[10px] font-black text-white uppercase border border-white/20">{rewardsCount} Rules</span>
                </div>
                <div className="bg-[#F8F9FB] p-4 space-y-3 max-h-[450px] overflow-y-auto custom-scrollbar">
                  {(() => {
                    const rules = dynamicCashbackStats?.activeRules || [];
                    const program = normalizeCashbackConfig(account.cashback_config, account);
                    const displayRules = rules.length > 0 ? rules : (program.levels?.[0]?.rules || []).map((r: any) => ({ name: r.description || "Rules", rate: r.rate, max: r.maxReward }));
                    return displayRules.map((rule: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-100 p-3.5 shadow-sm space-y-3 relative overflow-hidden group/rule">
                        <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500 opacity-0 group-hover/rule:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Specific Categories</span>
                          <span className="text-[15px] font-black text-emerald-600 tabular-nums">{rule.rate}%</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                          <div className="h-7 w-7 rounded-md bg-white border border-slate-100 flex items-center justify-center shadow-sm"><Zap className="h-3.5 w-3.5 text-amber-500" /></div>
                          <div className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{rule.name}</div>
                        </div>
                        {(rule as any).max && <div className="flex items-center gap-2 text-orange-600/70 bg-orange-50/30 px-2 py-1 rounded-md w-fit"><Info className="h-3 w-3" /><span className="text-[9px] font-bold uppercase tracking-wider">Cap: {formatVNShort((rule as any).max)}</span></div>}
                      </div>
                    ));
                  })()}
                  <div className="text-center py-2 text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] italic pt-4 border-t border-slate-200/50">Detailed MCC Matching Required</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </HeaderSection>

      {/* CARD 2: CREDIT HEALTH / CASH FLOW */}
      {isCreditCard ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HeaderSection label="Credit Health" borderColor="border-indigo-100" className="flex-[5] min-w-[380px] bg-indigo-50/10 cursor-help flex flex-col gap-0 py-2">
                <div className="grid grid-cols-4 gap-4 items-start flex-1 pt-1 px-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Available</span>
                    <div className={cn("text-lg font-black tracking-tight leading-none tabular-nums", availableBalance >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(availableBalance))}</div>
                  </div>
                   <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Limit</span>
                    <div className="text-lg font-black tracking-tight leading-none tabular-nums text-slate-900">{formatMoneyVND(Math.ceil(account.credit_limit || 0))}</div>
                  </div>
                  <div className="flex justify-center pt-1">{dueDateBadge}</div>
                  <div className="flex flex-col items-end pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">Status</span>
                    <div className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100 tracking-wider">STABLE</div>
                  </div>
                </div>

                <div className="flex items-center justify-between h-12 border-t border-slate-50 mt-1 pt-1">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">{selectedYear || currentYear} SPENDING TOTAL</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-black text-slate-700 tabular-nums">{formatMoneyVND(Math.ceil(summary?.yearExpensesTotal || 0))} / {formatMoneyVND(account.credit_limit || 0)}</span>
                  </div>
                </div>

                <div className="h-10 w-full border-t border-slate-50 pt-1">
                  <div className="relative w-full h-[32px] bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 shadow-inner">
                    <div
                      className={cn("h-full transition-all duration-1000 rounded-full flex items-center justify-center min-w-[3.5rem] shadow-lg", (account.credit_limit && (outstandingBalance / account.credit_limit) > 0.8) ? "bg-gradient-to-r from-rose-600 to-rose-400" : "bg-gradient-to-r from-indigo-600 to-indigo-500")}
                      style={{ width: `${Math.max((account.credit_limit ? (outstandingBalance / account.credit_limit) * 100 : 0), 8)}%` }}
                    >
                      <span className="text-[11px] font-black text-white uppercase tracking-wider drop-shadow-sm">{(account.credit_limit ? (outstandingBalance / account.credit_limit) * 100 : 0).toFixed(1)}% USED</span>
                    </div>
                  </div>
                </div>
              </HeaderSection>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="w-[360px] p-0 border-none shadow-2xl rounded-xl overflow-hidden">
              <div className="bg-white">
                <div className="bg-indigo-950 px-4 py-2 flex justify-between items-center text-white">
                  <h3 className="font-black text-[12px] uppercase tracking-widest text-indigo-200">Credit Health Report</h3>
                  <ShieldCheck className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100/50 space-y-2 text-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Year Expenses</span>
                    <div className="text-2xl font-black text-indigo-600 tabular-nums">{formatMoneyVND(summary?.yearExpensesTotal || 0)}</div>
                  </div>
                  {!!account.annual_fee_waiver_target && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                       <div className="flex justify-between items-center text-[11px] uppercase font-bold tracking-tight"><span className="text-slate-400">Target for Waiver</span><span className="text-slate-900">{formatMoneyVND(account.annual_fee_waiver_target)}</span></div>
                       <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, ((summary?.yearExpensesTotal || 0) / account.annual_fee_waiver_target) * 100)}%` }} />
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          <HeaderSection label="Cash Flow" className="flex-1 min-w-[240px] bg-sky-50/10 flex flex-col gap-0 py-2">
            <div className="flex flex-col h-full justify-between py-1">
              <div className="flex justify-between items-center px-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{((summary?.yearPureIncomeTotal || 0) > 0 || (summary?.yearPureExpenseTotal || 0) > 0) ? "Pure Ledger Net" : "Total Cashflow Net"}</span>
                  <span className={cn("text-xl font-black tabular-nums tracking-tight", ((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0) >= 0) ? "text-emerald-600" : "text-rose-600")}>
                    {formatMoneyVND(((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0)))}
                  </span>
                </div>
                <TrendingUp className="h-5 w-5 text-sky-500" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 px-1 border-t border-sky-100/50 pt-2">
                <div className="flex flex-col"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Income</span><span className="text-[13px] font-black text-emerald-600">+{formatMoneyVND(summary?.yearPureIncomeTotal || 0)}</span></div>
                <div className="flex flex-col text-right"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Expense</span><span className="text-[13px] font-black text-rose-500">-{formatMoneyVND(summary?.yearPureExpenseTotal || 0)}</span></div>
              </div>
            </div>
          </HeaderSection>
          <HeaderSection label="Balance" className="flex-1 min-w-[180px] bg-slate-50/10 flex flex-col gap-0 py-2">
             <div className="flex flex-col h-full justify-center pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 px-1">Available Funds</span>
                <div className={cn("text-2xl font-black tracking-tighter tabular-nums px-1", availableBalance >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(availableBalance))}</div>
             </div>
          </HeaderSection>
        </>
      )}

      {/* CARD 3: CASHBACK PERFORMANCE */}
      {isCreditCard && (
        <HeaderSection label="Performance" borderColor="border-emerald-100" className="flex-[6] min-w-[380px] bg-emerald-50/10 flex flex-col gap-0 py-2 relative" hideHintInHeader>
          <div className="flex items-start gap-4 flex-1 h-12">
            {dynamicCashbackStats && selectedCycle && selectedCycle !== "all" ? (
              <div className="relative inline-flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const stats = dynamicCashbackStats;
                    const isQualified = stats.is_min_spend_met;
                    const minSpend = stats.minSpend || 0;
                    const spent = stats.currentSpend || 0;
                    const cap = stats.maxCashback || 0;
                    const earned = stats.earnedSoFar || 0;
                    const activeMax = stats.activeRules?.reduce((acc, r) => acc + (r.max || 0), 0) || 0;
                    const effectiveCap = cap > 0 ? cap : activeMax;
                    let progress = 0;
                    let strokeColor = "#10b981";
                    if (!isQualified && minSpend > 0) {
                      progress = Math.min((spent / minSpend) * 100, 100);
                      strokeColor = progress >= 90 ? "#10b981" : "#4f46e5";
                    } else {
                      progress = effectiveCap > 0 ? Math.min(100, (earned / effectiveCap) * 100) : 0;
                      strokeColor = "#10b981";
                    }
                    const circumference = 2 * Math.PI * 26;
                    const strokeDashoffset = circumference - (progress / 100) * circumference;
                    return (
                      <>
                        <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
                          <circle cx="30" cy="30" r="26" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                          <circle cx="30" cy="30" r="26" fill="none" stroke={strokeColor} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-[12px] font-black text-slate-900 leading-none">{Math.round(progress)}%</span>
                          <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{!isQualified ? "Goal" : "Earned"}</span>
                        </div>
                      </>
                    );
                  })()}
              </div>
            ) : <Calendar className="h-10 w-10 text-emerald-300" />}

            {dynamicCashbackStats && selectedCycle && selectedCycle !== "all" && (
                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">My Profit</span>
                    <span className={cn("text-[13px] font-black tabular-nums tracking-tight", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Actual Claimed</span>
                    <span className="text-[13px] font-black text-indigo-600 tabular-nums tracking-tight">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualClaimed))}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-[#10B981]">Total Earned</span>
                    <span className="text-[13px] font-black text-emerald-600 tabular-nums tracking-tight">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest text-rose-400">Shared To Group</span>
                    <span className="text-[13px] font-black text-rose-500 tabular-nums tracking-tight">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</span>
                  </div>
                </div>
            )}
          </div>

          <div className="flex items-center gap-3 h-12 border-t border-slate-50 mt-1 pt-1">
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">TIER STATUS:</span>
             {dynamicCashbackStats?.currentTierName && (
               <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                 <Sparkles className="h-2.5 w-2.5 text-indigo-500" />
                 <span className="text-[9px] font-black text-indigo-700 uppercase tracking-wider">{dynamicCashbackStats.currentTierName}</span>
               </div>
             )}
             <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
               <span className="text-[9px] font-black text-slate-400 uppercase truncate">SPEND: {formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}</span>
             </div>
          </div>

          <div className="flex items-center gap-2 h-10 w-full border-t border-slate-50 pt-1">
            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-[0.1em] hover:bg-slate-800 transition-colors shadow-sm active:scale-95 transform transition-transform">
                    <BarChart3 className="h-3.5 w-3.5" />REPORT
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-[400px] p-0 border-none shadow-3xl rounded-2xl overflow-hidden z-[110]" sideOffset={12}>
                  <div className="bg-white">
                    <div className="bg-emerald-950 px-5 py-3 flex justify-between items-center text-white border-b-2 border-emerald-900">
                      <div className="flex flex-col"><span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400/80">Analytics</span><h3 className="font-black text-[14px] uppercase tracking-widest text-emerald-100 underline decoration-emerald-500 decoration-2 underline-offset-4">Performance Report</h3></div>
                      <Zap className="h-5 w-5 text-amber-400 fill-amber-400 drop-shadow-glow" />
                    </div>
                    <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                      {/* Metric Table Restore */}
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 text-[10px] pb-2 border-b border-slate-100 font-black text-slate-400 uppercase tracking-[0.15em]"><span>METRICS</span><span className="text-right">VALUE</span></div>
                        <div className="grid grid-cols-2 text-xs py-1.5 border-b border-slate-50">
                          <span className="text-slate-500 font-bold uppercase text-[10px]">Active Cycle</span>
                          <span className="text-right font-black text-slate-900">{dynamicCashbackStats?.cycle?.label || "CURRENT"}</span>
                        </div>
                        <div className="grid grid-cols-2 text-xs py-1.5 border-b border-slate-50">
                          <span className="text-slate-500 font-bold uppercase text-[10px]">Eligible Spend</span>
                          <span className="text-right font-black text-slate-900">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}</span>
                        </div>
                        <div className="grid grid-cols-2 text-xs py-1.5 border-b border-slate-50">
                          <span className="text-emerald-700 font-bold uppercase text-[10px]">Cashback Earned</span>
                          <span className="text-right font-black text-emerald-600">+{formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</span>
                        </div>
                        <div className="grid grid-cols-2 text-xs py-1.5 border-b border-slate-50">
                          <span className="text-rose-500 font-bold uppercase text-[10px]">Shared Amount</span>
                          <span className="text-right font-black text-rose-500">-{formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</span>
                        </div>
                        <div className="grid grid-cols-2 text-[13px] pt-3 font-black uppercase tracking-tight bg-emerald-50/50 p-2 rounded-lg">
                          <span className="text-emerald-900">NET CYCLE PROFIT</span>
                          <span className={cn("text-right", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</span>
                        </div>
                      </div>

                      {/* Rule Breakdown Restore */}
                      {dynamicCashbackStats?.activeRules && dynamicCashbackStats.activeRules.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Rule Breakdown</span><span className="text-[10px] font-bold text-slate-500 uppercase">Tier: {dynamicCashbackStats.currentTierName}</span></div>
                          <div className="space-y-3">
                            {dynamicCashbackStats.activeRules.map((rule: any, idx: number) => {
                              const ruleProgress = rule.max ? Math.min(100, (rule.earned / rule.max) * 100) : 100;
                              return (
                                <div key={idx} className="space-y-1.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                  <div className="flex justify-between items-end"><div className="flex flex-col gap-0.5"><div className="flex items-center gap-2"><span className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{rule.name}</span><span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded shadow-sm">{rule.rate}%</span></div><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{formatMoneyVND(rule.spent)} Spent</span></div><div className="text-[12px] font-black text-slate-900 tabular-nums">{formatMoneyVND(rule.earned)}{rule.max && <span className="text-slate-300 ml-1">/ {formatVNShort(rule.max)}</span>}</div></div>
                                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner"><div className={cn("h-full transition-all duration-700", ruleProgress >= 100 ? "bg-emerald-500" : "bg-indigo-500")} style={{ width: `${ruleProgress}%` }} /></div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Yearly Restore */}
                      <div className="mt-2 pt-5 border-t-2 border-slate-100 bg-slate-50/50 -mx-5 px-5 pb-5 rounded-b-2xl">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] font-black text-indigo-700 uppercase tracking-[0.2em] flex items-center gap-2"><Calendar className="h-4 w-4" /> PERFORMANCE {selectedYear || currentYear}</span>
                            <span className="px-3 py-1 bg-white border border-indigo-100 text-indigo-600 text-[9px] font-black rounded-lg uppercase shadow-sm">ESTIMATED REPORT</span>
                          </div>
                          <div className="grid grid-cols-2 gap-6 mb-5">
                            <div className="space-y-4">
                              <div className="flex flex-col gap-1"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ANNUAL PROFIT</span><span className={cn("text-xl font-black tabular-nums tracking-tighter", annualPerformanceReport.profit >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.profit))}</span></div>
                              <div className="flex flex-col gap-1"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTUAL CLAIMED</span><span className="text-xl font-black text-indigo-600 tabular-nums tracking-tighter">{formatMoneyVND(Math.ceil(annualPerformanceReport.actual))}</span></div>
                            </div>
                            <div className="space-y-4 text-right">
                              <div className="flex flex-col gap-1"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EST. CASHBACK</span><span className="text-xl font-black text-emerald-600 tabular-nums tracking-tighter">{formatMoneyVND(Math.ceil(annualPerformanceReport.est))}</span></div>
                              <div className="flex flex-col gap-1"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CASHBACK SHARED</span><span className="text-xl font-black text-rose-500 tabular-nums tracking-tighter">{formatMoneyVND(Math.ceil(annualPerformanceReport.shared))}</span></div>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-lg relative overflow-hidden group/benefit"><div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" /><div className="flex justify-between items-center relative z-10"><div className="flex flex-col"><span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">TOTAL NET BENEFIT</span><span className="text-[10px] font-medium text-slate-400 italic">Financial impact for the whole year</span></div><div className={cn("text-2xl font-black tabular-nums tracking-tight", annualPerformanceReport.totalNetBenefit >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.totalNetBenefit))}</div></div></div>
                      </div>
                    </div>
                    <div className="bg-slate-900 px-6 py-3 flex justify-between items-center text-white text-[10px] font-black uppercase tracking-widest opacity-95"><span>CASHBACK V3 ENGINE STATUS: ACTIVE</span><div className="flex gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-emerald-400">LIVE DATA SYNCED</span></div></div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <div className={cn("flex items-center gap-2 px-4 py-2 rounded-lg h-full border transition-all cursor-help hover:bg-opacity-80 active:scale-95 transform shadow-sm", (dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"))}>
                    <Zap className={cn("h-4 w-4 fill-current", (dynamicCashbackStats?.is_min_spend_met ? "text-emerald-600" : "text-amber-600"))} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{(dynamicCashbackStats?.is_min_spend_met ? "Qualified" : "In Progress")}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-900 border-none shadow-2xl p-4 rounded-xl text-white w-[300px] z-[120]" sideOffset={10}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2"><h4 className="font-black text-[11px] uppercase tracking-widest text-emerald-400">Cashback Health Status</h4><Check className="h-3 w-3 text-emerald-500" /></div>
                    <p className="text-[12px] font-medium leading-relaxed italic text-slate-300">
                      {dynamicCashbackStats?.is_min_spend_met ? "✅ Đã đạt chi tiêu tối thiểu (Min Spend). Bạn đang trong giai đoạn tối ưu hóa Cashback Profit." : `⚠️ Chưa đạt Min Spend. Cần chi tiêu thêm ${formatMoneyVND(Math.ceil((dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))} để qualify nhận cashback.`}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 rounded-full border border-indigo-700 shadow-md ml-auto hover:bg-indigo-700 transition-colors cursor-default whitespace-nowrap">
                <Calendar className="h-3 w-3 text-indigo-200" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">CYCLE: {selectedCycle || "NOT SET"}</span>
              </div>
            </TooltipProvider>
          </div>
        </HeaderSection>
      )}
    </div>
  );
}
'''

# 5. Write everything
with codecs.open('src/components/accounts/v2/AccountDetailHeaderV2.tsx', 'w', 'utf-8') as f:
    f.writelines(prefix)
    f.write(logic_block)
    f.write(redesigned_return)

print('Success! Harmornious V2 build written.')
