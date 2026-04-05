"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Account, Category } from "@/types/moneyflow.types";
import {
  AccountColumnConfig,
  AccountColumnKey,
} from "@/hooks/useAccountColumnPreferences";
import { AccountRowDetailsV2 } from "./AccountRowDetailsV2";
import { Button } from "@/components/ui/button";
import { VietnameseCurrency } from "@/components/ui/vietnamese-currency";
import {
  Edit,
  Wallet,
  HandCoins,
  Banknote,
  ArrowRightLeft,
  CreditCard,
  ArrowUpRight,
  Loader2,
  LucideIcon,
  Network,
  TrendingUp,
  Zap,
  Users,
  Building2,
  User,
  CircleDashed,
  Crown,
  UserSquare2,
  ArrowLeft,
  ArrowRight,
  Copy,
  Database,
  Check,
  FileSpreadsheet,
  ExternalLink,
  MoreHorizontal,
  History,
  Sigma,
  ChevronRight,
  Calculator,
  CalendarDays,
  Hourglass,
} from "lucide-react";
import { normalizeCashbackConfig } from "@/lib/cashback";

import { cn, formatCompactMoney, formatMoneyVND } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AccountCycleTransactionsModal } from "./AccountCycleTransactionsModal";
// Quick Edit
import { TransactionSlideV2 } from "@/components/transaction/slide-v2/transaction-slide-v2";
import { getPeopleAction } from "@/actions/people-actions";
import { getShopsAction } from "@/actions/shop-actions";
import { Person } from "@/types/moneyflow.types";
import { Shop } from "@/types/moneyflow.types";
import { toast } from "sonner";
import { isToday, isTomorrow, startOfDay } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AccountRewardsCell } from "./cells/account-rewards-cell";
import { getEffectiveCreditLimit } from "@/lib/account-family";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface AccountRowProps {
  account: Account;
  visibleColumns: AccountColumnConfig[];
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onEdit: (account: Account) => void;
  onLend: (account: Account) => void;
  onRepay: (account: Account) => void;
  onPay: (account: Account) => void;
  onTransfer: (account: Account) => void;
  onClone?: (account: Account) => void;
  onAudit: (account: Account) => void;
  onOpenPending?: (account: Account) => void;
  familyBalance?: number;
  allAccounts?: Account[];
  categories?: Category[];
  people?: Person[];
  pendingSummaryMap?: Record<
    string,
    {
      count: number;
      totalAmount: number;
      accountName?: string | null;
    }
  >;
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function AccountRowV2({
  account,
  visibleColumns,
  isExpanded,
  onToggleExpand,
  onEdit,
  onLend,
  onRepay,
  onPay,
  onTransfer,
  onClone,
  onAudit,
  onOpenPending,
  familyBalance,
  allAccounts,
  categories,
  people: initialPeople,
  pendingSummaryMap,
}: AccountRowProps) {
  const router = useRouter();
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [modalRefreshKey, setModalRefreshKey] = useState(0);

  const [editingTransactionId, setEditingTransactionId] = useState<
    string | null
  >(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [copied, setCopied] = useState(false);

  const handleEditTransaction = (id: string) => {
    if (people.length === 0 || shops.length === 0) {
      Promise.all([getPeopleAction(), getShopsAction()]).then(([p, s]) => {
        setPeople(p);
        setShops(s);
        setEditingTransactionId(id);
      });
    } else {
      setEditingTransactionId(id);
    }
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpand(account.id);
  };

  const onEditTransaction = (id: string) => {
    handleEditTransaction(id);
  };

  const renderCell = (key: AccountColumnKey) => {
    const stats = account.stats;

    const renderRoleBadge = (role: "parent" | "child" | "standalone") => {
      const base =
        "h-7 px-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-lg border-2 flex items-center justify-center gap-2 w-[115px] shadow-sm transition-all duration-300";
      if (role === "parent") {
        return (
          <div
            className={cn(
              base,
              "bg-indigo-600 text-white border-indigo-500 shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5",
            )}
          >
            <Users className="w-3.5 h-3.5 fill-current" />
            <span>Parent</span>
          </div>
        );
      }
      if (role === "child") {
        return (
          <div
            className={cn(
              base,
              "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:-translate-y-0.5",
            )}
          >
            <UserSquare2 className="w-3.5 h-3.5" />
            <span>Child</span>
          </div>
        );
      }
      return (
        <div
          className={cn(
            base,
            "bg-slate-50 text-slate-500 border-slate-200 shadow-none opacity-80",
          )}
        >
          <User className="w-3.5 h-3.5 opacity-60" />
          <span>Solo</span>
        </div>
      );
    };

    const renderOwnershipBadge = (
      type: "me" | "relative" | "other",
      personId?: string | null,
    ) => {
      const base =
        "w-8 h-8 flex items-center justify-center rounded-none border-2 shadow-sm transition-all duration-300 shrink-0 cursor-help group/owner";
      let content;
      let tooltipLabel = "Other";

      if (!type || type === "me") {
        content = (
          <div
            className={cn(
              base,
              "bg-amber-400 text-amber-950 border-amber-500 hover:shadow-amber-400/30 hover:scale-110",
            )}
          >
            <Crown className="w-4 h-4 fill-current animate-pulse" />
          </div>
        );
        tooltipLabel = "Personal Ownership (Mine)";
      } else if (type === "relative") {
        const p = people?.find((p) => p.id === personId);
        tooltipLabel = p?.name ? `Owner: ${p.name}` : "Family Member";
        content = (
          <div
            className={cn(
              base,
              "bg-white border-sky-400 p-0 hover:border-sky-600 hover:scale-110",
            )}
          >
            {p?.image_url ? (
              <img
                src={p.image_url}
                className="w-full h-full rounded-none object-cover"
                alt=""
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-sky-50 text-sky-600">
                <Users className="w-4 h-4" />
              </div>
            )}
          </div>
        );
      } else {
        content = (
          <div
            className={cn(
              base,
              "bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-500 hover:scale-110",
            )}
          >
            <Building2 className="w-4 h-4" />
          </div>
        );
        tooltipLabel = "Corporate / Other Ownership";
      }

      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent className="p-2 shadow-xl border-slate-200 rounded-xl">
              {type === "relative" ? (
                (() => {
                  const p = people?.find((p) => p.id === personId);
                  return (
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-none overflow-hidden bg-slate-100 border border-slate-200">
                        {p?.image_url ? (
                          <img
                            src={p.image_url}
                            className="w-full h-full object-contain"
                            alt=""
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase tracking-tighter text-[10px]">
                            No Img
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                          RELATIVE OWNER
                        </p>
                        <p className="text-[12px] font-bold text-slate-900 leading-tight">
                          {p?.name || "Unknown"}
                        </p>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <p className="text-[10px] font-black uppercase tracking-widest px-1">
                  {tooltipLabel}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    };

    const formatMoneyVND = (amount: number) =>
      new Intl.NumberFormat("vi-VN").format(Math.abs(amount));

    const getPlaceholderIcon = (type: string): LucideIcon => {
      switch (type) {
        case "credit_card":
          return CreditCard;
        case "bank":
          return Banknote;
        case "ewallet":
          return Wallet;
        case "savings":
          return ArrowUpRight;
        case "debt":
          return HandCoins;
        default:
          return Wallet;
      }
    };

    const renderIcon = (
      type: string,
      url: string | null | undefined,
      name: string,
      sizeClass: string = "w-4 h-4",
    ) => {
      if (url)
        return (
          <img
            src={url}
            className={cn(sizeClass, "object-contain rounded-none")}
            alt=""
          />
        );
      const Icon = getPlaceholderIcon(type);
      return (
        <div
          className={cn(
            sizeClass,
            "flex items-center justify-center bg-indigo-50/50 rounded text-indigo-400 p-0.5 shadow-inner",
          )}
        >
          <Icon className="w-full h-full" />
        </div>
      );
    };

    switch (key) {
      case "account": {
        const children =
          allAccounts?.filter(
            (a: Account) => a.parent_account_id === account.id,
          ) || [];

        const MainPlaceholderIcon = getPlaceholderIcon(account.type);

        return (
          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="flex items-center gap-3 w-full">
              <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-none overflow-hidden">
                {account.image_url ? (
                  <img
                    src={account.image_url}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 p-2 rounded-none">
                    <MainPlaceholderIcon className="w-full h-full" />
                  </div>
                )}
              </div>

              {/* Action Icons (Moved between Image and Name with colors) */}
              <div className="flex items-center gap-1 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-200">
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md border border-blue-100/50 bg-blue-50/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(account.id);
                          toast.success("Account ID copied");
                        }}
                      >
                        <div className="flex items-center gap-1 px-1 py-0.5 text-[8px] font-black uppercase tracking-tighter">
                          ID
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Copy Account ID: {account.id}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md border border-indigo-100/50 bg-indigo-50/20"
                        onClick={(e) => e.stopPropagation()}
                        asChild
                      >
                        <Link href={`/accounts/${account.id}`} target="_blank">
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Open in New Tab</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-md border border-amber-100/50 bg-amber-50/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://api-db.reiwarden.io.vn/_/#/collections?collection=pvl_acc_001&filter=${account.id}&sort=-%40rowid&recordId=${account.id}`, '_blank');
                        }}
                      >
                        <Database className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Open in PocketBase Admin</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center justify-between min-w-0 flex-1 gap-3">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 group/name-row">
                    <Link
                      href={`/accounts/${account.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm tracking-tight text-slate-900 hover:text-indigo-600 hover:underline transition-all truncate max-w-[150px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {account.name}
                    </Link>

                  </div>

                  {/* Sub-row for Receiver Info (Standardized location) */}
                  <div className="flex items-center gap-1.5 min-w-0 mt-0.5 whitespace-nowrap">
                    {account.receiver_name && (
                      <span
                        className="text-[10px] font-bold text-slate-400 truncate max-w-[90px]"
                        title={account.receiver_name}
                      >
                        {account.receiver_name}
                      </span>
                    )}
                    {account.receiver_name && account.account_number && (
                      <span className="h-0.5 w-0.5 rounded-full bg-slate-200" />
                    )}
                    {account.account_number && (
                      <code className="text-[9px] font-bold text-slate-400 tracking-tight bg-slate-50 px-1 rounded-sm border border-slate-100">
                        {account.account_number}
                      </code>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-nowrap items-center gap-1.5 justify-end whitespace-nowrap">
                {/* 1. Cashback Category Badges (Moved to first) */}
                {(() => {
                  if (!account.cashback_config) return null;
                  try {
                    const config = normalizeCashbackConfig(
                      account.cashback_config,
                      account,
                    );
                    const levels = config.levels || [];
                    const firstLevel = levels[0];
                    const rules = firstLevel?.rules || [];
                    const defaultRate =
                      firstLevel?.defaultRate ?? config.defaultRate ?? 0;

                    const hasRules = Array.isArray(rules) && rules.length > 0;
                    if (!hasRules && defaultRate === 0) return null;

                    const catIds = new Set<string>();
                    if (hasRules) {
                      rules.forEach((r: any) => {
                        if (Array.isArray(r.categoryIds))
                          r.categoryIds.forEach((id: string) => catIds.add(id));
                        if (r.categoryId) catIds.add(r.categoryId);
                        if (Array.isArray(r.category_ids))
                          r.category_ids.forEach((id: string) =>
                            catIds.add(id),
                          );
                      });
                    }

                    const allCatIds = Array.from(catIds);
                    const mainCatId = allCatIds[0];
                    const mainCat = categories?.find((c) => c.id === mainCatId);
                    const remainingCount = allCatIds.length - 1;

                    const badgeLabel = hasRules
                      ? mainCat
                        ? mainCat.name
                        : "Rules"
                      : "All Categories";

                    const badgeRate =
                      hasRules && rules[0]?.rate !== undefined
                        ? rules[0].rate
                        : defaultRate;

                    return (
                      <div className="flex items-center gap-1.5 font-sans">
                        <TooltipProvider>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-1.5 bg-indigo-50/50 border border-indigo-100/50 rounded-md px-2 py-0.5 hover:bg-indigo-100/50 transition-all cursor-help group/rewards shadow-sm">
                                <Zap className="w-3 h-3 text-indigo-500 animate-pulse" />
                                <div className="flex items-center gap-1 text-[10px] font-black text-indigo-700 uppercase tracking-tight">
                                  <span className="truncate max-w-[110px]">
                                    {badgeLabel}
                                  </span>
                                  <span className="text-indigo-400 font-bold ml-0.5">
                                    {(badgeRate * 100).toFixed(1)}%
                                  </span>
                                </div>
                                {remainingCount > 0 && (
                                  <span className="text-[9px] font-black text-indigo-400 border-l border-indigo-200/50 pl-1.5 ml-0.5">
                                    +{remainingCount}
                                  </span>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="p-0 border-none bg-transparent shadow-2xl"
                            >
                              <div className="w-[300px] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                                <div className="bg-indigo-600 px-3.5 py-2.5 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-white fill-white/20" />
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">
                                      Rewards Program
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-bold text-indigo-100 bg-white/10 px-2 py-0.5 rounded-full">
                                    {hasRules
                                      ? `${allCatIds.length} categories`
                                      : "Flat Rate"}
                                  </span>
                                </div>
                                <div className="p-3 space-y-1">
                                  {hasRules ? (
                                    allCatIds.map((cid) => {
                                      const cat = categories?.find(
                                        (c) => c.id === cid,
                                      );
                                      if (!cat) return null;
                                      return (
                                        <div
                                          key={cid}
                                          className="flex items-center justify-between gap-4 group/cat py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-1 rounded-lg transition-colors"
                                        >
                                          <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-base leading-none drop-shadow-sm">
                                              {cat.icon || "🎯"}
                                            </span>
                                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">
                                              {cat.name}
                                            </span>
                                          </div>
                                          <div className="flex flex-col items-end">
                                            <span className="text-[11px] font-black text-emerald-600">
                                              {(
                                                (rules.find((r: any) =>
                                                  r.categoryIds?.includes(cid),
                                                )?.rate ?? 0) * 100
                                              ).toFixed(1)}
                                              %
                                            </span>
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <div className="py-2 flex items-center justify-between">
                                      <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">
                                        General Spend
                                      </span>
                                      <span className="text-[11px] font-black text-emerald-600">
                                        {(defaultRate * 100).toFixed(1)}%
                                      </span>
                                    </div>
                                  )}
                                </div>
                                {hasRules && defaultRate > 0 && (
                                  <div className="bg-slate-50/80 border-t border-slate-100 px-3 py-2 flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase">
                                      Other spend
                                    </span>
                                    <span className="text-[9px] font-black text-slate-700">
                                      {(defaultRate * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                )}
                                <div className="bg-slate-50 border-t border-slate-100 px-3 py-1.5">
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter text-center italic">
                                    Detailed MCC matching is required for
                                    cashback eligibility
                                  </p>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    );
                  } catch (e) {
                    return null;
                  }
                })()}
              </div>

              {isExpanded && children.length > 0 && (
                <div className="ml-10 flex flex-col gap-1 border-l-2 border-indigo-100 pl-3 py-1 mt-2">
                  {children.map((child: Account) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between gap-2 py-0.5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-white rounded-none overflow-hidden p-1">
                          {child.image_url ? (
                            <img
                              src={child.image_url}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            (() => {
                              const Placeholder = getPlaceholderIcon(
                                child.type,
                              );
                              return (
                                <Placeholder className="w-full h-full text-slate-200" />
                              );
                            })()
                          )}
                        </div>
                        <Link
                          href={`/accounts/${child.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {child.name}
                        </Link>
                      </div>
                      <span className="text-[10px] font-black tabular-nums text-slate-400">
                        {formatMoneyVND(child.current_balance || 0)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      }
      case "role": {
        const isCC = account.type === "credit_card";
        const accountSlug = (account as any)?.slug as string | undefined;
        const hasChildren =
          allAccounts?.some(
            (item) =>
              item.parent_account_id === account.id ||
              (accountSlug ? item.parent_account_id === accountSlug : false),
          ) ?? false;
        const isParent = !!account.relationships?.is_parent || hasChildren;
        const parentHintId = account.relationships?.parent_info?.id || null;
        const rawParentRef = account.parent_account_id || parentHintId || null;
        const parentAcc = isParent
          ? null
          : allAccounts?.find(
              (item) =>
                item.id === rawParentRef ||
                ((item as any)?.slug && (item as any).slug === rawParentRef),
            );
        const inferredParentAcc = isParent
          ? null
          : allAccounts?.find((item) =>
              (item.relationships?.child_accounts || []).some(
                (child: any) =>
                  child.id === account.id ||
                  child.id === rawParentRef ||
                  (accountSlug ? child.id === accountSlug : false),
              ),
            );
        const effectiveParentAcc = parentAcc || inferredParentAcc || null;

        const groupRefs = new Set<string>();
        const knownChildIds = new Set<string>(
          ((isParent ? account.relationships?.child_accounts : effectiveParentAcc?.relationships?.child_accounts) || [])
            .map((child: any) => String(child?.id || ""))
            .filter(Boolean),
        );
        if (isParent) {
          groupRefs.add(account.id);
          if (accountSlug) groupRefs.add(accountSlug);
        } else {
          if (rawParentRef) groupRefs.add(rawParentRef);
          if (effectiveParentAcc?.id) groupRefs.add(effectiveParentAcc.id);
          const parentSlug = (effectiveParentAcc as any)?.slug as string | undefined;
          if (parentSlug) groupRefs.add(parentSlug);
        }

        const relatedAccounts = allAccounts
          ? allAccounts.filter(
              (item) =>
                item.id !== account.id &&
                (
                  knownChildIds.has(item.id) ||
                  groupRefs.has(item.id) ||
                  groupRefs.has(item.parent_account_id || "")
                ),
            )
          : [];

        const isStandalone = !isParent && !effectiveParentAcc;
        const parentLimit = isCC ? (isParent ? account.credit_limit : effectiveParentAcc?.credit_limit) || 0 : 0;
        const singleCardDebt = Math.abs(account.current_balance || 0);
        const peopleSource = (people.length > 0 ? people : (initialPeople || []));
        const ownerPerson = account.holder_person_id
          ? peopleSource.find((p) => p.id === account.holder_person_id)
          : undefined;

        const renderAccountBadge = (acc: Account | null) => (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div className="h-9 w-[52px] inline-flex items-center justify-center cursor-help">
                  <div className="h-9 w-12 rounded-none overflow-hidden bg-transparent flex items-center justify-center">
                    {acc?.image_url ? (
                      <img src={acc.image_url} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <Wallet className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-[10px] font-bold">
                {acc ? `${acc.name} (${acc.id})` : 'No linked account'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );

        const renderOwnerBadge = () => {
          if (account.holder_type === 'relative' && ownerPerson) {
            return (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div className="h-9 inline-flex items-center cursor-help">
                      <div className="h-9 w-12 rounded-none overflow-hidden bg-transparent flex items-center justify-center">
                        {ownerPerson.image_url ? (
                          <img src={ownerPerson.image_url} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <User className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-[10px] font-bold">
                    {`Owner: ${ownerPerson.name}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          return (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <div className="h-9 w-12 inline-flex items-center justify-center cursor-help">
                    <div className="h-9 w-12 rounded-none bg-transparent flex items-center justify-center">
                      <Crown className="h-4 w-4 text-amber-500" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-[10px] font-bold">Owner: Me</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        };

        return (
          <div className="flex flex-col items-center justify-center min-w-[185px] gap-1 group/role-cell">
            {/* Singular debt view per row */}
            {isCC && parentLimit > 0 && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50/50 border border-indigo-100/50 rounded-full text-[9px] font-black text-indigo-500 tabular-nums shadow-[0_1px_2px_rgba(0,0,0,0.02)] mb-0.5 transition-all group-hover/role-cell:bg-indigo-100 group-hover/role-cell:border-indigo-200 whitespace-nowrap">
                <Sigma className="w-2.5 h-2.5" />
                <span>Single Debt: {formatMoneyVND(singleCardDebt)}</span>
              </div>
            )}

              <div className="grid w-full grid-cols-[108px_14px_52px_28px_14px_42px] items-center justify-items-center gap-x-1">
              <div
                className={cn(
                    "h-8 w-[108px] px-2 rounded-full border inline-flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap",
                  isParent
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : isStandalone
                      ? "bg-slate-100 text-slate-700 border-slate-300"
                      : "bg-white text-slate-700 border-slate-200",
                )}
              >
                {isParent ? <Crown className="h-3 w-3" /> : isStandalone ? <Wallet className="h-3 w-3" /> : <UserSquare2 className="h-3 w-3" />}
                <span>{isParent ? 'Parent' : isStandalone ? 'Standalone' : 'Child'}</span>
              </div>

              {isParent ? (
                <>
                  <ArrowLeft className="h-3.5 w-3.5 text-slate-400" />
                  <HoverCard openDelay={120} closeDelay={80}>
                    <HoverCardTrigger asChild>
                      <div>
                        {renderAccountBadge(relatedAccounts[0] || null)}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72 p-2 space-y-1.5" align="start">
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-1">Children</div>
                      {relatedAccounts.length > 0 ? relatedAccounts.map((child) => (
                        <div key={child.id} className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5">
                          <div className="h-6 w-6 rounded-none overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                            {child.image_url ? (
                              <img src={child.image_url} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <Wallet className="h-3 w-3 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-slate-700 truncate">{child.name}</div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-[10px] text-slate-400 italic px-1 py-1">No child linked</div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                  <span
                    className={cn(
                      "h-6 min-w-[24px] px-1 inline-flex items-center justify-center rounded-md text-[10px] font-black leading-none",
                      relatedAccounts.length > 1
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                        : "border border-transparent text-transparent",
                    )}
                  >
                    {relatedAccounts.length > 1 ? `+${relatedAccounts.length - 1}` : "+0"}
                  </span>
                </>
              ) : !isStandalone ? (
                <>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  {renderAccountBadge(effectiveParentAcc)}
                  <span className="h-6 min-w-[24px] px-1 inline-flex items-center justify-center border border-transparent text-transparent text-[10px] font-black leading-none">
                    +0
                  </span>
                </>
              ) : (
                <>
                  <span className="h-3.5 w-3.5" />
                  <span className="h-9 w-[52px]" />
                  <span className="h-6 min-w-[24px]" />
                </>
              )}

              <Network className="h-3.5 w-3.5 text-slate-400" />
              {renderOwnerBadge()}
            </div>
          </div>
        );
      }
      case "limit": {
        const isCC = account.type === "credit_card";

        if (!isCC) {
          return (
            <div className="flex flex-col items-end justify-center min-w-[140px] py-1 text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-2">
                Status / Type
              </span>
              <div className="flex items-center gap-1.5">
                {account.secured_by_account_id ? (
                  <span className="h-5 px-2.5 flex items-center bg-indigo-500/10 text-indigo-600 border border-indigo-200 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-sm shadow-sm shadow-indigo-500/5">
                    Secured
                  </span>
                ) : (
                  <span className="h-5 px-2.5 flex items-center bg-slate-500/5 text-slate-500 border border-slate-200 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-sm">
                    {account.type === "savings"
                      ? "Savings"
                      : account.type === "ewallet"
                        ? "Digital Wallet"
                        : "Checking"}
                  </span>
                )}
              </div>
            </div>
          );
        }

        const accountSlug = (account as any)?.slug as string | undefined;
        const hasChildren =
          allAccounts?.some(
            (item) =>
              item.parent_account_id === account.id ||
              (accountSlug ? item.parent_account_id === accountSlug : false),
          ) || false;
        const isParent = !!account.relationships?.is_parent || hasChildren;
        const parentHintId = account.relationships?.parent_info?.id || null;
        const rawParentRef = account.parent_account_id || parentHintId || null;
        const parentAcc = isParent
          ? null
          : allAccounts?.find(
              (item) =>
                item.id === rawParentRef ||
                ((item as any)?.slug && (item as any).slug === rawParentRef),
            );
        const inferredParentAcc = isParent
          ? null
          : allAccounts?.find((item) =>
              (item.relationships?.child_accounts || []).some(
                (child: any) =>
                  child.id === account.id ||
                  child.id === rawParentRef ||
                  (accountSlug ? child.id === accountSlug : false),
              ),
            );
        const effectiveParentAccount = parentAcc || inferredParentAcc || null;

        const groupRefs = new Set<string>();
        const knownChildIds = new Set<string>(
          ((isParent ? account.relationships?.child_accounts : effectiveParentAccount?.relationships?.child_accounts) || [])
            .map((child: any) => String(child?.id || ""))
            .filter(Boolean),
        );
        if (isParent) {
          groupRefs.add(account.id);
          if (accountSlug) groupRefs.add(accountSlug);
        } else {
          if (rawParentRef) groupRefs.add(rawParentRef);
          if (effectiveParentAccount?.id) groupRefs.add(effectiveParentAccount.id);
          const parentSlug = (effectiveParentAccount as any)?.slug as string | undefined;
          if (parentSlug) groupRefs.add(parentSlug);
        }

        const displayLimit = effectiveParentAccount
          ? effectiveParentAccount.credit_limit || 0
          : account.credit_limit || 0;

        const familyDebt = allAccounts
          ? allAccounts
              .filter(
                (item) =>
                  knownChildIds.has(item.id) ||
                  groupRefs.has(item.id) ||
                  groupRefs.has(item.parent_account_id || ""),
              )
              .reduce((sum, item) => sum + (item.current_balance || 0), 0)
          : account.current_balance || 0;

        const familyDebtAbs = Math.abs(familyDebt);
        const limit = displayLimit;
        // Logic: High remaining (100%) is Good/Indigo, Low remaining (<10%) is Danger/Rose
        const remainingPercent =
          limit > 0 ? Math.max(0, 100 - (familyDebtAbs / limit) * 100) : 0;
        const remainingPercLabel = remainingPercent.toFixed(0);
        const hasWaiver = !!(
          account.stats?.annual_fee_waiver_target &&
          account.stats.annual_fee_waiver_target > 0
        );

        return (
          <div className="flex flex-col items-end gap-1.5 min-w-[160px] py-1">
            <div className="flex flex-col items-end gap-1.5 w-full group/limit">
              <div className="flex items-center gap-2 justify-end w-full px-0.5 min-h-[16px]">
                {!!account.secured_by_account_id && (
                  <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <div className="h-4 px-1.5 flex items-center justify-center bg-indigo-600 text-white border border-indigo-700 rounded-[4px] text-[8px] font-black uppercase tracking-widest cursor-help leading-none shadow-md shadow-indigo-600/10">
                          SECURED
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const secured = allAccounts?.find(
                              (a) => a.id === account.secured_by_account_id,
                            );
                            return secured ? (
                              <>
                                {renderIcon(
                                  secured.type,
                                  secured.image_url,
                                  secured.name,
                                )}
                                <span>Secured by {secured.name}</span>
                              </>
                            ) : (
                              "Secured by collateral"
                            );
                          })()}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {!!(
                  account.stats?.annual_fee_waiver_target &&
                  account.stats.annual_fee_waiver_target > 0
                ) &&
                  (() => {
                    const target = account.stats.annual_fee_waiver_target || 0;
                    const rawSpent = account.stats.spent_this_cycle || 0;
                    const currentBalanceAbs = Math.abs(
                      account.current_balance || 0,
                    );
                    const spent = Math.max(rawSpent, currentBalanceAbs);
                    const remaining = target - spent;
                    const isMet = remaining <= 0;

                    const formatWaiverAmount = (val: number) => {
                      const absVal = Math.abs(val);
                      if (absVal >= 1000000)
                        return (val / 1000000).toFixed(1) + "tr";
                      return formatCompactMoney(val);
                    };

                    return (
                      <div
                        className={cn(
                          "h-4 px-2 flex items-center justify-center border rounded-[4px] text-[8px] font-black leading-none shadow-sm uppercase tracking-wider",
                          isMet
                            ? "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20"
                            : "bg-amber-100 text-amber-900 border-amber-300",
                        )}
                      >
                        {isMet
                          ? "Waiver met"
                          : `Needs ${formatWaiverAmount(remaining)}`}
                      </div>
                    );
                  })()}
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Limit</span>
                <TooltipProvider>
                  <Tooltip delayDuration={250}>
                    <TooltipTrigger asChild>
                      <span
                        className={cn(
                          "h-5 px-2 rounded-full inline-flex items-center text-[9px] font-black uppercase tracking-wider border cursor-help",
                          displayLimit > 100000000
                            ? "bg-rose-100 text-rose-700 border-rose-200"
                            : displayLimit >= 50000000
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200",
                        )}
                      >
                        {displayLimit ? formatMoneyVND(displayLimit) : "—"}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-white border-slate-200 text-slate-700">
                      <div className="text-[10px] font-bold mb-1">Limit (Text)</div>
                      <VietnameseCurrency amount={displayLimit} variant="none" className="text-[11px]" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {displayLimit > 0 && (
                <div className="w-full flex flex-col items-end gap-1">
                  <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <span
                            className={cn(
                              "h-6 px-2 rounded-full inline-flex items-center text-[8px] font-black uppercase tracking-wider gap-1.5 whitespace-nowrap",
                              remainingPercent < 10
                                ? "bg-rose-100 text-rose-700 border border-rose-200"
                                : remainingPercent < 30
                                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                                  : "bg-indigo-100 text-indigo-700 border border-indigo-200",
                            )}
                          >
                            <Calculator className="w-2.5 h-2.5 opacity-60" />
                            <span>{remainingPercLabel}% Remaining</span>
                            <span className="opacity-50">•</span>
                            <span>Debt {numberFormatter.format(familyDebtAbs)}</span>
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="left"
                        className="p-4 min-w-[280px] bg-slate-900/95 backdrop-blur-xl text-slate-100 border-white/10 shadow-2xl z-[70] rounded-2xl font-sans"
                      >
                        <div className="space-y-5">
                          {/* Section 1: Balance Calculation */}
                          <div className="space-y-3">
                            <p className="text-[10px] font-black text-indigo-400 underline underline-offset-4 decoration-2 uppercase tracking-widest flex items-center gap-2">
                              <Calculator className="w-4 h-4" />
                              Balance Formula
                            </p>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-400">
                                  Card Active Debt:
                                </span>
                                <span className="font-bold tabular-nums text-white">
                                  {formatMoneyVND(Math.abs(account.current_balance || 0))}
                                </span>
                              </div>
                              {familyDebtAbs > Math.abs(account.current_balance || 0) && (
                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-400">
                                    Other Family Cards:
                                  </span>
                                  <span className="font-bold tabular-nums text-indigo-300">
                                    + {formatMoneyVND(familyDebtAbs - Math.abs(account.current_balance || 0))}
                                  </span>
                                </div>
                              )}
                              <div className="pt-2 mt-2 border-t border-white/10 flex justify-between gap-4">
                                <span className="text-indigo-400 font-black uppercase text-[10px]">
                                  Family Liability:
                                </span>
                                <span className="font-black text-indigo-400 text-lg tabular-nums">
                                  {formatMoneyVND(familyDebtAbs)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Section 2: Waiver Progress (Integrated) */}
                          {hasWaiver && (
                            <div className="space-y-3 pt-3 border-t border-white/10">
                              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4 fill-amber-400" />
                                Fee Waiver Progress
                              </p>
                              <div className="space-y-2 text-sm bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-400">
                                    Total Spent:
                                  </span>
                                  <span className="font-bold tabular-nums text-amber-200">
                                    {formatMoneyVND(
                                      account.stats?.spent_this_cycle || 0,
                                    )}
                                  </span>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <span className="text-slate-400">
                                    Annual Target:
                                  </span>
                                  <span className="font-bold tabular-nums text-white">
                                    {formatMoneyVND(
                                      account.stats?.annual_fee_waiver_target ||
                                        0,
                                    )}
                                  </span>
                                </div>

                                {/* Mini Progress Bar in Tooltip */}
                                <div className="h-2 w-full bg-white/10 rounded-full mt-2 overflow-hidden border border-white/5">
                                  <div
                                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
                                    style={{
                                      width: `${Math.min(100, account.stats?.annual_fee_waiver_progress || 0)}%`,
                                    }}
                                  >
                                    <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                                  </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] pt-1 font-black">
                                  <span className="text-slate-500 uppercase">
                                    Current Progress
                                  </span>
                                  <span className="text-amber-400">
                                    {(
                                      account.stats
                                        ?.annual_fee_waiver_progress || 0
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="w-[170px] h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
                    <div
                      className={cn(
                        "h-full transition-all duration-500",
                        remainingPercent < 20
                          ? "bg-rose-500"
                          : remainingPercent <= 80
                            ? "bg-amber-500"
                            : "bg-emerald-500",
                      )}
                      style={{ width: `${Math.max(0, Math.min(100, remainingPercent))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }
      case "rewards": {
        const isCC = account.type === "credit_card";

        if (!isCC) {
          // For non-credit cards, the "Rewards" column is used for "Interest & Fees"
          return (
            <div className="flex flex-col items-end justify-center min-w-[150px] py-1 text-right  group/rewards">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-2 text-nowrap">
                Interest & Benefits
              </span>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-xs font-black text-emerald-600 tabular-nums bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 group-hover/rewards:bg-emerald-500 group-hover/rewards:text-white transition-all duration-300">
                  0.0% / yr
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">
                  No Maint. Fees
                </span>
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-col items-end justify-center min-w-[150px] transition-transform duration-300 hover:scale-[1.02]">
            <AccountRewardsCell
              account={account}
              categories={categories}
              onOpenTransactions={() => setIsTransactionsModalOpen?.(true)}
            />
            <AccountCycleTransactionsModal
              open={isTransactionsModalOpen || false}
              onOpenChange={setIsTransactionsModalOpen || (() => {})}
              accountId={account.id}
              accountName={account.name}
              cycleDisplay={(stats?.cycle_range as string) || ""}
              onEditTransaction={onEditTransaction || (() => {})}
              refreshKey={modalRefreshKey}
            />
          </div>
        );
      }
      case "due": {
        const isDueAccount =
          account.type === "credit_card" || account.type === "debt";
        const dueDateRaw = stats?.due_date || (account as any)?.due_date || null;

        const resolveDueDate = (): Date | null => {
          if (!dueDateRaw) return null;

          if (dueDateRaw instanceof Date && !Number.isNaN(dueDateRaw.getTime())) {
            return dueDateRaw;
          }

          // Many accounts store only due day (e.g., 21). Map it to next calendar occurrence.
          const rawText = String(dueDateRaw).trim();
          const isNumericDay = /^\d{1,2}$/.test(rawText);
          if (isNumericDay) {
            const day = Number(rawText);
            if (day >= 1 && day <= 31) {
              const now = new Date();
              const y = now.getFullYear();
              const m = now.getMonth();
              const clampDay = (year: number, month: number, d: number) => {
                const endOfMonth = new Date(year, month + 1, 0).getDate();
                return Math.min(d, endOfMonth);
              };

              const thisMonthDay = clampDay(y, m, day);
              const candidate = new Date(y, m, thisMonthDay);
              candidate.setHours(0, 0, 0, 0);

              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (candidate >= today) return candidate;

              const nextMonth = m === 11 ? 0 : m + 1;
              const nextYear = m === 11 ? y + 1 : y;
              const nextMonthDay = clampDay(nextYear, nextMonth, day);
              const nextCandidate = new Date(nextYear, nextMonth, nextMonthDay);
              nextCandidate.setHours(0, 0, 0, 0);
              return nextCandidate;
            }
          }

          const parsed = new Date(rawText);
          return Number.isNaN(parsed.getTime()) ? null : parsed;
        };

        const dueDate = resolveDueDate();
        let daysLeft = Infinity;
        if (dueDate) {
          const diffTime = dueDate.getTime() - new Date().getTime();
          daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        const pendingCount = Number(pendingSummaryMap?.[account.id]?.count || 0);
        const pendingTotalAmount = Number(pendingSummaryMap?.[account.id]?.totalAmount || 0);

        const formatDate = (date: Date | null) =>
          date
            ? new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
              }).format(date)
            : "";

        if (!isDueAccount && pendingCount === 0) {
          return (
            <div className="flex justify-center">
              <span
                className="h-6 px-2.5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 text-[9px] font-black uppercase tracking-wider text-slate-400"
              >
                No Due Date
              </span>
            </div>
          );
        }

        const isDueToday = dueDate ? isToday(startOfDay(dueDate)) : false;
        const isDueTomorrow = dueDate ? isTomorrow(startOfDay(dueDate)) : false;

        const tone = isDueToday
          ? "border-rose-300 bg-rose-50 text-rose-700"
          : isDueTomorrow || (daysLeft > 0 && daysLeft <= 5)
            ? "border-rose-300 bg-rose-50 text-rose-700"
            : daysLeft <= 0
              ? "border-rose-300 bg-rose-50 text-rose-700"
              : "border-emerald-300 bg-emerald-50 text-emerald-700";

        const labelDate = formatDate(dueDate);
        const [month, day] = (labelDate || "").split(" ");

        return (
          <div className="flex flex-col items-center justify-center gap-1">
            <span
              className={cn(
                "h-7 w-[170px] px-2.5 inline-flex items-center justify-center gap-1 rounded-full border text-[10px] font-black tracking-wide",
                tone,
                isDueToday && "animate-pulse",
              )}
            >
              {isDueToday ? (
                <>
                  <span>Today Due</span>
                  <CalendarDays className="h-3 w-3" />
                </>
              ) : isDueTomorrow ? (
                <>
                  <span>Tomorrow</span>
                  <CalendarDays className="h-3 w-3" />
                </>
              ) : daysLeft === Infinity ? (
                <>
                  <span>No Due</span>
                  <CalendarDays className="h-3 w-3" />
                </>
              ) : (
                <>
                  <span><span className="text-[12px] font-black">{Math.abs(daysLeft)}</span> Left</span>
                  <CalendarDays className="h-3 w-3" />
                  <span className="font-bold">{month} {day}</span>
                </>
              )}
            </span>

            {pendingCount > 0 && (
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPending?.(account);
                      }}
                      className="h-7 w-[170px] px-2.5 inline-flex items-center justify-center gap-1 rounded-full border border-amber-300 bg-amber-50 text-[10px] font-black tracking-wide text-amber-700 hover:bg-amber-100"
                    >
                      <Hourglass className="h-3 w-3" />
                      <span>{pendingCount} Pending</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {`Pending confirm: ${pendingCount} item(s), ${formatMoneyVND(pendingTotalAmount)}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      }
      case "balance": {
        const isCC = account.type === "credit_card";
        const accountSlug = (account as any)?.slug as string | undefined;
        const hasChildren =
          allAccounts?.some(
            (item) =>
              item.parent_account_id === account.id ||
              (accountSlug ? item.parent_account_id === accountSlug : false),
          ) || false;
        const isParent = !!account.relationships?.is_parent || hasChildren;
        const parentHintId = account.relationships?.parent_info?.id || null;
        const rawParentRef = account.parent_account_id || parentHintId || null;
        const parentAcc = isParent
          ? null
          : allAccounts?.find(
              (item) =>
                item.id === rawParentRef ||
                ((item as any)?.slug && (item as any).slug === rawParentRef),
            );
        const inferredParentAcc = isParent
          ? null
          : allAccounts?.find((item) =>
              (item.relationships?.child_accounts || []).some(
                (child: any) =>
                  child.id === account.id ||
                  child.id === rawParentRef ||
                  (accountSlug ? child.id === accountSlug : false),
              ),
            );
        const effectiveParentAcc = parentAcc || inferredParentAcc || null;

        const groupRefs = new Set<string>();
        const knownChildIds = new Set<string>(
          ((isParent ? account.relationships?.child_accounts : effectiveParentAcc?.relationships?.child_accounts) || [])
            .map((child: any) => String(child?.id || ""))
            .filter(Boolean),
        );
        if (isParent) {
          groupRefs.add(account.id);
          if (accountSlug) groupRefs.add(accountSlug);
        } else {
          if (rawParentRef) groupRefs.add(rawParentRef);
          if (effectiveParentAcc?.id) groupRefs.add(effectiveParentAcc.id);
          const parentSlug = (effectiveParentAcc as any)?.slug as string | undefined;
          if (parentSlug) groupRefs.add(parentSlug);
        }

        const computedGroupDebt = allAccounts
          ? allAccounts
              .filter(
                (item) =>
                  knownChildIds.has(item.id) ||
                  groupRefs.has(item.id) ||
                  groupRefs.has(item.parent_account_id || ""),
              )
              .reduce((sum, item) => sum + (item.current_balance || 0), 0)
          : account.current_balance || 0;

        const sharedFamilyDebt = familyBalance !== undefined ? familyBalance : computedGroupDebt;

        // Keep Balance column in lockstep with Role's family math.
        const familyLimit = isCC
          ? ((isParent ? account.credit_limit : effectiveParentAcc?.credit_limit) || 0)
          : 0;
        const debt = isCC ? Math.abs(sharedFamilyDebt || 0) : 0;
        const limit = isCC ? familyLimit : getEffectiveCreditLimit(account, allAccounts);
        const finalBalance = isCC ? familyLimit - debt : account.current_balance || 0;
        const remainingPercent = isCC && limit > 0
          ? Math.max(0, Math.min(100, (finalBalance / limit) * 100))
          : null;

        const balanceTone = isCC && remainingPercent !== null
          ? remainingPercent < 30
            ? "bg-rose-50 text-rose-700 border-rose-300"
            : remainingPercent < 80
              ? "bg-amber-50 text-amber-700 border-amber-300"
              : "bg-emerald-50 text-emerald-700 border-emerald-300"
          : Math.abs(finalBalance) > 100000000
            ? "bg-rose-50 text-rose-700 border-rose-300"
            : Math.abs(finalBalance) >= 50000000
              ? "bg-amber-50 text-amber-700 border-amber-300"
              : "bg-emerald-50 text-emerald-700 border-emerald-300";

        return (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-end text-right cursor-help min-w-[120px]">
                  <span
                    className={cn(
                      "h-7 px-3 rounded-full inline-flex items-center text-[11px] font-black tabular-nums border",
                      balanceTone,
                    )}
                  >
                    {finalBalance < 0 ? "-" : ""}
                    {formatMoneyVND(Math.round(Math.abs(finalBalance)))}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="p-3 min-w-[200px] bg-slate-900 text-slate-100 border-slate-800 shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-700">
                    <div className="h-5 w-5 rounded bg-emerald-500/20 flex items-center justify-center">
                      <Calculator className="h-3 w-3 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                      {isCC ? "Available Balance" : "Account Balance"}
                    </span>
                  </div>

                  {isCC ? (
                    <div className="space-y-1.5 pt-1">
                      <div className="pb-1 border-b border-slate-700">
                        <div className="text-[10px] text-slate-400 mb-1">Amount (Text)</div>
                        <VietnameseCurrency amount={finalBalance} variant="none" className="text-[11px]" />
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Credit Limit:</span>
                        <span className="font-bold">
                          {formatMoneyVND(limit)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Solid Debt:</span>
                        <span className="font-bold text-rose-400">
                          - {formatMoneyVND(debt)}
                        </span>
                      </div>
                      <div className="pt-1.5 border-t border-slate-700 flex justify-between text-[11px]">
                        <span className="text-emerald-400 font-bold">
                          Remaining:
                        </span>
                        <span className="font-black text-emerald-400">
                          {formatMoneyVND(finalBalance)}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 italic mt-2 border-t border-slate-800 pt-1">
                        Formula: Limit + Total In - Total Out
                      </p>
                    </div>
                  ) : (
                    <div className="text-[11px] pt-1 leading-relaxed text-slate-300">
                      Direct balance from linked transactions and starting
                      balance.
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      case "action": {
        const isCC = account.type === "credit_card";
        const isDebt = account.type === "debt";

        return (
          <div className="action-cell flex flex-nowrap items-center gap-1 justify-end whitespace-nowrap">
            <ActionButtonsWithLoading
              actions={{ 
                onEdit, 
                onLend, 
                onRepay, 
                onPay, 
                onTransfer, 
                onClone: onClone || (() => {}), 
                onAudit 
              }}
              account={account}
              isCC={isCC}
              isDebt={isDebt}
            />
          </div>
        );
      }
      default:
        return <span className="text-slate-300">—</span>;
    }
  };

  return (
    <>
      <tr
        className={cn(
          "transition-all duration-200 group/row",
          isExpanded
            ? "bg-indigo-50/20 border-b-0"
            : "hover:bg-indigo-50/10 border-b",
          (() => {
            if (account.type !== "credit_card" && account.type !== "debt")
              return "";
            const now = new Date();

            let dueDays = Infinity;
            if (account.stats?.due_date) {
              dueDays = Math.ceil(
                (new Date(account.stats.due_date).getTime() - now.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
            }

            let ruleDays = Infinity;
            if (
              account.stats?.min_spend &&
              !account.stats?.is_qualified &&
              account.stats?.cycle_range
            ) {
              const parts = account.stats.cycle_range.split(" - ");
              if (parts.length >= 2) {
                try {
                  const cycleEnd = new Date(parts[1]);
                  ruleDays = Math.ceil(
                    (cycleEnd.getTime() - now.getTime()) /
                      (1000 * 60 * 60 * 24),
                  );
                } catch {}
              }
            }

            if (dueDays < 10 || ruleDays < 10) {
              return "bg-rose-50/50 border-rose-200 hover:bg-rose-100/60 shadow-[inset_4px_0_0_0_#e11d48] transition-all duration-300";
            }
            if (dueDays !== Infinity || ruleDays !== Infinity) {
              return "bg-slate-50/30 border-slate-100 hover:bg-indigo-50/20 shadow-[inset_4px_0_0_0_#94a3b8]";
            }

            const remaining =
              (account.stats?.min_spend || 0) -
              (account.stats?.spent_this_cycle || 0);
            if (
              account.stats?.min_spend &&
              !account.stats?.is_qualified &&
              remaining > 0
            ) {
              return "bg-amber-50/20 border-amber-100 shadow-[inset_4px_0_0_0_#f59e0b]";
            }

            if (account.stats?.is_qualified) {
              return "bg-emerald-50/10 border-emerald-100 shadow-[inset_4px_0_0_0_#10b981]";
            }

            return "bg-white border-b";
          })(),
        )}
        onClick={() => onToggleExpand(account.id)}
      >
        {visibleColumns.map((col, idx) => (
          <td
            key={`${account.id}-${col.key}`}
            className={cn(
              "px-4 py-3 align-middle text-sm font-normal text-foreground",
              idx < visibleColumns.length - 1 && "border-r border-slate-200",
            )}
          >
            {renderCell(col.key)}
          </td>
        ))}
      </tr>

      {isExpanded && (
        <tr className="bg-muted/30">
          <td colSpan={visibleColumns.length} className="p-0 border-b">
            <AccountRowDetailsV2
              account={account}
              isExpanded={isExpanded}
              allAccounts={allAccounts}
              onEditTransaction={onEditTransaction}
            />
          </td>
        </tr>
      )}

      {editingTransactionId && (
        <TransactionSlideV2
          open={!!editingTransactionId}
          onOpenChange={(open) => !open && setEditingTransactionId(null)}
          mode="single"
          editingId={editingTransactionId}
          initialData={undefined}
          accounts={allAccounts || []}
          categories={categories || []}
          people={people}
          shops={shops}
          onSuccess={() => {
            setEditingTransactionId(null);
            setModalRefreshKey((prev) => prev + 1);
            router.refresh();
            toast.success("Transaction updated");
          }}
        />
      )}
    </>
  );
}

interface AccountRowActions {
  onEdit: (account: Account) => void;
  onLend: (account: Account) => void;
  onRepay: (account: Account) => void;
  onPay: (account: Account) => void;
  onTransfer: (account: Account) => void;
  onClone: (account: Account) => void;
  onAudit: (account: Account) => void;
}

interface ActionButtonsProps {
  actions: AccountRowActions;
  account: Account;
  isCC: boolean;
  isDebt: boolean;
}

function ActionButtonsWithLoading({
  actions,
  account,
  isCC,
  isDebt,
}: ActionButtonsProps) {
  const [loadingAction, setLoadingAction] = React.useState<string | null>(null);

  const handleAction = (
    action: string,
    callback: (account: Account) => void,
  ) => {
    setLoadingAction(action);
    setTimeout(() => {
      callback(account);
      setLoadingAction(null);
    }, 300);
  };

  return (
    <div className="flex items-center gap-1">
      {/* Primary Actions: Repay & Lend */}
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-none"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("repay", actions.onRepay);
            }}
          >
            {loadingAction === "repay" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Banknote className="h-[18px] w-[18px]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Repay / Income</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-none"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("lend", actions.onLend);
            }}
          >
            {loadingAction === "lend" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <HandCoins className="h-[18px] w-[18px]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Lend / Add Debt</p>
        </TooltipContent>
      </Tooltip>

      {/* Secondary Actions: Dropdown Nest */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-none data-[state=open]:bg-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
             <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px] p-1 shadow-xl border-slate-200">
           {/* Audit Action (Keywords: Re-Align Audit, Reconciliation) */}
           <DropdownMenuItem 
            className="gap-2.5 h-9 font-bold text-xs text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("audit", actions.onAudit);
            }}
           >
             <History className="h-4 w-4" />
             <span>Re-Align Audit</span>
           </DropdownMenuItem>

           <DropdownMenuSeparator className="my-1 bg-slate-100" />

           {(isCC || isDebt) && (
              <DropdownMenuItem 
                className="gap-2.5 h-9 font-bold text-xs text-amber-600 focus:text-amber-700 focus:bg-amber-50 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction("pay", actions.onPay);
                }}
              >
                <CreditCard className="h-4 w-4" />
                <span>Pay Credit/Bill</span>
              </DropdownMenuItem>
           )}

           {!isCC && (
              <DropdownMenuItem 
                className="gap-2.5 h-9 font-bold text-xs text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction("transfer", actions.onTransfer);
                }}
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>Transfer Money</span>
              </DropdownMenuItem>
           )}

           <DropdownMenuItem 
            className="gap-2.5 h-9 font-bold text-xs text-blue-500 focus:text-blue-600 focus:bg-blue-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("clone", actions.onClone);
            }}
           >
             <Copy className="h-4 w-4" />
             <span>Clone Account</span>
           </DropdownMenuItem>

           <DropdownMenuSeparator className="my-1 bg-slate-100" />

           <DropdownMenuItem 
            className="gap-2.5 h-9 font-bold text-xs text-slate-500 focus:text-primary focus:bg-slate-50 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("edit", actions.onEdit);
            }}
           >
             <Edit className="h-4 w-4" />
             <span>Account Settings</span>
           </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
