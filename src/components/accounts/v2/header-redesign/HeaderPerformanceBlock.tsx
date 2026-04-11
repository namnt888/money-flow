"use client";

import React from "react";
import { Account } from "@/types/moneyflow.types";
import { AccountSpendingStats } from "@/types/cashback.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, Info, Calendar as CalendarIcon, ChevronDown } from "lucide-react";

interface HeaderPerformanceBlockProps {
  account: Account;
  cashbackStats: AccountSpendingStats | null;
  isCashbackLoading: boolean;
  selectedCycle?: string;
  availableYears: string[];
  selectedYear: string | null;
  onYearChange: (year: string) => void;
}

export function HeaderPerformanceBlock({
  account,
  cashbackStats,
  isCashbackLoading,
  selectedCycle,
  availableYears,
  selectedYear,
  onYearChange
}: HeaderPerformanceBlockProps) {
  // Extract performance metrics
  const netProfit = cashbackStats?.netProfit || 0;
  const actualClaimed = cashbackStats?.actualClaimed || 0;
  const estEarned = cashbackStats?.earnedSoFar || 0;
  const actualEarn = cashbackStats?.earnedSoFar || 0; // Assuming same as estEarned for now
  const sharedToGroup = cashbackStats?.sharedAmount || 0;
  
  // Goal progress
  const minSpend = cashbackStats?.minSpend || 0;
  const currentSpend = cashbackStats?.currentSpend || 0;
  const goalPercent = minSpend > 0 ? Math.min((currentSpend / minSpend) * 100, 100) : 100;
  const needsToSpend = minSpend > currentSpend ? minSpend - currentSpend : 0;
  
  // Format cycle range for display
  const cycleStart = cashbackStats?.cycle?.start || '';
  const cycleEnd = cashbackStats?.cycle?.end || '';
  
  const formatCycleRange = () => {
    if (!cycleStart || !cycleEnd) return 'Current Cycle';
    const start = new Date(cycleStart);
    const end = new Date(cycleEnd);
    return `${start.getDate()}.${start.getMonth() + 1} - ${end.getDate()}.${end.getMonth() + 1}`;
  };

  return (
    <div className="flex-1 xl:w-[50%] space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">PERFORMANCE</h3>
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-600">
            CB PERF
          </span>
        </div>
        
        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition">
          <BarChart3 className="w-3.5 h-3.5" />
          ANALYTICS
        </button>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-5 gap-4">
        {/* Net Profit */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">NET PROFIT</div>
          <div className="text-lg font-bold text-emerald-600 tabular-nums">
            {formatCurrency(netProfit)}
          </div>
        </div>
        
        {/* Actual Claimed */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">ACTUAL CLAIMED</div>
            <Info className="w-3 h-3 text-slate-300" />
          </div>
          <div className="text-lg font-bold text-rose-500 tabular-nums">
            {formatCurrency(actualClaimed)}
          </div>
        </div>
        
        {/* Est. Earned */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">EST. EARNED</div>
          <div className="text-lg font-bold text-amber-500 tabular-nums">
            {formatCurrency(estEarned)}
          </div>
        </div>
        
        {/* Actual Earn */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">ACTUAL EARN</div>
            <Info className="w-3 h-3 text-slate-300" />
          </div>
          <div className="text-lg font-bold text-blue-600 tabular-nums">
            {formatCurrency(actualEarn)}
          </div>
        </div>
        
        {/* Shared to Group */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-400">SHARED TO GROUP</div>
          <div className="text-lg font-bold text-indigo-600 tabular-nums">
            {formatCurrency(sharedToGroup)}
          </div>
        </div>
      </div>
      
      {/* Goal Progress Bar */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex-1 h-8 bg-indigo-50 rounded-md flex items-center px-3 relative overflow-hidden">
          {/* Progress Fill */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-indigo-100 transition-all duration-500"
            style={{ width: `${goalPercent}%` }}
          />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-between w-full text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-700">
              <TrendingUp className="w-3.5 h-3.5" />
              GOAL {goalPercent.toFixed(0)}%
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              {needsToSpend > 0 && (
                <span className="font-medium">
                  NEEDS <span className="text-amber-600 font-bold">{formatCurrency(needsToSpend)}</span>
                </span>
              )}
              <span className="text-slate-300">|</span>
              <span className="font-medium">
                SPENT <span className="text-slate-700 font-bold">{formatCurrency(currentSpend)}</span>
              </span>
            </div>
          </div>
        </div>
        
        {/* Cycle Selector */}
        <button className="flex-none h-8 px-3 rounded-md border border-indigo-100 bg-white flex items-center gap-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition">
          <CalendarIcon className="w-3.5 h-3.5" />
          {formatCycleRange()}
          <ChevronDown className="w-3.5 h-3.5 opacity-50" />
        </button>
      </div>
    </div>
  );
}

// Helper component for the TrendingUp icon since it wasn't imported
function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}