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
      (normalizedCashbackConfig as any).program?.cycleType ||
      (normalizedCashbackConfig as any).cycleType ||
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
          .filter((minSpend: any) => !isSimpleCard || minSpend > 0),
      ),
    ).sort((a: any, b: any) => a - b);

    const tabs = values.map((minSpend: any, idx: number) => {
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
  
  const isTiered = account.cb_type === 'tiered';
  const rawTiers = isTiered ? ((account.cb_rules_json as any)?.tiers || (account.cashback_config as any)?.program?.rules_json_v2?.tiers || []) : [];

  return (
    <div className="relative w-full">
      <AccountSlideV2
        open={isSlideOpen}
        onOpenChange={setIsSlideOpen}
        account={account}
        allAccounts={allAccounts}
        categories={categories}
        existingAccountNumbers={Array.from(new Set(allAccounts.map((a) => a.account_number).filter(Boolean))) as string[]}
        existingReceiverNames={Array.from(new Set(allAccounts.map((a) => a.receiver_name).filter(Boolean))) as string[]}
      />
      {isHeaderCollapsed ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm pl-4 pr-16 py-3 w-full flex items-center gap-4 relative transition-all duration-500 overflow-hidden shrink-0 mt-2">
          {/* Collapsed Section 1 */}
          <div className="flex items-center gap-3 w-[26%] truncate border-r border-slate-200 pr-4 shrink-0">
            {account.image_url ? (
              <img src={account.image_url} alt="" className="h-8 w-8 object-contain rounded-sm border border-slate-100 shadow-sm shrink-0" />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center border border-slate-200 bg-gradient-to-br from-orange-400 to-red-500 rounded-sm shadow-sm shrink-0">
                <span className="text-sm font-black text-white uppercase">{account.name.charAt(0)}</span>
              </div>
            )}
            <div className="flex items-center justify-between min-w-0 flex-1 gap-4 pr-4">
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-extrabold text-slate-900 truncate uppercase">{account.name}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase bg-slate-100 px-1.5 rounded inline-block w-fit mt-0.5">{account.account_number?.slice(0,8) || "••••"}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(account.id);
                    toast.success("Account ID copied to clipboard");
                  }} 
                  className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-full"
                  title="Copy Account ID"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button onClick={handleOpenPocketBase} className="text-slate-400 hover:text-amber-600 transition-colors p-1.5 hover:bg-amber-50 rounded-full" title="Open in Database"><Database className="h-4 w-4" /></button>
                <button onClick={() => setIsSlideOpen(true)} className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-full" title="Settings"><Settings className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
          
          {/* Collapsed Section 2 */}
          <div className="flex items-center justify-between w-[30%] px-4 border-r border-slate-200 shrink-0">
            <div className="flex flex-col gap-0.5">
               <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Available</span>
               <span className={cn("text-[14px] font-black truncate", isCreditCard ? (displayBalance >= 0 ? "text-emerald-600" : "text-rose-600") : (availableBalance >= 0 ? "text-emerald-600" : "text-rose-600"))}>{formatMoneyVND(Math.ceil(isCreditCard ? displayBalance : availableBalance))}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-50 text-slate-600 border border-slate-200 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase"><Calendar className="h-3 w-3" /> Due {collapsedDueInfo}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("open-pending-items-modal", { detail: { accountId: account.id } })); }}
                className={cn("flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase transition-all active:scale-95", pendingCount > 0 ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-emerald-50 border-emerald-200 text-emerald-700")}
              >
                <Clock className="h-3 w-3" /> NO WAIT
              </button>
            </div>
          </div>

          {/* Collapsed Section 3 */}
            <div className="relative h-7 bg-slate-50 flex items-center px-3 rounded-full border border-slate-100 min-w-[280px] overflow-hidden group/goal-collapsed mr-12">
               <div className="absolute top-0 left-0 h-full bg-emerald-100/40 transition-all duration-1000 z-0" style={{ width: `${Math.min(100, Math.round(((dynamicCashbackStats?.currentSpend || 0) / Math.max(1, dynamicCashbackStats?.minSpend || 1)) * 100))}%` }} />
               <div className="relative z-10 flex items-center gap-4 w-full">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase text-slate-600">
                    {!dynamicCashbackStats?.is_min_spend_met ? (
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <span className="text-slate-400">NEEDS</span>
                        <span className="text-rose-600 text-[12px] font-extrabold drop-shadow-[0_0_8px_rgba(225,29,72,0.2)]">{formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <span className="text-emerald-600">QUALIFIED</span> 
                        <span className="text-slate-400 font-bold mx-1">SPENT</span> 
                        {formatMoneyVND(Math.ceil(dynamicCashbackStats?.currentSpend || 0))}
                      </span>
                    )}
                  </div>
                  <div className="h-3.5 w-px bg-slate-300/50" />
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex flex-col xl:flex-row xl:items-center gap-0.5 xl:gap-2">
                      <span className="text-[10px] font-black text-rose-600 uppercase flex items-center gap-1 whitespace-nowrap transition-all group-hover/goal-collapsed:scale-105"><Users2 className="h-3 w-3" /> <span className="text-slate-400 font-bold mr-0.5">SHARED</span> {formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase flex items-center gap-1 whitespace-nowrap transition-all group-hover/goal-collapsed:scale-105"><Zap className="h-3 w-3" /> <span className="text-slate-400 font-bold mr-0.5">EST. EARNED</span> {formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</span>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 ml-auto pr-8">
               <div className="flex items-center bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5 shadow-sm">
                  <Zap className="h-2.5 w-2.5 mr-1 fill-amber-500 text-amber-500" />
                  <span className="text-[9px] font-black uppercase tracking-tight">{isTiered ? rawTiers.length : filteredDisplayRules.length} Rules</span>
               </div>
               <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2 py-0.5 text-[9px] font-black uppercase flex items-center gap-1 shadow-sm whitespace-nowrap"><User className="h-2.5 w-2.5" /> {familyRoleLabel}</span>
               <button className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 whitespace-nowrap hover:bg-indigo-700 transition-colors shadow-md active:scale-95">
                  <Calendar className="h-3 w-3 text-indigo-300" /> {dynamicCashbackStats?.cycle?.label || selectedCycle || "NOT SET"}
               </button>
            </div>

          <button onClick={() => setIsHeaderCollapsed(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-indigo-50 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 w-full grid grid-cols-1 lg:grid-cols-[22%_28%_1fr] gap-6 xl:gap-8 mt-4 transition-all duration-500 overflow-hidden relative">
          
          {/* SECTION 1: ACCOUNT INFO */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-nowrap min-w-0">
              <div className="h-10 shrink-0 flex items-center">
                {account.image_url ? (
                  <img src={account.image_url as string} alt="" className="h-full w-auto max-w-[80px] object-contain rounded-sm shadow-sm border border-slate-100" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-gradient-to-br from-orange-400 to-red-500 rounded-sm shadow-sm">
                    <span className="text-xl font-black text-white uppercase">{account.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <h1 className="text-[18px] font-extrabold text-slate-900 leading-tight uppercase truncate min-w-0" title={account.name}>{account.name}</h1>
              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(account.id);
                    toast.success("Account ID copied to clipboard");
                  }} 
                  className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-full"
                  title="Copy Account ID"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button onClick={handleOpenPocketBase} className="text-slate-400 hover:text-amber-600 transition-colors p-1.5 hover:bg-amber-50 rounded-full" title="Open in Database"><Database className="h-4 w-4" /></button>
                <button onClick={() => setIsSlideOpen(true)} className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded-full" title="Settings"><Settings className="h-4 w-4" /></button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5 truncate flex-wrap">
              <div className="text-[13px] font-semibold text-slate-500 font-sans tracking-wide truncate flex items-center gap-2 group/edit-info">
                <span className="tabular-nums drop-shadow-sm">{account.account_number || "•••••"}</span>
                {account.receiver_name && <span className="opacity-60 truncate" title={account.receiver_name}>• {account.receiver_name}</span>}
                <button onClick={() => setIsSlideOpen(true)} className="p-1 hover:bg-white rounded border border-slate-200 text-indigo-600 transition-all shadow-sm"><Edit className="h-3 w-3" /></button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 flex-wrap min-h-[26px]">
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2.5 py-1 text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm ring-1 ring-indigo-500/10"><User className="h-3.5 w-3.5" /> {familyRoleLabel}</span>
              {shouldShowCycleBadge && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-1 text-[10px] font-black uppercase flex items-center gap-1.5 shadow-sm ring-1 ring-emerald-500/10"><Calendar className="h-3.5 w-3.5" /> {cycleBadgeText}</span>
              )}
            </div>
            <div className="mt-auto pt-6 w-full">
              <Popover open={isRewardsPopoverOpen} onOpenChange={setIsRewardsPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-full h-9 px-4 shadow-sm hover:bg-amber-100 hover:shadow-md transition-all active:scale-95 group">
                    <Zap className="h-4 w-4 fill-amber-500 text-amber-500 group-hover:scale-110 transition-transform drop-shadow" />
                    <span className="text-[11px] font-black uppercase tracking-wider">
                      {isTiered ? (() => {
                        const firstTier = rawTiers[0];
                        const firstPol = firstTier?.policies?.[0];
                        const rateText = toDisplayPercent(firstPol?.rate || 0);
                        const catId = firstPol?.cat_ids?.[0];
                        const catName = categories.find(c => String(c.id) === String(catId))?.name || "Categories";
                        const extraRules = rawTiers.length - 1;
                        return `${rateText}% ${catName} with tier ${extraRules > 0 ? `+${extraRules}` : ""} show more`;
                      })() : (() => {
                        const firstRule = filteredDisplayRules[0];
                        if (!firstRule) return "NO RULES ACTIVE";
                        const rateText = toDisplayPercent(firstRule.rate || 0);
                        const name = String(firstRule.name || "Cashback").trim();
                        const capValueArr = [(firstRule as any).max, firstRule.max_cashback, firstRule.cap].filter(v => v !== undefined && v !== null);
                        const cap = capValueArr.length > 0 ? ` MAX ${formatMoneyVND(capValueArr[0])}` : "";
                        return `${rateText}% ${name}${cap}${filteredDisplayRules.length > 1 ? ` +${filteredDisplayRules.length - 1} MORE` : ""}`;
                      })()}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0 border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden bg-white z-[120]" align="start" sideOffset={12}>
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-4 flex justify-between items-center text-white">
                    <div className="flex flex-col"><span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-1">PROGRAM REWARDS</span><div className="flex items-center gap-2"><Zap className="h-4 w-4 fill-white/50" /><span className="text-[14px] font-black uppercase tracking-[0.1em]">Active Policies</span></div></div>
                    <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase border border-white/20 shadow-sm">{isTiered ? "Tiered" : "Verified"}</span>
                  </div>
                  <div className="bg-slate-50 p-4 max-h-[440px] overflow-y-auto space-y-4">
                     {isTiered ? (() => {
                        const catGroups: Record<string, any> = {};
                        rawTiers.forEach((tier: any) => {
                           tier.policies?.forEach((pol: any) => {
                             pol.cat_ids?.forEach((cId: any) => {
                               const mappedCat = categories.find(c => String(c.id) === String(cId));
                               const finalId = mappedCat ? String(mappedCat.id) : "General";
                               if (!catGroups[finalId]) catGroups[finalId] = [];
                               catGroups[finalId].push({ tierName: tier.name, max: pol.max, rate: pol.rate, minSpend: tier.min_spend });
                             });
                           });
                         });
                        return Object.entries(catGroups).map(([cId, rulesList]: [string, any], idx: number) => {
                           const catObj = categories.find(c => String(c.id) === String(cId)) || { name: 'General', image_url: null };
                           rulesList.sort((a: any, b: any) => (a.minSpend || 0) - (b.minSpend || 0));
                           return (
                             <div key={idx} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group/rule">
                                <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500 opacity-0 group-hover/rule:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-2 mb-3 border-b border-slate-50 pb-2">
                                   {catObj.image_url ? <img src={catObj.image_url} alt="" className="h-5 w-5 rounded object-cover shadow-sm bg-white" /> : <div className="h-5 w-5 rounded bg-slate-100 uppercase flex items-center justify-center text-[10px] font-black text-slate-400">{catObj.name.charAt(0)}</div>}
                                   <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight truncate">{catObj.name}</span>
                                </div>
                                <div className="space-y-2">
                                  {rulesList.map((r: any, i: number) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-50/80 p-2 rounded-lg border border-slate-100/50">
                                       <div className="flex flex-col max-w-[65%]">
                                          <span className="text-[11px] font-bold text-slate-600 uppercase truncate" title={r.tierName}>{r.tierName || "Base Tier"}</span>
                                          {(r.max || r.max > 0) && <span className="text-[9px] font-black text-indigo-500 uppercase flex items-center gap-1 mt-0.5"><Info className="h-2.5 w-2.5" /> CAP: {formatMoneyVND(r.max)}</span>}
                                       </div>
                                       <span className="text-[13px] font-black text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-200/50 tabular-nums shrink-0">{toDisplayPercent(r.rate || 0)}%</span>
                                    </div>
                                  ))}
                                </div>
                             </div>
                           );
                        });
                     })() : filteredDisplayRules.map((rule: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group/rule">
                          <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500 opacity-0 group-hover/rule:opacity-100 transition-opacity" />
                          <div className="flex justify-between items-start mb-2">
                             <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight w-2/3 truncate">{String(rule?.name || "Cashback Online").trim()}</span>
                             <span className="text-[16px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md tabular-nums">{toDisplayPercent(rule.rate || 0)}%</span>
                          </div>
                          {(rule as any).max && <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md w-fit border border-indigo-100/50 mt-2"><Info className="h-3 w-3" /><span className="text-[10px] font-black uppercase tracking-wider">CAP AT: {formatMoneyVND((rule as any).max)}</span></div>}
                        </div>
                     ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* SECTION 2: BALANCE & HEALTH */}
          <div className="flex flex-col lg:border-l border-dashed border-slate-300 lg:pl-8 min-w-0">
            <div className="flex justify-between items-center mb-6 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Balance</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-0.5 text-[8px] font-black uppercase shadow-sm">Health</span>
              </div>
              <div className="flex items-center gap-2">
                {isCreditCard && dueDateBadge}
                <button
                  onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent("open-pending-items-modal", { detail: { accountId: account.id } })); }}
                  className={cn("text-[9px] font-black px-2.5 py-1 rounded-full tracking-tight shadow-sm flex items-center gap-1.5 active:scale-95 transition-all border whitespace-nowrap", pendingCount > 0 ? "text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100" : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100")}
                >
                  {isLoadingPending ? <Loader2 className="h-3 w-3 animate-spin" /> : pendingCount > 0 ? <Clock className="h-3 w-3" /> : <Check className="h-3 w-3" />}
                  <span>{isLoadingPending ? "LOADING" : pendingCount > 0 ? `${pendingCount} WAIT` : "NO WAIT"}</span>
                </button>
              </div>
            </div>

            {isCreditCard ? (
              <div className="grid grid-cols-3 gap-2 flex-1 items-start">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 truncate">Available</span>
                  <span className={cn("text-[18px] font-black truncate tabular-nums drop-shadow-sm", displayBalance >= 0 ? "text-emerald-600" : "text-rose-600")} title={formatMoneyVND(Math.ceil(displayBalance))}>{formatMoneyVND(Math.ceil(displayBalance))}</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 truncate">Solo</span>
                  <span className={cn("text-[18px] font-black truncate tabular-nums drop-shadow-sm", (soloAvailable || 0) >= 0 ? "text-indigo-600" : "text-rose-600")} title={formatMoneyVND(Math.ceil(soloAvailable || 0))}>{formatMoneyVND(Math.ceil(soloAvailable || 0))}</span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 truncate">Limit</span>
                  <span className="text-[18px] font-black text-slate-800 truncate tabular-nums drop-shadow-sm" title={formatMoneyVND(Math.ceil(displayLimit))}>{formatMoneyVND(Math.ceil(displayLimit))}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 flex-1 items-start">
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 truncate">Final Balance</span>
                  <span className="text-[20px] font-black text-emerald-600 truncate tabular-nums drop-shadow-sm" title={formatMoneyVND(Math.ceil(availableBalance))}>{formatMoneyVND(Math.ceil(availableBalance))}</span>
                </div>
                <div className="flex flex-col gap-1 text-right min-w-0">
                   <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 truncate">Movement</span>
                   <span className="text-[20px] font-black text-sky-600 truncate tabular-nums drop-shadow-sm" title={formatMoneyVND(((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0)))}>{formatMoneyVND(((summary?.yearPureIncomeTotal || 0) - (summary?.yearPureExpenseTotal || 0)))}</span>
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 w-full relative group">
              {isCreditCard && (
                <div className="relative w-full h-9 bg-indigo-50 rounded-lg overflow-hidden border border-indigo-100 flex items-center px-3 z-0 group-hover:bg-indigo-100 transition-colors cursor-help">
                  <div className={cn("absolute top-0 left-0 h-full -z-10 rounded-r-lg shadow-[0_2px_10px_rgba(79,70,229,0.15)] transition-all duration-1000", (displayLimit && (displayOutstanding / displayLimit) > 0.8) ? "bg-rose-100" : "bg-indigo-100")} style={{ width: `${Math.max((displayLimit ? (displayOutstanding / displayLimit) * 100 : 0), 2)}%` }} />
                  <div className="flex justify-between items-center w-full min-w-0">
                    <span className="text-[11px] font-black text-indigo-700 z-10 shrink-0">RATIO {(displayLimit ? (displayOutstanding / displayLimit) * 100 : 0).toFixed(1)}%</span>
                    <span className="text-[9px] font-bold text-slate-500 z-10 uppercase text-right ml-2 truncate">PACE {formatMoneyVND(Math.ceil(summary?.yearPureExpenseTotal || 0))} / {formatMoneyVND(account.credit_limit || 0)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: PERFORMANCE */}
          <div className="flex flex-col lg:border-l border-dashed border-slate-300 lg:pl-8 min-w-0 relative">
            <div className="flex justify-between items-center mb-6 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Performance</span>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full px-2 py-0.5 text-[8px] font-black uppercase shadow-sm">CB Perf</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Legacy V3 Engine Modal Triggered via Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button className="flex items-center gap-2 text-[10px] font-black text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-all uppercase shadow-sm hover:shadow active:scale-95 whitespace-nowrap">
                        <BarChart3 className="h-3.5 w-3.5 text-slate-400" /> Analytics
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="w-[600px] max-w-[90vw] p-0 border-none shadow-[0_40px_100px_rgba(0,0,0,0.4)] rounded-[2rem] overflow-hidden bg-white z-[120]" sideOffset={15}>
                      <div className="bg-white text-left">
                        <div className="bg-emerald-950 px-6 py-5 flex justify-between items-center text-white relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-transparent pointer-events-none" />
                          <div className="flex flex-col relative z-10"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 leading-none mb-1.5">INTUITION ENGINE V3</span><h3 className="font-black text-[16px] uppercase tracking-[0.1em] text-white flex items-center gap-3">PERFORMANCE ANALYTICS <div className="h-px w-8 bg-emerald-500" /></h3></div>
                          <div className="relative z-10 p-2.5 bg-emerald-900/40 rounded-full border border-emerald-800/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]"><Zap className="h-6 w-6 text-amber-300 fill-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" /></div>
                        </div>
                        <div className="p-6 space-y-7 max-h-[85vh] overflow-y-auto no-scrollbar scroll-smooth">
                          {/* Cycle Scope Data */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Statistics Pipeline</span><span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/80 uppercase">{dynamicCashbackStats?.cycle?.label || "CYCLE DATA"}</span></div>
                            <div className="grid grid-cols-2 gap-3 pb-2">
                              {[
                                { label: "Eligible Spend", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.currentSpend))}`, color: "text-indigo-600", icon: BarChart3 },
                                { label: "Est. Earned", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}`, color: "text-emerald-600", icon: Zap },
                                { label: "Actual Earn", val: `+${formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}`, color: "text-cyan-700", icon: Target },
                                { label: "Shared Out", val: `-${formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}`, color: "text-rose-500", icon: Users2 },
                                { label: "Net Profit", val: `${formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}`, color: "text-slate-900", icon: Briefcase },
                              ].map((item: any, i: number) => (
                                <div key={i} className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 shadow-sm flex items-center justify-between hover:bg-slate-50 hover:shadow-md transition-all">
                                  <div className="flex flex-col"><span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">{item.label}</span><span className={cn("text-[16px] font-black tabular-nums tracking-tighter", item.color)}>{item.val}</span></div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Entire Year Scope Data */
                          annualPerformanceReport.totalNetBenefit || summary?.yearTotalInflow ? (
                          <div className="space-y-4 pt-6 border-t border-slate-100">
                             <div className="flex justify-between items-center mb-1"><span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Briefcase className="h-4 w-4" /> Master Footprint</span><span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100/80 uppercase">ENTIRE YEAR</span></div>
                             <div className="grid grid-cols-2 gap-3">
                                {[
                                   { label: "Year Total Inflows", val: `+${formatMoneyVND(summary?.yearTotalInflow || 0)}`, color: "text-emerald-600" },
                                   { label: "Year Total Outflows", val: `-${formatMoneyVND(summary?.yearTotalOutflow || 0)}`, color: "text-rose-600" },
                                   { label: "Net Cashflow", val: `${(summary?.yearTotalInflow !== undefined && summary?.yearTotalOutflow !== undefined) ? formatMoneyVND((summary.yearTotalInflow || 0) - (summary.yearTotalOutflow || 0)) : "0"}`, color: "text-slate-900" },
                                   { label: "Yearly Cashback Net Profit", val: `${formatMoneyVND(annualPerformanceReport.totalNetBenefit || 0)}`, color: "text-indigo-600" }
                                ].map((item: any, i: number) => (
                                   <div key={i} className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm flex flex-col gap-1 items-start w-full">
                                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                      <span className={cn("text-[14px] font-black tabular-nums", item.color)}>{item.val}</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                          ) : null}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Switch to Collapse Mode */}
                <button
                  onClick={() => setIsHeaderCollapsed(true)}
                  className="flex items-center gap-1.5 p-2 rounded-lg text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm ml-auto"
                  aria-label="Collapse header"
                >
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 flex-1 items-start relative z-0">
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-emerald-500/80 truncate">Net Profit</span>
                <span className={cn("text-[14px] 2xl:text-[17px] font-black tabular-nums drop-shadow-sm truncate", cycleMetricSnapshot.totalProfit >= 0 ? "text-emerald-600" : "text-rose-600")} title={formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.totalProfit))}</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 flex items-center gap-1 group/tooltip truncate">
                   Act. Claimed
                   <Info className="h-3 w-3 text-slate-300 group-hover/tooltip:text-slate-500 cursor-help transition-colors shrink-0 hidden xl:block" />
                </span>
                <span className="text-[14px] 2xl:text-[17px] font-black text-rose-500 tabular-nums drop-shadow-sm truncate" title={formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualClaimed))}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualClaimed))}</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-amber-500/80 truncate">Est. Earned</span>
                <span className="text-[14px] 2xl:text-[17px] font-black text-amber-600 tabular-nums drop-shadow-sm truncate" title={formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.estCashback))}</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-blue-500/80 flex items-center gap-1 group/tooltip truncate">
                  Actual Earn
                  <Info className="h-3 w-3 text-blue-300 group-hover/tooltip:text-blue-500 cursor-help transition-colors shrink-0 hidden xl:block" />
                </span>
                <span className="text-[14px] 2xl:text-[17px] font-black text-blue-600 tabular-nums drop-shadow-sm truncate" title={formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.actualEarn))}</span>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-indigo-400 truncate">Shared Group</span>
                <span className="text-[14px] 2xl:text-[17px] font-black text-indigo-700 tabular-nums drop-shadow-sm truncate" title={formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}>{formatMoneyVND(Math.ceil(cycleMetricSnapshot.sharedAmount))}</span>
              </div>
            </div>

            <div className="mt-auto pt-6 flex items-center justify-between gap-4 w-full">
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div className="relative w-full h-9 bg-indigo-50 hover:bg-indigo-100 rounded-lg overflow-hidden border border-indigo-100 flex items-center z-0 cursor-help transition-colors">
                      <div className="absolute top-0 left-0 h-full bg-indigo-100 shadow-[0_2px_15px_rgba(79,70,229,0.1)] transition-all duration-1000 -z-10 rounded-r-lg" style={{ width: `${Math.min(100, Math.round(((dynamicCashbackStats?.currentSpend || 0) / Math.max(1, dynamicCashbackStats?.minSpend || 1)) * 100))}%` }} />
                      <div className="flex items-center px-4 gap-2 w-full min-w-0">
                         <TrendingUp className="h-4 w-4 text-indigo-500 shrink-0" />
                         <span className="text-[11px] font-black text-indigo-700 uppercase tracking-widest shrink-0">GOAL {Math.min(100, Math.round(((dynamicCashbackStats?.currentSpend || 0) / Math.max(1, dynamicCashbackStats?.minSpend || 1)) * 100))}%</span>
                         <div className="h-4 w-px bg-indigo-200/50 mx-2 shrink-0" />
                         <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 truncate min-w-0 ml-auto justify-end">
                            {dynamicCashbackStats?.is_min_spend_met ? (
                                <span className="text-emerald-600 tracking-wider">SUCCESS QUALIFIED</span>
                            ) : (
                                <span className="tracking-wider flex gap-1 items-center">
                                  <span className="text-slate-400 hidden xl:inline">NEEDS</span> 
                                  <span className="text-rose-600 text-[12px] font-extrabold drop-shadow-[0_0_12px_rgba(225,29,72,0.4)]">{formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))}</span>
                                </span>
                            )}
                            <span className="tracking-wider flex gap-1"><span className="text-slate-400 hidden xl:inline">SPENT</span> <span className="text-indigo-900">{formatMoneyVND(Math.ceil(dynamicCashbackStats?.currentSpend || 0))}</span></span>
                         </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-indigo-950 border border-indigo-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-4 rounded-xl text-white w-[320px] z-[120]" sideOffset={10}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 border-b border-indigo-800/50 pb-2"><Zap className="h-4 w-4 text-emerald-400" /><h4 className="font-black text-[12px] uppercase tracking-widest text-white">Rule Qualification</h4></div>
                      <p className="text-[12px] leading-relaxed text-indigo-200 indent">
                        {dynamicCashbackStats?.is_min_spend_met ? "TARGET MET: Minimum cycle spending requirement achieved. Rule multipliers are unlocked." : `Missing ${formatMoneyVND(Math.max(0, (dynamicCashbackStats?.minSpend || 0) - (dynamicCashbackStats?.currentSpend || 0)))} more to unlock rewards.`}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-indigo-600 rounded-full h-9 text-[11px] font-black uppercase tracking-wider shrink-0 whitespace-nowrap shadow-sm hover:shadow hover:bg-slate-50 active:scale-95 transition-all outline-none">
                 <Calendar className="h-4 w-4 text-indigo-400" /> {dynamicCashbackStats?.cycle?.label || selectedCycle || "NOT SET"}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );

}
