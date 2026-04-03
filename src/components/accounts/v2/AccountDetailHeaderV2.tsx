"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Settings,
  Edit,
  Check,
  Copy,
  Database,
  X,
  Calendar,
  User,
  Zap,
  Hash,
  Calculator,
  Info,
  Clock,
  BarChart3,
  TrendingUp,
  PlusCircle,
  Users2,
  Briefcase,
  Loader2,
  Sparkles,
  ShieldCheck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { cn, formatMoneyVND } from "@/lib/utils";
import { Account, Category, Transaction } from "@/types/moneyflow.types";
import { AccountSpendingStats } from "@/types/cashback.types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAccountTypeLabel } from "@/lib/account-utils";
import { getCreditCardAvailableBalance } from "@/lib/account-balance";
import { AccountSlideV2 } from "./AccountSlideV2";
import { formatCycleTag, formatCycleTagWithYear } from "@/lib/cycle-utils";
import { updateAccountInfo } from "@/actions/account-actions";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { isToday, isTomorrow, differenceInDays, startOfDay } from "date-fns";
import { normalizeCashbackConfig } from "@/lib/cashback";
import { normalizeMonthTag } from "@/lib/month-tag";
import { resolveTransactionCycleTag } from "@/lib/cycle-utils";

interface AccountDetailHeaderV2Props {
  account: Account;
  allAccounts: Account[];
  categories: Category[];
  cashbackStats: AccountSpendingStats | null;
  isCashbackLoading?: boolean;
  initialTransactions: Transaction[];

