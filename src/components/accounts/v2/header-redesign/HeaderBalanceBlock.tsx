"use client";

import React from "react";
import { Account } from "@/types/moneyflow.types";
import { AccountSpendingStats } from "@/types/cashback.types";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Clock, CheckCircle } from "lucide-react";

interface HeaderBalanceBlockProps {
  account: Account;
  cashbackStats: AccountSpendingStats | null;
  isCashbackLoading: boolean;
  selectedCycle?: string;
}

export function HeaderBalanceBlock({
  account,
  cashbackStats,
  isCashbackLoading,
  selectedCycle
}: HeaderBalanceBlockProps) {
  // Calculate balance metrics
  const availableBalance = account.current_balance || 0;
  const creditLimit = account.credit_limit || 0;
  const soloBalance = (account as any).solo_balance || 0; // solo_balance might be injected or in a different type
  
  // Calculate ratio (available / limit)
  const ratio = creditLimit > 0 ? (availableBalance / creditLimit) * 100 : 0;
  
  // Calculate pace (how much spent so far in cycle)
  const spentInCycle = cashbackStats?.currentSpend || 0;
  const pace = spentInCycle;
  
  // Health status based on ratio
  const getHealthStatus = () => {
    if (ratio >= 50) return { label: 'HEALTHY', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (ratio >= 30) return { label: 'WARNING', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { label: 'CRITICAL', color: 'text-red-600', bg: 'bg-red-100' };
  };
  
  const health = getHealthStatus();
  
  // Cycle info from stats
  const cycleEnd = cashbackStats?.cycle?.end || '';
  
  // Format cycle end date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!cycleEnd) return 0;
    const end = new Date(cycleEnd);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="flex-1 xl:w-[28%] space-y-4">
      {/* Balance Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">BALANCE</h3>
          <span className={cn("text-[10px] font-black px-1.5 py-0.5 rounded", health.bg, health.color)}>
            {health.label}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {/* Available */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">AVAILABLE</div>
            <div className="text-lg font-bold text-emerald-600 tabular-nums">
              {formatCurrency(availableBalance)}
            </div>
          </div>
          
          {/* Solo */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">SOLO</div>
            <div className="text-lg font-bold text-indigo-600 tabular-nums">
              {formatCurrency(soloBalance)}
            </div>
          </div>
          
          {/* Limit */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">LIMIT</div>
            <div className="text-lg font-bold text-slate-700 tabular-nums">
              {formatCurrency(creditLimit)}
            </div>
          </div>
        </div>
        
        {/* Ratio Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-600">RATIO {ratio.toFixed(1)}%</span>
            <span className="text-slate-400 tabular-nums">
              PACE {formatCurrency(pace)} / {formatCurrency(creditLimit)}
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                ratio >= 50 ? "bg-emerald-500" : ratio >= 30 ? "bg-amber-500" : "bg-red-500"
              )}
              style={{ width: `${Math.min(ratio, 100)}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Cycle Info */}
      <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-600">
            {daysRemaining} Days | {formatDate(cycleEnd)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600">No Wait</span>
        </div>
      </div>
    </div>
  );
}