"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Database,
  Zap,
  Calendar,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { cn, formatMoneyVND } from "@/lib/utils";
import { Account, Category, Transaction } from "@/types/moneyflow.types";
import { AccountSpendingStats } from "@/types/cashback.types";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAccountHeaderViewModel } from "./useAccountHeaderViewModel";
import { toast } from "sonner";

interface AccountDetailHeaderRedesignProps {
  account: Account;
  allAccounts: Account[];
  categories: Category[];
  cashbackStats: AccountSpendingStats | null;
  isCashbackLoading?: boolean;
  initialTransactions: Transaction[];
  selectedYear: string | null;
  availableYears: string[];
  onYearChange: (year: string | null) => void;
  selectedCycle?: string;
  summary?: Record<string, unknown>;
  isLoadingPending?: boolean;
  pendingBatchCount?: number;
  pendingRefundCount?: number;
  pendingRefundAmount?: number;
}

const formatVNShort = (amount: number) => {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(0)}k`;
  return `${sign}${abs}`;
};

export function AccountDetailHeaderRedesign({
  account,
  allAccounts,
  categories,
  cashbackStats,
  isCashbackLoading,
  initialTransactions,
  selectedYear,
  availableYears,
  onYearChange,
  selectedCycle,
  summary,
  isLoadingPending,
}: AccountDetailHeaderRedesignProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAccountIdCopied, setIsAccountIdCopied] = useState(false);

  const viewModel = useAccountHeaderViewModel({
    account,
    cashbackStats,
    summary,
    selectedCycle,
  });

  const handleCopyAccountId = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(account.id);
      setIsAccountIdCopied(true);
      toast.success("Copied account ID");
      setTimeout(() => setIsAccountIdCopied(false), 1500);
    } catch {
      toast.error("Failed to copy account ID");
    }
  }, [account.id]);

  const handleOpenPocketBase = React.useCallback(() => {
    window.open(
      `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_acc_001&filter=${account.id}&sort=-%40rowid&recordId=${account.id}`,
      "_blank",
    );
  }, [account.id]);

  return (
    <Card className="bg-slate-50 border-slate-200 shadow-sm mx-0 rounded-none border-x-0 border-t-0">
      <div className="relative">
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-2 right-2 z-20 p-1 hover:bg-slate-200 rounded transition-colors"
          aria-label={isCollapsed ? "Expand header" : "Collapse header"}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isCollapsed ? (
            /* ======================== COLLAPSED MODE ======================== */
            <motion.div
              key="collapsed"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-4 px-4 py-2 pr-10">
                {/* Logo */}
                <div className="shrink-0">
                  {account.image_url ? (
                    <img
                      src={account.image_url}
                      alt=""
                      className="h-8 w-auto max-w-[56px] object-contain rounded-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <span className="text-white text-[9px] font-black">
                        {account.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name + Number */}
                <div className="min-w-0 flex-shrink">
                  <div className="text-[12px] font-black text-slate-900 truncate uppercase tracking-tight">
                    {account.name}
                  </div>
                  <div className="text-[10px] text-slate-400 tabular-nums truncate">
                    {account.account_number || "N/A"}
                  </div>
                </div>

                {/* Quick Badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {viewModel.identity.isParent && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-indigo-100 text-indigo-700 border border-indigo-200">
                      PARENT
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-100 text-emerald-700 border border-emerald-200">
                    {viewModel.identity.cycleTag}
                  </span>
                </div>

                {/* Dashed Divider */}
                <div className="h-6 w-px border-l border-dashed border-slate-300" />

                {/* Quick Balance */}
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                      Available
                    </div>
                    <div className="text-[13px] font-bold text-emerald-600 tabular-nums">
                      {formatVNShort(viewModel.balance.available)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                      Solo
                    </div>
                    <div className="text-[13px] font-bold text-indigo-600 tabular-nums">
                      {formatVNShort(viewModel.balance.solo)}
                    </div>
                  </div>
                </div>

                {/* Dashed Divider */}
                <div className="h-6 w-px border-l border-dashed border-slate-300" />

                {/* Quick Performance */}
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                      Net Profit
                    </div>
                    <div className="text-[13px] font-bold text-emerald-600 tabular-nums">
                      {formatVNShort(viewModel.performance.netProfit)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest">
                      Goal
                    </div>
                    <div className="text-[13px] font-bold text-indigo-600 tabular-nums">
                      {viewModel.performance.goalPercent.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ======================== EXPANDED MODE ======================== */
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col xl:flex-row gap-0 p-4 pr-10">
                {/* ======== SECTION 1: ACCOUNT INFO (22%) ======== */}
                <div className="flex-none xl:w-[22%] space-y-2.5 pr-4">
                  {/* Top: Logo + Name + Actions */}
                  <div className="flex items-start gap-2.5">
                    {/* Bank Logo / Card Icon */}
                    <div className="flex-none">
                      {account.image_url ? (
                        <img
                          src={account.image_url}
                          alt=""
                          className="h-10 w-auto max-w-[64px] object-contain rounded-sm shadow-sm border border-slate-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-black">
                            {account.name.substring(0, 3).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name + Icons */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-[14px] font-black text-slate-900 truncate uppercase tracking-tight leading-tight">
                          {account.name}
                        </h2>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={handleCopyAccountId}
                                className={cn(
                                  "text-slate-300 hover:text-emerald-600 transition-colors",
                                  isAccountIdCopied && "text-emerald-500",
                                )}
                              >
                                {isAccountIdCopied ? (
                                  <Check className="h-3 w-3" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Copy account ID</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={handleOpenPocketBase}
                                className="text-slate-300 hover:text-amber-600 transition-colors"
                              >
                                <Database className="h-3.5 w-3.5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Open in PocketBase</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                          <Settings className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Subtext: Card Number + Owner */}
                      <div className="text-[11px] text-slate-500 tabular-nums mt-0.5 truncate">
                        {viewModel.identity.cardNumber}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {viewModel.identity.ownerName}
                      </div>
                    </div>
                  </div>

                  {/* Badges Row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {viewModel.identity.isParent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-100 text-indigo-700 border border-indigo-200">
                        PARENT
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-700 border border-emerald-200">
                      <Calendar className="h-3 w-3" />
                      {viewModel.identity.cycleTag}
                    </span>
                  </div>

                  {/* Category Pill */}
                  {viewModel.identity.categoryPill && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
                      <Zap className="w-3 h-3 fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-tight">
                        {viewModel.identity.categoryPill.rate}{" "}
                        {viewModel.identity.categoryPill.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Vertical Dashed Divider */}
                <div className="hidden xl:block w-px border-l border-dashed border-slate-300 mx-1" />

                {/* ======== SECTION 2: BALANCE & HEALTH (30%) ======== */}
                <div className="flex-none xl:w-[30%] space-y-2 px-3">
                  {/* Top: Balance label + Health + Status badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Balance
                      </span>
                      <span
                        className={cn(
                          "px-1.5 py-0.5 rounded text-[8px] font-black uppercase",
                          viewModel.balance.healthStatus === "good" &&
                            "bg-emerald-100 text-emerald-700",
                          viewModel.balance.healthStatus === "warning" &&
                            "bg-amber-100 text-amber-700",
                          viewModel.balance.healthStatus === "danger" &&
                            "bg-rose-100 text-rose-700",
                        )}
                      >
                        Health
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-indigo-50 text-indigo-600 border border-indigo-100">
                        <Clock className="h-2.5 w-2.5" />
                        {viewModel.balance.daysRemaining} Days
                      </span>
                      {viewModel.balance.isNoWait && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
                          No Wait
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle: 3-Column Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Available
                      </div>
                      <div className="text-[18px] font-bold text-emerald-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.balance.available)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Solo
                      </div>
                      <div className="text-[18px] font-bold text-indigo-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.balance.solo)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Limit
                      </div>
                      <div className="text-[18px] font-bold text-slate-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.balance.limit)}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Ratio Pill */}
                  <div className="relative h-7 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, viewModel.balance.ratio)}%`,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="relative h-full flex items-center justify-between px-3">
                      <span className="text-[10px] font-black uppercase text-white mix-blend-difference">
                        Ratio {viewModel.balance.ratio.toFixed(1)}%
                      </span>
                      <span className="text-[10px] font-bold text-slate-600 tabular-nums">
                        Pace {formatVNShort(viewModel.balance.paceAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vertical Dashed Divider */}
                <div className="hidden xl:block w-px border-l border-dashed border-slate-300 mx-1" />

                {/* ======== SECTION 3: PERFORMANCE (48%) ======== */}
                <div className="flex-1 space-y-2 pl-3">
                  {/* Top: Performance label + CB Perf badge + Analytics */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Performance
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-indigo-100 text-indigo-700 border border-indigo-200">
                        CB Perf
                      </span>
                    </div>
                    <button className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-500 hover:bg-slate-200 rounded transition border border-transparent hover:border-slate-200">
                      <BarChart3 className="w-3 h-3" />
                      Analytics
                    </button>
                  </div>

                  {/* Middle: 5-Column Grid */}
                  <div className="grid grid-cols-5 gap-1.5">
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Net Profit
                      </div>
                      <div className="text-[16px] font-bold text-emerald-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.performance.netProfit)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Claimed
                      </div>
                      <div className="text-[16px] font-bold text-rose-500 tabular-nums leading-tight">
                        {formatVNShort(viewModel.performance.actualClaimed)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Est.
                      </div>
                      <div className="text-[16px] font-bold text-amber-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.performance.estEarned)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Actual
                      </div>
                      <div className="text-[16px] font-bold text-blue-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.performance.actualEarn)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-slate-400 tracking-widest">
                        Shared
                      </div>
                      <div className="text-[16px] font-bold text-indigo-600 tabular-nums leading-tight">
                        {formatVNShort(viewModel.performance.sharedToGroup)}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Goal Pill + Date Range */}
                  <div className="flex items-center gap-2">
                    {/* Goal Progress Pill */}
                    <div className="flex-1 relative h-7 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, viewModel.performance.goalPercent)}%`,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <div className="relative h-full flex items-center justify-between px-3">
                        <span className="text-[10px] font-black uppercase text-white mix-blend-difference">
                          Goal {viewModel.performance.goalPercent.toFixed(0)}%
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-bold text-amber-700 tabular-nums">
                            Needs {formatVNShort(viewModel.performance.needsAmount)}
                          </span>
                          <span className="text-slate-400 text-[10px]">|</span>
                          <span className="text-[9px] font-bold text-slate-600 tabular-nums">
                            Spent {formatVNShort(viewModel.performance.spentAmount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Date Range Button */}
                    <button className="flex-none px-3 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold hover:bg-indigo-700 transition shadow-sm">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {viewModel.performance.cycleRange}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}