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
    <div className="relative bg-white border-b border-slate-200 px-5 py-1.5 pr-14 flex gap-3 items-stretch sticky top-0 z-60 shadow-sm transition-all duration-500">
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
      <HeaderSection label="Account" badge={<span className="bg-sky-50 text-sky-700 border border-sky-200 rounded-full px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase">ACC</span>} className={cn("flex flex-col gap-0", isHeaderCollapsed ? "flex-[5] min-w-[520px] max-w-[720px] py-1" : "flex-[3] min-w-[280px] max-w-[320px] py-1.5")}>
        {isHeaderCollapsed ? (
          <div className="flex items-center gap-2 h-10">
            <div className="shrink-0 h-9 flex items-center pr-1 border-r border-slate-100">
              {account.image_url ? (
                <img src={account.image_url} alt="" className="h-9 w-auto max-w-[64px] object-contain rounded-none shadow-sm border border-slate-100" />
              ) : (
                <div className="w-9 h-9 flex items-center justify-center border border-slate-200 bg-slate-50 rounded-none shadow-sm">
                  <span className="text-lg font-black text-slate-400 capitalize">{account.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[12px] font-black text-slate-900 truncate uppercase tracking-tight" title={account.name}>{account.name}</div>
                <div className="text-[10px] font-bold text-slate-500 leading-none whitespace-nowrap overflow-x-auto scrollbar-hide">
                  {account.account_number || "N/A"} {account.receiver_name || ""}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {shouldShowCycleBadge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border-emerald-200">
                    <Calendar className="h-3 w-3" />
                    {cycleBadgeText}
                  </span>
                )}
                {filteredDisplayRules.length > 0 && (
                  <TooltipProvider>
                    <Tooltip delayDuration={150}>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-700 border-amber-200 cursor-help">
                          <Zap className="h-3 w-3 fill-current" />
                          {toDisplayPercent(filteredDisplayRules[0]?.rate || 0)}%
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-[340px] p-3">
                        <div className="space-y-1.5">
                          {filteredDisplayRules.slice(0, 4).map((rule: any, idx: number) => (
                            <div key={`collapsed-rule-${idx}`} className="flex items-center justify-between gap-2 text-xs">
                              <span className="font-bold text-slate-700 truncate">{String(rule?.name || "Cashback Online")}</span>
                              <span className="font-black text-emerald-600 whitespace-nowrap">{toDisplayPercent(rule?.rate || 0)}%</span>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={(e) => { e.stopPropagation(); handleCopyAccountId(); }} className={cn("text-slate-300 hover:text-emerald-600 transition-colors", isAccountIdCopied && "text-emerald-500")} aria-label="Copy account ID">
                        {isAccountIdCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Copy account ID</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={handleOpenPocketBase} className="text-slate-300 hover:text-amber-600 transition-colors" aria-label="Open in PocketBase admin">
                        <Database className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Open in PocketBase Admin</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => setIsSlideOpen(true)} className="text-slate-300 hover:text-indigo-600 transition-colors" aria-label="Open settings">
                        <Settings className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Config</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ) : (
        <>
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => setIsSlideOpen(true)} className="text-slate-300 hover:text-indigo-600 transition-colors transform hover:scale-110" aria-label="Open settings">
                      <Settings className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Config</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={handleOpenPocketBase} className="text-slate-300 hover:text-amber-600 transition-colors transform hover:scale-110" aria-label="Open in PocketBase admin">
                      <Database className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Open in PocketBase Admin</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 mt-1.5 max-w-full cursor-help">
                    <span className="text-[11px] font-black text-slate-600 tracking-widest tabular-nums bg-slate-50 px-2 py-0.5 rounded border border-slate-100 truncate">
                      {(account.account_number || "•••••").slice(0, 5)}... {account.receiver_name ? `${account.receiver_name.slice(0, 10)}...` : ""}
                    </span>
                    <Popover open={isEditPopoverOpen} onOpenChange={setIsEditPopoverOpen}>
                      <PopoverTrigger asChild>
                        <button className="text-slate-300 hover:text-indigo-500 transition-colors transform hover:scale-110" aria-label="Edit account number and receiver">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
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
                </TooltipTrigger>
                <TooltipContent>
                  {account.account_number || "N/A"} {account.receiver_name || ""}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-1.5 mt-2 flex-nowrap overflow-x-auto scrollbar-hide">
              {familyRoleLabel === "Parent" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest cursor-pointer select-none",
                        "bg-indigo-50 text-indigo-700 border-indigo-200",
                      )}
                    >
                      <User className="h-3 w-3" />
                      {familyRoleLabel}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-2 space-y-1.5" align="start" sideOffset={8}>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-1">Children</div>
                    {allAccounts.filter((item) => {
                      const itemParentId = item.parent_account_id || item.relationships?.parent_info?.id || null;
                      return itemParentId === account.id || (accountSlug ? itemParentId === accountSlug : false);
                    }).length > 0 ? (
                      allAccounts.filter((item) => {
                        const itemParentId = item.parent_account_id || item.relationships?.parent_info?.id || null;
                        return itemParentId === account.id || (accountSlug ? itemParentId === accountSlug : false);
                      }).map((child) => (
                        <div key={child.id} className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5">
                          <div className="h-6 w-6 rounded-none overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                            {child.image_url ? (
                              <img src={child.image_url} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <Wallet className="h-3 w-3 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[11px] font-bold text-slate-700 truncate">{child.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{child.id}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-[10px] text-slate-400 italic px-1 py-1">No child linked</div>
                    )}
                  </PopoverContent>
                </Popover>
              ) : familyRoleLabel === "Child" && effectiveParentAcc ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest cursor-pointer select-none",
                      "bg-sky-50 text-sky-700 border-sky-200",
                    )}>
                      <User className="h-3 w-3" />
                      {familyRoleLabel}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-2 space-y-1.5" align="start" sideOffset={8}>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-1">Parent Account</div>
                    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5">
                      <div className="h-7 w-7 rounded-none overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                        {effectiveParentAcc.image_url ? (
                          <img src={effectiveParentAcc.image_url} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-slate-700 truncate">{effectiveParentAcc.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{effectiveParentAcc.id}</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest",
                  familyRoleLabel === "Parent"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-slate-50 text-slate-600 border-slate-200",
                )}>
                  <User className="h-3 w-3" />
                  {familyRoleLabel}
                </span>
              )}
              {shouldShowCycleBadge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border-emerald-200">
                  <Calendar className="h-3 w-3" />
                  {cycleBadgeText}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE ROW SYSTEM (h-12) */}
        <div className="flex items-center gap-2 h-12 w-full border-t border-slate-50 mt-1 pt-1">
          <div className="flex items-center gap-1.5 flex-1 scrollbar-hide overflow-x-auto py-1" />
        </div>

        {/* BOTTOM ROW Awards (h-10) */}
        <div className="flex items-center gap-1.5 h-10 w-full border-t border-slate-50 pt-1">
          {rewardsCount > 0 && (
            <Popover open={isRewardsPopoverOpen} onOpenChange={setIsRewardsPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center rounded-lg border border-[#FFE082] bg-[#FFF9E6] shadow-sm overflow-hidden shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 cursor-help hover:bg-[#FFF3C8] transition-all group">
                  <Zap className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B] group-hover:scale-110 transition-transform" />
                  {(() => {
                    const displayRules = filteredDisplayRules;
                    const topRule = displayRules[0];
                    const remaining = Math.max(0, displayRules.length - 1);
                    const topRate = topRule?.rate || 0;
                    const rawTopName = String(topRule?.name || "Back Online").trim();
                    const normalizedTopName = displayRules.length <= 1
                      ? rawTopName.replace(/\s\+\d+$/g, "")
                      : rawTopName;
                    return (<>
                      <span className="text-[11px] font-black text-[#92400E] uppercase tracking-wider">
                        {topRule ? `${toDisplayPercent(topRate)}% ${normalizedTopName}${remaining > 0 ? ` +${remaining}` : ""}` : "REWARDS"}
                      </span>
                    </>);
                  })()}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 border-none shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden w-[380px] z-[120]" align="start" sideOffset={12}>
                <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-4 flex justify-between items-center text-white border-b-2 border-orange-700/20">
                  <div className="flex flex-col"><span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] leading-none mb-1">PROGRAM STATUS</span><div className="flex items-center gap-2"><Zap className="h-4 w-4 fill-white/30" /><span className="text-[14px] font-black uppercase tracking-[0.1em]">Active Rewards</span></div></div>
                  <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase border border-white/20 backdrop-blur-sm">{filteredDisplayRules.length} Rules Enabled</span>
                </div>
                {rewardRuleTabs.length > 1 && (
                  <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {rewardRuleTabs.map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setSelectedRuleTierKey(tab.key);
                            setIsRewardsPopoverOpen(true);
                          }}
                          className={cn(
                            "h-7 px-2.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-colors",
                            selectedRuleTier?.key === tab.key
                              ? "bg-orange-500 border-orange-600 text-white"
                              : "bg-white border-orange-200 text-orange-700 hover:bg-orange-100",
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-1 text-[10px] font-bold text-orange-700">{tierGuidanceText}</div>
                  </div>
                )}
                <div className="bg-[#F8F9FB] p-5 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar shadow-inner">
                  {(() => {
                    const displayRules = filteredDisplayRules;
                    return displayRules.map((rule: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow space-y-3 relative overflow-hidden group/rule">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-orange-500 opacity-0 group-hover/rule:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0.5"><div className="text-[12px] font-black text-slate-800 uppercase tracking-tight">{String(rule?.name || "Cashback Online").trim()}</div></div>
                          <span className="text-[18px] font-black text-emerald-600 tabular-nums bg-emerald-50 px-2 rounded-lg">{toDisplayPercent(rule.rate || 0)}%</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                           <div className="flex flex-1 flex-col gap-1">
                             <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400">
                               <span>{Number(rule?.minSpend || 0) > 0 ? 'SPEND TO UNLOCK' : 'REWARD EARNED'}</span>
                               <span>MAX CAP</span>
                             </div>
                             <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                               <div 
                                 className="h-full bg-orange-500 transition-all duration-300" 
                                 style={{ 
                                   width: (() => {
                                     const minSpend = Number(rule?.minSpend || 0);
                                     const currentSpend = Number(dynamicCashbackStats?.currentSpend || 0);
                                     if (minSpend > 0) {
                                       return `${Math.min(100, (currentSpend / minSpend) * 100)}%`;
                                     }
                                     const earned = Number(rule?.earned || 0);
                                     const max = Number(rule?.max || 0);
                                     return max > 0 ? `${Math.min(100, (earned / max) * 100)}%` : '100%';
                                   })()
                                 }} 
                               />
                             </div>
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
          {rewardsCount === 0 && (
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 shadow-sm overflow-hidden shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                <Info className="h-3.5 w-3.5 text-slate-500" />
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider">CAT: NO RULE CONFIG</span>
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </HeaderSection>

      {/* CARD 2: CREDIT HEALTH / CASH FLOW */}
      {!isHeaderCollapsed && (isCreditCard ? (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <HeaderSection label="Balance" badge={<span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase">HEALTH</span>} borderColor="border-indigo-100" className="flex-[6] min-w-[420px] bg-indigo-50/10 cursor-help flex flex-col gap-0 py-1.5 border-dashed">
                <div className="grid grid-cols-5 gap-2 items-start flex-1 pt-1 px-2">
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
                  <div className="flex flex-col items-center justify-center pt-1 gap-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Pending</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("open-pending-items-modal", { detail: { accountId: account.id } })); }}
                      className={cn("text-[9px] font-black px-2 py-1 rounded-full tracking-tight shadow-sm flex items-center gap-1 active:scale-95 transition-all border whitespace-nowrap", pendingCount > 0 ? "text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100" : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100")}
                    >
                      {isLoadingPending ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : pendingCount > 0 ? <Clock className="h-2.5 w-2.5" /> : <Check className="h-2.5 w-2.5" />}
                      <span>{isLoadingPending ? "LOADING WAIT" : pendingCount > 0 ? `${pendingCount} WAIT` : "NO WAIT"}</span>
                    </button>
                  </div>
                </div>

                <div className="h-12 w-full border-t border-slate-100/40 mt-1 px-2 pt-1.5 space-y-1.5">
                  <div className="relative w-full h-[14px] bg-slate-200/50 rounded-full overflow-hidden border border-slate-200/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] p-0.5">
                    <div
                      className={cn("h-full transition-all duration-1200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] relative", (displayLimit && (displayOutstanding / displayLimit) > 0.8) ? "bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400" : "bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-400")}
                      style={{ width: `${Math.max((displayLimit ? (displayOutstanding / displayLimit) * 100 : 0), 8)}%` }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:25px_25px] animate-[shimmer_2s_infinite_linear]"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black text-indigo-700 tabular-nums bg-white px-2 py-0.5 rounded-full border border-indigo-200/80 shadow-sm">
                      RATIO {(displayLimit ? (displayOutstanding / displayLimit) * 100 : 0).toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-black text-slate-700 tabular-nums bg-white px-2 py-0.5 rounded-full border border-slate-200/80 shadow-sm">
                      {(selectedYear || currentYear)} PACE {formatMoneyVND(Math.ceil(summary?.yearPureExpenseTotal || 0))}/{formatMoneyVND(account.credit_limit || 0)}
                    </span>
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
          <HeaderSection label="Balance" borderColor="border-emerald-100" className="flex-[1.25] min-w-[280px] bg-emerald-50/10 flex flex-col gap-0 py-2">
            <div className="flex flex-col h-full justify-between py-1 px-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Final Balance</span>
                  <span className={cn("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", availableBalance >= 0 ? "text-emerald-600" : "text-rose-600")}>
                    {formatMoneyVND(Math.ceil(availableBalance))}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm border border-emerald-100"><Calculator className="h-6 w-6 text-emerald-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-emerald-200/30">
                <div className="flex flex-col gap-0.5"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Incoming</span><span className="text-[15px] font-black text-emerald-600 tabular-nums">+{formatMoneyVND(summary?.yearPureIncomeTotal || 0)}</span></div>
                <div className="flex flex-col gap-0.5 text-right"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Outgoing</span><span className="text-[15px] font-black text-rose-500 tabular-nums">-{formatMoneyVND(summary?.yearPureExpenseTotal || 0)}</span></div>
              </div>
            </div>
          </HeaderSection>
          <HeaderSection label="Movement" borderColor="border-sky-100" className="flex-1 min-w-[220px] bg-sky-50/10 flex flex-col gap-0 py-2">
            <div className="flex flex-col h-full justify-between py-1 px-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-sky-700 uppercase tracking-widest">Net Movement</span>
                  <span className={cn("text-2xl font-black tabular-nums tracking-tighter drop-shadow-sm", ((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0) >= 0) ? "text-emerald-600" : "text-rose-600")}>
                    {formatMoneyVND(((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0)))}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm border border-sky-100"><TrendingUp className="h-6 w-6 text-sky-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-sky-200/30">
                <div className="flex flex-col gap-0.5"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Balance Type</span><span className="text-[15px] font-black text-slate-900 tabular-nums">{account.type === "bank" ? "Cash" : "Asset"}</span></div>
                <div className="flex flex-col gap-0.5 text-right"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Focus</span><span className="text-[15px] font-black text-sky-600 tabular-nums">Balance First</span></div>
              </div>
            </div>
          </HeaderSection>
        </>
      ))}

      {isHeaderCollapsed && isCreditCard && (
        <HeaderSection
          label="Balance"
          badge={<span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase">HEALTH</span>}
          borderColor="border-indigo-100"
          className="flex-[3] min-w-[420px] bg-indigo-50/10 py-1"
        >
          <div className="h-10 flex items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Available</span>
              <span className={cn("text-[13px] font-black tabular-nums", displayBalance >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatMoneyVND(Math.ceil(displayBalance))}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-700 border-slate-200">
                <Calendar className="h-3 w-3" />
                Due {collapsedDueInfo}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("open-pending-items-modal", { detail: { accountId: account.id } })); }}
                className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest", pendingCount > 0 ? "text-rose-700 bg-rose-50 border-rose-200" : "text-emerald-700 bg-emerald-50 border-emerald-200")}
              >
                <Clock className="h-3 w-3" />
                Pending {pendingCount}
              </button>
            </div>
          </div>
        </HeaderSection>
      )}

      {isHeaderCollapsed && isCreditCard && (
        <HeaderSection
          label="Cashback Performance"
          badge={<span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase">CB PERF</span>}
          borderColor="border-emerald-100"
          className="flex-[4] min-w-[540px] bg-emerald-50/10 py-1"
          hideHintInHeader
        >
          <div className="h-10 flex items-center gap-3 px-2">
            <div className={cn("flex items-center gap-2 px-2 py-1 rounded-lg border min-w-[220px]", dynamicCashbackStats?.is_min_spend_met ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200")}>
              <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Needs</span>
              <span className={cn("text-[11px] font-black uppercase", dynamicCashbackStats?.is_min_spend_met ? "text-emerald-700" : "text-rose-700")}>{dynamicCashbackStats?.is_min_spend_met ? "QUALIFIED" : formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))}</span>
              <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, ((dynamicCashbackStats?.currentSpend || 0) / Math.max(1, dynamicCashbackStats?.minSpend || 1)) * 100)}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[10px] font-black text-slate-700">Spent {formatMoneyVND(Math.ceil(dynamicCashbackStats?.currentSpend || 0))}</span>
              <span className="text-[10px] font-black text-rose-600">Shared {formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount || 0))}</span>
              <span className={cn("text-[10px] font-black", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-700" : "text-rose-700")}>Profit {formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit || 0))}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 border-indigo-200">
                <Calendar className="h-3 w-3" />
                {collapsedCycleLabel}
              </span>
            </div>
          </div>
        </HeaderSection>
      )}

      {/* CARD 3: CASHBACK PERFORMANCE */}
      {!isHeaderCollapsed && isCreditCard && (
        <HeaderSection label="Cashback Performance" badge={<span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-1.5 py-0.5 text-[7px] font-black tracking-widest uppercase">CB PERF</span>} borderColor="border-emerald-100" className="flex-[6] min-w-[420px] bg-emerald-50/10 flex flex-col gap-0 py-1.5 relative" hideHintInHeader>
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
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5 pt-0.5 border-l border-emerald-100/50 pl-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Net Profit</span>
                    <span className={cn("text-[16px] font-black tabular-nums tracking-tight drop-shadow-sm", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-700" : "text-rose-700")}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Actual Claimed</span>
                      <TooltipProvider>
                        <Tooltip delayDuration={120}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-300 text-[8px] font-black text-slate-500 hover:border-slate-400 hover:text-slate-700"
                              aria-label="Actual Claimed explanation"
                            >
                              i
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[280px] text-xs leading-5">
                            Tiền cashback ngân hàng da tra trong ky (dong tien thu ve thuc te), thuong den tu giao dich income/cashback.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-[16px] font-black text-indigo-700 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualClaimed))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-emerald-500/70 uppercase tracking-widest leading-none">Est. Earned</span>
                    <span className="text-[16px] font-black text-emerald-600 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-black text-cyan-600 uppercase tracking-widest leading-none">Actual Earn</span>
                      <TooltipProvider>
                        <Tooltip delayDuration={120}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-cyan-300 text-[8px] font-black text-cyan-600 hover:border-cyan-400 hover:text-cyan-700"
                              aria-label="Actual Earn explanation"
                            >
                              i
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[300px] text-xs leading-5">
                            Cashback ghi nhan theo rule trong ky hien tai truoc khi ap dung cycle cap; day la muc thuong phat sinh, khong phai tien da bank tra.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-[16px] font-black text-cyan-700 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest leading-none">Shared To Group</span>
                    <span className="text-[16px] font-black text-rose-600 tabular-nums tracking-tight drop-shadow-sm">{formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</span>
                  </div>
                </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 h-9 w-full border-t border-slate-100/40 mt-1 pt-1 px-2">
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
                            { label: "Est. Earned", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}`, sub: cycleMetricSnapshot.effectiveCycleCap > 0 ? `Capped at ${formatVNShort(cycleMetricSnapshot.effectiveCycleCap)}` : "Estimated rewards", color: "text-emerald-600", icon: Zap },
                              { label: "Actual Earn", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}`, sub: "Gross earned before cycle cap", color: "text-cyan-700", icon: Target },
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
                              <div className="flex flex-col gap-1.5 transition-transform hover:translate-x-1"><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><div className="w-1 h-3 bg-indigo-500/30" /> ACTUAL CLAIMED</span><span className="text-2xl font-black text-indigo-700 tabular-nums tracking-tighter drop-shadow-sm">{formatMoneyVND(Math.ceil(annualPerformanceReport.actual))}</span></div>
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
                    <div className="flex items-center justify-between flex-1 ml-0.5 gap-4 min-w-0">
                      <div className="flex flex-col leading-none gap-1 min-w-0">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Needs</span>
                        <span className={cn("text-[12px] font-black tabular-nums tracking-tight truncate", dynamicCashbackStats?.is_min_spend_met ? "text-emerald-700" : "text-rose-700") }>
                          {dynamicCashbackStats?.is_min_spend_met
                            ? "QUALIFIED"
                            : formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))}
                        </span>
                      </div>
                      <div className="flex flex-col leading-none gap-1 items-end min-w-0">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Spent</span>
                        <span className="text-[12px] font-black tabular-nums tracking-tight text-slate-700 truncate">
                          {formatMoneyVND(Math.ceil(dynamicCashbackStats?.currentSpend || 0))}
                        </span>
                      </div>
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsHeaderCollapsed((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-indigo-200 bg-white text-indigo-600 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-center"
              aria-label={isHeaderCollapsed ? "Expand header" : "Collapse header"}
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", isHeaderCollapsed ? "rotate-180" : "rotate-0")} />
            </button>
          </TooltipTrigger>
          <TooltipContent>{isHeaderCollapsed ? "Expand" : "Collapse"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