  selectedYear: string | null;
  availableYears: string[];
  onYearChange: (year: string | null) => void;
  selectedCycle?: string; // For dynamic cashback badge display
  summary?: {
    yearDebtTotal: number;
    debtTotal: number;
    expensesTotal: number;
    cashbackTotal: number;
    yearExpensesTotal?: number;
    yearPureIncomeTotal?: number;
    yearPureExpenseTotal?: number;
    yearLentTotal?: number;
    yearRepaidTotal?: number;
    pendingCount?: number;
    targetYear?: number;
    cardYearlyCashbackTotal?: number;
    cardYearlyCashbackGivenTotal?: number;
    netProfitYearly?: number;
    yearTotalInflow?: number;
    yearTotalOutflow?: number;
  };
  isLoadingPending?: boolean;
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const formatVNShort = (amount: number) => {
  const absAmount = Math.abs(amount);
  if (absAmount >= 1_000_000_000)
    return `${(amount / 1_000_000_000).toFixed(1)} B`;
  if (absAmount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} M`;
  if (absAmount >= 1_000) return `${(amount / 1_000).toFixed(0)} k`;
  return amount.toString();
};

// Shared utility imported from @/lib/cycle-utils

export function AccountDetailHeaderV2({
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
}: AccountDetailHeaderV2Props) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSlideOpen, setIsSlideOpen] = React.useState(false);
  const [dynamicCashbackStats, setDynamicCashbackStats] =
    React.useState<AccountSpendingStats | null>(cashbackStats);
  // Use passed loading prop or fall back to false
  const effectiveIsCashbackLoading = isCashbackLoading ?? false;
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isAccountIdCopied, setIsAccountIdCopied] = React.useState(false);

  // Sync selected year with URL
  React.useEffect(() => {
    const urlYear = searchParams.get("year");
    if (urlYear && urlYear !== selectedYear) {
      onYearChange(urlYear);
    }
  }, [searchParams, selectedYear, onYearChange]);

  const handleYearChange = (year: string | null) => {
    startTransition(() => {
      onYearChange(year);
      const params = new URLSearchParams(searchParams.toString());
      if (year) params.set("year", year);
      else params.delete("year");
      router.push(`?${params.toString()}`, { scroll: false });
      router.refresh();
    });
  };

  const isCreditCard = account.type === "credit_card";
  const currentYear = new Date().getFullYear().toString();
  const isHistoricalYear = !!selectedYear && selectedYear !== currentYear;

  const availableBalance = isCreditCard
    ? getCreditCardAvailableBalance(account)
    : (account.current_balance ?? 0);
  const outstandingBalance = isCreditCard
    ? Math.abs(account.current_balance ?? 0)
    : 0;

  // Family Balance Calculation
  const isParent = !!account.relationships?.is_parent;
  const balParentId = account.parent_account_id || account.relationships?.parent_info?.id;
  const parentAccount = isParent ? account : (balParentId ? allAccounts.find(a => a.id === balParentId) : null);
  const accountFamilyId = isParent ? account.id : balParentId;
  const isFamily = !!accountFamilyId;

  // Calculate total family debt (Parent + All Children)
  const childrenBalancesSum = accountFamilyId
    ? allAccounts
        .filter((a) => a.parent_account_id === accountFamilyId)
        .reduce((sum, child) => sum + (child.current_balance || 0), 0)
    : 0;

  const familyDebtAbs = Math.abs((parentAccount?.current_balance || 0) + childrenBalancesSum);
  const soloDebtAbs = Math.abs(account.current_balance || 0);

  // Available Limit: Shared for family if set
  const familyLimit = parentAccount?.credit_limit || 0;
  const familyAvailableBalance = isCreditCard 
    ? Math.max(0, familyLimit - familyDebtAbs) 
    : ((parentAccount?.current_balance || 0) + childrenBalancesSum);

  const displayBalance = (isFamily && isCreditCard) ? familyAvailableBalance : availableBalance;
  const displayOutstanding = (isFamily && isCreditCard) ? familyDebtAbs : outstandingBalance;
  const displayLimit = (isFamily && isCreditCard) ? familyLimit : (account.credit_limit || 0);

  // Individual card available capacity (Solo Limit)
  const soloAvailable = isCreditCard ? (displayLimit - soloDebtAbs) : account.current_balance;


  // Cleanup 'tab' param if present (fix for persistent url)
  React.useEffect(() => {
    if (searchParams.has("tab")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tab");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  // Sync dynamic stats when props update (e.g. after router.refresh())
  React.useEffect(() => {
    setDynamicCashbackStats(cashbackStats);
  }, [cashbackStats]);

  const handleCopyAccountId = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(account.id);
      setIsAccountIdCopied(true);
      toast.success("Copied account ID");
      setTimeout(() => setIsAccountIdCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy account ID:", error);
      toast.error("Failed to copy account ID");
    }
  }, [account.id]);

  const selectedCycleMetrics = React.useMemo(() => {
    if (
      !selectedCycle ||
      selectedCycle === "all" ||
      !Array.isArray(initialTransactions)
    ) {
      return null;
    }

    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    const cycleTransactions = initialTransactions.filter((tx) => {
      if (!tx || tx.status === "void") return false;
      const txCycle = resolveTransactionCycleTag(
        tx as Transaction & {
          persisted_cycle_tag?: string | null;
          derived_cycle_tag?: string | null;
          occurred_at?: string | null;
          date?: string | null;
          created_at?: string | null;
          tag?: string | null;
        },
        account,
      );
      return txCycle === selectedCycle;
    });

    const cycleSpendRows = cycleTransactions.filter((tx: any) =>
      ["expense", "debt", "service"].includes(tx.type),
    );

    // Calculate earned (est) from cashback_entries
    const est = cycleSpendRows.reduce((sum: number, tx: any) => {
      const entries = Array.isArray(tx.cashback_entries)
        ? tx.cashback_entries
        : [];
      const entryAmount = entries.reduce((s: number, e: any) => {
        // Sum all virtual or real entries
        if (e.mode === "virtual" || e.mode === "real") {
          return s + Math.abs(Number(e.amount || 0));
        }
        return s;
      }, 0);
      return sum + entryAmount;
    }, 0);

    // Calculate shared from share fields
    const shared = cycleSpendRows.reduce((sum: number, tx: any) => {
      const sharedFixed = Number(tx.cashback_share_fixed || 0);
      const rawSharePercent = Number(tx.cashback_share_percent || 0);
      const sharePercent =
        rawSharePercent > 1 ? rawSharePercent / 100 : rawSharePercent;
      const txAmount = Math.abs(Number(tx.amount || 0));
      const computedShared = txAmount * sharePercent + sharedFixed;
      const rawShareAmount = Number(tx.cashback_share_amount ?? 0);
      const sharedAmount = rawShareAmount > 0 ? rawShareAmount : computedShared;
      return sum + (isNaN(sharedAmount) ? 0 : sharedAmount);
    }, 0);

    const actual = cycleTransactions.reduce((sum: number, tx: any) => {
      if (tx.type !== "income") return sum;
      const category = tx.category_id ? categoryMap.get(tx.category_id) : null;
      const categoryName = category?.name?.toLowerCase() || "";
      if (
        categoryName.includes("cashback") ||
        categoryName.includes("hoàn tiền")
      ) {
        return sum + Math.abs(Number(tx.amount || 0));
      }
      return sum;
    }, 0);

    return {
      est,
      shared,
      profit: est - shared,
      actual,
    };
  }, [selectedCycle, initialTransactions, categories]);


  const [isEditPopoverOpen, setIsEditPopoverOpen] = React.useState(false);
  const [editValues, setEditValues] = React.useState({
    account_number: account.account_number || "",
    receiver_name: account.receiver_name || "",
  });

  const handleSaveInfo = async () => {
    try {
      const hasChanges =
        editValues.account_number !== (account.account_number || "") ||
        editValues.receiver_name !== (account.receiver_name || "");

      if (!hasChanges) {
        setIsEditPopoverOpen(false);
        return;
      }

      const result = await updateAccountInfo(account.id, {
        account_number: editValues.account_number || undefined,
        receiver_name: editValues.receiver_name || undefined,
      });

      if (result.success) {
        toast.success("Account info updated");
        setIsEditPopoverOpen(false);
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Helper Component for Sections
  // Helper Component for Sections
  const HeaderSection = React.forwardRef<
    HTMLDivElement,
    {
      label: string;
      children: React.ReactNode;
      className?: string;
      borderColor?: string;
      badge?: React.ReactNode;
      hint?: string;
      hideHintInHeader?: boolean;
    } & React.HTMLAttributes<HTMLDivElement>
  >(
    (
      {
        label,
        children,
        className,
        borderColor = "border-slate-200",
        badge,
        hint,
        hideHintInHeader,
        ...props
      },
      ref,
    ) => (
      <div
        ref={ref}
        className={cn(
          "relative border rounded-xl px-4 py-1.5 flex flex-col group/header",
          borderColor,
          className,
        )}
        {...props}
      >
        <div className="absolute -top-2 left-3 flex items-center gap-2 z-10">
          <span className="bg-white px-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {label}
          </span>
          {hint && !hideHintInHeader && (
            <span className="text-[7px] text-slate-300 font-black uppercase tracking-widest opacity-0 group-hover/header:opacity-100 transition-all transform translate-x-2 group-hover/header:translate-x-0 duration-300">
              • {hint}
            </span>
          )}
          {badge}
        </div>
        {children}
      </div>
    ),
  );
  HeaderSection.displayName = "HeaderSection";

  const dueDateBadge = React.useMemo(() => {
    const now = startOfDay(new Date());
    let label = "";
    let dateLabel = "";
    let isUrgent = false;

    if (account.stats?.due_date) {
      const d = startOfDay(new Date(account.stats.due_date));
      dateLabel = format(d, "MMM d").toUpperCase();
      if (isToday(d)) {
        label = "Today Due";
        isUrgent = true;
      } else if (isTomorrow(d)) {
        label = "Tomorrow";
        isUrgent = true;
      } else {
        const daysLeft = differenceInDays(d, now);
        if (daysLeft < 0) {
          label = `${Math.abs(daysLeft)} Overdue`;
          isUrgent = true;
        } else {
          label = `${daysLeft} Days`.toUpperCase();
        }
      }
    } else {
      const config = normalizeCashbackConfig(account.cashback_config, account);
      const rawDueDay =
        account.due_date ||
        account.credit_card_info?.payment_due_day ||
        config?.dueDate;

      if (rawDueDay) {
        const d = new Date();
        d.setDate(rawDueDay);
        if (d < now) d.setMonth(d.getMonth() + 1);
        dateLabel = format(d, "MMM d").toUpperCase();
        const daysLeft = differenceInDays(startOfDay(d), now);

        if (daysLeft === 0) {
          label = "Today Due";
          isUrgent = true;
        } else if (daysLeft === 1) {
          label = "Tomorrow";
          isUrgent = true;
        } else {
          label = `${daysLeft} Days`.toUpperCase();
        }
      }
    }

    if (!label)
      return (
        <div className="flex items-center justify-center h-full">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter opacity-50">
            No Due Date
          </span>
        </div>
      );

    return (
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">
          Due Term
        </span>
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-black tracking-tight shadow-sm whitespace-nowrap",
            isUrgent
              ? "bg-rose-50 border-rose-200 text-rose-600 animate-pulse shadow-[0_0_10px_rgba(225,29,72,0.1)]"
              : "bg-emerald-50 border-emerald-200 text-emerald-700",
          )}
        >
          <Clock className="h-3 w-3 opacity-70" />
          <span>{label}</span>
          <span className="opacity-30">|</span>
          <Calendar className="h-3 w-3 opacity-70" />
          <span>{dateLabel}</span>
        </div>
      </div>
    );
  }, [account, startOfDay]);


  const rewardsCount = React.useMemo(() => {
    try {
      const program = normalizeCashbackConfig(account.cashback_config, account);
      const counts = (program.levels || []).reduce(
        (acc: number, lvl: any) => acc + (lvl.rules?.length || 0),
        0,
      );
      if (counts > 0) return counts;
      if (program.defaultRate > 0) return 1;
      return 0;
    } catch (e) {
      return 0;
    }
  }, [account.cashback_config]);

  const cycleMetricSnapshot = React.useMemo(() => {
    const activeRuleEarned = (dynamicCashbackStats?.activeRules || []).reduce(
      (sum, rule: any) => sum + Number(rule?.earned || 0),
      0,
    );
    const derivedEst = selectedCycleMetrics?.est ?? 0;
    const derivedShared = selectedCycleMetrics?.shared ?? 0;
    const derivedProfit = selectedCycleMetrics?.profit ?? derivedEst - derivedShared;

    const snapshotEst = Number(dynamicCashbackStats?.earnedSoFar || 0);
    const snapshotShared = Number(dynamicCashbackStats?.sharedAmount || 0);

    const rawEst = selectedCycleMetrics ? derivedEst : snapshotEst;
    const estCashback = rawEst > 0 ? rawEst : activeRuleEarned;
    const sharedAmount = selectedCycleMetrics ? derivedShared : snapshotShared;
    const totalProfit = estCashback - sharedAmount;

    return {
      estCashback,
      sharedAmount,
      totalProfit,
      actualClaimed: Number(dynamicCashbackStats?.actualClaimed ?? selectedCycleMetrics?.actual ?? 0),
      currentSpend: Number(dynamicCashbackStats?.currentSpend || 0),
      source: selectedCycleMetrics ? "cycle_transactions" : "snapshot",
      activeRuleEarned,
    };
  }, [dynamicCashbackStats, selectedCycleMetrics]);

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
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex gap-4 items-stretch sticky top-0 z-60 shadow-sm transition-all duration-500">
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
      <HeaderSection label="Account" className="flex-[3] min-w-[300px] max-w-[340px] flex flex-col gap-0 py-2">
        <div className="flex items-start gap-3 flex-1 h-12">
          <div className="shrink-0 h-10 flex items-center pr-1 border-r border-slate-50">
            {account.image_url ? (
              <img src={account.image_url} alt="" className="h-10 w-auto max-w-[70px] object-contain rounded-none shadow-sm border border-slate-100" />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-slate-50 rounded-none shadow-sm">
                <span className="text-xl font-black text-slate-400 capitalize">{account.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[13px] font-black text-slate-900 leading-tight truncate uppercase tracking-tight" title={account.name}>{account.name}</h1>
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
                  <button className="text-slate-300 hover:text-indigo-500 transition-colors transform hover:scale-110"><Edit className="h-3.5 w-3.5" /></button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] z-[100] shadow-[0_20px_50px_rgba(79,70,229,0.15)] border-indigo-100 rounded-2xl" align="start">
                   <div className="space-y-4 p-2">
                    <div className="flex items-center gap-2 border-b border-slate-50 pb-2"><Edit className="h-3.5 w-3.5 text-indigo-500" /><h4 className="text-[11px] font-black uppercase text-slate-700 tracking-widest">Update Identification</h4></div>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider ml-1">Account Number</label>
                        <Input value={editValues.account_number} onChange={(e) => setEditValues((p) => ({ ...p, account_number: e.target.value }))} placeholder="Enter number..." className="h-9 text-xs font-medium bg-slate-50/50 border-slate-100 focus:bg-white transition-all shadow-sm rounded-lg" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider ml-1">Receiver Name</label>
                        <Input value={editValues.receiver_name} onChange={(e) => setEditValues((p) => ({ ...p, receiver_name: e.target.value }))} placeholder="Enter name..." className="h-9 text-xs font-medium bg-slate-50/50 border-slate-100 focus:bg-white transition-all shadow-sm rounded-lg" />
                      </div>
                    </div>
                    <button onClick={handleSaveInfo} className="w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-widest rounded-xl mt-2 shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98]">Update Details</button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] font-black text-slate-600 tracking-widest tabular-nums bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{account.account_number || "•••• •••• ••••"}</span>
              {account.receiver_name && <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px] opacity-80">{account.receiver_name}</span>}
            </div>
          </div>
        </div>

        {/* MIDDLE ROW SYSTEM (h-12) */}
        <div className="flex items-center gap-2 h-12 w-full border-t border-slate-50 mt-1 pt-1">
          <div className="flex items-center gap-2 flex-1 scrollbar-hide overflow-x-auto py-1">
            <button onClick={() => setIsSlideOpen(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all text-[9.5px] font-black uppercase tracking-[0.1em] shadow-sm"><Settings className="w-3 h-3" />CONFIG</button>
            {summary && (
              <button
                onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("open-pending-items-modal", { detail: { accountId: account.id } })); }}
                className={cn("flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[9.5px] font-black uppercase tracking-[0.1em] transition-all shadow-sm", (summary.pendingCount || 0) > 0 ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100 animate-pulse" : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100")}
              >
                {(summary.pendingCount || 0) > 0 ? (
                  <><span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600"></span></span>{summary.pendingCount} WAIT</>
                ) : <><Check className="h-3 w-3" />NO WAIT</>}
              </button>
            )}
            {isCreditCard && (
              <button
                onClick={async () => {
                  try { setIsSyncing(true); const { syncAccountCashbackAction } = await import("@/actions/account-actions"); const result = await syncAccountCashbackAction(account.id); if (result && (result as any).success) { toast.success("Sync OK"); router.refresh(); } } catch { toast.error("Sync error"); } finally { setIsSyncing(false); }
                }}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all text-[9.5px] font-black uppercase tracking-[0.1em] shadow-sm disabled:opacity-50"
              >
                {isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}SYNC
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM ROW Awards (h-10) */}
        <div className="flex items-center gap-1.5 h-10 w-full border-t border-slate-50 pt-1">
          {rewardsCount > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF9E6] border border-[#FFE082] rounded-lg cursor-help hover:bg-[#FFF3C8] transition-all group shrink-0 shadow-sm">
                  <Zap className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B] group-hover:scale-110 transition-transform" />
                  {(() => {
                    const rules = dynamicCashbackStats?.activeRules || [];
                    const program = normalizeCashbackConfig(account.cashback_config, account);
                    const displayRules = rules.length > 0 ? rules : (program.levels?.[0]?.rules || []).map((r: any) => ({ name: r.description || "Rules", rate: r.rate }));
                    const topRule = displayRules[0];
                    const remaining = rewardsCount - 1;
                    return (<>
                      <span className="text-[11px] font-black text-[#92400E] uppercase tracking-wider">{topRule?.name || "REWARDS"}</span>
                      {remaining > 0 && <span className="text-[11px] font-bold text-[#D97706] uppercase ml-1 opacity-60">+{remaining} MORE</span>}
                    </>);
                  })()}
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 border-none shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden w-[380px] z-[120]" align="start" sideOffset={12}>
                <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-4 flex justify-between items-center text-white border-b-2 border-orange-700/20">
                  <div className="flex flex-col"><span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] leading-none mb-1">PROGRAM STATUS</span><div className="flex items-center gap-2"><Zap className="h-4 w-4 fill-white/30" /><span className="text-[14px] font-black uppercase tracking-[0.1em]">Active Rewards</span></div></div>
                  <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase border border-white/20 backdrop-blur-sm">{rewardsCount} Rules Enabled</span>
                </div>
                <div className="bg-[#F8F9FB] p-5 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar shadow-inner">
                  {(() => {
                    const rules = dynamicCashbackStats?.activeRules || [];
                    const program = normalizeCashbackConfig(account.cashback_config, account);
                    const displayRules = rules.length > 0 ? rules : (program.levels || []).flatMap(l => l.rules || []).map((r: any) => ({ name: r.description || "Rules", rate: r.rate, max: r.maxReward }));
                    return displayRules.map((rule: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow space-y-3 relative overflow-hidden group/rule">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-orange-500 opacity-0 group-hover/rule:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0.5"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Rule Priority</span><div className="text-[12px] font-black text-slate-800 uppercase tracking-tight">{rule.name}</div></div>
                          <span className="text-[18px] font-black text-emerald-600 tabular-nums bg-emerald-50 px-2 rounded-lg">{rule.rate}%</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                           <div className="flex flex-1 flex-col gap-1">
                             <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400"><span>Progress</span><span>Limit Cap</span></div>
                             <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-orange-500" style={{ width: rule.max ? '40%' : '100%' }} /></div>
                           </div>
                        </div>
                        {(rule as any).max && <div className="flex items-center gap-2 text-indigo-600/70 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit border border-indigo-100/50"><Info className="h-3.5 w-3.5" /><span className="text-xs font-black uppercase tracking-wider">CAP REACHED AT: {formatMoneyVND((rule as any).max)}</span></div>}
                      </div>
                    ));
                  })()}
                  <div className="text-center py-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] italic border-t border-slate-200/50 mt-2">Detailed MCC matching required to qualify</div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </HeaderSection>

      {/* CARD 2: CREDIT HEALTH / CASH FLOW */}
      {isCreditCard ? (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <HeaderSection label="Credit Health" borderColor="border-indigo-100" className="flex-[6] min-w-[450px] bg-indigo-50/10 cursor-help flex flex-col gap-0 py-2 border-dashed">
                <div className="grid grid-cols-5 gap-3 items-start flex-1 pt-1.5 px-2">
                  <div className="flex flex-col gap-1.5 border-r border-indigo-100/50 pr-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">AVAILABLE</span>
                    <div className={cn("text-[17px] font-black tracking-tight leading-none tabular-nums drop-shadow-sm", displayBalance >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(displayBalance))}</div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 border-r border-indigo-100/50 pr-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">SOLO</span>
                    <div className={cn("text-[17px] font-black tracking-tight leading-none tabular-nums", (soloAvailable || 0) >= 0 ? "text-indigo-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(soloAvailable || 0))}</div>
                  </div>

                   <div className="flex flex-col gap-1.5 border-r border-indigo-100/50 pr-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">LIMIT</span>
                    <div className="text-[17px] font-black tracking-tight leading-none tabular-nums text-slate-900 drop-shadow-sm">{formatMoneyVND(Math.ceil(displayLimit))}</div>
                  </div>

                  <div className="flex justify-center pt-1 animate-in fade-in zoom-in duration-700">{dueDateBadge}</div>
                  <div className="flex flex-col items-end pt-1 gap-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-0.5">HEALTH</span>
                    <div className="text-[10px] font-black text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />STABLE</div>
                  </div>
                </div>

                <div className="flex items-center justify-between h-12 border-t border-slate-100/40 mt-1.5 pt-1.5 px-2">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-sm bg-indigo-400" /><span className="text-[10px] font-black text-indigo-400/80 uppercase tracking-[0.15em]">{selectedYear || currentYear} SPENDING PACE</span></div>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-black text-slate-700 tabular-nums bg-slate-50 px-3 py-0.5 rounded-lg border border-slate-100 shadow-sm">{formatMoneyVND(Math.ceil(summary?.yearPureExpenseTotal || 0))} / {formatMoneyVND(account.credit_limit || 0)}</span>
                  </div>
                </div>

                <div className="h-10 w-full border-t border-slate-100/40 pt-1.5 px-2">
                  <div className="relative w-full h-[36px] bg-slate-200/50 rounded-full overflow-hidden border border-slate-200/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] p-0.5">
                    <div
                      className={cn("h-full transition-all duration-1200 rounded-full flex items-center justify-center min-w-[5rem] shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative group", (displayLimit && (displayOutstanding / displayLimit) > 0.8) ? "bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400" : "bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-400")}
                      style={{ width: `${Math.max((displayLimit ? (displayOutstanding / displayLimit) * 100 : 0), 8)}%` }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:25px_25px] animate-[shimmer_2s_infinite_linear]"></div>
                      <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md z-10 transition-transform group-hover:scale-105">{(displayLimit ? (displayOutstanding / displayLimit) * 100 : 0).toFixed(1)}% RATIO</span>
                    </div>

                  </div>
                </div>
              </HeaderSection>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="w-[380px] p-0 border-none shadow-[0_30px_70px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden bg-white z-[110]" sideOffset={10}>
                <div className="bg-indigo-950 px-5 py-3 flex justify-between items-center text-white">
                  <div className="flex flex-col"><span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">HEALTH ANALYTICS</span><h3 className="font-black text-[13px] uppercase tracking-[0.1em] text-indigo-100 flex items-center gap-2">Credit Utilization Index <ShieldCheck className="h-4 w-4 text-emerald-400" /></h3></div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 group hover:bg-indigo-100/50 transition-colors">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Annual Spend</div>
                      <div className="text-xl font-black text-indigo-900 tabular-nums">{formatMoneyVND(summary?.yearPureExpenseTotal || 0)}</div>
                    </div>
                    <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 group hover:bg-emerald-100/50 transition-colors text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Efficiency Score</div>
                      <div className="text-xl font-black text-emerald-700 tabular-nums">9.4/10</div>
                    </div>
                  </div>
                  {!!account.annual_fee_waiver_target && (
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4 shadow-inner">
                       <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-indigo-600 to-sky-400 shadow-[0_0_10px_rgba(79,70,229,0.3)] transition-all duration-1000" style={{ width: `${Math.min(100, ((summary?.yearPureExpenseTotal || 0) / (account.annual_fee_waiver_target || 1)) * 100)}%` }} /></div>
                       <p className="text-[10px] font-semibold text-slate-400 text-center uppercase tracking-widest pt-1 border-t border-slate-200/50">Keep spending to waive annual fee</p>
                    </div>
                  )}
                </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          <HeaderSection label="Cash Flow" borderColor="border-sky-100" className="flex-1 min-w-[260px] bg-sky-50/10 flex flex-col gap-0 py-2">
            <div className="flex flex-col h-full justify-between py-1 px-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-sky-700 uppercase tracking-widest">{((summary?.yearPureIncomeTotal || 0) > 0 || (summary?.yearPureExpenseTotal || 0) > 0) ? "Net Efficiency" : "Aggregate Cashflow"}</span>
                  <span className={cn("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", ((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0) >= 0) ? "text-emerald-600" : "text-rose-600")}>
                    {formatMoneyVND(((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0)))}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm border border-sky-100"><TrendingUp className="h-6 w-6 text-sky-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-sky-200/30">
                <div className="flex flex-col gap-0.5"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Incoming</span><span className="text-[15px] font-black text-emerald-600 tabular-nums">+{formatMoneyVND(summary?.yearPureIncomeTotal || 0)}</span></div>
                <div className="flex flex-col gap-0.5 text-right"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Outgoing</span><span className="text-[15px] font-black text-rose-500 tabular-nums">-{formatMoneyVND(summary?.yearPureExpenseTotal || 0)}</span></div>
              </div>
            </div>
          </HeaderSection>
          <HeaderSection label="Available" className="flex-1 min-w-[200px] bg-emerald-50/10 flex flex-col gap-0 py-2">
             <div className="flex flex-col h-full justify-center items-center gap-2">
                <div className="p-2.5 bg-white rounded-2xl shadow-md border border-emerald-100 mb-1 animate-pulse"><Calculator className="h-7 w-7 text-emerald-500" /></div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Liquid Capital</span>
                <div className={cn("text-2xl font-black tracking-tighter tabular-nums text-center leading-none", availableBalance >= 0 ? "text-emerald-700" : "text-rose-700")}>{formatMoneyVND(Math.ceil(availableBalance))}</div>
             </div>
          </HeaderSection>
        </>
      )}

      {/* CARD 3: CASHBACK PERFORMANCE */}
      {isCreditCard && (
        <HeaderSection label="Cashback Performance" borderColor="border-emerald-100" className="flex-[6] min-w-[420px] bg-emerald-50/10 flex flex-col gap-0 py-2 relative overflow-hidden" hideHintInHeader>
          <div className="absolute top-0 right-0 p-1 opacity-20 hover:opacity-100 transition-opacity"><Sparkles className="h-4 w-4 text-emerald-400" /></div>
          <div className="flex items-start gap-5 flex-1 h-12 pt-1 px-2">
            {dynamicCashbackStats && selectedCycle && selectedCycle !== "all" ? (
              <div className="relative inline-flex items-center justify-center flex-shrink-0 group cursor-help ml-1">
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
                    const circumference = 2 * Math.PI * 28;
                    const strokeDashoffset = circumference - (progress / 100) * circumference;
                    return (
                      <>
                        <svg width="68" height="68" viewBox="0 0 68 68" className="transform -rotate-90 drop-shadow-sm">
                          <circle cx="34" cy="34" r="28" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                          <circle cx="34" cy="34" r="28" fill="none" stroke={strokeColor} strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1500 ease-out" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center transition-transform group-hover:scale-110">
                          <span className="text-[17px] font-black text-slate-900 leading-none tabular-nums tracking-tighter">{Math.round(progress)}%</span>
                          <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest mt-1 opacity-70 transition-opacity group-hover:opacity-100">{!isQualified ? "GOAL" : "EARNED"}</span>
                        </div>
                      </>
                    );
                  })()}
              </div>
            ) : <div className="h-12 w-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-emerald-50"><Calendar className="h-7 w-7 text-emerald-300" /></div>}

            {dynamicCashbackStats && selectedCycle && selectedCycle !== "all" && (
                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-2.5 pt-0.5 border-l border-emerald-100/50 pl-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Net Profit</span>
                    <span className={cn("text-[16px] font-black tabular-nums tracking-tight drop-shadow-sm", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-700" : "text-rose-700")}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Paid Back</span>
                    <span className="text-[16px] font-black text-indigo-700 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualClaimed))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-emerald-500/70 uppercase tracking-widest leading-none">Est. Earned</span>
                    <span className="text-[16px] font-black text-emerald-600 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none">Shared To Group</span>
                    <span className="text-[16px] font-black text-rose-600 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</span>
                  </div>
                </div>
            )}
          </div>

          <div className="flex items-center gap-3 h-12 border-t border-slate-100/40 mt-1.5 pt-1.5 px-2">
             <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">CYCLE CONTEXT:</span>
             <div className="flex items-center gap-2">
               {dynamicCashbackStats?.currentTierName && (
                 <div className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-950 text-white border border-indigo-900 rounded-lg shadow-sm hover:translate-y-[-1px] transition-all cursor-default group">
                   <Sparkles className="h-3 w-3 text-amber-400 fill-amber-400 group-hover:animate-spin" />
                   <span className="text-[10px] font-black uppercase tracking-[0.15em]">{dynamicCashbackStats.currentTierName} STATUS</span>
                 </div>
               )}
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                 <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-tight tabular-nums">CURRENT SPEND: {formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}</span>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-2.5 h-10 w-full border-t border-slate-100/40 pt-1.5 px-2">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-lg active:scale-95 group shrink-0">
                    <BarChart3 className="h-4 w-4 group-hover:rotate-12 transition-transform" />ANALYTICS REPORT
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-[600px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>
                  <div className="bg-white">
                    {/* Header Image Restore Logic Block from Fresh Restore */}
                    <div className="bg-emerald-950 px-6 py-4 flex justify-between items-center text-white relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-transparent pointer-events-none" />
                      <div className="flex flex-col relative z-10"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 leading-none mb-1.5">INTUITION ENGINE V3</span><h3 className="font-black text-[16px] uppercase tracking-[0.1em] text-white flex items-center gap-3">PERFORMANCE ANALYTICS <div className="h-px w-8 bg-emerald-500" /></h3></div>
                      <div className="relative z-10 p-2 bg-emerald-900/40 rounded-full border border-emerald-800/50"><Zap className="h-6 w-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" /></div>
                    </div>
                    
                    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth">
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
                    {(() => {
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
                    })()}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-2.5 px-4 py-2 bg-indigo-600 text-white rounded-xl border border-indigo-700 shadow-lg ml-auto hover:bg-indigo-700 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 group">
              <Calendar className="h-4 w-4 text-indigo-300 group-hover:text-white transition-colors" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-none drop-shadow-sm">{dynamicCashbackStats?.cycle?.label || selectedCycle || "NOT SET"}</span>
            </div>
          </div>
        </HeaderSection>
      )}
    </div>
  );
}
