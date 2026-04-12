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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAccountTypeLabel } from "@/lib/account-utils";
import { getCreditCardAvailableBalance } from "@/lib/account-balance";
import { AccountSlideV2 } from "./AccountSlideV2";
import { AccountPendingItemsModal } from "./AccountPendingItemsModal";
import { formatCycleTag, formatCycleTagWithYear } from "@/lib/cycle-utils";
import { updateAccountInfo } from "@/actions/account-actions";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { isToday, isTomorrow, differenceInDays, startOfDay } from "date-fns";
import { normalizeCashbackConfig } from "@/lib/cashback";
import { normalizeMonthTag } from "@/lib/month-tag";
import { resolveTransactionCycleTag } from "@/lib/cycle-utils";
import { computeAccountTotals } from "@/lib/account-balance";
import { Hourglass, Clock as ClockIcon } from "lucide-react";

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

const toDisplayPercent = (rate: number | string) => {
  const parsed = typeof rate === "string" ? Number(rate.replace("%", "").trim()) : Number(rate);
  if (!Number.isFinite(parsed)) return "0";
  const normalized = parsed <= 1 ? parsed * 100 : parsed;
  return Number.isInteger(normalized) ? normalized.toFixed(0) : normalized.toFixed(2);
};

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
   const [isHeaderCollapsed, setIsHeaderCollapsed] = React.useState(true);
   const [isRewardsPopoverOpen, setIsRewardsPopoverOpen] = React.useState(false);
   const [selectedRuleTierKey, setSelectedRuleTierKey] = React.useState<string>("");
   const [isPendingModalOpen, setIsPendingModalOpen] = React.useState(false);
   const [isExpanded, setIsExpanded] = React.useState(true);

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

  const ledgerBalance = React.useMemo(() => {
    const totals = computeAccountTotals({
      accountId: account.id,
      accountType: account.type,
      transactions: initialTransactions.map((txn: any) => ({
        amount: txn?.amount ?? 0,
        final_price: txn?.final_price ?? null,
        type: txn?.type ?? null,
        account_id: txn?.account_id ?? null,
        target_account_id: txn?.target_account_id ?? txn?.to_account_id ?? null,
        status: txn?.status ?? null,
      })),
    });

    return totals.currentBalance;
  }, [account.id, account.type, initialTransactions]);

  const availableBalance = isCreditCard
    ? getCreditCardAvailableBalance({
        type: account.type,
        credit_limit: account.credit_limit ?? 0,
        current_balance: ledgerBalance,
      })
    : ledgerBalance;
  const outstandingBalance = isCreditCard
    ? Math.abs(ledgerBalance)
    : 0;

  // Family Balance Calculation
  const accountSlug = (account as any)?.slug as string | undefined;
  const hasChildren = allAccounts.some((item) => {
    const itemParentId = item.parent_account_id || item.relationships?.parent_info?.id || null;
    return itemParentId === account.id || (accountSlug ? itemParentId === accountSlug : false);
  });
  const isParent = !!account.relationships?.is_parent || hasChildren;
  const rawParentRef = account.parent_account_id || account.relationships?.parent_info?.id || null;
  const directParentAcc = isParent
    ? null
    : allAccounts.find(
        (item) =>
          item.id === rawParentRef ||
          (((item as any)?.slug as string | undefined) && ((item as any).slug === rawParentRef)),
      );
  const inferredParentAcc = isParent
    ? null
    : allAccounts.find((item) =>
        (item.relationships?.child_accounts || []).some(
          (child: any) =>
            child.id === account.id ||
            child.id === rawParentRef ||
            (accountSlug ? child.id === accountSlug : false),
        ),
      );
  const effectiveParentAcc = directParentAcc || inferredParentAcc || null;
  const parentAccount = isParent ? account : effectiveParentAcc;

  const familyMemberIds = React.useMemo(() => {
    const knownChildIds = new Set<string>(
      ((isParent
        ? account.relationships?.child_accounts
        : effectiveParentAcc?.relationships?.child_accounts) || [])
        .map((child: any) => String(child?.id || ""))
        .filter(Boolean),
    );
    const groupRefs = new Set<string>();
    if (isParent) {
      groupRefs.add(account.id);
      if (accountSlug) groupRefs.add(accountSlug);
    } else {
      if (rawParentRef) groupRefs.add(rawParentRef);
      if (effectiveParentAcc?.id) groupRefs.add(effectiveParentAcc.id);
      const parentSlug = (effectiveParentAcc as any)?.slug as string | undefined;
      if (parentSlug) groupRefs.add(parentSlug);
      if (!rawParentRef && !effectiveParentAcc) {
        groupRefs.add(account.id);
        if (accountSlug) groupRefs.add(accountSlug);
      }
    }

    const relatedIds = new Set<string>(
      allAccounts
        .filter(
          (item) =>
            knownChildIds.has(item.id) ||
            groupRefs.has(item.id) ||
            groupRefs.has(item.parent_account_id || ""),
        )
        .map((item) => item.id),
    );
    relatedIds.add(account.id);
    return relatedIds;
  }, [account, allAccounts, isParent, effectiveParentAcc, rawParentRef, accountSlug]);
  const isStandalone = !isParent && !effectiveParentAcc;
  const isFamily = !isStandalone;

  const familyDebtAbs = Math.abs(
    allAccounts
      .filter((item) => familyMemberIds.has(item.id))
      .reduce((sum, item) => sum + (item.current_balance || 0), 0),
  );
  const soloDebtAbs = Math.abs(ledgerBalance || 0);

  // Available Limit: Shared for family if set
  const familyLimit = parentAccount?.credit_limit || account.credit_limit || 0;
  const familyAvailableBalance = isCreditCard 
    ? Math.max(0, familyLimit - familyDebtAbs) 
    : allAccounts
        .filter((item) => familyMemberIds.has(item.id))
        .reduce((sum, item) => sum + (item.current_balance || 0), 0);

  const familyRoleLabel = isParent
    ? "Parent"
    : isStandalone
      ? "Standalone"
      : "Child";
  const statementDayValue = account.statement_day ?? account.credit_card_info?.statement_day ?? null;
  const normalizedCashbackConfig = normalizeCashbackConfig(account.cashback_config as any);
  const cashbackCycleType = String(
    (account as any).cb_cycle_type ||
      normalizedCashbackConfig.program?.cycleType ||
      normalizedCashbackConfig.cycleType ||
      "",
  ).toLowerCase();
  const isMonthlyCycle = cashbackCycleType === "calendar_month";
  const isStatementCycle = cashbackCycleType === "statement_cycle";
  const shouldShowCycleBadge = isMonthlyCycle || isStatementCycle || (isCreditCard && Number(statementDayValue || 0) > 0);
  const cycleBadgeText = isMonthlyCycle
    ? "Monthly"
    : Number(statementDayValue || 0) > 0
      ? `Cycle ${statementDayValue}`
      : "Cycle";

  const displayBalance = (isFamily && isCreditCard) ? familyAvailableBalance : availableBalance;
  const displayOutstanding = (isFamily && isCreditCard) ? familyDebtAbs : outstandingBalance;
  const displayLimit = (isFamily && isCreditCard) ? familyLimit : (account.credit_limit || 0);

  // Individual card available capacity (Solo Limit)
  const soloAvailable = isCreditCard ? (displayLimit - soloDebtAbs) : ledgerBalance;


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

  const handleOpenPocketBase = React.useCallback(() => {
    window.open(
      `https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_acc_001&filter=${account.id}&sort=-%40rowid&recordId=${account.id}`,
      "_blank",
    );
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

    // Estimate cashback from policy metadata first, fallback to cashback entries.
    const est = cycleSpendRows.reduce((sum: number, tx: any) => {
      const policy = tx?.metadata?.cashback_policy;
      const txAmount = Math.abs(Number(tx.amount || 0));
      const policyRate = Number(policy?.rate || 0);
      const policyCap = Number(policy?.ruleMaxReward || 0);
      if (policyRate > 0) {
        const byRate = txAmount * policyRate;
        const byPolicy = policyCap > 0 ? Math.min(byRate, policyCap) : byRate;
        return sum + byPolicy;
      }

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

  const collapsedDueInfo = React.useMemo(() => {
    const now = startOfDay(new Date());
    const config = normalizeCashbackConfig(account.cashback_config, account);
    const rawDueDay = account.due_date || account.credit_card_info?.payment_due_day || config?.dueDate;
    if (!rawDueDay) return "-";
    const d = new Date();
    d.setDate(rawDueDay);
    if (d < now) d.setMonth(d.getMonth() + 1);
    const daysLeft = Math.max(0, differenceInDays(startOfDay(d), now));
    return `${daysLeft} DAYS | ${format(d, "MMM d").toUpperCase()}`;
  }, [account, startOfDay]);

  const collapsedCycleLabel = React.useMemo(() => {
    const start = dynamicCashbackStats?.cycle?.start;
    const end = dynamicCashbackStats?.cycle?.end;
    if (start && end) {
      const s = new Date(start);
      const e = new Date(end);
      if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime())) {
        return `${format(s, "dd.MM")} - ${format(e, "dd.MM")}`;
      }
    }
    return dynamicCashbackStats?.cycle?.label || "CYCLE";
  }, [dynamicCashbackStats]);

  const categoryNameById = React.useMemo(
    () => new Map((categories || []).map((c: any) => [String(c?.id || ""), String(c?.name || "")])),
    [categories],
  );

  const buildCategoryLabel = React.useCallback((catIds: string[] | undefined) => {
    if (!Array.isArray(catIds) || catIds.length === 0) return "Cashback Online";
    const names = Array.from(
      new Set(
        catIds
          .map((id: string) => categoryNameById.get(String(id)))
          .map((name) => String(name || "").trim())
          .filter(Boolean),
      ),
    );
    if (names.length === 1) return names[0];
    if (names.length > 1) return names[0];
    return "Cashback Online";
  }, [categoryNameById]);

  const fallbackRules = React.useMemo(() => {
    const program = normalizeCashbackConfig(account.cashback_config, account);
    const isSimpleRuleConfig =
      String((account as any)?.cb_type || "").toLowerCase() === "simple" ||
      Array.isArray((program as any).rules_json_v2) ||
      Array.isArray((account as any).cb_rules_json);

    const levelRules = (program.levels || []).flatMap((level: any) => {
      const minSpend = Number(level?.minTotalSpend || level?.min_spend || 0);
      const levelName = String(level?.name || "").trim();
      return (level?.rules || []).map((rule: any) => {
        const catIds = Array.isArray(rule?.categoryIds)
          ? rule.categoryIds.map((id: any) => String(id))
          : rule?.categoryId
            ? [String(rule.categoryId)]
            : [];
        return {
          name: String(rule?.description || "").trim() || buildCategoryLabel(catIds),
          rate: Number(rule?.rate || 0),
          max: Number(rule?.maxReward ?? rule?.max ?? 0),
          minSpend,
          tierName: levelName,
          categoryIds: catIds,
        };
      });
    });

    // Only parse raw array rules for simple config to avoid duplicate with levelRules.
    const rawProgramRules = Array.isArray((program as any).rules_json_v2)
      ? (program as any).rules_json_v2.map((rule: any) => ({
          name: buildCategoryLabel((rule?.cat_ids || []).map((id: any) => String(id))),
          rate: Number(rule?.rate || 0),
          max: Number(rule?.max || 0),
          minSpend: Number(program?.minSpendTarget || account?.cb_min_spend || 0),
          tierName: "",
          categoryIds: Array.isArray(rule?.cat_ids) ? rule.cat_ids.map((id: any) => String(id)) : [],
        }))
      : [];

    const rawLegacyRules = Array.isArray((account as any).cb_rules_json)
      ? (account as any).cb_rules_json.map((rule: any) => ({
          name: buildCategoryLabel((rule?.cat_ids || []).map((id: any) => String(id))),
          rate: Number(rule?.rate || 0),
          max: Number(rule?.max || 0),
          minSpend: Number(account?.cb_min_spend || 0),
          tierName: "",
          categoryIds: Array.isArray(rule?.cat_ids) ? rule.cat_ids.map((id: any) => String(id)) : [],
        }))
      : [];

    const merged = (
      isSimpleRuleConfig
        ? (rawProgramRules.length > 0 ? rawProgramRules : rawLegacyRules)
        : [...levelRules, ...rawProgramRules, ...rawLegacyRules]
    ).filter(
      (rule: any) => Number(rule?.rate || 0) > 0,
    );

    const seen = new Set<string>();
    return merged.filter((rule: any) => {
      const catKey = Array.isArray(rule?.categoryIds) ? [...rule.categoryIds].sort().join(",") : "";
      const key = [
        String(rule?.name || "").trim().toLowerCase(),
        Number(rule?.rate || 0).toFixed(4),
        Number(rule?.max || 0).toFixed(2),
        Number(rule?.minSpend || 0).toFixed(2),
        catKey,
      ].join("::");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [account, buildCategoryLabel]);

  const rewardRuleTabs = React.useMemo(() => {
    const isSimpleCard = String((account as any)?.cb_type || "").toLowerCase() === "simple";
    const values = Array.from(
      new Set(
        fallbackRules
          .map((rule: any) => Number(rule?.minSpend || 0))
          .filter((minSpend) => !isSimpleCard || minSpend > 0),
      ),
    ).sort((a, b) => a - b);

    const tabs = values.map((minSpend, idx) => {
      const matchingRules = fallbackRules.filter((rule: any) => Number(rule?.minSpend || 0) === minSpend);
      const topRule = matchingRules[0];
      const rateText = `${toDisplayPercent(topRule?.rate || 0)}%`;
      const tierText = isSimpleCard
        ? `${formatVNShort(minSpend)}+`
        : topRule?.tierName || `Tier ${idx + 1}`;

      return {
        key: `tier-${minSpend}-${idx}`,
        minSpend,
        rate: Number(topRule?.rate || 0),
        tierName: String(topRule?.tierName || "").trim(),
        label: isSimpleCard ? tierText : `${rateText}: ${tierText}`,
      };
    });

    if (isSimpleCard) return tabs;

    return [{ key: "all", minSpend: -1, rate: 0, tierName: "All", label: "All" }, ...tabs];
  }, [fallbackRules, account]);

  const selectedRuleTier = React.useMemo(
    () => rewardRuleTabs.find((tab) => tab.key === selectedRuleTierKey) || rewardRuleTabs[0],
    [rewardRuleTabs, selectedRuleTierKey],
  );

  React.useEffect(() => {
    if (selectedRuleTierKey || rewardRuleTabs.length <= 1) return;
    const spent = Number(dynamicCashbackStats?.currentSpend || 0);
    const tiersOnly = rewardRuleTabs.filter((tab) => tab.key !== "all");
    const matched = tiersOnly
      .filter((tab) => Number(tab.minSpend || 0) <= spent)
      .sort((a, b) => Number(b.minSpend || 0) - Number(a.minSpend || 0))[0];
    setSelectedRuleTierKey(matched?.key || "all");
  }, [selectedRuleTierKey, rewardRuleTabs, dynamicCashbackStats?.currentSpend]);

  const filteredDisplayRules = React.useMemo(() => {
    if (!selectedRuleTier || selectedRuleTier.key === "all") return fallbackRules;
    return fallbackRules.filter((rule: any) => Number(rule?.minSpend || 0) === Number(selectedRuleTier.minSpend));
  }, [fallbackRules, selectedRuleTier]);

  const tierGuidanceText = React.useMemo(() => {
    if (!selectedRuleTier || selectedRuleTier.key === "all") return "Showing all reward rules";
    const spent = Number(dynamicCashbackStats?.currentSpend || 0);
    const threshold = Number(selectedRuleTier.minSpend || 0);
    if (threshold <= 0) return "Base tier active";
    if (spent >= threshold) return `Tier unlocked at ${formatMoneyVND(threshold)}`;
    return `Need ${formatMoneyVND(threshold - spent)} more to unlock this tier`;
  }, [dynamicCashbackStats?.currentSpend, selectedRuleTier]);

  const rewardsCount = filteredDisplayRules.length;

  const cycleMetricSnapshot = React.useMemo(() => {
    const activeRuleEarned = (dynamicCashbackStats?.activeRules || []).reduce(
      (sum, rule: any) => sum + Number(rule?.earned || 0),
      0,
    );
    const activeRuleCap = (dynamicCashbackStats?.activeRules || []).reduce(
      (sum, rule: any) => sum + Number(rule?.max || 0),
      0,
    );
    const normalizedProgram = normalizeCashbackConfig(account.cashback_config, account);
    const capCandidates = [
      Number(dynamicCashbackStats?.maxCashback || 0),
      Number(normalizedProgram?.maxBudget || 0),
      Number(activeRuleCap || 0),
    ].filter((value) => Number.isFinite(value) && value > 0);
    const effectiveCycleCap = capCandidates.length > 0 ? Math.min(...capCandidates) : 0;

    const derivedEst = selectedCycleMetrics?.est ?? 0;
    const derivedShared = selectedCycleMetrics?.shared ?? 0;
    const derivedProfit = selectedCycleMetrics?.profit ?? derivedEst - derivedShared;

    const snapshotEst = Number(dynamicCashbackStats?.earnedSoFar || 0);
    const snapshotShared = Number(dynamicCashbackStats?.sharedAmount || 0);

    const rawEstCashback = selectedCycleMetrics
      ? derivedEst
      : snapshotEst > 0
        ? snapshotEst
        : activeRuleEarned;
    const estCashback =
      effectiveCycleCap > 0 ? Math.min(rawEstCashback, effectiveCycleCap) : rawEstCashback;
    const rawActualEarn = selectedCycleMetrics
      ? rawEstCashback
      : snapshotEst > 0
        ? snapshotEst
        : activeRuleEarned;
    const actualEarn = rawActualEarn;
    const sharedAmount = selectedCycleMetrics ? derivedShared : snapshotShared;
    const totalProfit = selectedCycleMetrics ? derivedProfit : estCashback - sharedAmount;

    return {
      estCashback,
      actualEarn,
      sharedAmount,
      totalProfit,
      actualClaimed: Number(dynamicCashbackStats?.actualClaimed ?? selectedCycleMetrics?.actual ?? 0),
      currentSpend: Number(dynamicCashbackStats?.currentSpend || 0),
      source: selectedCycleMetrics ? "cycle_transactions" : "snapshot",
      activeRuleEarned,
      effectiveCycleCap,
    };
  }, [account, dynamicCashbackStats, selectedCycleMetrics]);

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
  const pendingCount = summary?.pendingCount || 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 w-full">
      <div className="flex xl:flex-row flex-col gap-6">
        {/* Section 1: Account Info (22%) */}
        <div className="flex flex-col w-full xl:w-[22%] h-full justify-between">
          <div className="flex items-center gap-3 mb-4">
            {account.image_url ? (
              <img src={account.image_url} alt="" className="w-10 h-10 object-contain rounded-sm" />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-slate-50 rounded-sm">
                <span className="text-lg font-black text-slate-400 capitalize">{account.name.charAt(0)}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-[18px] font-extrabold text-slate-900 truncate uppercase tracking-tight">{account.name}</h1>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => setIsSlideOpen(true)} className="text-slate-300 hover:text-indigo-600 transition-colors" aria-label="Open settings">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button onClick={handleOpenPocketBase} className="text-slate-300 hover:text-amber-600 transition-colors" aria-label="Open in PocketBase admin" target="_blank">
                    <Database className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider whitespace-nowrap overflow-hidden text-ellipsis flex flex-row items-center gap-2">
                  {account.account_number || "N/A"} {account.receiver_name || ""}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border-indigo-200 cursor-help">
                    <User className="h-3 w-3" />
                    {isParent ? "PARENT" : "CHILD"}
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Account Role</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200 cursor-help">
                    <Calendar className="h-3 w-3" />
                    {cycleBadgeText}
                  </span>
                </TooltipTrigger>
                <TooltipContent><p>Current Cycle</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex flex-col mt-auto">
            <Popover open={isRewardsPopoverOpen} onOpenChange={setIsRewardsPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="w-[90%] flex items-center justify-center gap-2 h-8 bg-amber-50 border border-amber-200 rounded-full cursor-pointer hover:bg-amber-100 transition-colors group">
                  <Zap className="h-4 w-4 text-amber-600 group-hover:scale-110 transition-transform fill-amber-600" />
                  <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">
                    {(() => {
                      const highestRule = fallbackRules.length > 0 ? fallbackRules.reduce((prev: any, current: any) => (prev.rate > current.rate) ? prev : current, fallbackRules[0]) : null;
                      return highestRule ? `${toDisplayPercent(highestRule.rate)}% ${highestRule.name}${fallbackRules.length > 1 ? ` +${fallbackRules.length - 1}` : ''}` : `${fallbackRules.length} Rules`;
                    })()}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-[300px] p-0 border-none shadow-2xl rounded-2xl overflow-hidden bg-white z-[120]">
                <div className="bg-amber-500 px-4 py-3 text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Active Rewards</span>
                    </div>
                    <span className="text-[9px] font-bold bg-amber-600/50 px-2 py-0.5 rounded-full border border-amber-400/30">
                      {fallbackRules.length} Rules Enabled
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                  {fallbackRules.map((rule, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[11px] font-medium text-slate-600 truncate mr-2">{rule.name}</span>
                      <span className="text-[11px] font-black text-emerald-600 tabular-nums">{toDisplayPercent(rule.rate)}%</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 text-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Detailed MCC matching required to qualify</span>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Section 2: Balance & Health (30%) */}
        <div className="flex flex-col w-full xl:w-[30%] xl:border-l border-dashed border-slate-300 xl:pl-6 h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Balance</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">
                Health
              </span>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                <Clock className="h-3 w-3" />
                {collapsedDueInfo}
              </span>
              <button
                onClick={() => setIsPendingModalOpen(true)}
                className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95", pendingCount > 0 ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100")}
              >
                {isLoadingPending ? <Loader2 className="h-3 w-3 animate-spin" /> : pendingCount > 0 ? <ClockIcon className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                <span>{isLoadingPending ? "LOADING" : pendingCount > 0 ? `${pendingCount} WAIT` : "NO WAIT"}</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">AVAILABLE</div>
              <div className="text-[18px] font-extrabold text-emerald-600 tabular-nums">{formatMoneyVND(Math.ceil(displayBalance))}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">SOLO</div>
              <div className="text-[18px] font-extrabold text-indigo-600 tabular-nums">{formatMoneyVND(Math.ceil(soloAvailable || 0))}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">LIMIT</div>
              <div className="text-[18px] font-extrabold text-slate-900 tabular-nums">{formatMoneyVND(Math.ceil(displayLimit))}</div>
            </div>
          </div>
          
          <div className="flex flex-col mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative flex h-8 items-center justify-between overflow-hidden rounded-full border border-indigo-100 bg-white px-4 text-xs font-medium cursor-help">
                    <div 
                      className="absolute left-0 top-0 h-full bg-indigo-50/80 -z-10"
                      style={{ width: `${Math.min(100, (displayOutstanding / (displayLimit || 1)) * 100)}%` }}
                    />
                    <span className="text-[10px] font-bold text-indigo-700 relative z-10">RATIO {((displayOutstanding / (displayLimit || 1)) * 100).toFixed(1)}%</span>
                    <span className="text-[10px] font-bold text-slate-400 relative z-10">PACE {formatMoneyVND(displayOutstanding)} / {formatMoneyVND(displayLimit)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <p><strong>Available:</strong> {formatMoneyVND(displayBalance)}</p>
                    <p><strong>Outstanding:</strong> {formatMoneyVND(displayOutstanding)}</p>
                    <p><strong>Limit:</strong> {formatMoneyVND(displayLimit)}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Section 3: Performance (48%) */}
        <div className="flex flex-col w-full xl:w-[48%] xl:border-l border-dashed border-slate-300 xl:pl-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Performance</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">
                  CB Perf
                </span>
              </div>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button className="flex items-center gap-1.5 px-3 py-1 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group shrink-0 ml-2">
                      <BarChart3 className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">ANALYTICS</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="w-[600px] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>
                    <div className="bg-white">
                      <div className="bg-emerald-950 px-6 py-4 flex justify-between items-center text-white relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-transparent pointer-events-none" />
                        <div className="flex flex-col relative z-10">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 leading-none mb-1.5">INTUITION ENGINE V3</span>
                          <h3 className="font-black text-[16px] uppercase tracking-[0.1em] text-white flex items-center gap-3">
                            PERFORMANCE ANALYTICS <div className="h-px w-8 bg-emerald-500" />
                          </h3>
                        </div>
                        <div className="relative z-10 p-2 bg-emerald-900/40 rounded-full border border-emerald-800/50">
                          <Zap className="h-6 w-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" />
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Statistics Pipeline</span>
                            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase">
                              {dynamicCashbackStats?.cycle?.label || "CYCLE DATA"}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 pb-2">
                             {[
                                { label: "Eligible Spend", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}`, sub: "Rule matching spend", color: "text-indigo-600", icon: BarChart3 },
                                { label: "Est. Earned", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}`, sub: cycleMetricSnapshot.effectiveCycleCap > 0 ? `Capped at ${formatMoneyVND(cycleMetricSnapshot.effectiveCycleCap)}` : "Estimated rewards", color: "text-emerald-600", icon: Zap },
                                { label: "Actual Earn", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}`, sub: "Gross earned before cycle cap", color: "text-cyan-700", icon: Target },
                                { label: "Shared Out", val: `-${formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}`, sub: "Sent to members", color: "text-rose-500", icon: Users2 },
                                { label: "Net Profit", val: `${formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}`, sub: "Cycle profitability", color: "text-slate-900", icon: Briefcase },
                              ].map((item, i) => (
                                <div key={i} className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between group hover:bg-white transition-all">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-100"><item.icon className="h-3.5 w-3.5 text-slate-400" /></div>
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">{item.label}</span>
                                      <span className={cn("text-[16px] font-black tabular-nums tracking-tighter", item.color)}>{item.val}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        {dynamicCashbackStats?.activeRules && dynamicCashbackStats.activeRules.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-indigo-500 rounded-sm" />RULE PERFORMANCE BREAKDOWN
                              </h4>
                              <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                <span className="text-[9px] font-black text-indigo-700 uppercase">{dynamicCashbackStats.currentTierName} TIER OPTIMIZED</span>
                              </div>
                            </div>
                            <div className="grid gap-4">
                              {dynamicCashbackStats.activeRules.map((rule: any, idx: number) => {
                                const ruleProgress = rule.max ? Math.min(100, (rule.earned / rule.max) * 100) : 100;
                                return (
                                  <div key={idx} className="bg-slate-50/50 hover:bg-white rounded-[1.5rem] p-5 border border-slate-100 transition-all duration-300 hover:shadow-xl group/rule relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-600/5 rounded-bl-[4rem] group-hover/rule:bg-indigo-600/10 transition-colors" />
                                    <div className="flex justify-between items-start mb-4">
                                       <div className="flex flex-col gap-1">
                                         <div className="flex items-center gap-2.5">
                                           <div className="w-2.5 h-2.5 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                           </div>
                                           <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">{rule.name}</span>
                                         </div>
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md w-fit">
                                           {formatMoneyVND(rule.spent)} ELIGIBLE SPENT
                                         </span>
                                       </div>
                                       <div className="flex flex-col items-end">
                                         <span className="text-[22px] font-black text-emerald-600 tabular-nums leading-none drop-shadow-sm">{rule.rate}%</span>
                                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] leading-none mt-1">REWARD MULTIPLIER</span>
                                       </div>
                                    </div>
                                    <div className="space-y-2.5 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                                      <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rewards Accumulation</span>
                                        <div className="text-[16px] font-black text-slate-900 tabular-nums">
                                          {formatMoneyVND(rule.earned)}
                                          <span className="text-slate-300 ml-1.5 font-bold uppercase tracking-widest text-[10px]">/ {rule.max ? formatMoneyVND(rule.max) : "∞"}</span>
                                        </div>
                                      </div>
                                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] p-0.5">
                                        <div className={cn("h-full transition-all duration-1500 ease-in-out rounded-full shadow-sm relative group/bar progress-glow", ruleProgress >= 100 ? "bg-gradient-to-r from-emerald-600 to-emerald-400" : "bg-gradient-to-r from-indigo-700 to-indigo-500")} style={{ width: `${ruleProgress}%` }}>
                                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        </div>
                                      </div>
                                      <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-[0.25em] pt-1">
                                        <span>REWARD PROGRESS</span>
                                        <span>{ruleProgress >= 100 ? "BENEFIT OPTIMIZED" : `${Math.round(ruleProgress)}% UTILIZED`}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="mt-4 pt-8 border-t-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-slate-100/50 -mx-6 px-8 pb-8 rounded-b-[2rem]">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                  <Calendar className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-indigo-700/60 uppercase tracking-[0.4em] leading-none mb-1">ANNUAL TRACKER</span>
                                  <h3 className="font-black text-[15px] text-slate-800 uppercase tracking-widest">Yearly Performance {selectedYear || currentYear}</h3>
                                </div>
                              </div>
                              <div className="px-4 py-2 bg-white border border-indigo-100 text-indigo-700 text-[10px] font-black rounded-xl uppercase shadow-md flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> ENGINE CALCULATED REPORT
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mb-8">
                              <div className="space-y-6">
                                <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-emerald-500/30" /> TOTAL YEAR PROFIT</span>
                                  <span className={cn("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", annualPerformanceReport.profit >= 0 ? "text-emerald-700" : "text-rose-700")}>{formatMoneyVND(Math.ceil(annualPerformanceReport.profit))}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-indigo-500/30" /> ACTUAL CLAIMED</span>
                                  <span className="text-2xl font-black text-indigo-700 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.actual))}</span>
                                </div>
                              </div>
                              <div className="space-y-6 text-right">
                                <div className="flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">EST. POTENTIAL REWARDS <div className="w-1 h-3 bg-emerald-500/30" /></span>
                                  <span className="text-2xl font-black text-emerald-600 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.est))}</span>
                                </div>
                                <div className="flex flex-col gap-1.5 transition-transform hover:-translate-x-1 items-end">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">SHARED WITH OTHERS <div className="w-1 h-3 bg-rose-500/30" /></span>
                                  <span className="text-2xl font-black text-rose-500 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.shared))}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-200/80 shadow-2xl relative overflow-hidden group/benefit animate-in slide-in-from-bottom duration-1000">
                               <div className="absolute top-0 left-0 w-3 h-full bg-emerald-600 group-hover/benefit:w-full group-hover/benefit:opacity-5 transition-all duration-700" />
                               <div className="flex justify-between items-center relative z-10">
                                 <div className="flex flex-col">
                                   <span className="text-[13px] font-black text-slate-600 uppercase tracking-[0.3em] leading-none mb-1.5">NET ANNUAL BENEFIT</span>
                                   <span className="text-[11px] font-medium text-slate-400 italic tracking-wide">Real financial impact accrued across all metrics</span>
                                 </div>
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
            </div>
          
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Net Profit</div>
              <div className={cn("text-[18px] font-extrabold tabular-nums", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Actual Claimed <Info className="inline h-3 w-3 text-slate-300" /></div>
              <div className="text-[18px] font-extrabold text-rose-500 tabular-nums">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualClaimed))}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Est. Earned</div>
              <div className="text-[18px] font-extrabold text-amber-500 tabular-nums">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Actual Earn <Info className="inline h-3 w-3 text-slate-300" /></div>
              <div className="text-[18px] font-extrabold text-blue-500 tabular-nums">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Shared To Group</div>
              <div className="text-[18px] font-extrabold text-indigo-600 tabular-nums">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</div>
            </div>
          </div>
          
          <div className="flex flex-col mt-auto">
            <div className="flex flex-row items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative flex h-8 flex-1 items-center justify-between overflow-hidden rounded-full border border-indigo-100 bg-white px-4 text-xs font-medium cursor-help">
                      <div 
                        className="absolute left-0 top-0 h-full bg-indigo-50/80 -z-10"
                        style={{ width: `${Math.min(100, (cycleMetricSnapshot.currentSpend / (dynamicCashbackStats?.minSpend || 1)) * 100)}%` }}
                      />
                       <span className="text-[10px] font-bold text-indigo-700 relative z-10 flex items-center gap-1">
                         <TrendingUp className="h-3 w-3" /> GOAL {dynamicCashbackStats?.minSpend ? ((cycleMetricSnapshot.currentSpend / dynamicCashbackStats.minSpend) * 100).toFixed(0) : 0}%
                       </span>
                       <div className="flex gap-2 text-[10px] font-bold relative z-10">
                         <span className="text-slate-400">NEEDS</span> <span className="text-amber-600">{formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - cycleMetricSnapshot.currentSpend))}</span>
                         <span className="text-slate-300">|</span> 
                         <span className="text-slate-400">SPENT</span> <span className="text-slate-700">{formatMoneyVND(cycleMetricSnapshot.currentSpend)}</span>
                       </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      <p className="font-bold mb-1">Rule Qualification Logic</p>
                      {cycleMetricSnapshot.currentSpend >= (dynamicCashbackStats?.minSpend || 0) ? (
                        <p className="text-emerald-600">Target spend reached!</p>
                      ) : (
                        <p className="text-amber-600">Target spend not reached. Need {formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - cycleMetricSnapshot.currentSpend))} more.</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex h-8 items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 text-[10px] font-bold uppercase text-indigo-600 shadow-sm whitespace-nowrap">
                <Calendar className="h-3 w-3" />
                {collapsedCycleLabel}
                <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AccountPendingItemsModal
        accountId={account.id}
        open={isPendingModalOpen}
        onOpenChange={setIsPendingModalOpen}
      />
    </div>
  );
}
