"use client";

import React from "react";
import { Account } from "@/types/moneyflow.types";
import { AccountSpendingStats } from "@/types/cashback.types";
import { cn } from "@/lib/utils";
import { Settings, Database, Zap, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface HeaderIdentityBlockProps {
  account: Account;
  cashbackStats: AccountSpendingStats | null;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
  selectedCycle?: string;
}

export function HeaderIdentityBlock({
  account,
  cashbackStats,
  isCollapsed,
  onCollapseToggle,
  selectedCycle
}: HeaderIdentityBlockProps) {
  // Extract account info
  const accountName = account.name || '';
  const cardNumber = account.account_number || '**** **** ****';
  const ownerName = account.receiver_name || 'Unknown Owner';
  const isParent = !!account.relationships?.is_parent;
  const cycleTag = selectedCycle || 'CURRENT';
  
  // Determine cashback category pill
  let categoryPill = null;
  const config = account.cashback_config as any;
  if (config?.program?.levels) {
    // Simplified: take the first category rule from the first level for the pill
    const firstLevel = config.program.levels[0];
    if (firstLevel?.categoryRules && firstLevel.categoryRules.length > 0) {
      const rule = firstLevel.categoryRules[0];
      categoryPill = {
        label: rule.categoryName || 'Shopping',
        rate: `${rule.rate}%`,
      };
    }
  }

  return (
    <div className="flex-none xl:w-[22%] space-y-3">
      {/* Top Row: Logo + Name + Icons */}
      <div className="flex items-start gap-3">
        {/* Visa Card Icon (Orange-Red Gradient) */}
        <div className="flex-none w-10 h-10 rounded-sm bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-black">VISA</span>
        </div>
        
        {/* Account Name + Actions */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-900 truncate">
              {accountName}
            </h2>
            <button className="flex-none p-1 hover:bg-slate-200 rounded transition">
              <Settings className="w-4 h-4 text-slate-500" />
            </button>
            <button className="flex-none p-1 hover:bg-slate-200 rounded transition">
              <Database className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          
          {/* Subtext: Card Number + Owner */}
          <div className="text-sm text-slate-500 font-sans tabular-nums mt-0.5">
            {cardNumber}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {ownerName}
          </div>
        </div>
      </div>

      {/* Badges Row */}
      <div className="flex items-center gap-2">
        {isParent && (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-black uppercase bg-indigo-100 text-indigo-700 border border-indigo-200">
            PARENT
          </span>
        )}
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-black uppercase bg-emerald-100 text-emerald-700 border border-emerald-200">
          CYCLE {cycleTag}
        </span>
      </div>

      {/* Category Pill */}
      {categoryPill && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800">
          <Zap className="w-3.5 h-3.5" />
          <span className="text-xs font-bold uppercase">
            {categoryPill.rate} {categoryPill.label}
          </span>
        </div>
      )}
      
      {/* Collapse Toggle */}
      <button
        onClick={onCollapseToggle}
        className="absolute top-2 right-2 p-1.5 hover:bg-slate-200 rounded transition"
      >
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        )}
      </button>
    </div>
  );
}