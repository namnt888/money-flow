import React, { useEffect, useMemo, useState } from "react";
import { Person, TransactionWithDetails } from "@/types/moneyflow.types";
import { getPersonRouteId } from "@/lib/person-route";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { loadTransactions } from "@/services/transaction.service";
import { formatMoneyVND, cn } from "@/lib/utils";
import {
  ExternalLink,
  CreditCard,
  Receipt,
  TrendingDown,
  TrendingUp,
  HandCoins,
  Banknote,
  History,
  ArrowRight,
  Pencil,
  Copy,
  User,
  Sparkles,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PeopleRowDetailsProps {
  person: Person;
  isExpanded: boolean;
}

export function PeopleRowDetailsV2({
  person,
  isExpanded,
}: PeopleRowDetailsProps) {
  const [recentTxns, setRecentTxns] = useState<TransactionWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      fetchRecent();
    }
  }, [isExpanded, person.id]);

  const fetchRecent = async () => {
    setIsLoading(true);
    try {
      const txns = await loadTransactions({
        personId: getPersonRouteId(person),
        limit: 3, // Limit to 3 lines as requested
      });
      setRecentTxns(txns);
    } catch (error) {
      console.error("Failed to load recent transactions", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isExpanded) return null;

  const nowYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(nowYear);

  const cycleStats = useMemo(
    () => person.cycle_stats ?? [],
    [person.cycle_stats],
  );
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    cycleStats.forEach((cycle) => {
      if (cycle.tag && cycle.tag.includes("-")) {
        years.add(cycle.tag.split("-")[0]);
      }
    });
    years.add(nowYear);
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [cycleStats, nowYear]);

  const cycleStatsForYear = useMemo(() => {
    if (!selectedYear) return cycleStats;
    return cycleStats.filter((cycle) => cycle.tag && cycle.tag.startsWith(selectedYear));
  }, [cycleStats, selectedYear]);

  const activeCycleTagForYear = useMemo(() => {
    if (cycleStatsForYear.length === 0) return person.current_cycle_label ?? "";
    const currentTag = person.current_cycle_label ?? "";
    if (currentTag && currentTag.startsWith(selectedYear)) return currentTag;
    return (
      cycleStatsForYear
        .slice()
        .sort((a, b) => (b.tag || "").localeCompare(a.tag || ""))[0]?.tag ?? ""
    );
  }, [cycleStatsForYear, person.current_cycle_label, selectedYear]);

  const activeCycleStats = useMemo(
    () =>
      cycleStatsForYear.find((cycle) => cycle.tag === activeCycleTagForYear) ??
      null,
    [cycleStatsForYear, activeCycleTagForYear],
  );

  const yearlyStats = useMemo(() => {
    return cycleStatsForYear.reduce(
      (acc, cycle) => {
        const cycleBaseLend = cycle.baseLend || 0;
        const cycleRepaid = cycle.repaid || 0;
        const cycleCashback = cycle.cashback || 0;
        const cycleNetRemains = cycleBaseLend - cycleRepaid - cycleCashback;
        
        return {
          baseLend: acc.baseLend + cycleBaseLend,
          repaid: acc.repaid + cycleRepaid,
          cashback: acc.cashback + cycleCashback,
          remains: acc.remains + cycleNetRemains,
        };
      },
      { baseLend: 0, repaid: 0, cashback: 0, remains: 0 },
    );
  }, [cycleStatsForYear]);

  const fallbackBaseLend =
    person.current_cycle_base_lend ?? person.total_base_debt ?? 0;
  const fallbackRepaid =
    person.current_cycle_repaid ?? person.total_repaid ?? 0;
  const fallbackCashback =
    person.current_cycle_cashback ?? person.total_cashback ?? 0;
  const fallbackRemains = person.current_debt_balance ?? 0;

  const baseLendAmount =
    cycleStatsForYear.length > 0 ? yearlyStats.baseLend : fallbackBaseLend;
  const settledAmount =
    cycleStatsForYear.length > 0 ? yearlyStats.repaid : fallbackRepaid;
  const totalCashbackAmount =
    cycleStatsForYear.length > 0 ? yearlyStats.cashback : fallbackCashback;

  // Prev Debt: All debts from cycles BEFORE the current selected year
  const prevDebtAmount = useMemo(() => {
    const priorCycles = cycleStats.filter((c) => {
      const yearStr = c.tag?.split("-")[0] || "";
      return yearStr < selectedYear;
    });
    return priorCycles.reduce((sum, c) => sum + (c.remains || 0), 0);
  }, [cycleStats, selectedYear]);

  const remainsAmount =
    cycleStatsForYear.length > 0
      ? (prevDebtAmount > 0 ? prevDebtAmount : 0) + yearlyStats.remains
      : (person.cycle_stats 
          ? person.cycle_stats.reduce((sum, c) => sum + (c.remains || 0), 0)
          : fallbackRemains);

  const activeCycleRemains = activeCycleStats?.remains ?? 0;

  const StatItem = ({
    label,
    value,
    colorClass,
    labelClass,
    tooltip,
  }: {
    label: string;
    value: number;
    colorClass: string;
    labelClass?: string;
    tooltip?: string;
  }) => {
    const content = (
      <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50/50 border border-slate-100 group transition-all hover:bg-white hover:shadow-md hover:border-slate-200 cursor-default">
        <span
          className={cn(
            "text-[10px] uppercase font-black tracking-widest text-slate-400 group-hover:text-slate-500",
            labelClass,
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "text-xs font-black tabular-nums tracking-tight",
            colorClass,
          )}
        >
          {formatMoneyVND(value)}
        </span>
      </div>
    );

    if (!tooltip) return content;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="p-5 bg-slate-50/30 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all duration-500 ease-in-out">
            {/* Header with Profile & Links */}
            <div className="bg-slate-50/50 border-b border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <Avatar className="h-16 w-16 rounded-none border-2 border-white shadow-sm flex-shrink-0">
                  <AvatarImage
                    src={person.image_url || undefined}
                    alt={person.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl bg-indigo-50 text-indigo-600 rounded-none font-black">
                    {person.name?.[0]?.toUpperCase() || (
                      <User className="h-7 w-7" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {person.name}
                    </h3>
                    {person.is_group && (
                      <Badge
                        variant="secondary"
                        className="px-2 h-5 text-[10px] font-black uppercase bg-indigo-100 text-indigo-700 border-none rounded-md"
                      >
                        Group
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                      Financial Portfolio
                    </span>
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] text-slate-400 font-medium tabular-nums uppercase">
                      ID: {person.id.slice(0, 8)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {person.google_sheet_url && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={person.google_sheet_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-10 inline-flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all border border-emerald-100 bg-white px-5 rounded-xl shadow-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Open Google Sheet</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Link
                  href={`/people/${getPersonRouteId(person)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 inline-flex items-center justify-center w-10 text-slate-600 hover:text-white hover:bg-slate-900 transition-all border border-slate-200 bg-white rounded-xl shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="p-6 space-y-6 border-t border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Summary
                    </span>
                    {activeCycleTagForYear && (
                      <Badge
                        variant="secondary"
                        className="text-[9px] font-black uppercase tracking-wider"
                      >
                        {activeCycleTagForYear}
                      </Badge>
                    )}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-8 gap-2 border-slate-200 bg-slate-50 hover:bg-white text-slate-700 font-medium min-w-[100px] justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-slate-500" />
                          <span className="text-xs">{selectedYear}</span>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[120px] p-1" align="end">
                      <div className="flex flex-col gap-0.5">
                        {availableYears.map((year) => (
                          <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={cn(
                              "px-3 py-2 text-sm rounded-md transition-colors w-full text-left",
                              selectedYear === year
                                ? "bg-slate-100 font-medium text-slate-900"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                            )}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <StatItem
                    label="Original Amount"
                    value={baseLendAmount}
                    colorClass="text-slate-600"
                  />
                  <StatItem
                    label="Repayment"
                    value={settledAmount}
                    colorClass="text-emerald-600"
                  />
                  <StatItem
                    label="Previous Debt"
                    value={prevDebtAmount}
                    colorClass="text-sky-600"
                  />
                  <StatItem
                    label="Active Cycle"
                    value={activeCycleRemains}
                    colorClass="text-amber-600"
                    tooltip="Net remaining for the selected cycle"
                  />
                  <StatItem
                    label="Cashback Total"
                    value={totalCashbackAmount}
                    colorClass="text-amber-600"
                  />
                  <StatItem
                    label="Remaining Amount"
                    value={remainsAmount}
                    colorClass={
                      remainsAmount > 0
                        ? "text-rose-600 text-base font-black"
                        : "text-emerald-600"
                    }
                    labelClass={remainsAmount > 0 ? "text-rose-500/80" : ""}
                  />
                </div>

                {/* Historical Debt Breakdown */}
                {person.monthly_debts &&
                  person.monthly_debts.some(
                    (d) =>
                      (d.status === "active" || (d.amount || 0) > 5) &&
                      d.tag !== person.current_cycle_label,
                  ) && (
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 px-1">
                        <History className="h-4 w-4 text-rose-500" />
                        <h4 className="text-[10px] uppercase font-black text-rose-500 tracking-[0.2em]">
                          Historical Debt Breakdown
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {person.monthly_debts
                          .filter(
                            (d) =>
                              (d.status === "active" || (d.amount || 0) > 5) &&
                              d.tag !== person.current_cycle_label,
                          )
                          .map((debt, idx) => (
                            <div
                              key={`${debt.tag}-${idx}`}
                              className="flex items-center justify-between bg-rose-50/30 border border-rose-100/50 p-3 rounded-2xl"
                            >
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                  {debt.tag}
                                </span>
                                <span className="text-xs font-black text-rose-600 tabular-nums">
                                  {formatMoneyVND(debt.amount)}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="h-5 px-1.5 border-rose-200 bg-white text-rose-600 text-[9px] font-black uppercase tracking-tighter shadow-sm"
                              >
                                Unpaid
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Active Memberships Section - Premium Card Layout */}
                {person.subscription_details &&
                  person.subscription_details.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 px-1">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                        <h4 className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                          Member Benefits & Active Subscriptions
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {person.subscription_details.map((sub, idx) => (
                          <div
                            key={`${sub.id}-${idx}`}
                            className="group relative flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-2xl transition-all hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:border-indigo-200 hover:bg-white hover:-translate-y-0.5"
                          >
                            <div className="relative w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors">
                              {sub.image_url ? (
                                <img
                                  src={sub.image_url}
                                  alt=""
                                  className="w-full h-full object-contain p-2"
                                />
                              ) : (
                                <CreditCard className="h-5 w-5 text-slate-300" />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0 pr-2">
                              <span className="text-xs font-black text-slate-800 truncate leading-tight tracking-tight">
                                {sub.name}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <Badge
                                  variant="secondary"
                                  className="px-1.5 py-0 h-4 text-[9px] font-black uppercase bg-indigo-100/50 text-indigo-600 border-none rounded-md"
                                >
                                  {sub.slots} {sub.slots > 1 ? "slots" : "slot"}
                                </Badge>
                                <div className="h-1 w-1 rounded-full bg-slate-200" />
                                <span className="text-[10px] font-bold text-slate-400">
                                  Shared
                                </span>
                              </div>
                            </div>
                            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowUpRight className="h-3.5 w-3.5 text-indigo-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Recent Activity Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <History className="h-4 w-4 text-blue-600" />
              </div>
              <h4 className="text-[12px] uppercase font-black text-slate-800 tracking-tight">
                Recent Activity
              </h4>
            </div>
            {recentTxns.length > 0 && (
              <Link
                href={`/people/${getPersonRouteId(person)}`}
                className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                View All
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-full bg-slate-50 animate-pulse rounded-2xl border border-slate-100"
                  />
                ))}
              </div>
            ) : recentTxns.length > 0 ? (
              recentTxns.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:border-slate-200 transition-all group/txn"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                        txn.type === "repayment"
                          ? "bg-emerald-50 border-emerald-100"
                          : "bg-rose-50 border-rose-100",
                      )}
                    >
                      {txn.type === "repayment" ? (
                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-rose-600" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-slate-700 truncate leading-tight group-hover/txn:text-slate-900 transition-colors">
                        {txn.note ||
                          txn.shop_name ||
                          txn.category_name ||
                          "No note"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium tabular-nums mt-0.5">
                        {new Date(txn.occurred_at).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span
                      className={cn(
                        "text-sm font-black tabular-nums tracking-tight",
                        txn.type === "repayment"
                          ? "text-emerald-600"
                          : "text-rose-600",
                      )}
                    >
                      {txn.type === "repayment" ? "+" : "-"}
                      {formatMoneyVND(Math.abs(txn.amount))}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-10 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
                <Receipt className="h-10 w-10 text-slate-200 mb-3" />
                <p className="text-[12px] text-slate-400 font-bold uppercase tracking-widest">
                  No recent transactions
                </p>
                <p className="text-[10px] text-slate-300 mt-1 italic">
                  Records will appear here after sync
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
